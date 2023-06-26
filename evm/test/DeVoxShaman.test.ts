import { expect, use } from "chai";
import { solidity } from "ethereum-waffle";
import { BigNumber } from "ethers";
import { ethers } from "hardhat";

import { ContractNames, PROPOSAL_STATE, encodeMultiAction, sqrt } from "../src";
import setupTest, { defaultSummonArgs } from "./setup";

use(solidity);

const DEFAULT_ADMIN_ROLE =
  "0x0000000000000000000000000000000000000000000000000000000000000000";

describe(ContractNames.DeVoxShaman, function () {
  it("should deploy with correct parameters", async function () {
    // arrange
    const {
      default: { baal, shaman, token },
    } = await setupTest({ shamanArgs: defaultSummonArgs });

    const { pricePerUnit, tokensPerUnit, target } = defaultSummonArgs;

    // act & assert
    expect(await shaman.baal()).to.equal(baal.address, "baal!");
    expect(await shaman.token()).to.equal(token.address, "token!");

    const shamanPricePerUnit = await shaman.pricePerUnit();
    expect(shamanPricePerUnit).to.equal(pricePerUnit, "pricePerUnit!");

    const shamanTarget = await shaman.target();
    expect(shamanTarget).to.equal(target, "target!");

    const shamanTokensPerUnit = await shaman.tokensPerUnit();
    expect(shamanTokensPerUnit).to.equal(tokensPerUnit, "tokensPerUnit!");
  });

  it("should have zero initial token balance", async function () {
    // arrange
    const {
      default: { baal, token },
    } = await setupTest({ shamanArgs: defaultSummonArgs });

    // act
    const safeAddress = await baal.target();
    const balance = await token.balanceOf(safeAddress);

    // assert
    expect(safeAddress).to.be.properAddress;
    expect(balance).to.be.eq(0);
  });

  it("donate: should only allow whitelisted sender", async function () {
    // arrange
    const {
      user: { shaman },
    } = await setupTest({ shamanArgs: defaultSummonArgs });

    const amount = ethers.utils.parseUnits("100", "ether");

    // act & assert
    await expect(shaman.donate(amount, "hello")).to.be.revertedWith(
      "donate: sender not whitelisted"
    );
  });

  it("donate: should mint shares", async function () {
    // arrange
    const {
      deployer: { token: deployerToken },
      user: { address: userAddress, baal, loot, shaman, shares, token },
    } = await setupTest({ shamanArgs: defaultSummonArgs });

    const { pricePerUnit, tokensPerUnit, target } = defaultSummonArgs;

    await shaman.whitelist(true, ethers.utils.randomBytes(256));

    let total = BigNumber.from(0);

    const testDonate = async (donation: string) => {
      const amount = BigNumber.from(donation).mul(1000000);
      await deployerToken.transfer(userAddress, amount);

      const userBalanceBefore = await token.balanceOf(userAddress);
      expect(userBalanceBefore).to.equal(amount, "userBalanceBefore!");
      const userSharesBefore = await shares.balanceOf(userAddress);
      const userLootBefore = await loot.balanceOf(userAddress);
      const baalTotalLootBefore = await baal.totalLoot();
      const baalTotalSharesBefore = await baal.totalShares();
      const newLoot = 0;
      const sqrtAmount = sqrt(amount);
      expect(sqrtAmount.mul(sqrtAmount)).to.equal(amount, "sqrt(amount)");
      const newShares = sqrt(amount.div(pricePerUnit)).mul(tokensPerUnit);
      const msg = "hello";

      total = total.add(amount);

      await token.approve(shaman.address, amount);
      expect(await token.allowance(userAddress, shaman.address)).to.equal(
        amount,
        "allowance!"
      );

      // act & assert
      await expect(shaman.donate(amount, msg))
        .to.emit(shaman, "DonationReceived")
        .withArgs(
          userAddress,
          baal.address,
          1, // devoxShamanId,
          amount,
          total, // wallet total donated
          target,
          total, // campaign total donated
          newLoot,
          newShares,
          msg
        );

      const userBalanceAfter = await token.balanceOf(userAddress);
      const userLootAfter = await loot.balanceOf(userAddress);
      const userSharesAfter = await shares.balanceOf(userAddress);
      const baalTotalLootAfter = await baal.totalLoot();
      const baalTotalSharesAfter = await baal.totalShares();
      const campaignTotalDonated = await token.balanceOf(await baal.target());

      expect(userLootAfter).to.equal(userLootBefore.add(newLoot), "loot!"); // zero
      expect(userSharesAfter).to.equal(
        userSharesBefore.add(newShares),
        "shares!"
      ); // sqrt(donation) * tokensPerUnit Shares
      expect(userBalanceAfter).to.equal(
        userBalanceBefore.sub(amount),
        "balance!"
      );
      expect(baalTotalLootAfter).to.equal(
        baalTotalLootBefore.add(newLoot),
        "baalTotalLoot!"
      );
      expect(baalTotalSharesAfter).to.equal(
        baalTotalSharesBefore.add(userSharesAfter.sub(userSharesBefore)),
        "baalTotalShares!"
      );
      expect(campaignTotalDonated).to.equal(total, "campaignTotalDonated!");
    };

    await testDonate("1");

    await testDonate("100");

    await testDonate("10000");
  });

  it("should not allow ragequit of funds", async function () {
    // arrange
    const {
      deployer: { token: deployerToken, safe },
      user: { address: userAddress, baal, loot, shaman, shares, token },
    } = await setupTest({ shamanArgs: defaultSummonArgs });
    const amount = ethers.utils.parseUnits("1", "ether");
    await deployerToken.transfer(userAddress, amount);
    await token.approve(shaman.address, amount);
    await shaman.whitelist(true, ethers.utils.randomBytes(256));
    await shaman.donate(amount, "hello");
    const lootBefore = await loot.balanceOf(userAddress);
    const sharesBefore = await shares.balanceOf(userAddress);
    const safeTokenBefore = await token.balanceOf(safe.address);

    // act
    await baal.ragequit(userAddress, sharesBefore, lootBefore, [token.address]);

    // assert
    const sharesAfter = await shares.balanceOf(userAddress);
    const lootAfter = await loot.balanceOf(userAddress);
    const safeTokenAfter = await token.balanceOf(safe.address);
    expect(lootAfter).to.equal(0, "loot!");
    expect(sharesAfter).to.equal(0, "shares!");
    const fac = 1000000000;
    expect(
      safeTokenAfter.mul(fac).div(safeTokenBefore).toNumber() / fac
    ).to.be.greaterThanOrEqual(0.999999999, "safeToken!");
  });

  it("setTarget: should allow admin user", async function () {
    // arrange
    const {
      deployer: { shaman },
    } = await setupTest({ shamanArgs: defaultSummonArgs });

    const newTarget = BigNumber.from("123456789");
    expect(await shaman.target()).to.not.equal(
      newTarget,
      "==newTarget before!"
    );

    // act
    await shaman.setTarget(newTarget);

    // assert
    expect(await shaman.target()).to.equal(newTarget, "!=newTarget after!");
  });

  it("setTarget: should not allow non-admin user", async function () {
    // arrange
    const {
      user: { address: userAddress, shaman },
    } = await setupTest({ shamanArgs: defaultSummonArgs });
    // arrange
    const target = await shaman.target();
    const newTarget = BigNumber.from("123456789");
    expect(target).to.not.equal(newTarget, "target before!");

    // act
    await expect(shaman.setTarget(newTarget)).to.be.revertedWith(
      `AccessControl: account ${userAddress.toLowerCase()} is missing role ${DEFAULT_ADMIN_ROLE}`
    );

    // assert
    expect(await shaman.target()).to.equal(target, "target after!");
  });

  it("cancelProposal: should allow admin user to cancel proposal", async function () {
    // arrange
    const {
      deployer: { address, baal, multisend, safe, shaman: deployerShaman },
      user: { address: userAddress, shaman },
    } = await setupTest({ shamanArgs: defaultSummonArgs });

    await deployerShaman.setAdmin(userAddress);

    const encodedAction = encodeMultiAction(
      multisend,
      ["0x"],
      [safe.address],
      [BigNumber.from(0)],
      [0]
    );

    const proposal = {
      flag: 0,
      account: address,
      data: encodedAction,
      details: "all hail baal",
      expiration: 0,
      baalGas: 0,
    };

    await baal.submitProposal(
      encodedAction,
      proposal.expiration,
      proposal.baalGas,
      ethers.utils.id(proposal.details)
    );

    // act
    await shaman.cancelProposal(1); // cancel as gov shaman

    // assert
    const state = await baal.state(1);
    expect(state).to.equal(PROPOSAL_STATE.CANCELLED);
  });

  it("cancelProposal: should not allow non-admin user to cancel proposal", async function () {
    // arrange
    const {
      deployer: { address, baal, multisend, safe },
      user: { address: userAddress, shaman: userShaman },
    } = await setupTest({ shamanArgs: defaultSummonArgs });

    const encodedAction = encodeMultiAction(
      multisend,
      ["0x"],
      [safe.address],
      [BigNumber.from(0)],
      [0]
    );

    const proposal = {
      flag: 0,
      account: address,
      data: encodedAction,
      details: "all hail baal",
      expiration: 0,
      baalGas: 0,
    };

    await baal.submitProposal(
      encodedAction,
      proposal.expiration,
      proposal.baalGas,
      ethers.utils.id(proposal.details)
    );

    // act
    await expect(userShaman.cancelProposal(1)).to.be.revertedWith(
      `AccessControl: account ${userAddress.toLowerCase()} is missing role ${DEFAULT_ADMIN_ROLE}`
    );

    // assert
    const state = await baal.state(1);
    expect(state).to.equal(PROPOSAL_STATE.VOTING);
  });
});
