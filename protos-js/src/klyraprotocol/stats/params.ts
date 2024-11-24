//@ts-nocheck
import { Duration, DurationAmino, DurationSDKType } from "../../google/protobuf/duration";
import { BinaryReader, BinaryWriter } from "../../binary";
import { GlobalDecoderRegistry } from "../../registry";
/** Params defines the parameters for x/stats module. */
export interface Params {
  /** The desired number of seconds in the look-back window. */
  windowDuration: Duration;
}
export interface ParamsProtoMsg {
  typeUrl: "/klyraprotocol.stats.Params";
  value: Uint8Array;
}
/** Params defines the parameters for x/stats module. */
export interface ParamsAmino {
  /** The desired number of seconds in the look-back window. */
  window_duration?: DurationAmino;
}
export interface ParamsAminoMsg {
  type: "/klyraprotocol.stats.Params";
  value: ParamsAmino;
}
/** Params defines the parameters for x/stats module. */
export interface ParamsSDKType {
  window_duration: DurationSDKType;
}
function createBaseParams(): Params {
  return {
    windowDuration: Duration.fromPartial({})
  };
}
export const Params = {
  typeUrl: "/klyraprotocol.stats.Params",
  is(o: any): o is Params {
    return o && (o.$typeUrl === Params.typeUrl || Duration.is(o.windowDuration));
  },
  isSDK(o: any): o is ParamsSDKType {
    return o && (o.$typeUrl === Params.typeUrl || Duration.isSDK(o.window_duration));
  },
  isAmino(o: any): o is ParamsAmino {
    return o && (o.$typeUrl === Params.typeUrl || Duration.isAmino(o.window_duration));
  },
  encode(message: Params, writer: BinaryWriter = BinaryWriter.create()): BinaryWriter {
    if (message.windowDuration !== undefined) {
      Duration.encode(message.windowDuration, writer.uint32(10).fork()).ldelim();
    }
    return writer;
  },
  decode(input: BinaryReader | Uint8Array, length?: number): Params {
    const reader = input instanceof BinaryReader ? input : new BinaryReader(input);
    let end = length === undefined ? reader.len : reader.pos + length;
    const message = createBaseParams();
    while (reader.pos < end) {
      const tag = reader.uint32();
      switch (tag >>> 3) {
        case 1:
          message.windowDuration = Duration.decode(reader, reader.uint32());
          break;
        default:
          reader.skipType(tag & 7);
          break;
      }
    }
    return message;
  },
  fromPartial(object: Partial<Params>): Params {
    const message = createBaseParams();
    message.windowDuration = object.windowDuration !== undefined && object.windowDuration !== null ? Duration.fromPartial(object.windowDuration) : undefined;
    return message;
  },
  fromAmino(object: ParamsAmino): Params {
    const message = createBaseParams();
    if (object.window_duration !== undefined && object.window_duration !== null) {
      message.windowDuration = Duration.fromAmino(object.window_duration);
    }
    return message;
  },
  toAmino(message: Params): ParamsAmino {
    const obj: any = {};
    obj.window_duration = message.windowDuration ? Duration.toAmino(message.windowDuration) : undefined;
    return obj;
  },
  fromAminoMsg(object: ParamsAminoMsg): Params {
    return Params.fromAmino(object.value);
  },
  fromProtoMsg(message: ParamsProtoMsg): Params {
    return Params.decode(message.value);
  },
  toProto(message: Params): Uint8Array {
    return Params.encode(message).finish();
  },
  toProtoMsg(message: Params): ParamsProtoMsg {
    return {
      typeUrl: "/klyraprotocol.stats.Params",
      value: Params.encode(message).finish()
    };
  }
};
GlobalDecoderRegistry.register(Params.typeUrl, Params);