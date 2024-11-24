//@ts-nocheck
import { MsgDepositToSubaccount, MsgWithdrawFromSubaccount, MsgSendFromModuleToAccount } from "./transfer";
import { MsgCreateTransfer } from "./tx";
export const registry = [["/klyraprotocol.sending.MsgCreateTransfer", MsgCreateTransfer], ["/klyraprotocol.sending.MsgDepositToSubaccount", MsgDepositToSubaccount], ["/klyraprotocol.sending.MsgWithdrawFromSubaccount", MsgWithdrawFromSubaccount], ["/klyraprotocol.sending.MsgSendFromModuleToAccount", MsgSendFromModuleToAccount]];
export const load = (protoRegistry) => {
    registry.forEach(([typeUrl, mod]) => {
        protoRegistry.register(typeUrl, mod);
    });
};
export const MessageComposer = {
    encoded: {
        createTransfer(value) {
            return {
                typeUrl: "/klyraprotocol.sending.MsgCreateTransfer",
                value: MsgCreateTransfer.encode(value).finish()
            };
        },
        depositToSubaccount(value) {
            return {
                typeUrl: "/klyraprotocol.sending.MsgDepositToSubaccount",
                value: MsgDepositToSubaccount.encode(value).finish()
            };
        },
        withdrawFromSubaccount(value) {
            return {
                typeUrl: "/klyraprotocol.sending.MsgWithdrawFromSubaccount",
                value: MsgWithdrawFromSubaccount.encode(value).finish()
            };
        },
        sendFromModuleToAccount(value) {
            return {
                typeUrl: "/klyraprotocol.sending.MsgSendFromModuleToAccount",
                value: MsgSendFromModuleToAccount.encode(value).finish()
            };
        }
    },
    withTypeUrl: {
        createTransfer(value) {
            return {
                typeUrl: "/klyraprotocol.sending.MsgCreateTransfer",
                value
            };
        },
        depositToSubaccount(value) {
            return {
                typeUrl: "/klyraprotocol.sending.MsgDepositToSubaccount",
                value
            };
        },
        withdrawFromSubaccount(value) {
            return {
                typeUrl: "/klyraprotocol.sending.MsgWithdrawFromSubaccount",
                value
            };
        },
        sendFromModuleToAccount(value) {
            return {
                typeUrl: "/klyraprotocol.sending.MsgSendFromModuleToAccount",
                value
            };
        }
    },
    fromPartial: {
        createTransfer(value) {
            return {
                typeUrl: "/klyraprotocol.sending.MsgCreateTransfer",
                value: MsgCreateTransfer.fromPartial(value)
            };
        },
        depositToSubaccount(value) {
            return {
                typeUrl: "/klyraprotocol.sending.MsgDepositToSubaccount",
                value: MsgDepositToSubaccount.fromPartial(value)
            };
        },
        withdrawFromSubaccount(value) {
            return {
                typeUrl: "/klyraprotocol.sending.MsgWithdrawFromSubaccount",
                value: MsgWithdrawFromSubaccount.fromPartial(value)
            };
        },
        sendFromModuleToAccount(value) {
            return {
                typeUrl: "/klyraprotocol.sending.MsgSendFromModuleToAccount",
                value: MsgSendFromModuleToAccount.fromPartial(value)
            };
        }
    }
};
