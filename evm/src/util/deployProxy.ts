import { ethers } from "hardhat";
import { HardhatRuntimeEnvironment } from "hardhat/types";

import { Hardhat } from "./constants";

export const deployProxy = async (
  contractName: string,
  hre: HardhatRuntimeEnvironment,
  args?: unknown[]
) => {
  const { deployments } = hre; // we get the deployments and getNamedAccounts which are provided by hardhat-deploy.
  const { get, save } = deployments; // The deployments field itself contains the deploy function.

  try {
    const { address } = await get(contractName);
    if (address && hre.network.name !== Hardhat) {
      console.log(`Already deployed ${contractName}`);
    }
    return address;
  } catch {
    const [deployer] = await ethers.getSigners();
    const { deploy } = deployments;
    const result = await deploy(contractName, {
      from: deployer.address,
      proxy: {
        proxyContract: "UUPS",
        execute: {
          init: {
            methodName: "initialize",
            args: args ?? [],
          },
        },
      },
      log: true,
    });

    const artifact = await deployments.getExtendedArtifact(contractName);
    const proxyDeployments = {
      address: result.address,
      ...artifact,
    };

    await save(contractName, proxyDeployments);

    return result.address;
  }
};
