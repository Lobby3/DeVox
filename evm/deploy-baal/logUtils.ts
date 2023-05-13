import { Contract, ethers } from "ethers";

import { networkCurrency, networkName } from "./constants";

export const logDeployStart = async (name: string) => {
  const [deployer] = await ethers.getSigners();
  const address = await deployer.getAddress();
  const chainId = await deployer.getChainId();
  const network = networkName[chainId];
  const balance = ethers.utils.formatEther(await deployer.getBalance(address));
  const currency = networkCurrency[chainId];

  console.log(`Deploying ${name} on network: ${network} [${chainId}]`);
  console.log(`Account address: ${address}`);
  console.log(`Account balance: ${balance} ${currency}`);

  return [address, chainId, network, balance, currency];
};

export const logDeployment = (contract: Contract) => {
  const tx = contract.deployTransaction;
  console.log("Transaction Hash:", tx.hash);
  console.log("Contract Address:", contract.address);
  console.log("Block Number:", tx.blockNumber);
};
