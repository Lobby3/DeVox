export const Hardhat = "hardhat";

export const ContractNames = {
  Baal: "Baal",
  BaalSummoner: "BaalSummoner",
  BaalAdvTokenSummoner: "BaalAdvTokenSummoner",
  BaalAndVaultSummoner: "BaalAndVaultSummoner",
  DeVoxBaalAdvTokenSummoner: "DeVoxBaalAdvTokenSummonerV1",
  DeVoxBaalAndShamanSummoner: "DeVoxBaalAndShamanSummonerV1",
  DeVoxShaman: "DeVoxShamanV1",
  DeVoxShamanSummoner: "DeVoxShamanSummonerV1",
  Loot: "Loot",
  ModuleProxyFactory: "ModuleProxyFactory",
  MyToken: "MyToken",
  Safe: "GnosisSafe",
  SafeFallbackHandler: "CompatibilityFallbackHandler",
  SafeMultiSend: "MultiSend",
  SafeProxyFactory: "GnosisSafeProxyFactory",
  Shares: "Shares",
};

export type ContractName = (typeof ContractNames)[keyof typeof ContractNames];
