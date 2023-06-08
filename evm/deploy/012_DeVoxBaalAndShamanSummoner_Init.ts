import { CONTRACT_KEYCHAINS } from "@daohaus/keychain-utils";
import { DeployFunction } from "hardhat-deploy/types";
import { HardhatRuntimeEnvironment } from "hardhat/types";

import {
  ContractNames,
  deployProxy,
  getChainIdHex,
  isLocal,
} from "../src/util";

async function createArgs(hre: HardhatRuntimeEnvironment) {
  const { deployments } = hre; // we get the deployments and getNamedAccounts which are provided by hardhat-deploy.
  const { get } = deployments; // The deployments field itself contains the deploy function.

  const baalSummonerAddress = isLocal(hre)
    ? (await get(ContractNames.BaalSummoner)).address
    : CONTRACT_KEYCHAINS.V3_FACTORY_ORIGINAL[await getChainIdHex()];
  if (!baalSummonerAddress) throw new Error("BaalSummoner deployment not found!");

  const shamanSummonerAddress = (await get(ContractNames.DeVoxShamanSummoner))
    .address;

  return [baalSummonerAddress, shamanSummonerAddress];
}

const deploy: DeployFunction = async function (hre: HardhatRuntimeEnvironment) {
  const args = await createArgs(hre);
  await deployProxy(ContractNames.DeVoxBaalAndShamanSummoner, hre, args);
};

export default deploy;
deploy.tags = [
  ContractNames.DeVoxBaalAndShamanSummoner,
  "local",
  "staging",
  "production",
];
