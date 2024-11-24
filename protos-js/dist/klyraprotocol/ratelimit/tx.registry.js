"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.MessageComposer = exports.load = exports.registry = void 0;
const tx_1 = require("./tx");
exports.registry = [["/klyraprotocol.ratelimit.MsgSetLimitParams", tx_1.MsgSetLimitParams]];
const load = (protoRegistry) => {
    exports.registry.forEach(([typeUrl, mod]) => {
        protoRegistry.register(typeUrl, mod);
    });
};
exports.load = load;
exports.MessageComposer = {
    encoded: {
        setLimitParams(value) {
            return {
                typeUrl: "/klyraprotocol.ratelimit.MsgSetLimitParams",
                value: tx_1.MsgSetLimitParams.encode(value).finish()
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
                value: tx_1.MsgSetLimitParams.fromPartial(value)
            };
        }
    }
};
