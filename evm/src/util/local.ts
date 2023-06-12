import { HardhatRuntimeEnvironment } from "hardhat/types";

import { Hardhat } from "./constants";

export const isLocal = (hre: HardhatRuntimeEnvironment) =>
  hre.network.name === Hardhat;

export const localOnly = <T>(
  hre: HardhatRuntimeEnvironment,
  func: () => Promise<T>
) => {
  if (!isLocal(hre)) return;
  return func();
};
