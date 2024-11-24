import { Any, AnyProtoMsg, AnyAmino, AnySDKType } from "../../../google/protobuf/any";
import { Coin, CoinAmino, CoinSDKType } from "../../base/v1beta1/coin";
import { VoteOption, WeightedVoteOption, WeightedVoteOptionAmino, WeightedVoteOptionSDKType, Params, ParamsAmino, ParamsSDKType } from "./gov";
import { CommunityPoolSpendProposal, CommunityPoolSpendProposalProtoMsg, CommunityPoolSpendProposalSDKType, CommunityPoolSpendProposalWithDeposit, CommunityPoolSpendProposalWithDepositProtoMsg, CommunityPoolSpendProposalWithDepositSDKType } from "../../distribution/v1beta1/distribution";
import { TextProposal, TextProposalProtoMsg, TextProposalSDKType } from "../v1beta1/gov";
import { SoftwareUpgradeProposal, SoftwareUpgradeProposalProtoMsg, SoftwareUpgradeProposalSDKType, CancelSoftwareUpgradeProposal, CancelSoftwareUpgradeProposalProtoMsg, CancelSoftwareUpgradeProposalSDKType } from "../../upgrade/v1beta1/upgrade";
import { BinaryReader, BinaryWriter } from "../../../binary";
/**
 * MsgSubmitProposal defines an sdk.Msg type that supports submitting arbitrary
 * proposal Content.
 */
export interface MsgSubmitProposal {
    /** messages are the arbitrary messages to be executed if proposal passes. */
    messages: Any[];
    /** initial_deposit is the deposit value that must be paid at proposal submission. */
    initialDeposit: Coin[];
    /** proposer is the account address of the proposer. */
    proposer: string;
    /** metadata is any arbitrary metadata attached to the proposal. */
    metadata: string;
    /**
     * title is the title of the proposal.
     *
     * Since: cosmos-sdk 0.47
     */
    title: string;
    /**
     * summary is the summary of the proposal
     *
     * Since: cosmos-sdk 0.47
     */
    summary: string;
    /**
     * expedited defines if the proposal is expedited or not
     *
     * Since: cosmos-sdk 0.50
     */
    expedited: boolean;
}
export interface MsgSubmitProposalProtoMsg {
    typeUrl: "/cosmos.gov.v1.MsgSubmitProposal";
    value: Uint8Array;
}
/**
 * MsgSubmitProposal defines an sdk.Msg type that supports submitting arbitrary
 * proposal Content.
 */
export interface MsgSubmitProposalAmino {
    /** messages are the arbitrary messages to be executed if proposal passes. */
    messages?: AnyAmino[];
    /** initial_deposit is the deposit value that must be paid at proposal submission. */
    initial_deposit: CoinAmino[];
    /** proposer is the account address of the proposer. */
    proposer?: string;
    /** metadata is any arbitrary metadata attached to the proposal. */
    metadata?: string;
    /**
     * title is the title of the proposal.
     *
     * Since: cosmos-sdk 0.47
     */
    title?: string;
    /**
     * summary is the summary of the proposal
     *
     * Since: cosmos-sdk 0.47
     */
    summary?: string;
    /**
     * expedited defines if the proposal is expedited or not
     *
     * Since: cosmos-sdk 0.50
     */
    expedited?: boolean;
}
export interface MsgSubmitProposalAminoMsg {
    type: "cosmos-sdk/v1/MsgSubmitProposal";
    value: MsgSubmitProposalAmino;
}
/**
 * MsgSubmitProposal defines an sdk.Msg type that supports submitting arbitrary
 * proposal Content.
 */
export interface MsgSubmitProposalSDKType {
    messages: AnySDKType[];
    initial_deposit: CoinSDKType[];
    proposer: string;
    metadata: string;
    title: string;
    summary: string;
    expedited: boolean;
}
/** MsgSubmitProposalResponse defines the Msg/SubmitProposal response type. */
export interface MsgSubmitProposalResponse {
    /** proposal_id defines the unique id of the proposal. */
    proposalId: bigint;
}
export interface MsgSubmitProposalResponseProtoMsg {
    typeUrl: "/cosmos.gov.v1.MsgSubmitProposalResponse";
    value: Uint8Array;
}
/** MsgSubmitProposalResponse defines the Msg/SubmitProposal response type. */
export interface MsgSubmitProposalResponseAmino {
    /** proposal_id defines the unique id of the proposal. */
    proposal_id?: string;
}
export interface MsgSubmitProposalResponseAminoMsg {
    type: "cosmos-sdk/v1/MsgSubmitProposalResponse";
    value: MsgSubmitProposalResponseAmino;
}
/** MsgSubmitProposalResponse defines the Msg/SubmitProposal response type. */
export interface MsgSubmitProposalResponseSDKType {
    proposal_id: bigint;
}
/**
 * MsgExecLegacyContent is used to wrap the legacy content field into a message.
 * This ensures backwards compatibility with v1beta1.MsgSubmitProposal.
 */
export interface MsgExecLegacyContent {
    /** content is the proposal's content. */
    content?: CommunityPoolSpendProposal | CommunityPoolSpendProposalWithDeposit | TextProposal | SoftwareUpgradeProposal | CancelSoftwareUpgradeProposal | Any | undefined;
    /** authority must be the gov module address. */
    authority: string;
}
export interface MsgExecLegacyContentProtoMsg {
    typeUrl: "/cosmos.gov.v1.MsgExecLegacyContent";
    value: Uint8Array;
}
export type MsgExecLegacyContentEncoded = Omit<MsgExecLegacyContent, "content"> & {
    /** content is the proposal's content. */ content?: CommunityPoolSpendProposalProtoMsg | CommunityPoolSpendProposalWithDepositProtoMsg | TextProposalProtoMsg | SoftwareUpgradeProposalProtoMsg | CancelSoftwareUpgradeProposalProtoMsg | AnyProtoMsg | undefined;
};
/**
 * MsgExecLegacyContent is used to wrap the legacy content field into a message.
 * This ensures backwards compatibility with v1beta1.MsgSubmitProposal.
 */
export interface MsgExecLegacyContentAmino {
    /** content is the proposal's content. */
    content?: AnyAmino;
    /** authority must be the gov module address. */
    authority?: string;
}
export interface MsgExecLegacyContentAminoMsg {
    type: "cosmos-sdk/v1/MsgExecLegacyContent";
    value: MsgExecLegacyContentAmino;
}
/**
 * MsgExecLegacyContent is used to wrap the legacy content field into a message.
 * This ensures backwards compatibility with v1beta1.MsgSubmitProposal.
 */
export interface MsgExecLegacyContentSDKType {
    content?: CommunityPoolSpendProposalSDKType | CommunityPoolSpendProposalWithDepositSDKType | TextProposalSDKType | SoftwareUpgradeProposalSDKType | CancelSoftwareUpgradeProposalSDKType | AnySDKType | undefined;
    authority: string;
}
/** MsgExecLegacyContentResponse defines the Msg/ExecLegacyContent response type. */
export interface MsgExecLegacyContentResponse {
}
export interface MsgExecLegacyContentResponseProtoMsg {
    typeUrl: "/cosmos.gov.v1.MsgExecLegacyContentResponse";
    value: Uint8Array;
}
/** MsgExecLegacyContentResponse defines the Msg/ExecLegacyContent response type. */
export interface MsgExecLegacyContentResponseAmino {
}
export interface MsgExecLegacyContentResponseAminoMsg {
    type: "cosmos-sdk/v1/MsgExecLegacyContentResponse";
    value: MsgExecLegacyContentResponseAmino;
}
/** MsgExecLegacyContentResponse defines the Msg/ExecLegacyContent response type. */
export interface MsgExecLegacyContentResponseSDKType {
}
/** MsgVote defines a message to cast a vote. */
export interface MsgVote {
    /** proposal_id defines the unique id of the proposal. */
    proposalId: bigint;
    /** voter is the voter address for the proposal. */
    voter: string;
    /** option defines the vote option. */
    option: VoteOption;
    /** metadata is any arbitrary metadata attached to the Vote. */
    metadata: string;
}
export interface MsgVoteProtoMsg {
    typeUrl: "/cosmos.gov.v1.MsgVote";
    value: Uint8Array;
}
/** MsgVote defines a message to cast a vote. */
export interface MsgVoteAmino {
    /** proposal_id defines the unique id of the proposal. */
    proposal_id: string;
    /** voter is the voter address for the proposal. */
    voter?: string;
    /** option defines the vote option. */
    option?: VoteOption;
    /** metadata is any arbitrary metadata attached to the Vote. */
    metadata?: string;
}
export interface MsgVoteAminoMsg {
    type: "cosmos-sdk/v1/MsgVote";
    value: MsgVoteAmino;
}
/** MsgVote defines a message to cast a vote. */
export interface MsgVoteSDKType {
    proposal_id: bigint;
    voter: string;
    option: VoteOption;
    metadata: string;
}
/** MsgVoteResponse defines the Msg/Vote response type. */
export interface MsgVoteResponse {
}
export interface MsgVoteResponseProtoMsg {
    typeUrl: "/cosmos.gov.v1.MsgVoteResponse";
    value: Uint8Array;
}
/** MsgVoteResponse defines the Msg/Vote response type. */
export interface MsgVoteResponseAmino {
}
export interface MsgVoteResponseAminoMsg {
    type: "cosmos-sdk/v1/MsgVoteResponse";
    value: MsgVoteResponseAmino;
}
/** MsgVoteResponse defines the Msg/Vote response type. */
export interface MsgVoteResponseSDKType {
}
/** MsgVoteWeighted defines a message to cast a vote. */
export interface MsgVoteWeighted {
    /** proposal_id defines the unique id of the proposal. */
    proposalId: bigint;
    /** voter is the voter address for the proposal. */
    voter: string;
    /** options defines the weighted vote options. */
    options: WeightedVoteOption[];
    /** metadata is any arbitrary metadata attached to the VoteWeighted. */
    metadata: string;
}
export interface MsgVoteWeightedProtoMsg {
    typeUrl: "/cosmos.gov.v1.MsgVoteWeighted";
    value: Uint8Array;
}
/** MsgVoteWeighted defines a message to cast a vote. */
export interface MsgVoteWeightedAmino {
    /** proposal_id defines the unique id of the proposal. */
    proposal_id: string;
    /** voter is the voter address for the proposal. */
    voter?: string;
    /** options defines the weighted vote options. */
    options?: WeightedVoteOptionAmino[];
    /** metadata is any arbitrary metadata attached to the VoteWeighted. */
    metadata?: string;
}
export interface MsgVoteWeightedAminoMsg {
    type: "cosmos-sdk/v1/MsgVoteWeighted";
    value: MsgVoteWeightedAmino;
}
/** MsgVoteWeighted defines a message to cast a vote. */
export interface MsgVoteWeightedSDKType {
    proposal_id: bigint;
    voter: string;
    options: WeightedVoteOptionSDKType[];
    metadata: string;
}
/** MsgVoteWeightedResponse defines the Msg/VoteWeighted response type. */
export interface MsgVoteWeightedResponse {
}
export interface MsgVoteWeightedResponseProtoMsg {
    typeUrl: "/cosmos.gov.v1.MsgVoteWeightedResponse";
    value: Uint8Array;
}
/** MsgVoteWeightedResponse defines the Msg/VoteWeighted response type. */
export interface MsgVoteWeightedResponseAmino {
}
export interface MsgVoteWeightedResponseAminoMsg {
    type: "cosmos-sdk/v1/MsgVoteWeightedResponse";
    value: MsgVoteWeightedResponseAmino;
}
/** MsgVoteWeightedResponse defines the Msg/VoteWeighted response type. */
export interface MsgVoteWeightedResponseSDKType {
}
/** MsgDeposit defines a message to submit a deposit to an existing proposal. */
export interface MsgDeposit {
    /** proposal_id defines the unique id of the proposal. */
    proposalId: bigint;
    /** depositor defines the deposit addresses from the proposals. */
    depositor: string;
    /** amount to be deposited by depositor. */
    amount: Coin[];
}
export interface MsgDepositProtoMsg {
    typeUrl: "/cosmos.gov.v1.MsgDeposit";
    value: Uint8Array;
}
/** MsgDeposit defines a message to submit a deposit to an existing proposal. */
export interface MsgDepositAmino {
    /** proposal_id defines the unique id of the proposal. */
    proposal_id: string;
    /** depositor defines the deposit addresses from the proposals. */
    depositor?: string;
    /** amount to be deposited by depositor. */
    amount: CoinAmino[];
}
export interface MsgDepositAminoMsg {
    type: "cosmos-sdk/v1/MsgDeposit";
    value: MsgDepositAmino;
}
/** MsgDeposit defines a message to submit a deposit to an existing proposal. */
export interface MsgDepositSDKType {
    proposal_id: bigint;
    depositor: string;
    amount: CoinSDKType[];
}
/** MsgDepositResponse defines the Msg/Deposit response type. */
export interface MsgDepositResponse {
}
export interface MsgDepositResponseProtoMsg {
    typeUrl: "/cosmos.gov.v1.MsgDepositResponse";
    value: Uint8Array;
}
/** MsgDepositResponse defines the Msg/Deposit response type. */
export interface MsgDepositResponseAmino {
}
export interface MsgDepositResponseAminoMsg {
    type: "cosmos-sdk/v1/MsgDepositResponse";
    value: MsgDepositResponseAmino;
}
/** MsgDepositResponse defines the Msg/Deposit response type. */
export interface MsgDepositResponseSDKType {
}
/**
 * MsgUpdateParams is the Msg/UpdateParams request type.
 *
 * Since: cosmos-sdk 0.47
 */
export interface MsgUpdateParams {
    /** authority is the address that controls the module (defaults to x/gov unless overwritten). */
    authority: string;
    /**
     * params defines the x/gov parameters to update.
     *
     * NOTE: All parameters must be supplied.
     */
    params: Params;
}
export interface MsgUpdateParamsProtoMsg {
    typeUrl: "/cosmos.gov.v1.MsgUpdateParams";
    value: Uint8Array;
}
/**
 * MsgUpdateParams is the Msg/UpdateParams request type.
 *
 * Since: cosmos-sdk 0.47
 */
export interface MsgUpdateParamsAmino {
    /** authority is the address that controls the module (defaults to x/gov unless overwritten). */
    authority?: string;
    /**
     * params defines the x/gov parameters to update.
     *
     * NOTE: All parameters must be supplied.
     */
    params: ParamsAmino;
}
export interface MsgUpdateParamsAminoMsg {
    type: "cosmos-sdk/x/gov/v1/MsgUpdateParams";
    value: MsgUpdateParamsAmino;
}
/**
 * MsgUpdateParams is the Msg/UpdateParams request type.
 *
 * Since: cosmos-sdk 0.47
 */
export interface MsgUpdateParamsSDKType {
    authority: string;
    params: ParamsSDKType;
}
/**
 * MsgUpdateParamsResponse defines the response structure for executing a
 * MsgUpdateParams message.
 *
 * Since: cosmos-sdk 0.47
 */
export interface MsgUpdateParamsResponse {
}
export interface MsgUpdateParamsResponseProtoMsg {
    typeUrl: "/cosmos.gov.v1.MsgUpdateParamsResponse";
    value: Uint8Array;
}
/**
 * MsgUpdateParamsResponse defines the response structure for executing a
 * MsgUpdateParams message.
 *
 * Since: cosmos-sdk 0.47
 */
export interface MsgUpdateParamsResponseAmino {
}
export interface MsgUpdateParamsResponseAminoMsg {
    type: "cosmos-sdk/v1/MsgUpdateParamsResponse";
    value: MsgUpdateParamsResponseAmino;
}
/**
 * MsgUpdateParamsResponse defines the response structure for executing a
 * MsgUpdateParams message.
 *
 * Since: cosmos-sdk 0.47
 */
export interface MsgUpdateParamsResponseSDKType {
}
/**
 * MsgCancelProposal is the Msg/CancelProposal request type.
 *
 * Since: cosmos-sdk 0.50
 */
export interface MsgCancelProposal {
    /** proposal_id defines the unique id of the proposal. */
    proposalId: bigint;
    /** proposer is the account address of the proposer. */
    proposer: string;
}
export interface MsgCancelProposalProtoMsg {
    typeUrl: "/cosmos.gov.v1.MsgCancelProposal";
    value: Uint8Array;
}
/**
 * MsgCancelProposal is the Msg/CancelProposal request type.
 *
 * Since: cosmos-sdk 0.50
 */
export interface MsgCancelProposalAmino {
    /** proposal_id defines the unique id of the proposal. */
    proposal_id: string;
    /** proposer is the account address of the proposer. */
    proposer?: string;
}
export interface MsgCancelProposalAminoMsg {
    type: "cosmos-sdk/v1/MsgCancelProposal";
    value: MsgCancelProposalAmino;
}
/**
 * MsgCancelProposal is the Msg/CancelProposal request type.
 *
 * Since: cosmos-sdk 0.50
 */
export interface MsgCancelProposalSDKType {
    proposal_id: bigint;
    proposer: string;
}
/**
 * MsgCancelProposalResponse defines the response structure for executing a
 * MsgCancelProposal message.
 *
 * Since: cosmos-sdk 0.50
 */
export interface MsgCancelProposalResponse {
    /** proposal_id defines the unique id of the proposal. */
    proposalId: bigint;
    /** canceled_time is the time when proposal is canceled. */
    canceledTime: Date;
    /** canceled_height defines the block height at which the proposal is canceled. */
    canceledHeight: bigint;
}
export interface MsgCancelProposalResponseProtoMsg {
    typeUrl: "/cosmos.gov.v1.MsgCancelProposalResponse";
    value: Uint8Array;
}
/**
 * MsgCancelProposalResponse defines the response structure for executing a
 * MsgCancelProposal message.
 *
 * Since: cosmos-sdk 0.50
 */
export interface MsgCancelProposalResponseAmino {
    /** proposal_id defines the unique id of the proposal. */
    proposal_id: string;
    /** canceled_time is the time when proposal is canceled. */
    canceled_time?: string;
    /** canceled_height defines the block height at which the proposal is canceled. */
    canceled_height?: string;
}
export interface MsgCancelProposalResponseAminoMsg {
    type: "cosmos-sdk/v1/MsgCancelProposalResponse";
    value: MsgCancelProposalResponseAmino;
}
/**
 * MsgCancelProposalResponse defines the response structure for executing a
 * MsgCancelProposal message.
 *
 * Since: cosmos-sdk 0.50
 */
export interface MsgCancelProposalResponseSDKType {
    proposal_id: bigint;
    canceled_time: Date;
    canceled_height: bigint;
}
export declare const MsgSubmitProposal: {
    typeUrl: string;
    aminoType: string;
    is(o: any): o is MsgSubmitProposal;
    isSDK(o: any): o is MsgSubmitProposalSDKType;
    isAmino(o: any): o is MsgSubmitProposalAmino;
    encode(message: MsgSubmitProposal, writer?: BinaryWriter): BinaryWriter;
    decode(input: BinaryReader | Uint8Array, length?: number): MsgSubmitProposal;
    fromPartial(object: Partial<MsgSubmitProposal>): MsgSubmitProposal;
    fromAmino(object: MsgSubmitProposalAmino): MsgSubmitProposal;
    toAmino(message: MsgSubmitProposal): MsgSubmitProposalAmino;
    fromAminoMsg(object: MsgSubmitProposalAminoMsg): MsgSubmitProposal;
    toAminoMsg(message: MsgSubmitProposal): MsgSubmitProposalAminoMsg;
    fromProtoMsg(message: MsgSubmitProposalProtoMsg): MsgSubmitProposal;
    toProto(message: MsgSubmitProposal): Uint8Array;
    toProtoMsg(message: MsgSubmitProposal): MsgSubmitProposalProtoMsg;
};
export declare const MsgSubmitProposalResponse: {
    typeUrl: string;
    aminoType: string;
    is(o: any): o is MsgSubmitProposalResponse;
    isSDK(o: any): o is MsgSubmitProposalResponseSDKType;
    isAmino(o: any): o is MsgSubmitProposalResponseAmino;
    encode(message: MsgSubmitProposalResponse, writer?: BinaryWriter): BinaryWriter;
    decode(input: BinaryReader | Uint8Array, length?: number): MsgSubmitProposalResponse;
    fromPartial(object: Partial<MsgSubmitProposalResponse>): MsgSubmitProposalResponse;
    fromAmino(object: MsgSubmitProposalResponseAmino): MsgSubmitProposalResponse;
    toAmino(message: MsgSubmitProposalResponse): MsgSubmitProposalResponseAmino;
    fromAminoMsg(object: MsgSubmitProposalResponseAminoMsg): MsgSubmitProposalResponse;
    toAminoMsg(message: MsgSubmitProposalResponse): MsgSubmitProposalResponseAminoMsg;
    fromProtoMsg(message: MsgSubmitProposalResponseProtoMsg): MsgSubmitProposalResponse;
    toProto(message: MsgSubmitProposalResponse): Uint8Array;
    toProtoMsg(message: MsgSubmitProposalResponse): MsgSubmitProposalResponseProtoMsg;
};
export declare const MsgExecLegacyContent: {
    typeUrl: string;
    aminoType: string;
    is(o: any): o is MsgExecLegacyContent;
    isSDK(o: any): o is MsgExecLegacyContentSDKType;
    isAmino(o: any): o is MsgExecLegacyContentAmino;
    encode(message: MsgExecLegacyContent, writer?: BinaryWriter): BinaryWriter;
    decode(input: BinaryReader | Uint8Array, length?: number): MsgExecLegacyContent;
    fromPartial(object: Partial<MsgExecLegacyContent>): MsgExecLegacyContent;
    fromAmino(object: MsgExecLegacyContentAmino): MsgExecLegacyContent;
    toAmino(message: MsgExecLegacyContent): MsgExecLegacyContentAmino;
    fromAminoMsg(object: MsgExecLegacyContentAminoMsg): MsgExecLegacyContent;
    toAminoMsg(message: MsgExecLegacyContent): MsgExecLegacyContentAminoMsg;
    fromProtoMsg(message: MsgExecLegacyContentProtoMsg): MsgExecLegacyContent;
    toProto(message: MsgExecLegacyContent): Uint8Array;
    toProtoMsg(message: MsgExecLegacyContent): MsgExecLegacyContentProtoMsg;
};
export declare const MsgExecLegacyContentResponse: {
    typeUrl: string;
    aminoType: string;
    is(o: any): o is MsgExecLegacyContentResponse;
    isSDK(o: any): o is MsgExecLegacyContentResponseSDKType;
    isAmino(o: any): o is MsgExecLegacyContentResponseAmino;
    encode(_: MsgExecLegacyContentResponse, writer?: BinaryWriter): BinaryWriter;
    decode(input: BinaryReader | Uint8Array, length?: number): MsgExecLegacyContentResponse;
    fromPartial(_: Partial<MsgExecLegacyContentResponse>): MsgExecLegacyContentResponse;
    fromAmino(_: MsgExecLegacyContentResponseAmino): MsgExecLegacyContentResponse;
    toAmino(_: MsgExecLegacyContentResponse): MsgExecLegacyContentResponseAmino;
    fromAminoMsg(object: MsgExecLegacyContentResponseAminoMsg): MsgExecLegacyContentResponse;
    toAminoMsg(message: MsgExecLegacyContentResponse): MsgExecLegacyContentResponseAminoMsg;
    fromProtoMsg(message: MsgExecLegacyContentResponseProtoMsg): MsgExecLegacyContentResponse;
    toProto(message: MsgExecLegacyContentResponse): Uint8Array;
    toProtoMsg(message: MsgExecLegacyContentResponse): MsgExecLegacyContentResponseProtoMsg;
};
export declare const MsgVote: {
    typeUrl: string;
    aminoType: string;
    is(o: any): o is MsgVote;
    isSDK(o: any): o is MsgVoteSDKType;
    isAmino(o: any): o is MsgVoteAmino;
    encode(message: MsgVote, writer?: BinaryWriter): BinaryWriter;
    decode(input: BinaryReader | Uint8Array, length?: number): MsgVote;
    fromPartial(object: Partial<MsgVote>): MsgVote;
    fromAmino(object: MsgVoteAmino): MsgVote;
    toAmino(message: MsgVote): MsgVoteAmino;
    fromAminoMsg(object: MsgVoteAminoMsg): MsgVote;
    toAminoMsg(message: MsgVote): MsgVoteAminoMsg;
    fromProtoMsg(message: MsgVoteProtoMsg): MsgVote;
    toProto(message: MsgVote): Uint8Array;
    toProtoMsg(message: MsgVote): MsgVoteProtoMsg;
};
export declare const MsgVoteResponse: {
    typeUrl: string;
    aminoType: string;
    is(o: any): o is MsgVoteResponse;
    isSDK(o: any): o is MsgVoteResponseSDKType;
    isAmino(o: any): o is MsgVoteResponseAmino;
    encode(_: MsgVoteResponse, writer?: BinaryWriter): BinaryWriter;
    decode(input: BinaryReader | Uint8Array, length?: number): MsgVoteResponse;
    fromPartial(_: Partial<MsgVoteResponse>): MsgVoteResponse;
    fromAmino(_: MsgVoteResponseAmino): MsgVoteResponse;
    toAmino(_: MsgVoteResponse): MsgVoteResponseAmino;
    fromAminoMsg(object: MsgVoteResponseAminoMsg): MsgVoteResponse;
    toAminoMsg(message: MsgVoteResponse): MsgVoteResponseAminoMsg;
    fromProtoMsg(message: MsgVoteResponseProtoMsg): MsgVoteResponse;
    toProto(message: MsgVoteResponse): Uint8Array;
    toProtoMsg(message: MsgVoteResponse): MsgVoteResponseProtoMsg;
};
export declare const MsgVoteWeighted: {
    typeUrl: string;
    aminoType: string;
    is(o: any): o is MsgVoteWeighted;
    isSDK(o: any): o is MsgVoteWeightedSDKType;
    isAmino(o: any): o is MsgVoteWeightedAmino;
    encode(message: MsgVoteWeighted, writer?: BinaryWriter): BinaryWriter;
    decode(input: BinaryReader | Uint8Array, length?: number): MsgVoteWeighted;
    fromPartial(object: Partial<MsgVoteWeighted>): MsgVoteWeighted;
    fromAmino(object: MsgVoteWeightedAmino): MsgVoteWeighted;
    toAmino(message: MsgVoteWeighted): MsgVoteWeightedAmino;
    fromAminoMsg(object: MsgVoteWeightedAminoMsg): MsgVoteWeighted;
    toAminoMsg(message: MsgVoteWeighted): MsgVoteWeightedAminoMsg;
    fromProtoMsg(message: MsgVoteWeightedProtoMsg): MsgVoteWeighted;
    toProto(message: MsgVoteWeighted): Uint8Array;
    toProtoMsg(message: MsgVoteWeighted): MsgVoteWeightedProtoMsg;
};
export declare const MsgVoteWeightedResponse: {
    typeUrl: string;
    aminoType: string;
    is(o: any): o is MsgVoteWeightedResponse;
    isSDK(o: any): o is MsgVoteWeightedResponseSDKType;
    isAmino(o: any): o is MsgVoteWeightedResponseAmino;
    encode(_: MsgVoteWeightedResponse, writer?: BinaryWriter): BinaryWriter;
    decode(input: BinaryReader | Uint8Array, length?: number): MsgVoteWeightedResponse;
    fromPartial(_: Partial<MsgVoteWeightedResponse>): MsgVoteWeightedResponse;
    fromAmino(_: MsgVoteWeightedResponseAmino): MsgVoteWeightedResponse;
    toAmino(_: MsgVoteWeightedResponse): MsgVoteWeightedResponseAmino;
    fromAminoMsg(object: MsgVoteWeightedResponseAminoMsg): MsgVoteWeightedResponse;
    toAminoMsg(message: MsgVoteWeightedResponse): MsgVoteWeightedResponseAminoMsg;
    fromProtoMsg(message: MsgVoteWeightedResponseProtoMsg): MsgVoteWeightedResponse;
    toProto(message: MsgVoteWeightedResponse): Uint8Array;
    toProtoMsg(message: MsgVoteWeightedResponse): MsgVoteWeightedResponseProtoMsg;
};
export declare const MsgDeposit: {
    typeUrl: string;
    aminoType: string;
    is(o: any): o is MsgDeposit;
    isSDK(o: any): o is MsgDepositSDKType;
    isAmino(o: any): o is MsgDepositAmino;
    encode(message: MsgDeposit, writer?: BinaryWriter): BinaryWriter;
    decode(input: BinaryReader | Uint8Array, length?: number): MsgDeposit;
    fromPartial(object: Partial<MsgDeposit>): MsgDeposit;
    fromAmino(object: MsgDepositAmino): MsgDeposit;
    toAmino(message: MsgDeposit): MsgDepositAmino;
    fromAminoMsg(object: MsgDepositAminoMsg): MsgDeposit;
    toAminoMsg(message: MsgDeposit): MsgDepositAminoMsg;
    fromProtoMsg(message: MsgDepositProtoMsg): MsgDeposit;
    toProto(message: MsgDeposit): Uint8Array;
    toProtoMsg(message: MsgDeposit): MsgDepositProtoMsg;
};
export declare const MsgDepositResponse: {
    typeUrl: string;
    aminoType: string;
    is(o: any): o is MsgDepositResponse;
    isSDK(o: any): o is MsgDepositResponseSDKType;
    isAmino(o: any): o is MsgDepositResponseAmino;
    encode(_: MsgDepositResponse, writer?: BinaryWriter): BinaryWriter;
    decode(input: BinaryReader | Uint8Array, length?: number): MsgDepositResponse;
    fromPartial(_: Partial<MsgDepositResponse>): MsgDepositResponse;
    fromAmino(_: MsgDepositResponseAmino): MsgDepositResponse;
    toAmino(_: MsgDepositResponse): MsgDepositResponseAmino;
    fromAminoMsg(object: MsgDepositResponseAminoMsg): MsgDepositResponse;
    toAminoMsg(message: MsgDepositResponse): MsgDepositResponseAminoMsg;
    fromProtoMsg(message: MsgDepositResponseProtoMsg): MsgDepositResponse;
    toProto(message: MsgDepositResponse): Uint8Array;
    toProtoMsg(message: MsgDepositResponse): MsgDepositResponseProtoMsg;
};
export declare const MsgUpdateParams: {
    typeUrl: string;
    aminoType: string;
    is(o: any): o is MsgUpdateParams;
    isSDK(o: any): o is MsgUpdateParamsSDKType;
    isAmino(o: any): o is MsgUpdateParamsAmino;
    encode(message: MsgUpdateParams, writer?: BinaryWriter): BinaryWriter;
    decode(input: BinaryReader | Uint8Array, length?: number): MsgUpdateParams;
    fromPartial(object: Partial<MsgUpdateParams>): MsgUpdateParams;
    fromAmino(object: MsgUpdateParamsAmino): MsgUpdateParams;
    toAmino(message: MsgUpdateParams): MsgUpdateParamsAmino;
    fromAminoMsg(object: MsgUpdateParamsAminoMsg): MsgUpdateParams;
    toAminoMsg(message: MsgUpdateParams): MsgUpdateParamsAminoMsg;
    fromProtoMsg(message: MsgUpdateParamsProtoMsg): MsgUpdateParams;
    toProto(message: MsgUpdateParams): Uint8Array;
    toProtoMsg(message: MsgUpdateParams): MsgUpdateParamsProtoMsg;
};
export declare const MsgUpdateParamsResponse: {
    typeUrl: string;
    aminoType: string;
    is(o: any): o is MsgUpdateParamsResponse;
    isSDK(o: any): o is MsgUpdateParamsResponseSDKType;
    isAmino(o: any): o is MsgUpdateParamsResponseAmino;
    encode(_: MsgUpdateParamsResponse, writer?: BinaryWriter): BinaryWriter;
    decode(input: BinaryReader | Uint8Array, length?: number): MsgUpdateParamsResponse;
    fromPartial(_: Partial<MsgUpdateParamsResponse>): MsgUpdateParamsResponse;
    fromAmino(_: MsgUpdateParamsResponseAmino): MsgUpdateParamsResponse;
    toAmino(_: MsgUpdateParamsResponse): MsgUpdateParamsResponseAmino;
    fromAminoMsg(object: MsgUpdateParamsResponseAminoMsg): MsgUpdateParamsResponse;
    toAminoMsg(message: MsgUpdateParamsResponse): MsgUpdateParamsResponseAminoMsg;
    fromProtoMsg(message: MsgUpdateParamsResponseProtoMsg): MsgUpdateParamsResponse;
    toProto(message: MsgUpdateParamsResponse): Uint8Array;
    toProtoMsg(message: MsgUpdateParamsResponse): MsgUpdateParamsResponseProtoMsg;
};
export declare const MsgCancelProposal: {
    typeUrl: string;
    aminoType: string;
    is(o: any): o is MsgCancelProposal;
    isSDK(o: any): o is MsgCancelProposalSDKType;
    isAmino(o: any): o is MsgCancelProposalAmino;
    encode(message: MsgCancelProposal, writer?: BinaryWriter): BinaryWriter;
    decode(input: BinaryReader | Uint8Array, length?: number): MsgCancelProposal;
    fromPartial(object: Partial<MsgCancelProposal>): MsgCancelProposal;
    fromAmino(object: MsgCancelProposalAmino): MsgCancelProposal;
    toAmino(message: MsgCancelProposal): MsgCancelProposalAmino;
    fromAminoMsg(object: MsgCancelProposalAminoMsg): MsgCancelProposal;
    toAminoMsg(message: MsgCancelProposal): MsgCancelProposalAminoMsg;
    fromProtoMsg(message: MsgCancelProposalProtoMsg): MsgCancelProposal;
    toProto(message: MsgCancelProposal): Uint8Array;
    toProtoMsg(message: MsgCancelProposal): MsgCancelProposalProtoMsg;
};
export declare const MsgCancelProposalResponse: {
    typeUrl: string;
    aminoType: string;
    is(o: any): o is MsgCancelProposalResponse;
    isSDK(o: any): o is MsgCancelProposalResponseSDKType;
    isAmino(o: any): o is MsgCancelProposalResponseAmino;
    encode(message: MsgCancelProposalResponse, writer?: BinaryWriter): BinaryWriter;
    decode(input: BinaryReader | Uint8Array, length?: number): MsgCancelProposalResponse;
    fromPartial(object: Partial<MsgCancelProposalResponse>): MsgCancelProposalResponse;
    fromAmino(object: MsgCancelProposalResponseAmino): MsgCancelProposalResponse;
    toAmino(message: MsgCancelProposalResponse): MsgCancelProposalResponseAmino;
    fromAminoMsg(object: MsgCancelProposalResponseAminoMsg): MsgCancelProposalResponse;
    toAminoMsg(message: MsgCancelProposalResponse): MsgCancelProposalResponseAminoMsg;
    fromProtoMsg(message: MsgCancelProposalResponseProtoMsg): MsgCancelProposalResponse;
    toProto(message: MsgCancelProposalResponse): Uint8Array;
    toProtoMsg(message: MsgCancelProposalResponse): MsgCancelProposalResponseProtoMsg;
};
