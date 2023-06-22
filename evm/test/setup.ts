import { LOCAL_ABI } from "@daohaus/abis";
import {
  SummonParams,
  encodeMintParams,
  encodeTokenParams,
} from "@daohaus/contract-utils";
import {
  encodeFunction,
  encodeValues,
  getNonce,
  isNumberish,
  isString,
} from "@daohaus/utils";
import { expect } from "chai";
import { BigNumberish, ContractTransaction } from "ethers";
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

export type DeVoxShamanSummonArgs = {
  pricePerUnit: BigNumberish;
  tokensPerUnit: BigNumberish;
  target: BigNumberish;
  name: string;
};

export const defaultGovernanceSettings = (deployer: string) => {
  const dead = "0x000000000000000000000000000000000000dEaD";
  const deadLoot = 1000000000000000;

  return {
    members: {
      memberAddresses: [deployer, dead],
      memberShares: ["100", "0"],
      memberLoot: ["0", deadLoot.toString()],
    },
    tokenName: "MyToken",
    tokenSymbol: "MTKN",
    lootTokenName: "Loot",
    lootTokenSymbol: "LOOT",
    pauseVoteToken: false,
    pauseNvToken: false,
    votingTransferable: false,
    nvTransferable: false,
    votingPeriodInSeconds: 32768,
    gracePeriodInSeconds: 32768,
    sponsorThreshold: "1",
    newOffering: "1",
    quorum: "1",
    minRetention: "1",
  } as SummonParams;
};

export const defaultSummonArgs: DeVoxShamanSummonArgs = {
  pricePerUnit: "1000000",
  tokensPerUnit: "100",
  target: "100000",
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
  // eslint-disable-next-line @typescript-eslint/no-non-null-assertion
  const { shaman } = shamanSummonLog!.args;

  const baalSummonAbi =
    "event SummonBaal(address indexed baal, address indexed loot, address indexed shares, address safe, address forwarder, uint256 existingAddrs)";
  const baalSummonLog = tryFetchLogEvent(baalSummonAbi);
  // eslint-disable-next-line @typescript-eslint/no-non-null-assertion
  const { baal, loot, shares, safe } = baalSummonLog!.args;

  return { baal, shaman, loot, shares, safe };
};

const abiCoder = ethers.utils.defaultAbiCoder;

const governanceConfigTX = (formValues: SummonParams) => {
  const {
    votingPeriodInSeconds,
    gracePeriodInSeconds,
    newOffering,
    quorum,
    sponsorThreshold,
    minRetention,
  } = formValues;

  if (
    !isNumberish(votingPeriodInSeconds) ||
    !isNumberish(gracePeriodInSeconds) ||
    !isNumberish(newOffering) ||
    !isNumberish(quorum) ||
    !isNumberish(sponsorThreshold) ||
    !isNumberish(minRetention)
  ) {
    throw new Error(
      "governanceConfigTX recieved arguments in the wrong shape or type"
    );
  }

  const encodedValues = encodeValues(
    ["uint32", "uint32", "uint256", "uint256", "uint256", "uint256"],
    [
      votingPeriodInSeconds,
      gracePeriodInSeconds,
      newOffering,
      quorum,
      sponsorThreshold,
      minRetention,
    ]
  );
  const encoded = encodeFunction(LOCAL_ABI.BAAL, "setGovernanceConfig", [
    encodedValues,
  ]);
  if (isString(encoded)) {
    return encoded;
  }
  throw new Error("Encoding Error");
};

const getShamanInitParams = function (
  tokenAddress: string,
  shamanArgs: DeVoxShamanSummonArgs,
  admins: string[]
) {
  return abiCoder.encode(
    ["address", "uint256", "uint256", "uint256", "string", "address[]"],
    [
      tokenAddress,
      shamanArgs.pricePerUnit,
      shamanArgs.tokensPerUnit,
      shamanArgs.target,
      shamanArgs.name,
      admins
    ]
  );
};

const setupTest = deployments.createFixture<
  AddressedUserContractSet,
  {
    summonParams?: SummonParams;
    shamanArgs?: DeVoxShamanSummonArgs;
  }
>(async ({ deployments, getNamedAccounts, ethers }, args) => {
  await deployments.fixture(); // ensure you start from a fresh deployments
  const { deployer, user, anon } = await getNamedAccounts();
  const {
    summonParams = defaultGovernanceSettings(deployer),
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
      1,
      [deployer]
    )
  ).to.be.revertedWith("Initializable: contract is already initialized");

  const safeSingleton: GnosisSafe = await ethers.getContract(
    ContractNames.Safe
  );
  expect(safeSingleton.address).to.be.properAddress;

  const mintParams = encodeMintParams(summonParams);
  const tokenParams = encodeTokenParams(summonParams);

  const baalInitActions = [governanceConfigTX(summonParams)];

  const encodedShamanInitParams = getShamanInitParams(
    tokenSingleton.address,
    shamanArgs,
    [deployer]
  );

  const tx = await summoner.summonBaalAndShaman(
    getNonce(),
    mintParams,
    tokenParams,
    baalInitActions,
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
