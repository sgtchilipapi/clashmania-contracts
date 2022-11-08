// THIS IS AN AUTOGENERATED FILE. DO NOT EDIT THIS FILE DIRECTLY.

import {
  ethereum,
  JSONValue,
  TypedMap,
  Entity,
  Bytes,
  Address,
  BigInt
} from "@graphprotocol/graph-ts";

export class Approval extends ethereum.Event {
  get params(): Approval__Params {
    return new Approval__Params(this);
  }
}

export class Approval__Params {
  _event: Approval;

  constructor(event: Approval) {
    this._event = event;
  }

  get owner(): Address {
    return this._event.parameters[0].value.toAddress();
  }

  get approved(): Address {
    return this._event.parameters[1].value.toAddress();
  }

  get tokenId(): BigInt {
    return this._event.parameters[2].value.toBigInt();
  }
}

export class ApprovalForAll extends ethereum.Event {
  get params(): ApprovalForAll__Params {
    return new ApprovalForAll__Params(this);
  }
}

export class ApprovalForAll__Params {
  _event: ApprovalForAll;

  constructor(event: ApprovalForAll) {
    this._event = event;
  }

  get owner(): Address {
    return this._event.parameters[0].value.toAddress();
  }

  get operator(): Address {
    return this._event.parameters[1].value.toAddress();
  }

  get approved(): boolean {
    return this._event.parameters[2].value.toBoolean();
  }
}

export class CharacterMinted extends ethereum.Event {
  get params(): CharacterMinted__Params {
    return new CharacterMinted__Params(this);
  }
}

export class CharacterMinted__Params {
  _event: CharacterMinted;

  constructor(event: CharacterMinted) {
    this._event = event;
  }

  get character_id(): BigInt {
    return this._event.parameters[0].value.toBigInt();
  }

  get user(): Address {
    return this._event.parameters[1].value.toAddress();
  }

  get char_name(): string {
    return this._event.parameters[2].value.toString();
  }

  get character_props(): CharacterMintedCharacter_propsStruct {
    return changetype<CharacterMintedCharacter_propsStruct>(
      this._event.parameters[3].value.toTuple()
    );
  }
}

export class CharacterMintedCharacter_propsStruct extends ethereum.Tuple {
  get character_class(): BigInt {
    return this[0].toBigInt();
  }

  get element(): BigInt {
    return this[1].toBigInt();
  }

  get str(): BigInt {
    return this[2].toBigInt();
  }

  get vit(): BigInt {
    return this[3].toBigInt();
  }

  get dex(): BigInt {
    return this[4].toBigInt();
  }

  get talent(): BigInt {
    return this[5].toBigInt();
  }

  get mood(): BigInt {
    return this[6].toBigInt();
  }

  get exp(): BigInt {
    return this[7].toBigInt();
  }
}

export class CharacterUpdated extends ethereum.Event {
  get params(): CharacterUpdated__Params {
    return new CharacterUpdated__Params(this);
  }
}

export class CharacterUpdated__Params {
  _event: CharacterUpdated;

  constructor(event: CharacterUpdated) {
    this._event = event;
  }

  get character_id(): BigInt {
    return this._event.parameters[0].value.toBigInt();
  }

  get char_name(): string {
    return this._event.parameters[1].value.toString();
  }

  get character_props(): CharacterUpdatedCharacter_propsStruct {
    return changetype<CharacterUpdatedCharacter_propsStruct>(
      this._event.parameters[2].value.toTuple()
    );
  }
}

export class CharacterUpdatedCharacter_propsStruct extends ethereum.Tuple {
  get character_class(): BigInt {
    return this[0].toBigInt();
  }

  get element(): BigInt {
    return this[1].toBigInt();
  }

  get str(): BigInt {
    return this[2].toBigInt();
  }

  get vit(): BigInt {
    return this[3].toBigInt();
  }

  get dex(): BigInt {
    return this[4].toBigInt();
  }

  get talent(): BigInt {
    return this[5].toBigInt();
  }

  get mood(): BigInt {
    return this[6].toBigInt();
  }

  get exp(): BigInt {
    return this[7].toBigInt();
  }
}

export class OwnershipTransferred extends ethereum.Event {
  get params(): OwnershipTransferred__Params {
    return new OwnershipTransferred__Params(this);
  }
}

export class OwnershipTransferred__Params {
  _event: OwnershipTransferred;

  constructor(event: OwnershipTransferred) {
    this._event = event;
  }

  get previousOwner(): Address {
    return this._event.parameters[0].value.toAddress();
  }

  get newOwner(): Address {
    return this._event.parameters[1].value.toAddress();
  }
}

export class Transfer extends ethereum.Event {
  get params(): Transfer__Params {
    return new Transfer__Params(this);
  }
}

export class Transfer__Params {
  _event: Transfer;

  constructor(event: Transfer) {
    this._event = event;
  }

  get from(): Address {
    return this._event.parameters[0].value.toAddress();
  }

  get to(): Address {
    return this._event.parameters[1].value.toAddress();
  }

  get tokenId(): BigInt {
    return this._event.parameters[2].value.toBigInt();
  }
}

export class Characters__characterResult {
  value0: BigInt;
  value1: BigInt;
  value2: BigInt;
  value3: BigInt;
  value4: BigInt;
  value5: BigInt;
  value6: BigInt;
  value7: BigInt;

  constructor(
    value0: BigInt,
    value1: BigInt,
    value2: BigInt,
    value3: BigInt,
    value4: BigInt,
    value5: BigInt,
    value6: BigInt,
    value7: BigInt
  ) {
    this.value0 = value0;
    this.value1 = value1;
    this.value2 = value2;
    this.value3 = value3;
    this.value4 = value4;
    this.value5 = value5;
    this.value6 = value6;
    this.value7 = value7;
  }

  toMap(): TypedMap<string, ethereum.Value> {
    let map = new TypedMap<string, ethereum.Value>();
    map.set("value0", ethereum.Value.fromUnsignedBigInt(this.value0));
    map.set("value1", ethereum.Value.fromUnsignedBigInt(this.value1));
    map.set("value2", ethereum.Value.fromUnsignedBigInt(this.value2));
    map.set("value3", ethereum.Value.fromUnsignedBigInt(this.value3));
    map.set("value4", ethereum.Value.fromUnsignedBigInt(this.value4));
    map.set("value5", ethereum.Value.fromUnsignedBigInt(this.value5));
    map.set("value6", ethereum.Value.fromUnsignedBigInt(this.value6));
    map.set("value7", ethereum.Value.fromUnsignedBigInt(this.value7));
    return map;
  }

  getCharacter_class(): BigInt {
    return this.value0;
  }

  getElement(): BigInt {
    return this.value1;
  }

  getStr(): BigInt {
    return this.value2;
  }

  getVit(): BigInt {
    return this.value3;
  }

  getDex(): BigInt {
    return this.value4;
  }

  getTalent(): BigInt {
    return this.value5;
  }

  getMood(): BigInt {
    return this.value6;
  }

  getExp(): BigInt {
    return this.value7;
  }
}

export class Characters__getCharacterResultChar_propsStruct extends ethereum.Tuple {
  get character_class(): BigInt {
    return this[0].toBigInt();
  }

  get element(): BigInt {
    return this[1].toBigInt();
  }

  get str(): BigInt {
    return this[2].toBigInt();
  }

  get vit(): BigInt {
    return this[3].toBigInt();
  }

  get dex(): BigInt {
    return this[4].toBigInt();
  }

  get talent(): BigInt {
    return this[5].toBigInt();
  }

  get mood(): BigInt {
    return this[6].toBigInt();
  }

  get exp(): BigInt {
    return this[7].toBigInt();
  }
}

export class Characters__getCharacterResultChar_statsStruct extends ethereum.Tuple {
  get atk(): BigInt {
    return this[0].toBigInt();
  }

  get def(): BigInt {
    return this[1].toBigInt();
  }

  get eva(): BigInt {
    return this[2].toBigInt();
  }

  get hp(): BigInt {
    return this[3].toBigInt();
  }

  get pen(): BigInt {
    return this[4].toBigInt();
  }

  get crit(): BigInt {
    return this[5].toBigInt();
  }

  get luck(): BigInt {
    return this[6].toBigInt();
  }

  get energy_restoration(): BigInt {
    return this[7].toBigInt();
  }
}

export class Characters__getCharacterResult {
  value0: Characters__getCharacterResultChar_propsStruct;
  value1: Characters__getCharacterResultChar_statsStruct;

  constructor(
    value0: Characters__getCharacterResultChar_propsStruct,
    value1: Characters__getCharacterResultChar_statsStruct
  ) {
    this.value0 = value0;
    this.value1 = value1;
  }

  toMap(): TypedMap<string, ethereum.Value> {
    let map = new TypedMap<string, ethereum.Value>();
    map.set("value0", ethereum.Value.fromTuple(this.value0));
    map.set("value1", ethereum.Value.fromTuple(this.value1));
    return map;
  }

  getChar_props(): Characters__getCharacterResultChar_propsStruct {
    return this.value0;
  }

  getChar_stats(): Characters__getCharacterResultChar_statsStruct {
    return this.value1;
  }
}

export class Characters extends ethereum.SmartContract {
  static bind(address: Address): Characters {
    return new Characters("Characters", address);
  }

  balanceOf(owner: Address): BigInt {
    let result = super.call("balanceOf", "balanceOf(address):(uint256)", [
      ethereum.Value.fromAddress(owner)
    ]);

    return result[0].toBigInt();
  }

  try_balanceOf(owner: Address): ethereum.CallResult<BigInt> {
    let result = super.tryCall("balanceOf", "balanceOf(address):(uint256)", [
      ethereum.Value.fromAddress(owner)
    ]);
    if (result.reverted) {
      return new ethereum.CallResult();
    }
    let value = result.value;
    return ethereum.CallResult.fromValue(value[0].toBigInt());
  }

  character(param0: BigInt): Characters__characterResult {
    let result = super.call(
      "character",
      "character(uint256):(uint32,uint32,uint32,uint32,uint32,uint32,uint32,uint32)",
      [ethereum.Value.fromUnsignedBigInt(param0)]
    );

    return new Characters__characterResult(
      result[0].toBigInt(),
      result[1].toBigInt(),
      result[2].toBigInt(),
      result[3].toBigInt(),
      result[4].toBigInt(),
      result[5].toBigInt(),
      result[6].toBigInt(),
      result[7].toBigInt()
    );
  }

  try_character(
    param0: BigInt
  ): ethereum.CallResult<Characters__characterResult> {
    let result = super.tryCall(
      "character",
      "character(uint256):(uint32,uint32,uint32,uint32,uint32,uint32,uint32,uint32)",
      [ethereum.Value.fromUnsignedBigInt(param0)]
    );
    if (result.reverted) {
      return new ethereum.CallResult();
    }
    let value = result.value;
    return ethereum.CallResult.fromValue(
      new Characters__characterResult(
        value[0].toBigInt(),
        value[1].toBigInt(),
        value[2].toBigInt(),
        value[3].toBigInt(),
        value[4].toBigInt(),
        value[5].toBigInt(),
        value[6].toBigInt(),
        value[7].toBigInt()
      )
    );
  }

  character_name(param0: BigInt): string {
    let result = super.call(
      "character_name",
      "character_name(uint256):(string)",
      [ethereum.Value.fromUnsignedBigInt(param0)]
    );

    return result[0].toString();
  }

  try_character_name(param0: BigInt): ethereum.CallResult<string> {
    let result = super.tryCall(
      "character_name",
      "character_name(uint256):(string)",
      [ethereum.Value.fromUnsignedBigInt(param0)]
    );
    if (result.reverted) {
      return new ethereum.CallResult();
    }
    let value = result.value;
    return ethereum.CallResult.fromValue(value[0].toString());
  }

  getApproved(tokenId: BigInt): Address {
    let result = super.call("getApproved", "getApproved(uint256):(address)", [
      ethereum.Value.fromUnsignedBigInt(tokenId)
    ]);

    return result[0].toAddress();
  }

  try_getApproved(tokenId: BigInt): ethereum.CallResult<Address> {
    let result = super.tryCall(
      "getApproved",
      "getApproved(uint256):(address)",
      [ethereum.Value.fromUnsignedBigInt(tokenId)]
    );
    if (result.reverted) {
      return new ethereum.CallResult();
    }
    let value = result.value;
    return ethereum.CallResult.fromValue(value[0].toAddress());
  }

  getCharacter(character_id: BigInt): Characters__getCharacterResult {
    let result = super.call(
      "getCharacter",
      "getCharacter(uint256):((uint32,uint32,uint32,uint32,uint32,uint32,uint32,uint32),(uint256,uint256,uint256,uint256,uint256,uint256,uint256,uint256))",
      [ethereum.Value.fromUnsignedBigInt(character_id)]
    );

    return changetype<Characters__getCharacterResult>(
      new Characters__getCharacterResult(
        changetype<Characters__getCharacterResultChar_propsStruct>(
          result[0].toTuple()
        ),
        changetype<Characters__getCharacterResultChar_statsStruct>(
          result[1].toTuple()
        )
      )
    );
  }

  try_getCharacter(
    character_id: BigInt
  ): ethereum.CallResult<Characters__getCharacterResult> {
    let result = super.tryCall(
      "getCharacter",
      "getCharacter(uint256):((uint32,uint32,uint32,uint32,uint32,uint32,uint32,uint32),(uint256,uint256,uint256,uint256,uint256,uint256,uint256,uint256))",
      [ethereum.Value.fromUnsignedBigInt(character_id)]
    );
    if (result.reverted) {
      return new ethereum.CallResult();
    }
    let value = result.value;
    return ethereum.CallResult.fromValue(
      changetype<Characters__getCharacterResult>(
        new Characters__getCharacterResult(
          changetype<Characters__getCharacterResultChar_propsStruct>(
            value[0].toTuple()
          ),
          changetype<Characters__getCharacterResultChar_statsStruct>(
            value[1].toTuple()
          )
        )
      )
    );
  }

  isApprovedForAll(owner: Address, operator: Address): boolean {
    let result = super.call(
      "isApprovedForAll",
      "isApprovedForAll(address,address):(bool)",
      [ethereum.Value.fromAddress(owner), ethereum.Value.fromAddress(operator)]
    );

    return result[0].toBoolean();
  }

  try_isApprovedForAll(
    owner: Address,
    operator: Address
  ): ethereum.CallResult<boolean> {
    let result = super.tryCall(
      "isApprovedForAll",
      "isApprovedForAll(address,address):(bool)",
      [ethereum.Value.fromAddress(owner), ethereum.Value.fromAddress(operator)]
    );
    if (result.reverted) {
      return new ethereum.CallResult();
    }
    let value = result.value;
    return ethereum.CallResult.fromValue(value[0].toBoolean());
  }

  isOwner(_owner: Address, _character: BigInt): boolean {
    let result = super.call("isOwner", "isOwner(address,uint256):(bool)", [
      ethereum.Value.fromAddress(_owner),
      ethereum.Value.fromUnsignedBigInt(_character)
    ]);

    return result[0].toBoolean();
  }

  try_isOwner(
    _owner: Address,
    _character: BigInt
  ): ethereum.CallResult<boolean> {
    let result = super.tryCall("isOwner", "isOwner(address,uint256):(bool)", [
      ethereum.Value.fromAddress(_owner),
      ethereum.Value.fromUnsignedBigInt(_character)
    ]);
    if (result.reverted) {
      return new ethereum.CallResult();
    }
    let value = result.value;
    return ethereum.CallResult.fromValue(value[0].toBoolean());
  }

  name(): string {
    let result = super.call("name", "name():(string)", []);

    return result[0].toString();
  }

  try_name(): ethereum.CallResult<string> {
    let result = super.tryCall("name", "name():(string)", []);
    if (result.reverted) {
      return new ethereum.CallResult();
    }
    let value = result.value;
    return ethereum.CallResult.fromValue(value[0].toString());
  }

  owner(): Address {
    let result = super.call("owner", "owner():(address)", []);

    return result[0].toAddress();
  }

  try_owner(): ethereum.CallResult<Address> {
    let result = super.tryCall("owner", "owner():(address)", []);
    if (result.reverted) {
      return new ethereum.CallResult();
    }
    let value = result.value;
    return ethereum.CallResult.fromValue(value[0].toAddress());
  }

  ownerOf(tokenId: BigInt): Address {
    let result = super.call("ownerOf", "ownerOf(uint256):(address)", [
      ethereum.Value.fromUnsignedBigInt(tokenId)
    ]);

    return result[0].toAddress();
  }

  try_ownerOf(tokenId: BigInt): ethereum.CallResult<Address> {
    let result = super.tryCall("ownerOf", "ownerOf(uint256):(address)", [
      ethereum.Value.fromUnsignedBigInt(tokenId)
    ]);
    if (result.reverted) {
      return new ethereum.CallResult();
    }
    let value = result.value;
    return ethereum.CallResult.fromValue(value[0].toAddress());
  }

  supportsInterface(interfaceId: Bytes): boolean {
    let result = super.call(
      "supportsInterface",
      "supportsInterface(bytes4):(bool)",
      [ethereum.Value.fromFixedBytes(interfaceId)]
    );

    return result[0].toBoolean();
  }

  try_supportsInterface(interfaceId: Bytes): ethereum.CallResult<boolean> {
    let result = super.tryCall(
      "supportsInterface",
      "supportsInterface(bytes4):(bool)",
      [ethereum.Value.fromFixedBytes(interfaceId)]
    );
    if (result.reverted) {
      return new ethereum.CallResult();
    }
    let value = result.value;
    return ethereum.CallResult.fromValue(value[0].toBoolean());
  }

  symbol(): string {
    let result = super.call("symbol", "symbol():(string)", []);

    return result[0].toString();
  }

  try_symbol(): ethereum.CallResult<string> {
    let result = super.tryCall("symbol", "symbol():(string)", []);
    if (result.reverted) {
      return new ethereum.CallResult();
    }
    let value = result.value;
    return ethereum.CallResult.fromValue(value[0].toString());
  }

  tokenByIndex(index: BigInt): BigInt {
    let result = super.call("tokenByIndex", "tokenByIndex(uint256):(uint256)", [
      ethereum.Value.fromUnsignedBigInt(index)
    ]);

    return result[0].toBigInt();
  }

  try_tokenByIndex(index: BigInt): ethereum.CallResult<BigInt> {
    let result = super.tryCall(
      "tokenByIndex",
      "tokenByIndex(uint256):(uint256)",
      [ethereum.Value.fromUnsignedBigInt(index)]
    );
    if (result.reverted) {
      return new ethereum.CallResult();
    }
    let value = result.value;
    return ethereum.CallResult.fromValue(value[0].toBigInt());
  }

  tokenOfOwnerByIndex(owner: Address, index: BigInt): BigInt {
    let result = super.call(
      "tokenOfOwnerByIndex",
      "tokenOfOwnerByIndex(address,uint256):(uint256)",
      [
        ethereum.Value.fromAddress(owner),
        ethereum.Value.fromUnsignedBigInt(index)
      ]
    );

    return result[0].toBigInt();
  }

  try_tokenOfOwnerByIndex(
    owner: Address,
    index: BigInt
  ): ethereum.CallResult<BigInt> {
    let result = super.tryCall(
      "tokenOfOwnerByIndex",
      "tokenOfOwnerByIndex(address,uint256):(uint256)",
      [
        ethereum.Value.fromAddress(owner),
        ethereum.Value.fromUnsignedBigInt(index)
      ]
    );
    if (result.reverted) {
      return new ethereum.CallResult();
    }
    let value = result.value;
    return ethereum.CallResult.fromValue(value[0].toBigInt());
  }

  tokenURI(tokenId: BigInt): string {
    let result = super.call("tokenURI", "tokenURI(uint256):(string)", [
      ethereum.Value.fromUnsignedBigInt(tokenId)
    ]);

    return result[0].toString();
  }

  try_tokenURI(tokenId: BigInt): ethereum.CallResult<string> {
    let result = super.tryCall("tokenURI", "tokenURI(uint256):(string)", [
      ethereum.Value.fromUnsignedBigInt(tokenId)
    ]);
    if (result.reverted) {
      return new ethereum.CallResult();
    }
    let value = result.value;
    return ethereum.CallResult.fromValue(value[0].toString());
  }

  totalSupply(): BigInt {
    let result = super.call("totalSupply", "totalSupply():(uint256)", []);

    return result[0].toBigInt();
  }

  try_totalSupply(): ethereum.CallResult<BigInt> {
    let result = super.tryCall("totalSupply", "totalSupply():(uint256)", []);
    if (result.reverted) {
      return new ethereum.CallResult();
    }
    let value = result.value;
    return ethereum.CallResult.fromValue(value[0].toBigInt());
  }
}

export class ConstructorCall extends ethereum.Call {
  get inputs(): ConstructorCall__Inputs {
    return new ConstructorCall__Inputs(this);
  }

  get outputs(): ConstructorCall__Outputs {
    return new ConstructorCall__Outputs(this);
  }
}

export class ConstructorCall__Inputs {
  _call: ConstructorCall;

  constructor(call: ConstructorCall) {
    this._call = call;
  }
}

export class ConstructorCall__Outputs {
  _call: ConstructorCall;

  constructor(call: ConstructorCall) {
    this._call = call;
  }
}

export class _mintCharacterCall extends ethereum.Call {
  get inputs(): _mintCharacterCall__Inputs {
    return new _mintCharacterCall__Inputs(this);
  }

  get outputs(): _mintCharacterCall__Outputs {
    return new _mintCharacterCall__Outputs(this);
  }
}

export class _mintCharacterCall__Inputs {
  _call: _mintCharacterCall;

  constructor(call: _mintCharacterCall) {
    this._call = call;
  }

  get user(): Address {
    return this._call.inputValues[0].value.toAddress();
  }

  get character_props(): _mintCharacterCallCharacter_propsStruct {
    return changetype<_mintCharacterCallCharacter_propsStruct>(
      this._call.inputValues[1].value.toTuple()
    );
  }

  get _character_name(): string {
    return this._call.inputValues[2].value.toString();
  }
}

export class _mintCharacterCall__Outputs {
  _call: _mintCharacterCall;

  constructor(call: _mintCharacterCall) {
    this._call = call;
  }
}

export class _mintCharacterCallCharacter_propsStruct extends ethereum.Tuple {
  get character_class(): BigInt {
    return this[0].toBigInt();
  }

  get element(): BigInt {
    return this[1].toBigInt();
  }

  get str(): BigInt {
    return this[2].toBigInt();
  }

  get vit(): BigInt {
    return this[3].toBigInt();
  }

  get dex(): BigInt {
    return this[4].toBigInt();
  }

  get talent(): BigInt {
    return this[5].toBigInt();
  }

  get mood(): BigInt {
    return this[6].toBigInt();
  }

  get exp(): BigInt {
    return this[7].toBigInt();
  }
}

export class ApproveCall extends ethereum.Call {
  get inputs(): ApproveCall__Inputs {
    return new ApproveCall__Inputs(this);
  }

  get outputs(): ApproveCall__Outputs {
    return new ApproveCall__Outputs(this);
  }
}

export class ApproveCall__Inputs {
  _call: ApproveCall;

  constructor(call: ApproveCall) {
    this._call = call;
  }

  get to(): Address {
    return this._call.inputValues[0].value.toAddress();
  }

  get tokenId(): BigInt {
    return this._call.inputValues[1].value.toBigInt();
  }
}

export class ApproveCall__Outputs {
  _call: ApproveCall;

  constructor(call: ApproveCall) {
    this._call = call;
  }
}

export class RenounceOwnershipCall extends ethereum.Call {
  get inputs(): RenounceOwnershipCall__Inputs {
    return new RenounceOwnershipCall__Inputs(this);
  }

  get outputs(): RenounceOwnershipCall__Outputs {
    return new RenounceOwnershipCall__Outputs(this);
  }
}

export class RenounceOwnershipCall__Inputs {
  _call: RenounceOwnershipCall;

  constructor(call: RenounceOwnershipCall) {
    this._call = call;
  }
}

export class RenounceOwnershipCall__Outputs {
  _call: RenounceOwnershipCall;

  constructor(call: RenounceOwnershipCall) {
    this._call = call;
  }
}

export class SafeTransferFromCall extends ethereum.Call {
  get inputs(): SafeTransferFromCall__Inputs {
    return new SafeTransferFromCall__Inputs(this);
  }

  get outputs(): SafeTransferFromCall__Outputs {
    return new SafeTransferFromCall__Outputs(this);
  }
}

export class SafeTransferFromCall__Inputs {
  _call: SafeTransferFromCall;

  constructor(call: SafeTransferFromCall) {
    this._call = call;
  }

  get from(): Address {
    return this._call.inputValues[0].value.toAddress();
  }

  get to(): Address {
    return this._call.inputValues[1].value.toAddress();
  }

  get tokenId(): BigInt {
    return this._call.inputValues[2].value.toBigInt();
  }
}

export class SafeTransferFromCall__Outputs {
  _call: SafeTransferFromCall;

  constructor(call: SafeTransferFromCall) {
    this._call = call;
  }
}

export class SafeTransferFrom1Call extends ethereum.Call {
  get inputs(): SafeTransferFrom1Call__Inputs {
    return new SafeTransferFrom1Call__Inputs(this);
  }

  get outputs(): SafeTransferFrom1Call__Outputs {
    return new SafeTransferFrom1Call__Outputs(this);
  }
}

export class SafeTransferFrom1Call__Inputs {
  _call: SafeTransferFrom1Call;

  constructor(call: SafeTransferFrom1Call) {
    this._call = call;
  }

  get from(): Address {
    return this._call.inputValues[0].value.toAddress();
  }

  get to(): Address {
    return this._call.inputValues[1].value.toAddress();
  }

  get tokenId(): BigInt {
    return this._call.inputValues[2].value.toBigInt();
  }

  get data(): Bytes {
    return this._call.inputValues[3].value.toBytes();
  }
}

export class SafeTransferFrom1Call__Outputs {
  _call: SafeTransferFrom1Call;

  constructor(call: SafeTransferFrom1Call) {
    this._call = call;
  }
}

export class SetApprovalForAllCall extends ethereum.Call {
  get inputs(): SetApprovalForAllCall__Inputs {
    return new SetApprovalForAllCall__Inputs(this);
  }

  get outputs(): SetApprovalForAllCall__Outputs {
    return new SetApprovalForAllCall__Outputs(this);
  }
}

export class SetApprovalForAllCall__Inputs {
  _call: SetApprovalForAllCall;

  constructor(call: SetApprovalForAllCall) {
    this._call = call;
  }

  get operator(): Address {
    return this._call.inputValues[0].value.toAddress();
  }

  get approved(): boolean {
    return this._call.inputValues[1].value.toBoolean();
  }
}

export class SetApprovalForAllCall__Outputs {
  _call: SetApprovalForAllCall;

  constructor(call: SetApprovalForAllCall) {
    this._call = call;
  }
}

export class SetDungeonCall extends ethereum.Call {
  get inputs(): SetDungeonCall__Inputs {
    return new SetDungeonCall__Inputs(this);
  }

  get outputs(): SetDungeonCall__Outputs {
    return new SetDungeonCall__Outputs(this);
  }
}

export class SetDungeonCall__Inputs {
  _call: SetDungeonCall;

  constructor(call: SetDungeonCall) {
    this._call = call;
  }

  get dungeonAddress(): Address {
    return this._call.inputValues[0].value.toAddress();
  }
}

export class SetDungeonCall__Outputs {
  _call: SetDungeonCall;

  constructor(call: SetDungeonCall) {
    this._call = call;
  }
}

export class SetEquipmentManagerCall extends ethereum.Call {
  get inputs(): SetEquipmentManagerCall__Inputs {
    return new SetEquipmentManagerCall__Inputs(this);
  }

  get outputs(): SetEquipmentManagerCall__Outputs {
    return new SetEquipmentManagerCall__Outputs(this);
  }
}

export class SetEquipmentManagerCall__Inputs {
  _call: SetEquipmentManagerCall;

  constructor(call: SetEquipmentManagerCall) {
    this._call = call;
  }

  get managerAddress(): Address {
    return this._call.inputValues[0].value.toAddress();
  }
}

export class SetEquipmentManagerCall__Outputs {
  _call: SetEquipmentManagerCall;

  constructor(call: SetEquipmentManagerCall) {
    this._call = call;
  }
}

export class SetMinterCall extends ethereum.Call {
  get inputs(): SetMinterCall__Inputs {
    return new SetMinterCall__Inputs(this);
  }

  get outputs(): SetMinterCall__Outputs {
    return new SetMinterCall__Outputs(this);
  }
}

export class SetMinterCall__Inputs {
  _call: SetMinterCall;

  constructor(call: SetMinterCall) {
    this._call = call;
  }

  get minterAddress(): Address {
    return this._call.inputValues[0].value.toAddress();
  }
}

export class SetMinterCall__Outputs {
  _call: SetMinterCall;

  constructor(call: SetMinterCall) {
    this._call = call;
  }
}

export class SetUriConstructorCall extends ethereum.Call {
  get inputs(): SetUriConstructorCall__Inputs {
    return new SetUriConstructorCall__Inputs(this);
  }

  get outputs(): SetUriConstructorCall__Outputs {
    return new SetUriConstructorCall__Outputs(this);
  }
}

export class SetUriConstructorCall__Inputs {
  _call: SetUriConstructorCall;

  constructor(call: SetUriConstructorCall) {
    this._call = call;
  }

  get uriConstructorAddress(): Address {
    return this._call.inputValues[0].value.toAddress();
  }
}

export class SetUriConstructorCall__Outputs {
  _call: SetUriConstructorCall;

  constructor(call: SetUriConstructorCall) {
    this._call = call;
  }
}

export class TransferFromCall extends ethereum.Call {
  get inputs(): TransferFromCall__Inputs {
    return new TransferFromCall__Inputs(this);
  }

  get outputs(): TransferFromCall__Outputs {
    return new TransferFromCall__Outputs(this);
  }
}

export class TransferFromCall__Inputs {
  _call: TransferFromCall;

  constructor(call: TransferFromCall) {
    this._call = call;
  }

  get from(): Address {
    return this._call.inputValues[0].value.toAddress();
  }

  get to(): Address {
    return this._call.inputValues[1].value.toAddress();
  }

  get tokenId(): BigInt {
    return this._call.inputValues[2].value.toBigInt();
  }
}

export class TransferFromCall__Outputs {
  _call: TransferFromCall;

  constructor(call: TransferFromCall) {
    this._call = call;
  }
}

export class TransferOwnershipCall extends ethereum.Call {
  get inputs(): TransferOwnershipCall__Inputs {
    return new TransferOwnershipCall__Inputs(this);
  }

  get outputs(): TransferOwnershipCall__Outputs {
    return new TransferOwnershipCall__Outputs(this);
  }
}

export class TransferOwnershipCall__Inputs {
  _call: TransferOwnershipCall;

  constructor(call: TransferOwnershipCall) {
    this._call = call;
  }

  get newOwner(): Address {
    return this._call.inputValues[0].value.toAddress();
  }
}

export class TransferOwnershipCall__Outputs {
  _call: TransferOwnershipCall;

  constructor(call: TransferOwnershipCall) {
    this._call = call;
  }
}

export class UpdateCharacterCall extends ethereum.Call {
  get inputs(): UpdateCharacterCall__Inputs {
    return new UpdateCharacterCall__Inputs(this);
  }

  get outputs(): UpdateCharacterCall__Outputs {
    return new UpdateCharacterCall__Outputs(this);
  }
}

export class UpdateCharacterCall__Inputs {
  _call: UpdateCharacterCall;

  constructor(call: UpdateCharacterCall) {
    this._call = call;
  }

  get tokenId(): BigInt {
    return this._call.inputValues[0].value.toBigInt();
  }

  get char_name(): string {
    return this._call.inputValues[1].value.toString();
  }

  get updated_props(): UpdateCharacterCallUpdated_propsStruct {
    return changetype<UpdateCharacterCallUpdated_propsStruct>(
      this._call.inputValues[2].value.toTuple()
    );
  }
}

export class UpdateCharacterCall__Outputs {
  _call: UpdateCharacterCall;

  constructor(call: UpdateCharacterCall) {
    this._call = call;
  }
}

export class UpdateCharacterCallUpdated_propsStruct extends ethereum.Tuple {
  get character_class(): BigInt {
    return this[0].toBigInt();
  }

  get element(): BigInt {
    return this[1].toBigInt();
  }

  get str(): BigInt {
    return this[2].toBigInt();
  }

  get vit(): BigInt {
    return this[3].toBigInt();
  }

  get dex(): BigInt {
    return this[4].toBigInt();
  }

  get talent(): BigInt {
    return this[5].toBigInt();
  }

  get mood(): BigInt {
    return this[6].toBigInt();
  }

  get exp(): BigInt {
    return this[7].toBigInt();
  }
}
