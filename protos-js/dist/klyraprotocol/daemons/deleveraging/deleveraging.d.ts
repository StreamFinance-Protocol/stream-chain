import { SubaccountOpenPositionInfo, SubaccountOpenPositionInfoAmino, SubaccountOpenPositionInfoSDKType } from "../../clob/liquidations";
import { BinaryReader, BinaryWriter } from "../../../binary";
/**
 * UpdateSubaccountsListForDeleveragingDaemonRequest is a request message that
 * contains a list of perpetuals with the associated subaccounts that have open
 * long and short positions
 */
export interface UpdateSubaccountsListForDeleveragingDaemonRequest {
    subaccountOpenPositionInfo: SubaccountOpenPositionInfo[];
}
export interface UpdateSubaccountsListForDeleveragingDaemonRequestProtoMsg {
    typeUrl: "/klyraprotocol.daemons.deleveraging.UpdateSubaccountsListForDeleveragingDaemonRequest";
    value: Uint8Array;
}
/**
 * UpdateSubaccountsListForDeleveragingDaemonRequest is a request message that
 * contains a list of perpetuals with the associated subaccounts that have open
 * long and short positions
 */
export interface UpdateSubaccountsListForDeleveragingDaemonRequestAmino {
    subaccount_open_position_info?: SubaccountOpenPositionInfoAmino[];
}
export interface UpdateSubaccountsListForDeleveragingDaemonRequestAminoMsg {
    type: "/klyraprotocol.daemons.deleveraging.UpdateSubaccountsListForDeleveragingDaemonRequest";
    value: UpdateSubaccountsListForDeleveragingDaemonRequestAmino;
}
/**
 * UpdateSubaccountsListForDeleveragingDaemonRequest is a request message that
 * contains a list of perpetuals with the associated subaccounts that have open
 * long and short positions
 */
export interface UpdateSubaccountsListForDeleveragingDaemonRequestSDKType {
    subaccount_open_position_info: SubaccountOpenPositionInfoSDKType[];
}
/**
 * UpdateSubaccountsListForDeleveragingDaemonResponse is a response message for
 * UpdateSubaccountsListForDeleveragingDaemonRequest.
 */
export interface UpdateSubaccountsListForDeleveragingDaemonResponse {
}
export interface UpdateSubaccountsListForDeleveragingDaemonResponseProtoMsg {
    typeUrl: "/klyraprotocol.daemons.deleveraging.UpdateSubaccountsListForDeleveragingDaemonResponse";
    value: Uint8Array;
}
/**
 * UpdateSubaccountsListForDeleveragingDaemonResponse is a response message for
 * UpdateSubaccountsListForDeleveragingDaemonRequest.
 */
export interface UpdateSubaccountsListForDeleveragingDaemonResponseAmino {
}
export interface UpdateSubaccountsListForDeleveragingDaemonResponseAminoMsg {
    type: "/klyraprotocol.daemons.deleveraging.UpdateSubaccountsListForDeleveragingDaemonResponse";
    value: UpdateSubaccountsListForDeleveragingDaemonResponseAmino;
}
/**
 * UpdateSubaccountsListForDeleveragingDaemonResponse is a response message for
 * UpdateSubaccountsListForDeleveragingDaemonRequest.
 */
export interface UpdateSubaccountsListForDeleveragingDaemonResponseSDKType {
}
export declare const UpdateSubaccountsListForDeleveragingDaemonRequest: {
    typeUrl: string;
    is(o: any): o is UpdateSubaccountsListForDeleveragingDaemonRequest;
    isSDK(o: any): o is UpdateSubaccountsListForDeleveragingDaemonRequestSDKType;
    isAmino(o: any): o is UpdateSubaccountsListForDeleveragingDaemonRequestAmino;
    encode(message: UpdateSubaccountsListForDeleveragingDaemonRequest, writer?: BinaryWriter): BinaryWriter;
    decode(input: BinaryReader | Uint8Array, length?: number): UpdateSubaccountsListForDeleveragingDaemonRequest;
    fromPartial(object: Partial<UpdateSubaccountsListForDeleveragingDaemonRequest>): UpdateSubaccountsListForDeleveragingDaemonRequest;
    fromAmino(object: UpdateSubaccountsListForDeleveragingDaemonRequestAmino): UpdateSubaccountsListForDeleveragingDaemonRequest;
    toAmino(message: UpdateSubaccountsListForDeleveragingDaemonRequest): UpdateSubaccountsListForDeleveragingDaemonRequestAmino;
    fromAminoMsg(object: UpdateSubaccountsListForDeleveragingDaemonRequestAminoMsg): UpdateSubaccountsListForDeleveragingDaemonRequest;
    fromProtoMsg(message: UpdateSubaccountsListForDeleveragingDaemonRequestProtoMsg): UpdateSubaccountsListForDeleveragingDaemonRequest;
    toProto(message: UpdateSubaccountsListForDeleveragingDaemonRequest): Uint8Array;
    toProtoMsg(message: UpdateSubaccountsListForDeleveragingDaemonRequest): UpdateSubaccountsListForDeleveragingDaemonRequestProtoMsg;
};
export declare const UpdateSubaccountsListForDeleveragingDaemonResponse: {
    typeUrl: string;
    is(o: any): o is UpdateSubaccountsListForDeleveragingDaemonResponse;
    isSDK(o: any): o is UpdateSubaccountsListForDeleveragingDaemonResponseSDKType;
    isAmino(o: any): o is UpdateSubaccountsListForDeleveragingDaemonResponseAmino;
    encode(_: UpdateSubaccountsListForDeleveragingDaemonResponse, writer?: BinaryWriter): BinaryWriter;
    decode(input: BinaryReader | Uint8Array, length?: number): UpdateSubaccountsListForDeleveragingDaemonResponse;
    fromPartial(_: Partial<UpdateSubaccountsListForDeleveragingDaemonResponse>): UpdateSubaccountsListForDeleveragingDaemonResponse;
    fromAmino(_: UpdateSubaccountsListForDeleveragingDaemonResponseAmino): UpdateSubaccountsListForDeleveragingDaemonResponse;
    toAmino(_: UpdateSubaccountsListForDeleveragingDaemonResponse): UpdateSubaccountsListForDeleveragingDaemonResponseAmino;
    fromAminoMsg(object: UpdateSubaccountsListForDeleveragingDaemonResponseAminoMsg): UpdateSubaccountsListForDeleveragingDaemonResponse;
    fromProtoMsg(message: UpdateSubaccountsListForDeleveragingDaemonResponseProtoMsg): UpdateSubaccountsListForDeleveragingDaemonResponse;
    toProto(message: UpdateSubaccountsListForDeleveragingDaemonResponse): Uint8Array;
    toProtoMsg(message: UpdateSubaccountsListForDeleveragingDaemonResponse): UpdateSubaccountsListForDeleveragingDaemonResponseProtoMsg;
};
