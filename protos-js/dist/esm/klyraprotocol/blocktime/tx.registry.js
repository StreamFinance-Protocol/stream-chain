import { MsgUpdateDowntimeParams } from "./tx";
export const registry = [["/klyraprotocol.blocktime.MsgUpdateDowntimeParams", MsgUpdateDowntimeParams]];
export const load = (protoRegistry) => {
    registry.forEach(([typeUrl, mod]) => {
        protoRegistry.register(typeUrl, mod);
    });
};
export const MessageComposer = {
    encoded: {
        updateDowntimeParams(value) {
            return {
                typeUrl: "/klyraprotocol.blocktime.MsgUpdateDowntimeParams",
                value: MsgUpdateDowntimeParams.encode(value).finish()
            };
        }
    },
    withTypeUrl: {
        updateDowntimeParams(value) {
            return {
                typeUrl: "/klyraprotocol.blocktime.MsgUpdateDowntimeParams",
                value
            };
        }
    },
    fromPartial: {
        updateDowntimeParams(value) {
            return {
                typeUrl: "/klyraprotocol.blocktime.MsgUpdateDowntimeParams",
                value: MsgUpdateDowntimeParams.fromPartial(value)
            };
        }
    }
};
