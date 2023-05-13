import { Contract } from "ethers";
import { ethers } from "hardhat";

import { logDeployStart, logDeployment } from "./logUtils";

// Test Deploy Values

const networkName = {
  4: "Rinkeby",
  1: "mainnet",
  137: "matic",
};

const networkCurrency = {
  4: "ETH",
  1: "ETH",
  137: "matic",
};

async function main() {
  await logDeployStart("Poster");

  // const network = await ethers.provider.getNetwork()
  // chainId = network.chainId

  const posterFactory = await ethers.getContractFactory("Poster");
  const posterSingleton = await posterFactory.deploy();

  logDeployment(posterSingleton);
}

main()
  .then(() => process.exit(0))
  .catch((error) => {
    console.error(error);
    process.exit(1);
  });
