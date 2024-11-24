import { Duration, DurationAmino, DurationSDKType } from "../../google/protobuf/duration";
import { BinaryReader, BinaryWriter } from "../../binary";
/** DowntimeParams defines the parameters for downtime. */
export interface DowntimeParams {
    /**
     * Durations tracked for downtime. The durations must be sorted from
     * shortest to longest and must all be positive.
     */
    durations: Duration[];
}
export interface DowntimeParamsProtoMsg {
    typeUrl: "/klyraprotocol.blocktime.DowntimeParams";
    value: Uint8Array;
}
/** DowntimeParams defines the parameters for downtime. */
export interface DowntimeParamsAmino {
    /**
     * Durations tracked for downtime. The durations must be sorted from
     * shortest to longest and must all be positive.
     */
    durations?: DurationAmino[];
}
export interface DowntimeParamsAminoMsg {
    type: "/klyraprotocol.blocktime.DowntimeParams";
    value: DowntimeParamsAmino;
}
/** DowntimeParams defines the parameters for downtime. */
export interface DowntimeParamsSDKType {
    durations: DurationSDKType[];
}
export declare const DowntimeParams: {
    typeUrl: string;
    is(o: any): o is DowntimeParams;
    isSDK(o: any): o is DowntimeParamsSDKType;
    isAmino(o: any): o is DowntimeParamsAmino;
    encode(message: DowntimeParams, writer?: BinaryWriter): BinaryWriter;
    decode(input: BinaryReader | Uint8Array, length?: number): DowntimeParams;
    fromPartial(object: Partial<DowntimeParams>): DowntimeParams;
    fromAmino(object: DowntimeParamsAmino): DowntimeParams;
    toAmino(message: DowntimeParams): DowntimeParamsAmino;
    fromAminoMsg(object: DowntimeParamsAminoMsg): DowntimeParams;
    fromProtoMsg(message: DowntimeParamsProtoMsg): DowntimeParams;
    toProto(message: DowntimeParams): Uint8Array;
    toProtoMsg(message: DowntimeParams): DowntimeParamsProtoMsg;
};
