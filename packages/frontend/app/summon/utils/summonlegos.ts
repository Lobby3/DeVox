import { ContractLego } from '@daohaus/utils';
import DeVoxBaalAndShamanSummonerV1Abi from '../../../abi/DeVoxBaalAndShamanSummonerV1';

const BaalAndShamanSummonerContract: ContractLego = {
  contractName: 'DeVoxBaalAndShamanSummonerV1',
  type: 'static',
  abi: DeVoxBaalAndShamanSummonerV1Abi,
  targetAddress: "0xA1305f0528E97b1A483fE5D1aE4e9214F7785e53"
};

export const SummonTX = {
  id: 'SummonTX',
  contract: BaalAndShamanSummonerContract,
  method: 'summonBaalAndShaman',
};