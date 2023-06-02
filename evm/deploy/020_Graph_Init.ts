// import fs from "fs";
import { DeployFunction } from "hardhat-deploy/types";
import { HardhatRuntimeEnvironment } from "hardhat/types";

// import {
//   Baal,
//   BaalAdvTokenSummoner,
//   BaalAndVaultSummoner,
//   BaalSummoner,
//   DeVoxShaman,
//   DeVoxShamanSummoner,
// } from "../src/util";

// async function runTask(
//   task: "init" | "add",
//   contractName: string,
//   hre: HardhatRuntimeEnvironment,
//   additionalArgs?: any[],
// ) {
//   const { deployments } = hre; // we get the deployments and getNamedAccounts which are provided by hardhat-deploy.
//   const { get } = deployments; // The deployments field itself contains the deploy function.

//   const { address } = await get(contractName);
//   const args = {
//     contractName,
//     address,
//     ...additionalArgs
//   };

//   console.log("cwd", process.cwd());

//   const path = `./subgraph/generated/${contractName}/${contractName}.ts`;
//   if (fs.existsSync(path)) {
//     console.log(`${path} exists, running update task`);
//     await hre.run("update", args);
//   } else {
//     console.log(`${path} does not exist, running ${task} task`);
//     await hre.run(task, args);
//   }
// }

// const init = async (contractName: string, hre: HardhatRuntimeEnvironment) => {
//   await runTask("init", contractName, hre);
// };

// const add = async (contractName: string, hre: HardhatRuntimeEnvironment) => {
//   await runTask("add", contractName, hre);
// };

const deploy: DeployFunction = async function (hre: HardhatRuntimeEnvironment) {
//   await init(DeVoxShaman, hre);
//   await add(DeVoxShamanSummoner, hre);
//   await add(Baal, hre);
//   await add(BaalSummoner, hre);
//   await add(BaalAdvTokenSummoner, hre);
//   await add(BaalAndVaultSummoner, hre);
};

export default deploy;
deploy.tags = ["graph", "local", "staging"];
