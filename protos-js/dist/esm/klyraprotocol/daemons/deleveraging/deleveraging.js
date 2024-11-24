//@ts-nocheck
import { SubaccountOpenPositionInfo } from "../../clob/liquidations";
import { BinaryReader, BinaryWriter } from "../../../binary";
import { GlobalDecoderRegistry } from "../../../registry";
function createBaseUpdateSubaccountsListForDeleveragingDaemonRequest() {
    return {
        subaccountOpenPositionInfo: []
    };
}
export const UpdateSubaccountsListForDeleveragingDaemonRequest = {
    typeUrl: "/klyraprotocol.daemons.deleveraging.UpdateSubaccountsListForDeleveragingDaemonRequest",
    is(o) {
        return o && (o.$typeUrl === UpdateSubaccountsListForDeleveragingDaemonRequest.typeUrl || Array.isArray(o.subaccountOpenPositionInfo) && (!o.subaccountOpenPositionInfo.length || SubaccountOpenPositionInfo.is(o.subaccountOpenPositionInfo[0])));
    },
    isSDK(o) {
        return o && (o.$typeUrl === UpdateSubaccountsListForDeleveragingDaemonRequest.typeUrl || Array.isArray(o.subaccount_open_position_info) && (!o.subaccount_open_position_info.length || SubaccountOpenPositionInfo.isSDK(o.subaccount_open_position_info[0])));
    },
    isAmino(o) {
        return o && (o.$typeUrl === UpdateSubaccountsListForDeleveragingDaemonRequest.typeUrl || Array.isArray(o.subaccount_open_position_info) && (!o.subaccount_open_position_info.length || SubaccountOpenPositionInfo.isAmino(o.subaccount_open_position_info[0])));
    },
    encode(message, writer = BinaryWriter.create()) {
        for (const v of message.subaccountOpenPositionInfo) {
            SubaccountOpenPositionInfo.encode(v, writer.uint32(10).fork()).ldelim();
        }
        return writer;
    },
    decode(input, length) {
        const reader = input instanceof BinaryReader ? input : new BinaryReader(input);
        let end = length === undefined ? reader.len : reader.pos + length;
        const message = createBaseUpdateSubaccountsListForDeleveragingDaemonRequest();
        while (reader.pos < end) {
            const tag = reader.uint32();
            switch (tag >>> 3) {
                case 1:
                    message.subaccountOpenPositionInfo.push(SubaccountOpenPositionInfo.decode(reader, reader.uint32()));
                    break;
                default:
                    reader.skipType(tag & 7);
                    break;
            }
        }
        return message;
    },
    fromPartial(object) {
        const message = createBaseUpdateSubaccountsListForDeleveragingDaemonRequest();
        message.subaccountOpenPositionInfo = object.subaccountOpenPositionInfo?.map(e => SubaccountOpenPositionInfo.fromPartial(e)) || [];
        return message;
    },
    fromAmino(object) {
        const message = createBaseUpdateSubaccountsListForDeleveragingDaemonRequest();
        message.subaccountOpenPositionInfo = object.subaccount_open_position_info?.map(e => SubaccountOpenPositionInfo.fromAmino(e)) || [];
        return message;
    },
    toAmino(message) {
        const obj = {};
        if (message.subaccountOpenPositionInfo) {
            obj.subaccount_open_position_info = message.subaccountOpenPositionInfo.map(e => e ? SubaccountOpenPositionInfo.toAmino(e) : undefined);
        }
        else {
            obj.subaccount_open_position_info = message.subaccountOpenPositionInfo;
        }
        return obj;
    },
    fromAminoMsg(object) {
        return UpdateSubaccountsListForDeleveragingDaemonRequest.fromAmino(object.value);
    },
    fromProtoMsg(message) {
        return UpdateSubaccountsListForDeleveragingDaemonRequest.decode(message.value);
    },
    toProto(message) {
        return UpdateSubaccountsListForDeleveragingDaemonRequest.encode(message).finish();
    },
    toProtoMsg(message) {
        return {
            typeUrl: "/klyraprotocol.daemons.deleveraging.UpdateSubaccountsListForDeleveragingDaemonRequest",
            value: UpdateSubaccountsListForDeleveragingDaemonRequest.encode(message).finish()
        };
    }
};
GlobalDecoderRegistry.register(UpdateSubaccountsListForDeleveragingDaemonRequest.typeUrl, UpdateSubaccountsListForDeleveragingDaemonRequest);
function createBaseUpdateSubaccountsListForDeleveragingDaemonResponse() {
    return {};
}
export const UpdateSubaccountsListForDeleveragingDaemonResponse = {
    typeUrl: "/klyraprotocol.daemons.deleveraging.UpdateSubaccountsListForDeleveragingDaemonResponse",
    is(o) {
        return o && o.$typeUrl === UpdateSubaccountsListForDeleveragingDaemonResponse.typeUrl;
    },
    isSDK(o) {
        return o && o.$typeUrl === UpdateSubaccountsListForDeleveragingDaemonResponse.typeUrl;
    },
    isAmino(o) {
        return o && o.$typeUrl === UpdateSubaccountsListForDeleveragingDaemonResponse.typeUrl;
    },
    encode(_, writer = BinaryWriter.create()) {
        return writer;
    },
    decode(input, length) {
        const reader = input instanceof BinaryReader ? input : new BinaryReader(input);
        let end = length === undefined ? reader.len : reader.pos + length;
        const message = createBaseUpdateSubaccountsListForDeleveragingDaemonResponse();
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
    fromPartial(_) {
        const message = createBaseUpdateSubaccountsListForDeleveragingDaemonResponse();
        return message;
    },
    fromAmino(_) {
        const message = createBaseUpdateSubaccountsListForDeleveragingDaemonResponse();
        return message;
    },
    toAmino(_) {
        const obj = {};
        return obj;
    },
    fromAminoMsg(object) {
        return UpdateSubaccountsListForDeleveragingDaemonResponse.fromAmino(object.value);
    },
    fromProtoMsg(message) {
        return UpdateSubaccountsListForDeleveragingDaemonResponse.decode(message.value);
    },
    toProto(message) {
        return UpdateSubaccountsListForDeleveragingDaemonResponse.encode(message).finish();
    },
    toProtoMsg(message) {
        return {
            typeUrl: "/klyraprotocol.daemons.deleveraging.UpdateSubaccountsListForDeleveragingDaemonResponse",
            value: UpdateSubaccountsListForDeleveragingDaemonResponse.encode(message).finish()
        };
    }
};
GlobalDecoderRegistry.register(UpdateSubaccountsListForDeleveragingDaemonResponse.typeUrl, UpdateSubaccountsListForDeleveragingDaemonResponse);
