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
        indexed: true,
        internalType: "address",
        name: "baal",
        type: "address",
      },
      {
        indexed: true,
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
        indexed: true,
        internalType: "bytes32",
        name: "role",
        type: "bytes32",
      },
      {
        indexed: true,
        internalType: "bytes32",
        name: "previousAdminRole",
        type: "bytes32",
      },
      {
        indexed: true,
        internalType: "bytes32",
        name: "newAdminRole",
        type: "bytes32",
      },
    ],
    name: "RoleAdminChanged",
    type: "event",
  },
  {
    anonymous: false,
    inputs: [
      {
        indexed: true,
        internalType: "bytes32",
        name: "role",
        type: "bytes32",
      },
      {
        indexed: true,
        internalType: "address",
        name: "account",
        type: "address",
      },
      {
        indexed: true,
        internalType: "address",
        name: "sender",
        type: "address",
      },
    ],
    name: "RoleGranted",
    type: "event",
  },
  {
    anonymous: false,
    inputs: [
      {
        indexed: true,
        internalType: "bytes32",
        name: "role",
        type: "bytes32",
      },
      {
        indexed: true,
        internalType: "address",
        name: "account",
        type: "address",
      },
      {
        indexed: true,
        internalType: "address",
        name: "sender",
        type: "address",
      },
    ],
    name: "RoleRevoked",
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
        indexed: true,
        internalType: "address",
        name: "baal",
        type: "address",
      },
      {
        indexed: true,
        internalType: "uint256",
        name: "id",
        type: "uint256",
      },
    ],
    name: "UserSigned",
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
        indexed: true,
        internalType: "address",
        name: "baal",
        type: "address",
      },
      {
        indexed: true,
        internalType: "uint256",
        name: "id",
        type: "uint256",
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
    name: "DEFAULT_ADMIN_ROLE",
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
    inputs: [
      {
        internalType: "bytes32",
        name: "role",
        type: "bytes32",
      },
    ],
    name: "getRoleAdmin",
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
    inputs: [
      {
        internalType: "bytes32",
        name: "role",
        type: "bytes32",
      },
      {
        internalType: "address",
        name: "account",
        type: "address",
      },
    ],
    name: "grantRole",
    outputs: [],
    stateMutability: "nonpayable",
    type: "function",
  },
  {
    inputs: [
      {
        internalType: "bytes32",
        name: "role",
        type: "bytes32",
      },
      {
        internalType: "address",
        name: "account",
        type: "address",
      },
    ],
    name: "hasRole",
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
        internalType: "bytes32",
        name: "role",
        type: "bytes32",
      },
      {
        internalType: "address",
        name: "account",
        type: "address",
      },
    ],
    name: "renounceRole",
    outputs: [],
    stateMutability: "nonpayable",
    type: "function",
  },
  {
    inputs: [
      {
        internalType: "bytes32",
        name: "role",
        type: "bytes32",
      },
      {
        internalType: "address",
        name: "account",
        type: "address",
      },
    ],
    name: "revokeRole",
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
    name: "sign",
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
    name: "signatures",
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
    inputs: [
      {
        internalType: "bytes4",
        name: "interfaceId",
        type: "bytes4",
      },
    ],
    name: "supportsInterface",
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
    name: "userRegistry",
    outputs: [
      {
        internalType: "contract IUserRegistry",
        name: "",
        type: "address",
      },
    ],
    stateMutability: "view",
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
  "0x60a0604052306080523480156200001557600080fd5b506200002062000026565b620000e7565b600054610100900460ff1615620000935760405162461bcd60e51b815260206004820152602760248201527f496e697469616c697a61626c653a20636f6e747261637420697320696e697469604482015266616c697a696e6760c81b606482015260840160405180910390fd5b60005460ff90811614620000e5576000805460ff191660ff9081179091556040519081527f7f26b83ff96e1f2b6a682f133852f6798a09c465da95921460cefb38474024989060200160405180910390a15b565b6080516126676200011f600039600081816109bf015281816109ff01528181610ac701528181610b070152610b7f01526126676000f3fe6080604052600436106101985760003560e01c80638d59d1f1116100e2578063d4b8399211610085578063d4b839921461047f578063d547741f14610496578063e5a2a2a5146104b6578063e66825c3146104dd578063f2fde38b146104f4578063f8d2876814610514578063fab514c01461052b578063fc0c546a1461054b57600080fd5b80638d59d1f1146103765780638da5cb5b1461039657806391d14854146103b4578063a217fddf146103d4578063af640d0f146103e9578063b480eac014610400578063c792f36d14610420578063cc6cb19a1461045157600080fd5b806348c02dc11161014a57806348c02dc1146102a75780634f1ef286146102bc57806352d1902d146102cf57806354fd4d50146102e45780635c7460d6146102fe578063704b6c021461032c578063715018a61461034c57806382b2e2571461036157600080fd5b806301ffc9a71461019d5780630fdb86e9146101d2578063248a9ca3146101f45780632ca15122146102325780632f2ff15d1461024757806336568abe146102675780633659cfe614610287575b600080fd5b3480156101a957600080fd5b506101bd6101b8366004611e96565b61056c565b60405190151581526020015b60405180910390f35b3480156101de57600080fd5b506101f26101ed366004611ed5565b6105a3565b005b34801561020057600080fd5b5061022461020f366004611fa9565b60009081526065602052604090206001015490565b6040519081526020016101c9565b34801561023e57600080fd5b506101f2610798565b34801561025357600080fd5b506101f2610262366004611fc2565b61090c565b34801561027357600080fd5b506101f2610282366004611fc2565b610936565b34801561029357600080fd5b506101f26102a2366004611ff2565b6109b4565b3480156102b357600080fd5b506101f2610a7d565b6101f26102ca366004612025565b610abc565b3480156102db57600080fd5b50610224610b72565b3480156102f057600080fd5b5061015f5461ffff16610224565b34801561030a57600080fd5b506101615461031f906001600160a01b031681565b6040516101c991906120e9565b34801561033857600080fd5b506101f2610347366004611ff2565b610c20565b34801561035857600080fd5b506101f2610c36565b34801561036d57600080fd5b50610224610c4a565b34801561038257600080fd5b506101f26103913660046120fd565b610d34565b3480156103a257600080fd5b506097546001600160a01b031661031f565b3480156103c057600080fd5b506101bd6103cf366004611fc2565b611195565b3480156103e057600080fd5b50610224600081565b3480156103f557600080fd5b506102246101625481565b34801561040c57600080fd5b506101f261041b366004611fa9565b6111c0565b34801561042c57600080fd5b506101bd61043b366004611ff2565b6101676020526000908152604090205460ff1681565b34801561045d57600080fd5b5061022461046c366004611ff2565b6101666020526000908152604090205481565b34801561048b57600080fd5b506102246101655481565b3480156104a257600080fd5b506101f26104b1366004611fc2565b61122e565b3480156104c257600080fd5b5061015f5461031f906201000090046001600160a01b031681565b3480156104e957600080fd5b506102246101635481565b34801561050057600080fd5b506101f261050f366004611ff2565b611253565b34801561052057600080fd5b506102246101645481565b34801561053757600080fd5b506101f2610546366004612179565b6112c9565b34801561055757600080fd5b506101605461031f906001600160a01b031681565b60006001600160e01b03198216637965db0b60e01b148061059d57506301ffc9a760e01b6001600160e01b03198316145b92915050565b600054610100900460ff16158080156105c35750600054600160ff909116105b806105dd5750303b1580156105dd575060005460ff166001145b6106455760405162461bcd60e51b815260206004820152602e60248201527f496e697469616c697a61626c653a20636f6e747261637420697320616c72656160448201526d191e481a5b9a5d1a585b1a5e995960921b60648201526084015b60405180910390fd5b6000805460ff191660011790558015610668576000805461ff0019166101001790555b6106706113d6565b6106786113fd565b6106806113d6565b61015f80546001600160a01b03808d16620100000262010000600160b01b03199092169190911790915561016080548b83166001600160a01b0319918216179091556101618054928b169290911691909117905561016287905561016386905561016485905561016584905560005b8281101561073a57610728600085858481811061070e5761070e61219f565b90506020020160208101906107239190611ff2565b61142c565b80610732816121cb565b9150506106ef565b5061074660003361142c565b801561078c576000805461ff0019169055604051600181527f7f26b83ff96e1f2b6a682f133852f6798a09c465da95921460cefb38474024989060200160405180910390a15b50505050505050505050565b61016154604051636f77926b60e01b81526001600160a01b0390911690636f77926b906107c99033906004016120e9565b602060405180830381865afa1580156107e6573d6000803e3d6000fd5b505050506040513d601f19601f8201168201806040525081019061080a91906121e6565b6108565760405162461bcd60e51b815260206004820152601b60248201527f7369676e3a2073656e646572206e6f7420726567697374657265640000000000604482015260640161063c565b336000908152610167602052604090205460ff16156108ae5760405162461bcd60e51b81526020600482015260146024820152731cda59db8e88185b1c9958591e481cda59db995960621b604482015260640161063c565b3360008181526101676020526040808220805460ff191660011790556101625461015f5491519093620100009092046001600160a01b0316927f02e36dc1175c29b0df765b8217563f816b97c25be495cbbfe24de70d63e3759091a4565b600082815260656020526040902060010154610927816114b2565b610931838361142c565b505050565b6001600160a01b03811633146109a65760405162461bcd60e51b815260206004820152602f60248201527f416363657373436f6e74726f6c3a2063616e206f6e6c792072656e6f756e636560448201526e103937b632b9903337b91039b2b63360891b606482015260840161063c565b6109b082826114bc565b5050565b306001600160a01b037f00000000000000000000000000000000000000000000000000000000000000001614156109fd5760405162461bcd60e51b815260040161063c90612208565b7f00000000000000000000000000000000000000000000000000000000000000006001600160a01b0316610a2f611523565b6001600160a01b031614610a555760405162461bcd60e51b815260040161063c90612254565b610a5e8161153f565b60408051600080825260208201909252610a7a91839190611547565b50565b610a856116b2565b61015f805460019190600090610aa090849061ffff166122a0565b92506101000a81548161ffff021916908361ffff160217905550565b306001600160a01b037f0000000000000000000000000000000000000000000000000000000000000000161415610b055760405162461bcd60e51b815260040161063c90612208565b7f00000000000000000000000000000000000000000000000000000000000000006001600160a01b0316610b37611523565b6001600160a01b031614610b5d5760405162461bcd60e51b815260040161063c90612254565b610b668261153f565b6109b082826001611547565b6000306001600160a01b037f00000000000000000000000000000000000000000000000000000000000000001614610c0d5760405162461bcd60e51b815260206004820152603860248201527f555550535570677261646561626c653a206d757374206e6f742062652063616c6044820152771b1959081d1a1c9bdd59da0819195b1959d85d1958d85b1b60421b606482015260840161063c565b506000805160206125eb83398151915290565b6000610c2b816114b2565b6109b060008361142c565b610c3e6116b2565b610c48600061170c565b565b6101605461015f5460408051636a5c1cc960e11b815290516000936001600160a01b03908116936370a0823193620100009091049091169163d4b8399291600480820192602092909190829003018189875af1158015610cae573d6000803e3d6000fd5b505050506040513d601f19601f82011682018060405250810190610cd291906122c6565b6040518263ffffffff1660e01b8152600401610cee91906120e9565b602060405180830381865afa158015610d0b573d6000803e3d6000fd5b505050506040513d601f19601f82011682018060405250810190610d2f91906122e3565b905090565b610d3c61175e565b61015f546201000090046001600160a01b0316610d8b5760405162461bcd60e51b815260206004820152600d60248201526c191bdb985d194e88085898585b609a1b604482015260640161063c565b610160546001600160a01b0316610dd55760405162461bcd60e51b815260206004820152600e60248201526d3237b730ba329d1010ba37b5b2b760911b604482015260640161063c565b61015f5460405163f3ae241560e01b8152620100009091046001600160a01b03169063f3ae241590610e0b9030906004016120e9565b6020604051808303816000875af1158015610e2a573d6000803e3d6000fd5b505050506040513d601f19601f82011682018060405250810190610e4e91906121e6565b610e6a5760405162461bcd60e51b815260040161063c906122fc565b61016154604051636f77926b60e01b81526001600160a01b0390911690636f77926b90610e9b9033906004016120e9565b602060405180830381865afa158015610eb8573d6000803e3d6000fd5b505050506040513d601f19601f82011682018060405250810190610edc91906121e6565b610f285760405162461bcd60e51b815260206004820152601d60248201527f646f6e6174653a2073656e646572206e6f742072656769737465726564000000604482015260640161063c565b61016354610f369084612349565b15610f7c5760405162461bcd60e51b8152602060048201526016602482015275191bdb985d194e881a5b9d985b1a5908185b5bdd5b9d60521b604482015260640161063c565b6101605461015f5460408051636a5c1cc960e11b815290516001600160a01b03938416936323b872dd933393620100009091049091169163d4b839929160048082019260209290919082900301816000875af1158015610fe0573d6000803e3d6000fd5b505050506040513d601f19601f8201168201806040525081019061100491906122c6565b6040516001600160e01b031960e085901b1681526001600160a01b03928316600482015291166024820152604481018690526064016020604051808303816000875af1158015611058573d6000803e3d6000fd5b505050506040513d601f19601f8201168201806040525081019061107c91906121e6565b6110c25760405162461bcd60e51b8152602060048201526017602482015276191bdb985d194e881d1c985b9cd9995c8819985a5b1959604a1b604482015260640161063c565b60006110d0338260006117b8565b60006110db85611945565b90506110e9338260016117b8565b3360009081526101666020526040902054611104868261235d565b336000818152610166602052604090208290556101625461015f54610165549394509092620100009091046001600160a01b031691907ff04885d0e4a85ff9facb1781f4ac658cdb9bf783b710500eac6f0a07709ee962908a908690611168610c4a565b8a8a8e8e604051611180989796959493929190612375565b60405180910390a4505050610931600160c955565b60009182526065602090815260408084206001600160a01b0393909316845291905290205460ff1690565b60006111cb816114b2565b6101658290556101625461015f546201000090046001600160a01b03167ff580529ed53b5d8ddc681893476404e9974b7fa34a4bfde6405c754109184c4b84611212610c4a565b6040805192835260208301919091520160405180910390a35050565b600082815260656020526040902060010154611249816114b2565b61093183836114bc565b61125b6116b2565b6001600160a01b0381166112c05760405162461bcd60e51b815260206004820152602660248201527f4f776e61626c653a206e6577206f776e657220697320746865207a65726f206160448201526564647265737360d01b606482015260840161063c565b610a7a8161170c565b60006112d4816114b2565b61015f5460405163f3ae241560e01b8152620100009091046001600160a01b03169063f3ae24159061130a9030906004016120e9565b6020604051808303816000875af1158015611329573d6000803e3d6000fd5b505050506040513d601f19601f8201168201806040525081019061134d91906121e6565b6113695760405162461bcd60e51b815260040161063c906122fc565b61015f546040516303ead45360e61b815263ffffffff84166004820152620100009091046001600160a01b03169063fab514c090602401600060405180830381600087803b1580156113ba57600080fd5b505af11580156113ce573d6000803e3d6000fd5b505050505050565b600054610100900460ff16610c485760405162461bcd60e51b815260040161063c906123d1565b600054610100900460ff166114245760405162461bcd60e51b815260040161063c906123d1565b610c4861196c565b6114368282611195565b6109b05760008281526065602090815260408083206001600160a01b03851684529091529020805460ff1916600117905561146e3390565b6001600160a01b0316816001600160a01b0316837f2f8788117e7eff1d82e926ec794901d17c78024a50270940304540a733656f0d60405160405180910390a45050565b610a7a813361199c565b6114c68282611195565b156109b05760008281526065602090815260408083206001600160a01b0385168085529252808320805460ff1916905551339285917ff6391f5c32d9c69d2a47ea670b442974b53935d1edc7fd64eb21e047a839171b9190a45050565b6000805160206125eb833981519152546001600160a01b031690565b610a7a6116b2565b7f4910fdfa16fed3260ed0e7147f7cc6da11a60208b5b9406d12a635614ffd91435460ff161561157a57610931836119f5565b826001600160a01b03166352d1902d6040518163ffffffff1660e01b8152600401602060405180830381865afa9250505080156115d4575060408051601f3d908101601f191682019092526115d1918101906122e3565b60015b6116375760405162461bcd60e51b815260206004820152602e60248201527f45524331393637557067726164653a206e657720696d706c656d656e7461746960448201526d6f6e206973206e6f74205555505360901b606482015260840161063c565b6000805160206125eb83398151915281146116a65760405162461bcd60e51b815260206004820152602960248201527f45524331393637557067726164653a20756e737570706f727465642070726f786044820152681a58589b195555525160ba1b606482015260840161063c565b50610931838383611a91565b6097546001600160a01b03163314610c485760405162461bcd60e51b815260206004820181905260248201527f4f776e61626c653a2063616c6c6572206973206e6f7420746865206f776e6572604482015260640161063c565b609780546001600160a01b038381166001600160a01b0319831681179093556040519116919082907f8be0079c531659141344cd1fd0a4f28419497f9722a3daafe3b4186f6b6457e090600090a35050565b600260c95414156117b15760405162461bcd60e51b815260206004820152601f60248201527f5265656e7472616e637947756172643a207265656e7472616e742063616c6c00604482015260640161063c565b600260c955565b6040805160018082528183019092526000916020808301908036833701905050905083816000815181106117ee576117ee61219f565b6001600160a01b039290921660209283029190910190910152604080516001808252818301909252600091816020016020820280368337019050509050838160008151811061183f5761183f61219f565b6020908102919091010152600183600181111561185e5761185e61241c565b14156118d35761015f54604051632c78fd0360e21b8152620100009091046001600160a01b03169063b1e3f40c9061189c9085908590600401612432565b600060405180830381600087803b1580156118b657600080fd5b505af11580156118ca573d6000803e3d6000fd5b5050505061193e565b61015f546040516322936c2360e11b8152620100009091046001600160a01b031690634526d8469061190b9085908590600401612432565b600060405180830381600087803b15801561192557600080fd5b505af1158015611939573d6000803e3d6000fd5b505050505b5050505050565b600061016454611962610163548461195d91906124b6565b611abc565b61059d91906124ca565b600054610100900460ff166119935760405162461bcd60e51b815260040161063c906123d1565b610c483361170c565b6119a68282611195565b6109b0576119b381611b61565b6119be836020611b73565b6040516020016119cf929190612515565b60408051601f198184030181529082905262461bcd60e51b825261063c91600401612584565b6001600160a01b0381163b611a625760405162461bcd60e51b815260206004820152602d60248201527f455243313936373a206e657720696d706c656d656e746174696f6e206973206e60448201526c1bdd08184818dbdb9d1c9858dd609a1b606482015260840161063c565b6000805160206125eb83398151915280546001600160a01b0319166001600160a01b0392909216919091179055565b611a9a83611d16565b600082511180611aa75750805b1561093157611ab68383611d56565b50505050565b60b581600160881b8110611ad55760409190911b9060801c5b600160481b8110611aeb5760209190911b9060401c5b650100000000008110611b035760109190911b9060201c5b63010000008110611b195760089190911b9060101c5b62010000010260121c80820401600190811c80830401811c80830401811c80830401811c80830401811c80830401811c80830401901c808204811115611b5c5781045b919050565b606061059d6001600160a01b03831660145b60606000611b828360026124ca565b611b8d90600261235d565b67ffffffffffffffff811115611ba557611ba561200f565b6040519080825280601f01601f191660200182016040528015611bcf576020820181803683370190505b509050600360fc1b81600081518110611bea57611bea61219f565b60200101906001600160f81b031916908160001a905350600f60fb1b81600181518110611c1957611c1961219f565b60200101906001600160f81b031916908160001a9053506000611c3d8460026124ca565b611c4890600161235d565b90505b6001811115611cc0576f181899199a1a9b1b9c1cb0b131b232b360811b85600f1660108110611c7c57611c7c61219f565b1a60f81b828281518110611c9257611c9261219f565b60200101906001600160f81b031916908160001a90535060049490941c93611cb9816125b7565b9050611c4b565b508315611d0f5760405162461bcd60e51b815260206004820181905260248201527f537472696e67733a20686578206c656e67746820696e73756666696369656e74604482015260640161063c565b9392505050565b611d1f816119f5565b6040516001600160a01b038216907fbc7cd75a20ee27fd9adebab32041f755214dbc6bffa90cc0225b39da2e5c2d3b90600090a250565b6060611d0f838360405180606001604052806027815260200161260b602791396060600080856001600160a01b031685604051611d9391906125ce565b600060405180830381855af49150503d8060008114611dce576040519150601f19603f3d011682016040523d82523d6000602084013e611dd3565b606091505b5091509150611de486838387611dee565b9695505050505050565b60608315611e5a578251611e53576001600160a01b0385163b611e535760405162461bcd60e51b815260206004820152601d60248201527f416464726573733a2063616c6c20746f206e6f6e2d636f6e7472616374000000604482015260640161063c565b5081611e64565b611e648383611e6c565b949350505050565b815115611e7c5781518083602001fd5b8060405162461bcd60e51b815260040161063c9190612584565b600060208284031215611ea857600080fd5b81356001600160e01b031981168114611d0f57600080fd5b6001600160a01b0381168114610a7a57600080fd5b60008060008060008060008060006101008a8c031215611ef457600080fd5b8935611eff81611ec0565b985060208a0135611f0f81611ec0565b975060408a0135611f1f81611ec0565b965060608a0135955060808a0135945060a08a0135935060c08a0135925060e08a013567ffffffffffffffff80821115611f5857600080fd5b818c0191508c601f830112611f6c57600080fd5b813581811115611f7b57600080fd5b8d60208260051b8501011115611f9057600080fd5b6020830194508093505050509295985092959850929598565b600060208284031215611fbb57600080fd5b5035919050565b60008060408385031215611fd557600080fd5b823591506020830135611fe781611ec0565b809150509250929050565b60006020828403121561200457600080fd5b8135611d0f81611ec0565b634e487b7160e01b600052604160045260246000fd5b6000806040838503121561203857600080fd5b823561204381611ec0565b9150602083013567ffffffffffffffff8082111561206057600080fd5b818501915085601f83011261207457600080fd5b8135818111156120865761208661200f565b604051601f8201601f19908116603f011681019083821181831017156120ae576120ae61200f565b816040528281528860208487010111156120c757600080fd5b8260208601602083013760006020848301015280955050505050509250929050565b6001600160a01b0391909116815260200190565b60008060006040848603121561211257600080fd5b83359250602084013567ffffffffffffffff8082111561213157600080fd5b818601915086601f83011261214557600080fd5b81358181111561215457600080fd5b87602082850101111561216657600080fd5b6020830194508093505050509250925092565b60006020828403121561218b57600080fd5b813563ffffffff81168114611d0f57600080fd5b634e487b7160e01b600052603260045260246000fd5b634e487b7160e01b600052601160045260246000fd5b60006000198214156121df576121df6121b5565b5060010190565b6000602082840312156121f857600080fd5b81518015158114611d0f57600080fd5b6020808252602c908201527f46756e6374696f6e206d7573742062652063616c6c6564207468726f7567682060408201526b19195b1959d85d1958d85b1b60a21b606082015260800190565b6020808252602c908201527f46756e6374696f6e206d7573742062652063616c6c6564207468726f7567682060408201526b6163746976652070726f787960a01b606082015260800190565b600061ffff8083168185168083038211156122bd576122bd6121b5565b01949350505050565b6000602082840312156122d857600080fd5b8151611d0f81611ec0565b6000602082840312156122f557600080fd5b5051919050565b6020808252601a908201527f646f6e6174653a207368616d616e206e6f74206d616e61676572000000000000604082015260600190565b634e487b7160e01b600052601260045260246000fd5b60008261235857612358612333565b500690565b60008219821115612370576123706121b5565b500190565b8881528760208201528660408201528560608201528460808201528360a082015260e060c08201528160e082015260006101008385828501376000838501820152601f909301601f191690910190910198975050505050505050565b6020808252602b908201527f496e697469616c697a61626c653a20636f6e7472616374206973206e6f74206960408201526a6e697469616c697a696e6760a81b606082015260800190565b634e487b7160e01b600052602160045260246000fd5b604080825283519082018190526000906020906060840190828701845b828110156124745781516001600160a01b03168452928401929084019060010161244f565b5050508381038285015284518082528583019183019060005b818110156124a95783518352928401929184019160010161248d565b5090979650505050505050565b6000826124c5576124c5612333565b500490565b60008160001904831182151516156124e4576124e46121b5565b500290565b60005b838110156125045781810151838201526020016124ec565b83811115611ab65750506000910152565b76020b1b1b2b9b9a1b7b73a3937b61d1030b1b1b7bab73a1604d1b8152600083516125478160178501602088016124e9565b7001034b99036b4b9b9b4b733903937b6329607d1b60179184019182015283516125788160288401602088016124e9565b01602801949350505050565b60208152600082518060208401526125a38160408501602087016124e9565b601f01601f19169190910160400192915050565b6000816125c6576125c66121b5565b506000190190565b600082516125e08184602087016124e9565b919091019291505056fe360894a13ba1a3210667c828492db98dca3e2076cc3735a920a3ca505d382bbc416464726573733a206c6f772d6c6576656c2064656c65676174652063616c6c206661696c6564a26469706673582212209ca97ba6b9a49212e0a05db49ea5cc40057d02c486abbe15d09f0af88d33618664736f6c634300080c0033";

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
