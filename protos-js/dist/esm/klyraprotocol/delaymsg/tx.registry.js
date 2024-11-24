import { MsgDelayMessage } from "./tx";
export const registry = [["/klyraprotocol.delaymsg.MsgDelayMessage", MsgDelayMessage]];
export const load = (protoRegistry) => {
    registry.forEach(([typeUrl, mod]) => {
        protoRegistry.register(typeUrl, mod);
    });
};
export const MessageComposer = {
    encoded: {
        delayMessage(value) {
            return {
                typeUrl: "/klyraprotocol.delaymsg.MsgDelayMessage",
                value: MsgDelayMessage.encode(value).finish()
            };
        }
    },
    withTypeUrl: {
        delayMessage(value) {
            return {
                typeUrl: "/klyraprotocol.delaymsg.MsgDelayMessage",
                value
            };
        }
    },
    fromPartial: {
        delayMessage(value) {
            return {
                typeUrl: "/klyraprotocol.delaymsg.MsgDelayMessage",
                value: MsgDelayMessage.fromPartial(value)
            };
        }
    }
};
