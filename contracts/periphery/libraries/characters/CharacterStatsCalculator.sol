//SPDX-License-Identifier: MIT
pragma solidity ^0.8.7;

/**
    @title Character Stats Calculator
    @author Eman @SgtChiliPapi
*/

import "../../libraries/structs/CharacterStructs.sol";
import "../../libraries/structs/GlobalStructs.sol";

library CharacterStatsCalculator{
    function getCharacter(character_properties memory properties) internal pure returns (battle_stats memory character){
        character = battle_stats({
            atk: getAttackPower(properties),
            def: getDefense(properties),
            eva: getEvasionChance(properties),
            hp: getHP(properties),
            pen: getPenetrationChance(properties),
            crit: getCriticalChance(properties),
            luck: getLuck(properties),
            energy_restoration: getEnergyRegen(properties)
        });
    }

    function getAttackPower(character_properties memory properties) internal pure returns (uint256 attack_power){
        attack_power = (((properties.str * 6) + (properties.dex * 4)) / 10) / 4;
        uint256 attack_bonus;
        if(properties.character_class == 1){attack_bonus = 5;} //Fighter
        if(properties.talent == 1){attack_bonus += 5;} //Combat Psycho
        attack_power += (attack_power * attack_bonus) / 100;
    }

    function getPenetrationChance(character_properties memory properties) internal pure returns (uint256 penetration_chance){
        penetration_chance = (properties.str / 2);
        uint256 penetration_bonus;
        if(properties.character_class == 2){penetration_bonus = 10;} //Woodcutter
        if(properties.talent == 2){penetration_bonus += 10;} //Woodcutter
        penetration_chance += (penetration_chance * penetration_bonus) / 100;
    }

    function getHP(character_properties memory properties) internal pure returns (uint256 hp){
        hp = (properties.vit * 5);
        uint256 hp_bonus = 1;
        // if(properties.character_class == 2){hp_bonus = 3;} //Troll
        // if(properties.talent == 2){hp_bonus += 3;} //Body Builder
        hp += (hp * hp_bonus) / 100;
    }

    function getDefense(character_properties memory properties) internal pure returns (uint256 defense){
        defense = (((properties.vit * 6) + (properties.str * 4)) / 10) / 2;
        uint256 defense_bonus;
        if(properties.character_class == 0){defense_bonus = 10;} //Troll
        if(properties.talent == 0){defense_bonus += 10;} //Iron Skin
        defense += (defense * defense_bonus) / 100;
    }

    function getCriticalChance(character_properties memory properties) internal pure returns (uint256 critical_chance){
        critical_chance = (properties.dex / 2);
        uint256 critical_bonus;
        if(properties.character_class == 3){critical_bonus = 10;} //Zooka
        if(properties.talent == 3){critical_bonus += 10;} //Sniper
        critical_chance += (critical_chance * critical_bonus) / 100;
    }
    function getEvasionChance(character_properties memory properties) internal pure returns (uint256 evasion_chance){
        evasion_chance = (((properties.dex * 6) + (properties.vit * 4)) / 10) / 2;
        uint256 evasion_bonus;
        if(properties.character_class == 4){evasion_bonus = 10;} //Graverobber
        if(properties.talent == 4){evasion_bonus += 10;} //Ninja
        evasion_chance += (evasion_chance * evasion_bonus) / 100;
    }

    function getLuck(character_properties memory properties) internal pure returns (uint256 luck){
        luck = properties.dex / 10;
    }

    function getEnergyRegen(character_properties memory properties) internal pure returns (uint256 energy_restoration){
        energy_restoration = ((properties.vit + properties.str) / 2 ) / 10;
    }
}