import { CONTRACT_KEYCHAINS } from "@daohaus/keychain-utils";
import { HardhatRuntimeEnvironment } from "hardhat/types";

import { getChainIdHex } from "./chainId";
import { ContractName, ContractNames } from "./constants";
import { isLocal } from "./local";

export const getContractAddress = async (
  name: ContractName,
  hre: HardhatRuntimeEnvironment
) => {
  const { deployments } = hre; // we get the deployments and getNamedAccounts which are provided by hardhat-deploy.
  const { get } = deployments; // The deployments field itself contains the deploy function.

  if (isLocal(hre)) {
    const { address } = await get(name);
    return address;
  }

  const chainIdHex = await getChainIdHex();
  const address = keychain()[chainIdHex];
  if (!address)
    throw new Error(`${name} deployment for chainId ${chainIdHex} not found!`);

  return address;

  function keychain() {
    switch (name) {
      case ContractNames.BaalSummoner:
        return CONTRACT_KEYCHAINS.V3_FACTORY_ORIGINAL;
      case ContractNames.BaalAdvTokenSummoner:
        return CONTRACT_KEYCHAINS.V3_FACTORY_ADV_TOKEN;
      default:
        throw new Error(`Unsupported contract name: ${name}`);
    }
  }
};
