//@ts-nocheck
import { GeneratedType, Registry } from "@cosmjs/proto-signing";
import { MsgClaimYieldForSubaccount } from "./tx";
export const registry: ReadonlyArray<[string, GeneratedType]> = [["/klyraprotocol.subaccounts.MsgClaimYieldForSubaccount", MsgClaimYieldForSubaccount]];
export const load = (protoRegistry: Registry) => {
  registry.forEach(([typeUrl, mod]) => {
    protoRegistry.register(typeUrl, mod);
  });
};
export const MessageComposer = {
  encoded: {
    claimYieldForSubaccount(value: MsgClaimYieldForSubaccount) {
      return {
        typeUrl: "/klyraprotocol.subaccounts.MsgClaimYieldForSubaccount",
        value: MsgClaimYieldForSubaccount.encode(value).finish()
      };
    }
  },
  withTypeUrl: {
    claimYieldForSubaccount(value: MsgClaimYieldForSubaccount) {
      return {
        typeUrl: "/klyraprotocol.subaccounts.MsgClaimYieldForSubaccount",
        value
      };
    }
  },
  fromPartial: {
    claimYieldForSubaccount(value: MsgClaimYieldForSubaccount) {
      return {
        typeUrl: "/klyraprotocol.subaccounts.MsgClaimYieldForSubaccount",
        value: MsgClaimYieldForSubaccount.fromPartial(value)
      };
    }
  }
};