//@ts-nocheck
import { Proposal, Vote, VotingParams, DepositParams, TallyParams, Deposit, TallyResult } from "./gov";
import { PageRequest, PageResponse } from "../../base/query/v1beta1/pagination";
import { BinaryReader, BinaryWriter } from "../../../binary";
import { GlobalDecoderRegistry } from "../../../registry";
import { isSet } from "../../../helpers";
function createBaseQueryProposalRequest() {
    return {
        proposalId: BigInt(0)
    };
}
export const QueryProposalRequest = {
    typeUrl: "/cosmos.gov.v1beta1.QueryProposalRequest",
    aminoType: "cosmos-sdk/QueryProposalRequest",
    is(o) {
        return o && (o.$typeUrl === QueryProposalRequest.typeUrl || typeof o.proposalId === "bigint");
    },
    isSDK(o) {
        return o && (o.$typeUrl === QueryProposalRequest.typeUrl || typeof o.proposal_id === "bigint");
    },
    isAmino(o) {
        return o && (o.$typeUrl === QueryProposalRequest.typeUrl || typeof o.proposal_id === "bigint");
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
        const message = createBaseQueryProposalRequest();
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
        const message = createBaseQueryProposalRequest();
        message.proposalId = object.proposalId !== undefined && object.proposalId !== null ? BigInt(object.proposalId.toString()) : BigInt(0);
        return message;
    },
    fromAmino(object) {
        const message = createBaseQueryProposalRequest();
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
        return QueryProposalRequest.fromAmino(object.value);
    },
    toAminoMsg(message) {
        return {
            type: "cosmos-sdk/QueryProposalRequest",
            value: QueryProposalRequest.toAmino(message)
        };
    },
    fromProtoMsg(message) {
        return QueryProposalRequest.decode(message.value);
    },
    toProto(message) {
        return QueryProposalRequest.encode(message).finish();
    },
    toProtoMsg(message) {
        return {
            typeUrl: "/cosmos.gov.v1beta1.QueryProposalRequest",
            value: QueryProposalRequest.encode(message).finish()
        };
    }
};
GlobalDecoderRegistry.register(QueryProposalRequest.typeUrl, QueryProposalRequest);
GlobalDecoderRegistry.registerAminoProtoMapping(QueryProposalRequest.aminoType, QueryProposalRequest.typeUrl);
function createBaseQueryProposalResponse() {
    return {
        proposal: Proposal.fromPartial({})
    };
}
export const QueryProposalResponse = {
    typeUrl: "/cosmos.gov.v1beta1.QueryProposalResponse",
    aminoType: "cosmos-sdk/QueryProposalResponse",
    is(o) {
        return o && (o.$typeUrl === QueryProposalResponse.typeUrl || Proposal.is(o.proposal));
    },
    isSDK(o) {
        return o && (o.$typeUrl === QueryProposalResponse.typeUrl || Proposal.isSDK(o.proposal));
    },
    isAmino(o) {
        return o && (o.$typeUrl === QueryProposalResponse.typeUrl || Proposal.isAmino(o.proposal));
    },
    encode(message, writer = BinaryWriter.create()) {
        if (message.proposal !== undefined) {
            Proposal.encode(message.proposal, writer.uint32(10).fork()).ldelim();
        }
        return writer;
    },
    decode(input, length) {
        const reader = input instanceof BinaryReader ? input : new BinaryReader(input);
        let end = length === undefined ? reader.len : reader.pos + length;
        const message = createBaseQueryProposalResponse();
        while (reader.pos < end) {
            const tag = reader.uint32();
            switch (tag >>> 3) {
                case 1:
                    message.proposal = Proposal.decode(reader, reader.uint32());
                    break;
                default:
                    reader.skipType(tag & 7);
                    break;
            }
        }
        return message;
    },
    fromPartial(object) {
        const message = createBaseQueryProposalResponse();
        message.proposal = object.proposal !== undefined && object.proposal !== null ? Proposal.fromPartial(object.proposal) : undefined;
        return message;
    },
    fromAmino(object) {
        const message = createBaseQueryProposalResponse();
        if (object.proposal !== undefined && object.proposal !== null) {
            message.proposal = Proposal.fromAmino(object.proposal);
        }
        return message;
    },
    toAmino(message) {
        const obj = {};
        obj.proposal = message.proposal ? Proposal.toAmino(message.proposal) : Proposal.toAmino(Proposal.fromPartial({}));
        return obj;
    },
    fromAminoMsg(object) {
        return QueryProposalResponse.fromAmino(object.value);
    },
    toAminoMsg(message) {
        return {
            type: "cosmos-sdk/QueryProposalResponse",
            value: QueryProposalResponse.toAmino(message)
        };
    },
    fromProtoMsg(message) {
        return QueryProposalResponse.decode(message.value);
    },
    toProto(message) {
        return QueryProposalResponse.encode(message).finish();
    },
    toProtoMsg(message) {
        return {
            typeUrl: "/cosmos.gov.v1beta1.QueryProposalResponse",
            value: QueryProposalResponse.encode(message).finish()
        };
    }
};
GlobalDecoderRegistry.register(QueryProposalResponse.typeUrl, QueryProposalResponse);
GlobalDecoderRegistry.registerAminoProtoMapping(QueryProposalResponse.aminoType, QueryProposalResponse.typeUrl);
function createBaseQueryProposalsRequest() {
    return {
        proposalStatus: 0,
        voter: "",
        depositor: "",
        pagination: undefined
    };
}
export const QueryProposalsRequest = {
    typeUrl: "/cosmos.gov.v1beta1.QueryProposalsRequest",
    aminoType: "cosmos-sdk/QueryProposalsRequest",
    is(o) {
        return o && (o.$typeUrl === QueryProposalsRequest.typeUrl || isSet(o.proposalStatus) && typeof o.voter === "string" && typeof o.depositor === "string");
    },
    isSDK(o) {
        return o && (o.$typeUrl === QueryProposalsRequest.typeUrl || isSet(o.proposal_status) && typeof o.voter === "string" && typeof o.depositor === "string");
    },
    isAmino(o) {
        return o && (o.$typeUrl === QueryProposalsRequest.typeUrl || isSet(o.proposal_status) && typeof o.voter === "string" && typeof o.depositor === "string");
    },
    encode(message, writer = BinaryWriter.create()) {
        if (message.proposalStatus !== 0) {
            writer.uint32(8).int32(message.proposalStatus);
        }
        if (message.voter !== "") {
            writer.uint32(18).string(message.voter);
        }
        if (message.depositor !== "") {
            writer.uint32(26).string(message.depositor);
        }
        if (message.pagination !== undefined) {
            PageRequest.encode(message.pagination, writer.uint32(34).fork()).ldelim();
        }
        return writer;
    },
    decode(input, length) {
        const reader = input instanceof BinaryReader ? input : new BinaryReader(input);
        let end = length === undefined ? reader.len : reader.pos + length;
        const message = createBaseQueryProposalsRequest();
        while (reader.pos < end) {
            const tag = reader.uint32();
            switch (tag >>> 3) {
                case 1:
                    message.proposalStatus = reader.int32();
                    break;
                case 2:
                    message.voter = reader.string();
                    break;
                case 3:
                    message.depositor = reader.string();
                    break;
                case 4:
                    message.pagination = PageRequest.decode(reader, reader.uint32());
                    break;
                default:
                    reader.skipType(tag & 7);
                    break;
            }
        }
        return message;
    },
    fromPartial(object) {
        const message = createBaseQueryProposalsRequest();
        message.proposalStatus = object.proposalStatus ?? 0;
        message.voter = object.voter ?? "";
        message.depositor = object.depositor ?? "";
        message.pagination = object.pagination !== undefined && object.pagination !== null ? PageRequest.fromPartial(object.pagination) : undefined;
        return message;
    },
    fromAmino(object) {
        const message = createBaseQueryProposalsRequest();
        if (object.proposal_status !== undefined && object.proposal_status !== null) {
            message.proposalStatus = object.proposal_status;
        }
        if (object.voter !== undefined && object.voter !== null) {
            message.voter = object.voter;
        }
        if (object.depositor !== undefined && object.depositor !== null) {
            message.depositor = object.depositor;
        }
        if (object.pagination !== undefined && object.pagination !== null) {
            message.pagination = PageRequest.fromAmino(object.pagination);
        }
        return message;
    },
    toAmino(message) {
        const obj = {};
        obj.proposal_status = message.proposalStatus === 0 ? undefined : message.proposalStatus;
        obj.voter = message.voter === "" ? undefined : message.voter;
        obj.depositor = message.depositor === "" ? undefined : message.depositor;
        obj.pagination = message.pagination ? PageRequest.toAmino(message.pagination) : undefined;
        return obj;
    },
    fromAminoMsg(object) {
        return QueryProposalsRequest.fromAmino(object.value);
    },
    toAminoMsg(message) {
        return {
            type: "cosmos-sdk/QueryProposalsRequest",
            value: QueryProposalsRequest.toAmino(message)
        };
    },
    fromProtoMsg(message) {
        return QueryProposalsRequest.decode(message.value);
    },
    toProto(message) {
        return QueryProposalsRequest.encode(message).finish();
    },
    toProtoMsg(message) {
        return {
            typeUrl: "/cosmos.gov.v1beta1.QueryProposalsRequest",
            value: QueryProposalsRequest.encode(message).finish()
        };
    }
};
GlobalDecoderRegistry.register(QueryProposalsRequest.typeUrl, QueryProposalsRequest);
GlobalDecoderRegistry.registerAminoProtoMapping(QueryProposalsRequest.aminoType, QueryProposalsRequest.typeUrl);
function createBaseQueryProposalsResponse() {
    return {
        proposals: [],
        pagination: undefined
    };
}
export const QueryProposalsResponse = {
    typeUrl: "/cosmos.gov.v1beta1.QueryProposalsResponse",
    aminoType: "cosmos-sdk/QueryProposalsResponse",
    is(o) {
        return o && (o.$typeUrl === QueryProposalsResponse.typeUrl || Array.isArray(o.proposals) && (!o.proposals.length || Proposal.is(o.proposals[0])));
    },
    isSDK(o) {
        return o && (o.$typeUrl === QueryProposalsResponse.typeUrl || Array.isArray(o.proposals) && (!o.proposals.length || Proposal.isSDK(o.proposals[0])));
    },
    isAmino(o) {
        return o && (o.$typeUrl === QueryProposalsResponse.typeUrl || Array.isArray(o.proposals) && (!o.proposals.length || Proposal.isAmino(o.proposals[0])));
    },
    encode(message, writer = BinaryWriter.create()) {
        for (const v of message.proposals) {
            Proposal.encode(v, writer.uint32(10).fork()).ldelim();
        }
        if (message.pagination !== undefined) {
            PageResponse.encode(message.pagination, writer.uint32(18).fork()).ldelim();
        }
        return writer;
    },
    decode(input, length) {
        const reader = input instanceof BinaryReader ? input : new BinaryReader(input);
        let end = length === undefined ? reader.len : reader.pos + length;
        const message = createBaseQueryProposalsResponse();
        while (reader.pos < end) {
            const tag = reader.uint32();
            switch (tag >>> 3) {
                case 1:
                    message.proposals.push(Proposal.decode(reader, reader.uint32()));
                    break;
                case 2:
                    message.pagination = PageResponse.decode(reader, reader.uint32());
                    break;
                default:
                    reader.skipType(tag & 7);
                    break;
            }
        }
        return message;
    },
    fromPartial(object) {
        const message = createBaseQueryProposalsResponse();
        message.proposals = object.proposals?.map(e => Proposal.fromPartial(e)) || [];
        message.pagination = object.pagination !== undefined && object.pagination !== null ? PageResponse.fromPartial(object.pagination) : undefined;
        return message;
    },
    fromAmino(object) {
        const message = createBaseQueryProposalsResponse();
        message.proposals = object.proposals?.map(e => Proposal.fromAmino(e)) || [];
        if (object.pagination !== undefined && object.pagination !== null) {
            message.pagination = PageResponse.fromAmino(object.pagination);
        }
        return message;
    },
    toAmino(message) {
        const obj = {};
        if (message.proposals) {
            obj.proposals = message.proposals.map(e => e ? Proposal.toAmino(e) : undefined);
        }
        else {
            obj.proposals = message.proposals;
        }
        obj.pagination = message.pagination ? PageResponse.toAmino(message.pagination) : undefined;
        return obj;
    },
    fromAminoMsg(object) {
        return QueryProposalsResponse.fromAmino(object.value);
    },
    toAminoMsg(message) {
        return {
            type: "cosmos-sdk/QueryProposalsResponse",
            value: QueryProposalsResponse.toAmino(message)
        };
    },
    fromProtoMsg(message) {
        return QueryProposalsResponse.decode(message.value);
    },
    toProto(message) {
        return QueryProposalsResponse.encode(message).finish();
    },
    toProtoMsg(message) {
        return {
            typeUrl: "/cosmos.gov.v1beta1.QueryProposalsResponse",
            value: QueryProposalsResponse.encode(message).finish()
        };
    }
};
GlobalDecoderRegistry.register(QueryProposalsResponse.typeUrl, QueryProposalsResponse);
GlobalDecoderRegistry.registerAminoProtoMapping(QueryProposalsResponse.aminoType, QueryProposalsResponse.typeUrl);
function createBaseQueryVoteRequest() {
    return {
        proposalId: BigInt(0),
        voter: ""
    };
}
export const QueryVoteRequest = {
    typeUrl: "/cosmos.gov.v1beta1.QueryVoteRequest",
    aminoType: "cosmos-sdk/QueryVoteRequest",
    is(o) {
        return o && (o.$typeUrl === QueryVoteRequest.typeUrl || typeof o.proposalId === "bigint" && typeof o.voter === "string");
    },
    isSDK(o) {
        return o && (o.$typeUrl === QueryVoteRequest.typeUrl || typeof o.proposal_id === "bigint" && typeof o.voter === "string");
    },
    isAmino(o) {
        return o && (o.$typeUrl === QueryVoteRequest.typeUrl || typeof o.proposal_id === "bigint" && typeof o.voter === "string");
    },
    encode(message, writer = BinaryWriter.create()) {
        if (message.proposalId !== BigInt(0)) {
            writer.uint32(8).uint64(message.proposalId);
        }
        if (message.voter !== "") {
            writer.uint32(18).string(message.voter);
        }
        return writer;
    },
    decode(input, length) {
        const reader = input instanceof BinaryReader ? input : new BinaryReader(input);
        let end = length === undefined ? reader.len : reader.pos + length;
        const message = createBaseQueryVoteRequest();
        while (reader.pos < end) {
            const tag = reader.uint32();
            switch (tag >>> 3) {
                case 1:
                    message.proposalId = reader.uint64();
                    break;
                case 2:
                    message.voter = reader.string();
                    break;
                default:
                    reader.skipType(tag & 7);
                    break;
            }
        }
        return message;
    },
    fromPartial(object) {
        const message = createBaseQueryVoteRequest();
        message.proposalId = object.proposalId !== undefined && object.proposalId !== null ? BigInt(object.proposalId.toString()) : BigInt(0);
        message.voter = object.voter ?? "";
        return message;
    },
    fromAmino(object) {
        const message = createBaseQueryVoteRequest();
        if (object.proposal_id !== undefined && object.proposal_id !== null) {
            message.proposalId = BigInt(object.proposal_id);
        }
        if (object.voter !== undefined && object.voter !== null) {
            message.voter = object.voter;
        }
        return message;
    },
    toAmino(message) {
        const obj = {};
        obj.proposal_id = message.proposalId !== BigInt(0) ? message.proposalId?.toString() : undefined;
        obj.voter = message.voter === "" ? undefined : message.voter;
        return obj;
    },
    fromAminoMsg(object) {
        return QueryVoteRequest.fromAmino(object.value);
    },
    toAminoMsg(message) {
        return {
            type: "cosmos-sdk/QueryVoteRequest",
            value: QueryVoteRequest.toAmino(message)
        };
    },
    fromProtoMsg(message) {
        return QueryVoteRequest.decode(message.value);
    },
    toProto(message) {
        return QueryVoteRequest.encode(message).finish();
    },
    toProtoMsg(message) {
        return {
            typeUrl: "/cosmos.gov.v1beta1.QueryVoteRequest",
            value: QueryVoteRequest.encode(message).finish()
        };
    }
};
GlobalDecoderRegistry.register(QueryVoteRequest.typeUrl, QueryVoteRequest);
GlobalDecoderRegistry.registerAminoProtoMapping(QueryVoteRequest.aminoType, QueryVoteRequest.typeUrl);
function createBaseQueryVoteResponse() {
    return {
        vote: Vote.fromPartial({})
    };
}
export const QueryVoteResponse = {
    typeUrl: "/cosmos.gov.v1beta1.QueryVoteResponse",
    aminoType: "cosmos-sdk/QueryVoteResponse",
    is(o) {
        return o && (o.$typeUrl === QueryVoteResponse.typeUrl || Vote.is(o.vote));
    },
    isSDK(o) {
        return o && (o.$typeUrl === QueryVoteResponse.typeUrl || Vote.isSDK(o.vote));
    },
    isAmino(o) {
        return o && (o.$typeUrl === QueryVoteResponse.typeUrl || Vote.isAmino(o.vote));
    },
    encode(message, writer = BinaryWriter.create()) {
        if (message.vote !== undefined) {
            Vote.encode(message.vote, writer.uint32(10).fork()).ldelim();
        }
        return writer;
    },
    decode(input, length) {
        const reader = input instanceof BinaryReader ? input : new BinaryReader(input);
        let end = length === undefined ? reader.len : reader.pos + length;
        const message = createBaseQueryVoteResponse();
        while (reader.pos < end) {
            const tag = reader.uint32();
            switch (tag >>> 3) {
                case 1:
                    message.vote = Vote.decode(reader, reader.uint32());
                    break;
                default:
                    reader.skipType(tag & 7);
                    break;
            }
        }
        return message;
    },
    fromPartial(object) {
        const message = createBaseQueryVoteResponse();
        message.vote = object.vote !== undefined && object.vote !== null ? Vote.fromPartial(object.vote) : undefined;
        return message;
    },
    fromAmino(object) {
        const message = createBaseQueryVoteResponse();
        if (object.vote !== undefined && object.vote !== null) {
            message.vote = Vote.fromAmino(object.vote);
        }
        return message;
    },
    toAmino(message) {
        const obj = {};
        obj.vote = message.vote ? Vote.toAmino(message.vote) : Vote.toAmino(Vote.fromPartial({}));
        return obj;
    },
    fromAminoMsg(object) {
        return QueryVoteResponse.fromAmino(object.value);
    },
    toAminoMsg(message) {
        return {
            type: "cosmos-sdk/QueryVoteResponse",
            value: QueryVoteResponse.toAmino(message)
        };
    },
    fromProtoMsg(message) {
        return QueryVoteResponse.decode(message.value);
    },
    toProto(message) {
        return QueryVoteResponse.encode(message).finish();
    },
    toProtoMsg(message) {
        return {
            typeUrl: "/cosmos.gov.v1beta1.QueryVoteResponse",
            value: QueryVoteResponse.encode(message).finish()
        };
    }
};
GlobalDecoderRegistry.register(QueryVoteResponse.typeUrl, QueryVoteResponse);
GlobalDecoderRegistry.registerAminoProtoMapping(QueryVoteResponse.aminoType, QueryVoteResponse.typeUrl);
function createBaseQueryVotesRequest() {
    return {
        proposalId: BigInt(0),
        pagination: undefined
    };
}
export const QueryVotesRequest = {
    typeUrl: "/cosmos.gov.v1beta1.QueryVotesRequest",
    aminoType: "cosmos-sdk/QueryVotesRequest",
    is(o) {
        return o && (o.$typeUrl === QueryVotesRequest.typeUrl || typeof o.proposalId === "bigint");
    },
    isSDK(o) {
        return o && (o.$typeUrl === QueryVotesRequest.typeUrl || typeof o.proposal_id === "bigint");
    },
    isAmino(o) {
        return o && (o.$typeUrl === QueryVotesRequest.typeUrl || typeof o.proposal_id === "bigint");
    },
    encode(message, writer = BinaryWriter.create()) {
        if (message.proposalId !== BigInt(0)) {
            writer.uint32(8).uint64(message.proposalId);
        }
        if (message.pagination !== undefined) {
            PageRequest.encode(message.pagination, writer.uint32(18).fork()).ldelim();
        }
        return writer;
    },
    decode(input, length) {
        const reader = input instanceof BinaryReader ? input : new BinaryReader(input);
        let end = length === undefined ? reader.len : reader.pos + length;
        const message = createBaseQueryVotesRequest();
        while (reader.pos < end) {
            const tag = reader.uint32();
            switch (tag >>> 3) {
                case 1:
                    message.proposalId = reader.uint64();
                    break;
                case 2:
                    message.pagination = PageRequest.decode(reader, reader.uint32());
                    break;
                default:
                    reader.skipType(tag & 7);
                    break;
            }
        }
        return message;
    },
    fromPartial(object) {
        const message = createBaseQueryVotesRequest();
        message.proposalId = object.proposalId !== undefined && object.proposalId !== null ? BigInt(object.proposalId.toString()) : BigInt(0);
        message.pagination = object.pagination !== undefined && object.pagination !== null ? PageRequest.fromPartial(object.pagination) : undefined;
        return message;
    },
    fromAmino(object) {
        const message = createBaseQueryVotesRequest();
        if (object.proposal_id !== undefined && object.proposal_id !== null) {
            message.proposalId = BigInt(object.proposal_id);
        }
        if (object.pagination !== undefined && object.pagination !== null) {
            message.pagination = PageRequest.fromAmino(object.pagination);
        }
        return message;
    },
    toAmino(message) {
        const obj = {};
        obj.proposal_id = message.proposalId !== BigInt(0) ? message.proposalId?.toString() : undefined;
        obj.pagination = message.pagination ? PageRequest.toAmino(message.pagination) : undefined;
        return obj;
    },
    fromAminoMsg(object) {
        return QueryVotesRequest.fromAmino(object.value);
    },
    toAminoMsg(message) {
        return {
            type: "cosmos-sdk/QueryVotesRequest",
            value: QueryVotesRequest.toAmino(message)
        };
    },
    fromProtoMsg(message) {
        return QueryVotesRequest.decode(message.value);
    },
    toProto(message) {
        return QueryVotesRequest.encode(message).finish();
    },
    toProtoMsg(message) {
        return {
            typeUrl: "/cosmos.gov.v1beta1.QueryVotesRequest",
            value: QueryVotesRequest.encode(message).finish()
        };
    }
};
GlobalDecoderRegistry.register(QueryVotesRequest.typeUrl, QueryVotesRequest);
GlobalDecoderRegistry.registerAminoProtoMapping(QueryVotesRequest.aminoType, QueryVotesRequest.typeUrl);
function createBaseQueryVotesResponse() {
    return {
        votes: [],
        pagination: undefined
    };
}
export const QueryVotesResponse = {
    typeUrl: "/cosmos.gov.v1beta1.QueryVotesResponse",
    aminoType: "cosmos-sdk/QueryVotesResponse",
    is(o) {
        return o && (o.$typeUrl === QueryVotesResponse.typeUrl || Array.isArray(o.votes) && (!o.votes.length || Vote.is(o.votes[0])));
    },
    isSDK(o) {
        return o && (o.$typeUrl === QueryVotesResponse.typeUrl || Array.isArray(o.votes) && (!o.votes.length || Vote.isSDK(o.votes[0])));
    },
    isAmino(o) {
        return o && (o.$typeUrl === QueryVotesResponse.typeUrl || Array.isArray(o.votes) && (!o.votes.length || Vote.isAmino(o.votes[0])));
    },
    encode(message, writer = BinaryWriter.create()) {
        for (const v of message.votes) {
            Vote.encode(v, writer.uint32(10).fork()).ldelim();
        }
        if (message.pagination !== undefined) {
            PageResponse.encode(message.pagination, writer.uint32(18).fork()).ldelim();
        }
        return writer;
    },
    decode(input, length) {
        const reader = input instanceof BinaryReader ? input : new BinaryReader(input);
        let end = length === undefined ? reader.len : reader.pos + length;
        const message = createBaseQueryVotesResponse();
        while (reader.pos < end) {
            const tag = reader.uint32();
            switch (tag >>> 3) {
                case 1:
                    message.votes.push(Vote.decode(reader, reader.uint32()));
                    break;
                case 2:
                    message.pagination = PageResponse.decode(reader, reader.uint32());
                    break;
                default:
                    reader.skipType(tag & 7);
                    break;
            }
        }
        return message;
    },
    fromPartial(object) {
        const message = createBaseQueryVotesResponse();
        message.votes = object.votes?.map(e => Vote.fromPartial(e)) || [];
        message.pagination = object.pagination !== undefined && object.pagination !== null ? PageResponse.fromPartial(object.pagination) : undefined;
        return message;
    },
    fromAmino(object) {
        const message = createBaseQueryVotesResponse();
        message.votes = object.votes?.map(e => Vote.fromAmino(e)) || [];
        if (object.pagination !== undefined && object.pagination !== null) {
            message.pagination = PageResponse.fromAmino(object.pagination);
        }
        return message;
    },
    toAmino(message) {
        const obj = {};
        if (message.votes) {
            obj.votes = message.votes.map(e => e ? Vote.toAmino(e) : undefined);
        }
        else {
            obj.votes = message.votes;
        }
        obj.pagination = message.pagination ? PageResponse.toAmino(message.pagination) : undefined;
        return obj;
    },
    fromAminoMsg(object) {
        return QueryVotesResponse.fromAmino(object.value);
    },
    toAminoMsg(message) {
        return {
            type: "cosmos-sdk/QueryVotesResponse",
            value: QueryVotesResponse.toAmino(message)
        };
    },
    fromProtoMsg(message) {
        return QueryVotesResponse.decode(message.value);
    },
    toProto(message) {
        return QueryVotesResponse.encode(message).finish();
    },
    toProtoMsg(message) {
        return {
            typeUrl: "/cosmos.gov.v1beta1.QueryVotesResponse",
            value: QueryVotesResponse.encode(message).finish()
        };
    }
};
GlobalDecoderRegistry.register(QueryVotesResponse.typeUrl, QueryVotesResponse);
GlobalDecoderRegistry.registerAminoProtoMapping(QueryVotesResponse.aminoType, QueryVotesResponse.typeUrl);
function createBaseQueryParamsRequest() {
    return {
        paramsType: ""
    };
}
export const QueryParamsRequest = {
    typeUrl: "/cosmos.gov.v1beta1.QueryParamsRequest",
    aminoType: "cosmos-sdk/QueryParamsRequest",
    is(o) {
        return o && (o.$typeUrl === QueryParamsRequest.typeUrl || typeof o.paramsType === "string");
    },
    isSDK(o) {
        return o && (o.$typeUrl === QueryParamsRequest.typeUrl || typeof o.params_type === "string");
    },
    isAmino(o) {
        return o && (o.$typeUrl === QueryParamsRequest.typeUrl || typeof o.params_type === "string");
    },
    encode(message, writer = BinaryWriter.create()) {
        if (message.paramsType !== "") {
            writer.uint32(10).string(message.paramsType);
        }
        return writer;
    },
    decode(input, length) {
        const reader = input instanceof BinaryReader ? input : new BinaryReader(input);
        let end = length === undefined ? reader.len : reader.pos + length;
        const message = createBaseQueryParamsRequest();
        while (reader.pos < end) {
            const tag = reader.uint32();
            switch (tag >>> 3) {
                case 1:
                    message.paramsType = reader.string();
                    break;
                default:
                    reader.skipType(tag & 7);
                    break;
            }
        }
        return message;
    },
    fromPartial(object) {
        const message = createBaseQueryParamsRequest();
        message.paramsType = object.paramsType ?? "";
        return message;
    },
    fromAmino(object) {
        const message = createBaseQueryParamsRequest();
        if (object.params_type !== undefined && object.params_type !== null) {
            message.paramsType = object.params_type;
        }
        return message;
    },
    toAmino(message) {
        const obj = {};
        obj.params_type = message.paramsType === "" ? undefined : message.paramsType;
        return obj;
    },
    fromAminoMsg(object) {
        return QueryParamsRequest.fromAmino(object.value);
    },
    toAminoMsg(message) {
        return {
            type: "cosmos-sdk/QueryParamsRequest",
            value: QueryParamsRequest.toAmino(message)
        };
    },
    fromProtoMsg(message) {
        return QueryParamsRequest.decode(message.value);
    },
    toProto(message) {
        return QueryParamsRequest.encode(message).finish();
    },
    toProtoMsg(message) {
        return {
            typeUrl: "/cosmos.gov.v1beta1.QueryParamsRequest",
            value: QueryParamsRequest.encode(message).finish()
        };
    }
};
GlobalDecoderRegistry.register(QueryParamsRequest.typeUrl, QueryParamsRequest);
GlobalDecoderRegistry.registerAminoProtoMapping(QueryParamsRequest.aminoType, QueryParamsRequest.typeUrl);
function createBaseQueryParamsResponse() {
    return {
        votingParams: VotingParams.fromPartial({}),
        depositParams: DepositParams.fromPartial({}),
        tallyParams: TallyParams.fromPartial({})
    };
}
export const QueryParamsResponse = {
    typeUrl: "/cosmos.gov.v1beta1.QueryParamsResponse",
    aminoType: "cosmos-sdk/QueryParamsResponse",
    is(o) {
        return o && (o.$typeUrl === QueryParamsResponse.typeUrl || VotingParams.is(o.votingParams) && DepositParams.is(o.depositParams) && TallyParams.is(o.tallyParams));
    },
    isSDK(o) {
        return o && (o.$typeUrl === QueryParamsResponse.typeUrl || VotingParams.isSDK(o.voting_params) && DepositParams.isSDK(o.deposit_params) && TallyParams.isSDK(o.tally_params));
    },
    isAmino(o) {
        return o && (o.$typeUrl === QueryParamsResponse.typeUrl || VotingParams.isAmino(o.voting_params) && DepositParams.isAmino(o.deposit_params) && TallyParams.isAmino(o.tally_params));
    },
    encode(message, writer = BinaryWriter.create()) {
        if (message.votingParams !== undefined) {
            VotingParams.encode(message.votingParams, writer.uint32(10).fork()).ldelim();
        }
        if (message.depositParams !== undefined) {
            DepositParams.encode(message.depositParams, writer.uint32(18).fork()).ldelim();
        }
        if (message.tallyParams !== undefined) {
            TallyParams.encode(message.tallyParams, writer.uint32(26).fork()).ldelim();
        }
        return writer;
    },
    decode(input, length) {
        const reader = input instanceof BinaryReader ? input : new BinaryReader(input);
        let end = length === undefined ? reader.len : reader.pos + length;
        const message = createBaseQueryParamsResponse();
        while (reader.pos < end) {
            const tag = reader.uint32();
            switch (tag >>> 3) {
                case 1:
                    message.votingParams = VotingParams.decode(reader, reader.uint32());
                    break;
                case 2:
                    message.depositParams = DepositParams.decode(reader, reader.uint32());
                    break;
                case 3:
                    message.tallyParams = TallyParams.decode(reader, reader.uint32());
                    break;
                default:
                    reader.skipType(tag & 7);
                    break;
            }
        }
        return message;
    },
    fromPartial(object) {
        const message = createBaseQueryParamsResponse();
        message.votingParams = object.votingParams !== undefined && object.votingParams !== null ? VotingParams.fromPartial(object.votingParams) : undefined;
        message.depositParams = object.depositParams !== undefined && object.depositParams !== null ? DepositParams.fromPartial(object.depositParams) : undefined;
        message.tallyParams = object.tallyParams !== undefined && object.tallyParams !== null ? TallyParams.fromPartial(object.tallyParams) : undefined;
        return message;
    },
    fromAmino(object) {
        const message = createBaseQueryParamsResponse();
        if (object.voting_params !== undefined && object.voting_params !== null) {
            message.votingParams = VotingParams.fromAmino(object.voting_params);
        }
        if (object.deposit_params !== undefined && object.deposit_params !== null) {
            message.depositParams = DepositParams.fromAmino(object.deposit_params);
        }
        if (object.tally_params !== undefined && object.tally_params !== null) {
            message.tallyParams = TallyParams.fromAmino(object.tally_params);
        }
        return message;
    },
    toAmino(message) {
        const obj = {};
        obj.voting_params = message.votingParams ? VotingParams.toAmino(message.votingParams) : VotingParams.toAmino(VotingParams.fromPartial({}));
        obj.deposit_params = message.depositParams ? DepositParams.toAmino(message.depositParams) : DepositParams.toAmino(DepositParams.fromPartial({}));
        obj.tally_params = message.tallyParams ? TallyParams.toAmino(message.tallyParams) : TallyParams.toAmino(TallyParams.fromPartial({}));
        return obj;
    },
    fromAminoMsg(object) {
        return QueryParamsResponse.fromAmino(object.value);
    },
    toAminoMsg(message) {
        return {
            type: "cosmos-sdk/QueryParamsResponse",
            value: QueryParamsResponse.toAmino(message)
        };
    },
    fromProtoMsg(message) {
        return QueryParamsResponse.decode(message.value);
    },
    toProto(message) {
        return QueryParamsResponse.encode(message).finish();
    },
    toProtoMsg(message) {
        return {
            typeUrl: "/cosmos.gov.v1beta1.QueryParamsResponse",
            value: QueryParamsResponse.encode(message).finish()
        };
    }
};
GlobalDecoderRegistry.register(QueryParamsResponse.typeUrl, QueryParamsResponse);
GlobalDecoderRegistry.registerAminoProtoMapping(QueryParamsResponse.aminoType, QueryParamsResponse.typeUrl);
function createBaseQueryDepositRequest() {
    return {
        proposalId: BigInt(0),
        depositor: ""
    };
}
export const QueryDepositRequest = {
    typeUrl: "/cosmos.gov.v1beta1.QueryDepositRequest",
    aminoType: "cosmos-sdk/QueryDepositRequest",
    is(o) {
        return o && (o.$typeUrl === QueryDepositRequest.typeUrl || typeof o.proposalId === "bigint" && typeof o.depositor === "string");
    },
    isSDK(o) {
        return o && (o.$typeUrl === QueryDepositRequest.typeUrl || typeof o.proposal_id === "bigint" && typeof o.depositor === "string");
    },
    isAmino(o) {
        return o && (o.$typeUrl === QueryDepositRequest.typeUrl || typeof o.proposal_id === "bigint" && typeof o.depositor === "string");
    },
    encode(message, writer = BinaryWriter.create()) {
        if (message.proposalId !== BigInt(0)) {
            writer.uint32(8).uint64(message.proposalId);
        }
        if (message.depositor !== "") {
            writer.uint32(18).string(message.depositor);
        }
        return writer;
    },
    decode(input, length) {
        const reader = input instanceof BinaryReader ? input : new BinaryReader(input);
        let end = length === undefined ? reader.len : reader.pos + length;
        const message = createBaseQueryDepositRequest();
        while (reader.pos < end) {
            const tag = reader.uint32();
            switch (tag >>> 3) {
                case 1:
                    message.proposalId = reader.uint64();
                    break;
                case 2:
                    message.depositor = reader.string();
                    break;
                default:
                    reader.skipType(tag & 7);
                    break;
            }
        }
        return message;
    },
    fromPartial(object) {
        const message = createBaseQueryDepositRequest();
        message.proposalId = object.proposalId !== undefined && object.proposalId !== null ? BigInt(object.proposalId.toString()) : BigInt(0);
        message.depositor = object.depositor ?? "";
        return message;
    },
    fromAmino(object) {
        const message = createBaseQueryDepositRequest();
        if (object.proposal_id !== undefined && object.proposal_id !== null) {
            message.proposalId = BigInt(object.proposal_id);
        }
        if (object.depositor !== undefined && object.depositor !== null) {
            message.depositor = object.depositor;
        }
        return message;
    },
    toAmino(message) {
        const obj = {};
        obj.proposal_id = message.proposalId !== BigInt(0) ? message.proposalId?.toString() : undefined;
        obj.depositor = message.depositor === "" ? undefined : message.depositor;
        return obj;
    },
    fromAminoMsg(object) {
        return QueryDepositRequest.fromAmino(object.value);
    },
    toAminoMsg(message) {
        return {
            type: "cosmos-sdk/QueryDepositRequest",
            value: QueryDepositRequest.toAmino(message)
        };
    },
    fromProtoMsg(message) {
        return QueryDepositRequest.decode(message.value);
    },
    toProto(message) {
        return QueryDepositRequest.encode(message).finish();
    },
    toProtoMsg(message) {
        return {
            typeUrl: "/cosmos.gov.v1beta1.QueryDepositRequest",
            value: QueryDepositRequest.encode(message).finish()
        };
    }
};
GlobalDecoderRegistry.register(QueryDepositRequest.typeUrl, QueryDepositRequest);
GlobalDecoderRegistry.registerAminoProtoMapping(QueryDepositRequest.aminoType, QueryDepositRequest.typeUrl);
function createBaseQueryDepositResponse() {
    return {
        deposit: Deposit.fromPartial({})
    };
}
export const QueryDepositResponse = {
    typeUrl: "/cosmos.gov.v1beta1.QueryDepositResponse",
    aminoType: "cosmos-sdk/QueryDepositResponse",
    is(o) {
        return o && (o.$typeUrl === QueryDepositResponse.typeUrl || Deposit.is(o.deposit));
    },
    isSDK(o) {
        return o && (o.$typeUrl === QueryDepositResponse.typeUrl || Deposit.isSDK(o.deposit));
    },
    isAmino(o) {
        return o && (o.$typeUrl === QueryDepositResponse.typeUrl || Deposit.isAmino(o.deposit));
    },
    encode(message, writer = BinaryWriter.create()) {
        if (message.deposit !== undefined) {
            Deposit.encode(message.deposit, writer.uint32(10).fork()).ldelim();
        }
        return writer;
    },
    decode(input, length) {
        const reader = input instanceof BinaryReader ? input : new BinaryReader(input);
        let end = length === undefined ? reader.len : reader.pos + length;
        const message = createBaseQueryDepositResponse();
        while (reader.pos < end) {
            const tag = reader.uint32();
            switch (tag >>> 3) {
                case 1:
                    message.deposit = Deposit.decode(reader, reader.uint32());
                    break;
                default:
                    reader.skipType(tag & 7);
                    break;
            }
        }
        return message;
    },
    fromPartial(object) {
        const message = createBaseQueryDepositResponse();
        message.deposit = object.deposit !== undefined && object.deposit !== null ? Deposit.fromPartial(object.deposit) : undefined;
        return message;
    },
    fromAmino(object) {
        const message = createBaseQueryDepositResponse();
        if (object.deposit !== undefined && object.deposit !== null) {
            message.deposit = Deposit.fromAmino(object.deposit);
        }
        return message;
    },
    toAmino(message) {
        const obj = {};
        obj.deposit = message.deposit ? Deposit.toAmino(message.deposit) : Deposit.toAmino(Deposit.fromPartial({}));
        return obj;
    },
    fromAminoMsg(object) {
        return QueryDepositResponse.fromAmino(object.value);
    },
    toAminoMsg(message) {
        return {
            type: "cosmos-sdk/QueryDepositResponse",
            value: QueryDepositResponse.toAmino(message)
        };
    },
    fromProtoMsg(message) {
        return QueryDepositResponse.decode(message.value);
    },
    toProto(message) {
        return QueryDepositResponse.encode(message).finish();
    },
    toProtoMsg(message) {
        return {
            typeUrl: "/cosmos.gov.v1beta1.QueryDepositResponse",
            value: QueryDepositResponse.encode(message).finish()
        };
    }
};
GlobalDecoderRegistry.register(QueryDepositResponse.typeUrl, QueryDepositResponse);
GlobalDecoderRegistry.registerAminoProtoMapping(QueryDepositResponse.aminoType, QueryDepositResponse.typeUrl);
function createBaseQueryDepositsRequest() {
    return {
        proposalId: BigInt(0),
        pagination: undefined
    };
}
export const QueryDepositsRequest = {
    typeUrl: "/cosmos.gov.v1beta1.QueryDepositsRequest",
    aminoType: "cosmos-sdk/QueryDepositsRequest",
    is(o) {
        return o && (o.$typeUrl === QueryDepositsRequest.typeUrl || typeof o.proposalId === "bigint");
    },
    isSDK(o) {
        return o && (o.$typeUrl === QueryDepositsRequest.typeUrl || typeof o.proposal_id === "bigint");
    },
    isAmino(o) {
        return o && (o.$typeUrl === QueryDepositsRequest.typeUrl || typeof o.proposal_id === "bigint");
    },
    encode(message, writer = BinaryWriter.create()) {
        if (message.proposalId !== BigInt(0)) {
            writer.uint32(8).uint64(message.proposalId);
        }
        if (message.pagination !== undefined) {
            PageRequest.encode(message.pagination, writer.uint32(18).fork()).ldelim();
        }
        return writer;
    },
    decode(input, length) {
        const reader = input instanceof BinaryReader ? input : new BinaryReader(input);
        let end = length === undefined ? reader.len : reader.pos + length;
        const message = createBaseQueryDepositsRequest();
        while (reader.pos < end) {
            const tag = reader.uint32();
            switch (tag >>> 3) {
                case 1:
                    message.proposalId = reader.uint64();
                    break;
                case 2:
                    message.pagination = PageRequest.decode(reader, reader.uint32());
                    break;
                default:
                    reader.skipType(tag & 7);
                    break;
            }
        }
        return message;
    },
    fromPartial(object) {
        const message = createBaseQueryDepositsRequest();
        message.proposalId = object.proposalId !== undefined && object.proposalId !== null ? BigInt(object.proposalId.toString()) : BigInt(0);
        message.pagination = object.pagination !== undefined && object.pagination !== null ? PageRequest.fromPartial(object.pagination) : undefined;
        return message;
    },
    fromAmino(object) {
        const message = createBaseQueryDepositsRequest();
        if (object.proposal_id !== undefined && object.proposal_id !== null) {
            message.proposalId = BigInt(object.proposal_id);
        }
        if (object.pagination !== undefined && object.pagination !== null) {
            message.pagination = PageRequest.fromAmino(object.pagination);
        }
        return message;
    },
    toAmino(message) {
        const obj = {};
        obj.proposal_id = message.proposalId !== BigInt(0) ? message.proposalId?.toString() : undefined;
        obj.pagination = message.pagination ? PageRequest.toAmino(message.pagination) : undefined;
        return obj;
    },
    fromAminoMsg(object) {
        return QueryDepositsRequest.fromAmino(object.value);
    },
    toAminoMsg(message) {
        return {
            type: "cosmos-sdk/QueryDepositsRequest",
            value: QueryDepositsRequest.toAmino(message)
        };
    },
    fromProtoMsg(message) {
        return QueryDepositsRequest.decode(message.value);
    },
    toProto(message) {
        return QueryDepositsRequest.encode(message).finish();
    },
    toProtoMsg(message) {
        return {
            typeUrl: "/cosmos.gov.v1beta1.QueryDepositsRequest",
            value: QueryDepositsRequest.encode(message).finish()
        };
    }
};
GlobalDecoderRegistry.register(QueryDepositsRequest.typeUrl, QueryDepositsRequest);
GlobalDecoderRegistry.registerAminoProtoMapping(QueryDepositsRequest.aminoType, QueryDepositsRequest.typeUrl);
function createBaseQueryDepositsResponse() {
    return {
        deposits: [],
        pagination: undefined
    };
}
export const QueryDepositsResponse = {
    typeUrl: "/cosmos.gov.v1beta1.QueryDepositsResponse",
    aminoType: "cosmos-sdk/QueryDepositsResponse",
    is(o) {
        return o && (o.$typeUrl === QueryDepositsResponse.typeUrl || Array.isArray(o.deposits) && (!o.deposits.length || Deposit.is(o.deposits[0])));
    },
    isSDK(o) {
        return o && (o.$typeUrl === QueryDepositsResponse.typeUrl || Array.isArray(o.deposits) && (!o.deposits.length || Deposit.isSDK(o.deposits[0])));
    },
    isAmino(o) {
        return o && (o.$typeUrl === QueryDepositsResponse.typeUrl || Array.isArray(o.deposits) && (!o.deposits.length || Deposit.isAmino(o.deposits[0])));
    },
    encode(message, writer = BinaryWriter.create()) {
        for (const v of message.deposits) {
            Deposit.encode(v, writer.uint32(10).fork()).ldelim();
        }
        if (message.pagination !== undefined) {
            PageResponse.encode(message.pagination, writer.uint32(18).fork()).ldelim();
        }
        return writer;
    },
    decode(input, length) {
        const reader = input instanceof BinaryReader ? input : new BinaryReader(input);
        let end = length === undefined ? reader.len : reader.pos + length;
        const message = createBaseQueryDepositsResponse();
        while (reader.pos < end) {
            const tag = reader.uint32();
            switch (tag >>> 3) {
                case 1:
                    message.deposits.push(Deposit.decode(reader, reader.uint32()));
                    break;
                case 2:
                    message.pagination = PageResponse.decode(reader, reader.uint32());
                    break;
                default:
                    reader.skipType(tag & 7);
                    break;
            }
        }
        return message;
    },
    fromPartial(object) {
        const message = createBaseQueryDepositsResponse();
        message.deposits = object.deposits?.map(e => Deposit.fromPartial(e)) || [];
        message.pagination = object.pagination !== undefined && object.pagination !== null ? PageResponse.fromPartial(object.pagination) : undefined;
        return message;
    },
    fromAmino(object) {
        const message = createBaseQueryDepositsResponse();
        message.deposits = object.deposits?.map(e => Deposit.fromAmino(e)) || [];
        if (object.pagination !== undefined && object.pagination !== null) {
            message.pagination = PageResponse.fromAmino(object.pagination);
        }
        return message;
    },
    toAmino(message) {
        const obj = {};
        if (message.deposits) {
            obj.deposits = message.deposits.map(e => e ? Deposit.toAmino(e) : undefined);
        }
        else {
            obj.deposits = message.deposits;
        }
        obj.pagination = message.pagination ? PageResponse.toAmino(message.pagination) : undefined;
        return obj;
    },
    fromAminoMsg(object) {
        return QueryDepositsResponse.fromAmino(object.value);
    },
    toAminoMsg(message) {
        return {
            type: "cosmos-sdk/QueryDepositsResponse",
            value: QueryDepositsResponse.toAmino(message)
        };
    },
    fromProtoMsg(message) {
        return QueryDepositsResponse.decode(message.value);
    },
    toProto(message) {
        return QueryDepositsResponse.encode(message).finish();
    },
    toProtoMsg(message) {
        return {
            typeUrl: "/cosmos.gov.v1beta1.QueryDepositsResponse",
            value: QueryDepositsResponse.encode(message).finish()
        };
    }
};
GlobalDecoderRegistry.register(QueryDepositsResponse.typeUrl, QueryDepositsResponse);
GlobalDecoderRegistry.registerAminoProtoMapping(QueryDepositsResponse.aminoType, QueryDepositsResponse.typeUrl);
function createBaseQueryTallyResultRequest() {
    return {
        proposalId: BigInt(0)
    };
}
export const QueryTallyResultRequest = {
    typeUrl: "/cosmos.gov.v1beta1.QueryTallyResultRequest",
    aminoType: "cosmos-sdk/QueryTallyResultRequest",
    is(o) {
        return o && (o.$typeUrl === QueryTallyResultRequest.typeUrl || typeof o.proposalId === "bigint");
    },
    isSDK(o) {
        return o && (o.$typeUrl === QueryTallyResultRequest.typeUrl || typeof o.proposal_id === "bigint");
    },
    isAmino(o) {
        return o && (o.$typeUrl === QueryTallyResultRequest.typeUrl || typeof o.proposal_id === "bigint");
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
        const message = createBaseQueryTallyResultRequest();
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
        const message = createBaseQueryTallyResultRequest();
        message.proposalId = object.proposalId !== undefined && object.proposalId !== null ? BigInt(object.proposalId.toString()) : BigInt(0);
        return message;
    },
    fromAmino(object) {
        const message = createBaseQueryTallyResultRequest();
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
        return QueryTallyResultRequest.fromAmino(object.value);
    },
    toAminoMsg(message) {
        return {
            type: "cosmos-sdk/QueryTallyResultRequest",
            value: QueryTallyResultRequest.toAmino(message)
        };
    },
    fromProtoMsg(message) {
        return QueryTallyResultRequest.decode(message.value);
    },
    toProto(message) {
        return QueryTallyResultRequest.encode(message).finish();
    },
    toProtoMsg(message) {
        return {
            typeUrl: "/cosmos.gov.v1beta1.QueryTallyResultRequest",
            value: QueryTallyResultRequest.encode(message).finish()
        };
    }
};
GlobalDecoderRegistry.register(QueryTallyResultRequest.typeUrl, QueryTallyResultRequest);
GlobalDecoderRegistry.registerAminoProtoMapping(QueryTallyResultRequest.aminoType, QueryTallyResultRequest.typeUrl);
function createBaseQueryTallyResultResponse() {
    return {
        tally: TallyResult.fromPartial({})
    };
}
export const QueryTallyResultResponse = {
    typeUrl: "/cosmos.gov.v1beta1.QueryTallyResultResponse",
    aminoType: "cosmos-sdk/QueryTallyResultResponse",
    is(o) {
        return o && (o.$typeUrl === QueryTallyResultResponse.typeUrl || TallyResult.is(o.tally));
    },
    isSDK(o) {
        return o && (o.$typeUrl === QueryTallyResultResponse.typeUrl || TallyResult.isSDK(o.tally));
    },
    isAmino(o) {
        return o && (o.$typeUrl === QueryTallyResultResponse.typeUrl || TallyResult.isAmino(o.tally));
    },
    encode(message, writer = BinaryWriter.create()) {
        if (message.tally !== undefined) {
            TallyResult.encode(message.tally, writer.uint32(10).fork()).ldelim();
        }
        return writer;
    },
    decode(input, length) {
        const reader = input instanceof BinaryReader ? input : new BinaryReader(input);
        let end = length === undefined ? reader.len : reader.pos + length;
        const message = createBaseQueryTallyResultResponse();
        while (reader.pos < end) {
            const tag = reader.uint32();
            switch (tag >>> 3) {
                case 1:
                    message.tally = TallyResult.decode(reader, reader.uint32());
                    break;
                default:
                    reader.skipType(tag & 7);
                    break;
            }
        }
        return message;
    },
    fromPartial(object) {
        const message = createBaseQueryTallyResultResponse();
        message.tally = object.tally !== undefined && object.tally !== null ? TallyResult.fromPartial(object.tally) : undefined;
        return message;
    },
    fromAmino(object) {
        const message = createBaseQueryTallyResultResponse();
        if (object.tally !== undefined && object.tally !== null) {
            message.tally = TallyResult.fromAmino(object.tally);
        }
        return message;
    },
    toAmino(message) {
        const obj = {};
        obj.tally = message.tally ? TallyResult.toAmino(message.tally) : TallyResult.toAmino(TallyResult.fromPartial({}));
        return obj;
    },
    fromAminoMsg(object) {
        return QueryTallyResultResponse.fromAmino(object.value);
    },
    toAminoMsg(message) {
        return {
            type: "cosmos-sdk/QueryTallyResultResponse",
            value: QueryTallyResultResponse.toAmino(message)
        };
    },
    fromProtoMsg(message) {
        return QueryTallyResultResponse.decode(message.value);
    },
    toProto(message) {
        return QueryTallyResultResponse.encode(message).finish();
    },
    toProtoMsg(message) {
        return {
            typeUrl: "/cosmos.gov.v1beta1.QueryTallyResultResponse",
            value: QueryTallyResultResponse.encode(message).finish()
        };
    }
};
GlobalDecoderRegistry.register(QueryTallyResultResponse.typeUrl, QueryTallyResultResponse);
GlobalDecoderRegistry.registerAminoProtoMapping(QueryTallyResultResponse.aminoType, QueryTallyResultResponse.typeUrl);
