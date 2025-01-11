import * as _12 from "./assets/asset";
import * as _13 from "./assets/genesis";
import * as _14 from "./assets/query";
import * as _15 from "./assets/tx";
import * as _16 from "./blocktime/blocktime";
import * as _17 from "./blocktime/genesis";
import * as _18 from "./blocktime/params";
import * as _19 from "./blocktime/query";
import * as _20 from "./blocktime/tx";
import * as _21 from "./clob/block_rate_limit_config";
import * as _22 from "./clob/clob_pair";
import * as _23 from "./clob/equity_tier_limit_config";
import * as _24 from "./clob/genesis";
import * as _25 from "./clob/liquidations_config";
import * as _26 from "./clob/liquidations";
import * as _27 from "./clob/matches";
import * as _28 from "./clob/mev";
import * as _29 from "./clob/operation";
import * as _30 from "./clob/order_removals";
import * as _31 from "./clob/order";
import * as _32 from "./clob/process_proposer_matches_events";
import * as _33 from "./clob/query";
import * as _34 from "./clob/tx";
import * as _35 from "./daemons/deleveraging/deleveraging";
import * as _36 from "./daemons/pricefeed/price_feed";
import * as _37 from "./daemons/sdaioracle/sdai";
import * as _38 from "./delaymsg/block_message_ids";
import * as _39 from "./delaymsg/delayed_message";
import * as _40 from "./delaymsg/genesis";
import * as _41 from "./delaymsg/query";
import * as _42 from "./delaymsg/tx";
import * as _43 from "./epochs/epoch_info";
import * as _44 from "./epochs/genesis";
import * as _45 from "./epochs/query";
import * as _46 from "./feetiers/genesis";
import * as _47 from "./feetiers/params";
import * as _48 from "./feetiers/query";
import * as _49 from "./feetiers/tx";
import * as _50 from "./govplus/genesis";
import * as _51 from "./govplus/query";
import * as _52 from "./govplus/tx";
import * as _53 from "./indexer/events/events";
import * as _54 from "./indexer/indexer_manager/event";
import * as _55 from "./indexer/off_chain_updates/off_chain_updates";
import * as _56 from "./indexer/protocol/v1/clob";
import * as _57 from "./indexer/protocol/v1/subaccount";
import * as _58 from "./indexer/redis/redis_order";
import * as _59 from "./indexer/shared/removal_reason";
import * as _60 from "./indexer/socks/messages";
import * as _61 from "./perpetuals/collateral";
import * as _62 from "./perpetuals/genesis";
import * as _63 from "./perpetuals/params";
import * as _64 from "./perpetuals/perpetual";
import * as _65 from "./perpetuals/query";
import * as _66 from "./perpetuals/tx";
import * as _67 from "./prices/genesis";
import * as _68 from "./prices/market_param";
import * as _69 from "./prices/market_price";
import * as _70 from "./prices/query";
import * as _71 from "./prices/tx";
import * as _72 from "./ratelimit/capacity";
import * as _73 from "./ratelimit/genesis";
import * as _74 from "./ratelimit/limit_params";
import * as _75 from "./ratelimit/pending_send_packet";
import * as _76 from "./ratelimit/query";
import * as _77 from "./ratelimit/tx";
import * as _78 from "./sending/genesis";
import * as _79 from "./sending/query";
import * as _80 from "./sending/transfer";
import * as _81 from "./sending/tx";
import * as _82 from "./stats/genesis";
import * as _83 from "./stats/params";
import * as _84 from "./stats/query";
import * as _85 from "./stats/stats";
import * as _86 from "./stats/tx";
import * as _87 from "./subaccounts/asset_position";
import * as _88 from "./subaccounts/genesis";
import * as _89 from "./subaccounts/perpetual_position";
import * as _90 from "./subaccounts/query";
import * as _91 from "./subaccounts/subaccount";
import * as _92 from "./subaccounts/tx";
import * as _93 from "./ve/ve";
import * as _94 from "./assets/query.lcd";
import * as _95 from "./blocktime/query.lcd";
import * as _96 from "./clob/query.lcd";
import * as _97 from "./delaymsg/query.lcd";
import * as _98 from "./epochs/query.lcd";
import * as _99 from "./feetiers/query.lcd";
import * as _100 from "./perpetuals/query.lcd";
import * as _101 from "./prices/query.lcd";
import * as _102 from "./ratelimit/query.lcd";
import * as _103 from "./stats/query.lcd";
import * as _104 from "./subaccounts/query.lcd";
import * as _105 from "./assets/query.rpc.Query";
import * as _106 from "./blocktime/query.rpc.Query";
import * as _107 from "./clob/query.rpc.Query";
import * as _108 from "./delaymsg/query.rpc.Query";
import * as _109 from "./epochs/query.rpc.Query";
import * as _110 from "./feetiers/query.rpc.Query";
import * as _111 from "./govplus/query.rpc.Query";
import * as _112 from "./perpetuals/query.rpc.Query";
import * as _113 from "./prices/query.rpc.Query";
import * as _114 from "./ratelimit/query.rpc.Query";
import * as _115 from "./sending/query.rpc.Query";
import * as _116 from "./stats/query.rpc.Query";
import * as _117 from "./subaccounts/query.rpc.Query";
import * as _118 from "./blocktime/tx.rpc.msg";
import * as _119 from "./clob/tx.rpc.msg";
import * as _120 from "./delaymsg/tx.rpc.msg";
import * as _121 from "./feetiers/tx.rpc.msg";
import * as _122 from "./govplus/tx.rpc.msg";
import * as _123 from "./perpetuals/tx.rpc.msg";
import * as _124 from "./prices/tx.rpc.msg";
import * as _125 from "./ratelimit/tx.rpc.msg";
import * as _126 from "./sending/tx.rpc.msg";
import * as _127 from "./stats/tx.rpc.msg";
import * as _128 from "./subaccounts/tx.rpc.msg";
import * as _129 from "./lcd";
import * as _130 from "./rpc.query";
import * as _131 from "./rpc.tx";
export namespace klyraprotocol {
  export const assets = { ..._12,
    ..._13,
    ..._14,
    ..._15,
    ..._94,
    ..._105
  };
  export const blocktime = { ..._16,
    ..._17,
    ..._18,
    ..._19,
    ..._20,
    ..._95,
    ..._106,
    ..._118
  };
  export const clob = { ..._21,
    ..._22,
    ..._23,
    ..._24,
    ..._25,
    ..._26,
    ..._27,
    ..._28,
    ..._29,
    ..._30,
    ..._31,
    ..._32,
    ..._33,
    ..._34,
    ..._96,
    ..._107,
    ..._119
  };
  export namespace daemons {
    export const deleveraging = { ..._35
    };
    export const pricefeed = { ..._36
    };
    export const sdaioracle = { ..._37
    };
  }
  export const delaymsg = { ..._38,
    ..._39,
    ..._40,
    ..._41,
    ..._42,
    ..._97,
    ..._108,
    ..._120
  };
  export const epochs = { ..._43,
    ..._44,
    ..._45,
    ..._98,
    ..._109
  };
  export const feetiers = { ..._46,
    ..._47,
    ..._48,
    ..._49,
    ..._99,
    ..._110,
    ..._121
  };
  export const govplus = { ..._50,
    ..._51,
    ..._52,
    ..._111,
    ..._122
  };
  export namespace indexer {
    export const events = { ..._53
    };
    export const indexer_manager = { ..._54
    };
    export const off_chain_updates = { ..._55
    };
    export namespace protocol {
      export const v1 = { ..._56,
        ..._57
      };
    }
    export const redis = { ..._58
    };
    export const shared = { ..._59
    };
    export const socks = { ..._60
    };
  }
  export const perpetuals = { ..._61,
    ..._62,
    ..._63,
    ..._64,
    ..._65,
    ..._66,
    ..._100,
    ..._112,
    ..._123
  };
  export const prices = { ..._67,
    ..._68,
    ..._69,
    ..._70,
    ..._71,
    ..._101,
    ..._113,
    ..._124
  };
  export const ratelimit = { ..._72,
    ..._73,
    ..._74,
    ..._75,
    ..._76,
    ..._77,
    ..._102,
    ..._114,
    ..._125
  };
  export const sending = { ..._78,
    ..._79,
    ..._80,
    ..._81,
    ..._115,
    ..._126
  };
  export const stats = { ..._82,
    ..._83,
    ..._84,
    ..._85,
    ..._86,
    ..._103,
    ..._116,
    ..._127
  };
  export const subaccounts = { ..._87,
    ..._88,
    ..._89,
    ..._90,
    ..._91,
    ..._92,
    ..._104,
    ..._117,
    ..._128
  };
  export const ve = { ..._93
  };
  export const ClientFactory = { ..._129,
    ..._130,
    ..._131
  };
}