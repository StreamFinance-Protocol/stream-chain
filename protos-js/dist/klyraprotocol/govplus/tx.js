"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.MsgSlashValidatorResponse = exports.MsgSlashValidator = void 0;
//@ts-nocheck
const binary_1 = require("../../binary");
const math_1 = require("@cosmjs/math");
const helpers_1 = require("../../helpers");
const registry_1 = require("../../registry");
function createBaseMsgSlashValidator() {
    return {
        authority: "",
        validatorAddress: "",
        infractionHeight: 0,
        tokensAtInfractionHeight: new Uint8Array(),
        slashFactor: ""
    };
}
exports.MsgSlashValidator = {
    typeUrl: "/klyraprotocol.govplus.MsgSlashValidator",
    is(o) {
        return o && (o.$typeUrl === exports.MsgSlashValidator.typeUrl || typeof o.authority === "string" && typeof o.validatorAddress === "string" && typeof o.infractionHeight === "number" && (o.tokensAtInfractionHeight instanceof Uint8Array || typeof o.tokensAtInfractionHeight === "string") && typeof o.slashFactor === "string");
    },
    isSDK(o) {
        return o && (o.$typeUrl === exports.MsgSlashValidator.typeUrl || typeof o.authority === "string" && typeof o.validator_address === "string" && typeof o.infraction_height === "number" && (o.tokens_at_infraction_height instanceof Uint8Array || typeof o.tokens_at_infraction_height === "string") && typeof o.slash_factor === "string");
    },
    isAmino(o) {
        return o && (o.$typeUrl === exports.MsgSlashValidator.typeUrl || typeof o.authority === "string" && typeof o.validator_address === "string" && typeof o.infraction_height === "number" && (o.tokens_at_infraction_height instanceof Uint8Array || typeof o.tokens_at_infraction_height === "string") && typeof o.slash_factor === "string");
    },
    encode(message, writer = binary_1.BinaryWriter.create()) {
        if (message.authority !== "") {
            writer.uint32(10).string(message.authority);
        }
        if (message.validatorAddress !== "") {
            writer.uint32(18).string(message.validatorAddress);
        }
        if (message.infractionHeight !== 0) {
            writer.uint32(24).uint32(message.infractionHeight);
        }
        if (message.tokensAtInfractionHeight.length !== 0) {
            writer.uint32(34).bytes(message.tokensAtInfractionHeight);
        }
        if (message.slashFactor !== "") {
            writer.uint32(42).string(math_1.Decimal.fromUserInput(message.slashFactor, 18).atomics);
        }
        return writer;
    },
    decode(input, length) {
        const reader = input instanceof binary_1.BinaryReader ? input : new binary_1.BinaryReader(input);
        let end = length === undefined ? reader.len : reader.pos + length;
        const message = createBaseMsgSlashValidator();
        while (reader.pos < end) {
            const tag = reader.uint32();
            switch (tag >>> 3) {
                case 1:
                    message.authority = reader.string();
                    break;
                case 2:
                    message.validatorAddress = reader.string();
                    break;
                case 3:
                    message.infractionHeight = reader.uint32();
                    break;
                case 4:
                    message.tokensAtInfractionHeight = reader.bytes();
                    break;
                case 5:
                    message.slashFactor = math_1.Decimal.fromAtomics(reader.string(), 18).toString();
                    break;
                default:
                    reader.skipType(tag & 7);
                    break;
            }
        }
        return message;
    },
    fromPartial(object) {
        const message = createBaseMsgSlashValidator();
        message.authority = object.authority ?? "";
        message.validatorAddress = object.validatorAddress ?? "";
        message.infractionHeight = object.infractionHeight ?? 0;
        message.tokensAtInfractionHeight = object.tokensAtInfractionHeight ?? new Uint8Array();
        message.slashFactor = object.slashFactor ?? "";
        return message;
    },
    fromAmino(object) {
        const message = createBaseMsgSlashValidator();
        if (object.authority !== undefined && object.authority !== null) {
            message.authority = object.authority;
        }
        if (object.validator_address !== undefined && object.validator_address !== null) {
            message.validatorAddress = object.validator_address;
        }
        if (object.infraction_height !== undefined && object.infraction_height !== null) {
            message.infractionHeight = object.infraction_height;
        }
        if (object.tokens_at_infraction_height !== undefined && object.tokens_at_infraction_height !== null) {
            message.tokensAtInfractionHeight = (0, helpers_1.bytesFromBase64)(object.tokens_at_infraction_height);
        }
        if (object.slash_factor !== undefined && object.slash_factor !== null) {
            message.slashFactor = object.slash_factor;
        }
        return message;
    },
    toAmino(message) {
        const obj = {};
        obj.authority = message.authority === "" ? undefined : message.authority;
        obj.validator_address = message.validatorAddress === "" ? undefined : message.validatorAddress;
        obj.infraction_height = message.infractionHeight === 0 ? undefined : message.infractionHeight;
        obj.tokens_at_infraction_height = message.tokensAtInfractionHeight ? (0, helpers_1.base64FromBytes)(message.tokensAtInfractionHeight) : undefined;
        obj.slash_factor = message.slashFactor ?? "";
        return obj;
    },
    fromAminoMsg(object) {
        return exports.MsgSlashValidator.fromAmino(object.value);
    },
    fromProtoMsg(message) {
        return exports.MsgSlashValidator.decode(message.value);
    },
    toProto(message) {
        return exports.MsgSlashValidator.encode(message).finish();
    },
    toProtoMsg(message) {
        return {
            typeUrl: "/klyraprotocol.govplus.MsgSlashValidator",
            value: exports.MsgSlashValidator.encode(message).finish()
        };
    }
};
registry_1.GlobalDecoderRegistry.register(exports.MsgSlashValidator.typeUrl, exports.MsgSlashValidator);
function createBaseMsgSlashValidatorResponse() {
    return {};
}
exports.MsgSlashValidatorResponse = {
    typeUrl: "/klyraprotocol.govplus.MsgSlashValidatorResponse",
    is(o) {
        return o && o.$typeUrl === exports.MsgSlashValidatorResponse.typeUrl;
    },
    isSDK(o) {
        return o && o.$typeUrl === exports.MsgSlashValidatorResponse.typeUrl;
    },
    isAmino(o) {
        return o && o.$typeUrl === exports.MsgSlashValidatorResponse.typeUrl;
    },
    encode(_, writer = binary_1.BinaryWriter.create()) {
        return writer;
    },
    decode(input, length) {
        const reader = input instanceof binary_1.BinaryReader ? input : new binary_1.BinaryReader(input);
        let end = length === undefined ? reader.len : reader.pos + length;
        const message = createBaseMsgSlashValidatorResponse();
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
        const message = createBaseMsgSlashValidatorResponse();
        return message;
    },
    fromAmino(_) {
        const message = createBaseMsgSlashValidatorResponse();
        return message;
    },
    toAmino(_) {
        const obj = {};
        return obj;
    },
    fromAminoMsg(object) {
        return exports.MsgSlashValidatorResponse.fromAmino(object.value);
    },
    fromProtoMsg(message) {
        return exports.MsgSlashValidatorResponse.decode(message.value);
    },
    toProto(message) {
        return exports.MsgSlashValidatorResponse.encode(message).finish();
    },
    toProtoMsg(message) {
        return {
            typeUrl: "/klyraprotocol.govplus.MsgSlashValidatorResponse",
            value: exports.MsgSlashValidatorResponse.encode(message).finish()
        };
    }
};
registry_1.GlobalDecoderRegistry.register(exports.MsgSlashValidatorResponse.typeUrl, exports.MsgSlashValidatorResponse);
