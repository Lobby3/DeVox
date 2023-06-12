import { DeployFunction } from "hardhat-deploy/types";
import { HardhatRuntimeEnvironment } from "hardhat/types";

import { ContractNames, deployInstance, localOnly } from "../src/util";

const deploy: DeployFunction = async function (hre: HardhatRuntimeEnvironment) {
  await localOnly(hre, () => deployInstance(ContractNames.Baal, hre));
};

export default deploy;
deploy.tags = [ContractNames.Baal, "local"];
