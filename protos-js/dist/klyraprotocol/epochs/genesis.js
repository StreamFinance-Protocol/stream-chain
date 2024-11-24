"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.GenesisState = void 0;
//@ts-nocheck
const epoch_info_1 = require("./epoch_info");
const binary_1 = require("../../binary");
const registry_1 = require("../../registry");
function createBaseGenesisState() {
    return {
        epochInfoList: []
    };
}
exports.GenesisState = {
    typeUrl: "/klyraprotocol.epochs.GenesisState",
    is(o) {
        return o && (o.$typeUrl === exports.GenesisState.typeUrl || Array.isArray(o.epochInfoList) && (!o.epochInfoList.length || epoch_info_1.EpochInfo.is(o.epochInfoList[0])));
    },
    isSDK(o) {
        return o && (o.$typeUrl === exports.GenesisState.typeUrl || Array.isArray(o.epoch_info_list) && (!o.epoch_info_list.length || epoch_info_1.EpochInfo.isSDK(o.epoch_info_list[0])));
    },
    isAmino(o) {
        return o && (o.$typeUrl === exports.GenesisState.typeUrl || Array.isArray(o.epoch_info_list) && (!o.epoch_info_list.length || epoch_info_1.EpochInfo.isAmino(o.epoch_info_list[0])));
    },
    encode(message, writer = binary_1.BinaryWriter.create()) {
        for (const v of message.epochInfoList) {
            epoch_info_1.EpochInfo.encode(v, writer.uint32(10).fork()).ldelim();
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
                    message.epochInfoList.push(epoch_info_1.EpochInfo.decode(reader, reader.uint32()));
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
        message.epochInfoList = object.epochInfoList?.map(e => epoch_info_1.EpochInfo.fromPartial(e)) || [];
        return message;
    },
    fromAmino(object) {
        const message = createBaseGenesisState();
        message.epochInfoList = object.epoch_info_list?.map(e => epoch_info_1.EpochInfo.fromAmino(e)) || [];
        return message;
    },
    toAmino(message) {
        const obj = {};
        if (message.epochInfoList) {
            obj.epoch_info_list = message.epochInfoList.map(e => e ? epoch_info_1.EpochInfo.toAmino(e) : undefined);
        }
        else {
            obj.epoch_info_list = message.epochInfoList;
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
            typeUrl: "/klyraprotocol.epochs.GenesisState",
            value: exports.GenesisState.encode(message).finish()
        };
    }
};
registry_1.GlobalDecoderRegistry.register(exports.GenesisState.typeUrl, exports.GenesisState);
