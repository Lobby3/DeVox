import { ContractLego } from '@daohaus/utils';
import DeVoxBaalAndShamanSummonerV1Abi from '../../../abi/DeVoxBaalAndShamanSummonerV1';

const BaalAndShamanSummonerContract: ContractLego = {
  contractName: 'DeVoxBaalAndShamanSummonerV1',
  type: 'static',
  abi: DeVoxBaalAndShamanSummonerV1Abi,
  targetAddress: "0xCcfC4E42acf9909A717ECb46E5D836228B730b78"
};

export const SummonTX = {
  id: 'SummonTX',
  contract: BaalAndShamanSummonerContract,
  method: 'summonBaalAndShaman',
};