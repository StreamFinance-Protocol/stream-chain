"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.QueryAllAssetsResponse = exports.QueryAllAssetsRequest = exports.QueryAssetResponse = exports.QueryAssetRequest = void 0;
//@ts-nocheck
const pagination_1 = require("../../cosmos/base/query/v1beta1/pagination");
const asset_1 = require("./asset");
const binary_1 = require("../../binary");
const registry_1 = require("../../registry");
function createBaseQueryAssetRequest() {
    return {
        id: 0
    };
}
exports.QueryAssetRequest = {
    typeUrl: "/klyraprotocol.assets.QueryAssetRequest",
    is(o) {
        return o && (o.$typeUrl === exports.QueryAssetRequest.typeUrl || typeof o.id === "number");
    },
    isSDK(o) {
        return o && (o.$typeUrl === exports.QueryAssetRequest.typeUrl || typeof o.id === "number");
    },
    isAmino(o) {
        return o && (o.$typeUrl === exports.QueryAssetRequest.typeUrl || typeof o.id === "number");
    },
    encode(message, writer = binary_1.BinaryWriter.create()) {
        if (message.id !== 0) {
            writer.uint32(8).uint32(message.id);
        }
        return writer;
    },
    decode(input, length) {
        const reader = input instanceof binary_1.BinaryReader ? input : new binary_1.BinaryReader(input);
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
        return exports.QueryAssetRequest.fromAmino(object.value);
    },
    fromProtoMsg(message) {
        return exports.QueryAssetRequest.decode(message.value);
    },
    toProto(message) {
        return exports.QueryAssetRequest.encode(message).finish();
    },
    toProtoMsg(message) {
        return {
            typeUrl: "/klyraprotocol.assets.QueryAssetRequest",
            value: exports.QueryAssetRequest.encode(message).finish()
        };
    }
};
registry_1.GlobalDecoderRegistry.register(exports.QueryAssetRequest.typeUrl, exports.QueryAssetRequest);
function createBaseQueryAssetResponse() {
    return {
        asset: asset_1.Asset.fromPartial({})
    };
}
exports.QueryAssetResponse = {
    typeUrl: "/klyraprotocol.assets.QueryAssetResponse",
    is(o) {
        return o && (o.$typeUrl === exports.QueryAssetResponse.typeUrl || asset_1.Asset.is(o.asset));
    },
    isSDK(o) {
        return o && (o.$typeUrl === exports.QueryAssetResponse.typeUrl || asset_1.Asset.isSDK(o.asset));
    },
    isAmino(o) {
        return o && (o.$typeUrl === exports.QueryAssetResponse.typeUrl || asset_1.Asset.isAmino(o.asset));
    },
    encode(message, writer = binary_1.BinaryWriter.create()) {
        if (message.asset !== undefined) {
            asset_1.Asset.encode(message.asset, writer.uint32(10).fork()).ldelim();
        }
        return writer;
    },
    decode(input, length) {
        const reader = input instanceof binary_1.BinaryReader ? input : new binary_1.BinaryReader(input);
        let end = length === undefined ? reader.len : reader.pos + length;
        const message = createBaseQueryAssetResponse();
        while (reader.pos < end) {
            const tag = reader.uint32();
            switch (tag >>> 3) {
                case 1:
                    message.asset = asset_1.Asset.decode(reader, reader.uint32());
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
        message.asset = object.asset !== undefined && object.asset !== null ? asset_1.Asset.fromPartial(object.asset) : undefined;
        return message;
    },
    fromAmino(object) {
        const message = createBaseQueryAssetResponse();
        if (object.asset !== undefined && object.asset !== null) {
            message.asset = asset_1.Asset.fromAmino(object.asset);
        }
        return message;
    },
    toAmino(message) {
        const obj = {};
        obj.asset = message.asset ? asset_1.Asset.toAmino(message.asset) : undefined;
        return obj;
    },
    fromAminoMsg(object) {
        return exports.QueryAssetResponse.fromAmino(object.value);
    },
    fromProtoMsg(message) {
        return exports.QueryAssetResponse.decode(message.value);
    },
    toProto(message) {
        return exports.QueryAssetResponse.encode(message).finish();
    },
    toProtoMsg(message) {
        return {
            typeUrl: "/klyraprotocol.assets.QueryAssetResponse",
            value: exports.QueryAssetResponse.encode(message).finish()
        };
    }
};
registry_1.GlobalDecoderRegistry.register(exports.QueryAssetResponse.typeUrl, exports.QueryAssetResponse);
function createBaseQueryAllAssetsRequest() {
    return {
        pagination: undefined
    };
}
exports.QueryAllAssetsRequest = {
    typeUrl: "/klyraprotocol.assets.QueryAllAssetsRequest",
    is(o) {
        return o && o.$typeUrl === exports.QueryAllAssetsRequest.typeUrl;
    },
    isSDK(o) {
        return o && o.$typeUrl === exports.QueryAllAssetsRequest.typeUrl;
    },
    isAmino(o) {
        return o && o.$typeUrl === exports.QueryAllAssetsRequest.typeUrl;
    },
    encode(message, writer = binary_1.BinaryWriter.create()) {
        if (message.pagination !== undefined) {
            pagination_1.PageRequest.encode(message.pagination, writer.uint32(10).fork()).ldelim();
        }
        return writer;
    },
    decode(input, length) {
        const reader = input instanceof binary_1.BinaryReader ? input : new binary_1.BinaryReader(input);
        let end = length === undefined ? reader.len : reader.pos + length;
        const message = createBaseQueryAllAssetsRequest();
        while (reader.pos < end) {
            const tag = reader.uint32();
            switch (tag >>> 3) {
                case 1:
                    message.pagination = pagination_1.PageRequest.decode(reader, reader.uint32());
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
        message.pagination = object.pagination !== undefined && object.pagination !== null ? pagination_1.PageRequest.fromPartial(object.pagination) : undefined;
        return message;
    },
    fromAmino(object) {
        const message = createBaseQueryAllAssetsRequest();
        if (object.pagination !== undefined && object.pagination !== null) {
            message.pagination = pagination_1.PageRequest.fromAmino(object.pagination);
        }
        return message;
    },
    toAmino(message) {
        const obj = {};
        obj.pagination = message.pagination ? pagination_1.PageRequest.toAmino(message.pagination) : undefined;
        return obj;
    },
    fromAminoMsg(object) {
        return exports.QueryAllAssetsRequest.fromAmino(object.value);
    },
    fromProtoMsg(message) {
        return exports.QueryAllAssetsRequest.decode(message.value);
    },
    toProto(message) {
        return exports.QueryAllAssetsRequest.encode(message).finish();
    },
    toProtoMsg(message) {
        return {
            typeUrl: "/klyraprotocol.assets.QueryAllAssetsRequest",
            value: exports.QueryAllAssetsRequest.encode(message).finish()
        };
    }
};
registry_1.GlobalDecoderRegistry.register(exports.QueryAllAssetsRequest.typeUrl, exports.QueryAllAssetsRequest);
function createBaseQueryAllAssetsResponse() {
    return {
        asset: [],
        pagination: undefined
    };
}
exports.QueryAllAssetsResponse = {
    typeUrl: "/klyraprotocol.assets.QueryAllAssetsResponse",
    is(o) {
        return o && (o.$typeUrl === exports.QueryAllAssetsResponse.typeUrl || Array.isArray(o.asset) && (!o.asset.length || asset_1.Asset.is(o.asset[0])));
    },
    isSDK(o) {
        return o && (o.$typeUrl === exports.QueryAllAssetsResponse.typeUrl || Array.isArray(o.asset) && (!o.asset.length || asset_1.Asset.isSDK(o.asset[0])));
    },
    isAmino(o) {
        return o && (o.$typeUrl === exports.QueryAllAssetsResponse.typeUrl || Array.isArray(o.asset) && (!o.asset.length || asset_1.Asset.isAmino(o.asset[0])));
    },
    encode(message, writer = binary_1.BinaryWriter.create()) {
        for (const v of message.asset) {
            asset_1.Asset.encode(v, writer.uint32(10).fork()).ldelim();
        }
        if (message.pagination !== undefined) {
            pagination_1.PageResponse.encode(message.pagination, writer.uint32(18).fork()).ldelim();
        }
        return writer;
    },
    decode(input, length) {
        const reader = input instanceof binary_1.BinaryReader ? input : new binary_1.BinaryReader(input);
        let end = length === undefined ? reader.len : reader.pos + length;
        const message = createBaseQueryAllAssetsResponse();
        while (reader.pos < end) {
            const tag = reader.uint32();
            switch (tag >>> 3) {
                case 1:
                    message.asset.push(asset_1.Asset.decode(reader, reader.uint32()));
                    break;
                case 2:
                    message.pagination = pagination_1.PageResponse.decode(reader, reader.uint32());
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
        message.asset = object.asset?.map(e => asset_1.Asset.fromPartial(e)) || [];
        message.pagination = object.pagination !== undefined && object.pagination !== null ? pagination_1.PageResponse.fromPartial(object.pagination) : undefined;
        return message;
    },
    fromAmino(object) {
        const message = createBaseQueryAllAssetsResponse();
        message.asset = object.asset?.map(e => asset_1.Asset.fromAmino(e)) || [];
        if (object.pagination !== undefined && object.pagination !== null) {
            message.pagination = pagination_1.PageResponse.fromAmino(object.pagination);
        }
        return message;
    },
    toAmino(message) {
        const obj = {};
        if (message.asset) {
            obj.asset = message.asset.map(e => e ? asset_1.Asset.toAmino(e) : undefined);
        }
        else {
            obj.asset = message.asset;
        }
        obj.pagination = message.pagination ? pagination_1.PageResponse.toAmino(message.pagination) : undefined;
        return obj;
    },
    fromAminoMsg(object) {
        return exports.QueryAllAssetsResponse.fromAmino(object.value);
    },
    fromProtoMsg(message) {
        return exports.QueryAllAssetsResponse.decode(message.value);
    },
    toProto(message) {
        return exports.QueryAllAssetsResponse.encode(message).finish();
    },
    toProtoMsg(message) {
        return {
            typeUrl: "/klyraprotocol.assets.QueryAllAssetsResponse",
            value: exports.QueryAllAssetsResponse.encode(message).finish()
        };
    }
};
registry_1.GlobalDecoderRegistry.register(exports.QueryAllAssetsResponse.typeUrl, exports.QueryAllAssetsResponse);
