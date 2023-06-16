import { DeployFunction } from "hardhat-deploy/types";
import { HardhatRuntimeEnvironment } from "hardhat/types";

import { BaalSummonerFactory } from "../src";
import { ContractNames, deployProxy } from "../src/util";
import { isLocal } from "../src/util/local";

const deploy: DeployFunction = async function (hre: HardhatRuntimeEnvironment) {
  if (!isLocal(hre)) return;

  const { deployments } = hre; // we get the deployments and getNamedAccounts which are provided by hardhat-deploy.
  const { get } = deployments; // The deployments field itself contains the deploy function.

  const { address: template } = await get(ContractNames.Baal);
  const { address: gnosisSingleton } = await get(ContractNames.Safe);
  const { address: gnosisFallbackLibrary } = await get(
    ContractNames.SafeFallbackHandler
  );
  const { address: gnosisMultisendLibrary } = await get(
    ContractNames.SafeMultiSend
  );
  const { address: gnosisSafeProxyFactory } = await get(
    ContractNames.SafeProxyFactory
  );
  const { address: moduleProxyFactory } = await get(
    ContractNames.ModuleProxyFactory
  );
  const { address: lootSingleton } = await get(ContractNames.Loot);
  const { address: sharesSingleton } = await get(ContractNames.Shares);

  const address = await deployProxy(ContractNames.BaalSummoner, hre);

  if (!address) {
    throw new Error("Failed to deploy BaalSummoner");
  }

  const proxy = BaalSummonerFactory.connect(
    address,
    hre.ethers.provider.getSigner()
  );

  await proxy.setAddrs(
    template,
    gnosisSingleton,
    gnosisFallbackLibrary,
    gnosisMultisendLibrary,
    gnosisSafeProxyFactory,
    moduleProxyFactory,
    lootSingleton,
    sharesSingleton
  );
};

export default deploy;
deploy.tags = [ContractNames.BaalSummoner, "local"];
