/* Autogenerated file. Do not edit manually. */

/* tslint:disable */

/* eslint-disable */
import type { PromiseOrValue } from "../../../../../common";
import type {
  BaalTypes,
  BaalTypesInterface,
} from "../../../../../contracts/fixtures/Baal/types/BaalTypes";
import type { Provider, TransactionRequest } from "@ethersproject/providers";
import { Signer, utils, Contract, ContractFactory, Overrides } from "ethers";

const _abi = [
  {
    inputs: [],
    name: "ETH",
    outputs: [
      {
        internalType: "address",
        name: "",
        type: "address",
      },
    ],
    stateMutability: "view",
    type: "function",
  },
] as const;

const _bytecode =
  "0x60a4610038600b82828239805160001a607314602b57634e487b7160e01b600052600060045260246000fd5b30600052607381538281f3fe730000000000000000000000000000000000000000301460806040526004361060335760003560e01c80638322fff2146038575b600080fd5b605273eeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeee81565b6040516001600160a01b03909116815260200160405180910390f3fea2646970667358221220e89413ece3dff17667f0b1d13ae44bf20f2d5ad1a6eeb61cf5ace51d006910cd64736f6c634300080c0033";

type BaalTypesConstructorParams =
  | [signer?: Signer]
  | ConstructorParameters<typeof ContractFactory>;

const isSuperArgs = (
  xs: BaalTypesConstructorParams
): xs is ConstructorParameters<typeof ContractFactory> => xs.length > 1;

export class BaalTypes__factory extends ContractFactory {
  constructor(...args: BaalTypesConstructorParams) {
    if (isSuperArgs(args)) {
      super(...args);
    } else {
      super(_abi, _bytecode, args[0]);
    }
  }

  override deploy(
    overrides?: Overrides & { from?: PromiseOrValue<string> }
  ): Promise<BaalTypes> {
    return super.deploy(overrides || {}) as Promise<BaalTypes>;
  }
  override getDeployTransaction(
    overrides?: Overrides & { from?: PromiseOrValue<string> }
  ): TransactionRequest {
    return super.getDeployTransaction(overrides || {});
  }
  override attach(address: string): BaalTypes {
    return super.attach(address) as BaalTypes;
  }
  override connect(signer: Signer): BaalTypes__factory {
    return super.connect(signer) as BaalTypes__factory;
  }

  static readonly bytecode = _bytecode;
  static readonly abi = _abi;
  static createInterface(): BaalTypesInterface {
    return new utils.Interface(_abi) as BaalTypesInterface;
  }
  static connect(
    address: string,
    signerOrProvider: Signer | Provider
  ): BaalTypes {
    return new Contract(address, _abi, signerOrProvider) as BaalTypes;
  }
}
