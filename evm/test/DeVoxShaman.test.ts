import { expect, use } from "chai";
import { solidity } from "ethereum-waffle";
import { BigNumber } from "ethers";
import { ethers } from "hardhat";

import { ContractNames, sqrt } from "../src/util";
import setupTest, { defaultSummonArgs } from "./setup";

use(solidity);

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

  it("should only allow whitelisted sender to donate", async function () {
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

  it("should mint shares on donate", async function () {
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
          1, // devoxShamanId
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

  it("should allow admin user to set target", async function () {
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

  it("should not allow non-admin user to set target", async function () {
    // arrange
    const {
      user: { shaman },
    } = await setupTest({ shamanArgs: defaultSummonArgs });

    const target = await shaman.target();
    const newTarget = BigNumber.from("123456789");
    expect(target).to.not.equal(newTarget, "target before!");

    // act
    await expect(shaman.setTarget(newTarget)).to.be.revertedWith(
      "AccessControl: account 0x70997970c51812dc3a010c7d01b50e0d17dc79c8 is missing role 0x0000000000000000000000000000000000000000000000000000000000000000"
    );

    // assert
    expect(await shaman.target()).to.equal(target, "target after!");
  });

  it("sign: should allow any whitelisted user to sign campaign", async function () {
    // arrange
    const {
      user: { address, baal, shaman },
    } = await setupTest({ shamanArgs: defaultSummonArgs });

    await shaman.whitelist(true, ethers.utils.randomBytes(256));

    // act
    await expect(shaman.sign()).to.emit(shaman, "UserSigned").withArgs(
      address,
      baal.address,
      1 // devoxShamanId;
    );

    // assert
    expect(await shaman.signatures(address)).to.equal(
      true,
      "signature missing!"
    );
  });

  it("sign: should not allow user to sign campaign more than once", async function () {
    // arrange
    const {
      user: { address, baal, shaman },
    } = await setupTest({ shamanArgs: defaultSummonArgs });

    await shaman.whitelist(true, ethers.utils.randomBytes(256));

    // act
    await expect(shaman.sign()).to.emit(shaman, "UserSigned").withArgs(
      address,
      baal.address,
      1 // devoxShamanId;
    );

    // assert
    await expect(shaman.sign()).to.be.revertedWith("sign: already signed");
  });

  it("sign: should reject non-whitelisted user", async function () {
    // arrange
    const {
      user: { shaman },
    } = await setupTest({ shamanArgs: defaultSummonArgs });

    // act & assert
    await expect(shaman.sign()).to.be.revertedWith("sign: not whitelisted");
  });
});
