/* Autogenerated file. Do not edit manually. */

/* tslint:disable */

/* eslint-disable */
import type {
  IBaalAdvTokenSummoner,
  IBaalAdvTokenSummonerInterface,
} from "../../../../contracts/baal/interfaces/IBaalAdvTokenSummoner";
import type { Provider } from "@ethersproject/providers";
import { Contract, Signer, utils } from "ethers";

const _abi = [
  {
    inputs: [
      {
        internalType: "uint256",
        name: "_saltNonce",
        type: "uint256",
      },
      {
        internalType: "bytes",
        name: "_initializationMintParams",
        type: "bytes",
      },
      {
        internalType: "bytes",
        name: "_initializationTokenParams",
        type: "bytes",
      },
      {
        internalType: "bytes[]",
        name: "_postInitializationActions",
        type: "bytes[]",
      },
    ],
    name: "summonBaalFromReferrer",
    outputs: [
      {
        internalType: "address",
        name: "",
        type: "address",
      },
    ],
    stateMutability: "payable",
    type: "function",
  },
] as const;

export class IBaalAdvTokenSummoner__factory {
  static readonly abi = _abi;
  static createInterface(): IBaalAdvTokenSummonerInterface {
    return new utils.Interface(_abi) as IBaalAdvTokenSummonerInterface;
  }
  static connect(
    address: string,
    signerOrProvider: Signer | Provider
  ): IBaalAdvTokenSummoner {
    return new Contract(
      address,
      _abi,
      signerOrProvider
    ) as IBaalAdvTokenSummoner;
  }
}