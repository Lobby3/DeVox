import { DeployFunction } from "hardhat-deploy/types";
import { HardhatRuntimeEnvironment } from "hardhat/types";

import { MyToken, deployInstance } from "../src/util";

const deploy: DeployFunction = async function (hre: HardhatRuntimeEnvironment) {
  await deployInstance(MyToken, hre, [process.env.MYTOKEN_INITIAL_SUPPLY]);
};

export default deploy;
deploy.tags = [MyToken, "local", "staging"];
