export const Hardhat = "hardhat";

export const ContractNames = {
  Baal: "Baal",
  BaalSummoner: "BaalSummoner",
  BaalAdvTokenSummoner: "BaalAdvTokenSummoner",
  BaalAndVaultSummoner: "BaalAndVaultSummoner",
  DeVoxBaalAdvTokenSummoner: "DeVoxBaalAdvTokenSummonerV0",
  DeVoxBaalAndShamanSummoner: "DeVoxBaalAndShamanSummonerV0",
  DeVoxShaman: "DeVoxShamanV0",
  DeVoxShamanSummoner: "DeVoxShamanSummonerV0",
  DeVoxUserRegistry: "DeVoxUserRegistryV0",
  Loot: "Loot",
  ModuleProxyFactory: "ModuleProxyFactory",
  MultiSend: "MultiSend",
  MyToken: "MyToken",
  Safe: "GnosisSafe",
  SafeFallbackHandler: "CompatibilityFallbackHandler",
  SafeProxyFactory: "GnosisSafeProxyFactory",
  Shares: "Shares",
};

export type ContractName = (typeof ContractNames)[keyof typeof ContractNames];
