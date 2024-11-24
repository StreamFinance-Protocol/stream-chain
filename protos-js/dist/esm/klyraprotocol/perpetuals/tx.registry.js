import { MsgAddPremiumVotes, MsgCreatePerpetual, MsgSetLiquidityTier, MsgUpdatePerpetualParams, MsgUpdateParams } from "./tx";
export const registry = [["/klyraprotocol.perpetuals.MsgAddPremiumVotes", MsgAddPremiumVotes], ["/klyraprotocol.perpetuals.MsgCreatePerpetual", MsgCreatePerpetual], ["/klyraprotocol.perpetuals.MsgSetLiquidityTier", MsgSetLiquidityTier], ["/klyraprotocol.perpetuals.MsgUpdatePerpetualParams", MsgUpdatePerpetualParams], ["/klyraprotocol.perpetuals.MsgUpdateParams", MsgUpdateParams]];
export const load = (protoRegistry) => {
    registry.forEach(([typeUrl, mod]) => {
        protoRegistry.register(typeUrl, mod);
    });
};
export const MessageComposer = {
    encoded: {
        addPremiumVotes(value) {
            return {
                typeUrl: "/klyraprotocol.perpetuals.MsgAddPremiumVotes",
                value: MsgAddPremiumVotes.encode(value).finish()
            };
        },
        createPerpetual(value) {
            return {
                typeUrl: "/klyraprotocol.perpetuals.MsgCreatePerpetual",
                value: MsgCreatePerpetual.encode(value).finish()
            };
        },
        setLiquidityTier(value) {
            return {
                typeUrl: "/klyraprotocol.perpetuals.MsgSetLiquidityTier",
                value: MsgSetLiquidityTier.encode(value).finish()
            };
        },
        updatePerpetualParams(value) {
            return {
                typeUrl: "/klyraprotocol.perpetuals.MsgUpdatePerpetualParams",
                value: MsgUpdatePerpetualParams.encode(value).finish()
            };
        },
        updateParams(value) {
            return {
                typeUrl: "/klyraprotocol.perpetuals.MsgUpdateParams",
                value: MsgUpdateParams.encode(value).finish()
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
                value: MsgAddPremiumVotes.fromPartial(value)
            };
        },
        createPerpetual(value) {
            return {
                typeUrl: "/klyraprotocol.perpetuals.MsgCreatePerpetual",
                value: MsgCreatePerpetual.fromPartial(value)
            };
        },
        setLiquidityTier(value) {
            return {
                typeUrl: "/klyraprotocol.perpetuals.MsgSetLiquidityTier",
                value: MsgSetLiquidityTier.fromPartial(value)
            };
        },
        updatePerpetualParams(value) {
            return {
                typeUrl: "/klyraprotocol.perpetuals.MsgUpdatePerpetualParams",
                value: MsgUpdatePerpetualParams.fromPartial(value)
            };
        },
        updateParams(value) {
            return {
                typeUrl: "/klyraprotocol.perpetuals.MsgUpdateParams",
                value: MsgUpdateParams.fromPartial(value)
            };
        }
    }
};
