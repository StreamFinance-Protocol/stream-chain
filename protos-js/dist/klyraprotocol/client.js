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
exports.getSigningKlyraprotocolClient = exports.getSigningKlyraprotocolClientOptions = exports.klyraprotocolProtoRegistry = exports.klyraprotocolAminoConverters = void 0;
//@ts-nocheck
const proto_signing_1 = require("@cosmjs/proto-signing");
const stargate_1 = require("@cosmjs/stargate");
const klyraprotocolBlocktimeTxRegistry = __importStar(require("./blocktime/tx.registry"));
const klyraprotocolClobTxRegistry = __importStar(require("./clob/tx.registry"));
const klyraprotocolDelaymsgTxRegistry = __importStar(require("./delaymsg/tx.registry"));
const klyraprotocolFeetiersTxRegistry = __importStar(require("./feetiers/tx.registry"));
const klyraprotocolGovplusTxRegistry = __importStar(require("./govplus/tx.registry"));
const klyraprotocolPerpetualsTxRegistry = __importStar(require("./perpetuals/tx.registry"));
const klyraprotocolPricesTxRegistry = __importStar(require("./prices/tx.registry"));
const klyraprotocolRatelimitTxRegistry = __importStar(require("./ratelimit/tx.registry"));
const klyraprotocolSendingTxRegistry = __importStar(require("./sending/tx.registry"));
const klyraprotocolStatsTxRegistry = __importStar(require("./stats/tx.registry"));
const klyraprotocolSubaccountsTxRegistry = __importStar(require("./subaccounts/tx.registry"));
const klyraprotocolBlocktimeTxAmino = __importStar(require("./blocktime/tx.amino"));
const klyraprotocolClobTxAmino = __importStar(require("./clob/tx.amino"));
const klyraprotocolDelaymsgTxAmino = __importStar(require("./delaymsg/tx.amino"));
const klyraprotocolFeetiersTxAmino = __importStar(require("./feetiers/tx.amino"));
const klyraprotocolGovplusTxAmino = __importStar(require("./govplus/tx.amino"));
const klyraprotocolPerpetualsTxAmino = __importStar(require("./perpetuals/tx.amino"));
const klyraprotocolPricesTxAmino = __importStar(require("./prices/tx.amino"));
const klyraprotocolRatelimitTxAmino = __importStar(require("./ratelimit/tx.amino"));
const klyraprotocolSendingTxAmino = __importStar(require("./sending/tx.amino"));
const klyraprotocolStatsTxAmino = __importStar(require("./stats/tx.amino"));
const klyraprotocolSubaccountsTxAmino = __importStar(require("./subaccounts/tx.amino"));
exports.klyraprotocolAminoConverters = {
    ...klyraprotocolBlocktimeTxAmino.AminoConverter,
    ...klyraprotocolClobTxAmino.AminoConverter,
    ...klyraprotocolDelaymsgTxAmino.AminoConverter,
    ...klyraprotocolFeetiersTxAmino.AminoConverter,
    ...klyraprotocolGovplusTxAmino.AminoConverter,
    ...klyraprotocolPerpetualsTxAmino.AminoConverter,
    ...klyraprotocolPricesTxAmino.AminoConverter,
    ...klyraprotocolRatelimitTxAmino.AminoConverter,
    ...klyraprotocolSendingTxAmino.AminoConverter,
    ...klyraprotocolStatsTxAmino.AminoConverter,
    ...klyraprotocolSubaccountsTxAmino.AminoConverter
};
exports.klyraprotocolProtoRegistry = [...klyraprotocolBlocktimeTxRegistry.registry, ...klyraprotocolClobTxRegistry.registry, ...klyraprotocolDelaymsgTxRegistry.registry, ...klyraprotocolFeetiersTxRegistry.registry, ...klyraprotocolGovplusTxRegistry.registry, ...klyraprotocolPerpetualsTxRegistry.registry, ...klyraprotocolPricesTxRegistry.registry, ...klyraprotocolRatelimitTxRegistry.registry, ...klyraprotocolSendingTxRegistry.registry, ...klyraprotocolStatsTxRegistry.registry, ...klyraprotocolSubaccountsTxRegistry.registry];
const getSigningKlyraprotocolClientOptions = ({ defaultTypes = stargate_1.defaultRegistryTypes } = {}) => {
    const registry = new proto_signing_1.Registry([...defaultTypes, ...exports.klyraprotocolProtoRegistry]);
    const aminoTypes = new stargate_1.AminoTypes({
        ...exports.klyraprotocolAminoConverters
    });
    return {
        registry,
        aminoTypes
    };
};
exports.getSigningKlyraprotocolClientOptions = getSigningKlyraprotocolClientOptions;
const getSigningKlyraprotocolClient = async ({ rpcEndpoint, signer, defaultTypes = stargate_1.defaultRegistryTypes }) => {
    const { registry, aminoTypes } = (0, exports.getSigningKlyraprotocolClientOptions)({
        defaultTypes
    });
    const client = await stargate_1.SigningStargateClient.connectWithSigner(rpcEndpoint, signer, {
        registry: registry,
        aminoTypes
    });
    return client;
};
exports.getSigningKlyraprotocolClient = getSigningKlyraprotocolClient;
