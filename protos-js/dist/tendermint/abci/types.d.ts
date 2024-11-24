import { ConsensusParams, ConsensusParamsAmino, ConsensusParamsSDKType } from "../types/params";
import { ProofOps, ProofOpsAmino, ProofOpsSDKType } from "../crypto/proof";
import { PublicKey, PublicKeyAmino, PublicKeySDKType } from "../crypto/keys";
import { BlockIDFlag } from "../types/validator";
import { BinaryReader, BinaryWriter } from "../../binary";
export declare enum CheckTxType {
    NEW = 0,
    RECHECK = 1,
    UNRECOGNIZED = -1
}
export declare const CheckTxTypeSDKType: typeof CheckTxType;
export declare const CheckTxTypeAmino: typeof CheckTxType;
export declare function checkTxTypeFromJSON(object: any): CheckTxType;
export declare function checkTxTypeToJSON(object: CheckTxType): string;
export declare enum ResponseOfferSnapshot_Result {
    /** UNKNOWN - Unknown result, abort all snapshot restoration */
    UNKNOWN = 0,
    /** ACCEPT - Snapshot accepted, apply chunks */
    ACCEPT = 1,
    /** ABORT - Abort all snapshot restoration */
    ABORT = 2,
    /** REJECT - Reject this specific snapshot, try others */
    REJECT = 3,
    /** REJECT_FORMAT - Reject all snapshots of this format, try others */
    REJECT_FORMAT = 4,
    /** REJECT_SENDER - Reject all snapshots from the sender(s), try others */
    REJECT_SENDER = 5,
    UNRECOGNIZED = -1
}
export declare const ResponseOfferSnapshot_ResultSDKType: typeof ResponseOfferSnapshot_Result;
export declare const ResponseOfferSnapshot_ResultAmino: typeof ResponseOfferSnapshot_Result;
export declare function responseOfferSnapshot_ResultFromJSON(object: any): ResponseOfferSnapshot_Result;
export declare function responseOfferSnapshot_ResultToJSON(object: ResponseOfferSnapshot_Result): string;
export declare enum ResponseApplySnapshotChunk_Result {
    /** UNKNOWN - Unknown result, abort all snapshot restoration */
    UNKNOWN = 0,
    /** ACCEPT - Chunk successfully accepted */
    ACCEPT = 1,
    /** ABORT - Abort all snapshot restoration */
    ABORT = 2,
    /** RETRY - Retry chunk (combine with refetch and reject) */
    RETRY = 3,
    /** RETRY_SNAPSHOT - Retry snapshot (combine with refetch and reject) */
    RETRY_SNAPSHOT = 4,
    /** REJECT_SNAPSHOT - Reject this snapshot, try others */
    REJECT_SNAPSHOT = 5,
    UNRECOGNIZED = -1
}
export declare const ResponseApplySnapshotChunk_ResultSDKType: typeof ResponseApplySnapshotChunk_Result;
export declare const ResponseApplySnapshotChunk_ResultAmino: typeof ResponseApplySnapshotChunk_Result;
export declare function responseApplySnapshotChunk_ResultFromJSON(object: any): ResponseApplySnapshotChunk_Result;
export declare function responseApplySnapshotChunk_ResultToJSON(object: ResponseApplySnapshotChunk_Result): string;
export declare enum ResponseProcessProposal_ProposalStatus {
    UNKNOWN = 0,
    ACCEPT = 1,
    REJECT = 2,
    UNRECOGNIZED = -1
}
export declare const ResponseProcessProposal_ProposalStatusSDKType: typeof ResponseProcessProposal_ProposalStatus;
export declare const ResponseProcessProposal_ProposalStatusAmino: typeof ResponseProcessProposal_ProposalStatus;
export declare function responseProcessProposal_ProposalStatusFromJSON(object: any): ResponseProcessProposal_ProposalStatus;
export declare function responseProcessProposal_ProposalStatusToJSON(object: ResponseProcessProposal_ProposalStatus): string;
export declare enum ResponseVerifyVoteExtension_VerifyStatus {
    UNKNOWN = 0,
    ACCEPT = 1,
    /**
     * REJECT - Rejecting the vote extension will reject the entire precommit by the sender.
     * Incorrectly implementing this thus has liveness implications as it may affect
     * CometBFT's ability to receive 2/3+ valid votes to finalize the block.
     * Honest nodes should never be rejected.
     */
    REJECT = 2,
    UNRECOGNIZED = -1
}
export declare const ResponseVerifyVoteExtension_VerifyStatusSDKType: typeof ResponseVerifyVoteExtension_VerifyStatus;
export declare const ResponseVerifyVoteExtension_VerifyStatusAmino: typeof ResponseVerifyVoteExtension_VerifyStatus;
export declare function responseVerifyVoteExtension_VerifyStatusFromJSON(object: any): ResponseVerifyVoteExtension_VerifyStatus;
export declare function responseVerifyVoteExtension_VerifyStatusToJSON(object: ResponseVerifyVoteExtension_VerifyStatus): string;
export declare enum MisbehaviorType {
    UNKNOWN = 0,
    DUPLICATE_VOTE = 1,
    LIGHT_CLIENT_ATTACK = 2,
    UNRECOGNIZED = -1
}
export declare const MisbehaviorTypeSDKType: typeof MisbehaviorType;
export declare const MisbehaviorTypeAmino: typeof MisbehaviorType;
export declare function misbehaviorTypeFromJSON(object: any): MisbehaviorType;
export declare function misbehaviorTypeToJSON(object: MisbehaviorType): string;
export interface Request {
    echo?: RequestEcho;
    flush?: RequestFlush;
    info?: RequestInfo;
    initChain?: RequestInitChain;
    query?: RequestQuery;
    checkTx?: RequestCheckTx;
    commit?: RequestCommit;
    listSnapshots?: RequestListSnapshots;
    offerSnapshot?: RequestOfferSnapshot;
    loadSnapshotChunk?: RequestLoadSnapshotChunk;
    applySnapshotChunk?: RequestApplySnapshotChunk;
    prepareProposal?: RequestPrepareProposal;
    processProposal?: RequestProcessProposal;
    extendVote?: RequestExtendVote;
    verifyVoteExtension?: RequestVerifyVoteExtension;
    finalizeBlock?: RequestFinalizeBlock;
}
export interface RequestProtoMsg {
    typeUrl: "/tendermint.abci.Request";
    value: Uint8Array;
}
export interface RequestAmino {
    echo?: RequestEchoAmino;
    flush?: RequestFlushAmino;
    info?: RequestInfoAmino;
    init_chain?: RequestInitChainAmino;
    query?: RequestQueryAmino;
    check_tx?: RequestCheckTxAmino;
    commit?: RequestCommitAmino;
    list_snapshots?: RequestListSnapshotsAmino;
    offer_snapshot?: RequestOfferSnapshotAmino;
    load_snapshot_chunk?: RequestLoadSnapshotChunkAmino;
    apply_snapshot_chunk?: RequestApplySnapshotChunkAmino;
    prepare_proposal?: RequestPrepareProposalAmino;
    process_proposal?: RequestProcessProposalAmino;
    extend_vote?: RequestExtendVoteAmino;
    verify_vote_extension?: RequestVerifyVoteExtensionAmino;
    finalize_block?: RequestFinalizeBlockAmino;
}
export interface RequestAminoMsg {
    type: "/tendermint.abci.Request";
    value: RequestAmino;
}
export interface RequestSDKType {
    echo?: RequestEchoSDKType;
    flush?: RequestFlushSDKType;
    info?: RequestInfoSDKType;
    init_chain?: RequestInitChainSDKType;
    query?: RequestQuerySDKType;
    check_tx?: RequestCheckTxSDKType;
    commit?: RequestCommitSDKType;
    list_snapshots?: RequestListSnapshotsSDKType;
    offer_snapshot?: RequestOfferSnapshotSDKType;
    load_snapshot_chunk?: RequestLoadSnapshotChunkSDKType;
    apply_snapshot_chunk?: RequestApplySnapshotChunkSDKType;
    prepare_proposal?: RequestPrepareProposalSDKType;
    process_proposal?: RequestProcessProposalSDKType;
    extend_vote?: RequestExtendVoteSDKType;
    verify_vote_extension?: RequestVerifyVoteExtensionSDKType;
    finalize_block?: RequestFinalizeBlockSDKType;
}
export interface RequestEcho {
    message: string;
}
export interface RequestEchoProtoMsg {
    typeUrl: "/tendermint.abci.RequestEcho";
    value: Uint8Array;
}
export interface RequestEchoAmino {
    message?: string;
}
export interface RequestEchoAminoMsg {
    type: "/tendermint.abci.RequestEcho";
    value: RequestEchoAmino;
}
export interface RequestEchoSDKType {
    message: string;
}
export interface RequestFlush {
}
export interface RequestFlushProtoMsg {
    typeUrl: "/tendermint.abci.RequestFlush";
    value: Uint8Array;
}
export interface RequestFlushAmino {
}
export interface RequestFlushAminoMsg {
    type: "/tendermint.abci.RequestFlush";
    value: RequestFlushAmino;
}
export interface RequestFlushSDKType {
}
export interface RequestInfo {
    version: string;
    blockVersion: bigint;
    p2pVersion: bigint;
    abciVersion: string;
}
export interface RequestInfoProtoMsg {
    typeUrl: "/tendermint.abci.RequestInfo";
    value: Uint8Array;
}
export interface RequestInfoAmino {
    version?: string;
    block_version?: string;
    p2p_version?: string;
    abci_version?: string;
}
export interface RequestInfoAminoMsg {
    type: "/tendermint.abci.RequestInfo";
    value: RequestInfoAmino;
}
export interface RequestInfoSDKType {
    version: string;
    block_version: bigint;
    p2p_version: bigint;
    abci_version: string;
}
export interface RequestInitChain {
    time: Date;
    chainId: string;
    consensusParams?: ConsensusParams;
    validators: ValidatorUpdate[];
    appStateBytes: Uint8Array;
    initialHeight: bigint;
}
export interface RequestInitChainProtoMsg {
    typeUrl: "/tendermint.abci.RequestInitChain";
    value: Uint8Array;
}
export interface RequestInitChainAmino {
    time?: string;
    chain_id?: string;
    consensus_params?: ConsensusParamsAmino;
    validators?: ValidatorUpdateAmino[];
    app_state_bytes?: string;
    initial_height?: string;
}
export interface RequestInitChainAminoMsg {
    type: "/tendermint.abci.RequestInitChain";
    value: RequestInitChainAmino;
}
export interface RequestInitChainSDKType {
    time: Date;
    chain_id: string;
    consensus_params?: ConsensusParamsSDKType;
    validators: ValidatorUpdateSDKType[];
    app_state_bytes: Uint8Array;
    initial_height: bigint;
}
export interface RequestQuery {
    data: Uint8Array;
    path: string;
    height: bigint;
    prove: boolean;
}
export interface RequestQueryProtoMsg {
    typeUrl: "/tendermint.abci.RequestQuery";
    value: Uint8Array;
}
export interface RequestQueryAmino {
    data?: string;
    path?: string;
    height?: string;
    prove?: boolean;
}
export interface RequestQueryAminoMsg {
    type: "/tendermint.abci.RequestQuery";
    value: RequestQueryAmino;
}
export interface RequestQuerySDKType {
    data: Uint8Array;
    path: string;
    height: bigint;
    prove: boolean;
}
export interface RequestCheckTx {
    tx: Uint8Array;
    type: CheckTxType;
}
export interface RequestCheckTxProtoMsg {
    typeUrl: "/tendermint.abci.RequestCheckTx";
    value: Uint8Array;
}
export interface RequestCheckTxAmino {
    tx?: string;
    type?: CheckTxType;
}
export interface RequestCheckTxAminoMsg {
    type: "/tendermint.abci.RequestCheckTx";
    value: RequestCheckTxAmino;
}
export interface RequestCheckTxSDKType {
    tx: Uint8Array;
    type: CheckTxType;
}
export interface RequestCommit {
}
export interface RequestCommitProtoMsg {
    typeUrl: "/tendermint.abci.RequestCommit";
    value: Uint8Array;
}
export interface RequestCommitAmino {
}
export interface RequestCommitAminoMsg {
    type: "/tendermint.abci.RequestCommit";
    value: RequestCommitAmino;
}
export interface RequestCommitSDKType {
}
/** lists available snapshots */
export interface RequestListSnapshots {
}
export interface RequestListSnapshotsProtoMsg {
    typeUrl: "/tendermint.abci.RequestListSnapshots";
    value: Uint8Array;
}
/** lists available snapshots */
export interface RequestListSnapshotsAmino {
}
export interface RequestListSnapshotsAminoMsg {
    type: "/tendermint.abci.RequestListSnapshots";
    value: RequestListSnapshotsAmino;
}
/** lists available snapshots */
export interface RequestListSnapshotsSDKType {
}
/** offers a snapshot to the application */
export interface RequestOfferSnapshot {
    /** snapshot offered by peers */
    snapshot?: Snapshot;
    /** light client-verified app hash for snapshot height */
    appHash: Uint8Array;
}
export interface RequestOfferSnapshotProtoMsg {
    typeUrl: "/tendermint.abci.RequestOfferSnapshot";
    value: Uint8Array;
}
/** offers a snapshot to the application */
export interface RequestOfferSnapshotAmino {
    /** snapshot offered by peers */
    snapshot?: SnapshotAmino;
    /** light client-verified app hash for snapshot height */
    app_hash?: string;
}
export interface RequestOfferSnapshotAminoMsg {
    type: "/tendermint.abci.RequestOfferSnapshot";
    value: RequestOfferSnapshotAmino;
}
/** offers a snapshot to the application */
export interface RequestOfferSnapshotSDKType {
    snapshot?: SnapshotSDKType;
    app_hash: Uint8Array;
}
/** loads a snapshot chunk */
export interface RequestLoadSnapshotChunk {
    height: bigint;
    format: number;
    chunk: number;
}
export interface RequestLoadSnapshotChunkProtoMsg {
    typeUrl: "/tendermint.abci.RequestLoadSnapshotChunk";
    value: Uint8Array;
}
/** loads a snapshot chunk */
export interface RequestLoadSnapshotChunkAmino {
    height?: string;
    format?: number;
    chunk?: number;
}
export interface RequestLoadSnapshotChunkAminoMsg {
    type: "/tendermint.abci.RequestLoadSnapshotChunk";
    value: RequestLoadSnapshotChunkAmino;
}
/** loads a snapshot chunk */
export interface RequestLoadSnapshotChunkSDKType {
    height: bigint;
    format: number;
    chunk: number;
}
/** Applies a snapshot chunk */
export interface RequestApplySnapshotChunk {
    index: number;
    chunk: Uint8Array;
    sender: string;
}
export interface RequestApplySnapshotChunkProtoMsg {
    typeUrl: "/tendermint.abci.RequestApplySnapshotChunk";
    value: Uint8Array;
}
/** Applies a snapshot chunk */
export interface RequestApplySnapshotChunkAmino {
    index?: number;
    chunk?: string;
    sender?: string;
}
export interface RequestApplySnapshotChunkAminoMsg {
    type: "/tendermint.abci.RequestApplySnapshotChunk";
    value: RequestApplySnapshotChunkAmino;
}
/** Applies a snapshot chunk */
export interface RequestApplySnapshotChunkSDKType {
    index: number;
    chunk: Uint8Array;
    sender: string;
}
export interface RequestPrepareProposal {
    /** the modified transactions cannot exceed this size. */
    maxTxBytes: bigint;
    /**
     * txs is an array of transactions that will be included in a block,
     * sent to the app for possible modifications.
     */
    txs: Uint8Array[];
    localLastCommit: ExtendedCommitInfo;
    misbehavior: Misbehavior[];
    height: bigint;
    time: Date;
    nextValidatorsHash: Uint8Array;
    /** address of the public key of the validator proposing the block. */
    proposerAddress: Uint8Array;
}
export interface RequestPrepareProposalProtoMsg {
    typeUrl: "/tendermint.abci.RequestPrepareProposal";
    value: Uint8Array;
}
export interface RequestPrepareProposalAmino {
    /** the modified transactions cannot exceed this size. */
    max_tx_bytes?: string;
    /**
     * txs is an array of transactions that will be included in a block,
     * sent to the app for possible modifications.
     */
    txs?: string[];
    local_last_commit?: ExtendedCommitInfoAmino;
    misbehavior?: MisbehaviorAmino[];
    height?: string;
    time?: string;
    next_validators_hash?: string;
    /** address of the public key of the validator proposing the block. */
    proposer_address?: string;
}
export interface RequestPrepareProposalAminoMsg {
    type: "/tendermint.abci.RequestPrepareProposal";
    value: RequestPrepareProposalAmino;
}
export interface RequestPrepareProposalSDKType {
    max_tx_bytes: bigint;
    txs: Uint8Array[];
    local_last_commit: ExtendedCommitInfoSDKType;
    misbehavior: MisbehaviorSDKType[];
    height: bigint;
    time: Date;
    next_validators_hash: Uint8Array;
    proposer_address: Uint8Array;
}
export interface RequestProcessProposal {
    txs: Uint8Array[];
    proposedLastCommit: CommitInfo;
    misbehavior: Misbehavior[];
    /** hash is the merkle root hash of the fields of the proposed block. */
    hash: Uint8Array;
    height: bigint;
    time: Date;
    nextValidatorsHash: Uint8Array;
    /** address of the public key of the original proposer of the block. */
    proposerAddress: Uint8Array;
}
export interface RequestProcessProposalProtoMsg {
    typeUrl: "/tendermint.abci.RequestProcessProposal";
    value: Uint8Array;
}
export interface RequestProcessProposalAmino {
    txs?: string[];
    proposed_last_commit?: CommitInfoAmino;
    misbehavior?: MisbehaviorAmino[];
    /** hash is the merkle root hash of the fields of the proposed block. */
    hash?: string;
    height?: string;
    time?: string;
    next_validators_hash?: string;
    /** address of the public key of the original proposer of the block. */
    proposer_address?: string;
}
export interface RequestProcessProposalAminoMsg {
    type: "/tendermint.abci.RequestProcessProposal";
    value: RequestProcessProposalAmino;
}
export interface RequestProcessProposalSDKType {
    txs: Uint8Array[];
    proposed_last_commit: CommitInfoSDKType;
    misbehavior: MisbehaviorSDKType[];
    hash: Uint8Array;
    height: bigint;
    time: Date;
    next_validators_hash: Uint8Array;
    proposer_address: Uint8Array;
}
/** Extends a vote with application-injected data */
export interface RequestExtendVote {
    /** the hash of the block that this vote may be referring to */
    hash: Uint8Array;
    /** the height of the extended vote */
    height: bigint;
    /** info of the block that this vote may be referring to */
    time: Date;
    txs: Uint8Array[];
    proposedLastCommit: CommitInfo;
    misbehavior: Misbehavior[];
    nextValidatorsHash: Uint8Array;
    /** address of the public key of the original proposer of the block. */
    proposerAddress: Uint8Array;
}
export interface RequestExtendVoteProtoMsg {
    typeUrl: "/tendermint.abci.RequestExtendVote";
    value: Uint8Array;
}
/** Extends a vote with application-injected data */
export interface RequestExtendVoteAmino {
    /** the hash of the block that this vote may be referring to */
    hash?: string;
    /** the height of the extended vote */
    height?: string;
    /** info of the block that this vote may be referring to */
    time?: string;
    txs?: string[];
    proposed_last_commit?: CommitInfoAmino;
    misbehavior?: MisbehaviorAmino[];
    next_validators_hash?: string;
    /** address of the public key of the original proposer of the block. */
    proposer_address?: string;
}
export interface RequestExtendVoteAminoMsg {
    type: "/tendermint.abci.RequestExtendVote";
    value: RequestExtendVoteAmino;
}
/** Extends a vote with application-injected data */
export interface RequestExtendVoteSDKType {
    hash: Uint8Array;
    height: bigint;
    time: Date;
    txs: Uint8Array[];
    proposed_last_commit: CommitInfoSDKType;
    misbehavior: MisbehaviorSDKType[];
    next_validators_hash: Uint8Array;
    proposer_address: Uint8Array;
}
/** Verify the vote extension */
export interface RequestVerifyVoteExtension {
    /** the hash of the block that this received vote corresponds to */
    hash: Uint8Array;
    /** the validator that signed the vote extension */
    validatorAddress: Uint8Array;
    height: bigint;
    voteExtension: Uint8Array;
}
export interface RequestVerifyVoteExtensionProtoMsg {
    typeUrl: "/tendermint.abci.RequestVerifyVoteExtension";
    value: Uint8Array;
}
/** Verify the vote extension */
export interface RequestVerifyVoteExtensionAmino {
    /** the hash of the block that this received vote corresponds to */
    hash?: string;
    /** the validator that signed the vote extension */
    validator_address?: string;
    height?: string;
    vote_extension?: string;
}
export interface RequestVerifyVoteExtensionAminoMsg {
    type: "/tendermint.abci.RequestVerifyVoteExtension";
    value: RequestVerifyVoteExtensionAmino;
}
/** Verify the vote extension */
export interface RequestVerifyVoteExtensionSDKType {
    hash: Uint8Array;
    validator_address: Uint8Array;
    height: bigint;
    vote_extension: Uint8Array;
}
export interface RequestFinalizeBlock {
    txs: Uint8Array[];
    decidedLastCommit: CommitInfo;
    misbehavior: Misbehavior[];
    /** hash is the merkle root hash of the fields of the decided block. */
    hash: Uint8Array;
    height: bigint;
    time: Date;
    nextValidatorsHash: Uint8Array;
    /** proposer_address is the address of the public key of the original proposer of the block. */
    proposerAddress: Uint8Array;
}
export interface RequestFinalizeBlockProtoMsg {
    typeUrl: "/tendermint.abci.RequestFinalizeBlock";
    value: Uint8Array;
}
export interface RequestFinalizeBlockAmino {
    txs?: string[];
    decided_last_commit?: CommitInfoAmino;
    misbehavior?: MisbehaviorAmino[];
    /** hash is the merkle root hash of the fields of the decided block. */
    hash?: string;
    height?: string;
    time?: string;
    next_validators_hash?: string;
    /** proposer_address is the address of the public key of the original proposer of the block. */
    proposer_address?: string;
}
export interface RequestFinalizeBlockAminoMsg {
    type: "/tendermint.abci.RequestFinalizeBlock";
    value: RequestFinalizeBlockAmino;
}
export interface RequestFinalizeBlockSDKType {
    txs: Uint8Array[];
    decided_last_commit: CommitInfoSDKType;
    misbehavior: MisbehaviorSDKType[];
    hash: Uint8Array;
    height: bigint;
    time: Date;
    next_validators_hash: Uint8Array;
    proposer_address: Uint8Array;
}
export interface Response {
    exception?: ResponseException;
    echo?: ResponseEcho;
    flush?: ResponseFlush;
    info?: ResponseInfo;
    initChain?: ResponseInitChain;
    query?: ResponseQuery;
    checkTx?: ResponseCheckTx;
    commit?: ResponseCommit;
    listSnapshots?: ResponseListSnapshots;
    offerSnapshot?: ResponseOfferSnapshot;
    loadSnapshotChunk?: ResponseLoadSnapshotChunk;
    applySnapshotChunk?: ResponseApplySnapshotChunk;
    prepareProposal?: ResponsePrepareProposal;
    processProposal?: ResponseProcessProposal;
    extendVote?: ResponseExtendVote;
    verifyVoteExtension?: ResponseVerifyVoteExtension;
    finalizeBlock?: ResponseFinalizeBlock;
}
export interface ResponseProtoMsg {
    typeUrl: "/tendermint.abci.Response";
    value: Uint8Array;
}
export interface ResponseAmino {
    exception?: ResponseExceptionAmino;
    echo?: ResponseEchoAmino;
    flush?: ResponseFlushAmino;
    info?: ResponseInfoAmino;
    init_chain?: ResponseInitChainAmino;
    query?: ResponseQueryAmino;
    check_tx?: ResponseCheckTxAmino;
    commit?: ResponseCommitAmino;
    list_snapshots?: ResponseListSnapshotsAmino;
    offer_snapshot?: ResponseOfferSnapshotAmino;
    load_snapshot_chunk?: ResponseLoadSnapshotChunkAmino;
    apply_snapshot_chunk?: ResponseApplySnapshotChunkAmino;
    prepare_proposal?: ResponsePrepareProposalAmino;
    process_proposal?: ResponseProcessProposalAmino;
    extend_vote?: ResponseExtendVoteAmino;
    verify_vote_extension?: ResponseVerifyVoteExtensionAmino;
    finalize_block?: ResponseFinalizeBlockAmino;
}
export interface ResponseAminoMsg {
    type: "/tendermint.abci.Response";
    value: ResponseAmino;
}
export interface ResponseSDKType {
    exception?: ResponseExceptionSDKType;
    echo?: ResponseEchoSDKType;
    flush?: ResponseFlushSDKType;
    info?: ResponseInfoSDKType;
    init_chain?: ResponseInitChainSDKType;
    query?: ResponseQuerySDKType;
    check_tx?: ResponseCheckTxSDKType;
    commit?: ResponseCommitSDKType;
    list_snapshots?: ResponseListSnapshotsSDKType;
    offer_snapshot?: ResponseOfferSnapshotSDKType;
    load_snapshot_chunk?: ResponseLoadSnapshotChunkSDKType;
    apply_snapshot_chunk?: ResponseApplySnapshotChunkSDKType;
    prepare_proposal?: ResponsePrepareProposalSDKType;
    process_proposal?: ResponseProcessProposalSDKType;
    extend_vote?: ResponseExtendVoteSDKType;
    verify_vote_extension?: ResponseVerifyVoteExtensionSDKType;
    finalize_block?: ResponseFinalizeBlockSDKType;
}
/** nondeterministic */
export interface ResponseException {
    error: string;
}
export interface ResponseExceptionProtoMsg {
    typeUrl: "/tendermint.abci.ResponseException";
    value: Uint8Array;
}
/** nondeterministic */
export interface ResponseExceptionAmino {
    error?: string;
}
export interface ResponseExceptionAminoMsg {
    type: "/tendermint.abci.ResponseException";
    value: ResponseExceptionAmino;
}
/** nondeterministic */
export interface ResponseExceptionSDKType {
    error: string;
}
export interface ResponseEcho {
    message: string;
}
export interface ResponseEchoProtoMsg {
    typeUrl: "/tendermint.abci.ResponseEcho";
    value: Uint8Array;
}
export interface ResponseEchoAmino {
    message?: string;
}
export interface ResponseEchoAminoMsg {
    type: "/tendermint.abci.ResponseEcho";
    value: ResponseEchoAmino;
}
export interface ResponseEchoSDKType {
    message: string;
}
export interface ResponseFlush {
}
export interface ResponseFlushProtoMsg {
    typeUrl: "/tendermint.abci.ResponseFlush";
    value: Uint8Array;
}
export interface ResponseFlushAmino {
}
export interface ResponseFlushAminoMsg {
    type: "/tendermint.abci.ResponseFlush";
    value: ResponseFlushAmino;
}
export interface ResponseFlushSDKType {
}
export interface ResponseInfo {
    data: string;
    version: string;
    appVersion: bigint;
    lastBlockHeight: bigint;
    lastBlockAppHash: Uint8Array;
}
export interface ResponseInfoProtoMsg {
    typeUrl: "/tendermint.abci.ResponseInfo";
    value: Uint8Array;
}
export interface ResponseInfoAmino {
    data?: string;
    version?: string;
    app_version?: string;
    last_block_height?: string;
    last_block_app_hash?: string;
}
export interface ResponseInfoAminoMsg {
    type: "/tendermint.abci.ResponseInfo";
    value: ResponseInfoAmino;
}
export interface ResponseInfoSDKType {
    data: string;
    version: string;
    app_version: bigint;
    last_block_height: bigint;
    last_block_app_hash: Uint8Array;
}
export interface ResponseInitChain {
    consensusParams?: ConsensusParams;
    validators: ValidatorUpdate[];
    appHash: Uint8Array;
}
export interface ResponseInitChainProtoMsg {
    typeUrl: "/tendermint.abci.ResponseInitChain";
    value: Uint8Array;
}
export interface ResponseInitChainAmino {
    consensus_params?: ConsensusParamsAmino;
    validators?: ValidatorUpdateAmino[];
    app_hash?: string;
}
export interface ResponseInitChainAminoMsg {
    type: "/tendermint.abci.ResponseInitChain";
    value: ResponseInitChainAmino;
}
export interface ResponseInitChainSDKType {
    consensus_params?: ConsensusParamsSDKType;
    validators: ValidatorUpdateSDKType[];
    app_hash: Uint8Array;
}
export interface ResponseQuery {
    code: number;
    /** bytes data = 2; // use "value" instead. */
    log: string;
    /** nondeterministic */
    info: string;
    index: bigint;
    key: Uint8Array;
    value: Uint8Array;
    proofOps?: ProofOps;
    height: bigint;
    codespace: string;
}
export interface ResponseQueryProtoMsg {
    typeUrl: "/tendermint.abci.ResponseQuery";
    value: Uint8Array;
}
export interface ResponseQueryAmino {
    code?: number;
    /** bytes data = 2; // use "value" instead. */
    log?: string;
    /** nondeterministic */
    info?: string;
    index?: string;
    key?: string;
    value?: string;
    proof_ops?: ProofOpsAmino;
    height?: string;
    codespace?: string;
}
export interface ResponseQueryAminoMsg {
    type: "/tendermint.abci.ResponseQuery";
    value: ResponseQueryAmino;
}
export interface ResponseQuerySDKType {
    code: number;
    log: string;
    info: string;
    index: bigint;
    key: Uint8Array;
    value: Uint8Array;
    proof_ops?: ProofOpsSDKType;
    height: bigint;
    codespace: string;
}
export interface ResponseCheckTx {
    code: number;
    data: Uint8Array;
    /** nondeterministic */
    log: string;
    /** nondeterministic */
    info: string;
    gasWanted: bigint;
    gasUsed: bigint;
    events: Event[];
    codespace: string;
}
export interface ResponseCheckTxProtoMsg {
    typeUrl: "/tendermint.abci.ResponseCheckTx";
    value: Uint8Array;
}
export interface ResponseCheckTxAmino {
    code?: number;
    data?: string;
    /** nondeterministic */
    log?: string;
    /** nondeterministic */
    info?: string;
    gas_wanted?: string;
    gas_used?: string;
    events?: EventAmino[];
    codespace?: string;
}
export interface ResponseCheckTxAminoMsg {
    type: "/tendermint.abci.ResponseCheckTx";
    value: ResponseCheckTxAmino;
}
export interface ResponseCheckTxSDKType {
    code: number;
    data: Uint8Array;
    log: string;
    info: string;
    gas_wanted: bigint;
    gas_used: bigint;
    events: EventSDKType[];
    codespace: string;
}
export interface ResponseCommit {
    retainHeight: bigint;
}
export interface ResponseCommitProtoMsg {
    typeUrl: "/tendermint.abci.ResponseCommit";
    value: Uint8Array;
}
export interface ResponseCommitAmino {
    retain_height?: string;
}
export interface ResponseCommitAminoMsg {
    type: "/tendermint.abci.ResponseCommit";
    value: ResponseCommitAmino;
}
export interface ResponseCommitSDKType {
    retain_height: bigint;
}
export interface ResponseListSnapshots {
    snapshots: Snapshot[];
}
export interface ResponseListSnapshotsProtoMsg {
    typeUrl: "/tendermint.abci.ResponseListSnapshots";
    value: Uint8Array;
}
export interface ResponseListSnapshotsAmino {
    snapshots?: SnapshotAmino[];
}
export interface ResponseListSnapshotsAminoMsg {
    type: "/tendermint.abci.ResponseListSnapshots";
    value: ResponseListSnapshotsAmino;
}
export interface ResponseListSnapshotsSDKType {
    snapshots: SnapshotSDKType[];
}
export interface ResponseOfferSnapshot {
    result: ResponseOfferSnapshot_Result;
}
export interface ResponseOfferSnapshotProtoMsg {
    typeUrl: "/tendermint.abci.ResponseOfferSnapshot";
    value: Uint8Array;
}
export interface ResponseOfferSnapshotAmino {
    result?: ResponseOfferSnapshot_Result;
}
export interface ResponseOfferSnapshotAminoMsg {
    type: "/tendermint.abci.ResponseOfferSnapshot";
    value: ResponseOfferSnapshotAmino;
}
export interface ResponseOfferSnapshotSDKType {
    result: ResponseOfferSnapshot_Result;
}
export interface ResponseLoadSnapshotChunk {
    chunk: Uint8Array;
}
export interface ResponseLoadSnapshotChunkProtoMsg {
    typeUrl: "/tendermint.abci.ResponseLoadSnapshotChunk";
    value: Uint8Array;
}
export interface ResponseLoadSnapshotChunkAmino {
    chunk?: string;
}
export interface ResponseLoadSnapshotChunkAminoMsg {
    type: "/tendermint.abci.ResponseLoadSnapshotChunk";
    value: ResponseLoadSnapshotChunkAmino;
}
export interface ResponseLoadSnapshotChunkSDKType {
    chunk: Uint8Array;
}
export interface ResponseApplySnapshotChunk {
    result: ResponseApplySnapshotChunk_Result;
    /** Chunks to refetch and reapply */
    refetchChunks: number[];
    /** Chunk senders to reject and ban */
    rejectSenders: string[];
}
export interface ResponseApplySnapshotChunkProtoMsg {
    typeUrl: "/tendermint.abci.ResponseApplySnapshotChunk";
    value: Uint8Array;
}
export interface ResponseApplySnapshotChunkAmino {
    result?: ResponseApplySnapshotChunk_Result;
    /** Chunks to refetch and reapply */
    refetch_chunks?: number[];
    /** Chunk senders to reject and ban */
    reject_senders?: string[];
}
export interface ResponseApplySnapshotChunkAminoMsg {
    type: "/tendermint.abci.ResponseApplySnapshotChunk";
    value: ResponseApplySnapshotChunkAmino;
}
export interface ResponseApplySnapshotChunkSDKType {
    result: ResponseApplySnapshotChunk_Result;
    refetch_chunks: number[];
    reject_senders: string[];
}
export interface ResponsePrepareProposal {
    txs: Uint8Array[];
}
export interface ResponsePrepareProposalProtoMsg {
    typeUrl: "/tendermint.abci.ResponsePrepareProposal";
    value: Uint8Array;
}
export interface ResponsePrepareProposalAmino {
    txs?: string[];
}
export interface ResponsePrepareProposalAminoMsg {
    type: "/tendermint.abci.ResponsePrepareProposal";
    value: ResponsePrepareProposalAmino;
}
export interface ResponsePrepareProposalSDKType {
    txs: Uint8Array[];
}
export interface ResponseProcessProposal {
    status: ResponseProcessProposal_ProposalStatus;
}
export interface ResponseProcessProposalProtoMsg {
    typeUrl: "/tendermint.abci.ResponseProcessProposal";
    value: Uint8Array;
}
export interface ResponseProcessProposalAmino {
    status?: ResponseProcessProposal_ProposalStatus;
}
export interface ResponseProcessProposalAminoMsg {
    type: "/tendermint.abci.ResponseProcessProposal";
    value: ResponseProcessProposalAmino;
}
export interface ResponseProcessProposalSDKType {
    status: ResponseProcessProposal_ProposalStatus;
}
export interface ResponseExtendVote {
    voteExtension: Uint8Array;
}
export interface ResponseExtendVoteProtoMsg {
    typeUrl: "/tendermint.abci.ResponseExtendVote";
    value: Uint8Array;
}
export interface ResponseExtendVoteAmino {
    vote_extension?: string;
}
export interface ResponseExtendVoteAminoMsg {
    type: "/tendermint.abci.ResponseExtendVote";
    value: ResponseExtendVoteAmino;
}
export interface ResponseExtendVoteSDKType {
    vote_extension: Uint8Array;
}
export interface ResponseVerifyVoteExtension {
    status: ResponseVerifyVoteExtension_VerifyStatus;
}
export interface ResponseVerifyVoteExtensionProtoMsg {
    typeUrl: "/tendermint.abci.ResponseVerifyVoteExtension";
    value: Uint8Array;
}
export interface ResponseVerifyVoteExtensionAmino {
    status?: ResponseVerifyVoteExtension_VerifyStatus;
}
export interface ResponseVerifyVoteExtensionAminoMsg {
    type: "/tendermint.abci.ResponseVerifyVoteExtension";
    value: ResponseVerifyVoteExtensionAmino;
}
export interface ResponseVerifyVoteExtensionSDKType {
    status: ResponseVerifyVoteExtension_VerifyStatus;
}
export interface ResponseFinalizeBlock {
    /** set of block events emmitted as part of executing the block */
    events: Event[];
    /**
     * the result of executing each transaction including the events
     * the particular transction emitted. This should match the order
     * of the transactions delivered in the block itself
     */
    txResults: ExecTxResult[];
    /** a list of updates to the validator set. These will reflect the validator set at current height + 2. */
    validatorUpdates: ValidatorUpdate[];
    /** updates to the consensus params, if any. */
    consensusParamUpdates?: ConsensusParams;
    /**
     * app_hash is the hash of the applications' state which is used to confirm that execution of the transactions was
     * deterministic. It is up to the application to decide which algorithm to use.
     */
    appHash: Uint8Array;
}
export interface ResponseFinalizeBlockProtoMsg {
    typeUrl: "/tendermint.abci.ResponseFinalizeBlock";
    value: Uint8Array;
}
export interface ResponseFinalizeBlockAmino {
    /** set of block events emmitted as part of executing the block */
    events?: EventAmino[];
    /**
     * the result of executing each transaction including the events
     * the particular transction emitted. This should match the order
     * of the transactions delivered in the block itself
     */
    tx_results?: ExecTxResultAmino[];
    /** a list of updates to the validator set. These will reflect the validator set at current height + 2. */
    validator_updates?: ValidatorUpdateAmino[];
    /** updates to the consensus params, if any. */
    consensus_param_updates?: ConsensusParamsAmino;
    /**
     * app_hash is the hash of the applications' state which is used to confirm that execution of the transactions was
     * deterministic. It is up to the application to decide which algorithm to use.
     */
    app_hash?: string;
}
export interface ResponseFinalizeBlockAminoMsg {
    type: "/tendermint.abci.ResponseFinalizeBlock";
    value: ResponseFinalizeBlockAmino;
}
export interface ResponseFinalizeBlockSDKType {
    events: EventSDKType[];
    tx_results: ExecTxResultSDKType[];
    validator_updates: ValidatorUpdateSDKType[];
    consensus_param_updates?: ConsensusParamsSDKType;
    app_hash: Uint8Array;
}
export interface CommitInfo {
    round: number;
    votes: VoteInfo[];
}
export interface CommitInfoProtoMsg {
    typeUrl: "/tendermint.abci.CommitInfo";
    value: Uint8Array;
}
export interface CommitInfoAmino {
    round?: number;
    votes?: VoteInfoAmino[];
}
export interface CommitInfoAminoMsg {
    type: "/tendermint.abci.CommitInfo";
    value: CommitInfoAmino;
}
export interface CommitInfoSDKType {
    round: number;
    votes: VoteInfoSDKType[];
}
/**
 * ExtendedCommitInfo is similar to CommitInfo except that it is only used in
 * the PrepareProposal request such that CometBFT can provide vote extensions
 * to the application.
 */
export interface ExtendedCommitInfo {
    /** The round at which the block proposer decided in the previous height. */
    round: number;
    /**
     * List of validators' addresses in the last validator set with their voting
     * information, including vote extensions.
     */
    votes: ExtendedVoteInfo[];
}
export interface ExtendedCommitInfoProtoMsg {
    typeUrl: "/tendermint.abci.ExtendedCommitInfo";
    value: Uint8Array;
}
/**
 * ExtendedCommitInfo is similar to CommitInfo except that it is only used in
 * the PrepareProposal request such that CometBFT can provide vote extensions
 * to the application.
 */
export interface ExtendedCommitInfoAmino {
    /** The round at which the block proposer decided in the previous height. */
    round?: number;
    /**
     * List of validators' addresses in the last validator set with their voting
     * information, including vote extensions.
     */
    votes?: ExtendedVoteInfoAmino[];
}
export interface ExtendedCommitInfoAminoMsg {
    type: "/tendermint.abci.ExtendedCommitInfo";
    value: ExtendedCommitInfoAmino;
}
/**
 * ExtendedCommitInfo is similar to CommitInfo except that it is only used in
 * the PrepareProposal request such that CometBFT can provide vote extensions
 * to the application.
 */
export interface ExtendedCommitInfoSDKType {
    round: number;
    votes: ExtendedVoteInfoSDKType[];
}
/**
 * Event allows application developers to attach additional information to
 * ResponseFinalizeBlock and ResponseCheckTx.
 * Later, transactions may be queried using these events.
 */
export interface Event {
    type: string;
    attributes: EventAttribute[];
}
export interface EventProtoMsg {
    typeUrl: "/tendermint.abci.Event";
    value: Uint8Array;
}
/**
 * Event allows application developers to attach additional information to
 * ResponseFinalizeBlock and ResponseCheckTx.
 * Later, transactions may be queried using these events.
 */
export interface EventAmino {
    type?: string;
    attributes?: EventAttributeAmino[];
}
export interface EventAminoMsg {
    type: "/tendermint.abci.Event";
    value: EventAmino;
}
/**
 * Event allows application developers to attach additional information to
 * ResponseFinalizeBlock and ResponseCheckTx.
 * Later, transactions may be queried using these events.
 */
export interface EventSDKType {
    type: string;
    attributes: EventAttributeSDKType[];
}
/** EventAttribute is a single key-value pair, associated with an event. */
export interface EventAttribute {
    key: string;
    value: string;
    /** nondeterministic */
    index: boolean;
}
export interface EventAttributeProtoMsg {
    typeUrl: "/tendermint.abci.EventAttribute";
    value: Uint8Array;
}
/** EventAttribute is a single key-value pair, associated with an event. */
export interface EventAttributeAmino {
    key?: string;
    value?: string;
    /** nondeterministic */
    index?: boolean;
}
export interface EventAttributeAminoMsg {
    type: "/tendermint.abci.EventAttribute";
    value: EventAttributeAmino;
}
/** EventAttribute is a single key-value pair, associated with an event. */
export interface EventAttributeSDKType {
    key: string;
    value: string;
    index: boolean;
}
/**
 * ExecTxResult contains results of executing one individual transaction.
 *
 * * Its structure is equivalent to #ResponseDeliverTx which will be deprecated/deleted
 */
export interface ExecTxResult {
    code: number;
    data: Uint8Array;
    /** nondeterministic */
    log: string;
    /** nondeterministic */
    info: string;
    gasWanted: bigint;
    gasUsed: bigint;
    events: Event[];
    codespace: string;
}
export interface ExecTxResultProtoMsg {
    typeUrl: "/tendermint.abci.ExecTxResult";
    value: Uint8Array;
}
/**
 * ExecTxResult contains results of executing one individual transaction.
 *
 * * Its structure is equivalent to #ResponseDeliverTx which will be deprecated/deleted
 */
export interface ExecTxResultAmino {
    code?: number;
    data?: string;
    /** nondeterministic */
    log?: string;
    /** nondeterministic */
    info?: string;
    gas_wanted?: string;
    gas_used?: string;
    events?: EventAmino[];
    codespace?: string;
}
export interface ExecTxResultAminoMsg {
    type: "/tendermint.abci.ExecTxResult";
    value: ExecTxResultAmino;
}
/**
 * ExecTxResult contains results of executing one individual transaction.
 *
 * * Its structure is equivalent to #ResponseDeliverTx which will be deprecated/deleted
 */
export interface ExecTxResultSDKType {
    code: number;
    data: Uint8Array;
    log: string;
    info: string;
    gas_wanted: bigint;
    gas_used: bigint;
    events: EventSDKType[];
    codespace: string;
}
/**
 * TxResult contains results of executing the transaction.
 *
 * One usage is indexing transaction results.
 */
export interface TxResult {
    height: bigint;
    index: number;
    tx: Uint8Array;
    result: ExecTxResult;
}
export interface TxResultProtoMsg {
    typeUrl: "/tendermint.abci.TxResult";
    value: Uint8Array;
}
/**
 * TxResult contains results of executing the transaction.
 *
 * One usage is indexing transaction results.
 */
export interface TxResultAmino {
    height?: string;
    index?: number;
    tx?: string;
    result?: ExecTxResultAmino;
}
export interface TxResultAminoMsg {
    type: "/tendermint.abci.TxResult";
    value: TxResultAmino;
}
/**
 * TxResult contains results of executing the transaction.
 *
 * One usage is indexing transaction results.
 */
export interface TxResultSDKType {
    height: bigint;
    index: number;
    tx: Uint8Array;
    result: ExecTxResultSDKType;
}
export interface Validator {
    /** The first 20 bytes of SHA256(public key) */
    address: Uint8Array;
    /** PubKey pub_key = 2 [(gogoproto.nullable)=false]; */
    power: bigint;
}
export interface ValidatorProtoMsg {
    typeUrl: "/tendermint.abci.Validator";
    value: Uint8Array;
}
export interface ValidatorAmino {
    /** The first 20 bytes of SHA256(public key) */
    address?: string;
    /** PubKey pub_key = 2 [(gogoproto.nullable)=false]; */
    power?: string;
}
export interface ValidatorAminoMsg {
    type: "/tendermint.abci.Validator";
    value: ValidatorAmino;
}
export interface ValidatorSDKType {
    address: Uint8Array;
    power: bigint;
}
export interface ValidatorUpdate {
    pubKey: PublicKey;
    power: bigint;
}
export interface ValidatorUpdateProtoMsg {
    typeUrl: "/tendermint.abci.ValidatorUpdate";
    value: Uint8Array;
}
export interface ValidatorUpdateAmino {
    pub_key?: PublicKeyAmino;
    power?: string;
}
export interface ValidatorUpdateAminoMsg {
    type: "/tendermint.abci.ValidatorUpdate";
    value: ValidatorUpdateAmino;
}
export interface ValidatorUpdateSDKType {
    pub_key: PublicKeySDKType;
    power: bigint;
}
export interface VoteInfo {
    validator: Validator;
    blockIdFlag: BlockIDFlag;
}
export interface VoteInfoProtoMsg {
    typeUrl: "/tendermint.abci.VoteInfo";
    value: Uint8Array;
}
export interface VoteInfoAmino {
    validator?: ValidatorAmino;
    block_id_flag?: BlockIDFlag;
}
export interface VoteInfoAminoMsg {
    type: "/tendermint.abci.VoteInfo";
    value: VoteInfoAmino;
}
export interface VoteInfoSDKType {
    validator: ValidatorSDKType;
    block_id_flag: BlockIDFlag;
}
export interface ExtendedVoteInfo {
    /** The validator that sent the vote. */
    validator: Validator;
    /** Non-deterministic extension provided by the sending validator's application. */
    voteExtension: Uint8Array;
    /** Vote extension signature created by CometBFT */
    extensionSignature: Uint8Array;
    /** block_id_flag indicates whether the validator voted for a block, nil, or did not vote at all */
    blockIdFlag: BlockIDFlag;
}
export interface ExtendedVoteInfoProtoMsg {
    typeUrl: "/tendermint.abci.ExtendedVoteInfo";
    value: Uint8Array;
}
export interface ExtendedVoteInfoAmino {
    /** The validator that sent the vote. */
    validator?: ValidatorAmino;
    /** Non-deterministic extension provided by the sending validator's application. */
    vote_extension?: string;
    /** Vote extension signature created by CometBFT */
    extension_signature?: string;
    /** block_id_flag indicates whether the validator voted for a block, nil, or did not vote at all */
    block_id_flag?: BlockIDFlag;
}
export interface ExtendedVoteInfoAminoMsg {
    type: "/tendermint.abci.ExtendedVoteInfo";
    value: ExtendedVoteInfoAmino;
}
export interface ExtendedVoteInfoSDKType {
    validator: ValidatorSDKType;
    vote_extension: Uint8Array;
    extension_signature: Uint8Array;
    block_id_flag: BlockIDFlag;
}
export interface Misbehavior {
    type: MisbehaviorType;
    /** The offending validator */
    validator: Validator;
    /** The height when the offense occurred */
    height: bigint;
    /** The corresponding time where the offense occurred */
    time: Date;
    /**
     * Total voting power of the validator set in case the ABCI application does
     * not store historical validators.
     * https://github.com/tendermint/tendermint/issues/4581
     */
    totalVotingPower: bigint;
}
export interface MisbehaviorProtoMsg {
    typeUrl: "/tendermint.abci.Misbehavior";
    value: Uint8Array;
}
export interface MisbehaviorAmino {
    type?: MisbehaviorType;
    /** The offending validator */
    validator?: ValidatorAmino;
    /** The height when the offense occurred */
    height?: string;
    /** The corresponding time where the offense occurred */
    time?: string;
    /**
     * Total voting power of the validator set in case the ABCI application does
     * not store historical validators.
     * https://github.com/tendermint/tendermint/issues/4581
     */
    total_voting_power?: string;
}
export interface MisbehaviorAminoMsg {
    type: "/tendermint.abci.Misbehavior";
    value: MisbehaviorAmino;
}
export interface MisbehaviorSDKType {
    type: MisbehaviorType;
    validator: ValidatorSDKType;
    height: bigint;
    time: Date;
    total_voting_power: bigint;
}
export interface Snapshot {
    /** The height at which the snapshot was taken */
    height: bigint;
    /** The application-specific snapshot format */
    format: number;
    /** Number of chunks in the snapshot */
    chunks: number;
    /** Arbitrary snapshot hash, equal only if identical */
    hash: Uint8Array;
    /** Arbitrary application metadata */
    metadata: Uint8Array;
}
export interface SnapshotProtoMsg {
    typeUrl: "/tendermint.abci.Snapshot";
    value: Uint8Array;
}
export interface SnapshotAmino {
    /** The height at which the snapshot was taken */
    height?: string;
    /** The application-specific snapshot format */
    format?: number;
    /** Number of chunks in the snapshot */
    chunks?: number;
    /** Arbitrary snapshot hash, equal only if identical */
    hash?: string;
    /** Arbitrary application metadata */
    metadata?: string;
}
export interface SnapshotAminoMsg {
    type: "/tendermint.abci.Snapshot";
    value: SnapshotAmino;
}
export interface SnapshotSDKType {
    height: bigint;
    format: number;
    chunks: number;
    hash: Uint8Array;
    metadata: Uint8Array;
}
export declare const Request: {
    typeUrl: string;
    is(o: any): o is Request;
    isSDK(o: any): o is RequestSDKType;
    isAmino(o: any): o is RequestAmino;
    encode(message: Request, writer?: BinaryWriter): BinaryWriter;
    decode(input: BinaryReader | Uint8Array, length?: number): Request;
    fromPartial(object: Partial<Request>): Request;
    fromAmino(object: RequestAmino): Request;
    toAmino(message: Request): RequestAmino;
    fromAminoMsg(object: RequestAminoMsg): Request;
    fromProtoMsg(message: RequestProtoMsg): Request;
    toProto(message: Request): Uint8Array;
    toProtoMsg(message: Request): RequestProtoMsg;
};
export declare const RequestEcho: {
    typeUrl: string;
    is(o: any): o is RequestEcho;
    isSDK(o: any): o is RequestEchoSDKType;
    isAmino(o: any): o is RequestEchoAmino;
    encode(message: RequestEcho, writer?: BinaryWriter): BinaryWriter;
    decode(input: BinaryReader | Uint8Array, length?: number): RequestEcho;
    fromPartial(object: Partial<RequestEcho>): RequestEcho;
    fromAmino(object: RequestEchoAmino): RequestEcho;
    toAmino(message: RequestEcho): RequestEchoAmino;
    fromAminoMsg(object: RequestEchoAminoMsg): RequestEcho;
    fromProtoMsg(message: RequestEchoProtoMsg): RequestEcho;
    toProto(message: RequestEcho): Uint8Array;
    toProtoMsg(message: RequestEcho): RequestEchoProtoMsg;
};
export declare const RequestFlush: {
    typeUrl: string;
    is(o: any): o is RequestFlush;
    isSDK(o: any): o is RequestFlushSDKType;
    isAmino(o: any): o is RequestFlushAmino;
    encode(_: RequestFlush, writer?: BinaryWriter): BinaryWriter;
    decode(input: BinaryReader | Uint8Array, length?: number): RequestFlush;
    fromPartial(_: Partial<RequestFlush>): RequestFlush;
    fromAmino(_: RequestFlushAmino): RequestFlush;
    toAmino(_: RequestFlush): RequestFlushAmino;
    fromAminoMsg(object: RequestFlushAminoMsg): RequestFlush;
    fromProtoMsg(message: RequestFlushProtoMsg): RequestFlush;
    toProto(message: RequestFlush): Uint8Array;
    toProtoMsg(message: RequestFlush): RequestFlushProtoMsg;
};
export declare const RequestInfo: {
    typeUrl: string;
    is(o: any): o is RequestInfo;
    isSDK(o: any): o is RequestInfoSDKType;
    isAmino(o: any): o is RequestInfoAmino;
    encode(message: RequestInfo, writer?: BinaryWriter): BinaryWriter;
    decode(input: BinaryReader | Uint8Array, length?: number): RequestInfo;
    fromPartial(object: Partial<RequestInfo>): RequestInfo;
    fromAmino(object: RequestInfoAmino): RequestInfo;
    toAmino(message: RequestInfo): RequestInfoAmino;
    fromAminoMsg(object: RequestInfoAminoMsg): RequestInfo;
    fromProtoMsg(message: RequestInfoProtoMsg): RequestInfo;
    toProto(message: RequestInfo): Uint8Array;
    toProtoMsg(message: RequestInfo): RequestInfoProtoMsg;
};
export declare const RequestInitChain: {
    typeUrl: string;
    is(o: any): o is RequestInitChain;
    isSDK(o: any): o is RequestInitChainSDKType;
    isAmino(o: any): o is RequestInitChainAmino;
    encode(message: RequestInitChain, writer?: BinaryWriter): BinaryWriter;
    decode(input: BinaryReader | Uint8Array, length?: number): RequestInitChain;
    fromPartial(object: Partial<RequestInitChain>): RequestInitChain;
    fromAmino(object: RequestInitChainAmino): RequestInitChain;
    toAmino(message: RequestInitChain): RequestInitChainAmino;
    fromAminoMsg(object: RequestInitChainAminoMsg): RequestInitChain;
    fromProtoMsg(message: RequestInitChainProtoMsg): RequestInitChain;
    toProto(message: RequestInitChain): Uint8Array;
    toProtoMsg(message: RequestInitChain): RequestInitChainProtoMsg;
};
export declare const RequestQuery: {
    typeUrl: string;
    is(o: any): o is RequestQuery;
    isSDK(o: any): o is RequestQuerySDKType;
    isAmino(o: any): o is RequestQueryAmino;
    encode(message: RequestQuery, writer?: BinaryWriter): BinaryWriter;
    decode(input: BinaryReader | Uint8Array, length?: number): RequestQuery;
    fromPartial(object: Partial<RequestQuery>): RequestQuery;
    fromAmino(object: RequestQueryAmino): RequestQuery;
    toAmino(message: RequestQuery): RequestQueryAmino;
    fromAminoMsg(object: RequestQueryAminoMsg): RequestQuery;
    fromProtoMsg(message: RequestQueryProtoMsg): RequestQuery;
    toProto(message: RequestQuery): Uint8Array;
    toProtoMsg(message: RequestQuery): RequestQueryProtoMsg;
};
export declare const RequestCheckTx: {
    typeUrl: string;
    is(o: any): o is RequestCheckTx;
    isSDK(o: any): o is RequestCheckTxSDKType;
    isAmino(o: any): o is RequestCheckTxAmino;
    encode(message: RequestCheckTx, writer?: BinaryWriter): BinaryWriter;
    decode(input: BinaryReader | Uint8Array, length?: number): RequestCheckTx;
    fromPartial(object: Partial<RequestCheckTx>): RequestCheckTx;
    fromAmino(object: RequestCheckTxAmino): RequestCheckTx;
    toAmino(message: RequestCheckTx): RequestCheckTxAmino;
    fromAminoMsg(object: RequestCheckTxAminoMsg): RequestCheckTx;
    fromProtoMsg(message: RequestCheckTxProtoMsg): RequestCheckTx;
    toProto(message: RequestCheckTx): Uint8Array;
    toProtoMsg(message: RequestCheckTx): RequestCheckTxProtoMsg;
};
export declare const RequestCommit: {
    typeUrl: string;
    is(o: any): o is RequestCommit;
    isSDK(o: any): o is RequestCommitSDKType;
    isAmino(o: any): o is RequestCommitAmino;
    encode(_: RequestCommit, writer?: BinaryWriter): BinaryWriter;
    decode(input: BinaryReader | Uint8Array, length?: number): RequestCommit;
    fromPartial(_: Partial<RequestCommit>): RequestCommit;
    fromAmino(_: RequestCommitAmino): RequestCommit;
    toAmino(_: RequestCommit): RequestCommitAmino;
    fromAminoMsg(object: RequestCommitAminoMsg): RequestCommit;
    fromProtoMsg(message: RequestCommitProtoMsg): RequestCommit;
    toProto(message: RequestCommit): Uint8Array;
    toProtoMsg(message: RequestCommit): RequestCommitProtoMsg;
};
export declare const RequestListSnapshots: {
    typeUrl: string;
    is(o: any): o is RequestListSnapshots;
    isSDK(o: any): o is RequestListSnapshotsSDKType;
    isAmino(o: any): o is RequestListSnapshotsAmino;
    encode(_: RequestListSnapshots, writer?: BinaryWriter): BinaryWriter;
    decode(input: BinaryReader | Uint8Array, length?: number): RequestListSnapshots;
    fromPartial(_: Partial<RequestListSnapshots>): RequestListSnapshots;
    fromAmino(_: RequestListSnapshotsAmino): RequestListSnapshots;
    toAmino(_: RequestListSnapshots): RequestListSnapshotsAmino;
    fromAminoMsg(object: RequestListSnapshotsAminoMsg): RequestListSnapshots;
    fromProtoMsg(message: RequestListSnapshotsProtoMsg): RequestListSnapshots;
    toProto(message: RequestListSnapshots): Uint8Array;
    toProtoMsg(message: RequestListSnapshots): RequestListSnapshotsProtoMsg;
};
export declare const RequestOfferSnapshot: {
    typeUrl: string;
    is(o: any): o is RequestOfferSnapshot;
    isSDK(o: any): o is RequestOfferSnapshotSDKType;
    isAmino(o: any): o is RequestOfferSnapshotAmino;
    encode(message: RequestOfferSnapshot, writer?: BinaryWriter): BinaryWriter;
    decode(input: BinaryReader | Uint8Array, length?: number): RequestOfferSnapshot;
    fromPartial(object: Partial<RequestOfferSnapshot>): RequestOfferSnapshot;
    fromAmino(object: RequestOfferSnapshotAmino): RequestOfferSnapshot;
    toAmino(message: RequestOfferSnapshot): RequestOfferSnapshotAmino;
    fromAminoMsg(object: RequestOfferSnapshotAminoMsg): RequestOfferSnapshot;
    fromProtoMsg(message: RequestOfferSnapshotProtoMsg): RequestOfferSnapshot;
    toProto(message: RequestOfferSnapshot): Uint8Array;
    toProtoMsg(message: RequestOfferSnapshot): RequestOfferSnapshotProtoMsg;
};
export declare const RequestLoadSnapshotChunk: {
    typeUrl: string;
    is(o: any): o is RequestLoadSnapshotChunk;
    isSDK(o: any): o is RequestLoadSnapshotChunkSDKType;
    isAmino(o: any): o is RequestLoadSnapshotChunkAmino;
    encode(message: RequestLoadSnapshotChunk, writer?: BinaryWriter): BinaryWriter;
    decode(input: BinaryReader | Uint8Array, length?: number): RequestLoadSnapshotChunk;
    fromPartial(object: Partial<RequestLoadSnapshotChunk>): RequestLoadSnapshotChunk;
    fromAmino(object: RequestLoadSnapshotChunkAmino): RequestLoadSnapshotChunk;
    toAmino(message: RequestLoadSnapshotChunk): RequestLoadSnapshotChunkAmino;
    fromAminoMsg(object: RequestLoadSnapshotChunkAminoMsg): RequestLoadSnapshotChunk;
    fromProtoMsg(message: RequestLoadSnapshotChunkProtoMsg): RequestLoadSnapshotChunk;
    toProto(message: RequestLoadSnapshotChunk): Uint8Array;
    toProtoMsg(message: RequestLoadSnapshotChunk): RequestLoadSnapshotChunkProtoMsg;
};
export declare const RequestApplySnapshotChunk: {
    typeUrl: string;
    is(o: any): o is RequestApplySnapshotChunk;
    isSDK(o: any): o is RequestApplySnapshotChunkSDKType;
    isAmino(o: any): o is RequestApplySnapshotChunkAmino;
    encode(message: RequestApplySnapshotChunk, writer?: BinaryWriter): BinaryWriter;
    decode(input: BinaryReader | Uint8Array, length?: number): RequestApplySnapshotChunk;
    fromPartial(object: Partial<RequestApplySnapshotChunk>): RequestApplySnapshotChunk;
    fromAmino(object: RequestApplySnapshotChunkAmino): RequestApplySnapshotChunk;
    toAmino(message: RequestApplySnapshotChunk): RequestApplySnapshotChunkAmino;
    fromAminoMsg(object: RequestApplySnapshotChunkAminoMsg): RequestApplySnapshotChunk;
    fromProtoMsg(message: RequestApplySnapshotChunkProtoMsg): RequestApplySnapshotChunk;
    toProto(message: RequestApplySnapshotChunk): Uint8Array;
    toProtoMsg(message: RequestApplySnapshotChunk): RequestApplySnapshotChunkProtoMsg;
};
export declare const RequestPrepareProposal: {
    typeUrl: string;
    is(o: any): o is RequestPrepareProposal;
    isSDK(o: any): o is RequestPrepareProposalSDKType;
    isAmino(o: any): o is RequestPrepareProposalAmino;
    encode(message: RequestPrepareProposal, writer?: BinaryWriter): BinaryWriter;
    decode(input: BinaryReader | Uint8Array, length?: number): RequestPrepareProposal;
    fromPartial(object: Partial<RequestPrepareProposal>): RequestPrepareProposal;
    fromAmino(object: RequestPrepareProposalAmino): RequestPrepareProposal;
    toAmino(message: RequestPrepareProposal): RequestPrepareProposalAmino;
    fromAminoMsg(object: RequestPrepareProposalAminoMsg): RequestPrepareProposal;
    fromProtoMsg(message: RequestPrepareProposalProtoMsg): RequestPrepareProposal;
    toProto(message: RequestPrepareProposal): Uint8Array;
    toProtoMsg(message: RequestPrepareProposal): RequestPrepareProposalProtoMsg;
};
export declare const RequestProcessProposal: {
    typeUrl: string;
    is(o: any): o is RequestProcessProposal;
    isSDK(o: any): o is RequestProcessProposalSDKType;
    isAmino(o: any): o is RequestProcessProposalAmino;
    encode(message: RequestProcessProposal, writer?: BinaryWriter): BinaryWriter;
    decode(input: BinaryReader | Uint8Array, length?: number): RequestProcessProposal;
    fromPartial(object: Partial<RequestProcessProposal>): RequestProcessProposal;
    fromAmino(object: RequestProcessProposalAmino): RequestProcessProposal;
    toAmino(message: RequestProcessProposal): RequestProcessProposalAmino;
    fromAminoMsg(object: RequestProcessProposalAminoMsg): RequestProcessProposal;
    fromProtoMsg(message: RequestProcessProposalProtoMsg): RequestProcessProposal;
    toProto(message: RequestProcessProposal): Uint8Array;
    toProtoMsg(message: RequestProcessProposal): RequestProcessProposalProtoMsg;
};
export declare const RequestExtendVote: {
    typeUrl: string;
    is(o: any): o is RequestExtendVote;
    isSDK(o: any): o is RequestExtendVoteSDKType;
    isAmino(o: any): o is RequestExtendVoteAmino;
    encode(message: RequestExtendVote, writer?: BinaryWriter): BinaryWriter;
    decode(input: BinaryReader | Uint8Array, length?: number): RequestExtendVote;
    fromPartial(object: Partial<RequestExtendVote>): RequestExtendVote;
    fromAmino(object: RequestExtendVoteAmino): RequestExtendVote;
    toAmino(message: RequestExtendVote): RequestExtendVoteAmino;
    fromAminoMsg(object: RequestExtendVoteAminoMsg): RequestExtendVote;
    fromProtoMsg(message: RequestExtendVoteProtoMsg): RequestExtendVote;
    toProto(message: RequestExtendVote): Uint8Array;
    toProtoMsg(message: RequestExtendVote): RequestExtendVoteProtoMsg;
};
export declare const RequestVerifyVoteExtension: {
    typeUrl: string;
    is(o: any): o is RequestVerifyVoteExtension;
    isSDK(o: any): o is RequestVerifyVoteExtensionSDKType;
    isAmino(o: any): o is RequestVerifyVoteExtensionAmino;
    encode(message: RequestVerifyVoteExtension, writer?: BinaryWriter): BinaryWriter;
    decode(input: BinaryReader | Uint8Array, length?: number): RequestVerifyVoteExtension;
    fromPartial(object: Partial<RequestVerifyVoteExtension>): RequestVerifyVoteExtension;
    fromAmino(object: RequestVerifyVoteExtensionAmino): RequestVerifyVoteExtension;
    toAmino(message: RequestVerifyVoteExtension): RequestVerifyVoteExtensionAmino;
    fromAminoMsg(object: RequestVerifyVoteExtensionAminoMsg): RequestVerifyVoteExtension;
    fromProtoMsg(message: RequestVerifyVoteExtensionProtoMsg): RequestVerifyVoteExtension;
    toProto(message: RequestVerifyVoteExtension): Uint8Array;
    toProtoMsg(message: RequestVerifyVoteExtension): RequestVerifyVoteExtensionProtoMsg;
};
export declare const RequestFinalizeBlock: {
    typeUrl: string;
    is(o: any): o is RequestFinalizeBlock;
    isSDK(o: any): o is RequestFinalizeBlockSDKType;
    isAmino(o: any): o is RequestFinalizeBlockAmino;
    encode(message: RequestFinalizeBlock, writer?: BinaryWriter): BinaryWriter;
    decode(input: BinaryReader | Uint8Array, length?: number): RequestFinalizeBlock;
    fromPartial(object: Partial<RequestFinalizeBlock>): RequestFinalizeBlock;
    fromAmino(object: RequestFinalizeBlockAmino): RequestFinalizeBlock;
    toAmino(message: RequestFinalizeBlock): RequestFinalizeBlockAmino;
    fromAminoMsg(object: RequestFinalizeBlockAminoMsg): RequestFinalizeBlock;
    fromProtoMsg(message: RequestFinalizeBlockProtoMsg): RequestFinalizeBlock;
    toProto(message: RequestFinalizeBlock): Uint8Array;
    toProtoMsg(message: RequestFinalizeBlock): RequestFinalizeBlockProtoMsg;
};
export declare const Response: {
    typeUrl: string;
    is(o: any): o is Response;
    isSDK(o: any): o is ResponseSDKType;
    isAmino(o: any): o is ResponseAmino;
    encode(message: Response, writer?: BinaryWriter): BinaryWriter;
    decode(input: BinaryReader | Uint8Array, length?: number): Response;
    fromPartial(object: Partial<Response>): Response;
    fromAmino(object: ResponseAmino): Response;
    toAmino(message: Response): ResponseAmino;
    fromAminoMsg(object: ResponseAminoMsg): Response;
    fromProtoMsg(message: ResponseProtoMsg): Response;
    toProto(message: Response): Uint8Array;
    toProtoMsg(message: Response): ResponseProtoMsg;
};
export declare const ResponseException: {
    typeUrl: string;
    is(o: any): o is ResponseException;
    isSDK(o: any): o is ResponseExceptionSDKType;
    isAmino(o: any): o is ResponseExceptionAmino;
    encode(message: ResponseException, writer?: BinaryWriter): BinaryWriter;
    decode(input: BinaryReader | Uint8Array, length?: number): ResponseException;
    fromPartial(object: Partial<ResponseException>): ResponseException;
    fromAmino(object: ResponseExceptionAmino): ResponseException;
    toAmino(message: ResponseException): ResponseExceptionAmino;
    fromAminoMsg(object: ResponseExceptionAminoMsg): ResponseException;
    fromProtoMsg(message: ResponseExceptionProtoMsg): ResponseException;
    toProto(message: ResponseException): Uint8Array;
    toProtoMsg(message: ResponseException): ResponseExceptionProtoMsg;
};
export declare const ResponseEcho: {
    typeUrl: string;
    is(o: any): o is ResponseEcho;
    isSDK(o: any): o is ResponseEchoSDKType;
    isAmino(o: any): o is ResponseEchoAmino;
    encode(message: ResponseEcho, writer?: BinaryWriter): BinaryWriter;
    decode(input: BinaryReader | Uint8Array, length?: number): ResponseEcho;
    fromPartial(object: Partial<ResponseEcho>): ResponseEcho;
    fromAmino(object: ResponseEchoAmino): ResponseEcho;
    toAmino(message: ResponseEcho): ResponseEchoAmino;
    fromAminoMsg(object: ResponseEchoAminoMsg): ResponseEcho;
    fromProtoMsg(message: ResponseEchoProtoMsg): ResponseEcho;
    toProto(message: ResponseEcho): Uint8Array;
    toProtoMsg(message: ResponseEcho): ResponseEchoProtoMsg;
};
export declare const ResponseFlush: {
    typeUrl: string;
    is(o: any): o is ResponseFlush;
    isSDK(o: any): o is ResponseFlushSDKType;
    isAmino(o: any): o is ResponseFlushAmino;
    encode(_: ResponseFlush, writer?: BinaryWriter): BinaryWriter;
    decode(input: BinaryReader | Uint8Array, length?: number): ResponseFlush;
    fromPartial(_: Partial<ResponseFlush>): ResponseFlush;
    fromAmino(_: ResponseFlushAmino): ResponseFlush;
    toAmino(_: ResponseFlush): ResponseFlushAmino;
    fromAminoMsg(object: ResponseFlushAminoMsg): ResponseFlush;
    fromProtoMsg(message: ResponseFlushProtoMsg): ResponseFlush;
    toProto(message: ResponseFlush): Uint8Array;
    toProtoMsg(message: ResponseFlush): ResponseFlushProtoMsg;
};
export declare const ResponseInfo: {
    typeUrl: string;
    is(o: any): o is ResponseInfo;
    isSDK(o: any): o is ResponseInfoSDKType;
    isAmino(o: any): o is ResponseInfoAmino;
    encode(message: ResponseInfo, writer?: BinaryWriter): BinaryWriter;
    decode(input: BinaryReader | Uint8Array, length?: number): ResponseInfo;
    fromPartial(object: Partial<ResponseInfo>): ResponseInfo;
    fromAmino(object: ResponseInfoAmino): ResponseInfo;
    toAmino(message: ResponseInfo): ResponseInfoAmino;
    fromAminoMsg(object: ResponseInfoAminoMsg): ResponseInfo;
    fromProtoMsg(message: ResponseInfoProtoMsg): ResponseInfo;
    toProto(message: ResponseInfo): Uint8Array;
    toProtoMsg(message: ResponseInfo): ResponseInfoProtoMsg;
};
export declare const ResponseInitChain: {
    typeUrl: string;
    is(o: any): o is ResponseInitChain;
    isSDK(o: any): o is ResponseInitChainSDKType;
    isAmino(o: any): o is ResponseInitChainAmino;
    encode(message: ResponseInitChain, writer?: BinaryWriter): BinaryWriter;
    decode(input: BinaryReader | Uint8Array, length?: number): ResponseInitChain;
    fromPartial(object: Partial<ResponseInitChain>): ResponseInitChain;
    fromAmino(object: ResponseInitChainAmino): ResponseInitChain;
    toAmino(message: ResponseInitChain): ResponseInitChainAmino;
    fromAminoMsg(object: ResponseInitChainAminoMsg): ResponseInitChain;
    fromProtoMsg(message: ResponseInitChainProtoMsg): ResponseInitChain;
    toProto(message: ResponseInitChain): Uint8Array;
    toProtoMsg(message: ResponseInitChain): ResponseInitChainProtoMsg;
};
export declare const ResponseQuery: {
    typeUrl: string;
    is(o: any): o is ResponseQuery;
    isSDK(o: any): o is ResponseQuerySDKType;
    isAmino(o: any): o is ResponseQueryAmino;
    encode(message: ResponseQuery, writer?: BinaryWriter): BinaryWriter;
    decode(input: BinaryReader | Uint8Array, length?: number): ResponseQuery;
    fromPartial(object: Partial<ResponseQuery>): ResponseQuery;
    fromAmino(object: ResponseQueryAmino): ResponseQuery;
    toAmino(message: ResponseQuery): ResponseQueryAmino;
    fromAminoMsg(object: ResponseQueryAminoMsg): ResponseQuery;
    fromProtoMsg(message: ResponseQueryProtoMsg): ResponseQuery;
    toProto(message: ResponseQuery): Uint8Array;
    toProtoMsg(message: ResponseQuery): ResponseQueryProtoMsg;
};
export declare const ResponseCheckTx: {
    typeUrl: string;
    is(o: any): o is ResponseCheckTx;
    isSDK(o: any): o is ResponseCheckTxSDKType;
    isAmino(o: any): o is ResponseCheckTxAmino;
    encode(message: ResponseCheckTx, writer?: BinaryWriter): BinaryWriter;
    decode(input: BinaryReader | Uint8Array, length?: number): ResponseCheckTx;
    fromPartial(object: Partial<ResponseCheckTx>): ResponseCheckTx;
    fromAmino(object: ResponseCheckTxAmino): ResponseCheckTx;
    toAmino(message: ResponseCheckTx): ResponseCheckTxAmino;
    fromAminoMsg(object: ResponseCheckTxAminoMsg): ResponseCheckTx;
    fromProtoMsg(message: ResponseCheckTxProtoMsg): ResponseCheckTx;
    toProto(message: ResponseCheckTx): Uint8Array;
    toProtoMsg(message: ResponseCheckTx): ResponseCheckTxProtoMsg;
};
export declare const ResponseCommit: {
    typeUrl: string;
    is(o: any): o is ResponseCommit;
    isSDK(o: any): o is ResponseCommitSDKType;
    isAmino(o: any): o is ResponseCommitAmino;
    encode(message: ResponseCommit, writer?: BinaryWriter): BinaryWriter;
    decode(input: BinaryReader | Uint8Array, length?: number): ResponseCommit;
    fromPartial(object: Partial<ResponseCommit>): ResponseCommit;
    fromAmino(object: ResponseCommitAmino): ResponseCommit;
    toAmino(message: ResponseCommit): ResponseCommitAmino;
    fromAminoMsg(object: ResponseCommitAminoMsg): ResponseCommit;
    fromProtoMsg(message: ResponseCommitProtoMsg): ResponseCommit;
    toProto(message: ResponseCommit): Uint8Array;
    toProtoMsg(message: ResponseCommit): ResponseCommitProtoMsg;
};
export declare const ResponseListSnapshots: {
    typeUrl: string;
    is(o: any): o is ResponseListSnapshots;
    isSDK(o: any): o is ResponseListSnapshotsSDKType;
    isAmino(o: any): o is ResponseListSnapshotsAmino;
    encode(message: ResponseListSnapshots, writer?: BinaryWriter): BinaryWriter;
    decode(input: BinaryReader | Uint8Array, length?: number): ResponseListSnapshots;
    fromPartial(object: Partial<ResponseListSnapshots>): ResponseListSnapshots;
    fromAmino(object: ResponseListSnapshotsAmino): ResponseListSnapshots;
    toAmino(message: ResponseListSnapshots): ResponseListSnapshotsAmino;
    fromAminoMsg(object: ResponseListSnapshotsAminoMsg): ResponseListSnapshots;
    fromProtoMsg(message: ResponseListSnapshotsProtoMsg): ResponseListSnapshots;
    toProto(message: ResponseListSnapshots): Uint8Array;
    toProtoMsg(message: ResponseListSnapshots): ResponseListSnapshotsProtoMsg;
};
export declare const ResponseOfferSnapshot: {
    typeUrl: string;
    is(o: any): o is ResponseOfferSnapshot;
    isSDK(o: any): o is ResponseOfferSnapshotSDKType;
    isAmino(o: any): o is ResponseOfferSnapshotAmino;
    encode(message: ResponseOfferSnapshot, writer?: BinaryWriter): BinaryWriter;
    decode(input: BinaryReader | Uint8Array, length?: number): ResponseOfferSnapshot;
    fromPartial(object: Partial<ResponseOfferSnapshot>): ResponseOfferSnapshot;
    fromAmino(object: ResponseOfferSnapshotAmino): ResponseOfferSnapshot;
    toAmino(message: ResponseOfferSnapshot): ResponseOfferSnapshotAmino;
    fromAminoMsg(object: ResponseOfferSnapshotAminoMsg): ResponseOfferSnapshot;
    fromProtoMsg(message: ResponseOfferSnapshotProtoMsg): ResponseOfferSnapshot;
    toProto(message: ResponseOfferSnapshot): Uint8Array;
    toProtoMsg(message: ResponseOfferSnapshot): ResponseOfferSnapshotProtoMsg;
};
export declare const ResponseLoadSnapshotChunk: {
    typeUrl: string;
    is(o: any): o is ResponseLoadSnapshotChunk;
    isSDK(o: any): o is ResponseLoadSnapshotChunkSDKType;
    isAmino(o: any): o is ResponseLoadSnapshotChunkAmino;
    encode(message: ResponseLoadSnapshotChunk, writer?: BinaryWriter): BinaryWriter;
    decode(input: BinaryReader | Uint8Array, length?: number): ResponseLoadSnapshotChunk;
    fromPartial(object: Partial<ResponseLoadSnapshotChunk>): ResponseLoadSnapshotChunk;
    fromAmino(object: ResponseLoadSnapshotChunkAmino): ResponseLoadSnapshotChunk;
    toAmino(message: ResponseLoadSnapshotChunk): ResponseLoadSnapshotChunkAmino;
    fromAminoMsg(object: ResponseLoadSnapshotChunkAminoMsg): ResponseLoadSnapshotChunk;
    fromProtoMsg(message: ResponseLoadSnapshotChunkProtoMsg): ResponseLoadSnapshotChunk;
    toProto(message: ResponseLoadSnapshotChunk): Uint8Array;
    toProtoMsg(message: ResponseLoadSnapshotChunk): ResponseLoadSnapshotChunkProtoMsg;
};
export declare const ResponseApplySnapshotChunk: {
    typeUrl: string;
    is(o: any): o is ResponseApplySnapshotChunk;
    isSDK(o: any): o is ResponseApplySnapshotChunkSDKType;
    isAmino(o: any): o is ResponseApplySnapshotChunkAmino;
    encode(message: ResponseApplySnapshotChunk, writer?: BinaryWriter): BinaryWriter;
    decode(input: BinaryReader | Uint8Array, length?: number): ResponseApplySnapshotChunk;
    fromPartial(object: Partial<ResponseApplySnapshotChunk>): ResponseApplySnapshotChunk;
    fromAmino(object: ResponseApplySnapshotChunkAmino): ResponseApplySnapshotChunk;
    toAmino(message: ResponseApplySnapshotChunk): ResponseApplySnapshotChunkAmino;
    fromAminoMsg(object: ResponseApplySnapshotChunkAminoMsg): ResponseApplySnapshotChunk;
    fromProtoMsg(message: ResponseApplySnapshotChunkProtoMsg): ResponseApplySnapshotChunk;
    toProto(message: ResponseApplySnapshotChunk): Uint8Array;
    toProtoMsg(message: ResponseApplySnapshotChunk): ResponseApplySnapshotChunkProtoMsg;
};
export declare const ResponsePrepareProposal: {
    typeUrl: string;
    is(o: any): o is ResponsePrepareProposal;
    isSDK(o: any): o is ResponsePrepareProposalSDKType;
    isAmino(o: any): o is ResponsePrepareProposalAmino;
    encode(message: ResponsePrepareProposal, writer?: BinaryWriter): BinaryWriter;
    decode(input: BinaryReader | Uint8Array, length?: number): ResponsePrepareProposal;
    fromPartial(object: Partial<ResponsePrepareProposal>): ResponsePrepareProposal;
    fromAmino(object: ResponsePrepareProposalAmino): ResponsePrepareProposal;
    toAmino(message: ResponsePrepareProposal): ResponsePrepareProposalAmino;
    fromAminoMsg(object: ResponsePrepareProposalAminoMsg): ResponsePrepareProposal;
    fromProtoMsg(message: ResponsePrepareProposalProtoMsg): ResponsePrepareProposal;
    toProto(message: ResponsePrepareProposal): Uint8Array;
    toProtoMsg(message: ResponsePrepareProposal): ResponsePrepareProposalProtoMsg;
};
export declare const ResponseProcessProposal: {
    typeUrl: string;
    is(o: any): o is ResponseProcessProposal;
    isSDK(o: any): o is ResponseProcessProposalSDKType;
    isAmino(o: any): o is ResponseProcessProposalAmino;
    encode(message: ResponseProcessProposal, writer?: BinaryWriter): BinaryWriter;
    decode(input: BinaryReader | Uint8Array, length?: number): ResponseProcessProposal;
    fromPartial(object: Partial<ResponseProcessProposal>): ResponseProcessProposal;
    fromAmino(object: ResponseProcessProposalAmino): ResponseProcessProposal;
    toAmino(message: ResponseProcessProposal): ResponseProcessProposalAmino;
    fromAminoMsg(object: ResponseProcessProposalAminoMsg): ResponseProcessProposal;
    fromProtoMsg(message: ResponseProcessProposalProtoMsg): ResponseProcessProposal;
    toProto(message: ResponseProcessProposal): Uint8Array;
    toProtoMsg(message: ResponseProcessProposal): ResponseProcessProposalProtoMsg;
};
export declare const ResponseExtendVote: {
    typeUrl: string;
    is(o: any): o is ResponseExtendVote;
    isSDK(o: any): o is ResponseExtendVoteSDKType;
    isAmino(o: any): o is ResponseExtendVoteAmino;
    encode(message: ResponseExtendVote, writer?: BinaryWriter): BinaryWriter;
    decode(input: BinaryReader | Uint8Array, length?: number): ResponseExtendVote;
    fromPartial(object: Partial<ResponseExtendVote>): ResponseExtendVote;
    fromAmino(object: ResponseExtendVoteAmino): ResponseExtendVote;
    toAmino(message: ResponseExtendVote): ResponseExtendVoteAmino;
    fromAminoMsg(object: ResponseExtendVoteAminoMsg): ResponseExtendVote;
    fromProtoMsg(message: ResponseExtendVoteProtoMsg): ResponseExtendVote;
    toProto(message: ResponseExtendVote): Uint8Array;
    toProtoMsg(message: ResponseExtendVote): ResponseExtendVoteProtoMsg;
};
export declare const ResponseVerifyVoteExtension: {
    typeUrl: string;
    is(o: any): o is ResponseVerifyVoteExtension;
    isSDK(o: any): o is ResponseVerifyVoteExtensionSDKType;
    isAmino(o: any): o is ResponseVerifyVoteExtensionAmino;
    encode(message: ResponseVerifyVoteExtension, writer?: BinaryWriter): BinaryWriter;
    decode(input: BinaryReader | Uint8Array, length?: number): ResponseVerifyVoteExtension;
    fromPartial(object: Partial<ResponseVerifyVoteExtension>): ResponseVerifyVoteExtension;
    fromAmino(object: ResponseVerifyVoteExtensionAmino): ResponseVerifyVoteExtension;
    toAmino(message: ResponseVerifyVoteExtension): ResponseVerifyVoteExtensionAmino;
    fromAminoMsg(object: ResponseVerifyVoteExtensionAminoMsg): ResponseVerifyVoteExtension;
    fromProtoMsg(message: ResponseVerifyVoteExtensionProtoMsg): ResponseVerifyVoteExtension;
    toProto(message: ResponseVerifyVoteExtension): Uint8Array;
    toProtoMsg(message: ResponseVerifyVoteExtension): ResponseVerifyVoteExtensionProtoMsg;
};
export declare const ResponseFinalizeBlock: {
    typeUrl: string;
    is(o: any): o is ResponseFinalizeBlock;
    isSDK(o: any): o is ResponseFinalizeBlockSDKType;
    isAmino(o: any): o is ResponseFinalizeBlockAmino;
    encode(message: ResponseFinalizeBlock, writer?: BinaryWriter): BinaryWriter;
    decode(input: BinaryReader | Uint8Array, length?: number): ResponseFinalizeBlock;
    fromPartial(object: Partial<ResponseFinalizeBlock>): ResponseFinalizeBlock;
    fromAmino(object: ResponseFinalizeBlockAmino): ResponseFinalizeBlock;
    toAmino(message: ResponseFinalizeBlock): ResponseFinalizeBlockAmino;
    fromAminoMsg(object: ResponseFinalizeBlockAminoMsg): ResponseFinalizeBlock;
    fromProtoMsg(message: ResponseFinalizeBlockProtoMsg): ResponseFinalizeBlock;
    toProto(message: ResponseFinalizeBlock): Uint8Array;
    toProtoMsg(message: ResponseFinalizeBlock): ResponseFinalizeBlockProtoMsg;
};
export declare const CommitInfo: {
    typeUrl: string;
    is(o: any): o is CommitInfo;
    isSDK(o: any): o is CommitInfoSDKType;
    isAmino(o: any): o is CommitInfoAmino;
    encode(message: CommitInfo, writer?: BinaryWriter): BinaryWriter;
    decode(input: BinaryReader | Uint8Array, length?: number): CommitInfo;
    fromPartial(object: Partial<CommitInfo>): CommitInfo;
    fromAmino(object: CommitInfoAmino): CommitInfo;
    toAmino(message: CommitInfo): CommitInfoAmino;
    fromAminoMsg(object: CommitInfoAminoMsg): CommitInfo;
    fromProtoMsg(message: CommitInfoProtoMsg): CommitInfo;
    toProto(message: CommitInfo): Uint8Array;
    toProtoMsg(message: CommitInfo): CommitInfoProtoMsg;
};
export declare const ExtendedCommitInfo: {
    typeUrl: string;
    is(o: any): o is ExtendedCommitInfo;
    isSDK(o: any): o is ExtendedCommitInfoSDKType;
    isAmino(o: any): o is ExtendedCommitInfoAmino;
    encode(message: ExtendedCommitInfo, writer?: BinaryWriter): BinaryWriter;
    decode(input: BinaryReader | Uint8Array, length?: number): ExtendedCommitInfo;
    fromPartial(object: Partial<ExtendedCommitInfo>): ExtendedCommitInfo;
    fromAmino(object: ExtendedCommitInfoAmino): ExtendedCommitInfo;
    toAmino(message: ExtendedCommitInfo): ExtendedCommitInfoAmino;
    fromAminoMsg(object: ExtendedCommitInfoAminoMsg): ExtendedCommitInfo;
    fromProtoMsg(message: ExtendedCommitInfoProtoMsg): ExtendedCommitInfo;
    toProto(message: ExtendedCommitInfo): Uint8Array;
    toProtoMsg(message: ExtendedCommitInfo): ExtendedCommitInfoProtoMsg;
};
export declare const Event: {
    typeUrl: string;
    is(o: any): o is Event;
    isSDK(o: any): o is EventSDKType;
    isAmino(o: any): o is EventAmino;
    encode(message: Event, writer?: BinaryWriter): BinaryWriter;
    decode(input: BinaryReader | Uint8Array, length?: number): Event;
    fromPartial(object: Partial<Event>): Event;
    fromAmino(object: EventAmino): Event;
    toAmino(message: Event): EventAmino;
    fromAminoMsg(object: EventAminoMsg): Event;
    fromProtoMsg(message: EventProtoMsg): Event;
    toProto(message: Event): Uint8Array;
    toProtoMsg(message: Event): EventProtoMsg;
};
export declare const EventAttribute: {
    typeUrl: string;
    is(o: any): o is EventAttribute;
    isSDK(o: any): o is EventAttributeSDKType;
    isAmino(o: any): o is EventAttributeAmino;
    encode(message: EventAttribute, writer?: BinaryWriter): BinaryWriter;
    decode(input: BinaryReader | Uint8Array, length?: number): EventAttribute;
    fromPartial(object: Partial<EventAttribute>): EventAttribute;
    fromAmino(object: EventAttributeAmino): EventAttribute;
    toAmino(message: EventAttribute): EventAttributeAmino;
    fromAminoMsg(object: EventAttributeAminoMsg): EventAttribute;
    fromProtoMsg(message: EventAttributeProtoMsg): EventAttribute;
    toProto(message: EventAttribute): Uint8Array;
    toProtoMsg(message: EventAttribute): EventAttributeProtoMsg;
};
export declare const ExecTxResult: {
    typeUrl: string;
    is(o: any): o is ExecTxResult;
    isSDK(o: any): o is ExecTxResultSDKType;
    isAmino(o: any): o is ExecTxResultAmino;
    encode(message: ExecTxResult, writer?: BinaryWriter): BinaryWriter;
    decode(input: BinaryReader | Uint8Array, length?: number): ExecTxResult;
    fromPartial(object: Partial<ExecTxResult>): ExecTxResult;
    fromAmino(object: ExecTxResultAmino): ExecTxResult;
    toAmino(message: ExecTxResult): ExecTxResultAmino;
    fromAminoMsg(object: ExecTxResultAminoMsg): ExecTxResult;
    fromProtoMsg(message: ExecTxResultProtoMsg): ExecTxResult;
    toProto(message: ExecTxResult): Uint8Array;
    toProtoMsg(message: ExecTxResult): ExecTxResultProtoMsg;
};
export declare const TxResult: {
    typeUrl: string;
    is(o: any): o is TxResult;
    isSDK(o: any): o is TxResultSDKType;
    isAmino(o: any): o is TxResultAmino;
    encode(message: TxResult, writer?: BinaryWriter): BinaryWriter;
    decode(input: BinaryReader | Uint8Array, length?: number): TxResult;
    fromPartial(object: Partial<TxResult>): TxResult;
    fromAmino(object: TxResultAmino): TxResult;
    toAmino(message: TxResult): TxResultAmino;
    fromAminoMsg(object: TxResultAminoMsg): TxResult;
    fromProtoMsg(message: TxResultProtoMsg): TxResult;
    toProto(message: TxResult): Uint8Array;
    toProtoMsg(message: TxResult): TxResultProtoMsg;
};
export declare const Validator: {
    typeUrl: string;
    is(o: any): o is Validator;
    isSDK(o: any): o is ValidatorSDKType;
    isAmino(o: any): o is ValidatorAmino;
    encode(message: Validator, writer?: BinaryWriter): BinaryWriter;
    decode(input: BinaryReader | Uint8Array, length?: number): Validator;
    fromPartial(object: Partial<Validator>): Validator;
    fromAmino(object: ValidatorAmino): Validator;
    toAmino(message: Validator): ValidatorAmino;
    fromAminoMsg(object: ValidatorAminoMsg): Validator;
    fromProtoMsg(message: ValidatorProtoMsg): Validator;
    toProto(message: Validator): Uint8Array;
    toProtoMsg(message: Validator): ValidatorProtoMsg;
};
export declare const ValidatorUpdate: {
    typeUrl: string;
    is(o: any): o is ValidatorUpdate;
    isSDK(o: any): o is ValidatorUpdateSDKType;
    isAmino(o: any): o is ValidatorUpdateAmino;
    encode(message: ValidatorUpdate, writer?: BinaryWriter): BinaryWriter;
    decode(input: BinaryReader | Uint8Array, length?: number): ValidatorUpdate;
    fromPartial(object: Partial<ValidatorUpdate>): ValidatorUpdate;
    fromAmino(object: ValidatorUpdateAmino): ValidatorUpdate;
    toAmino(message: ValidatorUpdate): ValidatorUpdateAmino;
    fromAminoMsg(object: ValidatorUpdateAminoMsg): ValidatorUpdate;
    fromProtoMsg(message: ValidatorUpdateProtoMsg): ValidatorUpdate;
    toProto(message: ValidatorUpdate): Uint8Array;
    toProtoMsg(message: ValidatorUpdate): ValidatorUpdateProtoMsg;
};
export declare const VoteInfo: {
    typeUrl: string;
    is(o: any): o is VoteInfo;
    isSDK(o: any): o is VoteInfoSDKType;
    isAmino(o: any): o is VoteInfoAmino;
    encode(message: VoteInfo, writer?: BinaryWriter): BinaryWriter;
    decode(input: BinaryReader | Uint8Array, length?: number): VoteInfo;
    fromPartial(object: Partial<VoteInfo>): VoteInfo;
    fromAmino(object: VoteInfoAmino): VoteInfo;
    toAmino(message: VoteInfo): VoteInfoAmino;
    fromAminoMsg(object: VoteInfoAminoMsg): VoteInfo;
    fromProtoMsg(message: VoteInfoProtoMsg): VoteInfo;
    toProto(message: VoteInfo): Uint8Array;
    toProtoMsg(message: VoteInfo): VoteInfoProtoMsg;
};
export declare const ExtendedVoteInfo: {
    typeUrl: string;
    is(o: any): o is ExtendedVoteInfo;
    isSDK(o: any): o is ExtendedVoteInfoSDKType;
    isAmino(o: any): o is ExtendedVoteInfoAmino;
    encode(message: ExtendedVoteInfo, writer?: BinaryWriter): BinaryWriter;
    decode(input: BinaryReader | Uint8Array, length?: number): ExtendedVoteInfo;
    fromPartial(object: Partial<ExtendedVoteInfo>): ExtendedVoteInfo;
    fromAmino(object: ExtendedVoteInfoAmino): ExtendedVoteInfo;
    toAmino(message: ExtendedVoteInfo): ExtendedVoteInfoAmino;
    fromAminoMsg(object: ExtendedVoteInfoAminoMsg): ExtendedVoteInfo;
    fromProtoMsg(message: ExtendedVoteInfoProtoMsg): ExtendedVoteInfo;
    toProto(message: ExtendedVoteInfo): Uint8Array;
    toProtoMsg(message: ExtendedVoteInfo): ExtendedVoteInfoProtoMsg;
};
export declare const Misbehavior: {
    typeUrl: string;
    is(o: any): o is Misbehavior;
    isSDK(o: any): o is MisbehaviorSDKType;
    isAmino(o: any): o is MisbehaviorAmino;
    encode(message: Misbehavior, writer?: BinaryWriter): BinaryWriter;
    decode(input: BinaryReader | Uint8Array, length?: number): Misbehavior;
    fromPartial(object: Partial<Misbehavior>): Misbehavior;
    fromAmino(object: MisbehaviorAmino): Misbehavior;
    toAmino(message: Misbehavior): MisbehaviorAmino;
    fromAminoMsg(object: MisbehaviorAminoMsg): Misbehavior;
    fromProtoMsg(message: MisbehaviorProtoMsg): Misbehavior;
    toProto(message: Misbehavior): Uint8Array;
    toProtoMsg(message: Misbehavior): MisbehaviorProtoMsg;
};
export declare const Snapshot: {
    typeUrl: string;
    is(o: any): o is Snapshot;
    isSDK(o: any): o is SnapshotSDKType;
    isAmino(o: any): o is SnapshotAmino;
    encode(message: Snapshot, writer?: BinaryWriter): BinaryWriter;
    decode(input: BinaryReader | Uint8Array, length?: number): Snapshot;
    fromPartial(object: Partial<Snapshot>): Snapshot;
    fromAmino(object: SnapshotAmino): Snapshot;
    toAmino(message: Snapshot): SnapshotAmino;
    fromAminoMsg(object: SnapshotAminoMsg): Snapshot;
    fromProtoMsg(message: SnapshotProtoMsg): Snapshot;
    toProto(message: Snapshot): Uint8Array;
    toProtoMsg(message: Snapshot): SnapshotProtoMsg;
};
