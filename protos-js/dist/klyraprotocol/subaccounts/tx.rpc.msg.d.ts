import { Rpc } from "../../helpers";
import { MsgClaimYieldForSubaccount, MsgClaimYieldForSubaccountResponse } from "./tx";
/** Msg defines the Msg service. */
export interface Msg {
    /**
     * ClaimYieldForSubaccount claims the yield for the provided subaccount and
     * persists it to state.
     */
    claimYieldForSubaccount(request: MsgClaimYieldForSubaccount): Promise<MsgClaimYieldForSubaccountResponse>;
}
export declare class MsgClientImpl implements Msg {
    private readonly rpc;
    constructor(rpc: Rpc);
    claimYieldForSubaccount(request: MsgClaimYieldForSubaccount): Promise<MsgClaimYieldForSubaccountResponse>;
}
export declare const createClientImpl: (rpc: Rpc) => MsgClientImpl;
