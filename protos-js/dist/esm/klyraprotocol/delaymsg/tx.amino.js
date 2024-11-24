//@ts-nocheck
import { MsgDelayMessage } from "./tx";
export const AminoConverter = {
    "/klyraprotocol.delaymsg.MsgDelayMessage": {
        aminoType: "/klyraprotocol.delaymsg.MsgDelayMessage",
        toAmino: MsgDelayMessage.toAmino,
        fromAmino: MsgDelayMessage.fromAmino
    }
};
