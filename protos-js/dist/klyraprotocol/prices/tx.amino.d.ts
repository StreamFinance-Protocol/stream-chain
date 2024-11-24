import { MsgCreateOracleMarket, MsgUpdateMarketParam } from "./tx";
export declare const AminoConverter: {
    "/klyraprotocol.prices.MsgCreateOracleMarket": {
        aminoType: string;
        toAmino: (message: MsgCreateOracleMarket) => import("./tx").MsgCreateOracleMarketAmino;
        fromAmino: (object: import("./tx").MsgCreateOracleMarketAmino) => MsgCreateOracleMarket;
    };
    "/klyraprotocol.prices.MsgUpdateMarketParam": {
        aminoType: string;
        toAmino: (message: MsgUpdateMarketParam) => import("./tx").MsgUpdateMarketParamAmino;
        fromAmino: (object: import("./tx").MsgUpdateMarketParamAmino) => MsgUpdateMarketParam;
    };
};
