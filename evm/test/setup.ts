import { expect } from "chai";
import { BigNumber, BigNumberish, ContractTransaction } from "ethers";
import { LogDescription, randomBytes } from "ethers/lib/utils";
import { deployments, ethers } from "hardhat";

import {
  Baal,
  DeVoxBaalAndShamanSummoner,
  DeVoxShaman,
  GnosisSafe,
  Loot,
  MultiSend,
  Shares,
} from "../src";
import { ERC20, MyToken } from "../src/types";
import { ContractNames } from "../src/util";
import { encodeMultiAction } from "../src/util/encoding";

export type ContractSet = {
  baal: Baal;
  shaman: DeVoxShaman;
  safe: GnosisSafe;
  loot: Loot;
  shares: Shares;
  token: ERC20;
};

export type ConnectedContractSet = ContractSet & {
  address: string;
};

export type AddressedUserContractSet = {
  default: ContractSet;
  deployer: ConnectedContractSet;
  user: ConnectedContractSet;
  anon: ConnectedContractSet;
};

export type GovernanceSettings = {
  PROPOSAL_OFFERING: number;
  GRACE_PERIOD_IN_SECONDS: number;
  VOTING_PERIOD_IN_SECONDS: number;
  QUORUM_PERCENT: number;
  SPONSOR_THRESHOLD: number;
  MIN_RETENTION_PERCENT: number;
  MIN_STAKING_PERCENT: number;
  TOKEN_NAME: string;
  TOKEN_SYMBOL: string;
};

export type DeVoxShamanSummonArgs = {
  pricePerUnit: BigNumberish;
  tokensPerUnit: BigNumberish;
  target: BigNumberish;
  name: string;
};

export const defaultGovernanceSettings: GovernanceSettings = {
  GRACE_PERIOD_IN_SECONDS: 43200,
  VOTING_PERIOD_IN_SECONDS: 432000,
  PROPOSAL_OFFERING: 69,
  SPONSOR_THRESHOLD: 1,
  MIN_RETENTION_PERCENT: 0,
  MIN_STAKING_PERCENT: 0,
  QUORUM_PERCENT: 0,
  TOKEN_NAME: "BAALtests",
  TOKEN_SYMBOL: "BAAL",
};

export const defaultSummonArgs: DeVoxShamanSummonArgs = {
  pricePerUnit: ethers.utils.parseUnits("1", "ether"),
  tokensPerUnit: "100",
  target: ethers.utils.parseUnits("100000", "ether"),
  name: "Sample Campaign",
};

const getNewBaalAddresses = async (
  tx: ContractTransaction
): Promise<{
  baal: string;
  shaman: string;
  loot: string;
  shares: string;
  safe: string;
}> => {
  const receipt = await ethers.provider.getTransactionReceipt(tx.hash);
  // console.log(receipt);

  const tryFetchLogEvent = (abi: string) => {
    const iface = new ethers.utils.Interface([abi]);
    for (let i = 0; i < receipt.logs.length; i++) {
      try {
        const log = iface.parseLog(receipt.logs[i]);
        return log;
      } catch (e) {
        if (i === receipt.logs.length - 1)
          throw new Error(`No log found: ${e}`);
      }
    }
  };

  const shamanSummonAbi =
    "event SummonComplete(address indexed baal, address indexed shaman, address token, uint256 id, uint256 pricePerUnit, uint256 tokensPerUnit, uint256 target, string name)";
  const shamanSummonLog = tryFetchLogEvent(shamanSummonAbi);
  const { _, shaman } = shamanSummonLog!.args;

  const baalSummonAbi =
    "event SummonBaal(address indexed baal, address indexed loot, address indexed shares, address safe, address forwarder, uint256 existingAddrs)";
  const baalSummonLog = tryFetchLogEvent(baalSummonAbi);
  const { baal, loot, shares, safe } = baalSummonLog!.args;

  return { baal, shaman, loot, shares, safe };
};

const metadataConfig = {
  CONTENT: '{"name":"test"}',
  TAG: "daohaus.summoner.daoProfile",
};

const abiCoder = ethers.utils.defaultAbiCoder;

const getBaalParams = async function (
  baal: Baal,
  config: GovernanceSettings,
  adminConfig: [boolean, boolean],
  shares: [string[], number[]],
  loots: [string[], number[]],
  trustedForwarder: string,
  lootAddr: string,
  sharesAddr: string
) {
  const governanceConfig = abiCoder.encode(
    ["uint32", "uint32", "uint256", "uint256", "uint256", "uint256"],
    [
      config.VOTING_PERIOD_IN_SECONDS,
      config.GRACE_PERIOD_IN_SECONDS,
      config.PROPOSAL_OFFERING,
      config.QUORUM_PERCENT,
      config.SPONSOR_THRESHOLD,
      config.MIN_RETENTION_PERCENT,
    ]
  );

  const setAdminConfig = baal.interface.encodeFunctionData(
    "setAdminConfig",
    adminConfig
  );
  const setGovernanceConfig = baal.interface.encodeFunctionData(
    "setGovernanceConfig",
    [governanceConfig]
  );
  const mintShares = baal.interface.encodeFunctionData("mintShares", shares);
  const mintLoot = baal.interface.encodeFunctionData("mintLoot", loots);

  const initalizationActions = [
    setAdminConfig,
    setGovernanceConfig,
    mintShares,
    mintLoot,
  ];

  return {
    initParams: abiCoder.encode(
      ["string", "string", "address", "address", "address", "address"],
      [
        config.TOKEN_NAME,
        config.TOKEN_SYMBOL,
        ethers.constants.AddressZero, // safe addr
        trustedForwarder,
        lootAddr,
        sharesAddr,
      ]
    ),
    initalizationActions,
  };
};

const getShamanInitParams = function (
  tokenAddress: string,
  shamanArgs: DeVoxShamanSummonArgs
) {
  return abiCoder.encode(
    ["string", "uint256", "uint256", "uint256", "string"],
    [
      tokenAddress,
      shamanArgs.pricePerUnit,
      shamanArgs.tokensPerUnit,
      shamanArgs.target,
      shamanArgs.name,
    ]
  );
};

// await token.transfer(
//   applicant.address,
//   ethers.utils.parseUnits("10.0", "ether")
// );
// await token.transfer(
//   s2.address,
//   ethers.utils.parseUnits("10000.0", "ether")
// );

const setupTest = deployments.createFixture<
  AddressedUserContractSet,
  {
    governanceSettings?: GovernanceSettings;
    shamanArgs?: DeVoxShamanSummonArgs;
  }
>(async ({ deployments, getNamedAccounts, ethers }, args) => {
  await deployments.fixture(); // ensure you start from a fresh deployments
  const { deployer, user, anon } = await getNamedAccounts();
  const {
    governanceSettings = defaultGovernanceSettings,
    shamanArgs = defaultSummonArgs,
  } = args ?? {};

  // Contracts
  const baalSingleton: Baal = await ethers.getContract(ContractNames.Baal);
  expect(baalSingleton.address).to.be.properAddress;

  const lootSingleton: Loot = await ethers.getContract(ContractNames.Loot);
  expect(lootSingleton.address).to.be.properAddress;

  const sharesSingleton: Shares = await ethers.getContract(
    ContractNames.Shares
  );
  expect(sharesSingleton.address).to.be.properAddress;

  const tokenSingleton: MyToken = await ethers.getContract(
    ContractNames.MyToken
  );
  expect(tokenSingleton.address).to.be.properAddress;
  expect(await tokenSingleton.name()).to.equal("MyToken");

  const multisend: MultiSend = await ethers.getContract(
    ContractNames.SafeMultiSend
  );
  expect(multisend.address).to.be.properAddress;

  const summoner: DeVoxBaalAndShamanSummoner = await ethers.getContract(
    ContractNames.DeVoxBaalAndShamanSummoner
  );
  expect(summoner.address).to.be.properAddress;

  const shamanSingleton: DeVoxShaman = await ethers.getContract(
    ContractNames.DeVoxShaman
  );
  expect(shamanSingleton.address).to.be.properAddress;
  await expect(
    shamanSingleton.initialize(
      ethers.constants.AddressZero,
      ethers.constants.AddressZero,
      1,
      1,
      1,
      1
    )
  ).to.be.revertedWith("Initializable: contract is already initialized");

  const safeSingleton: GnosisSafe = await ethers.getContract(
    ContractNames.Safe
  );
  expect(safeSingleton.address).to.be.properAddress;

  const deployerShares = governanceSettings.SPONSOR_THRESHOLD * 2;
  const sharesPaused = false;
  const lootPaused = false;

  const dead = "0x000000000000000000000000000000000000dEaD";
  const deadLoot = 1000000000000000;

  const encodedInitParams = await getBaalParams(
    baalSingleton,
    governanceSettings,
    [sharesPaused, lootPaused],
    [[deployer], [deployerShares]],
    [[dead], [deadLoot]], // has the effect of disabling meaningful ragequit
    ethers.constants.AddressZero,
    ethers.constants.AddressZero,
    ethers.constants.AddressZero
  );

  const encodedShamanInitParams = getShamanInitParams(
    tokenSingleton.address,
    shamanArgs
  );

  const tx = await summoner.summonBaalAndShaman(
    encodedInitParams.initParams,
    encodedInitParams.initalizationActions,
    101,
    randomBytes(32),
    encodedShamanInitParams
  );
  const addresses = await getNewBaalAddresses(tx);

  const baal = baalSingleton.attach(addresses.baal);
  expect(baal.address).to.be.properAddress;
  expect(baal.address).to.equal(addresses.baal);
  expect(baal.address).not.to.equal(baalSingleton.address);

  const shaman = shamanSingleton.attach(addresses.shaman);
  expect(shaman.address).to.be.properAddress;
  expect(shaman.address).to.equal(addresses.shaman);
  expect(shaman.address).not.to.equal(shamanSingleton.address);

  const safe = safeSingleton.attach(addresses.safe);
  expect(safe.address).to.be.properAddress;
  expect(safe.address).to.equal(addresses.safe);
  expect(safe.address).not.to.equal(safeSingleton.address);

  const loot = lootSingleton.attach(addresses.loot);
  expect(loot.address).to.be.properAddress;
  expect(loot.address).to.equal(addresses.loot);
  expect(loot.address).not.to.equal(lootSingleton.address);

  const shares = sharesSingleton.attach(addresses.shares);
  expect(shares.address).to.be.properAddress;
  expect(shares.address).to.equal(addresses.shares);
  expect(shares.address).not.to.equal(sharesSingleton.address);

  // Account config
  const setupAddress = async (address: string) => {
    const signer = await ethers.getSigner(address);
    return {
      address: address,
      baal: baal.connect(signer),
      shaman: shaman.connect(signer),
      loot: loot.connect(signer),
      shares: shares.connect(signer),
      safe: safe.connect(signer),
      token: tokenSingleton.connect(signer),
    };
  };

  // Struct
  return {
    default: { baal, shaman, loot, shares, safe, token: tokenSingleton },
    deployer: await setupAddress(deployer),
    user: await setupAddress(user),
    anon: await setupAddress(anon),
  };
});

export default setupTest;
