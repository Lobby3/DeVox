/* Autogenerated file. Do not edit manually. */

/* tslint:disable */

/* eslint-disable */
import type {
  ModuleManager,
  ModuleManagerInterface,
} from "../../../../../@gnosis.pm/safe-contracts/contracts/base/ModuleManager";
import type { PromiseOrValue } from "../../../../../common";
import type { Provider, TransactionRequest } from "@ethersproject/providers";
import { Signer, utils, Contract, ContractFactory, Overrides } from "ethers";

const _abi = [
  {
    anonymous: false,
    inputs: [
      {
        indexed: false,
        internalType: "address",
        name: "module",
        type: "address",
      },
    ],
    name: "DisabledModule",
    type: "event",
  },
  {
    anonymous: false,
    inputs: [
      {
        indexed: false,
        internalType: "address",
        name: "module",
        type: "address",
      },
    ],
    name: "EnabledModule",
    type: "event",
  },
  {
    anonymous: false,
    inputs: [
      {
        indexed: true,
        internalType: "address",
        name: "module",
        type: "address",
      },
    ],
    name: "ExecutionFromModuleFailure",
    type: "event",
  },
  {
    anonymous: false,
    inputs: [
      {
        indexed: true,
        internalType: "address",
        name: "module",
        type: "address",
      },
    ],
    name: "ExecutionFromModuleSuccess",
    type: "event",
  },
  {
    inputs: [
      {
        internalType: "address",
        name: "prevModule",
        type: "address",
      },
      {
        internalType: "address",
        name: "module",
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
        name: "module",
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
        internalType: "address",
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
        internalType: "enum Enum.Operation",
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
        internalType: "address",
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
        internalType: "enum Enum.Operation",
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
        name: "start",
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
        name: "module",
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
] as const;

const _bytecode =
  "0x608060405234801561001057600080fd5b50610911806100206000396000f3fe608060405234801561001057600080fd5b50600436106100625760003560e01c80632d9ad53d14610067578063468721a71461008f5780635229073f146100a2578063610b5925146100c3578063cc2f8452146100d8578063e009cfde146100f9575b600080fd5b61007a61007536600461062b565b61010c565b60405190151581526020015b60405180910390f35b61007a61009d366004610672565b610147565b6100b56100b0366004610672565b610223565b60405161008692919061074e565b6100d66100d136600461062b565b610259565b005b6100eb6100e63660046107ad565b610381565b6040516100869291906107d7565b6100d6610107366004610834565b61047a565b600060016001600160a01b0383161480159061014157506001600160a01b038281166000908152602081905260409020541615155b92915050565b6000336001148015906101715750336000908152602081905260409020546001600160a01b031615155b6101aa5760405162461bcd60e51b815260206004820152600560248201526411d4cc4c0d60da1b60448201526064015b60405180910390fd5b6101b7858585855a61058e565b905080156101ef5760405133907f6895c13664aa4f67288b25d7a21d7aaa34916e355fb9b6fae0a139a9085becb890600090a261021b565b60405133907facd2c8702804128fdb0db2bb49f6d127dd0181c13fd45dbfe16de0930e2bd37590600090a25b949350505050565b6000606061023386868686610147565b915060405160203d0181016040523d81523d6000602083013e8091505094509492505050565b6102616105d6565b6001600160a01b0381161580159061028357506001600160a01b038116600114155b61029f5760405162461bcd60e51b81526004016101a190610867565b6001600160a01b0381811660009081526020819052604090205416156102ef5760405162461bcd60e51b815260206004820152600560248201526423a998981960d91b60448201526064016101a1565b600060208181527fada5013122d395ba3c54772283fb069b10426056ef8ca54750cb9bb552a59e7d80546001600160a01b0385811680865260408087208054939094166001600160a01b03199384161790935560019095528254168417909155519182527fecdf3a3effea5783a3c4c2140e677577666428d44ed9d474a0b3a4c9943f8440910160405180910390a150565b606060008267ffffffffffffffff81111561039e5761039e61064d565b6040519080825280602002602001820160405280156103c7578160200160208202803683370190505b506001600160a01b0380861660009081526020819052604081205492945091165b6001600160a01b0381161580159061040a57506001600160a01b038116600114155b801561041557508482105b1561046c578084838151811061042d5761042d610886565b6001600160a01b0392831660209182029290920181019190915291811660009081529182905260409091205416816104648161089c565b9250506103e8565b908352919491935090915050565b6104826105d6565b6001600160a01b038116158015906104a457506001600160a01b038116600114155b6104c05760405162461bcd60e51b81526004016101a190610867565b6001600160a01b038281166000908152602081905260409020548116908216146105145760405162461bcd60e51b8152602060048201526005602482015264475331303360d81b60448201526064016101a1565b6001600160a01b03818116600081815260208181526040808320805488871685528285208054919097166001600160a01b03199182161790965592849052825490941690915591519081527faab4fa2b463f581b2b32cb3b7e3b704b9ce37cc209b5fb4d77e593ace4054276910160405180910390a15050565b600060018360018111156105a4576105a46108c5565b14156105bd576000808551602087018986f490506105cd565b600080855160208701888a87f190505b95945050505050565b33301461060d5760405162461bcd60e51b8152602060048201526005602482015264475330333160d81b60448201526064016101a1565b565b80356001600160a01b038116811461062657600080fd5b919050565b60006020828403121561063d57600080fd5b6106468261060f565b9392505050565b634e487b7160e01b600052604160045260246000fd5b80356002811061062657600080fd5b6000806000806080858703121561068857600080fd5b6106918561060f565b935060208501359250604085013567ffffffffffffffff808211156106b557600080fd5b818701915087601f8301126106c957600080fd5b8135818111156106db576106db61064d565b604051601f8201601f19908116603f011681019083821181831017156107035761070361064d565b816040528281528a602084870101111561071c57600080fd5b82602086016020830137600060208483010152809650505050505061074360608601610663565b905092959194509250565b821515815260006020604081840152835180604085015260005b8181101561078457858101830151858201606001528201610768565b81811115610796576000606083870101525b50601f01601f191692909201606001949350505050565b600080604083850312156107c057600080fd5b6107c98361060f565b946020939093013593505050565b604080825283519082018190526000906020906060840190828701845b828110156108195781516001600160a01b0316845292840192908401906001016107f4565b5050506001600160a01b039490941692019190915250919050565b6000806040838503121561084757600080fd5b6108508361060f565b915061085e6020840161060f565b90509250929050565b602080825260059082015264475331303160d81b604082015260600190565b634e487b7160e01b600052603260045260246000fd5b60006000198214156108be57634e487b7160e01b600052601160045260246000fd5b5060010190565b634e487b7160e01b600052602160045260246000fdfea26469706673582212202c049f02087103061c40f274cd7996c5976a6389f56d756a5a4af67c082ee81064736f6c634300080c0033";

type ModuleManagerConstructorParams =
  | [signer?: Signer]
  | ConstructorParameters<typeof ContractFactory>;

const isSuperArgs = (
  xs: ModuleManagerConstructorParams
): xs is ConstructorParameters<typeof ContractFactory> => xs.length > 1;

export class ModuleManager__factory extends ContractFactory {
  constructor(...args: ModuleManagerConstructorParams) {
    if (isSuperArgs(args)) {
      super(...args);
    } else {
      super(_abi, _bytecode, args[0]);
    }
  }

  override deploy(
    overrides?: Overrides & { from?: PromiseOrValue<string> }
  ): Promise<ModuleManager> {
    return super.deploy(overrides || {}) as Promise<ModuleManager>;
  }
  override getDeployTransaction(
    overrides?: Overrides & { from?: PromiseOrValue<string> }
  ): TransactionRequest {
    return super.getDeployTransaction(overrides || {});
  }
  override attach(address: string): ModuleManager {
    return super.attach(address) as ModuleManager;
  }
  override connect(signer: Signer): ModuleManager__factory {
    return super.connect(signer) as ModuleManager__factory;
  }

  static readonly bytecode = _bytecode;
  static readonly abi = _abi;
  static createInterface(): ModuleManagerInterface {
    return new utils.Interface(_abi) as ModuleManagerInterface;
  }
  static connect(
    address: string,
    signerOrProvider: Signer | Provider
  ): ModuleManager {
    return new Contract(address, _abi, signerOrProvider) as ModuleManager;
  }
}
