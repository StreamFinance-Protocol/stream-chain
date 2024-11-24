"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.createRpcQueryExtension = exports.ServiceClientImpl = void 0;
const binary_1 = require("../../../binary");
const stargate_1 = require("@cosmjs/stargate");
const service_1 = require("./service");
class ServiceClientImpl {
    rpc;
    constructor(rpc) {
        this.rpc = rpc;
        this.simulate = this.simulate.bind(this);
        this.getTx = this.getTx.bind(this);
        this.broadcastTx = this.broadcastTx.bind(this);
        this.getTxsEvent = this.getTxsEvent.bind(this);
        this.getBlockWithTxs = this.getBlockWithTxs.bind(this);
        this.txDecode = this.txDecode.bind(this);
        this.txEncode = this.txEncode.bind(this);
        this.txEncodeAmino = this.txEncodeAmino.bind(this);
        this.txDecodeAmino = this.txDecodeAmino.bind(this);
    }
    simulate(request) {
        const data = service_1.SimulateRequest.encode(request).finish();
        const promise = this.rpc.request("cosmos.tx.v1beta1.Service", "Simulate", data);
        return promise.then(data => service_1.SimulateResponse.decode(new binary_1.BinaryReader(data)));
    }
    getTx(request) {
        const data = service_1.GetTxRequest.encode(request).finish();
        const promise = this.rpc.request("cosmos.tx.v1beta1.Service", "GetTx", data);
        return promise.then(data => service_1.GetTxResponse.decode(new binary_1.BinaryReader(data)));
    }
    broadcastTx(request) {
        const data = service_1.BroadcastTxRequest.encode(request).finish();
        const promise = this.rpc.request("cosmos.tx.v1beta1.Service", "BroadcastTx", data);
        return promise.then(data => service_1.BroadcastTxResponse.decode(new binary_1.BinaryReader(data)));
    }
    getTxsEvent(request) {
        const data = service_1.GetTxsEventRequest.encode(request).finish();
        const promise = this.rpc.request("cosmos.tx.v1beta1.Service", "GetTxsEvent", data);
        return promise.then(data => service_1.GetTxsEventResponse.decode(new binary_1.BinaryReader(data)));
    }
    getBlockWithTxs(request) {
        const data = service_1.GetBlockWithTxsRequest.encode(request).finish();
        const promise = this.rpc.request("cosmos.tx.v1beta1.Service", "GetBlockWithTxs", data);
        return promise.then(data => service_1.GetBlockWithTxsResponse.decode(new binary_1.BinaryReader(data)));
    }
    txDecode(request) {
        const data = service_1.TxDecodeRequest.encode(request).finish();
        const promise = this.rpc.request("cosmos.tx.v1beta1.Service", "TxDecode", data);
        return promise.then(data => service_1.TxDecodeResponse.decode(new binary_1.BinaryReader(data)));
    }
    txEncode(request) {
        const data = service_1.TxEncodeRequest.encode(request).finish();
        const promise = this.rpc.request("cosmos.tx.v1beta1.Service", "TxEncode", data);
        return promise.then(data => service_1.TxEncodeResponse.decode(new binary_1.BinaryReader(data)));
    }
    txEncodeAmino(request) {
        const data = service_1.TxEncodeAminoRequest.encode(request).finish();
        const promise = this.rpc.request("cosmos.tx.v1beta1.Service", "TxEncodeAmino", data);
        return promise.then(data => service_1.TxEncodeAminoResponse.decode(new binary_1.BinaryReader(data)));
    }
    txDecodeAmino(request) {
        const data = service_1.TxDecodeAminoRequest.encode(request).finish();
        const promise = this.rpc.request("cosmos.tx.v1beta1.Service", "TxDecodeAmino", data);
        return promise.then(data => service_1.TxDecodeAminoResponse.decode(new binary_1.BinaryReader(data)));
    }
}
exports.ServiceClientImpl = ServiceClientImpl;
const createRpcQueryExtension = (base) => {
    const rpc = (0, stargate_1.createProtobufRpcClient)(base);
    const queryService = new ServiceClientImpl(rpc);
    return {
        simulate(request) {
            return queryService.simulate(request);
        },
        getTx(request) {
            return queryService.getTx(request);
        },
        broadcastTx(request) {
            return queryService.broadcastTx(request);
        },
        getTxsEvent(request) {
            return queryService.getTxsEvent(request);
        },
        getBlockWithTxs(request) {
            return queryService.getBlockWithTxs(request);
        },
        txDecode(request) {
            return queryService.txDecode(request);
        },
        txEncode(request) {
            return queryService.txEncode(request);
        },
        txEncodeAmino(request) {
            return queryService.txEncodeAmino(request);
        },
        txDecodeAmino(request) {
            return queryService.txDecodeAmino(request);
        }
    };
};
exports.createRpcQueryExtension = createRpcQueryExtension;
