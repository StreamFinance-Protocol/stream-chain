import { GeneratedType, Registry } from "@cosmjs/proto-signing";
import { MsgSetLimitParams } from "./tx";
export declare const registry: ReadonlyArray<[string, GeneratedType]>;
export declare const load: (protoRegistry: Registry) => void;
export declare const MessageComposer: {
    encoded: {
        setLimitParams(value: MsgSetLimitParams): {
            typeUrl: string;
            value: Uint8Array<ArrayBufferLike>;
        };
    };
    withTypeUrl: {
        setLimitParams(value: MsgSetLimitParams): {
            typeUrl: string;
            value: MsgSetLimitParams;
        };
    };
    fromPartial: {
        setLimitParams(value: MsgSetLimitParams): {
            typeUrl: string;
            value: MsgSetLimitParams;
        };
    };
};
