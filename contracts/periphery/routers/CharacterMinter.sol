///SPDX-License-Identifier:MIT
/**
    @title CharacterMinter
    @author Eman @SgtChiliPapi
    @notice: This contract serves as the router/minter for the Character NFT. It communicates with the VRF contract,
    performs the necessary calculations to determine the character's properties and stats and ultimately calls the mint 
    function of the NFT contract with the calculated results as arguments. Only this contract can call the NFT's mint function
    and only one router at a time can be set in the NFT contract as well.
    
*/
pragma solidity ^0.8.7;

import "@openzeppelin/contracts/access/Ownable.sol";
import "@openzeppelin/contracts/security/Pausable.sol";
import "../utils/BreakdownUint256.sol";
import "../libraries/structs/CharacterStructs.sol";

interface _RandomizationContract {
    function requestRandomWords(address user, uint32 numWords, bool experimental) external returns (uint256 requestId);
    function getRequestStatus(uint256 _requestId) external view returns(bool fulfilled, uint256[] memory randomWords);
}

interface _Characters {
    function _mintCharacter(address user, character_properties memory character_props, string memory _character_name) external;
}

contract CharacterMinter is Ownable, Pausable{
    ///The randomization contract for generating random numbers for mint
    _RandomizationContract vrf_contract;
    address private vrf_contract_address;

    ///The core: Characters NFT contract deployment.
    _Characters charactersNft;

    ///The beneficiary of the msg.value being sent to the contract for every mint request.
    address vrf_refunder;

    ///The msg.value required to mint to prevent spam and deplete VRF funds
    ///Currently unset (0) for judging purposes as stated in the hackathon rules.
    uint256 mint_fee;

    ///Map out a user's address to its character request (if any) {request_id, character_class}. If none, the request_id == 0.
    mapping (address => character_request) public request;
    
    event CharacterRequested(address indexed user, character_request request);
    constructor(address charactersNftAddress){
        charactersNft = _Characters(charactersNftAddress);
        vrf_refunder = msg.sender;
    }

    ///@notice This function requests n random number/s from the VRF contract to be consumed with the mint.
    function requestCharacter(uint32 _character_class, string memory _character_name) public payable whenNotPaused{
        ///We can only allow one request per address at a time. A request shall be completed (minted the equipment) to be 
        ///able request another one.
        character_request memory _request = request[msg.sender];
        require(_request.request_id == 0, "cMNTR: There is a request pending mint.");

        ///Characters can only be a viking, woodcutter, troll, mechanic, amphibian, graverobber
        require(_character_class < 6, "cMNTR: Incorrect number for a character class.");
        
        ///The MATIC being received is not payment for the NFT but rather to simply replenish the VRF subscribtion's funds 
        ///and also serves as an effective anti-spam measure as well.
        require(msg.value >= mint_fee, "cMNTR: Incorrect amount for character minting. Send exactly 0.01 MATIC per item requested.");
        
        ///EXTCALL to VRF contract. Set the caller's current character_request to the returned request_id by the VRF contract.
        ///The bool argument here notifies the vrf contract that the request being sent is NOT experimental.
        request[msg.sender] = character_request({
            request_id: vrf_contract.requestRandomWords(msg.sender, 1, false),
            character_class: _character_class,
            _name: _character_name,
            time_requested: block.timestamp
        });
        
        emit CharacterRequested(msg.sender, request[msg.sender]);
    }

    /**
        @notice This function is flagged as EXPERIMENTAL. This invokes a request to the VRF of random numbers which are when
        fulfilled, the VRF (automatically) mints the NFT within the same transaction as the fulfillment.
        This function requests n random number/s from the VRF contract to be consumed with the mint.
    */
    function requestCharacterExperimental(uint32 _character_class, string memory _character_name) public payable whenNotPaused{
        ///We can only allow one request per address at a time. A request shall be completed (minted the equipment) to be able request another one.
        character_request memory _request = request[msg.sender];
        require(_request.request_id == 0, "cMNTR: There is a request pending mint.");

        ///Characters can only be a viking, woodcutter, troll, mechanic, amphibian, graverobber
        require(_character_class < 6, "cMNTR: Incorrect number for a character class.");
        
        ///The MATIC being received is not payment for the NFT but rather to simply replenish the VRF subscribtion's funds 
        ///and also serves as an effective anti-spam measure as well.
        require(msg.value >= mint_fee, "cMNTR: Incorrect amount for character minting. Send exactly 0.01 MATIC per item requested.");
        
        ///@notice EXTCALL to VRF contract. Set the caller's current character_request to the returned request_id by the VRF contract.
        ///The bool argument here notifies the vrf contract that the request being sent is experimental.
        request[msg.sender] = character_request({
            request_id: vrf_contract.requestRandomWords(msg.sender, 1, true),
            character_class: _character_class,
            _name: _character_name,
            time_requested: block.timestamp
        });
        
        emit CharacterRequested(msg.sender, request[msg.sender]);
    }

    ///@notice This function will reset the senders request. In case requests dont get fulfilled by the VRF within an hour.
    function cancelRequestExperimental() public {
        character_request memory _request = request[msg.sender];
        require(_request.request_id > 0, "cMNTR: Cannot cancel non-existing requests.");
        require((block.timestamp - _request.time_requested) > 3600, "cMNTR: Cannot cancel requests that havent lapsed 1 hour from time requested.");

        (bool fulfilled,) = vrf_contract.getRequestStatus(_request.request_id);
        require(!fulfilled, "cMNTR: Cannot cancel requests that have already been fulfilled.");

        request[msg.sender] = character_request({
            request_id: 0,
            character_class: 0,
            _name: "",
            time_requested: block.timestamp
        });
    }

    ///Once the random numbers requested has been fulfilled in the VRF contract, this function shall be called by the user
    ///to complete the mint process.
    function mintCharacter() public{
        character_request memory _request = request[msg.sender];

        ///Check if there is a pending/fulfilled request previously made by the caller using requestEquipment().
        require(_request.request_id > 0, "cMNTRS: No request to mint.");

        ///Fetch the request status from the VRF contract
        (bool fulfilled, uint256[] memory randomNumberRequested) = vrf_contract.getRequestStatus(_request.request_id);

        ///Verify if the random number request has been indeed fulfilled, revert if not.
        require(fulfilled, "cMNTRS: Request is not yet fulfilled or invalid request id.");

        ///Compute for the character props and mint the character NFT
        mint(msg.sender, randomNumberRequested[0], _request.character_class, _request._name);
        
        ///Reset the sender's request property values to 0
        request[msg.sender] = character_request({
            request_id: 0,
            character_class: 0,
            _name: "",
            time_requested: block.timestamp
        });
    }

    ///@notice This function is flagged as EXPERIMENTAL. There is a risk for a loss of material tokens if the call to this
    ///function by the VRF reverts.
    ///Once the random numbers requested has been fulfilled in the VRF contract, this function is called by the VRF contract
    ///to complete the mint process.
    function mintCharacterExperimental(address user, uint256[] memory randomNumberRequested) public onlyVRF{
        character_request memory _request = request[user];
        ///@notice Removing the immediate following external SLOAD since the VRF already knows the randomNumberRequested, 
        ///we simply pass it from the VRF's external call to this function
            // (/** bool fulfilled */, uint256[] memory randomNumberRequested) = vrf_contract.getRequestStatus(_request.request_id);

        ///@notice We are removing the immediate following requirements since we have shifted the minting responsibility to the VRF.
        ///When the fulfillRandomWords() is executed, there is no more need to check if the request has been fulfilled.
            ///Check if there is a pending/fulfilled request previously made by the caller using requestEquipment().
            // require(_request.request_id > 0, "cMNTRS: No request to mint.");

            ///Verify if the random number request has been indeed fulfilled, revert if not.
            // require(fulfilled, "cMNTRS: Request is not yet fulfilled or invalid request id.");

        ///Compute for the character props and mint the character NFT
        mint(user, randomNumberRequested[0], _request.character_class, _request._name);

        ///Reset the sender's request property values to 0
        request[user] = character_request({
            request_id: 0,
            character_class: 0,
            _name: "",
            time_requested: block.timestamp
        });
    }

    ///@notice This includes external call to the Character NFT Contract to actually mint the tokens.
    function mint(address user, uint256 randomNumberRequested, uint32 character_class, string memory _name) internal {
        (character_properties memory character_props) = getResult(randomNumberRequested, character_class);
        charactersNft._mintCharacter(user, character_props, _name);
    }

    function getResult(uint256 randomNumber, uint32 character_class) internal pure returns (character_properties memory character_props){
        ///To save on LINK tokens for our VRF contract, we are breaking a single random word into 8 uint32s.
        ///The reason for this is we will need a lot(6) of random numbers for a single equipment mint.
        ///It is given that the chainlink VRF generates verifiable, truly random numbers that it is safe to assume that breaking this
        ///truly random number poses no exploitable risk as far as the mint is concerned.
        ///However, there is a theoretical risk that the VRF generates a number with an extremely low number so that the first few uint32s would
        ///have their value at 0. In that case, it can be argued that it simply is not a blessing from the RNG Gods for the user.
        ///Still, our workaround if such thing occurs anyway is to start using the last numbers in the uint32s array which probably contains
        ///values greater than 0.
        uint32[] memory randomNumbers = BreakdownUint256.break256BitsIntegerIntoBytesArrayOf32Bits(randomNumber);

        ///Compute for the character's properties
        uint32 _element = getCharacterElement(randomNumbers[7]);
        (uint32 _str, uint32 _vit, uint32 _dex) = getCharacterAttributes(randomNumbers[6], randomNumbers[5], randomNumbers[4]);
        uint32 _talent = getCharacterTalent(randomNumbers[3]);
        uint32 _mood = getCharacterMood(randomNumbers[2]);

        character_props = character_properties({
            character_class: character_class,
            element: _element,
            str: _str,
            vit: _vit,
            dex: _dex,
            talent: _talent,
            mood: _mood,
            exp: 0
        });
    }

    ///For this design, elements can only have values 0-3
    function getCharacterElement(uint32 number) internal pure returns (uint32 character_element){
        character_element = number % 4;
    }

    ///The initial attribute points a character will have is 1000. This will be allocated in the following manner: 
    ///     First, allocate equally to each attribute 150 points each for a total of 450 points.
    ///     Second, consuming the 3 random numbers, we calculate for how the remaining 550 points will be distributed to each attribute.
    function getCharacterAttributes(uint32 number1, uint32 number2, uint32 number3) internal pure returns (uint32 _str, uint32 _int, uint32 _agi){
        uint32 str_points = number1 % 1000;
        uint32 int_points = number2 % 1000;
        uint32 agi_points = number3 % 1000;
        uint32 total_points = str_points + int_points + agi_points;
        _str = ((str_points * 550) / total_points) + 150;
        _int = ((int_points * 550) / total_points) + 150;
        _agi = ((agi_points * 550) / total_points) + 150;
    }

    ///Characters have can have values 0-2
    function getCharacterTalent(uint32 number) internal pure returns (uint32 character_talent){
        character_talent = number % 6;
    }

    ///For fun purposes, we set the character's mood initially and then subsequently in some select actions.
    function getCharacterMood(uint32 number) internal pure returns (uint32 character_mood){
        character_mood = number % 10;
    }

    ///@notice Admin Functions
    function setRandomizationContract(address _vrf_contract_address) public onlyOwner {
        vrf_contract_address = _vrf_contract_address;
        vrf_contract = _RandomizationContract(_vrf_contract_address);
    }

    function setMintFee(uint256 amount) public onlyOwner {
        mint_fee = amount * 1 gwei;
    }

    modifier onlyVRF(){
        require(msg.sender == vrf_contract_address, "cMNTR: Can only be called by the VRF Contract for equipment crafting.");
        _;
    }

    function withdraw() public onlyOwner{
        (bool succeed, ) = vrf_refunder.call{value: address(this).balance}("");
        require(succeed, "Failed to withdraw matics.");
    }
}