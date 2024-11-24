import { MsgClaimYieldForSubaccount } from "./tx";
export const registry = [["/klyraprotocol.subaccounts.MsgClaimYieldForSubaccount", MsgClaimYieldForSubaccount]];
export const load = (protoRegistry) => {
    registry.forEach(([typeUrl, mod]) => {
        protoRegistry.register(typeUrl, mod);
    });
};
export const MessageComposer = {
    encoded: {
        claimYieldForSubaccount(value) {
            return {
                typeUrl: "/klyraprotocol.subaccounts.MsgClaimYieldForSubaccount",
                value: MsgClaimYieldForSubaccount.encode(value).finish()
            };
        }
    },
    withTypeUrl: {
        claimYieldForSubaccount(value) {
            return {
                typeUrl: "/klyraprotocol.subaccounts.MsgClaimYieldForSubaccount",
                value
            };
        }
    },
    fromPartial: {
        claimYieldForSubaccount(value) {
            return {
                typeUrl: "/klyraprotocol.subaccounts.MsgClaimYieldForSubaccount",
                value: MsgClaimYieldForSubaccount.fromPartial(value)
            };
        }
    }
};
