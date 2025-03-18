import { Rpc } from "../../helpers";
import * as _m0 from "protobufjs/minimal";
import { MsgClaimYieldsForSubaccount, MsgClaimYieldsForSubaccountResponse } from "./tx";
/** Msg defines the Msg service. */

export interface Msg {
  /**
   * ClaimYieldsForSubaccount claims the yields for the provided subaccount and
   * persists it to state.
   */
  claimYieldsForSubaccount(request: MsgClaimYieldsForSubaccount): Promise<MsgClaimYieldsForSubaccountResponse>;
}
export class MsgClientImpl implements Msg {
  private readonly rpc: Rpc;

  constructor(rpc: Rpc) {
    this.rpc = rpc;
    this.claimYieldsForSubaccount = this.claimYieldsForSubaccount.bind(this);
  }

  claimYieldsForSubaccount(request: MsgClaimYieldsForSubaccount): Promise<MsgClaimYieldsForSubaccountResponse> {
    const data = MsgClaimYieldsForSubaccount.encode(request).finish();
    const promise = this.rpc.request("klyraprotocol.subaccounts.Msg", "ClaimYieldsForSubaccount", data);
    return promise.then(data => MsgClaimYieldsForSubaccountResponse.decode(new _m0.Reader(data)));
  }

}