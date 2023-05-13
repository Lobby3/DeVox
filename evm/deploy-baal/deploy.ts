import { ethers } from "hardhat";

// Test Deploy Values

// const _guildTokens = {
//     4: ['0x992e3005bb7a9efb9bff427f629bcb32fb61f706'],
// 	1: ['0x6b175474e89094c44da98b954eedeac495271d0f'],
// 	137: ['0xdd185af1bb417469461edbc95f22df9781a04624']
// }

const _shamans = {
  4: [""],
  1: [""],
  137: [""],
};

const _shares = ["1"];
const _loot = ["1"];
const _minVoting = 60;
const _maxVoting = 600;
const _proposalOffering = 1;
const _name = "TestBaal";
const _symbol = "BAALTO";

async function main() {
  // async logDeployStart("Baal");
  // const BaalFactory = await ethers.getContractFactory('Baal')
  // const baalSingleton = (await BaalFactory.deploy())
  // await baalSingleton.deployed();
  // const txHash = baalSingleton.deployTransaction.hash;
  // const receipt = await deployer.provider.getTransactionReceipt(txHash);
  // console.log('Transaction Hash:', txHash);
  // console.log('Contract Address:', baalSingleton.address);
  // console.log('Block Number:', receipt.blockNumber);
}

main()
  .then(() => process.exit(0))
  .catch((error) => {
    console.error(error);
    process.exit(1);
  });
