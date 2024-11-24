import { BinaryReader, BinaryWriter } from "../../binary";
/** MsgSlashValidator is the Msg/SlashValidator request type. */
export interface MsgSlashValidator {
    authority: string;
    /** Consensus address of the validator to slash */
    validatorAddress: string;
    /**
     * Colloquially, the height at which the validator is deemed to have
     * misbehaved. In practice, this is the height used to determine the targets
     * of the slash. For example, undelegating after this height will not escape
     * slashing. This height should be set to a recent height at the time of the
     * proposal to prevent delegators from undelegating during the vote period.
     * i.e. infraction_height <= proposal submission height.
     *
     * NB: At the time this message is applied, this height must have occured
     * equal to or less than an unbonding period in the past in order for the
     * slash to be effective.
     * i.e. time(proposal pass height) - time(infraction_height) < unbonding
     * period
     */
    infractionHeight: number;
    /**
     * Tokens of the validator at the specified height. Used to compute the slash
     * amount. The x/staking HistoricalInfo query endpoint can be used to find
     * this.
     */
    tokensAtInfractionHeight: Uint8Array;
    /**
     * Multiplier for how much of the validator's stake should be slashed.
     * slash_factor * tokens_at_infraction_height = tokens slashed
     */
    slashFactor: string;
}
export interface MsgSlashValidatorProtoMsg {
    typeUrl: "/klyraprotocol.govplus.MsgSlashValidator";
    value: Uint8Array;
}
/** MsgSlashValidator is the Msg/SlashValidator request type. */
export interface MsgSlashValidatorAmino {
    authority?: string;
    /** Consensus address of the validator to slash */
    validator_address?: string;
    /**
     * Colloquially, the height at which the validator is deemed to have
     * misbehaved. In practice, this is the height used to determine the targets
     * of the slash. For example, undelegating after this height will not escape
     * slashing. This height should be set to a recent height at the time of the
     * proposal to prevent delegators from undelegating during the vote period.
     * i.e. infraction_height <= proposal submission height.
     *
     * NB: At the time this message is applied, this height must have occured
     * equal to or less than an unbonding period in the past in order for the
     * slash to be effective.
     * i.e. time(proposal pass height) - time(infraction_height) < unbonding
     * period
     */
    infraction_height?: number;
    /**
     * Tokens of the validator at the specified height. Used to compute the slash
     * amount. The x/staking HistoricalInfo query endpoint can be used to find
     * this.
     */
    tokens_at_infraction_height?: string;
    /**
     * Multiplier for how much of the validator's stake should be slashed.
     * slash_factor * tokens_at_infraction_height = tokens slashed
     */
    slash_factor: string;
}
export interface MsgSlashValidatorAminoMsg {
    type: "/klyraprotocol.govplus.MsgSlashValidator";
    value: MsgSlashValidatorAmino;
}
/** MsgSlashValidator is the Msg/SlashValidator request type. */
export interface MsgSlashValidatorSDKType {
    authority: string;
    validator_address: string;
    infraction_height: number;
    tokens_at_infraction_height: Uint8Array;
    slash_factor: string;
}
/** MsgSlashValidatorResponse is the Msg/SlashValidator response type. */
export interface MsgSlashValidatorResponse {
}
export interface MsgSlashValidatorResponseProtoMsg {
    typeUrl: "/klyraprotocol.govplus.MsgSlashValidatorResponse";
    value: Uint8Array;
}
/** MsgSlashValidatorResponse is the Msg/SlashValidator response type. */
export interface MsgSlashValidatorResponseAmino {
}
export interface MsgSlashValidatorResponseAminoMsg {
    type: "/klyraprotocol.govplus.MsgSlashValidatorResponse";
    value: MsgSlashValidatorResponseAmino;
}
/** MsgSlashValidatorResponse is the Msg/SlashValidator response type. */
export interface MsgSlashValidatorResponseSDKType {
}
export declare const MsgSlashValidator: {
    typeUrl: string;
    is(o: any): o is MsgSlashValidator;
    isSDK(o: any): o is MsgSlashValidatorSDKType;
    isAmino(o: any): o is MsgSlashValidatorAmino;
    encode(message: MsgSlashValidator, writer?: BinaryWriter): BinaryWriter;
    decode(input: BinaryReader | Uint8Array, length?: number): MsgSlashValidator;
    fromPartial(object: Partial<MsgSlashValidator>): MsgSlashValidator;
    fromAmino(object: MsgSlashValidatorAmino): MsgSlashValidator;
    toAmino(message: MsgSlashValidator): MsgSlashValidatorAmino;
    fromAminoMsg(object: MsgSlashValidatorAminoMsg): MsgSlashValidator;
    fromProtoMsg(message: MsgSlashValidatorProtoMsg): MsgSlashValidator;
    toProto(message: MsgSlashValidator): Uint8Array;
    toProtoMsg(message: MsgSlashValidator): MsgSlashValidatorProtoMsg;
};
export declare const MsgSlashValidatorResponse: {
    typeUrl: string;
    is(o: any): o is MsgSlashValidatorResponse;
    isSDK(o: any): o is MsgSlashValidatorResponseSDKType;
    isAmino(o: any): o is MsgSlashValidatorResponseAmino;
    encode(_: MsgSlashValidatorResponse, writer?: BinaryWriter): BinaryWriter;
    decode(input: BinaryReader | Uint8Array, length?: number): MsgSlashValidatorResponse;
    fromPartial(_: Partial<MsgSlashValidatorResponse>): MsgSlashValidatorResponse;
    fromAmino(_: MsgSlashValidatorResponseAmino): MsgSlashValidatorResponse;
    toAmino(_: MsgSlashValidatorResponse): MsgSlashValidatorResponseAmino;
    fromAminoMsg(object: MsgSlashValidatorResponseAminoMsg): MsgSlashValidatorResponse;
    fromProtoMsg(message: MsgSlashValidatorResponseProtoMsg): MsgSlashValidatorResponse;
    toProto(message: MsgSlashValidatorResponse): Uint8Array;
    toProtoMsg(message: MsgSlashValidatorResponse): MsgSlashValidatorResponseProtoMsg;
};
