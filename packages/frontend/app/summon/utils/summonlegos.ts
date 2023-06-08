import { ContractLego } from '@daohaus/utils';
import DeVoxBaalAndShamanSummonerV1Abi from '../../../abi/DeVoxBaalAndShamanSummonerV1';

const BaalAndShamanSummonerContract: ContractLego = {
  contractName: 'DeVoxBaalAndShamanSummonerV1',
  type: 'static',
  abi: DeVoxBaalAndShamanSummonerV1Abi,
  targetAddress: "0xF7F0fC85946060F37B01c3E125eBe17F2663ed82"
};

export const SummonTX = {
  id: 'SummonTX',
  contract: BaalAndShamanSummonerContract,
  method: 'summonBaalAndShaman',
};