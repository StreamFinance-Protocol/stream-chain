import * as _12 from "./assets/asset";
import * as _13 from "./assets/genesis";
import * as _14 from "./assets/query";
import * as _15 from "./assets/tx";
import * as _16 from "./blocktime/blocktime";
import * as _17 from "./blocktime/genesis";
import * as _18 from "./blocktime/params";
import * as _19 from "./blocktime/query";
import * as _20 from "./blocktime/tx";
import * as _21 from "./bridge/bridge_event_info";
import * as _22 from "./bridge/bridge_event";
import * as _23 from "./bridge/genesis";
import * as _24 from "./bridge/params";
import * as _25 from "./bridge/query";
import * as _26 from "./bridge/tx";
import * as _27 from "./clob/block_rate_limit_config";
import * as _28 from "./clob/clob_pair";
import * as _29 from "./clob/equity_tier_limit_config";
import * as _30 from "./clob/genesis";
import * as _31 from "./clob/liquidations_config";
import * as _32 from "./clob/liquidations";
import * as _33 from "./clob/matches";
import * as _34 from "./clob/mev";
import * as _35 from "./clob/operation";
import * as _36 from "./clob/order_removals";
import * as _37 from "./clob/order";
import * as _38 from "./clob/process_proposer_matches_events";
import * as _39 from "./clob/query";
import * as _40 from "./clob/tx";
import * as _41 from "./daemons/bridge/bridge";
import * as _42 from "./daemons/deleveraging/deleveraging";
import * as _43 from "./daemons/pricefeed/price_feed";
import * as _44 from "./daemons/sdaioracle/sdai";
import * as _45 from "./delaymsg/block_message_ids";
import * as _46 from "./delaymsg/delayed_message";
import * as _47 from "./delaymsg/genesis";
import * as _48 from "./delaymsg/query";
import * as _49 from "./delaymsg/tx";
import * as _50 from "./epochs/epoch_info";
import * as _51 from "./epochs/genesis";
import * as _52 from "./epochs/query";
import * as _53 from "./feetiers/genesis";
import * as _54 from "./feetiers/params";
import * as _55 from "./feetiers/query";
import * as _56 from "./feetiers/tx";
import * as _57 from "./govplus/genesis";
import * as _58 from "./govplus/query";
import * as _59 from "./govplus/tx";
import * as _60 from "./indexer/events/events";
import * as _61 from "./indexer/indexer_manager/event";
import * as _62 from "./indexer/off_chain_updates/off_chain_updates";
import * as _63 from "./indexer/protocol/v1/clob";
import * as _64 from "./indexer/protocol/v1/subaccount";
import * as _65 from "./indexer/redis/redis_order";
import * as _66 from "./indexer/shared/removal_reason";
import * as _67 from "./indexer/socks/messages";
import * as _68 from "./perpetuals/collateral";
import * as _69 from "./perpetuals/genesis";
import * as _70 from "./perpetuals/params";
import * as _71 from "./perpetuals/perpetual";
import * as _72 from "./perpetuals/query";
import * as _73 from "./perpetuals/tx";
import * as _74 from "./prices/genesis";
import * as _75 from "./prices/market_param";
import * as _76 from "./prices/market_price";
import * as _77 from "./prices/query";
import * as _78 from "./prices/tx";
import * as _79 from "./ratelimit/capacity";
import * as _80 from "./ratelimit/genesis";
import * as _81 from "./ratelimit/limit_params";
import * as _82 from "./ratelimit/pending_send_packet";
import * as _83 from "./ratelimit/query";
import * as _84 from "./ratelimit/tx";
import * as _85 from "./sending/genesis";
import * as _86 from "./sending/query";
import * as _87 from "./sending/transfer";
import * as _88 from "./sending/tx";
import * as _89 from "./stats/genesis";
import * as _90 from "./stats/params";
import * as _91 from "./stats/query";
import * as _92 from "./stats/stats";
import * as _93 from "./stats/tx";
import * as _94 from "./subaccounts/asset_position";
import * as _95 from "./subaccounts/genesis";
import * as _96 from "./subaccounts/perpetual_position";
import * as _97 from "./subaccounts/query";
import * as _98 from "./subaccounts/subaccount";
import * as _99 from "./subaccounts/tx";
import * as _100 from "./ve/ve";
import * as _101 from "./assets/query.lcd";
import * as _102 from "./blocktime/query.lcd";
import * as _103 from "./bridge/query.lcd";
import * as _104 from "./clob/query.lcd";
import * as _105 from "./delaymsg/query.lcd";
import * as _106 from "./epochs/query.lcd";
import * as _107 from "./feetiers/query.lcd";
import * as _108 from "./perpetuals/query.lcd";
import * as _109 from "./prices/query.lcd";
import * as _110 from "./ratelimit/query.lcd";
import * as _111 from "./stats/query.lcd";
import * as _112 from "./subaccounts/query.lcd";
import * as _113 from "./assets/query.rpc.Query";
import * as _114 from "./blocktime/query.rpc.Query";
import * as _115 from "./bridge/query.rpc.Query";
import * as _116 from "./clob/query.rpc.Query";
import * as _117 from "./delaymsg/query.rpc.Query";
import * as _118 from "./epochs/query.rpc.Query";
import * as _119 from "./feetiers/query.rpc.Query";
import * as _120 from "./govplus/query.rpc.Query";
import * as _121 from "./perpetuals/query.rpc.Query";
import * as _122 from "./prices/query.rpc.Query";
import * as _123 from "./ratelimit/query.rpc.Query";
import * as _124 from "./sending/query.rpc.Query";
import * as _125 from "./stats/query.rpc.Query";
import * as _126 from "./subaccounts/query.rpc.Query";
import * as _127 from "./blocktime/tx.rpc.msg";
import * as _128 from "./bridge/tx.rpc.msg";
import * as _129 from "./clob/tx.rpc.msg";
import * as _130 from "./delaymsg/tx.rpc.msg";
import * as _131 from "./feetiers/tx.rpc.msg";
import * as _132 from "./govplus/tx.rpc.msg";
import * as _133 from "./perpetuals/tx.rpc.msg";
import * as _134 from "./prices/tx.rpc.msg";
import * as _135 from "./ratelimit/tx.rpc.msg";
import * as _136 from "./sending/tx.rpc.msg";
import * as _137 from "./stats/tx.rpc.msg";
import * as _138 from "./subaccounts/tx.rpc.msg";
import * as _139 from "./lcd";
import * as _140 from "./rpc.query";
import * as _141 from "./rpc.tx";
export namespace klyraprotocol {
  export const assets = { ..._12,
    ..._13,
    ..._14,
    ..._15,
    ..._101,
    ..._113
  };
  export const blocktime = { ..._16,
    ..._17,
    ..._18,
    ..._19,
    ..._20,
    ..._102,
    ..._114,
    ..._127
  };
  export const bridge = { ..._21,
    ..._22,
    ..._23,
    ..._24,
    ..._25,
    ..._26,
    ..._103,
    ..._115,
    ..._128
  };
  export const clob = { ..._27,
    ..._28,
    ..._29,
    ..._30,
    ..._31,
    ..._32,
    ..._33,
    ..._34,
    ..._35,
    ..._36,
    ..._37,
    ..._38,
    ..._39,
    ..._40,
    ..._104,
    ..._116,
    ..._129
  };
  export namespace daemons {
    export const bridge = { ..._41
    };
    export const deleveraging = { ..._42
    };
    export const pricefeed = { ..._43
    };
    export const sdaioracle = { ..._44
    };
  }
  export const delaymsg = { ..._45,
    ..._46,
    ..._47,
    ..._48,
    ..._49,
    ..._105,
    ..._117,
    ..._130
  };
  export const epochs = { ..._50,
    ..._51,
    ..._52,
    ..._106,
    ..._118
  };
  export const feetiers = { ..._53,
    ..._54,
    ..._55,
    ..._56,
    ..._107,
    ..._119,
    ..._131
  };
  export const govplus = { ..._57,
    ..._58,
    ..._59,
    ..._120,
    ..._132
  };
  export namespace indexer {
    export const events = { ..._60
    };
    export const indexer_manager = { ..._61
    };
    export const off_chain_updates = { ..._62
    };
    export namespace protocol {
      export const v1 = { ..._63,
        ..._64
      };
    }
    export const redis = { ..._65
    };
    export const shared = { ..._66
    };
    export const socks = { ..._67
    };
  }
  export const perpetuals = { ..._68,
    ..._69,
    ..._70,
    ..._71,
    ..._72,
    ..._73,
    ..._108,
    ..._121,
    ..._133
  };
  export const prices = { ..._74,
    ..._75,
    ..._76,
    ..._77,
    ..._78,
    ..._109,
    ..._122,
    ..._134
  };
  export const ratelimit = { ..._79,
    ..._80,
    ..._81,
    ..._82,
    ..._83,
    ..._84,
    ..._110,
    ..._123,
    ..._135
  };
  export const sending = { ..._85,
    ..._86,
    ..._87,
    ..._88,
    ..._124,
    ..._136
  };
  export const stats = { ..._89,
    ..._90,
    ..._91,
    ..._92,
    ..._93,
    ..._111,
    ..._125,
    ..._137
  };
  export const subaccounts = { ..._94,
    ..._95,
    ..._96,
    ..._97,
    ..._98,
    ..._99,
    ..._112,
    ..._126,
    ..._138
  };
  export const ve = { ..._100
  };
  export const ClientFactory = { ..._139,
    ..._140,
    ..._141
  };
}