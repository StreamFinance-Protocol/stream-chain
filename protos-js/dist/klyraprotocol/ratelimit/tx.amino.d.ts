import { MsgSetLimitParams } from "./tx";
export declare const AminoConverter: {
    "/klyraprotocol.ratelimit.MsgSetLimitParams": {
        aminoType: string;
        toAmino: (message: MsgSetLimitParams) => import("./tx").MsgSetLimitParamsAmino;
        fromAmino: (object: import("./tx").MsgSetLimitParamsAmino) => MsgSetLimitParams;
    };
};
