//@ts-nocheck
import { AssetPosition } from "./asset_position";
import { PerpetualPosition } from "./perpetual_position";
import { BinaryReader, BinaryWriter } from "../../binary";
import { GlobalDecoderRegistry } from "../../registry";
function createBaseSubaccountId() {
    return {
        owner: "",
        number: 0
    };
}
export const SubaccountId = {
    typeUrl: "/klyraprotocol.subaccounts.SubaccountId",
    is(o) {
        return o && (o.$typeUrl === SubaccountId.typeUrl || typeof o.owner === "string" && typeof o.number === "number");
    },
    isSDK(o) {
        return o && (o.$typeUrl === SubaccountId.typeUrl || typeof o.owner === "string" && typeof o.number === "number");
    },
    isAmino(o) {
        return o && (o.$typeUrl === SubaccountId.typeUrl || typeof o.owner === "string" && typeof o.number === "number");
    },
    encode(message, writer = BinaryWriter.create()) {
        if (message.owner !== "") {
            writer.uint32(10).string(message.owner);
        }
        if (message.number !== 0) {
            writer.uint32(16).uint32(message.number);
        }
        return writer;
    },
    decode(input, length) {
        const reader = input instanceof BinaryReader ? input : new BinaryReader(input);
        let end = length === undefined ? reader.len : reader.pos + length;
        const message = createBaseSubaccountId();
        while (reader.pos < end) {
            const tag = reader.uint32();
            switch (tag >>> 3) {
                case 1:
                    message.owner = reader.string();
                    break;
                case 2:
                    message.number = reader.uint32();
                    break;
                default:
                    reader.skipType(tag & 7);
                    break;
            }
        }
        return message;
    },
    fromPartial(object) {
        const message = createBaseSubaccountId();
        message.owner = object.owner ?? "";
        message.number = object.number ?? 0;
        return message;
    },
    fromAmino(object) {
        const message = createBaseSubaccountId();
        if (object.owner !== undefined && object.owner !== null) {
            message.owner = object.owner;
        }
        if (object.number !== undefined && object.number !== null) {
            message.number = object.number;
        }
        return message;
    },
    toAmino(message) {
        const obj = {};
        obj.owner = message.owner === "" ? undefined : message.owner;
        obj.number = message.number === 0 ? undefined : message.number;
        return obj;
    },
    fromAminoMsg(object) {
        return SubaccountId.fromAmino(object.value);
    },
    fromProtoMsg(message) {
        return SubaccountId.decode(message.value);
    },
    toProto(message) {
        return SubaccountId.encode(message).finish();
    },
    toProtoMsg(message) {
        return {
            typeUrl: "/klyraprotocol.subaccounts.SubaccountId",
            value: SubaccountId.encode(message).finish()
        };
    }
};
GlobalDecoderRegistry.register(SubaccountId.typeUrl, SubaccountId);
function createBaseSubaccount() {
    return {
        id: undefined,
        assetPositions: [],
        perpetualPositions: [],
        marginEnabled: false,
        assetYieldIndex: ""
    };
}
export const Subaccount = {
    typeUrl: "/klyraprotocol.subaccounts.Subaccount",
    is(o) {
        return o && (o.$typeUrl === Subaccount.typeUrl || Array.isArray(o.assetPositions) && (!o.assetPositions.length || AssetPosition.is(o.assetPositions[0])) && Array.isArray(o.perpetualPositions) && (!o.perpetualPositions.length || PerpetualPosition.is(o.perpetualPositions[0])) && typeof o.marginEnabled === "boolean" && typeof o.assetYieldIndex === "string");
    },
    isSDK(o) {
        return o && (o.$typeUrl === Subaccount.typeUrl || Array.isArray(o.asset_positions) && (!o.asset_positions.length || AssetPosition.isSDK(o.asset_positions[0])) && Array.isArray(o.perpetual_positions) && (!o.perpetual_positions.length || PerpetualPosition.isSDK(o.perpetual_positions[0])) && typeof o.margin_enabled === "boolean" && typeof o.asset_yield_index === "string");
    },
    isAmino(o) {
        return o && (o.$typeUrl === Subaccount.typeUrl || Array.isArray(o.asset_positions) && (!o.asset_positions.length || AssetPosition.isAmino(o.asset_positions[0])) && Array.isArray(o.perpetual_positions) && (!o.perpetual_positions.length || PerpetualPosition.isAmino(o.perpetual_positions[0])) && typeof o.margin_enabled === "boolean" && typeof o.asset_yield_index === "string");
    },
    encode(message, writer = BinaryWriter.create()) {
        if (message.id !== undefined) {
            SubaccountId.encode(message.id, writer.uint32(10).fork()).ldelim();
        }
        for (const v of message.assetPositions) {
            AssetPosition.encode(v, writer.uint32(18).fork()).ldelim();
        }
        for (const v of message.perpetualPositions) {
            PerpetualPosition.encode(v, writer.uint32(26).fork()).ldelim();
        }
        if (message.marginEnabled === true) {
            writer.uint32(32).bool(message.marginEnabled);
        }
        if (message.assetYieldIndex !== "") {
            writer.uint32(42).string(message.assetYieldIndex);
        }
        return writer;
    },
    decode(input, length) {
        const reader = input instanceof BinaryReader ? input : new BinaryReader(input);
        let end = length === undefined ? reader.len : reader.pos + length;
        const message = createBaseSubaccount();
        while (reader.pos < end) {
            const tag = reader.uint32();
            switch (tag >>> 3) {
                case 1:
                    message.id = SubaccountId.decode(reader, reader.uint32());
                    break;
                case 2:
                    message.assetPositions.push(AssetPosition.decode(reader, reader.uint32()));
                    break;
                case 3:
                    message.perpetualPositions.push(PerpetualPosition.decode(reader, reader.uint32()));
                    break;
                case 4:
                    message.marginEnabled = reader.bool();
                    break;
                case 5:
                    message.assetYieldIndex = reader.string();
                    break;
                default:
                    reader.skipType(tag & 7);
                    break;
            }
        }
        return message;
    },
    fromPartial(object) {
        const message = createBaseSubaccount();
        message.id = object.id !== undefined && object.id !== null ? SubaccountId.fromPartial(object.id) : undefined;
        message.assetPositions = object.assetPositions?.map(e => AssetPosition.fromPartial(e)) || [];
        message.perpetualPositions = object.perpetualPositions?.map(e => PerpetualPosition.fromPartial(e)) || [];
        message.marginEnabled = object.marginEnabled ?? false;
        message.assetYieldIndex = object.assetYieldIndex ?? "";
        return message;
    },
    fromAmino(object) {
        const message = createBaseSubaccount();
        if (object.id !== undefined && object.id !== null) {
            message.id = SubaccountId.fromAmino(object.id);
        }
        message.assetPositions = object.asset_positions?.map(e => AssetPosition.fromAmino(e)) || [];
        message.perpetualPositions = object.perpetual_positions?.map(e => PerpetualPosition.fromAmino(e)) || [];
        if (object.margin_enabled !== undefined && object.margin_enabled !== null) {
            message.marginEnabled = object.margin_enabled;
        }
        if (object.asset_yield_index !== undefined && object.asset_yield_index !== null) {
            message.assetYieldIndex = object.asset_yield_index;
        }
        return message;
    },
    toAmino(message) {
        const obj = {};
        obj.id = message.id ? SubaccountId.toAmino(message.id) : undefined;
        if (message.assetPositions) {
            obj.asset_positions = message.assetPositions.map(e => e ? AssetPosition.toAmino(e) : undefined);
        }
        else {
            obj.asset_positions = message.assetPositions;
        }
        if (message.perpetualPositions) {
            obj.perpetual_positions = message.perpetualPositions.map(e => e ? PerpetualPosition.toAmino(e) : undefined);
        }
        else {
            obj.perpetual_positions = message.perpetualPositions;
        }
        obj.margin_enabled = message.marginEnabled === false ? undefined : message.marginEnabled;
        obj.asset_yield_index = message.assetYieldIndex === "" ? undefined : message.assetYieldIndex;
        return obj;
    },
    fromAminoMsg(object) {
        return Subaccount.fromAmino(object.value);
    },
    fromProtoMsg(message) {
        return Subaccount.decode(message.value);
    },
    toProto(message) {
        return Subaccount.encode(message).finish();
    },
    toProtoMsg(message) {
        return {
            typeUrl: "/klyraprotocol.subaccounts.Subaccount",
            value: Subaccount.encode(message).finish()
        };
    }
};
GlobalDecoderRegistry.register(Subaccount.typeUrl, Subaccount);
