"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.ListenCommitResponse = exports.ListenCommitRequest = exports.ListenFinalizeBlockResponse = exports.ListenFinalizeBlockRequest = void 0;
//@ts-nocheck
const types_1 = require("../../../../tendermint/abci/types");
const listening_1 = require("../../v1beta1/listening");
const binary_1 = require("../../../../binary");
const registry_1 = require("../../../../registry");
function createBaseListenFinalizeBlockRequest() {
    return {
        req: undefined,
        res: undefined
    };
}
exports.ListenFinalizeBlockRequest = {
    typeUrl: "/cosmos.store.streaming.abci.ListenFinalizeBlockRequest",
    aminoType: "cosmos-sdk/ListenFinalizeBlockRequest",
    is(o) {
        return o && o.$typeUrl === exports.ListenFinalizeBlockRequest.typeUrl;
    },
    isSDK(o) {
        return o && o.$typeUrl === exports.ListenFinalizeBlockRequest.typeUrl;
    },
    isAmino(o) {
        return o && o.$typeUrl === exports.ListenFinalizeBlockRequest.typeUrl;
    },
    encode(message, writer = binary_1.BinaryWriter.create()) {
        if (message.req !== undefined) {
            types_1.RequestFinalizeBlock.encode(message.req, writer.uint32(10).fork()).ldelim();
        }
        if (message.res !== undefined) {
            types_1.ResponseFinalizeBlock.encode(message.res, writer.uint32(18).fork()).ldelim();
        }
        return writer;
    },
    decode(input, length) {
        const reader = input instanceof binary_1.BinaryReader ? input : new binary_1.BinaryReader(input);
        let end = length === undefined ? reader.len : reader.pos + length;
        const message = createBaseListenFinalizeBlockRequest();
        while (reader.pos < end) {
            const tag = reader.uint32();
            switch (tag >>> 3) {
                case 1:
                    message.req = types_1.RequestFinalizeBlock.decode(reader, reader.uint32());
                    break;
                case 2:
                    message.res = types_1.ResponseFinalizeBlock.decode(reader, reader.uint32());
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
        message.req = object.req !== undefined && object.req !== null ? types_1.RequestFinalizeBlock.fromPartial(object.req) : undefined;
        message.res = object.res !== undefined && object.res !== null ? types_1.ResponseFinalizeBlock.fromPartial(object.res) : undefined;
        return message;
    },
    fromAmino(object) {
        const message = createBaseListenFinalizeBlockRequest();
        if (object.req !== undefined && object.req !== null) {
            message.req = types_1.RequestFinalizeBlock.fromAmino(object.req);
        }
        if (object.res !== undefined && object.res !== null) {
            message.res = types_1.ResponseFinalizeBlock.fromAmino(object.res);
        }
        return message;
    },
    toAmino(message) {
        const obj = {};
        obj.req = message.req ? types_1.RequestFinalizeBlock.toAmino(message.req) : undefined;
        obj.res = message.res ? types_1.ResponseFinalizeBlock.toAmino(message.res) : undefined;
        return obj;
    },
    fromAminoMsg(object) {
        return exports.ListenFinalizeBlockRequest.fromAmino(object.value);
    },
    toAminoMsg(message) {
        return {
            type: "cosmos-sdk/ListenFinalizeBlockRequest",
            value: exports.ListenFinalizeBlockRequest.toAmino(message)
        };
    },
    fromProtoMsg(message) {
        return exports.ListenFinalizeBlockRequest.decode(message.value);
    },
    toProto(message) {
        return exports.ListenFinalizeBlockRequest.encode(message).finish();
    },
    toProtoMsg(message) {
        return {
            typeUrl: "/cosmos.store.streaming.abci.ListenFinalizeBlockRequest",
            value: exports.ListenFinalizeBlockRequest.encode(message).finish()
        };
    }
};
registry_1.GlobalDecoderRegistry.register(exports.ListenFinalizeBlockRequest.typeUrl, exports.ListenFinalizeBlockRequest);
registry_1.GlobalDecoderRegistry.registerAminoProtoMapping(exports.ListenFinalizeBlockRequest.aminoType, exports.ListenFinalizeBlockRequest.typeUrl);
function createBaseListenFinalizeBlockResponse() {
    return {};
}
exports.ListenFinalizeBlockResponse = {
    typeUrl: "/cosmos.store.streaming.abci.ListenFinalizeBlockResponse",
    aminoType: "cosmos-sdk/ListenFinalizeBlockResponse",
    is(o) {
        return o && o.$typeUrl === exports.ListenFinalizeBlockResponse.typeUrl;
    },
    isSDK(o) {
        return o && o.$typeUrl === exports.ListenFinalizeBlockResponse.typeUrl;
    },
    isAmino(o) {
        return o && o.$typeUrl === exports.ListenFinalizeBlockResponse.typeUrl;
    },
    encode(_, writer = binary_1.BinaryWriter.create()) {
        return writer;
    },
    decode(input, length) {
        const reader = input instanceof binary_1.BinaryReader ? input : new binary_1.BinaryReader(input);
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
        return exports.ListenFinalizeBlockResponse.fromAmino(object.value);
    },
    toAminoMsg(message) {
        return {
            type: "cosmos-sdk/ListenFinalizeBlockResponse",
            value: exports.ListenFinalizeBlockResponse.toAmino(message)
        };
    },
    fromProtoMsg(message) {
        return exports.ListenFinalizeBlockResponse.decode(message.value);
    },
    toProto(message) {
        return exports.ListenFinalizeBlockResponse.encode(message).finish();
    },
    toProtoMsg(message) {
        return {
            typeUrl: "/cosmos.store.streaming.abci.ListenFinalizeBlockResponse",
            value: exports.ListenFinalizeBlockResponse.encode(message).finish()
        };
    }
};
registry_1.GlobalDecoderRegistry.register(exports.ListenFinalizeBlockResponse.typeUrl, exports.ListenFinalizeBlockResponse);
registry_1.GlobalDecoderRegistry.registerAminoProtoMapping(exports.ListenFinalizeBlockResponse.aminoType, exports.ListenFinalizeBlockResponse.typeUrl);
function createBaseListenCommitRequest() {
    return {
        blockHeight: BigInt(0),
        res: undefined,
        changeSet: []
    };
}
exports.ListenCommitRequest = {
    typeUrl: "/cosmos.store.streaming.abci.ListenCommitRequest",
    aminoType: "cosmos-sdk/ListenCommitRequest",
    is(o) {
        return o && (o.$typeUrl === exports.ListenCommitRequest.typeUrl || typeof o.blockHeight === "bigint" && Array.isArray(o.changeSet) && (!o.changeSet.length || listening_1.StoreKVPair.is(o.changeSet[0])));
    },
    isSDK(o) {
        return o && (o.$typeUrl === exports.ListenCommitRequest.typeUrl || typeof o.block_height === "bigint" && Array.isArray(o.change_set) && (!o.change_set.length || listening_1.StoreKVPair.isSDK(o.change_set[0])));
    },
    isAmino(o) {
        return o && (o.$typeUrl === exports.ListenCommitRequest.typeUrl || typeof o.block_height === "bigint" && Array.isArray(o.change_set) && (!o.change_set.length || listening_1.StoreKVPair.isAmino(o.change_set[0])));
    },
    encode(message, writer = binary_1.BinaryWriter.create()) {
        if (message.blockHeight !== BigInt(0)) {
            writer.uint32(8).int64(message.blockHeight);
        }
        if (message.res !== undefined) {
            types_1.ResponseCommit.encode(message.res, writer.uint32(18).fork()).ldelim();
        }
        for (const v of message.changeSet) {
            listening_1.StoreKVPair.encode(v, writer.uint32(26).fork()).ldelim();
        }
        return writer;
    },
    decode(input, length) {
        const reader = input instanceof binary_1.BinaryReader ? input : new binary_1.BinaryReader(input);
        let end = length === undefined ? reader.len : reader.pos + length;
        const message = createBaseListenCommitRequest();
        while (reader.pos < end) {
            const tag = reader.uint32();
            switch (tag >>> 3) {
                case 1:
                    message.blockHeight = reader.int64();
                    break;
                case 2:
                    message.res = types_1.ResponseCommit.decode(reader, reader.uint32());
                    break;
                case 3:
                    message.changeSet.push(listening_1.StoreKVPair.decode(reader, reader.uint32()));
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
        message.res = object.res !== undefined && object.res !== null ? types_1.ResponseCommit.fromPartial(object.res) : undefined;
        message.changeSet = object.changeSet?.map(e => listening_1.StoreKVPair.fromPartial(e)) || [];
        return message;
    },
    fromAmino(object) {
        const message = createBaseListenCommitRequest();
        if (object.block_height !== undefined && object.block_height !== null) {
            message.blockHeight = BigInt(object.block_height);
        }
        if (object.res !== undefined && object.res !== null) {
            message.res = types_1.ResponseCommit.fromAmino(object.res);
        }
        message.changeSet = object.change_set?.map(e => listening_1.StoreKVPair.fromAmino(e)) || [];
        return message;
    },
    toAmino(message) {
        const obj = {};
        obj.block_height = message.blockHeight !== BigInt(0) ? message.blockHeight?.toString() : undefined;
        obj.res = message.res ? types_1.ResponseCommit.toAmino(message.res) : undefined;
        if (message.changeSet) {
            obj.change_set = message.changeSet.map(e => e ? listening_1.StoreKVPair.toAmino(e) : undefined);
        }
        else {
            obj.change_set = message.changeSet;
        }
        return obj;
    },
    fromAminoMsg(object) {
        return exports.ListenCommitRequest.fromAmino(object.value);
    },
    toAminoMsg(message) {
        return {
            type: "cosmos-sdk/ListenCommitRequest",
            value: exports.ListenCommitRequest.toAmino(message)
        };
    },
    fromProtoMsg(message) {
        return exports.ListenCommitRequest.decode(message.value);
    },
    toProto(message) {
        return exports.ListenCommitRequest.encode(message).finish();
    },
    toProtoMsg(message) {
        return {
            typeUrl: "/cosmos.store.streaming.abci.ListenCommitRequest",
            value: exports.ListenCommitRequest.encode(message).finish()
        };
    }
};
registry_1.GlobalDecoderRegistry.register(exports.ListenCommitRequest.typeUrl, exports.ListenCommitRequest);
registry_1.GlobalDecoderRegistry.registerAminoProtoMapping(exports.ListenCommitRequest.aminoType, exports.ListenCommitRequest.typeUrl);
function createBaseListenCommitResponse() {
    return {};
}
exports.ListenCommitResponse = {
    typeUrl: "/cosmos.store.streaming.abci.ListenCommitResponse",
    aminoType: "cosmos-sdk/ListenCommitResponse",
    is(o) {
        return o && o.$typeUrl === exports.ListenCommitResponse.typeUrl;
    },
    isSDK(o) {
        return o && o.$typeUrl === exports.ListenCommitResponse.typeUrl;
    },
    isAmino(o) {
        return o && o.$typeUrl === exports.ListenCommitResponse.typeUrl;
    },
    encode(_, writer = binary_1.BinaryWriter.create()) {
        return writer;
    },
    decode(input, length) {
        const reader = input instanceof binary_1.BinaryReader ? input : new binary_1.BinaryReader(input);
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
        return exports.ListenCommitResponse.fromAmino(object.value);
    },
    toAminoMsg(message) {
        return {
            type: "cosmos-sdk/ListenCommitResponse",
            value: exports.ListenCommitResponse.toAmino(message)
        };
    },
    fromProtoMsg(message) {
        return exports.ListenCommitResponse.decode(message.value);
    },
    toProto(message) {
        return exports.ListenCommitResponse.encode(message).finish();
    },
    toProtoMsg(message) {
        return {
            typeUrl: "/cosmos.store.streaming.abci.ListenCommitResponse",
            value: exports.ListenCommitResponse.encode(message).finish()
        };
    }
};
registry_1.GlobalDecoderRegistry.register(exports.ListenCommitResponse.typeUrl, exports.ListenCommitResponse);
registry_1.GlobalDecoderRegistry.registerAminoProtoMapping(exports.ListenCommitResponse.aminoType, exports.ListenCommitResponse.typeUrl);
