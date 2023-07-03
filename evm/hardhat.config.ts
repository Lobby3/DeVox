import "@nomiclabs/hardhat-ethers";
import "@nomiclabs/hardhat-etherscan";
import "@nomiclabs/hardhat-waffle";
import "@openzeppelin/hardhat-upgrades";
import "@typechain/hardhat";
// eslint-disable-next-line @nx/enforce-module-boundaries
import { config as dotenvConfig } from "dotenv";
import "hardhat-abi-exporter";
import "hardhat-contract-sizer";
import "hardhat-deploy";
import "hardhat-gas-reporter";
import { HardhatUserConfig } from "hardhat/config";
import { resolve } from "path";
import "solidity-coverage";

// You need to export an object to set up your config
// Go to https://hardhat.org/config/ to learn more

const dotenvConfigPath: string = process.env.DOTENV_CONFIG_PATH || "./.env";
dotenvConfig({ path: resolve(__dirname, dotenvConfigPath) });

const config: HardhatUserConfig = {
  networks: {
    localhost: {
      url: "http://localhost:8545",
      /*
        notice no mnemonic here? it will just use account 0 of the hardhat node to deploy
        (you can put in a mnemonic here to set the deployer locally)
      */
    },
    mainnet: {
      url: `https://mainnet.infura.io/v3/${process.env.INFURA_KEY}`,
      accounts: {
        mnemonic: process.env.MNEMONIC,
      },
    },
    goerli: {
      url: `https://goerli.infura.io/v3/${process.env.INFURA_KEY}`,
      gasPrice: 8000000000,
      gasMultiplier: 2,
      accounts: {
        mnemonic: process.env.MNEMONIC,
      },
    },
    sepolia: {
      url: `https://sepolia.infura.io/v3/${process.env.INFURA_KEY}`,
      gas: "auto",
      gasPrice: "auto",
      gasMultiplier: 2,
      accounts: {
        mnemonic: process.env.MNEMONIC,
      },
    },
    matic: {
      url: `https://polygon-mainnet.infura.io/v3/${process.env.INFURA_KEY}`,
      gasPrice: 300000000000,
      accounts: {
        mnemonic: process.env.MNEMONIC,
      },
    },
  },
  etherscan: {
    // Your API key for Etherscan
    // Obtain one at https://etherscan.io/
    apiKey: {
      goerli: process.env.NX_ETHERSCAN_KEY ?? "",
      mainnet: process.env.NX_ETHERSCAN_KEY ?? "",
      polygon: process.env.NX_POLYGONSCAN_KEY ?? "",
    },
    customChains: [
      // {
      //   network: "gnosis",
      //   chainId: 100,
      //   urls: {
      //     apiURL: "https://api.gnosisscan.io/api",
      //     browserURL: "https://gnosisscan.io/",
      //   }
      // },
      // can only have one chainId 100 at a time
      {
        network: "xdai",
        chainId: 100,
        urls: {
          apiURL: "https://blockscout.com/xdai/mainnet/api",
          browserURL: "https://blockscout.com/xdai/mainnet/",
        },
      },
      {
        network: "polygon",
        chainId: 137,
        urls: {
          apiURL: "https://api.polygonscan.com/api",
          browserURL: "https://polygonscan.com/",
        },
      },
    ],
  },
  solidity: {
    compilers: [
      {
        version: "0.8.12",
        settings: {
          optimizer: {
            enabled: true,
            runs: 100,
          },
        },
      },
    ],
  },
  abiExporter: {
    path: "./abi",
    clear: true,
    flat: true,
    except: ["@gnosis.pm", "@opengsn", "@openzeppelin"],
  },
  typechain: {
    outDir: "src/types",
    target: "ethers-v5",
  },
  namedAccounts: {
    deployer: 0,
    user: 1,
    anon: 9,
  },
};

export default config;
