//@ts-nocheck
import { GeneratedType, Registry } from "@cosmjs/proto-signing";
import { MsgSetLimitParams } from "./tx";
export const registry: ReadonlyArray<[string, GeneratedType]> = [["/klyraprotocol.ratelimit.MsgSetLimitParams", MsgSetLimitParams]];
export const load = (protoRegistry: Registry) => {
  registry.forEach(([typeUrl, mod]) => {
    protoRegistry.register(typeUrl, mod);
  });
};
export const MessageComposer = {
  encoded: {
    setLimitParams(value: MsgSetLimitParams) {
      return {
        typeUrl: "/klyraprotocol.ratelimit.MsgSetLimitParams",
        value: MsgSetLimitParams.encode(value).finish()
      };
    }
  },
  withTypeUrl: {
    setLimitParams(value: MsgSetLimitParams) {
      return {
        typeUrl: "/klyraprotocol.ratelimit.MsgSetLimitParams",
        value
      };
    }
  },
  fromPartial: {
    setLimitParams(value: MsgSetLimitParams) {
      return {
        typeUrl: "/klyraprotocol.ratelimit.MsgSetLimitParams",
        value: MsgSetLimitParams.fromPartial(value)
      };
    }
  }
};