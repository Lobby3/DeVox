import { DeployFunction } from "hardhat-deploy/types";
import { HardhatRuntimeEnvironment } from "hardhat/types";

import { Baal, DeVoxShaman, MyToken, deployProxy } from "../src/util";

const deploy: DeployFunction = async function (hre: HardhatRuntimeEnvironment) {
  /* args:
   *
   *     address _moloch,
   *     address payable _token,
   *     uint256 _pricePerUnit,
   *     uint256 _lootPerUnit,
   *     uint256 _sharesPerMember,
   *     uint256 _target
   */

  const { deployments } = hre; // we get the deployments and getNamedAccounts which are provided by hardhat-deploy.
  const { get } = deployments; // The deployments field itself contains the deploy function.

  const baalDeployment = await get(Baal);
  const myTokenDeployment = await get(MyToken);
  const args = [
    baalDeployment.address,
    myTokenDeployment.address,
    process.env.DEFAULT_PRICE_PER_UNIT,
    process.env.DEFAULT_LOOT_PER_UNIT,
    process.env.DEFAULT_SHARES_PER_MEMBER,
    process.env.DEFAULT_TARGET,
  ];

  await deployProxy(DeVoxShaman, hre, args);
};

export default deploy;
deploy.tags = [DeVoxShaman, "local", "staging"];
