import { Rpc } from "../../helpers";
import * as _m0 from "protobufjs/minimal";
import { MsgAddPremiumVotes, MsgAddPremiumVotesResponse, MsgCreatePerpetual, MsgCreatePerpetualResponse, MsgSetLiquidityTier, MsgSetLiquidityTierResponse, MsgSetCollateralPool, MsgSetCollateralPoolResponse, MsgUpdatePerpetualParams, MsgUpdatePerpetualParamsResponse, MsgUpdateParams, MsgUpdateParamsResponse } from "./tx";
/** Msg defines the Msg service. */

export interface Msg {
  /**
   * AddPremiumVotes add new samples of the funding premiums to the
   * application.
   */
  addPremiumVotes(request: MsgAddPremiumVotes): Promise<MsgAddPremiumVotesResponse>;
  /** CreatePerpetual creates a new perpetual object. */

  createPerpetual(request: MsgCreatePerpetual): Promise<MsgCreatePerpetualResponse>;
  /**
   * SetLiquidityTier creates an liquidity tier if the ID doesn't exist, and
   * updates the existing liquidity tier otherwise.
   */

  setLiquidityTier(request: MsgSetLiquidityTier): Promise<MsgSetLiquidityTierResponse>;
  /**
   * SetCollateralPool creates an collateral pool if the ID doesn't exist, and
   * updates the existing collateral pool otherwise.
   */

  setCollateralPool(request: MsgSetCollateralPool): Promise<MsgSetCollateralPoolResponse>;
  /** UpdatePerpetualParams updates the parameters of a perpetual market. */

  updatePerpetualParams(request: MsgUpdatePerpetualParams): Promise<MsgUpdatePerpetualParamsResponse>;
  /** UpdateParams updates the parameters of perpetuals module. */

  updateParams(request: MsgUpdateParams): Promise<MsgUpdateParamsResponse>;
}
export class MsgClientImpl implements Msg {
  private readonly rpc: Rpc;

  constructor(rpc: Rpc) {
    this.rpc = rpc;
    this.addPremiumVotes = this.addPremiumVotes.bind(this);
    this.createPerpetual = this.createPerpetual.bind(this);
    this.setLiquidityTier = this.setLiquidityTier.bind(this);
    this.setCollateralPool = this.setCollateralPool.bind(this);
    this.updatePerpetualParams = this.updatePerpetualParams.bind(this);
    this.updateParams = this.updateParams.bind(this);
  }

  addPremiumVotes(request: MsgAddPremiumVotes): Promise<MsgAddPremiumVotesResponse> {
    const data = MsgAddPremiumVotes.encode(request).finish();
    const promise = this.rpc.request("klyraprotocol.perpetuals.Msg", "AddPremiumVotes", data);
    return promise.then(data => MsgAddPremiumVotesResponse.decode(new _m0.Reader(data)));
  }

  createPerpetual(request: MsgCreatePerpetual): Promise<MsgCreatePerpetualResponse> {
    const data = MsgCreatePerpetual.encode(request).finish();
    const promise = this.rpc.request("klyraprotocol.perpetuals.Msg", "CreatePerpetual", data);
    return promise.then(data => MsgCreatePerpetualResponse.decode(new _m0.Reader(data)));
  }

  setLiquidityTier(request: MsgSetLiquidityTier): Promise<MsgSetLiquidityTierResponse> {
    const data = MsgSetLiquidityTier.encode(request).finish();
    const promise = this.rpc.request("klyraprotocol.perpetuals.Msg", "SetLiquidityTier", data);
    return promise.then(data => MsgSetLiquidityTierResponse.decode(new _m0.Reader(data)));
  }

  setCollateralPool(request: MsgSetCollateralPool): Promise<MsgSetCollateralPoolResponse> {
    const data = MsgSetCollateralPool.encode(request).finish();
    const promise = this.rpc.request("klyraprotocol.perpetuals.Msg", "SetCollateralPool", data);
    return promise.then(data => MsgSetCollateralPoolResponse.decode(new _m0.Reader(data)));
  }

  updatePerpetualParams(request: MsgUpdatePerpetualParams): Promise<MsgUpdatePerpetualParamsResponse> {
    const data = MsgUpdatePerpetualParams.encode(request).finish();
    const promise = this.rpc.request("klyraprotocol.perpetuals.Msg", "UpdatePerpetualParams", data);
    return promise.then(data => MsgUpdatePerpetualParamsResponse.decode(new _m0.Reader(data)));
  }

  updateParams(request: MsgUpdateParams): Promise<MsgUpdateParamsResponse> {
    const data = MsgUpdateParams.encode(request).finish();
    const promise = this.rpc.request("klyraprotocol.perpetuals.Msg", "UpdateParams", data);
    return promise.then(data => MsgUpdateParamsResponse.decode(new _m0.Reader(data)));
  }

}