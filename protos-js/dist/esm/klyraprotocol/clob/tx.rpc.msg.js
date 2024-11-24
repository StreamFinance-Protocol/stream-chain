import { BinaryReader } from "../../binary";
import { MsgProposedOperations, MsgProposedOperationsResponse, MsgPlaceOrder, MsgPlaceOrderResponse, MsgCancelOrder, MsgCancelOrderResponse, MsgBatchCancel, MsgBatchCancelResponse, MsgCreateClobPair, MsgCreateClobPairResponse, MsgUpdateClobPair, MsgUpdateClobPairResponse, MsgUpdateEquityTierLimitConfiguration, MsgUpdateEquityTierLimitConfigurationResponse, MsgUpdateBlockRateLimitConfiguration, MsgUpdateBlockRateLimitConfigurationResponse, MsgUpdateLiquidationsConfig, MsgUpdateLiquidationsConfigResponse } from "./tx";
export class MsgClientImpl {
    rpc;
    constructor(rpc) {
        this.rpc = rpc;
        this.proposedOperations = this.proposedOperations.bind(this);
        this.placeOrder = this.placeOrder.bind(this);
        this.cancelOrder = this.cancelOrder.bind(this);
        this.batchCancel = this.batchCancel.bind(this);
        this.createClobPair = this.createClobPair.bind(this);
        this.updateClobPair = this.updateClobPair.bind(this);
        this.updateEquityTierLimitConfiguration = this.updateEquityTierLimitConfiguration.bind(this);
        this.updateBlockRateLimitConfiguration = this.updateBlockRateLimitConfiguration.bind(this);
        this.updateLiquidationsConfig = this.updateLiquidationsConfig.bind(this);
    }
    proposedOperations(request) {
        const data = MsgProposedOperations.encode(request).finish();
        const promise = this.rpc.request("klyraprotocol.clob.Msg", "ProposedOperations", data);
        return promise.then(data => MsgProposedOperationsResponse.decode(new BinaryReader(data)));
    }
    placeOrder(request) {
        const data = MsgPlaceOrder.encode(request).finish();
        const promise = this.rpc.request("klyraprotocol.clob.Msg", "PlaceOrder", data);
        return promise.then(data => MsgPlaceOrderResponse.decode(new BinaryReader(data)));
    }
    cancelOrder(request) {
        const data = MsgCancelOrder.encode(request).finish();
        const promise = this.rpc.request("klyraprotocol.clob.Msg", "CancelOrder", data);
        return promise.then(data => MsgCancelOrderResponse.decode(new BinaryReader(data)));
    }
    batchCancel(request) {
        const data = MsgBatchCancel.encode(request).finish();
        const promise = this.rpc.request("klyraprotocol.clob.Msg", "BatchCancel", data);
        return promise.then(data => MsgBatchCancelResponse.decode(new BinaryReader(data)));
    }
    createClobPair(request) {
        const data = MsgCreateClobPair.encode(request).finish();
        const promise = this.rpc.request("klyraprotocol.clob.Msg", "CreateClobPair", data);
        return promise.then(data => MsgCreateClobPairResponse.decode(new BinaryReader(data)));
    }
    updateClobPair(request) {
        const data = MsgUpdateClobPair.encode(request).finish();
        const promise = this.rpc.request("klyraprotocol.clob.Msg", "UpdateClobPair", data);
        return promise.then(data => MsgUpdateClobPairResponse.decode(new BinaryReader(data)));
    }
    updateEquityTierLimitConfiguration(request) {
        const data = MsgUpdateEquityTierLimitConfiguration.encode(request).finish();
        const promise = this.rpc.request("klyraprotocol.clob.Msg", "UpdateEquityTierLimitConfiguration", data);
        return promise.then(data => MsgUpdateEquityTierLimitConfigurationResponse.decode(new BinaryReader(data)));
    }
    updateBlockRateLimitConfiguration(request) {
        const data = MsgUpdateBlockRateLimitConfiguration.encode(request).finish();
        const promise = this.rpc.request("klyraprotocol.clob.Msg", "UpdateBlockRateLimitConfiguration", data);
        return promise.then(data => MsgUpdateBlockRateLimitConfigurationResponse.decode(new BinaryReader(data)));
    }
    updateLiquidationsConfig(request) {
        const data = MsgUpdateLiquidationsConfig.encode(request).finish();
        const promise = this.rpc.request("klyraprotocol.clob.Msg", "UpdateLiquidationsConfig", data);
        return promise.then(data => MsgUpdateLiquidationsConfigResponse.decode(new BinaryReader(data)));
    }
}
export const createClientImpl = (rpc) => {
    return new MsgClientImpl(rpc);
};
