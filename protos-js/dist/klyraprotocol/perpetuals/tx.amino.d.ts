import { MsgAddPremiumVotes, MsgCreatePerpetual, MsgSetLiquidityTier, MsgUpdatePerpetualParams, MsgUpdateParams } from "./tx";
export declare const AminoConverter: {
    "/klyraprotocol.perpetuals.MsgAddPremiumVotes": {
        aminoType: string;
        toAmino: (message: MsgAddPremiumVotes) => import("./tx").MsgAddPremiumVotesAmino;
        fromAmino: (object: import("./tx").MsgAddPremiumVotesAmino) => MsgAddPremiumVotes;
    };
    "/klyraprotocol.perpetuals.MsgCreatePerpetual": {
        aminoType: string;
        toAmino: (message: MsgCreatePerpetual) => import("./tx").MsgCreatePerpetualAmino;
        fromAmino: (object: import("./tx").MsgCreatePerpetualAmino) => MsgCreatePerpetual;
    };
    "/klyraprotocol.perpetuals.MsgSetLiquidityTier": {
        aminoType: string;
        toAmino: (message: MsgSetLiquidityTier) => import("./tx").MsgSetLiquidityTierAmino;
        fromAmino: (object: import("./tx").MsgSetLiquidityTierAmino) => MsgSetLiquidityTier;
    };
    "/klyraprotocol.perpetuals.MsgUpdatePerpetualParams": {
        aminoType: string;
        toAmino: (message: MsgUpdatePerpetualParams) => import("./tx").MsgUpdatePerpetualParamsAmino;
        fromAmino: (object: import("./tx").MsgUpdatePerpetualParamsAmino) => MsgUpdatePerpetualParams;
    };
    "/klyraprotocol.perpetuals.MsgUpdateParams": {
        aminoType: string;
        toAmino: (message: MsgUpdateParams) => import("./tx").MsgUpdateParamsAmino;
        fromAmino: (object: import("./tx").MsgUpdateParamsAmino) => MsgUpdateParams;
    };
};
