//@ts-nocheck
import { LimitParams } from "./limit_params";
import { BinaryReader, BinaryWriter } from "../../binary";
import { GlobalDecoderRegistry } from "../../registry";
function createBaseGenesisState() {
    return {
        limitParamsList: []
    };
}
export const GenesisState = {
    typeUrl: "/klyraprotocol.ratelimit.GenesisState",
    is(o) {
        return o && (o.$typeUrl === GenesisState.typeUrl || Array.isArray(o.limitParamsList) && (!o.limitParamsList.length || LimitParams.is(o.limitParamsList[0])));
    },
    isSDK(o) {
        return o && (o.$typeUrl === GenesisState.typeUrl || Array.isArray(o.limit_params_list) && (!o.limit_params_list.length || LimitParams.isSDK(o.limit_params_list[0])));
    },
    isAmino(o) {
        return o && (o.$typeUrl === GenesisState.typeUrl || Array.isArray(o.limit_params_list) && (!o.limit_params_list.length || LimitParams.isAmino(o.limit_params_list[0])));
    },
    encode(message, writer = BinaryWriter.create()) {
        for (const v of message.limitParamsList) {
            LimitParams.encode(v, writer.uint32(10).fork()).ldelim();
        }
        return writer;
    },
    decode(input, length) {
        const reader = input instanceof BinaryReader ? input : new BinaryReader(input);
        let end = length === undefined ? reader.len : reader.pos + length;
        const message = createBaseGenesisState();
        while (reader.pos < end) {
            const tag = reader.uint32();
            switch (tag >>> 3) {
                case 1:
                    message.limitParamsList.push(LimitParams.decode(reader, reader.uint32()));
                    break;
                default:
                    reader.skipType(tag & 7);
                    break;
            }
        }
        return message;
    },
    fromPartial(object) {
        const message = createBaseGenesisState();
        message.limitParamsList = object.limitParamsList?.map(e => LimitParams.fromPartial(e)) || [];
        return message;
    },
    fromAmino(object) {
        const message = createBaseGenesisState();
        message.limitParamsList = object.limit_params_list?.map(e => LimitParams.fromAmino(e)) || [];
        return message;
    },
    toAmino(message) {
        const obj = {};
        if (message.limitParamsList) {
            obj.limit_params_list = message.limitParamsList.map(e => e ? LimitParams.toAmino(e) : undefined);
        }
        else {
            obj.limit_params_list = message.limitParamsList;
        }
        return obj;
    },
    fromAminoMsg(object) {
        return GenesisState.fromAmino(object.value);
    },
    fromProtoMsg(message) {
        return GenesisState.decode(message.value);
    },
    toProto(message) {
        return GenesisState.encode(message).finish();
    },
    toProtoMsg(message) {
        return {
            typeUrl: "/klyraprotocol.ratelimit.GenesisState",
            value: GenesisState.encode(message).finish()
        };
    }
};
GlobalDecoderRegistry.register(GenesisState.typeUrl, GenesisState);
