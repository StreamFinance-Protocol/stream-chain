import { GeneratedType, Registry } from "@cosmjs/proto-signing";
import { MsgAddPremiumVotes, MsgCreatePerpetual, MsgSetLiquidityTier, MsgUpdatePerpetualParams, MsgUpdateParams } from "./tx";
export declare const registry: ReadonlyArray<[string, GeneratedType]>;
export declare const load: (protoRegistry: Registry) => void;
export declare const MessageComposer: {
    encoded: {
        addPremiumVotes(value: MsgAddPremiumVotes): {
            typeUrl: string;
            value: Uint8Array<ArrayBufferLike>;
        };
        createPerpetual(value: MsgCreatePerpetual): {
            typeUrl: string;
            value: Uint8Array<ArrayBufferLike>;
        };
        setLiquidityTier(value: MsgSetLiquidityTier): {
            typeUrl: string;
            value: Uint8Array<ArrayBufferLike>;
        };
        updatePerpetualParams(value: MsgUpdatePerpetualParams): {
            typeUrl: string;
            value: Uint8Array<ArrayBufferLike>;
        };
        updateParams(value: MsgUpdateParams): {
            typeUrl: string;
            value: Uint8Array<ArrayBufferLike>;
        };
    };
    withTypeUrl: {
        addPremiumVotes(value: MsgAddPremiumVotes): {
            typeUrl: string;
            value: MsgAddPremiumVotes;
        };
        createPerpetual(value: MsgCreatePerpetual): {
            typeUrl: string;
            value: MsgCreatePerpetual;
        };
        setLiquidityTier(value: MsgSetLiquidityTier): {
            typeUrl: string;
            value: MsgSetLiquidityTier;
        };
        updatePerpetualParams(value: MsgUpdatePerpetualParams): {
            typeUrl: string;
            value: MsgUpdatePerpetualParams;
        };
        updateParams(value: MsgUpdateParams): {
            typeUrl: string;
            value: MsgUpdateParams;
        };
    };
    fromPartial: {
        addPremiumVotes(value: MsgAddPremiumVotes): {
            typeUrl: string;
            value: MsgAddPremiumVotes;
        };
        createPerpetual(value: MsgCreatePerpetual): {
            typeUrl: string;
            value: MsgCreatePerpetual;
        };
        setLiquidityTier(value: MsgSetLiquidityTier): {
            typeUrl: string;
            value: MsgSetLiquidityTier;
        };
        updatePerpetualParams(value: MsgUpdatePerpetualParams): {
            typeUrl: string;
            value: MsgUpdatePerpetualParams;
        };
        updateParams(value: MsgUpdateParams): {
            typeUrl: string;
            value: MsgUpdateParams;
        };
    };
};
