//@ts-nocheck
import { Any } from "../../../google/protobuf/any";
import { Coin } from "../../base/v1beta1/coin";
import { WeightedVoteOption } from "./gov";
import { BinaryReader, BinaryWriter } from "../../../binary";
import { GlobalDecoderRegistry } from "../../../registry";
import { isSet } from "../../../helpers";
function createBaseMsgSubmitProposal() {
    return {
        content: undefined,
        initialDeposit: [],
        proposer: ""
    };
}
export const MsgSubmitProposal = {
    typeUrl: "/cosmos.gov.v1beta1.MsgSubmitProposal",
    aminoType: "cosmos-sdk/MsgSubmitProposal",
    is(o) {
        return o && (o.$typeUrl === MsgSubmitProposal.typeUrl || Array.isArray(o.initialDeposit) && (!o.initialDeposit.length || Coin.is(o.initialDeposit[0])) && typeof o.proposer === "string");
    },
    isSDK(o) {
        return o && (o.$typeUrl === MsgSubmitProposal.typeUrl || Array.isArray(o.initial_deposit) && (!o.initial_deposit.length || Coin.isSDK(o.initial_deposit[0])) && typeof o.proposer === "string");
    },
    isAmino(o) {
        return o && (o.$typeUrl === MsgSubmitProposal.typeUrl || Array.isArray(o.initial_deposit) && (!o.initial_deposit.length || Coin.isAmino(o.initial_deposit[0])) && typeof o.proposer === "string");
    },
    encode(message, writer = BinaryWriter.create()) {
        if (message.content !== undefined) {
            Any.encode(GlobalDecoderRegistry.wrapAny(message.content), writer.uint32(10).fork()).ldelim();
        }
        for (const v of message.initialDeposit) {
            Coin.encode(v, writer.uint32(18).fork()).ldelim();
        }
        if (message.proposer !== "") {
            writer.uint32(26).string(message.proposer);
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
                    message.content = GlobalDecoderRegistry.unwrapAny(reader);
                    break;
                case 2:
                    message.initialDeposit.push(Coin.decode(reader, reader.uint32()));
                    break;
                case 3:
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
        const message = createBaseMsgSubmitProposal();
        message.content = object.content !== undefined && object.content !== null ? GlobalDecoderRegistry.fromPartial(object.content) : undefined;
        message.initialDeposit = object.initialDeposit?.map(e => Coin.fromPartial(e)) || [];
        message.proposer = object.proposer ?? "";
        return message;
    },
    fromAmino(object) {
        const message = createBaseMsgSubmitProposal();
        if (object.content !== undefined && object.content !== null) {
            message.content = GlobalDecoderRegistry.fromAminoMsg(object.content);
        }
        message.initialDeposit = object.initial_deposit?.map(e => Coin.fromAmino(e)) || [];
        if (object.proposer !== undefined && object.proposer !== null) {
            message.proposer = object.proposer;
        }
        return message;
    },
    toAmino(message) {
        const obj = {};
        obj.content = message.content ? GlobalDecoderRegistry.toAminoMsg(message.content) : undefined;
        if (message.initialDeposit) {
            obj.initial_deposit = message.initialDeposit.map(e => e ? Coin.toAmino(e) : undefined);
        }
        else {
            obj.initial_deposit = message.initialDeposit;
        }
        obj.proposer = message.proposer === "" ? undefined : message.proposer;
        return obj;
    },
    fromAminoMsg(object) {
        return MsgSubmitProposal.fromAmino(object.value);
    },
    toAminoMsg(message) {
        return {
            type: "cosmos-sdk/MsgSubmitProposal",
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
            typeUrl: "/cosmos.gov.v1beta1.MsgSubmitProposal",
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
    typeUrl: "/cosmos.gov.v1beta1.MsgSubmitProposalResponse",
    aminoType: "cosmos-sdk/MsgSubmitProposalResponse",
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
        obj.proposal_id = message.proposalId ? message.proposalId?.toString() : "0";
        return obj;
    },
    fromAminoMsg(object) {
        return MsgSubmitProposalResponse.fromAmino(object.value);
    },
    toAminoMsg(message) {
        return {
            type: "cosmos-sdk/MsgSubmitProposalResponse",
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
            typeUrl: "/cosmos.gov.v1beta1.MsgSubmitProposalResponse",
            value: MsgSubmitProposalResponse.encode(message).finish()
        };
    }
};
GlobalDecoderRegistry.register(MsgSubmitProposalResponse.typeUrl, MsgSubmitProposalResponse);
GlobalDecoderRegistry.registerAminoProtoMapping(MsgSubmitProposalResponse.aminoType, MsgSubmitProposalResponse.typeUrl);
function createBaseMsgVote() {
    return {
        proposalId: BigInt(0),
        voter: "",
        option: 0
    };
}
export const MsgVote = {
    typeUrl: "/cosmos.gov.v1beta1.MsgVote",
    aminoType: "cosmos-sdk/MsgVote",
    is(o) {
        return o && (o.$typeUrl === MsgVote.typeUrl || typeof o.proposalId === "bigint" && typeof o.voter === "string" && isSet(o.option));
    },
    isSDK(o) {
        return o && (o.$typeUrl === MsgVote.typeUrl || typeof o.proposal_id === "bigint" && typeof o.voter === "string" && isSet(o.option));
    },
    isAmino(o) {
        return o && (o.$typeUrl === MsgVote.typeUrl || typeof o.proposal_id === "bigint" && typeof o.voter === "string" && isSet(o.option));
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
        return message;
    },
    toAmino(message) {
        const obj = {};
        obj.proposal_id = message.proposalId !== BigInt(0) ? message.proposalId?.toString() : undefined;
        obj.voter = message.voter === "" ? undefined : message.voter;
        obj.option = message.option === 0 ? undefined : message.option;
        return obj;
    },
    fromAminoMsg(object) {
        return MsgVote.fromAmino(object.value);
    },
    toAminoMsg(message) {
        return {
            type: "cosmos-sdk/MsgVote",
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
            typeUrl: "/cosmos.gov.v1beta1.MsgVote",
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
    typeUrl: "/cosmos.gov.v1beta1.MsgVoteResponse",
    aminoType: "cosmos-sdk/MsgVoteResponse",
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
            type: "cosmos-sdk/MsgVoteResponse",
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
            typeUrl: "/cosmos.gov.v1beta1.MsgVoteResponse",
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
        options: []
    };
}
export const MsgVoteWeighted = {
    typeUrl: "/cosmos.gov.v1beta1.MsgVoteWeighted",
    aminoType: "cosmos-sdk/MsgVoteWeighted",
    is(o) {
        return o && (o.$typeUrl === MsgVoteWeighted.typeUrl || typeof o.proposalId === "bigint" && typeof o.voter === "string" && Array.isArray(o.options) && (!o.options.length || WeightedVoteOption.is(o.options[0])));
    },
    isSDK(o) {
        return o && (o.$typeUrl === MsgVoteWeighted.typeUrl || typeof o.proposal_id === "bigint" && typeof o.voter === "string" && Array.isArray(o.options) && (!o.options.length || WeightedVoteOption.isSDK(o.options[0])));
    },
    isAmino(o) {
        return o && (o.$typeUrl === MsgVoteWeighted.typeUrl || typeof o.proposal_id === "bigint" && typeof o.voter === "string" && Array.isArray(o.options) && (!o.options.length || WeightedVoteOption.isAmino(o.options[0])));
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
        return obj;
    },
    fromAminoMsg(object) {
        return MsgVoteWeighted.fromAmino(object.value);
    },
    toAminoMsg(message) {
        return {
            type: "cosmos-sdk/MsgVoteWeighted",
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
            typeUrl: "/cosmos.gov.v1beta1.MsgVoteWeighted",
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
    typeUrl: "/cosmos.gov.v1beta1.MsgVoteWeightedResponse",
    aminoType: "cosmos-sdk/MsgVoteWeightedResponse",
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
            type: "cosmos-sdk/MsgVoteWeightedResponse",
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
            typeUrl: "/cosmos.gov.v1beta1.MsgVoteWeightedResponse",
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
    typeUrl: "/cosmos.gov.v1beta1.MsgDeposit",
    aminoType: "cosmos-sdk/MsgDeposit",
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
            type: "cosmos-sdk/MsgDeposit",
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
            typeUrl: "/cosmos.gov.v1beta1.MsgDeposit",
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
    typeUrl: "/cosmos.gov.v1beta1.MsgDepositResponse",
    aminoType: "cosmos-sdk/MsgDepositResponse",
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
            type: "cosmos-sdk/MsgDepositResponse",
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
            typeUrl: "/cosmos.gov.v1beta1.MsgDepositResponse",
            value: MsgDepositResponse.encode(message).finish()
        };
    }
};
GlobalDecoderRegistry.register(MsgDepositResponse.typeUrl, MsgDepositResponse);
GlobalDecoderRegistry.registerAminoProtoMapping(MsgDepositResponse.aminoType, MsgDepositResponse.typeUrl);
