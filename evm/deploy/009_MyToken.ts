import { DeployFunction } from "hardhat-deploy/types";
import { HardhatRuntimeEnvironment } from "hardhat/types";

import { ContractNames, deployInstance, localOnly } from "../src/util";

// fake ERC20 token for testing - should not deploy in production
const deploy: DeployFunction = async function (hre: HardhatRuntimeEnvironment) {
  await localOnly(hre, () =>
    deployInstance(ContractNames.MyToken, hre, [
      process.env.MYTOKEN_INITIAL_SUPPLY,
    ])
  );
};

export default deploy;
deploy.tags = [ContractNames.MyToken, "local"];
