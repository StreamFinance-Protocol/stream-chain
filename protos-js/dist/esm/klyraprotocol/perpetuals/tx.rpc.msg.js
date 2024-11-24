import { BinaryReader } from "../../binary";
import { MsgAddPremiumVotes, MsgAddPremiumVotesResponse, MsgCreatePerpetual, MsgCreatePerpetualResponse, MsgSetLiquidityTier, MsgSetLiquidityTierResponse, MsgUpdatePerpetualParams, MsgUpdatePerpetualParamsResponse, MsgUpdateParams, MsgUpdateParamsResponse } from "./tx";
export class MsgClientImpl {
    rpc;
    constructor(rpc) {
        this.rpc = rpc;
        this.addPremiumVotes = this.addPremiumVotes.bind(this);
        this.createPerpetual = this.createPerpetual.bind(this);
        this.setLiquidityTier = this.setLiquidityTier.bind(this);
        this.updatePerpetualParams = this.updatePerpetualParams.bind(this);
        this.updateParams = this.updateParams.bind(this);
    }
    addPremiumVotes(request) {
        const data = MsgAddPremiumVotes.encode(request).finish();
        const promise = this.rpc.request("klyraprotocol.perpetuals.Msg", "AddPremiumVotes", data);
        return promise.then(data => MsgAddPremiumVotesResponse.decode(new BinaryReader(data)));
    }
    createPerpetual(request) {
        const data = MsgCreatePerpetual.encode(request).finish();
        const promise = this.rpc.request("klyraprotocol.perpetuals.Msg", "CreatePerpetual", data);
        return promise.then(data => MsgCreatePerpetualResponse.decode(new BinaryReader(data)));
    }
    setLiquidityTier(request) {
        const data = MsgSetLiquidityTier.encode(request).finish();
        const promise = this.rpc.request("klyraprotocol.perpetuals.Msg", "SetLiquidityTier", data);
        return promise.then(data => MsgSetLiquidityTierResponse.decode(new BinaryReader(data)));
    }
    updatePerpetualParams(request) {
        const data = MsgUpdatePerpetualParams.encode(request).finish();
        const promise = this.rpc.request("klyraprotocol.perpetuals.Msg", "UpdatePerpetualParams", data);
        return promise.then(data => MsgUpdatePerpetualParamsResponse.decode(new BinaryReader(data)));
    }
    updateParams(request) {
        const data = MsgUpdateParams.encode(request).finish();
        const promise = this.rpc.request("klyraprotocol.perpetuals.Msg", "UpdateParams", data);
        return promise.then(data => MsgUpdateParamsResponse.decode(new BinaryReader(data)));
    }
}
export const createClientImpl = (rpc) => {
    return new MsgClientImpl(rpc);
};
