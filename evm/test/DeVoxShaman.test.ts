import { expect, use } from "chai";
import { solidity } from "ethereum-waffle";
import { BigNumber } from "ethers";
import { ethers } from "hardhat";

import { ContractNames, sqrt } from "../src/util";
import setupTest, { defaultSummonArgs } from "./setup";

use(solidity);

describe(ContractNames.DeVoxShaman, function () {
  it.only("should deploy with correct parameters", async function () {
    const {
      default: { shaman },
    } = await setupTest({ shamanArgs: defaultSummonArgs });

    const { pricePerUnit, tokensPerUnit, target } = defaultSummonArgs;

    const shamanPricePerUnit = await shaman.pricePerUnit();
    expect(shamanPricePerUnit).to.equal(pricePerUnit, "pricePerUnit!");

    const shamanTarget = await shaman.target();
    expect(shamanTarget).to.equal(target, "target!");

    const shamanTokensPerUnit = await shaman.tokensPerUnit();
    expect(shamanTokensPerUnit).to.equal(tokensPerUnit, "tokensPerUnit!");
  });

  it.only("should only allow whitelisted sender to donate", async function () {
    const {
      user: { shaman },
    } = await setupTest({ shamanArgs: defaultSummonArgs });

    const amount = ethers.utils.parseUnits("100", "ether");
    
    await expect(shaman.donate(amount, "hello")).to.be.revertedWith(
      "user not whitelisted"
    );
  });

  it.only("should mint shares on donate", async function () {
    const {
      deployer: { token: deployerToken, safe },
      user: { address: userAddress, baal, loot, shaman, shares, token },
    } = await setupTest({ shamanArgs: defaultSummonArgs });

    const { pricePerUnit, tokensPerUnit, target } = defaultSummonArgs;

    await shaman.whitelist(true, ethers.utils.randomBytes(256));

    let total = BigNumber.from(0);

    const testDonate = async (donation: string) => {
      const amount = ethers.utils.parseUnits(donation, "ether");
      await deployerToken.transfer(userAddress, amount);
      await token.approve(shaman.address, amount);

      const userBalanceBefore = await token.balanceOf(userAddress);
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
});
