//@ts-nocheck
import { MsgCreateOracleMarket, MsgUpdateMarketParam } from "./tx";
export const AminoConverter = {
  "/klyraprotocol.prices.MsgCreateOracleMarket": {
    aminoType: "/klyraprotocol.prices.MsgCreateOracleMarket",
    toAmino: MsgCreateOracleMarket.toAmino,
    fromAmino: MsgCreateOracleMarket.fromAmino
  },
  "/klyraprotocol.prices.MsgUpdateMarketParam": {
    aminoType: "/klyraprotocol.prices.MsgUpdateMarketParam",
    toAmino: MsgUpdateMarketParam.toAmino,
    fromAmino: MsgUpdateMarketParam.fromAmino
  }
};