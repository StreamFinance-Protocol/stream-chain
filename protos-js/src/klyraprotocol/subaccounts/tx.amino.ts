//@ts-nocheck
import { MsgClaimYieldForSubaccount } from "./tx";
export const AminoConverter = {
  "/klyraprotocol.subaccounts.MsgClaimYieldForSubaccount": {
    aminoType: "/klyraprotocol.subaccounts.MsgClaimYieldForSubaccount",
    toAmino: MsgClaimYieldForSubaccount.toAmino,
    fromAmino: MsgClaimYieldForSubaccount.fromAmino
  }
};