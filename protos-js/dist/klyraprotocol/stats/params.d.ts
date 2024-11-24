import { Duration, DurationAmino, DurationSDKType } from "../../google/protobuf/duration";
import { BinaryReader, BinaryWriter } from "../../binary";
/** Params defines the parameters for x/stats module. */
export interface Params {
    /** The desired number of seconds in the look-back window. */
    windowDuration: Duration;
}
export interface ParamsProtoMsg {
    typeUrl: "/klyraprotocol.stats.Params";
    value: Uint8Array;
}
/** Params defines the parameters for x/stats module. */
export interface ParamsAmino {
    /** The desired number of seconds in the look-back window. */
    window_duration?: DurationAmino;
}
export interface ParamsAminoMsg {
    type: "/klyraprotocol.stats.Params";
    value: ParamsAmino;
}
/** Params defines the parameters for x/stats module. */
export interface ParamsSDKType {
    window_duration: DurationSDKType;
}
export declare const Params: {
    typeUrl: string;
    is(o: any): o is Params;
    isSDK(o: any): o is ParamsSDKType;
    isAmino(o: any): o is ParamsAmino;
    encode(message: Params, writer?: BinaryWriter): BinaryWriter;
    decode(input: BinaryReader | Uint8Array, length?: number): Params;
    fromPartial(object: Partial<Params>): Params;
    fromAmino(object: ParamsAmino): Params;
    toAmino(message: Params): ParamsAmino;
    fromAminoMsg(object: ParamsAminoMsg): Params;
    fromProtoMsg(message: ParamsProtoMsg): Params;
    toProto(message: Params): Uint8Array;
    toProtoMsg(message: Params): ParamsProtoMsg;
};
