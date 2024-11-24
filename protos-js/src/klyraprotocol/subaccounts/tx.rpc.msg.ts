//@ts-nocheck
import { Rpc } from "../../helpers";
import { BinaryReader } from "../../binary";
import { MsgClaimYieldForSubaccount, MsgClaimYieldForSubaccountResponse } from "./tx";
/** Msg defines the Msg service. */
export interface Msg {
  /**
   * ClaimYieldForSubaccount claims the yield for the provided subaccount and
   * persists it to state.
   */
  claimYieldForSubaccount(request: MsgClaimYieldForSubaccount): Promise<MsgClaimYieldForSubaccountResponse>;
}
export class MsgClientImpl implements Msg {
  private readonly rpc: Rpc;
  constructor(rpc: Rpc) {
    this.rpc = rpc;
    this.claimYieldForSubaccount = this.claimYieldForSubaccount.bind(this);
  }
  claimYieldForSubaccount(request: MsgClaimYieldForSubaccount): Promise<MsgClaimYieldForSubaccountResponse> {
    const data = MsgClaimYieldForSubaccount.encode(request).finish();
    const promise = this.rpc.request("klyraprotocol.subaccounts.Msg", "ClaimYieldForSubaccount", data);
    return promise.then(data => MsgClaimYieldForSubaccountResponse.decode(new BinaryReader(data)));
  }
}
export const createClientImpl = (rpc: Rpc) => {
  return new MsgClientImpl(rpc);
};