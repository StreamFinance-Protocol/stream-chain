import { MsgClaimYieldForSubaccount } from "./tx";
export declare const AminoConverter: {
    "/klyraprotocol.subaccounts.MsgClaimYieldForSubaccount": {
        aminoType: string;
        toAmino: (message: MsgClaimYieldForSubaccount) => import("./tx").MsgClaimYieldForSubaccountAmino;
        fromAmino: (object: import("./tx").MsgClaimYieldForSubaccountAmino) => MsgClaimYieldForSubaccount;
    };
};
