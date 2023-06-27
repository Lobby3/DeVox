import { DeployFunction } from "hardhat-deploy/types";
import { HardhatRuntimeEnvironment } from "hardhat/types";

import { ContractNames, deployProxy } from "../src/util";

const deploy: DeployFunction = async function (hre: HardhatRuntimeEnvironment) {
  await deployProxy(ContractNames.DeVoxUserRegistry, hre);
};

export default deploy;
deploy.tags = [
  ContractNames.DeVoxUserRegistry,
  "local",
  "staging",
  "production",
];
