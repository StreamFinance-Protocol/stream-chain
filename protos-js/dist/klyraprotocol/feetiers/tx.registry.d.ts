import { GeneratedType, Registry } from "@cosmjs/proto-signing";
import { MsgUpdatePerpetualFeeParams } from "./tx";
export declare const registry: ReadonlyArray<[string, GeneratedType]>;
export declare const load: (protoRegistry: Registry) => void;
export declare const MessageComposer: {
    encoded: {
        updatePerpetualFeeParams(value: MsgUpdatePerpetualFeeParams): {
            typeUrl: string;
            value: Uint8Array<ArrayBufferLike>;
        };
    };
    withTypeUrl: {
        updatePerpetualFeeParams(value: MsgUpdatePerpetualFeeParams): {
            typeUrl: string;
            value: MsgUpdatePerpetualFeeParams;
        };
    };
    fromPartial: {
        updatePerpetualFeeParams(value: MsgUpdatePerpetualFeeParams): {
            typeUrl: string;
            value: MsgUpdatePerpetualFeeParams;
        };
    };
};
