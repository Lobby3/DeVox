/* Autogenerated file. Do not edit manually. */

/* tslint:disable */

/* eslint-disable */
import type { PromiseOrValue } from "../../../../../common";
import type {
  TestAvatar,
  TestAvatarInterface,
} from "../../../../../contracts/fixtures/Baal/mock/TestAvatar";
import type { Provider, TransactionRequest } from "@ethersproject/providers";
import { Signer, utils, Contract, ContractFactory, Overrides } from "ethers";

const _abi = [
  {
    inputs: [
      {
        internalType: "address",
        name: "",
        type: "address",
      },
      {
        internalType: "address",
        name: "",
        type: "address",
      },
    ],
    name: "disableModule",
    outputs: [],
    stateMutability: "nonpayable",
    type: "function",
  },
  {
    inputs: [
      {
        internalType: "address",
        name: "_module",
        type: "address",
      },
    ],
    name: "enableModule",
    outputs: [],
    stateMutability: "nonpayable",
    type: "function",
  },
  {
    inputs: [
      {
        internalType: "address payable",
        name: "to",
        type: "address",
      },
      {
        internalType: "uint256",
        name: "value",
        type: "uint256",
      },
      {
        internalType: "bytes",
        name: "data",
        type: "bytes",
      },
      {
        internalType: "uint8",
        name: "operation",
        type: "uint8",
      },
    ],
    name: "execTransactionFromModule",
    outputs: [
      {
        internalType: "bool",
        name: "success",
        type: "bool",
      },
    ],
    stateMutability: "nonpayable",
    type: "function",
  },
  {
    inputs: [
      {
        internalType: "address payable",
        name: "to",
        type: "address",
      },
      {
        internalType: "uint256",
        name: "value",
        type: "uint256",
      },
      {
        internalType: "bytes",
        name: "data",
        type: "bytes",
      },
      {
        internalType: "uint8",
        name: "operation",
        type: "uint8",
      },
    ],
    name: "execTransactionFromModuleReturnData",
    outputs: [
      {
        internalType: "bool",
        name: "success",
        type: "bool",
      },
      {
        internalType: "bytes",
        name: "returnData",
        type: "bytes",
      },
    ],
    stateMutability: "nonpayable",
    type: "function",
  },
  {
    inputs: [
      {
        internalType: "address",
        name: "",
        type: "address",
      },
      {
        internalType: "uint256",
        name: "pageSize",
        type: "uint256",
      },
    ],
    name: "getModulesPaginated",
    outputs: [
      {
        internalType: "address[]",
        name: "array",
        type: "address[]",
      },
      {
        internalType: "address",
        name: "next",
        type: "address",
      },
    ],
    stateMutability: "view",
    type: "function",
  },
  {
    inputs: [
      {
        internalType: "address",
        name: "_module",
        type: "address",
      },
    ],
    name: "isModuleEnabled",
    outputs: [
      {
        internalType: "bool",
        name: "",
        type: "bool",
      },
    ],
    stateMutability: "view",
    type: "function",
  },
  {
    inputs: [],
    name: "module",
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
  {
    stateMutability: "payable",
    type: "receive",
  },
] as const;

const _bytecode =
  "0x608060405234801561001057600080fd5b5061073b806100206000396000f3fe6080604052600436106100645760003560e01c80632d9ad53d14610070578063468721a7146100a55780635229073f146100c5578063610b5925146100f3578063b86d529814610132578063cc2f84521461016a578063e009cfde1461019857600080fd5b3661006b57005b600080fd5b34801561007c57600080fd5b5061009061008b36600461049a565b6101c7565b60405190151581526020015b60405180910390f35b3480156100b157600080fd5b506100906100c03660046104be565b6101ee565b3480156100d157600080fd5b506100e56100e03660046104be565b6102ff565b60405161009c92919061063a565b3480156100ff57600080fd5b5061013061010e36600461049a565b600080546001600160a01b0319166001600160a01b0392909216919091179055565b005b34801561013e57600080fd5b50600054610152906001600160a01b031681565b6040516001600160a01b03909116815260200161009c565b34801561017657600080fd5b5061018a6101853660046105a1565b61040c565b60405161009c9291906105dd565b3480156101a457600080fd5b506101306101b3366004610568565b5050600080546001600160a01b0319169055565b600080546001600160a01b03838116911614156101e657506001919050565b506000919050565b600080546001600160a01b031633146102225760405162461bcd60e51b815260040161021990610699565b60405180910390fd5b8160ff166001141561029357856001600160a01b031684846040516102489291906105cd565b600060405180830381855af49150503d8060008114610283576040519150601f19603f3d011682016040523d82523d6000602084013e610288565b606091505b5050809150506102f6565b856001600160a01b03168585856040516102ae9291906105cd565b60006040518083038185875af1925050503d80600081146102eb576040519150601f19603f3d011682016040523d82523d6000602084013e6102f0565b606091505b50909150505b95945050505050565b600080546060906001600160a01b0316331461032d5760405162461bcd60e51b815260040161021990610699565b8260ff166001141561039e57866001600160a01b031685856040516103539291906105cd565b600060405180830381855af49150503d806000811461038e576040519150601f19603f3d011682016040523d82523d6000602084013e610393565b606091505b505080925050610402565b866001600160a01b03168686866040516103b99291906105cd565b60006040518083038185875af1925050503d80600081146103f6576040519150601f19603f3d011682016040523d82523d6000602084013e6103fb565b606091505b5090925090505b9550959350505050565b606060008267ffffffffffffffff811115610429576104296106d7565b604051908082528060200260200182016040528015610452578160200160208202803683370190505b506000805482519294506001600160a01b031691849190610475576104756106c1565b6001600160a01b03928316602091820292909201015260005492959216935090915050565b6000602082840312156104ac57600080fd5b81356104b7816106ed565b9392505050565b6000806000806000608086880312156104d657600080fd5b85356104e1816106ed565b945060208601359350604086013567ffffffffffffffff8082111561050557600080fd5b818801915088601f83011261051957600080fd5b81358181111561052857600080fd5b89602082850101111561053a57600080fd5b602083019550809450505050606086013560ff8116811461055a57600080fd5b809150509295509295909350565b6000806040838503121561057b57600080fd5b8235610586816106ed565b91506020830135610596816106ed565b809150509250929050565b600080604083850312156105b457600080fd5b82356105bf816106ed565b946020939093013593505050565b8183823760009101908152919050565b604080825283519082018190526000906020906060840190828701845b8281101561061f5781516001600160a01b0316845292840192908401906001016105fa565b5050506001600160a01b039490941692019190915250919050565b821515815260006020604081840152835180604085015260005b8181101561067057858101830151858201606001528201610654565b81811115610682576000606083870101525b50601f01601f191692909201606001949350505050565b6020808252600e908201526d139bdd08185d5d1a1bdc9a5e995960921b604082015260600190565b634e487b7160e01b600052603260045260246000fd5b634e487b7160e01b600052604160045260246000fd5b6001600160a01b038116811461070257600080fd5b5056fea2646970667358221220865430ede2a3df163dde6d8f698fc0240e57e6a34ec4412820df8e109f919c2964736f6c63430008070033";

type TestAvatarConstructorParams =
  | [signer?: Signer]
  | ConstructorParameters<typeof ContractFactory>;

const isSuperArgs = (
  xs: TestAvatarConstructorParams
): xs is ConstructorParameters<typeof ContractFactory> => xs.length > 1;

export class TestAvatar__factory extends ContractFactory {
  constructor(...args: TestAvatarConstructorParams) {
    if (isSuperArgs(args)) {
      super(...args);
    } else {
      super(_abi, _bytecode, args[0]);
    }
  }

  override deploy(
    overrides?: Overrides & { from?: PromiseOrValue<string> }
  ): Promise<TestAvatar> {
    return super.deploy(overrides || {}) as Promise<TestAvatar>;
  }
  override getDeployTransaction(
    overrides?: Overrides & { from?: PromiseOrValue<string> }
  ): TransactionRequest {
    return super.getDeployTransaction(overrides || {});
  }
  override attach(address: string): TestAvatar {
    return super.attach(address) as TestAvatar;
  }
  override connect(signer: Signer): TestAvatar__factory {
    return super.connect(signer) as TestAvatar__factory;
  }

  static readonly bytecode = _bytecode;
  static readonly abi = _abi;
  static createInterface(): TestAvatarInterface {
    return new utils.Interface(_abi) as TestAvatarInterface;
  }
  static connect(
    address: string,
    signerOrProvider: Signer | Provider
  ): TestAvatar {
    return new Contract(address, _abi, signerOrProvider) as TestAvatar;
  }
}
