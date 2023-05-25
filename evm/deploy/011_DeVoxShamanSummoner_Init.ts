import { DeployFunction } from "hardhat-deploy/types";
import { HardhatRuntimeEnvironment } from "hardhat/types";

import { ContractNames, deployProxy } from "../src/util";

const deploy: DeployFunction = async function (hre: HardhatRuntimeEnvironment) {
  const { deployments } = hre; // we get the deployments and getNamedAccounts which are provided by hardhat-deploy.
  const { get } = deployments; // The deployments field itself contains the deploy function.

  const shamanDeployment = await get(ContractNames.DeVoxShaman);
  const args = [shamanDeployment.address];

  await deployProxy(ContractNames.DeVoxShamanSummoner, hre, args);
};

export default deploy;
deploy.tags = [ContractNames.DeVoxShamanSummoner, "local", "staging"];
