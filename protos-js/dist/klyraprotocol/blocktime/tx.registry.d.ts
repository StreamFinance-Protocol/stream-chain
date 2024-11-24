import { GeneratedType, Registry } from "@cosmjs/proto-signing";
import { MsgUpdateDowntimeParams } from "./tx";
export declare const registry: ReadonlyArray<[string, GeneratedType]>;
export declare const load: (protoRegistry: Registry) => void;
export declare const MessageComposer: {
    encoded: {
        updateDowntimeParams(value: MsgUpdateDowntimeParams): {
            typeUrl: string;
            value: Uint8Array<ArrayBufferLike>;
        };
    };
    withTypeUrl: {
        updateDowntimeParams(value: MsgUpdateDowntimeParams): {
            typeUrl: string;
            value: MsgUpdateDowntimeParams;
        };
    };
    fromPartial: {
        updateDowntimeParams(value: MsgUpdateDowntimeParams): {
            typeUrl: string;
            value: MsgUpdateDowntimeParams;
        };
    };
};
