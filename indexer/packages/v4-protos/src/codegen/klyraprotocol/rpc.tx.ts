import { Rpc } from "../helpers";
export const createRPCMsgClient = async ({
  rpc
}: {
  rpc: Rpc;
}) => ({
  klyraprotocol: {
    blocktime: new (await import("./blocktime/tx.rpc.msg")).MsgClientImpl(rpc),
    clob: new (await import("./clob/tx.rpc.msg")).MsgClientImpl(rpc),
    delaymsg: new (await import("./delaymsg/tx.rpc.msg")).MsgClientImpl(rpc),
    feetiers: new (await import("./feetiers/tx.rpc.msg")).MsgClientImpl(rpc),
    govplus: new (await import("./govplus/tx.rpc.msg")).MsgClientImpl(rpc),
    perpetuals: new (await import("./perpetuals/tx.rpc.msg")).MsgClientImpl(rpc),
    prices: new (await import("./prices/tx.rpc.msg")).MsgClientImpl(rpc),
    ratelimit: new (await import("./ratelimit/tx.rpc.msg")).MsgClientImpl(rpc),
    sending: new (await import("./sending/tx.rpc.msg")).MsgClientImpl(rpc),
    stats: new (await import("./stats/tx.rpc.msg")).MsgClientImpl(rpc),
    subaccounts: new (await import("./subaccounts/tx.rpc.msg")).MsgClientImpl(rpc)
  }
});