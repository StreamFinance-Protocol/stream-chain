"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.MessageComposer = exports.load = exports.registry = void 0;
const tx_1 = require("./tx");
exports.registry = [["/klyraprotocol.perpetuals.MsgAddPremiumVotes", tx_1.MsgAddPremiumVotes], ["/klyraprotocol.perpetuals.MsgCreatePerpetual", tx_1.MsgCreatePerpetual], ["/klyraprotocol.perpetuals.MsgSetLiquidityTier", tx_1.MsgSetLiquidityTier], ["/klyraprotocol.perpetuals.MsgUpdatePerpetualParams", tx_1.MsgUpdatePerpetualParams], ["/klyraprotocol.perpetuals.MsgUpdateParams", tx_1.MsgUpdateParams]];
const load = (protoRegistry) => {
    exports.registry.forEach(([typeUrl, mod]) => {
        protoRegistry.register(typeUrl, mod);
    });
};
exports.load = load;
exports.MessageComposer = {
    encoded: {
        addPremiumVotes(value) {
            return {
                typeUrl: "/klyraprotocol.perpetuals.MsgAddPremiumVotes",
                value: tx_1.MsgAddPremiumVotes.encode(value).finish()
            };
        },
        createPerpetual(value) {
            return {
                typeUrl: "/klyraprotocol.perpetuals.MsgCreatePerpetual",
                value: tx_1.MsgCreatePerpetual.encode(value).finish()
            };
        },
        setLiquidityTier(value) {
            return {
                typeUrl: "/klyraprotocol.perpetuals.MsgSetLiquidityTier",
                value: tx_1.MsgSetLiquidityTier.encode(value).finish()
            };
        },
        updatePerpetualParams(value) {
            return {
                typeUrl: "/klyraprotocol.perpetuals.MsgUpdatePerpetualParams",
                value: tx_1.MsgUpdatePerpetualParams.encode(value).finish()
            };
        },
        updateParams(value) {
            return {
                typeUrl: "/klyraprotocol.perpetuals.MsgUpdateParams",
                value: tx_1.MsgUpdateParams.encode(value).finish()
            };
        }
    },
    withTypeUrl: {
        addPremiumVotes(value) {
            return {
                typeUrl: "/klyraprotocol.perpetuals.MsgAddPremiumVotes",
                value
            };
        },
        createPerpetual(value) {
            return {
                typeUrl: "/klyraprotocol.perpetuals.MsgCreatePerpetual",
                value
            };
        },
        setLiquidityTier(value) {
            return {
                typeUrl: "/klyraprotocol.perpetuals.MsgSetLiquidityTier",
                value
            };
        },
        updatePerpetualParams(value) {
            return {
                typeUrl: "/klyraprotocol.perpetuals.MsgUpdatePerpetualParams",
                value
            };
        },
        updateParams(value) {
            return {
                typeUrl: "/klyraprotocol.perpetuals.MsgUpdateParams",
                value
            };
        }
    },
    fromPartial: {
        addPremiumVotes(value) {
            return {
                typeUrl: "/klyraprotocol.perpetuals.MsgAddPremiumVotes",
                value: tx_1.MsgAddPremiumVotes.fromPartial(value)
            };
        },
        createPerpetual(value) {
            return {
                typeUrl: "/klyraprotocol.perpetuals.MsgCreatePerpetual",
                value: tx_1.MsgCreatePerpetual.fromPartial(value)
            };
        },
        setLiquidityTier(value) {
            return {
                typeUrl: "/klyraprotocol.perpetuals.MsgSetLiquidityTier",
                value: tx_1.MsgSetLiquidityTier.fromPartial(value)
            };
        },
        updatePerpetualParams(value) {
            return {
                typeUrl: "/klyraprotocol.perpetuals.MsgUpdatePerpetualParams",
                value: tx_1.MsgUpdatePerpetualParams.fromPartial(value)
            };
        },
        updateParams(value) {
            return {
                typeUrl: "/klyraprotocol.perpetuals.MsgUpdateParams",
                value: tx_1.MsgUpdateParams.fromPartial(value)
            };
        }
    }
};
