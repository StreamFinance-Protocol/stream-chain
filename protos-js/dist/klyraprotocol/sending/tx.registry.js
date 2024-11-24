"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.MessageComposer = exports.load = exports.registry = void 0;
//@ts-nocheck
const transfer_1 = require("./transfer");
const tx_1 = require("./tx");
exports.registry = [["/klyraprotocol.sending.MsgCreateTransfer", tx_1.MsgCreateTransfer], ["/klyraprotocol.sending.MsgDepositToSubaccount", transfer_1.MsgDepositToSubaccount], ["/klyraprotocol.sending.MsgWithdrawFromSubaccount", transfer_1.MsgWithdrawFromSubaccount], ["/klyraprotocol.sending.MsgSendFromModuleToAccount", transfer_1.MsgSendFromModuleToAccount]];
const load = (protoRegistry) => {
    exports.registry.forEach(([typeUrl, mod]) => {
        protoRegistry.register(typeUrl, mod);
    });
};
exports.load = load;
exports.MessageComposer = {
    encoded: {
        createTransfer(value) {
            return {
                typeUrl: "/klyraprotocol.sending.MsgCreateTransfer",
                value: tx_1.MsgCreateTransfer.encode(value).finish()
            };
        },
        depositToSubaccount(value) {
            return {
                typeUrl: "/klyraprotocol.sending.MsgDepositToSubaccount",
                value: transfer_1.MsgDepositToSubaccount.encode(value).finish()
            };
        },
        withdrawFromSubaccount(value) {
            return {
                typeUrl: "/klyraprotocol.sending.MsgWithdrawFromSubaccount",
                value: transfer_1.MsgWithdrawFromSubaccount.encode(value).finish()
            };
        },
        sendFromModuleToAccount(value) {
            return {
                typeUrl: "/klyraprotocol.sending.MsgSendFromModuleToAccount",
                value: transfer_1.MsgSendFromModuleToAccount.encode(value).finish()
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
                value: tx_1.MsgCreateTransfer.fromPartial(value)
            };
        },
        depositToSubaccount(value) {
            return {
                typeUrl: "/klyraprotocol.sending.MsgDepositToSubaccount",
                value: transfer_1.MsgDepositToSubaccount.fromPartial(value)
            };
        },
        withdrawFromSubaccount(value) {
            return {
                typeUrl: "/klyraprotocol.sending.MsgWithdrawFromSubaccount",
                value: transfer_1.MsgWithdrawFromSubaccount.fromPartial(value)
            };
        },
        sendFromModuleToAccount(value) {
            return {
                typeUrl: "/klyraprotocol.sending.MsgSendFromModuleToAccount",
                value: transfer_1.MsgSendFromModuleToAccount.fromPartial(value)
            };
        }
    }
};
