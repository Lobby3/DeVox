type ContractAddressSet = {
  Mainnet: string;
  Goerli?: string;
};

export const ContractAddresses: {
  DAI: ContractAddressSet;
  USDC: ContractAddressSet;
  USDT: ContractAddressSet;
} = {
  DAI: {
    Mainnet: "0x6b175474e89094c44da98b954eedeac495271d0f",
    Goerli: "0x11fE4B6AE13d2a6055C8D9cF65c55bac32B5d844",
  },
  USDC: {
    Mainnet: "0xa0b86991c6218b36c1d19d4a2e9eb0ce3606eb48",
    Goerli: "0x07865c6e87b9f70255377e024ace6630c1eaa37f",
  },
  USDT: {
    Mainnet: "0xdAC17F958D2ee523a2206206994597C13D831ec7",
    Goerli: "0x509Ee0d083DdF8AC028f2a56731412edD63223B9",
  },
};

export const Hardhat = "hardhat";

export const ContractNames = {
  Baal: "BaalV1",
  BaalSummoner: "BaalSummonerV1",
  BaalAdvTokenSummoner: "BaalAdvTokenSummonerV1",
  BaalAndVaultSummoner: "BaalAndVaultSummonerV1",
  DeVoxShaman: "DeVoxShamanV1",
  DeVoxShamanSummoner: "DeVoxShamanSummonerV1",
  Loot: "LootV1",
  ModuleProxyFactory: "ModuleProxyFactory",
  MyToken: "MyToken",
  Safe: "GnosisSafe", 
  SafeFallbackHandler: "CompatibilityFallbackHandler",
  SafeMultiSend: "MultiSend",
  SafeProxyFactory: "GnosisSafeProxyFactory",
  Shares: "SharesV1",
};
