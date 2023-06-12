import { ethers, network } from "hardhat";
import { DeployFunction } from "hardhat-deploy/types";
import { HardhatRuntimeEnvironment } from "hardhat/types";
import { getChainIdHex } from "../src/util";

const deploy: DeployFunction = async function (hre: HardhatRuntimeEnvironment) {
  const { deployer } = await hre.getNamedAccounts();
  const signer = await ethers.getSigner(deployer);
  const balance = await signer.getBalance();
  const ethBalance = ethers.utils.formatUnits(balance);

  console.log(`Deploying on ${network.name} network (chainId: ${await getChainIdHex()})`);
  // console.log("mnemonic:", process.env.MNEMONIC);
  console.log(`Deployer is ${deployer} (balance: ${ethBalance} ETH)`);
};

export default deploy;
