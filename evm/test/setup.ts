import { expect } from "chai";
import { BigNumber, BigNumberish, ContractTransaction } from "ethers";
import { deployments, ethers } from "hardhat";

import {
  Baal,
  BaalSummoner,
  DeVoxShaman,
  DeVoxShamanSummoner,
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
  pricePerUnit: "1",
  tokensPerUnit: "100",
  target: "100000",
};

async function blockTime() {
  const block = await ethers.provider.getBlock("latest");
  return block.timestamp;
}

async function moveForwardPeriods(periods: number, extra?: number) {
  const goToTime =
    defaultGovernanceSettings.VOTING_PERIOD_IN_SECONDS * periods +
    (await blockTime()) +
    (extra ?? 0);

  await ethers.provider.send("evm_mine", [goToTime]);

  return true;
}

const setShamanProposal = async function (
  baal: Baal,
  multisend: MultiSend,
  shaman: string,
  permission: BigNumberish
) {
  const setShaman = baal.interface.encodeFunctionData("setShamans", [
    [shaman],
    [permission],
  ]);
  const setShamanAction = encodeMultiAction(
    multisend,
    [setShaman],
    [baal.address],
    [BigNumber.from(0)],
    [0]
  );
  await baal.submitProposal(setShamanAction, 0, 0, "");
  const proposalId = await baal.proposalCount();
  await baal.submitVote(proposalId, true);
  await moveForwardPeriods(2);
  await baal.processProposal(proposalId, setShamanAction);
  return proposalId;
};

const summonDeVoxShaman = async function (
  deVoxShamanArgs: DeVoxShamanSummonArgs,
  multisend: MultiSend,
  deVoxShamanSingleton: DeVoxShaman,
  deVoxShamanSummoner: DeVoxShamanSummoner,
  baal: Baal,
  token: ERC20
) {
  console.log(
    "Summoning DeVoxShaman...",
    baal.address,
    token.address,
    deVoxShamanArgs.pricePerUnit,
    deVoxShamanArgs.tokensPerUnit,
    deVoxShamanArgs.target
  );
  const summondeVoxShaman = await deVoxShamanSummoner.summonDeVoxShaman(
    baal.address,
    token.address,
    deVoxShamanArgs.pricePerUnit,
    deVoxShamanArgs.tokensPerUnit,
    deVoxShamanArgs.target
  );
  const result = await summondeVoxShaman.wait();
  const events = result.events!;
  const e = events[events.length - 1];
  // console.log("e", e);
  const shamanAddress = e.args?.shaman;
  const deVoxShaman = deVoxShamanSingleton.attach(shamanAddress);

  // console.log("Setting DeVoxShaman as Shaman...");
  await setShamanProposal(baal, multisend, shamanAddress, 7);

  return deVoxShaman;
};

const getNewBaalAddresses = async (
  tx: ContractTransaction
): Promise<{ baal: string; loot: string; shares: string; safe: string }> => {
  const receipt = await ethers.provider.getTransactionReceipt(tx.hash);
  let baalSummonAbi = [
    "event SummonBaal(address indexed baal, address indexed loot, address indexed shares, address safe, address forwarder, uint256 existingAddrs)",
  ];
  let iface = new ethers.utils.Interface(baalSummonAbi);
  // console.log({logs: receipt.logs[receipt.logs.length - 1]})
  let log = iface.parseLog(receipt.logs[receipt.logs.length - 1]);
  const { baal, loot, shares, safe } = log.args;
  return { baal, loot, shares, safe };
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

  const baalSummoner: BaalSummoner = await ethers.getContract(
    ContractNames.BaalSummoner
  );
  expect(baalSummoner.address).to.be.properAddress;

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

  const deployerLoot = 500;
  const deployerShares = governanceSettings.SPONSOR_THRESHOLD * 2;
  const sharesPaused = false;
  const lootPaused = false;

  const encodedInitParams = await getBaalParams(
    baalSingleton,
    governanceSettings,
    [sharesPaused, lootPaused],
    [[deployer], [deployerShares]],
    [[deployer], [deployerLoot]],
    ethers.constants.AddressZero,
    ethers.constants.AddressZero,
    ethers.constants.AddressZero
  );

  // console.log("pre-summon Baal");

  const tx = await baalSummoner.summonBaal(
    encodedInitParams.initParams,
    encodedInitParams.initalizationActions,
    101
  );
  // console.log("post-summon Baal");
  const addresses = await getNewBaalAddresses(tx);

  const baal = baalSingleton.attach(addresses.baal);
  expect(baal.address).to.be.properAddress;
  expect(baal.address).to.equal(addresses.baal);
  expect(baal.address).not.to.equal(baalSingleton.address);

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

  //   const selfTransferAction = encodeMultiAction(
  //     multisend,
  //     ["0x"],
  //     [baal.address],
  //     [BigNumber.from(0)],
  //     [0]
  //   );

  //   const proposal = {
  //     flag: 0,
  //     account: user,
  //     data: selfTransferAction,
  //     details: "all hail baal",
  //     expiration: 0,
  //     baalGas: 0,
  //   };

  // console.log("pre-fetch DeVoxShamanSummoner");
  const shamanSummoner: DeVoxShamanSummoner = await ethers.getContract(
    ContractNames.DeVoxShamanSummoner
  );
  expect(shamanSummoner.address).to.be.properAddress;

  // console.log("pre-summon DeVoxShaman");
  const shaman: DeVoxShaman = await summonDeVoxShaman(
    shamanArgs,
    multisend,
    shamanSingleton,
    shamanSummoner,
    baal,
    tokenSingleton
  );
  console.log("summoned DeVoxShaman at: ", shaman.address);

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
