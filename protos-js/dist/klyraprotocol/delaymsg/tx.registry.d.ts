import { GeneratedType, Registry } from "@cosmjs/proto-signing";
import { MsgDelayMessage } from "./tx";
export declare const registry: ReadonlyArray<[string, GeneratedType]>;
export declare const load: (protoRegistry: Registry) => void;
export declare const MessageComposer: {
    encoded: {
        delayMessage(value: MsgDelayMessage): {
            typeUrl: string;
            value: Uint8Array<ArrayBufferLike>;
        };
    };
    withTypeUrl: {
        delayMessage(value: MsgDelayMessage): {
            typeUrl: string;
            value: MsgDelayMessage;
        };
    };
    fromPartial: {
        delayMessage(value: MsgDelayMessage): {
            typeUrl: string;
            value: MsgDelayMessage;
        };
    };
};
