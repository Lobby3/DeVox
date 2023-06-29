import { ContractLego } from "@daohaus/utils";

import DeVoxBaalAndShamanSummonerV0Abi from "../../../abi/DeVoxBaalAndShamanSummonerV0";
import { DeVoxContractKeychains } from "./keychains";

const BaalAndShamanSummonerContract: ContractLego = {
  contractName: "DeVoxBaalAndShamanSummonerV0",
  type: "static",
  abi: DeVoxBaalAndShamanSummonerV0Abi,
  targetAddress: DeVoxContractKeychains.BaalAndShamanSummoner,
};

export const SummonTX = {
  id: "SummonTX",
  contract: BaalAndShamanSummonerContract,
  method: "summonBaalAndShaman",
};
