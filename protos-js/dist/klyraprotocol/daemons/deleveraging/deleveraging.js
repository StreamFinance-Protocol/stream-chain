"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.UpdateSubaccountsListForDeleveragingDaemonResponse = exports.UpdateSubaccountsListForDeleveragingDaemonRequest = void 0;
//@ts-nocheck
const liquidations_1 = require("../../clob/liquidations");
const binary_1 = require("../../../binary");
const registry_1 = require("../../../registry");
function createBaseUpdateSubaccountsListForDeleveragingDaemonRequest() {
    return {
        subaccountOpenPositionInfo: []
    };
}
exports.UpdateSubaccountsListForDeleveragingDaemonRequest = {
    typeUrl: "/klyraprotocol.daemons.deleveraging.UpdateSubaccountsListForDeleveragingDaemonRequest",
    is(o) {
        return o && (o.$typeUrl === exports.UpdateSubaccountsListForDeleveragingDaemonRequest.typeUrl || Array.isArray(o.subaccountOpenPositionInfo) && (!o.subaccountOpenPositionInfo.length || liquidations_1.SubaccountOpenPositionInfo.is(o.subaccountOpenPositionInfo[0])));
    },
    isSDK(o) {
        return o && (o.$typeUrl === exports.UpdateSubaccountsListForDeleveragingDaemonRequest.typeUrl || Array.isArray(o.subaccount_open_position_info) && (!o.subaccount_open_position_info.length || liquidations_1.SubaccountOpenPositionInfo.isSDK(o.subaccount_open_position_info[0])));
    },
    isAmino(o) {
        return o && (o.$typeUrl === exports.UpdateSubaccountsListForDeleveragingDaemonRequest.typeUrl || Array.isArray(o.subaccount_open_position_info) && (!o.subaccount_open_position_info.length || liquidations_1.SubaccountOpenPositionInfo.isAmino(o.subaccount_open_position_info[0])));
    },
    encode(message, writer = binary_1.BinaryWriter.create()) {
        for (const v of message.subaccountOpenPositionInfo) {
            liquidations_1.SubaccountOpenPositionInfo.encode(v, writer.uint32(10).fork()).ldelim();
        }
        return writer;
    },
    decode(input, length) {
        const reader = input instanceof binary_1.BinaryReader ? input : new binary_1.BinaryReader(input);
        let end = length === undefined ? reader.len : reader.pos + length;
        const message = createBaseUpdateSubaccountsListForDeleveragingDaemonRequest();
        while (reader.pos < end) {
            const tag = reader.uint32();
            switch (tag >>> 3) {
                case 1:
                    message.subaccountOpenPositionInfo.push(liquidations_1.SubaccountOpenPositionInfo.decode(reader, reader.uint32()));
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
        message.subaccountOpenPositionInfo = object.subaccountOpenPositionInfo?.map(e => liquidations_1.SubaccountOpenPositionInfo.fromPartial(e)) || [];
        return message;
    },
    fromAmino(object) {
        const message = createBaseUpdateSubaccountsListForDeleveragingDaemonRequest();
        message.subaccountOpenPositionInfo = object.subaccount_open_position_info?.map(e => liquidations_1.SubaccountOpenPositionInfo.fromAmino(e)) || [];
        return message;
    },
    toAmino(message) {
        const obj = {};
        if (message.subaccountOpenPositionInfo) {
            obj.subaccount_open_position_info = message.subaccountOpenPositionInfo.map(e => e ? liquidations_1.SubaccountOpenPositionInfo.toAmino(e) : undefined);
        }
        else {
            obj.subaccount_open_position_info = message.subaccountOpenPositionInfo;
        }
        return obj;
    },
    fromAminoMsg(object) {
        return exports.UpdateSubaccountsListForDeleveragingDaemonRequest.fromAmino(object.value);
    },
    fromProtoMsg(message) {
        return exports.UpdateSubaccountsListForDeleveragingDaemonRequest.decode(message.value);
    },
    toProto(message) {
        return exports.UpdateSubaccountsListForDeleveragingDaemonRequest.encode(message).finish();
    },
    toProtoMsg(message) {
        return {
            typeUrl: "/klyraprotocol.daemons.deleveraging.UpdateSubaccountsListForDeleveragingDaemonRequest",
            value: exports.UpdateSubaccountsListForDeleveragingDaemonRequest.encode(message).finish()
        };
    }
};
registry_1.GlobalDecoderRegistry.register(exports.UpdateSubaccountsListForDeleveragingDaemonRequest.typeUrl, exports.UpdateSubaccountsListForDeleveragingDaemonRequest);
function createBaseUpdateSubaccountsListForDeleveragingDaemonResponse() {
    return {};
}
exports.UpdateSubaccountsListForDeleveragingDaemonResponse = {
    typeUrl: "/klyraprotocol.daemons.deleveraging.UpdateSubaccountsListForDeleveragingDaemonResponse",
    is(o) {
        return o && o.$typeUrl === exports.UpdateSubaccountsListForDeleveragingDaemonResponse.typeUrl;
    },
    isSDK(o) {
        return o && o.$typeUrl === exports.UpdateSubaccountsListForDeleveragingDaemonResponse.typeUrl;
    },
    isAmino(o) {
        return o && o.$typeUrl === exports.UpdateSubaccountsListForDeleveragingDaemonResponse.typeUrl;
    },
    encode(_, writer = binary_1.BinaryWriter.create()) {
        return writer;
    },
    decode(input, length) {
        const reader = input instanceof binary_1.BinaryReader ? input : new binary_1.BinaryReader(input);
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
        return exports.UpdateSubaccountsListForDeleveragingDaemonResponse.fromAmino(object.value);
    },
    fromProtoMsg(message) {
        return exports.UpdateSubaccountsListForDeleveragingDaemonResponse.decode(message.value);
    },
    toProto(message) {
        return exports.UpdateSubaccountsListForDeleveragingDaemonResponse.encode(message).finish();
    },
    toProtoMsg(message) {
        return {
            typeUrl: "/klyraprotocol.daemons.deleveraging.UpdateSubaccountsListForDeleveragingDaemonResponse",
            value: exports.UpdateSubaccountsListForDeleveragingDaemonResponse.encode(message).finish()
        };
    }
};
registry_1.GlobalDecoderRegistry.register(exports.UpdateSubaccountsListForDeleveragingDaemonResponse.typeUrl, exports.UpdateSubaccountsListForDeleveragingDaemonResponse);
