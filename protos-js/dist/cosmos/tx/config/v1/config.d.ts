import { BinaryReader, BinaryWriter } from "../../../../binary";
/** Config is the config object of the x/auth/tx package. */
export interface Config {
    /**
     * skip_ante_handler defines whether the ante handler registration should be skipped in case an app wants to override
     * this functionality.
     */
    skipAnteHandler: boolean;
    /**
     * skip_post_handler defines whether the post handler registration should be skipped in case an app wants to override
     * this functionality.
     */
    skipPostHandler: boolean;
}
export interface ConfigProtoMsg {
    typeUrl: "/cosmos.tx.config.v1.Config";
    value: Uint8Array;
}
/** Config is the config object of the x/auth/tx package. */
export interface ConfigAmino {
    /**
     * skip_ante_handler defines whether the ante handler registration should be skipped in case an app wants to override
     * this functionality.
     */
    skip_ante_handler?: boolean;
    /**
     * skip_post_handler defines whether the post handler registration should be skipped in case an app wants to override
     * this functionality.
     */
    skip_post_handler?: boolean;
}
export interface ConfigAminoMsg {
    type: "cosmos-sdk/Config";
    value: ConfigAmino;
}
/** Config is the config object of the x/auth/tx package. */
export interface ConfigSDKType {
    skip_ante_handler: boolean;
    skip_post_handler: boolean;
}
export declare const Config: {
    typeUrl: string;
    aminoType: string;
    is(o: any): o is Config;
    isSDK(o: any): o is ConfigSDKType;
    isAmino(o: any): o is ConfigAmino;
    encode(message: Config, writer?: BinaryWriter): BinaryWriter;
    decode(input: BinaryReader | Uint8Array, length?: number): Config;
    fromPartial(object: Partial<Config>): Config;
    fromAmino(object: ConfigAmino): Config;
    toAmino(message: Config): ConfigAmino;
    fromAminoMsg(object: ConfigAminoMsg): Config;
    toAminoMsg(message: Config): ConfigAminoMsg;
    fromProtoMsg(message: ConfigProtoMsg): Config;
    toProto(message: Config): Uint8Array;
    toProtoMsg(message: Config): ConfigProtoMsg;
};
