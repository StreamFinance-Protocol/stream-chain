import { GeneratedType, Registry } from "@cosmjs/proto-signing";
import { MsgSlashValidator } from "./tx";
export declare const registry: ReadonlyArray<[string, GeneratedType]>;
export declare const load: (protoRegistry: Registry) => void;
export declare const MessageComposer: {
    encoded: {
        slashValidator(value: MsgSlashValidator): {
            typeUrl: string;
            value: Uint8Array<ArrayBufferLike>;
        };
    };
    withTypeUrl: {
        slashValidator(value: MsgSlashValidator): {
            typeUrl: string;
            value: MsgSlashValidator;
        };
    };
    fromPartial: {
        slashValidator(value: MsgSlashValidator): {
            typeUrl: string;
            value: MsgSlashValidator;
        };
    };
};
