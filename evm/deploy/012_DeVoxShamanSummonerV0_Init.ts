import { DeployFunction } from "hardhat-deploy/types";
import { HardhatRuntimeEnvironment } from "hardhat/types";

import { ContractNames, deployProxy } from "../src/util";

const deploy: DeployFunction = async function (hre: HardhatRuntimeEnvironment) {
  const { deployments } = hre;
  const { get } = deployments;

  const shamanDeployment = await get(ContractNames.DeVoxShaman);
  const args = [shamanDeployment.address];

  await deployProxy(ContractNames.DeVoxShamanSummoner, hre, args);
};

export default deploy;
deploy.tags = [
  ContractNames.DeVoxShamanSummoner,
  "local",
  "staging",
  "production",
];
