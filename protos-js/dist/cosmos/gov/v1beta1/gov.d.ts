import { Coin, CoinAmino, CoinSDKType } from "../../base/v1beta1/coin";
import { Any, AnyProtoMsg, AnyAmino, AnySDKType } from "../../../google/protobuf/any";
import { Duration, DurationAmino, DurationSDKType } from "../../../google/protobuf/duration";
import { CommunityPoolSpendProposal, CommunityPoolSpendProposalProtoMsg, CommunityPoolSpendProposalSDKType, CommunityPoolSpendProposalWithDeposit, CommunityPoolSpendProposalWithDepositProtoMsg, CommunityPoolSpendProposalWithDepositSDKType } from "../../distribution/v1beta1/distribution";
import { SoftwareUpgradeProposal, SoftwareUpgradeProposalProtoMsg, SoftwareUpgradeProposalSDKType, CancelSoftwareUpgradeProposal, CancelSoftwareUpgradeProposalProtoMsg, CancelSoftwareUpgradeProposalSDKType } from "../../upgrade/v1beta1/upgrade";
import { BinaryReader, BinaryWriter } from "../../../binary";
/** VoteOption enumerates the valid vote options for a given governance proposal. */
export declare enum VoteOption {
    /** VOTE_OPTION_UNSPECIFIED - VOTE_OPTION_UNSPECIFIED defines a no-op vote option. */
    VOTE_OPTION_UNSPECIFIED = 0,
    /** VOTE_OPTION_YES - VOTE_OPTION_YES defines a yes vote option. */
    VOTE_OPTION_YES = 1,
    /** VOTE_OPTION_ABSTAIN - VOTE_OPTION_ABSTAIN defines an abstain vote option. */
    VOTE_OPTION_ABSTAIN = 2,
    /** VOTE_OPTION_NO - VOTE_OPTION_NO defines a no vote option. */
    VOTE_OPTION_NO = 3,
    /** VOTE_OPTION_NO_WITH_VETO - VOTE_OPTION_NO_WITH_VETO defines a no with veto vote option. */
    VOTE_OPTION_NO_WITH_VETO = 4,
    UNRECOGNIZED = -1
}
export declare const VoteOptionSDKType: typeof VoteOption;
export declare const VoteOptionAmino: typeof VoteOption;
export declare function voteOptionFromJSON(object: any): VoteOption;
export declare function voteOptionToJSON(object: VoteOption): string;
/** ProposalStatus enumerates the valid statuses of a proposal. */
export declare enum ProposalStatus {
    /** PROPOSAL_STATUS_UNSPECIFIED - PROPOSAL_STATUS_UNSPECIFIED defines the default proposal status. */
    PROPOSAL_STATUS_UNSPECIFIED = 0,
    /**
     * PROPOSAL_STATUS_DEPOSIT_PERIOD - PROPOSAL_STATUS_DEPOSIT_PERIOD defines a proposal status during the deposit
     * period.
     */
    PROPOSAL_STATUS_DEPOSIT_PERIOD = 1,
    /**
     * PROPOSAL_STATUS_VOTING_PERIOD - PROPOSAL_STATUS_VOTING_PERIOD defines a proposal status during the voting
     * period.
     */
    PROPOSAL_STATUS_VOTING_PERIOD = 2,
    /**
     * PROPOSAL_STATUS_PASSED - PROPOSAL_STATUS_PASSED defines a proposal status of a proposal that has
     * passed.
     */
    PROPOSAL_STATUS_PASSED = 3,
    /**
     * PROPOSAL_STATUS_REJECTED - PROPOSAL_STATUS_REJECTED defines a proposal status of a proposal that has
     * been rejected.
     */
    PROPOSAL_STATUS_REJECTED = 4,
    /**
     * PROPOSAL_STATUS_FAILED - PROPOSAL_STATUS_FAILED defines a proposal status of a proposal that has
     * failed.
     */
    PROPOSAL_STATUS_FAILED = 5,
    UNRECOGNIZED = -1
}
export declare const ProposalStatusSDKType: typeof ProposalStatus;
export declare const ProposalStatusAmino: typeof ProposalStatus;
export declare function proposalStatusFromJSON(object: any): ProposalStatus;
export declare function proposalStatusToJSON(object: ProposalStatus): string;
/**
 * WeightedVoteOption defines a unit of vote for vote split.
 *
 * Since: cosmos-sdk 0.43
 */
export interface WeightedVoteOption {
    /** option defines the valid vote options, it must not contain duplicate vote options. */
    option: VoteOption;
    /** weight is the vote weight associated with the vote option. */
    weight: string;
}
export interface WeightedVoteOptionProtoMsg {
    typeUrl: "/cosmos.gov.v1beta1.WeightedVoteOption";
    value: Uint8Array;
}
/**
 * WeightedVoteOption defines a unit of vote for vote split.
 *
 * Since: cosmos-sdk 0.43
 */
export interface WeightedVoteOptionAmino {
    /** option defines the valid vote options, it must not contain duplicate vote options. */
    option?: VoteOption;
    /** weight is the vote weight associated with the vote option. */
    weight: string;
}
export interface WeightedVoteOptionAminoMsg {
    type: "cosmos-sdk/WeightedVoteOption";
    value: WeightedVoteOptionAmino;
}
/**
 * WeightedVoteOption defines a unit of vote for vote split.
 *
 * Since: cosmos-sdk 0.43
 */
export interface WeightedVoteOptionSDKType {
    option: VoteOption;
    weight: string;
}
/**
 * TextProposal defines a standard text proposal whose changes need to be
 * manually updated in case of approval.
 */
export interface TextProposal {
    $typeUrl?: "/cosmos.gov.v1beta1.TextProposal";
    /** title of the proposal. */
    title: string;
    /** description associated with the proposal. */
    description: string;
}
export interface TextProposalProtoMsg {
    typeUrl: "/cosmos.gov.v1beta1.TextProposal";
    value: Uint8Array;
}
/**
 * TextProposal defines a standard text proposal whose changes need to be
 * manually updated in case of approval.
 */
export interface TextProposalAmino {
    /** title of the proposal. */
    title?: string;
    /** description associated with the proposal. */
    description?: string;
}
export interface TextProposalAminoMsg {
    type: "cosmos-sdk/TextProposal";
    value: TextProposalAmino;
}
/**
 * TextProposal defines a standard text proposal whose changes need to be
 * manually updated in case of approval.
 */
export interface TextProposalSDKType {
    $typeUrl?: "/cosmos.gov.v1beta1.TextProposal";
    title: string;
    description: string;
}
/**
 * Deposit defines an amount deposited by an account address to an active
 * proposal.
 */
export interface Deposit {
    /** proposal_id defines the unique id of the proposal. */
    proposalId: bigint;
    /** depositor defines the deposit addresses from the proposals. */
    depositor: string;
    /** amount to be deposited by depositor. */
    amount: Coin[];
}
export interface DepositProtoMsg {
    typeUrl: "/cosmos.gov.v1beta1.Deposit";
    value: Uint8Array;
}
/**
 * Deposit defines an amount deposited by an account address to an active
 * proposal.
 */
export interface DepositAmino {
    /** proposal_id defines the unique id of the proposal. */
    proposal_id?: string;
    /** depositor defines the deposit addresses from the proposals. */
    depositor?: string;
    /** amount to be deposited by depositor. */
    amount: CoinAmino[];
}
export interface DepositAminoMsg {
    type: "cosmos-sdk/Deposit";
    value: DepositAmino;
}
/**
 * Deposit defines an amount deposited by an account address to an active
 * proposal.
 */
export interface DepositSDKType {
    proposal_id: bigint;
    depositor: string;
    amount: CoinSDKType[];
}
/** Proposal defines the core field members of a governance proposal. */
export interface Proposal {
    /** proposal_id defines the unique id of the proposal. */
    proposalId: bigint;
    /** content is the proposal's content. */
    content?: TextProposal | CommunityPoolSpendProposal | CommunityPoolSpendProposalWithDeposit | SoftwareUpgradeProposal | CancelSoftwareUpgradeProposal | Any | undefined;
    /** status defines the proposal status. */
    status: ProposalStatus;
    /**
     * final_tally_result is the final tally result of the proposal. When
     * querying a proposal via gRPC, this field is not populated until the
     * proposal's voting period has ended.
     */
    finalTallyResult: TallyResult;
    /** submit_time is the time of proposal submission. */
    submitTime: Date;
    /** deposit_end_time is the end time for deposition. */
    depositEndTime: Date;
    /** total_deposit is the total deposit on the proposal. */
    totalDeposit: Coin[];
    /** voting_start_time is the starting time to vote on a proposal. */
    votingStartTime: Date;
    /** voting_end_time is the end time of voting on a proposal. */
    votingEndTime: Date;
}
export interface ProposalProtoMsg {
    typeUrl: "/cosmos.gov.v1beta1.Proposal";
    value: Uint8Array;
}
export type ProposalEncoded = Omit<Proposal, "content"> & {
    /** content is the proposal's content. */ content?: TextProposalProtoMsg | CommunityPoolSpendProposalProtoMsg | CommunityPoolSpendProposalWithDepositProtoMsg | SoftwareUpgradeProposalProtoMsg | CancelSoftwareUpgradeProposalProtoMsg | AnyProtoMsg | undefined;
};
/** Proposal defines the core field members of a governance proposal. */
export interface ProposalAmino {
    /** proposal_id defines the unique id of the proposal. */
    proposal_id?: string;
    /** content is the proposal's content. */
    content?: AnyAmino;
    /** status defines the proposal status. */
    status?: ProposalStatus;
    /**
     * final_tally_result is the final tally result of the proposal. When
     * querying a proposal via gRPC, this field is not populated until the
     * proposal's voting period has ended.
     */
    final_tally_result: TallyResultAmino;
    /** submit_time is the time of proposal submission. */
    submit_time: string;
    /** deposit_end_time is the end time for deposition. */
    deposit_end_time: string;
    /** total_deposit is the total deposit on the proposal. */
    total_deposit: CoinAmino[];
    /** voting_start_time is the starting time to vote on a proposal. */
    voting_start_time: string;
    /** voting_end_time is the end time of voting on a proposal. */
    voting_end_time: string;
}
export interface ProposalAminoMsg {
    type: "cosmos-sdk/Proposal";
    value: ProposalAmino;
}
/** Proposal defines the core field members of a governance proposal. */
export interface ProposalSDKType {
    proposal_id: bigint;
    content?: TextProposalSDKType | CommunityPoolSpendProposalSDKType | CommunityPoolSpendProposalWithDepositSDKType | SoftwareUpgradeProposalSDKType | CancelSoftwareUpgradeProposalSDKType | AnySDKType | undefined;
    status: ProposalStatus;
    final_tally_result: TallyResultSDKType;
    submit_time: Date;
    deposit_end_time: Date;
    total_deposit: CoinSDKType[];
    voting_start_time: Date;
    voting_end_time: Date;
}
/** TallyResult defines a standard tally for a governance proposal. */
export interface TallyResult {
    /** yes is the number of yes votes on a proposal. */
    yes: string;
    /** abstain is the number of abstain votes on a proposal. */
    abstain: string;
    /** no is the number of no votes on a proposal. */
    no: string;
    /** no_with_veto is the number of no with veto votes on a proposal. */
    noWithVeto: string;
}
export interface TallyResultProtoMsg {
    typeUrl: "/cosmos.gov.v1beta1.TallyResult";
    value: Uint8Array;
}
/** TallyResult defines a standard tally for a governance proposal. */
export interface TallyResultAmino {
    /** yes is the number of yes votes on a proposal. */
    yes?: string;
    /** abstain is the number of abstain votes on a proposal. */
    abstain?: string;
    /** no is the number of no votes on a proposal. */
    no?: string;
    /** no_with_veto is the number of no with veto votes on a proposal. */
    no_with_veto?: string;
}
export interface TallyResultAminoMsg {
    type: "cosmos-sdk/TallyResult";
    value: TallyResultAmino;
}
/** TallyResult defines a standard tally for a governance proposal. */
export interface TallyResultSDKType {
    yes: string;
    abstain: string;
    no: string;
    no_with_veto: string;
}
/**
 * Vote defines a vote on a governance proposal.
 * A Vote consists of a proposal ID, the voter, and the vote option.
 */
export interface Vote {
    /** proposal_id defines the unique id of the proposal. */
    proposalId: bigint;
    /** voter is the voter address of the proposal. */
    voter: string;
    /**
     * Deprecated: Prefer to use `options` instead. This field is set in queries
     * if and only if `len(options) == 1` and that option has weight 1. In all
     * other cases, this field will default to VOTE_OPTION_UNSPECIFIED.
     */
    /** @deprecated */
    option: VoteOption;
    /**
     * options is the weighted vote options.
     *
     * Since: cosmos-sdk 0.43
     */
    options: WeightedVoteOption[];
}
export interface VoteProtoMsg {
    typeUrl: "/cosmos.gov.v1beta1.Vote";
    value: Uint8Array;
}
/**
 * Vote defines a vote on a governance proposal.
 * A Vote consists of a proposal ID, the voter, and the vote option.
 */
export interface VoteAmino {
    /** proposal_id defines the unique id of the proposal. */
    proposal_id: string;
    /** voter is the voter address of the proposal. */
    voter?: string;
    /**
     * Deprecated: Prefer to use `options` instead. This field is set in queries
     * if and only if `len(options) == 1` and that option has weight 1. In all
     * other cases, this field will default to VOTE_OPTION_UNSPECIFIED.
     */
    /** @deprecated */
    option?: VoteOption;
    /**
     * options is the weighted vote options.
     *
     * Since: cosmos-sdk 0.43
     */
    options: WeightedVoteOptionAmino[];
}
export interface VoteAminoMsg {
    type: "cosmos-sdk/Vote";
    value: VoteAmino;
}
/**
 * Vote defines a vote on a governance proposal.
 * A Vote consists of a proposal ID, the voter, and the vote option.
 */
export interface VoteSDKType {
    proposal_id: bigint;
    voter: string;
    /** @deprecated */
    option: VoteOption;
    options: WeightedVoteOptionSDKType[];
}
/** DepositParams defines the params for deposits on governance proposals. */
export interface DepositParams {
    /** Minimum deposit for a proposal to enter voting period. */
    minDeposit: Coin[];
    /**
     * Maximum period for Atom holders to deposit on a proposal. Initial value: 2
     * months.
     */
    maxDepositPeriod: Duration;
}
export interface DepositParamsProtoMsg {
    typeUrl: "/cosmos.gov.v1beta1.DepositParams";
    value: Uint8Array;
}
/** DepositParams defines the params for deposits on governance proposals. */
export interface DepositParamsAmino {
    /** Minimum deposit for a proposal to enter voting period. */
    min_deposit?: CoinAmino[];
    /**
     * Maximum period for Atom holders to deposit on a proposal. Initial value: 2
     * months.
     */
    max_deposit_period?: DurationAmino;
}
export interface DepositParamsAminoMsg {
    type: "cosmos-sdk/DepositParams";
    value: DepositParamsAmino;
}
/** DepositParams defines the params for deposits on governance proposals. */
export interface DepositParamsSDKType {
    min_deposit: CoinSDKType[];
    max_deposit_period: DurationSDKType;
}
/** VotingParams defines the params for voting on governance proposals. */
export interface VotingParams {
    /** Duration of the voting period. */
    votingPeriod: Duration;
}
export interface VotingParamsProtoMsg {
    typeUrl: "/cosmos.gov.v1beta1.VotingParams";
    value: Uint8Array;
}
/** VotingParams defines the params for voting on governance proposals. */
export interface VotingParamsAmino {
    /** Duration of the voting period. */
    voting_period?: DurationAmino;
}
export interface VotingParamsAminoMsg {
    type: "cosmos-sdk/VotingParams";
    value: VotingParamsAmino;
}
/** VotingParams defines the params for voting on governance proposals. */
export interface VotingParamsSDKType {
    voting_period: DurationSDKType;
}
/** TallyParams defines the params for tallying votes on governance proposals. */
export interface TallyParams {
    /**
     * Minimum percentage of total stake needed to vote for a result to be
     * considered valid.
     */
    quorum: Uint8Array;
    /** Minimum proportion of Yes votes for proposal to pass. Default value: 0.5. */
    threshold: Uint8Array;
    /**
     * Minimum value of Veto votes to Total votes ratio for proposal to be
     * vetoed. Default value: 1/3.
     */
    vetoThreshold: Uint8Array;
}
export interface TallyParamsProtoMsg {
    typeUrl: "/cosmos.gov.v1beta1.TallyParams";
    value: Uint8Array;
}
/** TallyParams defines the params for tallying votes on governance proposals. */
export interface TallyParamsAmino {
    /**
     * Minimum percentage of total stake needed to vote for a result to be
     * considered valid.
     */
    quorum?: string;
    /** Minimum proportion of Yes votes for proposal to pass. Default value: 0.5. */
    threshold?: string;
    /**
     * Minimum value of Veto votes to Total votes ratio for proposal to be
     * vetoed. Default value: 1/3.
     */
    veto_threshold?: string;
}
export interface TallyParamsAminoMsg {
    type: "cosmos-sdk/TallyParams";
    value: TallyParamsAmino;
}
/** TallyParams defines the params for tallying votes on governance proposals. */
export interface TallyParamsSDKType {
    quorum: Uint8Array;
    threshold: Uint8Array;
    veto_threshold: Uint8Array;
}
export declare const WeightedVoteOption: {
    typeUrl: string;
    aminoType: string;
    is(o: any): o is WeightedVoteOption;
    isSDK(o: any): o is WeightedVoteOptionSDKType;
    isAmino(o: any): o is WeightedVoteOptionAmino;
    encode(message: WeightedVoteOption, writer?: BinaryWriter): BinaryWriter;
    decode(input: BinaryReader | Uint8Array, length?: number): WeightedVoteOption;
    fromPartial(object: Partial<WeightedVoteOption>): WeightedVoteOption;
    fromAmino(object: WeightedVoteOptionAmino): WeightedVoteOption;
    toAmino(message: WeightedVoteOption): WeightedVoteOptionAmino;
    fromAminoMsg(object: WeightedVoteOptionAminoMsg): WeightedVoteOption;
    toAminoMsg(message: WeightedVoteOption): WeightedVoteOptionAminoMsg;
    fromProtoMsg(message: WeightedVoteOptionProtoMsg): WeightedVoteOption;
    toProto(message: WeightedVoteOption): Uint8Array;
    toProtoMsg(message: WeightedVoteOption): WeightedVoteOptionProtoMsg;
};
export declare const TextProposal: {
    typeUrl: string;
    aminoType: string;
    is(o: any): o is TextProposal;
    isSDK(o: any): o is TextProposalSDKType;
    isAmino(o: any): o is TextProposalAmino;
    encode(message: TextProposal, writer?: BinaryWriter): BinaryWriter;
    decode(input: BinaryReader | Uint8Array, length?: number): TextProposal;
    fromPartial(object: Partial<TextProposal>): TextProposal;
    fromAmino(object: TextProposalAmino): TextProposal;
    toAmino(message: TextProposal): TextProposalAmino;
    fromAminoMsg(object: TextProposalAminoMsg): TextProposal;
    toAminoMsg(message: TextProposal): TextProposalAminoMsg;
    fromProtoMsg(message: TextProposalProtoMsg): TextProposal;
    toProto(message: TextProposal): Uint8Array;
    toProtoMsg(message: TextProposal): TextProposalProtoMsg;
};
export declare const Deposit: {
    typeUrl: string;
    aminoType: string;
    is(o: any): o is Deposit;
    isSDK(o: any): o is DepositSDKType;
    isAmino(o: any): o is DepositAmino;
    encode(message: Deposit, writer?: BinaryWriter): BinaryWriter;
    decode(input: BinaryReader | Uint8Array, length?: number): Deposit;
    fromPartial(object: Partial<Deposit>): Deposit;
    fromAmino(object: DepositAmino): Deposit;
    toAmino(message: Deposit): DepositAmino;
    fromAminoMsg(object: DepositAminoMsg): Deposit;
    toAminoMsg(message: Deposit): DepositAminoMsg;
    fromProtoMsg(message: DepositProtoMsg): Deposit;
    toProto(message: Deposit): Uint8Array;
    toProtoMsg(message: Deposit): DepositProtoMsg;
};
export declare const Proposal: {
    typeUrl: string;
    aminoType: string;
    is(o: any): o is Proposal;
    isSDK(o: any): o is ProposalSDKType;
    isAmino(o: any): o is ProposalAmino;
    encode(message: Proposal, writer?: BinaryWriter): BinaryWriter;
    decode(input: BinaryReader | Uint8Array, length?: number): Proposal;
    fromPartial(object: Partial<Proposal>): Proposal;
    fromAmino(object: ProposalAmino): Proposal;
    toAmino(message: Proposal): ProposalAmino;
    fromAminoMsg(object: ProposalAminoMsg): Proposal;
    toAminoMsg(message: Proposal): ProposalAminoMsg;
    fromProtoMsg(message: ProposalProtoMsg): Proposal;
    toProto(message: Proposal): Uint8Array;
    toProtoMsg(message: Proposal): ProposalProtoMsg;
};
export declare const TallyResult: {
    typeUrl: string;
    aminoType: string;
    is(o: any): o is TallyResult;
    isSDK(o: any): o is TallyResultSDKType;
    isAmino(o: any): o is TallyResultAmino;
    encode(message: TallyResult, writer?: BinaryWriter): BinaryWriter;
    decode(input: BinaryReader | Uint8Array, length?: number): TallyResult;
    fromPartial(object: Partial<TallyResult>): TallyResult;
    fromAmino(object: TallyResultAmino): TallyResult;
    toAmino(message: TallyResult): TallyResultAmino;
    fromAminoMsg(object: TallyResultAminoMsg): TallyResult;
    toAminoMsg(message: TallyResult): TallyResultAminoMsg;
    fromProtoMsg(message: TallyResultProtoMsg): TallyResult;
    toProto(message: TallyResult): Uint8Array;
    toProtoMsg(message: TallyResult): TallyResultProtoMsg;
};
export declare const Vote: {
    typeUrl: string;
    aminoType: string;
    is(o: any): o is Vote;
    isSDK(o: any): o is VoteSDKType;
    isAmino(o: any): o is VoteAmino;
    encode(message: Vote, writer?: BinaryWriter): BinaryWriter;
    decode(input: BinaryReader | Uint8Array, length?: number): Vote;
    fromPartial(object: Partial<Vote>): Vote;
    fromAmino(object: VoteAmino): Vote;
    toAmino(message: Vote): VoteAmino;
    fromAminoMsg(object: VoteAminoMsg): Vote;
    toAminoMsg(message: Vote): VoteAminoMsg;
    fromProtoMsg(message: VoteProtoMsg): Vote;
    toProto(message: Vote): Uint8Array;
    toProtoMsg(message: Vote): VoteProtoMsg;
};
export declare const DepositParams: {
    typeUrl: string;
    aminoType: string;
    is(o: any): o is DepositParams;
    isSDK(o: any): o is DepositParamsSDKType;
    isAmino(o: any): o is DepositParamsAmino;
    encode(message: DepositParams, writer?: BinaryWriter): BinaryWriter;
    decode(input: BinaryReader | Uint8Array, length?: number): DepositParams;
    fromPartial(object: Partial<DepositParams>): DepositParams;
    fromAmino(object: DepositParamsAmino): DepositParams;
    toAmino(message: DepositParams): DepositParamsAmino;
    fromAminoMsg(object: DepositParamsAminoMsg): DepositParams;
    toAminoMsg(message: DepositParams): DepositParamsAminoMsg;
    fromProtoMsg(message: DepositParamsProtoMsg): DepositParams;
    toProto(message: DepositParams): Uint8Array;
    toProtoMsg(message: DepositParams): DepositParamsProtoMsg;
};
export declare const VotingParams: {
    typeUrl: string;
    aminoType: string;
    is(o: any): o is VotingParams;
    isSDK(o: any): o is VotingParamsSDKType;
    isAmino(o: any): o is VotingParamsAmino;
    encode(message: VotingParams, writer?: BinaryWriter): BinaryWriter;
    decode(input: BinaryReader | Uint8Array, length?: number): VotingParams;
    fromPartial(object: Partial<VotingParams>): VotingParams;
    fromAmino(object: VotingParamsAmino): VotingParams;
    toAmino(message: VotingParams): VotingParamsAmino;
    fromAminoMsg(object: VotingParamsAminoMsg): VotingParams;
    toAminoMsg(message: VotingParams): VotingParamsAminoMsg;
    fromProtoMsg(message: VotingParamsProtoMsg): VotingParams;
    toProto(message: VotingParams): Uint8Array;
    toProtoMsg(message: VotingParams): VotingParamsProtoMsg;
};
export declare const TallyParams: {
    typeUrl: string;
    aminoType: string;
    is(o: any): o is TallyParams;
    isSDK(o: any): o is TallyParamsSDKType;
    isAmino(o: any): o is TallyParamsAmino;
    encode(message: TallyParams, writer?: BinaryWriter): BinaryWriter;
    decode(input: BinaryReader | Uint8Array, length?: number): TallyParams;
    fromPartial(object: Partial<TallyParams>): TallyParams;
    fromAmino(object: TallyParamsAmino): TallyParams;
    toAmino(message: TallyParams): TallyParamsAmino;
    fromAminoMsg(object: TallyParamsAminoMsg): TallyParams;
    toAminoMsg(message: TallyParams): TallyParamsAminoMsg;
    fromProtoMsg(message: TallyParamsProtoMsg): TallyParams;
    toProto(message: TallyParams): Uint8Array;
    toProtoMsg(message: TallyParams): TallyParamsProtoMsg;
};
