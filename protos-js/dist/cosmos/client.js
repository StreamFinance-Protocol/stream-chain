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
exports.getSigningCosmosClient = exports.getSigningCosmosClientOptions = exports.cosmosProtoRegistry = exports.cosmosAminoConverters = void 0;
//@ts-nocheck
const proto_signing_1 = require("@cosmjs/proto-signing");
const stargate_1 = require("@cosmjs/stargate");
const cosmosAuthV1beta1TxRegistry = __importStar(require("./auth/v1beta1/tx.registry"));
const cosmosAuthzV1beta1TxRegistry = __importStar(require("./authz/v1beta1/tx.registry"));
const cosmosBankV1beta1TxRegistry = __importStar(require("./bank/v1beta1/tx.registry"));
const cosmosCircuitV1TxRegistry = __importStar(require("./circuit/v1/tx.registry"));
const cosmosConsensusV1TxRegistry = __importStar(require("./consensus/v1/tx.registry"));
const cosmosDistributionV1beta1TxRegistry = __importStar(require("./distribution/v1beta1/tx.registry"));
const cosmosGovV1TxRegistry = __importStar(require("./gov/v1/tx.registry"));
const cosmosGovV1beta1TxRegistry = __importStar(require("./gov/v1beta1/tx.registry"));
const cosmosStakingV1beta1TxRegistry = __importStar(require("./staking/v1beta1/tx.registry"));
const cosmosUpgradeV1beta1TxRegistry = __importStar(require("./upgrade/v1beta1/tx.registry"));
const cosmosAuthV1beta1TxAmino = __importStar(require("./auth/v1beta1/tx.amino"));
const cosmosAuthzV1beta1TxAmino = __importStar(require("./authz/v1beta1/tx.amino"));
const cosmosBankV1beta1TxAmino = __importStar(require("./bank/v1beta1/tx.amino"));
const cosmosCircuitV1TxAmino = __importStar(require("./circuit/v1/tx.amino"));
const cosmosConsensusV1TxAmino = __importStar(require("./consensus/v1/tx.amino"));
const cosmosDistributionV1beta1TxAmino = __importStar(require("./distribution/v1beta1/tx.amino"));
const cosmosGovV1TxAmino = __importStar(require("./gov/v1/tx.amino"));
const cosmosGovV1beta1TxAmino = __importStar(require("./gov/v1beta1/tx.amino"));
const cosmosStakingV1beta1TxAmino = __importStar(require("./staking/v1beta1/tx.amino"));
const cosmosUpgradeV1beta1TxAmino = __importStar(require("./upgrade/v1beta1/tx.amino"));
exports.cosmosAminoConverters = {
    ...cosmosAuthV1beta1TxAmino.AminoConverter,
    ...cosmosAuthzV1beta1TxAmino.AminoConverter,
    ...cosmosBankV1beta1TxAmino.AminoConverter,
    ...cosmosCircuitV1TxAmino.AminoConverter,
    ...cosmosConsensusV1TxAmino.AminoConverter,
    ...cosmosDistributionV1beta1TxAmino.AminoConverter,
    ...cosmosGovV1TxAmino.AminoConverter,
    ...cosmosGovV1beta1TxAmino.AminoConverter,
    ...cosmosStakingV1beta1TxAmino.AminoConverter,
    ...cosmosUpgradeV1beta1TxAmino.AminoConverter
};
exports.cosmosProtoRegistry = [...cosmosAuthV1beta1TxRegistry.registry, ...cosmosAuthzV1beta1TxRegistry.registry, ...cosmosBankV1beta1TxRegistry.registry, ...cosmosCircuitV1TxRegistry.registry, ...cosmosConsensusV1TxRegistry.registry, ...cosmosDistributionV1beta1TxRegistry.registry, ...cosmosGovV1TxRegistry.registry, ...cosmosGovV1beta1TxRegistry.registry, ...cosmosStakingV1beta1TxRegistry.registry, ...cosmosUpgradeV1beta1TxRegistry.registry];
const getSigningCosmosClientOptions = () => {
    const registry = new proto_signing_1.Registry([...exports.cosmosProtoRegistry]);
    const aminoTypes = new stargate_1.AminoTypes({
        ...exports.cosmosAminoConverters
    });
    return {
        registry,
        aminoTypes
    };
};
exports.getSigningCosmosClientOptions = getSigningCosmosClientOptions;
const getSigningCosmosClient = async ({ rpcEndpoint, signer }) => {
    const { registry, aminoTypes } = (0, exports.getSigningCosmosClientOptions)();
    const client = await stargate_1.SigningStargateClient.connectWithSigner(rpcEndpoint, signer, {
        registry: registry,
        aminoTypes
    });
    return client;
};
exports.getSigningCosmosClient = getSigningCosmosClient;
