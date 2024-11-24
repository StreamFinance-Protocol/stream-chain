import { PerpetualParams, PerpetualParamsAmino, PerpetualParamsSDKType, LiquidityTier, LiquidityTierAmino, LiquidityTierSDKType } from "./perpetual";
import { Params, ParamsAmino, ParamsSDKType } from "./params";
import { BinaryReader, BinaryWriter } from "../../binary";
/** MsgCreatePerpetual is a message used by x/gov to create a new perpetual. */
export interface MsgCreatePerpetual {
    /** The address that controls the module. */
    authority: string;
    /** `params` defines parameters for the new perpetual market. */
    params: PerpetualParams;
}
export interface MsgCreatePerpetualProtoMsg {
    typeUrl: "/klyraprotocol.perpetuals.MsgCreatePerpetual";
    value: Uint8Array;
}
/** MsgCreatePerpetual is a message used by x/gov to create a new perpetual. */
export interface MsgCreatePerpetualAmino {
    /** The address that controls the module. */
    authority?: string;
    /** `params` defines parameters for the new perpetual market. */
    params?: PerpetualParamsAmino;
}
export interface MsgCreatePerpetualAminoMsg {
    type: "/klyraprotocol.perpetuals.MsgCreatePerpetual";
    value: MsgCreatePerpetualAmino;
}
/** MsgCreatePerpetual is a message used by x/gov to create a new perpetual. */
export interface MsgCreatePerpetualSDKType {
    authority: string;
    params: PerpetualParamsSDKType;
}
/**
 * MsgCreatePerpetualResponse defines the CreatePerpetual
 * response type.
 */
export interface MsgCreatePerpetualResponse {
}
export interface MsgCreatePerpetualResponseProtoMsg {
    typeUrl: "/klyraprotocol.perpetuals.MsgCreatePerpetualResponse";
    value: Uint8Array;
}
/**
 * MsgCreatePerpetualResponse defines the CreatePerpetual
 * response type.
 */
export interface MsgCreatePerpetualResponseAmino {
}
export interface MsgCreatePerpetualResponseAminoMsg {
    type: "/klyraprotocol.perpetuals.MsgCreatePerpetualResponse";
    value: MsgCreatePerpetualResponseAmino;
}
/**
 * MsgCreatePerpetualResponse defines the CreatePerpetual
 * response type.
 */
export interface MsgCreatePerpetualResponseSDKType {
}
/**
 * MsgSetLiquidityTier is a message used by x/gov to create or update a
 * liquidity tier.
 */
export interface MsgSetLiquidityTier {
    /** The address that controls the module. */
    authority: string;
    /** The liquidity tier to create or update. */
    liquidityTier: LiquidityTier;
}
export interface MsgSetLiquidityTierProtoMsg {
    typeUrl: "/klyraprotocol.perpetuals.MsgSetLiquidityTier";
    value: Uint8Array;
}
/**
 * MsgSetLiquidityTier is a message used by x/gov to create or update a
 * liquidity tier.
 */
export interface MsgSetLiquidityTierAmino {
    /** The address that controls the module. */
    authority?: string;
    /** The liquidity tier to create or update. */
    liquidity_tier?: LiquidityTierAmino;
}
export interface MsgSetLiquidityTierAminoMsg {
    type: "/klyraprotocol.perpetuals.MsgSetLiquidityTier";
    value: MsgSetLiquidityTierAmino;
}
/**
 * MsgSetLiquidityTier is a message used by x/gov to create or update a
 * liquidity tier.
 */
export interface MsgSetLiquidityTierSDKType {
    authority: string;
    liquidity_tier: LiquidityTierSDKType;
}
/** MsgSetLiquidityTierResponse defines the SetLiquidityTier response type. */
export interface MsgSetLiquidityTierResponse {
}
export interface MsgSetLiquidityTierResponseProtoMsg {
    typeUrl: "/klyraprotocol.perpetuals.MsgSetLiquidityTierResponse";
    value: Uint8Array;
}
/** MsgSetLiquidityTierResponse defines the SetLiquidityTier response type. */
export interface MsgSetLiquidityTierResponseAmino {
}
export interface MsgSetLiquidityTierResponseAminoMsg {
    type: "/klyraprotocol.perpetuals.MsgSetLiquidityTierResponse";
    value: MsgSetLiquidityTierResponseAmino;
}
/** MsgSetLiquidityTierResponse defines the SetLiquidityTier response type. */
export interface MsgSetLiquidityTierResponseSDKType {
}
/**
 * MsgUpdatePerpetualParams is a message used by x/gov to update the parameters
 * of a perpetual.
 */
export interface MsgUpdatePerpetualParams {
    authority: string;
    /** The perpetual to update. Each field must be set. */
    perpetualParams: PerpetualParams;
}
export interface MsgUpdatePerpetualParamsProtoMsg {
    typeUrl: "/klyraprotocol.perpetuals.MsgUpdatePerpetualParams";
    value: Uint8Array;
}
/**
 * MsgUpdatePerpetualParams is a message used by x/gov to update the parameters
 * of a perpetual.
 */
export interface MsgUpdatePerpetualParamsAmino {
    authority?: string;
    /** The perpetual to update. Each field must be set. */
    perpetual_params?: PerpetualParamsAmino;
}
export interface MsgUpdatePerpetualParamsAminoMsg {
    type: "/klyraprotocol.perpetuals.MsgUpdatePerpetualParams";
    value: MsgUpdatePerpetualParamsAmino;
}
/**
 * MsgUpdatePerpetualParams is a message used by x/gov to update the parameters
 * of a perpetual.
 */
export interface MsgUpdatePerpetualParamsSDKType {
    authority: string;
    perpetual_params: PerpetualParamsSDKType;
}
/**
 * MsgUpdatePerpetualParamsResponse defines the UpdatePerpetualParams
 * response type.
 */
export interface MsgUpdatePerpetualParamsResponse {
}
export interface MsgUpdatePerpetualParamsResponseProtoMsg {
    typeUrl: "/klyraprotocol.perpetuals.MsgUpdatePerpetualParamsResponse";
    value: Uint8Array;
}
/**
 * MsgUpdatePerpetualParamsResponse defines the UpdatePerpetualParams
 * response type.
 */
export interface MsgUpdatePerpetualParamsResponseAmino {
}
export interface MsgUpdatePerpetualParamsResponseAminoMsg {
    type: "/klyraprotocol.perpetuals.MsgUpdatePerpetualParamsResponse";
    value: MsgUpdatePerpetualParamsResponseAmino;
}
/**
 * MsgUpdatePerpetualParamsResponse defines the UpdatePerpetualParams
 * response type.
 */
export interface MsgUpdatePerpetualParamsResponseSDKType {
}
/**
 * FundingPremium represents a funding premium value for a perpetual
 * market. Can be used to represent a premium vote or a premium sample.
 */
export interface FundingPremium {
    /** The id of the perpetual market. */
    perpetualId: number;
    /** The sampled premium rate. In parts-per-million. */
    premiumPpm: number;
}
export interface FundingPremiumProtoMsg {
    typeUrl: "/klyraprotocol.perpetuals.FundingPremium";
    value: Uint8Array;
}
/**
 * FundingPremium represents a funding premium value for a perpetual
 * market. Can be used to represent a premium vote or a premium sample.
 */
export interface FundingPremiumAmino {
    /** The id of the perpetual market. */
    perpetual_id?: number;
    /** The sampled premium rate. In parts-per-million. */
    premium_ppm?: number;
}
export interface FundingPremiumAminoMsg {
    type: "/klyraprotocol.perpetuals.FundingPremium";
    value: FundingPremiumAmino;
}
/**
 * FundingPremium represents a funding premium value for a perpetual
 * market. Can be used to represent a premium vote or a premium sample.
 */
export interface FundingPremiumSDKType {
    perpetual_id: number;
    premium_ppm: number;
}
/** MsgAddPremiumVotes is a request type for the AddPremiumVotes method. */
export interface MsgAddPremiumVotes {
    votes: FundingPremium[];
}
export interface MsgAddPremiumVotesProtoMsg {
    typeUrl: "/klyraprotocol.perpetuals.MsgAddPremiumVotes";
    value: Uint8Array;
}
/** MsgAddPremiumVotes is a request type for the AddPremiumVotes method. */
export interface MsgAddPremiumVotesAmino {
    votes?: FundingPremiumAmino[];
}
export interface MsgAddPremiumVotesAminoMsg {
    type: "/klyraprotocol.perpetuals.MsgAddPremiumVotes";
    value: MsgAddPremiumVotesAmino;
}
/** MsgAddPremiumVotes is a request type for the AddPremiumVotes method. */
export interface MsgAddPremiumVotesSDKType {
    votes: FundingPremiumSDKType[];
}
/**
 * MsgAddPremiumVotesResponse defines the AddPremiumVotes
 * response type.
 */
export interface MsgAddPremiumVotesResponse {
}
export interface MsgAddPremiumVotesResponseProtoMsg {
    typeUrl: "/klyraprotocol.perpetuals.MsgAddPremiumVotesResponse";
    value: Uint8Array;
}
/**
 * MsgAddPremiumVotesResponse defines the AddPremiumVotes
 * response type.
 */
export interface MsgAddPremiumVotesResponseAmino {
}
export interface MsgAddPremiumVotesResponseAminoMsg {
    type: "/klyraprotocol.perpetuals.MsgAddPremiumVotesResponse";
    value: MsgAddPremiumVotesResponseAmino;
}
/**
 * MsgAddPremiumVotesResponse defines the AddPremiumVotes
 * response type.
 */
export interface MsgAddPremiumVotesResponseSDKType {
}
/**
 * MsgUpdateParams is a message used by x/gov to update the parameters of the
 * perpetuals module.
 */
export interface MsgUpdateParams {
    authority: string;
    /** The parameters to update. Each field must be set. */
    params: Params;
}
export interface MsgUpdateParamsProtoMsg {
    typeUrl: "/klyraprotocol.perpetuals.MsgUpdateParams";
    value: Uint8Array;
}
/**
 * MsgUpdateParams is a message used by x/gov to update the parameters of the
 * perpetuals module.
 */
export interface MsgUpdateParamsAmino {
    authority?: string;
    /** The parameters to update. Each field must be set. */
    params?: ParamsAmino;
}
export interface MsgUpdateParamsAminoMsg {
    type: "/klyraprotocol.perpetuals.MsgUpdateParams";
    value: MsgUpdateParamsAmino;
}
/**
 * MsgUpdateParams is a message used by x/gov to update the parameters of the
 * perpetuals module.
 */
export interface MsgUpdateParamsSDKType {
    authority: string;
    params: ParamsSDKType;
}
/** MsgUpdateParamsResponse defines the UpdateParams response type. */
export interface MsgUpdateParamsResponse {
}
export interface MsgUpdateParamsResponseProtoMsg {
    typeUrl: "/klyraprotocol.perpetuals.MsgUpdateParamsResponse";
    value: Uint8Array;
}
/** MsgUpdateParamsResponse defines the UpdateParams response type. */
export interface MsgUpdateParamsResponseAmino {
}
export interface MsgUpdateParamsResponseAminoMsg {
    type: "/klyraprotocol.perpetuals.MsgUpdateParamsResponse";
    value: MsgUpdateParamsResponseAmino;
}
/** MsgUpdateParamsResponse defines the UpdateParams response type. */
export interface MsgUpdateParamsResponseSDKType {
}
export declare const MsgCreatePerpetual: {
    typeUrl: string;
    is(o: any): o is MsgCreatePerpetual;
    isSDK(o: any): o is MsgCreatePerpetualSDKType;
    isAmino(o: any): o is MsgCreatePerpetualAmino;
    encode(message: MsgCreatePerpetual, writer?: BinaryWriter): BinaryWriter;
    decode(input: BinaryReader | Uint8Array, length?: number): MsgCreatePerpetual;
    fromPartial(object: Partial<MsgCreatePerpetual>): MsgCreatePerpetual;
    fromAmino(object: MsgCreatePerpetualAmino): MsgCreatePerpetual;
    toAmino(message: MsgCreatePerpetual): MsgCreatePerpetualAmino;
    fromAminoMsg(object: MsgCreatePerpetualAminoMsg): MsgCreatePerpetual;
    fromProtoMsg(message: MsgCreatePerpetualProtoMsg): MsgCreatePerpetual;
    toProto(message: MsgCreatePerpetual): Uint8Array;
    toProtoMsg(message: MsgCreatePerpetual): MsgCreatePerpetualProtoMsg;
};
export declare const MsgCreatePerpetualResponse: {
    typeUrl: string;
    is(o: any): o is MsgCreatePerpetualResponse;
    isSDK(o: any): o is MsgCreatePerpetualResponseSDKType;
    isAmino(o: any): o is MsgCreatePerpetualResponseAmino;
    encode(_: MsgCreatePerpetualResponse, writer?: BinaryWriter): BinaryWriter;
    decode(input: BinaryReader | Uint8Array, length?: number): MsgCreatePerpetualResponse;
    fromPartial(_: Partial<MsgCreatePerpetualResponse>): MsgCreatePerpetualResponse;
    fromAmino(_: MsgCreatePerpetualResponseAmino): MsgCreatePerpetualResponse;
    toAmino(_: MsgCreatePerpetualResponse): MsgCreatePerpetualResponseAmino;
    fromAminoMsg(object: MsgCreatePerpetualResponseAminoMsg): MsgCreatePerpetualResponse;
    fromProtoMsg(message: MsgCreatePerpetualResponseProtoMsg): MsgCreatePerpetualResponse;
    toProto(message: MsgCreatePerpetualResponse): Uint8Array;
    toProtoMsg(message: MsgCreatePerpetualResponse): MsgCreatePerpetualResponseProtoMsg;
};
export declare const MsgSetLiquidityTier: {
    typeUrl: string;
    is(o: any): o is MsgSetLiquidityTier;
    isSDK(o: any): o is MsgSetLiquidityTierSDKType;
    isAmino(o: any): o is MsgSetLiquidityTierAmino;
    encode(message: MsgSetLiquidityTier, writer?: BinaryWriter): BinaryWriter;
    decode(input: BinaryReader | Uint8Array, length?: number): MsgSetLiquidityTier;
    fromPartial(object: Partial<MsgSetLiquidityTier>): MsgSetLiquidityTier;
    fromAmino(object: MsgSetLiquidityTierAmino): MsgSetLiquidityTier;
    toAmino(message: MsgSetLiquidityTier): MsgSetLiquidityTierAmino;
    fromAminoMsg(object: MsgSetLiquidityTierAminoMsg): MsgSetLiquidityTier;
    fromProtoMsg(message: MsgSetLiquidityTierProtoMsg): MsgSetLiquidityTier;
    toProto(message: MsgSetLiquidityTier): Uint8Array;
    toProtoMsg(message: MsgSetLiquidityTier): MsgSetLiquidityTierProtoMsg;
};
export declare const MsgSetLiquidityTierResponse: {
    typeUrl: string;
    is(o: any): o is MsgSetLiquidityTierResponse;
    isSDK(o: any): o is MsgSetLiquidityTierResponseSDKType;
    isAmino(o: any): o is MsgSetLiquidityTierResponseAmino;
    encode(_: MsgSetLiquidityTierResponse, writer?: BinaryWriter): BinaryWriter;
    decode(input: BinaryReader | Uint8Array, length?: number): MsgSetLiquidityTierResponse;
    fromPartial(_: Partial<MsgSetLiquidityTierResponse>): MsgSetLiquidityTierResponse;
    fromAmino(_: MsgSetLiquidityTierResponseAmino): MsgSetLiquidityTierResponse;
    toAmino(_: MsgSetLiquidityTierResponse): MsgSetLiquidityTierResponseAmino;
    fromAminoMsg(object: MsgSetLiquidityTierResponseAminoMsg): MsgSetLiquidityTierResponse;
    fromProtoMsg(message: MsgSetLiquidityTierResponseProtoMsg): MsgSetLiquidityTierResponse;
    toProto(message: MsgSetLiquidityTierResponse): Uint8Array;
    toProtoMsg(message: MsgSetLiquidityTierResponse): MsgSetLiquidityTierResponseProtoMsg;
};
export declare const MsgUpdatePerpetualParams: {
    typeUrl: string;
    is(o: any): o is MsgUpdatePerpetualParams;
    isSDK(o: any): o is MsgUpdatePerpetualParamsSDKType;
    isAmino(o: any): o is MsgUpdatePerpetualParamsAmino;
    encode(message: MsgUpdatePerpetualParams, writer?: BinaryWriter): BinaryWriter;
    decode(input: BinaryReader | Uint8Array, length?: number): MsgUpdatePerpetualParams;
    fromPartial(object: Partial<MsgUpdatePerpetualParams>): MsgUpdatePerpetualParams;
    fromAmino(object: MsgUpdatePerpetualParamsAmino): MsgUpdatePerpetualParams;
    toAmino(message: MsgUpdatePerpetualParams): MsgUpdatePerpetualParamsAmino;
    fromAminoMsg(object: MsgUpdatePerpetualParamsAminoMsg): MsgUpdatePerpetualParams;
    fromProtoMsg(message: MsgUpdatePerpetualParamsProtoMsg): MsgUpdatePerpetualParams;
    toProto(message: MsgUpdatePerpetualParams): Uint8Array;
    toProtoMsg(message: MsgUpdatePerpetualParams): MsgUpdatePerpetualParamsProtoMsg;
};
export declare const MsgUpdatePerpetualParamsResponse: {
    typeUrl: string;
    is(o: any): o is MsgUpdatePerpetualParamsResponse;
    isSDK(o: any): o is MsgUpdatePerpetualParamsResponseSDKType;
    isAmino(o: any): o is MsgUpdatePerpetualParamsResponseAmino;
    encode(_: MsgUpdatePerpetualParamsResponse, writer?: BinaryWriter): BinaryWriter;
    decode(input: BinaryReader | Uint8Array, length?: number): MsgUpdatePerpetualParamsResponse;
    fromPartial(_: Partial<MsgUpdatePerpetualParamsResponse>): MsgUpdatePerpetualParamsResponse;
    fromAmino(_: MsgUpdatePerpetualParamsResponseAmino): MsgUpdatePerpetualParamsResponse;
    toAmino(_: MsgUpdatePerpetualParamsResponse): MsgUpdatePerpetualParamsResponseAmino;
    fromAminoMsg(object: MsgUpdatePerpetualParamsResponseAminoMsg): MsgUpdatePerpetualParamsResponse;
    fromProtoMsg(message: MsgUpdatePerpetualParamsResponseProtoMsg): MsgUpdatePerpetualParamsResponse;
    toProto(message: MsgUpdatePerpetualParamsResponse): Uint8Array;
    toProtoMsg(message: MsgUpdatePerpetualParamsResponse): MsgUpdatePerpetualParamsResponseProtoMsg;
};
export declare const FundingPremium: {
    typeUrl: string;
    is(o: any): o is FundingPremium;
    isSDK(o: any): o is FundingPremiumSDKType;
    isAmino(o: any): o is FundingPremiumAmino;
    encode(message: FundingPremium, writer?: BinaryWriter): BinaryWriter;
    decode(input: BinaryReader | Uint8Array, length?: number): FundingPremium;
    fromPartial(object: Partial<FundingPremium>): FundingPremium;
    fromAmino(object: FundingPremiumAmino): FundingPremium;
    toAmino(message: FundingPremium): FundingPremiumAmino;
    fromAminoMsg(object: FundingPremiumAminoMsg): FundingPremium;
    fromProtoMsg(message: FundingPremiumProtoMsg): FundingPremium;
    toProto(message: FundingPremium): Uint8Array;
    toProtoMsg(message: FundingPremium): FundingPremiumProtoMsg;
};
export declare const MsgAddPremiumVotes: {
    typeUrl: string;
    is(o: any): o is MsgAddPremiumVotes;
    isSDK(o: any): o is MsgAddPremiumVotesSDKType;
    isAmino(o: any): o is MsgAddPremiumVotesAmino;
    encode(message: MsgAddPremiumVotes, writer?: BinaryWriter): BinaryWriter;
    decode(input: BinaryReader | Uint8Array, length?: number): MsgAddPremiumVotes;
    fromPartial(object: Partial<MsgAddPremiumVotes>): MsgAddPremiumVotes;
    fromAmino(object: MsgAddPremiumVotesAmino): MsgAddPremiumVotes;
    toAmino(message: MsgAddPremiumVotes): MsgAddPremiumVotesAmino;
    fromAminoMsg(object: MsgAddPremiumVotesAminoMsg): MsgAddPremiumVotes;
    fromProtoMsg(message: MsgAddPremiumVotesProtoMsg): MsgAddPremiumVotes;
    toProto(message: MsgAddPremiumVotes): Uint8Array;
    toProtoMsg(message: MsgAddPremiumVotes): MsgAddPremiumVotesProtoMsg;
};
export declare const MsgAddPremiumVotesResponse: {
    typeUrl: string;
    is(o: any): o is MsgAddPremiumVotesResponse;
    isSDK(o: any): o is MsgAddPremiumVotesResponseSDKType;
    isAmino(o: any): o is MsgAddPremiumVotesResponseAmino;
    encode(_: MsgAddPremiumVotesResponse, writer?: BinaryWriter): BinaryWriter;
    decode(input: BinaryReader | Uint8Array, length?: number): MsgAddPremiumVotesResponse;
    fromPartial(_: Partial<MsgAddPremiumVotesResponse>): MsgAddPremiumVotesResponse;
    fromAmino(_: MsgAddPremiumVotesResponseAmino): MsgAddPremiumVotesResponse;
    toAmino(_: MsgAddPremiumVotesResponse): MsgAddPremiumVotesResponseAmino;
    fromAminoMsg(object: MsgAddPremiumVotesResponseAminoMsg): MsgAddPremiumVotesResponse;
    fromProtoMsg(message: MsgAddPremiumVotesResponseProtoMsg): MsgAddPremiumVotesResponse;
    toProto(message: MsgAddPremiumVotesResponse): Uint8Array;
    toProtoMsg(message: MsgAddPremiumVotesResponse): MsgAddPremiumVotesResponseProtoMsg;
};
export declare const MsgUpdateParams: {
    typeUrl: string;
    is(o: any): o is MsgUpdateParams;
    isSDK(o: any): o is MsgUpdateParamsSDKType;
    isAmino(o: any): o is MsgUpdateParamsAmino;
    encode(message: MsgUpdateParams, writer?: BinaryWriter): BinaryWriter;
    decode(input: BinaryReader | Uint8Array, length?: number): MsgUpdateParams;
    fromPartial(object: Partial<MsgUpdateParams>): MsgUpdateParams;
    fromAmino(object: MsgUpdateParamsAmino): MsgUpdateParams;
    toAmino(message: MsgUpdateParams): MsgUpdateParamsAmino;
    fromAminoMsg(object: MsgUpdateParamsAminoMsg): MsgUpdateParams;
    fromProtoMsg(message: MsgUpdateParamsProtoMsg): MsgUpdateParams;
    toProto(message: MsgUpdateParams): Uint8Array;
    toProtoMsg(message: MsgUpdateParams): MsgUpdateParamsProtoMsg;
};
export declare const MsgUpdateParamsResponse: {
    typeUrl: string;
    is(o: any): o is MsgUpdateParamsResponse;
    isSDK(o: any): o is MsgUpdateParamsResponseSDKType;
    isAmino(o: any): o is MsgUpdateParamsResponseAmino;
    encode(_: MsgUpdateParamsResponse, writer?: BinaryWriter): BinaryWriter;
    decode(input: BinaryReader | Uint8Array, length?: number): MsgUpdateParamsResponse;
    fromPartial(_: Partial<MsgUpdateParamsResponse>): MsgUpdateParamsResponse;
    fromAmino(_: MsgUpdateParamsResponseAmino): MsgUpdateParamsResponse;
    toAmino(_: MsgUpdateParamsResponse): MsgUpdateParamsResponseAmino;
    fromAminoMsg(object: MsgUpdateParamsResponseAminoMsg): MsgUpdateParamsResponse;
    fromProtoMsg(message: MsgUpdateParamsResponseProtoMsg): MsgUpdateParamsResponse;
    toProto(message: MsgUpdateParamsResponse): Uint8Array;
    toProtoMsg(message: MsgUpdateParamsResponse): MsgUpdateParamsResponseProtoMsg;
};
