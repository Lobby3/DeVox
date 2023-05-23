import { DeployFunction } from "hardhat-deploy/types";
import { HardhatRuntimeEnvironment } from "hardhat/types";

import { BaalAndVaultSummonerV1 } from "../src/types";
import { BaalAndVaultSummoner, BaalSummoner, deployProxy } from "../src/util";

const deploy: DeployFunction = async function (hre: HardhatRuntimeEnvironment) {
  const { deployments } = hre; // we get the deployments and getNamedAccounts which are provided by hardhat-deploy.
  const { get } = deployments; // The deployments field itself contains the deploy function.

  const { address } = await get(BaalSummoner);

  const proxy = (await deployProxy(
    BaalAndVaultSummoner,
    hre
  )) as BaalAndVaultSummonerV1;

  await proxy.setSummonerAddr(address);
};

export default deploy;
deploy.tags = [BaalAndVaultSummoner, "local", "staging"];
