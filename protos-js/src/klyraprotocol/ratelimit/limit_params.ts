//@ts-nocheck
import { Duration, DurationAmino, DurationSDKType } from "../../google/protobuf/duration";
import { BinaryReader, BinaryWriter } from "../../binary";
import { GlobalDecoderRegistry } from "../../registry";
import { bytesFromBase64, base64FromBytes } from "../../helpers";
/** LimitParams defines rate limit params on a denom. */
export interface LimitParams {
  /**
   * denom is the denomination of the token being rate limited.
   * e.g. ibc/8E27BA2D5493AF5636760E354E46004562C46AB7EC0CC4C1CA14E9E20E2545B5
   */
  denom: string;
  /**
   * limiters is a list of rate-limiters on this denom. All limiters
   * must be satified for a withdrawal to proceed.
   */
  limiters: Limiter[];
}
export interface LimitParamsProtoMsg {
  typeUrl: "/klyraprotocol.ratelimit.LimitParams";
  value: Uint8Array;
}
/** LimitParams defines rate limit params on a denom. */
export interface LimitParamsAmino {
  /**
   * denom is the denomination of the token being rate limited.
   * e.g. ibc/8E27BA2D5493AF5636760E354E46004562C46AB7EC0CC4C1CA14E9E20E2545B5
   */
  denom?: string;
  /**
   * limiters is a list of rate-limiters on this denom. All limiters
   * must be satified for a withdrawal to proceed.
   */
  limiters?: LimiterAmino[];
}
export interface LimitParamsAminoMsg {
  type: "/klyraprotocol.ratelimit.LimitParams";
  value: LimitParamsAmino;
}
/** LimitParams defines rate limit params on a denom. */
export interface LimitParamsSDKType {
  denom: string;
  limiters: LimiterSDKType[];
}
/** Limiter defines one rate-limiter on a specfic denom. */
export interface Limiter {
  /**
   * period is the rolling time period for which the limit applies
   * e.g. 3600 (an hour)
   */
  period: Duration;
  /**
   * baseline_minimum is the minimum maximum withdrawal coin amount within the
   * time period.
   * e.g. 100_000_000_000 uusdc for 100k USDC; 5e22 adv4tnt for 50k DV4TNT
   */
  baselineMinimum: Uint8Array;
  /**
   * baseline_tvl_ppm is the maximum ratio of TVL withdrawable in
   * the time period, in part-per-million.
   * e.g. 100_000 (10%)
   */
  baselineTvlPpm: number;
}
export interface LimiterProtoMsg {
  typeUrl: "/klyraprotocol.ratelimit.Limiter";
  value: Uint8Array;
}
/** Limiter defines one rate-limiter on a specfic denom. */
export interface LimiterAmino {
  /**
   * period is the rolling time period for which the limit applies
   * e.g. 3600 (an hour)
   */
  period?: DurationAmino;
  /**
   * baseline_minimum is the minimum maximum withdrawal coin amount within the
   * time period.
   * e.g. 100_000_000_000 uusdc for 100k USDC; 5e22 adv4tnt for 50k DV4TNT
   */
  baseline_minimum?: string;
  /**
   * baseline_tvl_ppm is the maximum ratio of TVL withdrawable in
   * the time period, in part-per-million.
   * e.g. 100_000 (10%)
   */
  baseline_tvl_ppm?: number;
}
export interface LimiterAminoMsg {
  type: "/klyraprotocol.ratelimit.Limiter";
  value: LimiterAmino;
}
/** Limiter defines one rate-limiter on a specfic denom. */
export interface LimiterSDKType {
  period: DurationSDKType;
  baseline_minimum: Uint8Array;
  baseline_tvl_ppm: number;
}
function createBaseLimitParams(): LimitParams {
  return {
    denom: "",
    limiters: []
  };
}
export const LimitParams = {
  typeUrl: "/klyraprotocol.ratelimit.LimitParams",
  is(o: any): o is LimitParams {
    return o && (o.$typeUrl === LimitParams.typeUrl || typeof o.denom === "string" && Array.isArray(o.limiters) && (!o.limiters.length || Limiter.is(o.limiters[0])));
  },
  isSDK(o: any): o is LimitParamsSDKType {
    return o && (o.$typeUrl === LimitParams.typeUrl || typeof o.denom === "string" && Array.isArray(o.limiters) && (!o.limiters.length || Limiter.isSDK(o.limiters[0])));
  },
  isAmino(o: any): o is LimitParamsAmino {
    return o && (o.$typeUrl === LimitParams.typeUrl || typeof o.denom === "string" && Array.isArray(o.limiters) && (!o.limiters.length || Limiter.isAmino(o.limiters[0])));
  },
  encode(message: LimitParams, writer: BinaryWriter = BinaryWriter.create()): BinaryWriter {
    if (message.denom !== "") {
      writer.uint32(10).string(message.denom);
    }
    for (const v of message.limiters) {
      Limiter.encode(v!, writer.uint32(18).fork()).ldelim();
    }
    return writer;
  },
  decode(input: BinaryReader | Uint8Array, length?: number): LimitParams {
    const reader = input instanceof BinaryReader ? input : new BinaryReader(input);
    let end = length === undefined ? reader.len : reader.pos + length;
    const message = createBaseLimitParams();
    while (reader.pos < end) {
      const tag = reader.uint32();
      switch (tag >>> 3) {
        case 1:
          message.denom = reader.string();
          break;
        case 2:
          message.limiters.push(Limiter.decode(reader, reader.uint32()));
          break;
        default:
          reader.skipType(tag & 7);
          break;
      }
    }
    return message;
  },
  fromPartial(object: Partial<LimitParams>): LimitParams {
    const message = createBaseLimitParams();
    message.denom = object.denom ?? "";
    message.limiters = object.limiters?.map(e => Limiter.fromPartial(e)) || [];
    return message;
  },
  fromAmino(object: LimitParamsAmino): LimitParams {
    const message = createBaseLimitParams();
    if (object.denom !== undefined && object.denom !== null) {
      message.denom = object.denom;
    }
    message.limiters = object.limiters?.map(e => Limiter.fromAmino(e)) || [];
    return message;
  },
  toAmino(message: LimitParams): LimitParamsAmino {
    const obj: any = {};
    obj.denom = message.denom === "" ? undefined : message.denom;
    if (message.limiters) {
      obj.limiters = message.limiters.map(e => e ? Limiter.toAmino(e) : undefined);
    } else {
      obj.limiters = message.limiters;
    }
    return obj;
  },
  fromAminoMsg(object: LimitParamsAminoMsg): LimitParams {
    return LimitParams.fromAmino(object.value);
  },
  fromProtoMsg(message: LimitParamsProtoMsg): LimitParams {
    return LimitParams.decode(message.value);
  },
  toProto(message: LimitParams): Uint8Array {
    return LimitParams.encode(message).finish();
  },
  toProtoMsg(message: LimitParams): LimitParamsProtoMsg {
    return {
      typeUrl: "/klyraprotocol.ratelimit.LimitParams",
      value: LimitParams.encode(message).finish()
    };
  }
};
GlobalDecoderRegistry.register(LimitParams.typeUrl, LimitParams);
function createBaseLimiter(): Limiter {
  return {
    period: Duration.fromPartial({}),
    baselineMinimum: new Uint8Array(),
    baselineTvlPpm: 0
  };
}
export const Limiter = {
  typeUrl: "/klyraprotocol.ratelimit.Limiter",
  is(o: any): o is Limiter {
    return o && (o.$typeUrl === Limiter.typeUrl || Duration.is(o.period) && (o.baselineMinimum instanceof Uint8Array || typeof o.baselineMinimum === "string") && typeof o.baselineTvlPpm === "number");
  },
  isSDK(o: any): o is LimiterSDKType {
    return o && (o.$typeUrl === Limiter.typeUrl || Duration.isSDK(o.period) && (o.baseline_minimum instanceof Uint8Array || typeof o.baseline_minimum === "string") && typeof o.baseline_tvl_ppm === "number");
  },
  isAmino(o: any): o is LimiterAmino {
    return o && (o.$typeUrl === Limiter.typeUrl || Duration.isAmino(o.period) && (o.baseline_minimum instanceof Uint8Array || typeof o.baseline_minimum === "string") && typeof o.baseline_tvl_ppm === "number");
  },
  encode(message: Limiter, writer: BinaryWriter = BinaryWriter.create()): BinaryWriter {
    if (message.period !== undefined) {
      Duration.encode(message.period, writer.uint32(10).fork()).ldelim();
    }
    if (message.baselineMinimum.length !== 0) {
      writer.uint32(26).bytes(message.baselineMinimum);
    }
    if (message.baselineTvlPpm !== 0) {
      writer.uint32(32).uint32(message.baselineTvlPpm);
    }
    return writer;
  },
  decode(input: BinaryReader | Uint8Array, length?: number): Limiter {
    const reader = input instanceof BinaryReader ? input : new BinaryReader(input);
    let end = length === undefined ? reader.len : reader.pos + length;
    const message = createBaseLimiter();
    while (reader.pos < end) {
      const tag = reader.uint32();
      switch (tag >>> 3) {
        case 1:
          message.period = Duration.decode(reader, reader.uint32());
          break;
        case 3:
          message.baselineMinimum = reader.bytes();
          break;
        case 4:
          message.baselineTvlPpm = reader.uint32();
          break;
        default:
          reader.skipType(tag & 7);
          break;
      }
    }
    return message;
  },
  fromPartial(object: Partial<Limiter>): Limiter {
    const message = createBaseLimiter();
    message.period = object.period !== undefined && object.period !== null ? Duration.fromPartial(object.period) : undefined;
    message.baselineMinimum = object.baselineMinimum ?? new Uint8Array();
    message.baselineTvlPpm = object.baselineTvlPpm ?? 0;
    return message;
  },
  fromAmino(object: LimiterAmino): Limiter {
    const message = createBaseLimiter();
    if (object.period !== undefined && object.period !== null) {
      message.period = Duration.fromAmino(object.period);
    }
    if (object.baseline_minimum !== undefined && object.baseline_minimum !== null) {
      message.baselineMinimum = bytesFromBase64(object.baseline_minimum);
    }
    if (object.baseline_tvl_ppm !== undefined && object.baseline_tvl_ppm !== null) {
      message.baselineTvlPpm = object.baseline_tvl_ppm;
    }
    return message;
  },
  toAmino(message: Limiter): LimiterAmino {
    const obj: any = {};
    obj.period = message.period ? Duration.toAmino(message.period) : undefined;
    obj.baseline_minimum = message.baselineMinimum ? base64FromBytes(message.baselineMinimum) : undefined;
    obj.baseline_tvl_ppm = message.baselineTvlPpm === 0 ? undefined : message.baselineTvlPpm;
    return obj;
  },
  fromAminoMsg(object: LimiterAminoMsg): Limiter {
    return Limiter.fromAmino(object.value);
  },
  fromProtoMsg(message: LimiterProtoMsg): Limiter {
    return Limiter.decode(message.value);
  },
  toProto(message: Limiter): Uint8Array {
    return Limiter.encode(message).finish();
  },
  toProtoMsg(message: Limiter): LimiterProtoMsg {
    return {
      typeUrl: "/klyraprotocol.ratelimit.Limiter",
      value: Limiter.encode(message).finish()
    };
  }
};
GlobalDecoderRegistry.register(Limiter.typeUrl, Limiter);