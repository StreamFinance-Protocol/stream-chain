import { MsgUpdatePerpetualFeeParams } from "./tx";
export const registry = [["/klyraprotocol.feetiers.MsgUpdatePerpetualFeeParams", MsgUpdatePerpetualFeeParams]];
export const load = (protoRegistry) => {
    registry.forEach(([typeUrl, mod]) => {
        protoRegistry.register(typeUrl, mod);
    });
};
export const MessageComposer = {
    encoded: {
        updatePerpetualFeeParams(value) {
            return {
                typeUrl: "/klyraprotocol.feetiers.MsgUpdatePerpetualFeeParams",
                value: MsgUpdatePerpetualFeeParams.encode(value).finish()
            };
        }
    },
    withTypeUrl: {
        updatePerpetualFeeParams(value) {
            return {
                typeUrl: "/klyraprotocol.feetiers.MsgUpdatePerpetualFeeParams",
                value
            };
        }
    },
    fromPartial: {
        updatePerpetualFeeParams(value) {
            return {
                typeUrl: "/klyraprotocol.feetiers.MsgUpdatePerpetualFeeParams",
                value: MsgUpdatePerpetualFeeParams.fromPartial(value)
            };
        }
    }
};
