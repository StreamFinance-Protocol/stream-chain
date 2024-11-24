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
exports.cosmos = void 0;
//@ts-nocheck
const _2 = __importStar(require("./app/runtime/v1alpha1/module"));
const _3 = __importStar(require("./auth/module/v1/module"));
const _4 = __importStar(require("./auth/v1beta1/auth"));
const _5 = __importStar(require("./auth/v1beta1/genesis"));
const _6 = __importStar(require("./auth/v1beta1/query"));
const _7 = __importStar(require("./auth/v1beta1/tx"));
const _8 = __importStar(require("./authz/module/v1/module"));
const _9 = __importStar(require("./authz/v1beta1/authz"));
const _10 = __importStar(require("./authz/v1beta1/event"));
const _11 = __importStar(require("./authz/v1beta1/genesis"));
const _12 = __importStar(require("./authz/v1beta1/query"));
const _13 = __importStar(require("./authz/v1beta1/tx"));
const _14 = __importStar(require("./bank/module/v1/module"));
const _15 = __importStar(require("./bank/v1beta1/authz"));
const _16 = __importStar(require("./bank/v1beta1/bank"));
const _17 = __importStar(require("./bank/v1beta1/genesis"));
const _18 = __importStar(require("./bank/v1beta1/query"));
const _19 = __importStar(require("./bank/v1beta1/tx"));
const _20 = __importStar(require("./base/abci/v1beta1/abci"));
const _21 = __importStar(require("./base/node/v1beta1/query"));
const _22 = __importStar(require("./base/query/v1beta1/pagination"));
const _23 = __importStar(require("./base/reflection/v2alpha1/reflection"));
const _24 = __importStar(require("./base/v1beta1/coin"));
const _25 = __importStar(require("./circuit/module/v1/module"));
const _26 = __importStar(require("./circuit/v1/query"));
const _27 = __importStar(require("./circuit/v1/tx"));
const _28 = __importStar(require("./circuit/v1/types"));
const _29 = __importStar(require("./consensus/module/v1/module"));
const _30 = __importStar(require("./consensus/v1/query"));
const _31 = __importStar(require("./consensus/v1/tx"));
const _32 = __importStar(require("./crisis/module/v1/module"));
const _33 = __importStar(require("./crypto/ed25519/keys"));
const _34 = __importStar(require("./crypto/hd/v1/hd"));
const _35 = __importStar(require("./crypto/keyring/v1/record"));
const _36 = __importStar(require("./crypto/multisig/keys"));
const _37 = __importStar(require("./crypto/secp256k1/keys"));
const _38 = __importStar(require("./crypto/secp256r1/keys"));
const _39 = __importStar(require("./distribution/module/v1/module"));
const _40 = __importStar(require("./distribution/v1beta1/distribution"));
const _41 = __importStar(require("./distribution/v1beta1/genesis"));
const _42 = __importStar(require("./distribution/v1beta1/query"));
const _43 = __importStar(require("./distribution/v1beta1/tx"));
const _44 = __importStar(require("./evidence/module/v1/module"));
const _45 = __importStar(require("./feegrant/module/v1/module"));
const _46 = __importStar(require("./genutil/module/v1/module"));
const _47 = __importStar(require("./gov/module/v1/module"));
const _48 = __importStar(require("./gov/v1/genesis"));
const _49 = __importStar(require("./gov/v1/gov"));
const _50 = __importStar(require("./gov/v1/query"));
const _51 = __importStar(require("./gov/v1/tx"));
const _52 = __importStar(require("./gov/v1beta1/genesis"));
const _53 = __importStar(require("./gov/v1beta1/gov"));
const _54 = __importStar(require("./gov/v1beta1/query"));
const _55 = __importStar(require("./gov/v1beta1/tx"));
const _56 = __importStar(require("./group/module/v1/module"));
const _57 = __importStar(require("./mint/module/v1/module"));
const _58 = __importStar(require("./msg/textual/v1/textual"));
const _59 = __importStar(require("./nft/module/v1/module"));
const _60 = __importStar(require("./orm/module/v1alpha1/module"));
const _61 = __importStar(require("./orm/query/v1alpha1/query"));
const _62 = __importStar(require("./params/module/v1/module"));
const _63 = __importStar(require("./query/v1/query"));
const _64 = __importStar(require("./reflection/v1/reflection"));
const _65 = __importStar(require("./slashing/module/v1/module"));
const _66 = __importStar(require("./staking/module/v1/module"));
const _67 = __importStar(require("./staking/v1beta1/authz"));
const _68 = __importStar(require("./staking/v1beta1/genesis"));
const _69 = __importStar(require("./staking/v1beta1/query"));
const _70 = __importStar(require("./staking/v1beta1/staking"));
const _71 = __importStar(require("./staking/v1beta1/tx"));
const _72 = __importStar(require("./store/internal/kv/v1beta1/kv"));
const _73 = __importStar(require("./store/snapshots/v1/snapshot"));
const _74 = __importStar(require("./store/streaming/abci/grpc"));
const _75 = __importStar(require("./store/v1beta1/commit_info"));
const _76 = __importStar(require("./store/v1beta1/listening"));
const _77 = __importStar(require("./tx/config/v1/config"));
const _78 = __importStar(require("./tx/signing/v1beta1/signing"));
const _79 = __importStar(require("./tx/v1beta1/service"));
const _80 = __importStar(require("./tx/v1beta1/tx"));
const _81 = __importStar(require("./upgrade/module/v1/module"));
const _82 = __importStar(require("./upgrade/v1beta1/query"));
const _83 = __importStar(require("./upgrade/v1beta1/tx"));
const _84 = __importStar(require("./upgrade/v1beta1/upgrade"));
const _85 = __importStar(require("./vesting/module/v1/module"));
const _184 = __importStar(require("./auth/v1beta1/tx.amino"));
const _185 = __importStar(require("./authz/v1beta1/tx.amino"));
const _186 = __importStar(require("./bank/v1beta1/tx.amino"));
const _187 = __importStar(require("./circuit/v1/tx.amino"));
const _188 = __importStar(require("./consensus/v1/tx.amino"));
const _189 = __importStar(require("./distribution/v1beta1/tx.amino"));
const _190 = __importStar(require("./gov/v1/tx.amino"));
const _191 = __importStar(require("./gov/v1beta1/tx.amino"));
const _192 = __importStar(require("./staking/v1beta1/tx.amino"));
const _193 = __importStar(require("./upgrade/v1beta1/tx.amino"));
const _194 = __importStar(require("./auth/v1beta1/tx.registry"));
const _195 = __importStar(require("./authz/v1beta1/tx.registry"));
const _196 = __importStar(require("./bank/v1beta1/tx.registry"));
const _197 = __importStar(require("./circuit/v1/tx.registry"));
const _198 = __importStar(require("./consensus/v1/tx.registry"));
const _199 = __importStar(require("./distribution/v1beta1/tx.registry"));
const _200 = __importStar(require("./gov/v1/tx.registry"));
const _201 = __importStar(require("./gov/v1beta1/tx.registry"));
const _202 = __importStar(require("./staking/v1beta1/tx.registry"));
const _203 = __importStar(require("./upgrade/v1beta1/tx.registry"));
const _204 = __importStar(require("./auth/v1beta1/query.lcd"));
const _205 = __importStar(require("./authz/v1beta1/query.lcd"));
const _206 = __importStar(require("./bank/v1beta1/query.lcd"));
const _207 = __importStar(require("./base/node/v1beta1/query.lcd"));
const _208 = __importStar(require("./circuit/v1/query.lcd"));
const _209 = __importStar(require("./consensus/v1/query.lcd"));
const _210 = __importStar(require("./distribution/v1beta1/query.lcd"));
const _211 = __importStar(require("./gov/v1/query.lcd"));
const _212 = __importStar(require("./gov/v1beta1/query.lcd"));
const _213 = __importStar(require("./staking/v1beta1/query.lcd"));
const _214 = __importStar(require("./tx/v1beta1/service.lcd"));
const _215 = __importStar(require("./upgrade/v1beta1/query.lcd"));
const _216 = __importStar(require("./auth/v1beta1/query.rpc.Query"));
const _217 = __importStar(require("./authz/v1beta1/query.rpc.Query"));
const _218 = __importStar(require("./bank/v1beta1/query.rpc.Query"));
const _219 = __importStar(require("./base/node/v1beta1/query.rpc.Service"));
const _220 = __importStar(require("./circuit/v1/query.rpc.Query"));
const _221 = __importStar(require("./consensus/v1/query.rpc.Query"));
const _222 = __importStar(require("./distribution/v1beta1/query.rpc.Query"));
const _223 = __importStar(require("./gov/v1/query.rpc.Query"));
const _224 = __importStar(require("./gov/v1beta1/query.rpc.Query"));
const _225 = __importStar(require("./orm/query/v1alpha1/query.rpc.Query"));
const _226 = __importStar(require("./staking/v1beta1/query.rpc.Query"));
const _227 = __importStar(require("./tx/v1beta1/service.rpc.Service"));
const _228 = __importStar(require("./upgrade/v1beta1/query.rpc.Query"));
const _229 = __importStar(require("./auth/v1beta1/tx.rpc.msg"));
const _230 = __importStar(require("./authz/v1beta1/tx.rpc.msg"));
const _231 = __importStar(require("./bank/v1beta1/tx.rpc.msg"));
const _232 = __importStar(require("./circuit/v1/tx.rpc.msg"));
const _233 = __importStar(require("./consensus/v1/tx.rpc.msg"));
const _234 = __importStar(require("./distribution/v1beta1/tx.rpc.msg"));
const _235 = __importStar(require("./gov/v1/tx.rpc.msg"));
const _236 = __importStar(require("./gov/v1beta1/tx.rpc.msg"));
const _237 = __importStar(require("./staking/v1beta1/tx.rpc.msg"));
const _238 = __importStar(require("./upgrade/v1beta1/tx.rpc.msg"));
const _296 = __importStar(require("./lcd"));
const _297 = __importStar(require("./rpc.query"));
const _298 = __importStar(require("./rpc.tx"));
var cosmos;
(function (cosmos) {
    let app;
    (function (app) {
        let runtime;
        (function (runtime) {
            runtime.v1alpha1 = {
                ..._2
            };
        })(runtime = app.runtime || (app.runtime = {}));
    })(app = cosmos.app || (cosmos.app = {}));
    let auth;
    (function (auth) {
        let module;
        (function (module) {
            module.v1 = {
                ..._3
            };
        })(module = auth.module || (auth.module = {}));
        auth.v1beta1 = {
            ..._4,
            ..._5,
            ..._6,
            ..._7,
            ..._184,
            ..._194,
            ..._204,
            ..._216,
            ..._229
        };
    })(auth = cosmos.auth || (cosmos.auth = {}));
    let authz;
    (function (authz) {
        let module;
        (function (module) {
            module.v1 = {
                ..._8
            };
        })(module = authz.module || (authz.module = {}));
        authz.v1beta1 = {
            ..._9,
            ..._10,
            ..._11,
            ..._12,
            ..._13,
            ..._185,
            ..._195,
            ..._205,
            ..._217,
            ..._230
        };
    })(authz = cosmos.authz || (cosmos.authz = {}));
    let bank;
    (function (bank) {
        let module;
        (function (module) {
            module.v1 = {
                ..._14
            };
        })(module = bank.module || (bank.module = {}));
        bank.v1beta1 = {
            ..._15,
            ..._16,
            ..._17,
            ..._18,
            ..._19,
            ..._186,
            ..._196,
            ..._206,
            ..._218,
            ..._231
        };
    })(bank = cosmos.bank || (cosmos.bank = {}));
    let base;
    (function (base) {
        let abci;
        (function (abci) {
            abci.v1beta1 = {
                ..._20
            };
        })(abci = base.abci || (base.abci = {}));
        let node;
        (function (node) {
            node.v1beta1 = {
                ..._21,
                ..._207,
                ..._219
            };
        })(node = base.node || (base.node = {}));
        let query;
        (function (query) {
            query.v1beta1 = {
                ..._22
            };
        })(query = base.query || (base.query = {}));
        let reflection;
        (function (reflection) {
            reflection.v2alpha1 = {
                ..._23
            };
        })(reflection = base.reflection || (base.reflection = {}));
        base.v1beta1 = {
            ..._24
        };
    })(base = cosmos.base || (cosmos.base = {}));
    let circuit;
    (function (circuit) {
        let module;
        (function (module) {
            module.v1 = {
                ..._25
            };
        })(module = circuit.module || (circuit.module = {}));
        circuit.v1 = {
            ..._26,
            ..._27,
            ..._28,
            ..._187,
            ..._197,
            ..._208,
            ..._220,
            ..._232
        };
    })(circuit = cosmos.circuit || (cosmos.circuit = {}));
    let consensus;
    (function (consensus) {
        let module;
        (function (module) {
            module.v1 = {
                ..._29
            };
        })(module = consensus.module || (consensus.module = {}));
        consensus.v1 = {
            ..._30,
            ..._31,
            ..._188,
            ..._198,
            ..._209,
            ..._221,
            ..._233
        };
    })(consensus = cosmos.consensus || (cosmos.consensus = {}));
    let crisis;
    (function (crisis) {
        let module;
        (function (module) {
            module.v1 = {
                ..._32
            };
        })(module = crisis.module || (crisis.module = {}));
    })(crisis = cosmos.crisis || (cosmos.crisis = {}));
    let crypto;
    (function (crypto) {
        crypto.ed25519 = {
            ..._33
        };
        let hd;
        (function (hd) {
            hd.v1 = {
                ..._34
            };
        })(hd = crypto.hd || (crypto.hd = {}));
        let keyring;
        (function (keyring) {
            keyring.v1 = {
                ..._35
            };
        })(keyring = crypto.keyring || (crypto.keyring = {}));
        crypto.multisig = {
            ..._36
        };
        crypto.secp256k1 = {
            ..._37
        };
        crypto.secp256r1 = {
            ..._38
        };
    })(crypto = cosmos.crypto || (cosmos.crypto = {}));
    let distribution;
    (function (distribution) {
        let module;
        (function (module) {
            module.v1 = {
                ..._39
            };
        })(module = distribution.module || (distribution.module = {}));
        distribution.v1beta1 = {
            ..._40,
            ..._41,
            ..._42,
            ..._43,
            ..._189,
            ..._199,
            ..._210,
            ..._222,
            ..._234
        };
    })(distribution = cosmos.distribution || (cosmos.distribution = {}));
    let evidence;
    (function (evidence) {
        let module;
        (function (module) {
            module.v1 = {
                ..._44
            };
        })(module = evidence.module || (evidence.module = {}));
    })(evidence = cosmos.evidence || (cosmos.evidence = {}));
    let feegrant;
    (function (feegrant) {
        let module;
        (function (module) {
            module.v1 = {
                ..._45
            };
        })(module = feegrant.module || (feegrant.module = {}));
    })(feegrant = cosmos.feegrant || (cosmos.feegrant = {}));
    let genutil;
    (function (genutil) {
        let module;
        (function (module) {
            module.v1 = {
                ..._46
            };
        })(module = genutil.module || (genutil.module = {}));
    })(genutil = cosmos.genutil || (cosmos.genutil = {}));
    let gov;
    (function (gov) {
        let module;
        (function (module) {
            module.v1 = {
                ..._47
            };
        })(module = gov.module || (gov.module = {}));
        gov.v1 = {
            ..._48,
            ..._49,
            ..._50,
            ..._51,
            ..._190,
            ..._200,
            ..._211,
            ..._223,
            ..._235
        };
        gov.v1beta1 = {
            ..._52,
            ..._53,
            ..._54,
            ..._55,
            ..._191,
            ..._201,
            ..._212,
            ..._224,
            ..._236
        };
    })(gov = cosmos.gov || (cosmos.gov = {}));
    let group;
    (function (group) {
        let module;
        (function (module) {
            module.v1 = {
                ..._56
            };
        })(module = group.module || (group.module = {}));
    })(group = cosmos.group || (cosmos.group = {}));
    let mint;
    (function (mint) {
        let module;
        (function (module) {
            module.v1 = {
                ..._57
            };
        })(module = mint.module || (mint.module = {}));
    })(mint = cosmos.mint || (cosmos.mint = {}));
    let msg;
    (function (msg) {
        let textual;
        (function (textual) {
            textual.v1 = {
                ..._58
            };
        })(textual = msg.textual || (msg.textual = {}));
    })(msg = cosmos.msg || (cosmos.msg = {}));
    let nft;
    (function (nft) {
        let module;
        (function (module) {
            module.v1 = {
                ..._59
            };
        })(module = nft.module || (nft.module = {}));
    })(nft = cosmos.nft || (cosmos.nft = {}));
    let orm;
    (function (orm) {
        let module;
        (function (module) {
            module.v1alpha1 = {
                ..._60
            };
        })(module = orm.module || (orm.module = {}));
        let query;
        (function (query) {
            query.v1alpha1 = {
                ..._61,
                ..._225
            };
        })(query = orm.query || (orm.query = {}));
    })(orm = cosmos.orm || (cosmos.orm = {}));
    let params;
    (function (params) {
        let module;
        (function (module) {
            module.v1 = {
                ..._62
            };
        })(module = params.module || (params.module = {}));
    })(params = cosmos.params || (cosmos.params = {}));
    let query;
    (function (query) {
        query.v1 = {
            ..._63
        };
    })(query = cosmos.query || (cosmos.query = {}));
    let reflection;
    (function (reflection) {
        reflection.v1 = {
            ..._64
        };
    })(reflection = cosmos.reflection || (cosmos.reflection = {}));
    let slashing;
    (function (slashing) {
        let module;
        (function (module) {
            module.v1 = {
                ..._65
            };
        })(module = slashing.module || (slashing.module = {}));
    })(slashing = cosmos.slashing || (cosmos.slashing = {}));
    let staking;
    (function (staking) {
        let module;
        (function (module) {
            module.v1 = {
                ..._66
            };
        })(module = staking.module || (staking.module = {}));
        staking.v1beta1 = {
            ..._67,
            ..._68,
            ..._69,
            ..._70,
            ..._71,
            ..._192,
            ..._202,
            ..._213,
            ..._226,
            ..._237
        };
    })(staking = cosmos.staking || (cosmos.staking = {}));
    let store;
    (function (store) {
        let internal;
        (function (internal) {
            let kv;
            (function (kv) {
                kv.v1beta1 = {
                    ..._72
                };
            })(kv = internal.kv || (internal.kv = {}));
        })(internal = store.internal || (store.internal = {}));
        let snapshots;
        (function (snapshots) {
            snapshots.v1 = {
                ..._73
            };
        })(snapshots = store.snapshots || (store.snapshots = {}));
        let streaming;
        (function (streaming) {
            streaming.abci = {
                ..._74
            };
        })(streaming = store.streaming || (store.streaming = {}));
        store.v1beta1 = {
            ..._75,
            ..._76
        };
    })(store = cosmos.store || (cosmos.store = {}));
    let tx;
    (function (tx) {
        let config;
        (function (config) {
            config.v1 = {
                ..._77
            };
        })(config = tx.config || (tx.config = {}));
        let signing;
        (function (signing) {
            signing.v1beta1 = {
                ..._78
            };
        })(signing = tx.signing || (tx.signing = {}));
        tx.v1beta1 = {
            ..._79,
            ..._80,
            ..._214,
            ..._227
        };
    })(tx = cosmos.tx || (cosmos.tx = {}));
    let upgrade;
    (function (upgrade) {
        let module;
        (function (module) {
            module.v1 = {
                ..._81
            };
        })(module = upgrade.module || (upgrade.module = {}));
        upgrade.v1beta1 = {
            ..._82,
            ..._83,
            ..._84,
            ..._193,
            ..._203,
            ..._215,
            ..._228,
            ..._238
        };
    })(upgrade = cosmos.upgrade || (cosmos.upgrade = {}));
    let vesting;
    (function (vesting) {
        let module;
        (function (module) {
            module.v1 = {
                ..._85
            };
        })(module = vesting.module || (vesting.module = {}));
    })(vesting = cosmos.vesting || (cosmos.vesting = {}));
    cosmos.ClientFactory = {
        ..._296,
        ..._297,
        ..._298
    };
})(cosmos || (exports.cosmos = cosmos = {}));
