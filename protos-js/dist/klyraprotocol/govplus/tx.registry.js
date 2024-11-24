"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.MessageComposer = exports.load = exports.registry = void 0;
const tx_1 = require("./tx");
exports.registry = [["/klyraprotocol.govplus.MsgSlashValidator", tx_1.MsgSlashValidator]];
const load = (protoRegistry) => {
    exports.registry.forEach(([typeUrl, mod]) => {
        protoRegistry.register(typeUrl, mod);
    });
};
exports.load = load;
exports.MessageComposer = {
    encoded: {
        slashValidator(value) {
            return {
                typeUrl: "/klyraprotocol.govplus.MsgSlashValidator",
                value: tx_1.MsgSlashValidator.encode(value).finish()
            };
        }
    },
    withTypeUrl: {
        slashValidator(value) {
            return {
                typeUrl: "/klyraprotocol.govplus.MsgSlashValidator",
                value
            };
        }
    },
    fromPartial: {
        slashValidator(value) {
            return {
                typeUrl: "/klyraprotocol.govplus.MsgSlashValidator",
                value: tx_1.MsgSlashValidator.fromPartial(value)
            };
        }
    }
};
