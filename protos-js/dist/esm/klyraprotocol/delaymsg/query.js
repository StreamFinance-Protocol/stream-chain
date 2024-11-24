//@ts-nocheck
import { DelayedMessage } from "./delayed_message";
import { BinaryReader, BinaryWriter } from "../../binary";
import { GlobalDecoderRegistry } from "../../registry";
function createBaseQueryNextDelayedMessageIdRequest() {
    return {};
}
export const QueryNextDelayedMessageIdRequest = {
    typeUrl: "/klyraprotocol.delaymsg.QueryNextDelayedMessageIdRequest",
    is(o) {
        return o && o.$typeUrl === QueryNextDelayedMessageIdRequest.typeUrl;
    },
    isSDK(o) {
        return o && o.$typeUrl === QueryNextDelayedMessageIdRequest.typeUrl;
    },
    isAmino(o) {
        return o && o.$typeUrl === QueryNextDelayedMessageIdRequest.typeUrl;
    },
    encode(_, writer = BinaryWriter.create()) {
        return writer;
    },
    decode(input, length) {
        const reader = input instanceof BinaryReader ? input : new BinaryReader(input);
        let end = length === undefined ? reader.len : reader.pos + length;
        const message = createBaseQueryNextDelayedMessageIdRequest();
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
        const message = createBaseQueryNextDelayedMessageIdRequest();
        return message;
    },
    fromAmino(_) {
        const message = createBaseQueryNextDelayedMessageIdRequest();
        return message;
    },
    toAmino(_) {
        const obj = {};
        return obj;
    },
    fromAminoMsg(object) {
        return QueryNextDelayedMessageIdRequest.fromAmino(object.value);
    },
    fromProtoMsg(message) {
        return QueryNextDelayedMessageIdRequest.decode(message.value);
    },
    toProto(message) {
        return QueryNextDelayedMessageIdRequest.encode(message).finish();
    },
    toProtoMsg(message) {
        return {
            typeUrl: "/klyraprotocol.delaymsg.QueryNextDelayedMessageIdRequest",
            value: QueryNextDelayedMessageIdRequest.encode(message).finish()
        };
    }
};
GlobalDecoderRegistry.register(QueryNextDelayedMessageIdRequest.typeUrl, QueryNextDelayedMessageIdRequest);
function createBaseQueryNextDelayedMessageIdResponse() {
    return {
        nextDelayedMessageId: 0
    };
}
export const QueryNextDelayedMessageIdResponse = {
    typeUrl: "/klyraprotocol.delaymsg.QueryNextDelayedMessageIdResponse",
    is(o) {
        return o && (o.$typeUrl === QueryNextDelayedMessageIdResponse.typeUrl || typeof o.nextDelayedMessageId === "number");
    },
    isSDK(o) {
        return o && (o.$typeUrl === QueryNextDelayedMessageIdResponse.typeUrl || typeof o.next_delayed_message_id === "number");
    },
    isAmino(o) {
        return o && (o.$typeUrl === QueryNextDelayedMessageIdResponse.typeUrl || typeof o.next_delayed_message_id === "number");
    },
    encode(message, writer = BinaryWriter.create()) {
        if (message.nextDelayedMessageId !== 0) {
            writer.uint32(8).uint32(message.nextDelayedMessageId);
        }
        return writer;
    },
    decode(input, length) {
        const reader = input instanceof BinaryReader ? input : new BinaryReader(input);
        let end = length === undefined ? reader.len : reader.pos + length;
        const message = createBaseQueryNextDelayedMessageIdResponse();
        while (reader.pos < end) {
            const tag = reader.uint32();
            switch (tag >>> 3) {
                case 1:
                    message.nextDelayedMessageId = reader.uint32();
                    break;
                default:
                    reader.skipType(tag & 7);
                    break;
            }
        }
        return message;
    },
    fromPartial(object) {
        const message = createBaseQueryNextDelayedMessageIdResponse();
        message.nextDelayedMessageId = object.nextDelayedMessageId ?? 0;
        return message;
    },
    fromAmino(object) {
        const message = createBaseQueryNextDelayedMessageIdResponse();
        if (object.next_delayed_message_id !== undefined && object.next_delayed_message_id !== null) {
            message.nextDelayedMessageId = object.next_delayed_message_id;
        }
        return message;
    },
    toAmino(message) {
        const obj = {};
        obj.next_delayed_message_id = message.nextDelayedMessageId === 0 ? undefined : message.nextDelayedMessageId;
        return obj;
    },
    fromAminoMsg(object) {
        return QueryNextDelayedMessageIdResponse.fromAmino(object.value);
    },
    fromProtoMsg(message) {
        return QueryNextDelayedMessageIdResponse.decode(message.value);
    },
    toProto(message) {
        return QueryNextDelayedMessageIdResponse.encode(message).finish();
    },
    toProtoMsg(message) {
        return {
            typeUrl: "/klyraprotocol.delaymsg.QueryNextDelayedMessageIdResponse",
            value: QueryNextDelayedMessageIdResponse.encode(message).finish()
        };
    }
};
GlobalDecoderRegistry.register(QueryNextDelayedMessageIdResponse.typeUrl, QueryNextDelayedMessageIdResponse);
function createBaseQueryMessageRequest() {
    return {
        id: 0
    };
}
export const QueryMessageRequest = {
    typeUrl: "/klyraprotocol.delaymsg.QueryMessageRequest",
    is(o) {
        return o && (o.$typeUrl === QueryMessageRequest.typeUrl || typeof o.id === "number");
    },
    isSDK(o) {
        return o && (o.$typeUrl === QueryMessageRequest.typeUrl || typeof o.id === "number");
    },
    isAmino(o) {
        return o && (o.$typeUrl === QueryMessageRequest.typeUrl || typeof o.id === "number");
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
        const message = createBaseQueryMessageRequest();
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
        const message = createBaseQueryMessageRequest();
        message.id = object.id ?? 0;
        return message;
    },
    fromAmino(object) {
        const message = createBaseQueryMessageRequest();
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
        return QueryMessageRequest.fromAmino(object.value);
    },
    fromProtoMsg(message) {
        return QueryMessageRequest.decode(message.value);
    },
    toProto(message) {
        return QueryMessageRequest.encode(message).finish();
    },
    toProtoMsg(message) {
        return {
            typeUrl: "/klyraprotocol.delaymsg.QueryMessageRequest",
            value: QueryMessageRequest.encode(message).finish()
        };
    }
};
GlobalDecoderRegistry.register(QueryMessageRequest.typeUrl, QueryMessageRequest);
function createBaseQueryMessageResponse() {
    return {
        message: undefined
    };
}
export const QueryMessageResponse = {
    typeUrl: "/klyraprotocol.delaymsg.QueryMessageResponse",
    is(o) {
        return o && o.$typeUrl === QueryMessageResponse.typeUrl;
    },
    isSDK(o) {
        return o && o.$typeUrl === QueryMessageResponse.typeUrl;
    },
    isAmino(o) {
        return o && o.$typeUrl === QueryMessageResponse.typeUrl;
    },
    encode(message, writer = BinaryWriter.create()) {
        if (message.message !== undefined) {
            DelayedMessage.encode(message.message, writer.uint32(10).fork()).ldelim();
        }
        return writer;
    },
    decode(input, length) {
        const reader = input instanceof BinaryReader ? input : new BinaryReader(input);
        let end = length === undefined ? reader.len : reader.pos + length;
        const message = createBaseQueryMessageResponse();
        while (reader.pos < end) {
            const tag = reader.uint32();
            switch (tag >>> 3) {
                case 1:
                    message.message = DelayedMessage.decode(reader, reader.uint32());
                    break;
                default:
                    reader.skipType(tag & 7);
                    break;
            }
        }
        return message;
    },
    fromPartial(object) {
        const message = createBaseQueryMessageResponse();
        message.message = object.message !== undefined && object.message !== null ? DelayedMessage.fromPartial(object.message) : undefined;
        return message;
    },
    fromAmino(object) {
        const message = createBaseQueryMessageResponse();
        if (object.message !== undefined && object.message !== null) {
            message.message = DelayedMessage.fromAmino(object.message);
        }
        return message;
    },
    toAmino(message) {
        const obj = {};
        obj.message = message.message ? DelayedMessage.toAmino(message.message) : undefined;
        return obj;
    },
    fromAminoMsg(object) {
        return QueryMessageResponse.fromAmino(object.value);
    },
    fromProtoMsg(message) {
        return QueryMessageResponse.decode(message.value);
    },
    toProto(message) {
        return QueryMessageResponse.encode(message).finish();
    },
    toProtoMsg(message) {
        return {
            typeUrl: "/klyraprotocol.delaymsg.QueryMessageResponse",
            value: QueryMessageResponse.encode(message).finish()
        };
    }
};
GlobalDecoderRegistry.register(QueryMessageResponse.typeUrl, QueryMessageResponse);
function createBaseQueryBlockMessageIdsRequest() {
    return {
        blockHeight: 0
    };
}
export const QueryBlockMessageIdsRequest = {
    typeUrl: "/klyraprotocol.delaymsg.QueryBlockMessageIdsRequest",
    is(o) {
        return o && (o.$typeUrl === QueryBlockMessageIdsRequest.typeUrl || typeof o.blockHeight === "number");
    },
    isSDK(o) {
        return o && (o.$typeUrl === QueryBlockMessageIdsRequest.typeUrl || typeof o.block_height === "number");
    },
    isAmino(o) {
        return o && (o.$typeUrl === QueryBlockMessageIdsRequest.typeUrl || typeof o.block_height === "number");
    },
    encode(message, writer = BinaryWriter.create()) {
        if (message.blockHeight !== 0) {
            writer.uint32(8).uint32(message.blockHeight);
        }
        return writer;
    },
    decode(input, length) {
        const reader = input instanceof BinaryReader ? input : new BinaryReader(input);
        let end = length === undefined ? reader.len : reader.pos + length;
        const message = createBaseQueryBlockMessageIdsRequest();
        while (reader.pos < end) {
            const tag = reader.uint32();
            switch (tag >>> 3) {
                case 1:
                    message.blockHeight = reader.uint32();
                    break;
                default:
                    reader.skipType(tag & 7);
                    break;
            }
        }
        return message;
    },
    fromPartial(object) {
        const message = createBaseQueryBlockMessageIdsRequest();
        message.blockHeight = object.blockHeight ?? 0;
        return message;
    },
    fromAmino(object) {
        const message = createBaseQueryBlockMessageIdsRequest();
        if (object.block_height !== undefined && object.block_height !== null) {
            message.blockHeight = object.block_height;
        }
        return message;
    },
    toAmino(message) {
        const obj = {};
        obj.block_height = message.blockHeight === 0 ? undefined : message.blockHeight;
        return obj;
    },
    fromAminoMsg(object) {
        return QueryBlockMessageIdsRequest.fromAmino(object.value);
    },
    fromProtoMsg(message) {
        return QueryBlockMessageIdsRequest.decode(message.value);
    },
    toProto(message) {
        return QueryBlockMessageIdsRequest.encode(message).finish();
    },
    toProtoMsg(message) {
        return {
            typeUrl: "/klyraprotocol.delaymsg.QueryBlockMessageIdsRequest",
            value: QueryBlockMessageIdsRequest.encode(message).finish()
        };
    }
};
GlobalDecoderRegistry.register(QueryBlockMessageIdsRequest.typeUrl, QueryBlockMessageIdsRequest);
function createBaseQueryBlockMessageIdsResponse() {
    return {
        messageIds: []
    };
}
export const QueryBlockMessageIdsResponse = {
    typeUrl: "/klyraprotocol.delaymsg.QueryBlockMessageIdsResponse",
    is(o) {
        return o && (o.$typeUrl === QueryBlockMessageIdsResponse.typeUrl || Array.isArray(o.messageIds) && (!o.messageIds.length || typeof o.messageIds[0] === "number"));
    },
    isSDK(o) {
        return o && (o.$typeUrl === QueryBlockMessageIdsResponse.typeUrl || Array.isArray(o.message_ids) && (!o.message_ids.length || typeof o.message_ids[0] === "number"));
    },
    isAmino(o) {
        return o && (o.$typeUrl === QueryBlockMessageIdsResponse.typeUrl || Array.isArray(o.message_ids) && (!o.message_ids.length || typeof o.message_ids[0] === "number"));
    },
    encode(message, writer = BinaryWriter.create()) {
        writer.uint32(10).fork();
        for (const v of message.messageIds) {
            writer.uint32(v);
        }
        writer.ldelim();
        return writer;
    },
    decode(input, length) {
        const reader = input instanceof BinaryReader ? input : new BinaryReader(input);
        let end = length === undefined ? reader.len : reader.pos + length;
        const message = createBaseQueryBlockMessageIdsResponse();
        while (reader.pos < end) {
            const tag = reader.uint32();
            switch (tag >>> 3) {
                case 1:
                    if ((tag & 7) === 2) {
                        const end2 = reader.uint32() + reader.pos;
                        while (reader.pos < end2) {
                            message.messageIds.push(reader.uint32());
                        }
                    }
                    else {
                        message.messageIds.push(reader.uint32());
                    }
                    break;
                default:
                    reader.skipType(tag & 7);
                    break;
            }
        }
        return message;
    },
    fromPartial(object) {
        const message = createBaseQueryBlockMessageIdsResponse();
        message.messageIds = object.messageIds?.map(e => e) || [];
        return message;
    },
    fromAmino(object) {
        const message = createBaseQueryBlockMessageIdsResponse();
        message.messageIds = object.message_ids?.map(e => e) || [];
        return message;
    },
    toAmino(message) {
        const obj = {};
        if (message.messageIds) {
            obj.message_ids = message.messageIds.map(e => e);
        }
        else {
            obj.message_ids = message.messageIds;
        }
        return obj;
    },
    fromAminoMsg(object) {
        return QueryBlockMessageIdsResponse.fromAmino(object.value);
    },
    fromProtoMsg(message) {
        return QueryBlockMessageIdsResponse.decode(message.value);
    },
    toProto(message) {
        return QueryBlockMessageIdsResponse.encode(message).finish();
    },
    toProtoMsg(message) {
        return {
            typeUrl: "/klyraprotocol.delaymsg.QueryBlockMessageIdsResponse",
            value: QueryBlockMessageIdsResponse.encode(message).finish()
        };
    }
};
GlobalDecoderRegistry.register(QueryBlockMessageIdsResponse.typeUrl, QueryBlockMessageIdsResponse);
