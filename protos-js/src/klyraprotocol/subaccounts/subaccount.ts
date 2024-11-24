//@ts-nocheck
import { AssetPosition, AssetPositionAmino, AssetPositionSDKType } from "./asset_position";
import { PerpetualPosition, PerpetualPositionAmino, PerpetualPositionSDKType } from "./perpetual_position";
import { BinaryReader, BinaryWriter } from "../../binary";
import { GlobalDecoderRegistry } from "../../registry";
/** SubaccountId defines a unique identifier for a Subaccount. */
export interface SubaccountId {
  /** The address of the wallet that owns this subaccount. */
  owner: string;
  /**
   * The unique number of this subaccount for the owner.
   * Currently limited to 128*1000 subaccounts per owner.
   */
  number: number;
}
export interface SubaccountIdProtoMsg {
  typeUrl: "/klyraprotocol.subaccounts.SubaccountId";
  value: Uint8Array;
}
/** SubaccountId defines a unique identifier for a Subaccount. */
export interface SubaccountIdAmino {
  /** The address of the wallet that owns this subaccount. */
  owner?: string;
  /**
   * The unique number of this subaccount for the owner.
   * Currently limited to 128*1000 subaccounts per owner.
   */
  number?: number;
}
export interface SubaccountIdAminoMsg {
  type: "/klyraprotocol.subaccounts.SubaccountId";
  value: SubaccountIdAmino;
}
/** SubaccountId defines a unique identifier for a Subaccount. */
export interface SubaccountIdSDKType {
  owner: string;
  number: number;
}
/**
 * Subaccount defines a single sub-account for a given address.
 * Subaccounts are uniquely indexed by a subaccountNumber/owner pair.
 */
export interface Subaccount {
  /** The Id of the Subaccount */
  id?: SubaccountId;
  /**
   * All `AssetPosition`s associated with this subaccount.
   * Always sorted ascending by `asset_id`.
   */
  assetPositions: AssetPosition[];
  /**
   * All `PerpetualPosition`s associated with this subaccount.
   * Always sorted ascending by `perpetual_id.
   */
  perpetualPositions: PerpetualPosition[];
  /**
   * Set by the owner. If true, then margin trades can be made in this
   * subaccount.
   */
  marginEnabled: boolean;
  /**
   * The current yield index is determined by the cumulative
   * all-time history of the yield mechanism for assets.
   * Starts at 0. This string should always be converted big.Rat.
   */
  assetYieldIndex: string;
}
export interface SubaccountProtoMsg {
  typeUrl: "/klyraprotocol.subaccounts.Subaccount";
  value: Uint8Array;
}
/**
 * Subaccount defines a single sub-account for a given address.
 * Subaccounts are uniquely indexed by a subaccountNumber/owner pair.
 */
export interface SubaccountAmino {
  /** The Id of the Subaccount */
  id?: SubaccountIdAmino;
  /**
   * All `AssetPosition`s associated with this subaccount.
   * Always sorted ascending by `asset_id`.
   */
  asset_positions?: AssetPositionAmino[];
  /**
   * All `PerpetualPosition`s associated with this subaccount.
   * Always sorted ascending by `perpetual_id.
   */
  perpetual_positions?: PerpetualPositionAmino[];
  /**
   * Set by the owner. If true, then margin trades can be made in this
   * subaccount.
   */
  margin_enabled?: boolean;
  /**
   * The current yield index is determined by the cumulative
   * all-time history of the yield mechanism for assets.
   * Starts at 0. This string should always be converted big.Rat.
   */
  asset_yield_index?: string;
}
export interface SubaccountAminoMsg {
  type: "/klyraprotocol.subaccounts.Subaccount";
  value: SubaccountAmino;
}
/**
 * Subaccount defines a single sub-account for a given address.
 * Subaccounts are uniquely indexed by a subaccountNumber/owner pair.
 */
export interface SubaccountSDKType {
  id?: SubaccountIdSDKType;
  asset_positions: AssetPositionSDKType[];
  perpetual_positions: PerpetualPositionSDKType[];
  margin_enabled: boolean;
  asset_yield_index: string;
}
function createBaseSubaccountId(): SubaccountId {
  return {
    owner: "",
    number: 0
  };
}
export const SubaccountId = {
  typeUrl: "/klyraprotocol.subaccounts.SubaccountId",
  is(o: any): o is SubaccountId {
    return o && (o.$typeUrl === SubaccountId.typeUrl || typeof o.owner === "string" && typeof o.number === "number");
  },
  isSDK(o: any): o is SubaccountIdSDKType {
    return o && (o.$typeUrl === SubaccountId.typeUrl || typeof o.owner === "string" && typeof o.number === "number");
  },
  isAmino(o: any): o is SubaccountIdAmino {
    return o && (o.$typeUrl === SubaccountId.typeUrl || typeof o.owner === "string" && typeof o.number === "number");
  },
  encode(message: SubaccountId, writer: BinaryWriter = BinaryWriter.create()): BinaryWriter {
    if (message.owner !== "") {
      writer.uint32(10).string(message.owner);
    }
    if (message.number !== 0) {
      writer.uint32(16).uint32(message.number);
    }
    return writer;
  },
  decode(input: BinaryReader | Uint8Array, length?: number): SubaccountId {
    const reader = input instanceof BinaryReader ? input : new BinaryReader(input);
    let end = length === undefined ? reader.len : reader.pos + length;
    const message = createBaseSubaccountId();
    while (reader.pos < end) {
      const tag = reader.uint32();
      switch (tag >>> 3) {
        case 1:
          message.owner = reader.string();
          break;
        case 2:
          message.number = reader.uint32();
          break;
        default:
          reader.skipType(tag & 7);
          break;
      }
    }
    return message;
  },
  fromPartial(object: Partial<SubaccountId>): SubaccountId {
    const message = createBaseSubaccountId();
    message.owner = object.owner ?? "";
    message.number = object.number ?? 0;
    return message;
  },
  fromAmino(object: SubaccountIdAmino): SubaccountId {
    const message = createBaseSubaccountId();
    if (object.owner !== undefined && object.owner !== null) {
      message.owner = object.owner;
    }
    if (object.number !== undefined && object.number !== null) {
      message.number = object.number;
    }
    return message;
  },
  toAmino(message: SubaccountId): SubaccountIdAmino {
    const obj: any = {};
    obj.owner = message.owner === "" ? undefined : message.owner;
    obj.number = message.number === 0 ? undefined : message.number;
    return obj;
  },
  fromAminoMsg(object: SubaccountIdAminoMsg): SubaccountId {
    return SubaccountId.fromAmino(object.value);
  },
  fromProtoMsg(message: SubaccountIdProtoMsg): SubaccountId {
    return SubaccountId.decode(message.value);
  },
  toProto(message: SubaccountId): Uint8Array {
    return SubaccountId.encode(message).finish();
  },
  toProtoMsg(message: SubaccountId): SubaccountIdProtoMsg {
    return {
      typeUrl: "/klyraprotocol.subaccounts.SubaccountId",
      value: SubaccountId.encode(message).finish()
    };
  }
};
GlobalDecoderRegistry.register(SubaccountId.typeUrl, SubaccountId);
function createBaseSubaccount(): Subaccount {
  return {
    id: undefined,
    assetPositions: [],
    perpetualPositions: [],
    marginEnabled: false,
    assetYieldIndex: ""
  };
}
export const Subaccount = {
  typeUrl: "/klyraprotocol.subaccounts.Subaccount",
  is(o: any): o is Subaccount {
    return o && (o.$typeUrl === Subaccount.typeUrl || Array.isArray(o.assetPositions) && (!o.assetPositions.length || AssetPosition.is(o.assetPositions[0])) && Array.isArray(o.perpetualPositions) && (!o.perpetualPositions.length || PerpetualPosition.is(o.perpetualPositions[0])) && typeof o.marginEnabled === "boolean" && typeof o.assetYieldIndex === "string");
  },
  isSDK(o: any): o is SubaccountSDKType {
    return o && (o.$typeUrl === Subaccount.typeUrl || Array.isArray(o.asset_positions) && (!o.asset_positions.length || AssetPosition.isSDK(o.asset_positions[0])) && Array.isArray(o.perpetual_positions) && (!o.perpetual_positions.length || PerpetualPosition.isSDK(o.perpetual_positions[0])) && typeof o.margin_enabled === "boolean" && typeof o.asset_yield_index === "string");
  },
  isAmino(o: any): o is SubaccountAmino {
    return o && (o.$typeUrl === Subaccount.typeUrl || Array.isArray(o.asset_positions) && (!o.asset_positions.length || AssetPosition.isAmino(o.asset_positions[0])) && Array.isArray(o.perpetual_positions) && (!o.perpetual_positions.length || PerpetualPosition.isAmino(o.perpetual_positions[0])) && typeof o.margin_enabled === "boolean" && typeof o.asset_yield_index === "string");
  },
  encode(message: Subaccount, writer: BinaryWriter = BinaryWriter.create()): BinaryWriter {
    if (message.id !== undefined) {
      SubaccountId.encode(message.id, writer.uint32(10).fork()).ldelim();
    }
    for (const v of message.assetPositions) {
      AssetPosition.encode(v!, writer.uint32(18).fork()).ldelim();
    }
    for (const v of message.perpetualPositions) {
      PerpetualPosition.encode(v!, writer.uint32(26).fork()).ldelim();
    }
    if (message.marginEnabled === true) {
      writer.uint32(32).bool(message.marginEnabled);
    }
    if (message.assetYieldIndex !== "") {
      writer.uint32(42).string(message.assetYieldIndex);
    }
    return writer;
  },
  decode(input: BinaryReader | Uint8Array, length?: number): Subaccount {
    const reader = input instanceof BinaryReader ? input : new BinaryReader(input);
    let end = length === undefined ? reader.len : reader.pos + length;
    const message = createBaseSubaccount();
    while (reader.pos < end) {
      const tag = reader.uint32();
      switch (tag >>> 3) {
        case 1:
          message.id = SubaccountId.decode(reader, reader.uint32());
          break;
        case 2:
          message.assetPositions.push(AssetPosition.decode(reader, reader.uint32()));
          break;
        case 3:
          message.perpetualPositions.push(PerpetualPosition.decode(reader, reader.uint32()));
          break;
        case 4:
          message.marginEnabled = reader.bool();
          break;
        case 5:
          message.assetYieldIndex = reader.string();
          break;
        default:
          reader.skipType(tag & 7);
          break;
      }
    }
    return message;
  },
  fromPartial(object: Partial<Subaccount>): Subaccount {
    const message = createBaseSubaccount();
    message.id = object.id !== undefined && object.id !== null ? SubaccountId.fromPartial(object.id) : undefined;
    message.assetPositions = object.assetPositions?.map(e => AssetPosition.fromPartial(e)) || [];
    message.perpetualPositions = object.perpetualPositions?.map(e => PerpetualPosition.fromPartial(e)) || [];
    message.marginEnabled = object.marginEnabled ?? false;
    message.assetYieldIndex = object.assetYieldIndex ?? "";
    return message;
  },
  fromAmino(object: SubaccountAmino): Subaccount {
    const message = createBaseSubaccount();
    if (object.id !== undefined && object.id !== null) {
      message.id = SubaccountId.fromAmino(object.id);
    }
    message.assetPositions = object.asset_positions?.map(e => AssetPosition.fromAmino(e)) || [];
    message.perpetualPositions = object.perpetual_positions?.map(e => PerpetualPosition.fromAmino(e)) || [];
    if (object.margin_enabled !== undefined && object.margin_enabled !== null) {
      message.marginEnabled = object.margin_enabled;
    }
    if (object.asset_yield_index !== undefined && object.asset_yield_index !== null) {
      message.assetYieldIndex = object.asset_yield_index;
    }
    return message;
  },
  toAmino(message: Subaccount): SubaccountAmino {
    const obj: any = {};
    obj.id = message.id ? SubaccountId.toAmino(message.id) : undefined;
    if (message.assetPositions) {
      obj.asset_positions = message.assetPositions.map(e => e ? AssetPosition.toAmino(e) : undefined);
    } else {
      obj.asset_positions = message.assetPositions;
    }
    if (message.perpetualPositions) {
      obj.perpetual_positions = message.perpetualPositions.map(e => e ? PerpetualPosition.toAmino(e) : undefined);
    } else {
      obj.perpetual_positions = message.perpetualPositions;
    }
    obj.margin_enabled = message.marginEnabled === false ? undefined : message.marginEnabled;
    obj.asset_yield_index = message.assetYieldIndex === "" ? undefined : message.assetYieldIndex;
    return obj;
  },
  fromAminoMsg(object: SubaccountAminoMsg): Subaccount {
    return Subaccount.fromAmino(object.value);
  },
  fromProtoMsg(message: SubaccountProtoMsg): Subaccount {
    return Subaccount.decode(message.value);
  },
  toProto(message: Subaccount): Uint8Array {
    return Subaccount.encode(message).finish();
  },
  toProtoMsg(message: Subaccount): SubaccountProtoMsg {
    return {
      typeUrl: "/klyraprotocol.subaccounts.Subaccount",
      value: Subaccount.encode(message).finish()
    };
  }
};
GlobalDecoderRegistry.register(Subaccount.typeUrl, Subaccount);