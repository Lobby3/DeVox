import { ethers } from "hardhat";

import { networkCurrency, networkName } from "./constants";
import { logDeployment } from "./logUtils";

// Test Deploy Values

async function main() {
  const [deployer] = await ethers.getSigners();
  const address = await deployer.getAddress();
  const chainId = await deployer.getChainId();
  console.log("Summoning tribute minion on network:", networkName[chainId]);
  console.log("Account address:", address);
  console.log(
    "Account balance:",
    ethers.utils.formatEther(await deployer.getBalance(address)),
    networkCurrency[chainId]
  );

  // const network = await ethers.provider.getNetwork()
  // chainId = network.chainId

  const tributeFactory = await ethers.getContractFactory("TributeMinion");
  const tributeSingleton = await tributeFactory.deploy();

  logDeployment(tributeSingleton);
}

main()
  .then(() => process.exit(0))
  .catch((error) => {
    console.error(error);
    process.exit(1);
  });
