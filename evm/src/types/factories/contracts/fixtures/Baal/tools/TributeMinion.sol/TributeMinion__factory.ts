/* Autogenerated file. Do not edit manually. */

/* tslint:disable */

/* eslint-disable */
import type { PromiseOrValue } from "../../../../../../common";
import type {
  TributeMinion,
  TributeMinionInterface,
} from "../../../../../../contracts/fixtures/Baal/tools/TributeMinion.sol/TributeMinion";
import type { Provider, TransactionRequest } from "@ethersproject/providers";
import { Signer, utils, Contract, ContractFactory, Overrides } from "ethers";

const _abi = [
  {
    anonymous: false,
    inputs: [
      {
        indexed: true,
        internalType: "address",
        name: "baal",
        type: "address",
      },
      {
        indexed: false,
        internalType: "uint32",
        name: "proposalId",
        type: "uint32",
      },
      {
        indexed: false,
        internalType: "address",
        name: "applicant",
        type: "address",
      },
      {
        indexed: false,
        internalType: "address",
        name: "safe",
        type: "address",
      },
      {
        indexed: false,
        internalType: "uint256",
        name: "amount",
        type: "uint256",
      },
    ],
    name: "EscrowReleased",
    type: "event",
  },
  {
    anonymous: false,
    inputs: [
      {
        indexed: true,
        internalType: "address",
        name: "baal",
        type: "address",
      },
      {
        indexed: false,
        internalType: "address",
        name: "token",
        type: "address",
      },
      {
        indexed: false,
        internalType: "uint256",
        name: "amount",
        type: "uint256",
      },
      {
        indexed: false,
        internalType: "address",
        name: "recipient",
        type: "address",
      },
      {
        indexed: false,
        internalType: "uint256",
        name: "proposalId",
        type: "uint256",
      },
    ],
    name: "TributeProposal",
    type: "event",
  },
  {
    inputs: [
      {
        internalType: "address",
        name: "baal",
        type: "address",
      },
      {
        internalType: "uint256",
        name: "shares",
        type: "uint256",
      },
      {
        internalType: "uint256",
        name: "loot",
        type: "uint256",
      },
      {
        internalType: "address",
        name: "recipient",
        type: "address",
      },
      {
        internalType: "uint32",
        name: "proposalId",
        type: "uint32",
      },
      {
        internalType: "address",
        name: "escrow",
        type: "address",
      },
    ],
    name: "encodeTributeProposal",
    outputs: [
      {
        internalType: "bytes",
        name: "",
        type: "bytes",
      },
    ],
    stateMutability: "pure",
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
        name: "",
        type: "uint256",
      },
    ],
    name: "escrows",
    outputs: [
      {
        internalType: "address",
        name: "token",
        type: "address",
      },
      {
        internalType: "address",
        name: "applicant",
        type: "address",
      },
      {
        internalType: "uint256",
        name: "amount",
        type: "uint256",
      },
      {
        internalType: "bool",
        name: "released",
        type: "bool",
      },
      {
        internalType: "address",
        name: "safe",
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
        name: "_baal",
        type: "address",
      },
      {
        internalType: "uint32",
        name: "_proposalId",
        type: "uint32",
      },
    ],
    name: "releaseEscrow",
    outputs: [],
    stateMutability: "nonpayable",
    type: "function",
  },
  {
    inputs: [
      {
        internalType: "contract Baal",
        name: "baal",
        type: "address",
      },
      {
        internalType: "address",
        name: "token",
        type: "address",
      },
      {
        internalType: "uint256",
        name: "amount",
        type: "uint256",
      },
      {
        internalType: "uint256",
        name: "shares",
        type: "uint256",
      },
      {
        internalType: "uint256",
        name: "loot",
        type: "uint256",
      },
      {
        internalType: "uint32",
        name: "expiration",
        type: "uint32",
      },
      {
        internalType: "uint256",
        name: "baalgas",
        type: "uint256",
      },
      {
        internalType: "string",
        name: "details",
        type: "string",
      },
    ],
    name: "submitTributeProposal",
    outputs: [],
    stateMutability: "payable",
    type: "function",
  },
] as const;

const _bytecode =
  "0x608060405234801561001057600080fd5b50610eb2806100206000396000f3fe60806040526004361061003f5760003560e01c806304a54aa7146100445780633336c279146100e0578063610ac73d146101025780636bd4afe714610115575b600080fd5b34801561005057600080fd5b506100a561005f366004610914565b600060208181529281526040808220909352908152208054600182015460028301546003909301546001600160a01b03928316939183169260ff82169161010090041685565b604080516001600160a01b039687168152948616602086015284019290925215156060830152909116608082015260a0015b60405180910390f35b3480156100ec57600080fd5b506101006100fb366004610952565b610142565b005b6101006101103660046109d2565b6103c0565b34801561012157600080fd5b50610135610130366004610ac6565b610652565b6040516100d79190610b92565b6001600160a01b03821660009081526020818152604080832063ffffffff851684529091529020600381015483919060ff16156101b95760405162461bcd60e51b815260206004820152601060248201526f105b1c9958591e481c995b19585cd95960821b60448201526064015b60405180910390fd5b60405163118c2bff60e21b815263ffffffff841660048201526000906001600160a01b03841690634630affc90602401608060405180830381865afa158015610206573d6000803e3d6000fd5b505050506040513d601f19601f8201168201806040525081019061022a9190610bc1565b604081015190915061026b5760405162461bcd60e51b815260206004820152600a602482015269139bdd081c185cdcd95960b21b60448201526064016101b0565b60038201805460ff191660019081179182905583549084015460028501546040805163ffffffff8a1681526001600160a01b039384166020820152610100909504831690850152606084015290811691908716907f637fb12bbeb9000df3de89d3f54dba04a8940ff0b762f16937aa1bc12dfc26779060800160405180910390a26001830154600384015460028501546040516323b872dd60e01b81526001600160a01b039384166004820152610100909204831660248301526044820152908216906323b872dd906064016020604051808303816000875af1158015610356573d6000803e3d6000fd5b505050506040513d601f19601f8201168201806040525081019061037a9190610c5c565b6103b85760405162461bcd60e51b815260206004820152600f60248201526e151c985b9cd9995c8819985a5b1959608a1b60448201526064016101b0565b505050505050565b6000886001600160a01b031663da35c6646040518163ffffffff1660e01b8152600401602060405180830381865afa158015610400573d6000803e3d6000fd5b505050506040513d601f19601f820116820180604052508101906104249190610c77565b61042f906001610c94565b905060006104418a8888338630610652565b90506040518060a001604052808a6001600160a01b03168152602001336001600160a01b031681526020018981526020016000151581526020018b6001600160a01b031663d4b839926040518163ffffffff1660e01b8152600401602060405180830381865afa1580156104b9573d6000803e3d6000fd5b505050506040513d601f19601f820116820180604052508101906104dd9190610cca565b6001600160a01b039081169091528b811660008181526020818152604080832063ffffffff89168452825291829020855181549086166001600160a01b031991821617825591860151600182018054918716919093161790915584820151600282015560608501516003909101805460809096015190941661010002610100600160a81b0319911515919091166001600160a81b0319909516949094179390931790915590516307505ff960e31b8152633a82ffc89034906105a99085908a908a908a90600401610ce7565b60206040518083038185885af11580156105c7573d6000803e3d6000fd5b50505050506040513d601f19601f820116820180604052508101906105ec9190610d29565b50604080516001600160a01b038b81168252602082018b9052338284015263ffffffff851660608301529151918c16917f1deb8b1e22941ec32a7ed14b2d25bdb44593ab343156feb1c735ec06696221399181900360800190a250505050505050505050565b6040805160018082528183019092526060916000919060208083019080368337019050509050848160008151811061068c5761068c610c46565b6001600160a01b039283166020918202929092010152604051908916602482015263ffffffff8516604482015260009060640160408051601f19818403018152918152602080830180516001600160e01b0316633336c27960e01b179052825191519293506000926107079284928992849291889101610d42565b60408051601f19818403018152919052905088156107e45760408051600180825281830190925260009160208083019080368337019050509050898160008151811061075557610755610c46565b60200260200101818152505060008482604051602401610776929190610d93565b604051602081830303815290604052632c78fd0360e21b6001600160e01b0319166020820180516001600160e01b03838183161783525050505090508260008d60008451856040516020016107d096959493929190610e17565b604051602081830303815290604052925050505b87156108af5760408051600180825281830190925260009160208083019080368337019050509050888160008151811061082057610820610c46565b60200260200101818152505060008482604051602401610841929190610d93565b6040516020818303038152906040526322936c2360e11b6001600160e01b0319166020820180516001600160e01b03838183161783525050505090508260008d600084518560405160200161089b96959493929190610e17565b604051602081830303815290604052925050505b6000816040516024016108c29190610b92565b60408051601f198184030181529190526020810180516001600160e01b03166346c07f8560e11b1790529450505050509695505050505050565b6001600160a01b038116811461091157600080fd5b50565b6000806040838503121561092757600080fd5b8235610932816108fc565b946020939093013593505050565b63ffffffff8116811461091157600080fd5b6000806040838503121561096557600080fd5b8235610970816108fc565b9150602083013561098081610940565b809150509250929050565b634e487b7160e01b600052604160045260246000fd5b604051601f8201601f1916810167ffffffffffffffff811182821017156109ca576109ca61098b565b604052919050565b600080600080600080600080610100898b0312156109ef57600080fd5b88356109fa816108fc565b9750602089810135610a0b816108fc565b975060408a0135965060608a0135955060808a0135945060a08a0135610a3081610940565b935060c08a0135925060e08a013567ffffffffffffffff80821115610a5457600080fd5b818c0191508c601f830112610a6857600080fd5b813581811115610a7a57610a7a61098b565b610a8c601f8201601f191685016109a1565b91508082528d84828501011115610aa257600080fd5b80848401858401376000848284010152508093505050509295985092959890939650565b60008060008060008060c08789031215610adf57600080fd5b8635610aea816108fc565b955060208701359450604087013593506060870135610b08816108fc565b92506080870135610b1881610940565b915060a0870135610b28816108fc565b809150509295509295509295565b60005b83811015610b51578181015183820152602001610b39565b83811115610b60576000848401525b50505050565b60008151808452610b7e816020860160208601610b36565b601f01601f19169290920160200192915050565b602081526000610ba56020830184610b66565b9392505050565b80518015158114610bbc57600080fd5b919050565b600060808284031215610bd357600080fd5b82601f830112610be257600080fd5b6040516080810181811067ffffffffffffffff82111715610c0557610c0561098b565b604052806080840185811115610c1a57600080fd5b845b81811015610c3b57610c2d81610bac565b835260209283019201610c1c565b509195945050505050565b634e487b7160e01b600052603260045260246000fd5b600060208284031215610c6e57600080fd5b610ba582610bac565b600060208284031215610c8957600080fd5b8151610ba581610940565b600063ffffffff808316818516808303821115610cc157634e487b7160e01b600052601160045260246000fd5b01949350505050565b600060208284031215610cdc57600080fd5b8151610ba5816108fc565b608081526000610cfa6080830187610b66565b63ffffffff861660208401528460408401528281036060840152610d1e8185610b66565b979650505050505050565b600060208284031215610d3b57600080fd5b5051919050565b60ff60f81b8660f81b1681526001600160601b03198560601b16600182015283601582015282603582015260008251610d82816055850160208701610b36565b919091016055019695505050505050565b604080825283519082018190526000906020906060840190828701845b82811015610dd55781516001600160a01b031684529284019290840190600101610db0565b5050508381038285015284518082528583019183019060005b81811015610e0a57835183529284019291840191600101610dee565b5090979650505050505050565b60008751610e29818460208c01610b36565b808301905060ff60f81b8860f81b1681526001600160601b03198760601b1660018201528560158201528460358201528351610e6c816055840160208801610b36565b016055019897505050505050505056fea2646970667358221220a8dc16a0720d22cfea464f3042e1441ed3cd7b3e0174cf88cc89bc06d05a90fc64736f6c634300080c0033";

type TributeMinionConstructorParams =
  | [signer?: Signer]
  | ConstructorParameters<typeof ContractFactory>;

const isSuperArgs = (
  xs: TributeMinionConstructorParams
): xs is ConstructorParameters<typeof ContractFactory> => xs.length > 1;

export class TributeMinion__factory extends ContractFactory {
  constructor(...args: TributeMinionConstructorParams) {
    if (isSuperArgs(args)) {
      super(...args);
    } else {
      super(_abi, _bytecode, args[0]);
    }
  }

  override deploy(
    overrides?: Overrides & { from?: PromiseOrValue<string> }
  ): Promise<TributeMinion> {
    return super.deploy(overrides || {}) as Promise<TributeMinion>;
  }
  override getDeployTransaction(
    overrides?: Overrides & { from?: PromiseOrValue<string> }
  ): TransactionRequest {
    return super.getDeployTransaction(overrides || {});
  }
  override attach(address: string): TributeMinion {
    return super.attach(address) as TributeMinion;
  }
  override connect(signer: Signer): TributeMinion__factory {
    return super.connect(signer) as TributeMinion__factory;
  }

  static readonly bytecode = _bytecode;
  static readonly abi = _abi;
  static createInterface(): TributeMinionInterface {
    return new utils.Interface(_abi) as TributeMinionInterface;
  }
  static connect(
    address: string,
    signerOrProvider: Signer | Provider
  ): TributeMinion {
    return new Contract(address, _abi, signerOrProvider) as TributeMinion;
  }
}
