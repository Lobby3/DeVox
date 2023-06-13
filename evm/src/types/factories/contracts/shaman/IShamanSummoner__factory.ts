/* Autogenerated file. Do not edit manually. */

/* tslint:disable */

/* eslint-disable */
import type {
  IShamanSummoner,
  IShamanSummonerInterface,
} from "../../../contracts/shaman/IShamanSummoner";
import type { Provider } from "@ethersproject/providers";
import { Contract, Signer, utils } from "ethers";

const _abi = [
  {
    inputs: [
      {
        internalType: "address",
        name: "_baal",
        type: "address",
      },
      {
        internalType: "bytes",
        name: "_initializationParams",
        type: "bytes",
      },
    ],
    name: "summonDeVoxShaman",
    outputs: [
      {
        internalType: "address",
        name: "",
        type: "address",
      },
    ],
    stateMutability: "nonpayable",
    type: "function",
  },
] as const;

export class IShamanSummoner__factory {
  static readonly abi = _abi;
  static createInterface(): IShamanSummonerInterface {
    return new utils.Interface(_abi) as IShamanSummonerInterface;
  }
  static connect(
    address: string,
    signerOrProvider: Signer | Provider
  ): IShamanSummoner {
    return new Contract(address, _abi, signerOrProvider) as IShamanSummoner;
  }
}
