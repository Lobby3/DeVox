import { DeployFunction } from "hardhat-deploy/types";
import { HardhatRuntimeEnvironment } from "hardhat/types";

import { ContractNames, deployInstance, isLocal } from "../src/util";

const deploy: DeployFunction = async function (hre: HardhatRuntimeEnvironment) {
  if (!isLocal(hre)) return;

  await deployInstance(ContractNames.ModuleProxyFactory, hre);
  await deployInstance(ContractNames.MultiSend, hre);
  await deployInstance(ContractNames.Safe, hre);
  await deployInstance(ContractNames.SafeFallbackHandler, hre);
  await deployInstance(ContractNames.SafeProxyFactory, hre);
};

export default deploy;
deploy.tags = [
  ContractNames.ModuleProxyFactory,
  ContractNames.MultiSend,
  ContractNames.Safe,
  ContractNames.SafeFallbackHandler,
  ContractNames.SafeProxyFactory,
  "local",
];
