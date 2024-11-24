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
exports.klyraprotocol = void 0;
//@ts-nocheck
const _87 = __importStar(require("./assets/asset"));
const _88 = __importStar(require("./assets/genesis"));
const _89 = __importStar(require("./assets/query"));
const _90 = __importStar(require("./assets/tx"));
const _91 = __importStar(require("./blocktime/blocktime"));
const _92 = __importStar(require("./blocktime/genesis"));
const _93 = __importStar(require("./blocktime/params"));
const _94 = __importStar(require("./blocktime/query"));
const _95 = __importStar(require("./blocktime/tx"));
const _96 = __importStar(require("./clob/block_rate_limit_config"));
const _97 = __importStar(require("./clob/clob_pair"));
const _98 = __importStar(require("./clob/equity_tier_limit_config"));
const _99 = __importStar(require("./clob/genesis"));
const _100 = __importStar(require("./clob/liquidations_config"));
const _101 = __importStar(require("./clob/liquidations"));
const _102 = __importStar(require("./clob/matches"));
const _103 = __importStar(require("./clob/mev"));
const _104 = __importStar(require("./clob/operation"));
const _105 = __importStar(require("./clob/order_removals"));
const _106 = __importStar(require("./clob/order"));
const _107 = __importStar(require("./clob/process_proposer_matches_events"));
const _108 = __importStar(require("./clob/query"));
const _109 = __importStar(require("./clob/tx"));
const _110 = __importStar(require("./daemons/deleveraging/deleveraging"));
const _111 = __importStar(require("./daemons/pricefeed/price_feed"));
const _112 = __importStar(require("./daemons/sdaioracle/sdai"));
const _113 = __importStar(require("./delaymsg/block_message_ids"));
const _114 = __importStar(require("./delaymsg/delayed_message"));
const _115 = __importStar(require("./delaymsg/genesis"));
const _116 = __importStar(require("./delaymsg/query"));
const _117 = __importStar(require("./delaymsg/tx"));
const _118 = __importStar(require("./epochs/epoch_info"));
const _119 = __importStar(require("./epochs/genesis"));
const _120 = __importStar(require("./epochs/query"));
const _121 = __importStar(require("./feetiers/genesis"));
const _122 = __importStar(require("./feetiers/params"));
const _123 = __importStar(require("./feetiers/query"));
const _124 = __importStar(require("./feetiers/tx"));
const _125 = __importStar(require("./govplus/genesis"));
const _126 = __importStar(require("./govplus/query"));
const _127 = __importStar(require("./govplus/tx"));
const _128 = __importStar(require("./indexer/events/events"));
const _129 = __importStar(require("./indexer/indexer_manager/event"));
const _130 = __importStar(require("./indexer/off_chain_updates/off_chain_updates"));
const _131 = __importStar(require("./indexer/protocol/v1/clob"));
const _132 = __importStar(require("./indexer/protocol/v1/perpetual"));
const _133 = __importStar(require("./indexer/protocol/v1/subaccount"));
const _134 = __importStar(require("./indexer/redis/redis_order"));
const _135 = __importStar(require("./indexer/shared/removal_reason"));
const _136 = __importStar(require("./indexer/socks/messages"));
const _137 = __importStar(require("./perpetuals/genesis"));
const _138 = __importStar(require("./perpetuals/params"));
const _139 = __importStar(require("./perpetuals/perpetual"));
const _140 = __importStar(require("./perpetuals/query"));
const _141 = __importStar(require("./perpetuals/tx"));
const _142 = __importStar(require("./prices/genesis"));
const _143 = __importStar(require("./prices/market_param"));
const _144 = __importStar(require("./prices/market_price"));
const _145 = __importStar(require("./prices/query"));
const _146 = __importStar(require("./prices/tx"));
const _147 = __importStar(require("./ratelimit/capacity"));
const _148 = __importStar(require("./ratelimit/genesis"));
const _149 = __importStar(require("./ratelimit/limit_params"));
const _150 = __importStar(require("./ratelimit/pending_send_packet"));
const _151 = __importStar(require("./ratelimit/query"));
const _152 = __importStar(require("./ratelimit/tx"));
const _153 = __importStar(require("./sending/genesis"));
const _154 = __importStar(require("./sending/query"));
const _155 = __importStar(require("./sending/transfer"));
const _156 = __importStar(require("./sending/tx"));
const _157 = __importStar(require("./stats/genesis"));
const _158 = __importStar(require("./stats/params"));
const _159 = __importStar(require("./stats/query"));
const _160 = __importStar(require("./stats/stats"));
const _161 = __importStar(require("./stats/tx"));
const _162 = __importStar(require("./subaccounts/asset_position"));
const _163 = __importStar(require("./subaccounts/genesis"));
const _164 = __importStar(require("./subaccounts/perpetual_position"));
const _165 = __importStar(require("./subaccounts/query"));
const _166 = __importStar(require("./subaccounts/subaccount"));
const _167 = __importStar(require("./subaccounts/tx"));
const _168 = __importStar(require("./ve/ve"));
const _239 = __importStar(require("./blocktime/tx.amino"));
const _240 = __importStar(require("./clob/tx.amino"));
const _241 = __importStar(require("./delaymsg/tx.amino"));
const _242 = __importStar(require("./feetiers/tx.amino"));
const _243 = __importStar(require("./govplus/tx.amino"));
const _244 = __importStar(require("./perpetuals/tx.amino"));
const _245 = __importStar(require("./prices/tx.amino"));
const _246 = __importStar(require("./ratelimit/tx.amino"));
const _247 = __importStar(require("./sending/tx.amino"));
const _248 = __importStar(require("./stats/tx.amino"));
const _249 = __importStar(require("./subaccounts/tx.amino"));
const _250 = __importStar(require("./blocktime/tx.registry"));
const _251 = __importStar(require("./clob/tx.registry"));
const _252 = __importStar(require("./delaymsg/tx.registry"));
const _253 = __importStar(require("./feetiers/tx.registry"));
const _254 = __importStar(require("./govplus/tx.registry"));
const _255 = __importStar(require("./perpetuals/tx.registry"));
const _256 = __importStar(require("./prices/tx.registry"));
const _257 = __importStar(require("./ratelimit/tx.registry"));
const _258 = __importStar(require("./sending/tx.registry"));
const _259 = __importStar(require("./stats/tx.registry"));
const _260 = __importStar(require("./subaccounts/tx.registry"));
const _261 = __importStar(require("./assets/query.lcd"));
const _262 = __importStar(require("./blocktime/query.lcd"));
const _263 = __importStar(require("./clob/query.lcd"));
const _264 = __importStar(require("./delaymsg/query.lcd"));
const _265 = __importStar(require("./epochs/query.lcd"));
const _266 = __importStar(require("./feetiers/query.lcd"));
const _267 = __importStar(require("./perpetuals/query.lcd"));
const _268 = __importStar(require("./prices/query.lcd"));
const _269 = __importStar(require("./ratelimit/query.lcd"));
const _270 = __importStar(require("./stats/query.lcd"));
const _271 = __importStar(require("./subaccounts/query.lcd"));
const _272 = __importStar(require("./assets/query.rpc.Query"));
const _273 = __importStar(require("./blocktime/query.rpc.Query"));
const _274 = __importStar(require("./clob/query.rpc.Query"));
const _275 = __importStar(require("./delaymsg/query.rpc.Query"));
const _276 = __importStar(require("./epochs/query.rpc.Query"));
const _277 = __importStar(require("./feetiers/query.rpc.Query"));
const _278 = __importStar(require("./govplus/query.rpc.Query"));
const _279 = __importStar(require("./perpetuals/query.rpc.Query"));
const _280 = __importStar(require("./prices/query.rpc.Query"));
const _281 = __importStar(require("./ratelimit/query.rpc.Query"));
const _282 = __importStar(require("./sending/query.rpc.Query"));
const _283 = __importStar(require("./stats/query.rpc.Query"));
const _284 = __importStar(require("./subaccounts/query.rpc.Query"));
const _285 = __importStar(require("./blocktime/tx.rpc.msg"));
const _286 = __importStar(require("./clob/tx.rpc.msg"));
const _287 = __importStar(require("./delaymsg/tx.rpc.msg"));
const _288 = __importStar(require("./feetiers/tx.rpc.msg"));
const _289 = __importStar(require("./govplus/tx.rpc.msg"));
const _290 = __importStar(require("./perpetuals/tx.rpc.msg"));
const _291 = __importStar(require("./prices/tx.rpc.msg"));
const _292 = __importStar(require("./ratelimit/tx.rpc.msg"));
const _293 = __importStar(require("./sending/tx.rpc.msg"));
const _294 = __importStar(require("./stats/tx.rpc.msg"));
const _295 = __importStar(require("./subaccounts/tx.rpc.msg"));
const _299 = __importStar(require("./lcd"));
const _300 = __importStar(require("./rpc.query"));
const _301 = __importStar(require("./rpc.tx"));
var klyraprotocol;
(function (klyraprotocol) {
    klyraprotocol.assets = {
        ..._87,
        ..._88,
        ..._89,
        ..._90,
        ..._261,
        ..._272
    };
    klyraprotocol.blocktime = {
        ..._91,
        ..._92,
        ..._93,
        ..._94,
        ..._95,
        ..._239,
        ..._250,
        ..._262,
        ..._273,
        ..._285
    };
    klyraprotocol.clob = {
        ..._96,
        ..._97,
        ..._98,
        ..._99,
        ..._100,
        ..._101,
        ..._102,
        ..._103,
        ..._104,
        ..._105,
        ..._106,
        ..._107,
        ..._108,
        ..._109,
        ..._240,
        ..._251,
        ..._263,
        ..._274,
        ..._286
    };
    let daemons;
    (function (daemons) {
        daemons.deleveraging = {
            ..._110
        };
        daemons.pricefeed = {
            ..._111
        };
        daemons.sdaioracle = {
            ..._112
        };
    })(daemons = klyraprotocol.daemons || (klyraprotocol.daemons = {}));
    klyraprotocol.delaymsg = {
        ..._113,
        ..._114,
        ..._115,
        ..._116,
        ..._117,
        ..._241,
        ..._252,
        ..._264,
        ..._275,
        ..._287
    };
    klyraprotocol.epochs = {
        ..._118,
        ..._119,
        ..._120,
        ..._265,
        ..._276
    };
    klyraprotocol.feetiers = {
        ..._121,
        ..._122,
        ..._123,
        ..._124,
        ..._242,
        ..._253,
        ..._266,
        ..._277,
        ..._288
    };
    klyraprotocol.govplus = {
        ..._125,
        ..._126,
        ..._127,
        ..._243,
        ..._254,
        ..._278,
        ..._289
    };
    let indexer;
    (function (indexer) {
        indexer.events = {
            ..._128
        };
        indexer.indexer_manager = {
            ..._129
        };
        indexer.off_chain_updates = {
            ..._130
        };
        let protocol;
        (function (protocol) {
            protocol.v1 = {
                ..._131,
                ..._132,
                ..._133
            };
        })(protocol = indexer.protocol || (indexer.protocol = {}));
        indexer.redis = {
            ..._134
        };
        indexer.shared = {
            ..._135
        };
        indexer.socks = {
            ..._136
        };
    })(indexer = klyraprotocol.indexer || (klyraprotocol.indexer = {}));
    klyraprotocol.perpetuals = {
        ..._137,
        ..._138,
        ..._139,
        ..._140,
        ..._141,
        ..._244,
        ..._255,
        ..._267,
        ..._279,
        ..._290
    };
    klyraprotocol.prices = {
        ..._142,
        ..._143,
        ..._144,
        ..._145,
        ..._146,
        ..._245,
        ..._256,
        ..._268,
        ..._280,
        ..._291
    };
    klyraprotocol.ratelimit = {
        ..._147,
        ..._148,
        ..._149,
        ..._150,
        ..._151,
        ..._152,
        ..._246,
        ..._257,
        ..._269,
        ..._281,
        ..._292
    };
    klyraprotocol.sending = {
        ..._153,
        ..._154,
        ..._155,
        ..._156,
        ..._247,
        ..._258,
        ..._282,
        ..._293
    };
    klyraprotocol.stats = {
        ..._157,
        ..._158,
        ..._159,
        ..._160,
        ..._161,
        ..._248,
        ..._259,
        ..._270,
        ..._283,
        ..._294
    };
    klyraprotocol.subaccounts = {
        ..._162,
        ..._163,
        ..._164,
        ..._165,
        ..._166,
        ..._167,
        ..._249,
        ..._260,
        ..._271,
        ..._284,
        ..._295
    };
    klyraprotocol.ve = {
        ..._168
    };
    klyraprotocol.ClientFactory = {
        ..._299,
        ..._300,
        ..._301
    };
})(klyraprotocol || (exports.klyraprotocol = klyraprotocol = {}));
