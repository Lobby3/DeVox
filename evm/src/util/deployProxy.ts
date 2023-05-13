import { ethers, upgrades } from "hardhat";
import { HardhatRuntimeEnvironment } from "hardhat/types";

import { Hardhat } from "./constants";

export const deployProxy = async (
  contractName: string,
  hre: HardhatRuntimeEnvironment,
  args?: unknown[]
) => {
  const { deployments } = hre; // we get the deployments and getNamedAccounts which are provided by hardhat-deploy.
  const { save, get } = deployments; // The deployments field itself contains the deploy function.

  try {
    const exists = await get(contractName);
    if (exists && hre.network.name !== Hardhat) {
      console.log(`Already deployed ${contractName}`);
    }
  } catch {
    const factory = await ethers.getContractFactory(contractName);
    const proxy = await upgrades.deployProxy(factory, args, {
      kind: "uups",
    });
    
    console.log(`Deployed ${contractName} + proxy at: ${proxy.address}`);

    const artifact = await deployments.getExtendedArtifact(contractName);
    const proxyDeployments = {
      address: proxy.address,
      ...artifact,
    };

    await save(contractName, proxyDeployments);
  }
};
