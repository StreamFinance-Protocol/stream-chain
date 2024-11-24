//@ts-nocheck
import { BinaryReader, BinaryWriter } from "../../binary";
import { GlobalDecoderRegistry } from "../../registry";
/**
 * BlockMessageIds stores the id of each message that should be processed at a
 * given block height.
 */
export interface BlockMessageIds {
  /**
   * ids stores a list of DelayedMessage ids that should be processed at a given
   * block height.
   */
  ids: number[];
}
export interface BlockMessageIdsProtoMsg {
  typeUrl: "/klyraprotocol.delaymsg.BlockMessageIds";
  value: Uint8Array;
}
/**
 * BlockMessageIds stores the id of each message that should be processed at a
 * given block height.
 */
export interface BlockMessageIdsAmino {
  /**
   * ids stores a list of DelayedMessage ids that should be processed at a given
   * block height.
   */
  ids?: number[];
}
export interface BlockMessageIdsAminoMsg {
  type: "/klyraprotocol.delaymsg.BlockMessageIds";
  value: BlockMessageIdsAmino;
}
/**
 * BlockMessageIds stores the id of each message that should be processed at a
 * given block height.
 */
export interface BlockMessageIdsSDKType {
  ids: number[];
}
function createBaseBlockMessageIds(): BlockMessageIds {
  return {
    ids: []
  };
}
export const BlockMessageIds = {
  typeUrl: "/klyraprotocol.delaymsg.BlockMessageIds",
  is(o: any): o is BlockMessageIds {
    return o && (o.$typeUrl === BlockMessageIds.typeUrl || Array.isArray(o.ids) && (!o.ids.length || typeof o.ids[0] === "number"));
  },
  isSDK(o: any): o is BlockMessageIdsSDKType {
    return o && (o.$typeUrl === BlockMessageIds.typeUrl || Array.isArray(o.ids) && (!o.ids.length || typeof o.ids[0] === "number"));
  },
  isAmino(o: any): o is BlockMessageIdsAmino {
    return o && (o.$typeUrl === BlockMessageIds.typeUrl || Array.isArray(o.ids) && (!o.ids.length || typeof o.ids[0] === "number"));
  },
  encode(message: BlockMessageIds, writer: BinaryWriter = BinaryWriter.create()): BinaryWriter {
    writer.uint32(10).fork();
    for (const v of message.ids) {
      writer.uint32(v);
    }
    writer.ldelim();
    return writer;
  },
  decode(input: BinaryReader | Uint8Array, length?: number): BlockMessageIds {
    const reader = input instanceof BinaryReader ? input : new BinaryReader(input);
    let end = length === undefined ? reader.len : reader.pos + length;
    const message = createBaseBlockMessageIds();
    while (reader.pos < end) {
      const tag = reader.uint32();
      switch (tag >>> 3) {
        case 1:
          if ((tag & 7) === 2) {
            const end2 = reader.uint32() + reader.pos;
            while (reader.pos < end2) {
              message.ids.push(reader.uint32());
            }
          } else {
            message.ids.push(reader.uint32());
          }
          break;
        default:
          reader.skipType(tag & 7);
          break;
      }
    }
    return message;
  },
  fromPartial(object: Partial<BlockMessageIds>): BlockMessageIds {
    const message = createBaseBlockMessageIds();
    message.ids = object.ids?.map(e => e) || [];
    return message;
  },
  fromAmino(object: BlockMessageIdsAmino): BlockMessageIds {
    const message = createBaseBlockMessageIds();
    message.ids = object.ids?.map(e => e) || [];
    return message;
  },
  toAmino(message: BlockMessageIds): BlockMessageIdsAmino {
    const obj: any = {};
    if (message.ids) {
      obj.ids = message.ids.map(e => e);
    } else {
      obj.ids = message.ids;
    }
    return obj;
  },
  fromAminoMsg(object: BlockMessageIdsAminoMsg): BlockMessageIds {
    return BlockMessageIds.fromAmino(object.value);
  },
  fromProtoMsg(message: BlockMessageIdsProtoMsg): BlockMessageIds {
    return BlockMessageIds.decode(message.value);
  },
  toProto(message: BlockMessageIds): Uint8Array {
    return BlockMessageIds.encode(message).finish();
  },
  toProtoMsg(message: BlockMessageIds): BlockMessageIdsProtoMsg {
    return {
      typeUrl: "/klyraprotocol.delaymsg.BlockMessageIds",
      value: BlockMessageIds.encode(message).finish()
    };
  }
};
GlobalDecoderRegistry.register(BlockMessageIds.typeUrl, BlockMessageIds);