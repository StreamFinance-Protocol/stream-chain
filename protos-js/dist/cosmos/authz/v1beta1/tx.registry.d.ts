import { GeneratedType, Registry } from "@cosmjs/proto-signing";
import { MsgGrant, MsgExec, MsgRevoke } from "./tx";
export declare const registry: ReadonlyArray<[string, GeneratedType]>;
export declare const load: (protoRegistry: Registry) => void;
export declare const MessageComposer: {
    encoded: {
        grant(value: MsgGrant): {
            typeUrl: string;
            value: Uint8Array<ArrayBufferLike>;
        };
        exec(value: MsgExec): {
            typeUrl: string;
            value: Uint8Array<ArrayBufferLike>;
        };
        revoke(value: MsgRevoke): {
            typeUrl: string;
            value: Uint8Array<ArrayBufferLike>;
        };
    };
    withTypeUrl: {
        grant(value: MsgGrant): {
            typeUrl: string;
            value: MsgGrant;
        };
        exec(value: MsgExec): {
            typeUrl: string;
            value: MsgExec;
        };
        revoke(value: MsgRevoke): {
            typeUrl: string;
            value: MsgRevoke;
        };
    };
    fromPartial: {
        grant(value: MsgGrant): {
            typeUrl: string;
            value: MsgGrant;
        };
        exec(value: MsgExec): {
            typeUrl: string;
            value: MsgExec;
        };
        revoke(value: MsgRevoke): {
            typeUrl: string;
            value: MsgRevoke;
        };
    };
};
