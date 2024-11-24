"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.createClientImpl = exports.MsgClientImpl = void 0;
const binary_1 = require("../../binary");
const tx_1 = require("./tx");
class MsgClientImpl {
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
        const data = tx_1.MsgProposedOperations.encode(request).finish();
        const promise = this.rpc.request("klyraprotocol.clob.Msg", "ProposedOperations", data);
        return promise.then(data => tx_1.MsgProposedOperationsResponse.decode(new binary_1.BinaryReader(data)));
    }
    placeOrder(request) {
        const data = tx_1.MsgPlaceOrder.encode(request).finish();
        const promise = this.rpc.request("klyraprotocol.clob.Msg", "PlaceOrder", data);
        return promise.then(data => tx_1.MsgPlaceOrderResponse.decode(new binary_1.BinaryReader(data)));
    }
    cancelOrder(request) {
        const data = tx_1.MsgCancelOrder.encode(request).finish();
        const promise = this.rpc.request("klyraprotocol.clob.Msg", "CancelOrder", data);
        return promise.then(data => tx_1.MsgCancelOrderResponse.decode(new binary_1.BinaryReader(data)));
    }
    batchCancel(request) {
        const data = tx_1.MsgBatchCancel.encode(request).finish();
        const promise = this.rpc.request("klyraprotocol.clob.Msg", "BatchCancel", data);
        return promise.then(data => tx_1.MsgBatchCancelResponse.decode(new binary_1.BinaryReader(data)));
    }
    createClobPair(request) {
        const data = tx_1.MsgCreateClobPair.encode(request).finish();
        const promise = this.rpc.request("klyraprotocol.clob.Msg", "CreateClobPair", data);
        return promise.then(data => tx_1.MsgCreateClobPairResponse.decode(new binary_1.BinaryReader(data)));
    }
    updateClobPair(request) {
        const data = tx_1.MsgUpdateClobPair.encode(request).finish();
        const promise = this.rpc.request("klyraprotocol.clob.Msg", "UpdateClobPair", data);
        return promise.then(data => tx_1.MsgUpdateClobPairResponse.decode(new binary_1.BinaryReader(data)));
    }
    updateEquityTierLimitConfiguration(request) {
        const data = tx_1.MsgUpdateEquityTierLimitConfiguration.encode(request).finish();
        const promise = this.rpc.request("klyraprotocol.clob.Msg", "UpdateEquityTierLimitConfiguration", data);
        return promise.then(data => tx_1.MsgUpdateEquityTierLimitConfigurationResponse.decode(new binary_1.BinaryReader(data)));
    }
    updateBlockRateLimitConfiguration(request) {
        const data = tx_1.MsgUpdateBlockRateLimitConfiguration.encode(request).finish();
        const promise = this.rpc.request("klyraprotocol.clob.Msg", "UpdateBlockRateLimitConfiguration", data);
        return promise.then(data => tx_1.MsgUpdateBlockRateLimitConfigurationResponse.decode(new binary_1.BinaryReader(data)));
    }
    updateLiquidationsConfig(request) {
        const data = tx_1.MsgUpdateLiquidationsConfig.encode(request).finish();
        const promise = this.rpc.request("klyraprotocol.clob.Msg", "UpdateLiquidationsConfig", data);
        return promise.then(data => tx_1.MsgUpdateLiquidationsConfigResponse.decode(new binary_1.BinaryReader(data)));
    }
}
exports.MsgClientImpl = MsgClientImpl;
const createClientImpl = (rpc) => {
    return new MsgClientImpl(rpc);
};
exports.createClientImpl = createClientImpl;
