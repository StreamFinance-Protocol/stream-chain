import { Limiter, LimiterAmino, LimiterSDKType } from "./limit_params";
import { BinaryReader, BinaryWriter } from "../../binary";
/** DenomCapacity stores a list of rate limit capacity for a denom. */
export interface DenomCapacity {
    /**
     * denom is the denomination of the token being rate limited.
     * e.g. ibc/8E27BA2D5493AF5636760E354E46004562C46AB7EC0CC4C1CA14E9E20E2545B5
     */
    denom: string;
    /**
     * capacity_list is a list of capacity amount tracked for each `Limiter`
     * on the denom. This list has a 1:1 mapping to `limiter` list under
     * `LimitParams`.
     */
    capacityList: Uint8Array[];
}
export interface DenomCapacityProtoMsg {
    typeUrl: "/klyraprotocol.ratelimit.DenomCapacity";
    value: Uint8Array;
}
/** DenomCapacity stores a list of rate limit capacity for a denom. */
export interface DenomCapacityAmino {
    /**
     * denom is the denomination of the token being rate limited.
     * e.g. ibc/8E27BA2D5493AF5636760E354E46004562C46AB7EC0CC4C1CA14E9E20E2545B5
     */
    denom?: string;
    /**
     * capacity_list is a list of capacity amount tracked for each `Limiter`
     * on the denom. This list has a 1:1 mapping to `limiter` list under
     * `LimitParams`.
     */
    capacity_list?: string[];
}
export interface DenomCapacityAminoMsg {
    type: "/klyraprotocol.ratelimit.DenomCapacity";
    value: DenomCapacityAmino;
}
/** DenomCapacity stores a list of rate limit capacity for a denom. */
export interface DenomCapacitySDKType {
    denom: string;
    capacity_list: Uint8Array[];
}
/** LimiterCapacity contains a pair of limiter and its corresponding capacity. */
export interface LimiterCapacity {
    limiter: Limiter;
    capacity: Uint8Array;
}
export interface LimiterCapacityProtoMsg {
    typeUrl: "/klyraprotocol.ratelimit.LimiterCapacity";
    value: Uint8Array;
}
/** LimiterCapacity contains a pair of limiter and its corresponding capacity. */
export interface LimiterCapacityAmino {
    limiter?: LimiterAmino;
    capacity?: string;
}
export interface LimiterCapacityAminoMsg {
    type: "/klyraprotocol.ratelimit.LimiterCapacity";
    value: LimiterCapacityAmino;
}
/** LimiterCapacity contains a pair of limiter and its corresponding capacity. */
export interface LimiterCapacitySDKType {
    limiter: LimiterSDKType;
    capacity: Uint8Array;
}
export declare const DenomCapacity: {
    typeUrl: string;
    is(o: any): o is DenomCapacity;
    isSDK(o: any): o is DenomCapacitySDKType;
    isAmino(o: any): o is DenomCapacityAmino;
    encode(message: DenomCapacity, writer?: BinaryWriter): BinaryWriter;
    decode(input: BinaryReader | Uint8Array, length?: number): DenomCapacity;
    fromPartial(object: Partial<DenomCapacity>): DenomCapacity;
    fromAmino(object: DenomCapacityAmino): DenomCapacity;
    toAmino(message: DenomCapacity): DenomCapacityAmino;
    fromAminoMsg(object: DenomCapacityAminoMsg): DenomCapacity;
    fromProtoMsg(message: DenomCapacityProtoMsg): DenomCapacity;
    toProto(message: DenomCapacity): Uint8Array;
    toProtoMsg(message: DenomCapacity): DenomCapacityProtoMsg;
};
export declare const LimiterCapacity: {
    typeUrl: string;
    is(o: any): o is LimiterCapacity;
    isSDK(o: any): o is LimiterCapacitySDKType;
    isAmino(o: any): o is LimiterCapacityAmino;
    encode(message: LimiterCapacity, writer?: BinaryWriter): BinaryWriter;
    decode(input: BinaryReader | Uint8Array, length?: number): LimiterCapacity;
    fromPartial(object: Partial<LimiterCapacity>): LimiterCapacity;
    fromAmino(object: LimiterCapacityAmino): LimiterCapacity;
    toAmino(message: LimiterCapacity): LimiterCapacityAmino;
    fromAminoMsg(object: LimiterCapacityAminoMsg): LimiterCapacity;
    fromProtoMsg(message: LimiterCapacityProtoMsg): LimiterCapacity;
    toProto(message: LimiterCapacity): Uint8Array;
    toProtoMsg(message: LimiterCapacity): LimiterCapacityProtoMsg;
};
