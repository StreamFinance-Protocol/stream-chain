//@ts-nocheck
import { BinaryReader, BinaryWriter } from "../../binary";
import { bytesFromBase64, base64FromBytes } from "../../helpers";
import { GlobalDecoderRegistry } from "../../registry";
function createBaseAssetPosition() {
    return {
        assetId: 0,
        quantums: new Uint8Array(),
        index: BigInt(0)
    };
}
export const AssetPosition = {
    typeUrl: "/klyraprotocol.subaccounts.AssetPosition",
    is(o) {
        return o && (o.$typeUrl === AssetPosition.typeUrl || typeof o.assetId === "number" && (o.quantums instanceof Uint8Array || typeof o.quantums === "string") && typeof o.index === "bigint");
    },
    isSDK(o) {
        return o && (o.$typeUrl === AssetPosition.typeUrl || typeof o.asset_id === "number" && (o.quantums instanceof Uint8Array || typeof o.quantums === "string") && typeof o.index === "bigint");
    },
    isAmino(o) {
        return o && (o.$typeUrl === AssetPosition.typeUrl || typeof o.asset_id === "number" && (o.quantums instanceof Uint8Array || typeof o.quantums === "string") && typeof o.index === "bigint");
    },
    encode(message, writer = BinaryWriter.create()) {
        if (message.assetId !== 0) {
            writer.uint32(8).uint32(message.assetId);
        }
        if (message.quantums.length !== 0) {
            writer.uint32(18).bytes(message.quantums);
        }
        if (message.index !== BigInt(0)) {
            writer.uint32(24).uint64(message.index);
        }
        return writer;
    },
    decode(input, length) {
        const reader = input instanceof BinaryReader ? input : new BinaryReader(input);
        let end = length === undefined ? reader.len : reader.pos + length;
        const message = createBaseAssetPosition();
        while (reader.pos < end) {
            const tag = reader.uint32();
            switch (tag >>> 3) {
                case 1:
                    message.assetId = reader.uint32();
                    break;
                case 2:
                    message.quantums = reader.bytes();
                    break;
                case 3:
                    message.index = reader.uint64();
                    break;
                default:
                    reader.skipType(tag & 7);
                    break;
            }
        }
        return message;
    },
    fromPartial(object) {
        const message = createBaseAssetPosition();
        message.assetId = object.assetId ?? 0;
        message.quantums = object.quantums ?? new Uint8Array();
        message.index = object.index !== undefined && object.index !== null ? BigInt(object.index.toString()) : BigInt(0);
        return message;
    },
    fromAmino(object) {
        const message = createBaseAssetPosition();
        if (object.asset_id !== undefined && object.asset_id !== null) {
            message.assetId = object.asset_id;
        }
        if (object.quantums !== undefined && object.quantums !== null) {
            message.quantums = bytesFromBase64(object.quantums);
        }
        if (object.index !== undefined && object.index !== null) {
            message.index = BigInt(object.index);
        }
        return message;
    },
    toAmino(message) {
        const obj = {};
        obj.asset_id = message.assetId === 0 ? undefined : message.assetId;
        obj.quantums = message.quantums ? base64FromBytes(message.quantums) : undefined;
        obj.index = message.index !== BigInt(0) ? message.index?.toString() : undefined;
        return obj;
    },
    fromAminoMsg(object) {
        return AssetPosition.fromAmino(object.value);
    },
    fromProtoMsg(message) {
        return AssetPosition.decode(message.value);
    },
    toProto(message) {
        return AssetPosition.encode(message).finish();
    },
    toProtoMsg(message) {
        return {
            typeUrl: "/klyraprotocol.subaccounts.AssetPosition",
            value: AssetPosition.encode(message).finish()
        };
    }
};
GlobalDecoderRegistry.register(AssetPosition.typeUrl, AssetPosition);
