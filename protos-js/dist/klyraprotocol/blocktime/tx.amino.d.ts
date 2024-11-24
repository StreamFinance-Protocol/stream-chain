import { MsgUpdateDowntimeParams } from "./tx";
export declare const AminoConverter: {
    "/klyraprotocol.blocktime.MsgUpdateDowntimeParams": {
        aminoType: string;
        toAmino: (message: MsgUpdateDowntimeParams) => import("./tx").MsgUpdateDowntimeParamsAmino;
        fromAmino: (object: import("./tx").MsgUpdateDowntimeParamsAmino) => MsgUpdateDowntimeParams;
    };
};
