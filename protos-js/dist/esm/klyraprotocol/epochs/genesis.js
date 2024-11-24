//@ts-nocheck
import { EpochInfo } from "./epoch_info";
import { BinaryReader, BinaryWriter } from "../../binary";
import { GlobalDecoderRegistry } from "../../registry";
function createBaseGenesisState() {
    return {
        epochInfoList: []
    };
}
export const GenesisState = {
    typeUrl: "/klyraprotocol.epochs.GenesisState",
    is(o) {
        return o && (o.$typeUrl === GenesisState.typeUrl || Array.isArray(o.epochInfoList) && (!o.epochInfoList.length || EpochInfo.is(o.epochInfoList[0])));
    },
    isSDK(o) {
        return o && (o.$typeUrl === GenesisState.typeUrl || Array.isArray(o.epoch_info_list) && (!o.epoch_info_list.length || EpochInfo.isSDK(o.epoch_info_list[0])));
    },
    isAmino(o) {
        return o && (o.$typeUrl === GenesisState.typeUrl || Array.isArray(o.epoch_info_list) && (!o.epoch_info_list.length || EpochInfo.isAmino(o.epoch_info_list[0])));
    },
    encode(message, writer = BinaryWriter.create()) {
        for (const v of message.epochInfoList) {
            EpochInfo.encode(v, writer.uint32(10).fork()).ldelim();
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
                    message.epochInfoList.push(EpochInfo.decode(reader, reader.uint32()));
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
        message.epochInfoList = object.epochInfoList?.map(e => EpochInfo.fromPartial(e)) || [];
        return message;
    },
    fromAmino(object) {
        const message = createBaseGenesisState();
        message.epochInfoList = object.epoch_info_list?.map(e => EpochInfo.fromAmino(e)) || [];
        return message;
    },
    toAmino(message) {
        const obj = {};
        if (message.epochInfoList) {
            obj.epoch_info_list = message.epochInfoList.map(e => e ? EpochInfo.toAmino(e) : undefined);
        }
        else {
            obj.epoch_info_list = message.epochInfoList;
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
            typeUrl: "/klyraprotocol.epochs.GenesisState",
            value: GenesisState.encode(message).finish()
        };
    }
};
GlobalDecoderRegistry.register(GenesisState.typeUrl, GenesisState);
