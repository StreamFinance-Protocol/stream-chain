//@ts-nocheck
import { BinaryReader, BinaryWriter } from "../../binary";
import { GlobalDecoderRegistry } from "../../registry";
/** GenesisState defines the sending module's genesis state. */
export interface GenesisState {}
export interface GenesisStateProtoMsg {
  typeUrl: "/klyraprotocol.sending.GenesisState";
  value: Uint8Array;
}
/** GenesisState defines the sending module's genesis state. */
export interface GenesisStateAmino {}
export interface GenesisStateAminoMsg {
  type: "/klyraprotocol.sending.GenesisState";
  value: GenesisStateAmino;
}
/** GenesisState defines the sending module's genesis state. */
export interface GenesisStateSDKType {}
function createBaseGenesisState(): GenesisState {
  return {};
}
export const GenesisState = {
  typeUrl: "/klyraprotocol.sending.GenesisState",
  is(o: any): o is GenesisState {
    return o && o.$typeUrl === GenesisState.typeUrl;
  },
  isSDK(o: any): o is GenesisStateSDKType {
    return o && o.$typeUrl === GenesisState.typeUrl;
  },
  isAmino(o: any): o is GenesisStateAmino {
    return o && o.$typeUrl === GenesisState.typeUrl;
  },
  encode(_: GenesisState, writer: BinaryWriter = BinaryWriter.create()): BinaryWriter {
    return writer;
  },
  decode(input: BinaryReader | Uint8Array, length?: number): GenesisState {
    const reader = input instanceof BinaryReader ? input : new BinaryReader(input);
    let end = length === undefined ? reader.len : reader.pos + length;
    const message = createBaseGenesisState();
    while (reader.pos < end) {
      const tag = reader.uint32();
      switch (tag >>> 3) {
        default:
          reader.skipType(tag & 7);
          break;
      }
    }
    return message;
  },
  fromPartial(_: Partial<GenesisState>): GenesisState {
    const message = createBaseGenesisState();
    return message;
  },
  fromAmino(_: GenesisStateAmino): GenesisState {
    const message = createBaseGenesisState();
    return message;
  },
  toAmino(_: GenesisState): GenesisStateAmino {
    const obj: any = {};
    return obj;
  },
  fromAminoMsg(object: GenesisStateAminoMsg): GenesisState {
    return GenesisState.fromAmino(object.value);
  },
  fromProtoMsg(message: GenesisStateProtoMsg): GenesisState {
    return GenesisState.decode(message.value);
  },
  toProto(message: GenesisState): Uint8Array {
    return GenesisState.encode(message).finish();
  },
  toProtoMsg(message: GenesisState): GenesisStateProtoMsg {
    return {
      typeUrl: "/klyraprotocol.sending.GenesisState",
      value: GenesisState.encode(message).finish()
    };
  }
};
GlobalDecoderRegistry.register(GenesisState.typeUrl, GenesisState);