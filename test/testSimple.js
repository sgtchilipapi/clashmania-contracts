const { ethers } = require("hardhat");
const { doesNotMatch } = require("assert");

describe("Characters, Minter and VRF test.", function () {
    it("Test Everything", async function() {
        const [characters, c_minter] = await characterSystem()
        const [equipments, e_minter, materials, catalysts, consumables, equipment_manager] = await equipmentSystem(characters)
        const [dungeons] = await battleSystem(characters, equipments, equipment_manager, [materials[0]], consumables)
        
    }).timeout(5000000);

    async function characterSystem() {
        const [owner] = await ethers.getSigners()

        const Characters = await ethers.getContractFactory("Characters")
        const characters = await Characters.deploy()
        await characters.deployed()
        console.log(`Characters deployed at: ${characters.address}`)

        const Minter = await ethers.getContractFactory("CharacterMinter")
        const minter = await Minter.deploy(characters.address)
        await minter.deployed()
        console.log(`CharacterMinter deployed at ${minter.address}`)

        const VRF = await ethers.getContractFactory("TestVRF")
        const vrf = await VRF.deploy()
        await vrf.deployed()
        console.log(`VRF contract has been deployed!`)

        const setMinter = await characters.setMinter(minter.address)
        await setMinter.wait()
        console.log(`Minter has been successfuly set!`)
    
        const setVRF = await minter.setRandomizationContract(vrf.address)
        await setVRF.wait()
        console.log(`VRF contract has been successfuly set!`)

        const requestCharacter = await minter.requestCharacter(0, 0, "Test Viking")
        await requestCharacter.wait()
        console.log(`Mint character request has been sent!`)

        const mintCharacter = await minter.mintCharacter()
        await mintCharacter.wait()
        console.log(`Character has been minted successfully!`)

        console.log(await characters.character(1))

        return [characters, minter]

    }

    async function equipmentSystem(_characters) {
        const [owner] = await ethers.getSigners()

        //Deploy the tokens
        const [materials, catalysts, consumables] = await deployTokens()
        const materials_addresses = [materials[0].address]
        const catalysts_addresses = [catalysts[0].address]
        const consumables_addresses = [consumables[0].address]

        const Equipments = await ethers.getContractFactory("Equipments")
        const equipments = await Equipments.deploy()
        await equipments.deployed()
        console.log(`Equipments deployed at: ${equipments.address}`)

        const Minter = await ethers.getContractFactory("EquipmentMinter")
        const minter = await Minter.deploy(equipments.address, _characters.address, consumables_addresses[0], materials_addresses[0], catalysts_addresses[0])
        await minter.deployed()
        console.log(`EquipmentMinter deployed at ${minter.address}`)

        const VRF = await ethers.getContractFactory("TestVRF")
        const vrf = await VRF.deploy()
        await vrf.deployed()
        console.log(`VRF contract has been deployed!`)

        const setMinter = await equipments.setMinter(minter.address)
        await setMinter.wait()
        console.log(`Minter has been successfuly set!`)
    
        const setVRF = await minter.setRandomizationContract(vrf.address)
        await setVRF.wait()
        console.log(`VRF contract has been successfuly set!`)

        //Approve the minter
        await approveEquipmentMinter(minter.address, materials, catalysts)

        const requestEquipment = await minter.requestEquipment(0, 1, {value: ethers.utils.parseEther("1")}) //Mint one weapon (eqpt_type, eqpt_count)
        await requestEquipment.wait()
        console.log(`Mint equipment request has been sent!`)

        const mintEquipment = await minter.mintEquipments()
        await mintEquipment.wait()
        console.log(`Equipment has been minted successfully!`)

        console.log(await equipments.equipment(1))

        const ownerAddress = await owner.getAddress()
        console.log(`Token balances`)
        console.log(`$MAT: ${ethers.utils.formatUnits(await materials[0].balanceOf(ownerAddress), 18)}`)
        console.log(`$ENE: ${ethers.utils.formatUnits(await consumables[0].balanceOf(ownerAddress), 18)}`)

        const EquipmentManager = await ethers.getContractFactory("EquipmentManager")
        const equipment_manager = await EquipmentManager.deploy(_characters.address, equipments.address)
        await equipment_manager.deployed()
        console.log(`Equipment Manager deployed at ${equipment_manager.address}`)

        const setEquipmentInCharacters = await _characters.setEquipmentManager(equipment_manager.address)
        await setEquipmentInCharacters.wait()
        console.log(`Equipment Manager set in Characters successfully!`)

        const setEquipmentInEquipments = await equipments.setEquipmentManager(equipment_manager.address)
        await setEquipmentInEquipments.wait()
        console.log(`Equipment Manager set in Equipments successfully!`)

        const equipItemToCharacter = await equipment_manager.equip(1, 1)
        await equipItemToCharacter.wait()
        console.log(`The items currently equipped with ${await _characters.character_name(1)}`)
        console.log(await equipment_manager.equippedWith(1))


        return[equipments, minter, materials, catalysts, consumables, equipment_manager]

    }

    async function deployTokens(){
        const mat = await deployERC20("Material")
        const cat = await deployERC20("Catalyst")
        const ene = await deployERC20("Energy")

        async function deployERC20(ContractName){
            const ERC20Token = await ethers.getContractFactory(ContractName)
            const token = await ERC20Token.deploy()
            await token.deployed()
            console.log(`${ContractName} token deployed at: ${token.address}`)
            return token
        }

        const materials = [mat]
        const catalysts = [cat]
        const consumables = [ene]
        return [materials, catalysts, consumables]
    }

    async function approveEquipmentMinter(minter_address, materials, catalysts){

        await approveMinter(materials[0], "MAT")
        await approveMinter(catalysts[0], "CAT")

        async function approveMinter(tokenContract, tokenName){
            const approveTx = await tokenContract.approve(minter_address, ethers.utils.parseEther("1000000"))
            await approveTx.wait()
            console.log(`Equipment Minter approved for token ${tokenName}!`)
        }
    }

    async function battleSystem(_characters, _equipments, _equipment_manager, _materials, _consumables){
        const [owner] = await ethers.getSigners()
        const Dungeons = await ethers.getContractFactory("Dungeons")
        const dungeons = await Dungeons.deploy(_characters.address, _equipments.address, _equipment_manager.address, [_materials[0].address, _consumables[0].address], _consumables[0].address)
        await dungeons.deployed()
        console.log(`Dungeons deployed at ${dungeons.address}`)

        const VRF = await ethers.getContractFactory("TestVRF")
        const vrf = await VRF.deploy()
        await vrf.deployed()
        console.log(`VRF contract has been deployed!`)
    
        const setVRF = await dungeons.setRandomizationContract(vrf.address)
        await setVRF.wait()
        console.log(`VRF contract has been successfuly set!`)

        await setDungeonInTokenContract(_materials[0], "MAT")
        await setDungeonInTokenContract(_consumables[0], "ENE")

        async function setDungeonInTokenContract(token, token_name){
            const setDungeonInToken = await token.setDungeonContract(dungeons.address)
            await setDungeonInToken.wait()
            console.log(`Dungeons Contract set in Token: ${token_name}`)
        }

        const setDungeonInCharacters = await _characters.setDungeon(dungeons.address)
        await setDungeonInCharacters.wait()
        console.log(`Dungeons address set in Characters contract successfully!`)

        const findBattle = await dungeons.findBattle(1,0,0, {value: ethers.utils.parseEther("0.01")})
        await findBattle.wait()

        const startBattle = await dungeons.startBattle()
        const battleTx = await startBattle.wait()
        // console.log(battleTx)
        
        const ownerAddress = await owner.getAddress()
        const battleRequestProps = await dungeons.battle_requests(ownerAddress)
        console.log(battleRequestProps)

        console.log(`Updated character properties:`)
        console.log(await _characters.character(1))

        console.log(`Updated token balances`)
        console.log(`$MAT: ${ethers.utils.formatUnits(await _materials[0].balanceOf(ownerAddress), 18)}`)
        console.log(`$ENE: ${ethers.utils.formatUnits(await _consumables[0].balanceOf(ownerAddress), 18)}`)

        return [dungeons]
    }

});
