import { DeployFunction } from "hardhat-deploy/types";
import { HardhatRuntimeEnvironment } from "hardhat/types";

import { ContractNames, deployProxy } from "../src/util";

const deploy: DeployFunction = async function (hre: HardhatRuntimeEnvironment) {
  const { deployments } = hre; // we get the deployments and getNamedAccounts which are provided by hardhat-deploy.
  const { get } = deployments; // The deployments field itself contains the deploy function.

  const baalSummonerDeployment = await get(ContractNames.BaalSummoner);
  const shamanSummonerDeployment = await get(ContractNames.DeVoxShamanSummoner);
  const args = [baalSummonerDeployment.address, shamanSummonerDeployment.address];

  await deployProxy(ContractNames.DeVoxBaalAndShamanSummoner, hre, args);
};

export default deploy;
deploy.tags = [ContractNames.DeVoxBaalAndShamanSummoner, "local", "staging"];
