import { MsgDelayMessage } from "./tx";
export declare const AminoConverter: {
    "/klyraprotocol.delaymsg.MsgDelayMessage": {
        aminoType: string;
        toAmino: (message: MsgDelayMessage) => import("./tx").MsgDelayMessageAmino;
        fromAmino: (object: import("./tx").MsgDelayMessageAmino) => MsgDelayMessage;
    };
};
