const deployments = require("../../../../app-config/deployments")
const abis = require("../../../../app-config/contract-abis")
import * as connection from "../../utils/connection"
import {ethers} from 'ethers'
import * as tokens from "../tokens/tokens-api"

///contract config
const address = deployments.contracts.defi.minichefv2.address
const abi = abis.core.chef

///contract connections
async function getContract(){
    const contract = await connection.getContractInstance(address, abi)
    return contract
}

async function getSignedContract(){
    const contract = await connection.getSignedContractInstance(address, abi)
    return contract
}

///view functions
export async function poolInfo(pool_id){
    const contract = await getContract()
    const pool = await contract.poolInfo(pool_id)
    return pool
}

export async function userInfo(pool_id, address){
    const contract = await getContract()
    const user = await contract.userInfo(pool_id, address)
    return user
}

export async function getUserStake(pool_id, address){
    const user = await userInfo(pool_id, address)
    const amount = parseInt(ethers.utils.formatUnits(user.amount, 18))
    const debt = parseInt(ethers.utils.formatUnits(user.rewardDebt, 12))
    return [amount, debt]
}

export async function pendingSushi(pool_id, address){
    const contract = await getContract()
    const pending_rewards = parseInt(ethers.utils.formatUnits(await contract.pendingSushi(pool_id, address), 18))
    return pending_rewards
}

///transaction functions
export async function deposit(pool_id, amount, addressTo){
    const contract = await getSignedContract()
    const _amount = ethers.utils.parseEther(amount)
    const depositTx = await contract.deposit(pool_id, _amount, addressTo)
    const receipt = depositTx.wait()
    return receipt
}


export async function withdraw(pool_id, amount, addressTo){
    const contract = await getSignedContract()
    const _amount = ethers.utils.parseEther(amount.toString())
    const withdrawTx = await contract.withdraw(pool_id, _amount, addressTo)
    const receipt = withdrawTx.wait()
    return receipt
}

export async function harvest(pool_id, addressTo){
    const contract = await getSignedContract()
    const harvestTx = await contract.harvest(pool_id, addressTo)
    const receipt = harvestTx.wait()
    return receipt
}

export async function withdrawAndHarvest(pool_id, amount, addressTo){
    const contract = await getSignedContract()
    const withdrawTx = await contract.withdrawAndHarvest(pool_id, amount, addressTo)
    const receipt = withdrawTx.wait()
    return receipt
}

export async function getApr(){
    const main_lp_address = await tokens.getTokenAddress("clankftm")
    const lp_contract = await tokens.getContract("clankftm")
    const wftm_contract = await tokens.getContract("wftm")
    const clank_contract = await tokens.getContract("clank")

    const ftm_in_mainpool = parseInt(ethers.utils.formatUnits(await wftm_contract.balanceOf(main_lp_address),18));
    const clank_in_mainpool = parseInt(ethers.utils.formatUnits(await clank_contract.balanceOf(main_lp_address),18));

    let ftm_price;
    let clank_price;

    await fetch("https://api.ftmscan.com/api?module=stats&action=ftmprice&apikey=DIZUWNSMRXF239WF6T5AHJA521FUZB88KS")
        .then((response)=>response.json())
        .then((data)=>(ftm_price = parseFloat(data.result.ethusd)));

    clank_price = (ftm_price * ftm_in_mainpool) /  clank_in_mainpool;

    const liquidity = ftm_in_mainpool * ftm_price * 2;

    const total_lp = parseInt(ethers.utils.formatUnits(await lp_contract.totalSupply(),18));
    const pooled_lp = parseInt(ethers.utils.formatUnits(await lp_contract.balanceOf(address),18));

    const apr = (60 * 60 * 24 * 365 * clank_price) / (pooled_lp * liquidity / total_lp) * 100;

    return apr
}

