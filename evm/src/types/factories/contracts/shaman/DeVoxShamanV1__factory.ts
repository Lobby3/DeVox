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
  "0x60a06040523060805234801561001457600080fd5b5061001d610022565b6100e1565b600054610100900460ff161561008e5760405162461bcd60e51b815260206004820152602760248201527f496e697469616c697a61626c653a20636f6e747261637420697320696e697469604482015266616c697a696e6760c81b606482015260840160405180910390fd5b60005460ff908116146100df576000805460ff191660ff9081179091556040519081527f7f26b83ff96e1f2b6a682f133852f6798a09c465da95921460cefb38474024989060200160405180910390a15b565b60805161241e62000119600039600081816107ad015281816107ed015281816108b5015281816108f5015261096d015261241e6000f3fe6080604052600436106101775760003560e01c80638da5cb5b116100cc578063d4b839921161007a578063d4b8399214610413578063d547741f1461042a578063e5a2a2a51461044a578063e66825c314610471578063f2fde38b14610488578063f8d28768146104a8578063fc0c546a146104bf57600080fd5b80638da5cb5b1461033257806391d14854146103595780639d79450814610379578063a217fddf14610399578063af640d0f146103ae578063b480eac0146103c5578063cc6cb19a146103e557600080fd5b80634f1ef286116101295780634f1ef2861461028657806352d1902d1461029957806354fd4d50146102ae578063704b6c02146102c8578063715018a6146102e857806382b2e257146102fd5780638d59d1f11461031257600080fd5b806301ffc9a71461017c578063248a9ca3146101b157806324bb6e14146101ef5780632f2ff15d1461021157806336568abe146102315780633659cfe61461025157806348c02dc114610271575b600080fd5b34801561018857600080fd5b5061019c610197366004611c27565b6104e0565b60405190151581526020015b60405180910390f35b3480156101bd57600080fd5b506101e16101cc366004611c51565b60009081526065602052604090206001015490565b6040519081526020016101a8565b3480156101fb57600080fd5b5061020f61020a366004611c7f565b610517565b005b34801561021d57600080fd5b5061020f61022c366004611d40565b6106fa565b34801561023d57600080fd5b5061020f61024c366004611d40565b610724565b34801561025d57600080fd5b5061020f61026c366004611d70565b6107a2565b34801561027d57600080fd5b5061020f61086b565b61020f610294366004611da3565b6108aa565b3480156102a557600080fd5b506101e1610960565b3480156102ba57600080fd5b5061015f5461ffff166101e1565b3480156102d457600080fd5b5061020f6102e3366004611d70565b610a0e565b3480156102f457600080fd5b5061020f610a24565b34801561030957600080fd5b506101e1610a38565b34801561031e57600080fd5b5061020f61032d366004611eb0565b610b22565b34801561033e57600080fd5b506097546001600160a01b03165b6040516101a89190611efc565b34801561036557600080fd5b5061019c610374366004611d40565b610f55565b34801561038557600080fd5b5061020f610394366004611f1e565b610f80565b3480156103a557600080fd5b506101e1600081565b3480156103ba57600080fd5b506101e16101615481565b3480156103d157600080fd5b5061020f6103e0366004611c51565b611063565b3480156103f157600080fd5b506101e1610400366004611d70565b6101656020526000908152604090205481565b34801561041f57600080fd5b506101e16101645481565b34801561043657600080fd5b5061020f610445366004611d40565b6110d1565b34801561045657600080fd5b5061015f5461034c906201000090046001600160a01b031681565b34801561047d57600080fd5b506101e16101625481565b34801561049457600080fd5b5061020f6104a3366004611d70565b6110f6565b3480156104b457600080fd5b506101e16101635481565b3480156104cb57600080fd5b506101605461034c906001600160a01b031681565b60006001600160e01b03198216637965db0b60e01b148061051157506301ffc9a760e01b6001600160e01b03198316145b92915050565b600054610100900460ff16158080156105375750600054600160ff909116105b806105515750303b158015610551575060005460ff166001145b6105b95760405162461bcd60e51b815260206004820152602e60248201527f496e697469616c697a61626c653a20636f6e747261637420697320616c72656160448201526d191e481a5b9a5d1a585b1a5e995960921b60648201526084015b60405180910390fd5b6000805460ff1916600117905580156105dc576000805461ff0019166101001790555b6105e461116c565b6105ec611193565b6105f461116c565b61015f805462010000600160b01b031916620100006001600160a01b038c8116919091029190911790915561016080546001600160a01b031916918a1691909117905561016187905561016286905561016385905561016484905560005b8281101561069d5761068b600085858481811061067157610671611f5a565b90506020020160208101906106869190611d70565b6111c2565b8061069581611f86565b915050610652565b506106a96000336111c2565b80156106ef576000805461ff0019169055604051600181527f7f26b83ff96e1f2b6a682f133852f6798a09c465da95921460cefb38474024989060200160405180910390a15b505050505050505050565b60008281526065602052604090206001015461071581611248565b61071f83836111c2565b505050565b6001600160a01b03811633146107945760405162461bcd60e51b815260206004820152602f60248201527f416363657373436f6e74726f6c3a2063616e206f6e6c792072656e6f756e636560448201526e103937b632b9903337b91039b2b63360891b60648201526084016105b0565b61079e8282611252565b5050565b306001600160a01b037f00000000000000000000000000000000000000000000000000000000000000001614156107eb5760405162461bcd60e51b81526004016105b090611fa1565b7f00000000000000000000000000000000000000000000000000000000000000006001600160a01b031661081d6112b9565b6001600160a01b0316146108435760405162461bcd60e51b81526004016105b090611fed565b61084c816112d5565b60408051600080825260208201909252610868918391906112dd565b50565b610873611448565b61015f80546001919060009061088e90849061ffff16612039565b92506101000a81548161ffff021916908361ffff160217905550565b306001600160a01b037f00000000000000000000000000000000000000000000000000000000000000001614156108f35760405162461bcd60e51b81526004016105b090611fa1565b7f00000000000000000000000000000000000000000000000000000000000000006001600160a01b03166109256112b9565b6001600160a01b03161461094b5760405162461bcd60e51b81526004016105b090611fed565b610954826112d5565b61079e828260016112dd565b6000306001600160a01b037f000000000000000000000000000000000000000000000000000000000000000016146109fb5760405162461bcd60e51b815260206004820152603860248201527f555550535570677261646561626c653a206d757374206e6f742062652063616c6044820152771b1959081d1a1c9bdd59da0819195b1959d85d1958d85b1b60421b60648201526084016105b0565b506000805160206123a283398151915290565b6000610a1981611248565b61079e6000836111c2565b610a2c611448565b610a3660006114a2565b565b6101605461015f5460408051636a5c1cc960e11b815290516000936001600160a01b03908116936370a0823193620100009091049091169163d4b8399291600480820192602092909190829003018189875af1158015610a9c573d6000803e3d6000fd5b505050506040513d601f19601f82011682018060405250810190610ac0919061205f565b6040518263ffffffff1660e01b8152600401610adc9190611efc565b602060405180830381865afa158015610af9573d6000803e3d6000fd5b505050506040513d601f19601f82011682018060405250810190610b1d919061207c565b905090565b610b2a6114f4565b61015f546201000090046001600160a01b0316610b795760405162461bcd60e51b815260206004820152600d60248201526c191bdb985d194e88085898585b609a1b60448201526064016105b0565b610160546001600160a01b0316610bc35760405162461bcd60e51b815260206004820152600e60248201526d3237b730ba329d1010ba37b5b2b760911b60448201526064016105b0565b61015f5460405163f3ae241560e01b8152620100009091046001600160a01b03169063f3ae241590610bf9903090600401611efc565b6020604051808303816000875af1158015610c18573d6000803e3d6000fd5b505050506040513d601f19601f82011682018060405250810190610c3c9190612095565b610c885760405162461bcd60e51b815260206004820152601a60248201527f646f6e6174653a207368616d616e206e6f74206d616e6167657200000000000060448201526064016105b0565b336000908152610166602052604090205460ff16610ce85760405162461bcd60e51b815260206004820152601e60248201527f646f6e6174653a2073656e646572206e6f742077686974656c6973746564000060448201526064016105b0565b61016254610cf690846120c8565b15610d3c5760405162461bcd60e51b8152602060048201526016602482015275191bdb985d194e881a5b9d985b1a5908185b5bdd5b9d60521b60448201526064016105b0565b6101605461015f5460408051636a5c1cc960e11b815290516001600160a01b03938416936323b872dd933393620100009091049091169163d4b839929160048082019260209290919082900301816000875af1158015610da0573d6000803e3d6000fd5b505050506040513d601f19601f82011682018060405250810190610dc4919061205f565b6040516001600160e01b031960e085901b1681526001600160a01b03928316600482015291166024820152604481018690526064016020604051808303816000875af1158015610e18573d6000803e3d6000fd5b505050506040513d601f19601f82011682018060405250810190610e3c9190612095565b610e825760405162461bcd60e51b8152602060048201526017602482015276191bdb985d194e881d1c985b9cd9995c8819985a5b1959604a1b60448201526064016105b0565b6000610e903382600061154e565b6000610e9b856116d6565b9050610ea93382600161154e565b3360009081526101656020526040902054610ec486826120dc565b336000818152610165602052604090208290556101615461015f54610164549394509092620100009091046001600160a01b031691907ff04885d0e4a85ff9facb1781f4ac658cdb9bf783b710500eac6f0a07709ee962908a908690610f28610a38565b8a8a8e8e604051610f4098979695949392919061211d565b60405180910390a450505061071f600160c955565b60009182526065602090815260408084206001600160a01b0393909316845291905290205460ff1690565b336000908152610166602052604090205460ff1615158315151415610fe75760405162461bcd60e51b815260206004820152601a60248201527f77686974656c6973742073746174757320756e6368616e67656400000000000060448201526064016105b0565b336000818152610166602052604090819020805486151560ff199091161790556101615461015f5491519092620100009092046001600160a01b031691907f042d886ee6fc05441a770c2c4142bc5aa1d5ec67ac5937adf5c5c6fc4625aee09061105690889088908890612163565b60405180910390a4505050565b600061106e81611248565b6101648290556101615461015f546201000090046001600160a01b03167ff580529ed53b5d8ddc681893476404e9974b7fa34a4bfde6405c754109184c4b846110b5610a38565b6040805192835260208301919091520160405180910390a35050565b6000828152606560205260409020600101546110ec81611248565b61071f8383611252565b6110fe611448565b6001600160a01b0381166111635760405162461bcd60e51b815260206004820152602660248201527f4f776e61626c653a206e6577206f776e657220697320746865207a65726f206160448201526564647265737360d01b60648201526084016105b0565b610868816114a2565b600054610100900460ff16610a365760405162461bcd60e51b81526004016105b090612188565b600054610100900460ff166111ba5760405162461bcd60e51b81526004016105b090612188565b610a366116fd565b6111cc8282610f55565b61079e5760008281526065602090815260408083206001600160a01b03851684529091529020805460ff191660011790556112043390565b6001600160a01b0316816001600160a01b0316837f2f8788117e7eff1d82e926ec794901d17c78024a50270940304540a733656f0d60405160405180910390a45050565b610868813361172d565b61125c8282610f55565b1561079e5760008281526065602090815260408083206001600160a01b0385168085529252808320805460ff1916905551339285917ff6391f5c32d9c69d2a47ea670b442974b53935d1edc7fd64eb21e047a839171b9190a45050565b6000805160206123a2833981519152546001600160a01b031690565b610868611448565b7f4910fdfa16fed3260ed0e7147f7cc6da11a60208b5b9406d12a635614ffd91435460ff16156113105761071f83611786565b826001600160a01b03166352d1902d6040518163ffffffff1660e01b8152600401602060405180830381865afa92505050801561136a575060408051601f3d908101601f191682019092526113679181019061207c565b60015b6113cd5760405162461bcd60e51b815260206004820152602e60248201527f45524331393637557067726164653a206e657720696d706c656d656e7461746960448201526d6f6e206973206e6f74205555505360901b60648201526084016105b0565b6000805160206123a2833981519152811461143c5760405162461bcd60e51b815260206004820152602960248201527f45524331393637557067726164653a20756e737570706f727465642070726f786044820152681a58589b195555525160ba1b60648201526084016105b0565b5061071f838383611822565b6097546001600160a01b03163314610a365760405162461bcd60e51b815260206004820181905260248201527f4f776e61626c653a2063616c6c6572206973206e6f7420746865206f776e657260448201526064016105b0565b609780546001600160a01b038381166001600160a01b0319831681179093556040519116919082907f8be0079c531659141344cd1fd0a4f28419497f9722a3daafe3b4186f6b6457e090600090a35050565b600260c95414156115475760405162461bcd60e51b815260206004820152601f60248201527f5265656e7472616e637947756172643a207265656e7472616e742063616c6c0060448201526064016105b0565b600260c955565b60408051600180825281830190925260009160208083019080368337019050509050838160008151811061158457611584611f5a565b6001600160a01b03929092166020928302919091019091015260408051600180825281830190925260009181602001602082028036833701905050905083816000815181106115d5576115d5611f5a565b602090810291909101015260018360018111156115f4576115f46121d3565b14156116695761015f54604051632c78fd0360e21b8152620100009091046001600160a01b03169063b1e3f40c9061163290859085906004016121e9565b600060405180830381600087803b15801561164c57600080fd5b505af1158015611660573d6000803e3d6000fd5b505050506116cf565b61015f546040516322936c2360e11b8152620100009091046001600160a01b031690634526d846906116a190859085906004016121e9565b600060405180830381600087803b1580156116bb57600080fd5b505af11580156106ef573d6000803e3d6000fd5b5050505050565b6000610163546116f361016254846116ee919061226d565b61184d565b6105119190612281565b600054610100900460ff166117245760405162461bcd60e51b81526004016105b090612188565b610a36336114a2565b6117378282610f55565b61079e57611744816118f2565b61174f836020611904565b6040516020016117609291906122cc565b60408051601f198184030181529082905262461bcd60e51b82526105b09160040161233b565b6001600160a01b0381163b6117f35760405162461bcd60e51b815260206004820152602d60248201527f455243313936373a206e657720696d706c656d656e746174696f6e206973206e60448201526c1bdd08184818dbdb9d1c9858dd609a1b60648201526084016105b0565b6000805160206123a283398151915280546001600160a01b0319166001600160a01b0392909216919091179055565b61182b83611aa7565b6000825111806118385750805b1561071f576118478383611ae7565b50505050565b60b581600160881b81106118665760409190911b9060801c5b600160481b811061187c5760209190911b9060401c5b6501000000000081106118945760109190911b9060201c5b630100000081106118aa5760089190911b9060101c5b62010000010260121c80820401600190811c80830401811c80830401811c80830401811c80830401811c80830401811c80830401901c8082048111156118ed5781045b919050565b60606105116001600160a01b03831660145b60606000611913836002612281565b61191e9060026120dc565b67ffffffffffffffff81111561193657611936611d8d565b6040519080825280601f01601f191660200182016040528015611960576020820181803683370190505b509050600360fc1b8160008151811061197b5761197b611f5a565b60200101906001600160f81b031916908160001a905350600f60fb1b816001815181106119aa576119aa611f5a565b60200101906001600160f81b031916908160001a90535060006119ce846002612281565b6119d99060016120dc565b90505b6001811115611a51576f181899199a1a9b1b9c1cb0b131b232b360811b85600f1660108110611a0d57611a0d611f5a565b1a60f81b828281518110611a2357611a23611f5a565b60200101906001600160f81b031916908160001a90535060049490941c93611a4a8161236e565b90506119dc565b508315611aa05760405162461bcd60e51b815260206004820181905260248201527f537472696e67733a20686578206c656e67746820696e73756666696369656e7460448201526064016105b0565b9392505050565b611ab081611786565b6040516001600160a01b038216907fbc7cd75a20ee27fd9adebab32041f755214dbc6bffa90cc0225b39da2e5c2d3b90600090a250565b6060611aa083836040518060600160405280602781526020016123c2602791396060600080856001600160a01b031685604051611b249190612385565b600060405180830381855af49150503d8060008114611b5f576040519150601f19603f3d011682016040523d82523d6000602084013e611b64565b606091505b5091509150611b7586838387611b7f565b9695505050505050565b60608315611beb578251611be4576001600160a01b0385163b611be45760405162461bcd60e51b815260206004820152601d60248201527f416464726573733a2063616c6c20746f206e6f6e2d636f6e747261637400000060448201526064016105b0565b5081611bf5565b611bf58383611bfd565b949350505050565b815115611c0d5781518083602001fd5b8060405162461bcd60e51b81526004016105b0919061233b565b600060208284031215611c3957600080fd5b81356001600160e01b031981168114611aa057600080fd5b600060208284031215611c6357600080fd5b5035919050565b6001600160a01b038116811461086857600080fd5b60008060008060008060008060e0898b031215611c9b57600080fd5b8835611ca681611c6a565b97506020890135611cb681611c6a565b965060408901359550606089013594506080890135935060a0890135925060c089013567ffffffffffffffff80821115611cef57600080fd5b818b0191508b601f830112611d0357600080fd5b813581811115611d1257600080fd5b8c60208260051b8501011115611d2757600080fd5b6020830194508093505050509295985092959890939650565b60008060408385031215611d5357600080fd5b823591506020830135611d6581611c6a565b809150509250929050565b600060208284031215611d8257600080fd5b8135611aa081611c6a565b634e487b7160e01b600052604160045260246000fd5b60008060408385031215611db657600080fd5b8235611dc181611c6a565b9150602083013567ffffffffffffffff80821115611dde57600080fd5b818501915085601f830112611df257600080fd5b813581811115611e0457611e04611d8d565b604051601f8201601f19908116603f01168101908382118183101715611e2c57611e2c611d8d565b81604052828152886020848701011115611e4557600080fd5b8260208601602083013760006020848301015280955050505050509250929050565b60008083601f840112611e7957600080fd5b50813567ffffffffffffffff811115611e9157600080fd5b602083019150836020828501011115611ea957600080fd5b9250929050565b600080600060408486031215611ec557600080fd5b83359250602084013567ffffffffffffffff811115611ee357600080fd5b611eef86828701611e67565b9497909650939450505050565b6001600160a01b0391909116815260200190565b801515811461086857600080fd5b600080600060408486031215611f3357600080fd5b8335611f3e81611f10565b9250602084013567ffffffffffffffff811115611ee357600080fd5b634e487b7160e01b600052603260045260246000fd5b634e487b7160e01b600052601160045260246000fd5b6000600019821415611f9a57611f9a611f70565b5060010190565b6020808252602c908201527f46756e6374696f6e206d7573742062652063616c6c6564207468726f7567682060408201526b19195b1959d85d1958d85b1b60a21b606082015260800190565b6020808252602c908201527f46756e6374696f6e206d7573742062652063616c6c6564207468726f7567682060408201526b6163746976652070726f787960a01b606082015260800190565b600061ffff80831681851680830382111561205657612056611f70565b01949350505050565b60006020828403121561207157600080fd5b8151611aa081611c6a565b60006020828403121561208e57600080fd5b5051919050565b6000602082840312156120a757600080fd5b8151611aa081611f10565b634e487b7160e01b600052601260045260246000fd5b6000826120d7576120d76120b2565b500690565b600082198211156120ef576120ef611f70565b500190565b81835281816020850137506000828201602090810191909152601f909101601f19169091010190565b8881528760208201528660408201528560608201528460808201528360a082015260e060c0820152600061215560e0830184866120f4565b9a9950505050505050505050565b831515815260406020820152600061217f6040830184866120f4565b95945050505050565b6020808252602b908201527f496e697469616c697a61626c653a20636f6e7472616374206973206e6f74206960408201526a6e697469616c697a696e6760a81b606082015260800190565b634e487b7160e01b600052602160045260246000fd5b604080825283519082018190526000906020906060840190828701845b8281101561222b5781516001600160a01b031684529284019290840190600101612206565b5050508381038285015284518082528583019183019060005b8181101561226057835183529284019291840191600101612244565b5090979650505050505050565b60008261227c5761227c6120b2565b500490565b600081600019048311821515161561229b5761229b611f70565b500290565b60005b838110156122bb5781810151838201526020016122a3565b838111156118475750506000910152565b76020b1b1b2b9b9a1b7b73a3937b61d1030b1b1b7bab73a1604d1b8152600083516122fe8160178501602088016122a0565b7001034b99036b4b9b9b4b733903937b6329607d1b601791840191820152835161232f8160288401602088016122a0565b01602801949350505050565b602081526000825180602084015261235a8160408501602087016122a0565b601f01601f19169190910160400192915050565b60008161237d5761237d611f70565b506000190190565b600082516123978184602087016122a0565b919091019291505056fe360894a13ba1a3210667c828492db98dca3e2076cc3735a920a3ca505d382bbc416464726573733a206c6f772d6c6576656c2064656c65676174652063616c6c206661696c6564a26469706673582212202acbfa3659ce143c1012d11f0377b60a1124a9901057e92f200d0bedd7d6d2fc64736f6c634300080c0033";

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
