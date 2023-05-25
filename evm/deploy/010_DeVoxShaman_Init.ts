import { DeployFunction } from "hardhat-deploy/types";
import { HardhatRuntimeEnvironment } from "hardhat/types";

import { ContractNames, deployInstance } from "../src/util";

const deploy: DeployFunction = async function (hre: HardhatRuntimeEnvironment) {
  const { deployments } = hre; // we get the deployments and getNamedAccounts which are provided by hardhat-deploy.
  const { get } = deployments; // The deployments field itself contains the deploy function.

  const baalDeployment = await get(ContractNames.Baal);
  const myTokenDeployment = await get(ContractNames.MyToken);
  const args = [
    baalDeployment.address,
    myTokenDeployment.address,
    0,
    process.env.DEFAULT_PRICE_PER_UNIT,
    process.env.DEFAULT_LOOT_PER_UNIT,
    process.env.DEFAULT_TARGET,
  ];

  await deployInstance(ContractNames.DeVoxShaman, hre);
  // await deployProxy(ContractNames.DeVoxShaman, hre, args);
};

export default deploy;
deploy.tags = [ContractNames.DeVoxShaman, "local", "staging"];
