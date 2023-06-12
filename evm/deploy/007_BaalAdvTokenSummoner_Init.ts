import { DeployFunction } from "hardhat-deploy/types";
import { HardhatRuntimeEnvironment } from "hardhat/types";

import { BaalAdvTokenSummonerFactory } from "../src";
import { ContractNames, deployProxy, getContractAddress } from "../src/util";

const deploy: DeployFunction = async function (hre: HardhatRuntimeEnvironment) {
  const { deployments } = hre; // we get the deployments and getNamedAccounts which are provided by hardhat-deploy.
  const { get } = deployments; // The deployments field itself contains the deploy function.

  const summoner = await getContractAddress(ContractNames.BaalSummoner, hre);

  const address = await deployProxy(ContractNames.BaalAdvTokenSummoner, hre);

  if (!address) {
    throw new Error("Failed to deploy BaalAdvTokenSummoner");
  }

  const proxy = BaalAdvTokenSummonerFactory.connect(
    address,
    hre.ethers.provider.getSigner()
  );

  if ((await proxy._baalSummoner()) !== summoner) {
    await proxy.setSummonerAddr(summoner);
  }
};

export default deploy;
deploy.tags = [
  ContractNames.BaalAdvTokenSummoner,
  "local",
  "staging",
  "production",
];
