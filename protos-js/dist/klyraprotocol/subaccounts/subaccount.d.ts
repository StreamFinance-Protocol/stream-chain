import { AssetPosition, AssetPositionAmino, AssetPositionSDKType } from "./asset_position";
import { PerpetualPosition, PerpetualPositionAmino, PerpetualPositionSDKType } from "./perpetual_position";
import { BinaryReader, BinaryWriter } from "../../binary";
/** SubaccountId defines a unique identifier for a Subaccount. */
export interface SubaccountId {
    /** The address of the wallet that owns this subaccount. */
    owner: string;
    /**
     * The unique number of this subaccount for the owner.
     * Currently limited to 128*1000 subaccounts per owner.
     */
    number: number;
}
export interface SubaccountIdProtoMsg {
    typeUrl: "/klyraprotocol.subaccounts.SubaccountId";
    value: Uint8Array;
}
/** SubaccountId defines a unique identifier for a Subaccount. */
export interface SubaccountIdAmino {
    /** The address of the wallet that owns this subaccount. */
    owner?: string;
    /**
     * The unique number of this subaccount for the owner.
     * Currently limited to 128*1000 subaccounts per owner.
     */
    number?: number;
}
export interface SubaccountIdAminoMsg {
    type: "/klyraprotocol.subaccounts.SubaccountId";
    value: SubaccountIdAmino;
}
/** SubaccountId defines a unique identifier for a Subaccount. */
export interface SubaccountIdSDKType {
    owner: string;
    number: number;
}
/**
 * Subaccount defines a single sub-account for a given address.
 * Subaccounts are uniquely indexed by a subaccountNumber/owner pair.
 */
export interface Subaccount {
    /** The Id of the Subaccount */
    id?: SubaccountId;
    /**
     * All `AssetPosition`s associated with this subaccount.
     * Always sorted ascending by `asset_id`.
     */
    assetPositions: AssetPosition[];
    /**
     * All `PerpetualPosition`s associated with this subaccount.
     * Always sorted ascending by `perpetual_id.
     */
    perpetualPositions: PerpetualPosition[];
    /**
     * Set by the owner. If true, then margin trades can be made in this
     * subaccount.
     */
    marginEnabled: boolean;
    /**
     * The current yield index is determined by the cumulative
     * all-time history of the yield mechanism for assets.
     * Starts at 0. This string should always be converted big.Rat.
     */
    assetYieldIndex: string;
}
export interface SubaccountProtoMsg {
    typeUrl: "/klyraprotocol.subaccounts.Subaccount";
    value: Uint8Array;
}
/**
 * Subaccount defines a single sub-account for a given address.
 * Subaccounts are uniquely indexed by a subaccountNumber/owner pair.
 */
export interface SubaccountAmino {
    /** The Id of the Subaccount */
    id?: SubaccountIdAmino;
    /**
     * All `AssetPosition`s associated with this subaccount.
     * Always sorted ascending by `asset_id`.
     */
    asset_positions?: AssetPositionAmino[];
    /**
     * All `PerpetualPosition`s associated with this subaccount.
     * Always sorted ascending by `perpetual_id.
     */
    perpetual_positions?: PerpetualPositionAmino[];
    /**
     * Set by the owner. If true, then margin trades can be made in this
     * subaccount.
     */
    margin_enabled?: boolean;
    /**
     * The current yield index is determined by the cumulative
     * all-time history of the yield mechanism for assets.
     * Starts at 0. This string should always be converted big.Rat.
     */
    asset_yield_index?: string;
}
export interface SubaccountAminoMsg {
    type: "/klyraprotocol.subaccounts.Subaccount";
    value: SubaccountAmino;
}
/**
 * Subaccount defines a single sub-account for a given address.
 * Subaccounts are uniquely indexed by a subaccountNumber/owner pair.
 */
export interface SubaccountSDKType {
    id?: SubaccountIdSDKType;
    asset_positions: AssetPositionSDKType[];
    perpetual_positions: PerpetualPositionSDKType[];
    margin_enabled: boolean;
    asset_yield_index: string;
}
export declare const SubaccountId: {
    typeUrl: string;
    is(o: any): o is SubaccountId;
    isSDK(o: any): o is SubaccountIdSDKType;
    isAmino(o: any): o is SubaccountIdAmino;
    encode(message: SubaccountId, writer?: BinaryWriter): BinaryWriter;
    decode(input: BinaryReader | Uint8Array, length?: number): SubaccountId;
    fromPartial(object: Partial<SubaccountId>): SubaccountId;
    fromAmino(object: SubaccountIdAmino): SubaccountId;
    toAmino(message: SubaccountId): SubaccountIdAmino;
    fromAminoMsg(object: SubaccountIdAminoMsg): SubaccountId;
    fromProtoMsg(message: SubaccountIdProtoMsg): SubaccountId;
    toProto(message: SubaccountId): Uint8Array;
    toProtoMsg(message: SubaccountId): SubaccountIdProtoMsg;
};
export declare const Subaccount: {
    typeUrl: string;
    is(o: any): o is Subaccount;
    isSDK(o: any): o is SubaccountSDKType;
    isAmino(o: any): o is SubaccountAmino;
    encode(message: Subaccount, writer?: BinaryWriter): BinaryWriter;
    decode(input: BinaryReader | Uint8Array, length?: number): Subaccount;
    fromPartial(object: Partial<Subaccount>): Subaccount;
    fromAmino(object: SubaccountAmino): Subaccount;
    toAmino(message: Subaccount): SubaccountAmino;
    fromAminoMsg(object: SubaccountAminoMsg): Subaccount;
    fromProtoMsg(message: SubaccountProtoMsg): Subaccount;
    toProto(message: Subaccount): Uint8Array;
    toProtoMsg(message: Subaccount): SubaccountProtoMsg;
};
