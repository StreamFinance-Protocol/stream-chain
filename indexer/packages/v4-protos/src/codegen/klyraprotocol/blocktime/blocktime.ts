import { Timestamp } from "../../google/protobuf/timestamp";
import * as _m0 from "protobufjs/minimal";
import { toTimestamp, fromTimestamp, DeepPartial } from "../../helpers";
/** BlockInfo stores information about a block */

export interface BlockInfo {
  height: number;
  timestamp?: Date;
}
/** BlockInfo stores information about a block */

export interface BlockInfoSDKType {
  height: number;
  timestamp?: Date;
}

function createBaseBlockInfo(): BlockInfo {
  return {
    height: 0,
    timestamp: undefined
  };
}

export const BlockInfo = {
  encode(message: BlockInfo, writer: _m0.Writer = _m0.Writer.create()): _m0.Writer {
    if (message.height !== 0) {
      writer.uint32(8).uint32(message.height);
    }

    if (message.timestamp !== undefined) {
      Timestamp.encode(toTimestamp(message.timestamp), writer.uint32(18).fork()).ldelim();
    }

    return writer;
  },

  decode(input: _m0.Reader | Uint8Array, length?: number): BlockInfo {
    const reader = input instanceof _m0.Reader ? input : new _m0.Reader(input);
    let end = length === undefined ? reader.len : reader.pos + length;
    const message = createBaseBlockInfo();

    while (reader.pos < end) {
      const tag = reader.uint32();

      switch (tag >>> 3) {
        case 1:
          message.height = reader.uint32();
          break;

        case 2:
          message.timestamp = fromTimestamp(Timestamp.decode(reader, reader.uint32()));
          break;

        default:
          reader.skipType(tag & 7);
          break;
      }
    }

    return message;
  },

  fromPartial(object: DeepPartial<BlockInfo>): BlockInfo {
    const message = createBaseBlockInfo();
    message.height = object.height ?? 0;
    message.timestamp = object.timestamp ?? undefined;
    return message;
  }

};