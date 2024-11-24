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
exports.createRPCQueryClient = void 0;
//@ts-nocheck
const tendermint_rpc_1 = require("@cosmjs/tendermint-rpc");
const stargate_1 = require("@cosmjs/stargate");
const createRPCQueryClient = async ({ rpcEndpoint }) => {
    const tmClient = await (0, tendermint_rpc_1.connectComet)(rpcEndpoint);
    const client = new stargate_1.QueryClient(tmClient);
    return {
        cosmos: {
            auth: {
                v1beta1: (await Promise.resolve().then(() => __importStar(require("./auth/v1beta1/query.rpc.Query")))).createRpcQueryExtension(client)
            },
            authz: {
                v1beta1: (await Promise.resolve().then(() => __importStar(require("./authz/v1beta1/query.rpc.Query")))).createRpcQueryExtension(client)
            },
            bank: {
                v1beta1: (await Promise.resolve().then(() => __importStar(require("./bank/v1beta1/query.rpc.Query")))).createRpcQueryExtension(client)
            },
            base: {
                node: {
                    v1beta1: (await Promise.resolve().then(() => __importStar(require("./base/node/v1beta1/query.rpc.Service")))).createRpcQueryExtension(client)
                }
            },
            circuit: {
                v1: (await Promise.resolve().then(() => __importStar(require("./circuit/v1/query.rpc.Query")))).createRpcQueryExtension(client)
            },
            consensus: {
                v1: (await Promise.resolve().then(() => __importStar(require("./consensus/v1/query.rpc.Query")))).createRpcQueryExtension(client)
            },
            distribution: {
                v1beta1: (await Promise.resolve().then(() => __importStar(require("./distribution/v1beta1/query.rpc.Query")))).createRpcQueryExtension(client)
            },
            gov: {
                v1: (await Promise.resolve().then(() => __importStar(require("./gov/v1/query.rpc.Query")))).createRpcQueryExtension(client),
                v1beta1: (await Promise.resolve().then(() => __importStar(require("./gov/v1beta1/query.rpc.Query")))).createRpcQueryExtension(client)
            },
            orm: {
                query: {
                    v1alpha1: (await Promise.resolve().then(() => __importStar(require("./orm/query/v1alpha1/query.rpc.Query")))).createRpcQueryExtension(client)
                }
            },
            staking: {
                v1beta1: (await Promise.resolve().then(() => __importStar(require("./staking/v1beta1/query.rpc.Query")))).createRpcQueryExtension(client)
            },
            tx: {
                v1beta1: (await Promise.resolve().then(() => __importStar(require("./tx/v1beta1/service.rpc.Service")))).createRpcQueryExtension(client)
            },
            upgrade: {
                v1beta1: (await Promise.resolve().then(() => __importStar(require("./upgrade/v1beta1/query.rpc.Query")))).createRpcQueryExtension(client)
            }
        }
    };
};
exports.createRPCQueryClient = createRPCQueryClient;
