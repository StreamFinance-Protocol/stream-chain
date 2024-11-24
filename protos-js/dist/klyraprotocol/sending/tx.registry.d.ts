import { MsgDepositToSubaccount, MsgWithdrawFromSubaccount, MsgSendFromModuleToAccount } from "./transfer";
import { GeneratedType, Registry } from "@cosmjs/proto-signing";
import { MsgCreateTransfer } from "./tx";
export declare const registry: ReadonlyArray<[string, GeneratedType]>;
export declare const load: (protoRegistry: Registry) => void;
export declare const MessageComposer: {
    encoded: {
        createTransfer(value: MsgCreateTransfer): {
            typeUrl: string;
            value: Uint8Array<ArrayBufferLike>;
        };
        depositToSubaccount(value: MsgDepositToSubaccount): {
            typeUrl: string;
            value: Uint8Array<ArrayBufferLike>;
        };
        withdrawFromSubaccount(value: MsgWithdrawFromSubaccount): {
            typeUrl: string;
            value: Uint8Array<ArrayBufferLike>;
        };
        sendFromModuleToAccount(value: MsgSendFromModuleToAccount): {
            typeUrl: string;
            value: Uint8Array<ArrayBufferLike>;
        };
    };
    withTypeUrl: {
        createTransfer(value: MsgCreateTransfer): {
            typeUrl: string;
            value: MsgCreateTransfer;
        };
        depositToSubaccount(value: MsgDepositToSubaccount): {
            typeUrl: string;
            value: MsgDepositToSubaccount;
        };
        withdrawFromSubaccount(value: MsgWithdrawFromSubaccount): {
            typeUrl: string;
            value: MsgWithdrawFromSubaccount;
        };
        sendFromModuleToAccount(value: MsgSendFromModuleToAccount): {
            typeUrl: string;
            value: MsgSendFromModuleToAccount;
        };
    };
    fromPartial: {
        createTransfer(value: MsgCreateTransfer): {
            typeUrl: string;
            value: MsgCreateTransfer;
        };
        depositToSubaccount(value: MsgDepositToSubaccount): {
            typeUrl: string;
            value: MsgDepositToSubaccount;
        };
        withdrawFromSubaccount(value: MsgWithdrawFromSubaccount): {
            typeUrl: string;
            value: MsgWithdrawFromSubaccount;
        };
        sendFromModuleToAccount(value: MsgSendFromModuleToAccount): {
            typeUrl: string;
            value: MsgSendFromModuleToAccount;
        };
    };
};
