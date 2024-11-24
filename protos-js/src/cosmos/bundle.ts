//@ts-nocheck
import * as _2 from "./app/runtime/v1alpha1/module";
import * as _3 from "./auth/module/v1/module";
import * as _4 from "./auth/v1beta1/auth";
import * as _5 from "./auth/v1beta1/genesis";
import * as _6 from "./auth/v1beta1/query";
import * as _7 from "./auth/v1beta1/tx";
import * as _8 from "./authz/module/v1/module";
import * as _9 from "./authz/v1beta1/authz";
import * as _10 from "./authz/v1beta1/event";
import * as _11 from "./authz/v1beta1/genesis";
import * as _12 from "./authz/v1beta1/query";
import * as _13 from "./authz/v1beta1/tx";
import * as _14 from "./bank/module/v1/module";
import * as _15 from "./bank/v1beta1/authz";
import * as _16 from "./bank/v1beta1/bank";
import * as _17 from "./bank/v1beta1/genesis";
import * as _18 from "./bank/v1beta1/query";
import * as _19 from "./bank/v1beta1/tx";
import * as _20 from "./base/abci/v1beta1/abci";
import * as _21 from "./base/node/v1beta1/query";
import * as _22 from "./base/query/v1beta1/pagination";
import * as _23 from "./base/reflection/v2alpha1/reflection";
import * as _24 from "./base/v1beta1/coin";
import * as _25 from "./circuit/module/v1/module";
import * as _26 from "./circuit/v1/query";
import * as _27 from "./circuit/v1/tx";
import * as _28 from "./circuit/v1/types";
import * as _29 from "./consensus/module/v1/module";
import * as _30 from "./consensus/v1/query";
import * as _31 from "./consensus/v1/tx";
import * as _32 from "./crisis/module/v1/module";
import * as _33 from "./crypto/ed25519/keys";
import * as _34 from "./crypto/hd/v1/hd";
import * as _35 from "./crypto/keyring/v1/record";
import * as _36 from "./crypto/multisig/keys";
import * as _37 from "./crypto/secp256k1/keys";
import * as _38 from "./crypto/secp256r1/keys";
import * as _39 from "./distribution/module/v1/module";
import * as _40 from "./distribution/v1beta1/distribution";
import * as _41 from "./distribution/v1beta1/genesis";
import * as _42 from "./distribution/v1beta1/query";
import * as _43 from "./distribution/v1beta1/tx";
import * as _44 from "./evidence/module/v1/module";
import * as _45 from "./feegrant/module/v1/module";
import * as _46 from "./genutil/module/v1/module";
import * as _47 from "./gov/module/v1/module";
import * as _48 from "./gov/v1/genesis";
import * as _49 from "./gov/v1/gov";
import * as _50 from "./gov/v1/query";
import * as _51 from "./gov/v1/tx";
import * as _52 from "./gov/v1beta1/genesis";
import * as _53 from "./gov/v1beta1/gov";
import * as _54 from "./gov/v1beta1/query";
import * as _55 from "./gov/v1beta1/tx";
import * as _56 from "./group/module/v1/module";
import * as _57 from "./mint/module/v1/module";
import * as _58 from "./msg/textual/v1/textual";
import * as _59 from "./nft/module/v1/module";
import * as _60 from "./orm/module/v1alpha1/module";
import * as _61 from "./orm/query/v1alpha1/query";
import * as _62 from "./params/module/v1/module";
import * as _63 from "./query/v1/query";
import * as _64 from "./reflection/v1/reflection";
import * as _65 from "./slashing/module/v1/module";
import * as _66 from "./staking/module/v1/module";
import * as _67 from "./staking/v1beta1/authz";
import * as _68 from "./staking/v1beta1/genesis";
import * as _69 from "./staking/v1beta1/query";
import * as _70 from "./staking/v1beta1/staking";
import * as _71 from "./staking/v1beta1/tx";
import * as _72 from "./store/internal/kv/v1beta1/kv";
import * as _73 from "./store/snapshots/v1/snapshot";
import * as _74 from "./store/streaming/abci/grpc";
import * as _75 from "./store/v1beta1/commit_info";
import * as _76 from "./store/v1beta1/listening";
import * as _77 from "./tx/config/v1/config";
import * as _78 from "./tx/signing/v1beta1/signing";
import * as _79 from "./tx/v1beta1/service";
import * as _80 from "./tx/v1beta1/tx";
import * as _81 from "./upgrade/module/v1/module";
import * as _82 from "./upgrade/v1beta1/query";
import * as _83 from "./upgrade/v1beta1/tx";
import * as _84 from "./upgrade/v1beta1/upgrade";
import * as _85 from "./vesting/module/v1/module";
import * as _184 from "./auth/v1beta1/tx.amino";
import * as _185 from "./authz/v1beta1/tx.amino";
import * as _186 from "./bank/v1beta1/tx.amino";
import * as _187 from "./circuit/v1/tx.amino";
import * as _188 from "./consensus/v1/tx.amino";
import * as _189 from "./distribution/v1beta1/tx.amino";
import * as _190 from "./gov/v1/tx.amino";
import * as _191 from "./gov/v1beta1/tx.amino";
import * as _192 from "./staking/v1beta1/tx.amino";
import * as _193 from "./upgrade/v1beta1/tx.amino";
import * as _194 from "./auth/v1beta1/tx.registry";
import * as _195 from "./authz/v1beta1/tx.registry";
import * as _196 from "./bank/v1beta1/tx.registry";
import * as _197 from "./circuit/v1/tx.registry";
import * as _198 from "./consensus/v1/tx.registry";
import * as _199 from "./distribution/v1beta1/tx.registry";
import * as _200 from "./gov/v1/tx.registry";
import * as _201 from "./gov/v1beta1/tx.registry";
import * as _202 from "./staking/v1beta1/tx.registry";
import * as _203 from "./upgrade/v1beta1/tx.registry";
import * as _204 from "./auth/v1beta1/query.lcd";
import * as _205 from "./authz/v1beta1/query.lcd";
import * as _206 from "./bank/v1beta1/query.lcd";
import * as _207 from "./base/node/v1beta1/query.lcd";
import * as _208 from "./circuit/v1/query.lcd";
import * as _209 from "./consensus/v1/query.lcd";
import * as _210 from "./distribution/v1beta1/query.lcd";
import * as _211 from "./gov/v1/query.lcd";
import * as _212 from "./gov/v1beta1/query.lcd";
import * as _213 from "./staking/v1beta1/query.lcd";
import * as _214 from "./tx/v1beta1/service.lcd";
import * as _215 from "./upgrade/v1beta1/query.lcd";
import * as _216 from "./auth/v1beta1/query.rpc.Query";
import * as _217 from "./authz/v1beta1/query.rpc.Query";
import * as _218 from "./bank/v1beta1/query.rpc.Query";
import * as _219 from "./base/node/v1beta1/query.rpc.Service";
import * as _220 from "./circuit/v1/query.rpc.Query";
import * as _221 from "./consensus/v1/query.rpc.Query";
import * as _222 from "./distribution/v1beta1/query.rpc.Query";
import * as _223 from "./gov/v1/query.rpc.Query";
import * as _224 from "./gov/v1beta1/query.rpc.Query";
import * as _225 from "./orm/query/v1alpha1/query.rpc.Query";
import * as _226 from "./staking/v1beta1/query.rpc.Query";
import * as _227 from "./tx/v1beta1/service.rpc.Service";
import * as _228 from "./upgrade/v1beta1/query.rpc.Query";
import * as _229 from "./auth/v1beta1/tx.rpc.msg";
import * as _230 from "./authz/v1beta1/tx.rpc.msg";
import * as _231 from "./bank/v1beta1/tx.rpc.msg";
import * as _232 from "./circuit/v1/tx.rpc.msg";
import * as _233 from "./consensus/v1/tx.rpc.msg";
import * as _234 from "./distribution/v1beta1/tx.rpc.msg";
import * as _235 from "./gov/v1/tx.rpc.msg";
import * as _236 from "./gov/v1beta1/tx.rpc.msg";
import * as _237 from "./staking/v1beta1/tx.rpc.msg";
import * as _238 from "./upgrade/v1beta1/tx.rpc.msg";
import * as _296 from "./lcd";
import * as _297 from "./rpc.query";
import * as _298 from "./rpc.tx";
export namespace cosmos {
  export namespace app {
    export namespace runtime {
      export const v1alpha1 = {
        ..._2
      };
    }
  }
  export namespace auth {
    export namespace module {
      export const v1 = {
        ..._3
      };
    }
    export const v1beta1 = {
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
  }
  export namespace authz {
    export namespace module {
      export const v1 = {
        ..._8
      };
    }
    export const v1beta1 = {
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
  }
  export namespace bank {
    export namespace module {
      export const v1 = {
        ..._14
      };
    }
    export const v1beta1 = {
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
  }
  export namespace base {
    export namespace abci {
      export const v1beta1 = {
        ..._20
      };
    }
    export namespace node {
      export const v1beta1 = {
        ..._21,
        ..._207,
        ..._219
      };
    }
    export namespace query {
      export const v1beta1 = {
        ..._22
      };
    }
    export namespace reflection {
      export const v2alpha1 = {
        ..._23
      };
    }
    export const v1beta1 = {
      ..._24
    };
  }
  export namespace circuit {
    export namespace module {
      export const v1 = {
        ..._25
      };
    }
    export const v1 = {
      ..._26,
      ..._27,
      ..._28,
      ..._187,
      ..._197,
      ..._208,
      ..._220,
      ..._232
    };
  }
  export namespace consensus {
    export namespace module {
      export const v1 = {
        ..._29
      };
    }
    export const v1 = {
      ..._30,
      ..._31,
      ..._188,
      ..._198,
      ..._209,
      ..._221,
      ..._233
    };
  }
  export namespace crisis {
    export namespace module {
      export const v1 = {
        ..._32
      };
    }
  }
  export namespace crypto {
    export const ed25519 = {
      ..._33
    };
    export namespace hd {
      export const v1 = {
        ..._34
      };
    }
    export namespace keyring {
      export const v1 = {
        ..._35
      };
    }
    export const multisig = {
      ..._36
    };
    export const secp256k1 = {
      ..._37
    };
    export const secp256r1 = {
      ..._38
    };
  }
  export namespace distribution {
    export namespace module {
      export const v1 = {
        ..._39
      };
    }
    export const v1beta1 = {
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
  }
  export namespace evidence {
    export namespace module {
      export const v1 = {
        ..._44
      };
    }
  }
  export namespace feegrant {
    export namespace module {
      export const v1 = {
        ..._45
      };
    }
  }
  export namespace genutil {
    export namespace module {
      export const v1 = {
        ..._46
      };
    }
  }
  export namespace gov {
    export namespace module {
      export const v1 = {
        ..._47
      };
    }
    export const v1 = {
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
    export const v1beta1 = {
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
  }
  export namespace group {
    export namespace module {
      export const v1 = {
        ..._56
      };
    }
  }
  export namespace mint {
    export namespace module {
      export const v1 = {
        ..._57
      };
    }
  }
  export namespace msg {
    export namespace textual {
      export const v1 = {
        ..._58
      };
    }
  }
  export namespace nft {
    export namespace module {
      export const v1 = {
        ..._59
      };
    }
  }
  export namespace orm {
    export namespace module {
      export const v1alpha1 = {
        ..._60
      };
    }
    export namespace query {
      export const v1alpha1 = {
        ..._61,
        ..._225
      };
    }
  }
  export namespace params {
    export namespace module {
      export const v1 = {
        ..._62
      };
    }
  }
  export namespace query {
    export const v1 = {
      ..._63
    };
  }
  export namespace reflection {
    export const v1 = {
      ..._64
    };
  }
  export namespace slashing {
    export namespace module {
      export const v1 = {
        ..._65
      };
    }
  }
  export namespace staking {
    export namespace module {
      export const v1 = {
        ..._66
      };
    }
    export const v1beta1 = {
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
  }
  export namespace store {
    export namespace internal {
      export namespace kv {
        export const v1beta1 = {
          ..._72
        };
      }
    }
    export namespace snapshots {
      export const v1 = {
        ..._73
      };
    }
    export namespace streaming {
      export const abci = {
        ..._74
      };
    }
    export const v1beta1 = {
      ..._75,
      ..._76
    };
  }
  export namespace tx {
    export namespace config {
      export const v1 = {
        ..._77
      };
    }
    export namespace signing {
      export const v1beta1 = {
        ..._78
      };
    }
    export const v1beta1 = {
      ..._79,
      ..._80,
      ..._214,
      ..._227
    };
  }
  export namespace upgrade {
    export namespace module {
      export const v1 = {
        ..._81
      };
    }
    export const v1beta1 = {
      ..._82,
      ..._83,
      ..._84,
      ..._193,
      ..._203,
      ..._215,
      ..._228,
      ..._238
    };
  }
  export namespace vesting {
    export namespace module {
      export const v1 = {
        ..._85
      };
    }
  }
  export const ClientFactory = {
    ..._296,
    ..._297,
    ..._298
  };
}