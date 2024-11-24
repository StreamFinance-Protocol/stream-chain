"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.Subaccount = exports.SubaccountId = void 0;
//@ts-nocheck
const asset_position_1 = require("./asset_position");
const perpetual_position_1 = require("./perpetual_position");
const binary_1 = require("../../binary");
const registry_1 = require("../../registry");
function createBaseSubaccountId() {
    return {
        owner: "",
        number: 0
    };
}
exports.SubaccountId = {
    typeUrl: "/klyraprotocol.subaccounts.SubaccountId",
    is(o) {
        return o && (o.$typeUrl === exports.SubaccountId.typeUrl || typeof o.owner === "string" && typeof o.number === "number");
    },
    isSDK(o) {
        return o && (o.$typeUrl === exports.SubaccountId.typeUrl || typeof o.owner === "string" && typeof o.number === "number");
    },
    isAmino(o) {
        return o && (o.$typeUrl === exports.SubaccountId.typeUrl || typeof o.owner === "string" && typeof o.number === "number");
    },
    encode(message, writer = binary_1.BinaryWriter.create()) {
        if (message.owner !== "") {
            writer.uint32(10).string(message.owner);
        }
        if (message.number !== 0) {
            writer.uint32(16).uint32(message.number);
        }
        return writer;
    },
    decode(input, length) {
        const reader = input instanceof binary_1.BinaryReader ? input : new binary_1.BinaryReader(input);
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
        return exports.SubaccountId.fromAmino(object.value);
    },
    fromProtoMsg(message) {
        return exports.SubaccountId.decode(message.value);
    },
    toProto(message) {
        return exports.SubaccountId.encode(message).finish();
    },
    toProtoMsg(message) {
        return {
            typeUrl: "/klyraprotocol.subaccounts.SubaccountId",
            value: exports.SubaccountId.encode(message).finish()
        };
    }
};
registry_1.GlobalDecoderRegistry.register(exports.SubaccountId.typeUrl, exports.SubaccountId);
function createBaseSubaccount() {
    return {
        id: undefined,
        assetPositions: [],
        perpetualPositions: [],
        marginEnabled: false,
        assetYieldIndex: ""
    };
}
exports.Subaccount = {
    typeUrl: "/klyraprotocol.subaccounts.Subaccount",
    is(o) {
        return o && (o.$typeUrl === exports.Subaccount.typeUrl || Array.isArray(o.assetPositions) && (!o.assetPositions.length || asset_position_1.AssetPosition.is(o.assetPositions[0])) && Array.isArray(o.perpetualPositions) && (!o.perpetualPositions.length || perpetual_position_1.PerpetualPosition.is(o.perpetualPositions[0])) && typeof o.marginEnabled === "boolean" && typeof o.assetYieldIndex === "string");
    },
    isSDK(o) {
        return o && (o.$typeUrl === exports.Subaccount.typeUrl || Array.isArray(o.asset_positions) && (!o.asset_positions.length || asset_position_1.AssetPosition.isSDK(o.asset_positions[0])) && Array.isArray(o.perpetual_positions) && (!o.perpetual_positions.length || perpetual_position_1.PerpetualPosition.isSDK(o.perpetual_positions[0])) && typeof o.margin_enabled === "boolean" && typeof o.asset_yield_index === "string");
    },
    isAmino(o) {
        return o && (o.$typeUrl === exports.Subaccount.typeUrl || Array.isArray(o.asset_positions) && (!o.asset_positions.length || asset_position_1.AssetPosition.isAmino(o.asset_positions[0])) && Array.isArray(o.perpetual_positions) && (!o.perpetual_positions.length || perpetual_position_1.PerpetualPosition.isAmino(o.perpetual_positions[0])) && typeof o.margin_enabled === "boolean" && typeof o.asset_yield_index === "string");
    },
    encode(message, writer = binary_1.BinaryWriter.create()) {
        if (message.id !== undefined) {
            exports.SubaccountId.encode(message.id, writer.uint32(10).fork()).ldelim();
        }
        for (const v of message.assetPositions) {
            asset_position_1.AssetPosition.encode(v, writer.uint32(18).fork()).ldelim();
        }
        for (const v of message.perpetualPositions) {
            perpetual_position_1.PerpetualPosition.encode(v, writer.uint32(26).fork()).ldelim();
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
        const reader = input instanceof binary_1.BinaryReader ? input : new binary_1.BinaryReader(input);
        let end = length === undefined ? reader.len : reader.pos + length;
        const message = createBaseSubaccount();
        while (reader.pos < end) {
            const tag = reader.uint32();
            switch (tag >>> 3) {
                case 1:
                    message.id = exports.SubaccountId.decode(reader, reader.uint32());
                    break;
                case 2:
                    message.assetPositions.push(asset_position_1.AssetPosition.decode(reader, reader.uint32()));
                    break;
                case 3:
                    message.perpetualPositions.push(perpetual_position_1.PerpetualPosition.decode(reader, reader.uint32()));
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
        message.id = object.id !== undefined && object.id !== null ? exports.SubaccountId.fromPartial(object.id) : undefined;
        message.assetPositions = object.assetPositions?.map(e => asset_position_1.AssetPosition.fromPartial(e)) || [];
        message.perpetualPositions = object.perpetualPositions?.map(e => perpetual_position_1.PerpetualPosition.fromPartial(e)) || [];
        message.marginEnabled = object.marginEnabled ?? false;
        message.assetYieldIndex = object.assetYieldIndex ?? "";
        return message;
    },
    fromAmino(object) {
        const message = createBaseSubaccount();
        if (object.id !== undefined && object.id !== null) {
            message.id = exports.SubaccountId.fromAmino(object.id);
        }
        message.assetPositions = object.asset_positions?.map(e => asset_position_1.AssetPosition.fromAmino(e)) || [];
        message.perpetualPositions = object.perpetual_positions?.map(e => perpetual_position_1.PerpetualPosition.fromAmino(e)) || [];
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
        obj.id = message.id ? exports.SubaccountId.toAmino(message.id) : undefined;
        if (message.assetPositions) {
            obj.asset_positions = message.assetPositions.map(e => e ? asset_position_1.AssetPosition.toAmino(e) : undefined);
        }
        else {
            obj.asset_positions = message.assetPositions;
        }
        if (message.perpetualPositions) {
            obj.perpetual_positions = message.perpetualPositions.map(e => e ? perpetual_position_1.PerpetualPosition.toAmino(e) : undefined);
        }
        else {
            obj.perpetual_positions = message.perpetualPositions;
        }
        obj.margin_enabled = message.marginEnabled === false ? undefined : message.marginEnabled;
        obj.asset_yield_index = message.assetYieldIndex === "" ? undefined : message.assetYieldIndex;
        return obj;
    },
    fromAminoMsg(object) {
        return exports.Subaccount.fromAmino(object.value);
    },
    fromProtoMsg(message) {
        return exports.Subaccount.decode(message.value);
    },
    toProto(message) {
        return exports.Subaccount.encode(message).finish();
    },
    toProtoMsg(message) {
        return {
            typeUrl: "/klyraprotocol.subaccounts.Subaccount",
            value: exports.Subaccount.encode(message).finish()
        };
    }
};
registry_1.GlobalDecoderRegistry.register(exports.Subaccount.typeUrl, exports.Subaccount);
