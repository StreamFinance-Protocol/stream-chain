"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.AminoConverter = void 0;
//@ts-nocheck
const tx_1 = require("./tx");
exports.AminoConverter = {
    "/klyraprotocol.perpetuals.MsgAddPremiumVotes": {
        aminoType: "/klyraprotocol.perpetuals.MsgAddPremiumVotes",
        toAmino: tx_1.MsgAddPremiumVotes.toAmino,
        fromAmino: tx_1.MsgAddPremiumVotes.fromAmino
    },
    "/klyraprotocol.perpetuals.MsgCreatePerpetual": {
        aminoType: "/klyraprotocol.perpetuals.MsgCreatePerpetual",
        toAmino: tx_1.MsgCreatePerpetual.toAmino,
        fromAmino: tx_1.MsgCreatePerpetual.fromAmino
    },
    "/klyraprotocol.perpetuals.MsgSetLiquidityTier": {
        aminoType: "/klyraprotocol.perpetuals.MsgSetLiquidityTier",
        toAmino: tx_1.MsgSetLiquidityTier.toAmino,
        fromAmino: tx_1.MsgSetLiquidityTier.fromAmino
    },
    "/klyraprotocol.perpetuals.MsgUpdatePerpetualParams": {
        aminoType: "/klyraprotocol.perpetuals.MsgUpdatePerpetualParams",
        toAmino: tx_1.MsgUpdatePerpetualParams.toAmino,
        fromAmino: tx_1.MsgUpdatePerpetualParams.fromAmino
    },
    "/klyraprotocol.perpetuals.MsgUpdateParams": {
        aminoType: "/klyraprotocol.perpetuals.MsgUpdateParams",
        toAmino: tx_1.MsgUpdateParams.toAmino,
        fromAmino: tx_1.MsgUpdateParams.fromAmino
    }
};
