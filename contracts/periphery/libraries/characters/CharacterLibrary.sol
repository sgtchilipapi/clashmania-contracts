//SPDX-License-Identifier: MIT
/**
    @title Character URI Library
    @author Eman @SgtChiliPapi
    @notice: Reference for character Images and Names.
    
*/
pragma solidity =0.8.17;

import "../../libraries/structs/CharacterStructs.sol";

library CharacterLibrary {
    function getCharacter(uint32 character_class, uint32 mood, uint32 talent) internal pure returns (character_uri_details memory character){
        string memory image_url = "https://chainlink-rpg2022.infura-ipfs.io/ipfs/QmTnCQVzkFecBjLUTJTbJmu1Ds3simimu8Z1XKKksgc7as/";
        (string memory _class, string memory image_prefix, string memory mood_tag, string memory bonus_tag, string memory bonus_value, string memory talent_value) = getClass(character_class, mood, talent);
        character = character_uri_details({
            name: _class,
            image: string.concat(image_url, image_prefix, _class, "/", mood_tag,".png"),
            mood: mood_tag,
            bonus: bonus_tag,
            bonus_value: bonus_value,
            talent_value: talent_value
        });
    }

    function getClass(uint32 character_class, uint32 mood, uint32 talent) internal pure returns (string memory _class, string memory image_prefix, string memory mood_tag, string memory bonus_tag, string memory bonus_value, string memory talent_value){
        if(character_class == 0){_class = "Viking"; image_prefix = "0%20"; bonus_tag = "Viking (ATK)"; bonus_value = "5";}
        if(character_class == 1){_class = "Woodcutter"; image_prefix = "1%20"; bonus_tag = "Woodcutter (PEN)"; bonus_value = "10";}
        if(character_class == 2){_class = "Troll"; image_prefix = "4%20"; bonus_tag = "Troll (HP)"; bonus_value = "3";}
        if(character_class == 3){_class = "Mechanic"; image_prefix = "5%20"; bonus_tag = "Mechanic (DEF)"; bonus_value = "10";}
        if(character_class == 4){_class = "Amphibian"; image_prefix = "2%20"; bonus_tag = "Amphibian (CRIT)"; bonus_value = "10";}
        if(character_class == 5){_class = "GraveRobber"; image_prefix = "3%20"; bonus_tag = "Graverobber (EVA)"; bonus_value = "10";}
        mood_tag = getMood(mood);
        talent_value = getTalentValue(talent);
    }

    function getMood(uint32 mood) internal pure returns (string memory mood_tag){
        if(mood == 0){mood_tag = "Amazed";}
        if(mood == 1){mood_tag = "Angry";}
        if(mood == 2){mood_tag = "Calm";}
        if(mood == 3){mood_tag = "Irritated";}
        if(mood == 4){mood_tag = "Mocking";}
        if(mood == 5){mood_tag = "Sad";}
        if(mood == 6){mood_tag = "Scared";}
        if(mood == 7){mood_tag = "Stunned";}
        if(mood == 8){mood_tag = "Thoughtful";}
        if(mood == 9){mood_tag = "Upset";}
    }

    function getElement(uint32 element) internal pure returns (string memory element_tag){
        if(element == 0){element_tag = "Fire";}
        if(element == 1){element_tag = "Earth";}
        if(element == 2){element_tag = "Wind";}
        if(element == 3){element_tag = "Water";}
    }

    function getTalent(uint32 talent) internal pure returns (string memory talent_tag){
        if(talent == 0){talent_tag = "Combat Psycho (ATK)";}
        if(talent == 1){talent_tag = "Weapon Specialist (PEN)";}
        if(talent == 2){talent_tag = "Body Builder (HP)";}
        if(talent == 3){talent_tag = "Iron Skin (DEF)";}
        if(talent == 4){talent_tag = "Sniper (CRIT)";}
        if(talent == 5){talent_tag = "Ninja (EVA)";}
    }

    function getTalentValue(uint32 talent) internal pure returns (string memory talent_value){
        if(talent == 0){talent_value = "5";}
        if(talent == 1){talent_value = "10";}
        if(talent == 2){talent_value = "3";}
        if(talent == 3){talent_value = "10";}
        if(talent == 4){talent_value = "10";}
        if(talent == 5){talent_value = "10";}
    }
}