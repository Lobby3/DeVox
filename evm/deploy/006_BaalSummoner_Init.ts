import { DeployFunction } from "hardhat-deploy/types";
import { HardhatRuntimeEnvironment } from "hardhat/types";
import { BaalSummoner, deployInstance } from "../src/util";

const deploy: DeployFunction = async function (hre: HardhatRuntimeEnvironment) {
  await deployInstance(BaalSummoner, hre);
};

export default deploy;
deploy.tags = [BaalSummoner, "local", "staging"];
