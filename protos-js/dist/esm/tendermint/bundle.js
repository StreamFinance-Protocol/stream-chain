//@ts-nocheck
import * as _169 from "./abci/types";
import * as _170 from "./crypto/keys";
import * as _171 from "./crypto/proof";
import * as _172 from "./libs/bits/types";
import * as _173 from "./p2p/types";
import * as _174 from "./types/block";
import * as _175 from "./types/evidence";
import * as _176 from "./types/params";
import * as _177 from "./types/types";
import * as _178 from "./types/validator";
import * as _179 from "./version/types";
export var tendermint;
(function (tendermint) {
    tendermint.abci = {
        ..._169
    };
    tendermint.crypto = {
        ..._170,
        ..._171
    };
    let libs;
    (function (libs) {
        libs.bits = {
            ..._172
        };
    })(libs = tendermint.libs || (tendermint.libs = {}));
    tendermint.p2p = {
        ..._173
    };
    tendermint.types = {
        ..._174,
        ..._175,
        ..._176,
        ..._177,
        ..._178
    };
    tendermint.version = {
        ..._179
    };
})(tendermint || (tendermint = {}));
