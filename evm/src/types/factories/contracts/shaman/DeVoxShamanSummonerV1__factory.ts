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
        indexed: true,
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
  "0x60a06040523060805234801561001457600080fd5b5061001d610022565b6100e1565b600054610100900460ff161561008e5760405162461bcd60e51b815260206004820152602760248201527f496e697469616c697a61626c653a20636f6e747261637420697320696e697469604482015266616c697a696e6760c81b606482015260840160405180910390fd5b60005460ff908116146100df576000805460ff191660ff9081179091556040519081527f7f26b83ff96e1f2b6a682f133852f6798a09c465da95921460cefb38474024989060200160405180910390a15b565b608051611ca26101186000396000818161023701528181610283015281816103570152818161039a015261041f0152611ca26000f3fe608060405260043610620000a95760003560e01c80636f2ddd93116200006c5780636f2ddd93146200014a578063715018a614620001855780637e919b09146200019d5780638da5cb5b14620001c2578063c4d66de814620001e2578063f2fde38b146200020757600080fd5b80633659cfe614620000ae57806348c02dc114620000d55780634f1ef28614620000ed57806352d1902d146200010457806354fd4d50146200012f575b600080fd5b348015620000bb57600080fd5b50620000d3620000cd36600462000f0d565b6200022c565b005b348015620000e257600080fd5b50620000d36200030a565b620000d3620000fe36600462000fd5565b6200034c565b3480156200011157600080fd5b506200011c62000412565b6040519081526020015b60405180910390f35b3480156200013c57600080fd5b5060c95461ffff166200011c565b3480156200015757600080fd5b5060cb546200016c906001600160a01b031681565b6040516001600160a01b03909116815260200162000126565b3480156200019257600080fd5b50620000d3620004c3565b348015620001aa57600080fd5b506200016c620001bc36600462001040565b620004db565b348015620001cf57600080fd5b506033546001600160a01b03166200016c565b348015620001ef57600080fd5b50620000d36200020136600462000f0d565b620007d8565b3480156200021457600080fd5b50620000d36200022636600462000f0d565b62000917565b306001600160a01b037f0000000000000000000000000000000000000000000000000000000000000000161415620002815760405162461bcd60e51b81526004016200027890620010cc565b60405180910390fd5b7f00000000000000000000000000000000000000000000000000000000000000006001600160a01b0316620002b562000993565b6001600160a01b031614620002de5760405162461bcd60e51b8152600401620002789062001118565b620002e981620009b0565b604080516000808252602082019092526200030791839190620009ba565b50565b6200031462000b37565b60c98054600191906000906200033090849061ffff166200117a565b92506101000a81548161ffff021916908361ffff160217905550565b306001600160a01b037f0000000000000000000000000000000000000000000000000000000000000000161415620003985760405162461bcd60e51b81526004016200027890620010cc565b7f00000000000000000000000000000000000000000000000000000000000000006001600160a01b0316620003cc62000993565b6001600160a01b031614620003f55760405162461bcd60e51b8152600401620002789062001118565b6200040082620009b0565b6200040e82826001620009ba565b5050565b6000306001600160a01b037f00000000000000000000000000000000000000000000000000000000000000001614620004af5760405162461bcd60e51b815260206004820152603860248201527f555550535570677261646561626c653a206d757374206e6f742062652063616c6044820152771b1959081d1a1c9bdd59da0819195b1959d85d1958d85b1b60421b606482015260840162000278565b5060008051602062001c2683398151915290565b620004cd62000b37565b620004d9600062000b93565b565b600060ca546001620004ee9190620011a3565b60ca556000808080808062000506888a018a620011be565b95509550955095509550955060006001600160a01b03168a6001600160a01b031614156200058a5760405162461bcd60e51b815260206004820152602a60248201527f4465566f785368616d616e53756d6d6f6e657256313a205f6261616c2063616e60448201526906e6f74206265203078360b41b606482015260840162000278565b6001600160a01b038616620005f65760405162461bcd60e51b815260206004820152602b60248201527f4465566f785368616d616e53756d6d6f6e657256313a205f746f6b656e20636160448201526a06e6e6f74206265203078360ac1b606482015260840162000278565b60cb5460ca546040516000926001600160a01b03169163092edb8560e21b9162000630918f918c91908c908c908c908b90602401620012ee565b60408051601f198184030181529181526020820180516001600160e01b03166001600160e01b03199094169390931790925290516200066f9062000ee9565b6200067c929190620013cd565b604051809103906000f08015801562000699573d6000803e3d6000fd5b509050866001600160a01b0316816001600160a01b031663fc0c546a6040518163ffffffff1660e01b8152600401602060405180830381865afa158015620006e5573d6000803e3d6000fd5b505050506040513d601f19601f820116820180604052508101906200070b9190620013f3565b6001600160a01b031614620007715760405162461bcd60e51b815260206004820152602560248201527f4465566f785368616d616e53756d6d6f6e657256313a20746f6b656e206d69736044820152640dac2e8c6d60db1b606482015260840162000278565b806001600160a01b03168b6001600160a01b03167f46e75ef61e6d482d4336b05d0b2d62abd0a099890ccd80069b3f9a38daa5cc838960ca548a8a8a8a604051620007c29695949392919062001413565b60405180910390a39a9950505050505050505050565b600054610100900460ff1615808015620007f95750600054600160ff909116105b80620008155750303b15801562000815575060005460ff166001145b6200087a5760405162461bcd60e51b815260206004820152602e60248201527f496e697469616c697a61626c653a20636f6e747261637420697320616c72656160448201526d191e481a5b9a5d1a585b1a5e995960921b606482015260840162000278565b6000805460ff1916600117905580156200089e576000805461ff0019166101001790555b620008a862000be5565b620008b262000c19565b60cb80546001600160a01b0319166001600160a01b03841617905580156200040e576000805461ff0019169055604051600181527f7f26b83ff96e1f2b6a682f133852f6798a09c465da95921460cefb38474024989060200160405180910390a15050565b6200092162000b37565b6001600160a01b038116620009885760405162461bcd60e51b815260206004820152602660248201527f4f776e61626c653a206e6577206f776e657220697320746865207a65726f206160448201526564647265737360d01b606482015260840162000278565b620003078162000b93565b60008051602062001c26833981519152546001600160a01b031690565b6200030762000b37565b7f4910fdfa16fed3260ed0e7147f7cc6da11a60208b5b9406d12a635614ffd91435460ff1615620009f557620009f08362000c43565b505050565b826001600160a01b03166352d1902d6040518163ffffffff1660e01b8152600401602060405180830381865afa92505050801562000a52575060408051601f3d908101601f1916820190925262000a4f918101906200145a565b60015b62000ab75760405162461bcd60e51b815260206004820152602e60248201527f45524331393637557067726164653a206e657720696d706c656d656e7461746960448201526d6f6e206973206e6f74205555505360901b606482015260840162000278565b60008051602062001c26833981519152811462000b295760405162461bcd60e51b815260206004820152602960248201527f45524331393637557067726164653a20756e737570706f727465642070726f786044820152681a58589b195555525160ba1b606482015260840162000278565b50620009f083838362000ce2565b6033546001600160a01b03163314620004d95760405162461bcd60e51b815260206004820181905260248201527f4f776e61626c653a2063616c6c6572206973206e6f7420746865206f776e6572604482015260640162000278565b603380546001600160a01b038381166001600160a01b0319831681179093556040519116919082907f8be0079c531659141344cd1fd0a4f28419497f9722a3daafe3b4186f6b6457e090600090a35050565b600054610100900460ff1662000c0f5760405162461bcd60e51b8152600401620002789062001474565b620004d962000d13565b600054610100900460ff16620004d95760405162461bcd60e51b8152600401620002789062001474565b6001600160a01b0381163b62000cb25760405162461bcd60e51b815260206004820152602d60248201527f455243313936373a206e657720696d706c656d656e746174696f6e206973206e60448201526c1bdd08184818dbdb9d1c9858dd609a1b606482015260840162000278565b60008051602062001c2683398151915280546001600160a01b0319166001600160a01b0392909216919091179055565b62000ced8362000d48565b60008251118062000cfb5750805b15620009f05762000d0d838362000d8a565b50505050565b600054610100900460ff1662000d3d5760405162461bcd60e51b8152600401620002789062001474565b620004d93362000b93565b62000d538162000c43565b6040516001600160a01b038216907fbc7cd75a20ee27fd9adebab32041f755214dbc6bffa90cc0225b39da2e5c2d3b90600090a250565b606062000db2838360405180606001604052806027815260200162001c466027913962000db9565b9392505050565b6060600080856001600160a01b03168560405162000dd89190620014bf565b600060405180830381855af49150503d806000811462000e15576040519150601f19603f3d011682016040523d82523d6000602084013e62000e1a565b606091505b509150915062000e2d8683838762000e37565b9695505050505050565b6060831562000ea857825162000ea0576001600160a01b0385163b62000ea05760405162461bcd60e51b815260206004820152601d60248201527f416464726573733a2063616c6c20746f206e6f6e2d636f6e7472616374000000604482015260640162000278565b508162000eb4565b62000eb4838362000ebc565b949350505050565b81511562000ecd5781518083602001fd5b8060405162461bcd60e51b8152600401620002789190620014dd565b61073380620014f383390190565b6001600160a01b03811681146200030757600080fd5b60006020828403121562000f2057600080fd5b813562000db28162000ef7565b634e487b7160e01b600052604160045260246000fd5b604051601f8201601f1916810167ffffffffffffffff8111828210171562000f6f5762000f6f62000f2d565b604052919050565b600067ffffffffffffffff83111562000f945762000f9462000f2d565b62000fa9601f8401601f191660200162000f43565b905082815283838301111562000fbe57600080fd5b828260208301376000602084830101529392505050565b6000806040838503121562000fe957600080fd5b823562000ff68162000ef7565b9150602083013567ffffffffffffffff8111156200101357600080fd5b8301601f810185136200102557600080fd5b620010368582356020840162000f77565b9150509250929050565b6000806000604084860312156200105657600080fd5b8335620010638162000ef7565b9250602084013567ffffffffffffffff808211156200108157600080fd5b818601915086601f8301126200109657600080fd5b813581811115620010a657600080fd5b876020828501011115620010b957600080fd5b6020830194508093505050509250925092565b6020808252602c908201527f46756e6374696f6e206d7573742062652063616c6c6564207468726f7567682060408201526b19195b1959d85d1958d85b1b60a21b606082015260800190565b6020808252602c908201527f46756e6374696f6e206d7573742062652063616c6c6564207468726f7567682060408201526b6163746976652070726f787960a01b606082015260800190565b634e487b7160e01b600052601160045260246000fd5b600061ffff8083168185168083038211156200119a576200119a62001164565b01949350505050565b60008219821115620011b957620011b962001164565b500190565b60008060008060008060c08789031215620011d857600080fd5b8635620011e58162000ef7565b955060208781013595506040880135945060608801359350608088013567ffffffffffffffff808211156200121957600080fd5b818a0191508a601f8301126200122e57600080fd5b6200123e8b833585850162000f77565b945060a08a01359150808211156200125557600080fd5b818a0191508a601f8301126200126a57600080fd5b8135818111156200127f576200127f62000f2d565b8060051b91506200129284830162000f43565b818152918301840191848101908d841115620012ad57600080fd5b938501935b83851015620012db5784359250620012ca8362000ef7565b8282529385019390850190620012b2565b8096505050505050509295509295509295565b600060e0820160018060a01b03808b1684526020818b16818601528960408601528860608601528760808601528660a086015260e060c086015282865180855261010087019150828801945060005b818110156200135d5785518516835294830194918301916001016200133d565b50909d9c50505050505050505050505050565b60005b838110156200138d57818101518382015260200162001373565b8381111562000d0d5750506000910152565b60008151808452620013b981602086016020860162001370565b601f01601f19169290920160200192915050565b6001600160a01b038316815260406020820181905260009062000eb4908301846200139f565b6000602082840312156200140657600080fd5b815162000db28162000ef7565b60018060a01b038716815285602082015284604082015283606082015282608082015260c060a082015260006200144e60c08301846200139f565b98975050505050505050565b6000602082840312156200146d57600080fd5b5051919050565b6020808252602b908201527f496e697469616c697a61626c653a20636f6e7472616374206973206e6f74206960408201526a6e697469616c697a696e6760a81b606082015260800190565b60008251620014d381846020870162001370565b9190910192915050565b60208152600062000db260208301846200139f56fe60806040526040516107333803806107338339810160408190526100229161031e565b61002e82826000610035565b505061043b565b61003e8361006b565b60008251118061004b5750805b156100665761006483836100ab60201b6100291760201c565b505b505050565b610074816100d7565b6040516001600160a01b038216907fbc7cd75a20ee27fd9adebab32041f755214dbc6bffa90cc0225b39da2e5c2d3b90600090a250565b60606100d0838360405180606001604052806027815260200161070c602791396101a9565b9392505050565b6100ea8161022260201b6100551760201c565b6101515760405162461bcd60e51b815260206004820152602d60248201527f455243313936373a206e657720696d706c656d656e746174696f6e206973206e60448201526c1bdd08184818dbdb9d1c9858dd609a1b60648201526084015b60405180910390fd5b806101887f360894a13ba1a3210667c828492db98dca3e2076cc3735a920a3ca505d382bbc60001b61023160201b6100641760201c565b80546001600160a01b0319166001600160a01b039290921691909117905550565b6060600080856001600160a01b0316856040516101c691906103ec565b600060405180830381855af49150503d8060008114610201576040519150601f19603f3d011682016040523d82523d6000602084013e610206565b606091505b50909250905061021886838387610234565b9695505050505050565b6001600160a01b03163b151590565b90565b606083156102a0578251610299576001600160a01b0385163b6102995760405162461bcd60e51b815260206004820152601d60248201527f416464726573733a2063616c6c20746f206e6f6e2d636f6e74726163740000006044820152606401610148565b50816102aa565b6102aa83836102b2565b949350505050565b8151156102c25781518083602001fd5b8060405162461bcd60e51b81526004016101489190610408565b634e487b7160e01b600052604160045260246000fd5b60005b8381101561030d5781810151838201526020016102f5565b838111156100645750506000910152565b6000806040838503121561033157600080fd5b82516001600160a01b038116811461034857600080fd5b60208401519092506001600160401b038082111561036557600080fd5b818501915085601f83011261037957600080fd5b81518181111561038b5761038b6102dc565b604051601f8201601f19908116603f011681019083821181831017156103b3576103b36102dc565b816040528281528860208487010111156103cc57600080fd5b6103dd8360208301602088016102f2565b80955050505050509250929050565b600082516103fe8184602087016102f2565b9190910192915050565b60208152600082518060208401526104278160408501602087016102f2565b601f01601f19169190910160400192915050565b6102c28061044a6000396000f3fe60806040523661001357610011610017565b005b6100115b610027610022610067565b61009f565b565b606061004e8383604051806060016040528060278152602001610266602791396100c3565b9392505050565b6001600160a01b03163b151590565b90565b600061009a7f360894a13ba1a3210667c828492db98dca3e2076cc3735a920a3ca505d382bbc546001600160a01b031690565b905090565b3660008037600080366000845af43d6000803e8080156100be573d6000f35b3d6000fd5b6060600080856001600160a01b0316856040516100e09190610216565b600060405180830381855af49150503d806000811461011b576040519150601f19603f3d011682016040523d82523d6000602084013e610120565b606091505b50915091506101318683838761013b565b9695505050505050565b606083156101aa5782516101a35761015285610055565b6101a35760405162461bcd60e51b815260206004820152601d60248201527f416464726573733a2063616c6c20746f206e6f6e2d636f6e747261637400000060448201526064015b60405180910390fd5b50816101b4565b6101b483836101bc565b949350505050565b8151156101cc5781518083602001fd5b8060405162461bcd60e51b815260040161019a9190610232565b60005b838110156102015781810151838201526020016101e9565b83811115610210576000848401525b50505050565b600082516102288184602087016101e6565b9190910192915050565b60208152600082518060208401526102518160408501602087016101e6565b601f01601f1916919091016040019291505056fe416464726573733a206c6f772d6c6576656c2064656c65676174652063616c6c206661696c6564a2646970667358221220b0e68f1a4a8b2a87647f69ae480fc6171b2734a850d60040e35bfd0bd0c1569564736f6c634300080c0033416464726573733a206c6f772d6c6576656c2064656c65676174652063616c6c206661696c6564360894a13ba1a3210667c828492db98dca3e2076cc3735a920a3ca505d382bbc416464726573733a206c6f772d6c6576656c2064656c65676174652063616c6c206661696c6564a2646970667358221220c539fd6f805b733546ec7545ec968bccd45cb5538d17ab45e6afff6f5907b37a64736f6c634300080c0033";

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
