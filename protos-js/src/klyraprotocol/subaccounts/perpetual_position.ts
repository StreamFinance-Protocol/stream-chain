//@ts-nocheck
import { BinaryReader, BinaryWriter } from "../../binary";
import { bytesFromBase64, base64FromBytes } from "../../helpers";
import { GlobalDecoderRegistry } from "../../registry";
/**
 * PerpetualPositions are an account’s positions of a `Perpetual`.
 * Therefore they hold any information needed to trade perpetuals.
 */
export interface PerpetualPosition {
  /** The `Id` of the `Perpetual`. */
  perpetualId: number;
  /** The size of the position in base quantums. */
  quantums: Uint8Array;
  /**
   * The funding_index of the `Perpetual` the last time this position was
   * settled.
   */
  fundingIndex: Uint8Array;
  /**
   * The current yield index last time this position was settled.
   * Should be converted from string to big.Rat.
   */
  yieldIndex: string;
}
export interface PerpetualPositionProtoMsg {
  typeUrl: "/klyraprotocol.subaccounts.PerpetualPosition";
  value: Uint8Array;
}
/**
 * PerpetualPositions are an account’s positions of a `Perpetual`.
 * Therefore they hold any information needed to trade perpetuals.
 */
export interface PerpetualPositionAmino {
  /** The `Id` of the `Perpetual`. */
  perpetual_id?: number;
  /** The size of the position in base quantums. */
  quantums?: string;
  /**
   * The funding_index of the `Perpetual` the last time this position was
   * settled.
   */
  funding_index?: string;
  /**
   * The current yield index last time this position was settled.
   * Should be converted from string to big.Rat.
   */
  yield_index?: string;
}
export interface PerpetualPositionAminoMsg {
  type: "/klyraprotocol.subaccounts.PerpetualPosition";
  value: PerpetualPositionAmino;
}
/**
 * PerpetualPositions are an account’s positions of a `Perpetual`.
 * Therefore they hold any information needed to trade perpetuals.
 */
export interface PerpetualPositionSDKType {
  perpetual_id: number;
  quantums: Uint8Array;
  funding_index: Uint8Array;
  yield_index: string;
}
function createBasePerpetualPosition(): PerpetualPosition {
  return {
    perpetualId: 0,
    quantums: new Uint8Array(),
    fundingIndex: new Uint8Array(),
    yieldIndex: ""
  };
}
export const PerpetualPosition = {
  typeUrl: "/klyraprotocol.subaccounts.PerpetualPosition",
  is(o: any): o is PerpetualPosition {
    return o && (o.$typeUrl === PerpetualPosition.typeUrl || typeof o.perpetualId === "number" && (o.quantums instanceof Uint8Array || typeof o.quantums === "string") && (o.fundingIndex instanceof Uint8Array || typeof o.fundingIndex === "string") && typeof o.yieldIndex === "string");
  },
  isSDK(o: any): o is PerpetualPositionSDKType {
    return o && (o.$typeUrl === PerpetualPosition.typeUrl || typeof o.perpetual_id === "number" && (o.quantums instanceof Uint8Array || typeof o.quantums === "string") && (o.funding_index instanceof Uint8Array || typeof o.funding_index === "string") && typeof o.yield_index === "string");
  },
  isAmino(o: any): o is PerpetualPositionAmino {
    return o && (o.$typeUrl === PerpetualPosition.typeUrl || typeof o.perpetual_id === "number" && (o.quantums instanceof Uint8Array || typeof o.quantums === "string") && (o.funding_index instanceof Uint8Array || typeof o.funding_index === "string") && typeof o.yield_index === "string");
  },
  encode(message: PerpetualPosition, writer: BinaryWriter = BinaryWriter.create()): BinaryWriter {
    if (message.perpetualId !== 0) {
      writer.uint32(8).uint32(message.perpetualId);
    }
    if (message.quantums.length !== 0) {
      writer.uint32(18).bytes(message.quantums);
    }
    if (message.fundingIndex.length !== 0) {
      writer.uint32(26).bytes(message.fundingIndex);
    }
    if (message.yieldIndex !== "") {
      writer.uint32(34).string(message.yieldIndex);
    }
    return writer;
  },
  decode(input: BinaryReader | Uint8Array, length?: number): PerpetualPosition {
    const reader = input instanceof BinaryReader ? input : new BinaryReader(input);
    let end = length === undefined ? reader.len : reader.pos + length;
    const message = createBasePerpetualPosition();
    while (reader.pos < end) {
      const tag = reader.uint32();
      switch (tag >>> 3) {
        case 1:
          message.perpetualId = reader.uint32();
          break;
        case 2:
          message.quantums = reader.bytes();
          break;
        case 3:
          message.fundingIndex = reader.bytes();
          break;
        case 4:
          message.yieldIndex = reader.string();
          break;
        default:
          reader.skipType(tag & 7);
          break;
      }
    }
    return message;
  },
  fromPartial(object: Partial<PerpetualPosition>): PerpetualPosition {
    const message = createBasePerpetualPosition();
    message.perpetualId = object.perpetualId ?? 0;
    message.quantums = object.quantums ?? new Uint8Array();
    message.fundingIndex = object.fundingIndex ?? new Uint8Array();
    message.yieldIndex = object.yieldIndex ?? "";
    return message;
  },
  fromAmino(object: PerpetualPositionAmino): PerpetualPosition {
    const message = createBasePerpetualPosition();
    if (object.perpetual_id !== undefined && object.perpetual_id !== null) {
      message.perpetualId = object.perpetual_id;
    }
    if (object.quantums !== undefined && object.quantums !== null) {
      message.quantums = bytesFromBase64(object.quantums);
    }
    if (object.funding_index !== undefined && object.funding_index !== null) {
      message.fundingIndex = bytesFromBase64(object.funding_index);
    }
    if (object.yield_index !== undefined && object.yield_index !== null) {
      message.yieldIndex = object.yield_index;
    }
    return message;
  },
  toAmino(message: PerpetualPosition): PerpetualPositionAmino {
    const obj: any = {};
    obj.perpetual_id = message.perpetualId === 0 ? undefined : message.perpetualId;
    obj.quantums = message.quantums ? base64FromBytes(message.quantums) : undefined;
    obj.funding_index = message.fundingIndex ? base64FromBytes(message.fundingIndex) : undefined;
    obj.yield_index = message.yieldIndex === "" ? undefined : message.yieldIndex;
    return obj;
  },
  fromAminoMsg(object: PerpetualPositionAminoMsg): PerpetualPosition {
    return PerpetualPosition.fromAmino(object.value);
  },
  fromProtoMsg(message: PerpetualPositionProtoMsg): PerpetualPosition {
    return PerpetualPosition.decode(message.value);
  },
  toProto(message: PerpetualPosition): Uint8Array {
    return PerpetualPosition.encode(message).finish();
  },
  toProtoMsg(message: PerpetualPosition): PerpetualPositionProtoMsg {
    return {
      typeUrl: "/klyraprotocol.subaccounts.PerpetualPosition",
      value: PerpetualPosition.encode(message).finish()
    };
  }
};
GlobalDecoderRegistry.register(PerpetualPosition.typeUrl, PerpetualPosition);