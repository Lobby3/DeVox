import { Keychain } from "@daohaus/keychain-utils";

export const TreasuryTokenKeychains = {
  DAI: {
    "0x1": "0x6b175474e89094c44da98b954eedeac495271d0f",
    "0x5": "0x11fE4B6AE13d2a6055C8D9cF65c55bac32B5d844", // goerli
    "0x64": "", // xDai
    "0xa": "", // Optimism
    "0x89": "0x8f3Cf7ad23Cd3CaDbD9735AFf958023239c6A063", // polygon
    "0x13881": "", // polygon mumbai
    "0xa4b1": "", // Arbitrum One
  },
  USDC: {
    "0x1": "0xa0b86991c6218b36c1d19d4a2e9eb0ce3606eb48",
    "0x5": "0x07865c6e87b9f70255377e024ace6630c1eaa37f", // goerli
    "0x64": "", // xDai
    "0xa": "", // Optimism
    "0x89": "0x2791Bca1f2de4661ED88A30C99A7a9449Aa84174", // polygon
    "0x13881": "0xe6b8a5CF854791412c1f6EFC7CAf629f5Df1c747", // polygon mumbai
    "0xa4b1": "", // Arbitrum One
  },
  USDT: {
    "0x1": "0xdAC17F958D2ee523a2206206994597C13D831ec7",
    "0x5": "0xfad6367E97217cC51b4cd838Cc086831f81d38C2", // goerli
    "0x64": "", // xDai
    "0xa": "", // Optimism
    "0x89": "0xc2132D05D31c914a87C6611C10748AEb04B58e8F", // polygon
    "0x13881": "0x3813e82e6f7098b9583FC0F33a962D02018B6803", // polygon mumbai
    "0xa4b1": "", // Arbitrum One
  },
} as Record<string, Keychain>;

export const DeVoxContractKeychains = {
  BaalAndShamanSummoner: {
    "0x1": "", // mainnet
    "0x5": "0x0B5018245D251a403B7F12260187B45d766e814C", // goerli
    "0x64": "", // xDai
    "0xa": "", // Optimism
    "0x89": "", // polygon
    "0xa4b1": "", // Arbitrum One
  },
  DeVoxUserRegistryContract: {
    "0x1": "", // mainnet
    "0x5": "0x3BC63a4AfDe6a753498894b0FAFaD71BcC30B583", // goerli
    "0x64": "", // xDai
    "0xa": "", // Optimism
    "0x89": "", // polygon
    "0xa4b1": "", // Arbitrum One
  },
} as Record<string, Keychain>;
