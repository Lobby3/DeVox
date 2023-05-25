import { DeployFunction } from "hardhat-deploy/types";
import { HardhatRuntimeEnvironment } from "hardhat/types";

import { ContractNames, deployInstance } from "../src/util";

const deploy: DeployFunction = async function (hre: HardhatRuntimeEnvironment) {
  await deployInstance(ContractNames.Shares, hre);
};

export default deploy;
deploy.tags = [ContractNames.Shares, "local", "staging"];
