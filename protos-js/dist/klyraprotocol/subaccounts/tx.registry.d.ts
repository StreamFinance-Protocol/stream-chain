import { GeneratedType, Registry } from "@cosmjs/proto-signing";
import { MsgClaimYieldForSubaccount } from "./tx";
export declare const registry: ReadonlyArray<[string, GeneratedType]>;
export declare const load: (protoRegistry: Registry) => void;
export declare const MessageComposer: {
    encoded: {
        claimYieldForSubaccount(value: MsgClaimYieldForSubaccount): {
            typeUrl: string;
            value: Uint8Array<ArrayBufferLike>;
        };
    };
    withTypeUrl: {
        claimYieldForSubaccount(value: MsgClaimYieldForSubaccount): {
            typeUrl: string;
            value: MsgClaimYieldForSubaccount;
        };
    };
    fromPartial: {
        claimYieldForSubaccount(value: MsgClaimYieldForSubaccount): {
            typeUrl: string;
            value: MsgClaimYieldForSubaccount;
        };
    };
};
