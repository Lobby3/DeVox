import { ethers } from "hardhat";
import { HardhatRuntimeEnvironment } from "hardhat/types";
import { Hardhat } from "./constants";

export const deployInstance = async (
  contractName: string,
  hre: HardhatRuntimeEnvironment,
  args?: any[]
) => {
  const { deployments } = hre; // we get the deployments and getNamedAccounts which are provided by hardhat-deploy.
  const { save, get } = deployments; // The deployments field itself contains the deploy function.

  try {
    const deployment = await get(contractName);
    if (deployment && hre.network.name !== Hardhat) {
      console.log(`Already deployed ${contractName}`);
    }
  } catch {
    const [deployer] = await ethers.getSigners();
    const { deploy } = deployments;

    const result = await deploy(contractName, {
      from: deployer.address,
      args,
      log: true
    });

    // const artifact = await deployments.getExtendedArtifact(contractName);
    // const instanceDeployments = {
    //   address: result.address,
    //   ...artifact,
    // };

    // await save(contractName, instanceDeployments);

    return result;
  }
};
