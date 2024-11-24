import { BinaryReader, BinaryWriter } from "../../../../binary";
/** ConfigRequest defines the request structure for the Config gRPC query. */
export interface ConfigRequest {
}
export interface ConfigRequestProtoMsg {
    typeUrl: "/cosmos.base.node.v1beta1.ConfigRequest";
    value: Uint8Array;
}
/** ConfigRequest defines the request structure for the Config gRPC query. */
export interface ConfigRequestAmino {
}
export interface ConfigRequestAminoMsg {
    type: "cosmos-sdk/ConfigRequest";
    value: ConfigRequestAmino;
}
/** ConfigRequest defines the request structure for the Config gRPC query. */
export interface ConfigRequestSDKType {
}
/** ConfigResponse defines the response structure for the Config gRPC query. */
export interface ConfigResponse {
    minimumGasPrice: string;
    /** pruning settings */
    pruningKeepRecent: string;
    pruningInterval: string;
}
export interface ConfigResponseProtoMsg {
    typeUrl: "/cosmos.base.node.v1beta1.ConfigResponse";
    value: Uint8Array;
}
/** ConfigResponse defines the response structure for the Config gRPC query. */
export interface ConfigResponseAmino {
    minimum_gas_price?: string;
    /** pruning settings */
    pruning_keep_recent?: string;
    pruning_interval?: string;
}
export interface ConfigResponseAminoMsg {
    type: "cosmos-sdk/ConfigResponse";
    value: ConfigResponseAmino;
}
/** ConfigResponse defines the response structure for the Config gRPC query. */
export interface ConfigResponseSDKType {
    minimum_gas_price: string;
    pruning_keep_recent: string;
    pruning_interval: string;
}
/** StateRequest defines the request structure for the status of a node. */
export interface StatusRequest {
}
export interface StatusRequestProtoMsg {
    typeUrl: "/cosmos.base.node.v1beta1.StatusRequest";
    value: Uint8Array;
}
/** StateRequest defines the request structure for the status of a node. */
export interface StatusRequestAmino {
}
export interface StatusRequestAminoMsg {
    type: "cosmos-sdk/StatusRequest";
    value: StatusRequestAmino;
}
/** StateRequest defines the request structure for the status of a node. */
export interface StatusRequestSDKType {
}
/** StateResponse defines the response structure for the status of a node. */
export interface StatusResponse {
    /** earliest block height available in the store */
    earliestStoreHeight: bigint;
    /** current block height */
    height: bigint;
    /** block height timestamp */
    timestamp?: Date;
    /** app hash of the current block */
    appHash: Uint8Array;
    /** validator hash provided by the consensus header */
    validatorHash: Uint8Array;
}
export interface StatusResponseProtoMsg {
    typeUrl: "/cosmos.base.node.v1beta1.StatusResponse";
    value: Uint8Array;
}
/** StateResponse defines the response structure for the status of a node. */
export interface StatusResponseAmino {
    /** earliest block height available in the store */
    earliest_store_height?: string;
    /** current block height */
    height?: string;
    /** block height timestamp */
    timestamp?: string;
    /** app hash of the current block */
    app_hash?: string;
    /** validator hash provided by the consensus header */
    validator_hash?: string;
}
export interface StatusResponseAminoMsg {
    type: "cosmos-sdk/StatusResponse";
    value: StatusResponseAmino;
}
/** StateResponse defines the response structure for the status of a node. */
export interface StatusResponseSDKType {
    earliest_store_height: bigint;
    height: bigint;
    timestamp?: Date;
    app_hash: Uint8Array;
    validator_hash: Uint8Array;
}
export declare const ConfigRequest: {
    typeUrl: string;
    aminoType: string;
    is(o: any): o is ConfigRequest;
    isSDK(o: any): o is ConfigRequestSDKType;
    isAmino(o: any): o is ConfigRequestAmino;
    encode(_: ConfigRequest, writer?: BinaryWriter): BinaryWriter;
    decode(input: BinaryReader | Uint8Array, length?: number): ConfigRequest;
    fromPartial(_: Partial<ConfigRequest>): ConfigRequest;
    fromAmino(_: ConfigRequestAmino): ConfigRequest;
    toAmino(_: ConfigRequest): ConfigRequestAmino;
    fromAminoMsg(object: ConfigRequestAminoMsg): ConfigRequest;
    toAminoMsg(message: ConfigRequest): ConfigRequestAminoMsg;
    fromProtoMsg(message: ConfigRequestProtoMsg): ConfigRequest;
    toProto(message: ConfigRequest): Uint8Array;
    toProtoMsg(message: ConfigRequest): ConfigRequestProtoMsg;
};
export declare const ConfigResponse: {
    typeUrl: string;
    aminoType: string;
    is(o: any): o is ConfigResponse;
    isSDK(o: any): o is ConfigResponseSDKType;
    isAmino(o: any): o is ConfigResponseAmino;
    encode(message: ConfigResponse, writer?: BinaryWriter): BinaryWriter;
    decode(input: BinaryReader | Uint8Array, length?: number): ConfigResponse;
    fromPartial(object: Partial<ConfigResponse>): ConfigResponse;
    fromAmino(object: ConfigResponseAmino): ConfigResponse;
    toAmino(message: ConfigResponse): ConfigResponseAmino;
    fromAminoMsg(object: ConfigResponseAminoMsg): ConfigResponse;
    toAminoMsg(message: ConfigResponse): ConfigResponseAminoMsg;
    fromProtoMsg(message: ConfigResponseProtoMsg): ConfigResponse;
    toProto(message: ConfigResponse): Uint8Array;
    toProtoMsg(message: ConfigResponse): ConfigResponseProtoMsg;
};
export declare const StatusRequest: {
    typeUrl: string;
    aminoType: string;
    is(o: any): o is StatusRequest;
    isSDK(o: any): o is StatusRequestSDKType;
    isAmino(o: any): o is StatusRequestAmino;
    encode(_: StatusRequest, writer?: BinaryWriter): BinaryWriter;
    decode(input: BinaryReader | Uint8Array, length?: number): StatusRequest;
    fromPartial(_: Partial<StatusRequest>): StatusRequest;
    fromAmino(_: StatusRequestAmino): StatusRequest;
    toAmino(_: StatusRequest): StatusRequestAmino;
    fromAminoMsg(object: StatusRequestAminoMsg): StatusRequest;
    toAminoMsg(message: StatusRequest): StatusRequestAminoMsg;
    fromProtoMsg(message: StatusRequestProtoMsg): StatusRequest;
    toProto(message: StatusRequest): Uint8Array;
    toProtoMsg(message: StatusRequest): StatusRequestProtoMsg;
};
export declare const StatusResponse: {
    typeUrl: string;
    aminoType: string;
    is(o: any): o is StatusResponse;
    isSDK(o: any): o is StatusResponseSDKType;
    isAmino(o: any): o is StatusResponseAmino;
    encode(message: StatusResponse, writer?: BinaryWriter): BinaryWriter;
    decode(input: BinaryReader | Uint8Array, length?: number): StatusResponse;
    fromPartial(object: Partial<StatusResponse>): StatusResponse;
    fromAmino(object: StatusResponseAmino): StatusResponse;
    toAmino(message: StatusResponse): StatusResponseAmino;
    fromAminoMsg(object: StatusResponseAminoMsg): StatusResponse;
    toAminoMsg(message: StatusResponse): StatusResponseAminoMsg;
    fromProtoMsg(message: StatusResponseProtoMsg): StatusResponse;
    toProto(message: StatusResponse): Uint8Array;
    toProtoMsg(message: StatusResponse): StatusResponseProtoMsg;
};
