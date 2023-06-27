import { ContractLego } from '@daohaus/utils';
import DeVoxBaalAndShamanSummonerV1Abi from '../../../abi/DeVoxBaalAndShamanSummonerV1';
import { DeVoxContractKeychains } from './keychains';

const BaalAndShamanSummonerContract: ContractLego = {
  contractName: 'DeVoxBaalAndShamanSummonerV1',
  type: 'static',
  abi: DeVoxBaalAndShamanSummonerV1Abi,
  targetAddress: DeVoxContractKeychains.BaalAndShamanSummoner,
};

export const SummonTX = {
  id: 'SummonTX',
  contract: BaalAndShamanSummonerContract,
  method: 'summonBaalAndShaman',
};