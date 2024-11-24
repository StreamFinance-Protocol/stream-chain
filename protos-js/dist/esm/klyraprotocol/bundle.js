//@ts-nocheck
import * as _87 from "./assets/asset";
import * as _88 from "./assets/genesis";
import * as _89 from "./assets/query";
import * as _90 from "./assets/tx";
import * as _91 from "./blocktime/blocktime";
import * as _92 from "./blocktime/genesis";
import * as _93 from "./blocktime/params";
import * as _94 from "./blocktime/query";
import * as _95 from "./blocktime/tx";
import * as _96 from "./clob/block_rate_limit_config";
import * as _97 from "./clob/clob_pair";
import * as _98 from "./clob/equity_tier_limit_config";
import * as _99 from "./clob/genesis";
import * as _100 from "./clob/liquidations_config";
import * as _101 from "./clob/liquidations";
import * as _102 from "./clob/matches";
import * as _103 from "./clob/mev";
import * as _104 from "./clob/operation";
import * as _105 from "./clob/order_removals";
import * as _106 from "./clob/order";
import * as _107 from "./clob/process_proposer_matches_events";
import * as _108 from "./clob/query";
import * as _109 from "./clob/tx";
import * as _110 from "./daemons/deleveraging/deleveraging";
import * as _111 from "./daemons/pricefeed/price_feed";
import * as _112 from "./daemons/sdaioracle/sdai";
import * as _113 from "./delaymsg/block_message_ids";
import * as _114 from "./delaymsg/delayed_message";
import * as _115 from "./delaymsg/genesis";
import * as _116 from "./delaymsg/query";
import * as _117 from "./delaymsg/tx";
import * as _118 from "./epochs/epoch_info";
import * as _119 from "./epochs/genesis";
import * as _120 from "./epochs/query";
import * as _121 from "./feetiers/genesis";
import * as _122 from "./feetiers/params";
import * as _123 from "./feetiers/query";
import * as _124 from "./feetiers/tx";
import * as _125 from "./govplus/genesis";
import * as _126 from "./govplus/query";
import * as _127 from "./govplus/tx";
import * as _128 from "./indexer/events/events";
import * as _129 from "./indexer/indexer_manager/event";
import * as _130 from "./indexer/off_chain_updates/off_chain_updates";
import * as _131 from "./indexer/protocol/v1/clob";
import * as _132 from "./indexer/protocol/v1/perpetual";
import * as _133 from "./indexer/protocol/v1/subaccount";
import * as _134 from "./indexer/redis/redis_order";
import * as _135 from "./indexer/shared/removal_reason";
import * as _136 from "./indexer/socks/messages";
import * as _137 from "./perpetuals/genesis";
import * as _138 from "./perpetuals/params";
import * as _139 from "./perpetuals/perpetual";
import * as _140 from "./perpetuals/query";
import * as _141 from "./perpetuals/tx";
import * as _142 from "./prices/genesis";
import * as _143 from "./prices/market_param";
import * as _144 from "./prices/market_price";
import * as _145 from "./prices/query";
import * as _146 from "./prices/tx";
import * as _147 from "./ratelimit/capacity";
import * as _148 from "./ratelimit/genesis";
import * as _149 from "./ratelimit/limit_params";
import * as _150 from "./ratelimit/pending_send_packet";
import * as _151 from "./ratelimit/query";
import * as _152 from "./ratelimit/tx";
import * as _153 from "./sending/genesis";
import * as _154 from "./sending/query";
import * as _155 from "./sending/transfer";
import * as _156 from "./sending/tx";
import * as _157 from "./stats/genesis";
import * as _158 from "./stats/params";
import * as _159 from "./stats/query";
import * as _160 from "./stats/stats";
import * as _161 from "./stats/tx";
import * as _162 from "./subaccounts/asset_position";
import * as _163 from "./subaccounts/genesis";
import * as _164 from "./subaccounts/perpetual_position";
import * as _165 from "./subaccounts/query";
import * as _166 from "./subaccounts/subaccount";
import * as _167 from "./subaccounts/tx";
import * as _168 from "./ve/ve";
import * as _239 from "./blocktime/tx.amino";
import * as _240 from "./clob/tx.amino";
import * as _241 from "./delaymsg/tx.amino";
import * as _242 from "./feetiers/tx.amino";
import * as _243 from "./govplus/tx.amino";
import * as _244 from "./perpetuals/tx.amino";
import * as _245 from "./prices/tx.amino";
import * as _246 from "./ratelimit/tx.amino";
import * as _247 from "./sending/tx.amino";
import * as _248 from "./stats/tx.amino";
import * as _249 from "./subaccounts/tx.amino";
import * as _250 from "./blocktime/tx.registry";
import * as _251 from "./clob/tx.registry";
import * as _252 from "./delaymsg/tx.registry";
import * as _253 from "./feetiers/tx.registry";
import * as _254 from "./govplus/tx.registry";
import * as _255 from "./perpetuals/tx.registry";
import * as _256 from "./prices/tx.registry";
import * as _257 from "./ratelimit/tx.registry";
import * as _258 from "./sending/tx.registry";
import * as _259 from "./stats/tx.registry";
import * as _260 from "./subaccounts/tx.registry";
import * as _261 from "./assets/query.lcd";
import * as _262 from "./blocktime/query.lcd";
import * as _263 from "./clob/query.lcd";
import * as _264 from "./delaymsg/query.lcd";
import * as _265 from "./epochs/query.lcd";
import * as _266 from "./feetiers/query.lcd";
import * as _267 from "./perpetuals/query.lcd";
import * as _268 from "./prices/query.lcd";
import * as _269 from "./ratelimit/query.lcd";
import * as _270 from "./stats/query.lcd";
import * as _271 from "./subaccounts/query.lcd";
import * as _272 from "./assets/query.rpc.Query";
import * as _273 from "./blocktime/query.rpc.Query";
import * as _274 from "./clob/query.rpc.Query";
import * as _275 from "./delaymsg/query.rpc.Query";
import * as _276 from "./epochs/query.rpc.Query";
import * as _277 from "./feetiers/query.rpc.Query";
import * as _278 from "./govplus/query.rpc.Query";
import * as _279 from "./perpetuals/query.rpc.Query";
import * as _280 from "./prices/query.rpc.Query";
import * as _281 from "./ratelimit/query.rpc.Query";
import * as _282 from "./sending/query.rpc.Query";
import * as _283 from "./stats/query.rpc.Query";
import * as _284 from "./subaccounts/query.rpc.Query";
import * as _285 from "./blocktime/tx.rpc.msg";
import * as _286 from "./clob/tx.rpc.msg";
import * as _287 from "./delaymsg/tx.rpc.msg";
import * as _288 from "./feetiers/tx.rpc.msg";
import * as _289 from "./govplus/tx.rpc.msg";
import * as _290 from "./perpetuals/tx.rpc.msg";
import * as _291 from "./prices/tx.rpc.msg";
import * as _292 from "./ratelimit/tx.rpc.msg";
import * as _293 from "./sending/tx.rpc.msg";
import * as _294 from "./stats/tx.rpc.msg";
import * as _295 from "./subaccounts/tx.rpc.msg";
import * as _299 from "./lcd";
import * as _300 from "./rpc.query";
import * as _301 from "./rpc.tx";
export var klyraprotocol;
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
})(klyraprotocol || (klyraprotocol = {}));
