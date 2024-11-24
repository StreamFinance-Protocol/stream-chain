"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.GenesisState = void 0;
//@ts-nocheck
const limit_params_1 = require("./limit_params");
const binary_1 = require("../../binary");
const registry_1 = require("../../registry");
function createBaseGenesisState() {
    return {
        limitParamsList: []
    };
}
exports.GenesisState = {
    typeUrl: "/klyraprotocol.ratelimit.GenesisState",
    is(o) {
        return o && (o.$typeUrl === exports.GenesisState.typeUrl || Array.isArray(o.limitParamsList) && (!o.limitParamsList.length || limit_params_1.LimitParams.is(o.limitParamsList[0])));
    },
    isSDK(o) {
        return o && (o.$typeUrl === exports.GenesisState.typeUrl || Array.isArray(o.limit_params_list) && (!o.limit_params_list.length || limit_params_1.LimitParams.isSDK(o.limit_params_list[0])));
    },
    isAmino(o) {
        return o && (o.$typeUrl === exports.GenesisState.typeUrl || Array.isArray(o.limit_params_list) && (!o.limit_params_list.length || limit_params_1.LimitParams.isAmino(o.limit_params_list[0])));
    },
    encode(message, writer = binary_1.BinaryWriter.create()) {
        for (const v of message.limitParamsList) {
            limit_params_1.LimitParams.encode(v, writer.uint32(10).fork()).ldelim();
        }
        return writer;
    },
    decode(input, length) {
        const reader = input instanceof binary_1.BinaryReader ? input : new binary_1.BinaryReader(input);
        let end = length === undefined ? reader.len : reader.pos + length;
        const message = createBaseGenesisState();
        while (reader.pos < end) {
            const tag = reader.uint32();
            switch (tag >>> 3) {
                case 1:
                    message.limitParamsList.push(limit_params_1.LimitParams.decode(reader, reader.uint32()));
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
        message.limitParamsList = object.limitParamsList?.map(e => limit_params_1.LimitParams.fromPartial(e)) || [];
        return message;
    },
    fromAmino(object) {
        const message = createBaseGenesisState();
        message.limitParamsList = object.limit_params_list?.map(e => limit_params_1.LimitParams.fromAmino(e)) || [];
        return message;
    },
    toAmino(message) {
        const obj = {};
        if (message.limitParamsList) {
            obj.limit_params_list = message.limitParamsList.map(e => e ? limit_params_1.LimitParams.toAmino(e) : undefined);
        }
        else {
            obj.limit_params_list = message.limitParamsList;
        }
        return obj;
    },
    fromAminoMsg(object) {
        return exports.GenesisState.fromAmino(object.value);
    },
    fromProtoMsg(message) {
        return exports.GenesisState.decode(message.value);
    },
    toProto(message) {
        return exports.GenesisState.encode(message).finish();
    },
    toProtoMsg(message) {
        return {
            typeUrl: "/klyraprotocol.ratelimit.GenesisState",
            value: exports.GenesisState.encode(message).finish()
        };
    }
};
registry_1.GlobalDecoderRegistry.register(exports.GenesisState.typeUrl, exports.GenesisState);
