import { ethers } from "hardhat";

export const fetchTransactionLog = async (hash: string, abi: string) => {
  const receipt = await ethers.provider.getTransactionReceipt(hash);
  // console.log(receipt);

  const iface = new ethers.utils.Interface([abi]);
  for (let i = 0; i < receipt.logs.length; i++) {
    try {
      const log = iface.parseLog(receipt.logs[i]);
      return log;
    } catch (e) {
      // console.log(e);
    }
  }

  throw new Error(`No log found`);
};
