import { MsgDepositToSubaccount, MsgWithdrawFromSubaccount, MsgSendFromModuleToAccount } from "./transfer";
import { MsgCreateTransfer } from "./tx";
export declare const AminoConverter: {
    "/klyraprotocol.sending.MsgCreateTransfer": {
        aminoType: string;
        toAmino: (message: MsgCreateTransfer) => import("./tx").MsgCreateTransferAmino;
        fromAmino: (object: import("./tx").MsgCreateTransferAmino) => MsgCreateTransfer;
    };
    "/klyraprotocol.sending.MsgDepositToSubaccount": {
        aminoType: string;
        toAmino: (message: MsgDepositToSubaccount) => import("./transfer").MsgDepositToSubaccountAmino;
        fromAmino: (object: import("./transfer").MsgDepositToSubaccountAmino) => MsgDepositToSubaccount;
    };
    "/klyraprotocol.sending.MsgWithdrawFromSubaccount": {
        aminoType: string;
        toAmino: (message: MsgWithdrawFromSubaccount) => import("./transfer").MsgWithdrawFromSubaccountAmino;
        fromAmino: (object: import("./transfer").MsgWithdrawFromSubaccountAmino) => MsgWithdrawFromSubaccount;
    };
    "/klyraprotocol.sending.MsgSendFromModuleToAccount": {
        aminoType: string;
        toAmino: (message: MsgSendFromModuleToAccount) => import("./transfer").MsgSendFromModuleToAccountAmino;
        fromAmino: (object: import("./transfer").MsgSendFromModuleToAccountAmino) => MsgSendFromModuleToAccount;
    };
};
