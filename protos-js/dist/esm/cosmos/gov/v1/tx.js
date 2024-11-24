//@ts-nocheck
import { Any } from "../../../google/protobuf/any";
import { Coin } from "../../base/v1beta1/coin";
import { WeightedVoteOption, Params } from "./gov";
import { Timestamp } from "../../../google/protobuf/timestamp";
import { BinaryReader, BinaryWriter } from "../../../binary";
import { GlobalDecoderRegistry } from "../../../registry";
import { isSet, toTimestamp, fromTimestamp } from "../../../helpers";
function createBaseMsgSubmitProposal() {
    return {
        messages: [],
        initialDeposit: [],
        proposer: "",
        metadata: "",
        title: "",
        summary: "",
        expedited: false
    };
}
export const MsgSubmitProposal = {
    typeUrl: "/cosmos.gov.v1.MsgSubmitProposal",
    aminoType: "cosmos-sdk/v1/MsgSubmitProposal",
    is(o) {
        return o && (o.$typeUrl === MsgSubmitProposal.typeUrl || Array.isArray(o.messages) && (!o.messages.length || Any.is(o.messages[0])) && Array.isArray(o.initialDeposit) && (!o.initialDeposit.length || Coin.is(o.initialDeposit[0])) && typeof o.proposer === "string" && typeof o.metadata === "string" && typeof o.title === "string" && typeof o.summary === "string" && typeof o.expedited === "boolean");
    },
    isSDK(o) {
        return o && (o.$typeUrl === MsgSubmitProposal.typeUrl || Array.isArray(o.messages) && (!o.messages.length || Any.isSDK(o.messages[0])) && Array.isArray(o.initial_deposit) && (!o.initial_deposit.length || Coin.isSDK(o.initial_deposit[0])) && typeof o.proposer === "string" && typeof o.metadata === "string" && typeof o.title === "string" && typeof o.summary === "string" && typeof o.expedited === "boolean");
    },
    isAmino(o) {
        return o && (o.$typeUrl === MsgSubmitProposal.typeUrl || Array.isArray(o.messages) && (!o.messages.length || Any.isAmino(o.messages[0])) && Array.isArray(o.initial_deposit) && (!o.initial_deposit.length || Coin.isAmino(o.initial_deposit[0])) && typeof o.proposer === "string" && typeof o.metadata === "string" && typeof o.title === "string" && typeof o.summary === "string" && typeof o.expedited === "boolean");
    },
    encode(message, writer = BinaryWriter.create()) {
        for (const v of message.messages) {
            Any.encode(v, writer.uint32(10).fork()).ldelim();
        }
        for (const v of message.initialDeposit) {
            Coin.encode(v, writer.uint32(18).fork()).ldelim();
        }
        if (message.proposer !== "") {
            writer.uint32(26).string(message.proposer);
        }
        if (message.metadata !== "") {
            writer.uint32(34).string(message.metadata);
        }
        if (message.title !== "") {
            writer.uint32(42).string(message.title);
        }
        if (message.summary !== "") {
            writer.uint32(50).string(message.summary);
        }
        if (message.expedited === true) {
            writer.uint32(56).bool(message.expedited);
        }
        return writer;
    },
    decode(input, length) {
        const reader = input instanceof BinaryReader ? input : new BinaryReader(input);
        let end = length === undefined ? reader.len : reader.pos + length;
        const message = createBaseMsgSubmitProposal();
        while (reader.pos < end) {
            const tag = reader.uint32();
            switch (tag >>> 3) {
                case 1:
                    message.messages.push(Any.decode(reader, reader.uint32()));
                    break;
                case 2:
                    message.initialDeposit.push(Coin.decode(reader, reader.uint32()));
                    break;
                case 3:
                    message.proposer = reader.string();
                    break;
                case 4:
                    message.metadata = reader.string();
                    break;
                case 5:
                    message.title = reader.string();
                    break;
                case 6:
                    message.summary = reader.string();
                    break;
                case 7:
                    message.expedited = reader.bool();
                    break;
                default:
                    reader.skipType(tag & 7);
                    break;
            }
        }
        return message;
    },
    fromPartial(object) {
        const message = createBaseMsgSubmitProposal();
        message.messages = object.messages?.map(e => Any.fromPartial(e)) || [];
        message.initialDeposit = object.initialDeposit?.map(e => Coin.fromPartial(e)) || [];
        message.proposer = object.proposer ?? "";
        message.metadata = object.metadata ?? "";
        message.title = object.title ?? "";
        message.summary = object.summary ?? "";
        message.expedited = object.expedited ?? false;
        return message;
    },
    fromAmino(object) {
        const message = createBaseMsgSubmitProposal();
        message.messages = object.messages?.map(e => Any.fromAmino(e)) || [];
        message.initialDeposit = object.initial_deposit?.map(e => Coin.fromAmino(e)) || [];
        if (object.proposer !== undefined && object.proposer !== null) {
            message.proposer = object.proposer;
        }
        if (object.metadata !== undefined && object.metadata !== null) {
            message.metadata = object.metadata;
        }
        if (object.title !== undefined && object.title !== null) {
            message.title = object.title;
        }
        if (object.summary !== undefined && object.summary !== null) {
            message.summary = object.summary;
        }
        if (object.expedited !== undefined && object.expedited !== null) {
            message.expedited = object.expedited;
        }
        return message;
    },
    toAmino(message) {
        const obj = {};
        if (message.messages) {
            obj.messages = message.messages.map(e => e ? Any.toAmino(e) : undefined);
        }
        else {
            obj.messages = message.messages;
        }
        if (message.initialDeposit) {
            obj.initial_deposit = message.initialDeposit.map(e => e ? Coin.toAmino(e) : undefined);
        }
        else {
            obj.initial_deposit = message.initialDeposit;
        }
        obj.proposer = message.proposer === "" ? undefined : message.proposer;
        obj.metadata = message.metadata === "" ? undefined : message.metadata;
        obj.title = message.title === "" ? undefined : message.title;
        obj.summary = message.summary === "" ? undefined : message.summary;
        obj.expedited = message.expedited === false ? undefined : message.expedited;
        return obj;
    },
    fromAminoMsg(object) {
        return MsgSubmitProposal.fromAmino(object.value);
    },
    toAminoMsg(message) {
        return {
            type: "cosmos-sdk/v1/MsgSubmitProposal",
            value: MsgSubmitProposal.toAmino(message)
        };
    },
    fromProtoMsg(message) {
        return MsgSubmitProposal.decode(message.value);
    },
    toProto(message) {
        return MsgSubmitProposal.encode(message).finish();
    },
    toProtoMsg(message) {
        return {
            typeUrl: "/cosmos.gov.v1.MsgSubmitProposal",
            value: MsgSubmitProposal.encode(message).finish()
        };
    }
};
GlobalDecoderRegistry.register(MsgSubmitProposal.typeUrl, MsgSubmitProposal);
GlobalDecoderRegistry.registerAminoProtoMapping(MsgSubmitProposal.aminoType, MsgSubmitProposal.typeUrl);
function createBaseMsgSubmitProposalResponse() {
    return {
        proposalId: BigInt(0)
    };
}
export const MsgSubmitProposalResponse = {
    typeUrl: "/cosmos.gov.v1.MsgSubmitProposalResponse",
    aminoType: "cosmos-sdk/v1/MsgSubmitProposalResponse",
    is(o) {
        return o && (o.$typeUrl === MsgSubmitProposalResponse.typeUrl || typeof o.proposalId === "bigint");
    },
    isSDK(o) {
        return o && (o.$typeUrl === MsgSubmitProposalResponse.typeUrl || typeof o.proposal_id === "bigint");
    },
    isAmino(o) {
        return o && (o.$typeUrl === MsgSubmitProposalResponse.typeUrl || typeof o.proposal_id === "bigint");
    },
    encode(message, writer = BinaryWriter.create()) {
        if (message.proposalId !== BigInt(0)) {
            writer.uint32(8).uint64(message.proposalId);
        }
        return writer;
    },
    decode(input, length) {
        const reader = input instanceof BinaryReader ? input : new BinaryReader(input);
        let end = length === undefined ? reader.len : reader.pos + length;
        const message = createBaseMsgSubmitProposalResponse();
        while (reader.pos < end) {
            const tag = reader.uint32();
            switch (tag >>> 3) {
                case 1:
                    message.proposalId = reader.uint64();
                    break;
                default:
                    reader.skipType(tag & 7);
                    break;
            }
        }
        return message;
    },
    fromPartial(object) {
        const message = createBaseMsgSubmitProposalResponse();
        message.proposalId = object.proposalId !== undefined && object.proposalId !== null ? BigInt(object.proposalId.toString()) : BigInt(0);
        return message;
    },
    fromAmino(object) {
        const message = createBaseMsgSubmitProposalResponse();
        if (object.proposal_id !== undefined && object.proposal_id !== null) {
            message.proposalId = BigInt(object.proposal_id);
        }
        return message;
    },
    toAmino(message) {
        const obj = {};
        obj.proposal_id = message.proposalId !== BigInt(0) ? message.proposalId?.toString() : undefined;
        return obj;
    },
    fromAminoMsg(object) {
        return MsgSubmitProposalResponse.fromAmino(object.value);
    },
    toAminoMsg(message) {
        return {
            type: "cosmos-sdk/v1/MsgSubmitProposalResponse",
            value: MsgSubmitProposalResponse.toAmino(message)
        };
    },
    fromProtoMsg(message) {
        return MsgSubmitProposalResponse.decode(message.value);
    },
    toProto(message) {
        return MsgSubmitProposalResponse.encode(message).finish();
    },
    toProtoMsg(message) {
        return {
            typeUrl: "/cosmos.gov.v1.MsgSubmitProposalResponse",
            value: MsgSubmitProposalResponse.encode(message).finish()
        };
    }
};
GlobalDecoderRegistry.register(MsgSubmitProposalResponse.typeUrl, MsgSubmitProposalResponse);
GlobalDecoderRegistry.registerAminoProtoMapping(MsgSubmitProposalResponse.aminoType, MsgSubmitProposalResponse.typeUrl);
function createBaseMsgExecLegacyContent() {
    return {
        content: undefined,
        authority: ""
    };
}
export const MsgExecLegacyContent = {
    typeUrl: "/cosmos.gov.v1.MsgExecLegacyContent",
    aminoType: "cosmos-sdk/v1/MsgExecLegacyContent",
    is(o) {
        return o && (o.$typeUrl === MsgExecLegacyContent.typeUrl || typeof o.authority === "string");
    },
    isSDK(o) {
        return o && (o.$typeUrl === MsgExecLegacyContent.typeUrl || typeof o.authority === "string");
    },
    isAmino(o) {
        return o && (o.$typeUrl === MsgExecLegacyContent.typeUrl || typeof o.authority === "string");
    },
    encode(message, writer = BinaryWriter.create()) {
        if (message.content !== undefined) {
            Any.encode(GlobalDecoderRegistry.wrapAny(message.content), writer.uint32(10).fork()).ldelim();
        }
        if (message.authority !== "") {
            writer.uint32(18).string(message.authority);
        }
        return writer;
    },
    decode(input, length) {
        const reader = input instanceof BinaryReader ? input : new BinaryReader(input);
        let end = length === undefined ? reader.len : reader.pos + length;
        const message = createBaseMsgExecLegacyContent();
        while (reader.pos < end) {
            const tag = reader.uint32();
            switch (tag >>> 3) {
                case 1:
                    message.content = GlobalDecoderRegistry.unwrapAny(reader);
                    break;
                case 2:
                    message.authority = reader.string();
                    break;
                default:
                    reader.skipType(tag & 7);
                    break;
            }
        }
        return message;
    },
    fromPartial(object) {
        const message = createBaseMsgExecLegacyContent();
        message.content = object.content !== undefined && object.content !== null ? GlobalDecoderRegistry.fromPartial(object.content) : undefined;
        message.authority = object.authority ?? "";
        return message;
    },
    fromAmino(object) {
        const message = createBaseMsgExecLegacyContent();
        if (object.content !== undefined && object.content !== null) {
            message.content = GlobalDecoderRegistry.fromAminoMsg(object.content);
        }
        if (object.authority !== undefined && object.authority !== null) {
            message.authority = object.authority;
        }
        return message;
    },
    toAmino(message) {
        const obj = {};
        obj.content = message.content ? GlobalDecoderRegistry.toAminoMsg(message.content) : undefined;
        obj.authority = message.authority === "" ? undefined : message.authority;
        return obj;
    },
    fromAminoMsg(object) {
        return MsgExecLegacyContent.fromAmino(object.value);
    },
    toAminoMsg(message) {
        return {
            type: "cosmos-sdk/v1/MsgExecLegacyContent",
            value: MsgExecLegacyContent.toAmino(message)
        };
    },
    fromProtoMsg(message) {
        return MsgExecLegacyContent.decode(message.value);
    },
    toProto(message) {
        return MsgExecLegacyContent.encode(message).finish();
    },
    toProtoMsg(message) {
        return {
            typeUrl: "/cosmos.gov.v1.MsgExecLegacyContent",
            value: MsgExecLegacyContent.encode(message).finish()
        };
    }
};
GlobalDecoderRegistry.register(MsgExecLegacyContent.typeUrl, MsgExecLegacyContent);
GlobalDecoderRegistry.registerAminoProtoMapping(MsgExecLegacyContent.aminoType, MsgExecLegacyContent.typeUrl);
function createBaseMsgExecLegacyContentResponse() {
    return {};
}
export const MsgExecLegacyContentResponse = {
    typeUrl: "/cosmos.gov.v1.MsgExecLegacyContentResponse",
    aminoType: "cosmos-sdk/v1/MsgExecLegacyContentResponse",
    is(o) {
        return o && o.$typeUrl === MsgExecLegacyContentResponse.typeUrl;
    },
    isSDK(o) {
        return o && o.$typeUrl === MsgExecLegacyContentResponse.typeUrl;
    },
    isAmino(o) {
        return o && o.$typeUrl === MsgExecLegacyContentResponse.typeUrl;
    },
    encode(_, writer = BinaryWriter.create()) {
        return writer;
    },
    decode(input, length) {
        const reader = input instanceof BinaryReader ? input : new BinaryReader(input);
        let end = length === undefined ? reader.len : reader.pos + length;
        const message = createBaseMsgExecLegacyContentResponse();
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
        const message = createBaseMsgExecLegacyContentResponse();
        return message;
    },
    fromAmino(_) {
        const message = createBaseMsgExecLegacyContentResponse();
        return message;
    },
    toAmino(_) {
        const obj = {};
        return obj;
    },
    fromAminoMsg(object) {
        return MsgExecLegacyContentResponse.fromAmino(object.value);
    },
    toAminoMsg(message) {
        return {
            type: "cosmos-sdk/v1/MsgExecLegacyContentResponse",
            value: MsgExecLegacyContentResponse.toAmino(message)
        };
    },
    fromProtoMsg(message) {
        return MsgExecLegacyContentResponse.decode(message.value);
    },
    toProto(message) {
        return MsgExecLegacyContentResponse.encode(message).finish();
    },
    toProtoMsg(message) {
        return {
            typeUrl: "/cosmos.gov.v1.MsgExecLegacyContentResponse",
            value: MsgExecLegacyContentResponse.encode(message).finish()
        };
    }
};
GlobalDecoderRegistry.register(MsgExecLegacyContentResponse.typeUrl, MsgExecLegacyContentResponse);
GlobalDecoderRegistry.registerAminoProtoMapping(MsgExecLegacyContentResponse.aminoType, MsgExecLegacyContentResponse.typeUrl);
function createBaseMsgVote() {
    return {
        proposalId: BigInt(0),
        voter: "",
        option: 0,
        metadata: ""
    };
}
export const MsgVote = {
    typeUrl: "/cosmos.gov.v1.MsgVote",
    aminoType: "cosmos-sdk/v1/MsgVote",
    is(o) {
        return o && (o.$typeUrl === MsgVote.typeUrl || typeof o.proposalId === "bigint" && typeof o.voter === "string" && isSet(o.option) && typeof o.metadata === "string");
    },
    isSDK(o) {
        return o && (o.$typeUrl === MsgVote.typeUrl || typeof o.proposal_id === "bigint" && typeof o.voter === "string" && isSet(o.option) && typeof o.metadata === "string");
    },
    isAmino(o) {
        return o && (o.$typeUrl === MsgVote.typeUrl || typeof o.proposal_id === "bigint" && typeof o.voter === "string" && isSet(o.option) && typeof o.metadata === "string");
    },
    encode(message, writer = BinaryWriter.create()) {
        if (message.proposalId !== BigInt(0)) {
            writer.uint32(8).uint64(message.proposalId);
        }
        if (message.voter !== "") {
            writer.uint32(18).string(message.voter);
        }
        if (message.option !== 0) {
            writer.uint32(24).int32(message.option);
        }
        if (message.metadata !== "") {
            writer.uint32(34).string(message.metadata);
        }
        return writer;
    },
    decode(input, length) {
        const reader = input instanceof BinaryReader ? input : new BinaryReader(input);
        let end = length === undefined ? reader.len : reader.pos + length;
        const message = createBaseMsgVote();
        while (reader.pos < end) {
            const tag = reader.uint32();
            switch (tag >>> 3) {
                case 1:
                    message.proposalId = reader.uint64();
                    break;
                case 2:
                    message.voter = reader.string();
                    break;
                case 3:
                    message.option = reader.int32();
                    break;
                case 4:
                    message.metadata = reader.string();
                    break;
                default:
                    reader.skipType(tag & 7);
                    break;
            }
        }
        return message;
    },
    fromPartial(object) {
        const message = createBaseMsgVote();
        message.proposalId = object.proposalId !== undefined && object.proposalId !== null ? BigInt(object.proposalId.toString()) : BigInt(0);
        message.voter = object.voter ?? "";
        message.option = object.option ?? 0;
        message.metadata = object.metadata ?? "";
        return message;
    },
    fromAmino(object) {
        const message = createBaseMsgVote();
        if (object.proposal_id !== undefined && object.proposal_id !== null) {
            message.proposalId = BigInt(object.proposal_id);
        }
        if (object.voter !== undefined && object.voter !== null) {
            message.voter = object.voter;
        }
        if (object.option !== undefined && object.option !== null) {
            message.option = object.option;
        }
        if (object.metadata !== undefined && object.metadata !== null) {
            message.metadata = object.metadata;
        }
        return message;
    },
    toAmino(message) {
        const obj = {};
        obj.proposal_id = message.proposalId ? message.proposalId?.toString() : "0";
        obj.voter = message.voter === "" ? undefined : message.voter;
        obj.option = message.option === 0 ? undefined : message.option;
        obj.metadata = message.metadata === "" ? undefined : message.metadata;
        return obj;
    },
    fromAminoMsg(object) {
        return MsgVote.fromAmino(object.value);
    },
    toAminoMsg(message) {
        return {
            type: "cosmos-sdk/v1/MsgVote",
            value: MsgVote.toAmino(message)
        };
    },
    fromProtoMsg(message) {
        return MsgVote.decode(message.value);
    },
    toProto(message) {
        return MsgVote.encode(message).finish();
    },
    toProtoMsg(message) {
        return {
            typeUrl: "/cosmos.gov.v1.MsgVote",
            value: MsgVote.encode(message).finish()
        };
    }
};
GlobalDecoderRegistry.register(MsgVote.typeUrl, MsgVote);
GlobalDecoderRegistry.registerAminoProtoMapping(MsgVote.aminoType, MsgVote.typeUrl);
function createBaseMsgVoteResponse() {
    return {};
}
export const MsgVoteResponse = {
    typeUrl: "/cosmos.gov.v1.MsgVoteResponse",
    aminoType: "cosmos-sdk/v1/MsgVoteResponse",
    is(o) {
        return o && o.$typeUrl === MsgVoteResponse.typeUrl;
    },
    isSDK(o) {
        return o && o.$typeUrl === MsgVoteResponse.typeUrl;
    },
    isAmino(o) {
        return o && o.$typeUrl === MsgVoteResponse.typeUrl;
    },
    encode(_, writer = BinaryWriter.create()) {
        return writer;
    },
    decode(input, length) {
        const reader = input instanceof BinaryReader ? input : new BinaryReader(input);
        let end = length === undefined ? reader.len : reader.pos + length;
        const message = createBaseMsgVoteResponse();
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
        const message = createBaseMsgVoteResponse();
        return message;
    },
    fromAmino(_) {
        const message = createBaseMsgVoteResponse();
        return message;
    },
    toAmino(_) {
        const obj = {};
        return obj;
    },
    fromAminoMsg(object) {
        return MsgVoteResponse.fromAmino(object.value);
    },
    toAminoMsg(message) {
        return {
            type: "cosmos-sdk/v1/MsgVoteResponse",
            value: MsgVoteResponse.toAmino(message)
        };
    },
    fromProtoMsg(message) {
        return MsgVoteResponse.decode(message.value);
    },
    toProto(message) {
        return MsgVoteResponse.encode(message).finish();
    },
    toProtoMsg(message) {
        return {
            typeUrl: "/cosmos.gov.v1.MsgVoteResponse",
            value: MsgVoteResponse.encode(message).finish()
        };
    }
};
GlobalDecoderRegistry.register(MsgVoteResponse.typeUrl, MsgVoteResponse);
GlobalDecoderRegistry.registerAminoProtoMapping(MsgVoteResponse.aminoType, MsgVoteResponse.typeUrl);
function createBaseMsgVoteWeighted() {
    return {
        proposalId: BigInt(0),
        voter: "",
        options: [],
        metadata: ""
    };
}
export const MsgVoteWeighted = {
    typeUrl: "/cosmos.gov.v1.MsgVoteWeighted",
    aminoType: "cosmos-sdk/v1/MsgVoteWeighted",
    is(o) {
        return o && (o.$typeUrl === MsgVoteWeighted.typeUrl || typeof o.proposalId === "bigint" && typeof o.voter === "string" && Array.isArray(o.options) && (!o.options.length || WeightedVoteOption.is(o.options[0])) && typeof o.metadata === "string");
    },
    isSDK(o) {
        return o && (o.$typeUrl === MsgVoteWeighted.typeUrl || typeof o.proposal_id === "bigint" && typeof o.voter === "string" && Array.isArray(o.options) && (!o.options.length || WeightedVoteOption.isSDK(o.options[0])) && typeof o.metadata === "string");
    },
    isAmino(o) {
        return o && (o.$typeUrl === MsgVoteWeighted.typeUrl || typeof o.proposal_id === "bigint" && typeof o.voter === "string" && Array.isArray(o.options) && (!o.options.length || WeightedVoteOption.isAmino(o.options[0])) && typeof o.metadata === "string");
    },
    encode(message, writer = BinaryWriter.create()) {
        if (message.proposalId !== BigInt(0)) {
            writer.uint32(8).uint64(message.proposalId);
        }
        if (message.voter !== "") {
            writer.uint32(18).string(message.voter);
        }
        for (const v of message.options) {
            WeightedVoteOption.encode(v, writer.uint32(26).fork()).ldelim();
        }
        if (message.metadata !== "") {
            writer.uint32(34).string(message.metadata);
        }
        return writer;
    },
    decode(input, length) {
        const reader = input instanceof BinaryReader ? input : new BinaryReader(input);
        let end = length === undefined ? reader.len : reader.pos + length;
        const message = createBaseMsgVoteWeighted();
        while (reader.pos < end) {
            const tag = reader.uint32();
            switch (tag >>> 3) {
                case 1:
                    message.proposalId = reader.uint64();
                    break;
                case 2:
                    message.voter = reader.string();
                    break;
                case 3:
                    message.options.push(WeightedVoteOption.decode(reader, reader.uint32()));
                    break;
                case 4:
                    message.metadata = reader.string();
                    break;
                default:
                    reader.skipType(tag & 7);
                    break;
            }
        }
        return message;
    },
    fromPartial(object) {
        const message = createBaseMsgVoteWeighted();
        message.proposalId = object.proposalId !== undefined && object.proposalId !== null ? BigInt(object.proposalId.toString()) : BigInt(0);
        message.voter = object.voter ?? "";
        message.options = object.options?.map(e => WeightedVoteOption.fromPartial(e)) || [];
        message.metadata = object.metadata ?? "";
        return message;
    },
    fromAmino(object) {
        const message = createBaseMsgVoteWeighted();
        if (object.proposal_id !== undefined && object.proposal_id !== null) {
            message.proposalId = BigInt(object.proposal_id);
        }
        if (object.voter !== undefined && object.voter !== null) {
            message.voter = object.voter;
        }
        message.options = object.options?.map(e => WeightedVoteOption.fromAmino(e)) || [];
        if (object.metadata !== undefined && object.metadata !== null) {
            message.metadata = object.metadata;
        }
        return message;
    },
    toAmino(message) {
        const obj = {};
        obj.proposal_id = message.proposalId ? message.proposalId?.toString() : "0";
        obj.voter = message.voter === "" ? undefined : message.voter;
        if (message.options) {
            obj.options = message.options.map(e => e ? WeightedVoteOption.toAmino(e) : undefined);
        }
        else {
            obj.options = message.options;
        }
        obj.metadata = message.metadata === "" ? undefined : message.metadata;
        return obj;
    },
    fromAminoMsg(object) {
        return MsgVoteWeighted.fromAmino(object.value);
    },
    toAminoMsg(message) {
        return {
            type: "cosmos-sdk/v1/MsgVoteWeighted",
            value: MsgVoteWeighted.toAmino(message)
        };
    },
    fromProtoMsg(message) {
        return MsgVoteWeighted.decode(message.value);
    },
    toProto(message) {
        return MsgVoteWeighted.encode(message).finish();
    },
    toProtoMsg(message) {
        return {
            typeUrl: "/cosmos.gov.v1.MsgVoteWeighted",
            value: MsgVoteWeighted.encode(message).finish()
        };
    }
};
GlobalDecoderRegistry.register(MsgVoteWeighted.typeUrl, MsgVoteWeighted);
GlobalDecoderRegistry.registerAminoProtoMapping(MsgVoteWeighted.aminoType, MsgVoteWeighted.typeUrl);
function createBaseMsgVoteWeightedResponse() {
    return {};
}
export const MsgVoteWeightedResponse = {
    typeUrl: "/cosmos.gov.v1.MsgVoteWeightedResponse",
    aminoType: "cosmos-sdk/v1/MsgVoteWeightedResponse",
    is(o) {
        return o && o.$typeUrl === MsgVoteWeightedResponse.typeUrl;
    },
    isSDK(o) {
        return o && o.$typeUrl === MsgVoteWeightedResponse.typeUrl;
    },
    isAmino(o) {
        return o && o.$typeUrl === MsgVoteWeightedResponse.typeUrl;
    },
    encode(_, writer = BinaryWriter.create()) {
        return writer;
    },
    decode(input, length) {
        const reader = input instanceof BinaryReader ? input : new BinaryReader(input);
        let end = length === undefined ? reader.len : reader.pos + length;
        const message = createBaseMsgVoteWeightedResponse();
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
        const message = createBaseMsgVoteWeightedResponse();
        return message;
    },
    fromAmino(_) {
        const message = createBaseMsgVoteWeightedResponse();
        return message;
    },
    toAmino(_) {
        const obj = {};
        return obj;
    },
    fromAminoMsg(object) {
        return MsgVoteWeightedResponse.fromAmino(object.value);
    },
    toAminoMsg(message) {
        return {
            type: "cosmos-sdk/v1/MsgVoteWeightedResponse",
            value: MsgVoteWeightedResponse.toAmino(message)
        };
    },
    fromProtoMsg(message) {
        return MsgVoteWeightedResponse.decode(message.value);
    },
    toProto(message) {
        return MsgVoteWeightedResponse.encode(message).finish();
    },
    toProtoMsg(message) {
        return {
            typeUrl: "/cosmos.gov.v1.MsgVoteWeightedResponse",
            value: MsgVoteWeightedResponse.encode(message).finish()
        };
    }
};
GlobalDecoderRegistry.register(MsgVoteWeightedResponse.typeUrl, MsgVoteWeightedResponse);
GlobalDecoderRegistry.registerAminoProtoMapping(MsgVoteWeightedResponse.aminoType, MsgVoteWeightedResponse.typeUrl);
function createBaseMsgDeposit() {
    return {
        proposalId: BigInt(0),
        depositor: "",
        amount: []
    };
}
export const MsgDeposit = {
    typeUrl: "/cosmos.gov.v1.MsgDeposit",
    aminoType: "cosmos-sdk/v1/MsgDeposit",
    is(o) {
        return o && (o.$typeUrl === MsgDeposit.typeUrl || typeof o.proposalId === "bigint" && typeof o.depositor === "string" && Array.isArray(o.amount) && (!o.amount.length || Coin.is(o.amount[0])));
    },
    isSDK(o) {
        return o && (o.$typeUrl === MsgDeposit.typeUrl || typeof o.proposal_id === "bigint" && typeof o.depositor === "string" && Array.isArray(o.amount) && (!o.amount.length || Coin.isSDK(o.amount[0])));
    },
    isAmino(o) {
        return o && (o.$typeUrl === MsgDeposit.typeUrl || typeof o.proposal_id === "bigint" && typeof o.depositor === "string" && Array.isArray(o.amount) && (!o.amount.length || Coin.isAmino(o.amount[0])));
    },
    encode(message, writer = BinaryWriter.create()) {
        if (message.proposalId !== BigInt(0)) {
            writer.uint32(8).uint64(message.proposalId);
        }
        if (message.depositor !== "") {
            writer.uint32(18).string(message.depositor);
        }
        for (const v of message.amount) {
            Coin.encode(v, writer.uint32(26).fork()).ldelim();
        }
        return writer;
    },
    decode(input, length) {
        const reader = input instanceof BinaryReader ? input : new BinaryReader(input);
        let end = length === undefined ? reader.len : reader.pos + length;
        const message = createBaseMsgDeposit();
        while (reader.pos < end) {
            const tag = reader.uint32();
            switch (tag >>> 3) {
                case 1:
                    message.proposalId = reader.uint64();
                    break;
                case 2:
                    message.depositor = reader.string();
                    break;
                case 3:
                    message.amount.push(Coin.decode(reader, reader.uint32()));
                    break;
                default:
                    reader.skipType(tag & 7);
                    break;
            }
        }
        return message;
    },
    fromPartial(object) {
        const message = createBaseMsgDeposit();
        message.proposalId = object.proposalId !== undefined && object.proposalId !== null ? BigInt(object.proposalId.toString()) : BigInt(0);
        message.depositor = object.depositor ?? "";
        message.amount = object.amount?.map(e => Coin.fromPartial(e)) || [];
        return message;
    },
    fromAmino(object) {
        const message = createBaseMsgDeposit();
        if (object.proposal_id !== undefined && object.proposal_id !== null) {
            message.proposalId = BigInt(object.proposal_id);
        }
        if (object.depositor !== undefined && object.depositor !== null) {
            message.depositor = object.depositor;
        }
        message.amount = object.amount?.map(e => Coin.fromAmino(e)) || [];
        return message;
    },
    toAmino(message) {
        const obj = {};
        obj.proposal_id = message.proposalId ? message.proposalId?.toString() : "0";
        obj.depositor = message.depositor === "" ? undefined : message.depositor;
        if (message.amount) {
            obj.amount = message.amount.map(e => e ? Coin.toAmino(e) : undefined);
        }
        else {
            obj.amount = message.amount;
        }
        return obj;
    },
    fromAminoMsg(object) {
        return MsgDeposit.fromAmino(object.value);
    },
    toAminoMsg(message) {
        return {
            type: "cosmos-sdk/v1/MsgDeposit",
            value: MsgDeposit.toAmino(message)
        };
    },
    fromProtoMsg(message) {
        return MsgDeposit.decode(message.value);
    },
    toProto(message) {
        return MsgDeposit.encode(message).finish();
    },
    toProtoMsg(message) {
        return {
            typeUrl: "/cosmos.gov.v1.MsgDeposit",
            value: MsgDeposit.encode(message).finish()
        };
    }
};
GlobalDecoderRegistry.register(MsgDeposit.typeUrl, MsgDeposit);
GlobalDecoderRegistry.registerAminoProtoMapping(MsgDeposit.aminoType, MsgDeposit.typeUrl);
function createBaseMsgDepositResponse() {
    return {};
}
export const MsgDepositResponse = {
    typeUrl: "/cosmos.gov.v1.MsgDepositResponse",
    aminoType: "cosmos-sdk/v1/MsgDepositResponse",
    is(o) {
        return o && o.$typeUrl === MsgDepositResponse.typeUrl;
    },
    isSDK(o) {
        return o && o.$typeUrl === MsgDepositResponse.typeUrl;
    },
    isAmino(o) {
        return o && o.$typeUrl === MsgDepositResponse.typeUrl;
    },
    encode(_, writer = BinaryWriter.create()) {
        return writer;
    },
    decode(input, length) {
        const reader = input instanceof BinaryReader ? input : new BinaryReader(input);
        let end = length === undefined ? reader.len : reader.pos + length;
        const message = createBaseMsgDepositResponse();
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
        const message = createBaseMsgDepositResponse();
        return message;
    },
    fromAmino(_) {
        const message = createBaseMsgDepositResponse();
        return message;
    },
    toAmino(_) {
        const obj = {};
        return obj;
    },
    fromAminoMsg(object) {
        return MsgDepositResponse.fromAmino(object.value);
    },
    toAminoMsg(message) {
        return {
            type: "cosmos-sdk/v1/MsgDepositResponse",
            value: MsgDepositResponse.toAmino(message)
        };
    },
    fromProtoMsg(message) {
        return MsgDepositResponse.decode(message.value);
    },
    toProto(message) {
        return MsgDepositResponse.encode(message).finish();
    },
    toProtoMsg(message) {
        return {
            typeUrl: "/cosmos.gov.v1.MsgDepositResponse",
            value: MsgDepositResponse.encode(message).finish()
        };
    }
};
GlobalDecoderRegistry.register(MsgDepositResponse.typeUrl, MsgDepositResponse);
GlobalDecoderRegistry.registerAminoProtoMapping(MsgDepositResponse.aminoType, MsgDepositResponse.typeUrl);
function createBaseMsgUpdateParams() {
    return {
        authority: "",
        params: Params.fromPartial({})
    };
}
export const MsgUpdateParams = {
    typeUrl: "/cosmos.gov.v1.MsgUpdateParams",
    aminoType: "cosmos-sdk/x/gov/v1/MsgUpdateParams",
    is(o) {
        return o && (o.$typeUrl === MsgUpdateParams.typeUrl || typeof o.authority === "string" && Params.is(o.params));
    },
    isSDK(o) {
        return o && (o.$typeUrl === MsgUpdateParams.typeUrl || typeof o.authority === "string" && Params.isSDK(o.params));
    },
    isAmino(o) {
        return o && (o.$typeUrl === MsgUpdateParams.typeUrl || typeof o.authority === "string" && Params.isAmino(o.params));
    },
    encode(message, writer = BinaryWriter.create()) {
        if (message.authority !== "") {
            writer.uint32(10).string(message.authority);
        }
        if (message.params !== undefined) {
            Params.encode(message.params, writer.uint32(18).fork()).ldelim();
        }
        return writer;
    },
    decode(input, length) {
        const reader = input instanceof BinaryReader ? input : new BinaryReader(input);
        let end = length === undefined ? reader.len : reader.pos + length;
        const message = createBaseMsgUpdateParams();
        while (reader.pos < end) {
            const tag = reader.uint32();
            switch (tag >>> 3) {
                case 1:
                    message.authority = reader.string();
                    break;
                case 2:
                    message.params = Params.decode(reader, reader.uint32());
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
        message.params = object.params !== undefined && object.params !== null ? Params.fromPartial(object.params) : undefined;
        return message;
    },
    fromAmino(object) {
        const message = createBaseMsgUpdateParams();
        if (object.authority !== undefined && object.authority !== null) {
            message.authority = object.authority;
        }
        if (object.params !== undefined && object.params !== null) {
            message.params = Params.fromAmino(object.params);
        }
        return message;
    },
    toAmino(message) {
        const obj = {};
        obj.authority = message.authority === "" ? undefined : message.authority;
        obj.params = message.params ? Params.toAmino(message.params) : Params.toAmino(Params.fromPartial({}));
        return obj;
    },
    fromAminoMsg(object) {
        return MsgUpdateParams.fromAmino(object.value);
    },
    toAminoMsg(message) {
        return {
            type: "cosmos-sdk/x/gov/v1/MsgUpdateParams",
            value: MsgUpdateParams.toAmino(message)
        };
    },
    fromProtoMsg(message) {
        return MsgUpdateParams.decode(message.value);
    },
    toProto(message) {
        return MsgUpdateParams.encode(message).finish();
    },
    toProtoMsg(message) {
        return {
            typeUrl: "/cosmos.gov.v1.MsgUpdateParams",
            value: MsgUpdateParams.encode(message).finish()
        };
    }
};
GlobalDecoderRegistry.register(MsgUpdateParams.typeUrl, MsgUpdateParams);
GlobalDecoderRegistry.registerAminoProtoMapping(MsgUpdateParams.aminoType, MsgUpdateParams.typeUrl);
function createBaseMsgUpdateParamsResponse() {
    return {};
}
export const MsgUpdateParamsResponse = {
    typeUrl: "/cosmos.gov.v1.MsgUpdateParamsResponse",
    aminoType: "cosmos-sdk/v1/MsgUpdateParamsResponse",
    is(o) {
        return o && o.$typeUrl === MsgUpdateParamsResponse.typeUrl;
    },
    isSDK(o) {
        return o && o.$typeUrl === MsgUpdateParamsResponse.typeUrl;
    },
    isAmino(o) {
        return o && o.$typeUrl === MsgUpdateParamsResponse.typeUrl;
    },
    encode(_, writer = BinaryWriter.create()) {
        return writer;
    },
    decode(input, length) {
        const reader = input instanceof BinaryReader ? input : new BinaryReader(input);
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
        return MsgUpdateParamsResponse.fromAmino(object.value);
    },
    toAminoMsg(message) {
        return {
            type: "cosmos-sdk/v1/MsgUpdateParamsResponse",
            value: MsgUpdateParamsResponse.toAmino(message)
        };
    },
    fromProtoMsg(message) {
        return MsgUpdateParamsResponse.decode(message.value);
    },
    toProto(message) {
        return MsgUpdateParamsResponse.encode(message).finish();
    },
    toProtoMsg(message) {
        return {
            typeUrl: "/cosmos.gov.v1.MsgUpdateParamsResponse",
            value: MsgUpdateParamsResponse.encode(message).finish()
        };
    }
};
GlobalDecoderRegistry.register(MsgUpdateParamsResponse.typeUrl, MsgUpdateParamsResponse);
GlobalDecoderRegistry.registerAminoProtoMapping(MsgUpdateParamsResponse.aminoType, MsgUpdateParamsResponse.typeUrl);
function createBaseMsgCancelProposal() {
    return {
        proposalId: BigInt(0),
        proposer: ""
    };
}
export const MsgCancelProposal = {
    typeUrl: "/cosmos.gov.v1.MsgCancelProposal",
    aminoType: "cosmos-sdk/v1/MsgCancelProposal",
    is(o) {
        return o && (o.$typeUrl === MsgCancelProposal.typeUrl || typeof o.proposalId === "bigint" && typeof o.proposer === "string");
    },
    isSDK(o) {
        return o && (o.$typeUrl === MsgCancelProposal.typeUrl || typeof o.proposal_id === "bigint" && typeof o.proposer === "string");
    },
    isAmino(o) {
        return o && (o.$typeUrl === MsgCancelProposal.typeUrl || typeof o.proposal_id === "bigint" && typeof o.proposer === "string");
    },
    encode(message, writer = BinaryWriter.create()) {
        if (message.proposalId !== BigInt(0)) {
            writer.uint32(8).uint64(message.proposalId);
        }
        if (message.proposer !== "") {
            writer.uint32(18).string(message.proposer);
        }
        return writer;
    },
    decode(input, length) {
        const reader = input instanceof BinaryReader ? input : new BinaryReader(input);
        let end = length === undefined ? reader.len : reader.pos + length;
        const message = createBaseMsgCancelProposal();
        while (reader.pos < end) {
            const tag = reader.uint32();
            switch (tag >>> 3) {
                case 1:
                    message.proposalId = reader.uint64();
                    break;
                case 2:
                    message.proposer = reader.string();
                    break;
                default:
                    reader.skipType(tag & 7);
                    break;
            }
        }
        return message;
    },
    fromPartial(object) {
        const message = createBaseMsgCancelProposal();
        message.proposalId = object.proposalId !== undefined && object.proposalId !== null ? BigInt(object.proposalId.toString()) : BigInt(0);
        message.proposer = object.proposer ?? "";
        return message;
    },
    fromAmino(object) {
        const message = createBaseMsgCancelProposal();
        if (object.proposal_id !== undefined && object.proposal_id !== null) {
            message.proposalId = BigInt(object.proposal_id);
        }
        if (object.proposer !== undefined && object.proposer !== null) {
            message.proposer = object.proposer;
        }
        return message;
    },
    toAmino(message) {
        const obj = {};
        obj.proposal_id = message.proposalId ? message.proposalId?.toString() : "0";
        obj.proposer = message.proposer === "" ? undefined : message.proposer;
        return obj;
    },
    fromAminoMsg(object) {
        return MsgCancelProposal.fromAmino(object.value);
    },
    toAminoMsg(message) {
        return {
            type: "cosmos-sdk/v1/MsgCancelProposal",
            value: MsgCancelProposal.toAmino(message)
        };
    },
    fromProtoMsg(message) {
        return MsgCancelProposal.decode(message.value);
    },
    toProto(message) {
        return MsgCancelProposal.encode(message).finish();
    },
    toProtoMsg(message) {
        return {
            typeUrl: "/cosmos.gov.v1.MsgCancelProposal",
            value: MsgCancelProposal.encode(message).finish()
        };
    }
};
GlobalDecoderRegistry.register(MsgCancelProposal.typeUrl, MsgCancelProposal);
GlobalDecoderRegistry.registerAminoProtoMapping(MsgCancelProposal.aminoType, MsgCancelProposal.typeUrl);
function createBaseMsgCancelProposalResponse() {
    return {
        proposalId: BigInt(0),
        canceledTime: new Date(),
        canceledHeight: BigInt(0)
    };
}
export const MsgCancelProposalResponse = {
    typeUrl: "/cosmos.gov.v1.MsgCancelProposalResponse",
    aminoType: "cosmos-sdk/v1/MsgCancelProposalResponse",
    is(o) {
        return o && (o.$typeUrl === MsgCancelProposalResponse.typeUrl || typeof o.proposalId === "bigint" && Timestamp.is(o.canceledTime) && typeof o.canceledHeight === "bigint");
    },
    isSDK(o) {
        return o && (o.$typeUrl === MsgCancelProposalResponse.typeUrl || typeof o.proposal_id === "bigint" && Timestamp.isSDK(o.canceled_time) && typeof o.canceled_height === "bigint");
    },
    isAmino(o) {
        return o && (o.$typeUrl === MsgCancelProposalResponse.typeUrl || typeof o.proposal_id === "bigint" && Timestamp.isAmino(o.canceled_time) && typeof o.canceled_height === "bigint");
    },
    encode(message, writer = BinaryWriter.create()) {
        if (message.proposalId !== BigInt(0)) {
            writer.uint32(8).uint64(message.proposalId);
        }
        if (message.canceledTime !== undefined) {
            Timestamp.encode(toTimestamp(message.canceledTime), writer.uint32(18).fork()).ldelim();
        }
        if (message.canceledHeight !== BigInt(0)) {
            writer.uint32(24).uint64(message.canceledHeight);
        }
        return writer;
    },
    decode(input, length) {
        const reader = input instanceof BinaryReader ? input : new BinaryReader(input);
        let end = length === undefined ? reader.len : reader.pos + length;
        const message = createBaseMsgCancelProposalResponse();
        while (reader.pos < end) {
            const tag = reader.uint32();
            switch (tag >>> 3) {
                case 1:
                    message.proposalId = reader.uint64();
                    break;
                case 2:
                    message.canceledTime = fromTimestamp(Timestamp.decode(reader, reader.uint32()));
                    break;
                case 3:
                    message.canceledHeight = reader.uint64();
                    break;
                default:
                    reader.skipType(tag & 7);
                    break;
            }
        }
        return message;
    },
    fromPartial(object) {
        const message = createBaseMsgCancelProposalResponse();
        message.proposalId = object.proposalId !== undefined && object.proposalId !== null ? BigInt(object.proposalId.toString()) : BigInt(0);
        message.canceledTime = object.canceledTime ?? undefined;
        message.canceledHeight = object.canceledHeight !== undefined && object.canceledHeight !== null ? BigInt(object.canceledHeight.toString()) : BigInt(0);
        return message;
    },
    fromAmino(object) {
        const message = createBaseMsgCancelProposalResponse();
        if (object.proposal_id !== undefined && object.proposal_id !== null) {
            message.proposalId = BigInt(object.proposal_id);
        }
        if (object.canceled_time !== undefined && object.canceled_time !== null) {
            message.canceledTime = fromTimestamp(Timestamp.fromAmino(object.canceled_time));
        }
        if (object.canceled_height !== undefined && object.canceled_height !== null) {
            message.canceledHeight = BigInt(object.canceled_height);
        }
        return message;
    },
    toAmino(message) {
        const obj = {};
        obj.proposal_id = message.proposalId ? message.proposalId?.toString() : "0";
        obj.canceled_time = message.canceledTime ? Timestamp.toAmino(toTimestamp(message.canceledTime)) : undefined;
        obj.canceled_height = message.canceledHeight !== BigInt(0) ? message.canceledHeight?.toString() : undefined;
        return obj;
    },
    fromAminoMsg(object) {
        return MsgCancelProposalResponse.fromAmino(object.value);
    },
    toAminoMsg(message) {
        return {
            type: "cosmos-sdk/v1/MsgCancelProposalResponse",
            value: MsgCancelProposalResponse.toAmino(message)
        };
    },
    fromProtoMsg(message) {
        return MsgCancelProposalResponse.decode(message.value);
    },
    toProto(message) {
        return MsgCancelProposalResponse.encode(message).finish();
    },
    toProtoMsg(message) {
        return {
            typeUrl: "/cosmos.gov.v1.MsgCancelProposalResponse",
            value: MsgCancelProposalResponse.encode(message).finish()
        };
    }
};
GlobalDecoderRegistry.register(MsgCancelProposalResponse.typeUrl, MsgCancelProposalResponse);
GlobalDecoderRegistry.registerAminoProtoMapping(MsgCancelProposalResponse.aminoType, MsgCancelProposalResponse.typeUrl);
