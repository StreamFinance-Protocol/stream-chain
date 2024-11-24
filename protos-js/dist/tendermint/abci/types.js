"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.ResponseProcessProposal = exports.ResponsePrepareProposal = exports.ResponseApplySnapshotChunk = exports.ResponseLoadSnapshotChunk = exports.ResponseOfferSnapshot = exports.ResponseListSnapshots = exports.ResponseCommit = exports.ResponseCheckTx = exports.ResponseQuery = exports.ResponseInitChain = exports.ResponseInfo = exports.ResponseFlush = exports.ResponseEcho = exports.ResponseException = exports.Response = exports.RequestFinalizeBlock = exports.RequestVerifyVoteExtension = exports.RequestExtendVote = exports.RequestProcessProposal = exports.RequestPrepareProposal = exports.RequestApplySnapshotChunk = exports.RequestLoadSnapshotChunk = exports.RequestOfferSnapshot = exports.RequestListSnapshots = exports.RequestCommit = exports.RequestCheckTx = exports.RequestQuery = exports.RequestInitChain = exports.RequestInfo = exports.RequestFlush = exports.RequestEcho = exports.Request = exports.MisbehaviorTypeAmino = exports.MisbehaviorTypeSDKType = exports.MisbehaviorType = exports.ResponseVerifyVoteExtension_VerifyStatusAmino = exports.ResponseVerifyVoteExtension_VerifyStatusSDKType = exports.ResponseVerifyVoteExtension_VerifyStatus = exports.ResponseProcessProposal_ProposalStatusAmino = exports.ResponseProcessProposal_ProposalStatusSDKType = exports.ResponseProcessProposal_ProposalStatus = exports.ResponseApplySnapshotChunk_ResultAmino = exports.ResponseApplySnapshotChunk_ResultSDKType = exports.ResponseApplySnapshotChunk_Result = exports.ResponseOfferSnapshot_ResultAmino = exports.ResponseOfferSnapshot_ResultSDKType = exports.ResponseOfferSnapshot_Result = exports.CheckTxTypeAmino = exports.CheckTxTypeSDKType = exports.CheckTxType = void 0;
exports.Snapshot = exports.Misbehavior = exports.ExtendedVoteInfo = exports.VoteInfo = exports.ValidatorUpdate = exports.Validator = exports.TxResult = exports.ExecTxResult = exports.EventAttribute = exports.Event = exports.ExtendedCommitInfo = exports.CommitInfo = exports.ResponseFinalizeBlock = exports.ResponseVerifyVoteExtension = exports.ResponseExtendVote = void 0;
exports.checkTxTypeFromJSON = checkTxTypeFromJSON;
exports.checkTxTypeToJSON = checkTxTypeToJSON;
exports.responseOfferSnapshot_ResultFromJSON = responseOfferSnapshot_ResultFromJSON;
exports.responseOfferSnapshot_ResultToJSON = responseOfferSnapshot_ResultToJSON;
exports.responseApplySnapshotChunk_ResultFromJSON = responseApplySnapshotChunk_ResultFromJSON;
exports.responseApplySnapshotChunk_ResultToJSON = responseApplySnapshotChunk_ResultToJSON;
exports.responseProcessProposal_ProposalStatusFromJSON = responseProcessProposal_ProposalStatusFromJSON;
exports.responseProcessProposal_ProposalStatusToJSON = responseProcessProposal_ProposalStatusToJSON;
exports.responseVerifyVoteExtension_VerifyStatusFromJSON = responseVerifyVoteExtension_VerifyStatusFromJSON;
exports.responseVerifyVoteExtension_VerifyStatusToJSON = responseVerifyVoteExtension_VerifyStatusToJSON;
exports.misbehaviorTypeFromJSON = misbehaviorTypeFromJSON;
exports.misbehaviorTypeToJSON = misbehaviorTypeToJSON;
//@ts-nocheck
const timestamp_1 = require("../../google/protobuf/timestamp");
const params_1 = require("../types/params");
const proof_1 = require("../crypto/proof");
const keys_1 = require("../crypto/keys");
const binary_1 = require("../../binary");
const registry_1 = require("../../registry");
const helpers_1 = require("../../helpers");
var CheckTxType;
(function (CheckTxType) {
    CheckTxType[CheckTxType["NEW"] = 0] = "NEW";
    CheckTxType[CheckTxType["RECHECK"] = 1] = "RECHECK";
    CheckTxType[CheckTxType["UNRECOGNIZED"] = -1] = "UNRECOGNIZED";
})(CheckTxType || (exports.CheckTxType = CheckTxType = {}));
exports.CheckTxTypeSDKType = CheckTxType;
exports.CheckTxTypeAmino = CheckTxType;
function checkTxTypeFromJSON(object) {
    switch (object) {
        case 0:
        case "NEW":
            return CheckTxType.NEW;
        case 1:
        case "RECHECK":
            return CheckTxType.RECHECK;
        case -1:
        case "UNRECOGNIZED":
        default:
            return CheckTxType.UNRECOGNIZED;
    }
}
function checkTxTypeToJSON(object) {
    switch (object) {
        case CheckTxType.NEW:
            return "NEW";
        case CheckTxType.RECHECK:
            return "RECHECK";
        case CheckTxType.UNRECOGNIZED:
        default:
            return "UNRECOGNIZED";
    }
}
var ResponseOfferSnapshot_Result;
(function (ResponseOfferSnapshot_Result) {
    /** UNKNOWN - Unknown result, abort all snapshot restoration */
    ResponseOfferSnapshot_Result[ResponseOfferSnapshot_Result["UNKNOWN"] = 0] = "UNKNOWN";
    /** ACCEPT - Snapshot accepted, apply chunks */
    ResponseOfferSnapshot_Result[ResponseOfferSnapshot_Result["ACCEPT"] = 1] = "ACCEPT";
    /** ABORT - Abort all snapshot restoration */
    ResponseOfferSnapshot_Result[ResponseOfferSnapshot_Result["ABORT"] = 2] = "ABORT";
    /** REJECT - Reject this specific snapshot, try others */
    ResponseOfferSnapshot_Result[ResponseOfferSnapshot_Result["REJECT"] = 3] = "REJECT";
    /** REJECT_FORMAT - Reject all snapshots of this format, try others */
    ResponseOfferSnapshot_Result[ResponseOfferSnapshot_Result["REJECT_FORMAT"] = 4] = "REJECT_FORMAT";
    /** REJECT_SENDER - Reject all snapshots from the sender(s), try others */
    ResponseOfferSnapshot_Result[ResponseOfferSnapshot_Result["REJECT_SENDER"] = 5] = "REJECT_SENDER";
    ResponseOfferSnapshot_Result[ResponseOfferSnapshot_Result["UNRECOGNIZED"] = -1] = "UNRECOGNIZED";
})(ResponseOfferSnapshot_Result || (exports.ResponseOfferSnapshot_Result = ResponseOfferSnapshot_Result = {}));
exports.ResponseOfferSnapshot_ResultSDKType = ResponseOfferSnapshot_Result;
exports.ResponseOfferSnapshot_ResultAmino = ResponseOfferSnapshot_Result;
function responseOfferSnapshot_ResultFromJSON(object) {
    switch (object) {
        case 0:
        case "UNKNOWN":
            return ResponseOfferSnapshot_Result.UNKNOWN;
        case 1:
        case "ACCEPT":
            return ResponseOfferSnapshot_Result.ACCEPT;
        case 2:
        case "ABORT":
            return ResponseOfferSnapshot_Result.ABORT;
        case 3:
        case "REJECT":
            return ResponseOfferSnapshot_Result.REJECT;
        case 4:
        case "REJECT_FORMAT":
            return ResponseOfferSnapshot_Result.REJECT_FORMAT;
        case 5:
        case "REJECT_SENDER":
            return ResponseOfferSnapshot_Result.REJECT_SENDER;
        case -1:
        case "UNRECOGNIZED":
        default:
            return ResponseOfferSnapshot_Result.UNRECOGNIZED;
    }
}
function responseOfferSnapshot_ResultToJSON(object) {
    switch (object) {
        case ResponseOfferSnapshot_Result.UNKNOWN:
            return "UNKNOWN";
        case ResponseOfferSnapshot_Result.ACCEPT:
            return "ACCEPT";
        case ResponseOfferSnapshot_Result.ABORT:
            return "ABORT";
        case ResponseOfferSnapshot_Result.REJECT:
            return "REJECT";
        case ResponseOfferSnapshot_Result.REJECT_FORMAT:
            return "REJECT_FORMAT";
        case ResponseOfferSnapshot_Result.REJECT_SENDER:
            return "REJECT_SENDER";
        case ResponseOfferSnapshot_Result.UNRECOGNIZED:
        default:
            return "UNRECOGNIZED";
    }
}
var ResponseApplySnapshotChunk_Result;
(function (ResponseApplySnapshotChunk_Result) {
    /** UNKNOWN - Unknown result, abort all snapshot restoration */
    ResponseApplySnapshotChunk_Result[ResponseApplySnapshotChunk_Result["UNKNOWN"] = 0] = "UNKNOWN";
    /** ACCEPT - Chunk successfully accepted */
    ResponseApplySnapshotChunk_Result[ResponseApplySnapshotChunk_Result["ACCEPT"] = 1] = "ACCEPT";
    /** ABORT - Abort all snapshot restoration */
    ResponseApplySnapshotChunk_Result[ResponseApplySnapshotChunk_Result["ABORT"] = 2] = "ABORT";
    /** RETRY - Retry chunk (combine with refetch and reject) */
    ResponseApplySnapshotChunk_Result[ResponseApplySnapshotChunk_Result["RETRY"] = 3] = "RETRY";
    /** RETRY_SNAPSHOT - Retry snapshot (combine with refetch and reject) */
    ResponseApplySnapshotChunk_Result[ResponseApplySnapshotChunk_Result["RETRY_SNAPSHOT"] = 4] = "RETRY_SNAPSHOT";
    /** REJECT_SNAPSHOT - Reject this snapshot, try others */
    ResponseApplySnapshotChunk_Result[ResponseApplySnapshotChunk_Result["REJECT_SNAPSHOT"] = 5] = "REJECT_SNAPSHOT";
    ResponseApplySnapshotChunk_Result[ResponseApplySnapshotChunk_Result["UNRECOGNIZED"] = -1] = "UNRECOGNIZED";
})(ResponseApplySnapshotChunk_Result || (exports.ResponseApplySnapshotChunk_Result = ResponseApplySnapshotChunk_Result = {}));
exports.ResponseApplySnapshotChunk_ResultSDKType = ResponseApplySnapshotChunk_Result;
exports.ResponseApplySnapshotChunk_ResultAmino = ResponseApplySnapshotChunk_Result;
function responseApplySnapshotChunk_ResultFromJSON(object) {
    switch (object) {
        case 0:
        case "UNKNOWN":
            return ResponseApplySnapshotChunk_Result.UNKNOWN;
        case 1:
        case "ACCEPT":
            return ResponseApplySnapshotChunk_Result.ACCEPT;
        case 2:
        case "ABORT":
            return ResponseApplySnapshotChunk_Result.ABORT;
        case 3:
        case "RETRY":
            return ResponseApplySnapshotChunk_Result.RETRY;
        case 4:
        case "RETRY_SNAPSHOT":
            return ResponseApplySnapshotChunk_Result.RETRY_SNAPSHOT;
        case 5:
        case "REJECT_SNAPSHOT":
            return ResponseApplySnapshotChunk_Result.REJECT_SNAPSHOT;
        case -1:
        case "UNRECOGNIZED":
        default:
            return ResponseApplySnapshotChunk_Result.UNRECOGNIZED;
    }
}
function responseApplySnapshotChunk_ResultToJSON(object) {
    switch (object) {
        case ResponseApplySnapshotChunk_Result.UNKNOWN:
            return "UNKNOWN";
        case ResponseApplySnapshotChunk_Result.ACCEPT:
            return "ACCEPT";
        case ResponseApplySnapshotChunk_Result.ABORT:
            return "ABORT";
        case ResponseApplySnapshotChunk_Result.RETRY:
            return "RETRY";
        case ResponseApplySnapshotChunk_Result.RETRY_SNAPSHOT:
            return "RETRY_SNAPSHOT";
        case ResponseApplySnapshotChunk_Result.REJECT_SNAPSHOT:
            return "REJECT_SNAPSHOT";
        case ResponseApplySnapshotChunk_Result.UNRECOGNIZED:
        default:
            return "UNRECOGNIZED";
    }
}
var ResponseProcessProposal_ProposalStatus;
(function (ResponseProcessProposal_ProposalStatus) {
    ResponseProcessProposal_ProposalStatus[ResponseProcessProposal_ProposalStatus["UNKNOWN"] = 0] = "UNKNOWN";
    ResponseProcessProposal_ProposalStatus[ResponseProcessProposal_ProposalStatus["ACCEPT"] = 1] = "ACCEPT";
    ResponseProcessProposal_ProposalStatus[ResponseProcessProposal_ProposalStatus["REJECT"] = 2] = "REJECT";
    ResponseProcessProposal_ProposalStatus[ResponseProcessProposal_ProposalStatus["UNRECOGNIZED"] = -1] = "UNRECOGNIZED";
})(ResponseProcessProposal_ProposalStatus || (exports.ResponseProcessProposal_ProposalStatus = ResponseProcessProposal_ProposalStatus = {}));
exports.ResponseProcessProposal_ProposalStatusSDKType = ResponseProcessProposal_ProposalStatus;
exports.ResponseProcessProposal_ProposalStatusAmino = ResponseProcessProposal_ProposalStatus;
function responseProcessProposal_ProposalStatusFromJSON(object) {
    switch (object) {
        case 0:
        case "UNKNOWN":
            return ResponseProcessProposal_ProposalStatus.UNKNOWN;
        case 1:
        case "ACCEPT":
            return ResponseProcessProposal_ProposalStatus.ACCEPT;
        case 2:
        case "REJECT":
            return ResponseProcessProposal_ProposalStatus.REJECT;
        case -1:
        case "UNRECOGNIZED":
        default:
            return ResponseProcessProposal_ProposalStatus.UNRECOGNIZED;
    }
}
function responseProcessProposal_ProposalStatusToJSON(object) {
    switch (object) {
        case ResponseProcessProposal_ProposalStatus.UNKNOWN:
            return "UNKNOWN";
        case ResponseProcessProposal_ProposalStatus.ACCEPT:
            return "ACCEPT";
        case ResponseProcessProposal_ProposalStatus.REJECT:
            return "REJECT";
        case ResponseProcessProposal_ProposalStatus.UNRECOGNIZED:
        default:
            return "UNRECOGNIZED";
    }
}
var ResponseVerifyVoteExtension_VerifyStatus;
(function (ResponseVerifyVoteExtension_VerifyStatus) {
    ResponseVerifyVoteExtension_VerifyStatus[ResponseVerifyVoteExtension_VerifyStatus["UNKNOWN"] = 0] = "UNKNOWN";
    ResponseVerifyVoteExtension_VerifyStatus[ResponseVerifyVoteExtension_VerifyStatus["ACCEPT"] = 1] = "ACCEPT";
    /**
     * REJECT - Rejecting the vote extension will reject the entire precommit by the sender.
     * Incorrectly implementing this thus has liveness implications as it may affect
     * CometBFT's ability to receive 2/3+ valid votes to finalize the block.
     * Honest nodes should never be rejected.
     */
    ResponseVerifyVoteExtension_VerifyStatus[ResponseVerifyVoteExtension_VerifyStatus["REJECT"] = 2] = "REJECT";
    ResponseVerifyVoteExtension_VerifyStatus[ResponseVerifyVoteExtension_VerifyStatus["UNRECOGNIZED"] = -1] = "UNRECOGNIZED";
})(ResponseVerifyVoteExtension_VerifyStatus || (exports.ResponseVerifyVoteExtension_VerifyStatus = ResponseVerifyVoteExtension_VerifyStatus = {}));
exports.ResponseVerifyVoteExtension_VerifyStatusSDKType = ResponseVerifyVoteExtension_VerifyStatus;
exports.ResponseVerifyVoteExtension_VerifyStatusAmino = ResponseVerifyVoteExtension_VerifyStatus;
function responseVerifyVoteExtension_VerifyStatusFromJSON(object) {
    switch (object) {
        case 0:
        case "UNKNOWN":
            return ResponseVerifyVoteExtension_VerifyStatus.UNKNOWN;
        case 1:
        case "ACCEPT":
            return ResponseVerifyVoteExtension_VerifyStatus.ACCEPT;
        case 2:
        case "REJECT":
            return ResponseVerifyVoteExtension_VerifyStatus.REJECT;
        case -1:
        case "UNRECOGNIZED":
        default:
            return ResponseVerifyVoteExtension_VerifyStatus.UNRECOGNIZED;
    }
}
function responseVerifyVoteExtension_VerifyStatusToJSON(object) {
    switch (object) {
        case ResponseVerifyVoteExtension_VerifyStatus.UNKNOWN:
            return "UNKNOWN";
        case ResponseVerifyVoteExtension_VerifyStatus.ACCEPT:
            return "ACCEPT";
        case ResponseVerifyVoteExtension_VerifyStatus.REJECT:
            return "REJECT";
        case ResponseVerifyVoteExtension_VerifyStatus.UNRECOGNIZED:
        default:
            return "UNRECOGNIZED";
    }
}
var MisbehaviorType;
(function (MisbehaviorType) {
    MisbehaviorType[MisbehaviorType["UNKNOWN"] = 0] = "UNKNOWN";
    MisbehaviorType[MisbehaviorType["DUPLICATE_VOTE"] = 1] = "DUPLICATE_VOTE";
    MisbehaviorType[MisbehaviorType["LIGHT_CLIENT_ATTACK"] = 2] = "LIGHT_CLIENT_ATTACK";
    MisbehaviorType[MisbehaviorType["UNRECOGNIZED"] = -1] = "UNRECOGNIZED";
})(MisbehaviorType || (exports.MisbehaviorType = MisbehaviorType = {}));
exports.MisbehaviorTypeSDKType = MisbehaviorType;
exports.MisbehaviorTypeAmino = MisbehaviorType;
function misbehaviorTypeFromJSON(object) {
    switch (object) {
        case 0:
        case "UNKNOWN":
            return MisbehaviorType.UNKNOWN;
        case 1:
        case "DUPLICATE_VOTE":
            return MisbehaviorType.DUPLICATE_VOTE;
        case 2:
        case "LIGHT_CLIENT_ATTACK":
            return MisbehaviorType.LIGHT_CLIENT_ATTACK;
        case -1:
        case "UNRECOGNIZED":
        default:
            return MisbehaviorType.UNRECOGNIZED;
    }
}
function misbehaviorTypeToJSON(object) {
    switch (object) {
        case MisbehaviorType.UNKNOWN:
            return "UNKNOWN";
        case MisbehaviorType.DUPLICATE_VOTE:
            return "DUPLICATE_VOTE";
        case MisbehaviorType.LIGHT_CLIENT_ATTACK:
            return "LIGHT_CLIENT_ATTACK";
        case MisbehaviorType.UNRECOGNIZED:
        default:
            return "UNRECOGNIZED";
    }
}
function createBaseRequest() {
    return {
        echo: undefined,
        flush: undefined,
        info: undefined,
        initChain: undefined,
        query: undefined,
        checkTx: undefined,
        commit: undefined,
        listSnapshots: undefined,
        offerSnapshot: undefined,
        loadSnapshotChunk: undefined,
        applySnapshotChunk: undefined,
        prepareProposal: undefined,
        processProposal: undefined,
        extendVote: undefined,
        verifyVoteExtension: undefined,
        finalizeBlock: undefined
    };
}
exports.Request = {
    typeUrl: "/tendermint.abci.Request",
    is(o) {
        return o && o.$typeUrl === exports.Request.typeUrl;
    },
    isSDK(o) {
        return o && o.$typeUrl === exports.Request.typeUrl;
    },
    isAmino(o) {
        return o && o.$typeUrl === exports.Request.typeUrl;
    },
    encode(message, writer = binary_1.BinaryWriter.create()) {
        if (message.echo !== undefined) {
            exports.RequestEcho.encode(message.echo, writer.uint32(10).fork()).ldelim();
        }
        if (message.flush !== undefined) {
            exports.RequestFlush.encode(message.flush, writer.uint32(18).fork()).ldelim();
        }
        if (message.info !== undefined) {
            exports.RequestInfo.encode(message.info, writer.uint32(26).fork()).ldelim();
        }
        if (message.initChain !== undefined) {
            exports.RequestInitChain.encode(message.initChain, writer.uint32(42).fork()).ldelim();
        }
        if (message.query !== undefined) {
            exports.RequestQuery.encode(message.query, writer.uint32(50).fork()).ldelim();
        }
        if (message.checkTx !== undefined) {
            exports.RequestCheckTx.encode(message.checkTx, writer.uint32(66).fork()).ldelim();
        }
        if (message.commit !== undefined) {
            exports.RequestCommit.encode(message.commit, writer.uint32(90).fork()).ldelim();
        }
        if (message.listSnapshots !== undefined) {
            exports.RequestListSnapshots.encode(message.listSnapshots, writer.uint32(98).fork()).ldelim();
        }
        if (message.offerSnapshot !== undefined) {
            exports.RequestOfferSnapshot.encode(message.offerSnapshot, writer.uint32(106).fork()).ldelim();
        }
        if (message.loadSnapshotChunk !== undefined) {
            exports.RequestLoadSnapshotChunk.encode(message.loadSnapshotChunk, writer.uint32(114).fork()).ldelim();
        }
        if (message.applySnapshotChunk !== undefined) {
            exports.RequestApplySnapshotChunk.encode(message.applySnapshotChunk, writer.uint32(122).fork()).ldelim();
        }
        if (message.prepareProposal !== undefined) {
            exports.RequestPrepareProposal.encode(message.prepareProposal, writer.uint32(130).fork()).ldelim();
        }
        if (message.processProposal !== undefined) {
            exports.RequestProcessProposal.encode(message.processProposal, writer.uint32(138).fork()).ldelim();
        }
        if (message.extendVote !== undefined) {
            exports.RequestExtendVote.encode(message.extendVote, writer.uint32(146).fork()).ldelim();
        }
        if (message.verifyVoteExtension !== undefined) {
            exports.RequestVerifyVoteExtension.encode(message.verifyVoteExtension, writer.uint32(154).fork()).ldelim();
        }
        if (message.finalizeBlock !== undefined) {
            exports.RequestFinalizeBlock.encode(message.finalizeBlock, writer.uint32(162).fork()).ldelim();
        }
        return writer;
    },
    decode(input, length) {
        const reader = input instanceof binary_1.BinaryReader ? input : new binary_1.BinaryReader(input);
        let end = length === undefined ? reader.len : reader.pos + length;
        const message = createBaseRequest();
        while (reader.pos < end) {
            const tag = reader.uint32();
            switch (tag >>> 3) {
                case 1:
                    message.echo = exports.RequestEcho.decode(reader, reader.uint32());
                    break;
                case 2:
                    message.flush = exports.RequestFlush.decode(reader, reader.uint32());
                    break;
                case 3:
                    message.info = exports.RequestInfo.decode(reader, reader.uint32());
                    break;
                case 5:
                    message.initChain = exports.RequestInitChain.decode(reader, reader.uint32());
                    break;
                case 6:
                    message.query = exports.RequestQuery.decode(reader, reader.uint32());
                    break;
                case 8:
                    message.checkTx = exports.RequestCheckTx.decode(reader, reader.uint32());
                    break;
                case 11:
                    message.commit = exports.RequestCommit.decode(reader, reader.uint32());
                    break;
                case 12:
                    message.listSnapshots = exports.RequestListSnapshots.decode(reader, reader.uint32());
                    break;
                case 13:
                    message.offerSnapshot = exports.RequestOfferSnapshot.decode(reader, reader.uint32());
                    break;
                case 14:
                    message.loadSnapshotChunk = exports.RequestLoadSnapshotChunk.decode(reader, reader.uint32());
                    break;
                case 15:
                    message.applySnapshotChunk = exports.RequestApplySnapshotChunk.decode(reader, reader.uint32());
                    break;
                case 16:
                    message.prepareProposal = exports.RequestPrepareProposal.decode(reader, reader.uint32());
                    break;
                case 17:
                    message.processProposal = exports.RequestProcessProposal.decode(reader, reader.uint32());
                    break;
                case 18:
                    message.extendVote = exports.RequestExtendVote.decode(reader, reader.uint32());
                    break;
                case 19:
                    message.verifyVoteExtension = exports.RequestVerifyVoteExtension.decode(reader, reader.uint32());
                    break;
                case 20:
                    message.finalizeBlock = exports.RequestFinalizeBlock.decode(reader, reader.uint32());
                    break;
                default:
                    reader.skipType(tag & 7);
                    break;
            }
        }
        return message;
    },
    fromPartial(object) {
        const message = createBaseRequest();
        message.echo = object.echo !== undefined && object.echo !== null ? exports.RequestEcho.fromPartial(object.echo) : undefined;
        message.flush = object.flush !== undefined && object.flush !== null ? exports.RequestFlush.fromPartial(object.flush) : undefined;
        message.info = object.info !== undefined && object.info !== null ? exports.RequestInfo.fromPartial(object.info) : undefined;
        message.initChain = object.initChain !== undefined && object.initChain !== null ? exports.RequestInitChain.fromPartial(object.initChain) : undefined;
        message.query = object.query !== undefined && object.query !== null ? exports.RequestQuery.fromPartial(object.query) : undefined;
        message.checkTx = object.checkTx !== undefined && object.checkTx !== null ? exports.RequestCheckTx.fromPartial(object.checkTx) : undefined;
        message.commit = object.commit !== undefined && object.commit !== null ? exports.RequestCommit.fromPartial(object.commit) : undefined;
        message.listSnapshots = object.listSnapshots !== undefined && object.listSnapshots !== null ? exports.RequestListSnapshots.fromPartial(object.listSnapshots) : undefined;
        message.offerSnapshot = object.offerSnapshot !== undefined && object.offerSnapshot !== null ? exports.RequestOfferSnapshot.fromPartial(object.offerSnapshot) : undefined;
        message.loadSnapshotChunk = object.loadSnapshotChunk !== undefined && object.loadSnapshotChunk !== null ? exports.RequestLoadSnapshotChunk.fromPartial(object.loadSnapshotChunk) : undefined;
        message.applySnapshotChunk = object.applySnapshotChunk !== undefined && object.applySnapshotChunk !== null ? exports.RequestApplySnapshotChunk.fromPartial(object.applySnapshotChunk) : undefined;
        message.prepareProposal = object.prepareProposal !== undefined && object.prepareProposal !== null ? exports.RequestPrepareProposal.fromPartial(object.prepareProposal) : undefined;
        message.processProposal = object.processProposal !== undefined && object.processProposal !== null ? exports.RequestProcessProposal.fromPartial(object.processProposal) : undefined;
        message.extendVote = object.extendVote !== undefined && object.extendVote !== null ? exports.RequestExtendVote.fromPartial(object.extendVote) : undefined;
        message.verifyVoteExtension = object.verifyVoteExtension !== undefined && object.verifyVoteExtension !== null ? exports.RequestVerifyVoteExtension.fromPartial(object.verifyVoteExtension) : undefined;
        message.finalizeBlock = object.finalizeBlock !== undefined && object.finalizeBlock !== null ? exports.RequestFinalizeBlock.fromPartial(object.finalizeBlock) : undefined;
        return message;
    },
    fromAmino(object) {
        const message = createBaseRequest();
        if (object.echo !== undefined && object.echo !== null) {
            message.echo = exports.RequestEcho.fromAmino(object.echo);
        }
        if (object.flush !== undefined && object.flush !== null) {
            message.flush = exports.RequestFlush.fromAmino(object.flush);
        }
        if (object.info !== undefined && object.info !== null) {
            message.info = exports.RequestInfo.fromAmino(object.info);
        }
        if (object.init_chain !== undefined && object.init_chain !== null) {
            message.initChain = exports.RequestInitChain.fromAmino(object.init_chain);
        }
        if (object.query !== undefined && object.query !== null) {
            message.query = exports.RequestQuery.fromAmino(object.query);
        }
        if (object.check_tx !== undefined && object.check_tx !== null) {
            message.checkTx = exports.RequestCheckTx.fromAmino(object.check_tx);
        }
        if (object.commit !== undefined && object.commit !== null) {
            message.commit = exports.RequestCommit.fromAmino(object.commit);
        }
        if (object.list_snapshots !== undefined && object.list_snapshots !== null) {
            message.listSnapshots = exports.RequestListSnapshots.fromAmino(object.list_snapshots);
        }
        if (object.offer_snapshot !== undefined && object.offer_snapshot !== null) {
            message.offerSnapshot = exports.RequestOfferSnapshot.fromAmino(object.offer_snapshot);
        }
        if (object.load_snapshot_chunk !== undefined && object.load_snapshot_chunk !== null) {
            message.loadSnapshotChunk = exports.RequestLoadSnapshotChunk.fromAmino(object.load_snapshot_chunk);
        }
        if (object.apply_snapshot_chunk !== undefined && object.apply_snapshot_chunk !== null) {
            message.applySnapshotChunk = exports.RequestApplySnapshotChunk.fromAmino(object.apply_snapshot_chunk);
        }
        if (object.prepare_proposal !== undefined && object.prepare_proposal !== null) {
            message.prepareProposal = exports.RequestPrepareProposal.fromAmino(object.prepare_proposal);
        }
        if (object.process_proposal !== undefined && object.process_proposal !== null) {
            message.processProposal = exports.RequestProcessProposal.fromAmino(object.process_proposal);
        }
        if (object.extend_vote !== undefined && object.extend_vote !== null) {
            message.extendVote = exports.RequestExtendVote.fromAmino(object.extend_vote);
        }
        if (object.verify_vote_extension !== undefined && object.verify_vote_extension !== null) {
            message.verifyVoteExtension = exports.RequestVerifyVoteExtension.fromAmino(object.verify_vote_extension);
        }
        if (object.finalize_block !== undefined && object.finalize_block !== null) {
            message.finalizeBlock = exports.RequestFinalizeBlock.fromAmino(object.finalize_block);
        }
        return message;
    },
    toAmino(message) {
        const obj = {};
        obj.echo = message.echo ? exports.RequestEcho.toAmino(message.echo) : undefined;
        obj.flush = message.flush ? exports.RequestFlush.toAmino(message.flush) : undefined;
        obj.info = message.info ? exports.RequestInfo.toAmino(message.info) : undefined;
        obj.init_chain = message.initChain ? exports.RequestInitChain.toAmino(message.initChain) : undefined;
        obj.query = message.query ? exports.RequestQuery.toAmino(message.query) : undefined;
        obj.check_tx = message.checkTx ? exports.RequestCheckTx.toAmino(message.checkTx) : undefined;
        obj.commit = message.commit ? exports.RequestCommit.toAmino(message.commit) : undefined;
        obj.list_snapshots = message.listSnapshots ? exports.RequestListSnapshots.toAmino(message.listSnapshots) : undefined;
        obj.offer_snapshot = message.offerSnapshot ? exports.RequestOfferSnapshot.toAmino(message.offerSnapshot) : undefined;
        obj.load_snapshot_chunk = message.loadSnapshotChunk ? exports.RequestLoadSnapshotChunk.toAmino(message.loadSnapshotChunk) : undefined;
        obj.apply_snapshot_chunk = message.applySnapshotChunk ? exports.RequestApplySnapshotChunk.toAmino(message.applySnapshotChunk) : undefined;
        obj.prepare_proposal = message.prepareProposal ? exports.RequestPrepareProposal.toAmino(message.prepareProposal) : undefined;
        obj.process_proposal = message.processProposal ? exports.RequestProcessProposal.toAmino(message.processProposal) : undefined;
        obj.extend_vote = message.extendVote ? exports.RequestExtendVote.toAmino(message.extendVote) : undefined;
        obj.verify_vote_extension = message.verifyVoteExtension ? exports.RequestVerifyVoteExtension.toAmino(message.verifyVoteExtension) : undefined;
        obj.finalize_block = message.finalizeBlock ? exports.RequestFinalizeBlock.toAmino(message.finalizeBlock) : undefined;
        return obj;
    },
    fromAminoMsg(object) {
        return exports.Request.fromAmino(object.value);
    },
    fromProtoMsg(message) {
        return exports.Request.decode(message.value);
    },
    toProto(message) {
        return exports.Request.encode(message).finish();
    },
    toProtoMsg(message) {
        return {
            typeUrl: "/tendermint.abci.Request",
            value: exports.Request.encode(message).finish()
        };
    }
};
registry_1.GlobalDecoderRegistry.register(exports.Request.typeUrl, exports.Request);
function createBaseRequestEcho() {
    return {
        message: ""
    };
}
exports.RequestEcho = {
    typeUrl: "/tendermint.abci.RequestEcho",
    is(o) {
        return o && (o.$typeUrl === exports.RequestEcho.typeUrl || typeof o.message === "string");
    },
    isSDK(o) {
        return o && (o.$typeUrl === exports.RequestEcho.typeUrl || typeof o.message === "string");
    },
    isAmino(o) {
        return o && (o.$typeUrl === exports.RequestEcho.typeUrl || typeof o.message === "string");
    },
    encode(message, writer = binary_1.BinaryWriter.create()) {
        if (message.message !== "") {
            writer.uint32(10).string(message.message);
        }
        return writer;
    },
    decode(input, length) {
        const reader = input instanceof binary_1.BinaryReader ? input : new binary_1.BinaryReader(input);
        let end = length === undefined ? reader.len : reader.pos + length;
        const message = createBaseRequestEcho();
        while (reader.pos < end) {
            const tag = reader.uint32();
            switch (tag >>> 3) {
                case 1:
                    message.message = reader.string();
                    break;
                default:
                    reader.skipType(tag & 7);
                    break;
            }
        }
        return message;
    },
    fromPartial(object) {
        const message = createBaseRequestEcho();
        message.message = object.message ?? "";
        return message;
    },
    fromAmino(object) {
        const message = createBaseRequestEcho();
        if (object.message !== undefined && object.message !== null) {
            message.message = object.message;
        }
        return message;
    },
    toAmino(message) {
        const obj = {};
        obj.message = message.message === "" ? undefined : message.message;
        return obj;
    },
    fromAminoMsg(object) {
        return exports.RequestEcho.fromAmino(object.value);
    },
    fromProtoMsg(message) {
        return exports.RequestEcho.decode(message.value);
    },
    toProto(message) {
        return exports.RequestEcho.encode(message).finish();
    },
    toProtoMsg(message) {
        return {
            typeUrl: "/tendermint.abci.RequestEcho",
            value: exports.RequestEcho.encode(message).finish()
        };
    }
};
registry_1.GlobalDecoderRegistry.register(exports.RequestEcho.typeUrl, exports.RequestEcho);
function createBaseRequestFlush() {
    return {};
}
exports.RequestFlush = {
    typeUrl: "/tendermint.abci.RequestFlush",
    is(o) {
        return o && o.$typeUrl === exports.RequestFlush.typeUrl;
    },
    isSDK(o) {
        return o && o.$typeUrl === exports.RequestFlush.typeUrl;
    },
    isAmino(o) {
        return o && o.$typeUrl === exports.RequestFlush.typeUrl;
    },
    encode(_, writer = binary_1.BinaryWriter.create()) {
        return writer;
    },
    decode(input, length) {
        const reader = input instanceof binary_1.BinaryReader ? input : new binary_1.BinaryReader(input);
        let end = length === undefined ? reader.len : reader.pos + length;
        const message = createBaseRequestFlush();
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
        const message = createBaseRequestFlush();
        return message;
    },
    fromAmino(_) {
        const message = createBaseRequestFlush();
        return message;
    },
    toAmino(_) {
        const obj = {};
        return obj;
    },
    fromAminoMsg(object) {
        return exports.RequestFlush.fromAmino(object.value);
    },
    fromProtoMsg(message) {
        return exports.RequestFlush.decode(message.value);
    },
    toProto(message) {
        return exports.RequestFlush.encode(message).finish();
    },
    toProtoMsg(message) {
        return {
            typeUrl: "/tendermint.abci.RequestFlush",
            value: exports.RequestFlush.encode(message).finish()
        };
    }
};
registry_1.GlobalDecoderRegistry.register(exports.RequestFlush.typeUrl, exports.RequestFlush);
function createBaseRequestInfo() {
    return {
        version: "",
        blockVersion: BigInt(0),
        p2pVersion: BigInt(0),
        abciVersion: ""
    };
}
exports.RequestInfo = {
    typeUrl: "/tendermint.abci.RequestInfo",
    is(o) {
        return o && (o.$typeUrl === exports.RequestInfo.typeUrl || typeof o.version === "string" && typeof o.blockVersion === "bigint" && typeof o.p2pVersion === "bigint" && typeof o.abciVersion === "string");
    },
    isSDK(o) {
        return o && (o.$typeUrl === exports.RequestInfo.typeUrl || typeof o.version === "string" && typeof o.block_version === "bigint" && typeof o.p2p_version === "bigint" && typeof o.abci_version === "string");
    },
    isAmino(o) {
        return o && (o.$typeUrl === exports.RequestInfo.typeUrl || typeof o.version === "string" && typeof o.block_version === "bigint" && typeof o.p2p_version === "bigint" && typeof o.abci_version === "string");
    },
    encode(message, writer = binary_1.BinaryWriter.create()) {
        if (message.version !== "") {
            writer.uint32(10).string(message.version);
        }
        if (message.blockVersion !== BigInt(0)) {
            writer.uint32(16).uint64(message.blockVersion);
        }
        if (message.p2pVersion !== BigInt(0)) {
            writer.uint32(24).uint64(message.p2pVersion);
        }
        if (message.abciVersion !== "") {
            writer.uint32(34).string(message.abciVersion);
        }
        return writer;
    },
    decode(input, length) {
        const reader = input instanceof binary_1.BinaryReader ? input : new binary_1.BinaryReader(input);
        let end = length === undefined ? reader.len : reader.pos + length;
        const message = createBaseRequestInfo();
        while (reader.pos < end) {
            const tag = reader.uint32();
            switch (tag >>> 3) {
                case 1:
                    message.version = reader.string();
                    break;
                case 2:
                    message.blockVersion = reader.uint64();
                    break;
                case 3:
                    message.p2pVersion = reader.uint64();
                    break;
                case 4:
                    message.abciVersion = reader.string();
                    break;
                default:
                    reader.skipType(tag & 7);
                    break;
            }
        }
        return message;
    },
    fromPartial(object) {
        const message = createBaseRequestInfo();
        message.version = object.version ?? "";
        message.blockVersion = object.blockVersion !== undefined && object.blockVersion !== null ? BigInt(object.blockVersion.toString()) : BigInt(0);
        message.p2pVersion = object.p2pVersion !== undefined && object.p2pVersion !== null ? BigInt(object.p2pVersion.toString()) : BigInt(0);
        message.abciVersion = object.abciVersion ?? "";
        return message;
    },
    fromAmino(object) {
        const message = createBaseRequestInfo();
        if (object.version !== undefined && object.version !== null) {
            message.version = object.version;
        }
        if (object.block_version !== undefined && object.block_version !== null) {
            message.blockVersion = BigInt(object.block_version);
        }
        if (object.p2p_version !== undefined && object.p2p_version !== null) {
            message.p2pVersion = BigInt(object.p2p_version);
        }
        if (object.abci_version !== undefined && object.abci_version !== null) {
            message.abciVersion = object.abci_version;
        }
        return message;
    },
    toAmino(message) {
        const obj = {};
        obj.version = message.version === "" ? undefined : message.version;
        obj.block_version = message.blockVersion !== BigInt(0) ? message.blockVersion?.toString() : undefined;
        obj.p2p_version = message.p2pVersion !== BigInt(0) ? message.p2pVersion?.toString() : undefined;
        obj.abci_version = message.abciVersion === "" ? undefined : message.abciVersion;
        return obj;
    },
    fromAminoMsg(object) {
        return exports.RequestInfo.fromAmino(object.value);
    },
    fromProtoMsg(message) {
        return exports.RequestInfo.decode(message.value);
    },
    toProto(message) {
        return exports.RequestInfo.encode(message).finish();
    },
    toProtoMsg(message) {
        return {
            typeUrl: "/tendermint.abci.RequestInfo",
            value: exports.RequestInfo.encode(message).finish()
        };
    }
};
registry_1.GlobalDecoderRegistry.register(exports.RequestInfo.typeUrl, exports.RequestInfo);
function createBaseRequestInitChain() {
    return {
        time: new Date(),
        chainId: "",
        consensusParams: undefined,
        validators: [],
        appStateBytes: new Uint8Array(),
        initialHeight: BigInt(0)
    };
}
exports.RequestInitChain = {
    typeUrl: "/tendermint.abci.RequestInitChain",
    is(o) {
        return o && (o.$typeUrl === exports.RequestInitChain.typeUrl || timestamp_1.Timestamp.is(o.time) && typeof o.chainId === "string" && Array.isArray(o.validators) && (!o.validators.length || exports.ValidatorUpdate.is(o.validators[0])) && (o.appStateBytes instanceof Uint8Array || typeof o.appStateBytes === "string") && typeof o.initialHeight === "bigint");
    },
    isSDK(o) {
        return o && (o.$typeUrl === exports.RequestInitChain.typeUrl || timestamp_1.Timestamp.isSDK(o.time) && typeof o.chain_id === "string" && Array.isArray(o.validators) && (!o.validators.length || exports.ValidatorUpdate.isSDK(o.validators[0])) && (o.app_state_bytes instanceof Uint8Array || typeof o.app_state_bytes === "string") && typeof o.initial_height === "bigint");
    },
    isAmino(o) {
        return o && (o.$typeUrl === exports.RequestInitChain.typeUrl || timestamp_1.Timestamp.isAmino(o.time) && typeof o.chain_id === "string" && Array.isArray(o.validators) && (!o.validators.length || exports.ValidatorUpdate.isAmino(o.validators[0])) && (o.app_state_bytes instanceof Uint8Array || typeof o.app_state_bytes === "string") && typeof o.initial_height === "bigint");
    },
    encode(message, writer = binary_1.BinaryWriter.create()) {
        if (message.time !== undefined) {
            timestamp_1.Timestamp.encode((0, helpers_1.toTimestamp)(message.time), writer.uint32(10).fork()).ldelim();
        }
        if (message.chainId !== "") {
            writer.uint32(18).string(message.chainId);
        }
        if (message.consensusParams !== undefined) {
            params_1.ConsensusParams.encode(message.consensusParams, writer.uint32(26).fork()).ldelim();
        }
        for (const v of message.validators) {
            exports.ValidatorUpdate.encode(v, writer.uint32(34).fork()).ldelim();
        }
        if (message.appStateBytes.length !== 0) {
            writer.uint32(42).bytes(message.appStateBytes);
        }
        if (message.initialHeight !== BigInt(0)) {
            writer.uint32(48).int64(message.initialHeight);
        }
        return writer;
    },
    decode(input, length) {
        const reader = input instanceof binary_1.BinaryReader ? input : new binary_1.BinaryReader(input);
        let end = length === undefined ? reader.len : reader.pos + length;
        const message = createBaseRequestInitChain();
        while (reader.pos < end) {
            const tag = reader.uint32();
            switch (tag >>> 3) {
                case 1:
                    message.time = (0, helpers_1.fromTimestamp)(timestamp_1.Timestamp.decode(reader, reader.uint32()));
                    break;
                case 2:
                    message.chainId = reader.string();
                    break;
                case 3:
                    message.consensusParams = params_1.ConsensusParams.decode(reader, reader.uint32());
                    break;
                case 4:
                    message.validators.push(exports.ValidatorUpdate.decode(reader, reader.uint32()));
                    break;
                case 5:
                    message.appStateBytes = reader.bytes();
                    break;
                case 6:
                    message.initialHeight = reader.int64();
                    break;
                default:
                    reader.skipType(tag & 7);
                    break;
            }
        }
        return message;
    },
    fromPartial(object) {
        const message = createBaseRequestInitChain();
        message.time = object.time ?? undefined;
        message.chainId = object.chainId ?? "";
        message.consensusParams = object.consensusParams !== undefined && object.consensusParams !== null ? params_1.ConsensusParams.fromPartial(object.consensusParams) : undefined;
        message.validators = object.validators?.map(e => exports.ValidatorUpdate.fromPartial(e)) || [];
        message.appStateBytes = object.appStateBytes ?? new Uint8Array();
        message.initialHeight = object.initialHeight !== undefined && object.initialHeight !== null ? BigInt(object.initialHeight.toString()) : BigInt(0);
        return message;
    },
    fromAmino(object) {
        const message = createBaseRequestInitChain();
        if (object.time !== undefined && object.time !== null) {
            message.time = (0, helpers_1.fromTimestamp)(timestamp_1.Timestamp.fromAmino(object.time));
        }
        if (object.chain_id !== undefined && object.chain_id !== null) {
            message.chainId = object.chain_id;
        }
        if (object.consensus_params !== undefined && object.consensus_params !== null) {
            message.consensusParams = params_1.ConsensusParams.fromAmino(object.consensus_params);
        }
        message.validators = object.validators?.map(e => exports.ValidatorUpdate.fromAmino(e)) || [];
        if (object.app_state_bytes !== undefined && object.app_state_bytes !== null) {
            message.appStateBytes = (0, helpers_1.bytesFromBase64)(object.app_state_bytes);
        }
        if (object.initial_height !== undefined && object.initial_height !== null) {
            message.initialHeight = BigInt(object.initial_height);
        }
        return message;
    },
    toAmino(message) {
        const obj = {};
        obj.time = message.time ? timestamp_1.Timestamp.toAmino((0, helpers_1.toTimestamp)(message.time)) : undefined;
        obj.chain_id = message.chainId === "" ? undefined : message.chainId;
        obj.consensus_params = message.consensusParams ? params_1.ConsensusParams.toAmino(message.consensusParams) : undefined;
        if (message.validators) {
            obj.validators = message.validators.map(e => e ? exports.ValidatorUpdate.toAmino(e) : undefined);
        }
        else {
            obj.validators = message.validators;
        }
        obj.app_state_bytes = message.appStateBytes ? (0, helpers_1.base64FromBytes)(message.appStateBytes) : undefined;
        obj.initial_height = message.initialHeight !== BigInt(0) ? message.initialHeight?.toString() : undefined;
        return obj;
    },
    fromAminoMsg(object) {
        return exports.RequestInitChain.fromAmino(object.value);
    },
    fromProtoMsg(message) {
        return exports.RequestInitChain.decode(message.value);
    },
    toProto(message) {
        return exports.RequestInitChain.encode(message).finish();
    },
    toProtoMsg(message) {
        return {
            typeUrl: "/tendermint.abci.RequestInitChain",
            value: exports.RequestInitChain.encode(message).finish()
        };
    }
};
registry_1.GlobalDecoderRegistry.register(exports.RequestInitChain.typeUrl, exports.RequestInitChain);
function createBaseRequestQuery() {
    return {
        data: new Uint8Array(),
        path: "",
        height: BigInt(0),
        prove: false
    };
}
exports.RequestQuery = {
    typeUrl: "/tendermint.abci.RequestQuery",
    is(o) {
        return o && (o.$typeUrl === exports.RequestQuery.typeUrl || (o.data instanceof Uint8Array || typeof o.data === "string") && typeof o.path === "string" && typeof o.height === "bigint" && typeof o.prove === "boolean");
    },
    isSDK(o) {
        return o && (o.$typeUrl === exports.RequestQuery.typeUrl || (o.data instanceof Uint8Array || typeof o.data === "string") && typeof o.path === "string" && typeof o.height === "bigint" && typeof o.prove === "boolean");
    },
    isAmino(o) {
        return o && (o.$typeUrl === exports.RequestQuery.typeUrl || (o.data instanceof Uint8Array || typeof o.data === "string") && typeof o.path === "string" && typeof o.height === "bigint" && typeof o.prove === "boolean");
    },
    encode(message, writer = binary_1.BinaryWriter.create()) {
        if (message.data.length !== 0) {
            writer.uint32(10).bytes(message.data);
        }
        if (message.path !== "") {
            writer.uint32(18).string(message.path);
        }
        if (message.height !== BigInt(0)) {
            writer.uint32(24).int64(message.height);
        }
        if (message.prove === true) {
            writer.uint32(32).bool(message.prove);
        }
        return writer;
    },
    decode(input, length) {
        const reader = input instanceof binary_1.BinaryReader ? input : new binary_1.BinaryReader(input);
        let end = length === undefined ? reader.len : reader.pos + length;
        const message = createBaseRequestQuery();
        while (reader.pos < end) {
            const tag = reader.uint32();
            switch (tag >>> 3) {
                case 1:
                    message.data = reader.bytes();
                    break;
                case 2:
                    message.path = reader.string();
                    break;
                case 3:
                    message.height = reader.int64();
                    break;
                case 4:
                    message.prove = reader.bool();
                    break;
                default:
                    reader.skipType(tag & 7);
                    break;
            }
        }
        return message;
    },
    fromPartial(object) {
        const message = createBaseRequestQuery();
        message.data = object.data ?? new Uint8Array();
        message.path = object.path ?? "";
        message.height = object.height !== undefined && object.height !== null ? BigInt(object.height.toString()) : BigInt(0);
        message.prove = object.prove ?? false;
        return message;
    },
    fromAmino(object) {
        const message = createBaseRequestQuery();
        if (object.data !== undefined && object.data !== null) {
            message.data = (0, helpers_1.bytesFromBase64)(object.data);
        }
        if (object.path !== undefined && object.path !== null) {
            message.path = object.path;
        }
        if (object.height !== undefined && object.height !== null) {
            message.height = BigInt(object.height);
        }
        if (object.prove !== undefined && object.prove !== null) {
            message.prove = object.prove;
        }
        return message;
    },
    toAmino(message) {
        const obj = {};
        obj.data = message.data ? (0, helpers_1.base64FromBytes)(message.data) : undefined;
        obj.path = message.path === "" ? undefined : message.path;
        obj.height = message.height !== BigInt(0) ? message.height?.toString() : undefined;
        obj.prove = message.prove === false ? undefined : message.prove;
        return obj;
    },
    fromAminoMsg(object) {
        return exports.RequestQuery.fromAmino(object.value);
    },
    fromProtoMsg(message) {
        return exports.RequestQuery.decode(message.value);
    },
    toProto(message) {
        return exports.RequestQuery.encode(message).finish();
    },
    toProtoMsg(message) {
        return {
            typeUrl: "/tendermint.abci.RequestQuery",
            value: exports.RequestQuery.encode(message).finish()
        };
    }
};
registry_1.GlobalDecoderRegistry.register(exports.RequestQuery.typeUrl, exports.RequestQuery);
function createBaseRequestCheckTx() {
    return {
        tx: new Uint8Array(),
        type: 0
    };
}
exports.RequestCheckTx = {
    typeUrl: "/tendermint.abci.RequestCheckTx",
    is(o) {
        return o && (o.$typeUrl === exports.RequestCheckTx.typeUrl || (o.tx instanceof Uint8Array || typeof o.tx === "string") && (0, helpers_1.isSet)(o.type));
    },
    isSDK(o) {
        return o && (o.$typeUrl === exports.RequestCheckTx.typeUrl || (o.tx instanceof Uint8Array || typeof o.tx === "string") && (0, helpers_1.isSet)(o.type));
    },
    isAmino(o) {
        return o && (o.$typeUrl === exports.RequestCheckTx.typeUrl || (o.tx instanceof Uint8Array || typeof o.tx === "string") && (0, helpers_1.isSet)(o.type));
    },
    encode(message, writer = binary_1.BinaryWriter.create()) {
        if (message.tx.length !== 0) {
            writer.uint32(10).bytes(message.tx);
        }
        if (message.type !== 0) {
            writer.uint32(16).int32(message.type);
        }
        return writer;
    },
    decode(input, length) {
        const reader = input instanceof binary_1.BinaryReader ? input : new binary_1.BinaryReader(input);
        let end = length === undefined ? reader.len : reader.pos + length;
        const message = createBaseRequestCheckTx();
        while (reader.pos < end) {
            const tag = reader.uint32();
            switch (tag >>> 3) {
                case 1:
                    message.tx = reader.bytes();
                    break;
                case 2:
                    message.type = reader.int32();
                    break;
                default:
                    reader.skipType(tag & 7);
                    break;
            }
        }
        return message;
    },
    fromPartial(object) {
        const message = createBaseRequestCheckTx();
        message.tx = object.tx ?? new Uint8Array();
        message.type = object.type ?? 0;
        return message;
    },
    fromAmino(object) {
        const message = createBaseRequestCheckTx();
        if (object.tx !== undefined && object.tx !== null) {
            message.tx = (0, helpers_1.bytesFromBase64)(object.tx);
        }
        if (object.type !== undefined && object.type !== null) {
            message.type = object.type;
        }
        return message;
    },
    toAmino(message) {
        const obj = {};
        obj.tx = message.tx ? (0, helpers_1.base64FromBytes)(message.tx) : undefined;
        obj.type = message.type === 0 ? undefined : message.type;
        return obj;
    },
    fromAminoMsg(object) {
        return exports.RequestCheckTx.fromAmino(object.value);
    },
    fromProtoMsg(message) {
        return exports.RequestCheckTx.decode(message.value);
    },
    toProto(message) {
        return exports.RequestCheckTx.encode(message).finish();
    },
    toProtoMsg(message) {
        return {
            typeUrl: "/tendermint.abci.RequestCheckTx",
            value: exports.RequestCheckTx.encode(message).finish()
        };
    }
};
registry_1.GlobalDecoderRegistry.register(exports.RequestCheckTx.typeUrl, exports.RequestCheckTx);
function createBaseRequestCommit() {
    return {};
}
exports.RequestCommit = {
    typeUrl: "/tendermint.abci.RequestCommit",
    is(o) {
        return o && o.$typeUrl === exports.RequestCommit.typeUrl;
    },
    isSDK(o) {
        return o && o.$typeUrl === exports.RequestCommit.typeUrl;
    },
    isAmino(o) {
        return o && o.$typeUrl === exports.RequestCommit.typeUrl;
    },
    encode(_, writer = binary_1.BinaryWriter.create()) {
        return writer;
    },
    decode(input, length) {
        const reader = input instanceof binary_1.BinaryReader ? input : new binary_1.BinaryReader(input);
        let end = length === undefined ? reader.len : reader.pos + length;
        const message = createBaseRequestCommit();
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
        const message = createBaseRequestCommit();
        return message;
    },
    fromAmino(_) {
        const message = createBaseRequestCommit();
        return message;
    },
    toAmino(_) {
        const obj = {};
        return obj;
    },
    fromAminoMsg(object) {
        return exports.RequestCommit.fromAmino(object.value);
    },
    fromProtoMsg(message) {
        return exports.RequestCommit.decode(message.value);
    },
    toProto(message) {
        return exports.RequestCommit.encode(message).finish();
    },
    toProtoMsg(message) {
        return {
            typeUrl: "/tendermint.abci.RequestCommit",
            value: exports.RequestCommit.encode(message).finish()
        };
    }
};
registry_1.GlobalDecoderRegistry.register(exports.RequestCommit.typeUrl, exports.RequestCommit);
function createBaseRequestListSnapshots() {
    return {};
}
exports.RequestListSnapshots = {
    typeUrl: "/tendermint.abci.RequestListSnapshots",
    is(o) {
        return o && o.$typeUrl === exports.RequestListSnapshots.typeUrl;
    },
    isSDK(o) {
        return o && o.$typeUrl === exports.RequestListSnapshots.typeUrl;
    },
    isAmino(o) {
        return o && o.$typeUrl === exports.RequestListSnapshots.typeUrl;
    },
    encode(_, writer = binary_1.BinaryWriter.create()) {
        return writer;
    },
    decode(input, length) {
        const reader = input instanceof binary_1.BinaryReader ? input : new binary_1.BinaryReader(input);
        let end = length === undefined ? reader.len : reader.pos + length;
        const message = createBaseRequestListSnapshots();
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
        const message = createBaseRequestListSnapshots();
        return message;
    },
    fromAmino(_) {
        const message = createBaseRequestListSnapshots();
        return message;
    },
    toAmino(_) {
        const obj = {};
        return obj;
    },
    fromAminoMsg(object) {
        return exports.RequestListSnapshots.fromAmino(object.value);
    },
    fromProtoMsg(message) {
        return exports.RequestListSnapshots.decode(message.value);
    },
    toProto(message) {
        return exports.RequestListSnapshots.encode(message).finish();
    },
    toProtoMsg(message) {
        return {
            typeUrl: "/tendermint.abci.RequestListSnapshots",
            value: exports.RequestListSnapshots.encode(message).finish()
        };
    }
};
registry_1.GlobalDecoderRegistry.register(exports.RequestListSnapshots.typeUrl, exports.RequestListSnapshots);
function createBaseRequestOfferSnapshot() {
    return {
        snapshot: undefined,
        appHash: new Uint8Array()
    };
}
exports.RequestOfferSnapshot = {
    typeUrl: "/tendermint.abci.RequestOfferSnapshot",
    is(o) {
        return o && (o.$typeUrl === exports.RequestOfferSnapshot.typeUrl || o.appHash instanceof Uint8Array || typeof o.appHash === "string");
    },
    isSDK(o) {
        return o && (o.$typeUrl === exports.RequestOfferSnapshot.typeUrl || o.app_hash instanceof Uint8Array || typeof o.app_hash === "string");
    },
    isAmino(o) {
        return o && (o.$typeUrl === exports.RequestOfferSnapshot.typeUrl || o.app_hash instanceof Uint8Array || typeof o.app_hash === "string");
    },
    encode(message, writer = binary_1.BinaryWriter.create()) {
        if (message.snapshot !== undefined) {
            exports.Snapshot.encode(message.snapshot, writer.uint32(10).fork()).ldelim();
        }
        if (message.appHash.length !== 0) {
            writer.uint32(18).bytes(message.appHash);
        }
        return writer;
    },
    decode(input, length) {
        const reader = input instanceof binary_1.BinaryReader ? input : new binary_1.BinaryReader(input);
        let end = length === undefined ? reader.len : reader.pos + length;
        const message = createBaseRequestOfferSnapshot();
        while (reader.pos < end) {
            const tag = reader.uint32();
            switch (tag >>> 3) {
                case 1:
                    message.snapshot = exports.Snapshot.decode(reader, reader.uint32());
                    break;
                case 2:
                    message.appHash = reader.bytes();
                    break;
                default:
                    reader.skipType(tag & 7);
                    break;
            }
        }
        return message;
    },
    fromPartial(object) {
        const message = createBaseRequestOfferSnapshot();
        message.snapshot = object.snapshot !== undefined && object.snapshot !== null ? exports.Snapshot.fromPartial(object.snapshot) : undefined;
        message.appHash = object.appHash ?? new Uint8Array();
        return message;
    },
    fromAmino(object) {
        const message = createBaseRequestOfferSnapshot();
        if (object.snapshot !== undefined && object.snapshot !== null) {
            message.snapshot = exports.Snapshot.fromAmino(object.snapshot);
        }
        if (object.app_hash !== undefined && object.app_hash !== null) {
            message.appHash = (0, helpers_1.bytesFromBase64)(object.app_hash);
        }
        return message;
    },
    toAmino(message) {
        const obj = {};
        obj.snapshot = message.snapshot ? exports.Snapshot.toAmino(message.snapshot) : undefined;
        obj.app_hash = message.appHash ? (0, helpers_1.base64FromBytes)(message.appHash) : undefined;
        return obj;
    },
    fromAminoMsg(object) {
        return exports.RequestOfferSnapshot.fromAmino(object.value);
    },
    fromProtoMsg(message) {
        return exports.RequestOfferSnapshot.decode(message.value);
    },
    toProto(message) {
        return exports.RequestOfferSnapshot.encode(message).finish();
    },
    toProtoMsg(message) {
        return {
            typeUrl: "/tendermint.abci.RequestOfferSnapshot",
            value: exports.RequestOfferSnapshot.encode(message).finish()
        };
    }
};
registry_1.GlobalDecoderRegistry.register(exports.RequestOfferSnapshot.typeUrl, exports.RequestOfferSnapshot);
function createBaseRequestLoadSnapshotChunk() {
    return {
        height: BigInt(0),
        format: 0,
        chunk: 0
    };
}
exports.RequestLoadSnapshotChunk = {
    typeUrl: "/tendermint.abci.RequestLoadSnapshotChunk",
    is(o) {
        return o && (o.$typeUrl === exports.RequestLoadSnapshotChunk.typeUrl || typeof o.height === "bigint" && typeof o.format === "number" && typeof o.chunk === "number");
    },
    isSDK(o) {
        return o && (o.$typeUrl === exports.RequestLoadSnapshotChunk.typeUrl || typeof o.height === "bigint" && typeof o.format === "number" && typeof o.chunk === "number");
    },
    isAmino(o) {
        return o && (o.$typeUrl === exports.RequestLoadSnapshotChunk.typeUrl || typeof o.height === "bigint" && typeof o.format === "number" && typeof o.chunk === "number");
    },
    encode(message, writer = binary_1.BinaryWriter.create()) {
        if (message.height !== BigInt(0)) {
            writer.uint32(8).uint64(message.height);
        }
        if (message.format !== 0) {
            writer.uint32(16).uint32(message.format);
        }
        if (message.chunk !== 0) {
            writer.uint32(24).uint32(message.chunk);
        }
        return writer;
    },
    decode(input, length) {
        const reader = input instanceof binary_1.BinaryReader ? input : new binary_1.BinaryReader(input);
        let end = length === undefined ? reader.len : reader.pos + length;
        const message = createBaseRequestLoadSnapshotChunk();
        while (reader.pos < end) {
            const tag = reader.uint32();
            switch (tag >>> 3) {
                case 1:
                    message.height = reader.uint64();
                    break;
                case 2:
                    message.format = reader.uint32();
                    break;
                case 3:
                    message.chunk = reader.uint32();
                    break;
                default:
                    reader.skipType(tag & 7);
                    break;
            }
        }
        return message;
    },
    fromPartial(object) {
        const message = createBaseRequestLoadSnapshotChunk();
        message.height = object.height !== undefined && object.height !== null ? BigInt(object.height.toString()) : BigInt(0);
        message.format = object.format ?? 0;
        message.chunk = object.chunk ?? 0;
        return message;
    },
    fromAmino(object) {
        const message = createBaseRequestLoadSnapshotChunk();
        if (object.height !== undefined && object.height !== null) {
            message.height = BigInt(object.height);
        }
        if (object.format !== undefined && object.format !== null) {
            message.format = object.format;
        }
        if (object.chunk !== undefined && object.chunk !== null) {
            message.chunk = object.chunk;
        }
        return message;
    },
    toAmino(message) {
        const obj = {};
        obj.height = message.height !== BigInt(0) ? message.height?.toString() : undefined;
        obj.format = message.format === 0 ? undefined : message.format;
        obj.chunk = message.chunk === 0 ? undefined : message.chunk;
        return obj;
    },
    fromAminoMsg(object) {
        return exports.RequestLoadSnapshotChunk.fromAmino(object.value);
    },
    fromProtoMsg(message) {
        return exports.RequestLoadSnapshotChunk.decode(message.value);
    },
    toProto(message) {
        return exports.RequestLoadSnapshotChunk.encode(message).finish();
    },
    toProtoMsg(message) {
        return {
            typeUrl: "/tendermint.abci.RequestLoadSnapshotChunk",
            value: exports.RequestLoadSnapshotChunk.encode(message).finish()
        };
    }
};
registry_1.GlobalDecoderRegistry.register(exports.RequestLoadSnapshotChunk.typeUrl, exports.RequestLoadSnapshotChunk);
function createBaseRequestApplySnapshotChunk() {
    return {
        index: 0,
        chunk: new Uint8Array(),
        sender: ""
    };
}
exports.RequestApplySnapshotChunk = {
    typeUrl: "/tendermint.abci.RequestApplySnapshotChunk",
    is(o) {
        return o && (o.$typeUrl === exports.RequestApplySnapshotChunk.typeUrl || typeof o.index === "number" && (o.chunk instanceof Uint8Array || typeof o.chunk === "string") && typeof o.sender === "string");
    },
    isSDK(o) {
        return o && (o.$typeUrl === exports.RequestApplySnapshotChunk.typeUrl || typeof o.index === "number" && (o.chunk instanceof Uint8Array || typeof o.chunk === "string") && typeof o.sender === "string");
    },
    isAmino(o) {
        return o && (o.$typeUrl === exports.RequestApplySnapshotChunk.typeUrl || typeof o.index === "number" && (o.chunk instanceof Uint8Array || typeof o.chunk === "string") && typeof o.sender === "string");
    },
    encode(message, writer = binary_1.BinaryWriter.create()) {
        if (message.index !== 0) {
            writer.uint32(8).uint32(message.index);
        }
        if (message.chunk.length !== 0) {
            writer.uint32(18).bytes(message.chunk);
        }
        if (message.sender !== "") {
            writer.uint32(26).string(message.sender);
        }
        return writer;
    },
    decode(input, length) {
        const reader = input instanceof binary_1.BinaryReader ? input : new binary_1.BinaryReader(input);
        let end = length === undefined ? reader.len : reader.pos + length;
        const message = createBaseRequestApplySnapshotChunk();
        while (reader.pos < end) {
            const tag = reader.uint32();
            switch (tag >>> 3) {
                case 1:
                    message.index = reader.uint32();
                    break;
                case 2:
                    message.chunk = reader.bytes();
                    break;
                case 3:
                    message.sender = reader.string();
                    break;
                default:
                    reader.skipType(tag & 7);
                    break;
            }
        }
        return message;
    },
    fromPartial(object) {
        const message = createBaseRequestApplySnapshotChunk();
        message.index = object.index ?? 0;
        message.chunk = object.chunk ?? new Uint8Array();
        message.sender = object.sender ?? "";
        return message;
    },
    fromAmino(object) {
        const message = createBaseRequestApplySnapshotChunk();
        if (object.index !== undefined && object.index !== null) {
            message.index = object.index;
        }
        if (object.chunk !== undefined && object.chunk !== null) {
            message.chunk = (0, helpers_1.bytesFromBase64)(object.chunk);
        }
        if (object.sender !== undefined && object.sender !== null) {
            message.sender = object.sender;
        }
        return message;
    },
    toAmino(message) {
        const obj = {};
        obj.index = message.index === 0 ? undefined : message.index;
        obj.chunk = message.chunk ? (0, helpers_1.base64FromBytes)(message.chunk) : undefined;
        obj.sender = message.sender === "" ? undefined : message.sender;
        return obj;
    },
    fromAminoMsg(object) {
        return exports.RequestApplySnapshotChunk.fromAmino(object.value);
    },
    fromProtoMsg(message) {
        return exports.RequestApplySnapshotChunk.decode(message.value);
    },
    toProto(message) {
        return exports.RequestApplySnapshotChunk.encode(message).finish();
    },
    toProtoMsg(message) {
        return {
            typeUrl: "/tendermint.abci.RequestApplySnapshotChunk",
            value: exports.RequestApplySnapshotChunk.encode(message).finish()
        };
    }
};
registry_1.GlobalDecoderRegistry.register(exports.RequestApplySnapshotChunk.typeUrl, exports.RequestApplySnapshotChunk);
function createBaseRequestPrepareProposal() {
    return {
        maxTxBytes: BigInt(0),
        txs: [],
        localLastCommit: exports.ExtendedCommitInfo.fromPartial({}),
        misbehavior: [],
        height: BigInt(0),
        time: new Date(),
        nextValidatorsHash: new Uint8Array(),
        proposerAddress: new Uint8Array()
    };
}
exports.RequestPrepareProposal = {
    typeUrl: "/tendermint.abci.RequestPrepareProposal",
    is(o) {
        return o && (o.$typeUrl === exports.RequestPrepareProposal.typeUrl || typeof o.maxTxBytes === "bigint" && Array.isArray(o.txs) && (!o.txs.length || o.txs[0] instanceof Uint8Array || typeof o.txs[0] === "string") && exports.ExtendedCommitInfo.is(o.localLastCommit) && Array.isArray(o.misbehavior) && (!o.misbehavior.length || exports.Misbehavior.is(o.misbehavior[0])) && typeof o.height === "bigint" && timestamp_1.Timestamp.is(o.time) && (o.nextValidatorsHash instanceof Uint8Array || typeof o.nextValidatorsHash === "string") && (o.proposerAddress instanceof Uint8Array || typeof o.proposerAddress === "string"));
    },
    isSDK(o) {
        return o && (o.$typeUrl === exports.RequestPrepareProposal.typeUrl || typeof o.max_tx_bytes === "bigint" && Array.isArray(o.txs) && (!o.txs.length || o.txs[0] instanceof Uint8Array || typeof o.txs[0] === "string") && exports.ExtendedCommitInfo.isSDK(o.local_last_commit) && Array.isArray(o.misbehavior) && (!o.misbehavior.length || exports.Misbehavior.isSDK(o.misbehavior[0])) && typeof o.height === "bigint" && timestamp_1.Timestamp.isSDK(o.time) && (o.next_validators_hash instanceof Uint8Array || typeof o.next_validators_hash === "string") && (o.proposer_address instanceof Uint8Array || typeof o.proposer_address === "string"));
    },
    isAmino(o) {
        return o && (o.$typeUrl === exports.RequestPrepareProposal.typeUrl || typeof o.max_tx_bytes === "bigint" && Array.isArray(o.txs) && (!o.txs.length || o.txs[0] instanceof Uint8Array || typeof o.txs[0] === "string") && exports.ExtendedCommitInfo.isAmino(o.local_last_commit) && Array.isArray(o.misbehavior) && (!o.misbehavior.length || exports.Misbehavior.isAmino(o.misbehavior[0])) && typeof o.height === "bigint" && timestamp_1.Timestamp.isAmino(o.time) && (o.next_validators_hash instanceof Uint8Array || typeof o.next_validators_hash === "string") && (o.proposer_address instanceof Uint8Array || typeof o.proposer_address === "string"));
    },
    encode(message, writer = binary_1.BinaryWriter.create()) {
        if (message.maxTxBytes !== BigInt(0)) {
            writer.uint32(8).int64(message.maxTxBytes);
        }
        for (const v of message.txs) {
            writer.uint32(18).bytes(v);
        }
        if (message.localLastCommit !== undefined) {
            exports.ExtendedCommitInfo.encode(message.localLastCommit, writer.uint32(26).fork()).ldelim();
        }
        for (const v of message.misbehavior) {
            exports.Misbehavior.encode(v, writer.uint32(34).fork()).ldelim();
        }
        if (message.height !== BigInt(0)) {
            writer.uint32(40).int64(message.height);
        }
        if (message.time !== undefined) {
            timestamp_1.Timestamp.encode((0, helpers_1.toTimestamp)(message.time), writer.uint32(50).fork()).ldelim();
        }
        if (message.nextValidatorsHash.length !== 0) {
            writer.uint32(58).bytes(message.nextValidatorsHash);
        }
        if (message.proposerAddress.length !== 0) {
            writer.uint32(66).bytes(message.proposerAddress);
        }
        return writer;
    },
    decode(input, length) {
        const reader = input instanceof binary_1.BinaryReader ? input : new binary_1.BinaryReader(input);
        let end = length === undefined ? reader.len : reader.pos + length;
        const message = createBaseRequestPrepareProposal();
        while (reader.pos < end) {
            const tag = reader.uint32();
            switch (tag >>> 3) {
                case 1:
                    message.maxTxBytes = reader.int64();
                    break;
                case 2:
                    message.txs.push(reader.bytes());
                    break;
                case 3:
                    message.localLastCommit = exports.ExtendedCommitInfo.decode(reader, reader.uint32());
                    break;
                case 4:
                    message.misbehavior.push(exports.Misbehavior.decode(reader, reader.uint32()));
                    break;
                case 5:
                    message.height = reader.int64();
                    break;
                case 6:
                    message.time = (0, helpers_1.fromTimestamp)(timestamp_1.Timestamp.decode(reader, reader.uint32()));
                    break;
                case 7:
                    message.nextValidatorsHash = reader.bytes();
                    break;
                case 8:
                    message.proposerAddress = reader.bytes();
                    break;
                default:
                    reader.skipType(tag & 7);
                    break;
            }
        }
        return message;
    },
    fromPartial(object) {
        const message = createBaseRequestPrepareProposal();
        message.maxTxBytes = object.maxTxBytes !== undefined && object.maxTxBytes !== null ? BigInt(object.maxTxBytes.toString()) : BigInt(0);
        message.txs = object.txs?.map(e => e) || [];
        message.localLastCommit = object.localLastCommit !== undefined && object.localLastCommit !== null ? exports.ExtendedCommitInfo.fromPartial(object.localLastCommit) : undefined;
        message.misbehavior = object.misbehavior?.map(e => exports.Misbehavior.fromPartial(e)) || [];
        message.height = object.height !== undefined && object.height !== null ? BigInt(object.height.toString()) : BigInt(0);
        message.time = object.time ?? undefined;
        message.nextValidatorsHash = object.nextValidatorsHash ?? new Uint8Array();
        message.proposerAddress = object.proposerAddress ?? new Uint8Array();
        return message;
    },
    fromAmino(object) {
        const message = createBaseRequestPrepareProposal();
        if (object.max_tx_bytes !== undefined && object.max_tx_bytes !== null) {
            message.maxTxBytes = BigInt(object.max_tx_bytes);
        }
        message.txs = object.txs?.map(e => (0, helpers_1.bytesFromBase64)(e)) || [];
        if (object.local_last_commit !== undefined && object.local_last_commit !== null) {
            message.localLastCommit = exports.ExtendedCommitInfo.fromAmino(object.local_last_commit);
        }
        message.misbehavior = object.misbehavior?.map(e => exports.Misbehavior.fromAmino(e)) || [];
        if (object.height !== undefined && object.height !== null) {
            message.height = BigInt(object.height);
        }
        if (object.time !== undefined && object.time !== null) {
            message.time = (0, helpers_1.fromTimestamp)(timestamp_1.Timestamp.fromAmino(object.time));
        }
        if (object.next_validators_hash !== undefined && object.next_validators_hash !== null) {
            message.nextValidatorsHash = (0, helpers_1.bytesFromBase64)(object.next_validators_hash);
        }
        if (object.proposer_address !== undefined && object.proposer_address !== null) {
            message.proposerAddress = (0, helpers_1.bytesFromBase64)(object.proposer_address);
        }
        return message;
    },
    toAmino(message) {
        const obj = {};
        obj.max_tx_bytes = message.maxTxBytes !== BigInt(0) ? message.maxTxBytes?.toString() : undefined;
        if (message.txs) {
            obj.txs = message.txs.map(e => (0, helpers_1.base64FromBytes)(e));
        }
        else {
            obj.txs = message.txs;
        }
        obj.local_last_commit = message.localLastCommit ? exports.ExtendedCommitInfo.toAmino(message.localLastCommit) : undefined;
        if (message.misbehavior) {
            obj.misbehavior = message.misbehavior.map(e => e ? exports.Misbehavior.toAmino(e) : undefined);
        }
        else {
            obj.misbehavior = message.misbehavior;
        }
        obj.height = message.height !== BigInt(0) ? message.height?.toString() : undefined;
        obj.time = message.time ? timestamp_1.Timestamp.toAmino((0, helpers_1.toTimestamp)(message.time)) : undefined;
        obj.next_validators_hash = message.nextValidatorsHash ? (0, helpers_1.base64FromBytes)(message.nextValidatorsHash) : undefined;
        obj.proposer_address = message.proposerAddress ? (0, helpers_1.base64FromBytes)(message.proposerAddress) : undefined;
        return obj;
    },
    fromAminoMsg(object) {
        return exports.RequestPrepareProposal.fromAmino(object.value);
    },
    fromProtoMsg(message) {
        return exports.RequestPrepareProposal.decode(message.value);
    },
    toProto(message) {
        return exports.RequestPrepareProposal.encode(message).finish();
    },
    toProtoMsg(message) {
        return {
            typeUrl: "/tendermint.abci.RequestPrepareProposal",
            value: exports.RequestPrepareProposal.encode(message).finish()
        };
    }
};
registry_1.GlobalDecoderRegistry.register(exports.RequestPrepareProposal.typeUrl, exports.RequestPrepareProposal);
function createBaseRequestProcessProposal() {
    return {
        txs: [],
        proposedLastCommit: exports.CommitInfo.fromPartial({}),
        misbehavior: [],
        hash: new Uint8Array(),
        height: BigInt(0),
        time: new Date(),
        nextValidatorsHash: new Uint8Array(),
        proposerAddress: new Uint8Array()
    };
}
exports.RequestProcessProposal = {
    typeUrl: "/tendermint.abci.RequestProcessProposal",
    is(o) {
        return o && (o.$typeUrl === exports.RequestProcessProposal.typeUrl || Array.isArray(o.txs) && (!o.txs.length || o.txs[0] instanceof Uint8Array || typeof o.txs[0] === "string") && exports.CommitInfo.is(o.proposedLastCommit) && Array.isArray(o.misbehavior) && (!o.misbehavior.length || exports.Misbehavior.is(o.misbehavior[0])) && (o.hash instanceof Uint8Array || typeof o.hash === "string") && typeof o.height === "bigint" && timestamp_1.Timestamp.is(o.time) && (o.nextValidatorsHash instanceof Uint8Array || typeof o.nextValidatorsHash === "string") && (o.proposerAddress instanceof Uint8Array || typeof o.proposerAddress === "string"));
    },
    isSDK(o) {
        return o && (o.$typeUrl === exports.RequestProcessProposal.typeUrl || Array.isArray(o.txs) && (!o.txs.length || o.txs[0] instanceof Uint8Array || typeof o.txs[0] === "string") && exports.CommitInfo.isSDK(o.proposed_last_commit) && Array.isArray(o.misbehavior) && (!o.misbehavior.length || exports.Misbehavior.isSDK(o.misbehavior[0])) && (o.hash instanceof Uint8Array || typeof o.hash === "string") && typeof o.height === "bigint" && timestamp_1.Timestamp.isSDK(o.time) && (o.next_validators_hash instanceof Uint8Array || typeof o.next_validators_hash === "string") && (o.proposer_address instanceof Uint8Array || typeof o.proposer_address === "string"));
    },
    isAmino(o) {
        return o && (o.$typeUrl === exports.RequestProcessProposal.typeUrl || Array.isArray(o.txs) && (!o.txs.length || o.txs[0] instanceof Uint8Array || typeof o.txs[0] === "string") && exports.CommitInfo.isAmino(o.proposed_last_commit) && Array.isArray(o.misbehavior) && (!o.misbehavior.length || exports.Misbehavior.isAmino(o.misbehavior[0])) && (o.hash instanceof Uint8Array || typeof o.hash === "string") && typeof o.height === "bigint" && timestamp_1.Timestamp.isAmino(o.time) && (o.next_validators_hash instanceof Uint8Array || typeof o.next_validators_hash === "string") && (o.proposer_address instanceof Uint8Array || typeof o.proposer_address === "string"));
    },
    encode(message, writer = binary_1.BinaryWriter.create()) {
        for (const v of message.txs) {
            writer.uint32(10).bytes(v);
        }
        if (message.proposedLastCommit !== undefined) {
            exports.CommitInfo.encode(message.proposedLastCommit, writer.uint32(18).fork()).ldelim();
        }
        for (const v of message.misbehavior) {
            exports.Misbehavior.encode(v, writer.uint32(26).fork()).ldelim();
        }
        if (message.hash.length !== 0) {
            writer.uint32(34).bytes(message.hash);
        }
        if (message.height !== BigInt(0)) {
            writer.uint32(40).int64(message.height);
        }
        if (message.time !== undefined) {
            timestamp_1.Timestamp.encode((0, helpers_1.toTimestamp)(message.time), writer.uint32(50).fork()).ldelim();
        }
        if (message.nextValidatorsHash.length !== 0) {
            writer.uint32(58).bytes(message.nextValidatorsHash);
        }
        if (message.proposerAddress.length !== 0) {
            writer.uint32(66).bytes(message.proposerAddress);
        }
        return writer;
    },
    decode(input, length) {
        const reader = input instanceof binary_1.BinaryReader ? input : new binary_1.BinaryReader(input);
        let end = length === undefined ? reader.len : reader.pos + length;
        const message = createBaseRequestProcessProposal();
        while (reader.pos < end) {
            const tag = reader.uint32();
            switch (tag >>> 3) {
                case 1:
                    message.txs.push(reader.bytes());
                    break;
                case 2:
                    message.proposedLastCommit = exports.CommitInfo.decode(reader, reader.uint32());
                    break;
                case 3:
                    message.misbehavior.push(exports.Misbehavior.decode(reader, reader.uint32()));
                    break;
                case 4:
                    message.hash = reader.bytes();
                    break;
                case 5:
                    message.height = reader.int64();
                    break;
                case 6:
                    message.time = (0, helpers_1.fromTimestamp)(timestamp_1.Timestamp.decode(reader, reader.uint32()));
                    break;
                case 7:
                    message.nextValidatorsHash = reader.bytes();
                    break;
                case 8:
                    message.proposerAddress = reader.bytes();
                    break;
                default:
                    reader.skipType(tag & 7);
                    break;
            }
        }
        return message;
    },
    fromPartial(object) {
        const message = createBaseRequestProcessProposal();
        message.txs = object.txs?.map(e => e) || [];
        message.proposedLastCommit = object.proposedLastCommit !== undefined && object.proposedLastCommit !== null ? exports.CommitInfo.fromPartial(object.proposedLastCommit) : undefined;
        message.misbehavior = object.misbehavior?.map(e => exports.Misbehavior.fromPartial(e)) || [];
        message.hash = object.hash ?? new Uint8Array();
        message.height = object.height !== undefined && object.height !== null ? BigInt(object.height.toString()) : BigInt(0);
        message.time = object.time ?? undefined;
        message.nextValidatorsHash = object.nextValidatorsHash ?? new Uint8Array();
        message.proposerAddress = object.proposerAddress ?? new Uint8Array();
        return message;
    },
    fromAmino(object) {
        const message = createBaseRequestProcessProposal();
        message.txs = object.txs?.map(e => (0, helpers_1.bytesFromBase64)(e)) || [];
        if (object.proposed_last_commit !== undefined && object.proposed_last_commit !== null) {
            message.proposedLastCommit = exports.CommitInfo.fromAmino(object.proposed_last_commit);
        }
        message.misbehavior = object.misbehavior?.map(e => exports.Misbehavior.fromAmino(e)) || [];
        if (object.hash !== undefined && object.hash !== null) {
            message.hash = (0, helpers_1.bytesFromBase64)(object.hash);
        }
        if (object.height !== undefined && object.height !== null) {
            message.height = BigInt(object.height);
        }
        if (object.time !== undefined && object.time !== null) {
            message.time = (0, helpers_1.fromTimestamp)(timestamp_1.Timestamp.fromAmino(object.time));
        }
        if (object.next_validators_hash !== undefined && object.next_validators_hash !== null) {
            message.nextValidatorsHash = (0, helpers_1.bytesFromBase64)(object.next_validators_hash);
        }
        if (object.proposer_address !== undefined && object.proposer_address !== null) {
            message.proposerAddress = (0, helpers_1.bytesFromBase64)(object.proposer_address);
        }
        return message;
    },
    toAmino(message) {
        const obj = {};
        if (message.txs) {
            obj.txs = message.txs.map(e => (0, helpers_1.base64FromBytes)(e));
        }
        else {
            obj.txs = message.txs;
        }
        obj.proposed_last_commit = message.proposedLastCommit ? exports.CommitInfo.toAmino(message.proposedLastCommit) : undefined;
        if (message.misbehavior) {
            obj.misbehavior = message.misbehavior.map(e => e ? exports.Misbehavior.toAmino(e) : undefined);
        }
        else {
            obj.misbehavior = message.misbehavior;
        }
        obj.hash = message.hash ? (0, helpers_1.base64FromBytes)(message.hash) : undefined;
        obj.height = message.height !== BigInt(0) ? message.height?.toString() : undefined;
        obj.time = message.time ? timestamp_1.Timestamp.toAmino((0, helpers_1.toTimestamp)(message.time)) : undefined;
        obj.next_validators_hash = message.nextValidatorsHash ? (0, helpers_1.base64FromBytes)(message.nextValidatorsHash) : undefined;
        obj.proposer_address = message.proposerAddress ? (0, helpers_1.base64FromBytes)(message.proposerAddress) : undefined;
        return obj;
    },
    fromAminoMsg(object) {
        return exports.RequestProcessProposal.fromAmino(object.value);
    },
    fromProtoMsg(message) {
        return exports.RequestProcessProposal.decode(message.value);
    },
    toProto(message) {
        return exports.RequestProcessProposal.encode(message).finish();
    },
    toProtoMsg(message) {
        return {
            typeUrl: "/tendermint.abci.RequestProcessProposal",
            value: exports.RequestProcessProposal.encode(message).finish()
        };
    }
};
registry_1.GlobalDecoderRegistry.register(exports.RequestProcessProposal.typeUrl, exports.RequestProcessProposal);
function createBaseRequestExtendVote() {
    return {
        hash: new Uint8Array(),
        height: BigInt(0),
        time: new Date(),
        txs: [],
        proposedLastCommit: exports.CommitInfo.fromPartial({}),
        misbehavior: [],
        nextValidatorsHash: new Uint8Array(),
        proposerAddress: new Uint8Array()
    };
}
exports.RequestExtendVote = {
    typeUrl: "/tendermint.abci.RequestExtendVote",
    is(o) {
        return o && (o.$typeUrl === exports.RequestExtendVote.typeUrl || (o.hash instanceof Uint8Array || typeof o.hash === "string") && typeof o.height === "bigint" && timestamp_1.Timestamp.is(o.time) && Array.isArray(o.txs) && (!o.txs.length || o.txs[0] instanceof Uint8Array || typeof o.txs[0] === "string") && exports.CommitInfo.is(o.proposedLastCommit) && Array.isArray(o.misbehavior) && (!o.misbehavior.length || exports.Misbehavior.is(o.misbehavior[0])) && (o.nextValidatorsHash instanceof Uint8Array || typeof o.nextValidatorsHash === "string") && (o.proposerAddress instanceof Uint8Array || typeof o.proposerAddress === "string"));
    },
    isSDK(o) {
        return o && (o.$typeUrl === exports.RequestExtendVote.typeUrl || (o.hash instanceof Uint8Array || typeof o.hash === "string") && typeof o.height === "bigint" && timestamp_1.Timestamp.isSDK(o.time) && Array.isArray(o.txs) && (!o.txs.length || o.txs[0] instanceof Uint8Array || typeof o.txs[0] === "string") && exports.CommitInfo.isSDK(o.proposed_last_commit) && Array.isArray(o.misbehavior) && (!o.misbehavior.length || exports.Misbehavior.isSDK(o.misbehavior[0])) && (o.next_validators_hash instanceof Uint8Array || typeof o.next_validators_hash === "string") && (o.proposer_address instanceof Uint8Array || typeof o.proposer_address === "string"));
    },
    isAmino(o) {
        return o && (o.$typeUrl === exports.RequestExtendVote.typeUrl || (o.hash instanceof Uint8Array || typeof o.hash === "string") && typeof o.height === "bigint" && timestamp_1.Timestamp.isAmino(o.time) && Array.isArray(o.txs) && (!o.txs.length || o.txs[0] instanceof Uint8Array || typeof o.txs[0] === "string") && exports.CommitInfo.isAmino(o.proposed_last_commit) && Array.isArray(o.misbehavior) && (!o.misbehavior.length || exports.Misbehavior.isAmino(o.misbehavior[0])) && (o.next_validators_hash instanceof Uint8Array || typeof o.next_validators_hash === "string") && (o.proposer_address instanceof Uint8Array || typeof o.proposer_address === "string"));
    },
    encode(message, writer = binary_1.BinaryWriter.create()) {
        if (message.hash.length !== 0) {
            writer.uint32(10).bytes(message.hash);
        }
        if (message.height !== BigInt(0)) {
            writer.uint32(16).int64(message.height);
        }
        if (message.time !== undefined) {
            timestamp_1.Timestamp.encode((0, helpers_1.toTimestamp)(message.time), writer.uint32(26).fork()).ldelim();
        }
        for (const v of message.txs) {
            writer.uint32(34).bytes(v);
        }
        if (message.proposedLastCommit !== undefined) {
            exports.CommitInfo.encode(message.proposedLastCommit, writer.uint32(42).fork()).ldelim();
        }
        for (const v of message.misbehavior) {
            exports.Misbehavior.encode(v, writer.uint32(50).fork()).ldelim();
        }
        if (message.nextValidatorsHash.length !== 0) {
            writer.uint32(58).bytes(message.nextValidatorsHash);
        }
        if (message.proposerAddress.length !== 0) {
            writer.uint32(66).bytes(message.proposerAddress);
        }
        return writer;
    },
    decode(input, length) {
        const reader = input instanceof binary_1.BinaryReader ? input : new binary_1.BinaryReader(input);
        let end = length === undefined ? reader.len : reader.pos + length;
        const message = createBaseRequestExtendVote();
        while (reader.pos < end) {
            const tag = reader.uint32();
            switch (tag >>> 3) {
                case 1:
                    message.hash = reader.bytes();
                    break;
                case 2:
                    message.height = reader.int64();
                    break;
                case 3:
                    message.time = (0, helpers_1.fromTimestamp)(timestamp_1.Timestamp.decode(reader, reader.uint32()));
                    break;
                case 4:
                    message.txs.push(reader.bytes());
                    break;
                case 5:
                    message.proposedLastCommit = exports.CommitInfo.decode(reader, reader.uint32());
                    break;
                case 6:
                    message.misbehavior.push(exports.Misbehavior.decode(reader, reader.uint32()));
                    break;
                case 7:
                    message.nextValidatorsHash = reader.bytes();
                    break;
                case 8:
                    message.proposerAddress = reader.bytes();
                    break;
                default:
                    reader.skipType(tag & 7);
                    break;
            }
        }
        return message;
    },
    fromPartial(object) {
        const message = createBaseRequestExtendVote();
        message.hash = object.hash ?? new Uint8Array();
        message.height = object.height !== undefined && object.height !== null ? BigInt(object.height.toString()) : BigInt(0);
        message.time = object.time ?? undefined;
        message.txs = object.txs?.map(e => e) || [];
        message.proposedLastCommit = object.proposedLastCommit !== undefined && object.proposedLastCommit !== null ? exports.CommitInfo.fromPartial(object.proposedLastCommit) : undefined;
        message.misbehavior = object.misbehavior?.map(e => exports.Misbehavior.fromPartial(e)) || [];
        message.nextValidatorsHash = object.nextValidatorsHash ?? new Uint8Array();
        message.proposerAddress = object.proposerAddress ?? new Uint8Array();
        return message;
    },
    fromAmino(object) {
        const message = createBaseRequestExtendVote();
        if (object.hash !== undefined && object.hash !== null) {
            message.hash = (0, helpers_1.bytesFromBase64)(object.hash);
        }
        if (object.height !== undefined && object.height !== null) {
            message.height = BigInt(object.height);
        }
        if (object.time !== undefined && object.time !== null) {
            message.time = (0, helpers_1.fromTimestamp)(timestamp_1.Timestamp.fromAmino(object.time));
        }
        message.txs = object.txs?.map(e => (0, helpers_1.bytesFromBase64)(e)) || [];
        if (object.proposed_last_commit !== undefined && object.proposed_last_commit !== null) {
            message.proposedLastCommit = exports.CommitInfo.fromAmino(object.proposed_last_commit);
        }
        message.misbehavior = object.misbehavior?.map(e => exports.Misbehavior.fromAmino(e)) || [];
        if (object.next_validators_hash !== undefined && object.next_validators_hash !== null) {
            message.nextValidatorsHash = (0, helpers_1.bytesFromBase64)(object.next_validators_hash);
        }
        if (object.proposer_address !== undefined && object.proposer_address !== null) {
            message.proposerAddress = (0, helpers_1.bytesFromBase64)(object.proposer_address);
        }
        return message;
    },
    toAmino(message) {
        const obj = {};
        obj.hash = message.hash ? (0, helpers_1.base64FromBytes)(message.hash) : undefined;
        obj.height = message.height !== BigInt(0) ? message.height?.toString() : undefined;
        obj.time = message.time ? timestamp_1.Timestamp.toAmino((0, helpers_1.toTimestamp)(message.time)) : undefined;
        if (message.txs) {
            obj.txs = message.txs.map(e => (0, helpers_1.base64FromBytes)(e));
        }
        else {
            obj.txs = message.txs;
        }
        obj.proposed_last_commit = message.proposedLastCommit ? exports.CommitInfo.toAmino(message.proposedLastCommit) : undefined;
        if (message.misbehavior) {
            obj.misbehavior = message.misbehavior.map(e => e ? exports.Misbehavior.toAmino(e) : undefined);
        }
        else {
            obj.misbehavior = message.misbehavior;
        }
        obj.next_validators_hash = message.nextValidatorsHash ? (0, helpers_1.base64FromBytes)(message.nextValidatorsHash) : undefined;
        obj.proposer_address = message.proposerAddress ? (0, helpers_1.base64FromBytes)(message.proposerAddress) : undefined;
        return obj;
    },
    fromAminoMsg(object) {
        return exports.RequestExtendVote.fromAmino(object.value);
    },
    fromProtoMsg(message) {
        return exports.RequestExtendVote.decode(message.value);
    },
    toProto(message) {
        return exports.RequestExtendVote.encode(message).finish();
    },
    toProtoMsg(message) {
        return {
            typeUrl: "/tendermint.abci.RequestExtendVote",
            value: exports.RequestExtendVote.encode(message).finish()
        };
    }
};
registry_1.GlobalDecoderRegistry.register(exports.RequestExtendVote.typeUrl, exports.RequestExtendVote);
function createBaseRequestVerifyVoteExtension() {
    return {
        hash: new Uint8Array(),
        validatorAddress: new Uint8Array(),
        height: BigInt(0),
        voteExtension: new Uint8Array()
    };
}
exports.RequestVerifyVoteExtension = {
    typeUrl: "/tendermint.abci.RequestVerifyVoteExtension",
    is(o) {
        return o && (o.$typeUrl === exports.RequestVerifyVoteExtension.typeUrl || (o.hash instanceof Uint8Array || typeof o.hash === "string") && (o.validatorAddress instanceof Uint8Array || typeof o.validatorAddress === "string") && typeof o.height === "bigint" && (o.voteExtension instanceof Uint8Array || typeof o.voteExtension === "string"));
    },
    isSDK(o) {
        return o && (o.$typeUrl === exports.RequestVerifyVoteExtension.typeUrl || (o.hash instanceof Uint8Array || typeof o.hash === "string") && (o.validator_address instanceof Uint8Array || typeof o.validator_address === "string") && typeof o.height === "bigint" && (o.vote_extension instanceof Uint8Array || typeof o.vote_extension === "string"));
    },
    isAmino(o) {
        return o && (o.$typeUrl === exports.RequestVerifyVoteExtension.typeUrl || (o.hash instanceof Uint8Array || typeof o.hash === "string") && (o.validator_address instanceof Uint8Array || typeof o.validator_address === "string") && typeof o.height === "bigint" && (o.vote_extension instanceof Uint8Array || typeof o.vote_extension === "string"));
    },
    encode(message, writer = binary_1.BinaryWriter.create()) {
        if (message.hash.length !== 0) {
            writer.uint32(10).bytes(message.hash);
        }
        if (message.validatorAddress.length !== 0) {
            writer.uint32(18).bytes(message.validatorAddress);
        }
        if (message.height !== BigInt(0)) {
            writer.uint32(24).int64(message.height);
        }
        if (message.voteExtension.length !== 0) {
            writer.uint32(34).bytes(message.voteExtension);
        }
        return writer;
    },
    decode(input, length) {
        const reader = input instanceof binary_1.BinaryReader ? input : new binary_1.BinaryReader(input);
        let end = length === undefined ? reader.len : reader.pos + length;
        const message = createBaseRequestVerifyVoteExtension();
        while (reader.pos < end) {
            const tag = reader.uint32();
            switch (tag >>> 3) {
                case 1:
                    message.hash = reader.bytes();
                    break;
                case 2:
                    message.validatorAddress = reader.bytes();
                    break;
                case 3:
                    message.height = reader.int64();
                    break;
                case 4:
                    message.voteExtension = reader.bytes();
                    break;
                default:
                    reader.skipType(tag & 7);
                    break;
            }
        }
        return message;
    },
    fromPartial(object) {
        const message = createBaseRequestVerifyVoteExtension();
        message.hash = object.hash ?? new Uint8Array();
        message.validatorAddress = object.validatorAddress ?? new Uint8Array();
        message.height = object.height !== undefined && object.height !== null ? BigInt(object.height.toString()) : BigInt(0);
        message.voteExtension = object.voteExtension ?? new Uint8Array();
        return message;
    },
    fromAmino(object) {
        const message = createBaseRequestVerifyVoteExtension();
        if (object.hash !== undefined && object.hash !== null) {
            message.hash = (0, helpers_1.bytesFromBase64)(object.hash);
        }
        if (object.validator_address !== undefined && object.validator_address !== null) {
            message.validatorAddress = (0, helpers_1.bytesFromBase64)(object.validator_address);
        }
        if (object.height !== undefined && object.height !== null) {
            message.height = BigInt(object.height);
        }
        if (object.vote_extension !== undefined && object.vote_extension !== null) {
            message.voteExtension = (0, helpers_1.bytesFromBase64)(object.vote_extension);
        }
        return message;
    },
    toAmino(message) {
        const obj = {};
        obj.hash = message.hash ? (0, helpers_1.base64FromBytes)(message.hash) : undefined;
        obj.validator_address = message.validatorAddress ? (0, helpers_1.base64FromBytes)(message.validatorAddress) : undefined;
        obj.height = message.height !== BigInt(0) ? message.height?.toString() : undefined;
        obj.vote_extension = message.voteExtension ? (0, helpers_1.base64FromBytes)(message.voteExtension) : undefined;
        return obj;
    },
    fromAminoMsg(object) {
        return exports.RequestVerifyVoteExtension.fromAmino(object.value);
    },
    fromProtoMsg(message) {
        return exports.RequestVerifyVoteExtension.decode(message.value);
    },
    toProto(message) {
        return exports.RequestVerifyVoteExtension.encode(message).finish();
    },
    toProtoMsg(message) {
        return {
            typeUrl: "/tendermint.abci.RequestVerifyVoteExtension",
            value: exports.RequestVerifyVoteExtension.encode(message).finish()
        };
    }
};
registry_1.GlobalDecoderRegistry.register(exports.RequestVerifyVoteExtension.typeUrl, exports.RequestVerifyVoteExtension);
function createBaseRequestFinalizeBlock() {
    return {
        txs: [],
        decidedLastCommit: exports.CommitInfo.fromPartial({}),
        misbehavior: [],
        hash: new Uint8Array(),
        height: BigInt(0),
        time: new Date(),
        nextValidatorsHash: new Uint8Array(),
        proposerAddress: new Uint8Array()
    };
}
exports.RequestFinalizeBlock = {
    typeUrl: "/tendermint.abci.RequestFinalizeBlock",
    is(o) {
        return o && (o.$typeUrl === exports.RequestFinalizeBlock.typeUrl || Array.isArray(o.txs) && (!o.txs.length || o.txs[0] instanceof Uint8Array || typeof o.txs[0] === "string") && exports.CommitInfo.is(o.decidedLastCommit) && Array.isArray(o.misbehavior) && (!o.misbehavior.length || exports.Misbehavior.is(o.misbehavior[0])) && (o.hash instanceof Uint8Array || typeof o.hash === "string") && typeof o.height === "bigint" && timestamp_1.Timestamp.is(o.time) && (o.nextValidatorsHash instanceof Uint8Array || typeof o.nextValidatorsHash === "string") && (o.proposerAddress instanceof Uint8Array || typeof o.proposerAddress === "string"));
    },
    isSDK(o) {
        return o && (o.$typeUrl === exports.RequestFinalizeBlock.typeUrl || Array.isArray(o.txs) && (!o.txs.length || o.txs[0] instanceof Uint8Array || typeof o.txs[0] === "string") && exports.CommitInfo.isSDK(o.decided_last_commit) && Array.isArray(o.misbehavior) && (!o.misbehavior.length || exports.Misbehavior.isSDK(o.misbehavior[0])) && (o.hash instanceof Uint8Array || typeof o.hash === "string") && typeof o.height === "bigint" && timestamp_1.Timestamp.isSDK(o.time) && (o.next_validators_hash instanceof Uint8Array || typeof o.next_validators_hash === "string") && (o.proposer_address instanceof Uint8Array || typeof o.proposer_address === "string"));
    },
    isAmino(o) {
        return o && (o.$typeUrl === exports.RequestFinalizeBlock.typeUrl || Array.isArray(o.txs) && (!o.txs.length || o.txs[0] instanceof Uint8Array || typeof o.txs[0] === "string") && exports.CommitInfo.isAmino(o.decided_last_commit) && Array.isArray(o.misbehavior) && (!o.misbehavior.length || exports.Misbehavior.isAmino(o.misbehavior[0])) && (o.hash instanceof Uint8Array || typeof o.hash === "string") && typeof o.height === "bigint" && timestamp_1.Timestamp.isAmino(o.time) && (o.next_validators_hash instanceof Uint8Array || typeof o.next_validators_hash === "string") && (o.proposer_address instanceof Uint8Array || typeof o.proposer_address === "string"));
    },
    encode(message, writer = binary_1.BinaryWriter.create()) {
        for (const v of message.txs) {
            writer.uint32(10).bytes(v);
        }
        if (message.decidedLastCommit !== undefined) {
            exports.CommitInfo.encode(message.decidedLastCommit, writer.uint32(18).fork()).ldelim();
        }
        for (const v of message.misbehavior) {
            exports.Misbehavior.encode(v, writer.uint32(26).fork()).ldelim();
        }
        if (message.hash.length !== 0) {
            writer.uint32(34).bytes(message.hash);
        }
        if (message.height !== BigInt(0)) {
            writer.uint32(40).int64(message.height);
        }
        if (message.time !== undefined) {
            timestamp_1.Timestamp.encode((0, helpers_1.toTimestamp)(message.time), writer.uint32(50).fork()).ldelim();
        }
        if (message.nextValidatorsHash.length !== 0) {
            writer.uint32(58).bytes(message.nextValidatorsHash);
        }
        if (message.proposerAddress.length !== 0) {
            writer.uint32(66).bytes(message.proposerAddress);
        }
        return writer;
    },
    decode(input, length) {
        const reader = input instanceof binary_1.BinaryReader ? input : new binary_1.BinaryReader(input);
        let end = length === undefined ? reader.len : reader.pos + length;
        const message = createBaseRequestFinalizeBlock();
        while (reader.pos < end) {
            const tag = reader.uint32();
            switch (tag >>> 3) {
                case 1:
                    message.txs.push(reader.bytes());
                    break;
                case 2:
                    message.decidedLastCommit = exports.CommitInfo.decode(reader, reader.uint32());
                    break;
                case 3:
                    message.misbehavior.push(exports.Misbehavior.decode(reader, reader.uint32()));
                    break;
                case 4:
                    message.hash = reader.bytes();
                    break;
                case 5:
                    message.height = reader.int64();
                    break;
                case 6:
                    message.time = (0, helpers_1.fromTimestamp)(timestamp_1.Timestamp.decode(reader, reader.uint32()));
                    break;
                case 7:
                    message.nextValidatorsHash = reader.bytes();
                    break;
                case 8:
                    message.proposerAddress = reader.bytes();
                    break;
                default:
                    reader.skipType(tag & 7);
                    break;
            }
        }
        return message;
    },
    fromPartial(object) {
        const message = createBaseRequestFinalizeBlock();
        message.txs = object.txs?.map(e => e) || [];
        message.decidedLastCommit = object.decidedLastCommit !== undefined && object.decidedLastCommit !== null ? exports.CommitInfo.fromPartial(object.decidedLastCommit) : undefined;
        message.misbehavior = object.misbehavior?.map(e => exports.Misbehavior.fromPartial(e)) || [];
        message.hash = object.hash ?? new Uint8Array();
        message.height = object.height !== undefined && object.height !== null ? BigInt(object.height.toString()) : BigInt(0);
        message.time = object.time ?? undefined;
        message.nextValidatorsHash = object.nextValidatorsHash ?? new Uint8Array();
        message.proposerAddress = object.proposerAddress ?? new Uint8Array();
        return message;
    },
    fromAmino(object) {
        const message = createBaseRequestFinalizeBlock();
        message.txs = object.txs?.map(e => (0, helpers_1.bytesFromBase64)(e)) || [];
        if (object.decided_last_commit !== undefined && object.decided_last_commit !== null) {
            message.decidedLastCommit = exports.CommitInfo.fromAmino(object.decided_last_commit);
        }
        message.misbehavior = object.misbehavior?.map(e => exports.Misbehavior.fromAmino(e)) || [];
        if (object.hash !== undefined && object.hash !== null) {
            message.hash = (0, helpers_1.bytesFromBase64)(object.hash);
        }
        if (object.height !== undefined && object.height !== null) {
            message.height = BigInt(object.height);
        }
        if (object.time !== undefined && object.time !== null) {
            message.time = (0, helpers_1.fromTimestamp)(timestamp_1.Timestamp.fromAmino(object.time));
        }
        if (object.next_validators_hash !== undefined && object.next_validators_hash !== null) {
            message.nextValidatorsHash = (0, helpers_1.bytesFromBase64)(object.next_validators_hash);
        }
        if (object.proposer_address !== undefined && object.proposer_address !== null) {
            message.proposerAddress = (0, helpers_1.bytesFromBase64)(object.proposer_address);
        }
        return message;
    },
    toAmino(message) {
        const obj = {};
        if (message.txs) {
            obj.txs = message.txs.map(e => (0, helpers_1.base64FromBytes)(e));
        }
        else {
            obj.txs = message.txs;
        }
        obj.decided_last_commit = message.decidedLastCommit ? exports.CommitInfo.toAmino(message.decidedLastCommit) : undefined;
        if (message.misbehavior) {
            obj.misbehavior = message.misbehavior.map(e => e ? exports.Misbehavior.toAmino(e) : undefined);
        }
        else {
            obj.misbehavior = message.misbehavior;
        }
        obj.hash = message.hash ? (0, helpers_1.base64FromBytes)(message.hash) : undefined;
        obj.height = message.height !== BigInt(0) ? message.height?.toString() : undefined;
        obj.time = message.time ? timestamp_1.Timestamp.toAmino((0, helpers_1.toTimestamp)(message.time)) : undefined;
        obj.next_validators_hash = message.nextValidatorsHash ? (0, helpers_1.base64FromBytes)(message.nextValidatorsHash) : undefined;
        obj.proposer_address = message.proposerAddress ? (0, helpers_1.base64FromBytes)(message.proposerAddress) : undefined;
        return obj;
    },
    fromAminoMsg(object) {
        return exports.RequestFinalizeBlock.fromAmino(object.value);
    },
    fromProtoMsg(message) {
        return exports.RequestFinalizeBlock.decode(message.value);
    },
    toProto(message) {
        return exports.RequestFinalizeBlock.encode(message).finish();
    },
    toProtoMsg(message) {
        return {
            typeUrl: "/tendermint.abci.RequestFinalizeBlock",
            value: exports.RequestFinalizeBlock.encode(message).finish()
        };
    }
};
registry_1.GlobalDecoderRegistry.register(exports.RequestFinalizeBlock.typeUrl, exports.RequestFinalizeBlock);
function createBaseResponse() {
    return {
        exception: undefined,
        echo: undefined,
        flush: undefined,
        info: undefined,
        initChain: undefined,
        query: undefined,
        checkTx: undefined,
        commit: undefined,
        listSnapshots: undefined,
        offerSnapshot: undefined,
        loadSnapshotChunk: undefined,
        applySnapshotChunk: undefined,
        prepareProposal: undefined,
        processProposal: undefined,
        extendVote: undefined,
        verifyVoteExtension: undefined,
        finalizeBlock: undefined
    };
}
exports.Response = {
    typeUrl: "/tendermint.abci.Response",
    is(o) {
        return o && o.$typeUrl === exports.Response.typeUrl;
    },
    isSDK(o) {
        return o && o.$typeUrl === exports.Response.typeUrl;
    },
    isAmino(o) {
        return o && o.$typeUrl === exports.Response.typeUrl;
    },
    encode(message, writer = binary_1.BinaryWriter.create()) {
        if (message.exception !== undefined) {
            exports.ResponseException.encode(message.exception, writer.uint32(10).fork()).ldelim();
        }
        if (message.echo !== undefined) {
            exports.ResponseEcho.encode(message.echo, writer.uint32(18).fork()).ldelim();
        }
        if (message.flush !== undefined) {
            exports.ResponseFlush.encode(message.flush, writer.uint32(26).fork()).ldelim();
        }
        if (message.info !== undefined) {
            exports.ResponseInfo.encode(message.info, writer.uint32(34).fork()).ldelim();
        }
        if (message.initChain !== undefined) {
            exports.ResponseInitChain.encode(message.initChain, writer.uint32(50).fork()).ldelim();
        }
        if (message.query !== undefined) {
            exports.ResponseQuery.encode(message.query, writer.uint32(58).fork()).ldelim();
        }
        if (message.checkTx !== undefined) {
            exports.ResponseCheckTx.encode(message.checkTx, writer.uint32(74).fork()).ldelim();
        }
        if (message.commit !== undefined) {
            exports.ResponseCommit.encode(message.commit, writer.uint32(98).fork()).ldelim();
        }
        if (message.listSnapshots !== undefined) {
            exports.ResponseListSnapshots.encode(message.listSnapshots, writer.uint32(106).fork()).ldelim();
        }
        if (message.offerSnapshot !== undefined) {
            exports.ResponseOfferSnapshot.encode(message.offerSnapshot, writer.uint32(114).fork()).ldelim();
        }
        if (message.loadSnapshotChunk !== undefined) {
            exports.ResponseLoadSnapshotChunk.encode(message.loadSnapshotChunk, writer.uint32(122).fork()).ldelim();
        }
        if (message.applySnapshotChunk !== undefined) {
            exports.ResponseApplySnapshotChunk.encode(message.applySnapshotChunk, writer.uint32(130).fork()).ldelim();
        }
        if (message.prepareProposal !== undefined) {
            exports.ResponsePrepareProposal.encode(message.prepareProposal, writer.uint32(138).fork()).ldelim();
        }
        if (message.processProposal !== undefined) {
            exports.ResponseProcessProposal.encode(message.processProposal, writer.uint32(146).fork()).ldelim();
        }
        if (message.extendVote !== undefined) {
            exports.ResponseExtendVote.encode(message.extendVote, writer.uint32(154).fork()).ldelim();
        }
        if (message.verifyVoteExtension !== undefined) {
            exports.ResponseVerifyVoteExtension.encode(message.verifyVoteExtension, writer.uint32(162).fork()).ldelim();
        }
        if (message.finalizeBlock !== undefined) {
            exports.ResponseFinalizeBlock.encode(message.finalizeBlock, writer.uint32(170).fork()).ldelim();
        }
        return writer;
    },
    decode(input, length) {
        const reader = input instanceof binary_1.BinaryReader ? input : new binary_1.BinaryReader(input);
        let end = length === undefined ? reader.len : reader.pos + length;
        const message = createBaseResponse();
        while (reader.pos < end) {
            const tag = reader.uint32();
            switch (tag >>> 3) {
                case 1:
                    message.exception = exports.ResponseException.decode(reader, reader.uint32());
                    break;
                case 2:
                    message.echo = exports.ResponseEcho.decode(reader, reader.uint32());
                    break;
                case 3:
                    message.flush = exports.ResponseFlush.decode(reader, reader.uint32());
                    break;
                case 4:
                    message.info = exports.ResponseInfo.decode(reader, reader.uint32());
                    break;
                case 6:
                    message.initChain = exports.ResponseInitChain.decode(reader, reader.uint32());
                    break;
                case 7:
                    message.query = exports.ResponseQuery.decode(reader, reader.uint32());
                    break;
                case 9:
                    message.checkTx = exports.ResponseCheckTx.decode(reader, reader.uint32());
                    break;
                case 12:
                    message.commit = exports.ResponseCommit.decode(reader, reader.uint32());
                    break;
                case 13:
                    message.listSnapshots = exports.ResponseListSnapshots.decode(reader, reader.uint32());
                    break;
                case 14:
                    message.offerSnapshot = exports.ResponseOfferSnapshot.decode(reader, reader.uint32());
                    break;
                case 15:
                    message.loadSnapshotChunk = exports.ResponseLoadSnapshotChunk.decode(reader, reader.uint32());
                    break;
                case 16:
                    message.applySnapshotChunk = exports.ResponseApplySnapshotChunk.decode(reader, reader.uint32());
                    break;
                case 17:
                    message.prepareProposal = exports.ResponsePrepareProposal.decode(reader, reader.uint32());
                    break;
                case 18:
                    message.processProposal = exports.ResponseProcessProposal.decode(reader, reader.uint32());
                    break;
                case 19:
                    message.extendVote = exports.ResponseExtendVote.decode(reader, reader.uint32());
                    break;
                case 20:
                    message.verifyVoteExtension = exports.ResponseVerifyVoteExtension.decode(reader, reader.uint32());
                    break;
                case 21:
                    message.finalizeBlock = exports.ResponseFinalizeBlock.decode(reader, reader.uint32());
                    break;
                default:
                    reader.skipType(tag & 7);
                    break;
            }
        }
        return message;
    },
    fromPartial(object) {
        const message = createBaseResponse();
        message.exception = object.exception !== undefined && object.exception !== null ? exports.ResponseException.fromPartial(object.exception) : undefined;
        message.echo = object.echo !== undefined && object.echo !== null ? exports.ResponseEcho.fromPartial(object.echo) : undefined;
        message.flush = object.flush !== undefined && object.flush !== null ? exports.ResponseFlush.fromPartial(object.flush) : undefined;
        message.info = object.info !== undefined && object.info !== null ? exports.ResponseInfo.fromPartial(object.info) : undefined;
        message.initChain = object.initChain !== undefined && object.initChain !== null ? exports.ResponseInitChain.fromPartial(object.initChain) : undefined;
        message.query = object.query !== undefined && object.query !== null ? exports.ResponseQuery.fromPartial(object.query) : undefined;
        message.checkTx = object.checkTx !== undefined && object.checkTx !== null ? exports.ResponseCheckTx.fromPartial(object.checkTx) : undefined;
        message.commit = object.commit !== undefined && object.commit !== null ? exports.ResponseCommit.fromPartial(object.commit) : undefined;
        message.listSnapshots = object.listSnapshots !== undefined && object.listSnapshots !== null ? exports.ResponseListSnapshots.fromPartial(object.listSnapshots) : undefined;
        message.offerSnapshot = object.offerSnapshot !== undefined && object.offerSnapshot !== null ? exports.ResponseOfferSnapshot.fromPartial(object.offerSnapshot) : undefined;
        message.loadSnapshotChunk = object.loadSnapshotChunk !== undefined && object.loadSnapshotChunk !== null ? exports.ResponseLoadSnapshotChunk.fromPartial(object.loadSnapshotChunk) : undefined;
        message.applySnapshotChunk = object.applySnapshotChunk !== undefined && object.applySnapshotChunk !== null ? exports.ResponseApplySnapshotChunk.fromPartial(object.applySnapshotChunk) : undefined;
        message.prepareProposal = object.prepareProposal !== undefined && object.prepareProposal !== null ? exports.ResponsePrepareProposal.fromPartial(object.prepareProposal) : undefined;
        message.processProposal = object.processProposal !== undefined && object.processProposal !== null ? exports.ResponseProcessProposal.fromPartial(object.processProposal) : undefined;
        message.extendVote = object.extendVote !== undefined && object.extendVote !== null ? exports.ResponseExtendVote.fromPartial(object.extendVote) : undefined;
        message.verifyVoteExtension = object.verifyVoteExtension !== undefined && object.verifyVoteExtension !== null ? exports.ResponseVerifyVoteExtension.fromPartial(object.verifyVoteExtension) : undefined;
        message.finalizeBlock = object.finalizeBlock !== undefined && object.finalizeBlock !== null ? exports.ResponseFinalizeBlock.fromPartial(object.finalizeBlock) : undefined;
        return message;
    },
    fromAmino(object) {
        const message = createBaseResponse();
        if (object.exception !== undefined && object.exception !== null) {
            message.exception = exports.ResponseException.fromAmino(object.exception);
        }
        if (object.echo !== undefined && object.echo !== null) {
            message.echo = exports.ResponseEcho.fromAmino(object.echo);
        }
        if (object.flush !== undefined && object.flush !== null) {
            message.flush = exports.ResponseFlush.fromAmino(object.flush);
        }
        if (object.info !== undefined && object.info !== null) {
            message.info = exports.ResponseInfo.fromAmino(object.info);
        }
        if (object.init_chain !== undefined && object.init_chain !== null) {
            message.initChain = exports.ResponseInitChain.fromAmino(object.init_chain);
        }
        if (object.query !== undefined && object.query !== null) {
            message.query = exports.ResponseQuery.fromAmino(object.query);
        }
        if (object.check_tx !== undefined && object.check_tx !== null) {
            message.checkTx = exports.ResponseCheckTx.fromAmino(object.check_tx);
        }
        if (object.commit !== undefined && object.commit !== null) {
            message.commit = exports.ResponseCommit.fromAmino(object.commit);
        }
        if (object.list_snapshots !== undefined && object.list_snapshots !== null) {
            message.listSnapshots = exports.ResponseListSnapshots.fromAmino(object.list_snapshots);
        }
        if (object.offer_snapshot !== undefined && object.offer_snapshot !== null) {
            message.offerSnapshot = exports.ResponseOfferSnapshot.fromAmino(object.offer_snapshot);
        }
        if (object.load_snapshot_chunk !== undefined && object.load_snapshot_chunk !== null) {
            message.loadSnapshotChunk = exports.ResponseLoadSnapshotChunk.fromAmino(object.load_snapshot_chunk);
        }
        if (object.apply_snapshot_chunk !== undefined && object.apply_snapshot_chunk !== null) {
            message.applySnapshotChunk = exports.ResponseApplySnapshotChunk.fromAmino(object.apply_snapshot_chunk);
        }
        if (object.prepare_proposal !== undefined && object.prepare_proposal !== null) {
            message.prepareProposal = exports.ResponsePrepareProposal.fromAmino(object.prepare_proposal);
        }
        if (object.process_proposal !== undefined && object.process_proposal !== null) {
            message.processProposal = exports.ResponseProcessProposal.fromAmino(object.process_proposal);
        }
        if (object.extend_vote !== undefined && object.extend_vote !== null) {
            message.extendVote = exports.ResponseExtendVote.fromAmino(object.extend_vote);
        }
        if (object.verify_vote_extension !== undefined && object.verify_vote_extension !== null) {
            message.verifyVoteExtension = exports.ResponseVerifyVoteExtension.fromAmino(object.verify_vote_extension);
        }
        if (object.finalize_block !== undefined && object.finalize_block !== null) {
            message.finalizeBlock = exports.ResponseFinalizeBlock.fromAmino(object.finalize_block);
        }
        return message;
    },
    toAmino(message) {
        const obj = {};
        obj.exception = message.exception ? exports.ResponseException.toAmino(message.exception) : undefined;
        obj.echo = message.echo ? exports.ResponseEcho.toAmino(message.echo) : undefined;
        obj.flush = message.flush ? exports.ResponseFlush.toAmino(message.flush) : undefined;
        obj.info = message.info ? exports.ResponseInfo.toAmino(message.info) : undefined;
        obj.init_chain = message.initChain ? exports.ResponseInitChain.toAmino(message.initChain) : undefined;
        obj.query = message.query ? exports.ResponseQuery.toAmino(message.query) : undefined;
        obj.check_tx = message.checkTx ? exports.ResponseCheckTx.toAmino(message.checkTx) : undefined;
        obj.commit = message.commit ? exports.ResponseCommit.toAmino(message.commit) : undefined;
        obj.list_snapshots = message.listSnapshots ? exports.ResponseListSnapshots.toAmino(message.listSnapshots) : undefined;
        obj.offer_snapshot = message.offerSnapshot ? exports.ResponseOfferSnapshot.toAmino(message.offerSnapshot) : undefined;
        obj.load_snapshot_chunk = message.loadSnapshotChunk ? exports.ResponseLoadSnapshotChunk.toAmino(message.loadSnapshotChunk) : undefined;
        obj.apply_snapshot_chunk = message.applySnapshotChunk ? exports.ResponseApplySnapshotChunk.toAmino(message.applySnapshotChunk) : undefined;
        obj.prepare_proposal = message.prepareProposal ? exports.ResponsePrepareProposal.toAmino(message.prepareProposal) : undefined;
        obj.process_proposal = message.processProposal ? exports.ResponseProcessProposal.toAmino(message.processProposal) : undefined;
        obj.extend_vote = message.extendVote ? exports.ResponseExtendVote.toAmino(message.extendVote) : undefined;
        obj.verify_vote_extension = message.verifyVoteExtension ? exports.ResponseVerifyVoteExtension.toAmino(message.verifyVoteExtension) : undefined;
        obj.finalize_block = message.finalizeBlock ? exports.ResponseFinalizeBlock.toAmino(message.finalizeBlock) : undefined;
        return obj;
    },
    fromAminoMsg(object) {
        return exports.Response.fromAmino(object.value);
    },
    fromProtoMsg(message) {
        return exports.Response.decode(message.value);
    },
    toProto(message) {
        return exports.Response.encode(message).finish();
    },
    toProtoMsg(message) {
        return {
            typeUrl: "/tendermint.abci.Response",
            value: exports.Response.encode(message).finish()
        };
    }
};
registry_1.GlobalDecoderRegistry.register(exports.Response.typeUrl, exports.Response);
function createBaseResponseException() {
    return {
        error: ""
    };
}
exports.ResponseException = {
    typeUrl: "/tendermint.abci.ResponseException",
    is(o) {
        return o && (o.$typeUrl === exports.ResponseException.typeUrl || typeof o.error === "string");
    },
    isSDK(o) {
        return o && (o.$typeUrl === exports.ResponseException.typeUrl || typeof o.error === "string");
    },
    isAmino(o) {
        return o && (o.$typeUrl === exports.ResponseException.typeUrl || typeof o.error === "string");
    },
    encode(message, writer = binary_1.BinaryWriter.create()) {
        if (message.error !== "") {
            writer.uint32(10).string(message.error);
        }
        return writer;
    },
    decode(input, length) {
        const reader = input instanceof binary_1.BinaryReader ? input : new binary_1.BinaryReader(input);
        let end = length === undefined ? reader.len : reader.pos + length;
        const message = createBaseResponseException();
        while (reader.pos < end) {
            const tag = reader.uint32();
            switch (tag >>> 3) {
                case 1:
                    message.error = reader.string();
                    break;
                default:
                    reader.skipType(tag & 7);
                    break;
            }
        }
        return message;
    },
    fromPartial(object) {
        const message = createBaseResponseException();
        message.error = object.error ?? "";
        return message;
    },
    fromAmino(object) {
        const message = createBaseResponseException();
        if (object.error !== undefined && object.error !== null) {
            message.error = object.error;
        }
        return message;
    },
    toAmino(message) {
        const obj = {};
        obj.error = message.error === "" ? undefined : message.error;
        return obj;
    },
    fromAminoMsg(object) {
        return exports.ResponseException.fromAmino(object.value);
    },
    fromProtoMsg(message) {
        return exports.ResponseException.decode(message.value);
    },
    toProto(message) {
        return exports.ResponseException.encode(message).finish();
    },
    toProtoMsg(message) {
        return {
            typeUrl: "/tendermint.abci.ResponseException",
            value: exports.ResponseException.encode(message).finish()
        };
    }
};
registry_1.GlobalDecoderRegistry.register(exports.ResponseException.typeUrl, exports.ResponseException);
function createBaseResponseEcho() {
    return {
        message: ""
    };
}
exports.ResponseEcho = {
    typeUrl: "/tendermint.abci.ResponseEcho",
    is(o) {
        return o && (o.$typeUrl === exports.ResponseEcho.typeUrl || typeof o.message === "string");
    },
    isSDK(o) {
        return o && (o.$typeUrl === exports.ResponseEcho.typeUrl || typeof o.message === "string");
    },
    isAmino(o) {
        return o && (o.$typeUrl === exports.ResponseEcho.typeUrl || typeof o.message === "string");
    },
    encode(message, writer = binary_1.BinaryWriter.create()) {
        if (message.message !== "") {
            writer.uint32(10).string(message.message);
        }
        return writer;
    },
    decode(input, length) {
        const reader = input instanceof binary_1.BinaryReader ? input : new binary_1.BinaryReader(input);
        let end = length === undefined ? reader.len : reader.pos + length;
        const message = createBaseResponseEcho();
        while (reader.pos < end) {
            const tag = reader.uint32();
            switch (tag >>> 3) {
                case 1:
                    message.message = reader.string();
                    break;
                default:
                    reader.skipType(tag & 7);
                    break;
            }
        }
        return message;
    },
    fromPartial(object) {
        const message = createBaseResponseEcho();
        message.message = object.message ?? "";
        return message;
    },
    fromAmino(object) {
        const message = createBaseResponseEcho();
        if (object.message !== undefined && object.message !== null) {
            message.message = object.message;
        }
        return message;
    },
    toAmino(message) {
        const obj = {};
        obj.message = message.message === "" ? undefined : message.message;
        return obj;
    },
    fromAminoMsg(object) {
        return exports.ResponseEcho.fromAmino(object.value);
    },
    fromProtoMsg(message) {
        return exports.ResponseEcho.decode(message.value);
    },
    toProto(message) {
        return exports.ResponseEcho.encode(message).finish();
    },
    toProtoMsg(message) {
        return {
            typeUrl: "/tendermint.abci.ResponseEcho",
            value: exports.ResponseEcho.encode(message).finish()
        };
    }
};
registry_1.GlobalDecoderRegistry.register(exports.ResponseEcho.typeUrl, exports.ResponseEcho);
function createBaseResponseFlush() {
    return {};
}
exports.ResponseFlush = {
    typeUrl: "/tendermint.abci.ResponseFlush",
    is(o) {
        return o && o.$typeUrl === exports.ResponseFlush.typeUrl;
    },
    isSDK(o) {
        return o && o.$typeUrl === exports.ResponseFlush.typeUrl;
    },
    isAmino(o) {
        return o && o.$typeUrl === exports.ResponseFlush.typeUrl;
    },
    encode(_, writer = binary_1.BinaryWriter.create()) {
        return writer;
    },
    decode(input, length) {
        const reader = input instanceof binary_1.BinaryReader ? input : new binary_1.BinaryReader(input);
        let end = length === undefined ? reader.len : reader.pos + length;
        const message = createBaseResponseFlush();
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
        const message = createBaseResponseFlush();
        return message;
    },
    fromAmino(_) {
        const message = createBaseResponseFlush();
        return message;
    },
    toAmino(_) {
        const obj = {};
        return obj;
    },
    fromAminoMsg(object) {
        return exports.ResponseFlush.fromAmino(object.value);
    },
    fromProtoMsg(message) {
        return exports.ResponseFlush.decode(message.value);
    },
    toProto(message) {
        return exports.ResponseFlush.encode(message).finish();
    },
    toProtoMsg(message) {
        return {
            typeUrl: "/tendermint.abci.ResponseFlush",
            value: exports.ResponseFlush.encode(message).finish()
        };
    }
};
registry_1.GlobalDecoderRegistry.register(exports.ResponseFlush.typeUrl, exports.ResponseFlush);
function createBaseResponseInfo() {
    return {
        data: "",
        version: "",
        appVersion: BigInt(0),
        lastBlockHeight: BigInt(0),
        lastBlockAppHash: new Uint8Array()
    };
}
exports.ResponseInfo = {
    typeUrl: "/tendermint.abci.ResponseInfo",
    is(o) {
        return o && (o.$typeUrl === exports.ResponseInfo.typeUrl || typeof o.data === "string" && typeof o.version === "string" && typeof o.appVersion === "bigint" && typeof o.lastBlockHeight === "bigint" && (o.lastBlockAppHash instanceof Uint8Array || typeof o.lastBlockAppHash === "string"));
    },
    isSDK(o) {
        return o && (o.$typeUrl === exports.ResponseInfo.typeUrl || typeof o.data === "string" && typeof o.version === "string" && typeof o.app_version === "bigint" && typeof o.last_block_height === "bigint" && (o.last_block_app_hash instanceof Uint8Array || typeof o.last_block_app_hash === "string"));
    },
    isAmino(o) {
        return o && (o.$typeUrl === exports.ResponseInfo.typeUrl || typeof o.data === "string" && typeof o.version === "string" && typeof o.app_version === "bigint" && typeof o.last_block_height === "bigint" && (o.last_block_app_hash instanceof Uint8Array || typeof o.last_block_app_hash === "string"));
    },
    encode(message, writer = binary_1.BinaryWriter.create()) {
        if (message.data !== "") {
            writer.uint32(10).string(message.data);
        }
        if (message.version !== "") {
            writer.uint32(18).string(message.version);
        }
        if (message.appVersion !== BigInt(0)) {
            writer.uint32(24).uint64(message.appVersion);
        }
        if (message.lastBlockHeight !== BigInt(0)) {
            writer.uint32(32).int64(message.lastBlockHeight);
        }
        if (message.lastBlockAppHash.length !== 0) {
            writer.uint32(42).bytes(message.lastBlockAppHash);
        }
        return writer;
    },
    decode(input, length) {
        const reader = input instanceof binary_1.BinaryReader ? input : new binary_1.BinaryReader(input);
        let end = length === undefined ? reader.len : reader.pos + length;
        const message = createBaseResponseInfo();
        while (reader.pos < end) {
            const tag = reader.uint32();
            switch (tag >>> 3) {
                case 1:
                    message.data = reader.string();
                    break;
                case 2:
                    message.version = reader.string();
                    break;
                case 3:
                    message.appVersion = reader.uint64();
                    break;
                case 4:
                    message.lastBlockHeight = reader.int64();
                    break;
                case 5:
                    message.lastBlockAppHash = reader.bytes();
                    break;
                default:
                    reader.skipType(tag & 7);
                    break;
            }
        }
        return message;
    },
    fromPartial(object) {
        const message = createBaseResponseInfo();
        message.data = object.data ?? "";
        message.version = object.version ?? "";
        message.appVersion = object.appVersion !== undefined && object.appVersion !== null ? BigInt(object.appVersion.toString()) : BigInt(0);
        message.lastBlockHeight = object.lastBlockHeight !== undefined && object.lastBlockHeight !== null ? BigInt(object.lastBlockHeight.toString()) : BigInt(0);
        message.lastBlockAppHash = object.lastBlockAppHash ?? new Uint8Array();
        return message;
    },
    fromAmino(object) {
        const message = createBaseResponseInfo();
        if (object.data !== undefined && object.data !== null) {
            message.data = object.data;
        }
        if (object.version !== undefined && object.version !== null) {
            message.version = object.version;
        }
        if (object.app_version !== undefined && object.app_version !== null) {
            message.appVersion = BigInt(object.app_version);
        }
        if (object.last_block_height !== undefined && object.last_block_height !== null) {
            message.lastBlockHeight = BigInt(object.last_block_height);
        }
        if (object.last_block_app_hash !== undefined && object.last_block_app_hash !== null) {
            message.lastBlockAppHash = (0, helpers_1.bytesFromBase64)(object.last_block_app_hash);
        }
        return message;
    },
    toAmino(message) {
        const obj = {};
        obj.data = message.data === "" ? undefined : message.data;
        obj.version = message.version === "" ? undefined : message.version;
        obj.app_version = message.appVersion !== BigInt(0) ? message.appVersion?.toString() : undefined;
        obj.last_block_height = message.lastBlockHeight !== BigInt(0) ? message.lastBlockHeight?.toString() : undefined;
        obj.last_block_app_hash = message.lastBlockAppHash ? (0, helpers_1.base64FromBytes)(message.lastBlockAppHash) : undefined;
        return obj;
    },
    fromAminoMsg(object) {
        return exports.ResponseInfo.fromAmino(object.value);
    },
    fromProtoMsg(message) {
        return exports.ResponseInfo.decode(message.value);
    },
    toProto(message) {
        return exports.ResponseInfo.encode(message).finish();
    },
    toProtoMsg(message) {
        return {
            typeUrl: "/tendermint.abci.ResponseInfo",
            value: exports.ResponseInfo.encode(message).finish()
        };
    }
};
registry_1.GlobalDecoderRegistry.register(exports.ResponseInfo.typeUrl, exports.ResponseInfo);
function createBaseResponseInitChain() {
    return {
        consensusParams: undefined,
        validators: [],
        appHash: new Uint8Array()
    };
}
exports.ResponseInitChain = {
    typeUrl: "/tendermint.abci.ResponseInitChain",
    is(o) {
        return o && (o.$typeUrl === exports.ResponseInitChain.typeUrl || Array.isArray(o.validators) && (!o.validators.length || exports.ValidatorUpdate.is(o.validators[0])) && (o.appHash instanceof Uint8Array || typeof o.appHash === "string"));
    },
    isSDK(o) {
        return o && (o.$typeUrl === exports.ResponseInitChain.typeUrl || Array.isArray(o.validators) && (!o.validators.length || exports.ValidatorUpdate.isSDK(o.validators[0])) && (o.app_hash instanceof Uint8Array || typeof o.app_hash === "string"));
    },
    isAmino(o) {
        return o && (o.$typeUrl === exports.ResponseInitChain.typeUrl || Array.isArray(o.validators) && (!o.validators.length || exports.ValidatorUpdate.isAmino(o.validators[0])) && (o.app_hash instanceof Uint8Array || typeof o.app_hash === "string"));
    },
    encode(message, writer = binary_1.BinaryWriter.create()) {
        if (message.consensusParams !== undefined) {
            params_1.ConsensusParams.encode(message.consensusParams, writer.uint32(10).fork()).ldelim();
        }
        for (const v of message.validators) {
            exports.ValidatorUpdate.encode(v, writer.uint32(18).fork()).ldelim();
        }
        if (message.appHash.length !== 0) {
            writer.uint32(26).bytes(message.appHash);
        }
        return writer;
    },
    decode(input, length) {
        const reader = input instanceof binary_1.BinaryReader ? input : new binary_1.BinaryReader(input);
        let end = length === undefined ? reader.len : reader.pos + length;
        const message = createBaseResponseInitChain();
        while (reader.pos < end) {
            const tag = reader.uint32();
            switch (tag >>> 3) {
                case 1:
                    message.consensusParams = params_1.ConsensusParams.decode(reader, reader.uint32());
                    break;
                case 2:
                    message.validators.push(exports.ValidatorUpdate.decode(reader, reader.uint32()));
                    break;
                case 3:
                    message.appHash = reader.bytes();
                    break;
                default:
                    reader.skipType(tag & 7);
                    break;
            }
        }
        return message;
    },
    fromPartial(object) {
        const message = createBaseResponseInitChain();
        message.consensusParams = object.consensusParams !== undefined && object.consensusParams !== null ? params_1.ConsensusParams.fromPartial(object.consensusParams) : undefined;
        message.validators = object.validators?.map(e => exports.ValidatorUpdate.fromPartial(e)) || [];
        message.appHash = object.appHash ?? new Uint8Array();
        return message;
    },
    fromAmino(object) {
        const message = createBaseResponseInitChain();
        if (object.consensus_params !== undefined && object.consensus_params !== null) {
            message.consensusParams = params_1.ConsensusParams.fromAmino(object.consensus_params);
        }
        message.validators = object.validators?.map(e => exports.ValidatorUpdate.fromAmino(e)) || [];
        if (object.app_hash !== undefined && object.app_hash !== null) {
            message.appHash = (0, helpers_1.bytesFromBase64)(object.app_hash);
        }
        return message;
    },
    toAmino(message) {
        const obj = {};
        obj.consensus_params = message.consensusParams ? params_1.ConsensusParams.toAmino(message.consensusParams) : undefined;
        if (message.validators) {
            obj.validators = message.validators.map(e => e ? exports.ValidatorUpdate.toAmino(e) : undefined);
        }
        else {
            obj.validators = message.validators;
        }
        obj.app_hash = message.appHash ? (0, helpers_1.base64FromBytes)(message.appHash) : undefined;
        return obj;
    },
    fromAminoMsg(object) {
        return exports.ResponseInitChain.fromAmino(object.value);
    },
    fromProtoMsg(message) {
        return exports.ResponseInitChain.decode(message.value);
    },
    toProto(message) {
        return exports.ResponseInitChain.encode(message).finish();
    },
    toProtoMsg(message) {
        return {
            typeUrl: "/tendermint.abci.ResponseInitChain",
            value: exports.ResponseInitChain.encode(message).finish()
        };
    }
};
registry_1.GlobalDecoderRegistry.register(exports.ResponseInitChain.typeUrl, exports.ResponseInitChain);
function createBaseResponseQuery() {
    return {
        code: 0,
        log: "",
        info: "",
        index: BigInt(0),
        key: new Uint8Array(),
        value: new Uint8Array(),
        proofOps: undefined,
        height: BigInt(0),
        codespace: ""
    };
}
exports.ResponseQuery = {
    typeUrl: "/tendermint.abci.ResponseQuery",
    is(o) {
        return o && (o.$typeUrl === exports.ResponseQuery.typeUrl || typeof o.code === "number" && typeof o.log === "string" && typeof o.info === "string" && typeof o.index === "bigint" && (o.key instanceof Uint8Array || typeof o.key === "string") && (o.value instanceof Uint8Array || typeof o.value === "string") && typeof o.height === "bigint" && typeof o.codespace === "string");
    },
    isSDK(o) {
        return o && (o.$typeUrl === exports.ResponseQuery.typeUrl || typeof o.code === "number" && typeof o.log === "string" && typeof o.info === "string" && typeof o.index === "bigint" && (o.key instanceof Uint8Array || typeof o.key === "string") && (o.value instanceof Uint8Array || typeof o.value === "string") && typeof o.height === "bigint" && typeof o.codespace === "string");
    },
    isAmino(o) {
        return o && (o.$typeUrl === exports.ResponseQuery.typeUrl || typeof o.code === "number" && typeof o.log === "string" && typeof o.info === "string" && typeof o.index === "bigint" && (o.key instanceof Uint8Array || typeof o.key === "string") && (o.value instanceof Uint8Array || typeof o.value === "string") && typeof o.height === "bigint" && typeof o.codespace === "string");
    },
    encode(message, writer = binary_1.BinaryWriter.create()) {
        if (message.code !== 0) {
            writer.uint32(8).uint32(message.code);
        }
        if (message.log !== "") {
            writer.uint32(26).string(message.log);
        }
        if (message.info !== "") {
            writer.uint32(34).string(message.info);
        }
        if (message.index !== BigInt(0)) {
            writer.uint32(40).int64(message.index);
        }
        if (message.key.length !== 0) {
            writer.uint32(50).bytes(message.key);
        }
        if (message.value.length !== 0) {
            writer.uint32(58).bytes(message.value);
        }
        if (message.proofOps !== undefined) {
            proof_1.ProofOps.encode(message.proofOps, writer.uint32(66).fork()).ldelim();
        }
        if (message.height !== BigInt(0)) {
            writer.uint32(72).int64(message.height);
        }
        if (message.codespace !== "") {
            writer.uint32(82).string(message.codespace);
        }
        return writer;
    },
    decode(input, length) {
        const reader = input instanceof binary_1.BinaryReader ? input : new binary_1.BinaryReader(input);
        let end = length === undefined ? reader.len : reader.pos + length;
        const message = createBaseResponseQuery();
        while (reader.pos < end) {
            const tag = reader.uint32();
            switch (tag >>> 3) {
                case 1:
                    message.code = reader.uint32();
                    break;
                case 3:
                    message.log = reader.string();
                    break;
                case 4:
                    message.info = reader.string();
                    break;
                case 5:
                    message.index = reader.int64();
                    break;
                case 6:
                    message.key = reader.bytes();
                    break;
                case 7:
                    message.value = reader.bytes();
                    break;
                case 8:
                    message.proofOps = proof_1.ProofOps.decode(reader, reader.uint32());
                    break;
                case 9:
                    message.height = reader.int64();
                    break;
                case 10:
                    message.codespace = reader.string();
                    break;
                default:
                    reader.skipType(tag & 7);
                    break;
            }
        }
        return message;
    },
    fromPartial(object) {
        const message = createBaseResponseQuery();
        message.code = object.code ?? 0;
        message.log = object.log ?? "";
        message.info = object.info ?? "";
        message.index = object.index !== undefined && object.index !== null ? BigInt(object.index.toString()) : BigInt(0);
        message.key = object.key ?? new Uint8Array();
        message.value = object.value ?? new Uint8Array();
        message.proofOps = object.proofOps !== undefined && object.proofOps !== null ? proof_1.ProofOps.fromPartial(object.proofOps) : undefined;
        message.height = object.height !== undefined && object.height !== null ? BigInt(object.height.toString()) : BigInt(0);
        message.codespace = object.codespace ?? "";
        return message;
    },
    fromAmino(object) {
        const message = createBaseResponseQuery();
        if (object.code !== undefined && object.code !== null) {
            message.code = object.code;
        }
        if (object.log !== undefined && object.log !== null) {
            message.log = object.log;
        }
        if (object.info !== undefined && object.info !== null) {
            message.info = object.info;
        }
        if (object.index !== undefined && object.index !== null) {
            message.index = BigInt(object.index);
        }
        if (object.key !== undefined && object.key !== null) {
            message.key = (0, helpers_1.bytesFromBase64)(object.key);
        }
        if (object.value !== undefined && object.value !== null) {
            message.value = (0, helpers_1.bytesFromBase64)(object.value);
        }
        if (object.proof_ops !== undefined && object.proof_ops !== null) {
            message.proofOps = proof_1.ProofOps.fromAmino(object.proof_ops);
        }
        if (object.height !== undefined && object.height !== null) {
            message.height = BigInt(object.height);
        }
        if (object.codespace !== undefined && object.codespace !== null) {
            message.codespace = object.codespace;
        }
        return message;
    },
    toAmino(message) {
        const obj = {};
        obj.code = message.code === 0 ? undefined : message.code;
        obj.log = message.log === "" ? undefined : message.log;
        obj.info = message.info === "" ? undefined : message.info;
        obj.index = message.index !== BigInt(0) ? message.index?.toString() : undefined;
        obj.key = message.key ? (0, helpers_1.base64FromBytes)(message.key) : undefined;
        obj.value = message.value ? (0, helpers_1.base64FromBytes)(message.value) : undefined;
        obj.proof_ops = message.proofOps ? proof_1.ProofOps.toAmino(message.proofOps) : undefined;
        obj.height = message.height !== BigInt(0) ? message.height?.toString() : undefined;
        obj.codespace = message.codespace === "" ? undefined : message.codespace;
        return obj;
    },
    fromAminoMsg(object) {
        return exports.ResponseQuery.fromAmino(object.value);
    },
    fromProtoMsg(message) {
        return exports.ResponseQuery.decode(message.value);
    },
    toProto(message) {
        return exports.ResponseQuery.encode(message).finish();
    },
    toProtoMsg(message) {
        return {
            typeUrl: "/tendermint.abci.ResponseQuery",
            value: exports.ResponseQuery.encode(message).finish()
        };
    }
};
registry_1.GlobalDecoderRegistry.register(exports.ResponseQuery.typeUrl, exports.ResponseQuery);
function createBaseResponseCheckTx() {
    return {
        code: 0,
        data: new Uint8Array(),
        log: "",
        info: "",
        gasWanted: BigInt(0),
        gasUsed: BigInt(0),
        events: [],
        codespace: ""
    };
}
exports.ResponseCheckTx = {
    typeUrl: "/tendermint.abci.ResponseCheckTx",
    is(o) {
        return o && (o.$typeUrl === exports.ResponseCheckTx.typeUrl || typeof o.code === "number" && (o.data instanceof Uint8Array || typeof o.data === "string") && typeof o.log === "string" && typeof o.info === "string" && typeof o.gasWanted === "bigint" && typeof o.gasUsed === "bigint" && Array.isArray(o.events) && (!o.events.length || exports.Event.is(o.events[0])) && typeof o.codespace === "string");
    },
    isSDK(o) {
        return o && (o.$typeUrl === exports.ResponseCheckTx.typeUrl || typeof o.code === "number" && (o.data instanceof Uint8Array || typeof o.data === "string") && typeof o.log === "string" && typeof o.info === "string" && typeof o.gas_wanted === "bigint" && typeof o.gas_used === "bigint" && Array.isArray(o.events) && (!o.events.length || exports.Event.isSDK(o.events[0])) && typeof o.codespace === "string");
    },
    isAmino(o) {
        return o && (o.$typeUrl === exports.ResponseCheckTx.typeUrl || typeof o.code === "number" && (o.data instanceof Uint8Array || typeof o.data === "string") && typeof o.log === "string" && typeof o.info === "string" && typeof o.gas_wanted === "bigint" && typeof o.gas_used === "bigint" && Array.isArray(o.events) && (!o.events.length || exports.Event.isAmino(o.events[0])) && typeof o.codespace === "string");
    },
    encode(message, writer = binary_1.BinaryWriter.create()) {
        if (message.code !== 0) {
            writer.uint32(8).uint32(message.code);
        }
        if (message.data.length !== 0) {
            writer.uint32(18).bytes(message.data);
        }
        if (message.log !== "") {
            writer.uint32(26).string(message.log);
        }
        if (message.info !== "") {
            writer.uint32(34).string(message.info);
        }
        if (message.gasWanted !== BigInt(0)) {
            writer.uint32(40).int64(message.gasWanted);
        }
        if (message.gasUsed !== BigInt(0)) {
            writer.uint32(48).int64(message.gasUsed);
        }
        for (const v of message.events) {
            exports.Event.encode(v, writer.uint32(58).fork()).ldelim();
        }
        if (message.codespace !== "") {
            writer.uint32(66).string(message.codespace);
        }
        return writer;
    },
    decode(input, length) {
        const reader = input instanceof binary_1.BinaryReader ? input : new binary_1.BinaryReader(input);
        let end = length === undefined ? reader.len : reader.pos + length;
        const message = createBaseResponseCheckTx();
        while (reader.pos < end) {
            const tag = reader.uint32();
            switch (tag >>> 3) {
                case 1:
                    message.code = reader.uint32();
                    break;
                case 2:
                    message.data = reader.bytes();
                    break;
                case 3:
                    message.log = reader.string();
                    break;
                case 4:
                    message.info = reader.string();
                    break;
                case 5:
                    message.gasWanted = reader.int64();
                    break;
                case 6:
                    message.gasUsed = reader.int64();
                    break;
                case 7:
                    message.events.push(exports.Event.decode(reader, reader.uint32()));
                    break;
                case 8:
                    message.codespace = reader.string();
                    break;
                default:
                    reader.skipType(tag & 7);
                    break;
            }
        }
        return message;
    },
    fromPartial(object) {
        const message = createBaseResponseCheckTx();
        message.code = object.code ?? 0;
        message.data = object.data ?? new Uint8Array();
        message.log = object.log ?? "";
        message.info = object.info ?? "";
        message.gasWanted = object.gasWanted !== undefined && object.gasWanted !== null ? BigInt(object.gasWanted.toString()) : BigInt(0);
        message.gasUsed = object.gasUsed !== undefined && object.gasUsed !== null ? BigInt(object.gasUsed.toString()) : BigInt(0);
        message.events = object.events?.map(e => exports.Event.fromPartial(e)) || [];
        message.codespace = object.codespace ?? "";
        return message;
    },
    fromAmino(object) {
        const message = createBaseResponseCheckTx();
        if (object.code !== undefined && object.code !== null) {
            message.code = object.code;
        }
        if (object.data !== undefined && object.data !== null) {
            message.data = (0, helpers_1.bytesFromBase64)(object.data);
        }
        if (object.log !== undefined && object.log !== null) {
            message.log = object.log;
        }
        if (object.info !== undefined && object.info !== null) {
            message.info = object.info;
        }
        if (object.gas_wanted !== undefined && object.gas_wanted !== null) {
            message.gasWanted = BigInt(object.gas_wanted);
        }
        if (object.gas_used !== undefined && object.gas_used !== null) {
            message.gasUsed = BigInt(object.gas_used);
        }
        message.events = object.events?.map(e => exports.Event.fromAmino(e)) || [];
        if (object.codespace !== undefined && object.codespace !== null) {
            message.codespace = object.codespace;
        }
        return message;
    },
    toAmino(message) {
        const obj = {};
        obj.code = message.code === 0 ? undefined : message.code;
        obj.data = message.data ? (0, helpers_1.base64FromBytes)(message.data) : undefined;
        obj.log = message.log === "" ? undefined : message.log;
        obj.info = message.info === "" ? undefined : message.info;
        obj.gas_wanted = message.gasWanted !== BigInt(0) ? message.gasWanted?.toString() : undefined;
        obj.gas_used = message.gasUsed !== BigInt(0) ? message.gasUsed?.toString() : undefined;
        if (message.events) {
            obj.events = message.events.map(e => e ? exports.Event.toAmino(e) : undefined);
        }
        else {
            obj.events = message.events;
        }
        obj.codespace = message.codespace === "" ? undefined : message.codespace;
        return obj;
    },
    fromAminoMsg(object) {
        return exports.ResponseCheckTx.fromAmino(object.value);
    },
    fromProtoMsg(message) {
        return exports.ResponseCheckTx.decode(message.value);
    },
    toProto(message) {
        return exports.ResponseCheckTx.encode(message).finish();
    },
    toProtoMsg(message) {
        return {
            typeUrl: "/tendermint.abci.ResponseCheckTx",
            value: exports.ResponseCheckTx.encode(message).finish()
        };
    }
};
registry_1.GlobalDecoderRegistry.register(exports.ResponseCheckTx.typeUrl, exports.ResponseCheckTx);
function createBaseResponseCommit() {
    return {
        retainHeight: BigInt(0)
    };
}
exports.ResponseCommit = {
    typeUrl: "/tendermint.abci.ResponseCommit",
    is(o) {
        return o && (o.$typeUrl === exports.ResponseCommit.typeUrl || typeof o.retainHeight === "bigint");
    },
    isSDK(o) {
        return o && (o.$typeUrl === exports.ResponseCommit.typeUrl || typeof o.retain_height === "bigint");
    },
    isAmino(o) {
        return o && (o.$typeUrl === exports.ResponseCommit.typeUrl || typeof o.retain_height === "bigint");
    },
    encode(message, writer = binary_1.BinaryWriter.create()) {
        if (message.retainHeight !== BigInt(0)) {
            writer.uint32(24).int64(message.retainHeight);
        }
        return writer;
    },
    decode(input, length) {
        const reader = input instanceof binary_1.BinaryReader ? input : new binary_1.BinaryReader(input);
        let end = length === undefined ? reader.len : reader.pos + length;
        const message = createBaseResponseCommit();
        while (reader.pos < end) {
            const tag = reader.uint32();
            switch (tag >>> 3) {
                case 3:
                    message.retainHeight = reader.int64();
                    break;
                default:
                    reader.skipType(tag & 7);
                    break;
            }
        }
        return message;
    },
    fromPartial(object) {
        const message = createBaseResponseCommit();
        message.retainHeight = object.retainHeight !== undefined && object.retainHeight !== null ? BigInt(object.retainHeight.toString()) : BigInt(0);
        return message;
    },
    fromAmino(object) {
        const message = createBaseResponseCommit();
        if (object.retain_height !== undefined && object.retain_height !== null) {
            message.retainHeight = BigInt(object.retain_height);
        }
        return message;
    },
    toAmino(message) {
        const obj = {};
        obj.retain_height = message.retainHeight !== BigInt(0) ? message.retainHeight?.toString() : undefined;
        return obj;
    },
    fromAminoMsg(object) {
        return exports.ResponseCommit.fromAmino(object.value);
    },
    fromProtoMsg(message) {
        return exports.ResponseCommit.decode(message.value);
    },
    toProto(message) {
        return exports.ResponseCommit.encode(message).finish();
    },
    toProtoMsg(message) {
        return {
            typeUrl: "/tendermint.abci.ResponseCommit",
            value: exports.ResponseCommit.encode(message).finish()
        };
    }
};
registry_1.GlobalDecoderRegistry.register(exports.ResponseCommit.typeUrl, exports.ResponseCommit);
function createBaseResponseListSnapshots() {
    return {
        snapshots: []
    };
}
exports.ResponseListSnapshots = {
    typeUrl: "/tendermint.abci.ResponseListSnapshots",
    is(o) {
        return o && (o.$typeUrl === exports.ResponseListSnapshots.typeUrl || Array.isArray(o.snapshots) && (!o.snapshots.length || exports.Snapshot.is(o.snapshots[0])));
    },
    isSDK(o) {
        return o && (o.$typeUrl === exports.ResponseListSnapshots.typeUrl || Array.isArray(o.snapshots) && (!o.snapshots.length || exports.Snapshot.isSDK(o.snapshots[0])));
    },
    isAmino(o) {
        return o && (o.$typeUrl === exports.ResponseListSnapshots.typeUrl || Array.isArray(o.snapshots) && (!o.snapshots.length || exports.Snapshot.isAmino(o.snapshots[0])));
    },
    encode(message, writer = binary_1.BinaryWriter.create()) {
        for (const v of message.snapshots) {
            exports.Snapshot.encode(v, writer.uint32(10).fork()).ldelim();
        }
        return writer;
    },
    decode(input, length) {
        const reader = input instanceof binary_1.BinaryReader ? input : new binary_1.BinaryReader(input);
        let end = length === undefined ? reader.len : reader.pos + length;
        const message = createBaseResponseListSnapshots();
        while (reader.pos < end) {
            const tag = reader.uint32();
            switch (tag >>> 3) {
                case 1:
                    message.snapshots.push(exports.Snapshot.decode(reader, reader.uint32()));
                    break;
                default:
                    reader.skipType(tag & 7);
                    break;
            }
        }
        return message;
    },
    fromPartial(object) {
        const message = createBaseResponseListSnapshots();
        message.snapshots = object.snapshots?.map(e => exports.Snapshot.fromPartial(e)) || [];
        return message;
    },
    fromAmino(object) {
        const message = createBaseResponseListSnapshots();
        message.snapshots = object.snapshots?.map(e => exports.Snapshot.fromAmino(e)) || [];
        return message;
    },
    toAmino(message) {
        const obj = {};
        if (message.snapshots) {
            obj.snapshots = message.snapshots.map(e => e ? exports.Snapshot.toAmino(e) : undefined);
        }
        else {
            obj.snapshots = message.snapshots;
        }
        return obj;
    },
    fromAminoMsg(object) {
        return exports.ResponseListSnapshots.fromAmino(object.value);
    },
    fromProtoMsg(message) {
        return exports.ResponseListSnapshots.decode(message.value);
    },
    toProto(message) {
        return exports.ResponseListSnapshots.encode(message).finish();
    },
    toProtoMsg(message) {
        return {
            typeUrl: "/tendermint.abci.ResponseListSnapshots",
            value: exports.ResponseListSnapshots.encode(message).finish()
        };
    }
};
registry_1.GlobalDecoderRegistry.register(exports.ResponseListSnapshots.typeUrl, exports.ResponseListSnapshots);
function createBaseResponseOfferSnapshot() {
    return {
        result: 0
    };
}
exports.ResponseOfferSnapshot = {
    typeUrl: "/tendermint.abci.ResponseOfferSnapshot",
    is(o) {
        return o && (o.$typeUrl === exports.ResponseOfferSnapshot.typeUrl || (0, helpers_1.isSet)(o.result));
    },
    isSDK(o) {
        return o && (o.$typeUrl === exports.ResponseOfferSnapshot.typeUrl || (0, helpers_1.isSet)(o.result));
    },
    isAmino(o) {
        return o && (o.$typeUrl === exports.ResponseOfferSnapshot.typeUrl || (0, helpers_1.isSet)(o.result));
    },
    encode(message, writer = binary_1.BinaryWriter.create()) {
        if (message.result !== 0) {
            writer.uint32(8).int32(message.result);
        }
        return writer;
    },
    decode(input, length) {
        const reader = input instanceof binary_1.BinaryReader ? input : new binary_1.BinaryReader(input);
        let end = length === undefined ? reader.len : reader.pos + length;
        const message = createBaseResponseOfferSnapshot();
        while (reader.pos < end) {
            const tag = reader.uint32();
            switch (tag >>> 3) {
                case 1:
                    message.result = reader.int32();
                    break;
                default:
                    reader.skipType(tag & 7);
                    break;
            }
        }
        return message;
    },
    fromPartial(object) {
        const message = createBaseResponseOfferSnapshot();
        message.result = object.result ?? 0;
        return message;
    },
    fromAmino(object) {
        const message = createBaseResponseOfferSnapshot();
        if (object.result !== undefined && object.result !== null) {
            message.result = object.result;
        }
        return message;
    },
    toAmino(message) {
        const obj = {};
        obj.result = message.result === 0 ? undefined : message.result;
        return obj;
    },
    fromAminoMsg(object) {
        return exports.ResponseOfferSnapshot.fromAmino(object.value);
    },
    fromProtoMsg(message) {
        return exports.ResponseOfferSnapshot.decode(message.value);
    },
    toProto(message) {
        return exports.ResponseOfferSnapshot.encode(message).finish();
    },
    toProtoMsg(message) {
        return {
            typeUrl: "/tendermint.abci.ResponseOfferSnapshot",
            value: exports.ResponseOfferSnapshot.encode(message).finish()
        };
    }
};
registry_1.GlobalDecoderRegistry.register(exports.ResponseOfferSnapshot.typeUrl, exports.ResponseOfferSnapshot);
function createBaseResponseLoadSnapshotChunk() {
    return {
        chunk: new Uint8Array()
    };
}
exports.ResponseLoadSnapshotChunk = {
    typeUrl: "/tendermint.abci.ResponseLoadSnapshotChunk",
    is(o) {
        return o && (o.$typeUrl === exports.ResponseLoadSnapshotChunk.typeUrl || o.chunk instanceof Uint8Array || typeof o.chunk === "string");
    },
    isSDK(o) {
        return o && (o.$typeUrl === exports.ResponseLoadSnapshotChunk.typeUrl || o.chunk instanceof Uint8Array || typeof o.chunk === "string");
    },
    isAmino(o) {
        return o && (o.$typeUrl === exports.ResponseLoadSnapshotChunk.typeUrl || o.chunk instanceof Uint8Array || typeof o.chunk === "string");
    },
    encode(message, writer = binary_1.BinaryWriter.create()) {
        if (message.chunk.length !== 0) {
            writer.uint32(10).bytes(message.chunk);
        }
        return writer;
    },
    decode(input, length) {
        const reader = input instanceof binary_1.BinaryReader ? input : new binary_1.BinaryReader(input);
        let end = length === undefined ? reader.len : reader.pos + length;
        const message = createBaseResponseLoadSnapshotChunk();
        while (reader.pos < end) {
            const tag = reader.uint32();
            switch (tag >>> 3) {
                case 1:
                    message.chunk = reader.bytes();
                    break;
                default:
                    reader.skipType(tag & 7);
                    break;
            }
        }
        return message;
    },
    fromPartial(object) {
        const message = createBaseResponseLoadSnapshotChunk();
        message.chunk = object.chunk ?? new Uint8Array();
        return message;
    },
    fromAmino(object) {
        const message = createBaseResponseLoadSnapshotChunk();
        if (object.chunk !== undefined && object.chunk !== null) {
            message.chunk = (0, helpers_1.bytesFromBase64)(object.chunk);
        }
        return message;
    },
    toAmino(message) {
        const obj = {};
        obj.chunk = message.chunk ? (0, helpers_1.base64FromBytes)(message.chunk) : undefined;
        return obj;
    },
    fromAminoMsg(object) {
        return exports.ResponseLoadSnapshotChunk.fromAmino(object.value);
    },
    fromProtoMsg(message) {
        return exports.ResponseLoadSnapshotChunk.decode(message.value);
    },
    toProto(message) {
        return exports.ResponseLoadSnapshotChunk.encode(message).finish();
    },
    toProtoMsg(message) {
        return {
            typeUrl: "/tendermint.abci.ResponseLoadSnapshotChunk",
            value: exports.ResponseLoadSnapshotChunk.encode(message).finish()
        };
    }
};
registry_1.GlobalDecoderRegistry.register(exports.ResponseLoadSnapshotChunk.typeUrl, exports.ResponseLoadSnapshotChunk);
function createBaseResponseApplySnapshotChunk() {
    return {
        result: 0,
        refetchChunks: [],
        rejectSenders: []
    };
}
exports.ResponseApplySnapshotChunk = {
    typeUrl: "/tendermint.abci.ResponseApplySnapshotChunk",
    is(o) {
        return o && (o.$typeUrl === exports.ResponseApplySnapshotChunk.typeUrl || (0, helpers_1.isSet)(o.result) && Array.isArray(o.refetchChunks) && (!o.refetchChunks.length || typeof o.refetchChunks[0] === "number") && Array.isArray(o.rejectSenders) && (!o.rejectSenders.length || typeof o.rejectSenders[0] === "string"));
    },
    isSDK(o) {
        return o && (o.$typeUrl === exports.ResponseApplySnapshotChunk.typeUrl || (0, helpers_1.isSet)(o.result) && Array.isArray(o.refetch_chunks) && (!o.refetch_chunks.length || typeof o.refetch_chunks[0] === "number") && Array.isArray(o.reject_senders) && (!o.reject_senders.length || typeof o.reject_senders[0] === "string"));
    },
    isAmino(o) {
        return o && (o.$typeUrl === exports.ResponseApplySnapshotChunk.typeUrl || (0, helpers_1.isSet)(o.result) && Array.isArray(o.refetch_chunks) && (!o.refetch_chunks.length || typeof o.refetch_chunks[0] === "number") && Array.isArray(o.reject_senders) && (!o.reject_senders.length || typeof o.reject_senders[0] === "string"));
    },
    encode(message, writer = binary_1.BinaryWriter.create()) {
        if (message.result !== 0) {
            writer.uint32(8).int32(message.result);
        }
        writer.uint32(18).fork();
        for (const v of message.refetchChunks) {
            writer.uint32(v);
        }
        writer.ldelim();
        for (const v of message.rejectSenders) {
            writer.uint32(26).string(v);
        }
        return writer;
    },
    decode(input, length) {
        const reader = input instanceof binary_1.BinaryReader ? input : new binary_1.BinaryReader(input);
        let end = length === undefined ? reader.len : reader.pos + length;
        const message = createBaseResponseApplySnapshotChunk();
        while (reader.pos < end) {
            const tag = reader.uint32();
            switch (tag >>> 3) {
                case 1:
                    message.result = reader.int32();
                    break;
                case 2:
                    if ((tag & 7) === 2) {
                        const end2 = reader.uint32() + reader.pos;
                        while (reader.pos < end2) {
                            message.refetchChunks.push(reader.uint32());
                        }
                    }
                    else {
                        message.refetchChunks.push(reader.uint32());
                    }
                    break;
                case 3:
                    message.rejectSenders.push(reader.string());
                    break;
                default:
                    reader.skipType(tag & 7);
                    break;
            }
        }
        return message;
    },
    fromPartial(object) {
        const message = createBaseResponseApplySnapshotChunk();
        message.result = object.result ?? 0;
        message.refetchChunks = object.refetchChunks?.map(e => e) || [];
        message.rejectSenders = object.rejectSenders?.map(e => e) || [];
        return message;
    },
    fromAmino(object) {
        const message = createBaseResponseApplySnapshotChunk();
        if (object.result !== undefined && object.result !== null) {
            message.result = object.result;
        }
        message.refetchChunks = object.refetch_chunks?.map(e => e) || [];
        message.rejectSenders = object.reject_senders?.map(e => e) || [];
        return message;
    },
    toAmino(message) {
        const obj = {};
        obj.result = message.result === 0 ? undefined : message.result;
        if (message.refetchChunks) {
            obj.refetch_chunks = message.refetchChunks.map(e => e);
        }
        else {
            obj.refetch_chunks = message.refetchChunks;
        }
        if (message.rejectSenders) {
            obj.reject_senders = message.rejectSenders.map(e => e);
        }
        else {
            obj.reject_senders = message.rejectSenders;
        }
        return obj;
    },
    fromAminoMsg(object) {
        return exports.ResponseApplySnapshotChunk.fromAmino(object.value);
    },
    fromProtoMsg(message) {
        return exports.ResponseApplySnapshotChunk.decode(message.value);
    },
    toProto(message) {
        return exports.ResponseApplySnapshotChunk.encode(message).finish();
    },
    toProtoMsg(message) {
        return {
            typeUrl: "/tendermint.abci.ResponseApplySnapshotChunk",
            value: exports.ResponseApplySnapshotChunk.encode(message).finish()
        };
    }
};
registry_1.GlobalDecoderRegistry.register(exports.ResponseApplySnapshotChunk.typeUrl, exports.ResponseApplySnapshotChunk);
function createBaseResponsePrepareProposal() {
    return {
        txs: []
    };
}
exports.ResponsePrepareProposal = {
    typeUrl: "/tendermint.abci.ResponsePrepareProposal",
    is(o) {
        return o && (o.$typeUrl === exports.ResponsePrepareProposal.typeUrl || Array.isArray(o.txs) && (!o.txs.length || o.txs[0] instanceof Uint8Array || typeof o.txs[0] === "string"));
    },
    isSDK(o) {
        return o && (o.$typeUrl === exports.ResponsePrepareProposal.typeUrl || Array.isArray(o.txs) && (!o.txs.length || o.txs[0] instanceof Uint8Array || typeof o.txs[0] === "string"));
    },
    isAmino(o) {
        return o && (o.$typeUrl === exports.ResponsePrepareProposal.typeUrl || Array.isArray(o.txs) && (!o.txs.length || o.txs[0] instanceof Uint8Array || typeof o.txs[0] === "string"));
    },
    encode(message, writer = binary_1.BinaryWriter.create()) {
        for (const v of message.txs) {
            writer.uint32(10).bytes(v);
        }
        return writer;
    },
    decode(input, length) {
        const reader = input instanceof binary_1.BinaryReader ? input : new binary_1.BinaryReader(input);
        let end = length === undefined ? reader.len : reader.pos + length;
        const message = createBaseResponsePrepareProposal();
        while (reader.pos < end) {
            const tag = reader.uint32();
            switch (tag >>> 3) {
                case 1:
                    message.txs.push(reader.bytes());
                    break;
                default:
                    reader.skipType(tag & 7);
                    break;
            }
        }
        return message;
    },
    fromPartial(object) {
        const message = createBaseResponsePrepareProposal();
        message.txs = object.txs?.map(e => e) || [];
        return message;
    },
    fromAmino(object) {
        const message = createBaseResponsePrepareProposal();
        message.txs = object.txs?.map(e => (0, helpers_1.bytesFromBase64)(e)) || [];
        return message;
    },
    toAmino(message) {
        const obj = {};
        if (message.txs) {
            obj.txs = message.txs.map(e => (0, helpers_1.base64FromBytes)(e));
        }
        else {
            obj.txs = message.txs;
        }
        return obj;
    },
    fromAminoMsg(object) {
        return exports.ResponsePrepareProposal.fromAmino(object.value);
    },
    fromProtoMsg(message) {
        return exports.ResponsePrepareProposal.decode(message.value);
    },
    toProto(message) {
        return exports.ResponsePrepareProposal.encode(message).finish();
    },
    toProtoMsg(message) {
        return {
            typeUrl: "/tendermint.abci.ResponsePrepareProposal",
            value: exports.ResponsePrepareProposal.encode(message).finish()
        };
    }
};
registry_1.GlobalDecoderRegistry.register(exports.ResponsePrepareProposal.typeUrl, exports.ResponsePrepareProposal);
function createBaseResponseProcessProposal() {
    return {
        status: 0
    };
}
exports.ResponseProcessProposal = {
    typeUrl: "/tendermint.abci.ResponseProcessProposal",
    is(o) {
        return o && (o.$typeUrl === exports.ResponseProcessProposal.typeUrl || (0, helpers_1.isSet)(o.status));
    },
    isSDK(o) {
        return o && (o.$typeUrl === exports.ResponseProcessProposal.typeUrl || (0, helpers_1.isSet)(o.status));
    },
    isAmino(o) {
        return o && (o.$typeUrl === exports.ResponseProcessProposal.typeUrl || (0, helpers_1.isSet)(o.status));
    },
    encode(message, writer = binary_1.BinaryWriter.create()) {
        if (message.status !== 0) {
            writer.uint32(8).int32(message.status);
        }
        return writer;
    },
    decode(input, length) {
        const reader = input instanceof binary_1.BinaryReader ? input : new binary_1.BinaryReader(input);
        let end = length === undefined ? reader.len : reader.pos + length;
        const message = createBaseResponseProcessProposal();
        while (reader.pos < end) {
            const tag = reader.uint32();
            switch (tag >>> 3) {
                case 1:
                    message.status = reader.int32();
                    break;
                default:
                    reader.skipType(tag & 7);
                    break;
            }
        }
        return message;
    },
    fromPartial(object) {
        const message = createBaseResponseProcessProposal();
        message.status = object.status ?? 0;
        return message;
    },
    fromAmino(object) {
        const message = createBaseResponseProcessProposal();
        if (object.status !== undefined && object.status !== null) {
            message.status = object.status;
        }
        return message;
    },
    toAmino(message) {
        const obj = {};
        obj.status = message.status === 0 ? undefined : message.status;
        return obj;
    },
    fromAminoMsg(object) {
        return exports.ResponseProcessProposal.fromAmino(object.value);
    },
    fromProtoMsg(message) {
        return exports.ResponseProcessProposal.decode(message.value);
    },
    toProto(message) {
        return exports.ResponseProcessProposal.encode(message).finish();
    },
    toProtoMsg(message) {
        return {
            typeUrl: "/tendermint.abci.ResponseProcessProposal",
            value: exports.ResponseProcessProposal.encode(message).finish()
        };
    }
};
registry_1.GlobalDecoderRegistry.register(exports.ResponseProcessProposal.typeUrl, exports.ResponseProcessProposal);
function createBaseResponseExtendVote() {
    return {
        voteExtension: new Uint8Array()
    };
}
exports.ResponseExtendVote = {
    typeUrl: "/tendermint.abci.ResponseExtendVote",
    is(o) {
        return o && (o.$typeUrl === exports.ResponseExtendVote.typeUrl || o.voteExtension instanceof Uint8Array || typeof o.voteExtension === "string");
    },
    isSDK(o) {
        return o && (o.$typeUrl === exports.ResponseExtendVote.typeUrl || o.vote_extension instanceof Uint8Array || typeof o.vote_extension === "string");
    },
    isAmino(o) {
        return o && (o.$typeUrl === exports.ResponseExtendVote.typeUrl || o.vote_extension instanceof Uint8Array || typeof o.vote_extension === "string");
    },
    encode(message, writer = binary_1.BinaryWriter.create()) {
        if (message.voteExtension.length !== 0) {
            writer.uint32(10).bytes(message.voteExtension);
        }
        return writer;
    },
    decode(input, length) {
        const reader = input instanceof binary_1.BinaryReader ? input : new binary_1.BinaryReader(input);
        let end = length === undefined ? reader.len : reader.pos + length;
        const message = createBaseResponseExtendVote();
        while (reader.pos < end) {
            const tag = reader.uint32();
            switch (tag >>> 3) {
                case 1:
                    message.voteExtension = reader.bytes();
                    break;
                default:
                    reader.skipType(tag & 7);
                    break;
            }
        }
        return message;
    },
    fromPartial(object) {
        const message = createBaseResponseExtendVote();
        message.voteExtension = object.voteExtension ?? new Uint8Array();
        return message;
    },
    fromAmino(object) {
        const message = createBaseResponseExtendVote();
        if (object.vote_extension !== undefined && object.vote_extension !== null) {
            message.voteExtension = (0, helpers_1.bytesFromBase64)(object.vote_extension);
        }
        return message;
    },
    toAmino(message) {
        const obj = {};
        obj.vote_extension = message.voteExtension ? (0, helpers_1.base64FromBytes)(message.voteExtension) : undefined;
        return obj;
    },
    fromAminoMsg(object) {
        return exports.ResponseExtendVote.fromAmino(object.value);
    },
    fromProtoMsg(message) {
        return exports.ResponseExtendVote.decode(message.value);
    },
    toProto(message) {
        return exports.ResponseExtendVote.encode(message).finish();
    },
    toProtoMsg(message) {
        return {
            typeUrl: "/tendermint.abci.ResponseExtendVote",
            value: exports.ResponseExtendVote.encode(message).finish()
        };
    }
};
registry_1.GlobalDecoderRegistry.register(exports.ResponseExtendVote.typeUrl, exports.ResponseExtendVote);
function createBaseResponseVerifyVoteExtension() {
    return {
        status: 0
    };
}
exports.ResponseVerifyVoteExtension = {
    typeUrl: "/tendermint.abci.ResponseVerifyVoteExtension",
    is(o) {
        return o && (o.$typeUrl === exports.ResponseVerifyVoteExtension.typeUrl || (0, helpers_1.isSet)(o.status));
    },
    isSDK(o) {
        return o && (o.$typeUrl === exports.ResponseVerifyVoteExtension.typeUrl || (0, helpers_1.isSet)(o.status));
    },
    isAmino(o) {
        return o && (o.$typeUrl === exports.ResponseVerifyVoteExtension.typeUrl || (0, helpers_1.isSet)(o.status));
    },
    encode(message, writer = binary_1.BinaryWriter.create()) {
        if (message.status !== 0) {
            writer.uint32(8).int32(message.status);
        }
        return writer;
    },
    decode(input, length) {
        const reader = input instanceof binary_1.BinaryReader ? input : new binary_1.BinaryReader(input);
        let end = length === undefined ? reader.len : reader.pos + length;
        const message = createBaseResponseVerifyVoteExtension();
        while (reader.pos < end) {
            const tag = reader.uint32();
            switch (tag >>> 3) {
                case 1:
                    message.status = reader.int32();
                    break;
                default:
                    reader.skipType(tag & 7);
                    break;
            }
        }
        return message;
    },
    fromPartial(object) {
        const message = createBaseResponseVerifyVoteExtension();
        message.status = object.status ?? 0;
        return message;
    },
    fromAmino(object) {
        const message = createBaseResponseVerifyVoteExtension();
        if (object.status !== undefined && object.status !== null) {
            message.status = object.status;
        }
        return message;
    },
    toAmino(message) {
        const obj = {};
        obj.status = message.status === 0 ? undefined : message.status;
        return obj;
    },
    fromAminoMsg(object) {
        return exports.ResponseVerifyVoteExtension.fromAmino(object.value);
    },
    fromProtoMsg(message) {
        return exports.ResponseVerifyVoteExtension.decode(message.value);
    },
    toProto(message) {
        return exports.ResponseVerifyVoteExtension.encode(message).finish();
    },
    toProtoMsg(message) {
        return {
            typeUrl: "/tendermint.abci.ResponseVerifyVoteExtension",
            value: exports.ResponseVerifyVoteExtension.encode(message).finish()
        };
    }
};
registry_1.GlobalDecoderRegistry.register(exports.ResponseVerifyVoteExtension.typeUrl, exports.ResponseVerifyVoteExtension);
function createBaseResponseFinalizeBlock() {
    return {
        events: [],
        txResults: [],
        validatorUpdates: [],
        consensusParamUpdates: undefined,
        appHash: new Uint8Array()
    };
}
exports.ResponseFinalizeBlock = {
    typeUrl: "/tendermint.abci.ResponseFinalizeBlock",
    is(o) {
        return o && (o.$typeUrl === exports.ResponseFinalizeBlock.typeUrl || Array.isArray(o.events) && (!o.events.length || exports.Event.is(o.events[0])) && Array.isArray(o.txResults) && (!o.txResults.length || exports.ExecTxResult.is(o.txResults[0])) && Array.isArray(o.validatorUpdates) && (!o.validatorUpdates.length || exports.ValidatorUpdate.is(o.validatorUpdates[0])) && (o.appHash instanceof Uint8Array || typeof o.appHash === "string"));
    },
    isSDK(o) {
        return o && (o.$typeUrl === exports.ResponseFinalizeBlock.typeUrl || Array.isArray(o.events) && (!o.events.length || exports.Event.isSDK(o.events[0])) && Array.isArray(o.tx_results) && (!o.tx_results.length || exports.ExecTxResult.isSDK(o.tx_results[0])) && Array.isArray(o.validator_updates) && (!o.validator_updates.length || exports.ValidatorUpdate.isSDK(o.validator_updates[0])) && (o.app_hash instanceof Uint8Array || typeof o.app_hash === "string"));
    },
    isAmino(o) {
        return o && (o.$typeUrl === exports.ResponseFinalizeBlock.typeUrl || Array.isArray(o.events) && (!o.events.length || exports.Event.isAmino(o.events[0])) && Array.isArray(o.tx_results) && (!o.tx_results.length || exports.ExecTxResult.isAmino(o.tx_results[0])) && Array.isArray(o.validator_updates) && (!o.validator_updates.length || exports.ValidatorUpdate.isAmino(o.validator_updates[0])) && (o.app_hash instanceof Uint8Array || typeof o.app_hash === "string"));
    },
    encode(message, writer = binary_1.BinaryWriter.create()) {
        for (const v of message.events) {
            exports.Event.encode(v, writer.uint32(10).fork()).ldelim();
        }
        for (const v of message.txResults) {
            exports.ExecTxResult.encode(v, writer.uint32(18).fork()).ldelim();
        }
        for (const v of message.validatorUpdates) {
            exports.ValidatorUpdate.encode(v, writer.uint32(26).fork()).ldelim();
        }
        if (message.consensusParamUpdates !== undefined) {
            params_1.ConsensusParams.encode(message.consensusParamUpdates, writer.uint32(34).fork()).ldelim();
        }
        if (message.appHash.length !== 0) {
            writer.uint32(42).bytes(message.appHash);
        }
        return writer;
    },
    decode(input, length) {
        const reader = input instanceof binary_1.BinaryReader ? input : new binary_1.BinaryReader(input);
        let end = length === undefined ? reader.len : reader.pos + length;
        const message = createBaseResponseFinalizeBlock();
        while (reader.pos < end) {
            const tag = reader.uint32();
            switch (tag >>> 3) {
                case 1:
                    message.events.push(exports.Event.decode(reader, reader.uint32()));
                    break;
                case 2:
                    message.txResults.push(exports.ExecTxResult.decode(reader, reader.uint32()));
                    break;
                case 3:
                    message.validatorUpdates.push(exports.ValidatorUpdate.decode(reader, reader.uint32()));
                    break;
                case 4:
                    message.consensusParamUpdates = params_1.ConsensusParams.decode(reader, reader.uint32());
                    break;
                case 5:
                    message.appHash = reader.bytes();
                    break;
                default:
                    reader.skipType(tag & 7);
                    break;
            }
        }
        return message;
    },
    fromPartial(object) {
        const message = createBaseResponseFinalizeBlock();
        message.events = object.events?.map(e => exports.Event.fromPartial(e)) || [];
        message.txResults = object.txResults?.map(e => exports.ExecTxResult.fromPartial(e)) || [];
        message.validatorUpdates = object.validatorUpdates?.map(e => exports.ValidatorUpdate.fromPartial(e)) || [];
        message.consensusParamUpdates = object.consensusParamUpdates !== undefined && object.consensusParamUpdates !== null ? params_1.ConsensusParams.fromPartial(object.consensusParamUpdates) : undefined;
        message.appHash = object.appHash ?? new Uint8Array();
        return message;
    },
    fromAmino(object) {
        const message = createBaseResponseFinalizeBlock();
        message.events = object.events?.map(e => exports.Event.fromAmino(e)) || [];
        message.txResults = object.tx_results?.map(e => exports.ExecTxResult.fromAmino(e)) || [];
        message.validatorUpdates = object.validator_updates?.map(e => exports.ValidatorUpdate.fromAmino(e)) || [];
        if (object.consensus_param_updates !== undefined && object.consensus_param_updates !== null) {
            message.consensusParamUpdates = params_1.ConsensusParams.fromAmino(object.consensus_param_updates);
        }
        if (object.app_hash !== undefined && object.app_hash !== null) {
            message.appHash = (0, helpers_1.bytesFromBase64)(object.app_hash);
        }
        return message;
    },
    toAmino(message) {
        const obj = {};
        if (message.events) {
            obj.events = message.events.map(e => e ? exports.Event.toAmino(e) : undefined);
        }
        else {
            obj.events = message.events;
        }
        if (message.txResults) {
            obj.tx_results = message.txResults.map(e => e ? exports.ExecTxResult.toAmino(e) : undefined);
        }
        else {
            obj.tx_results = message.txResults;
        }
        if (message.validatorUpdates) {
            obj.validator_updates = message.validatorUpdates.map(e => e ? exports.ValidatorUpdate.toAmino(e) : undefined);
        }
        else {
            obj.validator_updates = message.validatorUpdates;
        }
        obj.consensus_param_updates = message.consensusParamUpdates ? params_1.ConsensusParams.toAmino(message.consensusParamUpdates) : undefined;
        obj.app_hash = message.appHash ? (0, helpers_1.base64FromBytes)(message.appHash) : undefined;
        return obj;
    },
    fromAminoMsg(object) {
        return exports.ResponseFinalizeBlock.fromAmino(object.value);
    },
    fromProtoMsg(message) {
        return exports.ResponseFinalizeBlock.decode(message.value);
    },
    toProto(message) {
        return exports.ResponseFinalizeBlock.encode(message).finish();
    },
    toProtoMsg(message) {
        return {
            typeUrl: "/tendermint.abci.ResponseFinalizeBlock",
            value: exports.ResponseFinalizeBlock.encode(message).finish()
        };
    }
};
registry_1.GlobalDecoderRegistry.register(exports.ResponseFinalizeBlock.typeUrl, exports.ResponseFinalizeBlock);
function createBaseCommitInfo() {
    return {
        round: 0,
        votes: []
    };
}
exports.CommitInfo = {
    typeUrl: "/tendermint.abci.CommitInfo",
    is(o) {
        return o && (o.$typeUrl === exports.CommitInfo.typeUrl || typeof o.round === "number" && Array.isArray(o.votes) && (!o.votes.length || exports.VoteInfo.is(o.votes[0])));
    },
    isSDK(o) {
        return o && (o.$typeUrl === exports.CommitInfo.typeUrl || typeof o.round === "number" && Array.isArray(o.votes) && (!o.votes.length || exports.VoteInfo.isSDK(o.votes[0])));
    },
    isAmino(o) {
        return o && (o.$typeUrl === exports.CommitInfo.typeUrl || typeof o.round === "number" && Array.isArray(o.votes) && (!o.votes.length || exports.VoteInfo.isAmino(o.votes[0])));
    },
    encode(message, writer = binary_1.BinaryWriter.create()) {
        if (message.round !== 0) {
            writer.uint32(8).int32(message.round);
        }
        for (const v of message.votes) {
            exports.VoteInfo.encode(v, writer.uint32(18).fork()).ldelim();
        }
        return writer;
    },
    decode(input, length) {
        const reader = input instanceof binary_1.BinaryReader ? input : new binary_1.BinaryReader(input);
        let end = length === undefined ? reader.len : reader.pos + length;
        const message = createBaseCommitInfo();
        while (reader.pos < end) {
            const tag = reader.uint32();
            switch (tag >>> 3) {
                case 1:
                    message.round = reader.int32();
                    break;
                case 2:
                    message.votes.push(exports.VoteInfo.decode(reader, reader.uint32()));
                    break;
                default:
                    reader.skipType(tag & 7);
                    break;
            }
        }
        return message;
    },
    fromPartial(object) {
        const message = createBaseCommitInfo();
        message.round = object.round ?? 0;
        message.votes = object.votes?.map(e => exports.VoteInfo.fromPartial(e)) || [];
        return message;
    },
    fromAmino(object) {
        const message = createBaseCommitInfo();
        if (object.round !== undefined && object.round !== null) {
            message.round = object.round;
        }
        message.votes = object.votes?.map(e => exports.VoteInfo.fromAmino(e)) || [];
        return message;
    },
    toAmino(message) {
        const obj = {};
        obj.round = message.round === 0 ? undefined : message.round;
        if (message.votes) {
            obj.votes = message.votes.map(e => e ? exports.VoteInfo.toAmino(e) : undefined);
        }
        else {
            obj.votes = message.votes;
        }
        return obj;
    },
    fromAminoMsg(object) {
        return exports.CommitInfo.fromAmino(object.value);
    },
    fromProtoMsg(message) {
        return exports.CommitInfo.decode(message.value);
    },
    toProto(message) {
        return exports.CommitInfo.encode(message).finish();
    },
    toProtoMsg(message) {
        return {
            typeUrl: "/tendermint.abci.CommitInfo",
            value: exports.CommitInfo.encode(message).finish()
        };
    }
};
registry_1.GlobalDecoderRegistry.register(exports.CommitInfo.typeUrl, exports.CommitInfo);
function createBaseExtendedCommitInfo() {
    return {
        round: 0,
        votes: []
    };
}
exports.ExtendedCommitInfo = {
    typeUrl: "/tendermint.abci.ExtendedCommitInfo",
    is(o) {
        return o && (o.$typeUrl === exports.ExtendedCommitInfo.typeUrl || typeof o.round === "number" && Array.isArray(o.votes) && (!o.votes.length || exports.ExtendedVoteInfo.is(o.votes[0])));
    },
    isSDK(o) {
        return o && (o.$typeUrl === exports.ExtendedCommitInfo.typeUrl || typeof o.round === "number" && Array.isArray(o.votes) && (!o.votes.length || exports.ExtendedVoteInfo.isSDK(o.votes[0])));
    },
    isAmino(o) {
        return o && (o.$typeUrl === exports.ExtendedCommitInfo.typeUrl || typeof o.round === "number" && Array.isArray(o.votes) && (!o.votes.length || exports.ExtendedVoteInfo.isAmino(o.votes[0])));
    },
    encode(message, writer = binary_1.BinaryWriter.create()) {
        if (message.round !== 0) {
            writer.uint32(8).int32(message.round);
        }
        for (const v of message.votes) {
            exports.ExtendedVoteInfo.encode(v, writer.uint32(18).fork()).ldelim();
        }
        return writer;
    },
    decode(input, length) {
        const reader = input instanceof binary_1.BinaryReader ? input : new binary_1.BinaryReader(input);
        let end = length === undefined ? reader.len : reader.pos + length;
        const message = createBaseExtendedCommitInfo();
        while (reader.pos < end) {
            const tag = reader.uint32();
            switch (tag >>> 3) {
                case 1:
                    message.round = reader.int32();
                    break;
                case 2:
                    message.votes.push(exports.ExtendedVoteInfo.decode(reader, reader.uint32()));
                    break;
                default:
                    reader.skipType(tag & 7);
                    break;
            }
        }
        return message;
    },
    fromPartial(object) {
        const message = createBaseExtendedCommitInfo();
        message.round = object.round ?? 0;
        message.votes = object.votes?.map(e => exports.ExtendedVoteInfo.fromPartial(e)) || [];
        return message;
    },
    fromAmino(object) {
        const message = createBaseExtendedCommitInfo();
        if (object.round !== undefined && object.round !== null) {
            message.round = object.round;
        }
        message.votes = object.votes?.map(e => exports.ExtendedVoteInfo.fromAmino(e)) || [];
        return message;
    },
    toAmino(message) {
        const obj = {};
        obj.round = message.round === 0 ? undefined : message.round;
        if (message.votes) {
            obj.votes = message.votes.map(e => e ? exports.ExtendedVoteInfo.toAmino(e) : undefined);
        }
        else {
            obj.votes = message.votes;
        }
        return obj;
    },
    fromAminoMsg(object) {
        return exports.ExtendedCommitInfo.fromAmino(object.value);
    },
    fromProtoMsg(message) {
        return exports.ExtendedCommitInfo.decode(message.value);
    },
    toProto(message) {
        return exports.ExtendedCommitInfo.encode(message).finish();
    },
    toProtoMsg(message) {
        return {
            typeUrl: "/tendermint.abci.ExtendedCommitInfo",
            value: exports.ExtendedCommitInfo.encode(message).finish()
        };
    }
};
registry_1.GlobalDecoderRegistry.register(exports.ExtendedCommitInfo.typeUrl, exports.ExtendedCommitInfo);
function createBaseEvent() {
    return {
        type: "",
        attributes: []
    };
}
exports.Event = {
    typeUrl: "/tendermint.abci.Event",
    is(o) {
        return o && (o.$typeUrl === exports.Event.typeUrl || typeof o.type === "string" && Array.isArray(o.attributes) && (!o.attributes.length || exports.EventAttribute.is(o.attributes[0])));
    },
    isSDK(o) {
        return o && (o.$typeUrl === exports.Event.typeUrl || typeof o.type === "string" && Array.isArray(o.attributes) && (!o.attributes.length || exports.EventAttribute.isSDK(o.attributes[0])));
    },
    isAmino(o) {
        return o && (o.$typeUrl === exports.Event.typeUrl || typeof o.type === "string" && Array.isArray(o.attributes) && (!o.attributes.length || exports.EventAttribute.isAmino(o.attributes[0])));
    },
    encode(message, writer = binary_1.BinaryWriter.create()) {
        if (message.type !== "") {
            writer.uint32(10).string(message.type);
        }
        for (const v of message.attributes) {
            exports.EventAttribute.encode(v, writer.uint32(18).fork()).ldelim();
        }
        return writer;
    },
    decode(input, length) {
        const reader = input instanceof binary_1.BinaryReader ? input : new binary_1.BinaryReader(input);
        let end = length === undefined ? reader.len : reader.pos + length;
        const message = createBaseEvent();
        while (reader.pos < end) {
            const tag = reader.uint32();
            switch (tag >>> 3) {
                case 1:
                    message.type = reader.string();
                    break;
                case 2:
                    message.attributes.push(exports.EventAttribute.decode(reader, reader.uint32()));
                    break;
                default:
                    reader.skipType(tag & 7);
                    break;
            }
        }
        return message;
    },
    fromPartial(object) {
        const message = createBaseEvent();
        message.type = object.type ?? "";
        message.attributes = object.attributes?.map(e => exports.EventAttribute.fromPartial(e)) || [];
        return message;
    },
    fromAmino(object) {
        const message = createBaseEvent();
        if (object.type !== undefined && object.type !== null) {
            message.type = object.type;
        }
        message.attributes = object.attributes?.map(e => exports.EventAttribute.fromAmino(e)) || [];
        return message;
    },
    toAmino(message) {
        const obj = {};
        obj.type = message.type === "" ? undefined : message.type;
        if (message.attributes) {
            obj.attributes = message.attributes.map(e => e ? exports.EventAttribute.toAmino(e) : undefined);
        }
        else {
            obj.attributes = message.attributes;
        }
        return obj;
    },
    fromAminoMsg(object) {
        return exports.Event.fromAmino(object.value);
    },
    fromProtoMsg(message) {
        return exports.Event.decode(message.value);
    },
    toProto(message) {
        return exports.Event.encode(message).finish();
    },
    toProtoMsg(message) {
        return {
            typeUrl: "/tendermint.abci.Event",
            value: exports.Event.encode(message).finish()
        };
    }
};
registry_1.GlobalDecoderRegistry.register(exports.Event.typeUrl, exports.Event);
function createBaseEventAttribute() {
    return {
        key: "",
        value: "",
        index: false
    };
}
exports.EventAttribute = {
    typeUrl: "/tendermint.abci.EventAttribute",
    is(o) {
        return o && (o.$typeUrl === exports.EventAttribute.typeUrl || typeof o.key === "string" && typeof o.value === "string" && typeof o.index === "boolean");
    },
    isSDK(o) {
        return o && (o.$typeUrl === exports.EventAttribute.typeUrl || typeof o.key === "string" && typeof o.value === "string" && typeof o.index === "boolean");
    },
    isAmino(o) {
        return o && (o.$typeUrl === exports.EventAttribute.typeUrl || typeof o.key === "string" && typeof o.value === "string" && typeof o.index === "boolean");
    },
    encode(message, writer = binary_1.BinaryWriter.create()) {
        if (message.key !== "") {
            writer.uint32(10).string(message.key);
        }
        if (message.value !== "") {
            writer.uint32(18).string(message.value);
        }
        if (message.index === true) {
            writer.uint32(24).bool(message.index);
        }
        return writer;
    },
    decode(input, length) {
        const reader = input instanceof binary_1.BinaryReader ? input : new binary_1.BinaryReader(input);
        let end = length === undefined ? reader.len : reader.pos + length;
        const message = createBaseEventAttribute();
        while (reader.pos < end) {
            const tag = reader.uint32();
            switch (tag >>> 3) {
                case 1:
                    message.key = reader.string();
                    break;
                case 2:
                    message.value = reader.string();
                    break;
                case 3:
                    message.index = reader.bool();
                    break;
                default:
                    reader.skipType(tag & 7);
                    break;
            }
        }
        return message;
    },
    fromPartial(object) {
        const message = createBaseEventAttribute();
        message.key = object.key ?? "";
        message.value = object.value ?? "";
        message.index = object.index ?? false;
        return message;
    },
    fromAmino(object) {
        const message = createBaseEventAttribute();
        if (object.key !== undefined && object.key !== null) {
            message.key = object.key;
        }
        if (object.value !== undefined && object.value !== null) {
            message.value = object.value;
        }
        if (object.index !== undefined && object.index !== null) {
            message.index = object.index;
        }
        return message;
    },
    toAmino(message) {
        const obj = {};
        obj.key = message.key === "" ? undefined : message.key;
        obj.value = message.value === "" ? undefined : message.value;
        obj.index = message.index === false ? undefined : message.index;
        return obj;
    },
    fromAminoMsg(object) {
        return exports.EventAttribute.fromAmino(object.value);
    },
    fromProtoMsg(message) {
        return exports.EventAttribute.decode(message.value);
    },
    toProto(message) {
        return exports.EventAttribute.encode(message).finish();
    },
    toProtoMsg(message) {
        return {
            typeUrl: "/tendermint.abci.EventAttribute",
            value: exports.EventAttribute.encode(message).finish()
        };
    }
};
registry_1.GlobalDecoderRegistry.register(exports.EventAttribute.typeUrl, exports.EventAttribute);
function createBaseExecTxResult() {
    return {
        code: 0,
        data: new Uint8Array(),
        log: "",
        info: "",
        gasWanted: BigInt(0),
        gasUsed: BigInt(0),
        events: [],
        codespace: ""
    };
}
exports.ExecTxResult = {
    typeUrl: "/tendermint.abci.ExecTxResult",
    is(o) {
        return o && (o.$typeUrl === exports.ExecTxResult.typeUrl || typeof o.code === "number" && (o.data instanceof Uint8Array || typeof o.data === "string") && typeof o.log === "string" && typeof o.info === "string" && typeof o.gasWanted === "bigint" && typeof o.gasUsed === "bigint" && Array.isArray(o.events) && (!o.events.length || exports.Event.is(o.events[0])) && typeof o.codespace === "string");
    },
    isSDK(o) {
        return o && (o.$typeUrl === exports.ExecTxResult.typeUrl || typeof o.code === "number" && (o.data instanceof Uint8Array || typeof o.data === "string") && typeof o.log === "string" && typeof o.info === "string" && typeof o.gas_wanted === "bigint" && typeof o.gas_used === "bigint" && Array.isArray(o.events) && (!o.events.length || exports.Event.isSDK(o.events[0])) && typeof o.codespace === "string");
    },
    isAmino(o) {
        return o && (o.$typeUrl === exports.ExecTxResult.typeUrl || typeof o.code === "number" && (o.data instanceof Uint8Array || typeof o.data === "string") && typeof o.log === "string" && typeof o.info === "string" && typeof o.gas_wanted === "bigint" && typeof o.gas_used === "bigint" && Array.isArray(o.events) && (!o.events.length || exports.Event.isAmino(o.events[0])) && typeof o.codespace === "string");
    },
    encode(message, writer = binary_1.BinaryWriter.create()) {
        if (message.code !== 0) {
            writer.uint32(8).uint32(message.code);
        }
        if (message.data.length !== 0) {
            writer.uint32(18).bytes(message.data);
        }
        if (message.log !== "") {
            writer.uint32(26).string(message.log);
        }
        if (message.info !== "") {
            writer.uint32(34).string(message.info);
        }
        if (message.gasWanted !== BigInt(0)) {
            writer.uint32(40).int64(message.gasWanted);
        }
        if (message.gasUsed !== BigInt(0)) {
            writer.uint32(48).int64(message.gasUsed);
        }
        for (const v of message.events) {
            exports.Event.encode(v, writer.uint32(58).fork()).ldelim();
        }
        if (message.codespace !== "") {
            writer.uint32(66).string(message.codespace);
        }
        return writer;
    },
    decode(input, length) {
        const reader = input instanceof binary_1.BinaryReader ? input : new binary_1.BinaryReader(input);
        let end = length === undefined ? reader.len : reader.pos + length;
        const message = createBaseExecTxResult();
        while (reader.pos < end) {
            const tag = reader.uint32();
            switch (tag >>> 3) {
                case 1:
                    message.code = reader.uint32();
                    break;
                case 2:
                    message.data = reader.bytes();
                    break;
                case 3:
                    message.log = reader.string();
                    break;
                case 4:
                    message.info = reader.string();
                    break;
                case 5:
                    message.gasWanted = reader.int64();
                    break;
                case 6:
                    message.gasUsed = reader.int64();
                    break;
                case 7:
                    message.events.push(exports.Event.decode(reader, reader.uint32()));
                    break;
                case 8:
                    message.codespace = reader.string();
                    break;
                default:
                    reader.skipType(tag & 7);
                    break;
            }
        }
        return message;
    },
    fromPartial(object) {
        const message = createBaseExecTxResult();
        message.code = object.code ?? 0;
        message.data = object.data ?? new Uint8Array();
        message.log = object.log ?? "";
        message.info = object.info ?? "";
        message.gasWanted = object.gasWanted !== undefined && object.gasWanted !== null ? BigInt(object.gasWanted.toString()) : BigInt(0);
        message.gasUsed = object.gasUsed !== undefined && object.gasUsed !== null ? BigInt(object.gasUsed.toString()) : BigInt(0);
        message.events = object.events?.map(e => exports.Event.fromPartial(e)) || [];
        message.codespace = object.codespace ?? "";
        return message;
    },
    fromAmino(object) {
        const message = createBaseExecTxResult();
        if (object.code !== undefined && object.code !== null) {
            message.code = object.code;
        }
        if (object.data !== undefined && object.data !== null) {
            message.data = (0, helpers_1.bytesFromBase64)(object.data);
        }
        if (object.log !== undefined && object.log !== null) {
            message.log = object.log;
        }
        if (object.info !== undefined && object.info !== null) {
            message.info = object.info;
        }
        if (object.gas_wanted !== undefined && object.gas_wanted !== null) {
            message.gasWanted = BigInt(object.gas_wanted);
        }
        if (object.gas_used !== undefined && object.gas_used !== null) {
            message.gasUsed = BigInt(object.gas_used);
        }
        message.events = object.events?.map(e => exports.Event.fromAmino(e)) || [];
        if (object.codespace !== undefined && object.codespace !== null) {
            message.codespace = object.codespace;
        }
        return message;
    },
    toAmino(message) {
        const obj = {};
        obj.code = message.code === 0 ? undefined : message.code;
        obj.data = message.data ? (0, helpers_1.base64FromBytes)(message.data) : undefined;
        obj.log = message.log === "" ? undefined : message.log;
        obj.info = message.info === "" ? undefined : message.info;
        obj.gas_wanted = message.gasWanted !== BigInt(0) ? message.gasWanted?.toString() : undefined;
        obj.gas_used = message.gasUsed !== BigInt(0) ? message.gasUsed?.toString() : undefined;
        if (message.events) {
            obj.events = message.events.map(e => e ? exports.Event.toAmino(e) : undefined);
        }
        else {
            obj.events = message.events;
        }
        obj.codespace = message.codespace === "" ? undefined : message.codespace;
        return obj;
    },
    fromAminoMsg(object) {
        return exports.ExecTxResult.fromAmino(object.value);
    },
    fromProtoMsg(message) {
        return exports.ExecTxResult.decode(message.value);
    },
    toProto(message) {
        return exports.ExecTxResult.encode(message).finish();
    },
    toProtoMsg(message) {
        return {
            typeUrl: "/tendermint.abci.ExecTxResult",
            value: exports.ExecTxResult.encode(message).finish()
        };
    }
};
registry_1.GlobalDecoderRegistry.register(exports.ExecTxResult.typeUrl, exports.ExecTxResult);
function createBaseTxResult() {
    return {
        height: BigInt(0),
        index: 0,
        tx: new Uint8Array(),
        result: exports.ExecTxResult.fromPartial({})
    };
}
exports.TxResult = {
    typeUrl: "/tendermint.abci.TxResult",
    is(o) {
        return o && (o.$typeUrl === exports.TxResult.typeUrl || typeof o.height === "bigint" && typeof o.index === "number" && (o.tx instanceof Uint8Array || typeof o.tx === "string") && exports.ExecTxResult.is(o.result));
    },
    isSDK(o) {
        return o && (o.$typeUrl === exports.TxResult.typeUrl || typeof o.height === "bigint" && typeof o.index === "number" && (o.tx instanceof Uint8Array || typeof o.tx === "string") && exports.ExecTxResult.isSDK(o.result));
    },
    isAmino(o) {
        return o && (o.$typeUrl === exports.TxResult.typeUrl || typeof o.height === "bigint" && typeof o.index === "number" && (o.tx instanceof Uint8Array || typeof o.tx === "string") && exports.ExecTxResult.isAmino(o.result));
    },
    encode(message, writer = binary_1.BinaryWriter.create()) {
        if (message.height !== BigInt(0)) {
            writer.uint32(8).int64(message.height);
        }
        if (message.index !== 0) {
            writer.uint32(16).uint32(message.index);
        }
        if (message.tx.length !== 0) {
            writer.uint32(26).bytes(message.tx);
        }
        if (message.result !== undefined) {
            exports.ExecTxResult.encode(message.result, writer.uint32(34).fork()).ldelim();
        }
        return writer;
    },
    decode(input, length) {
        const reader = input instanceof binary_1.BinaryReader ? input : new binary_1.BinaryReader(input);
        let end = length === undefined ? reader.len : reader.pos + length;
        const message = createBaseTxResult();
        while (reader.pos < end) {
            const tag = reader.uint32();
            switch (tag >>> 3) {
                case 1:
                    message.height = reader.int64();
                    break;
                case 2:
                    message.index = reader.uint32();
                    break;
                case 3:
                    message.tx = reader.bytes();
                    break;
                case 4:
                    message.result = exports.ExecTxResult.decode(reader, reader.uint32());
                    break;
                default:
                    reader.skipType(tag & 7);
                    break;
            }
        }
        return message;
    },
    fromPartial(object) {
        const message = createBaseTxResult();
        message.height = object.height !== undefined && object.height !== null ? BigInt(object.height.toString()) : BigInt(0);
        message.index = object.index ?? 0;
        message.tx = object.tx ?? new Uint8Array();
        message.result = object.result !== undefined && object.result !== null ? exports.ExecTxResult.fromPartial(object.result) : undefined;
        return message;
    },
    fromAmino(object) {
        const message = createBaseTxResult();
        if (object.height !== undefined && object.height !== null) {
            message.height = BigInt(object.height);
        }
        if (object.index !== undefined && object.index !== null) {
            message.index = object.index;
        }
        if (object.tx !== undefined && object.tx !== null) {
            message.tx = (0, helpers_1.bytesFromBase64)(object.tx);
        }
        if (object.result !== undefined && object.result !== null) {
            message.result = exports.ExecTxResult.fromAmino(object.result);
        }
        return message;
    },
    toAmino(message) {
        const obj = {};
        obj.height = message.height !== BigInt(0) ? message.height?.toString() : undefined;
        obj.index = message.index === 0 ? undefined : message.index;
        obj.tx = message.tx ? (0, helpers_1.base64FromBytes)(message.tx) : undefined;
        obj.result = message.result ? exports.ExecTxResult.toAmino(message.result) : undefined;
        return obj;
    },
    fromAminoMsg(object) {
        return exports.TxResult.fromAmino(object.value);
    },
    fromProtoMsg(message) {
        return exports.TxResult.decode(message.value);
    },
    toProto(message) {
        return exports.TxResult.encode(message).finish();
    },
    toProtoMsg(message) {
        return {
            typeUrl: "/tendermint.abci.TxResult",
            value: exports.TxResult.encode(message).finish()
        };
    }
};
registry_1.GlobalDecoderRegistry.register(exports.TxResult.typeUrl, exports.TxResult);
function createBaseValidator() {
    return {
        address: new Uint8Array(),
        power: BigInt(0)
    };
}
exports.Validator = {
    typeUrl: "/tendermint.abci.Validator",
    is(o) {
        return o && (o.$typeUrl === exports.Validator.typeUrl || (o.address instanceof Uint8Array || typeof o.address === "string") && typeof o.power === "bigint");
    },
    isSDK(o) {
        return o && (o.$typeUrl === exports.Validator.typeUrl || (o.address instanceof Uint8Array || typeof o.address === "string") && typeof o.power === "bigint");
    },
    isAmino(o) {
        return o && (o.$typeUrl === exports.Validator.typeUrl || (o.address instanceof Uint8Array || typeof o.address === "string") && typeof o.power === "bigint");
    },
    encode(message, writer = binary_1.BinaryWriter.create()) {
        if (message.address.length !== 0) {
            writer.uint32(10).bytes(message.address);
        }
        if (message.power !== BigInt(0)) {
            writer.uint32(24).int64(message.power);
        }
        return writer;
    },
    decode(input, length) {
        const reader = input instanceof binary_1.BinaryReader ? input : new binary_1.BinaryReader(input);
        let end = length === undefined ? reader.len : reader.pos + length;
        const message = createBaseValidator();
        while (reader.pos < end) {
            const tag = reader.uint32();
            switch (tag >>> 3) {
                case 1:
                    message.address = reader.bytes();
                    break;
                case 3:
                    message.power = reader.int64();
                    break;
                default:
                    reader.skipType(tag & 7);
                    break;
            }
        }
        return message;
    },
    fromPartial(object) {
        const message = createBaseValidator();
        message.address = object.address ?? new Uint8Array();
        message.power = object.power !== undefined && object.power !== null ? BigInt(object.power.toString()) : BigInt(0);
        return message;
    },
    fromAmino(object) {
        const message = createBaseValidator();
        if (object.address !== undefined && object.address !== null) {
            message.address = (0, helpers_1.bytesFromBase64)(object.address);
        }
        if (object.power !== undefined && object.power !== null) {
            message.power = BigInt(object.power);
        }
        return message;
    },
    toAmino(message) {
        const obj = {};
        obj.address = message.address ? (0, helpers_1.base64FromBytes)(message.address) : undefined;
        obj.power = message.power !== BigInt(0) ? message.power?.toString() : undefined;
        return obj;
    },
    fromAminoMsg(object) {
        return exports.Validator.fromAmino(object.value);
    },
    fromProtoMsg(message) {
        return exports.Validator.decode(message.value);
    },
    toProto(message) {
        return exports.Validator.encode(message).finish();
    },
    toProtoMsg(message) {
        return {
            typeUrl: "/tendermint.abci.Validator",
            value: exports.Validator.encode(message).finish()
        };
    }
};
registry_1.GlobalDecoderRegistry.register(exports.Validator.typeUrl, exports.Validator);
function createBaseValidatorUpdate() {
    return {
        pubKey: keys_1.PublicKey.fromPartial({}),
        power: BigInt(0)
    };
}
exports.ValidatorUpdate = {
    typeUrl: "/tendermint.abci.ValidatorUpdate",
    is(o) {
        return o && (o.$typeUrl === exports.ValidatorUpdate.typeUrl || keys_1.PublicKey.is(o.pubKey) && typeof o.power === "bigint");
    },
    isSDK(o) {
        return o && (o.$typeUrl === exports.ValidatorUpdate.typeUrl || keys_1.PublicKey.isSDK(o.pub_key) && typeof o.power === "bigint");
    },
    isAmino(o) {
        return o && (o.$typeUrl === exports.ValidatorUpdate.typeUrl || keys_1.PublicKey.isAmino(o.pub_key) && typeof o.power === "bigint");
    },
    encode(message, writer = binary_1.BinaryWriter.create()) {
        if (message.pubKey !== undefined) {
            keys_1.PublicKey.encode(message.pubKey, writer.uint32(10).fork()).ldelim();
        }
        if (message.power !== BigInt(0)) {
            writer.uint32(16).int64(message.power);
        }
        return writer;
    },
    decode(input, length) {
        const reader = input instanceof binary_1.BinaryReader ? input : new binary_1.BinaryReader(input);
        let end = length === undefined ? reader.len : reader.pos + length;
        const message = createBaseValidatorUpdate();
        while (reader.pos < end) {
            const tag = reader.uint32();
            switch (tag >>> 3) {
                case 1:
                    message.pubKey = keys_1.PublicKey.decode(reader, reader.uint32());
                    break;
                case 2:
                    message.power = reader.int64();
                    break;
                default:
                    reader.skipType(tag & 7);
                    break;
            }
        }
        return message;
    },
    fromPartial(object) {
        const message = createBaseValidatorUpdate();
        message.pubKey = object.pubKey !== undefined && object.pubKey !== null ? keys_1.PublicKey.fromPartial(object.pubKey) : undefined;
        message.power = object.power !== undefined && object.power !== null ? BigInt(object.power.toString()) : BigInt(0);
        return message;
    },
    fromAmino(object) {
        const message = createBaseValidatorUpdate();
        if (object.pub_key !== undefined && object.pub_key !== null) {
            message.pubKey = keys_1.PublicKey.fromAmino(object.pub_key);
        }
        if (object.power !== undefined && object.power !== null) {
            message.power = BigInt(object.power);
        }
        return message;
    },
    toAmino(message) {
        const obj = {};
        obj.pub_key = message.pubKey ? keys_1.PublicKey.toAmino(message.pubKey) : undefined;
        obj.power = message.power !== BigInt(0) ? message.power?.toString() : undefined;
        return obj;
    },
    fromAminoMsg(object) {
        return exports.ValidatorUpdate.fromAmino(object.value);
    },
    fromProtoMsg(message) {
        return exports.ValidatorUpdate.decode(message.value);
    },
    toProto(message) {
        return exports.ValidatorUpdate.encode(message).finish();
    },
    toProtoMsg(message) {
        return {
            typeUrl: "/tendermint.abci.ValidatorUpdate",
            value: exports.ValidatorUpdate.encode(message).finish()
        };
    }
};
registry_1.GlobalDecoderRegistry.register(exports.ValidatorUpdate.typeUrl, exports.ValidatorUpdate);
function createBaseVoteInfo() {
    return {
        validator: exports.Validator.fromPartial({}),
        blockIdFlag: 0
    };
}
exports.VoteInfo = {
    typeUrl: "/tendermint.abci.VoteInfo",
    is(o) {
        return o && (o.$typeUrl === exports.VoteInfo.typeUrl || exports.Validator.is(o.validator) && (0, helpers_1.isSet)(o.blockIdFlag));
    },
    isSDK(o) {
        return o && (o.$typeUrl === exports.VoteInfo.typeUrl || exports.Validator.isSDK(o.validator) && (0, helpers_1.isSet)(o.block_id_flag));
    },
    isAmino(o) {
        return o && (o.$typeUrl === exports.VoteInfo.typeUrl || exports.Validator.isAmino(o.validator) && (0, helpers_1.isSet)(o.block_id_flag));
    },
    encode(message, writer = binary_1.BinaryWriter.create()) {
        if (message.validator !== undefined) {
            exports.Validator.encode(message.validator, writer.uint32(10).fork()).ldelim();
        }
        if (message.blockIdFlag !== 0) {
            writer.uint32(24).int32(message.blockIdFlag);
        }
        return writer;
    },
    decode(input, length) {
        const reader = input instanceof binary_1.BinaryReader ? input : new binary_1.BinaryReader(input);
        let end = length === undefined ? reader.len : reader.pos + length;
        const message = createBaseVoteInfo();
        while (reader.pos < end) {
            const tag = reader.uint32();
            switch (tag >>> 3) {
                case 1:
                    message.validator = exports.Validator.decode(reader, reader.uint32());
                    break;
                case 3:
                    message.blockIdFlag = reader.int32();
                    break;
                default:
                    reader.skipType(tag & 7);
                    break;
            }
        }
        return message;
    },
    fromPartial(object) {
        const message = createBaseVoteInfo();
        message.validator = object.validator !== undefined && object.validator !== null ? exports.Validator.fromPartial(object.validator) : undefined;
        message.blockIdFlag = object.blockIdFlag ?? 0;
        return message;
    },
    fromAmino(object) {
        const message = createBaseVoteInfo();
        if (object.validator !== undefined && object.validator !== null) {
            message.validator = exports.Validator.fromAmino(object.validator);
        }
        if (object.block_id_flag !== undefined && object.block_id_flag !== null) {
            message.blockIdFlag = object.block_id_flag;
        }
        return message;
    },
    toAmino(message) {
        const obj = {};
        obj.validator = message.validator ? exports.Validator.toAmino(message.validator) : undefined;
        obj.block_id_flag = message.blockIdFlag === 0 ? undefined : message.blockIdFlag;
        return obj;
    },
    fromAminoMsg(object) {
        return exports.VoteInfo.fromAmino(object.value);
    },
    fromProtoMsg(message) {
        return exports.VoteInfo.decode(message.value);
    },
    toProto(message) {
        return exports.VoteInfo.encode(message).finish();
    },
    toProtoMsg(message) {
        return {
            typeUrl: "/tendermint.abci.VoteInfo",
            value: exports.VoteInfo.encode(message).finish()
        };
    }
};
registry_1.GlobalDecoderRegistry.register(exports.VoteInfo.typeUrl, exports.VoteInfo);
function createBaseExtendedVoteInfo() {
    return {
        validator: exports.Validator.fromPartial({}),
        voteExtension: new Uint8Array(),
        extensionSignature: new Uint8Array(),
        blockIdFlag: 0
    };
}
exports.ExtendedVoteInfo = {
    typeUrl: "/tendermint.abci.ExtendedVoteInfo",
    is(o) {
        return o && (o.$typeUrl === exports.ExtendedVoteInfo.typeUrl || exports.Validator.is(o.validator) && (o.voteExtension instanceof Uint8Array || typeof o.voteExtension === "string") && (o.extensionSignature instanceof Uint8Array || typeof o.extensionSignature === "string") && (0, helpers_1.isSet)(o.blockIdFlag));
    },
    isSDK(o) {
        return o && (o.$typeUrl === exports.ExtendedVoteInfo.typeUrl || exports.Validator.isSDK(o.validator) && (o.vote_extension instanceof Uint8Array || typeof o.vote_extension === "string") && (o.extension_signature instanceof Uint8Array || typeof o.extension_signature === "string") && (0, helpers_1.isSet)(o.block_id_flag));
    },
    isAmino(o) {
        return o && (o.$typeUrl === exports.ExtendedVoteInfo.typeUrl || exports.Validator.isAmino(o.validator) && (o.vote_extension instanceof Uint8Array || typeof o.vote_extension === "string") && (o.extension_signature instanceof Uint8Array || typeof o.extension_signature === "string") && (0, helpers_1.isSet)(o.block_id_flag));
    },
    encode(message, writer = binary_1.BinaryWriter.create()) {
        if (message.validator !== undefined) {
            exports.Validator.encode(message.validator, writer.uint32(10).fork()).ldelim();
        }
        if (message.voteExtension.length !== 0) {
            writer.uint32(26).bytes(message.voteExtension);
        }
        if (message.extensionSignature.length !== 0) {
            writer.uint32(34).bytes(message.extensionSignature);
        }
        if (message.blockIdFlag !== 0) {
            writer.uint32(40).int32(message.blockIdFlag);
        }
        return writer;
    },
    decode(input, length) {
        const reader = input instanceof binary_1.BinaryReader ? input : new binary_1.BinaryReader(input);
        let end = length === undefined ? reader.len : reader.pos + length;
        const message = createBaseExtendedVoteInfo();
        while (reader.pos < end) {
            const tag = reader.uint32();
            switch (tag >>> 3) {
                case 1:
                    message.validator = exports.Validator.decode(reader, reader.uint32());
                    break;
                case 3:
                    message.voteExtension = reader.bytes();
                    break;
                case 4:
                    message.extensionSignature = reader.bytes();
                    break;
                case 5:
                    message.blockIdFlag = reader.int32();
                    break;
                default:
                    reader.skipType(tag & 7);
                    break;
            }
        }
        return message;
    },
    fromPartial(object) {
        const message = createBaseExtendedVoteInfo();
        message.validator = object.validator !== undefined && object.validator !== null ? exports.Validator.fromPartial(object.validator) : undefined;
        message.voteExtension = object.voteExtension ?? new Uint8Array();
        message.extensionSignature = object.extensionSignature ?? new Uint8Array();
        message.blockIdFlag = object.blockIdFlag ?? 0;
        return message;
    },
    fromAmino(object) {
        const message = createBaseExtendedVoteInfo();
        if (object.validator !== undefined && object.validator !== null) {
            message.validator = exports.Validator.fromAmino(object.validator);
        }
        if (object.vote_extension !== undefined && object.vote_extension !== null) {
            message.voteExtension = (0, helpers_1.bytesFromBase64)(object.vote_extension);
        }
        if (object.extension_signature !== undefined && object.extension_signature !== null) {
            message.extensionSignature = (0, helpers_1.bytesFromBase64)(object.extension_signature);
        }
        if (object.block_id_flag !== undefined && object.block_id_flag !== null) {
            message.blockIdFlag = object.block_id_flag;
        }
        return message;
    },
    toAmino(message) {
        const obj = {};
        obj.validator = message.validator ? exports.Validator.toAmino(message.validator) : undefined;
        obj.vote_extension = message.voteExtension ? (0, helpers_1.base64FromBytes)(message.voteExtension) : undefined;
        obj.extension_signature = message.extensionSignature ? (0, helpers_1.base64FromBytes)(message.extensionSignature) : undefined;
        obj.block_id_flag = message.blockIdFlag === 0 ? undefined : message.blockIdFlag;
        return obj;
    },
    fromAminoMsg(object) {
        return exports.ExtendedVoteInfo.fromAmino(object.value);
    },
    fromProtoMsg(message) {
        return exports.ExtendedVoteInfo.decode(message.value);
    },
    toProto(message) {
        return exports.ExtendedVoteInfo.encode(message).finish();
    },
    toProtoMsg(message) {
        return {
            typeUrl: "/tendermint.abci.ExtendedVoteInfo",
            value: exports.ExtendedVoteInfo.encode(message).finish()
        };
    }
};
registry_1.GlobalDecoderRegistry.register(exports.ExtendedVoteInfo.typeUrl, exports.ExtendedVoteInfo);
function createBaseMisbehavior() {
    return {
        type: 0,
        validator: exports.Validator.fromPartial({}),
        height: BigInt(0),
        time: new Date(),
        totalVotingPower: BigInt(0)
    };
}
exports.Misbehavior = {
    typeUrl: "/tendermint.abci.Misbehavior",
    is(o) {
        return o && (o.$typeUrl === exports.Misbehavior.typeUrl || (0, helpers_1.isSet)(o.type) && exports.Validator.is(o.validator) && typeof o.height === "bigint" && timestamp_1.Timestamp.is(o.time) && typeof o.totalVotingPower === "bigint");
    },
    isSDK(o) {
        return o && (o.$typeUrl === exports.Misbehavior.typeUrl || (0, helpers_1.isSet)(o.type) && exports.Validator.isSDK(o.validator) && typeof o.height === "bigint" && timestamp_1.Timestamp.isSDK(o.time) && typeof o.total_voting_power === "bigint");
    },
    isAmino(o) {
        return o && (o.$typeUrl === exports.Misbehavior.typeUrl || (0, helpers_1.isSet)(o.type) && exports.Validator.isAmino(o.validator) && typeof o.height === "bigint" && timestamp_1.Timestamp.isAmino(o.time) && typeof o.total_voting_power === "bigint");
    },
    encode(message, writer = binary_1.BinaryWriter.create()) {
        if (message.type !== 0) {
            writer.uint32(8).int32(message.type);
        }
        if (message.validator !== undefined) {
            exports.Validator.encode(message.validator, writer.uint32(18).fork()).ldelim();
        }
        if (message.height !== BigInt(0)) {
            writer.uint32(24).int64(message.height);
        }
        if (message.time !== undefined) {
            timestamp_1.Timestamp.encode((0, helpers_1.toTimestamp)(message.time), writer.uint32(34).fork()).ldelim();
        }
        if (message.totalVotingPower !== BigInt(0)) {
            writer.uint32(40).int64(message.totalVotingPower);
        }
        return writer;
    },
    decode(input, length) {
        const reader = input instanceof binary_1.BinaryReader ? input : new binary_1.BinaryReader(input);
        let end = length === undefined ? reader.len : reader.pos + length;
        const message = createBaseMisbehavior();
        while (reader.pos < end) {
            const tag = reader.uint32();
            switch (tag >>> 3) {
                case 1:
                    message.type = reader.int32();
                    break;
                case 2:
                    message.validator = exports.Validator.decode(reader, reader.uint32());
                    break;
                case 3:
                    message.height = reader.int64();
                    break;
                case 4:
                    message.time = (0, helpers_1.fromTimestamp)(timestamp_1.Timestamp.decode(reader, reader.uint32()));
                    break;
                case 5:
                    message.totalVotingPower = reader.int64();
                    break;
                default:
                    reader.skipType(tag & 7);
                    break;
            }
        }
        return message;
    },
    fromPartial(object) {
        const message = createBaseMisbehavior();
        message.type = object.type ?? 0;
        message.validator = object.validator !== undefined && object.validator !== null ? exports.Validator.fromPartial(object.validator) : undefined;
        message.height = object.height !== undefined && object.height !== null ? BigInt(object.height.toString()) : BigInt(0);
        message.time = object.time ?? undefined;
        message.totalVotingPower = object.totalVotingPower !== undefined && object.totalVotingPower !== null ? BigInt(object.totalVotingPower.toString()) : BigInt(0);
        return message;
    },
    fromAmino(object) {
        const message = createBaseMisbehavior();
        if (object.type !== undefined && object.type !== null) {
            message.type = object.type;
        }
        if (object.validator !== undefined && object.validator !== null) {
            message.validator = exports.Validator.fromAmino(object.validator);
        }
        if (object.height !== undefined && object.height !== null) {
            message.height = BigInt(object.height);
        }
        if (object.time !== undefined && object.time !== null) {
            message.time = (0, helpers_1.fromTimestamp)(timestamp_1.Timestamp.fromAmino(object.time));
        }
        if (object.total_voting_power !== undefined && object.total_voting_power !== null) {
            message.totalVotingPower = BigInt(object.total_voting_power);
        }
        return message;
    },
    toAmino(message) {
        const obj = {};
        obj.type = message.type === 0 ? undefined : message.type;
        obj.validator = message.validator ? exports.Validator.toAmino(message.validator) : undefined;
        obj.height = message.height !== BigInt(0) ? message.height?.toString() : undefined;
        obj.time = message.time ? timestamp_1.Timestamp.toAmino((0, helpers_1.toTimestamp)(message.time)) : undefined;
        obj.total_voting_power = message.totalVotingPower !== BigInt(0) ? message.totalVotingPower?.toString() : undefined;
        return obj;
    },
    fromAminoMsg(object) {
        return exports.Misbehavior.fromAmino(object.value);
    },
    fromProtoMsg(message) {
        return exports.Misbehavior.decode(message.value);
    },
    toProto(message) {
        return exports.Misbehavior.encode(message).finish();
    },
    toProtoMsg(message) {
        return {
            typeUrl: "/tendermint.abci.Misbehavior",
            value: exports.Misbehavior.encode(message).finish()
        };
    }
};
registry_1.GlobalDecoderRegistry.register(exports.Misbehavior.typeUrl, exports.Misbehavior);
function createBaseSnapshot() {
    return {
        height: BigInt(0),
        format: 0,
        chunks: 0,
        hash: new Uint8Array(),
        metadata: new Uint8Array()
    };
}
exports.Snapshot = {
    typeUrl: "/tendermint.abci.Snapshot",
    is(o) {
        return o && (o.$typeUrl === exports.Snapshot.typeUrl || typeof o.height === "bigint" && typeof o.format === "number" && typeof o.chunks === "number" && (o.hash instanceof Uint8Array || typeof o.hash === "string") && (o.metadata instanceof Uint8Array || typeof o.metadata === "string"));
    },
    isSDK(o) {
        return o && (o.$typeUrl === exports.Snapshot.typeUrl || typeof o.height === "bigint" && typeof o.format === "number" && typeof o.chunks === "number" && (o.hash instanceof Uint8Array || typeof o.hash === "string") && (o.metadata instanceof Uint8Array || typeof o.metadata === "string"));
    },
    isAmino(o) {
        return o && (o.$typeUrl === exports.Snapshot.typeUrl || typeof o.height === "bigint" && typeof o.format === "number" && typeof o.chunks === "number" && (o.hash instanceof Uint8Array || typeof o.hash === "string") && (o.metadata instanceof Uint8Array || typeof o.metadata === "string"));
    },
    encode(message, writer = binary_1.BinaryWriter.create()) {
        if (message.height !== BigInt(0)) {
            writer.uint32(8).uint64(message.height);
        }
        if (message.format !== 0) {
            writer.uint32(16).uint32(message.format);
        }
        if (message.chunks !== 0) {
            writer.uint32(24).uint32(message.chunks);
        }
        if (message.hash.length !== 0) {
            writer.uint32(34).bytes(message.hash);
        }
        if (message.metadata.length !== 0) {
            writer.uint32(42).bytes(message.metadata);
        }
        return writer;
    },
    decode(input, length) {
        const reader = input instanceof binary_1.BinaryReader ? input : new binary_1.BinaryReader(input);
        let end = length === undefined ? reader.len : reader.pos + length;
        const message = createBaseSnapshot();
        while (reader.pos < end) {
            const tag = reader.uint32();
            switch (tag >>> 3) {
                case 1:
                    message.height = reader.uint64();
                    break;
                case 2:
                    message.format = reader.uint32();
                    break;
                case 3:
                    message.chunks = reader.uint32();
                    break;
                case 4:
                    message.hash = reader.bytes();
                    break;
                case 5:
                    message.metadata = reader.bytes();
                    break;
                default:
                    reader.skipType(tag & 7);
                    break;
            }
        }
        return message;
    },
    fromPartial(object) {
        const message = createBaseSnapshot();
        message.height = object.height !== undefined && object.height !== null ? BigInt(object.height.toString()) : BigInt(0);
        message.format = object.format ?? 0;
        message.chunks = object.chunks ?? 0;
        message.hash = object.hash ?? new Uint8Array();
        message.metadata = object.metadata ?? new Uint8Array();
        return message;
    },
    fromAmino(object) {
        const message = createBaseSnapshot();
        if (object.height !== undefined && object.height !== null) {
            message.height = BigInt(object.height);
        }
        if (object.format !== undefined && object.format !== null) {
            message.format = object.format;
        }
        if (object.chunks !== undefined && object.chunks !== null) {
            message.chunks = object.chunks;
        }
        if (object.hash !== undefined && object.hash !== null) {
            message.hash = (0, helpers_1.bytesFromBase64)(object.hash);
        }
        if (object.metadata !== undefined && object.metadata !== null) {
            message.metadata = (0, helpers_1.bytesFromBase64)(object.metadata);
        }
        return message;
    },
    toAmino(message) {
        const obj = {};
        obj.height = message.height !== BigInt(0) ? message.height?.toString() : undefined;
        obj.format = message.format === 0 ? undefined : message.format;
        obj.chunks = message.chunks === 0 ? undefined : message.chunks;
        obj.hash = message.hash ? (0, helpers_1.base64FromBytes)(message.hash) : undefined;
        obj.metadata = message.metadata ? (0, helpers_1.base64FromBytes)(message.metadata) : undefined;
        return obj;
    },
    fromAminoMsg(object) {
        return exports.Snapshot.fromAmino(object.value);
    },
    fromProtoMsg(message) {
        return exports.Snapshot.decode(message.value);
    },
    toProto(message) {
        return exports.Snapshot.encode(message).finish();
    },
    toProtoMsg(message) {
        return {
            typeUrl: "/tendermint.abci.Snapshot",
            value: exports.Snapshot.encode(message).finish()
        };
    }
};
registry_1.GlobalDecoderRegistry.register(exports.Snapshot.typeUrl, exports.Snapshot);
