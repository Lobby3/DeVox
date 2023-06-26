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
  MultiSend: "MultiSend",
  MyToken: "MyToken",
  Safe: "GnosisSafe",
  SafeFallbackHandler: "CompatibilityFallbackHandler",
  SafeProxyFactory: "GnosisSafeProxyFactory",
  Shares: "Shares",
};

export type ContractName = (typeof ContractNames)[keyof typeof ContractNames];
