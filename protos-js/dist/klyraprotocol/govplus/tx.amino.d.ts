import { MsgSlashValidator } from "./tx";
export declare const AminoConverter: {
    "/klyraprotocol.govplus.MsgSlashValidator": {
        aminoType: string;
        toAmino: (message: MsgSlashValidator) => import("./tx").MsgSlashValidatorAmino;
        fromAmino: (object: import("./tx").MsgSlashValidatorAmino) => MsgSlashValidator;
    };
};
