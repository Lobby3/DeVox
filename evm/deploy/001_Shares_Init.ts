import { DeployFunction } from "hardhat-deploy/types";
import { HardhatRuntimeEnvironment } from "hardhat/types";

import { ContractNames, deployInstance, localOnly } from "../src/util";

const deploy: DeployFunction = async function (hre: HardhatRuntimeEnvironment) {
  await localOnly(hre, () => deployInstance(ContractNames.Shares, hre));
};

export default deploy;
deploy.tags = [ContractNames.Shares, "local"];
