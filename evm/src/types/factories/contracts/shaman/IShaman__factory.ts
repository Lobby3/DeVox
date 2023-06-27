/* Autogenerated file. Do not edit manually. */

/* tslint:disable */

/* eslint-disable */
import type {
  IShaman,
  IShamanInterface,
} from "../../../contracts/shaman/IShaman";
import type { Provider } from "@ethersproject/providers";
import { Contract, Signer, utils } from "ethers";

const _abi = [
  {
    inputs: [
      {
        internalType: "uint32",
        name: "proposalId",
        type: "uint32",
      },
    ],
    name: "cancelProposal",
    outputs: [],
    stateMutability: "nonpayable",
    type: "function",
  },
  {
    inputs: [
      {
        internalType: "uint256",
        name: "_value",
        type: "uint256",
      },
      {
        internalType: "string",
        name: "_message",
        type: "string",
      },
    ],
    name: "donate",
    outputs: [],
    stateMutability: "nonpayable",
    type: "function",
  },
  {
    inputs: [
      {
        internalType: "address",
        name: "_moloch",
        type: "address",
      },
      {
        internalType: "address",
        name: "_token",
        type: "address",
      },
      {
        internalType: "address",
        name: "_userRegistry",
        type: "address",
      },
      {
        internalType: "uint256",
        name: "_id",
        type: "uint256",
      },
      {
        internalType: "uint256",
        name: "_pricePerUnit",
        type: "uint256",
      },
      {
        internalType: "uint256",
        name: "_tokensPerUnit",
        type: "uint256",
      },
      {
        internalType: "uint256",
        name: "_target",
        type: "uint256",
      },
      {
        internalType: "address[]",
        name: "_admins",
        type: "address[]",
      },
    ],
    name: "initialize",
    outputs: [],
    stateMutability: "nonpayable",
    type: "function",
  },
  {
    inputs: [
      {
        internalType: "address",
        name: "user",
        type: "address",
      },
    ],
    name: "setAdmin",
    outputs: [],
    stateMutability: "nonpayable",
    type: "function",
  },
  {
    inputs: [],
    name: "sign",
    outputs: [],
    stateMutability: "nonpayable",
    type: "function",
  },
] as const;

export class IShaman__factory {
  static readonly abi = _abi;
  static createInterface(): IShamanInterface {
    return new utils.Interface(_abi) as IShamanInterface;
  }
  static connect(
    address: string,
    signerOrProvider: Signer | Provider
  ): IShaman {
    return new Contract(address, _abi, signerOrProvider) as IShaman;
  }
}
