import { Keychain } from "@daohaus/keychain-utils";
import { StaticContract } from "@daohaus/utils";
import IUserRegistryAbi from "packages/frontend/abi/IUserRegistry";

export const TreasuryTokenKeychains = {
  DAI: {
    "0x1": "0x6b175474e89094c44da98b954eedeac495271d0f",
    "0x5": "0x11fE4B6AE13d2a6055C8D9cF65c55bac32B5d844", // goerli
    "0x89": "", // polygon
    "0x13881": "", // polygon mumbai
  },
  USDC: {
    "0x1": "0xa0b86991c6218b36c1d19d4a2e9eb0ce3606eb48",
    "0x5": "0x07865c6e87b9f70255377e024ace6630c1eaa37f", // goerli
    "0x89": "", // polygon
    "0x13881": "0xe6b8a5CF854791412c1f6EFC7CAf629f5Df1c747", // polygon mumbai
  },
  USDT: {
    "0x1": "0xdAC17F958D2ee523a2206206994597C13D831ec7",
    "0x5": "0xfad6367E97217cC51b4cd838Cc086831f81d38C2", // goerli
    "0x89": "0xc2132D05D31c914a87C6611C10748AEb04B58e8F", // polygon
    "0x13881": "0x3813e82e6f7098b9583FC0F33a962D02018B6803", // polygon mumbai
  },
} as Record<string, Keychain>;

export const DeVoxUserRegistryContract: StaticContract = {
  contractName: "DeVoxUserRegistryV0",
  type: "static",
  abi: IUserRegistryAbi,
  targetAddress: "0xCf8a0e1A1E3678431C777c546E9aCd358C4e08e0",
};
