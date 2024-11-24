//@ts-nocheck
import { Asset, AssetAmino, AssetSDKType } from "./asset";
import { BinaryReader, BinaryWriter } from "../../binary";
import { GlobalDecoderRegistry } from "../../registry";
/** GenesisState defines the assets module's genesis state. */
export interface GenesisState {
  assets: Asset[];
}
export interface GenesisStateProtoMsg {
  typeUrl: "/klyraprotocol.assets.GenesisState";
  value: Uint8Array;
}
/** GenesisState defines the assets module's genesis state. */
export interface GenesisStateAmino {
  assets?: AssetAmino[];
}
export interface GenesisStateAminoMsg {
  type: "/klyraprotocol.assets.GenesisState";
  value: GenesisStateAmino;
}
/** GenesisState defines the assets module's genesis state. */
export interface GenesisStateSDKType {
  assets: AssetSDKType[];
}
function createBaseGenesisState(): GenesisState {
  return {
    assets: []
  };
}
export const GenesisState = {
  typeUrl: "/klyraprotocol.assets.GenesisState",
  is(o: any): o is GenesisState {
    return o && (o.$typeUrl === GenesisState.typeUrl || Array.isArray(o.assets) && (!o.assets.length || Asset.is(o.assets[0])));
  },
  isSDK(o: any): o is GenesisStateSDKType {
    return o && (o.$typeUrl === GenesisState.typeUrl || Array.isArray(o.assets) && (!o.assets.length || Asset.isSDK(o.assets[0])));
  },
  isAmino(o: any): o is GenesisStateAmino {
    return o && (o.$typeUrl === GenesisState.typeUrl || Array.isArray(o.assets) && (!o.assets.length || Asset.isAmino(o.assets[0])));
  },
  encode(message: GenesisState, writer: BinaryWriter = BinaryWriter.create()): BinaryWriter {
    for (const v of message.assets) {
      Asset.encode(v!, writer.uint32(10).fork()).ldelim();
    }
    return writer;
  },
  decode(input: BinaryReader | Uint8Array, length?: number): GenesisState {
    const reader = input instanceof BinaryReader ? input : new BinaryReader(input);
    let end = length === undefined ? reader.len : reader.pos + length;
    const message = createBaseGenesisState();
    while (reader.pos < end) {
      const tag = reader.uint32();
      switch (tag >>> 3) {
        case 1:
          message.assets.push(Asset.decode(reader, reader.uint32()));
          break;
        default:
          reader.skipType(tag & 7);
          break;
      }
    }
    return message;
  },
  fromPartial(object: Partial<GenesisState>): GenesisState {
    const message = createBaseGenesisState();
    message.assets = object.assets?.map(e => Asset.fromPartial(e)) || [];
    return message;
  },
  fromAmino(object: GenesisStateAmino): GenesisState {
    const message = createBaseGenesisState();
    message.assets = object.assets?.map(e => Asset.fromAmino(e)) || [];
    return message;
  },
  toAmino(message: GenesisState): GenesisStateAmino {
    const obj: any = {};
    if (message.assets) {
      obj.assets = message.assets.map(e => e ? Asset.toAmino(e) : undefined);
    } else {
      obj.assets = message.assets;
    }
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
      typeUrl: "/klyraprotocol.assets.GenesisState",
      value: GenesisState.encode(message).finish()
    };
  }
};
GlobalDecoderRegistry.register(GenesisState.typeUrl, GenesisState);