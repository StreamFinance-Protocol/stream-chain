import { GeneratedType, Registry } from "@cosmjs/proto-signing";
import { MsgSend, MsgMultiSend, MsgUpdateParams, MsgSetSendEnabled } from "./tx";
export declare const registry: ReadonlyArray<[string, GeneratedType]>;
export declare const load: (protoRegistry: Registry) => void;
export declare const MessageComposer: {
    encoded: {
        send(value: MsgSend): {
            typeUrl: string;
            value: Uint8Array<ArrayBufferLike>;
        };
        multiSend(value: MsgMultiSend): {
            typeUrl: string;
            value: Uint8Array<ArrayBufferLike>;
        };
        updateParams(value: MsgUpdateParams): {
            typeUrl: string;
            value: Uint8Array<ArrayBufferLike>;
        };
        setSendEnabled(value: MsgSetSendEnabled): {
            typeUrl: string;
            value: Uint8Array<ArrayBufferLike>;
        };
    };
    withTypeUrl: {
        send(value: MsgSend): {
            typeUrl: string;
            value: MsgSend;
        };
        multiSend(value: MsgMultiSend): {
            typeUrl: string;
            value: MsgMultiSend;
        };
        updateParams(value: MsgUpdateParams): {
            typeUrl: string;
            value: MsgUpdateParams;
        };
        setSendEnabled(value: MsgSetSendEnabled): {
            typeUrl: string;
            value: MsgSetSendEnabled;
        };
    };
    fromPartial: {
        send(value: MsgSend): {
            typeUrl: string;
            value: MsgSend;
        };
        multiSend(value: MsgMultiSend): {
            typeUrl: string;
            value: MsgMultiSend;
        };
        updateParams(value: MsgUpdateParams): {
            typeUrl: string;
            value: MsgUpdateParams;
        };
        setSendEnabled(value: MsgSetSendEnabled): {
            typeUrl: string;
            value: MsgSetSendEnabled;
        };
    };
};
