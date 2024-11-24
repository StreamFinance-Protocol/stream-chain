import { GeneratedType, Registry } from "@cosmjs/proto-signing";
import { MsgCreateOracleMarket, MsgUpdateMarketParam } from "./tx";
export declare const registry: ReadonlyArray<[string, GeneratedType]>;
export declare const load: (protoRegistry: Registry) => void;
export declare const MessageComposer: {
    encoded: {
        createOracleMarket(value: MsgCreateOracleMarket): {
            typeUrl: string;
            value: Uint8Array<ArrayBufferLike>;
        };
        updateMarketParam(value: MsgUpdateMarketParam): {
            typeUrl: string;
            value: Uint8Array<ArrayBufferLike>;
        };
    };
    withTypeUrl: {
        createOracleMarket(value: MsgCreateOracleMarket): {
            typeUrl: string;
            value: MsgCreateOracleMarket;
        };
        updateMarketParam(value: MsgUpdateMarketParam): {
            typeUrl: string;
            value: MsgUpdateMarketParam;
        };
    };
    fromPartial: {
        createOracleMarket(value: MsgCreateOracleMarket): {
            typeUrl: string;
            value: MsgCreateOracleMarket;
        };
        updateMarketParam(value: MsgUpdateMarketParam): {
            typeUrl: string;
            value: MsgUpdateMarketParam;
        };
    };
};
