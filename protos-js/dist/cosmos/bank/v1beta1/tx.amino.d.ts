import { MsgSend, MsgMultiSend, MsgUpdateParams, MsgSetSendEnabled } from "./tx";
export declare const AminoConverter: {
    "/cosmos.bank.v1beta1.MsgSend": {
        aminoType: string;
        toAmino: (message: MsgSend) => import("./tx").MsgSendAmino;
        fromAmino: (object: import("./tx").MsgSendAmino) => MsgSend;
    };
    "/cosmos.bank.v1beta1.MsgMultiSend": {
        aminoType: string;
        toAmino: (message: MsgMultiSend) => import("./tx").MsgMultiSendAmino;
        fromAmino: (object: import("./tx").MsgMultiSendAmino) => MsgMultiSend;
    };
    "/cosmos.bank.v1beta1.MsgUpdateParams": {
        aminoType: string;
        toAmino: (message: MsgUpdateParams) => import("./tx").MsgUpdateParamsAmino;
        fromAmino: (object: import("./tx").MsgUpdateParamsAmino) => MsgUpdateParams;
    };
    "/cosmos.bank.v1beta1.MsgSetSendEnabled": {
        aminoType: string;
        toAmino: (message: MsgSetSendEnabled) => import("./tx").MsgSetSendEnabledAmino;
        fromAmino: (object: import("./tx").MsgSetSendEnabledAmino) => MsgSetSendEnabled;
    };
};
