import { ethers, upgrades } from "hardhat";
import { DeployFunction } from "hardhat-deploy/types";
import { HardhatRuntimeEnvironment } from "hardhat/types";

const deploy: DeployFunction = async function (hre: HardhatRuntimeEnvironment) {
  const { deployments } = hre; // we get the deployments and getNamedAccounts which are provided by hardhat-deploy.
  const { save, get } = deployments; // The deployments field itself contains the deploy function.

  try {
    const exists = await get("DeVoxShaman");
    if (exists && hre.network.name !== "hardhat") {
      console.log("Already deployed DeVoxShaman");
    }
  } catch {
    const DeVoxShaman = await ethers.getContractFactory("DeVoxShamanV1");
    const proxy = await upgrades.deployProxy(DeVoxShaman, [], {
      kind: "uups",
    });
    console.log("Deployed DeVoxShaman + proxy: " + proxy.address);

    const artifact = await deployments.getExtendedArtifact("DeVoxShaman");
    const proxyDeployments = {
      address: proxy.address,
      ...artifact,
    };

    await save("DeVoxShaman", proxyDeployments);
  }
};

export default deploy;
deploy.tags = ["minter", "local", "staging", "svg"];
