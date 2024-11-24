import { Deposit, DepositAmino, DepositSDKType, Vote, VoteAmino, VoteSDKType, Proposal, ProposalAmino, ProposalSDKType, DepositParams, DepositParamsAmino, DepositParamsSDKType, VotingParams, VotingParamsAmino, VotingParamsSDKType, TallyParams, TallyParamsAmino, TallyParamsSDKType } from "./gov";
import { BinaryReader, BinaryWriter } from "../../../binary";
/** GenesisState defines the gov module's genesis state. */
export interface GenesisState {
    /** starting_proposal_id is the ID of the starting proposal. */
    startingProposalId: bigint;
    /** deposits defines all the deposits present at genesis. */
    deposits: Deposit[];
    /** votes defines all the votes present at genesis. */
    votes: Vote[];
    /** proposals defines all the proposals present at genesis. */
    proposals: Proposal[];
    /** deposit_params defines all the parameters related to deposit. */
    depositParams: DepositParams;
    /** voting_params defines all the parameters related to voting. */
    votingParams: VotingParams;
    /** tally_params defines all the parameters related to tally. */
    tallyParams: TallyParams;
}
export interface GenesisStateProtoMsg {
    typeUrl: "/cosmos.gov.v1beta1.GenesisState";
    value: Uint8Array;
}
/** GenesisState defines the gov module's genesis state. */
export interface GenesisStateAmino {
    /** starting_proposal_id is the ID of the starting proposal. */
    starting_proposal_id?: string;
    /** deposits defines all the deposits present at genesis. */
    deposits: DepositAmino[];
    /** votes defines all the votes present at genesis. */
    votes: VoteAmino[];
    /** proposals defines all the proposals present at genesis. */
    proposals: ProposalAmino[];
    /** deposit_params defines all the parameters related to deposit. */
    deposit_params: DepositParamsAmino;
    /** voting_params defines all the parameters related to voting. */
    voting_params: VotingParamsAmino;
    /** tally_params defines all the parameters related to tally. */
    tally_params: TallyParamsAmino;
}
export interface GenesisStateAminoMsg {
    type: "cosmos-sdk/GenesisState";
    value: GenesisStateAmino;
}
/** GenesisState defines the gov module's genesis state. */
export interface GenesisStateSDKType {
    starting_proposal_id: bigint;
    deposits: DepositSDKType[];
    votes: VoteSDKType[];
    proposals: ProposalSDKType[];
    deposit_params: DepositParamsSDKType;
    voting_params: VotingParamsSDKType;
    tally_params: TallyParamsSDKType;
}
export declare const GenesisState: {
    typeUrl: string;
    aminoType: string;
    is(o: any): o is GenesisState;
    isSDK(o: any): o is GenesisStateSDKType;
    isAmino(o: any): o is GenesisStateAmino;
    encode(message: GenesisState, writer?: BinaryWriter): BinaryWriter;
    decode(input: BinaryReader | Uint8Array, length?: number): GenesisState;
    fromPartial(object: Partial<GenesisState>): GenesisState;
    fromAmino(object: GenesisStateAmino): GenesisState;
    toAmino(message: GenesisState): GenesisStateAmino;
    fromAminoMsg(object: GenesisStateAminoMsg): GenesisState;
    toAminoMsg(message: GenesisState): GenesisStateAminoMsg;
    fromProtoMsg(message: GenesisStateProtoMsg): GenesisState;
    toProto(message: GenesisState): Uint8Array;
    toProtoMsg(message: GenesisState): GenesisStateProtoMsg;
};
