import { expect, use } from "chai";
import { solidity } from "ethereum-waffle";
import { ethers, upgrades } from "hardhat";

import { ContractNames } from "../src";
import { DeVoxShamanV1 } from "../src/types";
import setupTest from "./setup";

use(solidity);

const DEFAULT_ADMIN_ROLE =
  "0x0000000000000000000000000000000000000000000000000000000000000000";
const UPGRADER_ROLE = ethers.utils.id("UPGRADER_ROLE");
const DeVoxShaman_Upgrade = "DeVoxShamanV1";

describe(ContractNames.DeVoxShaman, function () {
  it("supports upgrader role", async function () {
    // arrange
    const { user, deployer, anon } = await setupTest();

    // assert
    expect(
      await anon.shaman.hasRole(UPGRADER_ROLE, deployer.address)
    ).to.be.false;
    expect(await anon.shaman.hasRole(UPGRADER_ROLE, user.address)).to.be.false;

    // act & assert
    await expect(
      user.shaman.grantRole(UPGRADER_ROLE, user.address)
    ).to.be.revertedWith(
      `AccessControl: account ${user.address.toLowerCase()} is missing role ${DEFAULT_ADMIN_ROLE}`
    );

    await expect(deployer.shaman.grantRole(UPGRADER_ROLE, user.address))
      .to.emit(deployer.shaman, "RoleGranted")
      .withArgs(UPGRADER_ROLE, user.address, deployer.address);
  });

  it("updates version number on update", async function () {
    // arrange
    const { deployer, anon } = await setupTest();
    const { forceImport, upgradeProxy } = upgrades;

    const DeVoxShamanV0Factory = await ethers.getContractFactory(
      ContractNames.DeVoxShaman
    );
    const DeVoxShamanV1Factory = await ethers.getContractFactory(
      DeVoxShaman_Upgrade
    );

    expect(await anon.shaman.version()).to.be.eq(0);

    deployer.shaman.grantRole(UPGRADER_ROLE, deployer.address);
    await forceImport(deployer.shaman.address, DeVoxShamanV0Factory);

    // act
    const upgrade = (await upgradeProxy(deployer.shaman, DeVoxShamanV1Factory, {
      call: "updateVersion",
    })) as DeVoxShamanV1;

    // assert
    expect(await anon.shaman.version()).to.be.eq(1);
    expect(await upgrade.version()).to.be.eq(1);
    expect(await upgrade.mockedUpgradeFunction()).to.be.true;
  });

  it("retains state after upgrade", async function () {
    // arrange
    const { deployer, anon, user } = await setupTest();
    const { forceImport, upgradeProxy } = upgrades;

    const amount = ethers.utils.parseUnits("1", "ether");
    await deployer.token.transfer(user.address, amount);
    await user.token.approve(anon.shaman.address, amount);
    await user.userRegistry.saveUser(
      user.address,
      ethers.utils.randomBytes(256)
    );
    await user.shaman.donate(amount, true, "hello");

    const DeVoxShamanV0Factory = await ethers.getContractFactory(
      ContractNames.DeVoxShaman
    );
    const DeVoxShamanV1Factory = await ethers.getContractFactory(
      DeVoxShaman_Upgrade
    );

    expect(await anon.shaman.version()).to.be.eq(0);

    deployer.shaman.grantRole(UPGRADER_ROLE, deployer.address);

    await forceImport(deployer.shaman.address, DeVoxShamanV0Factory);

    // act
    const upgrade = (await upgradeProxy(deployer.shaman, DeVoxShamanV1Factory, {
      call: "updateVersion",
    })) as DeVoxShamanV1;

    // assert
    expect(await upgrade.donations(user.address)).to.be.eq(amount);
  });
});
