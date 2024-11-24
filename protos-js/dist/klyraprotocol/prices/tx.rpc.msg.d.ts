import { Rpc } from "../../helpers";
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
export declare class MsgClientImpl implements Msg {
    private readonly rpc;
    constructor(rpc: Rpc);
    createOracleMarket(request: MsgCreateOracleMarket): Promise<MsgCreateOracleMarketResponse>;
    updateMarketParam(request: MsgUpdateMarketParam): Promise<MsgUpdateMarketParamResponse>;
}
export declare const createClientImpl: (rpc: Rpc) => MsgClientImpl;
