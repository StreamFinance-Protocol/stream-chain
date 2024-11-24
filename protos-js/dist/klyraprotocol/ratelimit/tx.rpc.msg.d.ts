import { Rpc } from "../../helpers";
import { MsgSetLimitParams, MsgSetLimitParamsResponse } from "./tx";
/** Msg defines the Msg service. */
export interface Msg {
    /** SetLimitParams sets a `LimitParams` object in state. */
    setLimitParams(request: MsgSetLimitParams): Promise<MsgSetLimitParamsResponse>;
}
export declare class MsgClientImpl implements Msg {
    private readonly rpc;
    constructor(rpc: Rpc);
    setLimitParams(request: MsgSetLimitParams): Promise<MsgSetLimitParamsResponse>;
}
export declare const createClientImpl: (rpc: Rpc) => MsgClientImpl;
