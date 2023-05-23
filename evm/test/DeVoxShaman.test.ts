import {
  Baal,
  BaalSummoner,
  Loot,
  MultiSend,
  Shares,
} from "@daohaus/baal-contracts";
import { BigNumber, BigNumberish } from "@ethersproject/bignumber";
import { SignerWithAddress } from "@nomiclabs/hardhat-ethers/signers";
import { expect, use } from "chai";
import { solidity } from "ethereum-waffle";
import { ContractFactory, ContractTransaction } from "ethers";
import { ethers, upgrades } from "hardhat";

import {
  CompatibilityFallbackHandler,
  DeVoxShamanSummoner,
  DeVoxShaman,
  GnosisSafe,
  MyToken,
  Poster,
} from "../src";
import { encodeMultiAction } from "../src/util/encoding";

use(solidity);

type DeVoxShamanArgs = {
  moloch: string;
  token: string;
  pricePerUnit: BigNumberish;
  lootPerUnit: BigNumberish;
  sharesPerMember: BigNumberish;
  target: BigNumberish;
};

const DeVoxShamanName = "DeVoxShamanV1";
const DeVoxShamanSummonerName = "DeVoxShamanSummonerV1";
const zeroAddress = "0x0000000000000000000000000000000000000000";

const deploymentConfig = {
  GRACE_PERIOD_IN_SECONDS: 43200,
  VOTING_PERIOD_IN_SECONDS: 432000,
  PROPOSAL_OFFERING: 0,
  SPONSOR_THRESHOLD: 1,
  MIN_RETENTION_PERCENT: 0,
  MIN_STAKING_PERCENT: 0,
  QUORUM_PERCENT: 0,
  TOKEN_NAME: "Baal Shares",
  TOKEN_SYMBOL: "BAAL",
};

async function blockTime() {
  const block = await ethers.provider.getBlock("latest");
  return block.timestamp;
}

async function blockNumber() {
  const block = await ethers.provider.getBlock("latest");
  return block.number;
}

async function moveForwardPeriods(periods: number, extra?: number) {
  const goToTime =
    (await blockTime()) +
    defaultDAOSettings.VOTING_PERIOD_IN_SECONDS * periods +
    (extra ? extra : 0);
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
  deVoxShamanArgs: DeVoxShamanArgs,
  multisend: MultiSend,
  deVoxShamanSingleton: DeVoxShaman,
  deVoxShamanSummoner: DeVoxShamanSummoner,
  baal: Baal
) {
  const summondeVoxShaman = await deVoxShamanSummoner.summonDeVoxShaman(
    baal.address,
    deVoxShamanArgs.token,
    deVoxShamanArgs.pricePerUnit,
    deVoxShamanArgs.lootPerUnit,
    deVoxShamanArgs.sharesPerMember,
    deVoxShamanArgs.target
  );
  const result = await summondeVoxShaman.wait();
  const events = result.events!;
  const e = events[events.length - 1];
  // console.log("e", e);
  const shamanAddress = e.args?.shaman;
  const deVoxShaman = deVoxShamanSingleton.attach(shamanAddress);

  return shamanAddress;
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

const defaultDAOSettings = {
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

const metadataConfig = {
  CONTENT: '{"name":"test"}',
  TAG: "daohaus.summoner.daoProfile",
};

const abiCoder = ethers.utils.defaultAbiCoder;

type DAOSettings = {
  PROPOSAL_OFFERING: any;
  GRACE_PERIOD_IN_SECONDS: any;
  VOTING_PERIOD_IN_SECONDS: any;
  QUORUM_PERCENT: any;
  SPONSOR_THRESHOLD: any;
  MIN_RETENTION_PERCENT: any;
  MIN_STAKING_PERCENT: any;
  TOKEN_NAME: any;
  TOKEN_SYMBOL: any;
};

const getBaalParams = async function (
  baal: Baal,
  config: DAOSettings,
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
        zeroAddress, // safe addr
        trustedForwarder,
        lootAddr,
        sharesAddr,
      ]
    ),
    initalizationActions,
  };
};

describe("DeVoxShaman", function () {
  let baal: Baal;
  let lootSingleton: Loot;
  let poster: Poster;
  let LootFactory: ContractFactory;
  let sharesSingleton: Shares;
  let SharesFactory: ContractFactory;
  let Poster: ContractFactory;
  let ERC20: ContractFactory;
  let lootToken: Loot;
  let sharesToken: Shares;
  let applicantBaal: Baal;
  let multisend: MultiSend;
  let forwarder: string;

  let BaalFactory: ContractFactory;
  let baalSingleton: Baal;
  let baalSummoner: BaalSummoner;

  let s1Baal: Baal;
  let s2Baal: Baal;
  let s3Baal: Baal;
  let s4Baal: Baal;
  let s5Baal: Baal;
  let s6Baal: Baal;

  let applicant: SignerWithAddress;
  let summoner: SignerWithAddress;
  let s1: SignerWithAddress;
  let s2: SignerWithAddress;
  let s3: SignerWithAddress;
  let s4: SignerWithAddress;
  let s5: SignerWithAddress;
  let s6: SignerWithAddress;

  let token: MyToken;
  let applicantToken: MyToken;

  let gnosisSafeSingleton: GnosisSafe;
  let gnosisSafe: GnosisSafe;

  let deVoxShamanFactory: ContractFactory;
  let deVoxShamanSingleton: DeVoxShaman;
  let deVoxShamanSummonerFactory: ContractFactory;
  let deVoxShamanSummoner: DeVoxShamanSummoner;
  let deVoxShaman: DeVoxShaman;

  let proposal: { [key: string]: any };

  const loot = 500;
  const shares = 100;
  const sharesPaused = false;
  const lootPaused = false;

  const yes = true;
  const no = false;

  this.beforeAll(async function () {
    LootFactory = await ethers.getContractFactory("LootV1");
    lootSingleton = (await LootFactory.deploy()) as Loot;
    SharesFactory = await ethers.getContractFactory("SharesV1");
    sharesSingleton = (await SharesFactory.deploy()) as Shares;
    BaalFactory = await ethers.getContractFactory("BaalV1");
    baalSingleton = (await BaalFactory.deploy()) as Baal;
    Poster = await ethers.getContractFactory("Poster");
    poster = (await Poster.deploy()) as Poster;
    forwarder = "0x0000000000000000000000000000000000000420";
    deVoxShamanFactory = await ethers.getContractFactory(DeVoxShamanName);
    deVoxShamanSingleton = (await deVoxShamanFactory.deploy()) as DeVoxShaman;
    deVoxShamanSummonerFactory = await ethers.getContractFactory(
      DeVoxShamanSummonerName
    );
    deVoxShamanSummoner = (await deVoxShamanSummonerFactory.deploy(
      deVoxShamanSingleton.address
    )) as DeVoxShamanSummoner;
  });

  beforeEach(async function () {
    const BaalContract = await ethers.getContractFactory("BaalV1");
    const GnosisSafe = await ethers.getContractFactory("GnosisSafe");
    const BaalSummoner = await ethers.getContractFactory("BaalSummonerV1");

    const GnosisSafeProxyFactory = await ethers.getContractFactory(
      "GnosisSafeProxyFactory"
    );
    const ModuleProxyFactory = await ethers.getContractFactory(
      "ModuleProxyFactory"
    );

    const CompatibilityFallbackHandler = await ethers.getContractFactory(
      "CompatibilityFallbackHandler"
    );
    const MultisendContract = await ethers.getContractFactory("MultiSend");
    [summoner, applicant, s1, s2, s3, s4, s5, s6] = await ethers.getSigners();

    ERC20 = await ethers.getContractFactory("MyToken");
    token = (await ERC20.deploy(
      ethers.utils.parseUnits("100000000.0", "ether")
    )) as MyToken;
    applicantToken = token.connect(applicant);

    await token.transfer(
      applicant.address,
      ethers.utils.parseUnits("10.0", "ether")
    );
    await token.transfer(
      s2.address,
      ethers.utils.parseUnits("10000.0", "ether")
    );

    multisend = (await MultisendContract.deploy()) as MultiSend;
    gnosisSafeSingleton = (await GnosisSafe.deploy()) as GnosisSafe;
    const handler =
      (await CompatibilityFallbackHandler.deploy()) as CompatibilityFallbackHandler;

    const proxy = await GnosisSafeProxyFactory.deploy();
    const moduleProxyFactory = await ModuleProxyFactory.deploy();

    baalSummoner = (await upgrades.deployProxy(BaalSummoner)) as BaalSummoner;
    await baalSummoner.deployed();
    // set addresses of templates and libraries
    await baalSummoner.setAddrs(
      baalSingleton.address,
      gnosisSafeSingleton.address,
      handler.address,
      multisend.address,
      proxy.address,
      moduleProxyFactory.address,
      lootSingleton.address,
      sharesSingleton.address
    );

    const encodedInitParams = await getBaalParams(
      baalSingleton,
      deploymentConfig,
      [sharesPaused, lootPaused],
      [[summoner.address], [shares]],
      [[summoner.address], [loot]],
      forwarder,
      zeroAddress,
      zeroAddress
    );

    const tx = await baalSummoner.summonBaal(
      encodedInitParams.initParams,
      encodedInitParams.initalizationActions,
      101
    );
    const addresses = await getNewBaalAddresses(tx);

    baal = BaalFactory.attach(addresses.baal) as Baal;
    gnosisSafe = BaalFactory.attach(addresses.safe) as GnosisSafe;
    applicantBaal = baal.connect(applicant);
    s1Baal = baal.connect(s1);
    s2Baal = baal.connect(s2);
    s3Baal = baal.connect(s3);
    s4Baal = baal.connect(s4);
    s5Baal = baal.connect(s5);
    s6Baal = baal.connect(s6);

    const lootTokenAddress = await baal.lootToken();

    lootToken = LootFactory.attach(lootTokenAddress) as Loot;

    const sharesTokenAddress = await baal.sharesToken();

    sharesToken = SharesFactory.attach(sharesTokenAddress) as Shares;

    const selfTransferAction = encodeMultiAction(
      multisend,
      ["0x"],
      [baal.address],
      [BigNumber.from(0)],
      [0]
    );

    proposal = {
      flag: 0,
      account: applicant.address,
      data: selfTransferAction,
      details: "all hail baal",
      expiration: 0,
      baalGas: 0,
    };
  });

  describe("DeVoxShaman", function () {
    it("mint shares & loot on donate", async function () {
      const deVoxShamanArgs: DeVoxShamanArgs = {
        moloch: baal.address,
        token: token.address,
        pricePerUnit: ethers.utils.parseUnits("1.0", "ether"),
        lootPerUnit: ethers.utils.parseUnits("1.0", "ether"),
        sharesPerMember: 1,
        target: 1000000,
      };

      let deVoxShamanAddress = await summonDeVoxShaman(
        deVoxShamanArgs,
        multisend,
        deVoxShamanSingleton,
        deVoxShamanSummoner,
        baal
      );
      const id = await setShamanProposal(
        baal,
        multisend,
        deVoxShamanAddress,
        7
      );

      deVoxShaman = deVoxShamanSingleton.attach(deVoxShamanAddress);
      const applicantdeVoxShaman = deVoxShaman.connect(s2);
      const applicantToken = token.connect(s2);

      const testDonate = async (donation: string) => {
        const amount = ethers.utils.parseUnits(donation, "ether");
        await applicantToken.approve(deVoxShamanAddress, amount);

        const s2BalanceBefore = await token.balanceOf(s2.address);
        const s2SharesBefore = await sharesToken.balanceOf(s2.address);
        const s2LootBefore = await lootToken.balanceOf(s2.address);
        const baalTotalLootBefore = await baal.totalLoot();
        const baalTotalSharesBefore = await baal.totalShares();

        await applicantdeVoxShaman.donate(amount, "hello");

        const s2BalanceAfter = await token.balanceOf(s2.address);
        const s2LootAfter = await lootToken.balanceOf(s2.address);
        const s2SharesAfter = await sharesToken.balanceOf(s2.address);
        const baalTotalLootAfter = await baal.totalLoot();
        const baalTotalSharesAfter = await baal.totalShares();

        const newLoot = BigNumber.from(donation).mul(
          deVoxShamanArgs.lootPerUnit
        );

        expect(s2LootAfter).to.equal(s2LootBefore.add(newLoot), "s2LootAfter"); // receive lootPerUnit per token donated
        expect(s2SharesAfter).to.equal(
          deVoxShamanArgs.sharesPerMember,
          "s2SharesAfter"
        ); // should only receive sharesPerMember on first donation
        expect(s2BalanceAfter).to.equal(
          s2BalanceBefore.sub(amount),
          "s2BalanceAfter"
        );
        expect(baalTotalLootAfter).to.equal(
          baalTotalLootBefore.add(newLoot),
          "baalTotalSharesAfter"
        );
        expect(baalTotalSharesAfter).to.equal(
          baalTotalSharesBefore.add(s2SharesAfter.sub(s2SharesBefore)),
          "baalTotalSharesAfter"
        );
      };

      await testDonate("1");

      await testDonate("10");

      await testDonate("1000");
    });
  });
});
