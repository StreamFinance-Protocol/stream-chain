import { MsgUpdatePerpetualFeeParams } from "./tx";
export declare const AminoConverter: {
    "/klyraprotocol.feetiers.MsgUpdatePerpetualFeeParams": {
        aminoType: string;
        toAmino: (message: MsgUpdatePerpetualFeeParams) => import("./tx").MsgUpdatePerpetualFeeParamsAmino;
        fromAmino: (object: import("./tx").MsgUpdatePerpetualFeeParamsAmino) => MsgUpdatePerpetualFeeParams;
    };
};
