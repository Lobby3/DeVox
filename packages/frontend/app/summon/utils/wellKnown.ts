import { Keychain } from "@daohaus/keychain-utils";

export const TreasuryTokenKeychains = {
  DAI: {
    "0x1": "0x6b175474e89094c44da98b954eedeac495271d0f",
    "0x5": "0x11fE4B6AE13d2a6055C8D9cF65c55bac32B5d844",
  },
  USDC: {
    "0x1": "0xa0b86991c6218b36c1d19d4a2e9eb0ce3606eb48",
    "0x5": "0x07865c6e87b9f70255377e024ace6630c1eaa37f",
  },
  USDT: {
    "0x1": "0xdAC17F958D2ee523a2206206994597C13D831ec7",
    "0x5": "0x509Ee0d083DdF8AC028f2a56731412edD63223B9",
  },
} as Record<string, Keychain>;
