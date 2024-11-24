"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.MessageComposer = exports.load = exports.registry = void 0;
const tx_1 = require("./tx");
exports.registry = [["/klyraprotocol.blocktime.MsgUpdateDowntimeParams", tx_1.MsgUpdateDowntimeParams]];
const load = (protoRegistry) => {
    exports.registry.forEach(([typeUrl, mod]) => {
        protoRegistry.register(typeUrl, mod);
    });
};
exports.load = load;
exports.MessageComposer = {
    encoded: {
        updateDowntimeParams(value) {
            return {
                typeUrl: "/klyraprotocol.blocktime.MsgUpdateDowntimeParams",
                value: tx_1.MsgUpdateDowntimeParams.encode(value).finish()
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
                value: tx_1.MsgUpdateDowntimeParams.fromPartial(value)
            };
        }
    }
};
