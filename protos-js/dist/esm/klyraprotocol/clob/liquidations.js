//@ts-nocheck
import { SubaccountId } from "../subaccounts/subaccount";
import { BinaryReader, BinaryWriter } from "../../binary";
import { GlobalDecoderRegistry } from "../../registry";
function createBasePerpetualLiquidationInfo() {
    return {
        subaccountId: SubaccountId.fromPartial({}),
        perpetualId: 0
    };
}
export const PerpetualLiquidationInfo = {
    typeUrl: "/klyraprotocol.clob.PerpetualLiquidationInfo",
    is(o) {
        return o && (o.$typeUrl === PerpetualLiquidationInfo.typeUrl || SubaccountId.is(o.subaccountId) && typeof o.perpetualId === "number");
    },
    isSDK(o) {
        return o && (o.$typeUrl === PerpetualLiquidationInfo.typeUrl || SubaccountId.isSDK(o.subaccount_id) && typeof o.perpetual_id === "number");
    },
    isAmino(o) {
        return o && (o.$typeUrl === PerpetualLiquidationInfo.typeUrl || SubaccountId.isAmino(o.subaccount_id) && typeof o.perpetual_id === "number");
    },
    encode(message, writer = BinaryWriter.create()) {
        if (message.subaccountId !== undefined) {
            SubaccountId.encode(message.subaccountId, writer.uint32(10).fork()).ldelim();
        }
        if (message.perpetualId !== 0) {
            writer.uint32(16).uint32(message.perpetualId);
        }
        return writer;
    },
    decode(input, length) {
        const reader = input instanceof BinaryReader ? input : new BinaryReader(input);
        let end = length === undefined ? reader.len : reader.pos + length;
        const message = createBasePerpetualLiquidationInfo();
        while (reader.pos < end) {
            const tag = reader.uint32();
            switch (tag >>> 3) {
                case 1:
                    message.subaccountId = SubaccountId.decode(reader, reader.uint32());
                    break;
                case 2:
                    message.perpetualId = reader.uint32();
                    break;
                default:
                    reader.skipType(tag & 7);
                    break;
            }
        }
        return message;
    },
    fromPartial(object) {
        const message = createBasePerpetualLiquidationInfo();
        message.subaccountId = object.subaccountId !== undefined && object.subaccountId !== null ? SubaccountId.fromPartial(object.subaccountId) : undefined;
        message.perpetualId = object.perpetualId ?? 0;
        return message;
    },
    fromAmino(object) {
        const message = createBasePerpetualLiquidationInfo();
        if (object.subaccount_id !== undefined && object.subaccount_id !== null) {
            message.subaccountId = SubaccountId.fromAmino(object.subaccount_id);
        }
        if (object.perpetual_id !== undefined && object.perpetual_id !== null) {
            message.perpetualId = object.perpetual_id;
        }
        return message;
    },
    toAmino(message) {
        const obj = {};
        obj.subaccount_id = message.subaccountId ? SubaccountId.toAmino(message.subaccountId) : undefined;
        obj.perpetual_id = message.perpetualId === 0 ? undefined : message.perpetualId;
        return obj;
    },
    fromAminoMsg(object) {
        return PerpetualLiquidationInfo.fromAmino(object.value);
    },
    fromProtoMsg(message) {
        return PerpetualLiquidationInfo.decode(message.value);
    },
    toProto(message) {
        return PerpetualLiquidationInfo.encode(message).finish();
    },
    toProtoMsg(message) {
        return {
            typeUrl: "/klyraprotocol.clob.PerpetualLiquidationInfo",
            value: PerpetualLiquidationInfo.encode(message).finish()
        };
    }
};
GlobalDecoderRegistry.register(PerpetualLiquidationInfo.typeUrl, PerpetualLiquidationInfo);
function createBaseSubaccountLiquidationInfo() {
    return {
        perpetualsLiquidated: []
    };
}
export const SubaccountLiquidationInfo = {
    typeUrl: "/klyraprotocol.clob.SubaccountLiquidationInfo",
    is(o) {
        return o && (o.$typeUrl === SubaccountLiquidationInfo.typeUrl || Array.isArray(o.perpetualsLiquidated) && (!o.perpetualsLiquidated.length || typeof o.perpetualsLiquidated[0] === "number"));
    },
    isSDK(o) {
        return o && (o.$typeUrl === SubaccountLiquidationInfo.typeUrl || Array.isArray(o.perpetuals_liquidated) && (!o.perpetuals_liquidated.length || typeof o.perpetuals_liquidated[0] === "number"));
    },
    isAmino(o) {
        return o && (o.$typeUrl === SubaccountLiquidationInfo.typeUrl || Array.isArray(o.perpetuals_liquidated) && (!o.perpetuals_liquidated.length || typeof o.perpetuals_liquidated[0] === "number"));
    },
    encode(message, writer = BinaryWriter.create()) {
        writer.uint32(10).fork();
        for (const v of message.perpetualsLiquidated) {
            writer.uint32(v);
        }
        writer.ldelim();
        return writer;
    },
    decode(input, length) {
        const reader = input instanceof BinaryReader ? input : new BinaryReader(input);
        let end = length === undefined ? reader.len : reader.pos + length;
        const message = createBaseSubaccountLiquidationInfo();
        while (reader.pos < end) {
            const tag = reader.uint32();
            switch (tag >>> 3) {
                case 1:
                    if ((tag & 7) === 2) {
                        const end2 = reader.uint32() + reader.pos;
                        while (reader.pos < end2) {
                            message.perpetualsLiquidated.push(reader.uint32());
                        }
                    }
                    else {
                        message.perpetualsLiquidated.push(reader.uint32());
                    }
                    break;
                default:
                    reader.skipType(tag & 7);
                    break;
            }
        }
        return message;
    },
    fromPartial(object) {
        const message = createBaseSubaccountLiquidationInfo();
        message.perpetualsLiquidated = object.perpetualsLiquidated?.map(e => e) || [];
        return message;
    },
    fromAmino(object) {
        const message = createBaseSubaccountLiquidationInfo();
        message.perpetualsLiquidated = object.perpetuals_liquidated?.map(e => e) || [];
        return message;
    },
    toAmino(message) {
        const obj = {};
        if (message.perpetualsLiquidated) {
            obj.perpetuals_liquidated = message.perpetualsLiquidated.map(e => e);
        }
        else {
            obj.perpetuals_liquidated = message.perpetualsLiquidated;
        }
        return obj;
    },
    fromAminoMsg(object) {
        return SubaccountLiquidationInfo.fromAmino(object.value);
    },
    fromProtoMsg(message) {
        return SubaccountLiquidationInfo.decode(message.value);
    },
    toProto(message) {
        return SubaccountLiquidationInfo.encode(message).finish();
    },
    toProtoMsg(message) {
        return {
            typeUrl: "/klyraprotocol.clob.SubaccountLiquidationInfo",
            value: SubaccountLiquidationInfo.encode(message).finish()
        };
    }
};
GlobalDecoderRegistry.register(SubaccountLiquidationInfo.typeUrl, SubaccountLiquidationInfo);
function createBaseSubaccountOpenPositionInfo() {
    return {
        perpetualId: 0,
        subaccountsWithLongPosition: [],
        subaccountsWithShortPosition: []
    };
}
export const SubaccountOpenPositionInfo = {
    typeUrl: "/klyraprotocol.clob.SubaccountOpenPositionInfo",
    is(o) {
        return o && (o.$typeUrl === SubaccountOpenPositionInfo.typeUrl || typeof o.perpetualId === "number" && Array.isArray(o.subaccountsWithLongPosition) && (!o.subaccountsWithLongPosition.length || SubaccountId.is(o.subaccountsWithLongPosition[0])) && Array.isArray(o.subaccountsWithShortPosition) && (!o.subaccountsWithShortPosition.length || SubaccountId.is(o.subaccountsWithShortPosition[0])));
    },
    isSDK(o) {
        return o && (o.$typeUrl === SubaccountOpenPositionInfo.typeUrl || typeof o.perpetual_id === "number" && Array.isArray(o.subaccounts_with_long_position) && (!o.subaccounts_with_long_position.length || SubaccountId.isSDK(o.subaccounts_with_long_position[0])) && Array.isArray(o.subaccounts_with_short_position) && (!o.subaccounts_with_short_position.length || SubaccountId.isSDK(o.subaccounts_with_short_position[0])));
    },
    isAmino(o) {
        return o && (o.$typeUrl === SubaccountOpenPositionInfo.typeUrl || typeof o.perpetual_id === "number" && Array.isArray(o.subaccounts_with_long_position) && (!o.subaccounts_with_long_position.length || SubaccountId.isAmino(o.subaccounts_with_long_position[0])) && Array.isArray(o.subaccounts_with_short_position) && (!o.subaccounts_with_short_position.length || SubaccountId.isAmino(o.subaccounts_with_short_position[0])));
    },
    encode(message, writer = BinaryWriter.create()) {
        if (message.perpetualId !== 0) {
            writer.uint32(8).uint32(message.perpetualId);
        }
        for (const v of message.subaccountsWithLongPosition) {
            SubaccountId.encode(v, writer.uint32(18).fork()).ldelim();
        }
        for (const v of message.subaccountsWithShortPosition) {
            SubaccountId.encode(v, writer.uint32(26).fork()).ldelim();
        }
        return writer;
    },
    decode(input, length) {
        const reader = input instanceof BinaryReader ? input : new BinaryReader(input);
        let end = length === undefined ? reader.len : reader.pos + length;
        const message = createBaseSubaccountOpenPositionInfo();
        while (reader.pos < end) {
            const tag = reader.uint32();
            switch (tag >>> 3) {
                case 1:
                    message.perpetualId = reader.uint32();
                    break;
                case 2:
                    message.subaccountsWithLongPosition.push(SubaccountId.decode(reader, reader.uint32()));
                    break;
                case 3:
                    message.subaccountsWithShortPosition.push(SubaccountId.decode(reader, reader.uint32()));
                    break;
                default:
                    reader.skipType(tag & 7);
                    break;
            }
        }
        return message;
    },
    fromPartial(object) {
        const message = createBaseSubaccountOpenPositionInfo();
        message.perpetualId = object.perpetualId ?? 0;
        message.subaccountsWithLongPosition = object.subaccountsWithLongPosition?.map(e => SubaccountId.fromPartial(e)) || [];
        message.subaccountsWithShortPosition = object.subaccountsWithShortPosition?.map(e => SubaccountId.fromPartial(e)) || [];
        return message;
    },
    fromAmino(object) {
        const message = createBaseSubaccountOpenPositionInfo();
        if (object.perpetual_id !== undefined && object.perpetual_id !== null) {
            message.perpetualId = object.perpetual_id;
        }
        message.subaccountsWithLongPosition = object.subaccounts_with_long_position?.map(e => SubaccountId.fromAmino(e)) || [];
        message.subaccountsWithShortPosition = object.subaccounts_with_short_position?.map(e => SubaccountId.fromAmino(e)) || [];
        return message;
    },
    toAmino(message) {
        const obj = {};
        obj.perpetual_id = message.perpetualId === 0 ? undefined : message.perpetualId;
        if (message.subaccountsWithLongPosition) {
            obj.subaccounts_with_long_position = message.subaccountsWithLongPosition.map(e => e ? SubaccountId.toAmino(e) : undefined);
        }
        else {
            obj.subaccounts_with_long_position = message.subaccountsWithLongPosition;
        }
        if (message.subaccountsWithShortPosition) {
            obj.subaccounts_with_short_position = message.subaccountsWithShortPosition.map(e => e ? SubaccountId.toAmino(e) : undefined);
        }
        else {
            obj.subaccounts_with_short_position = message.subaccountsWithShortPosition;
        }
        return obj;
    },
    fromAminoMsg(object) {
        return SubaccountOpenPositionInfo.fromAmino(object.value);
    },
    fromProtoMsg(message) {
        return SubaccountOpenPositionInfo.decode(message.value);
    },
    toProto(message) {
        return SubaccountOpenPositionInfo.encode(message).finish();
    },
    toProtoMsg(message) {
        return {
            typeUrl: "/klyraprotocol.clob.SubaccountOpenPositionInfo",
            value: SubaccountOpenPositionInfo.encode(message).finish()
        };
    }
};
GlobalDecoderRegistry.register(SubaccountOpenPositionInfo.typeUrl, SubaccountOpenPositionInfo);
