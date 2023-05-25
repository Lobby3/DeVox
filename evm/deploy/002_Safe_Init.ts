import { DeployFunction } from "hardhat-deploy/types";
import { HardhatRuntimeEnvironment } from "hardhat/types";

import { ContractNames, deployInstance, deployProxy } from "../src/util";

const deploy: DeployFunction = async function (hre: HardhatRuntimeEnvironment) {
  await deployInstance(ContractNames.ModuleProxyFactory, hre);
  await deployInstance(ContractNames.Safe, hre);
  await deployInstance(ContractNames.SafeFallbackHandler, hre);
  await deployInstance(ContractNames.SafeMultiSend, hre);
  await deployInstance(ContractNames.SafeProxyFactory, hre);
};

export default deploy;
deploy.tags = [
  ContractNames.ModuleProxyFactory,
  ContractNames.Safe,
  ContractNames.SafeFallbackHandler,
  ContractNames.SafeMultiSend,
  ContractNames.SafeProxyFactory,
  "local",
  "staging",
];
