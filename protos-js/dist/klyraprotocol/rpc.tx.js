"use strict";
var __createBinding = (this && this.__createBinding) || (Object.create ? (function(o, m, k, k2) {
    if (k2 === undefined) k2 = k;
    var desc = Object.getOwnPropertyDescriptor(m, k);
    if (!desc || ("get" in desc ? !m.__esModule : desc.writable || desc.configurable)) {
      desc = { enumerable: true, get: function() { return m[k]; } };
    }
    Object.defineProperty(o, k2, desc);
}) : (function(o, m, k, k2) {
    if (k2 === undefined) k2 = k;
    o[k2] = m[k];
}));
var __setModuleDefault = (this && this.__setModuleDefault) || (Object.create ? (function(o, v) {
    Object.defineProperty(o, "default", { enumerable: true, value: v });
}) : function(o, v) {
    o["default"] = v;
});
var __importStar = (this && this.__importStar) || (function () {
    var ownKeys = function(o) {
        ownKeys = Object.getOwnPropertyNames || function (o) {
            var ar = [];
            for (var k in o) if (Object.prototype.hasOwnProperty.call(o, k)) ar[ar.length] = k;
            return ar;
        };
        return ownKeys(o);
    };
    return function (mod) {
        if (mod && mod.__esModule) return mod;
        var result = {};
        if (mod != null) for (var k = ownKeys(mod), i = 0; i < k.length; i++) if (k[i] !== "default") __createBinding(result, mod, k[i]);
        __setModuleDefault(result, mod);
        return result;
    };
})();
Object.defineProperty(exports, "__esModule", { value: true });
exports.createRPCMsgClient = void 0;
const createRPCMsgClient = async ({ rpc }) => ({
    cosmos: {
        auth: {
            v1beta1: new (await Promise.resolve().then(() => __importStar(require("../cosmos/auth/v1beta1/tx.rpc.msg")))).MsgClientImpl(rpc)
        },
        authz: {
            v1beta1: new (await Promise.resolve().then(() => __importStar(require("../cosmos/authz/v1beta1/tx.rpc.msg")))).MsgClientImpl(rpc)
        },
        bank: {
            v1beta1: new (await Promise.resolve().then(() => __importStar(require("../cosmos/bank/v1beta1/tx.rpc.msg")))).MsgClientImpl(rpc)
        },
        circuit: {
            v1: new (await Promise.resolve().then(() => __importStar(require("../cosmos/circuit/v1/tx.rpc.msg")))).MsgClientImpl(rpc)
        },
        consensus: {
            v1: new (await Promise.resolve().then(() => __importStar(require("../cosmos/consensus/v1/tx.rpc.msg")))).MsgClientImpl(rpc)
        },
        distribution: {
            v1beta1: new (await Promise.resolve().then(() => __importStar(require("../cosmos/distribution/v1beta1/tx.rpc.msg")))).MsgClientImpl(rpc)
        },
        gov: {
            v1: new (await Promise.resolve().then(() => __importStar(require("../cosmos/gov/v1/tx.rpc.msg")))).MsgClientImpl(rpc),
            v1beta1: new (await Promise.resolve().then(() => __importStar(require("../cosmos/gov/v1beta1/tx.rpc.msg")))).MsgClientImpl(rpc)
        },
        staking: {
            v1beta1: new (await Promise.resolve().then(() => __importStar(require("../cosmos/staking/v1beta1/tx.rpc.msg")))).MsgClientImpl(rpc)
        },
        upgrade: {
            v1beta1: new (await Promise.resolve().then(() => __importStar(require("../cosmos/upgrade/v1beta1/tx.rpc.msg")))).MsgClientImpl(rpc)
        }
    },
    klyraprotocol: {
        blocktime: new (await Promise.resolve().then(() => __importStar(require("./blocktime/tx.rpc.msg")))).MsgClientImpl(rpc),
        clob: new (await Promise.resolve().then(() => __importStar(require("./clob/tx.rpc.msg")))).MsgClientImpl(rpc),
        delaymsg: new (await Promise.resolve().then(() => __importStar(require("./delaymsg/tx.rpc.msg")))).MsgClientImpl(rpc),
        feetiers: new (await Promise.resolve().then(() => __importStar(require("./feetiers/tx.rpc.msg")))).MsgClientImpl(rpc),
        govplus: new (await Promise.resolve().then(() => __importStar(require("./govplus/tx.rpc.msg")))).MsgClientImpl(rpc),
        perpetuals: new (await Promise.resolve().then(() => __importStar(require("./perpetuals/tx.rpc.msg")))).MsgClientImpl(rpc),
        prices: new (await Promise.resolve().then(() => __importStar(require("./prices/tx.rpc.msg")))).MsgClientImpl(rpc),
        ratelimit: new (await Promise.resolve().then(() => __importStar(require("./ratelimit/tx.rpc.msg")))).MsgClientImpl(rpc),
        sending: new (await Promise.resolve().then(() => __importStar(require("./sending/tx.rpc.msg")))).MsgClientImpl(rpc),
        stats: new (await Promise.resolve().then(() => __importStar(require("./stats/tx.rpc.msg")))).MsgClientImpl(rpc),
        subaccounts: new (await Promise.resolve().then(() => __importStar(require("./subaccounts/tx.rpc.msg")))).MsgClientImpl(rpc)
    }
});
exports.createRPCMsgClient = createRPCMsgClient;
