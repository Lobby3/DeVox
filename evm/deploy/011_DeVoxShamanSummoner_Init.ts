import { DeployFunction } from "hardhat-deploy/types";
import { HardhatRuntimeEnvironment } from "hardhat/types";

import { DeVoxShaman, DeVoxShamanSummoner, deployInstance } from "../src/util";

const deploy: DeployFunction = async function (hre: HardhatRuntimeEnvironment) {
  const { deployments } = hre; // we get the deployments and getNamedAccounts which are provided by hardhat-deploy.
  const { get } = deployments; // The deployments field itself contains the deploy function.

  const shamanDeployment = await get(DeVoxShaman);
  const args = [shamanDeployment.address];

  await deployInstance(DeVoxShamanSummoner, hre, args); // TODO: deployProxy
};

export default deploy;
deploy.tags = [DeVoxShamanSummoner, "local", "staging"];
