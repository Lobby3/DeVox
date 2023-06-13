/* Autogenerated file. Do not edit manually. */

/* tslint:disable */

/* eslint-disable */
import type { PromiseOrValue } from "../../../common";
import type {
  DeVoxBaalAndShamanSummonerV1,
  DeVoxBaalAndShamanSummonerV1Interface,
} from "../../../contracts/shaman/DeVoxBaalAndShamanSummonerV1";
import type { Provider, TransactionRequest } from "@ethersproject/providers";
import { Signer, utils, Contract, ContractFactory, Overrides } from "ethers";

const _abi = [
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
        name: "implementation",
        type: "address",
      },
    ],
    name: "Upgraded",
    type: "event",
  },
  {
    inputs: [],
    name: "_baalSummoner",
    outputs: [
      {
        internalType: "contract IBaalAdvTokenSummoner",
        name: "",
        type: "address",
      },
    ],
    stateMutability: "view",
    type: "function",
  },
  {
    inputs: [],
    name: "_shamanSummoner",
    outputs: [
      {
        internalType: "contract IShamanSummoner",
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
        name: "baalSummoner",
        type: "address",
      },
      {
        internalType: "address",
        name: "shamanSummoner",
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
        internalType: "uint256",
        name: "_saltNonce",
        type: "uint256",
      },
      {
        internalType: "bytes",
        name: "_initializationMintParams",
        type: "bytes",
      },
      {
        internalType: "bytes",
        name: "_initializationTokenParams",
        type: "bytes",
      },
      {
        internalType: "bytes[]",
        name: "_baalInitializationActions",
        type: "bytes[]",
      },
      {
        internalType: "bytes",
        name: "_shamanInitializationParams",
        type: "bytes",
      },
    ],
    name: "summonBaalAndShaman",
    outputs: [
      {
        internalType: "address",
        name: "_baalAddress",
        type: "address",
      },
      {
        internalType: "address",
        name: "_shamanAddress",
        type: "address",
      },
    ],
    stateMutability: "nonpayable",
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
] as const;

const _bytecode =
  "0x60a06040523073ffffffffffffffffffffffffffffffffffffffff1660809073ffffffffffffffffffffffffffffffffffffffff1681525034801561004357600080fd5b50608051612db661007b60003960008181610256015281816102e5015281816107dd0152818161086c015261091c0152612db66000f3fe6080604052600436106100915760003560e01c8063715018a611610059578063715018a61461015a5780638da5cb5b14610171578063cf9e5fb21461019c578063f19d99f4146101c7578063f2fde38b1461020557610091565b806314b630f9146100965780633659cfe6146100c1578063485cc955146100ea5780634f1ef2861461011357806352d1902d1461012f575b600080fd5b3480156100a257600080fd5b506100ab61022e565b6040516100b891906119af565b60405180910390f35b3480156100cd57600080fd5b506100e860048036038101906100e39190611a1c565b610254565b005b3480156100f657600080fd5b50610111600480360381019061010c9190611a49565b6103dd565b005b61012d60048036038101906101289190611bcf565b6107db565b005b34801561013b57600080fd5b50610144610918565b6040516101519190611c44565b60405180910390f35b34801561016657600080fd5b5061016f6109d1565b005b34801561017d57600080fd5b506101866109e5565b6040516101939190611c6e565b60405180910390f35b3480156101a857600080fd5b506101b1610a0f565b6040516101be9190611caa565b60405180910390f35b3480156101d357600080fd5b506101ee60048036038101906101e99190611db1565b610a35565b6040516101fc929190611ead565b60405180910390f35b34801561021157600080fd5b5061022c60048036038101906102279190611a1c565b611162565b005b60c960009054906101000a900473ffffffffffffffffffffffffffffffffffffffff1681565b7f000000000000000000000000000000000000000000000000000000000000000073ffffffffffffffffffffffffffffffffffffffff163073ffffffffffffffffffffffffffffffffffffffff1614156102e3576040517f08c379a00000000000000000000000000000000000000000000000000000000081526004016102da90611f59565b60405180910390fd5b7f000000000000000000000000000000000000000000000000000000000000000073ffffffffffffffffffffffffffffffffffffffff166103226111e6565b73ffffffffffffffffffffffffffffffffffffffff1614610378576040517f08c379a000000000000000000000000000000000000000000000000000000000815260040161036f90611feb565b60405180910390fd5b6103818161123d565b6103da81600067ffffffffffffffff8111156103a05761039f611aa4565b5b6040519080825280601f01601f1916602001820160405280156103d25781602001600182028036833780820191505090505b506000611284565b50565b6103f167383a75ede9bb5c1560c01b6113f2565b60008060019054906101000a900460ff161590508080156104225750600160008054906101000a900460ff1660ff16105b8061044f5750610431306113f5565b15801561044e5750600160008054906101000a900460ff1660ff16145b5b61048e576040517f08c379a00000000000000000000000000000000000000000000000000000000081526004016104859061207d565b60405180910390fd5b60016000806101000a81548160ff021916908360ff16021790555080156104cb576001600060016101000a81548160ff0219169083151502179055505b6104df67fc073c4f6e14854760c01b6113f2565b6104f3678b8589d27739cc5a60c01b6113f2565b61050767ad48adf0aa81e46a60c01b6113f2565b61051b67d9e7489ff9000cca60c01b6113f2565b61052f67187dfa061984a5df60c01b6113f2565b600073ffffffffffffffffffffffffffffffffffffffff168373ffffffffffffffffffffffffffffffffffffffff16141561059f576040517f08c379a0000000000000000000000000000000000000000000000000000000008152600401610596906120e9565b60405180910390fd5b6105b367eeb3473ec51a03f060c01b6113f2565b6105c767aa0d8896746189f060c01b6113f2565b6105db67cdb0f01cbf9e92ac60c01b6113f2565b6105ef67042e4933ba6a735560c01b6113f2565b600073ffffffffffffffffffffffffffffffffffffffff168273ffffffffffffffffffffffffffffffffffffffff16141561065f576040517f08c379a000000000000000000000000000000000000000000000000000000000815260040161065690612155565b60405180910390fd5b61067367a9fdbb49c895212f60c01b6113f2565b6106876712eb99b75a03b36a60c01b6113f2565b61069b677d4c0a9cf01ae61560c01b6113f2565b6106a3611418565b6106b7674c74d4eaf140e37a60c01b6113f2565b6106cb6789a19f466dd99bf460c01b6113f2565b6106d3611471565b6106e76750d397909fed1f7860c01b6113f2565b8260c960006101000a81548173ffffffffffffffffffffffffffffffffffffffff021916908373ffffffffffffffffffffffffffffffffffffffff16021790555061073c67d3a710f6273619f460c01b6113f2565b8160ca60006101000a81548173ffffffffffffffffffffffffffffffffffffffff021916908373ffffffffffffffffffffffffffffffffffffffff16021790555080156107d65760008060016101000a81548160ff0219169083151502179055507f7f26b83ff96e1f2b6a682f133852f6798a09c465da95921460cefb384740249860016040516107cd91906121bd565b60405180910390a15b505050565b7f000000000000000000000000000000000000000000000000000000000000000073ffffffffffffffffffffffffffffffffffffffff163073ffffffffffffffffffffffffffffffffffffffff16141561086a576040517f08c379a000000000000000000000000000000000000000000000000000000000815260040161086190611f59565b60405180910390fd5b7f000000000000000000000000000000000000000000000000000000000000000073ffffffffffffffffffffffffffffffffffffffff166108a96111e6565b73ffffffffffffffffffffffffffffffffffffffff16146108ff576040517f08c379a00000000000000000000000000000000000000000000000000000000081526004016108f690611feb565b60405180910390fd5b6109088261123d565b61091482826001611284565b5050565b60007f000000000000000000000000000000000000000000000000000000000000000073ffffffffffffffffffffffffffffffffffffffff163073ffffffffffffffffffffffffffffffffffffffff16146109a8576040517f08c379a000000000000000000000000000000000000000000000000000000000815260040161099f9061224a565b60405180910390fd5b7f360894a13ba1a3210667c828492db98dca3e2076cc3735a920a3ca505d382bbc60001b905090565b6109d96114c2565b6109e36000611540565b565b6000603360009054906101000a900473ffffffffffffffffffffffffffffffffffffffff16905090565b60ca60009054906101000a900473ffffffffffffffffffffffffffffffffffffffff1681565b600080610a4c672c865f9da4a6a2a660c01b6113f2565b610a6067964460709f2b7def60c01b6113f2565b610a7467a1934343b165b4c860c01b6113f2565b6000600187879050610a869190612299565b67ffffffffffffffff811115610a9f57610a9e611aa4565b5b604051908082528060200260200182016040528015610ad257816020015b6060815260200190600190039081610abd5790505b509050610ae967276aec60f235ab8760c01b6113f2565b610afd67dfa3b7431439101760c01b6113f2565b60005b87879050811015610bb857610b1f67f6a68d6cbf54b59160c01b6113f2565b878782818110610b3257610b316122ef565b5b9050602002810190610b44919061232d565b8080601f016020809104026020016040519081016040528093929190818152602001838380828437600081840152601f19601f82011690508083019250505050505050828281518110610b9a57610b996122ef565b5b60200260200101819052508080610bb090612390565b915050610b00565b50610bcd6708649618ec264f9f60c01b6113f2565b63f2fde38b60e01b30604051602401610be69190611c6e565b604051602081830303815290604052907bffffffffffffffffffffffffffffffffffffffffffffffffffffffff19166020820180517bffffffffffffffffffffffffffffffffffffffffffffffffffffffff83818316178352505050508160018351610c5291906123d9565b81518110610c6357610c626122ef565b5b6020026020010181905250610c8267e99675ee9054575360c01b6113f2565b60c960009054906101000a900473ffffffffffffffffffffffffffffffffffffffff1673ffffffffffffffffffffffffffffffffffffffff1663eb7a86c38d8d8d8d8d876040518763ffffffff1660e01b8152600401610ce7969594939291906125a4565b6020604051808303816000875af1158015610d06573d6000803e3d6000fd5b505050506040513d601f19601f82011682018060405250810190610d2a9190612617565b9250610d40678af1d56bd57f24e060c01b6113f2565b60ca60009054906101000a900473ffffffffffffffffffffffffffffffffffffffff1673ffffffffffffffffffffffffffffffffffffffff16637e919b098487876040518463ffffffff1660e01b8152600401610d9f93929190612644565b6020604051808303816000875af1158015610dbe573d6000803e3d6000fd5b505050506040513d601f19601f82011682018060405250810190610de29190612617565b9150610df867d9ffd38435e1c91360c01b6113f2565b610e0c67688407e930a20b5660c01b6113f2565b610e2067ad122dc54033b75a60c01b6113f2565b600073ffffffffffffffffffffffffffffffffffffffff168273ffffffffffffffffffffffffffffffffffffffff161415610e90576040517f08c379a0000000000000000000000000000000000000000000000000000000008152600401610e87906126c2565b60405180910390fd5b610ea4673c8d2618a82287a960c01b6113f2565b610eb8676cf42cb67233047360c01b6113f2565b610ecc67818c9696407a5ba960c01b6113f2565b8273ffffffffffffffffffffffffffffffffffffffff1663086cfca8306040518263ffffffff1660e01b8152600401610f059190611c6e565b600060405180830381600087803b158015610f1f57600080fd5b505af1158015610f33573d6000803e3d6000fd5b50505050610f4b675beb15b04ff58ce460c01b6113f2565b610f5f67c51ec898c6dffdb260c01b6113f2565b6000600167ffffffffffffffff811115610f7c57610f7b611aa4565b5b604051908082528060200260200182016040528015610faa5781602001602082028036833780820191505090505b509050610fc167684ab832aea56fe060c01b6113f2565b8281600081518110610fd657610fd56122ef565b5b602002602001019073ffffffffffffffffffffffffffffffffffffffff16908173ffffffffffffffffffffffffffffffffffffffff168152505061102467ffd6d5899e54b06f60c01b6113f2565b6110386732289c1a9c52125160c01b6113f2565b6000600167ffffffffffffffff81111561105557611054611aa4565b5b6040519080825280602002602001820160405280156110835781602001602082028036833780820191505090505b50905061109a67aa313902836cab9960c01b6113f2565b6007816000815181106110b0576110af6122ef565b5b6020026020010181815250506110d06711b0335196500f0c60c01b6113f2565b6110e467990d5229151a297960c01b6113f2565b8473ffffffffffffffffffffffffffffffffffffffff16630f656a2183836040518363ffffffff1660e01b815260040161111f92919061285e565b600060405180830381600087803b15801561113957600080fd5b505af115801561114d573d6000803e3d6000fd5b50505050505050995099975050505050505050565b61116a6114c2565b600073ffffffffffffffffffffffffffffffffffffffff168173ffffffffffffffffffffffffffffffffffffffff1614156111da576040517f08c379a00000000000000000000000000000000000000000000000000000000081526004016111d190612907565b60405180910390fd5b6111e381611540565b50565b60006112147f360894a13ba1a3210667c828492db98dca3e2076cc3735a920a3ca505d382bbc60001b611606565b60000160009054906101000a900473ffffffffffffffffffffffffffffffffffffffff16905090565b611251679fad50d979bc384a60c01b6113f2565b6112596114c2565b61126d67c86429c479b9579360c01b6113f2565b6112816722fe4c2f6d472aa460c01b6113f2565b50565b6112b07f4910fdfa16fed3260ed0e7147f7cc6da11a60208b5b9406d12a635614ffd914360001b611610565b60000160009054906101000a900460ff16156112d4576112cf8361161a565b6113ed565b8273ffffffffffffffffffffffffffffffffffffffff166352d1902d6040518163ffffffff1660e01b8152600401602060405180830381865afa92505050801561133c57506040513d601f19601f820116820180604052508101906113399190612953565b60015b61137b576040517f08c379a0000000000000000000000000000000000000000000000000000000008152600401611372906129f2565b60405180910390fd5b7f360894a13ba1a3210667c828492db98dca3e2076cc3735a920a3ca505d382bbc60001b81146113e0576040517f08c379a00000000000000000000000000000000000000000000000000000000081526004016113d790612a84565b60405180910390fd5b506113ec8383836116d3565b5b505050565b50565b6000808273ffffffffffffffffffffffffffffffffffffffff163b119050919050565b600060019054906101000a900460ff16611467576040517f08c379a000000000000000000000000000000000000000000000000000000000815260040161145e90612b16565b60405180910390fd5b61146f6116ff565b565b600060019054906101000a900460ff166114c0576040517f08c379a00000000000000000000000000000000000000000000000000000000081526004016114b790612b16565b60405180910390fd5b565b6114ca611760565b73ffffffffffffffffffffffffffffffffffffffff166114e86109e5565b73ffffffffffffffffffffffffffffffffffffffff161461153e576040517f08c379a000000000000000000000000000000000000000000000000000000000815260040161153590612b82565b60405180910390fd5b565b6000603360009054906101000a900473ffffffffffffffffffffffffffffffffffffffff16905081603360006101000a81548173ffffffffffffffffffffffffffffffffffffffff021916908373ffffffffffffffffffffffffffffffffffffffff1602179055508173ffffffffffffffffffffffffffffffffffffffff168173ffffffffffffffffffffffffffffffffffffffff167f8be0079c531659141344cd1fd0a4f28419497f9722a3daafe3b4186f6b6457e060405160405180910390a35050565b6000819050919050565b6000819050919050565b611623816113f5565b611662576040517f08c379a000000000000000000000000000000000000000000000000000000000815260040161165990612c14565b60405180910390fd5b8061168f7f360894a13ba1a3210667c828492db98dca3e2076cc3735a920a3ca505d382bbc60001b611606565b60000160006101000a81548173ffffffffffffffffffffffffffffffffffffffff021916908373ffffffffffffffffffffffffffffffffffffffff16021790555050565b6116dc83611768565b6000825111806116e95750805b156116fa576116f883836117b7565b505b505050565b600060019054906101000a900460ff1661174e576040517f08c379a000000000000000000000000000000000000000000000000000000000815260040161174590612b16565b60405180910390fd5b61175e611759611760565b611540565b565b600033905090565b6117718161161a565b8073ffffffffffffffffffffffffffffffffffffffff167fbc7cd75a20ee27fd9adebab32041f755214dbc6bffa90cc0225b39da2e5c2d3b60405160405180910390a250565b60606117dc8383604051806060016040528060278152602001612d5a602791396117e4565b905092915050565b60606000808573ffffffffffffffffffffffffffffffffffffffff168560405161180e9190612c70565b600060405180830381855af49150503d8060008114611849576040519150601f19603f3d011682016040523d82523d6000602084013e61184e565b606091505b509150915061185f8683838761186a565b925050509392505050565b606083156118cd576000835114156118c557611885856113f5565b6118c4576040517f08c379a00000000000000000000000000000000000000000000000000000000081526004016118bb90612cd3565b60405180910390fd5b5b8290506118d8565b6118d783836118e0565b5b949350505050565b6000825111156118f35781518083602001fd5b806040517f08c379a00000000000000000000000000000000000000000000000000000000081526004016119279190612d37565b60405180910390fd5b600073ffffffffffffffffffffffffffffffffffffffff82169050919050565b6000819050919050565b600061197561197061196b84611930565b611950565b611930565b9050919050565b60006119878261195a565b9050919050565b60006119998261197c565b9050919050565b6119a98161198e565b82525050565b60006020820190506119c460008301846119a0565b92915050565b6000604051905090565b600080fd5b600080fd5b60006119e982611930565b9050919050565b6119f9816119de565b8114611a0457600080fd5b50565b600081359050611a16816119f0565b92915050565b600060208284031215611a3257611a316119d4565b5b6000611a4084828501611a07565b91505092915050565b60008060408385031215611a6057611a5f6119d4565b5b6000611a6e85828601611a07565b9250506020611a7f85828601611a07565b9150509250929050565b600080fd5b600080fd5b6000601f19601f8301169050919050565b7f4e487b7100000000000000000000000000000000000000000000000000000000600052604160045260246000fd5b611adc82611a93565b810181811067ffffffffffffffff82111715611afb57611afa611aa4565b5b80604052505050565b6000611b0e6119ca565b9050611b1a8282611ad3565b919050565b600067ffffffffffffffff821115611b3a57611b39611aa4565b5b611b4382611a93565b9050602081019050919050565b82818337600083830152505050565b6000611b72611b6d84611b1f565b611b04565b905082815260208101848484011115611b8e57611b8d611a8e565b5b611b99848285611b50565b509392505050565b600082601f830112611bb657611bb5611a89565b5b8135611bc6848260208601611b5f565b91505092915050565b60008060408385031215611be657611be56119d4565b5b6000611bf485828601611a07565b925050602083013567ffffffffffffffff811115611c1557611c146119d9565b5b611c2185828601611ba1565b9150509250929050565b6000819050919050565b611c3e81611c2b565b82525050565b6000602082019050611c596000830184611c35565b92915050565b611c68816119de565b82525050565b6000602082019050611c836000830184611c5f565b92915050565b6000611c948261197c565b9050919050565b611ca481611c89565b82525050565b6000602082019050611cbf6000830184611c9b565b92915050565b6000819050919050565b611cd881611cc5565b8114611ce357600080fd5b50565b600081359050611cf581611ccf565b92915050565b600080fd5b600080fd5b60008083601f840112611d1b57611d1a611a89565b5b8235905067ffffffffffffffff811115611d3857611d37611cfb565b5b602083019150836001820283011115611d5457611d53611d00565b5b9250929050565b60008083601f840112611d7157611d70611a89565b5b8235905067ffffffffffffffff811115611d8e57611d8d611cfb565b5b602083019150836020820283011115611daa57611da9611d00565b5b9250929050565b600080600080600080600080600060a08a8c031215611dd357611dd26119d4565b5b6000611de18c828d01611ce6565b99505060208a013567ffffffffffffffff811115611e0257611e016119d9565b5b611e0e8c828d01611d05565b985098505060408a013567ffffffffffffffff811115611e3157611e306119d9565b5b611e3d8c828d01611d05565b965096505060608a013567ffffffffffffffff811115611e6057611e5f6119d9565b5b611e6c8c828d01611d5b565b945094505060808a013567ffffffffffffffff811115611e8f57611e8e6119d9565b5b611e9b8c828d01611d05565b92509250509295985092959850929598565b6000604082019050611ec26000830185611c5f565b611ecf6020830184611c5f565b9392505050565b600082825260208201905092915050565b7f46756e6374696f6e206d7573742062652063616c6c6564207468726f7567682060008201527f64656c656761746563616c6c0000000000000000000000000000000000000000602082015250565b6000611f43602c83611ed6565b9150611f4e82611ee7565b604082019050919050565b60006020820190508181036000830152611f7281611f36565b9050919050565b7f46756e6374696f6e206d7573742062652063616c6c6564207468726f7567682060008201527f6163746976652070726f78790000000000000000000000000000000000000000602082015250565b6000611fd5602c83611ed6565b9150611fe082611f79565b604082019050919050565b6000602082019050818103600083015261200481611fc8565b9050919050565b7f496e697469616c697a61626c653a20636f6e747261637420697320616c72656160008201527f647920696e697469616c697a6564000000000000000000000000000000000000602082015250565b6000612067602e83611ed6565b91506120728261200b565b604082019050919050565b600060208201905081810360008301526120968161205a565b9050919050565b7f6261616c53756d6d6f6e65723a207a65726f2061646472657373000000000000600082015250565b60006120d3601a83611ed6565b91506120de8261209d565b602082019050919050565b60006020820190508181036000830152612102816120c6565b9050919050565b7f7368616d616e53756d6d6f6e65723a207a65726f206164647265737300000000600082015250565b600061213f601c83611ed6565b915061214a82612109565b602082019050919050565b6000602082019050818103600083015261216e81612132565b9050919050565b6000819050919050565b600060ff82169050919050565b60006121a76121a261219d84612175565b611950565b61217f565b9050919050565b6121b78161218c565b82525050565b60006020820190506121d260008301846121ae565b92915050565b7f555550535570677261646561626c653a206d757374206e6f742062652063616c60008201527f6c6564207468726f7567682064656c656761746563616c6c0000000000000000602082015250565b6000612234603883611ed6565b915061223f826121d8565b604082019050919050565b6000602082019050818103600083015261226381612227565b9050919050565b7f4e487b7100000000000000000000000000000000000000000000000000000000600052601160045260246000fd5b60006122a482611cc5565b91506122af83611cc5565b9250827fffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffff038211156122e4576122e361226a565b5b828201905092915050565b7f4e487b7100000000000000000000000000000000000000000000000000000000600052603260045260246000fd5b600080fd5b600080fd5b600080fd5b6000808335600160200384360303811261234a5761234961231e565b5b80840192508235915067ffffffffffffffff82111561236c5761236b612323565b5b60208301925060018202360383131561238857612387612328565b5b509250929050565b600061239b82611cc5565b91507fffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffff8214156123ce576123cd61226a565b5b600182019050919050565b60006123e482611cc5565b91506123ef83611cc5565b9250828210156124025761240161226a565b5b828203905092915050565b61241681611cc5565b82525050565b600082825260208201905092915050565b6000612439838561241c565b9350612446838584611b50565b61244f83611a93565b840190509392505050565b600081519050919050565b600082825260208201905092915050565b6000819050602082019050919050565b600081519050919050565b600082825260208201905092915050565b60005b838110156124c05780820151818401526020810190506124a5565b838111156124cf576000848401525b50505050565b60006124e082612486565b6124ea8185612491565b93506124fa8185602086016124a2565b61250381611a93565b840191505092915050565b600061251a83836124d5565b905092915050565b6000602082019050919050565b600061253a8261245a565b6125448185612465565b93508360208202850161255685612476565b8060005b858110156125925784840389528151612573858261250e565b945061257e83612522565b925060208a0199505060018101905061255a565b50829750879550505050505092915050565b60006080820190506125b9600083018961240d565b81810360208301526125cc81878961242d565b905081810360408301526125e181858761242d565b905081810360608301526125f5818461252f565b9050979650505050505050565b600081519050612611816119f0565b92915050565b60006020828403121561262d5761262c6119d4565b5b600061263b84828501612602565b91505092915050565b60006040820190506126596000830186611c5f565b818103602083015261266c81848661242d565b9050949350505050565b7f7368616d616e416464726573733a207a65726f20616464726573730000000000600082015250565b60006126ac601b83611ed6565b91506126b782612676565b602082019050919050565b600060208201905081810360008301526126db8161269f565b9050919050565b600081519050919050565b600082825260208201905092915050565b6000819050602082019050919050565b612717816119de565b82525050565b6000612729838361270e565b60208301905092915050565b6000602082019050919050565b600061274d826126e2565b61275781856126ed565b9350612762836126fe565b8060005b8381101561279357815161277a888261271d565b975061278583612735565b925050600181019050612766565b5085935050505092915050565b600081519050919050565b600082825260208201905092915050565b6000819050602082019050919050565b6127d581611cc5565b82525050565b60006127e783836127cc565b60208301905092915050565b6000602082019050919050565b600061280b826127a0565b61281581856127ab565b9350612820836127bc565b8060005b8381101561285157815161283888826127db565b9750612843836127f3565b925050600181019050612824565b5085935050505092915050565b600060408201905081810360008301526128788185612742565b9050818103602083015261288c8184612800565b90509392505050565b7f4f776e61626c653a206e6577206f776e657220697320746865207a65726f206160008201527f6464726573730000000000000000000000000000000000000000000000000000602082015250565b60006128f1602683611ed6565b91506128fc82612895565b604082019050919050565b60006020820190508181036000830152612920816128e4565b9050919050565b61293081611c2b565b811461293b57600080fd5b50565b60008151905061294d81612927565b92915050565b600060208284031215612969576129686119d4565b5b60006129778482850161293e565b91505092915050565b7f45524331393637557067726164653a206e657720696d706c656d656e7461746960008201527f6f6e206973206e6f742055555053000000000000000000000000000000000000602082015250565b60006129dc602e83611ed6565b91506129e782612980565b604082019050919050565b60006020820190508181036000830152612a0b816129cf565b9050919050565b7f45524331393637557067726164653a20756e737570706f727465642070726f7860008201527f6961626c65555549440000000000000000000000000000000000000000000000602082015250565b6000612a6e602983611ed6565b9150612a7982612a12565b604082019050919050565b60006020820190508181036000830152612a9d81612a61565b9050919050565b7f496e697469616c697a61626c653a20636f6e7472616374206973206e6f74206960008201527f6e697469616c697a696e67000000000000000000000000000000000000000000602082015250565b6000612b00602b83611ed6565b9150612b0b82612aa4565b604082019050919050565b60006020820190508181036000830152612b2f81612af3565b9050919050565b7f4f776e61626c653a2063616c6c6572206973206e6f7420746865206f776e6572600082015250565b6000612b6c602083611ed6565b9150612b7782612b36565b602082019050919050565b60006020820190508181036000830152612b9b81612b5f565b9050919050565b7f455243313936373a206e657720696d706c656d656e746174696f6e206973206e60008201527f6f74206120636f6e747261637400000000000000000000000000000000000000602082015250565b6000612bfe602d83611ed6565b9150612c0982612ba2565b604082019050919050565b60006020820190508181036000830152612c2d81612bf1565b9050919050565b600081905092915050565b6000612c4a82612486565b612c548185612c34565b9350612c648185602086016124a2565b80840191505092915050565b6000612c7c8284612c3f565b915081905092915050565b7f416464726573733a2063616c6c20746f206e6f6e2d636f6e7472616374000000600082015250565b6000612cbd601d83611ed6565b9150612cc882612c87565b602082019050919050565b60006020820190508181036000830152612cec81612cb0565b9050919050565b600081519050919050565b6000612d0982612cf3565b612d138185611ed6565b9350612d238185602086016124a2565b612d2c81611a93565b840191505092915050565b60006020820190508181036000830152612d518184612cfe565b90509291505056fe416464726573733a206c6f772d6c6576656c2064656c65676174652063616c6c206661696c6564a264697066735822122023e32edf5e1e93068dc8c825875e5daea910eb5861d910ea9cb598fa24af812a64736f6c634300080c0033";

type DeVoxBaalAndShamanSummonerV1ConstructorParams =
  | [signer?: Signer]
  | ConstructorParameters<typeof ContractFactory>;

const isSuperArgs = (
  xs: DeVoxBaalAndShamanSummonerV1ConstructorParams
): xs is ConstructorParameters<typeof ContractFactory> => xs.length > 1;

export class DeVoxBaalAndShamanSummonerV1__factory extends ContractFactory {
  constructor(...args: DeVoxBaalAndShamanSummonerV1ConstructorParams) {
    if (isSuperArgs(args)) {
      super(...args);
    } else {
      super(_abi, _bytecode, args[0]);
    }
  }

  override deploy(
    overrides?: Overrides & { from?: PromiseOrValue<string> }
  ): Promise<DeVoxBaalAndShamanSummonerV1> {
    return super.deploy(
      overrides || {}
    ) as Promise<DeVoxBaalAndShamanSummonerV1>;
  }
  override getDeployTransaction(
    overrides?: Overrides & { from?: PromiseOrValue<string> }
  ): TransactionRequest {
    return super.getDeployTransaction(overrides || {});
  }
  override attach(address: string): DeVoxBaalAndShamanSummonerV1 {
    return super.attach(address) as DeVoxBaalAndShamanSummonerV1;
  }
  override connect(signer: Signer): DeVoxBaalAndShamanSummonerV1__factory {
    return super.connect(signer) as DeVoxBaalAndShamanSummonerV1__factory;
  }

  static readonly bytecode = _bytecode;
  static readonly abi = _abi;
  static createInterface(): DeVoxBaalAndShamanSummonerV1Interface {
    return new utils.Interface(_abi) as DeVoxBaalAndShamanSummonerV1Interface;
  }
  static connect(
    address: string,
    signerOrProvider: Signer | Provider
  ): DeVoxBaalAndShamanSummonerV1 {
    return new Contract(
      address,
      _abi,
      signerOrProvider
    ) as DeVoxBaalAndShamanSummonerV1;
  }
}
