//@ts-nocheck
import { SubaccountId, SubaccountIdAmino, SubaccountIdSDKType } from "../subaccounts/subaccount";
import { BinaryReader, BinaryWriter } from "../../binary";
import { GlobalDecoderRegistry } from "../../registry";
/**
 * PerpetualLiquidationInfo holds information about a liquidation that occurred
 * for a position held by a subaccount.
 * Note this proto is defined to make it easier to hash
 * the metadata of a liquidation, and is never written to state.
 */
export interface PerpetualLiquidationInfo {
  /**
   * The id of the subaccount that got liquidated/deleveraged or was deleveraged
   * onto.
   */
  subaccountId: SubaccountId;
  /** The id of the perpetual involved. */
  perpetualId: number;
}
export interface PerpetualLiquidationInfoProtoMsg {
  typeUrl: "/klyraprotocol.clob.PerpetualLiquidationInfo";
  value: Uint8Array;
}
/**
 * PerpetualLiquidationInfo holds information about a liquidation that occurred
 * for a position held by a subaccount.
 * Note this proto is defined to make it easier to hash
 * the metadata of a liquidation, and is never written to state.
 */
export interface PerpetualLiquidationInfoAmino {
  /**
   * The id of the subaccount that got liquidated/deleveraged or was deleveraged
   * onto.
   */
  subaccount_id?: SubaccountIdAmino;
  /** The id of the perpetual involved. */
  perpetual_id?: number;
}
export interface PerpetualLiquidationInfoAminoMsg {
  type: "/klyraprotocol.clob.PerpetualLiquidationInfo";
  value: PerpetualLiquidationInfoAmino;
}
/**
 * PerpetualLiquidationInfo holds information about a liquidation that occurred
 * for a position held by a subaccount.
 * Note this proto is defined to make it easier to hash
 * the metadata of a liquidation, and is never written to state.
 */
export interface PerpetualLiquidationInfoSDKType {
  subaccount_id: SubaccountIdSDKType;
  perpetual_id: number;
}
/**
 * SubaccountLiquidationInfo holds liquidation information per-subaccount in the
 * current block.
 */
export interface SubaccountLiquidationInfo {
  /**
   * An unsorted list of unique perpetual IDs that the subaccount has previously
   * liquidated.
   */
  perpetualsLiquidated: number[];
}
export interface SubaccountLiquidationInfoProtoMsg {
  typeUrl: "/klyraprotocol.clob.SubaccountLiquidationInfo";
  value: Uint8Array;
}
/**
 * SubaccountLiquidationInfo holds liquidation information per-subaccount in the
 * current block.
 */
export interface SubaccountLiquidationInfoAmino {
  /**
   * An unsorted list of unique perpetual IDs that the subaccount has previously
   * liquidated.
   */
  perpetuals_liquidated?: number[];
}
export interface SubaccountLiquidationInfoAminoMsg {
  type: "/klyraprotocol.clob.SubaccountLiquidationInfo";
  value: SubaccountLiquidationInfoAmino;
}
/**
 * SubaccountLiquidationInfo holds liquidation information per-subaccount in the
 * current block.
 */
export interface SubaccountLiquidationInfoSDKType {
  perpetuals_liquidated: number[];
}
/**
 * SubaccountOpenPositionInfo holds information about open positions for a
 * perpetual.
 */
export interface SubaccountOpenPositionInfo {
  /** The id of the perpetual. */
  perpetualId: number;
  subaccountsWithLongPosition: SubaccountId[];
  subaccountsWithShortPosition: SubaccountId[];
}
export interface SubaccountOpenPositionInfoProtoMsg {
  typeUrl: "/klyraprotocol.clob.SubaccountOpenPositionInfo";
  value: Uint8Array;
}
/**
 * SubaccountOpenPositionInfo holds information about open positions for a
 * perpetual.
 */
export interface SubaccountOpenPositionInfoAmino {
  /** The id of the perpetual. */
  perpetual_id?: number;
  subaccounts_with_long_position?: SubaccountIdAmino[];
  subaccounts_with_short_position?: SubaccountIdAmino[];
}
export interface SubaccountOpenPositionInfoAminoMsg {
  type: "/klyraprotocol.clob.SubaccountOpenPositionInfo";
  value: SubaccountOpenPositionInfoAmino;
}
/**
 * SubaccountOpenPositionInfo holds information about open positions for a
 * perpetual.
 */
export interface SubaccountOpenPositionInfoSDKType {
  perpetual_id: number;
  subaccounts_with_long_position: SubaccountIdSDKType[];
  subaccounts_with_short_position: SubaccountIdSDKType[];
}
function createBasePerpetualLiquidationInfo(): PerpetualLiquidationInfo {
  return {
    subaccountId: SubaccountId.fromPartial({}),
    perpetualId: 0
  };
}
export const PerpetualLiquidationInfo = {
  typeUrl: "/klyraprotocol.clob.PerpetualLiquidationInfo",
  is(o: any): o is PerpetualLiquidationInfo {
    return o && (o.$typeUrl === PerpetualLiquidationInfo.typeUrl || SubaccountId.is(o.subaccountId) && typeof o.perpetualId === "number");
  },
  isSDK(o: any): o is PerpetualLiquidationInfoSDKType {
    return o && (o.$typeUrl === PerpetualLiquidationInfo.typeUrl || SubaccountId.isSDK(o.subaccount_id) && typeof o.perpetual_id === "number");
  },
  isAmino(o: any): o is PerpetualLiquidationInfoAmino {
    return o && (o.$typeUrl === PerpetualLiquidationInfo.typeUrl || SubaccountId.isAmino(o.subaccount_id) && typeof o.perpetual_id === "number");
  },
  encode(message: PerpetualLiquidationInfo, writer: BinaryWriter = BinaryWriter.create()): BinaryWriter {
    if (message.subaccountId !== undefined) {
      SubaccountId.encode(message.subaccountId, writer.uint32(10).fork()).ldelim();
    }
    if (message.perpetualId !== 0) {
      writer.uint32(16).uint32(message.perpetualId);
    }
    return writer;
  },
  decode(input: BinaryReader | Uint8Array, length?: number): PerpetualLiquidationInfo {
    const reader = input instanceof BinaryReader ? input : new BinaryReader(input);
    let end = length === undefined ? reader.len : reader.pos + length;
    const message = createBasePerpetualLiquidationInfo();
    while (reader.pos < end) {
      const tag = reader.uint32();
      switch (tag >>> 3) {
        case 1:
          message.subaccountId = SubaccountId.decode(reader, reader.uint32());
          break;
        case 2:
          message.perpetualId = reader.uint32();
          break;
        default:
          reader.skipType(tag & 7);
          break;
      }
    }
    return message;
  },
  fromPartial(object: Partial<PerpetualLiquidationInfo>): PerpetualLiquidationInfo {
    const message = createBasePerpetualLiquidationInfo();
    message.subaccountId = object.subaccountId !== undefined && object.subaccountId !== null ? SubaccountId.fromPartial(object.subaccountId) : undefined;
    message.perpetualId = object.perpetualId ?? 0;
    return message;
  },
  fromAmino(object: PerpetualLiquidationInfoAmino): PerpetualLiquidationInfo {
    const message = createBasePerpetualLiquidationInfo();
    if (object.subaccount_id !== undefined && object.subaccount_id !== null) {
      message.subaccountId = SubaccountId.fromAmino(object.subaccount_id);
    }
    if (object.perpetual_id !== undefined && object.perpetual_id !== null) {
      message.perpetualId = object.perpetual_id;
    }
    return message;
  },
  toAmino(message: PerpetualLiquidationInfo): PerpetualLiquidationInfoAmino {
    const obj: any = {};
    obj.subaccount_id = message.subaccountId ? SubaccountId.toAmino(message.subaccountId) : undefined;
    obj.perpetual_id = message.perpetualId === 0 ? undefined : message.perpetualId;
    return obj;
  },
  fromAminoMsg(object: PerpetualLiquidationInfoAminoMsg): PerpetualLiquidationInfo {
    return PerpetualLiquidationInfo.fromAmino(object.value);
  },
  fromProtoMsg(message: PerpetualLiquidationInfoProtoMsg): PerpetualLiquidationInfo {
    return PerpetualLiquidationInfo.decode(message.value);
  },
  toProto(message: PerpetualLiquidationInfo): Uint8Array {
    return PerpetualLiquidationInfo.encode(message).finish();
  },
  toProtoMsg(message: PerpetualLiquidationInfo): PerpetualLiquidationInfoProtoMsg {
    return {
      typeUrl: "/klyraprotocol.clob.PerpetualLiquidationInfo",
      value: PerpetualLiquidationInfo.encode(message).finish()
    };
  }
};
GlobalDecoderRegistry.register(PerpetualLiquidationInfo.typeUrl, PerpetualLiquidationInfo);
function createBaseSubaccountLiquidationInfo(): SubaccountLiquidationInfo {
  return {
    perpetualsLiquidated: []
  };
}
export const SubaccountLiquidationInfo = {
  typeUrl: "/klyraprotocol.clob.SubaccountLiquidationInfo",
  is(o: any): o is SubaccountLiquidationInfo {
    return o && (o.$typeUrl === SubaccountLiquidationInfo.typeUrl || Array.isArray(o.perpetualsLiquidated) && (!o.perpetualsLiquidated.length || typeof o.perpetualsLiquidated[0] === "number"));
  },
  isSDK(o: any): o is SubaccountLiquidationInfoSDKType {
    return o && (o.$typeUrl === SubaccountLiquidationInfo.typeUrl || Array.isArray(o.perpetuals_liquidated) && (!o.perpetuals_liquidated.length || typeof o.perpetuals_liquidated[0] === "number"));
  },
  isAmino(o: any): o is SubaccountLiquidationInfoAmino {
    return o && (o.$typeUrl === SubaccountLiquidationInfo.typeUrl || Array.isArray(o.perpetuals_liquidated) && (!o.perpetuals_liquidated.length || typeof o.perpetuals_liquidated[0] === "number"));
  },
  encode(message: SubaccountLiquidationInfo, writer: BinaryWriter = BinaryWriter.create()): BinaryWriter {
    writer.uint32(10).fork();
    for (const v of message.perpetualsLiquidated) {
      writer.uint32(v);
    }
    writer.ldelim();
    return writer;
  },
  decode(input: BinaryReader | Uint8Array, length?: number): SubaccountLiquidationInfo {
    const reader = input instanceof BinaryReader ? input : new BinaryReader(input);
    let end = length === undefined ? reader.len : reader.pos + length;
    const message = createBaseSubaccountLiquidationInfo();
    while (reader.pos < end) {
      const tag = reader.uint32();
      switch (tag >>> 3) {
        case 1:
          if ((tag & 7) === 2) {
            const end2 = reader.uint32() + reader.pos;
            while (reader.pos < end2) {
              message.perpetualsLiquidated.push(reader.uint32());
            }
          } else {
            message.perpetualsLiquidated.push(reader.uint32());
          }
          break;
        default:
          reader.skipType(tag & 7);
          break;
      }
    }
    return message;
  },
  fromPartial(object: Partial<SubaccountLiquidationInfo>): SubaccountLiquidationInfo {
    const message = createBaseSubaccountLiquidationInfo();
    message.perpetualsLiquidated = object.perpetualsLiquidated?.map(e => e) || [];
    return message;
  },
  fromAmino(object: SubaccountLiquidationInfoAmino): SubaccountLiquidationInfo {
    const message = createBaseSubaccountLiquidationInfo();
    message.perpetualsLiquidated = object.perpetuals_liquidated?.map(e => e) || [];
    return message;
  },
  toAmino(message: SubaccountLiquidationInfo): SubaccountLiquidationInfoAmino {
    const obj: any = {};
    if (message.perpetualsLiquidated) {
      obj.perpetuals_liquidated = message.perpetualsLiquidated.map(e => e);
    } else {
      obj.perpetuals_liquidated = message.perpetualsLiquidated;
    }
    return obj;
  },
  fromAminoMsg(object: SubaccountLiquidationInfoAminoMsg): SubaccountLiquidationInfo {
    return SubaccountLiquidationInfo.fromAmino(object.value);
  },
  fromProtoMsg(message: SubaccountLiquidationInfoProtoMsg): SubaccountLiquidationInfo {
    return SubaccountLiquidationInfo.decode(message.value);
  },
  toProto(message: SubaccountLiquidationInfo): Uint8Array {
    return SubaccountLiquidationInfo.encode(message).finish();
  },
  toProtoMsg(message: SubaccountLiquidationInfo): SubaccountLiquidationInfoProtoMsg {
    return {
      typeUrl: "/klyraprotocol.clob.SubaccountLiquidationInfo",
      value: SubaccountLiquidationInfo.encode(message).finish()
    };
  }
};
GlobalDecoderRegistry.register(SubaccountLiquidationInfo.typeUrl, SubaccountLiquidationInfo);
function createBaseSubaccountOpenPositionInfo(): SubaccountOpenPositionInfo {
  return {
    perpetualId: 0,
    subaccountsWithLongPosition: [],
    subaccountsWithShortPosition: []
  };
}
export const SubaccountOpenPositionInfo = {
  typeUrl: "/klyraprotocol.clob.SubaccountOpenPositionInfo",
  is(o: any): o is SubaccountOpenPositionInfo {
    return o && (o.$typeUrl === SubaccountOpenPositionInfo.typeUrl || typeof o.perpetualId === "number" && Array.isArray(o.subaccountsWithLongPosition) && (!o.subaccountsWithLongPosition.length || SubaccountId.is(o.subaccountsWithLongPosition[0])) && Array.isArray(o.subaccountsWithShortPosition) && (!o.subaccountsWithShortPosition.length || SubaccountId.is(o.subaccountsWithShortPosition[0])));
  },
  isSDK(o: any): o is SubaccountOpenPositionInfoSDKType {
    return o && (o.$typeUrl === SubaccountOpenPositionInfo.typeUrl || typeof o.perpetual_id === "number" && Array.isArray(o.subaccounts_with_long_position) && (!o.subaccounts_with_long_position.length || SubaccountId.isSDK(o.subaccounts_with_long_position[0])) && Array.isArray(o.subaccounts_with_short_position) && (!o.subaccounts_with_short_position.length || SubaccountId.isSDK(o.subaccounts_with_short_position[0])));
  },
  isAmino(o: any): o is SubaccountOpenPositionInfoAmino {
    return o && (o.$typeUrl === SubaccountOpenPositionInfo.typeUrl || typeof o.perpetual_id === "number" && Array.isArray(o.subaccounts_with_long_position) && (!o.subaccounts_with_long_position.length || SubaccountId.isAmino(o.subaccounts_with_long_position[0])) && Array.isArray(o.subaccounts_with_short_position) && (!o.subaccounts_with_short_position.length || SubaccountId.isAmino(o.subaccounts_with_short_position[0])));
  },
  encode(message: SubaccountOpenPositionInfo, writer: BinaryWriter = BinaryWriter.create()): BinaryWriter {
    if (message.perpetualId !== 0) {
      writer.uint32(8).uint32(message.perpetualId);
    }
    for (const v of message.subaccountsWithLongPosition) {
      SubaccountId.encode(v!, writer.uint32(18).fork()).ldelim();
    }
    for (const v of message.subaccountsWithShortPosition) {
      SubaccountId.encode(v!, writer.uint32(26).fork()).ldelim();
    }
    return writer;
  },
  decode(input: BinaryReader | Uint8Array, length?: number): SubaccountOpenPositionInfo {
    const reader = input instanceof BinaryReader ? input : new BinaryReader(input);
    let end = length === undefined ? reader.len : reader.pos + length;
    const message = createBaseSubaccountOpenPositionInfo();
    while (reader.pos < end) {
      const tag = reader.uint32();
      switch (tag >>> 3) {
        case 1:
          message.perpetualId = reader.uint32();
          break;
        case 2:
          message.subaccountsWithLongPosition.push(SubaccountId.decode(reader, reader.uint32()));
          break;
        case 3:
          message.subaccountsWithShortPosition.push(SubaccountId.decode(reader, reader.uint32()));
          break;
        default:
          reader.skipType(tag & 7);
          break;
      }
    }
    return message;
  },
  fromPartial(object: Partial<SubaccountOpenPositionInfo>): SubaccountOpenPositionInfo {
    const message = createBaseSubaccountOpenPositionInfo();
    message.perpetualId = object.perpetualId ?? 0;
    message.subaccountsWithLongPosition = object.subaccountsWithLongPosition?.map(e => SubaccountId.fromPartial(e)) || [];
    message.subaccountsWithShortPosition = object.subaccountsWithShortPosition?.map(e => SubaccountId.fromPartial(e)) || [];
    return message;
  },
  fromAmino(object: SubaccountOpenPositionInfoAmino): SubaccountOpenPositionInfo {
    const message = createBaseSubaccountOpenPositionInfo();
    if (object.perpetual_id !== undefined && object.perpetual_id !== null) {
      message.perpetualId = object.perpetual_id;
    }
    message.subaccountsWithLongPosition = object.subaccounts_with_long_position?.map(e => SubaccountId.fromAmino(e)) || [];
    message.subaccountsWithShortPosition = object.subaccounts_with_short_position?.map(e => SubaccountId.fromAmino(e)) || [];
    return message;
  },
  toAmino(message: SubaccountOpenPositionInfo): SubaccountOpenPositionInfoAmino {
    const obj: any = {};
    obj.perpetual_id = message.perpetualId === 0 ? undefined : message.perpetualId;
    if (message.subaccountsWithLongPosition) {
      obj.subaccounts_with_long_position = message.subaccountsWithLongPosition.map(e => e ? SubaccountId.toAmino(e) : undefined);
    } else {
      obj.subaccounts_with_long_position = message.subaccountsWithLongPosition;
    }
    if (message.subaccountsWithShortPosition) {
      obj.subaccounts_with_short_position = message.subaccountsWithShortPosition.map(e => e ? SubaccountId.toAmino(e) : undefined);
    } else {
      obj.subaccounts_with_short_position = message.subaccountsWithShortPosition;
    }
    return obj;
  },
  fromAminoMsg(object: SubaccountOpenPositionInfoAminoMsg): SubaccountOpenPositionInfo {
    return SubaccountOpenPositionInfo.fromAmino(object.value);
  },
  fromProtoMsg(message: SubaccountOpenPositionInfoProtoMsg): SubaccountOpenPositionInfo {
    return SubaccountOpenPositionInfo.decode(message.value);
  },
  toProto(message: SubaccountOpenPositionInfo): Uint8Array {
    return SubaccountOpenPositionInfo.encode(message).finish();
  },
  toProtoMsg(message: SubaccountOpenPositionInfo): SubaccountOpenPositionInfoProtoMsg {
    return {
      typeUrl: "/klyraprotocol.clob.SubaccountOpenPositionInfo",
      value: SubaccountOpenPositionInfo.encode(message).finish()
    };
  }
};
GlobalDecoderRegistry.register(SubaccountOpenPositionInfo.typeUrl, SubaccountOpenPositionInfo);