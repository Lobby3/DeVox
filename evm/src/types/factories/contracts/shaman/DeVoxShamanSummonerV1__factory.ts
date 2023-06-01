/* Autogenerated file. Do not edit manually. */

/* tslint:disable */

/* eslint-disable */
import type { PromiseOrValue } from "../../../common";
import type {
  DeVoxShamanSummonerV1,
  DeVoxShamanSummonerV1Interface,
} from "../../../contracts/shaman/DeVoxShamanSummonerV1";
import type { Provider, TransactionRequest } from "@ethersproject/providers";
import { Signer, utils, Contract, ContractFactory, Overrides } from "ethers";

const _abi = [
  {
    inputs: [],
    stateMutability: "nonpayable",
    type: "constructor",
  },
  {
    anonymous: false,
    inputs: [
      {
        indexed: false,
        internalType: "address",
        name: "previousAdmin",
        type: "address",
      },
      {
        indexed: false,
        internalType: "address",
        name: "newAdmin",
        type: "address",
      },
    ],
    name: "AdminChanged",
    type: "event",
  },
  {
    anonymous: false,
    inputs: [
      {
        indexed: true,
        internalType: "address",
        name: "beacon",
        type: "address",
      },
    ],
    name: "BeaconUpgraded",
    type: "event",
  },
  {
    anonymous: false,
    inputs: [
      {
        indexed: false,
        internalType: "uint8",
        name: "version",
        type: "uint8",
      },
    ],
    name: "Initialized",
    type: "event",
  },
  {
    anonymous: false,
    inputs: [
      {
        indexed: true,
        internalType: "address",
        name: "previousOwner",
        type: "address",
      },
      {
        indexed: true,
        internalType: "address",
        name: "newOwner",
        type: "address",
      },
    ],
    name: "OwnershipTransferred",
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
        name: "shaman",
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
        name: "id",
        type: "uint256",
      },
      {
        indexed: false,
        internalType: "uint256",
        name: "pricePerUnit",
        type: "uint256",
      },
      {
        indexed: false,
        internalType: "uint256",
        name: "tokensPerUnit",
        type: "uint256",
      },
      {
        indexed: false,
        internalType: "uint256",
        name: "target",
        type: "uint256",
      },
      {
        indexed: false,
        internalType: "string",
        name: "name",
        type: "string",
      },
    ],
    name: "SummonComplete",
    type: "event",
  },
  {
    anonymous: false,
    inputs: [
      {
        indexed: true,
        internalType: "address",
        name: "implementation",
        type: "address",
      },
    ],
    name: "Upgraded",
    type: "event",
  },
  {
    inputs: [
      {
        internalType: "address payable",
        name: "_template",
        type: "address",
      },
    ],
    name: "initialize",
    outputs: [],
    stateMutability: "nonpayable",
    type: "function",
  },
  {
    inputs: [],
    name: "owner",
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
    inputs: [],
    name: "proxiableUUID",
    outputs: [
      {
        internalType: "bytes32",
        name: "",
        type: "bytes32",
      },
    ],
    stateMutability: "view",
    type: "function",
  },
  {
    inputs: [],
    name: "renounceOwnership",
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
        internalType: "address payable",
        name: "_token",
        type: "address",
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
        internalType: "string",
        name: "_name",
        type: "string",
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
  {
    inputs: [],
    name: "template",
    outputs: [
      {
        internalType: "address payable",
        name: "",
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
        name: "newOwner",
        type: "address",
      },
    ],
    name: "transferOwnership",
    outputs: [],
    stateMutability: "nonpayable",
    type: "function",
  },
  {
    inputs: [],
    name: "updateVersion",
    outputs: [],
    stateMutability: "nonpayable",
    type: "function",
  },
  {
    inputs: [
      {
        internalType: "address",
        name: "newImplementation",
        type: "address",
      },
    ],
    name: "upgradeTo",
    outputs: [],
    stateMutability: "nonpayable",
    type: "function",
  },
  {
    inputs: [
      {
        internalType: "address",
        name: "newImplementation",
        type: "address",
      },
      {
        internalType: "bytes",
        name: "data",
        type: "bytes",
      },
    ],
    name: "upgradeToAndCall",
    outputs: [],
    stateMutability: "payable",
    type: "function",
  },
  {
    inputs: [],
    name: "version",
    outputs: [
      {
        internalType: "uint256",
        name: "",
        type: "uint256",
      },
    ],
    stateMutability: "view",
    type: "function",
  },
] as const;

const _bytecode =
  "0x60a06040523060805234801561001457600080fd5b5061001d610022565b6100e1565b600054610100900460ff161561008e5760405162461bcd60e51b815260206004820152602760248201527f496e697469616c697a61626c653a20636f6e747261637420697320696e697469604482015266616c697a696e6760c81b606482015260840160405180910390fd5b60005460ff908116146100df576000805460ff191660ff9081179091556040519081527f7f26b83ff96e1f2b6a682f133852f6798a09c465da95921460cefb38474024989060200160405180910390a15b565b6080516118f561011860003960008181610354015281816103a001528181610474015281816104b7015261053c01526118f56000f3fe608060405260043610620000a95760003560e01c806354fd4d50116200006c57806354fd4d50146200016d5780636f2ddd931462000188578063715018a614620001aa5780638da5cb5b14620001c2578063c4d66de814620001e2578063f2fde38b146200020757600080fd5b80631c6a321314620000ae5780633659cfe614620000f057806348c02dc114620001175780634f1ef286146200012f57806352d1902d1462000146575b600080fd5b348015620000bb57600080fd5b50620000d3620000cd36600462000dc0565b6200022c565b6040516001600160a01b0390911681526020015b60405180910390f35b348015620000fd57600080fd5b50620001156200010f36600462000e5b565b62000349565b005b3480156200012457600080fd5b506200011562000427565b620001156200014036600462000e7b565b62000469565b3480156200015357600080fd5b506200015e6200052f565b604051908152602001620000e7565b3480156200017a57600080fd5b5060c95461ffff166200015e565b3480156200019557600080fd5b5060cb54620000d3906001600160a01b031681565b348015620001b757600080fd5b5062000115620005e0565b348015620001cf57600080fd5b506033546001600160a01b0316620000d3565b348015620001ef57600080fd5b50620001156200020136600462000e5b565b620005f8565b3480156200021457600080fd5b50620001156200022636600462000e5b565b62000737565b600060ca5460016200023f919062000efc565b60ca81905560cb54604080516001600160a01b038b811660248301528a8116604483015260648201949094526084810189905260a4810188905260c48082018890528251808303909101815260e490910182526020810180516001600160e01b03166386489ba960e01b179052905160009390921691620002c09062000d09565b620002cd92919062000f74565b604051809103906000f080158015620002ea573d6000803e3d6000fd5b509050876001600160a01b03167f46e75ef61e6d482d4336b05d0b2d62abd0a099890ccd80069b3f9a38daa5cc83828960ca548a8a8a8a60405162000336979695949392919062000f9a565b60405180910390a2979650505050505050565b306001600160a01b037f00000000000000000000000000000000000000000000000000000000000000001614156200039e5760405162461bcd60e51b8152600401620003959062000fec565b60405180910390fd5b7f00000000000000000000000000000000000000000000000000000000000000006001600160a01b0316620003d2620007b3565b6001600160a01b031614620003fb5760405162461bcd60e51b8152600401620003959062001038565b6200040681620007d0565b604080516000808252602082019092526200042491839190620007da565b50565b6200043162000957565b60c98054600191906000906200044d90849061ffff1662001084565b92506101000a81548161ffff021916908361ffff160217905550565b306001600160a01b037f0000000000000000000000000000000000000000000000000000000000000000161415620004b55760405162461bcd60e51b8152600401620003959062000fec565b7f00000000000000000000000000000000000000000000000000000000000000006001600160a01b0316620004e9620007b3565b6001600160a01b031614620005125760405162461bcd60e51b8152600401620003959062001038565b6200051d82620007d0565b6200052b82826001620007da565b5050565b6000306001600160a01b037f00000000000000000000000000000000000000000000000000000000000000001614620005cc5760405162461bcd60e51b815260206004820152603860248201527f555550535570677261646561626c653a206d757374206e6f742062652063616c6044820152771b1959081d1a1c9bdd59da0819195b1959d85d1958d85b1b60421b606482015260840162000395565b506000805160206200187983398151915290565b620005ea62000957565b620005f66000620009b3565b565b600054610100900460ff1615808015620006195750600054600160ff909116105b80620006355750303b15801562000635575060005460ff166001145b6200069a5760405162461bcd60e51b815260206004820152602e60248201527f496e697469616c697a61626c653a20636f6e747261637420697320616c72656160448201526d191e481a5b9a5d1a585b1a5e995960921b606482015260840162000395565b6000805460ff191660011790558015620006be576000805461ff0019166101001790555b620006c862000a05565b620006d262000a39565b60cb80546001600160a01b0319166001600160a01b03841617905580156200052b576000805461ff0019169055604051600181527f7f26b83ff96e1f2b6a682f133852f6798a09c465da95921460cefb38474024989060200160405180910390a15050565b6200074162000957565b6001600160a01b038116620007a85760405162461bcd60e51b815260206004820152602660248201527f4f776e61626c653a206e6577206f776e657220697320746865207a65726f206160448201526564647265737360d01b606482015260840162000395565b6200042481620009b3565b60008051602062001879833981519152546001600160a01b031690565b6200042462000957565b7f4910fdfa16fed3260ed0e7147f7cc6da11a60208b5b9406d12a635614ffd91435460ff16156200081557620008108362000a63565b505050565b826001600160a01b03166352d1902d6040518163ffffffff1660e01b8152600401602060405180830381865afa92505050801562000872575060408051601f3d908101601f191682019092526200086f91810190620010ad565b60015b620008d75760405162461bcd60e51b815260206004820152602e60248201527f45524331393637557067726164653a206e657720696d706c656d656e7461746960448201526d6f6e206973206e6f74205555505360901b606482015260840162000395565b600080516020620018798339815191528114620009495760405162461bcd60e51b815260206004820152602960248201527f45524331393637557067726164653a20756e737570706f727465642070726f786044820152681a58589b195555525160ba1b606482015260840162000395565b506200081083838362000b02565b6033546001600160a01b03163314620005f65760405162461bcd60e51b815260206004820181905260248201527f4f776e61626c653a2063616c6c6572206973206e6f7420746865206f776e6572604482015260640162000395565b603380546001600160a01b038381166001600160a01b0319831681179093556040519116919082907f8be0079c531659141344cd1fd0a4f28419497f9722a3daafe3b4186f6b6457e090600090a35050565b600054610100900460ff1662000a2f5760405162461bcd60e51b81526004016200039590620010c7565b620005f662000b33565b600054610100900460ff16620005f65760405162461bcd60e51b81526004016200039590620010c7565b6001600160a01b0381163b62000ad25760405162461bcd60e51b815260206004820152602d60248201527f455243313936373a206e657720696d706c656d656e746174696f6e206973206e60448201526c1bdd08184818dbdb9d1c9858dd609a1b606482015260840162000395565b6000805160206200187983398151915280546001600160a01b0319166001600160a01b0392909216919091179055565b62000b0d8362000b68565b60008251118062000b1b5750805b15620008105762000b2d838362000baa565b50505050565b600054610100900460ff1662000b5d5760405162461bcd60e51b81526004016200039590620010c7565b620005f633620009b3565b62000b738162000a63565b6040516001600160a01b038216907fbc7cd75a20ee27fd9adebab32041f755214dbc6bffa90cc0225b39da2e5c2d3b90600090a250565b606062000bd28383604051806060016040528060278152602001620018996027913962000bd9565b9392505050565b6060600080856001600160a01b03168560405162000bf8919062001112565b600060405180830381855af49150503d806000811462000c35576040519150601f19603f3d011682016040523d82523d6000602084013e62000c3a565b606091505b509150915062000c4d8683838762000c57565b9695505050505050565b6060831562000cc857825162000cc0576001600160a01b0385163b62000cc05760405162461bcd60e51b815260206004820152601d60248201527f416464726573733a2063616c6c20746f206e6f6e2d636f6e7472616374000000604482015260640162000395565b508162000cd4565b62000cd4838362000cdc565b949350505050565b81511562000ced5781518083602001fd5b8060405162461bcd60e51b815260040162000395919062001130565b610733806200114683390190565b6001600160a01b03811681146200042457600080fd5b634e487b7160e01b600052604160045260246000fd5b600067ffffffffffffffff8084111562000d615762000d6162000d2d565b604051601f8501601f19908116603f0116810190828211818310171562000d8c5762000d8c62000d2d565b8160405280935085815286868601111562000da657600080fd5b858560208301376000602087830101525050509392505050565b60008060008060008060c0878903121562000dda57600080fd5b863562000de78162000d17565b9550602087013562000df98162000d17565b945060408701359350606087013592506080870135915060a087013567ffffffffffffffff81111562000e2b57600080fd5b8701601f8101891362000e3d57600080fd5b62000e4e8982356020840162000d43565b9150509295509295509295565b60006020828403121562000e6e57600080fd5b813562000bd28162000d17565b6000806040838503121562000e8f57600080fd5b823562000e9c8162000d17565b9150602083013567ffffffffffffffff81111562000eb957600080fd5b8301601f8101851362000ecb57600080fd5b62000edc8582356020840162000d43565b9150509250929050565b634e487b7160e01b600052601160045260246000fd5b6000821982111562000f125762000f1262000ee6565b500190565b60005b8381101562000f3457818101518382015260200162000f1a565b8381111562000b2d5750506000910152565b6000815180845262000f6081602086016020860162000f17565b601f01601f19169290920160200192915050565b6001600160a01b038316815260406020820181905260009062000cd49083018462000f46565b600060018060a01b03808a1683528089166020840152508660408301528560608301528460808301528360a083015260e060c083015262000fdf60e083018462000f46565b9998505050505050505050565b6020808252602c908201527f46756e6374696f6e206d7573742062652063616c6c6564207468726f7567682060408201526b19195b1959d85d1958d85b1b60a21b606082015260800190565b6020808252602c908201527f46756e6374696f6e206d7573742062652063616c6c6564207468726f7567682060408201526b6163746976652070726f787960a01b606082015260800190565b600061ffff808316818516808303821115620010a457620010a462000ee6565b01949350505050565b600060208284031215620010c057600080fd5b5051919050565b6020808252602b908201527f496e697469616c697a61626c653a20636f6e7472616374206973206e6f74206960408201526a6e697469616c697a696e6760a81b606082015260800190565b600082516200112681846020870162000f17565b9190910192915050565b60208152600062000bd2602083018462000f4656fe60806040526040516107333803806107338339810160408190526100229161031e565b61002e82826000610035565b505061043b565b61003e8361006b565b60008251118061004b5750805b156100665761006483836100ab60201b6100291760201c565b505b505050565b610074816100d7565b6040516001600160a01b038216907fbc7cd75a20ee27fd9adebab32041f755214dbc6bffa90cc0225b39da2e5c2d3b90600090a250565b60606100d0838360405180606001604052806027815260200161070c602791396101a9565b9392505050565b6100ea8161022260201b6100551760201c565b6101515760405162461bcd60e51b815260206004820152602d60248201527f455243313936373a206e657720696d706c656d656e746174696f6e206973206e60448201526c1bdd08184818dbdb9d1c9858dd609a1b60648201526084015b60405180910390fd5b806101887f360894a13ba1a3210667c828492db98dca3e2076cc3735a920a3ca505d382bbc60001b61023160201b6100641760201c565b80546001600160a01b0319166001600160a01b039290921691909117905550565b6060600080856001600160a01b0316856040516101c691906103ec565b600060405180830381855af49150503d8060008114610201576040519150601f19603f3d011682016040523d82523d6000602084013e610206565b606091505b50909250905061021886838387610234565b9695505050505050565b6001600160a01b03163b151590565b90565b606083156102a0578251610299576001600160a01b0385163b6102995760405162461bcd60e51b815260206004820152601d60248201527f416464726573733a2063616c6c20746f206e6f6e2d636f6e74726163740000006044820152606401610148565b50816102aa565b6102aa83836102b2565b949350505050565b8151156102c25781518083602001fd5b8060405162461bcd60e51b81526004016101489190610408565b634e487b7160e01b600052604160045260246000fd5b60005b8381101561030d5781810151838201526020016102f5565b838111156100645750506000910152565b6000806040838503121561033157600080fd5b82516001600160a01b038116811461034857600080fd5b60208401519092506001600160401b038082111561036557600080fd5b818501915085601f83011261037957600080fd5b81518181111561038b5761038b6102dc565b604051601f8201601f19908116603f011681019083821181831017156103b3576103b36102dc565b816040528281528860208487010111156103cc57600080fd5b6103dd8360208301602088016102f2565b80955050505050509250929050565b600082516103fe8184602087016102f2565b9190910192915050565b60208152600082518060208401526104278160408501602087016102f2565b601f01601f19169190910160400192915050565b6102c28061044a6000396000f3fe60806040523661001357610011610017565b005b6100115b610027610022610067565b61009f565b565b606061004e8383604051806060016040528060278152602001610266602791396100c3565b9392505050565b6001600160a01b03163b151590565b90565b600061009a7f360894a13ba1a3210667c828492db98dca3e2076cc3735a920a3ca505d382bbc546001600160a01b031690565b905090565b3660008037600080366000845af43d6000803e8080156100be573d6000f35b3d6000fd5b6060600080856001600160a01b0316856040516100e09190610216565b600060405180830381855af49150503d806000811461011b576040519150601f19603f3d011682016040523d82523d6000602084013e610120565b606091505b50915091506101318683838761013b565b9695505050505050565b606083156101aa5782516101a35761015285610055565b6101a35760405162461bcd60e51b815260206004820152601d60248201527f416464726573733a2063616c6c20746f206e6f6e2d636f6e747261637400000060448201526064015b60405180910390fd5b50816101b4565b6101b483836101bc565b949350505050565b8151156101cc5781518083602001fd5b8060405162461bcd60e51b815260040161019a9190610232565b60005b838110156102015781810151838201526020016101e9565b83811115610210576000848401525b50505050565b600082516102288184602087016101e6565b9190910192915050565b60208152600082518060208401526102518160408501602087016101e6565b601f01601f1916919091016040019291505056fe416464726573733a206c6f772d6c6576656c2064656c65676174652063616c6c206661696c6564a2646970667358221220b0e68f1a4a8b2a87647f69ae480fc6171b2734a850d60040e35bfd0bd0c1569564736f6c634300080c0033416464726573733a206c6f772d6c6576656c2064656c65676174652063616c6c206661696c6564360894a13ba1a3210667c828492db98dca3e2076cc3735a920a3ca505d382bbc416464726573733a206c6f772d6c6576656c2064656c65676174652063616c6c206661696c6564a2646970667358221220f5624aa681c34eb1d3cb81dbede5edf6e25b60a9c7aa5dad17650d766cd0ebed64736f6c634300080c0033";

type DeVoxShamanSummonerV1ConstructorParams =
  | [signer?: Signer]
  | ConstructorParameters<typeof ContractFactory>;

const isSuperArgs = (
  xs: DeVoxShamanSummonerV1ConstructorParams
): xs is ConstructorParameters<typeof ContractFactory> => xs.length > 1;

export class DeVoxShamanSummonerV1__factory extends ContractFactory {
  constructor(...args: DeVoxShamanSummonerV1ConstructorParams) {
    if (isSuperArgs(args)) {
      super(...args);
    } else {
      super(_abi, _bytecode, args[0]);
    }
  }

  override deploy(
    overrides?: Overrides & { from?: PromiseOrValue<string> }
  ): Promise<DeVoxShamanSummonerV1> {
    return super.deploy(overrides || {}) as Promise<DeVoxShamanSummonerV1>;
  }
  override getDeployTransaction(
    overrides?: Overrides & { from?: PromiseOrValue<string> }
  ): TransactionRequest {
    return super.getDeployTransaction(overrides || {});
  }
  override attach(address: string): DeVoxShamanSummonerV1 {
    return super.attach(address) as DeVoxShamanSummonerV1;
  }
  override connect(signer: Signer): DeVoxShamanSummonerV1__factory {
    return super.connect(signer) as DeVoxShamanSummonerV1__factory;
  }

  static readonly bytecode = _bytecode;
  static readonly abi = _abi;
  static createInterface(): DeVoxShamanSummonerV1Interface {
    return new utils.Interface(_abi) as DeVoxShamanSummonerV1Interface;
  }
  static connect(
    address: string,
    signerOrProvider: Signer | Provider
  ): DeVoxShamanSummonerV1 {
    return new Contract(
      address,
      _abi,
      signerOrProvider
    ) as DeVoxShamanSummonerV1;
  }
}
