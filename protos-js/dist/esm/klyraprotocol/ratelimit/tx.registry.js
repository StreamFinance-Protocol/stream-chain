import { MsgSetLimitParams } from "./tx";
export const registry = [["/klyraprotocol.ratelimit.MsgSetLimitParams", MsgSetLimitParams]];
export const load = (protoRegistry) => {
    registry.forEach(([typeUrl, mod]) => {
        protoRegistry.register(typeUrl, mod);
    });
};
export const MessageComposer = {
    encoded: {
        setLimitParams(value) {
            return {
                typeUrl: "/klyraprotocol.ratelimit.MsgSetLimitParams",
                value: MsgSetLimitParams.encode(value).finish()
            };
        }
    },
    withTypeUrl: {
        setLimitParams(value) {
            return {
                typeUrl: "/klyraprotocol.ratelimit.MsgSetLimitParams",
                value
            };
        }
    },
    fromPartial: {
        setLimitParams(value) {
            return {
                typeUrl: "/klyraprotocol.ratelimit.MsgSetLimitParams",
                value: MsgSetLimitParams.fromPartial(value)
            };
        }
    }
};
