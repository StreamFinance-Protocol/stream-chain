//@ts-nocheck
import { RequestFinalizeBlock, ResponseFinalizeBlock, ResponseCommit } from "../../../../tendermint/abci/types";
import { StoreKVPair } from "../../v1beta1/listening";
import { BinaryReader, BinaryWriter } from "../../../../binary";
import { GlobalDecoderRegistry } from "../../../../registry";
function createBaseListenFinalizeBlockRequest() {
    return {
        req: undefined,
        res: undefined
    };
}
export const ListenFinalizeBlockRequest = {
    typeUrl: "/cosmos.store.streaming.abci.ListenFinalizeBlockRequest",
    aminoType: "cosmos-sdk/ListenFinalizeBlockRequest",
    is(o) {
        return o && o.$typeUrl === ListenFinalizeBlockRequest.typeUrl;
    },
    isSDK(o) {
        return o && o.$typeUrl === ListenFinalizeBlockRequest.typeUrl;
    },
    isAmino(o) {
        return o && o.$typeUrl === ListenFinalizeBlockRequest.typeUrl;
    },
    encode(message, writer = BinaryWriter.create()) {
        if (message.req !== undefined) {
            RequestFinalizeBlock.encode(message.req, writer.uint32(10).fork()).ldelim();
        }
        if (message.res !== undefined) {
            ResponseFinalizeBlock.encode(message.res, writer.uint32(18).fork()).ldelim();
        }
        return writer;
    },
    decode(input, length) {
        const reader = input instanceof BinaryReader ? input : new BinaryReader(input);
        let end = length === undefined ? reader.len : reader.pos + length;
        const message = createBaseListenFinalizeBlockRequest();
        while (reader.pos < end) {
            const tag = reader.uint32();
            switch (tag >>> 3) {
                case 1:
                    message.req = RequestFinalizeBlock.decode(reader, reader.uint32());
                    break;
                case 2:
                    message.res = ResponseFinalizeBlock.decode(reader, reader.uint32());
                    break;
                default:
                    reader.skipType(tag & 7);
                    break;
            }
        }
        return message;
    },
    fromPartial(object) {
        const message = createBaseListenFinalizeBlockRequest();
        message.req = object.req !== undefined && object.req !== null ? RequestFinalizeBlock.fromPartial(object.req) : undefined;
        message.res = object.res !== undefined && object.res !== null ? ResponseFinalizeBlock.fromPartial(object.res) : undefined;
        return message;
    },
    fromAmino(object) {
        const message = createBaseListenFinalizeBlockRequest();
        if (object.req !== undefined && object.req !== null) {
            message.req = RequestFinalizeBlock.fromAmino(object.req);
        }
        if (object.res !== undefined && object.res !== null) {
            message.res = ResponseFinalizeBlock.fromAmino(object.res);
        }
        return message;
    },
    toAmino(message) {
        const obj = {};
        obj.req = message.req ? RequestFinalizeBlock.toAmino(message.req) : undefined;
        obj.res = message.res ? ResponseFinalizeBlock.toAmino(message.res) : undefined;
        return obj;
    },
    fromAminoMsg(object) {
        return ListenFinalizeBlockRequest.fromAmino(object.value);
    },
    toAminoMsg(message) {
        return {
            type: "cosmos-sdk/ListenFinalizeBlockRequest",
            value: ListenFinalizeBlockRequest.toAmino(message)
        };
    },
    fromProtoMsg(message) {
        return ListenFinalizeBlockRequest.decode(message.value);
    },
    toProto(message) {
        return ListenFinalizeBlockRequest.encode(message).finish();
    },
    toProtoMsg(message) {
        return {
            typeUrl: "/cosmos.store.streaming.abci.ListenFinalizeBlockRequest",
            value: ListenFinalizeBlockRequest.encode(message).finish()
        };
    }
};
GlobalDecoderRegistry.register(ListenFinalizeBlockRequest.typeUrl, ListenFinalizeBlockRequest);
GlobalDecoderRegistry.registerAminoProtoMapping(ListenFinalizeBlockRequest.aminoType, ListenFinalizeBlockRequest.typeUrl);
function createBaseListenFinalizeBlockResponse() {
    return {};
}
export const ListenFinalizeBlockResponse = {
    typeUrl: "/cosmos.store.streaming.abci.ListenFinalizeBlockResponse",
    aminoType: "cosmos-sdk/ListenFinalizeBlockResponse",
    is(o) {
        return o && o.$typeUrl === ListenFinalizeBlockResponse.typeUrl;
    },
    isSDK(o) {
        return o && o.$typeUrl === ListenFinalizeBlockResponse.typeUrl;
    },
    isAmino(o) {
        return o && o.$typeUrl === ListenFinalizeBlockResponse.typeUrl;
    },
    encode(_, writer = BinaryWriter.create()) {
        return writer;
    },
    decode(input, length) {
        const reader = input instanceof BinaryReader ? input : new BinaryReader(input);
        let end = length === undefined ? reader.len : reader.pos + length;
        const message = createBaseListenFinalizeBlockResponse();
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
    fromPartial(_) {
        const message = createBaseListenFinalizeBlockResponse();
        return message;
    },
    fromAmino(_) {
        const message = createBaseListenFinalizeBlockResponse();
        return message;
    },
    toAmino(_) {
        const obj = {};
        return obj;
    },
    fromAminoMsg(object) {
        return ListenFinalizeBlockResponse.fromAmino(object.value);
    },
    toAminoMsg(message) {
        return {
            type: "cosmos-sdk/ListenFinalizeBlockResponse",
            value: ListenFinalizeBlockResponse.toAmino(message)
        };
    },
    fromProtoMsg(message) {
        return ListenFinalizeBlockResponse.decode(message.value);
    },
    toProto(message) {
        return ListenFinalizeBlockResponse.encode(message).finish();
    },
    toProtoMsg(message) {
        return {
            typeUrl: "/cosmos.store.streaming.abci.ListenFinalizeBlockResponse",
            value: ListenFinalizeBlockResponse.encode(message).finish()
        };
    }
};
GlobalDecoderRegistry.register(ListenFinalizeBlockResponse.typeUrl, ListenFinalizeBlockResponse);
GlobalDecoderRegistry.registerAminoProtoMapping(ListenFinalizeBlockResponse.aminoType, ListenFinalizeBlockResponse.typeUrl);
function createBaseListenCommitRequest() {
    return {
        blockHeight: BigInt(0),
        res: undefined,
        changeSet: []
    };
}
export const ListenCommitRequest = {
    typeUrl: "/cosmos.store.streaming.abci.ListenCommitRequest",
    aminoType: "cosmos-sdk/ListenCommitRequest",
    is(o) {
        return o && (o.$typeUrl === ListenCommitRequest.typeUrl || typeof o.blockHeight === "bigint" && Array.isArray(o.changeSet) && (!o.changeSet.length || StoreKVPair.is(o.changeSet[0])));
    },
    isSDK(o) {
        return o && (o.$typeUrl === ListenCommitRequest.typeUrl || typeof o.block_height === "bigint" && Array.isArray(o.change_set) && (!o.change_set.length || StoreKVPair.isSDK(o.change_set[0])));
    },
    isAmino(o) {
        return o && (o.$typeUrl === ListenCommitRequest.typeUrl || typeof o.block_height === "bigint" && Array.isArray(o.change_set) && (!o.change_set.length || StoreKVPair.isAmino(o.change_set[0])));
    },
    encode(message, writer = BinaryWriter.create()) {
        if (message.blockHeight !== BigInt(0)) {
            writer.uint32(8).int64(message.blockHeight);
        }
        if (message.res !== undefined) {
            ResponseCommit.encode(message.res, writer.uint32(18).fork()).ldelim();
        }
        for (const v of message.changeSet) {
            StoreKVPair.encode(v, writer.uint32(26).fork()).ldelim();
        }
        return writer;
    },
    decode(input, length) {
        const reader = input instanceof BinaryReader ? input : new BinaryReader(input);
        let end = length === undefined ? reader.len : reader.pos + length;
        const message = createBaseListenCommitRequest();
        while (reader.pos < end) {
            const tag = reader.uint32();
            switch (tag >>> 3) {
                case 1:
                    message.blockHeight = reader.int64();
                    break;
                case 2:
                    message.res = ResponseCommit.decode(reader, reader.uint32());
                    break;
                case 3:
                    message.changeSet.push(StoreKVPair.decode(reader, reader.uint32()));
                    break;
                default:
                    reader.skipType(tag & 7);
                    break;
            }
        }
        return message;
    },
    fromPartial(object) {
        const message = createBaseListenCommitRequest();
        message.blockHeight = object.blockHeight !== undefined && object.blockHeight !== null ? BigInt(object.blockHeight.toString()) : BigInt(0);
        message.res = object.res !== undefined && object.res !== null ? ResponseCommit.fromPartial(object.res) : undefined;
        message.changeSet = object.changeSet?.map(e => StoreKVPair.fromPartial(e)) || [];
        return message;
    },
    fromAmino(object) {
        const message = createBaseListenCommitRequest();
        if (object.block_height !== undefined && object.block_height !== null) {
            message.blockHeight = BigInt(object.block_height);
        }
        if (object.res !== undefined && object.res !== null) {
            message.res = ResponseCommit.fromAmino(object.res);
        }
        message.changeSet = object.change_set?.map(e => StoreKVPair.fromAmino(e)) || [];
        return message;
    },
    toAmino(message) {
        const obj = {};
        obj.block_height = message.blockHeight !== BigInt(0) ? message.blockHeight?.toString() : undefined;
        obj.res = message.res ? ResponseCommit.toAmino(message.res) : undefined;
        if (message.changeSet) {
            obj.change_set = message.changeSet.map(e => e ? StoreKVPair.toAmino(e) : undefined);
        }
        else {
            obj.change_set = message.changeSet;
        }
        return obj;
    },
    fromAminoMsg(object) {
        return ListenCommitRequest.fromAmino(object.value);
    },
    toAminoMsg(message) {
        return {
            type: "cosmos-sdk/ListenCommitRequest",
            value: ListenCommitRequest.toAmino(message)
        };
    },
    fromProtoMsg(message) {
        return ListenCommitRequest.decode(message.value);
    },
    toProto(message) {
        return ListenCommitRequest.encode(message).finish();
    },
    toProtoMsg(message) {
        return {
            typeUrl: "/cosmos.store.streaming.abci.ListenCommitRequest",
            value: ListenCommitRequest.encode(message).finish()
        };
    }
};
GlobalDecoderRegistry.register(ListenCommitRequest.typeUrl, ListenCommitRequest);
GlobalDecoderRegistry.registerAminoProtoMapping(ListenCommitRequest.aminoType, ListenCommitRequest.typeUrl);
function createBaseListenCommitResponse() {
    return {};
}
export const ListenCommitResponse = {
    typeUrl: "/cosmos.store.streaming.abci.ListenCommitResponse",
    aminoType: "cosmos-sdk/ListenCommitResponse",
    is(o) {
        return o && o.$typeUrl === ListenCommitResponse.typeUrl;
    },
    isSDK(o) {
        return o && o.$typeUrl === ListenCommitResponse.typeUrl;
    },
    isAmino(o) {
        return o && o.$typeUrl === ListenCommitResponse.typeUrl;
    },
    encode(_, writer = BinaryWriter.create()) {
        return writer;
    },
    decode(input, length) {
        const reader = input instanceof BinaryReader ? input : new BinaryReader(input);
        let end = length === undefined ? reader.len : reader.pos + length;
        const message = createBaseListenCommitResponse();
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
    fromPartial(_) {
        const message = createBaseListenCommitResponse();
        return message;
    },
    fromAmino(_) {
        const message = createBaseListenCommitResponse();
        return message;
    },
    toAmino(_) {
        const obj = {};
        return obj;
    },
    fromAminoMsg(object) {
        return ListenCommitResponse.fromAmino(object.value);
    },
    toAminoMsg(message) {
        return {
            type: "cosmos-sdk/ListenCommitResponse",
            value: ListenCommitResponse.toAmino(message)
        };
    },
    fromProtoMsg(message) {
        return ListenCommitResponse.decode(message.value);
    },
    toProto(message) {
        return ListenCommitResponse.encode(message).finish();
    },
    toProtoMsg(message) {
        return {
            typeUrl: "/cosmos.store.streaming.abci.ListenCommitResponse",
            value: ListenCommitResponse.encode(message).finish()
        };
    }
};
GlobalDecoderRegistry.register(ListenCommitResponse.typeUrl, ListenCommitResponse);
GlobalDecoderRegistry.registerAminoProtoMapping(ListenCommitResponse.aminoType, ListenCommitResponse.typeUrl);
