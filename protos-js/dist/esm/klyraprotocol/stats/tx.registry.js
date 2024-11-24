import { MsgUpdateParams } from "./tx";
export const registry = [["/klyraprotocol.stats.MsgUpdateParams", MsgUpdateParams]];
export const load = (protoRegistry) => {
    registry.forEach(([typeUrl, mod]) => {
        protoRegistry.register(typeUrl, mod);
    });
};
export const MessageComposer = {
    encoded: {
        updateParams(value) {
            return {
                typeUrl: "/klyraprotocol.stats.MsgUpdateParams",
                value: MsgUpdateParams.encode(value).finish()
            };
        }
    },
    withTypeUrl: {
        updateParams(value) {
            return {
                typeUrl: "/klyraprotocol.stats.MsgUpdateParams",
                value
            };
        }
    },
    fromPartial: {
        updateParams(value) {
            return {
                typeUrl: "/klyraprotocol.stats.MsgUpdateParams",
                value: MsgUpdateParams.fromPartial(value)
            };
        }
    }
};
