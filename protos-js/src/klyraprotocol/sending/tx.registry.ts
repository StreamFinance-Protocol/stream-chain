//@ts-nocheck
import { MsgDepositToSubaccount, MsgWithdrawFromSubaccount, MsgSendFromModuleToAccount } from "./transfer";
import { GeneratedType, Registry } from "@cosmjs/proto-signing";
import { MsgCreateTransfer } from "./tx";
export const registry: ReadonlyArray<[string, GeneratedType]> = [["/klyraprotocol.sending.MsgCreateTransfer", MsgCreateTransfer], ["/klyraprotocol.sending.MsgDepositToSubaccount", MsgDepositToSubaccount], ["/klyraprotocol.sending.MsgWithdrawFromSubaccount", MsgWithdrawFromSubaccount], ["/klyraprotocol.sending.MsgSendFromModuleToAccount", MsgSendFromModuleToAccount]];
export const load = (protoRegistry: Registry) => {
  registry.forEach(([typeUrl, mod]) => {
    protoRegistry.register(typeUrl, mod);
  });
};
export const MessageComposer = {
  encoded: {
    createTransfer(value: MsgCreateTransfer) {
      return {
        typeUrl: "/klyraprotocol.sending.MsgCreateTransfer",
        value: MsgCreateTransfer.encode(value).finish()
      };
    },
    depositToSubaccount(value: MsgDepositToSubaccount) {
      return {
        typeUrl: "/klyraprotocol.sending.MsgDepositToSubaccount",
        value: MsgDepositToSubaccount.encode(value).finish()
      };
    },
    withdrawFromSubaccount(value: MsgWithdrawFromSubaccount) {
      return {
        typeUrl: "/klyraprotocol.sending.MsgWithdrawFromSubaccount",
        value: MsgWithdrawFromSubaccount.encode(value).finish()
      };
    },
    sendFromModuleToAccount(value: MsgSendFromModuleToAccount) {
      return {
        typeUrl: "/klyraprotocol.sending.MsgSendFromModuleToAccount",
        value: MsgSendFromModuleToAccount.encode(value).finish()
      };
    }
  },
  withTypeUrl: {
    createTransfer(value: MsgCreateTransfer) {
      return {
        typeUrl: "/klyraprotocol.sending.MsgCreateTransfer",
        value
      };
    },
    depositToSubaccount(value: MsgDepositToSubaccount) {
      return {
        typeUrl: "/klyraprotocol.sending.MsgDepositToSubaccount",
        value
      };
    },
    withdrawFromSubaccount(value: MsgWithdrawFromSubaccount) {
      return {
        typeUrl: "/klyraprotocol.sending.MsgWithdrawFromSubaccount",
        value
      };
    },
    sendFromModuleToAccount(value: MsgSendFromModuleToAccount) {
      return {
        typeUrl: "/klyraprotocol.sending.MsgSendFromModuleToAccount",
        value
      };
    }
  },
  fromPartial: {
    createTransfer(value: MsgCreateTransfer) {
      return {
        typeUrl: "/klyraprotocol.sending.MsgCreateTransfer",
        value: MsgCreateTransfer.fromPartial(value)
      };
    },
    depositToSubaccount(value: MsgDepositToSubaccount) {
      return {
        typeUrl: "/klyraprotocol.sending.MsgDepositToSubaccount",
        value: MsgDepositToSubaccount.fromPartial(value)
      };
    },
    withdrawFromSubaccount(value: MsgWithdrawFromSubaccount) {
      return {
        typeUrl: "/klyraprotocol.sending.MsgWithdrawFromSubaccount",
        value: MsgWithdrawFromSubaccount.fromPartial(value)
      };
    },
    sendFromModuleToAccount(value: MsgSendFromModuleToAccount) {
      return {
        typeUrl: "/klyraprotocol.sending.MsgSendFromModuleToAccount",
        value: MsgSendFromModuleToAccount.fromPartial(value)
      };
    }
  }
};