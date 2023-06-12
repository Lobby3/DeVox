import { getChainId } from "hardhat";

export const getChainIdHex = async () => {
  const chainId = await getChainId();
  const chainIdHex = "0x" + Number(chainId).toString(16);
  return chainIdHex;
};
