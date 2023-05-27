//SPDX-License-Identifier: MIT
/**
    @title Character URI Library
    @author Eman @SgtChiliPapi
    @notice: Reference for character Images and Names.
    
*/
pragma solidity =0.8.17;

import "../../libraries/structs/CharacterStructs.sol";

library CharacterLibrary {
    function getCharacter(uint32 faction, uint32 character_class, uint32 talent) internal pure returns (character_uri_details memory character){
        string memory image_url = "https://chainlink-rpg2022.infura-ipfs.io/ipfs/QmTnCQVzkFecBjLUTJTbJmu1Ds3simimu8Z1XKKksgc7as/";
        (string memory _class, string memory faction_tag, string memory bonus_tag, string memory bonus_value, string memory talent_value) = getClass(character_class, faction, talent);
        character = character_uri_details({
            name: "",
            image: string.concat(image_url, faction_tag, "/", _class,".png"),
            faction: faction_tag,
            _class: _class,
            bonus: bonus_tag,
            bonus_value: bonus_value,
            talent_value: talent_value
        });
    }

    function getfaction(uint32 faction) internal pure returns (string memory faction_tag){
        if(faction == 0){faction_tag = "Deterra";}
        if(faction == 1){faction_tag = "Ramelan";}
        if(faction == 2){faction_tag = "Skouro";}
        if(faction == 3){faction_tag = "Thoriyon";}
    }

    function getClass(uint32 character_class, uint32 faction, uint32 talent) internal pure returns (string memory _class, string memory faction_tag, string memory bonus_tag, string memory bonus_value, string memory talent_value){
        if(character_class == 0){_class = "Tank"; bonus_tag = "Tank (DEF)"; bonus_value = "10";}
        if(character_class == 1){_class = "Fighter"; bonus_tag = "Fighter (ATK)"; bonus_value = "5";}
        if(character_class == 2){_class = "Mage"; bonus_tag = "Mage (PEN)"; bonus_value = "10";}
        if(character_class == 3){_class = "Berserker"; bonus_tag = "Berserker (CRIT)"; bonus_value = "10";}
        if(character_class == 4){_class = "Ranger"; bonus_tag = "Ranger (EVA)"; bonus_value = "10";}
        faction_tag = getfaction(faction);
        talent_value = getTalentValue(talent);
    }

    function getElement(uint32 element) internal pure returns (string memory element_tag){
        if(element == 0){element_tag = "Fire";}
        if(element == 1){element_tag = "Earth";}
        if(element == 2){element_tag = "Wind";}
        if(element == 3){element_tag = "Water";}
    }

    function getTalent(uint32 talent) internal pure returns (string memory talent_tag){
        if(talent == 0){talent_tag = "Iron Skin (DEF)";}
        if(talent == 1){talent_tag = "Combat Psycho (ATK)";}
        if(talent == 2){talent_tag = "Weapon Specialist (PEN)";}
        if(talent == 3){talent_tag = "Sniper (CRIT)";}
        if(talent == 4){talent_tag = "Ninja (EVA)";}
    }

    function getTalentValue(uint32 talent) internal pure returns (string memory talent_value){
        if(talent == 0){talent_value = "10";}
        if(talent == 1){talent_value = "5";}
        if(talent == 2){talent_value = "10";}
        if(talent == 3){talent_value = "10";}
        if(talent == 4){talent_value = "10";}
    }
}