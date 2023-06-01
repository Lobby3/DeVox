/* Autogenerated file. Do not edit manually. */

/* tslint:disable */

/* eslint-disable */
import type { PromiseOrValue } from "../../../common";
import type {
  DeVoxShamanV1,
  DeVoxShamanV1Interface,
} from "../../../contracts/shaman/DeVoxShamanV1";
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
        indexed: true,
        internalType: "address",
        name: "contributorAddress",
        type: "address",
      },
      {
        indexed: false,
        internalType: "address",
        name: "baal",
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
        name: "amount",
        type: "uint256",
      },
      {
        indexed: false,
        internalType: "uint256",
        name: "total",
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
        internalType: "uint256",
        name: "balance",
        type: "uint256",
      },
      {
        indexed: false,
        internalType: "uint256",
        name: "lootIssued",
        type: "uint256",
      },
      {
        indexed: false,
        internalType: "uint256",
        name: "sharesIssued",
        type: "uint256",
      },
      {
        indexed: false,
        internalType: "string",
        name: "message",
        type: "string",
      },
    ],
    name: "DonationReceived",
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
        indexed: false,
        internalType: "uint256",
        name: "id",
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
        internalType: "uint256",
        name: "balance",
        type: "uint256",
      },
    ],
    name: "TargetUpdated",
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
    anonymous: false,
    inputs: [
      {
        indexed: true,
        internalType: "address",
        name: "user",
        type: "address",
      },
      {
        indexed: false,
        internalType: "bool",
        name: "status",
        type: "bool",
      },
      {
        indexed: false,
        internalType: "bytes",
        name: "metadata",
        type: "bytes",
      },
    ],
    name: "UserWhitelisted",
    type: "event",
  },
  {
    inputs: [],
    name: "baal",
    outputs: [
      {
        internalType: "contract IBaal",
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
        name: "",
        type: "address",
      },
    ],
    name: "donations",
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
  {
    inputs: [],
    name: "getTokenBalance",
    outputs: [
      {
        internalType: "uint256",
        name: "",
        type: "uint256",
      },
    ],
    stateMutability: "nonpayable",
    type: "function",
  },
  {
    inputs: [],
    name: "id",
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
    name: "pricePerUnit",
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
        internalType: "uint256",
        name: "_target",
        type: "uint256",
      },
    ],
    name: "setTarget",
    outputs: [],
    stateMutability: "nonpayable",
    type: "function",
  },
  {
    inputs: [],
    name: "target",
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
  {
    inputs: [],
    name: "token",
    outputs: [
      {
        internalType: "contract IERC20",
        name: "",
        type: "address",
      },
    ],
    stateMutability: "view",
    type: "function",
  },
  {
    inputs: [],
    name: "tokensPerUnit",
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
  {
    inputs: [
      {
        internalType: "bool",
        name: "_status",
        type: "bool",
      },
      {
        internalType: "bytes",
        name: "_metadata",
        type: "bytes",
      },
    ],
    name: "whitelist",
    outputs: [],
    stateMutability: "nonpayable",
    type: "function",
  },
] as const;

const _bytecode =
  "0x60a06040523060805234801561001457600080fd5b5061001d610022565b6100e1565b600054610100900460ff161561008e5760405162461bcd60e51b815260206004820152602760248201527f496e697469616c697a61626c653a20636f6e747261637420697320696e697469604482015266616c697a696e6760c81b606482015260840160405180910390fd5b60005460ff908116146100df576000805460ff191660ff9081179091556040519081527f7f26b83ff96e1f2b6a682f133852f6798a09c465da95921460cefb38474024989060200160405180910390a15b565b608051611bc461011860003960008181610379015281816103c201528181610489015281816104c901526105450152611bc46000f3fe60806040526004361061011f5760003560e01c80639d794508116100a0578063e5a2a2a511610064578063e5a2a2a5146102dc578063e66825c314610302578063f2fde38b14610318578063f8d2876814610338578063fc0c546a1461034e57600080fd5b80639d79450814610240578063af640d0f14610260578063b480eac014610276578063cc6cb19a14610297578063d4b83992146102c557600080fd5b8063715018a6116100e7578063715018a6146101af57806382b2e257146101c457806386489ba9146101d95780638d59d1f1146101f95780638da5cb5b1461021957600080fd5b80633659cfe61461012457806348c02dc1146101465780634f1ef2861461015b57806352d1902d1461016e57806354fd4d5014610196575b600080fd5b34801561013057600080fd5b5061014461013f36600461152c565b61036e565b005b34801561015257600080fd5b50610144610440565b61014461016936600461155f565b61047e565b34801561017a57600080fd5b50610183610538565b6040519081526020015b60405180910390f35b3480156101a257600080fd5b5060fb5461ffff16610183565b3480156101bb57600080fd5b506101446105e6565b3480156101d057600080fd5b506101836105fa565b3480156101e557600080fd5b506101446101f4366004611623565b6106e2565b34801561020557600080fd5b506101446102143660046116c5565b610857565b34801561022557600080fd5b506033546001600160a01b03165b60405161018d9190611711565b34801561024c57600080fd5b5061014461025b366004611733565b610c14565b34801561026c57600080fd5b5061018360fd5481565b34801561028257600080fd5b5061014461029136600461176f565b61010055565b3480156102a357600080fd5b506101836102b236600461152c565b6101016020526000908152604090205481565b3480156102d157600080fd5b506101836101005481565b3480156102e857600080fd5b5060fb54610233906201000090046001600160a01b031681565b34801561030e57600080fd5b5061018360fe5481565b34801561032457600080fd5b5061014461033336600461152c565b610cd8565b34801561034457600080fd5b5061018360ff5481565b34801561035a57600080fd5b5060fc54610233906001600160a01b031681565b306001600160a01b037f00000000000000000000000000000000000000000000000000000000000000001614156103c05760405162461bcd60e51b81526004016103b790611788565b60405180910390fd5b7f00000000000000000000000000000000000000000000000000000000000000006001600160a01b03166103f2610d4e565b6001600160a01b0316146104185760405162461bcd60e51b81526004016103b7906117d4565b61042181610d6a565b6040805160008082526020820190925261043d91839190610d72565b50565b610448610edd565b60fb80546001919060009061046290849061ffff16611836565b92506101000a81548161ffff021916908361ffff160217905550565b306001600160a01b037f00000000000000000000000000000000000000000000000000000000000000001614156104c75760405162461bcd60e51b81526004016103b790611788565b7f00000000000000000000000000000000000000000000000000000000000000006001600160a01b03166104f9610d4e565b6001600160a01b03161461051f5760405162461bcd60e51b81526004016103b7906117d4565b61052882610d6a565b61053482826001610d72565b5050565b6000306001600160a01b037f000000000000000000000000000000000000000000000000000000000000000016146105d35760405162461bcd60e51b815260206004820152603860248201527f555550535570677261646561626c653a206d757374206e6f742062652063616c6044820152771b1959081d1a1c9bdd59da0819195b1959d85d1958d85b1b60421b60648201526084016103b7565b50600080516020611b4883398151915290565b6105ee610edd565b6105f86000610f37565b565b60fc5460fb5460408051636a5c1cc960e11b815290516000936001600160a01b03908116936370a0823193620100009091049091169163d4b8399291600480820192602092909190829003018189875af115801561065c573d6000803e3d6000fd5b505050506040513d601f19601f82011682018060405250810190610680919061185c565b6040518263ffffffff1660e01b815260040161069c9190611711565b602060405180830381865afa1580156106b9573d6000803e3d6000fd5b505050506040513d601f19601f820116820180604052508101906106dd9190611879565b905090565b600054610100900460ff16158080156107025750600054600160ff909116105b8061071c5750303b15801561071c575060005460ff166001145b61077f5760405162461bcd60e51b815260206004820152602e60248201527f496e697469616c697a61626c653a20636f6e747261637420697320616c72656160448201526d191e481a5b9a5d1a585b1a5e995960921b60648201526084016103b7565b6000805460ff1916600117905580156107a2576000805461ff0019166101001790555b6107aa610f89565b6107b2610fb8565b60fb805462010000600160b01b031916620100006001600160a01b038a8116919091029190911790915560fc80546001600160a01b03191691881691909117905560fd85905560fe84905560ff839055610100829055801561084e576000805461ff0019169055604051600181527f7f26b83ff96e1f2b6a682f133852f6798a09c465da95921460cefb38474024989060200160405180910390a15b50505050505050565b61085f610fdf565b336000908152610102602052604090205460ff166108b65760405162461bcd60e51b81526020600482015260146024820152731d5cd95c881b9bdd081dda1a5d195b1a5cdd195960621b60448201526064016103b7565b60fb546201000090046001600160a01b03166108fc5760405162461bcd60e51b8152602060048201526005602482015264085a5b9a5d60da1b60448201526064016103b7565b60fb5460405163f3ae241560e01b8152620100009091046001600160a01b03169063f3ae241590610931903090600401611711565b6020604051808303816000875af1158015610950573d6000803e3d6000fd5b505050506040513d601f19601f820116820180604052508101906109749190611892565b6109b55760405162461bcd60e51b815260206004820152601260248201527129b430b6b0b7103737ba1036b0b730b3b2b960711b60448201526064016103b7565b60fe546109c290846118c5565b15610a005760405162461bcd60e51b815260206004820152600e60248201526d1a5b9d985b1a5908185b5bdd5b9d60921b60448201526064016103b7565b60fc5460fb5460408051636a5c1cc960e11b815290516001600160a01b03938416936323b872dd933393620100009091049091169163d4b839929160048082019260209290919082900301816000875af1158015610a62573d6000803e3d6000fd5b505050506040513d601f19601f82011682018060405250810190610a86919061185c565b6040516001600160e01b031960e085901b1681526001600160a01b03928316600482015291166024820152604481018690526064016020604051808303816000875af1158015610ada573d6000803e3d6000fd5b505050506040513d601f19601f82011682018060405250810190610afe9190611892565b610b3c5760405162461bcd60e51b815260206004820152600f60248201526e151c985b9cd9995c8819985a5b1959608a1b60448201526064016103b7565b6000610b4a33826000611039565b6000610b55856111c4565b9050610b6333826001611039565b3360009081526101016020526040902054610b7e86826118d9565b3360008181526101016020526040902082905560fb5460fd546101005493945091927ff04885d0e4a85ff9facb1781f4ac658cdb9bf783b710500eac6f0a07709ee96292620100009092046001600160a01b031691908a908690610be06105fa565b8a8a8e8e604051610bfa9a9998979695949392919061191a565b60405180910390a2505050610c0f6001606555565b505050565b336000908152610102602052604090205460ff1615158315151415610c7b5760405162461bcd60e51b815260206004820152601a60248201527f77686974656c6973742073746174757320756e6368616e67656400000000000060448201526064016103b7565b336000818152610102602052604090819020805460ff1916861515179055517fc14aba57636c37da4459359c744f88dbb152ff25b6baad0b066ae60b6d30802490610ccb90869086908690611979565b60405180910390a2505050565b610ce0610edd565b6001600160a01b038116610d455760405162461bcd60e51b815260206004820152602660248201527f4f776e61626c653a206e6577206f776e657220697320746865207a65726f206160448201526564647265737360d01b60648201526084016103b7565b61043d81610f37565b600080516020611b48833981519152546001600160a01b031690565b61043d610edd565b7f4910fdfa16fed3260ed0e7147f7cc6da11a60208b5b9406d12a635614ffd91435460ff1615610da557610c0f836111ef565b826001600160a01b03166352d1902d6040518163ffffffff1660e01b8152600401602060405180830381865afa925050508015610dff575060408051601f3d908101601f19168201909252610dfc91810190611879565b60015b610e625760405162461bcd60e51b815260206004820152602e60248201527f45524331393637557067726164653a206e657720696d706c656d656e7461746960448201526d6f6e206973206e6f74205555505360901b60648201526084016103b7565b600080516020611b488339815191528114610ed15760405162461bcd60e51b815260206004820152602960248201527f45524331393637557067726164653a20756e737570706f727465642070726f786044820152681a58589b195555525160ba1b60648201526084016103b7565b50610c0f83838361128b565b6033546001600160a01b031633146105f85760405162461bcd60e51b815260206004820181905260248201527f4f776e61626c653a2063616c6c6572206973206e6f7420746865206f776e657260448201526064016103b7565b603380546001600160a01b038381166001600160a01b0319831681179093556040519116919082907f8be0079c531659141344cd1fd0a4f28419497f9722a3daafe3b4186f6b6457e090600090a35050565b600054610100900460ff16610fb05760405162461bcd60e51b81526004016103b79061199e565b6105f86112b6565b600054610100900460ff166105f85760405162461bcd60e51b81526004016103b79061199e565b600260655414156110325760405162461bcd60e51b815260206004820152601f60248201527f5265656e7472616e637947756172643a207265656e7472616e742063616c6c0060448201526064016103b7565b6002606555565b60408051600180825281830190925260009160208083019080368337019050509050838160008151811061106f5761106f6119e9565b6001600160a01b03929092166020928302919091019091015260408051600180825281830190925260009181602001602082028036833701905050905083816000815181106110c0576110c06119e9565b602090810291909101015260018360018111156110df576110df6119ff565b14156111535760fb54604051632c78fd0360e21b8152620100009091046001600160a01b03169063b1e3f40c9061111c9085908590600401611a15565b600060405180830381600087803b15801561113657600080fd5b505af115801561114a573d6000803e3d6000fd5b505050506111bd565b60fb546040516322936c2360e11b8152620100009091046001600160a01b031690634526d8469061118a9085908590600401611a15565b600060405180830381600087803b1580156111a457600080fd5b505af11580156111b8573d6000803e3d6000fd5b505050505b5050505050565b600060ff546111df60fe54846111da9190611a99565b6112e6565b6111e99190611aad565b92915050565b6001600160a01b0381163b61125c5760405162461bcd60e51b815260206004820152602d60248201527f455243313936373a206e657720696d706c656d656e746174696f6e206973206e60448201526c1bdd08184818dbdb9d1c9858dd609a1b60648201526084016103b7565b600080516020611b4883398151915280546001600160a01b0319166001600160a01b0392909216919091179055565b6112948361138b565b6000825111806112a15750805b15610c0f576112b083836113cb565b50505050565b600054610100900460ff166112dd5760405162461bcd60e51b81526004016103b79061199e565b6105f833610f37565b60b581600160881b81106112ff5760409190911b9060801c5b600160481b81106113155760209190911b9060401c5b65010000000000811061132d5760109190911b9060201c5b630100000081106113435760089190911b9060101c5b62010000010260121c80820401600190811c80830401811c80830401811c80830401811c80830401811c80830401811c80830401901c8082048111156113865781045b919050565b611394816111ef565b6040516001600160a01b038216907fbc7cd75a20ee27fd9adebab32041f755214dbc6bffa90cc0225b39da2e5c2d3b90600090a250565b60606113f08383604051806060016040528060278152602001611b68602791396113f7565b9392505050565b6060600080856001600160a01b0316856040516114149190611af8565b600060405180830381855af49150503d806000811461144f576040519150601f19603f3d011682016040523d82523d6000602084013e611454565b606091505b50915091506114658683838761146f565b9695505050505050565b606083156114db5782516114d4576001600160a01b0385163b6114d45760405162461bcd60e51b815260206004820152601d60248201527f416464726573733a2063616c6c20746f206e6f6e2d636f6e747261637400000060448201526064016103b7565b50816114e5565b6114e583836114ed565b949350505050565b8151156114fd5781518083602001fd5b8060405162461bcd60e51b81526004016103b79190611b14565b6001600160a01b038116811461043d57600080fd5b60006020828403121561153e57600080fd5b81356113f081611517565b634e487b7160e01b600052604160045260246000fd5b6000806040838503121561157257600080fd5b823561157d81611517565b9150602083013567ffffffffffffffff8082111561159a57600080fd5b818501915085601f8301126115ae57600080fd5b8135818111156115c0576115c0611549565b604051601f8201601f19908116603f011681019083821181831017156115e8576115e8611549565b8160405282815288602084870101111561160157600080fd5b8260208601602083013760006020848301015280955050505050509250929050565b60008060008060008060c0878903121561163c57600080fd5b863561164781611517565b9550602087013561165781611517565b95989597505050506040840135936060810135936080820135935060a0909101359150565b60008083601f84011261168e57600080fd5b50813567ffffffffffffffff8111156116a657600080fd5b6020830191508360208285010111156116be57600080fd5b9250929050565b6000806000604084860312156116da57600080fd5b83359250602084013567ffffffffffffffff8111156116f857600080fd5b6117048682870161167c565b9497909650939450505050565b6001600160a01b0391909116815260200190565b801515811461043d57600080fd5b60008060006040848603121561174857600080fd5b833561175381611725565b9250602084013567ffffffffffffffff8111156116f857600080fd5b60006020828403121561178157600080fd5b5035919050565b6020808252602c908201527f46756e6374696f6e206d7573742062652063616c6c6564207468726f7567682060408201526b19195b1959d85d1958d85b1b60a21b606082015260800190565b6020808252602c908201527f46756e6374696f6e206d7573742062652063616c6c6564207468726f7567682060408201526b6163746976652070726f787960a01b606082015260800190565b634e487b7160e01b600052601160045260246000fd5b600061ffff80831681851680830382111561185357611853611820565b01949350505050565b60006020828403121561186e57600080fd5b81516113f081611517565b60006020828403121561188b57600080fd5b5051919050565b6000602082840312156118a457600080fd5b81516113f081611725565b634e487b7160e01b600052601260045260246000fd5b6000826118d4576118d46118af565b500690565b600082198211156118ec576118ec611820565b500190565b81835281816020850137506000828201602090810191909152601f909101601f19169091010190565b600061012060018060a01b038d1683528b60208401528a60408401528960608401528860808401528760a08401528660c08401528560e08401528061010084015261196881840185876118f1565b9d9c50505050505050505050505050565b83151581526040602082015260006119956040830184866118f1565b95945050505050565b6020808252602b908201527f496e697469616c697a61626c653a20636f6e7472616374206973206e6f74206960408201526a6e697469616c697a696e6760a81b606082015260800190565b634e487b7160e01b600052603260045260246000fd5b634e487b7160e01b600052602160045260246000fd5b604080825283519082018190526000906020906060840190828701845b82811015611a575781516001600160a01b031684529284019290840190600101611a32565b5050508381038285015284518082528583019183019060005b81811015611a8c57835183529284019291840191600101611a70565b5090979650505050505050565b600082611aa857611aa86118af565b500490565b6000816000190483118215151615611ac757611ac7611820565b500290565b60005b83811015611ae7578181015183820152602001611acf565b838111156112b05750506000910152565b60008251611b0a818460208701611acc565b9190910192915050565b6020815260008251806020840152611b33816040850160208701611acc565b601f01601f1916919091016040019291505056fe360894a13ba1a3210667c828492db98dca3e2076cc3735a920a3ca505d382bbc416464726573733a206c6f772d6c6576656c2064656c65676174652063616c6c206661696c6564a2646970667358221220612aed5417af81de8e2a1ffc94d3a1c0854017a2c46a9d793a4cc639756d16d364736f6c634300080c0033";

type DeVoxShamanV1ConstructorParams =
  | [signer?: Signer]
  | ConstructorParameters<typeof ContractFactory>;

const isSuperArgs = (
  xs: DeVoxShamanV1ConstructorParams
): xs is ConstructorParameters<typeof ContractFactory> => xs.length > 1;

export class DeVoxShamanV1__factory extends ContractFactory {
  constructor(...args: DeVoxShamanV1ConstructorParams) {
    if (isSuperArgs(args)) {
      super(...args);
    } else {
      super(_abi, _bytecode, args[0]);
    }
  }

  override deploy(
    overrides?: Overrides & { from?: PromiseOrValue<string> }
  ): Promise<DeVoxShamanV1> {
    return super.deploy(overrides || {}) as Promise<DeVoxShamanV1>;
  }
  override getDeployTransaction(
    overrides?: Overrides & { from?: PromiseOrValue<string> }
  ): TransactionRequest {
    return super.getDeployTransaction(overrides || {});
  }
  override attach(address: string): DeVoxShamanV1 {
    return super.attach(address) as DeVoxShamanV1;
  }
  override connect(signer: Signer): DeVoxShamanV1__factory {
    return super.connect(signer) as DeVoxShamanV1__factory;
  }

  static readonly bytecode = _bytecode;
  static readonly abi = _abi;
  static createInterface(): DeVoxShamanV1Interface {
    return new utils.Interface(_abi) as DeVoxShamanV1Interface;
  }
  static connect(
    address: string,
    signerOrProvider: Signer | Provider
  ): DeVoxShamanV1 {
    return new Contract(address, _abi, signerOrProvider) as DeVoxShamanV1;
  }
}
