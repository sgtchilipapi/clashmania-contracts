const deployments  = require("../../app-config/deployments")

module.exports = [
    deployments.contracts.vrfconfig.subscription,
    deployments.contracts.vrfconfig.coordinator,
    deployments.contracts.vrfconfig.keyhash,
    deployments.contracts.dungeons.dungeon.address ///dungeon address
];

///npx hardhat verify --network <network> --constructor-args arguments.js DEPLOYED_CONTRACT_ADDRESS