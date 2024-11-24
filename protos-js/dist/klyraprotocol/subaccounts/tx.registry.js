"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.MessageComposer = exports.load = exports.registry = void 0;
const tx_1 = require("./tx");
exports.registry = [["/klyraprotocol.subaccounts.MsgClaimYieldForSubaccount", tx_1.MsgClaimYieldForSubaccount]];
const load = (protoRegistry) => {
    exports.registry.forEach(([typeUrl, mod]) => {
        protoRegistry.register(typeUrl, mod);
    });
};
exports.load = load;
exports.MessageComposer = {
    encoded: {
        claimYieldForSubaccount(value) {
            return {
                typeUrl: "/klyraprotocol.subaccounts.MsgClaimYieldForSubaccount",
                value: tx_1.MsgClaimYieldForSubaccount.encode(value).finish()
            };
        }
    },
    withTypeUrl: {
        claimYieldForSubaccount(value) {
            return {
                typeUrl: "/klyraprotocol.subaccounts.MsgClaimYieldForSubaccount",
                value
            };
        }
    },
    fromPartial: {
        claimYieldForSubaccount(value) {
            return {
                typeUrl: "/klyraprotocol.subaccounts.MsgClaimYieldForSubaccount",
                value: tx_1.MsgClaimYieldForSubaccount.fromPartial(value)
            };
        }
    }
};
