//@ts-nocheck
import { Timestamp } from "../../../google/protobuf/timestamp";
import { BinaryReader, BinaryWriter } from "../../../binary";
import { toTimestamp, fromTimestamp, bytesFromBase64, base64FromBytes } from "../../../helpers";
import { GlobalDecoderRegistry } from "../../../registry";
function createBaseCommitInfo() {
    return {
        version: BigInt(0),
        storeInfos: [],
        timestamp: new Date()
    };
}
export const CommitInfo = {
    typeUrl: "/cosmos.store.v1beta1.CommitInfo",
    aminoType: "cosmos-sdk/CommitInfo",
    is(o) {
        return o && (o.$typeUrl === CommitInfo.typeUrl || typeof o.version === "bigint" && Array.isArray(o.storeInfos) && (!o.storeInfos.length || StoreInfo.is(o.storeInfos[0])) && Timestamp.is(o.timestamp));
    },
    isSDK(o) {
        return o && (o.$typeUrl === CommitInfo.typeUrl || typeof o.version === "bigint" && Array.isArray(o.store_infos) && (!o.store_infos.length || StoreInfo.isSDK(o.store_infos[0])) && Timestamp.isSDK(o.timestamp));
    },
    isAmino(o) {
        return o && (o.$typeUrl === CommitInfo.typeUrl || typeof o.version === "bigint" && Array.isArray(o.store_infos) && (!o.store_infos.length || StoreInfo.isAmino(o.store_infos[0])) && Timestamp.isAmino(o.timestamp));
    },
    encode(message, writer = BinaryWriter.create()) {
        if (message.version !== BigInt(0)) {
            writer.uint32(8).int64(message.version);
        }
        for (const v of message.storeInfos) {
            StoreInfo.encode(v, writer.uint32(18).fork()).ldelim();
        }
        if (message.timestamp !== undefined) {
            Timestamp.encode(toTimestamp(message.timestamp), writer.uint32(26).fork()).ldelim();
        }
        return writer;
    },
    decode(input, length) {
        const reader = input instanceof BinaryReader ? input : new BinaryReader(input);
        let end = length === undefined ? reader.len : reader.pos + length;
        const message = createBaseCommitInfo();
        while (reader.pos < end) {
            const tag = reader.uint32();
            switch (tag >>> 3) {
                case 1:
                    message.version = reader.int64();
                    break;
                case 2:
                    message.storeInfos.push(StoreInfo.decode(reader, reader.uint32()));
                    break;
                case 3:
                    message.timestamp = fromTimestamp(Timestamp.decode(reader, reader.uint32()));
                    break;
                default:
                    reader.skipType(tag & 7);
                    break;
            }
        }
        return message;
    },
    fromPartial(object) {
        const message = createBaseCommitInfo();
        message.version = object.version !== undefined && object.version !== null ? BigInt(object.version.toString()) : BigInt(0);
        message.storeInfos = object.storeInfos?.map(e => StoreInfo.fromPartial(e)) || [];
        message.timestamp = object.timestamp ?? undefined;
        return message;
    },
    fromAmino(object) {
        const message = createBaseCommitInfo();
        if (object.version !== undefined && object.version !== null) {
            message.version = BigInt(object.version);
        }
        message.storeInfos = object.store_infos?.map(e => StoreInfo.fromAmino(e)) || [];
        if (object.timestamp !== undefined && object.timestamp !== null) {
            message.timestamp = fromTimestamp(Timestamp.fromAmino(object.timestamp));
        }
        return message;
    },
    toAmino(message) {
        const obj = {};
        obj.version = message.version !== BigInt(0) ? message.version?.toString() : undefined;
        if (message.storeInfos) {
            obj.store_infos = message.storeInfos.map(e => e ? StoreInfo.toAmino(e) : undefined);
        }
        else {
            obj.store_infos = message.storeInfos;
        }
        obj.timestamp = message.timestamp ? Timestamp.toAmino(toTimestamp(message.timestamp)) : undefined;
        return obj;
    },
    fromAminoMsg(object) {
        return CommitInfo.fromAmino(object.value);
    },
    toAminoMsg(message) {
        return {
            type: "cosmos-sdk/CommitInfo",
            value: CommitInfo.toAmino(message)
        };
    },
    fromProtoMsg(message) {
        return CommitInfo.decode(message.value);
    },
    toProto(message) {
        return CommitInfo.encode(message).finish();
    },
    toProtoMsg(message) {
        return {
            typeUrl: "/cosmos.store.v1beta1.CommitInfo",
            value: CommitInfo.encode(message).finish()
        };
    }
};
GlobalDecoderRegistry.register(CommitInfo.typeUrl, CommitInfo);
GlobalDecoderRegistry.registerAminoProtoMapping(CommitInfo.aminoType, CommitInfo.typeUrl);
function createBaseStoreInfo() {
    return {
        name: "",
        commitId: CommitID.fromPartial({})
    };
}
export const StoreInfo = {
    typeUrl: "/cosmos.store.v1beta1.StoreInfo",
    aminoType: "cosmos-sdk/StoreInfo",
    is(o) {
        return o && (o.$typeUrl === StoreInfo.typeUrl || typeof o.name === "string" && CommitID.is(o.commitId));
    },
    isSDK(o) {
        return o && (o.$typeUrl === StoreInfo.typeUrl || typeof o.name === "string" && CommitID.isSDK(o.commit_id));
    },
    isAmino(o) {
        return o && (o.$typeUrl === StoreInfo.typeUrl || typeof o.name === "string" && CommitID.isAmino(o.commit_id));
    },
    encode(message, writer = BinaryWriter.create()) {
        if (message.name !== "") {
            writer.uint32(10).string(message.name);
        }
        if (message.commitId !== undefined) {
            CommitID.encode(message.commitId, writer.uint32(18).fork()).ldelim();
        }
        return writer;
    },
    decode(input, length) {
        const reader = input instanceof BinaryReader ? input : new BinaryReader(input);
        let end = length === undefined ? reader.len : reader.pos + length;
        const message = createBaseStoreInfo();
        while (reader.pos < end) {
            const tag = reader.uint32();
            switch (tag >>> 3) {
                case 1:
                    message.name = reader.string();
                    break;
                case 2:
                    message.commitId = CommitID.decode(reader, reader.uint32());
                    break;
                default:
                    reader.skipType(tag & 7);
                    break;
            }
        }
        return message;
    },
    fromPartial(object) {
        const message = createBaseStoreInfo();
        message.name = object.name ?? "";
        message.commitId = object.commitId !== undefined && object.commitId !== null ? CommitID.fromPartial(object.commitId) : undefined;
        return message;
    },
    fromAmino(object) {
        const message = createBaseStoreInfo();
        if (object.name !== undefined && object.name !== null) {
            message.name = object.name;
        }
        if (object.commit_id !== undefined && object.commit_id !== null) {
            message.commitId = CommitID.fromAmino(object.commit_id);
        }
        return message;
    },
    toAmino(message) {
        const obj = {};
        obj.name = message.name === "" ? undefined : message.name;
        obj.commit_id = message.commitId ? CommitID.toAmino(message.commitId) : undefined;
        return obj;
    },
    fromAminoMsg(object) {
        return StoreInfo.fromAmino(object.value);
    },
    toAminoMsg(message) {
        return {
            type: "cosmos-sdk/StoreInfo",
            value: StoreInfo.toAmino(message)
        };
    },
    fromProtoMsg(message) {
        return StoreInfo.decode(message.value);
    },
    toProto(message) {
        return StoreInfo.encode(message).finish();
    },
    toProtoMsg(message) {
        return {
            typeUrl: "/cosmos.store.v1beta1.StoreInfo",
            value: StoreInfo.encode(message).finish()
        };
    }
};
GlobalDecoderRegistry.register(StoreInfo.typeUrl, StoreInfo);
GlobalDecoderRegistry.registerAminoProtoMapping(StoreInfo.aminoType, StoreInfo.typeUrl);
function createBaseCommitID() {
    return {
        version: BigInt(0),
        hash: new Uint8Array()
    };
}
export const CommitID = {
    typeUrl: "/cosmos.store.v1beta1.CommitID",
    aminoType: "cosmos-sdk/CommitID",
    is(o) {
        return o && (o.$typeUrl === CommitID.typeUrl || typeof o.version === "bigint" && (o.hash instanceof Uint8Array || typeof o.hash === "string"));
    },
    isSDK(o) {
        return o && (o.$typeUrl === CommitID.typeUrl || typeof o.version === "bigint" && (o.hash instanceof Uint8Array || typeof o.hash === "string"));
    },
    isAmino(o) {
        return o && (o.$typeUrl === CommitID.typeUrl || typeof o.version === "bigint" && (o.hash instanceof Uint8Array || typeof o.hash === "string"));
    },
    encode(message, writer = BinaryWriter.create()) {
        if (message.version !== BigInt(0)) {
            writer.uint32(8).int64(message.version);
        }
        if (message.hash.length !== 0) {
            writer.uint32(18).bytes(message.hash);
        }
        return writer;
    },
    decode(input, length) {
        const reader = input instanceof BinaryReader ? input : new BinaryReader(input);
        let end = length === undefined ? reader.len : reader.pos + length;
        const message = createBaseCommitID();
        while (reader.pos < end) {
            const tag = reader.uint32();
            switch (tag >>> 3) {
                case 1:
                    message.version = reader.int64();
                    break;
                case 2:
                    message.hash = reader.bytes();
                    break;
                default:
                    reader.skipType(tag & 7);
                    break;
            }
        }
        return message;
    },
    fromPartial(object) {
        const message = createBaseCommitID();
        message.version = object.version !== undefined && object.version !== null ? BigInt(object.version.toString()) : BigInt(0);
        message.hash = object.hash ?? new Uint8Array();
        return message;
    },
    fromAmino(object) {
        const message = createBaseCommitID();
        if (object.version !== undefined && object.version !== null) {
            message.version = BigInt(object.version);
        }
        if (object.hash !== undefined && object.hash !== null) {
            message.hash = bytesFromBase64(object.hash);
        }
        return message;
    },
    toAmino(message) {
        const obj = {};
        obj.version = message.version !== BigInt(0) ? message.version?.toString() : undefined;
        obj.hash = message.hash ? base64FromBytes(message.hash) : undefined;
        return obj;
    },
    fromAminoMsg(object) {
        return CommitID.fromAmino(object.value);
    },
    toAminoMsg(message) {
        return {
            type: "cosmos-sdk/CommitID",
            value: CommitID.toAmino(message)
        };
    },
    fromProtoMsg(message) {
        return CommitID.decode(message.value);
    },
    toProto(message) {
        return CommitID.encode(message).finish();
    },
    toProtoMsg(message) {
        return {
            typeUrl: "/cosmos.store.v1beta1.CommitID",
            value: CommitID.encode(message).finish()
        };
    }
};
GlobalDecoderRegistry.register(CommitID.typeUrl, CommitID);
GlobalDecoderRegistry.registerAminoProtoMapping(CommitID.aminoType, CommitID.typeUrl);
