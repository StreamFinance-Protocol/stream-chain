"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.MessageComposer = exports.load = exports.registry = void 0;
const tx_1 = require("./tx");
exports.registry = [["/klyraprotocol.delaymsg.MsgDelayMessage", tx_1.MsgDelayMessage]];
const load = (protoRegistry) => {
    exports.registry.forEach(([typeUrl, mod]) => {
        protoRegistry.register(typeUrl, mod);
    });
};
exports.load = load;
exports.MessageComposer = {
    encoded: {
        delayMessage(value) {
            return {
                typeUrl: "/klyraprotocol.delaymsg.MsgDelayMessage",
                value: tx_1.MsgDelayMessage.encode(value).finish()
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
                value: tx_1.MsgDelayMessage.fromPartial(value)
            };
        }
    }
};
