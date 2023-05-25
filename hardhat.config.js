require("@nomicfoundation/hardhat-toolbox");
require("@nomiclabs/hardhat-etherscan");
require('hardhat-contract-sizer');
const _networks = require("./app-config/networks.js")
require('dotenv').config()

/** @type import('hardhat/config').HardhatUserConfig */
module.exports = {
  paths: {
    artifacts: './src/artifacts',
  },
  defaultNetwork: "hardhat",
  networks: {
    hardhat: {
      chainId: 1337,
      allowUnlimitedContractSize: true
    },
    fantom: {
      url: _networks.fantom.http,
      accounts: [`0x${process.env.DEPLOYER_KEY}`]
    }
  },
  etherscan: {
    //For fantom mainnet and testnet
    apiKey: "DIZUWNSMRXF239WF6T5AHJA521FUZB88KS"
  },
  solidity: {
    compilers: [
      { version: "0.6.12" },
      { version: "0.8.17" }
    ]
  }
};
