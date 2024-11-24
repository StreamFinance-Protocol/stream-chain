//@ts-nocheck
import { MsgDepositToSubaccount, MsgWithdrawFromSubaccount, MsgSendFromModuleToAccount } from "./transfer";
import { MsgCreateTransfer } from "./tx";
export const AminoConverter = {
  "/klyraprotocol.sending.MsgCreateTransfer": {
    aminoType: "/klyraprotocol.sending.MsgCreateTransfer",
    toAmino: MsgCreateTransfer.toAmino,
    fromAmino: MsgCreateTransfer.fromAmino
  },
  "/klyraprotocol.sending.MsgDepositToSubaccount": {
    aminoType: "/klyraprotocol.sending.MsgDepositToSubaccount",
    toAmino: MsgDepositToSubaccount.toAmino,
    fromAmino: MsgDepositToSubaccount.fromAmino
  },
  "/klyraprotocol.sending.MsgWithdrawFromSubaccount": {
    aminoType: "/klyraprotocol.sending.MsgWithdrawFromSubaccount",
    toAmino: MsgWithdrawFromSubaccount.toAmino,
    fromAmino: MsgWithdrawFromSubaccount.fromAmino
  },
  "/klyraprotocol.sending.MsgSendFromModuleToAccount": {
    aminoType: "/klyraprotocol.sending.MsgSendFromModuleToAccount",
    toAmino: MsgSendFromModuleToAccount.toAmino,
    fromAmino: MsgSendFromModuleToAccount.fromAmino
  }
};