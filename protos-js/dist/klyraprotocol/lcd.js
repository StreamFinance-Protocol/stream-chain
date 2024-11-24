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
exports.createLCDClient = void 0;
//@ts-nocheck
const lcd_1 = require("@cosmology/lcd");
const createLCDClient = async ({ restEndpoint }) => {
    const requestClient = new lcd_1.LCDClient({
        restEndpoint
    });
    return {
        cosmos: {
            auth: {
                v1beta1: new (await Promise.resolve().then(() => __importStar(require("../cosmos/auth/v1beta1/query.lcd")))).LCDQueryClient({
                    requestClient
                })
            },
            authz: {
                v1beta1: new (await Promise.resolve().then(() => __importStar(require("../cosmos/authz/v1beta1/query.lcd")))).LCDQueryClient({
                    requestClient
                })
            },
            bank: {
                v1beta1: new (await Promise.resolve().then(() => __importStar(require("../cosmos/bank/v1beta1/query.lcd")))).LCDQueryClient({
                    requestClient
                })
            },
            base: {
                node: {
                    v1beta1: new (await Promise.resolve().then(() => __importStar(require("../cosmos/base/node/v1beta1/query.lcd")))).LCDQueryClient({
                        requestClient
                    })
                }
            },
            circuit: {
                v1: new (await Promise.resolve().then(() => __importStar(require("../cosmos/circuit/v1/query.lcd")))).LCDQueryClient({
                    requestClient
                })
            },
            consensus: {
                v1: new (await Promise.resolve().then(() => __importStar(require("../cosmos/consensus/v1/query.lcd")))).LCDQueryClient({
                    requestClient
                })
            },
            distribution: {
                v1beta1: new (await Promise.resolve().then(() => __importStar(require("../cosmos/distribution/v1beta1/query.lcd")))).LCDQueryClient({
                    requestClient
                })
            },
            gov: {
                v1: new (await Promise.resolve().then(() => __importStar(require("../cosmos/gov/v1/query.lcd")))).LCDQueryClient({
                    requestClient
                }),
                v1beta1: new (await Promise.resolve().then(() => __importStar(require("../cosmos/gov/v1beta1/query.lcd")))).LCDQueryClient({
                    requestClient
                })
            },
            staking: {
                v1beta1: new (await Promise.resolve().then(() => __importStar(require("../cosmos/staking/v1beta1/query.lcd")))).LCDQueryClient({
                    requestClient
                })
            },
            tx: {
                v1beta1: new (await Promise.resolve().then(() => __importStar(require("../cosmos/tx/v1beta1/service.lcd")))).LCDQueryClient({
                    requestClient
                })
            },
            upgrade: {
                v1beta1: new (await Promise.resolve().then(() => __importStar(require("../cosmos/upgrade/v1beta1/query.lcd")))).LCDQueryClient({
                    requestClient
                })
            }
        },
        klyraprotocol: {
            assets: new (await Promise.resolve().then(() => __importStar(require("./assets/query.lcd")))).LCDQueryClient({
                requestClient
            }),
            blocktime: new (await Promise.resolve().then(() => __importStar(require("./blocktime/query.lcd")))).LCDQueryClient({
                requestClient
            }),
            clob: new (await Promise.resolve().then(() => __importStar(require("./clob/query.lcd")))).LCDQueryClient({
                requestClient
            }),
            delaymsg: new (await Promise.resolve().then(() => __importStar(require("./delaymsg/query.lcd")))).LCDQueryClient({
                requestClient
            }),
            epochs: new (await Promise.resolve().then(() => __importStar(require("./epochs/query.lcd")))).LCDQueryClient({
                requestClient
            }),
            feetiers: new (await Promise.resolve().then(() => __importStar(require("./feetiers/query.lcd")))).LCDQueryClient({
                requestClient
            }),
            perpetuals: new (await Promise.resolve().then(() => __importStar(require("./perpetuals/query.lcd")))).LCDQueryClient({
                requestClient
            }),
            prices: new (await Promise.resolve().then(() => __importStar(require("./prices/query.lcd")))).LCDQueryClient({
                requestClient
            }),
            ratelimit: new (await Promise.resolve().then(() => __importStar(require("./ratelimit/query.lcd")))).LCDQueryClient({
                requestClient
            }),
            stats: new (await Promise.resolve().then(() => __importStar(require("./stats/query.lcd")))).LCDQueryClient({
                requestClient
            }),
            subaccounts: new (await Promise.resolve().then(() => __importStar(require("./subaccounts/query.lcd")))).LCDQueryClient({
                requestClient
            })
        }
    };
};
exports.createLCDClient = createLCDClient;
