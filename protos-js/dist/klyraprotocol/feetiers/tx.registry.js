"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.MessageComposer = exports.load = exports.registry = void 0;
const tx_1 = require("./tx");
exports.registry = [["/klyraprotocol.feetiers.MsgUpdatePerpetualFeeParams", tx_1.MsgUpdatePerpetualFeeParams]];
const load = (protoRegistry) => {
    exports.registry.forEach(([typeUrl, mod]) => {
        protoRegistry.register(typeUrl, mod);
    });
};
exports.load = load;
exports.MessageComposer = {
    encoded: {
        updatePerpetualFeeParams(value) {
            return {
                typeUrl: "/klyraprotocol.feetiers.MsgUpdatePerpetualFeeParams",
                value: tx_1.MsgUpdatePerpetualFeeParams.encode(value).finish()
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
                value: tx_1.MsgUpdatePerpetualFeeParams.fromPartial(value)
            };
        }
    }
};
