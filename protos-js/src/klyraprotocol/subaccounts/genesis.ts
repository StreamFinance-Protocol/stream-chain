//@ts-nocheck
import { Subaccount, SubaccountAmino, SubaccountSDKType } from "./subaccount";
import { BinaryReader, BinaryWriter } from "../../binary";
import { GlobalDecoderRegistry } from "../../registry";
/** GenesisState defines the subaccounts module's genesis state. */
export interface GenesisState {
  subaccounts: Subaccount[];
}
export interface GenesisStateProtoMsg {
  typeUrl: "/klyraprotocol.subaccounts.GenesisState";
  value: Uint8Array;
}
/** GenesisState defines the subaccounts module's genesis state. */
export interface GenesisStateAmino {
  subaccounts?: SubaccountAmino[];
}
export interface GenesisStateAminoMsg {
  type: "/klyraprotocol.subaccounts.GenesisState";
  value: GenesisStateAmino;
}
/** GenesisState defines the subaccounts module's genesis state. */
export interface GenesisStateSDKType {
  subaccounts: SubaccountSDKType[];
}
function createBaseGenesisState(): GenesisState {
  return {
    subaccounts: []
  };
}
export const GenesisState = {
  typeUrl: "/klyraprotocol.subaccounts.GenesisState",
  is(o: any): o is GenesisState {
    return o && (o.$typeUrl === GenesisState.typeUrl || Array.isArray(o.subaccounts) && (!o.subaccounts.length || Subaccount.is(o.subaccounts[0])));
  },
  isSDK(o: any): o is GenesisStateSDKType {
    return o && (o.$typeUrl === GenesisState.typeUrl || Array.isArray(o.subaccounts) && (!o.subaccounts.length || Subaccount.isSDK(o.subaccounts[0])));
  },
  isAmino(o: any): o is GenesisStateAmino {
    return o && (o.$typeUrl === GenesisState.typeUrl || Array.isArray(o.subaccounts) && (!o.subaccounts.length || Subaccount.isAmino(o.subaccounts[0])));
  },
  encode(message: GenesisState, writer: BinaryWriter = BinaryWriter.create()): BinaryWriter {
    for (const v of message.subaccounts) {
      Subaccount.encode(v!, writer.uint32(10).fork()).ldelim();
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
          message.subaccounts.push(Subaccount.decode(reader, reader.uint32()));
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
    message.subaccounts = object.subaccounts?.map(e => Subaccount.fromPartial(e)) || [];
    return message;
  },
  fromAmino(object: GenesisStateAmino): GenesisState {
    const message = createBaseGenesisState();
    message.subaccounts = object.subaccounts?.map(e => Subaccount.fromAmino(e)) || [];
    return message;
  },
  toAmino(message: GenesisState): GenesisStateAmino {
    const obj: any = {};
    if (message.subaccounts) {
      obj.subaccounts = message.subaccounts.map(e => e ? Subaccount.toAmino(e) : undefined);
    } else {
      obj.subaccounts = message.subaccounts;
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
      typeUrl: "/klyraprotocol.subaccounts.GenesisState",
      value: GenesisState.encode(message).finish()
    };
  }
};
GlobalDecoderRegistry.register(GenesisState.typeUrl, GenesisState);