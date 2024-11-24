"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.MsgSetSendEnabledResponse = exports.MsgSetSendEnabled = exports.MsgUpdateParamsResponse = exports.MsgUpdateParams = exports.MsgMultiSendResponse = exports.MsgMultiSend = exports.MsgSendResponse = exports.MsgSend = void 0;
//@ts-nocheck
const coin_1 = require("../../base/v1beta1/coin");
const bank_1 = require("./bank");
const binary_1 = require("../../../binary");
const registry_1 = require("../../../registry");
function createBaseMsgSend() {
    return {
        fromAddress: "",
        toAddress: "",
        amount: []
    };
}
exports.MsgSend = {
    typeUrl: "/cosmos.bank.v1beta1.MsgSend",
    aminoType: "cosmos-sdk/MsgSend",
    is(o) {
        return o && (o.$typeUrl === exports.MsgSend.typeUrl || typeof o.fromAddress === "string" && typeof o.toAddress === "string" && Array.isArray(o.amount) && (!o.amount.length || coin_1.Coin.is(o.amount[0])));
    },
    isSDK(o) {
        return o && (o.$typeUrl === exports.MsgSend.typeUrl || typeof o.from_address === "string" && typeof o.to_address === "string" && Array.isArray(o.amount) && (!o.amount.length || coin_1.Coin.isSDK(o.amount[0])));
    },
    isAmino(o) {
        return o && (o.$typeUrl === exports.MsgSend.typeUrl || typeof o.from_address === "string" && typeof o.to_address === "string" && Array.isArray(o.amount) && (!o.amount.length || coin_1.Coin.isAmino(o.amount[0])));
    },
    encode(message, writer = binary_1.BinaryWriter.create()) {
        if (message.fromAddress !== "") {
            writer.uint32(10).string(message.fromAddress);
        }
        if (message.toAddress !== "") {
            writer.uint32(18).string(message.toAddress);
        }
        for (const v of message.amount) {
            coin_1.Coin.encode(v, writer.uint32(26).fork()).ldelim();
        }
        return writer;
    },
    decode(input, length) {
        const reader = input instanceof binary_1.BinaryReader ? input : new binary_1.BinaryReader(input);
        let end = length === undefined ? reader.len : reader.pos + length;
        const message = createBaseMsgSend();
        while (reader.pos < end) {
            const tag = reader.uint32();
            switch (tag >>> 3) {
                case 1:
                    message.fromAddress = reader.string();
                    break;
                case 2:
                    message.toAddress = reader.string();
                    break;
                case 3:
                    message.amount.push(coin_1.Coin.decode(reader, reader.uint32()));
                    break;
                default:
                    reader.skipType(tag & 7);
                    break;
            }
        }
        return message;
    },
    fromPartial(object) {
        const message = createBaseMsgSend();
        message.fromAddress = object.fromAddress ?? "";
        message.toAddress = object.toAddress ?? "";
        message.amount = object.amount?.map(e => coin_1.Coin.fromPartial(e)) || [];
        return message;
    },
    fromAmino(object) {
        const message = createBaseMsgSend();
        if (object.from_address !== undefined && object.from_address !== null) {
            message.fromAddress = object.from_address;
        }
        if (object.to_address !== undefined && object.to_address !== null) {
            message.toAddress = object.to_address;
        }
        message.amount = object.amount?.map(e => coin_1.Coin.fromAmino(e)) || [];
        return message;
    },
    toAmino(message) {
        const obj = {};
        obj.from_address = message.fromAddress === "" ? undefined : message.fromAddress;
        obj.to_address = message.toAddress === "" ? undefined : message.toAddress;
        if (message.amount) {
            obj.amount = message.amount.map(e => e ? coin_1.Coin.toAmino(e) : undefined);
        }
        else {
            obj.amount = message.amount;
        }
        return obj;
    },
    fromAminoMsg(object) {
        return exports.MsgSend.fromAmino(object.value);
    },
    toAminoMsg(message) {
        return {
            type: "cosmos-sdk/MsgSend",
            value: exports.MsgSend.toAmino(message)
        };
    },
    fromProtoMsg(message) {
        return exports.MsgSend.decode(message.value);
    },
    toProto(message) {
        return exports.MsgSend.encode(message).finish();
    },
    toProtoMsg(message) {
        return {
            typeUrl: "/cosmos.bank.v1beta1.MsgSend",
            value: exports.MsgSend.encode(message).finish()
        };
    }
};
registry_1.GlobalDecoderRegistry.register(exports.MsgSend.typeUrl, exports.MsgSend);
registry_1.GlobalDecoderRegistry.registerAminoProtoMapping(exports.MsgSend.aminoType, exports.MsgSend.typeUrl);
function createBaseMsgSendResponse() {
    return {};
}
exports.MsgSendResponse = {
    typeUrl: "/cosmos.bank.v1beta1.MsgSendResponse",
    aminoType: "cosmos-sdk/MsgSendResponse",
    is(o) {
        return o && o.$typeUrl === exports.MsgSendResponse.typeUrl;
    },
    isSDK(o) {
        return o && o.$typeUrl === exports.MsgSendResponse.typeUrl;
    },
    isAmino(o) {
        return o && o.$typeUrl === exports.MsgSendResponse.typeUrl;
    },
    encode(_, writer = binary_1.BinaryWriter.create()) {
        return writer;
    },
    decode(input, length) {
        const reader = input instanceof binary_1.BinaryReader ? input : new binary_1.BinaryReader(input);
        let end = length === undefined ? reader.len : reader.pos + length;
        const message = createBaseMsgSendResponse();
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
        const message = createBaseMsgSendResponse();
        return message;
    },
    fromAmino(_) {
        const message = createBaseMsgSendResponse();
        return message;
    },
    toAmino(_) {
        const obj = {};
        return obj;
    },
    fromAminoMsg(object) {
        return exports.MsgSendResponse.fromAmino(object.value);
    },
    toAminoMsg(message) {
        return {
            type: "cosmos-sdk/MsgSendResponse",
            value: exports.MsgSendResponse.toAmino(message)
        };
    },
    fromProtoMsg(message) {
        return exports.MsgSendResponse.decode(message.value);
    },
    toProto(message) {
        return exports.MsgSendResponse.encode(message).finish();
    },
    toProtoMsg(message) {
        return {
            typeUrl: "/cosmos.bank.v1beta1.MsgSendResponse",
            value: exports.MsgSendResponse.encode(message).finish()
        };
    }
};
registry_1.GlobalDecoderRegistry.register(exports.MsgSendResponse.typeUrl, exports.MsgSendResponse);
registry_1.GlobalDecoderRegistry.registerAminoProtoMapping(exports.MsgSendResponse.aminoType, exports.MsgSendResponse.typeUrl);
function createBaseMsgMultiSend() {
    return {
        inputs: [],
        outputs: []
    };
}
exports.MsgMultiSend = {
    typeUrl: "/cosmos.bank.v1beta1.MsgMultiSend",
    aminoType: "cosmos-sdk/MsgMultiSend",
    is(o) {
        return o && (o.$typeUrl === exports.MsgMultiSend.typeUrl || Array.isArray(o.inputs) && (!o.inputs.length || bank_1.Input.is(o.inputs[0])) && Array.isArray(o.outputs) && (!o.outputs.length || bank_1.Output.is(o.outputs[0])));
    },
    isSDK(o) {
        return o && (o.$typeUrl === exports.MsgMultiSend.typeUrl || Array.isArray(o.inputs) && (!o.inputs.length || bank_1.Input.isSDK(o.inputs[0])) && Array.isArray(o.outputs) && (!o.outputs.length || bank_1.Output.isSDK(o.outputs[0])));
    },
    isAmino(o) {
        return o && (o.$typeUrl === exports.MsgMultiSend.typeUrl || Array.isArray(o.inputs) && (!o.inputs.length || bank_1.Input.isAmino(o.inputs[0])) && Array.isArray(o.outputs) && (!o.outputs.length || bank_1.Output.isAmino(o.outputs[0])));
    },
    encode(message, writer = binary_1.BinaryWriter.create()) {
        for (const v of message.inputs) {
            bank_1.Input.encode(v, writer.uint32(10).fork()).ldelim();
        }
        for (const v of message.outputs) {
            bank_1.Output.encode(v, writer.uint32(18).fork()).ldelim();
        }
        return writer;
    },
    decode(input, length) {
        const reader = input instanceof binary_1.BinaryReader ? input : new binary_1.BinaryReader(input);
        let end = length === undefined ? reader.len : reader.pos + length;
        const message = createBaseMsgMultiSend();
        while (reader.pos < end) {
            const tag = reader.uint32();
            switch (tag >>> 3) {
                case 1:
                    message.inputs.push(bank_1.Input.decode(reader, reader.uint32()));
                    break;
                case 2:
                    message.outputs.push(bank_1.Output.decode(reader, reader.uint32()));
                    break;
                default:
                    reader.skipType(tag & 7);
                    break;
            }
        }
        return message;
    },
    fromPartial(object) {
        const message = createBaseMsgMultiSend();
        message.inputs = object.inputs?.map(e => bank_1.Input.fromPartial(e)) || [];
        message.outputs = object.outputs?.map(e => bank_1.Output.fromPartial(e)) || [];
        return message;
    },
    fromAmino(object) {
        const message = createBaseMsgMultiSend();
        message.inputs = object.inputs?.map(e => bank_1.Input.fromAmino(e)) || [];
        message.outputs = object.outputs?.map(e => bank_1.Output.fromAmino(e)) || [];
        return message;
    },
    toAmino(message) {
        const obj = {};
        if (message.inputs) {
            obj.inputs = message.inputs.map(e => e ? bank_1.Input.toAmino(e) : undefined);
        }
        else {
            obj.inputs = message.inputs;
        }
        if (message.outputs) {
            obj.outputs = message.outputs.map(e => e ? bank_1.Output.toAmino(e) : undefined);
        }
        else {
            obj.outputs = message.outputs;
        }
        return obj;
    },
    fromAminoMsg(object) {
        return exports.MsgMultiSend.fromAmino(object.value);
    },
    toAminoMsg(message) {
        return {
            type: "cosmos-sdk/MsgMultiSend",
            value: exports.MsgMultiSend.toAmino(message)
        };
    },
    fromProtoMsg(message) {
        return exports.MsgMultiSend.decode(message.value);
    },
    toProto(message) {
        return exports.MsgMultiSend.encode(message).finish();
    },
    toProtoMsg(message) {
        return {
            typeUrl: "/cosmos.bank.v1beta1.MsgMultiSend",
            value: exports.MsgMultiSend.encode(message).finish()
        };
    }
};
registry_1.GlobalDecoderRegistry.register(exports.MsgMultiSend.typeUrl, exports.MsgMultiSend);
registry_1.GlobalDecoderRegistry.registerAminoProtoMapping(exports.MsgMultiSend.aminoType, exports.MsgMultiSend.typeUrl);
function createBaseMsgMultiSendResponse() {
    return {};
}
exports.MsgMultiSendResponse = {
    typeUrl: "/cosmos.bank.v1beta1.MsgMultiSendResponse",
    aminoType: "cosmos-sdk/MsgMultiSendResponse",
    is(o) {
        return o && o.$typeUrl === exports.MsgMultiSendResponse.typeUrl;
    },
    isSDK(o) {
        return o && o.$typeUrl === exports.MsgMultiSendResponse.typeUrl;
    },
    isAmino(o) {
        return o && o.$typeUrl === exports.MsgMultiSendResponse.typeUrl;
    },
    encode(_, writer = binary_1.BinaryWriter.create()) {
        return writer;
    },
    decode(input, length) {
        const reader = input instanceof binary_1.BinaryReader ? input : new binary_1.BinaryReader(input);
        let end = length === undefined ? reader.len : reader.pos + length;
        const message = createBaseMsgMultiSendResponse();
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
        const message = createBaseMsgMultiSendResponse();
        return message;
    },
    fromAmino(_) {
        const message = createBaseMsgMultiSendResponse();
        return message;
    },
    toAmino(_) {
        const obj = {};
        return obj;
    },
    fromAminoMsg(object) {
        return exports.MsgMultiSendResponse.fromAmino(object.value);
    },
    toAminoMsg(message) {
        return {
            type: "cosmos-sdk/MsgMultiSendResponse",
            value: exports.MsgMultiSendResponse.toAmino(message)
        };
    },
    fromProtoMsg(message) {
        return exports.MsgMultiSendResponse.decode(message.value);
    },
    toProto(message) {
        return exports.MsgMultiSendResponse.encode(message).finish();
    },
    toProtoMsg(message) {
        return {
            typeUrl: "/cosmos.bank.v1beta1.MsgMultiSendResponse",
            value: exports.MsgMultiSendResponse.encode(message).finish()
        };
    }
};
registry_1.GlobalDecoderRegistry.register(exports.MsgMultiSendResponse.typeUrl, exports.MsgMultiSendResponse);
registry_1.GlobalDecoderRegistry.registerAminoProtoMapping(exports.MsgMultiSendResponse.aminoType, exports.MsgMultiSendResponse.typeUrl);
function createBaseMsgUpdateParams() {
    return {
        authority: "",
        params: bank_1.Params.fromPartial({})
    };
}
exports.MsgUpdateParams = {
    typeUrl: "/cosmos.bank.v1beta1.MsgUpdateParams",
    aminoType: "cosmos-sdk/x/bank/MsgUpdateParams",
    is(o) {
        return o && (o.$typeUrl === exports.MsgUpdateParams.typeUrl || typeof o.authority === "string" && bank_1.Params.is(o.params));
    },
    isSDK(o) {
        return o && (o.$typeUrl === exports.MsgUpdateParams.typeUrl || typeof o.authority === "string" && bank_1.Params.isSDK(o.params));
    },
    isAmino(o) {
        return o && (o.$typeUrl === exports.MsgUpdateParams.typeUrl || typeof o.authority === "string" && bank_1.Params.isAmino(o.params));
    },
    encode(message, writer = binary_1.BinaryWriter.create()) {
        if (message.authority !== "") {
            writer.uint32(10).string(message.authority);
        }
        if (message.params !== undefined) {
            bank_1.Params.encode(message.params, writer.uint32(18).fork()).ldelim();
        }
        return writer;
    },
    decode(input, length) {
        const reader = input instanceof binary_1.BinaryReader ? input : new binary_1.BinaryReader(input);
        let end = length === undefined ? reader.len : reader.pos + length;
        const message = createBaseMsgUpdateParams();
        while (reader.pos < end) {
            const tag = reader.uint32();
            switch (tag >>> 3) {
                case 1:
                    message.authority = reader.string();
                    break;
                case 2:
                    message.params = bank_1.Params.decode(reader, reader.uint32());
                    break;
                default:
                    reader.skipType(tag & 7);
                    break;
            }
        }
        return message;
    },
    fromPartial(object) {
        const message = createBaseMsgUpdateParams();
        message.authority = object.authority ?? "";
        message.params = object.params !== undefined && object.params !== null ? bank_1.Params.fromPartial(object.params) : undefined;
        return message;
    },
    fromAmino(object) {
        const message = createBaseMsgUpdateParams();
        if (object.authority !== undefined && object.authority !== null) {
            message.authority = object.authority;
        }
        if (object.params !== undefined && object.params !== null) {
            message.params = bank_1.Params.fromAmino(object.params);
        }
        return message;
    },
    toAmino(message) {
        const obj = {};
        obj.authority = message.authority === "" ? undefined : message.authority;
        obj.params = message.params ? bank_1.Params.toAmino(message.params) : bank_1.Params.toAmino(bank_1.Params.fromPartial({}));
        return obj;
    },
    fromAminoMsg(object) {
        return exports.MsgUpdateParams.fromAmino(object.value);
    },
    toAminoMsg(message) {
        return {
            type: "cosmos-sdk/x/bank/MsgUpdateParams",
            value: exports.MsgUpdateParams.toAmino(message)
        };
    },
    fromProtoMsg(message) {
        return exports.MsgUpdateParams.decode(message.value);
    },
    toProto(message) {
        return exports.MsgUpdateParams.encode(message).finish();
    },
    toProtoMsg(message) {
        return {
            typeUrl: "/cosmos.bank.v1beta1.MsgUpdateParams",
            value: exports.MsgUpdateParams.encode(message).finish()
        };
    }
};
registry_1.GlobalDecoderRegistry.register(exports.MsgUpdateParams.typeUrl, exports.MsgUpdateParams);
registry_1.GlobalDecoderRegistry.registerAminoProtoMapping(exports.MsgUpdateParams.aminoType, exports.MsgUpdateParams.typeUrl);
function createBaseMsgUpdateParamsResponse() {
    return {};
}
exports.MsgUpdateParamsResponse = {
    typeUrl: "/cosmos.bank.v1beta1.MsgUpdateParamsResponse",
    aminoType: "cosmos-sdk/MsgUpdateParamsResponse",
    is(o) {
        return o && o.$typeUrl === exports.MsgUpdateParamsResponse.typeUrl;
    },
    isSDK(o) {
        return o && o.$typeUrl === exports.MsgUpdateParamsResponse.typeUrl;
    },
    isAmino(o) {
        return o && o.$typeUrl === exports.MsgUpdateParamsResponse.typeUrl;
    },
    encode(_, writer = binary_1.BinaryWriter.create()) {
        return writer;
    },
    decode(input, length) {
        const reader = input instanceof binary_1.BinaryReader ? input : new binary_1.BinaryReader(input);
        let end = length === undefined ? reader.len : reader.pos + length;
        const message = createBaseMsgUpdateParamsResponse();
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
        const message = createBaseMsgUpdateParamsResponse();
        return message;
    },
    fromAmino(_) {
        const message = createBaseMsgUpdateParamsResponse();
        return message;
    },
    toAmino(_) {
        const obj = {};
        return obj;
    },
    fromAminoMsg(object) {
        return exports.MsgUpdateParamsResponse.fromAmino(object.value);
    },
    toAminoMsg(message) {
        return {
            type: "cosmos-sdk/MsgUpdateParamsResponse",
            value: exports.MsgUpdateParamsResponse.toAmino(message)
        };
    },
    fromProtoMsg(message) {
        return exports.MsgUpdateParamsResponse.decode(message.value);
    },
    toProto(message) {
        return exports.MsgUpdateParamsResponse.encode(message).finish();
    },
    toProtoMsg(message) {
        return {
            typeUrl: "/cosmos.bank.v1beta1.MsgUpdateParamsResponse",
            value: exports.MsgUpdateParamsResponse.encode(message).finish()
        };
    }
};
registry_1.GlobalDecoderRegistry.register(exports.MsgUpdateParamsResponse.typeUrl, exports.MsgUpdateParamsResponse);
registry_1.GlobalDecoderRegistry.registerAminoProtoMapping(exports.MsgUpdateParamsResponse.aminoType, exports.MsgUpdateParamsResponse.typeUrl);
function createBaseMsgSetSendEnabled() {
    return {
        authority: "",
        sendEnabled: [],
        useDefaultFor: []
    };
}
exports.MsgSetSendEnabled = {
    typeUrl: "/cosmos.bank.v1beta1.MsgSetSendEnabled",
    aminoType: "cosmos-sdk/MsgSetSendEnabled",
    is(o) {
        return o && (o.$typeUrl === exports.MsgSetSendEnabled.typeUrl || typeof o.authority === "string" && Array.isArray(o.sendEnabled) && (!o.sendEnabled.length || bank_1.SendEnabled.is(o.sendEnabled[0])) && Array.isArray(o.useDefaultFor) && (!o.useDefaultFor.length || typeof o.useDefaultFor[0] === "string"));
    },
    isSDK(o) {
        return o && (o.$typeUrl === exports.MsgSetSendEnabled.typeUrl || typeof o.authority === "string" && Array.isArray(o.send_enabled) && (!o.send_enabled.length || bank_1.SendEnabled.isSDK(o.send_enabled[0])) && Array.isArray(o.use_default_for) && (!o.use_default_for.length || typeof o.use_default_for[0] === "string"));
    },
    isAmino(o) {
        return o && (o.$typeUrl === exports.MsgSetSendEnabled.typeUrl || typeof o.authority === "string" && Array.isArray(o.send_enabled) && (!o.send_enabled.length || bank_1.SendEnabled.isAmino(o.send_enabled[0])) && Array.isArray(o.use_default_for) && (!o.use_default_for.length || typeof o.use_default_for[0] === "string"));
    },
    encode(message, writer = binary_1.BinaryWriter.create()) {
        if (message.authority !== "") {
            writer.uint32(10).string(message.authority);
        }
        for (const v of message.sendEnabled) {
            bank_1.SendEnabled.encode(v, writer.uint32(18).fork()).ldelim();
        }
        for (const v of message.useDefaultFor) {
            writer.uint32(26).string(v);
        }
        return writer;
    },
    decode(input, length) {
        const reader = input instanceof binary_1.BinaryReader ? input : new binary_1.BinaryReader(input);
        let end = length === undefined ? reader.len : reader.pos + length;
        const message = createBaseMsgSetSendEnabled();
        while (reader.pos < end) {
            const tag = reader.uint32();
            switch (tag >>> 3) {
                case 1:
                    message.authority = reader.string();
                    break;
                case 2:
                    message.sendEnabled.push(bank_1.SendEnabled.decode(reader, reader.uint32()));
                    break;
                case 3:
                    message.useDefaultFor.push(reader.string());
                    break;
                default:
                    reader.skipType(tag & 7);
                    break;
            }
        }
        return message;
    },
    fromPartial(object) {
        const message = createBaseMsgSetSendEnabled();
        message.authority = object.authority ?? "";
        message.sendEnabled = object.sendEnabled?.map(e => bank_1.SendEnabled.fromPartial(e)) || [];
        message.useDefaultFor = object.useDefaultFor?.map(e => e) || [];
        return message;
    },
    fromAmino(object) {
        const message = createBaseMsgSetSendEnabled();
        if (object.authority !== undefined && object.authority !== null) {
            message.authority = object.authority;
        }
        message.sendEnabled = object.send_enabled?.map(e => bank_1.SendEnabled.fromAmino(e)) || [];
        message.useDefaultFor = object.use_default_for?.map(e => e) || [];
        return message;
    },
    toAmino(message) {
        const obj = {};
        obj.authority = message.authority === "" ? undefined : message.authority;
        if (message.sendEnabled) {
            obj.send_enabled = message.sendEnabled.map(e => e ? bank_1.SendEnabled.toAmino(e) : undefined);
        }
        else {
            obj.send_enabled = message.sendEnabled;
        }
        if (message.useDefaultFor) {
            obj.use_default_for = message.useDefaultFor.map(e => e);
        }
        else {
            obj.use_default_for = message.useDefaultFor;
        }
        return obj;
    },
    fromAminoMsg(object) {
        return exports.MsgSetSendEnabled.fromAmino(object.value);
    },
    toAminoMsg(message) {
        return {
            type: "cosmos-sdk/MsgSetSendEnabled",
            value: exports.MsgSetSendEnabled.toAmino(message)
        };
    },
    fromProtoMsg(message) {
        return exports.MsgSetSendEnabled.decode(message.value);
    },
    toProto(message) {
        return exports.MsgSetSendEnabled.encode(message).finish();
    },
    toProtoMsg(message) {
        return {
            typeUrl: "/cosmos.bank.v1beta1.MsgSetSendEnabled",
            value: exports.MsgSetSendEnabled.encode(message).finish()
        };
    }
};
registry_1.GlobalDecoderRegistry.register(exports.MsgSetSendEnabled.typeUrl, exports.MsgSetSendEnabled);
registry_1.GlobalDecoderRegistry.registerAminoProtoMapping(exports.MsgSetSendEnabled.aminoType, exports.MsgSetSendEnabled.typeUrl);
function createBaseMsgSetSendEnabledResponse() {
    return {};
}
exports.MsgSetSendEnabledResponse = {
    typeUrl: "/cosmos.bank.v1beta1.MsgSetSendEnabledResponse",
    aminoType: "cosmos-sdk/MsgSetSendEnabledResponse",
    is(o) {
        return o && o.$typeUrl === exports.MsgSetSendEnabledResponse.typeUrl;
    },
    isSDK(o) {
        return o && o.$typeUrl === exports.MsgSetSendEnabledResponse.typeUrl;
    },
    isAmino(o) {
        return o && o.$typeUrl === exports.MsgSetSendEnabledResponse.typeUrl;
    },
    encode(_, writer = binary_1.BinaryWriter.create()) {
        return writer;
    },
    decode(input, length) {
        const reader = input instanceof binary_1.BinaryReader ? input : new binary_1.BinaryReader(input);
        let end = length === undefined ? reader.len : reader.pos + length;
        const message = createBaseMsgSetSendEnabledResponse();
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
        const message = createBaseMsgSetSendEnabledResponse();
        return message;
    },
    fromAmino(_) {
        const message = createBaseMsgSetSendEnabledResponse();
        return message;
    },
    toAmino(_) {
        const obj = {};
        return obj;
    },
    fromAminoMsg(object) {
        return exports.MsgSetSendEnabledResponse.fromAmino(object.value);
    },
    toAminoMsg(message) {
        return {
            type: "cosmos-sdk/MsgSetSendEnabledResponse",
            value: exports.MsgSetSendEnabledResponse.toAmino(message)
        };
    },
    fromProtoMsg(message) {
        return exports.MsgSetSendEnabledResponse.decode(message.value);
    },
    toProto(message) {
        return exports.MsgSetSendEnabledResponse.encode(message).finish();
    },
    toProtoMsg(message) {
        return {
            typeUrl: "/cosmos.bank.v1beta1.MsgSetSendEnabledResponse",
            value: exports.MsgSetSendEnabledResponse.encode(message).finish()
        };
    }
};
registry_1.GlobalDecoderRegistry.register(exports.MsgSetSendEnabledResponse.typeUrl, exports.MsgSetSendEnabledResponse);
registry_1.GlobalDecoderRegistry.registerAminoProtoMapping(exports.MsgSetSendEnabledResponse.aminoType, exports.MsgSetSendEnabledResponse.typeUrl);
