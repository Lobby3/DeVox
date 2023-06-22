import { ContractLego } from '@daohaus/utils';
import DeVoxBaalAndShamanSummonerV1Abi from '../../../abi/DeVoxBaalAndShamanSummonerV1';

const BaalAndShamanSummonerContract: ContractLego = {
  contractName: 'DeVoxBaalAndShamanSummonerV1',
  type: 'static',
  abi: DeVoxBaalAndShamanSummonerV1Abi,
  targetAddress: "0x8A3C734715D80460f25B51ba30aA571Af2fbAf24"
};

export const SummonTX = {
  id: 'SummonTX',
  contract: BaalAndShamanSummonerContract,
  method: 'summonBaalAndShaman',
};