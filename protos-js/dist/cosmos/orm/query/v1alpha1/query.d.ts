import { PageRequest, PageRequestAmino, PageRequestSDKType, PageResponse, PageResponseAmino, PageResponseSDKType } from "../../../base/query/v1beta1/pagination";
import { Any, AnyAmino, AnySDKType } from "../../../../google/protobuf/any";
import { Duration, DurationAmino, DurationSDKType } from "../../../../google/protobuf/duration";
import { BinaryReader, BinaryWriter } from "../../../../binary";
/** GetRequest is the Query/Get request type. */
export interface GetRequest {
    /** message_name is the fully-qualified message name of the ORM table being queried. */
    messageName: string;
    /**
     * index is the index fields expression used in orm definitions. If it
     * is empty, the table's primary key is assumed. If it is non-empty, it must
     * refer to an unique index.
     */
    index: string;
    /**
     * values are the values of the fields corresponding to the requested index.
     * There must be as many values provided as there are fields in the index and
     * these values must correspond to the index field types.
     */
    values: IndexValue[];
}
export interface GetRequestProtoMsg {
    typeUrl: "/cosmos.orm.query.v1alpha1.GetRequest";
    value: Uint8Array;
}
/** GetRequest is the Query/Get request type. */
export interface GetRequestAmino {
    /** message_name is the fully-qualified message name of the ORM table being queried. */
    message_name?: string;
    /**
     * index is the index fields expression used in orm definitions. If it
     * is empty, the table's primary key is assumed. If it is non-empty, it must
     * refer to an unique index.
     */
    index?: string;
    /**
     * values are the values of the fields corresponding to the requested index.
     * There must be as many values provided as there are fields in the index and
     * these values must correspond to the index field types.
     */
    values?: IndexValueAmino[];
}
export interface GetRequestAminoMsg {
    type: "cosmos-sdk/GetRequest";
    value: GetRequestAmino;
}
/** GetRequest is the Query/Get request type. */
export interface GetRequestSDKType {
    message_name: string;
    index: string;
    values: IndexValueSDKType[];
}
/** GetResponse is the Query/Get response type. */
export interface GetResponse {
    /**
     * result is the result of the get query. If no value is found, the gRPC
     * status code NOT_FOUND will be returned.
     */
    result?: Any;
}
export interface GetResponseProtoMsg {
    typeUrl: "/cosmos.orm.query.v1alpha1.GetResponse";
    value: Uint8Array;
}
/** GetResponse is the Query/Get response type. */
export interface GetResponseAmino {
    /**
     * result is the result of the get query. If no value is found, the gRPC
     * status code NOT_FOUND will be returned.
     */
    result?: AnyAmino;
}
export interface GetResponseAminoMsg {
    type: "cosmos-sdk/GetResponse";
    value: GetResponseAmino;
}
/** GetResponse is the Query/Get response type. */
export interface GetResponseSDKType {
    result?: AnySDKType;
}
/** ListRequest is the Query/List request type. */
export interface ListRequest {
    /** message_name is the fully-qualified message name of the ORM table being queried. */
    messageName: string;
    /**
     * index is the index fields expression used in orm definitions. If it
     * is empty, the table's primary key is assumed.
     */
    index: string;
    /** prefix defines a prefix query. */
    prefix?: ListRequest_Prefix;
    /** range defines a range query. */
    range?: ListRequest_Range;
    /** pagination is the pagination request. */
    pagination?: PageRequest;
}
export interface ListRequestProtoMsg {
    typeUrl: "/cosmos.orm.query.v1alpha1.ListRequest";
    value: Uint8Array;
}
/** ListRequest is the Query/List request type. */
export interface ListRequestAmino {
    /** message_name is the fully-qualified message name of the ORM table being queried. */
    message_name?: string;
    /**
     * index is the index fields expression used in orm definitions. If it
     * is empty, the table's primary key is assumed.
     */
    index?: string;
    /** prefix defines a prefix query. */
    prefix?: ListRequest_PrefixAmino;
    /** range defines a range query. */
    range?: ListRequest_RangeAmino;
    /** pagination is the pagination request. */
    pagination?: PageRequestAmino;
}
export interface ListRequestAminoMsg {
    type: "cosmos-sdk/ListRequest";
    value: ListRequestAmino;
}
/** ListRequest is the Query/List request type. */
export interface ListRequestSDKType {
    message_name: string;
    index: string;
    prefix?: ListRequest_PrefixSDKType;
    range?: ListRequest_RangeSDKType;
    pagination?: PageRequestSDKType;
}
/** Prefix specifies the arguments to a prefix query. */
export interface ListRequest_Prefix {
    /**
     * values specifies the index values for the prefix query.
     * It is valid to special a partial prefix with fewer values than
     * the number of fields in the index.
     */
    values: IndexValue[];
}
export interface ListRequest_PrefixProtoMsg {
    typeUrl: "/cosmos.orm.query.v1alpha1.Prefix";
    value: Uint8Array;
}
/** Prefix specifies the arguments to a prefix query. */
export interface ListRequest_PrefixAmino {
    /**
     * values specifies the index values for the prefix query.
     * It is valid to special a partial prefix with fewer values than
     * the number of fields in the index.
     */
    values?: IndexValueAmino[];
}
export interface ListRequest_PrefixAminoMsg {
    type: "cosmos-sdk/Prefix";
    value: ListRequest_PrefixAmino;
}
/** Prefix specifies the arguments to a prefix query. */
export interface ListRequest_PrefixSDKType {
    values: IndexValueSDKType[];
}
/** Range specifies the arguments to a range query. */
export interface ListRequest_Range {
    /**
     * start specifies the starting index values for the range query.
     * It is valid to provide fewer values than the number of fields in the
     * index.
     */
    start: IndexValue[];
    /**
     * end specifies the inclusive ending index values for the range query.
     * It is valid to provide fewer values than the number of fields in the
     * index.
     */
    end: IndexValue[];
}
export interface ListRequest_RangeProtoMsg {
    typeUrl: "/cosmos.orm.query.v1alpha1.Range";
    value: Uint8Array;
}
/** Range specifies the arguments to a range query. */
export interface ListRequest_RangeAmino {
    /**
     * start specifies the starting index values for the range query.
     * It is valid to provide fewer values than the number of fields in the
     * index.
     */
    start?: IndexValueAmino[];
    /**
     * end specifies the inclusive ending index values for the range query.
     * It is valid to provide fewer values than the number of fields in the
     * index.
     */
    end?: IndexValueAmino[];
}
export interface ListRequest_RangeAminoMsg {
    type: "cosmos-sdk/Range";
    value: ListRequest_RangeAmino;
}
/** Range specifies the arguments to a range query. */
export interface ListRequest_RangeSDKType {
    start: IndexValueSDKType[];
    end: IndexValueSDKType[];
}
/** ListResponse is the Query/List response type. */
export interface ListResponse {
    /** results are the results of the query. */
    results: Any[];
    /** pagination is the pagination response. */
    pagination?: PageResponse;
}
export interface ListResponseProtoMsg {
    typeUrl: "/cosmos.orm.query.v1alpha1.ListResponse";
    value: Uint8Array;
}
/** ListResponse is the Query/List response type. */
export interface ListResponseAmino {
    /** results are the results of the query. */
    results?: AnyAmino[];
    /** pagination is the pagination response. */
    pagination?: PageResponseAmino;
}
export interface ListResponseAminoMsg {
    type: "cosmos-sdk/ListResponse";
    value: ListResponseAmino;
}
/** ListResponse is the Query/List response type. */
export interface ListResponseSDKType {
    results: AnySDKType[];
    pagination?: PageResponseSDKType;
}
/** IndexValue represents the value of a field in an ORM index expression. */
export interface IndexValue {
    /**
     * uint specifies a value for an uint32, fixed32, uint64, or fixed64
     * index field.
     */
    uint?: bigint;
    /**
     * int64 specifies a value for an int32, sfixed32, int64, or sfixed64
     * index field.
     */
    int?: bigint;
    /** str specifies a value for a string index field. */
    str?: string;
    /** bytes specifies a value for a bytes index field. */
    bytes?: Uint8Array;
    /** enum specifies a value for an enum index field. */
    enum?: string;
    /** bool specifies a value for a bool index field. */
    bool?: boolean;
    /** timestamp specifies a value for a timestamp index field. */
    timestamp?: Date;
    /** duration specifies a value for a duration index field. */
    duration?: Duration;
}
export interface IndexValueProtoMsg {
    typeUrl: "/cosmos.orm.query.v1alpha1.IndexValue";
    value: Uint8Array;
}
/** IndexValue represents the value of a field in an ORM index expression. */
export interface IndexValueAmino {
    /**
     * uint specifies a value for an uint32, fixed32, uint64, or fixed64
     * index field.
     */
    uint?: string;
    /**
     * int64 specifies a value for an int32, sfixed32, int64, or sfixed64
     * index field.
     */
    int?: string;
    /** str specifies a value for a string index field. */
    str?: string;
    /** bytes specifies a value for a bytes index field. */
    bytes?: string;
    /** enum specifies a value for an enum index field. */
    enum?: string;
    /** bool specifies a value for a bool index field. */
    bool?: boolean;
    /** timestamp specifies a value for a timestamp index field. */
    timestamp?: string;
    /** duration specifies a value for a duration index field. */
    duration?: DurationAmino;
}
export interface IndexValueAminoMsg {
    type: "cosmos-sdk/IndexValue";
    value: IndexValueAmino;
}
/** IndexValue represents the value of a field in an ORM index expression. */
export interface IndexValueSDKType {
    uint?: bigint;
    int?: bigint;
    str?: string;
    bytes?: Uint8Array;
    enum?: string;
    bool?: boolean;
    timestamp?: Date;
    duration?: DurationSDKType;
}
export declare const GetRequest: {
    typeUrl: string;
    aminoType: string;
    is(o: any): o is GetRequest;
    isSDK(o: any): o is GetRequestSDKType;
    isAmino(o: any): o is GetRequestAmino;
    encode(message: GetRequest, writer?: BinaryWriter): BinaryWriter;
    decode(input: BinaryReader | Uint8Array, length?: number): GetRequest;
    fromPartial(object: Partial<GetRequest>): GetRequest;
    fromAmino(object: GetRequestAmino): GetRequest;
    toAmino(message: GetRequest): GetRequestAmino;
    fromAminoMsg(object: GetRequestAminoMsg): GetRequest;
    toAminoMsg(message: GetRequest): GetRequestAminoMsg;
    fromProtoMsg(message: GetRequestProtoMsg): GetRequest;
    toProto(message: GetRequest): Uint8Array;
    toProtoMsg(message: GetRequest): GetRequestProtoMsg;
};
export declare const GetResponse: {
    typeUrl: string;
    aminoType: string;
    is(o: any): o is GetResponse;
    isSDK(o: any): o is GetResponseSDKType;
    isAmino(o: any): o is GetResponseAmino;
    encode(message: GetResponse, writer?: BinaryWriter): BinaryWriter;
    decode(input: BinaryReader | Uint8Array, length?: number): GetResponse;
    fromPartial(object: Partial<GetResponse>): GetResponse;
    fromAmino(object: GetResponseAmino): GetResponse;
    toAmino(message: GetResponse): GetResponseAmino;
    fromAminoMsg(object: GetResponseAminoMsg): GetResponse;
    toAminoMsg(message: GetResponse): GetResponseAminoMsg;
    fromProtoMsg(message: GetResponseProtoMsg): GetResponse;
    toProto(message: GetResponse): Uint8Array;
    toProtoMsg(message: GetResponse): GetResponseProtoMsg;
};
export declare const ListRequest: {
    typeUrl: string;
    aminoType: string;
    is(o: any): o is ListRequest;
    isSDK(o: any): o is ListRequestSDKType;
    isAmino(o: any): o is ListRequestAmino;
    encode(message: ListRequest, writer?: BinaryWriter): BinaryWriter;
    decode(input: BinaryReader | Uint8Array, length?: number): ListRequest;
    fromPartial(object: Partial<ListRequest>): ListRequest;
    fromAmino(object: ListRequestAmino): ListRequest;
    toAmino(message: ListRequest): ListRequestAmino;
    fromAminoMsg(object: ListRequestAminoMsg): ListRequest;
    toAminoMsg(message: ListRequest): ListRequestAminoMsg;
    fromProtoMsg(message: ListRequestProtoMsg): ListRequest;
    toProto(message: ListRequest): Uint8Array;
    toProtoMsg(message: ListRequest): ListRequestProtoMsg;
};
export declare const ListRequest_Prefix: {
    typeUrl: string;
    aminoType: string;
    is(o: any): o is ListRequest_Prefix;
    isSDK(o: any): o is ListRequest_PrefixSDKType;
    isAmino(o: any): o is ListRequest_PrefixAmino;
    encode(message: ListRequest_Prefix, writer?: BinaryWriter): BinaryWriter;
    decode(input: BinaryReader | Uint8Array, length?: number): ListRequest_Prefix;
    fromPartial(object: Partial<ListRequest_Prefix>): ListRequest_Prefix;
    fromAmino(object: ListRequest_PrefixAmino): ListRequest_Prefix;
    toAmino(message: ListRequest_Prefix): ListRequest_PrefixAmino;
    fromAminoMsg(object: ListRequest_PrefixAminoMsg): ListRequest_Prefix;
    toAminoMsg(message: ListRequest_Prefix): ListRequest_PrefixAminoMsg;
    fromProtoMsg(message: ListRequest_PrefixProtoMsg): ListRequest_Prefix;
    toProto(message: ListRequest_Prefix): Uint8Array;
    toProtoMsg(message: ListRequest_Prefix): ListRequest_PrefixProtoMsg;
};
export declare const ListRequest_Range: {
    typeUrl: string;
    aminoType: string;
    is(o: any): o is ListRequest_Range;
    isSDK(o: any): o is ListRequest_RangeSDKType;
    isAmino(o: any): o is ListRequest_RangeAmino;
    encode(message: ListRequest_Range, writer?: BinaryWriter): BinaryWriter;
    decode(input: BinaryReader | Uint8Array, length?: number): ListRequest_Range;
    fromPartial(object: Partial<ListRequest_Range>): ListRequest_Range;
    fromAmino(object: ListRequest_RangeAmino): ListRequest_Range;
    toAmino(message: ListRequest_Range): ListRequest_RangeAmino;
    fromAminoMsg(object: ListRequest_RangeAminoMsg): ListRequest_Range;
    toAminoMsg(message: ListRequest_Range): ListRequest_RangeAminoMsg;
    fromProtoMsg(message: ListRequest_RangeProtoMsg): ListRequest_Range;
    toProto(message: ListRequest_Range): Uint8Array;
    toProtoMsg(message: ListRequest_Range): ListRequest_RangeProtoMsg;
};
export declare const ListResponse: {
    typeUrl: string;
    aminoType: string;
    is(o: any): o is ListResponse;
    isSDK(o: any): o is ListResponseSDKType;
    isAmino(o: any): o is ListResponseAmino;
    encode(message: ListResponse, writer?: BinaryWriter): BinaryWriter;
    decode(input: BinaryReader | Uint8Array, length?: number): ListResponse;
    fromPartial(object: Partial<ListResponse>): ListResponse;
    fromAmino(object: ListResponseAmino): ListResponse;
    toAmino(message: ListResponse): ListResponseAmino;
    fromAminoMsg(object: ListResponseAminoMsg): ListResponse;
    toAminoMsg(message: ListResponse): ListResponseAminoMsg;
    fromProtoMsg(message: ListResponseProtoMsg): ListResponse;
    toProto(message: ListResponse): Uint8Array;
    toProtoMsg(message: ListResponse): ListResponseProtoMsg;
};
export declare const IndexValue: {
    typeUrl: string;
    aminoType: string;
    is(o: any): o is IndexValue;
    isSDK(o: any): o is IndexValueSDKType;
    isAmino(o: any): o is IndexValueAmino;
    encode(message: IndexValue, writer?: BinaryWriter): BinaryWriter;
    decode(input: BinaryReader | Uint8Array, length?: number): IndexValue;
    fromPartial(object: Partial<IndexValue>): IndexValue;
    fromAmino(object: IndexValueAmino): IndexValue;
    toAmino(message: IndexValue): IndexValueAmino;
    fromAminoMsg(object: IndexValueAminoMsg): IndexValue;
    toAminoMsg(message: IndexValue): IndexValueAminoMsg;
    fromProtoMsg(message: IndexValueProtoMsg): IndexValue;
    toProto(message: IndexValue): Uint8Array;
    toProtoMsg(message: IndexValue): IndexValueProtoMsg;
};
