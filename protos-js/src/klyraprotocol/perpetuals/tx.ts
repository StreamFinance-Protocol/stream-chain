//@ts-nocheck
import { PerpetualParams, PerpetualParamsAmino, PerpetualParamsSDKType, LiquidityTier, LiquidityTierAmino, LiquidityTierSDKType } from "./perpetual";
import { Params, ParamsAmino, ParamsSDKType } from "./params";
import { BinaryReader, BinaryWriter } from "../../binary";
import { GlobalDecoderRegistry } from "../../registry";
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
export interface MsgCreatePerpetualResponse {}
export interface MsgCreatePerpetualResponseProtoMsg {
  typeUrl: "/klyraprotocol.perpetuals.MsgCreatePerpetualResponse";
  value: Uint8Array;
}
/**
 * MsgCreatePerpetualResponse defines the CreatePerpetual
 * response type.
 */
export interface MsgCreatePerpetualResponseAmino {}
export interface MsgCreatePerpetualResponseAminoMsg {
  type: "/klyraprotocol.perpetuals.MsgCreatePerpetualResponse";
  value: MsgCreatePerpetualResponseAmino;
}
/**
 * MsgCreatePerpetualResponse defines the CreatePerpetual
 * response type.
 */
export interface MsgCreatePerpetualResponseSDKType {}
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
export interface MsgSetLiquidityTierResponse {}
export interface MsgSetLiquidityTierResponseProtoMsg {
  typeUrl: "/klyraprotocol.perpetuals.MsgSetLiquidityTierResponse";
  value: Uint8Array;
}
/** MsgSetLiquidityTierResponse defines the SetLiquidityTier response type. */
export interface MsgSetLiquidityTierResponseAmino {}
export interface MsgSetLiquidityTierResponseAminoMsg {
  type: "/klyraprotocol.perpetuals.MsgSetLiquidityTierResponse";
  value: MsgSetLiquidityTierResponseAmino;
}
/** MsgSetLiquidityTierResponse defines the SetLiquidityTier response type. */
export interface MsgSetLiquidityTierResponseSDKType {}
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
export interface MsgUpdatePerpetualParamsResponse {}
export interface MsgUpdatePerpetualParamsResponseProtoMsg {
  typeUrl: "/klyraprotocol.perpetuals.MsgUpdatePerpetualParamsResponse";
  value: Uint8Array;
}
/**
 * MsgUpdatePerpetualParamsResponse defines the UpdatePerpetualParams
 * response type.
 */
export interface MsgUpdatePerpetualParamsResponseAmino {}
export interface MsgUpdatePerpetualParamsResponseAminoMsg {
  type: "/klyraprotocol.perpetuals.MsgUpdatePerpetualParamsResponse";
  value: MsgUpdatePerpetualParamsResponseAmino;
}
/**
 * MsgUpdatePerpetualParamsResponse defines the UpdatePerpetualParams
 * response type.
 */
export interface MsgUpdatePerpetualParamsResponseSDKType {}
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
export interface MsgAddPremiumVotesResponse {}
export interface MsgAddPremiumVotesResponseProtoMsg {
  typeUrl: "/klyraprotocol.perpetuals.MsgAddPremiumVotesResponse";
  value: Uint8Array;
}
/**
 * MsgAddPremiumVotesResponse defines the AddPremiumVotes
 * response type.
 */
export interface MsgAddPremiumVotesResponseAmino {}
export interface MsgAddPremiumVotesResponseAminoMsg {
  type: "/klyraprotocol.perpetuals.MsgAddPremiumVotesResponse";
  value: MsgAddPremiumVotesResponseAmino;
}
/**
 * MsgAddPremiumVotesResponse defines the AddPremiumVotes
 * response type.
 */
export interface MsgAddPremiumVotesResponseSDKType {}
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
export interface MsgUpdateParamsResponse {}
export interface MsgUpdateParamsResponseProtoMsg {
  typeUrl: "/klyraprotocol.perpetuals.MsgUpdateParamsResponse";
  value: Uint8Array;
}
/** MsgUpdateParamsResponse defines the UpdateParams response type. */
export interface MsgUpdateParamsResponseAmino {}
export interface MsgUpdateParamsResponseAminoMsg {
  type: "/klyraprotocol.perpetuals.MsgUpdateParamsResponse";
  value: MsgUpdateParamsResponseAmino;
}
/** MsgUpdateParamsResponse defines the UpdateParams response type. */
export interface MsgUpdateParamsResponseSDKType {}
function createBaseMsgCreatePerpetual(): MsgCreatePerpetual {
  return {
    authority: "",
    params: PerpetualParams.fromPartial({})
  };
}
export const MsgCreatePerpetual = {
  typeUrl: "/klyraprotocol.perpetuals.MsgCreatePerpetual",
  is(o: any): o is MsgCreatePerpetual {
    return o && (o.$typeUrl === MsgCreatePerpetual.typeUrl || typeof o.authority === "string" && PerpetualParams.is(o.params));
  },
  isSDK(o: any): o is MsgCreatePerpetualSDKType {
    return o && (o.$typeUrl === MsgCreatePerpetual.typeUrl || typeof o.authority === "string" && PerpetualParams.isSDK(o.params));
  },
  isAmino(o: any): o is MsgCreatePerpetualAmino {
    return o && (o.$typeUrl === MsgCreatePerpetual.typeUrl || typeof o.authority === "string" && PerpetualParams.isAmino(o.params));
  },
  encode(message: MsgCreatePerpetual, writer: BinaryWriter = BinaryWriter.create()): BinaryWriter {
    if (message.authority !== "") {
      writer.uint32(10).string(message.authority);
    }
    if (message.params !== undefined) {
      PerpetualParams.encode(message.params, writer.uint32(18).fork()).ldelim();
    }
    return writer;
  },
  decode(input: BinaryReader | Uint8Array, length?: number): MsgCreatePerpetual {
    const reader = input instanceof BinaryReader ? input : new BinaryReader(input);
    let end = length === undefined ? reader.len : reader.pos + length;
    const message = createBaseMsgCreatePerpetual();
    while (reader.pos < end) {
      const tag = reader.uint32();
      switch (tag >>> 3) {
        case 1:
          message.authority = reader.string();
          break;
        case 2:
          message.params = PerpetualParams.decode(reader, reader.uint32());
          break;
        default:
          reader.skipType(tag & 7);
          break;
      }
    }
    return message;
  },
  fromPartial(object: Partial<MsgCreatePerpetual>): MsgCreatePerpetual {
    const message = createBaseMsgCreatePerpetual();
    message.authority = object.authority ?? "";
    message.params = object.params !== undefined && object.params !== null ? PerpetualParams.fromPartial(object.params) : undefined;
    return message;
  },
  fromAmino(object: MsgCreatePerpetualAmino): MsgCreatePerpetual {
    const message = createBaseMsgCreatePerpetual();
    if (object.authority !== undefined && object.authority !== null) {
      message.authority = object.authority;
    }
    if (object.params !== undefined && object.params !== null) {
      message.params = PerpetualParams.fromAmino(object.params);
    }
    return message;
  },
  toAmino(message: MsgCreatePerpetual): MsgCreatePerpetualAmino {
    const obj: any = {};
    obj.authority = message.authority === "" ? undefined : message.authority;
    obj.params = message.params ? PerpetualParams.toAmino(message.params) : undefined;
    return obj;
  },
  fromAminoMsg(object: MsgCreatePerpetualAminoMsg): MsgCreatePerpetual {
    return MsgCreatePerpetual.fromAmino(object.value);
  },
  fromProtoMsg(message: MsgCreatePerpetualProtoMsg): MsgCreatePerpetual {
    return MsgCreatePerpetual.decode(message.value);
  },
  toProto(message: MsgCreatePerpetual): Uint8Array {
    return MsgCreatePerpetual.encode(message).finish();
  },
  toProtoMsg(message: MsgCreatePerpetual): MsgCreatePerpetualProtoMsg {
    return {
      typeUrl: "/klyraprotocol.perpetuals.MsgCreatePerpetual",
      value: MsgCreatePerpetual.encode(message).finish()
    };
  }
};
GlobalDecoderRegistry.register(MsgCreatePerpetual.typeUrl, MsgCreatePerpetual);
function createBaseMsgCreatePerpetualResponse(): MsgCreatePerpetualResponse {
  return {};
}
export const MsgCreatePerpetualResponse = {
  typeUrl: "/klyraprotocol.perpetuals.MsgCreatePerpetualResponse",
  is(o: any): o is MsgCreatePerpetualResponse {
    return o && o.$typeUrl === MsgCreatePerpetualResponse.typeUrl;
  },
  isSDK(o: any): o is MsgCreatePerpetualResponseSDKType {
    return o && o.$typeUrl === MsgCreatePerpetualResponse.typeUrl;
  },
  isAmino(o: any): o is MsgCreatePerpetualResponseAmino {
    return o && o.$typeUrl === MsgCreatePerpetualResponse.typeUrl;
  },
  encode(_: MsgCreatePerpetualResponse, writer: BinaryWriter = BinaryWriter.create()): BinaryWriter {
    return writer;
  },
  decode(input: BinaryReader | Uint8Array, length?: number): MsgCreatePerpetualResponse {
    const reader = input instanceof BinaryReader ? input : new BinaryReader(input);
    let end = length === undefined ? reader.len : reader.pos + length;
    const message = createBaseMsgCreatePerpetualResponse();
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
  fromPartial(_: Partial<MsgCreatePerpetualResponse>): MsgCreatePerpetualResponse {
    const message = createBaseMsgCreatePerpetualResponse();
    return message;
  },
  fromAmino(_: MsgCreatePerpetualResponseAmino): MsgCreatePerpetualResponse {
    const message = createBaseMsgCreatePerpetualResponse();
    return message;
  },
  toAmino(_: MsgCreatePerpetualResponse): MsgCreatePerpetualResponseAmino {
    const obj: any = {};
    return obj;
  },
  fromAminoMsg(object: MsgCreatePerpetualResponseAminoMsg): MsgCreatePerpetualResponse {
    return MsgCreatePerpetualResponse.fromAmino(object.value);
  },
  fromProtoMsg(message: MsgCreatePerpetualResponseProtoMsg): MsgCreatePerpetualResponse {
    return MsgCreatePerpetualResponse.decode(message.value);
  },
  toProto(message: MsgCreatePerpetualResponse): Uint8Array {
    return MsgCreatePerpetualResponse.encode(message).finish();
  },
  toProtoMsg(message: MsgCreatePerpetualResponse): MsgCreatePerpetualResponseProtoMsg {
    return {
      typeUrl: "/klyraprotocol.perpetuals.MsgCreatePerpetualResponse",
      value: MsgCreatePerpetualResponse.encode(message).finish()
    };
  }
};
GlobalDecoderRegistry.register(MsgCreatePerpetualResponse.typeUrl, MsgCreatePerpetualResponse);
function createBaseMsgSetLiquidityTier(): MsgSetLiquidityTier {
  return {
    authority: "",
    liquidityTier: LiquidityTier.fromPartial({})
  };
}
export const MsgSetLiquidityTier = {
  typeUrl: "/klyraprotocol.perpetuals.MsgSetLiquidityTier",
  is(o: any): o is MsgSetLiquidityTier {
    return o && (o.$typeUrl === MsgSetLiquidityTier.typeUrl || typeof o.authority === "string" && LiquidityTier.is(o.liquidityTier));
  },
  isSDK(o: any): o is MsgSetLiquidityTierSDKType {
    return o && (o.$typeUrl === MsgSetLiquidityTier.typeUrl || typeof o.authority === "string" && LiquidityTier.isSDK(o.liquidity_tier));
  },
  isAmino(o: any): o is MsgSetLiquidityTierAmino {
    return o && (o.$typeUrl === MsgSetLiquidityTier.typeUrl || typeof o.authority === "string" && LiquidityTier.isAmino(o.liquidity_tier));
  },
  encode(message: MsgSetLiquidityTier, writer: BinaryWriter = BinaryWriter.create()): BinaryWriter {
    if (message.authority !== "") {
      writer.uint32(10).string(message.authority);
    }
    if (message.liquidityTier !== undefined) {
      LiquidityTier.encode(message.liquidityTier, writer.uint32(18).fork()).ldelim();
    }
    return writer;
  },
  decode(input: BinaryReader | Uint8Array, length?: number): MsgSetLiquidityTier {
    const reader = input instanceof BinaryReader ? input : new BinaryReader(input);
    let end = length === undefined ? reader.len : reader.pos + length;
    const message = createBaseMsgSetLiquidityTier();
    while (reader.pos < end) {
      const tag = reader.uint32();
      switch (tag >>> 3) {
        case 1:
          message.authority = reader.string();
          break;
        case 2:
          message.liquidityTier = LiquidityTier.decode(reader, reader.uint32());
          break;
        default:
          reader.skipType(tag & 7);
          break;
      }
    }
    return message;
  },
  fromPartial(object: Partial<MsgSetLiquidityTier>): MsgSetLiquidityTier {
    const message = createBaseMsgSetLiquidityTier();
    message.authority = object.authority ?? "";
    message.liquidityTier = object.liquidityTier !== undefined && object.liquidityTier !== null ? LiquidityTier.fromPartial(object.liquidityTier) : undefined;
    return message;
  },
  fromAmino(object: MsgSetLiquidityTierAmino): MsgSetLiquidityTier {
    const message = createBaseMsgSetLiquidityTier();
    if (object.authority !== undefined && object.authority !== null) {
      message.authority = object.authority;
    }
    if (object.liquidity_tier !== undefined && object.liquidity_tier !== null) {
      message.liquidityTier = LiquidityTier.fromAmino(object.liquidity_tier);
    }
    return message;
  },
  toAmino(message: MsgSetLiquidityTier): MsgSetLiquidityTierAmino {
    const obj: any = {};
    obj.authority = message.authority === "" ? undefined : message.authority;
    obj.liquidity_tier = message.liquidityTier ? LiquidityTier.toAmino(message.liquidityTier) : undefined;
    return obj;
  },
  fromAminoMsg(object: MsgSetLiquidityTierAminoMsg): MsgSetLiquidityTier {
    return MsgSetLiquidityTier.fromAmino(object.value);
  },
  fromProtoMsg(message: MsgSetLiquidityTierProtoMsg): MsgSetLiquidityTier {
    return MsgSetLiquidityTier.decode(message.value);
  },
  toProto(message: MsgSetLiquidityTier): Uint8Array {
    return MsgSetLiquidityTier.encode(message).finish();
  },
  toProtoMsg(message: MsgSetLiquidityTier): MsgSetLiquidityTierProtoMsg {
    return {
      typeUrl: "/klyraprotocol.perpetuals.MsgSetLiquidityTier",
      value: MsgSetLiquidityTier.encode(message).finish()
    };
  }
};
GlobalDecoderRegistry.register(MsgSetLiquidityTier.typeUrl, MsgSetLiquidityTier);
function createBaseMsgSetLiquidityTierResponse(): MsgSetLiquidityTierResponse {
  return {};
}
export const MsgSetLiquidityTierResponse = {
  typeUrl: "/klyraprotocol.perpetuals.MsgSetLiquidityTierResponse",
  is(o: any): o is MsgSetLiquidityTierResponse {
    return o && o.$typeUrl === MsgSetLiquidityTierResponse.typeUrl;
  },
  isSDK(o: any): o is MsgSetLiquidityTierResponseSDKType {
    return o && o.$typeUrl === MsgSetLiquidityTierResponse.typeUrl;
  },
  isAmino(o: any): o is MsgSetLiquidityTierResponseAmino {
    return o && o.$typeUrl === MsgSetLiquidityTierResponse.typeUrl;
  },
  encode(_: MsgSetLiquidityTierResponse, writer: BinaryWriter = BinaryWriter.create()): BinaryWriter {
    return writer;
  },
  decode(input: BinaryReader | Uint8Array, length?: number): MsgSetLiquidityTierResponse {
    const reader = input instanceof BinaryReader ? input : new BinaryReader(input);
    let end = length === undefined ? reader.len : reader.pos + length;
    const message = createBaseMsgSetLiquidityTierResponse();
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
  fromPartial(_: Partial<MsgSetLiquidityTierResponse>): MsgSetLiquidityTierResponse {
    const message = createBaseMsgSetLiquidityTierResponse();
    return message;
  },
  fromAmino(_: MsgSetLiquidityTierResponseAmino): MsgSetLiquidityTierResponse {
    const message = createBaseMsgSetLiquidityTierResponse();
    return message;
  },
  toAmino(_: MsgSetLiquidityTierResponse): MsgSetLiquidityTierResponseAmino {
    const obj: any = {};
    return obj;
  },
  fromAminoMsg(object: MsgSetLiquidityTierResponseAminoMsg): MsgSetLiquidityTierResponse {
    return MsgSetLiquidityTierResponse.fromAmino(object.value);
  },
  fromProtoMsg(message: MsgSetLiquidityTierResponseProtoMsg): MsgSetLiquidityTierResponse {
    return MsgSetLiquidityTierResponse.decode(message.value);
  },
  toProto(message: MsgSetLiquidityTierResponse): Uint8Array {
    return MsgSetLiquidityTierResponse.encode(message).finish();
  },
  toProtoMsg(message: MsgSetLiquidityTierResponse): MsgSetLiquidityTierResponseProtoMsg {
    return {
      typeUrl: "/klyraprotocol.perpetuals.MsgSetLiquidityTierResponse",
      value: MsgSetLiquidityTierResponse.encode(message).finish()
    };
  }
};
GlobalDecoderRegistry.register(MsgSetLiquidityTierResponse.typeUrl, MsgSetLiquidityTierResponse);
function createBaseMsgUpdatePerpetualParams(): MsgUpdatePerpetualParams {
  return {
    authority: "",
    perpetualParams: PerpetualParams.fromPartial({})
  };
}
export const MsgUpdatePerpetualParams = {
  typeUrl: "/klyraprotocol.perpetuals.MsgUpdatePerpetualParams",
  is(o: any): o is MsgUpdatePerpetualParams {
    return o && (o.$typeUrl === MsgUpdatePerpetualParams.typeUrl || typeof o.authority === "string" && PerpetualParams.is(o.perpetualParams));
  },
  isSDK(o: any): o is MsgUpdatePerpetualParamsSDKType {
    return o && (o.$typeUrl === MsgUpdatePerpetualParams.typeUrl || typeof o.authority === "string" && PerpetualParams.isSDK(o.perpetual_params));
  },
  isAmino(o: any): o is MsgUpdatePerpetualParamsAmino {
    return o && (o.$typeUrl === MsgUpdatePerpetualParams.typeUrl || typeof o.authority === "string" && PerpetualParams.isAmino(o.perpetual_params));
  },
  encode(message: MsgUpdatePerpetualParams, writer: BinaryWriter = BinaryWriter.create()): BinaryWriter {
    if (message.authority !== "") {
      writer.uint32(10).string(message.authority);
    }
    if (message.perpetualParams !== undefined) {
      PerpetualParams.encode(message.perpetualParams, writer.uint32(18).fork()).ldelim();
    }
    return writer;
  },
  decode(input: BinaryReader | Uint8Array, length?: number): MsgUpdatePerpetualParams {
    const reader = input instanceof BinaryReader ? input : new BinaryReader(input);
    let end = length === undefined ? reader.len : reader.pos + length;
    const message = createBaseMsgUpdatePerpetualParams();
    while (reader.pos < end) {
      const tag = reader.uint32();
      switch (tag >>> 3) {
        case 1:
          message.authority = reader.string();
          break;
        case 2:
          message.perpetualParams = PerpetualParams.decode(reader, reader.uint32());
          break;
        default:
          reader.skipType(tag & 7);
          break;
      }
    }
    return message;
  },
  fromPartial(object: Partial<MsgUpdatePerpetualParams>): MsgUpdatePerpetualParams {
    const message = createBaseMsgUpdatePerpetualParams();
    message.authority = object.authority ?? "";
    message.perpetualParams = object.perpetualParams !== undefined && object.perpetualParams !== null ? PerpetualParams.fromPartial(object.perpetualParams) : undefined;
    return message;
  },
  fromAmino(object: MsgUpdatePerpetualParamsAmino): MsgUpdatePerpetualParams {
    const message = createBaseMsgUpdatePerpetualParams();
    if (object.authority !== undefined && object.authority !== null) {
      message.authority = object.authority;
    }
    if (object.perpetual_params !== undefined && object.perpetual_params !== null) {
      message.perpetualParams = PerpetualParams.fromAmino(object.perpetual_params);
    }
    return message;
  },
  toAmino(message: MsgUpdatePerpetualParams): MsgUpdatePerpetualParamsAmino {
    const obj: any = {};
    obj.authority = message.authority === "" ? undefined : message.authority;
    obj.perpetual_params = message.perpetualParams ? PerpetualParams.toAmino(message.perpetualParams) : undefined;
    return obj;
  },
  fromAminoMsg(object: MsgUpdatePerpetualParamsAminoMsg): MsgUpdatePerpetualParams {
    return MsgUpdatePerpetualParams.fromAmino(object.value);
  },
  fromProtoMsg(message: MsgUpdatePerpetualParamsProtoMsg): MsgUpdatePerpetualParams {
    return MsgUpdatePerpetualParams.decode(message.value);
  },
  toProto(message: MsgUpdatePerpetualParams): Uint8Array {
    return MsgUpdatePerpetualParams.encode(message).finish();
  },
  toProtoMsg(message: MsgUpdatePerpetualParams): MsgUpdatePerpetualParamsProtoMsg {
    return {
      typeUrl: "/klyraprotocol.perpetuals.MsgUpdatePerpetualParams",
      value: MsgUpdatePerpetualParams.encode(message).finish()
    };
  }
};
GlobalDecoderRegistry.register(MsgUpdatePerpetualParams.typeUrl, MsgUpdatePerpetualParams);
function createBaseMsgUpdatePerpetualParamsResponse(): MsgUpdatePerpetualParamsResponse {
  return {};
}
export const MsgUpdatePerpetualParamsResponse = {
  typeUrl: "/klyraprotocol.perpetuals.MsgUpdatePerpetualParamsResponse",
  is(o: any): o is MsgUpdatePerpetualParamsResponse {
    return o && o.$typeUrl === MsgUpdatePerpetualParamsResponse.typeUrl;
  },
  isSDK(o: any): o is MsgUpdatePerpetualParamsResponseSDKType {
    return o && o.$typeUrl === MsgUpdatePerpetualParamsResponse.typeUrl;
  },
  isAmino(o: any): o is MsgUpdatePerpetualParamsResponseAmino {
    return o && o.$typeUrl === MsgUpdatePerpetualParamsResponse.typeUrl;
  },
  encode(_: MsgUpdatePerpetualParamsResponse, writer: BinaryWriter = BinaryWriter.create()): BinaryWriter {
    return writer;
  },
  decode(input: BinaryReader | Uint8Array, length?: number): MsgUpdatePerpetualParamsResponse {
    const reader = input instanceof BinaryReader ? input : new BinaryReader(input);
    let end = length === undefined ? reader.len : reader.pos + length;
    const message = createBaseMsgUpdatePerpetualParamsResponse();
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
  fromPartial(_: Partial<MsgUpdatePerpetualParamsResponse>): MsgUpdatePerpetualParamsResponse {
    const message = createBaseMsgUpdatePerpetualParamsResponse();
    return message;
  },
  fromAmino(_: MsgUpdatePerpetualParamsResponseAmino): MsgUpdatePerpetualParamsResponse {
    const message = createBaseMsgUpdatePerpetualParamsResponse();
    return message;
  },
  toAmino(_: MsgUpdatePerpetualParamsResponse): MsgUpdatePerpetualParamsResponseAmino {
    const obj: any = {};
    return obj;
  },
  fromAminoMsg(object: MsgUpdatePerpetualParamsResponseAminoMsg): MsgUpdatePerpetualParamsResponse {
    return MsgUpdatePerpetualParamsResponse.fromAmino(object.value);
  },
  fromProtoMsg(message: MsgUpdatePerpetualParamsResponseProtoMsg): MsgUpdatePerpetualParamsResponse {
    return MsgUpdatePerpetualParamsResponse.decode(message.value);
  },
  toProto(message: MsgUpdatePerpetualParamsResponse): Uint8Array {
    return MsgUpdatePerpetualParamsResponse.encode(message).finish();
  },
  toProtoMsg(message: MsgUpdatePerpetualParamsResponse): MsgUpdatePerpetualParamsResponseProtoMsg {
    return {
      typeUrl: "/klyraprotocol.perpetuals.MsgUpdatePerpetualParamsResponse",
      value: MsgUpdatePerpetualParamsResponse.encode(message).finish()
    };
  }
};
GlobalDecoderRegistry.register(MsgUpdatePerpetualParamsResponse.typeUrl, MsgUpdatePerpetualParamsResponse);
function createBaseFundingPremium(): FundingPremium {
  return {
    perpetualId: 0,
    premiumPpm: 0
  };
}
export const FundingPremium = {
  typeUrl: "/klyraprotocol.perpetuals.FundingPremium",
  is(o: any): o is FundingPremium {
    return o && (o.$typeUrl === FundingPremium.typeUrl || typeof o.perpetualId === "number" && typeof o.premiumPpm === "number");
  },
  isSDK(o: any): o is FundingPremiumSDKType {
    return o && (o.$typeUrl === FundingPremium.typeUrl || typeof o.perpetual_id === "number" && typeof o.premium_ppm === "number");
  },
  isAmino(o: any): o is FundingPremiumAmino {
    return o && (o.$typeUrl === FundingPremium.typeUrl || typeof o.perpetual_id === "number" && typeof o.premium_ppm === "number");
  },
  encode(message: FundingPremium, writer: BinaryWriter = BinaryWriter.create()): BinaryWriter {
    if (message.perpetualId !== 0) {
      writer.uint32(8).uint32(message.perpetualId);
    }
    if (message.premiumPpm !== 0) {
      writer.uint32(16).int32(message.premiumPpm);
    }
    return writer;
  },
  decode(input: BinaryReader | Uint8Array, length?: number): FundingPremium {
    const reader = input instanceof BinaryReader ? input : new BinaryReader(input);
    let end = length === undefined ? reader.len : reader.pos + length;
    const message = createBaseFundingPremium();
    while (reader.pos < end) {
      const tag = reader.uint32();
      switch (tag >>> 3) {
        case 1:
          message.perpetualId = reader.uint32();
          break;
        case 2:
          message.premiumPpm = reader.int32();
          break;
        default:
          reader.skipType(tag & 7);
          break;
      }
    }
    return message;
  },
  fromPartial(object: Partial<FundingPremium>): FundingPremium {
    const message = createBaseFundingPremium();
    message.perpetualId = object.perpetualId ?? 0;
    message.premiumPpm = object.premiumPpm ?? 0;
    return message;
  },
  fromAmino(object: FundingPremiumAmino): FundingPremium {
    const message = createBaseFundingPremium();
    if (object.perpetual_id !== undefined && object.perpetual_id !== null) {
      message.perpetualId = object.perpetual_id;
    }
    if (object.premium_ppm !== undefined && object.premium_ppm !== null) {
      message.premiumPpm = object.premium_ppm;
    }
    return message;
  },
  toAmino(message: FundingPremium): FundingPremiumAmino {
    const obj: any = {};
    obj.perpetual_id = message.perpetualId === 0 ? undefined : message.perpetualId;
    obj.premium_ppm = message.premiumPpm === 0 ? undefined : message.premiumPpm;
    return obj;
  },
  fromAminoMsg(object: FundingPremiumAminoMsg): FundingPremium {
    return FundingPremium.fromAmino(object.value);
  },
  fromProtoMsg(message: FundingPremiumProtoMsg): FundingPremium {
    return FundingPremium.decode(message.value);
  },
  toProto(message: FundingPremium): Uint8Array {
    return FundingPremium.encode(message).finish();
  },
  toProtoMsg(message: FundingPremium): FundingPremiumProtoMsg {
    return {
      typeUrl: "/klyraprotocol.perpetuals.FundingPremium",
      value: FundingPremium.encode(message).finish()
    };
  }
};
GlobalDecoderRegistry.register(FundingPremium.typeUrl, FundingPremium);
function createBaseMsgAddPremiumVotes(): MsgAddPremiumVotes {
  return {
    votes: []
  };
}
export const MsgAddPremiumVotes = {
  typeUrl: "/klyraprotocol.perpetuals.MsgAddPremiumVotes",
  is(o: any): o is MsgAddPremiumVotes {
    return o && (o.$typeUrl === MsgAddPremiumVotes.typeUrl || Array.isArray(o.votes) && (!o.votes.length || FundingPremium.is(o.votes[0])));
  },
  isSDK(o: any): o is MsgAddPremiumVotesSDKType {
    return o && (o.$typeUrl === MsgAddPremiumVotes.typeUrl || Array.isArray(o.votes) && (!o.votes.length || FundingPremium.isSDK(o.votes[0])));
  },
  isAmino(o: any): o is MsgAddPremiumVotesAmino {
    return o && (o.$typeUrl === MsgAddPremiumVotes.typeUrl || Array.isArray(o.votes) && (!o.votes.length || FundingPremium.isAmino(o.votes[0])));
  },
  encode(message: MsgAddPremiumVotes, writer: BinaryWriter = BinaryWriter.create()): BinaryWriter {
    for (const v of message.votes) {
      FundingPremium.encode(v!, writer.uint32(10).fork()).ldelim();
    }
    return writer;
  },
  decode(input: BinaryReader | Uint8Array, length?: number): MsgAddPremiumVotes {
    const reader = input instanceof BinaryReader ? input : new BinaryReader(input);
    let end = length === undefined ? reader.len : reader.pos + length;
    const message = createBaseMsgAddPremiumVotes();
    while (reader.pos < end) {
      const tag = reader.uint32();
      switch (tag >>> 3) {
        case 1:
          message.votes.push(FundingPremium.decode(reader, reader.uint32()));
          break;
        default:
          reader.skipType(tag & 7);
          break;
      }
    }
    return message;
  },
  fromPartial(object: Partial<MsgAddPremiumVotes>): MsgAddPremiumVotes {
    const message = createBaseMsgAddPremiumVotes();
    message.votes = object.votes?.map(e => FundingPremium.fromPartial(e)) || [];
    return message;
  },
  fromAmino(object: MsgAddPremiumVotesAmino): MsgAddPremiumVotes {
    const message = createBaseMsgAddPremiumVotes();
    message.votes = object.votes?.map(e => FundingPremium.fromAmino(e)) || [];
    return message;
  },
  toAmino(message: MsgAddPremiumVotes): MsgAddPremiumVotesAmino {
    const obj: any = {};
    if (message.votes) {
      obj.votes = message.votes.map(e => e ? FundingPremium.toAmino(e) : undefined);
    } else {
      obj.votes = message.votes;
    }
    return obj;
  },
  fromAminoMsg(object: MsgAddPremiumVotesAminoMsg): MsgAddPremiumVotes {
    return MsgAddPremiumVotes.fromAmino(object.value);
  },
  fromProtoMsg(message: MsgAddPremiumVotesProtoMsg): MsgAddPremiumVotes {
    return MsgAddPremiumVotes.decode(message.value);
  },
  toProto(message: MsgAddPremiumVotes): Uint8Array {
    return MsgAddPremiumVotes.encode(message).finish();
  },
  toProtoMsg(message: MsgAddPremiumVotes): MsgAddPremiumVotesProtoMsg {
    return {
      typeUrl: "/klyraprotocol.perpetuals.MsgAddPremiumVotes",
      value: MsgAddPremiumVotes.encode(message).finish()
    };
  }
};
GlobalDecoderRegistry.register(MsgAddPremiumVotes.typeUrl, MsgAddPremiumVotes);
function createBaseMsgAddPremiumVotesResponse(): MsgAddPremiumVotesResponse {
  return {};
}
export const MsgAddPremiumVotesResponse = {
  typeUrl: "/klyraprotocol.perpetuals.MsgAddPremiumVotesResponse",
  is(o: any): o is MsgAddPremiumVotesResponse {
    return o && o.$typeUrl === MsgAddPremiumVotesResponse.typeUrl;
  },
  isSDK(o: any): o is MsgAddPremiumVotesResponseSDKType {
    return o && o.$typeUrl === MsgAddPremiumVotesResponse.typeUrl;
  },
  isAmino(o: any): o is MsgAddPremiumVotesResponseAmino {
    return o && o.$typeUrl === MsgAddPremiumVotesResponse.typeUrl;
  },
  encode(_: MsgAddPremiumVotesResponse, writer: BinaryWriter = BinaryWriter.create()): BinaryWriter {
    return writer;
  },
  decode(input: BinaryReader | Uint8Array, length?: number): MsgAddPremiumVotesResponse {
    const reader = input instanceof BinaryReader ? input : new BinaryReader(input);
    let end = length === undefined ? reader.len : reader.pos + length;
    const message = createBaseMsgAddPremiumVotesResponse();
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
  fromPartial(_: Partial<MsgAddPremiumVotesResponse>): MsgAddPremiumVotesResponse {
    const message = createBaseMsgAddPremiumVotesResponse();
    return message;
  },
  fromAmino(_: MsgAddPremiumVotesResponseAmino): MsgAddPremiumVotesResponse {
    const message = createBaseMsgAddPremiumVotesResponse();
    return message;
  },
  toAmino(_: MsgAddPremiumVotesResponse): MsgAddPremiumVotesResponseAmino {
    const obj: any = {};
    return obj;
  },
  fromAminoMsg(object: MsgAddPremiumVotesResponseAminoMsg): MsgAddPremiumVotesResponse {
    return MsgAddPremiumVotesResponse.fromAmino(object.value);
  },
  fromProtoMsg(message: MsgAddPremiumVotesResponseProtoMsg): MsgAddPremiumVotesResponse {
    return MsgAddPremiumVotesResponse.decode(message.value);
  },
  toProto(message: MsgAddPremiumVotesResponse): Uint8Array {
    return MsgAddPremiumVotesResponse.encode(message).finish();
  },
  toProtoMsg(message: MsgAddPremiumVotesResponse): MsgAddPremiumVotesResponseProtoMsg {
    return {
      typeUrl: "/klyraprotocol.perpetuals.MsgAddPremiumVotesResponse",
      value: MsgAddPremiumVotesResponse.encode(message).finish()
    };
  }
};
GlobalDecoderRegistry.register(MsgAddPremiumVotesResponse.typeUrl, MsgAddPremiumVotesResponse);
function createBaseMsgUpdateParams(): MsgUpdateParams {
  return {
    authority: "",
    params: Params.fromPartial({})
  };
}
export const MsgUpdateParams = {
  typeUrl: "/klyraprotocol.perpetuals.MsgUpdateParams",
  is(o: any): o is MsgUpdateParams {
    return o && (o.$typeUrl === MsgUpdateParams.typeUrl || typeof o.authority === "string" && Params.is(o.params));
  },
  isSDK(o: any): o is MsgUpdateParamsSDKType {
    return o && (o.$typeUrl === MsgUpdateParams.typeUrl || typeof o.authority === "string" && Params.isSDK(o.params));
  },
  isAmino(o: any): o is MsgUpdateParamsAmino {
    return o && (o.$typeUrl === MsgUpdateParams.typeUrl || typeof o.authority === "string" && Params.isAmino(o.params));
  },
  encode(message: MsgUpdateParams, writer: BinaryWriter = BinaryWriter.create()): BinaryWriter {
    if (message.authority !== "") {
      writer.uint32(10).string(message.authority);
    }
    if (message.params !== undefined) {
      Params.encode(message.params, writer.uint32(18).fork()).ldelim();
    }
    return writer;
  },
  decode(input: BinaryReader | Uint8Array, length?: number): MsgUpdateParams {
    const reader = input instanceof BinaryReader ? input : new BinaryReader(input);
    let end = length === undefined ? reader.len : reader.pos + length;
    const message = createBaseMsgUpdateParams();
    while (reader.pos < end) {
      const tag = reader.uint32();
      switch (tag >>> 3) {
        case 1:
          message.authority = reader.string();
          break;
        case 2:
          message.params = Params.decode(reader, reader.uint32());
          break;
        default:
          reader.skipType(tag & 7);
          break;
      }
    }
    return message;
  },
  fromPartial(object: Partial<MsgUpdateParams>): MsgUpdateParams {
    const message = createBaseMsgUpdateParams();
    message.authority = object.authority ?? "";
    message.params = object.params !== undefined && object.params !== null ? Params.fromPartial(object.params) : undefined;
    return message;
  },
  fromAmino(object: MsgUpdateParamsAmino): MsgUpdateParams {
    const message = createBaseMsgUpdateParams();
    if (object.authority !== undefined && object.authority !== null) {
      message.authority = object.authority;
    }
    if (object.params !== undefined && object.params !== null) {
      message.params = Params.fromAmino(object.params);
    }
    return message;
  },
  toAmino(message: MsgUpdateParams): MsgUpdateParamsAmino {
    const obj: any = {};
    obj.authority = message.authority === "" ? undefined : message.authority;
    obj.params = message.params ? Params.toAmino(message.params) : undefined;
    return obj;
  },
  fromAminoMsg(object: MsgUpdateParamsAminoMsg): MsgUpdateParams {
    return MsgUpdateParams.fromAmino(object.value);
  },
  fromProtoMsg(message: MsgUpdateParamsProtoMsg): MsgUpdateParams {
    return MsgUpdateParams.decode(message.value);
  },
  toProto(message: MsgUpdateParams): Uint8Array {
    return MsgUpdateParams.encode(message).finish();
  },
  toProtoMsg(message: MsgUpdateParams): MsgUpdateParamsProtoMsg {
    return {
      typeUrl: "/klyraprotocol.perpetuals.MsgUpdateParams",
      value: MsgUpdateParams.encode(message).finish()
    };
  }
};
GlobalDecoderRegistry.register(MsgUpdateParams.typeUrl, MsgUpdateParams);
function createBaseMsgUpdateParamsResponse(): MsgUpdateParamsResponse {
  return {};
}
export const MsgUpdateParamsResponse = {
  typeUrl: "/klyraprotocol.perpetuals.MsgUpdateParamsResponse",
  is(o: any): o is MsgUpdateParamsResponse {
    return o && o.$typeUrl === MsgUpdateParamsResponse.typeUrl;
  },
  isSDK(o: any): o is MsgUpdateParamsResponseSDKType {
    return o && o.$typeUrl === MsgUpdateParamsResponse.typeUrl;
  },
  isAmino(o: any): o is MsgUpdateParamsResponseAmino {
    return o && o.$typeUrl === MsgUpdateParamsResponse.typeUrl;
  },
  encode(_: MsgUpdateParamsResponse, writer: BinaryWriter = BinaryWriter.create()): BinaryWriter {
    return writer;
  },
  decode(input: BinaryReader | Uint8Array, length?: number): MsgUpdateParamsResponse {
    const reader = input instanceof BinaryReader ? input : new BinaryReader(input);
    let end = length === undefined ? reader.len : reader.pos + length;
    const message = createBaseMsgUpdateParamsResponse();
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
  fromPartial(_: Partial<MsgUpdateParamsResponse>): MsgUpdateParamsResponse {
    const message = createBaseMsgUpdateParamsResponse();
    return message;
  },
  fromAmino(_: MsgUpdateParamsResponseAmino): MsgUpdateParamsResponse {
    const message = createBaseMsgUpdateParamsResponse();
    return message;
  },
  toAmino(_: MsgUpdateParamsResponse): MsgUpdateParamsResponseAmino {
    const obj: any = {};
    return obj;
  },
  fromAminoMsg(object: MsgUpdateParamsResponseAminoMsg): MsgUpdateParamsResponse {
    return MsgUpdateParamsResponse.fromAmino(object.value);
  },
  fromProtoMsg(message: MsgUpdateParamsResponseProtoMsg): MsgUpdateParamsResponse {
    return MsgUpdateParamsResponse.decode(message.value);
  },
  toProto(message: MsgUpdateParamsResponse): Uint8Array {
    return MsgUpdateParamsResponse.encode(message).finish();
  },
  toProtoMsg(message: MsgUpdateParamsResponse): MsgUpdateParamsResponseProtoMsg {
    return {
      typeUrl: "/klyraprotocol.perpetuals.MsgUpdateParamsResponse",
      value: MsgUpdateParamsResponse.encode(message).finish()
    };
  }
};
GlobalDecoderRegistry.register(MsgUpdateParamsResponse.typeUrl, MsgUpdateParamsResponse);