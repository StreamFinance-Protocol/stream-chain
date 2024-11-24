//@ts-nocheck
import { PageRequest, PageResponse } from "../../cosmos/base/query/v1beta1/pagination";
import { Asset } from "./asset";
import { BinaryReader, BinaryWriter } from "../../binary";
import { GlobalDecoderRegistry } from "../../registry";
function createBaseQueryAssetRequest() {
    return {
        id: 0
    };
}
export const QueryAssetRequest = {
    typeUrl: "/klyraprotocol.assets.QueryAssetRequest",
    is(o) {
        return o && (o.$typeUrl === QueryAssetRequest.typeUrl || typeof o.id === "number");
    },
    isSDK(o) {
        return o && (o.$typeUrl === QueryAssetRequest.typeUrl || typeof o.id === "number");
    },
    isAmino(o) {
        return o && (o.$typeUrl === QueryAssetRequest.typeUrl || typeof o.id === "number");
    },
    encode(message, writer = BinaryWriter.create()) {
        if (message.id !== 0) {
            writer.uint32(8).uint32(message.id);
        }
        return writer;
    },
    decode(input, length) {
        const reader = input instanceof BinaryReader ? input : new BinaryReader(input);
        let end = length === undefined ? reader.len : reader.pos + length;
        const message = createBaseQueryAssetRequest();
        while (reader.pos < end) {
            const tag = reader.uint32();
            switch (tag >>> 3) {
                case 1:
                    message.id = reader.uint32();
                    break;
                default:
                    reader.skipType(tag & 7);
                    break;
            }
        }
        return message;
    },
    fromPartial(object) {
        const message = createBaseQueryAssetRequest();
        message.id = object.id ?? 0;
        return message;
    },
    fromAmino(object) {
        const message = createBaseQueryAssetRequest();
        if (object.id !== undefined && object.id !== null) {
            message.id = object.id;
        }
        return message;
    },
    toAmino(message) {
        const obj = {};
        obj.id = message.id === 0 ? undefined : message.id;
        return obj;
    },
    fromAminoMsg(object) {
        return QueryAssetRequest.fromAmino(object.value);
    },
    fromProtoMsg(message) {
        return QueryAssetRequest.decode(message.value);
    },
    toProto(message) {
        return QueryAssetRequest.encode(message).finish();
    },
    toProtoMsg(message) {
        return {
            typeUrl: "/klyraprotocol.assets.QueryAssetRequest",
            value: QueryAssetRequest.encode(message).finish()
        };
    }
};
GlobalDecoderRegistry.register(QueryAssetRequest.typeUrl, QueryAssetRequest);
function createBaseQueryAssetResponse() {
    return {
        asset: Asset.fromPartial({})
    };
}
export const QueryAssetResponse = {
    typeUrl: "/klyraprotocol.assets.QueryAssetResponse",
    is(o) {
        return o && (o.$typeUrl === QueryAssetResponse.typeUrl || Asset.is(o.asset));
    },
    isSDK(o) {
        return o && (o.$typeUrl === QueryAssetResponse.typeUrl || Asset.isSDK(o.asset));
    },
    isAmino(o) {
        return o && (o.$typeUrl === QueryAssetResponse.typeUrl || Asset.isAmino(o.asset));
    },
    encode(message, writer = BinaryWriter.create()) {
        if (message.asset !== undefined) {
            Asset.encode(message.asset, writer.uint32(10).fork()).ldelim();
        }
        return writer;
    },
    decode(input, length) {
        const reader = input instanceof BinaryReader ? input : new BinaryReader(input);
        let end = length === undefined ? reader.len : reader.pos + length;
        const message = createBaseQueryAssetResponse();
        while (reader.pos < end) {
            const tag = reader.uint32();
            switch (tag >>> 3) {
                case 1:
                    message.asset = Asset.decode(reader, reader.uint32());
                    break;
                default:
                    reader.skipType(tag & 7);
                    break;
            }
        }
        return message;
    },
    fromPartial(object) {
        const message = createBaseQueryAssetResponse();
        message.asset = object.asset !== undefined && object.asset !== null ? Asset.fromPartial(object.asset) : undefined;
        return message;
    },
    fromAmino(object) {
        const message = createBaseQueryAssetResponse();
        if (object.asset !== undefined && object.asset !== null) {
            message.asset = Asset.fromAmino(object.asset);
        }
        return message;
    },
    toAmino(message) {
        const obj = {};
        obj.asset = message.asset ? Asset.toAmino(message.asset) : undefined;
        return obj;
    },
    fromAminoMsg(object) {
        return QueryAssetResponse.fromAmino(object.value);
    },
    fromProtoMsg(message) {
        return QueryAssetResponse.decode(message.value);
    },
    toProto(message) {
        return QueryAssetResponse.encode(message).finish();
    },
    toProtoMsg(message) {
        return {
            typeUrl: "/klyraprotocol.assets.QueryAssetResponse",
            value: QueryAssetResponse.encode(message).finish()
        };
    }
};
GlobalDecoderRegistry.register(QueryAssetResponse.typeUrl, QueryAssetResponse);
function createBaseQueryAllAssetsRequest() {
    return {
        pagination: undefined
    };
}
export const QueryAllAssetsRequest = {
    typeUrl: "/klyraprotocol.assets.QueryAllAssetsRequest",
    is(o) {
        return o && o.$typeUrl === QueryAllAssetsRequest.typeUrl;
    },
    isSDK(o) {
        return o && o.$typeUrl === QueryAllAssetsRequest.typeUrl;
    },
    isAmino(o) {
        return o && o.$typeUrl === QueryAllAssetsRequest.typeUrl;
    },
    encode(message, writer = BinaryWriter.create()) {
        if (message.pagination !== undefined) {
            PageRequest.encode(message.pagination, writer.uint32(10).fork()).ldelim();
        }
        return writer;
    },
    decode(input, length) {
        const reader = input instanceof BinaryReader ? input : new BinaryReader(input);
        let end = length === undefined ? reader.len : reader.pos + length;
        const message = createBaseQueryAllAssetsRequest();
        while (reader.pos < end) {
            const tag = reader.uint32();
            switch (tag >>> 3) {
                case 1:
                    message.pagination = PageRequest.decode(reader, reader.uint32());
                    break;
                default:
                    reader.skipType(tag & 7);
                    break;
            }
        }
        return message;
    },
    fromPartial(object) {
        const message = createBaseQueryAllAssetsRequest();
        message.pagination = object.pagination !== undefined && object.pagination !== null ? PageRequest.fromPartial(object.pagination) : undefined;
        return message;
    },
    fromAmino(object) {
        const message = createBaseQueryAllAssetsRequest();
        if (object.pagination !== undefined && object.pagination !== null) {
            message.pagination = PageRequest.fromAmino(object.pagination);
        }
        return message;
    },
    toAmino(message) {
        const obj = {};
        obj.pagination = message.pagination ? PageRequest.toAmino(message.pagination) : undefined;
        return obj;
    },
    fromAminoMsg(object) {
        return QueryAllAssetsRequest.fromAmino(object.value);
    },
    fromProtoMsg(message) {
        return QueryAllAssetsRequest.decode(message.value);
    },
    toProto(message) {
        return QueryAllAssetsRequest.encode(message).finish();
    },
    toProtoMsg(message) {
        return {
            typeUrl: "/klyraprotocol.assets.QueryAllAssetsRequest",
            value: QueryAllAssetsRequest.encode(message).finish()
        };
    }
};
GlobalDecoderRegistry.register(QueryAllAssetsRequest.typeUrl, QueryAllAssetsRequest);
function createBaseQueryAllAssetsResponse() {
    return {
        asset: [],
        pagination: undefined
    };
}
export const QueryAllAssetsResponse = {
    typeUrl: "/klyraprotocol.assets.QueryAllAssetsResponse",
    is(o) {
        return o && (o.$typeUrl === QueryAllAssetsResponse.typeUrl || Array.isArray(o.asset) && (!o.asset.length || Asset.is(o.asset[0])));
    },
    isSDK(o) {
        return o && (o.$typeUrl === QueryAllAssetsResponse.typeUrl || Array.isArray(o.asset) && (!o.asset.length || Asset.isSDK(o.asset[0])));
    },
    isAmino(o) {
        return o && (o.$typeUrl === QueryAllAssetsResponse.typeUrl || Array.isArray(o.asset) && (!o.asset.length || Asset.isAmino(o.asset[0])));
    },
    encode(message, writer = BinaryWriter.create()) {
        for (const v of message.asset) {
            Asset.encode(v, writer.uint32(10).fork()).ldelim();
        }
        if (message.pagination !== undefined) {
            PageResponse.encode(message.pagination, writer.uint32(18).fork()).ldelim();
        }
        return writer;
    },
    decode(input, length) {
        const reader = input instanceof BinaryReader ? input : new BinaryReader(input);
        let end = length === undefined ? reader.len : reader.pos + length;
        const message = createBaseQueryAllAssetsResponse();
        while (reader.pos < end) {
            const tag = reader.uint32();
            switch (tag >>> 3) {
                case 1:
                    message.asset.push(Asset.decode(reader, reader.uint32()));
                    break;
                case 2:
                    message.pagination = PageResponse.decode(reader, reader.uint32());
                    break;
                default:
                    reader.skipType(tag & 7);
                    break;
            }
        }
        return message;
    },
    fromPartial(object) {
        const message = createBaseQueryAllAssetsResponse();
        message.asset = object.asset?.map(e => Asset.fromPartial(e)) || [];
        message.pagination = object.pagination !== undefined && object.pagination !== null ? PageResponse.fromPartial(object.pagination) : undefined;
        return message;
    },
    fromAmino(object) {
        const message = createBaseQueryAllAssetsResponse();
        message.asset = object.asset?.map(e => Asset.fromAmino(e)) || [];
        if (object.pagination !== undefined && object.pagination !== null) {
            message.pagination = PageResponse.fromAmino(object.pagination);
        }
        return message;
    },
    toAmino(message) {
        const obj = {};
        if (message.asset) {
            obj.asset = message.asset.map(e => e ? Asset.toAmino(e) : undefined);
        }
        else {
            obj.asset = message.asset;
        }
        obj.pagination = message.pagination ? PageResponse.toAmino(message.pagination) : undefined;
        return obj;
    },
    fromAminoMsg(object) {
        return QueryAllAssetsResponse.fromAmino(object.value);
    },
    fromProtoMsg(message) {
        return QueryAllAssetsResponse.decode(message.value);
    },
    toProto(message) {
        return QueryAllAssetsResponse.encode(message).finish();
    },
    toProtoMsg(message) {
        return {
            typeUrl: "/klyraprotocol.assets.QueryAllAssetsResponse",
            value: QueryAllAssetsResponse.encode(message).finish()
        };
    }
};
GlobalDecoderRegistry.register(QueryAllAssetsResponse.typeUrl, QueryAllAssetsResponse);
