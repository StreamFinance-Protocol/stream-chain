import { MsgSlashValidator } from "./tx";
export const registry = [["/klyraprotocol.govplus.MsgSlashValidator", MsgSlashValidator]];
export const load = (protoRegistry) => {
    registry.forEach(([typeUrl, mod]) => {
        protoRegistry.register(typeUrl, mod);
    });
};
export const MessageComposer = {
    encoded: {
        slashValidator(value) {
            return {
                typeUrl: "/klyraprotocol.govplus.MsgSlashValidator",
                value: MsgSlashValidator.encode(value).finish()
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
                value: MsgSlashValidator.fromPartial(value)
            };
        }
    }
};
