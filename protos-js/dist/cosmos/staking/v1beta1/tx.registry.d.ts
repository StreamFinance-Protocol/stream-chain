import { GeneratedType, Registry } from "@cosmjs/proto-signing";
import { MsgCreateValidator, MsgEditValidator, MsgDelegate, MsgBeginRedelegate, MsgUndelegate, MsgCancelUnbondingDelegation, MsgUpdateParams } from "./tx";
export declare const registry: ReadonlyArray<[string, GeneratedType]>;
export declare const load: (protoRegistry: Registry) => void;
export declare const MessageComposer: {
    encoded: {
        createValidator(value: MsgCreateValidator): {
            typeUrl: string;
            value: Uint8Array<ArrayBufferLike>;
        };
        editValidator(value: MsgEditValidator): {
            typeUrl: string;
            value: Uint8Array<ArrayBufferLike>;
        };
        delegate(value: MsgDelegate): {
            typeUrl: string;
            value: Uint8Array<ArrayBufferLike>;
        };
        beginRedelegate(value: MsgBeginRedelegate): {
            typeUrl: string;
            value: Uint8Array<ArrayBufferLike>;
        };
        undelegate(value: MsgUndelegate): {
            typeUrl: string;
            value: Uint8Array<ArrayBufferLike>;
        };
        cancelUnbondingDelegation(value: MsgCancelUnbondingDelegation): {
            typeUrl: string;
            value: Uint8Array<ArrayBufferLike>;
        };
        updateParams(value: MsgUpdateParams): {
            typeUrl: string;
            value: Uint8Array<ArrayBufferLike>;
        };
    };
    withTypeUrl: {
        createValidator(value: MsgCreateValidator): {
            typeUrl: string;
            value: MsgCreateValidator;
        };
        editValidator(value: MsgEditValidator): {
            typeUrl: string;
            value: MsgEditValidator;
        };
        delegate(value: MsgDelegate): {
            typeUrl: string;
            value: MsgDelegate;
        };
        beginRedelegate(value: MsgBeginRedelegate): {
            typeUrl: string;
            value: MsgBeginRedelegate;
        };
        undelegate(value: MsgUndelegate): {
            typeUrl: string;
            value: MsgUndelegate;
        };
        cancelUnbondingDelegation(value: MsgCancelUnbondingDelegation): {
            typeUrl: string;
            value: MsgCancelUnbondingDelegation;
        };
        updateParams(value: MsgUpdateParams): {
            typeUrl: string;
            value: MsgUpdateParams;
        };
    };
    fromPartial: {
        createValidator(value: MsgCreateValidator): {
            typeUrl: string;
            value: MsgCreateValidator;
        };
        editValidator(value: MsgEditValidator): {
            typeUrl: string;
            value: MsgEditValidator;
        };
        delegate(value: MsgDelegate): {
            typeUrl: string;
            value: MsgDelegate;
        };
        beginRedelegate(value: MsgBeginRedelegate): {
            typeUrl: string;
            value: MsgBeginRedelegate;
        };
        undelegate(value: MsgUndelegate): {
            typeUrl: string;
            value: MsgUndelegate;
        };
        cancelUnbondingDelegation(value: MsgCancelUnbondingDelegation): {
            typeUrl: string;
            value: MsgCancelUnbondingDelegation;
        };
        updateParams(value: MsgUpdateParams): {
            typeUrl: string;
            value: MsgUpdateParams;
        };
    };
};
