import { expect, use } from "chai";
import { solidity } from "ethereum-waffle";
import { BigNumber } from "ethers";
import { ethers } from "hardhat";

import { ContractNames, sqrt } from "../src/util";
import setupTest, { defaultSummonArgs } from "./setup";

use(solidity);

describe(ContractNames.DeVoxShaman, function () {
  it("should deploy with correct parameters", async function () {
    const {
      default: { shaman },
    } = await setupTest({ shamanArgs: defaultSummonArgs });

    const { pricePerUnit, tokensPerUnit, target } = defaultSummonArgs;

    console.log("shaman.address: ", shaman.address);

    const shamanPricePerUnit = await shaman.pricePerUnit();
    expect(shamanPricePerUnit).to.equal(pricePerUnit, "pricePerUnit!");

    const shamanTarget = await shaman.target();
    expect(shamanTarget).to.equal(target, "target!");

    const shamanTokensPerUnit = await shaman.tokensPerUnit();
    expect(shamanTokensPerUnit).to.equal(tokensPerUnit, "tokensPerUnit!");
  });

  it("should mint shares & loot on donate", async function () {
    const {
      deployer: { token: deployerToken },
      user: { address: userAddress, baal, loot, shaman, shares, token },
    } = await setupTest({ shamanArgs: defaultSummonArgs });

    const { pricePerUnit, tokensPerUnit, target } = defaultSummonArgs;

    await deployerToken.transfer(
      userAddress,
      ethers.utils.parseUnits("10000.0", "ether")
    );

    console.log("shaman.address: ", shaman.address);

    const testDonate = async (donation: string) => {
      const amount = ethers.utils.parseUnits(donation, "ether");
      await token.approve(shaman.address, amount);

      const userBalanceBefore = await token.balanceOf(userAddress);
      const userSharesBefore = await shares.balanceOf(userAddress);
      const userLootBefore = await loot.balanceOf(userAddress);
      const remainingBefore = BigNumber.from(target).sub(userLootBefore);
      const baalTotalLootBefore = await baal.totalLoot();
      const baalTotalSharesBefore = await baal.totalShares();
      const newLoot = amount.div(pricePerUnit).mul(tokensPerUnit);
      const newShares = sqrt(amount).div(pricePerUnit).mul(tokensPerUnit);
      const msg = "hello";

      await expect(shaman.donate(amount, msg))
        .to.emit(shaman, "DonationReceived")
        .withArgs(
          userAddress,
          baal.address,
          1, // devoxShamanId,
          amount,
          amount,
          target,
          remainingBefore.sub(amount),
          newLoot,
          newShares,
          msg
        );

      const userBalanceAfter = await token.balanceOf(userAddress);
      const userLootAfter = await loot.balanceOf(userAddress);
      const userSharesAfter = await shares.balanceOf(userAddress);
      const baalTotalLootAfter = await baal.totalLoot();
      const baalTotalSharesAfter = await baal.totalShares();

      expect(userLootAfter).to.equal(
        userLootBefore.add(newLoot),
        "s2LootAfter"
      ); // donation * tokensPerUnit Loots
      expect(userSharesAfter).to.equal(
        userSharesBefore.add(newShares),
        "s2SharesAfter"
      ); // sqrt(donation) * tokensPerUnit Shares
      expect(userBalanceAfter).to.equal(
        userBalanceBefore.sub(amount),
        "s2BalanceAfter"
      );
      expect(baalTotalLootAfter).to.equal(
        baalTotalLootBefore.add(newLoot),
        "baalTotalSharesAfter"
      );
      expect(baalTotalSharesAfter).to.equal(
        baalTotalSharesBefore.add(userSharesAfter.sub(userSharesBefore)),
        "baalTotalSharesAfter"
      );
    };

    await testDonate("1");

    // await testDonate("100");

    // await testDonate("10000");
  });
});
