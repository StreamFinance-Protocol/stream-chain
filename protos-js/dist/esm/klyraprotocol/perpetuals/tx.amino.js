//@ts-nocheck
import { MsgAddPremiumVotes, MsgCreatePerpetual, MsgSetLiquidityTier, MsgUpdatePerpetualParams, MsgUpdateParams } from "./tx";
export const AminoConverter = {
    "/klyraprotocol.perpetuals.MsgAddPremiumVotes": {
        aminoType: "/klyraprotocol.perpetuals.MsgAddPremiumVotes",
        toAmino: MsgAddPremiumVotes.toAmino,
        fromAmino: MsgAddPremiumVotes.fromAmino
    },
    "/klyraprotocol.perpetuals.MsgCreatePerpetual": {
        aminoType: "/klyraprotocol.perpetuals.MsgCreatePerpetual",
        toAmino: MsgCreatePerpetual.toAmino,
        fromAmino: MsgCreatePerpetual.fromAmino
    },
    "/klyraprotocol.perpetuals.MsgSetLiquidityTier": {
        aminoType: "/klyraprotocol.perpetuals.MsgSetLiquidityTier",
        toAmino: MsgSetLiquidityTier.toAmino,
        fromAmino: MsgSetLiquidityTier.fromAmino
    },
    "/klyraprotocol.perpetuals.MsgUpdatePerpetualParams": {
        aminoType: "/klyraprotocol.perpetuals.MsgUpdatePerpetualParams",
        toAmino: MsgUpdatePerpetualParams.toAmino,
        fromAmino: MsgUpdatePerpetualParams.fromAmino
    },
    "/klyraprotocol.perpetuals.MsgUpdateParams": {
        aminoType: "/klyraprotocol.perpetuals.MsgUpdateParams",
        toAmino: MsgUpdateParams.toAmino,
        fromAmino: MsgUpdateParams.fromAmino
    }
};
