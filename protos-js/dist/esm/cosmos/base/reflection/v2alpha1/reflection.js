//@ts-nocheck
import { BinaryReader, BinaryWriter } from "../../../../binary";
import { GlobalDecoderRegistry } from "../../../../registry";
function createBaseAppDescriptor() {
    return {
        authn: undefined,
        chain: undefined,
        codec: undefined,
        configuration: undefined,
        queryServices: undefined,
        tx: undefined
    };
}
export const AppDescriptor = {
    typeUrl: "/cosmos.base.reflection.v2alpha1.AppDescriptor",
    aminoType: "cosmos-sdk/AppDescriptor",
    is(o) {
        return o && o.$typeUrl === AppDescriptor.typeUrl;
    },
    isSDK(o) {
        return o && o.$typeUrl === AppDescriptor.typeUrl;
    },
    isAmino(o) {
        return o && o.$typeUrl === AppDescriptor.typeUrl;
    },
    encode(message, writer = BinaryWriter.create()) {
        if (message.authn !== undefined) {
            AuthnDescriptor.encode(message.authn, writer.uint32(10).fork()).ldelim();
        }
        if (message.chain !== undefined) {
            ChainDescriptor.encode(message.chain, writer.uint32(18).fork()).ldelim();
        }
        if (message.codec !== undefined) {
            CodecDescriptor.encode(message.codec, writer.uint32(26).fork()).ldelim();
        }
        if (message.configuration !== undefined) {
            ConfigurationDescriptor.encode(message.configuration, writer.uint32(34).fork()).ldelim();
        }
        if (message.queryServices !== undefined) {
            QueryServicesDescriptor.encode(message.queryServices, writer.uint32(42).fork()).ldelim();
        }
        if (message.tx !== undefined) {
            TxDescriptor.encode(message.tx, writer.uint32(50).fork()).ldelim();
        }
        return writer;
    },
    decode(input, length) {
        const reader = input instanceof BinaryReader ? input : new BinaryReader(input);
        let end = length === undefined ? reader.len : reader.pos + length;
        const message = createBaseAppDescriptor();
        while (reader.pos < end) {
            const tag = reader.uint32();
            switch (tag >>> 3) {
                case 1:
                    message.authn = AuthnDescriptor.decode(reader, reader.uint32());
                    break;
                case 2:
                    message.chain = ChainDescriptor.decode(reader, reader.uint32());
                    break;
                case 3:
                    message.codec = CodecDescriptor.decode(reader, reader.uint32());
                    break;
                case 4:
                    message.configuration = ConfigurationDescriptor.decode(reader, reader.uint32());
                    break;
                case 5:
                    message.queryServices = QueryServicesDescriptor.decode(reader, reader.uint32());
                    break;
                case 6:
                    message.tx = TxDescriptor.decode(reader, reader.uint32());
                    break;
                default:
                    reader.skipType(tag & 7);
                    break;
            }
        }
        return message;
    },
    fromPartial(object) {
        const message = createBaseAppDescriptor();
        message.authn = object.authn !== undefined && object.authn !== null ? AuthnDescriptor.fromPartial(object.authn) : undefined;
        message.chain = object.chain !== undefined && object.chain !== null ? ChainDescriptor.fromPartial(object.chain) : undefined;
        message.codec = object.codec !== undefined && object.codec !== null ? CodecDescriptor.fromPartial(object.codec) : undefined;
        message.configuration = object.configuration !== undefined && object.configuration !== null ? ConfigurationDescriptor.fromPartial(object.configuration) : undefined;
        message.queryServices = object.queryServices !== undefined && object.queryServices !== null ? QueryServicesDescriptor.fromPartial(object.queryServices) : undefined;
        message.tx = object.tx !== undefined && object.tx !== null ? TxDescriptor.fromPartial(object.tx) : undefined;
        return message;
    },
    fromAmino(object) {
        const message = createBaseAppDescriptor();
        if (object.authn !== undefined && object.authn !== null) {
            message.authn = AuthnDescriptor.fromAmino(object.authn);
        }
        if (object.chain !== undefined && object.chain !== null) {
            message.chain = ChainDescriptor.fromAmino(object.chain);
        }
        if (object.codec !== undefined && object.codec !== null) {
            message.codec = CodecDescriptor.fromAmino(object.codec);
        }
        if (object.configuration !== undefined && object.configuration !== null) {
            message.configuration = ConfigurationDescriptor.fromAmino(object.configuration);
        }
        if (object.query_services !== undefined && object.query_services !== null) {
            message.queryServices = QueryServicesDescriptor.fromAmino(object.query_services);
        }
        if (object.tx !== undefined && object.tx !== null) {
            message.tx = TxDescriptor.fromAmino(object.tx);
        }
        return message;
    },
    toAmino(message) {
        const obj = {};
        obj.authn = message.authn ? AuthnDescriptor.toAmino(message.authn) : undefined;
        obj.chain = message.chain ? ChainDescriptor.toAmino(message.chain) : undefined;
        obj.codec = message.codec ? CodecDescriptor.toAmino(message.codec) : undefined;
        obj.configuration = message.configuration ? ConfigurationDescriptor.toAmino(message.configuration) : undefined;
        obj.query_services = message.queryServices ? QueryServicesDescriptor.toAmino(message.queryServices) : undefined;
        obj.tx = message.tx ? TxDescriptor.toAmino(message.tx) : undefined;
        return obj;
    },
    fromAminoMsg(object) {
        return AppDescriptor.fromAmino(object.value);
    },
    toAminoMsg(message) {
        return {
            type: "cosmos-sdk/AppDescriptor",
            value: AppDescriptor.toAmino(message)
        };
    },
    fromProtoMsg(message) {
        return AppDescriptor.decode(message.value);
    },
    toProto(message) {
        return AppDescriptor.encode(message).finish();
    },
    toProtoMsg(message) {
        return {
            typeUrl: "/cosmos.base.reflection.v2alpha1.AppDescriptor",
            value: AppDescriptor.encode(message).finish()
        };
    }
};
GlobalDecoderRegistry.register(AppDescriptor.typeUrl, AppDescriptor);
GlobalDecoderRegistry.registerAminoProtoMapping(AppDescriptor.aminoType, AppDescriptor.typeUrl);
function createBaseTxDescriptor() {
    return {
        fullname: "",
        msgs: []
    };
}
export const TxDescriptor = {
    typeUrl: "/cosmos.base.reflection.v2alpha1.TxDescriptor",
    aminoType: "cosmos-sdk/TxDescriptor",
    is(o) {
        return o && (o.$typeUrl === TxDescriptor.typeUrl || typeof o.fullname === "string" && Array.isArray(o.msgs) && (!o.msgs.length || MsgDescriptor.is(o.msgs[0])));
    },
    isSDK(o) {
        return o && (o.$typeUrl === TxDescriptor.typeUrl || typeof o.fullname === "string" && Array.isArray(o.msgs) && (!o.msgs.length || MsgDescriptor.isSDK(o.msgs[0])));
    },
    isAmino(o) {
        return o && (o.$typeUrl === TxDescriptor.typeUrl || typeof o.fullname === "string" && Array.isArray(o.msgs) && (!o.msgs.length || MsgDescriptor.isAmino(o.msgs[0])));
    },
    encode(message, writer = BinaryWriter.create()) {
        if (message.fullname !== "") {
            writer.uint32(10).string(message.fullname);
        }
        for (const v of message.msgs) {
            MsgDescriptor.encode(v, writer.uint32(18).fork()).ldelim();
        }
        return writer;
    },
    decode(input, length) {
        const reader = input instanceof BinaryReader ? input : new BinaryReader(input);
        let end = length === undefined ? reader.len : reader.pos + length;
        const message = createBaseTxDescriptor();
        while (reader.pos < end) {
            const tag = reader.uint32();
            switch (tag >>> 3) {
                case 1:
                    message.fullname = reader.string();
                    break;
                case 2:
                    message.msgs.push(MsgDescriptor.decode(reader, reader.uint32()));
                    break;
                default:
                    reader.skipType(tag & 7);
                    break;
            }
        }
        return message;
    },
    fromPartial(object) {
        const message = createBaseTxDescriptor();
        message.fullname = object.fullname ?? "";
        message.msgs = object.msgs?.map(e => MsgDescriptor.fromPartial(e)) || [];
        return message;
    },
    fromAmino(object) {
        const message = createBaseTxDescriptor();
        if (object.fullname !== undefined && object.fullname !== null) {
            message.fullname = object.fullname;
        }
        message.msgs = object.msgs?.map(e => MsgDescriptor.fromAmino(e)) || [];
        return message;
    },
    toAmino(message) {
        const obj = {};
        obj.fullname = message.fullname === "" ? undefined : message.fullname;
        if (message.msgs) {
            obj.msgs = message.msgs.map(e => e ? MsgDescriptor.toAmino(e) : undefined);
        }
        else {
            obj.msgs = message.msgs;
        }
        return obj;
    },
    fromAminoMsg(object) {
        return TxDescriptor.fromAmino(object.value);
    },
    toAminoMsg(message) {
        return {
            type: "cosmos-sdk/TxDescriptor",
            value: TxDescriptor.toAmino(message)
        };
    },
    fromProtoMsg(message) {
        return TxDescriptor.decode(message.value);
    },
    toProto(message) {
        return TxDescriptor.encode(message).finish();
    },
    toProtoMsg(message) {
        return {
            typeUrl: "/cosmos.base.reflection.v2alpha1.TxDescriptor",
            value: TxDescriptor.encode(message).finish()
        };
    }
};
GlobalDecoderRegistry.register(TxDescriptor.typeUrl, TxDescriptor);
GlobalDecoderRegistry.registerAminoProtoMapping(TxDescriptor.aminoType, TxDescriptor.typeUrl);
function createBaseAuthnDescriptor() {
    return {
        signModes: []
    };
}
export const AuthnDescriptor = {
    typeUrl: "/cosmos.base.reflection.v2alpha1.AuthnDescriptor",
    aminoType: "cosmos-sdk/AuthnDescriptor",
    is(o) {
        return o && (o.$typeUrl === AuthnDescriptor.typeUrl || Array.isArray(o.signModes) && (!o.signModes.length || SigningModeDescriptor.is(o.signModes[0])));
    },
    isSDK(o) {
        return o && (o.$typeUrl === AuthnDescriptor.typeUrl || Array.isArray(o.sign_modes) && (!o.sign_modes.length || SigningModeDescriptor.isSDK(o.sign_modes[0])));
    },
    isAmino(o) {
        return o && (o.$typeUrl === AuthnDescriptor.typeUrl || Array.isArray(o.sign_modes) && (!o.sign_modes.length || SigningModeDescriptor.isAmino(o.sign_modes[0])));
    },
    encode(message, writer = BinaryWriter.create()) {
        for (const v of message.signModes) {
            SigningModeDescriptor.encode(v, writer.uint32(10).fork()).ldelim();
        }
        return writer;
    },
    decode(input, length) {
        const reader = input instanceof BinaryReader ? input : new BinaryReader(input);
        let end = length === undefined ? reader.len : reader.pos + length;
        const message = createBaseAuthnDescriptor();
        while (reader.pos < end) {
            const tag = reader.uint32();
            switch (tag >>> 3) {
                case 1:
                    message.signModes.push(SigningModeDescriptor.decode(reader, reader.uint32()));
                    break;
                default:
                    reader.skipType(tag & 7);
                    break;
            }
        }
        return message;
    },
    fromPartial(object) {
        const message = createBaseAuthnDescriptor();
        message.signModes = object.signModes?.map(e => SigningModeDescriptor.fromPartial(e)) || [];
        return message;
    },
    fromAmino(object) {
        const message = createBaseAuthnDescriptor();
        message.signModes = object.sign_modes?.map(e => SigningModeDescriptor.fromAmino(e)) || [];
        return message;
    },
    toAmino(message) {
        const obj = {};
        if (message.signModes) {
            obj.sign_modes = message.signModes.map(e => e ? SigningModeDescriptor.toAmino(e) : undefined);
        }
        else {
            obj.sign_modes = message.signModes;
        }
        return obj;
    },
    fromAminoMsg(object) {
        return AuthnDescriptor.fromAmino(object.value);
    },
    toAminoMsg(message) {
        return {
            type: "cosmos-sdk/AuthnDescriptor",
            value: AuthnDescriptor.toAmino(message)
        };
    },
    fromProtoMsg(message) {
        return AuthnDescriptor.decode(message.value);
    },
    toProto(message) {
        return AuthnDescriptor.encode(message).finish();
    },
    toProtoMsg(message) {
        return {
            typeUrl: "/cosmos.base.reflection.v2alpha1.AuthnDescriptor",
            value: AuthnDescriptor.encode(message).finish()
        };
    }
};
GlobalDecoderRegistry.register(AuthnDescriptor.typeUrl, AuthnDescriptor);
GlobalDecoderRegistry.registerAminoProtoMapping(AuthnDescriptor.aminoType, AuthnDescriptor.typeUrl);
function createBaseSigningModeDescriptor() {
    return {
        name: "",
        number: 0,
        authnInfoProviderMethodFullname: ""
    };
}
export const SigningModeDescriptor = {
    typeUrl: "/cosmos.base.reflection.v2alpha1.SigningModeDescriptor",
    aminoType: "cosmos-sdk/SigningModeDescriptor",
    is(o) {
        return o && (o.$typeUrl === SigningModeDescriptor.typeUrl || typeof o.name === "string" && typeof o.number === "number" && typeof o.authnInfoProviderMethodFullname === "string");
    },
    isSDK(o) {
        return o && (o.$typeUrl === SigningModeDescriptor.typeUrl || typeof o.name === "string" && typeof o.number === "number" && typeof o.authn_info_provider_method_fullname === "string");
    },
    isAmino(o) {
        return o && (o.$typeUrl === SigningModeDescriptor.typeUrl || typeof o.name === "string" && typeof o.number === "number" && typeof o.authn_info_provider_method_fullname === "string");
    },
    encode(message, writer = BinaryWriter.create()) {
        if (message.name !== "") {
            writer.uint32(10).string(message.name);
        }
        if (message.number !== 0) {
            writer.uint32(16).int32(message.number);
        }
        if (message.authnInfoProviderMethodFullname !== "") {
            writer.uint32(26).string(message.authnInfoProviderMethodFullname);
        }
        return writer;
    },
    decode(input, length) {
        const reader = input instanceof BinaryReader ? input : new BinaryReader(input);
        let end = length === undefined ? reader.len : reader.pos + length;
        const message = createBaseSigningModeDescriptor();
        while (reader.pos < end) {
            const tag = reader.uint32();
            switch (tag >>> 3) {
                case 1:
                    message.name = reader.string();
                    break;
                case 2:
                    message.number = reader.int32();
                    break;
                case 3:
                    message.authnInfoProviderMethodFullname = reader.string();
                    break;
                default:
                    reader.skipType(tag & 7);
                    break;
            }
        }
        return message;
    },
    fromPartial(object) {
        const message = createBaseSigningModeDescriptor();
        message.name = object.name ?? "";
        message.number = object.number ?? 0;
        message.authnInfoProviderMethodFullname = object.authnInfoProviderMethodFullname ?? "";
        return message;
    },
    fromAmino(object) {
        const message = createBaseSigningModeDescriptor();
        if (object.name !== undefined && object.name !== null) {
            message.name = object.name;
        }
        if (object.number !== undefined && object.number !== null) {
            message.number = object.number;
        }
        if (object.authn_info_provider_method_fullname !== undefined && object.authn_info_provider_method_fullname !== null) {
            message.authnInfoProviderMethodFullname = object.authn_info_provider_method_fullname;
        }
        return message;
    },
    toAmino(message) {
        const obj = {};
        obj.name = message.name === "" ? undefined : message.name;
        obj.number = message.number === 0 ? undefined : message.number;
        obj.authn_info_provider_method_fullname = message.authnInfoProviderMethodFullname === "" ? undefined : message.authnInfoProviderMethodFullname;
        return obj;
    },
    fromAminoMsg(object) {
        return SigningModeDescriptor.fromAmino(object.value);
    },
    toAminoMsg(message) {
        return {
            type: "cosmos-sdk/SigningModeDescriptor",
            value: SigningModeDescriptor.toAmino(message)
        };
    },
    fromProtoMsg(message) {
        return SigningModeDescriptor.decode(message.value);
    },
    toProto(message) {
        return SigningModeDescriptor.encode(message).finish();
    },
    toProtoMsg(message) {
        return {
            typeUrl: "/cosmos.base.reflection.v2alpha1.SigningModeDescriptor",
            value: SigningModeDescriptor.encode(message).finish()
        };
    }
};
GlobalDecoderRegistry.register(SigningModeDescriptor.typeUrl, SigningModeDescriptor);
GlobalDecoderRegistry.registerAminoProtoMapping(SigningModeDescriptor.aminoType, SigningModeDescriptor.typeUrl);
function createBaseChainDescriptor() {
    return {
        id: ""
    };
}
export const ChainDescriptor = {
    typeUrl: "/cosmos.base.reflection.v2alpha1.ChainDescriptor",
    aminoType: "cosmos-sdk/ChainDescriptor",
    is(o) {
        return o && (o.$typeUrl === ChainDescriptor.typeUrl || typeof o.id === "string");
    },
    isSDK(o) {
        return o && (o.$typeUrl === ChainDescriptor.typeUrl || typeof o.id === "string");
    },
    isAmino(o) {
        return o && (o.$typeUrl === ChainDescriptor.typeUrl || typeof o.id === "string");
    },
    encode(message, writer = BinaryWriter.create()) {
        if (message.id !== "") {
            writer.uint32(10).string(message.id);
        }
        return writer;
    },
    decode(input, length) {
        const reader = input instanceof BinaryReader ? input : new BinaryReader(input);
        let end = length === undefined ? reader.len : reader.pos + length;
        const message = createBaseChainDescriptor();
        while (reader.pos < end) {
            const tag = reader.uint32();
            switch (tag >>> 3) {
                case 1:
                    message.id = reader.string();
                    break;
                default:
                    reader.skipType(tag & 7);
                    break;
            }
        }
        return message;
    },
    fromPartial(object) {
        const message = createBaseChainDescriptor();
        message.id = object.id ?? "";
        return message;
    },
    fromAmino(object) {
        const message = createBaseChainDescriptor();
        if (object.id !== undefined && object.id !== null) {
            message.id = object.id;
        }
        return message;
    },
    toAmino(message) {
        const obj = {};
        obj.id = message.id === "" ? undefined : message.id;
        return obj;
    },
    fromAminoMsg(object) {
        return ChainDescriptor.fromAmino(object.value);
    },
    toAminoMsg(message) {
        return {
            type: "cosmos-sdk/ChainDescriptor",
            value: ChainDescriptor.toAmino(message)
        };
    },
    fromProtoMsg(message) {
        return ChainDescriptor.decode(message.value);
    },
    toProto(message) {
        return ChainDescriptor.encode(message).finish();
    },
    toProtoMsg(message) {
        return {
            typeUrl: "/cosmos.base.reflection.v2alpha1.ChainDescriptor",
            value: ChainDescriptor.encode(message).finish()
        };
    }
};
GlobalDecoderRegistry.register(ChainDescriptor.typeUrl, ChainDescriptor);
GlobalDecoderRegistry.registerAminoProtoMapping(ChainDescriptor.aminoType, ChainDescriptor.typeUrl);
function createBaseCodecDescriptor() {
    return {
        interfaces: []
    };
}
export const CodecDescriptor = {
    typeUrl: "/cosmos.base.reflection.v2alpha1.CodecDescriptor",
    aminoType: "cosmos-sdk/CodecDescriptor",
    is(o) {
        return o && (o.$typeUrl === CodecDescriptor.typeUrl || Array.isArray(o.interfaces) && (!o.interfaces.length || InterfaceDescriptor.is(o.interfaces[0])));
    },
    isSDK(o) {
        return o && (o.$typeUrl === CodecDescriptor.typeUrl || Array.isArray(o.interfaces) && (!o.interfaces.length || InterfaceDescriptor.isSDK(o.interfaces[0])));
    },
    isAmino(o) {
        return o && (o.$typeUrl === CodecDescriptor.typeUrl || Array.isArray(o.interfaces) && (!o.interfaces.length || InterfaceDescriptor.isAmino(o.interfaces[0])));
    },
    encode(message, writer = BinaryWriter.create()) {
        for (const v of message.interfaces) {
            InterfaceDescriptor.encode(v, writer.uint32(10).fork()).ldelim();
        }
        return writer;
    },
    decode(input, length) {
        const reader = input instanceof BinaryReader ? input : new BinaryReader(input);
        let end = length === undefined ? reader.len : reader.pos + length;
        const message = createBaseCodecDescriptor();
        while (reader.pos < end) {
            const tag = reader.uint32();
            switch (tag >>> 3) {
                case 1:
                    message.interfaces.push(InterfaceDescriptor.decode(reader, reader.uint32()));
                    break;
                default:
                    reader.skipType(tag & 7);
                    break;
            }
        }
        return message;
    },
    fromPartial(object) {
        const message = createBaseCodecDescriptor();
        message.interfaces = object.interfaces?.map(e => InterfaceDescriptor.fromPartial(e)) || [];
        return message;
    },
    fromAmino(object) {
        const message = createBaseCodecDescriptor();
        message.interfaces = object.interfaces?.map(e => InterfaceDescriptor.fromAmino(e)) || [];
        return message;
    },
    toAmino(message) {
        const obj = {};
        if (message.interfaces) {
            obj.interfaces = message.interfaces.map(e => e ? InterfaceDescriptor.toAmino(e) : undefined);
        }
        else {
            obj.interfaces = message.interfaces;
        }
        return obj;
    },
    fromAminoMsg(object) {
        return CodecDescriptor.fromAmino(object.value);
    },
    toAminoMsg(message) {
        return {
            type: "cosmos-sdk/CodecDescriptor",
            value: CodecDescriptor.toAmino(message)
        };
    },
    fromProtoMsg(message) {
        return CodecDescriptor.decode(message.value);
    },
    toProto(message) {
        return CodecDescriptor.encode(message).finish();
    },
    toProtoMsg(message) {
        return {
            typeUrl: "/cosmos.base.reflection.v2alpha1.CodecDescriptor",
            value: CodecDescriptor.encode(message).finish()
        };
    }
};
GlobalDecoderRegistry.register(CodecDescriptor.typeUrl, CodecDescriptor);
GlobalDecoderRegistry.registerAminoProtoMapping(CodecDescriptor.aminoType, CodecDescriptor.typeUrl);
function createBaseInterfaceDescriptor() {
    return {
        fullname: "",
        interfaceAcceptingMessages: [],
        interfaceImplementers: []
    };
}
export const InterfaceDescriptor = {
    typeUrl: "/cosmos.base.reflection.v2alpha1.InterfaceDescriptor",
    aminoType: "cosmos-sdk/InterfaceDescriptor",
    is(o) {
        return o && (o.$typeUrl === InterfaceDescriptor.typeUrl || typeof o.fullname === "string" && Array.isArray(o.interfaceAcceptingMessages) && (!o.interfaceAcceptingMessages.length || InterfaceAcceptingMessageDescriptor.is(o.interfaceAcceptingMessages[0])) && Array.isArray(o.interfaceImplementers) && (!o.interfaceImplementers.length || InterfaceImplementerDescriptor.is(o.interfaceImplementers[0])));
    },
    isSDK(o) {
        return o && (o.$typeUrl === InterfaceDescriptor.typeUrl || typeof o.fullname === "string" && Array.isArray(o.interface_accepting_messages) && (!o.interface_accepting_messages.length || InterfaceAcceptingMessageDescriptor.isSDK(o.interface_accepting_messages[0])) && Array.isArray(o.interface_implementers) && (!o.interface_implementers.length || InterfaceImplementerDescriptor.isSDK(o.interface_implementers[0])));
    },
    isAmino(o) {
        return o && (o.$typeUrl === InterfaceDescriptor.typeUrl || typeof o.fullname === "string" && Array.isArray(o.interface_accepting_messages) && (!o.interface_accepting_messages.length || InterfaceAcceptingMessageDescriptor.isAmino(o.interface_accepting_messages[0])) && Array.isArray(o.interface_implementers) && (!o.interface_implementers.length || InterfaceImplementerDescriptor.isAmino(o.interface_implementers[0])));
    },
    encode(message, writer = BinaryWriter.create()) {
        if (message.fullname !== "") {
            writer.uint32(10).string(message.fullname);
        }
        for (const v of message.interfaceAcceptingMessages) {
            InterfaceAcceptingMessageDescriptor.encode(v, writer.uint32(18).fork()).ldelim();
        }
        for (const v of message.interfaceImplementers) {
            InterfaceImplementerDescriptor.encode(v, writer.uint32(26).fork()).ldelim();
        }
        return writer;
    },
    decode(input, length) {
        const reader = input instanceof BinaryReader ? input : new BinaryReader(input);
        let end = length === undefined ? reader.len : reader.pos + length;
        const message = createBaseInterfaceDescriptor();
        while (reader.pos < end) {
            const tag = reader.uint32();
            switch (tag >>> 3) {
                case 1:
                    message.fullname = reader.string();
                    break;
                case 2:
                    message.interfaceAcceptingMessages.push(InterfaceAcceptingMessageDescriptor.decode(reader, reader.uint32()));
                    break;
                case 3:
                    message.interfaceImplementers.push(InterfaceImplementerDescriptor.decode(reader, reader.uint32()));
                    break;
                default:
                    reader.skipType(tag & 7);
                    break;
            }
        }
        return message;
    },
    fromPartial(object) {
        const message = createBaseInterfaceDescriptor();
        message.fullname = object.fullname ?? "";
        message.interfaceAcceptingMessages = object.interfaceAcceptingMessages?.map(e => InterfaceAcceptingMessageDescriptor.fromPartial(e)) || [];
        message.interfaceImplementers = object.interfaceImplementers?.map(e => InterfaceImplementerDescriptor.fromPartial(e)) || [];
        return message;
    },
    fromAmino(object) {
        const message = createBaseInterfaceDescriptor();
        if (object.fullname !== undefined && object.fullname !== null) {
            message.fullname = object.fullname;
        }
        message.interfaceAcceptingMessages = object.interface_accepting_messages?.map(e => InterfaceAcceptingMessageDescriptor.fromAmino(e)) || [];
        message.interfaceImplementers = object.interface_implementers?.map(e => InterfaceImplementerDescriptor.fromAmino(e)) || [];
        return message;
    },
    toAmino(message) {
        const obj = {};
        obj.fullname = message.fullname === "" ? undefined : message.fullname;
        if (message.interfaceAcceptingMessages) {
            obj.interface_accepting_messages = message.interfaceAcceptingMessages.map(e => e ? InterfaceAcceptingMessageDescriptor.toAmino(e) : undefined);
        }
        else {
            obj.interface_accepting_messages = message.interfaceAcceptingMessages;
        }
        if (message.interfaceImplementers) {
            obj.interface_implementers = message.interfaceImplementers.map(e => e ? InterfaceImplementerDescriptor.toAmino(e) : undefined);
        }
        else {
            obj.interface_implementers = message.interfaceImplementers;
        }
        return obj;
    },
    fromAminoMsg(object) {
        return InterfaceDescriptor.fromAmino(object.value);
    },
    toAminoMsg(message) {
        return {
            type: "cosmos-sdk/InterfaceDescriptor",
            value: InterfaceDescriptor.toAmino(message)
        };
    },
    fromProtoMsg(message) {
        return InterfaceDescriptor.decode(message.value);
    },
    toProto(message) {
        return InterfaceDescriptor.encode(message).finish();
    },
    toProtoMsg(message) {
        return {
            typeUrl: "/cosmos.base.reflection.v2alpha1.InterfaceDescriptor",
            value: InterfaceDescriptor.encode(message).finish()
        };
    }
};
GlobalDecoderRegistry.register(InterfaceDescriptor.typeUrl, InterfaceDescriptor);
GlobalDecoderRegistry.registerAminoProtoMapping(InterfaceDescriptor.aminoType, InterfaceDescriptor.typeUrl);
function createBaseInterfaceImplementerDescriptor() {
    return {
        fullname: "",
        typeUrl: ""
    };
}
export const InterfaceImplementerDescriptor = {
    typeUrl: "/cosmos.base.reflection.v2alpha1.InterfaceImplementerDescriptor",
    aminoType: "cosmos-sdk/InterfaceImplementerDescriptor",
    is(o) {
        return o && (o.$typeUrl === InterfaceImplementerDescriptor.typeUrl || typeof o.fullname === "string" && typeof o.typeUrl === "string");
    },
    isSDK(o) {
        return o && (o.$typeUrl === InterfaceImplementerDescriptor.typeUrl || typeof o.fullname === "string" && typeof o.type_url === "string");
    },
    isAmino(o) {
        return o && (o.$typeUrl === InterfaceImplementerDescriptor.typeUrl || typeof o.fullname === "string" && typeof o.type_url === "string");
    },
    encode(message, writer = BinaryWriter.create()) {
        if (message.fullname !== "") {
            writer.uint32(10).string(message.fullname);
        }
        if (message.typeUrl !== "") {
            writer.uint32(18).string(message.typeUrl);
        }
        return writer;
    },
    decode(input, length) {
        const reader = input instanceof BinaryReader ? input : new BinaryReader(input);
        let end = length === undefined ? reader.len : reader.pos + length;
        const message = createBaseInterfaceImplementerDescriptor();
        while (reader.pos < end) {
            const tag = reader.uint32();
            switch (tag >>> 3) {
                case 1:
                    message.fullname = reader.string();
                    break;
                case 2:
                    message.typeUrl = reader.string();
                    break;
                default:
                    reader.skipType(tag & 7);
                    break;
            }
        }
        return message;
    },
    fromPartial(object) {
        const message = createBaseInterfaceImplementerDescriptor();
        message.fullname = object.fullname ?? "";
        message.typeUrl = object.typeUrl ?? "";
        return message;
    },
    fromAmino(object) {
        const message = createBaseInterfaceImplementerDescriptor();
        if (object.fullname !== undefined && object.fullname !== null) {
            message.fullname = object.fullname;
        }
        if (object.type_url !== undefined && object.type_url !== null) {
            message.typeUrl = object.type_url;
        }
        return message;
    },
    toAmino(message) {
        const obj = {};
        obj.fullname = message.fullname === "" ? undefined : message.fullname;
        obj.type_url = message.typeUrl === "" ? undefined : message.typeUrl;
        return obj;
    },
    fromAminoMsg(object) {
        return InterfaceImplementerDescriptor.fromAmino(object.value);
    },
    toAminoMsg(message) {
        return {
            type: "cosmos-sdk/InterfaceImplementerDescriptor",
            value: InterfaceImplementerDescriptor.toAmino(message)
        };
    },
    fromProtoMsg(message) {
        return InterfaceImplementerDescriptor.decode(message.value);
    },
    toProto(message) {
        return InterfaceImplementerDescriptor.encode(message).finish();
    },
    toProtoMsg(message) {
        return {
            typeUrl: "/cosmos.base.reflection.v2alpha1.InterfaceImplementerDescriptor",
            value: InterfaceImplementerDescriptor.encode(message).finish()
        };
    }
};
GlobalDecoderRegistry.register(InterfaceImplementerDescriptor.typeUrl, InterfaceImplementerDescriptor);
GlobalDecoderRegistry.registerAminoProtoMapping(InterfaceImplementerDescriptor.aminoType, InterfaceImplementerDescriptor.typeUrl);
function createBaseInterfaceAcceptingMessageDescriptor() {
    return {
        fullname: "",
        fieldDescriptorNames: []
    };
}
export const InterfaceAcceptingMessageDescriptor = {
    typeUrl: "/cosmos.base.reflection.v2alpha1.InterfaceAcceptingMessageDescriptor",
    aminoType: "cosmos-sdk/InterfaceAcceptingMessageDescriptor",
    is(o) {
        return o && (o.$typeUrl === InterfaceAcceptingMessageDescriptor.typeUrl || typeof o.fullname === "string" && Array.isArray(o.fieldDescriptorNames) && (!o.fieldDescriptorNames.length || typeof o.fieldDescriptorNames[0] === "string"));
    },
    isSDK(o) {
        return o && (o.$typeUrl === InterfaceAcceptingMessageDescriptor.typeUrl || typeof o.fullname === "string" && Array.isArray(o.field_descriptor_names) && (!o.field_descriptor_names.length || typeof o.field_descriptor_names[0] === "string"));
    },
    isAmino(o) {
        return o && (o.$typeUrl === InterfaceAcceptingMessageDescriptor.typeUrl || typeof o.fullname === "string" && Array.isArray(o.field_descriptor_names) && (!o.field_descriptor_names.length || typeof o.field_descriptor_names[0] === "string"));
    },
    encode(message, writer = BinaryWriter.create()) {
        if (message.fullname !== "") {
            writer.uint32(10).string(message.fullname);
        }
        for (const v of message.fieldDescriptorNames) {
            writer.uint32(18).string(v);
        }
        return writer;
    },
    decode(input, length) {
        const reader = input instanceof BinaryReader ? input : new BinaryReader(input);
        let end = length === undefined ? reader.len : reader.pos + length;
        const message = createBaseInterfaceAcceptingMessageDescriptor();
        while (reader.pos < end) {
            const tag = reader.uint32();
            switch (tag >>> 3) {
                case 1:
                    message.fullname = reader.string();
                    break;
                case 2:
                    message.fieldDescriptorNames.push(reader.string());
                    break;
                default:
                    reader.skipType(tag & 7);
                    break;
            }
        }
        return message;
    },
    fromPartial(object) {
        const message = createBaseInterfaceAcceptingMessageDescriptor();
        message.fullname = object.fullname ?? "";
        message.fieldDescriptorNames = object.fieldDescriptorNames?.map(e => e) || [];
        return message;
    },
    fromAmino(object) {
        const message = createBaseInterfaceAcceptingMessageDescriptor();
        if (object.fullname !== undefined && object.fullname !== null) {
            message.fullname = object.fullname;
        }
        message.fieldDescriptorNames = object.field_descriptor_names?.map(e => e) || [];
        return message;
    },
    toAmino(message) {
        const obj = {};
        obj.fullname = message.fullname === "" ? undefined : message.fullname;
        if (message.fieldDescriptorNames) {
            obj.field_descriptor_names = message.fieldDescriptorNames.map(e => e);
        }
        else {
            obj.field_descriptor_names = message.fieldDescriptorNames;
        }
        return obj;
    },
    fromAminoMsg(object) {
        return InterfaceAcceptingMessageDescriptor.fromAmino(object.value);
    },
    toAminoMsg(message) {
        return {
            type: "cosmos-sdk/InterfaceAcceptingMessageDescriptor",
            value: InterfaceAcceptingMessageDescriptor.toAmino(message)
        };
    },
    fromProtoMsg(message) {
        return InterfaceAcceptingMessageDescriptor.decode(message.value);
    },
    toProto(message) {
        return InterfaceAcceptingMessageDescriptor.encode(message).finish();
    },
    toProtoMsg(message) {
        return {
            typeUrl: "/cosmos.base.reflection.v2alpha1.InterfaceAcceptingMessageDescriptor",
            value: InterfaceAcceptingMessageDescriptor.encode(message).finish()
        };
    }
};
GlobalDecoderRegistry.register(InterfaceAcceptingMessageDescriptor.typeUrl, InterfaceAcceptingMessageDescriptor);
GlobalDecoderRegistry.registerAminoProtoMapping(InterfaceAcceptingMessageDescriptor.aminoType, InterfaceAcceptingMessageDescriptor.typeUrl);
function createBaseConfigurationDescriptor() {
    return {
        bech32AccountAddressPrefix: ""
    };
}
export const ConfigurationDescriptor = {
    typeUrl: "/cosmos.base.reflection.v2alpha1.ConfigurationDescriptor",
    aminoType: "cosmos-sdk/ConfigurationDescriptor",
    is(o) {
        return o && (o.$typeUrl === ConfigurationDescriptor.typeUrl || typeof o.bech32AccountAddressPrefix === "string");
    },
    isSDK(o) {
        return o && (o.$typeUrl === ConfigurationDescriptor.typeUrl || typeof o.bech32_account_address_prefix === "string");
    },
    isAmino(o) {
        return o && (o.$typeUrl === ConfigurationDescriptor.typeUrl || typeof o.bech32_account_address_prefix === "string");
    },
    encode(message, writer = BinaryWriter.create()) {
        if (message.bech32AccountAddressPrefix !== "") {
            writer.uint32(10).string(message.bech32AccountAddressPrefix);
        }
        return writer;
    },
    decode(input, length) {
        const reader = input instanceof BinaryReader ? input : new BinaryReader(input);
        let end = length === undefined ? reader.len : reader.pos + length;
        const message = createBaseConfigurationDescriptor();
        while (reader.pos < end) {
            const tag = reader.uint32();
            switch (tag >>> 3) {
                case 1:
                    message.bech32AccountAddressPrefix = reader.string();
                    break;
                default:
                    reader.skipType(tag & 7);
                    break;
            }
        }
        return message;
    },
    fromPartial(object) {
        const message = createBaseConfigurationDescriptor();
        message.bech32AccountAddressPrefix = object.bech32AccountAddressPrefix ?? "";
        return message;
    },
    fromAmino(object) {
        const message = createBaseConfigurationDescriptor();
        if (object.bech32_account_address_prefix !== undefined && object.bech32_account_address_prefix !== null) {
            message.bech32AccountAddressPrefix = object.bech32_account_address_prefix;
        }
        return message;
    },
    toAmino(message) {
        const obj = {};
        obj.bech32_account_address_prefix = message.bech32AccountAddressPrefix === "" ? undefined : message.bech32AccountAddressPrefix;
        return obj;
    },
    fromAminoMsg(object) {
        return ConfigurationDescriptor.fromAmino(object.value);
    },
    toAminoMsg(message) {
        return {
            type: "cosmos-sdk/ConfigurationDescriptor",
            value: ConfigurationDescriptor.toAmino(message)
        };
    },
    fromProtoMsg(message) {
        return ConfigurationDescriptor.decode(message.value);
    },
    toProto(message) {
        return ConfigurationDescriptor.encode(message).finish();
    },
    toProtoMsg(message) {
        return {
            typeUrl: "/cosmos.base.reflection.v2alpha1.ConfigurationDescriptor",
            value: ConfigurationDescriptor.encode(message).finish()
        };
    }
};
GlobalDecoderRegistry.register(ConfigurationDescriptor.typeUrl, ConfigurationDescriptor);
GlobalDecoderRegistry.registerAminoProtoMapping(ConfigurationDescriptor.aminoType, ConfigurationDescriptor.typeUrl);
function createBaseMsgDescriptor() {
    return {
        msgTypeUrl: ""
    };
}
export const MsgDescriptor = {
    typeUrl: "/cosmos.base.reflection.v2alpha1.MsgDescriptor",
    aminoType: "cosmos-sdk/MsgDescriptor",
    is(o) {
        return o && (o.$typeUrl === MsgDescriptor.typeUrl || typeof o.msgTypeUrl === "string");
    },
    isSDK(o) {
        return o && (o.$typeUrl === MsgDescriptor.typeUrl || typeof o.msg_type_url === "string");
    },
    isAmino(o) {
        return o && (o.$typeUrl === MsgDescriptor.typeUrl || typeof o.msg_type_url === "string");
    },
    encode(message, writer = BinaryWriter.create()) {
        if (message.msgTypeUrl !== "") {
            writer.uint32(10).string(message.msgTypeUrl);
        }
        return writer;
    },
    decode(input, length) {
        const reader = input instanceof BinaryReader ? input : new BinaryReader(input);
        let end = length === undefined ? reader.len : reader.pos + length;
        const message = createBaseMsgDescriptor();
        while (reader.pos < end) {
            const tag = reader.uint32();
            switch (tag >>> 3) {
                case 1:
                    message.msgTypeUrl = reader.string();
                    break;
                default:
                    reader.skipType(tag & 7);
                    break;
            }
        }
        return message;
    },
    fromPartial(object) {
        const message = createBaseMsgDescriptor();
        message.msgTypeUrl = object.msgTypeUrl ?? "";
        return message;
    },
    fromAmino(object) {
        const message = createBaseMsgDescriptor();
        if (object.msg_type_url !== undefined && object.msg_type_url !== null) {
            message.msgTypeUrl = object.msg_type_url;
        }
        return message;
    },
    toAmino(message) {
        const obj = {};
        obj.msg_type_url = message.msgTypeUrl === "" ? undefined : message.msgTypeUrl;
        return obj;
    },
    fromAminoMsg(object) {
        return MsgDescriptor.fromAmino(object.value);
    },
    toAminoMsg(message) {
        return {
            type: "cosmos-sdk/MsgDescriptor",
            value: MsgDescriptor.toAmino(message)
        };
    },
    fromProtoMsg(message) {
        return MsgDescriptor.decode(message.value);
    },
    toProto(message) {
        return MsgDescriptor.encode(message).finish();
    },
    toProtoMsg(message) {
        return {
            typeUrl: "/cosmos.base.reflection.v2alpha1.MsgDescriptor",
            value: MsgDescriptor.encode(message).finish()
        };
    }
};
GlobalDecoderRegistry.register(MsgDescriptor.typeUrl, MsgDescriptor);
GlobalDecoderRegistry.registerAminoProtoMapping(MsgDescriptor.aminoType, MsgDescriptor.typeUrl);
function createBaseGetAuthnDescriptorRequest() {
    return {};
}
export const GetAuthnDescriptorRequest = {
    typeUrl: "/cosmos.base.reflection.v2alpha1.GetAuthnDescriptorRequest",
    aminoType: "cosmos-sdk/GetAuthnDescriptorRequest",
    is(o) {
        return o && o.$typeUrl === GetAuthnDescriptorRequest.typeUrl;
    },
    isSDK(o) {
        return o && o.$typeUrl === GetAuthnDescriptorRequest.typeUrl;
    },
    isAmino(o) {
        return o && o.$typeUrl === GetAuthnDescriptorRequest.typeUrl;
    },
    encode(_, writer = BinaryWriter.create()) {
        return writer;
    },
    decode(input, length) {
        const reader = input instanceof BinaryReader ? input : new BinaryReader(input);
        let end = length === undefined ? reader.len : reader.pos + length;
        const message = createBaseGetAuthnDescriptorRequest();
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
        const message = createBaseGetAuthnDescriptorRequest();
        return message;
    },
    fromAmino(_) {
        const message = createBaseGetAuthnDescriptorRequest();
        return message;
    },
    toAmino(_) {
        const obj = {};
        return obj;
    },
    fromAminoMsg(object) {
        return GetAuthnDescriptorRequest.fromAmino(object.value);
    },
    toAminoMsg(message) {
        return {
            type: "cosmos-sdk/GetAuthnDescriptorRequest",
            value: GetAuthnDescriptorRequest.toAmino(message)
        };
    },
    fromProtoMsg(message) {
        return GetAuthnDescriptorRequest.decode(message.value);
    },
    toProto(message) {
        return GetAuthnDescriptorRequest.encode(message).finish();
    },
    toProtoMsg(message) {
        return {
            typeUrl: "/cosmos.base.reflection.v2alpha1.GetAuthnDescriptorRequest",
            value: GetAuthnDescriptorRequest.encode(message).finish()
        };
    }
};
GlobalDecoderRegistry.register(GetAuthnDescriptorRequest.typeUrl, GetAuthnDescriptorRequest);
GlobalDecoderRegistry.registerAminoProtoMapping(GetAuthnDescriptorRequest.aminoType, GetAuthnDescriptorRequest.typeUrl);
function createBaseGetAuthnDescriptorResponse() {
    return {
        authn: undefined
    };
}
export const GetAuthnDescriptorResponse = {
    typeUrl: "/cosmos.base.reflection.v2alpha1.GetAuthnDescriptorResponse",
    aminoType: "cosmos-sdk/GetAuthnDescriptorResponse",
    is(o) {
        return o && o.$typeUrl === GetAuthnDescriptorResponse.typeUrl;
    },
    isSDK(o) {
        return o && o.$typeUrl === GetAuthnDescriptorResponse.typeUrl;
    },
    isAmino(o) {
        return o && o.$typeUrl === GetAuthnDescriptorResponse.typeUrl;
    },
    encode(message, writer = BinaryWriter.create()) {
        if (message.authn !== undefined) {
            AuthnDescriptor.encode(message.authn, writer.uint32(10).fork()).ldelim();
        }
        return writer;
    },
    decode(input, length) {
        const reader = input instanceof BinaryReader ? input : new BinaryReader(input);
        let end = length === undefined ? reader.len : reader.pos + length;
        const message = createBaseGetAuthnDescriptorResponse();
        while (reader.pos < end) {
            const tag = reader.uint32();
            switch (tag >>> 3) {
                case 1:
                    message.authn = AuthnDescriptor.decode(reader, reader.uint32());
                    break;
                default:
                    reader.skipType(tag & 7);
                    break;
            }
        }
        return message;
    },
    fromPartial(object) {
        const message = createBaseGetAuthnDescriptorResponse();
        message.authn = object.authn !== undefined && object.authn !== null ? AuthnDescriptor.fromPartial(object.authn) : undefined;
        return message;
    },
    fromAmino(object) {
        const message = createBaseGetAuthnDescriptorResponse();
        if (object.authn !== undefined && object.authn !== null) {
            message.authn = AuthnDescriptor.fromAmino(object.authn);
        }
        return message;
    },
    toAmino(message) {
        const obj = {};
        obj.authn = message.authn ? AuthnDescriptor.toAmino(message.authn) : undefined;
        return obj;
    },
    fromAminoMsg(object) {
        return GetAuthnDescriptorResponse.fromAmino(object.value);
    },
    toAminoMsg(message) {
        return {
            type: "cosmos-sdk/GetAuthnDescriptorResponse",
            value: GetAuthnDescriptorResponse.toAmino(message)
        };
    },
    fromProtoMsg(message) {
        return GetAuthnDescriptorResponse.decode(message.value);
    },
    toProto(message) {
        return GetAuthnDescriptorResponse.encode(message).finish();
    },
    toProtoMsg(message) {
        return {
            typeUrl: "/cosmos.base.reflection.v2alpha1.GetAuthnDescriptorResponse",
            value: GetAuthnDescriptorResponse.encode(message).finish()
        };
    }
};
GlobalDecoderRegistry.register(GetAuthnDescriptorResponse.typeUrl, GetAuthnDescriptorResponse);
GlobalDecoderRegistry.registerAminoProtoMapping(GetAuthnDescriptorResponse.aminoType, GetAuthnDescriptorResponse.typeUrl);
function createBaseGetChainDescriptorRequest() {
    return {};
}
export const GetChainDescriptorRequest = {
    typeUrl: "/cosmos.base.reflection.v2alpha1.GetChainDescriptorRequest",
    aminoType: "cosmos-sdk/GetChainDescriptorRequest",
    is(o) {
        return o && o.$typeUrl === GetChainDescriptorRequest.typeUrl;
    },
    isSDK(o) {
        return o && o.$typeUrl === GetChainDescriptorRequest.typeUrl;
    },
    isAmino(o) {
        return o && o.$typeUrl === GetChainDescriptorRequest.typeUrl;
    },
    encode(_, writer = BinaryWriter.create()) {
        return writer;
    },
    decode(input, length) {
        const reader = input instanceof BinaryReader ? input : new BinaryReader(input);
        let end = length === undefined ? reader.len : reader.pos + length;
        const message = createBaseGetChainDescriptorRequest();
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
        const message = createBaseGetChainDescriptorRequest();
        return message;
    },
    fromAmino(_) {
        const message = createBaseGetChainDescriptorRequest();
        return message;
    },
    toAmino(_) {
        const obj = {};
        return obj;
    },
    fromAminoMsg(object) {
        return GetChainDescriptorRequest.fromAmino(object.value);
    },
    toAminoMsg(message) {
        return {
            type: "cosmos-sdk/GetChainDescriptorRequest",
            value: GetChainDescriptorRequest.toAmino(message)
        };
    },
    fromProtoMsg(message) {
        return GetChainDescriptorRequest.decode(message.value);
    },
    toProto(message) {
        return GetChainDescriptorRequest.encode(message).finish();
    },
    toProtoMsg(message) {
        return {
            typeUrl: "/cosmos.base.reflection.v2alpha1.GetChainDescriptorRequest",
            value: GetChainDescriptorRequest.encode(message).finish()
        };
    }
};
GlobalDecoderRegistry.register(GetChainDescriptorRequest.typeUrl, GetChainDescriptorRequest);
GlobalDecoderRegistry.registerAminoProtoMapping(GetChainDescriptorRequest.aminoType, GetChainDescriptorRequest.typeUrl);
function createBaseGetChainDescriptorResponse() {
    return {
        chain: undefined
    };
}
export const GetChainDescriptorResponse = {
    typeUrl: "/cosmos.base.reflection.v2alpha1.GetChainDescriptorResponse",
    aminoType: "cosmos-sdk/GetChainDescriptorResponse",
    is(o) {
        return o && o.$typeUrl === GetChainDescriptorResponse.typeUrl;
    },
    isSDK(o) {
        return o && o.$typeUrl === GetChainDescriptorResponse.typeUrl;
    },
    isAmino(o) {
        return o && o.$typeUrl === GetChainDescriptorResponse.typeUrl;
    },
    encode(message, writer = BinaryWriter.create()) {
        if (message.chain !== undefined) {
            ChainDescriptor.encode(message.chain, writer.uint32(10).fork()).ldelim();
        }
        return writer;
    },
    decode(input, length) {
        const reader = input instanceof BinaryReader ? input : new BinaryReader(input);
        let end = length === undefined ? reader.len : reader.pos + length;
        const message = createBaseGetChainDescriptorResponse();
        while (reader.pos < end) {
            const tag = reader.uint32();
            switch (tag >>> 3) {
                case 1:
                    message.chain = ChainDescriptor.decode(reader, reader.uint32());
                    break;
                default:
                    reader.skipType(tag & 7);
                    break;
            }
        }
        return message;
    },
    fromPartial(object) {
        const message = createBaseGetChainDescriptorResponse();
        message.chain = object.chain !== undefined && object.chain !== null ? ChainDescriptor.fromPartial(object.chain) : undefined;
        return message;
    },
    fromAmino(object) {
        const message = createBaseGetChainDescriptorResponse();
        if (object.chain !== undefined && object.chain !== null) {
            message.chain = ChainDescriptor.fromAmino(object.chain);
        }
        return message;
    },
    toAmino(message) {
        const obj = {};
        obj.chain = message.chain ? ChainDescriptor.toAmino(message.chain) : undefined;
        return obj;
    },
    fromAminoMsg(object) {
        return GetChainDescriptorResponse.fromAmino(object.value);
    },
    toAminoMsg(message) {
        return {
            type: "cosmos-sdk/GetChainDescriptorResponse",
            value: GetChainDescriptorResponse.toAmino(message)
        };
    },
    fromProtoMsg(message) {
        return GetChainDescriptorResponse.decode(message.value);
    },
    toProto(message) {
        return GetChainDescriptorResponse.encode(message).finish();
    },
    toProtoMsg(message) {
        return {
            typeUrl: "/cosmos.base.reflection.v2alpha1.GetChainDescriptorResponse",
            value: GetChainDescriptorResponse.encode(message).finish()
        };
    }
};
GlobalDecoderRegistry.register(GetChainDescriptorResponse.typeUrl, GetChainDescriptorResponse);
GlobalDecoderRegistry.registerAminoProtoMapping(GetChainDescriptorResponse.aminoType, GetChainDescriptorResponse.typeUrl);
function createBaseGetCodecDescriptorRequest() {
    return {};
}
export const GetCodecDescriptorRequest = {
    typeUrl: "/cosmos.base.reflection.v2alpha1.GetCodecDescriptorRequest",
    aminoType: "cosmos-sdk/GetCodecDescriptorRequest",
    is(o) {
        return o && o.$typeUrl === GetCodecDescriptorRequest.typeUrl;
    },
    isSDK(o) {
        return o && o.$typeUrl === GetCodecDescriptorRequest.typeUrl;
    },
    isAmino(o) {
        return o && o.$typeUrl === GetCodecDescriptorRequest.typeUrl;
    },
    encode(_, writer = BinaryWriter.create()) {
        return writer;
    },
    decode(input, length) {
        const reader = input instanceof BinaryReader ? input : new BinaryReader(input);
        let end = length === undefined ? reader.len : reader.pos + length;
        const message = createBaseGetCodecDescriptorRequest();
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
        const message = createBaseGetCodecDescriptorRequest();
        return message;
    },
    fromAmino(_) {
        const message = createBaseGetCodecDescriptorRequest();
        return message;
    },
    toAmino(_) {
        const obj = {};
        return obj;
    },
    fromAminoMsg(object) {
        return GetCodecDescriptorRequest.fromAmino(object.value);
    },
    toAminoMsg(message) {
        return {
            type: "cosmos-sdk/GetCodecDescriptorRequest",
            value: GetCodecDescriptorRequest.toAmino(message)
        };
    },
    fromProtoMsg(message) {
        return GetCodecDescriptorRequest.decode(message.value);
    },
    toProto(message) {
        return GetCodecDescriptorRequest.encode(message).finish();
    },
    toProtoMsg(message) {
        return {
            typeUrl: "/cosmos.base.reflection.v2alpha1.GetCodecDescriptorRequest",
            value: GetCodecDescriptorRequest.encode(message).finish()
        };
    }
};
GlobalDecoderRegistry.register(GetCodecDescriptorRequest.typeUrl, GetCodecDescriptorRequest);
GlobalDecoderRegistry.registerAminoProtoMapping(GetCodecDescriptorRequest.aminoType, GetCodecDescriptorRequest.typeUrl);
function createBaseGetCodecDescriptorResponse() {
    return {
        codec: undefined
    };
}
export const GetCodecDescriptorResponse = {
    typeUrl: "/cosmos.base.reflection.v2alpha1.GetCodecDescriptorResponse",
    aminoType: "cosmos-sdk/GetCodecDescriptorResponse",
    is(o) {
        return o && o.$typeUrl === GetCodecDescriptorResponse.typeUrl;
    },
    isSDK(o) {
        return o && o.$typeUrl === GetCodecDescriptorResponse.typeUrl;
    },
    isAmino(o) {
        return o && o.$typeUrl === GetCodecDescriptorResponse.typeUrl;
    },
    encode(message, writer = BinaryWriter.create()) {
        if (message.codec !== undefined) {
            CodecDescriptor.encode(message.codec, writer.uint32(10).fork()).ldelim();
        }
        return writer;
    },
    decode(input, length) {
        const reader = input instanceof BinaryReader ? input : new BinaryReader(input);
        let end = length === undefined ? reader.len : reader.pos + length;
        const message = createBaseGetCodecDescriptorResponse();
        while (reader.pos < end) {
            const tag = reader.uint32();
            switch (tag >>> 3) {
                case 1:
                    message.codec = CodecDescriptor.decode(reader, reader.uint32());
                    break;
                default:
                    reader.skipType(tag & 7);
                    break;
            }
        }
        return message;
    },
    fromPartial(object) {
        const message = createBaseGetCodecDescriptorResponse();
        message.codec = object.codec !== undefined && object.codec !== null ? CodecDescriptor.fromPartial(object.codec) : undefined;
        return message;
    },
    fromAmino(object) {
        const message = createBaseGetCodecDescriptorResponse();
        if (object.codec !== undefined && object.codec !== null) {
            message.codec = CodecDescriptor.fromAmino(object.codec);
        }
        return message;
    },
    toAmino(message) {
        const obj = {};
        obj.codec = message.codec ? CodecDescriptor.toAmino(message.codec) : undefined;
        return obj;
    },
    fromAminoMsg(object) {
        return GetCodecDescriptorResponse.fromAmino(object.value);
    },
    toAminoMsg(message) {
        return {
            type: "cosmos-sdk/GetCodecDescriptorResponse",
            value: GetCodecDescriptorResponse.toAmino(message)
        };
    },
    fromProtoMsg(message) {
        return GetCodecDescriptorResponse.decode(message.value);
    },
    toProto(message) {
        return GetCodecDescriptorResponse.encode(message).finish();
    },
    toProtoMsg(message) {
        return {
            typeUrl: "/cosmos.base.reflection.v2alpha1.GetCodecDescriptorResponse",
            value: GetCodecDescriptorResponse.encode(message).finish()
        };
    }
};
GlobalDecoderRegistry.register(GetCodecDescriptorResponse.typeUrl, GetCodecDescriptorResponse);
GlobalDecoderRegistry.registerAminoProtoMapping(GetCodecDescriptorResponse.aminoType, GetCodecDescriptorResponse.typeUrl);
function createBaseGetConfigurationDescriptorRequest() {
    return {};
}
export const GetConfigurationDescriptorRequest = {
    typeUrl: "/cosmos.base.reflection.v2alpha1.GetConfigurationDescriptorRequest",
    aminoType: "cosmos-sdk/GetConfigurationDescriptorRequest",
    is(o) {
        return o && o.$typeUrl === GetConfigurationDescriptorRequest.typeUrl;
    },
    isSDK(o) {
        return o && o.$typeUrl === GetConfigurationDescriptorRequest.typeUrl;
    },
    isAmino(o) {
        return o && o.$typeUrl === GetConfigurationDescriptorRequest.typeUrl;
    },
    encode(_, writer = BinaryWriter.create()) {
        return writer;
    },
    decode(input, length) {
        const reader = input instanceof BinaryReader ? input : new BinaryReader(input);
        let end = length === undefined ? reader.len : reader.pos + length;
        const message = createBaseGetConfigurationDescriptorRequest();
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
        const message = createBaseGetConfigurationDescriptorRequest();
        return message;
    },
    fromAmino(_) {
        const message = createBaseGetConfigurationDescriptorRequest();
        return message;
    },
    toAmino(_) {
        const obj = {};
        return obj;
    },
    fromAminoMsg(object) {
        return GetConfigurationDescriptorRequest.fromAmino(object.value);
    },
    toAminoMsg(message) {
        return {
            type: "cosmos-sdk/GetConfigurationDescriptorRequest",
            value: GetConfigurationDescriptorRequest.toAmino(message)
        };
    },
    fromProtoMsg(message) {
        return GetConfigurationDescriptorRequest.decode(message.value);
    },
    toProto(message) {
        return GetConfigurationDescriptorRequest.encode(message).finish();
    },
    toProtoMsg(message) {
        return {
            typeUrl: "/cosmos.base.reflection.v2alpha1.GetConfigurationDescriptorRequest",
            value: GetConfigurationDescriptorRequest.encode(message).finish()
        };
    }
};
GlobalDecoderRegistry.register(GetConfigurationDescriptorRequest.typeUrl, GetConfigurationDescriptorRequest);
GlobalDecoderRegistry.registerAminoProtoMapping(GetConfigurationDescriptorRequest.aminoType, GetConfigurationDescriptorRequest.typeUrl);
function createBaseGetConfigurationDescriptorResponse() {
    return {
        config: undefined
    };
}
export const GetConfigurationDescriptorResponse = {
    typeUrl: "/cosmos.base.reflection.v2alpha1.GetConfigurationDescriptorResponse",
    aminoType: "cosmos-sdk/GetConfigurationDescriptorResponse",
    is(o) {
        return o && o.$typeUrl === GetConfigurationDescriptorResponse.typeUrl;
    },
    isSDK(o) {
        return o && o.$typeUrl === GetConfigurationDescriptorResponse.typeUrl;
    },
    isAmino(o) {
        return o && o.$typeUrl === GetConfigurationDescriptorResponse.typeUrl;
    },
    encode(message, writer = BinaryWriter.create()) {
        if (message.config !== undefined) {
            ConfigurationDescriptor.encode(message.config, writer.uint32(10).fork()).ldelim();
        }
        return writer;
    },
    decode(input, length) {
        const reader = input instanceof BinaryReader ? input : new BinaryReader(input);
        let end = length === undefined ? reader.len : reader.pos + length;
        const message = createBaseGetConfigurationDescriptorResponse();
        while (reader.pos < end) {
            const tag = reader.uint32();
            switch (tag >>> 3) {
                case 1:
                    message.config = ConfigurationDescriptor.decode(reader, reader.uint32());
                    break;
                default:
                    reader.skipType(tag & 7);
                    break;
            }
        }
        return message;
    },
    fromPartial(object) {
        const message = createBaseGetConfigurationDescriptorResponse();
        message.config = object.config !== undefined && object.config !== null ? ConfigurationDescriptor.fromPartial(object.config) : undefined;
        return message;
    },
    fromAmino(object) {
        const message = createBaseGetConfigurationDescriptorResponse();
        if (object.config !== undefined && object.config !== null) {
            message.config = ConfigurationDescriptor.fromAmino(object.config);
        }
        return message;
    },
    toAmino(message) {
        const obj = {};
        obj.config = message.config ? ConfigurationDescriptor.toAmino(message.config) : undefined;
        return obj;
    },
    fromAminoMsg(object) {
        return GetConfigurationDescriptorResponse.fromAmino(object.value);
    },
    toAminoMsg(message) {
        return {
            type: "cosmos-sdk/GetConfigurationDescriptorResponse",
            value: GetConfigurationDescriptorResponse.toAmino(message)
        };
    },
    fromProtoMsg(message) {
        return GetConfigurationDescriptorResponse.decode(message.value);
    },
    toProto(message) {
        return GetConfigurationDescriptorResponse.encode(message).finish();
    },
    toProtoMsg(message) {
        return {
            typeUrl: "/cosmos.base.reflection.v2alpha1.GetConfigurationDescriptorResponse",
            value: GetConfigurationDescriptorResponse.encode(message).finish()
        };
    }
};
GlobalDecoderRegistry.register(GetConfigurationDescriptorResponse.typeUrl, GetConfigurationDescriptorResponse);
GlobalDecoderRegistry.registerAminoProtoMapping(GetConfigurationDescriptorResponse.aminoType, GetConfigurationDescriptorResponse.typeUrl);
function createBaseGetQueryServicesDescriptorRequest() {
    return {};
}
export const GetQueryServicesDescriptorRequest = {
    typeUrl: "/cosmos.base.reflection.v2alpha1.GetQueryServicesDescriptorRequest",
    aminoType: "cosmos-sdk/GetQueryServicesDescriptorRequest",
    is(o) {
        return o && o.$typeUrl === GetQueryServicesDescriptorRequest.typeUrl;
    },
    isSDK(o) {
        return o && o.$typeUrl === GetQueryServicesDescriptorRequest.typeUrl;
    },
    isAmino(o) {
        return o && o.$typeUrl === GetQueryServicesDescriptorRequest.typeUrl;
    },
    encode(_, writer = BinaryWriter.create()) {
        return writer;
    },
    decode(input, length) {
        const reader = input instanceof BinaryReader ? input : new BinaryReader(input);
        let end = length === undefined ? reader.len : reader.pos + length;
        const message = createBaseGetQueryServicesDescriptorRequest();
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
        const message = createBaseGetQueryServicesDescriptorRequest();
        return message;
    },
    fromAmino(_) {
        const message = createBaseGetQueryServicesDescriptorRequest();
        return message;
    },
    toAmino(_) {
        const obj = {};
        return obj;
    },
    fromAminoMsg(object) {
        return GetQueryServicesDescriptorRequest.fromAmino(object.value);
    },
    toAminoMsg(message) {
        return {
            type: "cosmos-sdk/GetQueryServicesDescriptorRequest",
            value: GetQueryServicesDescriptorRequest.toAmino(message)
        };
    },
    fromProtoMsg(message) {
        return GetQueryServicesDescriptorRequest.decode(message.value);
    },
    toProto(message) {
        return GetQueryServicesDescriptorRequest.encode(message).finish();
    },
    toProtoMsg(message) {
        return {
            typeUrl: "/cosmos.base.reflection.v2alpha1.GetQueryServicesDescriptorRequest",
            value: GetQueryServicesDescriptorRequest.encode(message).finish()
        };
    }
};
GlobalDecoderRegistry.register(GetQueryServicesDescriptorRequest.typeUrl, GetQueryServicesDescriptorRequest);
GlobalDecoderRegistry.registerAminoProtoMapping(GetQueryServicesDescriptorRequest.aminoType, GetQueryServicesDescriptorRequest.typeUrl);
function createBaseGetQueryServicesDescriptorResponse() {
    return {
        queries: undefined
    };
}
export const GetQueryServicesDescriptorResponse = {
    typeUrl: "/cosmos.base.reflection.v2alpha1.GetQueryServicesDescriptorResponse",
    aminoType: "cosmos-sdk/GetQueryServicesDescriptorResponse",
    is(o) {
        return o && o.$typeUrl === GetQueryServicesDescriptorResponse.typeUrl;
    },
    isSDK(o) {
        return o && o.$typeUrl === GetQueryServicesDescriptorResponse.typeUrl;
    },
    isAmino(o) {
        return o && o.$typeUrl === GetQueryServicesDescriptorResponse.typeUrl;
    },
    encode(message, writer = BinaryWriter.create()) {
        if (message.queries !== undefined) {
            QueryServicesDescriptor.encode(message.queries, writer.uint32(10).fork()).ldelim();
        }
        return writer;
    },
    decode(input, length) {
        const reader = input instanceof BinaryReader ? input : new BinaryReader(input);
        let end = length === undefined ? reader.len : reader.pos + length;
        const message = createBaseGetQueryServicesDescriptorResponse();
        while (reader.pos < end) {
            const tag = reader.uint32();
            switch (tag >>> 3) {
                case 1:
                    message.queries = QueryServicesDescriptor.decode(reader, reader.uint32());
                    break;
                default:
                    reader.skipType(tag & 7);
                    break;
            }
        }
        return message;
    },
    fromPartial(object) {
        const message = createBaseGetQueryServicesDescriptorResponse();
        message.queries = object.queries !== undefined && object.queries !== null ? QueryServicesDescriptor.fromPartial(object.queries) : undefined;
        return message;
    },
    fromAmino(object) {
        const message = createBaseGetQueryServicesDescriptorResponse();
        if (object.queries !== undefined && object.queries !== null) {
            message.queries = QueryServicesDescriptor.fromAmino(object.queries);
        }
        return message;
    },
    toAmino(message) {
        const obj = {};
        obj.queries = message.queries ? QueryServicesDescriptor.toAmino(message.queries) : undefined;
        return obj;
    },
    fromAminoMsg(object) {
        return GetQueryServicesDescriptorResponse.fromAmino(object.value);
    },
    toAminoMsg(message) {
        return {
            type: "cosmos-sdk/GetQueryServicesDescriptorResponse",
            value: GetQueryServicesDescriptorResponse.toAmino(message)
        };
    },
    fromProtoMsg(message) {
        return GetQueryServicesDescriptorResponse.decode(message.value);
    },
    toProto(message) {
        return GetQueryServicesDescriptorResponse.encode(message).finish();
    },
    toProtoMsg(message) {
        return {
            typeUrl: "/cosmos.base.reflection.v2alpha1.GetQueryServicesDescriptorResponse",
            value: GetQueryServicesDescriptorResponse.encode(message).finish()
        };
    }
};
GlobalDecoderRegistry.register(GetQueryServicesDescriptorResponse.typeUrl, GetQueryServicesDescriptorResponse);
GlobalDecoderRegistry.registerAminoProtoMapping(GetQueryServicesDescriptorResponse.aminoType, GetQueryServicesDescriptorResponse.typeUrl);
function createBaseGetTxDescriptorRequest() {
    return {};
}
export const GetTxDescriptorRequest = {
    typeUrl: "/cosmos.base.reflection.v2alpha1.GetTxDescriptorRequest",
    aminoType: "cosmos-sdk/GetTxDescriptorRequest",
    is(o) {
        return o && o.$typeUrl === GetTxDescriptorRequest.typeUrl;
    },
    isSDK(o) {
        return o && o.$typeUrl === GetTxDescriptorRequest.typeUrl;
    },
    isAmino(o) {
        return o && o.$typeUrl === GetTxDescriptorRequest.typeUrl;
    },
    encode(_, writer = BinaryWriter.create()) {
        return writer;
    },
    decode(input, length) {
        const reader = input instanceof BinaryReader ? input : new BinaryReader(input);
        let end = length === undefined ? reader.len : reader.pos + length;
        const message = createBaseGetTxDescriptorRequest();
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
        const message = createBaseGetTxDescriptorRequest();
        return message;
    },
    fromAmino(_) {
        const message = createBaseGetTxDescriptorRequest();
        return message;
    },
    toAmino(_) {
        const obj = {};
        return obj;
    },
    fromAminoMsg(object) {
        return GetTxDescriptorRequest.fromAmino(object.value);
    },
    toAminoMsg(message) {
        return {
            type: "cosmos-sdk/GetTxDescriptorRequest",
            value: GetTxDescriptorRequest.toAmino(message)
        };
    },
    fromProtoMsg(message) {
        return GetTxDescriptorRequest.decode(message.value);
    },
    toProto(message) {
        return GetTxDescriptorRequest.encode(message).finish();
    },
    toProtoMsg(message) {
        return {
            typeUrl: "/cosmos.base.reflection.v2alpha1.GetTxDescriptorRequest",
            value: GetTxDescriptorRequest.encode(message).finish()
        };
    }
};
GlobalDecoderRegistry.register(GetTxDescriptorRequest.typeUrl, GetTxDescriptorRequest);
GlobalDecoderRegistry.registerAminoProtoMapping(GetTxDescriptorRequest.aminoType, GetTxDescriptorRequest.typeUrl);
function createBaseGetTxDescriptorResponse() {
    return {
        tx: undefined
    };
}
export const GetTxDescriptorResponse = {
    typeUrl: "/cosmos.base.reflection.v2alpha1.GetTxDescriptorResponse",
    aminoType: "cosmos-sdk/GetTxDescriptorResponse",
    is(o) {
        return o && o.$typeUrl === GetTxDescriptorResponse.typeUrl;
    },
    isSDK(o) {
        return o && o.$typeUrl === GetTxDescriptorResponse.typeUrl;
    },
    isAmino(o) {
        return o && o.$typeUrl === GetTxDescriptorResponse.typeUrl;
    },
    encode(message, writer = BinaryWriter.create()) {
        if (message.tx !== undefined) {
            TxDescriptor.encode(message.tx, writer.uint32(10).fork()).ldelim();
        }
        return writer;
    },
    decode(input, length) {
        const reader = input instanceof BinaryReader ? input : new BinaryReader(input);
        let end = length === undefined ? reader.len : reader.pos + length;
        const message = createBaseGetTxDescriptorResponse();
        while (reader.pos < end) {
            const tag = reader.uint32();
            switch (tag >>> 3) {
                case 1:
                    message.tx = TxDescriptor.decode(reader, reader.uint32());
                    break;
                default:
                    reader.skipType(tag & 7);
                    break;
            }
        }
        return message;
    },
    fromPartial(object) {
        const message = createBaseGetTxDescriptorResponse();
        message.tx = object.tx !== undefined && object.tx !== null ? TxDescriptor.fromPartial(object.tx) : undefined;
        return message;
    },
    fromAmino(object) {
        const message = createBaseGetTxDescriptorResponse();
        if (object.tx !== undefined && object.tx !== null) {
            message.tx = TxDescriptor.fromAmino(object.tx);
        }
        return message;
    },
    toAmino(message) {
        const obj = {};
        obj.tx = message.tx ? TxDescriptor.toAmino(message.tx) : undefined;
        return obj;
    },
    fromAminoMsg(object) {
        return GetTxDescriptorResponse.fromAmino(object.value);
    },
    toAminoMsg(message) {
        return {
            type: "cosmos-sdk/GetTxDescriptorResponse",
            value: GetTxDescriptorResponse.toAmino(message)
        };
    },
    fromProtoMsg(message) {
        return GetTxDescriptorResponse.decode(message.value);
    },
    toProto(message) {
        return GetTxDescriptorResponse.encode(message).finish();
    },
    toProtoMsg(message) {
        return {
            typeUrl: "/cosmos.base.reflection.v2alpha1.GetTxDescriptorResponse",
            value: GetTxDescriptorResponse.encode(message).finish()
        };
    }
};
GlobalDecoderRegistry.register(GetTxDescriptorResponse.typeUrl, GetTxDescriptorResponse);
GlobalDecoderRegistry.registerAminoProtoMapping(GetTxDescriptorResponse.aminoType, GetTxDescriptorResponse.typeUrl);
function createBaseQueryServicesDescriptor() {
    return {
        queryServices: []
    };
}
export const QueryServicesDescriptor = {
    typeUrl: "/cosmos.base.reflection.v2alpha1.QueryServicesDescriptor",
    aminoType: "cosmos-sdk/QueryServicesDescriptor",
    is(o) {
        return o && (o.$typeUrl === QueryServicesDescriptor.typeUrl || Array.isArray(o.queryServices) && (!o.queryServices.length || QueryServiceDescriptor.is(o.queryServices[0])));
    },
    isSDK(o) {
        return o && (o.$typeUrl === QueryServicesDescriptor.typeUrl || Array.isArray(o.query_services) && (!o.query_services.length || QueryServiceDescriptor.isSDK(o.query_services[0])));
    },
    isAmino(o) {
        return o && (o.$typeUrl === QueryServicesDescriptor.typeUrl || Array.isArray(o.query_services) && (!o.query_services.length || QueryServiceDescriptor.isAmino(o.query_services[0])));
    },
    encode(message, writer = BinaryWriter.create()) {
        for (const v of message.queryServices) {
            QueryServiceDescriptor.encode(v, writer.uint32(10).fork()).ldelim();
        }
        return writer;
    },
    decode(input, length) {
        const reader = input instanceof BinaryReader ? input : new BinaryReader(input);
        let end = length === undefined ? reader.len : reader.pos + length;
        const message = createBaseQueryServicesDescriptor();
        while (reader.pos < end) {
            const tag = reader.uint32();
            switch (tag >>> 3) {
                case 1:
                    message.queryServices.push(QueryServiceDescriptor.decode(reader, reader.uint32()));
                    break;
                default:
                    reader.skipType(tag & 7);
                    break;
            }
        }
        return message;
    },
    fromPartial(object) {
        const message = createBaseQueryServicesDescriptor();
        message.queryServices = object.queryServices?.map(e => QueryServiceDescriptor.fromPartial(e)) || [];
        return message;
    },
    fromAmino(object) {
        const message = createBaseQueryServicesDescriptor();
        message.queryServices = object.query_services?.map(e => QueryServiceDescriptor.fromAmino(e)) || [];
        return message;
    },
    toAmino(message) {
        const obj = {};
        if (message.queryServices) {
            obj.query_services = message.queryServices.map(e => e ? QueryServiceDescriptor.toAmino(e) : undefined);
        }
        else {
            obj.query_services = message.queryServices;
        }
        return obj;
    },
    fromAminoMsg(object) {
        return QueryServicesDescriptor.fromAmino(object.value);
    },
    toAminoMsg(message) {
        return {
            type: "cosmos-sdk/QueryServicesDescriptor",
            value: QueryServicesDescriptor.toAmino(message)
        };
    },
    fromProtoMsg(message) {
        return QueryServicesDescriptor.decode(message.value);
    },
    toProto(message) {
        return QueryServicesDescriptor.encode(message).finish();
    },
    toProtoMsg(message) {
        return {
            typeUrl: "/cosmos.base.reflection.v2alpha1.QueryServicesDescriptor",
            value: QueryServicesDescriptor.encode(message).finish()
        };
    }
};
GlobalDecoderRegistry.register(QueryServicesDescriptor.typeUrl, QueryServicesDescriptor);
GlobalDecoderRegistry.registerAminoProtoMapping(QueryServicesDescriptor.aminoType, QueryServicesDescriptor.typeUrl);
function createBaseQueryServiceDescriptor() {
    return {
        fullname: "",
        isModule: false,
        methods: []
    };
}
export const QueryServiceDescriptor = {
    typeUrl: "/cosmos.base.reflection.v2alpha1.QueryServiceDescriptor",
    aminoType: "cosmos-sdk/QueryServiceDescriptor",
    is(o) {
        return o && (o.$typeUrl === QueryServiceDescriptor.typeUrl || typeof o.fullname === "string" && typeof o.isModule === "boolean" && Array.isArray(o.methods) && (!o.methods.length || QueryMethodDescriptor.is(o.methods[0])));
    },
    isSDK(o) {
        return o && (o.$typeUrl === QueryServiceDescriptor.typeUrl || typeof o.fullname === "string" && typeof o.is_module === "boolean" && Array.isArray(o.methods) && (!o.methods.length || QueryMethodDescriptor.isSDK(o.methods[0])));
    },
    isAmino(o) {
        return o && (o.$typeUrl === QueryServiceDescriptor.typeUrl || typeof o.fullname === "string" && typeof o.is_module === "boolean" && Array.isArray(o.methods) && (!o.methods.length || QueryMethodDescriptor.isAmino(o.methods[0])));
    },
    encode(message, writer = BinaryWriter.create()) {
        if (message.fullname !== "") {
            writer.uint32(10).string(message.fullname);
        }
        if (message.isModule === true) {
            writer.uint32(16).bool(message.isModule);
        }
        for (const v of message.methods) {
            QueryMethodDescriptor.encode(v, writer.uint32(26).fork()).ldelim();
        }
        return writer;
    },
    decode(input, length) {
        const reader = input instanceof BinaryReader ? input : new BinaryReader(input);
        let end = length === undefined ? reader.len : reader.pos + length;
        const message = createBaseQueryServiceDescriptor();
        while (reader.pos < end) {
            const tag = reader.uint32();
            switch (tag >>> 3) {
                case 1:
                    message.fullname = reader.string();
                    break;
                case 2:
                    message.isModule = reader.bool();
                    break;
                case 3:
                    message.methods.push(QueryMethodDescriptor.decode(reader, reader.uint32()));
                    break;
                default:
                    reader.skipType(tag & 7);
                    break;
            }
        }
        return message;
    },
    fromPartial(object) {
        const message = createBaseQueryServiceDescriptor();
        message.fullname = object.fullname ?? "";
        message.isModule = object.isModule ?? false;
        message.methods = object.methods?.map(e => QueryMethodDescriptor.fromPartial(e)) || [];
        return message;
    },
    fromAmino(object) {
        const message = createBaseQueryServiceDescriptor();
        if (object.fullname !== undefined && object.fullname !== null) {
            message.fullname = object.fullname;
        }
        if (object.is_module !== undefined && object.is_module !== null) {
            message.isModule = object.is_module;
        }
        message.methods = object.methods?.map(e => QueryMethodDescriptor.fromAmino(e)) || [];
        return message;
    },
    toAmino(message) {
        const obj = {};
        obj.fullname = message.fullname === "" ? undefined : message.fullname;
        obj.is_module = message.isModule === false ? undefined : message.isModule;
        if (message.methods) {
            obj.methods = message.methods.map(e => e ? QueryMethodDescriptor.toAmino(e) : undefined);
        }
        else {
            obj.methods = message.methods;
        }
        return obj;
    },
    fromAminoMsg(object) {
        return QueryServiceDescriptor.fromAmino(object.value);
    },
    toAminoMsg(message) {
        return {
            type: "cosmos-sdk/QueryServiceDescriptor",
            value: QueryServiceDescriptor.toAmino(message)
        };
    },
    fromProtoMsg(message) {
        return QueryServiceDescriptor.decode(message.value);
    },
    toProto(message) {
        return QueryServiceDescriptor.encode(message).finish();
    },
    toProtoMsg(message) {
        return {
            typeUrl: "/cosmos.base.reflection.v2alpha1.QueryServiceDescriptor",
            value: QueryServiceDescriptor.encode(message).finish()
        };
    }
};
GlobalDecoderRegistry.register(QueryServiceDescriptor.typeUrl, QueryServiceDescriptor);
GlobalDecoderRegistry.registerAminoProtoMapping(QueryServiceDescriptor.aminoType, QueryServiceDescriptor.typeUrl);
function createBaseQueryMethodDescriptor() {
    return {
        name: "",
        fullQueryPath: ""
    };
}
export const QueryMethodDescriptor = {
    typeUrl: "/cosmos.base.reflection.v2alpha1.QueryMethodDescriptor",
    aminoType: "cosmos-sdk/QueryMethodDescriptor",
    is(o) {
        return o && (o.$typeUrl === QueryMethodDescriptor.typeUrl || typeof o.name === "string" && typeof o.fullQueryPath === "string");
    },
    isSDK(o) {
        return o && (o.$typeUrl === QueryMethodDescriptor.typeUrl || typeof o.name === "string" && typeof o.full_query_path === "string");
    },
    isAmino(o) {
        return o && (o.$typeUrl === QueryMethodDescriptor.typeUrl || typeof o.name === "string" && typeof o.full_query_path === "string");
    },
    encode(message, writer = BinaryWriter.create()) {
        if (message.name !== "") {
            writer.uint32(10).string(message.name);
        }
        if (message.fullQueryPath !== "") {
            writer.uint32(18).string(message.fullQueryPath);
        }
        return writer;
    },
    decode(input, length) {
        const reader = input instanceof BinaryReader ? input : new BinaryReader(input);
        let end = length === undefined ? reader.len : reader.pos + length;
        const message = createBaseQueryMethodDescriptor();
        while (reader.pos < end) {
            const tag = reader.uint32();
            switch (tag >>> 3) {
                case 1:
                    message.name = reader.string();
                    break;
                case 2:
                    message.fullQueryPath = reader.string();
                    break;
                default:
                    reader.skipType(tag & 7);
                    break;
            }
        }
        return message;
    },
    fromPartial(object) {
        const message = createBaseQueryMethodDescriptor();
        message.name = object.name ?? "";
        message.fullQueryPath = object.fullQueryPath ?? "";
        return message;
    },
    fromAmino(object) {
        const message = createBaseQueryMethodDescriptor();
        if (object.name !== undefined && object.name !== null) {
            message.name = object.name;
        }
        if (object.full_query_path !== undefined && object.full_query_path !== null) {
            message.fullQueryPath = object.full_query_path;
        }
        return message;
    },
    toAmino(message) {
        const obj = {};
        obj.name = message.name === "" ? undefined : message.name;
        obj.full_query_path = message.fullQueryPath === "" ? undefined : message.fullQueryPath;
        return obj;
    },
    fromAminoMsg(object) {
        return QueryMethodDescriptor.fromAmino(object.value);
    },
    toAminoMsg(message) {
        return {
            type: "cosmos-sdk/QueryMethodDescriptor",
            value: QueryMethodDescriptor.toAmino(message)
        };
    },
    fromProtoMsg(message) {
        return QueryMethodDescriptor.decode(message.value);
    },
    toProto(message) {
        return QueryMethodDescriptor.encode(message).finish();
    },
    toProtoMsg(message) {
        return {
            typeUrl: "/cosmos.base.reflection.v2alpha1.QueryMethodDescriptor",
            value: QueryMethodDescriptor.encode(message).finish()
        };
    }
};
GlobalDecoderRegistry.register(QueryMethodDescriptor.typeUrl, QueryMethodDescriptor);
GlobalDecoderRegistry.registerAminoProtoMapping(QueryMethodDescriptor.aminoType, QueryMethodDescriptor.typeUrl);
