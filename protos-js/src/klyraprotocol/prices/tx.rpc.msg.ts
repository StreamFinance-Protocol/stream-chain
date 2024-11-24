//@ts-nocheck
import { Rpc } from "../../helpers";
import { BinaryReader } from "../../binary";
import { MsgCreateOracleMarket, MsgCreateOracleMarketResponse, MsgUpdateMarketParam, MsgUpdateMarketParamResponse } from "./tx";
/** Msg defines the Msg service. */
export interface Msg {
  /** CreateOracleMarket creates a new oracle market. */
  createOracleMarket(request: MsgCreateOracleMarket): Promise<MsgCreateOracleMarketResponse>;
  /**
   * UpdateMarketParams allows governance to update the parameters of an
   * oracle market.
   */
  updateMarketParam(request: MsgUpdateMarketParam): Promise<MsgUpdateMarketParamResponse>;
}
export class MsgClientImpl implements Msg {
  private readonly rpc: Rpc;
  constructor(rpc: Rpc) {
    this.rpc = rpc;
    this.createOracleMarket = this.createOracleMarket.bind(this);
    this.updateMarketParam = this.updateMarketParam.bind(this);
  }
  createOracleMarket(request: MsgCreateOracleMarket): Promise<MsgCreateOracleMarketResponse> {
    const data = MsgCreateOracleMarket.encode(request).finish();
    const promise = this.rpc.request("klyraprotocol.prices.Msg", "CreateOracleMarket", data);
    return promise.then(data => MsgCreateOracleMarketResponse.decode(new BinaryReader(data)));
  }
  updateMarketParam(request: MsgUpdateMarketParam): Promise<MsgUpdateMarketParamResponse> {
    const data = MsgUpdateMarketParam.encode(request).finish();
    const promise = this.rpc.request("klyraprotocol.prices.Msg", "UpdateMarketParam", data);
    return promise.then(data => MsgUpdateMarketParamResponse.decode(new BinaryReader(data)));
  }
}
export const createClientImpl = (rpc: Rpc) => {
  return new MsgClientImpl(rpc);
};