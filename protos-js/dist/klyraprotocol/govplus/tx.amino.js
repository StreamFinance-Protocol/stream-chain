"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.AminoConverter = void 0;
//@ts-nocheck
const tx_1 = require("./tx");
exports.AminoConverter = {
    "/klyraprotocol.govplus.MsgSlashValidator": {
        aminoType: "/klyraprotocol.govplus.MsgSlashValidator",
        toAmino: tx_1.MsgSlashValidator.toAmino,
        fromAmino: tx_1.MsgSlashValidator.fromAmino
    }
};
