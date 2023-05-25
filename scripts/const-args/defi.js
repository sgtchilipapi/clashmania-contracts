const deployments  = require("../../app-config/deployments")

module.exports = [
    deployments.contracts.tokens.clank.address ///clank token
];

///npx hardhat verify --network <network> --constructor-args arguments.js DEPLOYED_CONTRACT_ADDRESS