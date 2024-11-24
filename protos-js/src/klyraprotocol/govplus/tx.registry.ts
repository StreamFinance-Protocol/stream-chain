//@ts-nocheck
import { GeneratedType, Registry } from "@cosmjs/proto-signing";
import { MsgSlashValidator } from "./tx";
export const registry: ReadonlyArray<[string, GeneratedType]> = [["/klyraprotocol.govplus.MsgSlashValidator", MsgSlashValidator]];
export const load = (protoRegistry: Registry) => {
  registry.forEach(([typeUrl, mod]) => {
    protoRegistry.register(typeUrl, mod);
  });
};
export const MessageComposer = {
  encoded: {
    slashValidator(value: MsgSlashValidator) {
      return {
        typeUrl: "/klyraprotocol.govplus.MsgSlashValidator",
        value: MsgSlashValidator.encode(value).finish()
      };
    }
  },
  withTypeUrl: {
    slashValidator(value: MsgSlashValidator) {
      return {
        typeUrl: "/klyraprotocol.govplus.MsgSlashValidator",
        value
      };
    }
  },
  fromPartial: {
    slashValidator(value: MsgSlashValidator) {
      return {
        typeUrl: "/klyraprotocol.govplus.MsgSlashValidator",
        value: MsgSlashValidator.fromPartial(value)
      };
    }
  }
};