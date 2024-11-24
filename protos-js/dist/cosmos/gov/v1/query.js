"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.QueryTallyResultResponse = exports.QueryTallyResultRequest = exports.QueryDepositsResponse = exports.QueryDepositsRequest = exports.QueryDepositResponse = exports.QueryDepositRequest = exports.QueryParamsResponse = exports.QueryParamsRequest = exports.QueryVotesResponse = exports.QueryVotesRequest = exports.QueryVoteResponse = exports.QueryVoteRequest = exports.QueryProposalsResponse = exports.QueryProposalsRequest = exports.QueryProposalResponse = exports.QueryProposalRequest = exports.QueryConstitutionResponse = exports.QueryConstitutionRequest = void 0;
//@ts-nocheck
const gov_1 = require("./gov");
const pagination_1 = require("../../base/query/v1beta1/pagination");
const binary_1 = require("../../../binary");
const registry_1 = require("../../../registry");
const helpers_1 = require("../../../helpers");
function createBaseQueryConstitutionRequest() {
    return {};
}
exports.QueryConstitutionRequest = {
    typeUrl: "/cosmos.gov.v1.QueryConstitutionRequest",
    aminoType: "cosmos-sdk/v1/QueryConstitutionRequest",
    is(o) {
        return o && o.$typeUrl === exports.QueryConstitutionRequest.typeUrl;
    },
    isSDK(o) {
        return o && o.$typeUrl === exports.QueryConstitutionRequest.typeUrl;
    },
    isAmino(o) {
        return o && o.$typeUrl === exports.QueryConstitutionRequest.typeUrl;
    },
    encode(_, writer = binary_1.BinaryWriter.create()) {
        return writer;
    },
    decode(input, length) {
        const reader = input instanceof binary_1.BinaryReader ? input : new binary_1.BinaryReader(input);
        let end = length === undefined ? reader.len : reader.pos + length;
        const message = createBaseQueryConstitutionRequest();
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
        const message = createBaseQueryConstitutionRequest();
        return message;
    },
    fromAmino(_) {
        const message = createBaseQueryConstitutionRequest();
        return message;
    },
    toAmino(_) {
        const obj = {};
        return obj;
    },
    fromAminoMsg(object) {
        return exports.QueryConstitutionRequest.fromAmino(object.value);
    },
    toAminoMsg(message) {
        return {
            type: "cosmos-sdk/v1/QueryConstitutionRequest",
            value: exports.QueryConstitutionRequest.toAmino(message)
        };
    },
    fromProtoMsg(message) {
        return exports.QueryConstitutionRequest.decode(message.value);
    },
    toProto(message) {
        return exports.QueryConstitutionRequest.encode(message).finish();
    },
    toProtoMsg(message) {
        return {
            typeUrl: "/cosmos.gov.v1.QueryConstitutionRequest",
            value: exports.QueryConstitutionRequest.encode(message).finish()
        };
    }
};
registry_1.GlobalDecoderRegistry.register(exports.QueryConstitutionRequest.typeUrl, exports.QueryConstitutionRequest);
registry_1.GlobalDecoderRegistry.registerAminoProtoMapping(exports.QueryConstitutionRequest.aminoType, exports.QueryConstitutionRequest.typeUrl);
function createBaseQueryConstitutionResponse() {
    return {
        constitution: ""
    };
}
exports.QueryConstitutionResponse = {
    typeUrl: "/cosmos.gov.v1.QueryConstitutionResponse",
    aminoType: "cosmos-sdk/v1/QueryConstitutionResponse",
    is(o) {
        return o && (o.$typeUrl === exports.QueryConstitutionResponse.typeUrl || typeof o.constitution === "string");
    },
    isSDK(o) {
        return o && (o.$typeUrl === exports.QueryConstitutionResponse.typeUrl || typeof o.constitution === "string");
    },
    isAmino(o) {
        return o && (o.$typeUrl === exports.QueryConstitutionResponse.typeUrl || typeof o.constitution === "string");
    },
    encode(message, writer = binary_1.BinaryWriter.create()) {
        if (message.constitution !== "") {
            writer.uint32(10).string(message.constitution);
        }
        return writer;
    },
    decode(input, length) {
        const reader = input instanceof binary_1.BinaryReader ? input : new binary_1.BinaryReader(input);
        let end = length === undefined ? reader.len : reader.pos + length;
        const message = createBaseQueryConstitutionResponse();
        while (reader.pos < end) {
            const tag = reader.uint32();
            switch (tag >>> 3) {
                case 1:
                    message.constitution = reader.string();
                    break;
                default:
                    reader.skipType(tag & 7);
                    break;
            }
        }
        return message;
    },
    fromPartial(object) {
        const message = createBaseQueryConstitutionResponse();
        message.constitution = object.constitution ?? "";
        return message;
    },
    fromAmino(object) {
        const message = createBaseQueryConstitutionResponse();
        if (object.constitution !== undefined && object.constitution !== null) {
            message.constitution = object.constitution;
        }
        return message;
    },
    toAmino(message) {
        const obj = {};
        obj.constitution = message.constitution === "" ? undefined : message.constitution;
        return obj;
    },
    fromAminoMsg(object) {
        return exports.QueryConstitutionResponse.fromAmino(object.value);
    },
    toAminoMsg(message) {
        return {
            type: "cosmos-sdk/v1/QueryConstitutionResponse",
            value: exports.QueryConstitutionResponse.toAmino(message)
        };
    },
    fromProtoMsg(message) {
        return exports.QueryConstitutionResponse.decode(message.value);
    },
    toProto(message) {
        return exports.QueryConstitutionResponse.encode(message).finish();
    },
    toProtoMsg(message) {
        return {
            typeUrl: "/cosmos.gov.v1.QueryConstitutionResponse",
            value: exports.QueryConstitutionResponse.encode(message).finish()
        };
    }
};
registry_1.GlobalDecoderRegistry.register(exports.QueryConstitutionResponse.typeUrl, exports.QueryConstitutionResponse);
registry_1.GlobalDecoderRegistry.registerAminoProtoMapping(exports.QueryConstitutionResponse.aminoType, exports.QueryConstitutionResponse.typeUrl);
function createBaseQueryProposalRequest() {
    return {
        proposalId: BigInt(0)
    };
}
exports.QueryProposalRequest = {
    typeUrl: "/cosmos.gov.v1.QueryProposalRequest",
    aminoType: "cosmos-sdk/v1/QueryProposalRequest",
    is(o) {
        return o && (o.$typeUrl === exports.QueryProposalRequest.typeUrl || typeof o.proposalId === "bigint");
    },
    isSDK(o) {
        return o && (o.$typeUrl === exports.QueryProposalRequest.typeUrl || typeof o.proposal_id === "bigint");
    },
    isAmino(o) {
        return o && (o.$typeUrl === exports.QueryProposalRequest.typeUrl || typeof o.proposal_id === "bigint");
    },
    encode(message, writer = binary_1.BinaryWriter.create()) {
        if (message.proposalId !== BigInt(0)) {
            writer.uint32(8).uint64(message.proposalId);
        }
        return writer;
    },
    decode(input, length) {
        const reader = input instanceof binary_1.BinaryReader ? input : new binary_1.BinaryReader(input);
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
        return exports.QueryProposalRequest.fromAmino(object.value);
    },
    toAminoMsg(message) {
        return {
            type: "cosmos-sdk/v1/QueryProposalRequest",
            value: exports.QueryProposalRequest.toAmino(message)
        };
    },
    fromProtoMsg(message) {
        return exports.QueryProposalRequest.decode(message.value);
    },
    toProto(message) {
        return exports.QueryProposalRequest.encode(message).finish();
    },
    toProtoMsg(message) {
        return {
            typeUrl: "/cosmos.gov.v1.QueryProposalRequest",
            value: exports.QueryProposalRequest.encode(message).finish()
        };
    }
};
registry_1.GlobalDecoderRegistry.register(exports.QueryProposalRequest.typeUrl, exports.QueryProposalRequest);
registry_1.GlobalDecoderRegistry.registerAminoProtoMapping(exports.QueryProposalRequest.aminoType, exports.QueryProposalRequest.typeUrl);
function createBaseQueryProposalResponse() {
    return {
        proposal: undefined
    };
}
exports.QueryProposalResponse = {
    typeUrl: "/cosmos.gov.v1.QueryProposalResponse",
    aminoType: "cosmos-sdk/v1/QueryProposalResponse",
    is(o) {
        return o && o.$typeUrl === exports.QueryProposalResponse.typeUrl;
    },
    isSDK(o) {
        return o && o.$typeUrl === exports.QueryProposalResponse.typeUrl;
    },
    isAmino(o) {
        return o && o.$typeUrl === exports.QueryProposalResponse.typeUrl;
    },
    encode(message, writer = binary_1.BinaryWriter.create()) {
        if (message.proposal !== undefined) {
            gov_1.Proposal.encode(message.proposal, writer.uint32(10).fork()).ldelim();
        }
        return writer;
    },
    decode(input, length) {
        const reader = input instanceof binary_1.BinaryReader ? input : new binary_1.BinaryReader(input);
        let end = length === undefined ? reader.len : reader.pos + length;
        const message = createBaseQueryProposalResponse();
        while (reader.pos < end) {
            const tag = reader.uint32();
            switch (tag >>> 3) {
                case 1:
                    message.proposal = gov_1.Proposal.decode(reader, reader.uint32());
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
        message.proposal = object.proposal !== undefined && object.proposal !== null ? gov_1.Proposal.fromPartial(object.proposal) : undefined;
        return message;
    },
    fromAmino(object) {
        const message = createBaseQueryProposalResponse();
        if (object.proposal !== undefined && object.proposal !== null) {
            message.proposal = gov_1.Proposal.fromAmino(object.proposal);
        }
        return message;
    },
    toAmino(message) {
        const obj = {};
        obj.proposal = message.proposal ? gov_1.Proposal.toAmino(message.proposal) : undefined;
        return obj;
    },
    fromAminoMsg(object) {
        return exports.QueryProposalResponse.fromAmino(object.value);
    },
    toAminoMsg(message) {
        return {
            type: "cosmos-sdk/v1/QueryProposalResponse",
            value: exports.QueryProposalResponse.toAmino(message)
        };
    },
    fromProtoMsg(message) {
        return exports.QueryProposalResponse.decode(message.value);
    },
    toProto(message) {
        return exports.QueryProposalResponse.encode(message).finish();
    },
    toProtoMsg(message) {
        return {
            typeUrl: "/cosmos.gov.v1.QueryProposalResponse",
            value: exports.QueryProposalResponse.encode(message).finish()
        };
    }
};
registry_1.GlobalDecoderRegistry.register(exports.QueryProposalResponse.typeUrl, exports.QueryProposalResponse);
registry_1.GlobalDecoderRegistry.registerAminoProtoMapping(exports.QueryProposalResponse.aminoType, exports.QueryProposalResponse.typeUrl);
function createBaseQueryProposalsRequest() {
    return {
        proposalStatus: 0,
        voter: "",
        depositor: "",
        pagination: undefined
    };
}
exports.QueryProposalsRequest = {
    typeUrl: "/cosmos.gov.v1.QueryProposalsRequest",
    aminoType: "cosmos-sdk/v1/QueryProposalsRequest",
    is(o) {
        return o && (o.$typeUrl === exports.QueryProposalsRequest.typeUrl || (0, helpers_1.isSet)(o.proposalStatus) && typeof o.voter === "string" && typeof o.depositor === "string");
    },
    isSDK(o) {
        return o && (o.$typeUrl === exports.QueryProposalsRequest.typeUrl || (0, helpers_1.isSet)(o.proposal_status) && typeof o.voter === "string" && typeof o.depositor === "string");
    },
    isAmino(o) {
        return o && (o.$typeUrl === exports.QueryProposalsRequest.typeUrl || (0, helpers_1.isSet)(o.proposal_status) && typeof o.voter === "string" && typeof o.depositor === "string");
    },
    encode(message, writer = binary_1.BinaryWriter.create()) {
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
            pagination_1.PageRequest.encode(message.pagination, writer.uint32(34).fork()).ldelim();
        }
        return writer;
    },
    decode(input, length) {
        const reader = input instanceof binary_1.BinaryReader ? input : new binary_1.BinaryReader(input);
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
                    message.pagination = pagination_1.PageRequest.decode(reader, reader.uint32());
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
        message.pagination = object.pagination !== undefined && object.pagination !== null ? pagination_1.PageRequest.fromPartial(object.pagination) : undefined;
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
            message.pagination = pagination_1.PageRequest.fromAmino(object.pagination);
        }
        return message;
    },
    toAmino(message) {
        const obj = {};
        obj.proposal_status = message.proposalStatus === 0 ? undefined : message.proposalStatus;
        obj.voter = message.voter === "" ? undefined : message.voter;
        obj.depositor = message.depositor === "" ? undefined : message.depositor;
        obj.pagination = message.pagination ? pagination_1.PageRequest.toAmino(message.pagination) : undefined;
        return obj;
    },
    fromAminoMsg(object) {
        return exports.QueryProposalsRequest.fromAmino(object.value);
    },
    toAminoMsg(message) {
        return {
            type: "cosmos-sdk/v1/QueryProposalsRequest",
            value: exports.QueryProposalsRequest.toAmino(message)
        };
    },
    fromProtoMsg(message) {
        return exports.QueryProposalsRequest.decode(message.value);
    },
    toProto(message) {
        return exports.QueryProposalsRequest.encode(message).finish();
    },
    toProtoMsg(message) {
        return {
            typeUrl: "/cosmos.gov.v1.QueryProposalsRequest",
            value: exports.QueryProposalsRequest.encode(message).finish()
        };
    }
};
registry_1.GlobalDecoderRegistry.register(exports.QueryProposalsRequest.typeUrl, exports.QueryProposalsRequest);
registry_1.GlobalDecoderRegistry.registerAminoProtoMapping(exports.QueryProposalsRequest.aminoType, exports.QueryProposalsRequest.typeUrl);
function createBaseQueryProposalsResponse() {
    return {
        proposals: [],
        pagination: undefined
    };
}
exports.QueryProposalsResponse = {
    typeUrl: "/cosmos.gov.v1.QueryProposalsResponse",
    aminoType: "cosmos-sdk/v1/QueryProposalsResponse",
    is(o) {
        return o && (o.$typeUrl === exports.QueryProposalsResponse.typeUrl || Array.isArray(o.proposals) && (!o.proposals.length || gov_1.Proposal.is(o.proposals[0])));
    },
    isSDK(o) {
        return o && (o.$typeUrl === exports.QueryProposalsResponse.typeUrl || Array.isArray(o.proposals) && (!o.proposals.length || gov_1.Proposal.isSDK(o.proposals[0])));
    },
    isAmino(o) {
        return o && (o.$typeUrl === exports.QueryProposalsResponse.typeUrl || Array.isArray(o.proposals) && (!o.proposals.length || gov_1.Proposal.isAmino(o.proposals[0])));
    },
    encode(message, writer = binary_1.BinaryWriter.create()) {
        for (const v of message.proposals) {
            gov_1.Proposal.encode(v, writer.uint32(10).fork()).ldelim();
        }
        if (message.pagination !== undefined) {
            pagination_1.PageResponse.encode(message.pagination, writer.uint32(18).fork()).ldelim();
        }
        return writer;
    },
    decode(input, length) {
        const reader = input instanceof binary_1.BinaryReader ? input : new binary_1.BinaryReader(input);
        let end = length === undefined ? reader.len : reader.pos + length;
        const message = createBaseQueryProposalsResponse();
        while (reader.pos < end) {
            const tag = reader.uint32();
            switch (tag >>> 3) {
                case 1:
                    message.proposals.push(gov_1.Proposal.decode(reader, reader.uint32()));
                    break;
                case 2:
                    message.pagination = pagination_1.PageResponse.decode(reader, reader.uint32());
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
        message.proposals = object.proposals?.map(e => gov_1.Proposal.fromPartial(e)) || [];
        message.pagination = object.pagination !== undefined && object.pagination !== null ? pagination_1.PageResponse.fromPartial(object.pagination) : undefined;
        return message;
    },
    fromAmino(object) {
        const message = createBaseQueryProposalsResponse();
        message.proposals = object.proposals?.map(e => gov_1.Proposal.fromAmino(e)) || [];
        if (object.pagination !== undefined && object.pagination !== null) {
            message.pagination = pagination_1.PageResponse.fromAmino(object.pagination);
        }
        return message;
    },
    toAmino(message) {
        const obj = {};
        if (message.proposals) {
            obj.proposals = message.proposals.map(e => e ? gov_1.Proposal.toAmino(e) : undefined);
        }
        else {
            obj.proposals = message.proposals;
        }
        obj.pagination = message.pagination ? pagination_1.PageResponse.toAmino(message.pagination) : undefined;
        return obj;
    },
    fromAminoMsg(object) {
        return exports.QueryProposalsResponse.fromAmino(object.value);
    },
    toAminoMsg(message) {
        return {
            type: "cosmos-sdk/v1/QueryProposalsResponse",
            value: exports.QueryProposalsResponse.toAmino(message)
        };
    },
    fromProtoMsg(message) {
        return exports.QueryProposalsResponse.decode(message.value);
    },
    toProto(message) {
        return exports.QueryProposalsResponse.encode(message).finish();
    },
    toProtoMsg(message) {
        return {
            typeUrl: "/cosmos.gov.v1.QueryProposalsResponse",
            value: exports.QueryProposalsResponse.encode(message).finish()
        };
    }
};
registry_1.GlobalDecoderRegistry.register(exports.QueryProposalsResponse.typeUrl, exports.QueryProposalsResponse);
registry_1.GlobalDecoderRegistry.registerAminoProtoMapping(exports.QueryProposalsResponse.aminoType, exports.QueryProposalsResponse.typeUrl);
function createBaseQueryVoteRequest() {
    return {
        proposalId: BigInt(0),
        voter: ""
    };
}
exports.QueryVoteRequest = {
    typeUrl: "/cosmos.gov.v1.QueryVoteRequest",
    aminoType: "cosmos-sdk/v1/QueryVoteRequest",
    is(o) {
        return o && (o.$typeUrl === exports.QueryVoteRequest.typeUrl || typeof o.proposalId === "bigint" && typeof o.voter === "string");
    },
    isSDK(o) {
        return o && (o.$typeUrl === exports.QueryVoteRequest.typeUrl || typeof o.proposal_id === "bigint" && typeof o.voter === "string");
    },
    isAmino(o) {
        return o && (o.$typeUrl === exports.QueryVoteRequest.typeUrl || typeof o.proposal_id === "bigint" && typeof o.voter === "string");
    },
    encode(message, writer = binary_1.BinaryWriter.create()) {
        if (message.proposalId !== BigInt(0)) {
            writer.uint32(8).uint64(message.proposalId);
        }
        if (message.voter !== "") {
            writer.uint32(18).string(message.voter);
        }
        return writer;
    },
    decode(input, length) {
        const reader = input instanceof binary_1.BinaryReader ? input : new binary_1.BinaryReader(input);
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
        return exports.QueryVoteRequest.fromAmino(object.value);
    },
    toAminoMsg(message) {
        return {
            type: "cosmos-sdk/v1/QueryVoteRequest",
            value: exports.QueryVoteRequest.toAmino(message)
        };
    },
    fromProtoMsg(message) {
        return exports.QueryVoteRequest.decode(message.value);
    },
    toProto(message) {
        return exports.QueryVoteRequest.encode(message).finish();
    },
    toProtoMsg(message) {
        return {
            typeUrl: "/cosmos.gov.v1.QueryVoteRequest",
            value: exports.QueryVoteRequest.encode(message).finish()
        };
    }
};
registry_1.GlobalDecoderRegistry.register(exports.QueryVoteRequest.typeUrl, exports.QueryVoteRequest);
registry_1.GlobalDecoderRegistry.registerAminoProtoMapping(exports.QueryVoteRequest.aminoType, exports.QueryVoteRequest.typeUrl);
function createBaseQueryVoteResponse() {
    return {
        vote: undefined
    };
}
exports.QueryVoteResponse = {
    typeUrl: "/cosmos.gov.v1.QueryVoteResponse",
    aminoType: "cosmos-sdk/v1/QueryVoteResponse",
    is(o) {
        return o && o.$typeUrl === exports.QueryVoteResponse.typeUrl;
    },
    isSDK(o) {
        return o && o.$typeUrl === exports.QueryVoteResponse.typeUrl;
    },
    isAmino(o) {
        return o && o.$typeUrl === exports.QueryVoteResponse.typeUrl;
    },
    encode(message, writer = binary_1.BinaryWriter.create()) {
        if (message.vote !== undefined) {
            gov_1.Vote.encode(message.vote, writer.uint32(10).fork()).ldelim();
        }
        return writer;
    },
    decode(input, length) {
        const reader = input instanceof binary_1.BinaryReader ? input : new binary_1.BinaryReader(input);
        let end = length === undefined ? reader.len : reader.pos + length;
        const message = createBaseQueryVoteResponse();
        while (reader.pos < end) {
            const tag = reader.uint32();
            switch (tag >>> 3) {
                case 1:
                    message.vote = gov_1.Vote.decode(reader, reader.uint32());
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
        message.vote = object.vote !== undefined && object.vote !== null ? gov_1.Vote.fromPartial(object.vote) : undefined;
        return message;
    },
    fromAmino(object) {
        const message = createBaseQueryVoteResponse();
        if (object.vote !== undefined && object.vote !== null) {
            message.vote = gov_1.Vote.fromAmino(object.vote);
        }
        return message;
    },
    toAmino(message) {
        const obj = {};
        obj.vote = message.vote ? gov_1.Vote.toAmino(message.vote) : undefined;
        return obj;
    },
    fromAminoMsg(object) {
        return exports.QueryVoteResponse.fromAmino(object.value);
    },
    toAminoMsg(message) {
        return {
            type: "cosmos-sdk/v1/QueryVoteResponse",
            value: exports.QueryVoteResponse.toAmino(message)
        };
    },
    fromProtoMsg(message) {
        return exports.QueryVoteResponse.decode(message.value);
    },
    toProto(message) {
        return exports.QueryVoteResponse.encode(message).finish();
    },
    toProtoMsg(message) {
        return {
            typeUrl: "/cosmos.gov.v1.QueryVoteResponse",
            value: exports.QueryVoteResponse.encode(message).finish()
        };
    }
};
registry_1.GlobalDecoderRegistry.register(exports.QueryVoteResponse.typeUrl, exports.QueryVoteResponse);
registry_1.GlobalDecoderRegistry.registerAminoProtoMapping(exports.QueryVoteResponse.aminoType, exports.QueryVoteResponse.typeUrl);
function createBaseQueryVotesRequest() {
    return {
        proposalId: BigInt(0),
        pagination: undefined
    };
}
exports.QueryVotesRequest = {
    typeUrl: "/cosmos.gov.v1.QueryVotesRequest",
    aminoType: "cosmos-sdk/v1/QueryVotesRequest",
    is(o) {
        return o && (o.$typeUrl === exports.QueryVotesRequest.typeUrl || typeof o.proposalId === "bigint");
    },
    isSDK(o) {
        return o && (o.$typeUrl === exports.QueryVotesRequest.typeUrl || typeof o.proposal_id === "bigint");
    },
    isAmino(o) {
        return o && (o.$typeUrl === exports.QueryVotesRequest.typeUrl || typeof o.proposal_id === "bigint");
    },
    encode(message, writer = binary_1.BinaryWriter.create()) {
        if (message.proposalId !== BigInt(0)) {
            writer.uint32(8).uint64(message.proposalId);
        }
        if (message.pagination !== undefined) {
            pagination_1.PageRequest.encode(message.pagination, writer.uint32(18).fork()).ldelim();
        }
        return writer;
    },
    decode(input, length) {
        const reader = input instanceof binary_1.BinaryReader ? input : new binary_1.BinaryReader(input);
        let end = length === undefined ? reader.len : reader.pos + length;
        const message = createBaseQueryVotesRequest();
        while (reader.pos < end) {
            const tag = reader.uint32();
            switch (tag >>> 3) {
                case 1:
                    message.proposalId = reader.uint64();
                    break;
                case 2:
                    message.pagination = pagination_1.PageRequest.decode(reader, reader.uint32());
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
        message.pagination = object.pagination !== undefined && object.pagination !== null ? pagination_1.PageRequest.fromPartial(object.pagination) : undefined;
        return message;
    },
    fromAmino(object) {
        const message = createBaseQueryVotesRequest();
        if (object.proposal_id !== undefined && object.proposal_id !== null) {
            message.proposalId = BigInt(object.proposal_id);
        }
        if (object.pagination !== undefined && object.pagination !== null) {
            message.pagination = pagination_1.PageRequest.fromAmino(object.pagination);
        }
        return message;
    },
    toAmino(message) {
        const obj = {};
        obj.proposal_id = message.proposalId !== BigInt(0) ? message.proposalId?.toString() : undefined;
        obj.pagination = message.pagination ? pagination_1.PageRequest.toAmino(message.pagination) : undefined;
        return obj;
    },
    fromAminoMsg(object) {
        return exports.QueryVotesRequest.fromAmino(object.value);
    },
    toAminoMsg(message) {
        return {
            type: "cosmos-sdk/v1/QueryVotesRequest",
            value: exports.QueryVotesRequest.toAmino(message)
        };
    },
    fromProtoMsg(message) {
        return exports.QueryVotesRequest.decode(message.value);
    },
    toProto(message) {
        return exports.QueryVotesRequest.encode(message).finish();
    },
    toProtoMsg(message) {
        return {
            typeUrl: "/cosmos.gov.v1.QueryVotesRequest",
            value: exports.QueryVotesRequest.encode(message).finish()
        };
    }
};
registry_1.GlobalDecoderRegistry.register(exports.QueryVotesRequest.typeUrl, exports.QueryVotesRequest);
registry_1.GlobalDecoderRegistry.registerAminoProtoMapping(exports.QueryVotesRequest.aminoType, exports.QueryVotesRequest.typeUrl);
function createBaseQueryVotesResponse() {
    return {
        votes: [],
        pagination: undefined
    };
}
exports.QueryVotesResponse = {
    typeUrl: "/cosmos.gov.v1.QueryVotesResponse",
    aminoType: "cosmos-sdk/v1/QueryVotesResponse",
    is(o) {
        return o && (o.$typeUrl === exports.QueryVotesResponse.typeUrl || Array.isArray(o.votes) && (!o.votes.length || gov_1.Vote.is(o.votes[0])));
    },
    isSDK(o) {
        return o && (o.$typeUrl === exports.QueryVotesResponse.typeUrl || Array.isArray(o.votes) && (!o.votes.length || gov_1.Vote.isSDK(o.votes[0])));
    },
    isAmino(o) {
        return o && (o.$typeUrl === exports.QueryVotesResponse.typeUrl || Array.isArray(o.votes) && (!o.votes.length || gov_1.Vote.isAmino(o.votes[0])));
    },
    encode(message, writer = binary_1.BinaryWriter.create()) {
        for (const v of message.votes) {
            gov_1.Vote.encode(v, writer.uint32(10).fork()).ldelim();
        }
        if (message.pagination !== undefined) {
            pagination_1.PageResponse.encode(message.pagination, writer.uint32(18).fork()).ldelim();
        }
        return writer;
    },
    decode(input, length) {
        const reader = input instanceof binary_1.BinaryReader ? input : new binary_1.BinaryReader(input);
        let end = length === undefined ? reader.len : reader.pos + length;
        const message = createBaseQueryVotesResponse();
        while (reader.pos < end) {
            const tag = reader.uint32();
            switch (tag >>> 3) {
                case 1:
                    message.votes.push(gov_1.Vote.decode(reader, reader.uint32()));
                    break;
                case 2:
                    message.pagination = pagination_1.PageResponse.decode(reader, reader.uint32());
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
        message.votes = object.votes?.map(e => gov_1.Vote.fromPartial(e)) || [];
        message.pagination = object.pagination !== undefined && object.pagination !== null ? pagination_1.PageResponse.fromPartial(object.pagination) : undefined;
        return message;
    },
    fromAmino(object) {
        const message = createBaseQueryVotesResponse();
        message.votes = object.votes?.map(e => gov_1.Vote.fromAmino(e)) || [];
        if (object.pagination !== undefined && object.pagination !== null) {
            message.pagination = pagination_1.PageResponse.fromAmino(object.pagination);
        }
        return message;
    },
    toAmino(message) {
        const obj = {};
        if (message.votes) {
            obj.votes = message.votes.map(e => e ? gov_1.Vote.toAmino(e) : undefined);
        }
        else {
            obj.votes = message.votes;
        }
        obj.pagination = message.pagination ? pagination_1.PageResponse.toAmino(message.pagination) : undefined;
        return obj;
    },
    fromAminoMsg(object) {
        return exports.QueryVotesResponse.fromAmino(object.value);
    },
    toAminoMsg(message) {
        return {
            type: "cosmos-sdk/v1/QueryVotesResponse",
            value: exports.QueryVotesResponse.toAmino(message)
        };
    },
    fromProtoMsg(message) {
        return exports.QueryVotesResponse.decode(message.value);
    },
    toProto(message) {
        return exports.QueryVotesResponse.encode(message).finish();
    },
    toProtoMsg(message) {
        return {
            typeUrl: "/cosmos.gov.v1.QueryVotesResponse",
            value: exports.QueryVotesResponse.encode(message).finish()
        };
    }
};
registry_1.GlobalDecoderRegistry.register(exports.QueryVotesResponse.typeUrl, exports.QueryVotesResponse);
registry_1.GlobalDecoderRegistry.registerAminoProtoMapping(exports.QueryVotesResponse.aminoType, exports.QueryVotesResponse.typeUrl);
function createBaseQueryParamsRequest() {
    return {
        paramsType: ""
    };
}
exports.QueryParamsRequest = {
    typeUrl: "/cosmos.gov.v1.QueryParamsRequest",
    aminoType: "cosmos-sdk/v1/QueryParamsRequest",
    is(o) {
        return o && (o.$typeUrl === exports.QueryParamsRequest.typeUrl || typeof o.paramsType === "string");
    },
    isSDK(o) {
        return o && (o.$typeUrl === exports.QueryParamsRequest.typeUrl || typeof o.params_type === "string");
    },
    isAmino(o) {
        return o && (o.$typeUrl === exports.QueryParamsRequest.typeUrl || typeof o.params_type === "string");
    },
    encode(message, writer = binary_1.BinaryWriter.create()) {
        if (message.paramsType !== "") {
            writer.uint32(10).string(message.paramsType);
        }
        return writer;
    },
    decode(input, length) {
        const reader = input instanceof binary_1.BinaryReader ? input : new binary_1.BinaryReader(input);
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
        return exports.QueryParamsRequest.fromAmino(object.value);
    },
    toAminoMsg(message) {
        return {
            type: "cosmos-sdk/v1/QueryParamsRequest",
            value: exports.QueryParamsRequest.toAmino(message)
        };
    },
    fromProtoMsg(message) {
        return exports.QueryParamsRequest.decode(message.value);
    },
    toProto(message) {
        return exports.QueryParamsRequest.encode(message).finish();
    },
    toProtoMsg(message) {
        return {
            typeUrl: "/cosmos.gov.v1.QueryParamsRequest",
            value: exports.QueryParamsRequest.encode(message).finish()
        };
    }
};
registry_1.GlobalDecoderRegistry.register(exports.QueryParamsRequest.typeUrl, exports.QueryParamsRequest);
registry_1.GlobalDecoderRegistry.registerAminoProtoMapping(exports.QueryParamsRequest.aminoType, exports.QueryParamsRequest.typeUrl);
function createBaseQueryParamsResponse() {
    return {
        votingParams: undefined,
        depositParams: undefined,
        tallyParams: undefined,
        params: undefined
    };
}
exports.QueryParamsResponse = {
    typeUrl: "/cosmos.gov.v1.QueryParamsResponse",
    aminoType: "cosmos-sdk/v1/QueryParamsResponse",
    is(o) {
        return o && o.$typeUrl === exports.QueryParamsResponse.typeUrl;
    },
    isSDK(o) {
        return o && o.$typeUrl === exports.QueryParamsResponse.typeUrl;
    },
    isAmino(o) {
        return o && o.$typeUrl === exports.QueryParamsResponse.typeUrl;
    },
    encode(message, writer = binary_1.BinaryWriter.create()) {
        if (message.votingParams !== undefined) {
            gov_1.VotingParams.encode(message.votingParams, writer.uint32(10).fork()).ldelim();
        }
        if (message.depositParams !== undefined) {
            gov_1.DepositParams.encode(message.depositParams, writer.uint32(18).fork()).ldelim();
        }
        if (message.tallyParams !== undefined) {
            gov_1.TallyParams.encode(message.tallyParams, writer.uint32(26).fork()).ldelim();
        }
        if (message.params !== undefined) {
            gov_1.Params.encode(message.params, writer.uint32(34).fork()).ldelim();
        }
        return writer;
    },
    decode(input, length) {
        const reader = input instanceof binary_1.BinaryReader ? input : new binary_1.BinaryReader(input);
        let end = length === undefined ? reader.len : reader.pos + length;
        const message = createBaseQueryParamsResponse();
        while (reader.pos < end) {
            const tag = reader.uint32();
            switch (tag >>> 3) {
                case 1:
                    message.votingParams = gov_1.VotingParams.decode(reader, reader.uint32());
                    break;
                case 2:
                    message.depositParams = gov_1.DepositParams.decode(reader, reader.uint32());
                    break;
                case 3:
                    message.tallyParams = gov_1.TallyParams.decode(reader, reader.uint32());
                    break;
                case 4:
                    message.params = gov_1.Params.decode(reader, reader.uint32());
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
        message.votingParams = object.votingParams !== undefined && object.votingParams !== null ? gov_1.VotingParams.fromPartial(object.votingParams) : undefined;
        message.depositParams = object.depositParams !== undefined && object.depositParams !== null ? gov_1.DepositParams.fromPartial(object.depositParams) : undefined;
        message.tallyParams = object.tallyParams !== undefined && object.tallyParams !== null ? gov_1.TallyParams.fromPartial(object.tallyParams) : undefined;
        message.params = object.params !== undefined && object.params !== null ? gov_1.Params.fromPartial(object.params) : undefined;
        return message;
    },
    fromAmino(object) {
        const message = createBaseQueryParamsResponse();
        if (object.voting_params !== undefined && object.voting_params !== null) {
            message.votingParams = gov_1.VotingParams.fromAmino(object.voting_params);
        }
        if (object.deposit_params !== undefined && object.deposit_params !== null) {
            message.depositParams = gov_1.DepositParams.fromAmino(object.deposit_params);
        }
        if (object.tally_params !== undefined && object.tally_params !== null) {
            message.tallyParams = gov_1.TallyParams.fromAmino(object.tally_params);
        }
        if (object.params !== undefined && object.params !== null) {
            message.params = gov_1.Params.fromAmino(object.params);
        }
        return message;
    },
    toAmino(message) {
        const obj = {};
        obj.voting_params = message.votingParams ? gov_1.VotingParams.toAmino(message.votingParams) : undefined;
        obj.deposit_params = message.depositParams ? gov_1.DepositParams.toAmino(message.depositParams) : undefined;
        obj.tally_params = message.tallyParams ? gov_1.TallyParams.toAmino(message.tallyParams) : undefined;
        obj.params = message.params ? gov_1.Params.toAmino(message.params) : undefined;
        return obj;
    },
    fromAminoMsg(object) {
        return exports.QueryParamsResponse.fromAmino(object.value);
    },
    toAminoMsg(message) {
        return {
            type: "cosmos-sdk/v1/QueryParamsResponse",
            value: exports.QueryParamsResponse.toAmino(message)
        };
    },
    fromProtoMsg(message) {
        return exports.QueryParamsResponse.decode(message.value);
    },
    toProto(message) {
        return exports.QueryParamsResponse.encode(message).finish();
    },
    toProtoMsg(message) {
        return {
            typeUrl: "/cosmos.gov.v1.QueryParamsResponse",
            value: exports.QueryParamsResponse.encode(message).finish()
        };
    }
};
registry_1.GlobalDecoderRegistry.register(exports.QueryParamsResponse.typeUrl, exports.QueryParamsResponse);
registry_1.GlobalDecoderRegistry.registerAminoProtoMapping(exports.QueryParamsResponse.aminoType, exports.QueryParamsResponse.typeUrl);
function createBaseQueryDepositRequest() {
    return {
        proposalId: BigInt(0),
        depositor: ""
    };
}
exports.QueryDepositRequest = {
    typeUrl: "/cosmos.gov.v1.QueryDepositRequest",
    aminoType: "cosmos-sdk/v1/QueryDepositRequest",
    is(o) {
        return o && (o.$typeUrl === exports.QueryDepositRequest.typeUrl || typeof o.proposalId === "bigint" && typeof o.depositor === "string");
    },
    isSDK(o) {
        return o && (o.$typeUrl === exports.QueryDepositRequest.typeUrl || typeof o.proposal_id === "bigint" && typeof o.depositor === "string");
    },
    isAmino(o) {
        return o && (o.$typeUrl === exports.QueryDepositRequest.typeUrl || typeof o.proposal_id === "bigint" && typeof o.depositor === "string");
    },
    encode(message, writer = binary_1.BinaryWriter.create()) {
        if (message.proposalId !== BigInt(0)) {
            writer.uint32(8).uint64(message.proposalId);
        }
        if (message.depositor !== "") {
            writer.uint32(18).string(message.depositor);
        }
        return writer;
    },
    decode(input, length) {
        const reader = input instanceof binary_1.BinaryReader ? input : new binary_1.BinaryReader(input);
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
        return exports.QueryDepositRequest.fromAmino(object.value);
    },
    toAminoMsg(message) {
        return {
            type: "cosmos-sdk/v1/QueryDepositRequest",
            value: exports.QueryDepositRequest.toAmino(message)
        };
    },
    fromProtoMsg(message) {
        return exports.QueryDepositRequest.decode(message.value);
    },
    toProto(message) {
        return exports.QueryDepositRequest.encode(message).finish();
    },
    toProtoMsg(message) {
        return {
            typeUrl: "/cosmos.gov.v1.QueryDepositRequest",
            value: exports.QueryDepositRequest.encode(message).finish()
        };
    }
};
registry_1.GlobalDecoderRegistry.register(exports.QueryDepositRequest.typeUrl, exports.QueryDepositRequest);
registry_1.GlobalDecoderRegistry.registerAminoProtoMapping(exports.QueryDepositRequest.aminoType, exports.QueryDepositRequest.typeUrl);
function createBaseQueryDepositResponse() {
    return {
        deposit: undefined
    };
}
exports.QueryDepositResponse = {
    typeUrl: "/cosmos.gov.v1.QueryDepositResponse",
    aminoType: "cosmos-sdk/v1/QueryDepositResponse",
    is(o) {
        return o && o.$typeUrl === exports.QueryDepositResponse.typeUrl;
    },
    isSDK(o) {
        return o && o.$typeUrl === exports.QueryDepositResponse.typeUrl;
    },
    isAmino(o) {
        return o && o.$typeUrl === exports.QueryDepositResponse.typeUrl;
    },
    encode(message, writer = binary_1.BinaryWriter.create()) {
        if (message.deposit !== undefined) {
            gov_1.Deposit.encode(message.deposit, writer.uint32(10).fork()).ldelim();
        }
        return writer;
    },
    decode(input, length) {
        const reader = input instanceof binary_1.BinaryReader ? input : new binary_1.BinaryReader(input);
        let end = length === undefined ? reader.len : reader.pos + length;
        const message = createBaseQueryDepositResponse();
        while (reader.pos < end) {
            const tag = reader.uint32();
            switch (tag >>> 3) {
                case 1:
                    message.deposit = gov_1.Deposit.decode(reader, reader.uint32());
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
        message.deposit = object.deposit !== undefined && object.deposit !== null ? gov_1.Deposit.fromPartial(object.deposit) : undefined;
        return message;
    },
    fromAmino(object) {
        const message = createBaseQueryDepositResponse();
        if (object.deposit !== undefined && object.deposit !== null) {
            message.deposit = gov_1.Deposit.fromAmino(object.deposit);
        }
        return message;
    },
    toAmino(message) {
        const obj = {};
        obj.deposit = message.deposit ? gov_1.Deposit.toAmino(message.deposit) : undefined;
        return obj;
    },
    fromAminoMsg(object) {
        return exports.QueryDepositResponse.fromAmino(object.value);
    },
    toAminoMsg(message) {
        return {
            type: "cosmos-sdk/v1/QueryDepositResponse",
            value: exports.QueryDepositResponse.toAmino(message)
        };
    },
    fromProtoMsg(message) {
        return exports.QueryDepositResponse.decode(message.value);
    },
    toProto(message) {
        return exports.QueryDepositResponse.encode(message).finish();
    },
    toProtoMsg(message) {
        return {
            typeUrl: "/cosmos.gov.v1.QueryDepositResponse",
            value: exports.QueryDepositResponse.encode(message).finish()
        };
    }
};
registry_1.GlobalDecoderRegistry.register(exports.QueryDepositResponse.typeUrl, exports.QueryDepositResponse);
registry_1.GlobalDecoderRegistry.registerAminoProtoMapping(exports.QueryDepositResponse.aminoType, exports.QueryDepositResponse.typeUrl);
function createBaseQueryDepositsRequest() {
    return {
        proposalId: BigInt(0),
        pagination: undefined
    };
}
exports.QueryDepositsRequest = {
    typeUrl: "/cosmos.gov.v1.QueryDepositsRequest",
    aminoType: "cosmos-sdk/v1/QueryDepositsRequest",
    is(o) {
        return o && (o.$typeUrl === exports.QueryDepositsRequest.typeUrl || typeof o.proposalId === "bigint");
    },
    isSDK(o) {
        return o && (o.$typeUrl === exports.QueryDepositsRequest.typeUrl || typeof o.proposal_id === "bigint");
    },
    isAmino(o) {
        return o && (o.$typeUrl === exports.QueryDepositsRequest.typeUrl || typeof o.proposal_id === "bigint");
    },
    encode(message, writer = binary_1.BinaryWriter.create()) {
        if (message.proposalId !== BigInt(0)) {
            writer.uint32(8).uint64(message.proposalId);
        }
        if (message.pagination !== undefined) {
            pagination_1.PageRequest.encode(message.pagination, writer.uint32(18).fork()).ldelim();
        }
        return writer;
    },
    decode(input, length) {
        const reader = input instanceof binary_1.BinaryReader ? input : new binary_1.BinaryReader(input);
        let end = length === undefined ? reader.len : reader.pos + length;
        const message = createBaseQueryDepositsRequest();
        while (reader.pos < end) {
            const tag = reader.uint32();
            switch (tag >>> 3) {
                case 1:
                    message.proposalId = reader.uint64();
                    break;
                case 2:
                    message.pagination = pagination_1.PageRequest.decode(reader, reader.uint32());
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
        message.pagination = object.pagination !== undefined && object.pagination !== null ? pagination_1.PageRequest.fromPartial(object.pagination) : undefined;
        return message;
    },
    fromAmino(object) {
        const message = createBaseQueryDepositsRequest();
        if (object.proposal_id !== undefined && object.proposal_id !== null) {
            message.proposalId = BigInt(object.proposal_id);
        }
        if (object.pagination !== undefined && object.pagination !== null) {
            message.pagination = pagination_1.PageRequest.fromAmino(object.pagination);
        }
        return message;
    },
    toAmino(message) {
        const obj = {};
        obj.proposal_id = message.proposalId !== BigInt(0) ? message.proposalId?.toString() : undefined;
        obj.pagination = message.pagination ? pagination_1.PageRequest.toAmino(message.pagination) : undefined;
        return obj;
    },
    fromAminoMsg(object) {
        return exports.QueryDepositsRequest.fromAmino(object.value);
    },
    toAminoMsg(message) {
        return {
            type: "cosmos-sdk/v1/QueryDepositsRequest",
            value: exports.QueryDepositsRequest.toAmino(message)
        };
    },
    fromProtoMsg(message) {
        return exports.QueryDepositsRequest.decode(message.value);
    },
    toProto(message) {
        return exports.QueryDepositsRequest.encode(message).finish();
    },
    toProtoMsg(message) {
        return {
            typeUrl: "/cosmos.gov.v1.QueryDepositsRequest",
            value: exports.QueryDepositsRequest.encode(message).finish()
        };
    }
};
registry_1.GlobalDecoderRegistry.register(exports.QueryDepositsRequest.typeUrl, exports.QueryDepositsRequest);
registry_1.GlobalDecoderRegistry.registerAminoProtoMapping(exports.QueryDepositsRequest.aminoType, exports.QueryDepositsRequest.typeUrl);
function createBaseQueryDepositsResponse() {
    return {
        deposits: [],
        pagination: undefined
    };
}
exports.QueryDepositsResponse = {
    typeUrl: "/cosmos.gov.v1.QueryDepositsResponse",
    aminoType: "cosmos-sdk/v1/QueryDepositsResponse",
    is(o) {
        return o && (o.$typeUrl === exports.QueryDepositsResponse.typeUrl || Array.isArray(o.deposits) && (!o.deposits.length || gov_1.Deposit.is(o.deposits[0])));
    },
    isSDK(o) {
        return o && (o.$typeUrl === exports.QueryDepositsResponse.typeUrl || Array.isArray(o.deposits) && (!o.deposits.length || gov_1.Deposit.isSDK(o.deposits[0])));
    },
    isAmino(o) {
        return o && (o.$typeUrl === exports.QueryDepositsResponse.typeUrl || Array.isArray(o.deposits) && (!o.deposits.length || gov_1.Deposit.isAmino(o.deposits[0])));
    },
    encode(message, writer = binary_1.BinaryWriter.create()) {
        for (const v of message.deposits) {
            gov_1.Deposit.encode(v, writer.uint32(10).fork()).ldelim();
        }
        if (message.pagination !== undefined) {
            pagination_1.PageResponse.encode(message.pagination, writer.uint32(18).fork()).ldelim();
        }
        return writer;
    },
    decode(input, length) {
        const reader = input instanceof binary_1.BinaryReader ? input : new binary_1.BinaryReader(input);
        let end = length === undefined ? reader.len : reader.pos + length;
        const message = createBaseQueryDepositsResponse();
        while (reader.pos < end) {
            const tag = reader.uint32();
            switch (tag >>> 3) {
                case 1:
                    message.deposits.push(gov_1.Deposit.decode(reader, reader.uint32()));
                    break;
                case 2:
                    message.pagination = pagination_1.PageResponse.decode(reader, reader.uint32());
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
        message.deposits = object.deposits?.map(e => gov_1.Deposit.fromPartial(e)) || [];
        message.pagination = object.pagination !== undefined && object.pagination !== null ? pagination_1.PageResponse.fromPartial(object.pagination) : undefined;
        return message;
    },
    fromAmino(object) {
        const message = createBaseQueryDepositsResponse();
        message.deposits = object.deposits?.map(e => gov_1.Deposit.fromAmino(e)) || [];
        if (object.pagination !== undefined && object.pagination !== null) {
            message.pagination = pagination_1.PageResponse.fromAmino(object.pagination);
        }
        return message;
    },
    toAmino(message) {
        const obj = {};
        if (message.deposits) {
            obj.deposits = message.deposits.map(e => e ? gov_1.Deposit.toAmino(e) : undefined);
        }
        else {
            obj.deposits = message.deposits;
        }
        obj.pagination = message.pagination ? pagination_1.PageResponse.toAmino(message.pagination) : undefined;
        return obj;
    },
    fromAminoMsg(object) {
        return exports.QueryDepositsResponse.fromAmino(object.value);
    },
    toAminoMsg(message) {
        return {
            type: "cosmos-sdk/v1/QueryDepositsResponse",
            value: exports.QueryDepositsResponse.toAmino(message)
        };
    },
    fromProtoMsg(message) {
        return exports.QueryDepositsResponse.decode(message.value);
    },
    toProto(message) {
        return exports.QueryDepositsResponse.encode(message).finish();
    },
    toProtoMsg(message) {
        return {
            typeUrl: "/cosmos.gov.v1.QueryDepositsResponse",
            value: exports.QueryDepositsResponse.encode(message).finish()
        };
    }
};
registry_1.GlobalDecoderRegistry.register(exports.QueryDepositsResponse.typeUrl, exports.QueryDepositsResponse);
registry_1.GlobalDecoderRegistry.registerAminoProtoMapping(exports.QueryDepositsResponse.aminoType, exports.QueryDepositsResponse.typeUrl);
function createBaseQueryTallyResultRequest() {
    return {
        proposalId: BigInt(0)
    };
}
exports.QueryTallyResultRequest = {
    typeUrl: "/cosmos.gov.v1.QueryTallyResultRequest",
    aminoType: "cosmos-sdk/v1/QueryTallyResultRequest",
    is(o) {
        return o && (o.$typeUrl === exports.QueryTallyResultRequest.typeUrl || typeof o.proposalId === "bigint");
    },
    isSDK(o) {
        return o && (o.$typeUrl === exports.QueryTallyResultRequest.typeUrl || typeof o.proposal_id === "bigint");
    },
    isAmino(o) {
        return o && (o.$typeUrl === exports.QueryTallyResultRequest.typeUrl || typeof o.proposal_id === "bigint");
    },
    encode(message, writer = binary_1.BinaryWriter.create()) {
        if (message.proposalId !== BigInt(0)) {
            writer.uint32(8).uint64(message.proposalId);
        }
        return writer;
    },
    decode(input, length) {
        const reader = input instanceof binary_1.BinaryReader ? input : new binary_1.BinaryReader(input);
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
        return exports.QueryTallyResultRequest.fromAmino(object.value);
    },
    toAminoMsg(message) {
        return {
            type: "cosmos-sdk/v1/QueryTallyResultRequest",
            value: exports.QueryTallyResultRequest.toAmino(message)
        };
    },
    fromProtoMsg(message) {
        return exports.QueryTallyResultRequest.decode(message.value);
    },
    toProto(message) {
        return exports.QueryTallyResultRequest.encode(message).finish();
    },
    toProtoMsg(message) {
        return {
            typeUrl: "/cosmos.gov.v1.QueryTallyResultRequest",
            value: exports.QueryTallyResultRequest.encode(message).finish()
        };
    }
};
registry_1.GlobalDecoderRegistry.register(exports.QueryTallyResultRequest.typeUrl, exports.QueryTallyResultRequest);
registry_1.GlobalDecoderRegistry.registerAminoProtoMapping(exports.QueryTallyResultRequest.aminoType, exports.QueryTallyResultRequest.typeUrl);
function createBaseQueryTallyResultResponse() {
    return {
        tally: undefined
    };
}
exports.QueryTallyResultResponse = {
    typeUrl: "/cosmos.gov.v1.QueryTallyResultResponse",
    aminoType: "cosmos-sdk/v1/QueryTallyResultResponse",
    is(o) {
        return o && o.$typeUrl === exports.QueryTallyResultResponse.typeUrl;
    },
    isSDK(o) {
        return o && o.$typeUrl === exports.QueryTallyResultResponse.typeUrl;
    },
    isAmino(o) {
        return o && o.$typeUrl === exports.QueryTallyResultResponse.typeUrl;
    },
    encode(message, writer = binary_1.BinaryWriter.create()) {
        if (message.tally !== undefined) {
            gov_1.TallyResult.encode(message.tally, writer.uint32(10).fork()).ldelim();
        }
        return writer;
    },
    decode(input, length) {
        const reader = input instanceof binary_1.BinaryReader ? input : new binary_1.BinaryReader(input);
        let end = length === undefined ? reader.len : reader.pos + length;
        const message = createBaseQueryTallyResultResponse();
        while (reader.pos < end) {
            const tag = reader.uint32();
            switch (tag >>> 3) {
                case 1:
                    message.tally = gov_1.TallyResult.decode(reader, reader.uint32());
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
        message.tally = object.tally !== undefined && object.tally !== null ? gov_1.TallyResult.fromPartial(object.tally) : undefined;
        return message;
    },
    fromAmino(object) {
        const message = createBaseQueryTallyResultResponse();
        if (object.tally !== undefined && object.tally !== null) {
            message.tally = gov_1.TallyResult.fromAmino(object.tally);
        }
        return message;
    },
    toAmino(message) {
        const obj = {};
        obj.tally = message.tally ? gov_1.TallyResult.toAmino(message.tally) : undefined;
        return obj;
    },
    fromAminoMsg(object) {
        return exports.QueryTallyResultResponse.fromAmino(object.value);
    },
    toAminoMsg(message) {
        return {
            type: "cosmos-sdk/v1/QueryTallyResultResponse",
            value: exports.QueryTallyResultResponse.toAmino(message)
        };
    },
    fromProtoMsg(message) {
        return exports.QueryTallyResultResponse.decode(message.value);
    },
    toProto(message) {
        return exports.QueryTallyResultResponse.encode(message).finish();
    },
    toProtoMsg(message) {
        return {
            typeUrl: "/cosmos.gov.v1.QueryTallyResultResponse",
            value: exports.QueryTallyResultResponse.encode(message).finish()
        };
    }
};
registry_1.GlobalDecoderRegistry.register(exports.QueryTallyResultResponse.typeUrl, exports.QueryTallyResultResponse);
registry_1.GlobalDecoderRegistry.registerAminoProtoMapping(exports.QueryTallyResultResponse.aminoType, exports.QueryTallyResultResponse.typeUrl);
