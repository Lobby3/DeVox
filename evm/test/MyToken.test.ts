import { expect, use } from "chai";
import { solidity } from "ethereum-waffle";
import { BigNumber } from "ethers";

import { ContractNames } from "../src/util";
import setupTest, { defaultSummonArgs } from "./setup";

use(solidity);

describe(ContractNames.MyToken, function () {
  it.only("should deploy with correct parameters", async function () {
    // arrange
    const {
      deployer: { address, token },
    } = await setupTest({ shamanArgs: defaultSummonArgs });

    // act
    const balance = await token.balanceOf(address);

    // assert
    expect(balance).to.equal(process.env.MYTOKEN_INITIAL_SUPPLY);
  });

  it.only("should allow transfer", async function () {
    // arrange
    const {
      default: { token },
      deployer: { baal, token: deployerToken },
      user: { address: userAddress, token: userToken },
    } = await setupTest({ shamanArgs: defaultSummonArgs });
    const target = await baal.target();
    const amount = BigNumber.from("100000000");
    await deployerToken.transfer(userAddress, amount);
    await userToken.approve(userAddress, amount);

    // act
    await userToken.transferFrom(userAddress, target, amount);

    // assert
    expect(await token.balanceOf(target)).to.equal(amount);
  });
});
