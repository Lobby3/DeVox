export const Hardhat = "hardhat";

export const ContractNames = {
  Baal: "BaalV1",
  BaalSummoner: "BaalSummonerV1",
  BaalAdvTokenSummoner: "BaalAdvTokenSummonerV1",
  BaalAndVaultSummoner: "BaalAndVaultSummonerV1",
  DeVoxBaalAndShamanSummoner: "DeVoxBaalAndShamanSummonerV1",
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

export type ContractName = typeof ContractNames[keyof typeof ContractNames];
