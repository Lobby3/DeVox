import { DeployFunction } from "hardhat-deploy/types";
import { HardhatRuntimeEnvironment } from "hardhat/types";

import { DeVoxBaalAdvTokenSummonerFactory } from "../src";
import { ContractNames, deployProxy, getContractAddress } from "../src/util";

const deploy: DeployFunction = async function (hre: HardhatRuntimeEnvironment) {
  const summoner = await getContractAddress(ContractNames.BaalSummoner, hre);

  const address = await deployProxy(
    ContractNames.DeVoxBaalAdvTokenSummoner,
    hre
  );

  if (!address) {
    throw new Error("Failed to deploy DeVoxBaalAdvTokenSummoner");
  }

  const proxy = DeVoxBaalAdvTokenSummonerFactory.connect(
    address,
    hre.ethers.provider.getSigner()
  );

  if ((await proxy._baalSummoner()) !== summoner) {
    await proxy.setSummonerAddr(summoner);
  }
};

export default deploy;
deploy.tags = [
  ContractNames.DeVoxBaalAdvTokenSummoner,
  "local",
  "staging",
  "production",
];
