import * as _12 from "./assets/asset";
import * as _13 from "./assets/genesis";
import * as _14 from "./assets/query";
import * as _15 from "./assets/tx";
import * as _16 from "./blocktime/blocktime";
import * as _17 from "./blocktime/genesis";
import * as _18 from "./blocktime/query";
import * as _19 from "./blocktime/tx";
import * as _20 from "./bridge/bridge_event_info";
import * as _21 from "./bridge/bridge_event";
import * as _22 from "./bridge/genesis";
import * as _23 from "./bridge/params";
import * as _24 from "./bridge/query";
import * as _25 from "./bridge/tx";
import * as _26 from "./clob/block_rate_limit_config";
import * as _27 from "./clob/clob_pair";
import * as _28 from "./clob/equity_tier_limit_config";
import * as _29 from "./clob/genesis";
import * as _30 from "./clob/liquidations_config";
import * as _31 from "./clob/liquidations";
import * as _32 from "./clob/matches";
import * as _33 from "./clob/mev";
import * as _34 from "./clob/operation";
import * as _35 from "./clob/order_removals";
import * as _36 from "./clob/order";
import * as _37 from "./clob/process_proposer_matches_events";
import * as _38 from "./clob/query";
import * as _39 from "./clob/tx";
import * as _40 from "./daemons/bridge/bridge";
import * as _41 from "./daemons/deleveraging/deleveraging";
import * as _42 from "./daemons/pricefeed/price_feed";
import * as _43 from "./daemons/sdaioracle/sdai";
import * as _44 from "./delaymsg/block_message_ids";
import * as _45 from "./delaymsg/delayed_message";
import * as _46 from "./delaymsg/genesis";
import * as _47 from "./delaymsg/query";
import * as _48 from "./delaymsg/tx";
import * as _49 from "./epochs/epoch_info";
import * as _50 from "./epochs/genesis";
import * as _51 from "./epochs/query";
import * as _52 from "./feetiers/genesis";
import * as _53 from "./feetiers/params";
import * as _54 from "./feetiers/query";
import * as _55 from "./feetiers/tx";
import * as _56 from "./govplus/genesis";
import * as _57 from "./govplus/query";
import * as _58 from "./govplus/tx";
import * as _59 from "./indexer/events/events";
import * as _60 from "./indexer/indexer_manager/event";
import * as _61 from "./indexer/off_chain_updates/off_chain_updates";
import * as _62 from "./indexer/protocol/v1/clob";
import * as _63 from "./indexer/protocol/v1/subaccount";
import * as _64 from "./indexer/redis/redis_order";
import * as _65 from "./indexer/shared/removal_reason";
import * as _66 from "./indexer/socks/messages";
import * as _67 from "./perpetuals/collateral";
import * as _68 from "./perpetuals/genesis";
import * as _69 from "./perpetuals/params";
import * as _70 from "./perpetuals/perpetual";
import * as _71 from "./perpetuals/query";
import * as _72 from "./perpetuals/tx";
import * as _73 from "./prices/genesis";
import * as _74 from "./prices/market_param";
import * as _75 from "./prices/market_price";
import * as _76 from "./prices/query";
import * as _77 from "./prices/tx";
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
import * as _94 from "./yields/genesis";
import * as _95 from "./yields/query";
import * as _96 from "./yields/tx";
import * as _97 from "./assets/query.lcd";
import * as _98 from "./blocktime/query.lcd";
import * as _99 from "./bridge/query.lcd";
import * as _100 from "./clob/query.lcd";
import * as _101 from "./delaymsg/query.lcd";
import * as _102 from "./epochs/query.lcd";
import * as _103 from "./feetiers/query.lcd";
import * as _104 from "./perpetuals/query.lcd";
import * as _105 from "./prices/query.lcd";
import * as _106 from "./stats/query.lcd";
import * as _107 from "./subaccounts/query.lcd";
import * as _108 from "./yields/query.lcd";
import * as _109 from "./assets/query.rpc.Query";
import * as _110 from "./blocktime/query.rpc.Query";
import * as _111 from "./bridge/query.rpc.Query";
import * as _112 from "./clob/query.rpc.Query";
import * as _113 from "./delaymsg/query.rpc.Query";
import * as _114 from "./epochs/query.rpc.Query";
import * as _115 from "./feetiers/query.rpc.Query";
import * as _116 from "./govplus/query.rpc.Query";
import * as _117 from "./perpetuals/query.rpc.Query";
import * as _118 from "./prices/query.rpc.Query";
import * as _119 from "./sending/query.rpc.Query";
import * as _120 from "./stats/query.rpc.Query";
import * as _121 from "./subaccounts/query.rpc.Query";
import * as _122 from "./yields/query.rpc.Query";
import * as _123 from "./bridge/tx.rpc.msg";
import * as _124 from "./clob/tx.rpc.msg";
import * as _125 from "./delaymsg/tx.rpc.msg";
import * as _126 from "./feetiers/tx.rpc.msg";
import * as _127 from "./govplus/tx.rpc.msg";
import * as _128 from "./perpetuals/tx.rpc.msg";
import * as _129 from "./prices/tx.rpc.msg";
import * as _130 from "./sending/tx.rpc.msg";
import * as _131 from "./stats/tx.rpc.msg";
import * as _132 from "./subaccounts/tx.rpc.msg";
import * as _133 from "./lcd";
import * as _134 from "./rpc.query";
import * as _135 from "./rpc.tx";
export namespace klyraprotocol {
  export const assets = { ..._12,
    ..._13,
    ..._14,
    ..._15,
    ..._97,
    ..._109
  };
  export const blocktime = { ..._16,
    ..._17,
    ..._18,
    ..._19,
    ..._98,
    ..._110
  };
  export const bridge = { ..._20,
    ..._21,
    ..._22,
    ..._23,
    ..._24,
    ..._25,
    ..._99,
    ..._111,
    ..._123
  };
  export const clob = { ..._26,
    ..._27,
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
    ..._100,
    ..._112,
    ..._124
  };
  export namespace daemons {
    export const bridge = { ..._40
    };
    export const deleveraging = { ..._41
    };
    export const pricefeed = { ..._42
    };
    export const sdaioracle = { ..._43
    };
  }
  export const delaymsg = { ..._44,
    ..._45,
    ..._46,
    ..._47,
    ..._48,
    ..._101,
    ..._113,
    ..._125
  };
  export const epochs = { ..._49,
    ..._50,
    ..._51,
    ..._102,
    ..._114
  };
  export const feetiers = { ..._52,
    ..._53,
    ..._54,
    ..._55,
    ..._103,
    ..._115,
    ..._126
  };
  export const govplus = { ..._56,
    ..._57,
    ..._58,
    ..._116,
    ..._127
  };
  export namespace indexer {
    export const events = { ..._59
    };
    export const indexer_manager = { ..._60
    };
    export const off_chain_updates = { ..._61
    };
    export namespace protocol {
      export const v1 = { ..._62,
        ..._63
      };
    }
    export const redis = { ..._64
    };
    export const shared = { ..._65
    };
    export const socks = { ..._66
    };
  }
  export const perpetuals = { ..._67,
    ..._68,
    ..._69,
    ..._70,
    ..._71,
    ..._72,
    ..._104,
    ..._117,
    ..._128
  };
  export const prices = { ..._73,
    ..._74,
    ..._75,
    ..._76,
    ..._77,
    ..._105,
    ..._118,
    ..._129
  };
  export const sending = { ..._78,
    ..._79,
    ..._80,
    ..._81,
    ..._119,
    ..._130
  };
  export const stats = { ..._82,
    ..._83,
    ..._84,
    ..._85,
    ..._86,
    ..._106,
    ..._120,
    ..._131
  };
  export const subaccounts = { ..._87,
    ..._88,
    ..._89,
    ..._90,
    ..._91,
    ..._92,
    ..._107,
    ..._121,
    ..._132
  };
  export const ve = { ..._93
  };
  export const yields = { ..._94,
    ..._95,
    ..._96,
    ..._108,
    ..._122
  };
  export const ClientFactory = { ..._133,
    ..._134,
    ..._135
  };
}