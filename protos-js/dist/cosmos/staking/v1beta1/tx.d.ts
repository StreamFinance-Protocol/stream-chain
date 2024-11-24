import { Description, DescriptionAmino, DescriptionSDKType, CommissionRates, CommissionRatesAmino, CommissionRatesSDKType, Params, ParamsAmino, ParamsSDKType } from "./staking";
import { Any, AnyProtoMsg, AnyAmino, AnySDKType } from "../../../google/protobuf/any";
import { Coin, CoinAmino, CoinSDKType } from "../../base/v1beta1/coin";
import { BinaryReader, BinaryWriter } from "../../../binary";
/** MsgCreateValidator defines a SDK message for creating a new validator. */
export interface MsgCreateValidator {
    description: Description;
    commission: CommissionRates;
    minSelfDelegation: string;
    /**
     * Deprecated: Use of Delegator Address in MsgCreateValidator is deprecated.
     * The validator address bytes and delegator address bytes refer to the same account while creating validator (defer
     * only in bech32 notation).
     */
    /** @deprecated */
    delegatorAddress: string;
    validatorAddress: string;
    pubkey?: Any | undefined;
    value: Coin;
}
export interface MsgCreateValidatorProtoMsg {
    typeUrl: "/cosmos.staking.v1beta1.MsgCreateValidator";
    value: Uint8Array;
}
export type MsgCreateValidatorEncoded = Omit<MsgCreateValidator, "pubkey"> & {
    pubkey?: AnyProtoMsg | undefined;
};
/** MsgCreateValidator defines a SDK message for creating a new validator. */
export interface MsgCreateValidatorAmino {
    description: DescriptionAmino;
    commission: CommissionRatesAmino;
    min_self_delegation: string;
    /**
     * Deprecated: Use of Delegator Address in MsgCreateValidator is deprecated.
     * The validator address bytes and delegator address bytes refer to the same account while creating validator (defer
     * only in bech32 notation).
     */
    /** @deprecated */
    delegator_address?: string;
    validator_address?: string;
    pubkey?: AnyAmino;
    value: CoinAmino;
}
export interface MsgCreateValidatorAminoMsg {
    type: "cosmos-sdk/MsgCreateValidator";
    value: MsgCreateValidatorAmino;
}
/** MsgCreateValidator defines a SDK message for creating a new validator. */
export interface MsgCreateValidatorSDKType {
    description: DescriptionSDKType;
    commission: CommissionRatesSDKType;
    min_self_delegation: string;
    /** @deprecated */
    delegator_address: string;
    validator_address: string;
    pubkey?: AnySDKType | undefined;
    value: CoinSDKType;
}
/** MsgCreateValidatorResponse defines the Msg/CreateValidator response type. */
export interface MsgCreateValidatorResponse {
}
export interface MsgCreateValidatorResponseProtoMsg {
    typeUrl: "/cosmos.staking.v1beta1.MsgCreateValidatorResponse";
    value: Uint8Array;
}
/** MsgCreateValidatorResponse defines the Msg/CreateValidator response type. */
export interface MsgCreateValidatorResponseAmino {
}
export interface MsgCreateValidatorResponseAminoMsg {
    type: "cosmos-sdk/MsgCreateValidatorResponse";
    value: MsgCreateValidatorResponseAmino;
}
/** MsgCreateValidatorResponse defines the Msg/CreateValidator response type. */
export interface MsgCreateValidatorResponseSDKType {
}
/** MsgEditValidator defines a SDK message for editing an existing validator. */
export interface MsgEditValidator {
    description: Description;
    validatorAddress: string;
    /**
     * We pass a reference to the new commission rate and min self delegation as
     * it's not mandatory to update. If not updated, the deserialized rate will be
     * zero with no way to distinguish if an update was intended.
     * REF: #2373
     */
    commissionRate: string;
    minSelfDelegation: string;
}
export interface MsgEditValidatorProtoMsg {
    typeUrl: "/cosmos.staking.v1beta1.MsgEditValidator";
    value: Uint8Array;
}
/** MsgEditValidator defines a SDK message for editing an existing validator. */
export interface MsgEditValidatorAmino {
    description: DescriptionAmino;
    validator_address?: string;
    /**
     * We pass a reference to the new commission rate and min self delegation as
     * it's not mandatory to update. If not updated, the deserialized rate will be
     * zero with no way to distinguish if an update was intended.
     * REF: #2373
     */
    commission_rate?: string;
    min_self_delegation?: string;
}
export interface MsgEditValidatorAminoMsg {
    type: "cosmos-sdk/MsgEditValidator";
    value: MsgEditValidatorAmino;
}
/** MsgEditValidator defines a SDK message for editing an existing validator. */
export interface MsgEditValidatorSDKType {
    description: DescriptionSDKType;
    validator_address: string;
    commission_rate: string;
    min_self_delegation: string;
}
/** MsgEditValidatorResponse defines the Msg/EditValidator response type. */
export interface MsgEditValidatorResponse {
}
export interface MsgEditValidatorResponseProtoMsg {
    typeUrl: "/cosmos.staking.v1beta1.MsgEditValidatorResponse";
    value: Uint8Array;
}
/** MsgEditValidatorResponse defines the Msg/EditValidator response type. */
export interface MsgEditValidatorResponseAmino {
}
export interface MsgEditValidatorResponseAminoMsg {
    type: "cosmos-sdk/MsgEditValidatorResponse";
    value: MsgEditValidatorResponseAmino;
}
/** MsgEditValidatorResponse defines the Msg/EditValidator response type. */
export interface MsgEditValidatorResponseSDKType {
}
/**
 * MsgDelegate defines a SDK message for performing a delegation of coins
 * from a delegator to a validator.
 */
export interface MsgDelegate {
    delegatorAddress: string;
    validatorAddress: string;
    amount: Coin;
}
export interface MsgDelegateProtoMsg {
    typeUrl: "/cosmos.staking.v1beta1.MsgDelegate";
    value: Uint8Array;
}
/**
 * MsgDelegate defines a SDK message for performing a delegation of coins
 * from a delegator to a validator.
 */
export interface MsgDelegateAmino {
    delegator_address?: string;
    validator_address?: string;
    amount: CoinAmino;
}
export interface MsgDelegateAminoMsg {
    type: "cosmos-sdk/MsgDelegate";
    value: MsgDelegateAmino;
}
/**
 * MsgDelegate defines a SDK message for performing a delegation of coins
 * from a delegator to a validator.
 */
export interface MsgDelegateSDKType {
    delegator_address: string;
    validator_address: string;
    amount: CoinSDKType;
}
/** MsgDelegateResponse defines the Msg/Delegate response type. */
export interface MsgDelegateResponse {
}
export interface MsgDelegateResponseProtoMsg {
    typeUrl: "/cosmos.staking.v1beta1.MsgDelegateResponse";
    value: Uint8Array;
}
/** MsgDelegateResponse defines the Msg/Delegate response type. */
export interface MsgDelegateResponseAmino {
}
export interface MsgDelegateResponseAminoMsg {
    type: "cosmos-sdk/MsgDelegateResponse";
    value: MsgDelegateResponseAmino;
}
/** MsgDelegateResponse defines the Msg/Delegate response type. */
export interface MsgDelegateResponseSDKType {
}
/**
 * MsgBeginRedelegate defines a SDK message for performing a redelegation
 * of coins from a delegator and source validator to a destination validator.
 */
export interface MsgBeginRedelegate {
    delegatorAddress: string;
    validatorSrcAddress: string;
    validatorDstAddress: string;
    amount: Coin;
}
export interface MsgBeginRedelegateProtoMsg {
    typeUrl: "/cosmos.staking.v1beta1.MsgBeginRedelegate";
    value: Uint8Array;
}
/**
 * MsgBeginRedelegate defines a SDK message for performing a redelegation
 * of coins from a delegator and source validator to a destination validator.
 */
export interface MsgBeginRedelegateAmino {
    delegator_address?: string;
    validator_src_address?: string;
    validator_dst_address?: string;
    amount: CoinAmino;
}
export interface MsgBeginRedelegateAminoMsg {
    type: "cosmos-sdk/MsgBeginRedelegate";
    value: MsgBeginRedelegateAmino;
}
/**
 * MsgBeginRedelegate defines a SDK message for performing a redelegation
 * of coins from a delegator and source validator to a destination validator.
 */
export interface MsgBeginRedelegateSDKType {
    delegator_address: string;
    validator_src_address: string;
    validator_dst_address: string;
    amount: CoinSDKType;
}
/** MsgBeginRedelegateResponse defines the Msg/BeginRedelegate response type. */
export interface MsgBeginRedelegateResponse {
    completionTime: Date;
}
export interface MsgBeginRedelegateResponseProtoMsg {
    typeUrl: "/cosmos.staking.v1beta1.MsgBeginRedelegateResponse";
    value: Uint8Array;
}
/** MsgBeginRedelegateResponse defines the Msg/BeginRedelegate response type. */
export interface MsgBeginRedelegateResponseAmino {
    completion_time: string;
}
export interface MsgBeginRedelegateResponseAminoMsg {
    type: "cosmos-sdk/MsgBeginRedelegateResponse";
    value: MsgBeginRedelegateResponseAmino;
}
/** MsgBeginRedelegateResponse defines the Msg/BeginRedelegate response type. */
export interface MsgBeginRedelegateResponseSDKType {
    completion_time: Date;
}
/**
 * MsgUndelegate defines a SDK message for performing an undelegation from a
 * delegate and a validator.
 */
export interface MsgUndelegate {
    delegatorAddress: string;
    validatorAddress: string;
    amount: Coin;
}
export interface MsgUndelegateProtoMsg {
    typeUrl: "/cosmos.staking.v1beta1.MsgUndelegate";
    value: Uint8Array;
}
/**
 * MsgUndelegate defines a SDK message for performing an undelegation from a
 * delegate and a validator.
 */
export interface MsgUndelegateAmino {
    delegator_address?: string;
    validator_address?: string;
    amount: CoinAmino;
}
export interface MsgUndelegateAminoMsg {
    type: "cosmos-sdk/MsgUndelegate";
    value: MsgUndelegateAmino;
}
/**
 * MsgUndelegate defines a SDK message for performing an undelegation from a
 * delegate and a validator.
 */
export interface MsgUndelegateSDKType {
    delegator_address: string;
    validator_address: string;
    amount: CoinSDKType;
}
/** MsgUndelegateResponse defines the Msg/Undelegate response type. */
export interface MsgUndelegateResponse {
    completionTime: Date;
    /**
     * amount returns the amount of undelegated coins
     *
     * Since: cosmos-sdk 0.50
     */
    amount: Coin;
}
export interface MsgUndelegateResponseProtoMsg {
    typeUrl: "/cosmos.staking.v1beta1.MsgUndelegateResponse";
    value: Uint8Array;
}
/** MsgUndelegateResponse defines the Msg/Undelegate response type. */
export interface MsgUndelegateResponseAmino {
    completion_time: string;
    /**
     * amount returns the amount of undelegated coins
     *
     * Since: cosmos-sdk 0.50
     */
    amount: CoinAmino;
}
export interface MsgUndelegateResponseAminoMsg {
    type: "cosmos-sdk/MsgUndelegateResponse";
    value: MsgUndelegateResponseAmino;
}
/** MsgUndelegateResponse defines the Msg/Undelegate response type. */
export interface MsgUndelegateResponseSDKType {
    completion_time: Date;
    amount: CoinSDKType;
}
/**
 * MsgCancelUnbondingDelegation defines the SDK message for performing a cancel unbonding delegation for delegator
 *
 * Since: cosmos-sdk 0.46
 */
export interface MsgCancelUnbondingDelegation {
    delegatorAddress: string;
    validatorAddress: string;
    /** amount is always less than or equal to unbonding delegation entry balance */
    amount: Coin;
    /** creation_height is the height which the unbonding took place. */
    creationHeight: bigint;
}
export interface MsgCancelUnbondingDelegationProtoMsg {
    typeUrl: "/cosmos.staking.v1beta1.MsgCancelUnbondingDelegation";
    value: Uint8Array;
}
/**
 * MsgCancelUnbondingDelegation defines the SDK message for performing a cancel unbonding delegation for delegator
 *
 * Since: cosmos-sdk 0.46
 */
export interface MsgCancelUnbondingDelegationAmino {
    delegator_address?: string;
    validator_address?: string;
    /** amount is always less than or equal to unbonding delegation entry balance */
    amount: CoinAmino;
    /** creation_height is the height which the unbonding took place. */
    creation_height?: string;
}
export interface MsgCancelUnbondingDelegationAminoMsg {
    type: "cosmos-sdk/MsgCancelUnbondingDelegation";
    value: MsgCancelUnbondingDelegationAmino;
}
/**
 * MsgCancelUnbondingDelegation defines the SDK message for performing a cancel unbonding delegation for delegator
 *
 * Since: cosmos-sdk 0.46
 */
export interface MsgCancelUnbondingDelegationSDKType {
    delegator_address: string;
    validator_address: string;
    amount: CoinSDKType;
    creation_height: bigint;
}
/**
 * MsgCancelUnbondingDelegationResponse
 *
 * Since: cosmos-sdk 0.46
 */
export interface MsgCancelUnbondingDelegationResponse {
}
export interface MsgCancelUnbondingDelegationResponseProtoMsg {
    typeUrl: "/cosmos.staking.v1beta1.MsgCancelUnbondingDelegationResponse";
    value: Uint8Array;
}
/**
 * MsgCancelUnbondingDelegationResponse
 *
 * Since: cosmos-sdk 0.46
 */
export interface MsgCancelUnbondingDelegationResponseAmino {
}
export interface MsgCancelUnbondingDelegationResponseAminoMsg {
    type: "cosmos-sdk/MsgCancelUnbondingDelegationResponse";
    value: MsgCancelUnbondingDelegationResponseAmino;
}
/**
 * MsgCancelUnbondingDelegationResponse
 *
 * Since: cosmos-sdk 0.46
 */
export interface MsgCancelUnbondingDelegationResponseSDKType {
}
/**
 * MsgUpdateParams is the Msg/UpdateParams request type.
 *
 * Since: cosmos-sdk 0.47
 */
export interface MsgUpdateParams {
    /** authority is the address that controls the module (defaults to x/gov unless overwritten). */
    authority: string;
    /**
     * params defines the x/staking parameters to update.
     *
     * NOTE: All parameters must be supplied.
     */
    params: Params;
}
export interface MsgUpdateParamsProtoMsg {
    typeUrl: "/cosmos.staking.v1beta1.MsgUpdateParams";
    value: Uint8Array;
}
/**
 * MsgUpdateParams is the Msg/UpdateParams request type.
 *
 * Since: cosmos-sdk 0.47
 */
export interface MsgUpdateParamsAmino {
    /** authority is the address that controls the module (defaults to x/gov unless overwritten). */
    authority?: string;
    /**
     * params defines the x/staking parameters to update.
     *
     * NOTE: All parameters must be supplied.
     */
    params: ParamsAmino;
}
export interface MsgUpdateParamsAminoMsg {
    type: "cosmos-sdk/x/staking/MsgUpdateParams";
    value: MsgUpdateParamsAmino;
}
/**
 * MsgUpdateParams is the Msg/UpdateParams request type.
 *
 * Since: cosmos-sdk 0.47
 */
export interface MsgUpdateParamsSDKType {
    authority: string;
    params: ParamsSDKType;
}
/**
 * MsgUpdateParamsResponse defines the response structure for executing a
 * MsgUpdateParams message.
 *
 * Since: cosmos-sdk 0.47
 */
export interface MsgUpdateParamsResponse {
}
export interface MsgUpdateParamsResponseProtoMsg {
    typeUrl: "/cosmos.staking.v1beta1.MsgUpdateParamsResponse";
    value: Uint8Array;
}
/**
 * MsgUpdateParamsResponse defines the response structure for executing a
 * MsgUpdateParams message.
 *
 * Since: cosmos-sdk 0.47
 */
export interface MsgUpdateParamsResponseAmino {
}
export interface MsgUpdateParamsResponseAminoMsg {
    type: "cosmos-sdk/MsgUpdateParamsResponse";
    value: MsgUpdateParamsResponseAmino;
}
/**
 * MsgUpdateParamsResponse defines the response structure for executing a
 * MsgUpdateParams message.
 *
 * Since: cosmos-sdk 0.47
 */
export interface MsgUpdateParamsResponseSDKType {
}
export declare const MsgCreateValidator: {
    typeUrl: string;
    aminoType: string;
    is(o: any): o is MsgCreateValidator;
    isSDK(o: any): o is MsgCreateValidatorSDKType;
    isAmino(o: any): o is MsgCreateValidatorAmino;
    encode(message: MsgCreateValidator, writer?: BinaryWriter): BinaryWriter;
    decode(input: BinaryReader | Uint8Array, length?: number): MsgCreateValidator;
    fromPartial(object: Partial<MsgCreateValidator>): MsgCreateValidator;
    fromAmino(object: MsgCreateValidatorAmino): MsgCreateValidator;
    toAmino(message: MsgCreateValidator): MsgCreateValidatorAmino;
    fromAminoMsg(object: MsgCreateValidatorAminoMsg): MsgCreateValidator;
    toAminoMsg(message: MsgCreateValidator): MsgCreateValidatorAminoMsg;
    fromProtoMsg(message: MsgCreateValidatorProtoMsg): MsgCreateValidator;
    toProto(message: MsgCreateValidator): Uint8Array;
    toProtoMsg(message: MsgCreateValidator): MsgCreateValidatorProtoMsg;
};
export declare const MsgCreateValidatorResponse: {
    typeUrl: string;
    aminoType: string;
    is(o: any): o is MsgCreateValidatorResponse;
    isSDK(o: any): o is MsgCreateValidatorResponseSDKType;
    isAmino(o: any): o is MsgCreateValidatorResponseAmino;
    encode(_: MsgCreateValidatorResponse, writer?: BinaryWriter): BinaryWriter;
    decode(input: BinaryReader | Uint8Array, length?: number): MsgCreateValidatorResponse;
    fromPartial(_: Partial<MsgCreateValidatorResponse>): MsgCreateValidatorResponse;
    fromAmino(_: MsgCreateValidatorResponseAmino): MsgCreateValidatorResponse;
    toAmino(_: MsgCreateValidatorResponse): MsgCreateValidatorResponseAmino;
    fromAminoMsg(object: MsgCreateValidatorResponseAminoMsg): MsgCreateValidatorResponse;
    toAminoMsg(message: MsgCreateValidatorResponse): MsgCreateValidatorResponseAminoMsg;
    fromProtoMsg(message: MsgCreateValidatorResponseProtoMsg): MsgCreateValidatorResponse;
    toProto(message: MsgCreateValidatorResponse): Uint8Array;
    toProtoMsg(message: MsgCreateValidatorResponse): MsgCreateValidatorResponseProtoMsg;
};
export declare const MsgEditValidator: {
    typeUrl: string;
    aminoType: string;
    is(o: any): o is MsgEditValidator;
    isSDK(o: any): o is MsgEditValidatorSDKType;
    isAmino(o: any): o is MsgEditValidatorAmino;
    encode(message: MsgEditValidator, writer?: BinaryWriter): BinaryWriter;
    decode(input: BinaryReader | Uint8Array, length?: number): MsgEditValidator;
    fromPartial(object: Partial<MsgEditValidator>): MsgEditValidator;
    fromAmino(object: MsgEditValidatorAmino): MsgEditValidator;
    toAmino(message: MsgEditValidator): MsgEditValidatorAmino;
    fromAminoMsg(object: MsgEditValidatorAminoMsg): MsgEditValidator;
    toAminoMsg(message: MsgEditValidator): MsgEditValidatorAminoMsg;
    fromProtoMsg(message: MsgEditValidatorProtoMsg): MsgEditValidator;
    toProto(message: MsgEditValidator): Uint8Array;
    toProtoMsg(message: MsgEditValidator): MsgEditValidatorProtoMsg;
};
export declare const MsgEditValidatorResponse: {
    typeUrl: string;
    aminoType: string;
    is(o: any): o is MsgEditValidatorResponse;
    isSDK(o: any): o is MsgEditValidatorResponseSDKType;
    isAmino(o: any): o is MsgEditValidatorResponseAmino;
    encode(_: MsgEditValidatorResponse, writer?: BinaryWriter): BinaryWriter;
    decode(input: BinaryReader | Uint8Array, length?: number): MsgEditValidatorResponse;
    fromPartial(_: Partial<MsgEditValidatorResponse>): MsgEditValidatorResponse;
    fromAmino(_: MsgEditValidatorResponseAmino): MsgEditValidatorResponse;
    toAmino(_: MsgEditValidatorResponse): MsgEditValidatorResponseAmino;
    fromAminoMsg(object: MsgEditValidatorResponseAminoMsg): MsgEditValidatorResponse;
    toAminoMsg(message: MsgEditValidatorResponse): MsgEditValidatorResponseAminoMsg;
    fromProtoMsg(message: MsgEditValidatorResponseProtoMsg): MsgEditValidatorResponse;
    toProto(message: MsgEditValidatorResponse): Uint8Array;
    toProtoMsg(message: MsgEditValidatorResponse): MsgEditValidatorResponseProtoMsg;
};
export declare const MsgDelegate: {
    typeUrl: string;
    aminoType: string;
    is(o: any): o is MsgDelegate;
    isSDK(o: any): o is MsgDelegateSDKType;
    isAmino(o: any): o is MsgDelegateAmino;
    encode(message: MsgDelegate, writer?: BinaryWriter): BinaryWriter;
    decode(input: BinaryReader | Uint8Array, length?: number): MsgDelegate;
    fromPartial(object: Partial<MsgDelegate>): MsgDelegate;
    fromAmino(object: MsgDelegateAmino): MsgDelegate;
    toAmino(message: MsgDelegate): MsgDelegateAmino;
    fromAminoMsg(object: MsgDelegateAminoMsg): MsgDelegate;
    toAminoMsg(message: MsgDelegate): MsgDelegateAminoMsg;
    fromProtoMsg(message: MsgDelegateProtoMsg): MsgDelegate;
    toProto(message: MsgDelegate): Uint8Array;
    toProtoMsg(message: MsgDelegate): MsgDelegateProtoMsg;
};
export declare const MsgDelegateResponse: {
    typeUrl: string;
    aminoType: string;
    is(o: any): o is MsgDelegateResponse;
    isSDK(o: any): o is MsgDelegateResponseSDKType;
    isAmino(o: any): o is MsgDelegateResponseAmino;
    encode(_: MsgDelegateResponse, writer?: BinaryWriter): BinaryWriter;
    decode(input: BinaryReader | Uint8Array, length?: number): MsgDelegateResponse;
    fromPartial(_: Partial<MsgDelegateResponse>): MsgDelegateResponse;
    fromAmino(_: MsgDelegateResponseAmino): MsgDelegateResponse;
    toAmino(_: MsgDelegateResponse): MsgDelegateResponseAmino;
    fromAminoMsg(object: MsgDelegateResponseAminoMsg): MsgDelegateResponse;
    toAminoMsg(message: MsgDelegateResponse): MsgDelegateResponseAminoMsg;
    fromProtoMsg(message: MsgDelegateResponseProtoMsg): MsgDelegateResponse;
    toProto(message: MsgDelegateResponse): Uint8Array;
    toProtoMsg(message: MsgDelegateResponse): MsgDelegateResponseProtoMsg;
};
export declare const MsgBeginRedelegate: {
    typeUrl: string;
    aminoType: string;
    is(o: any): o is MsgBeginRedelegate;
    isSDK(o: any): o is MsgBeginRedelegateSDKType;
    isAmino(o: any): o is MsgBeginRedelegateAmino;
    encode(message: MsgBeginRedelegate, writer?: BinaryWriter): BinaryWriter;
    decode(input: BinaryReader | Uint8Array, length?: number): MsgBeginRedelegate;
    fromPartial(object: Partial<MsgBeginRedelegate>): MsgBeginRedelegate;
    fromAmino(object: MsgBeginRedelegateAmino): MsgBeginRedelegate;
    toAmino(message: MsgBeginRedelegate): MsgBeginRedelegateAmino;
    fromAminoMsg(object: MsgBeginRedelegateAminoMsg): MsgBeginRedelegate;
    toAminoMsg(message: MsgBeginRedelegate): MsgBeginRedelegateAminoMsg;
    fromProtoMsg(message: MsgBeginRedelegateProtoMsg): MsgBeginRedelegate;
    toProto(message: MsgBeginRedelegate): Uint8Array;
    toProtoMsg(message: MsgBeginRedelegate): MsgBeginRedelegateProtoMsg;
};
export declare const MsgBeginRedelegateResponse: {
    typeUrl: string;
    aminoType: string;
    is(o: any): o is MsgBeginRedelegateResponse;
    isSDK(o: any): o is MsgBeginRedelegateResponseSDKType;
    isAmino(o: any): o is MsgBeginRedelegateResponseAmino;
    encode(message: MsgBeginRedelegateResponse, writer?: BinaryWriter): BinaryWriter;
    decode(input: BinaryReader | Uint8Array, length?: number): MsgBeginRedelegateResponse;
    fromPartial(object: Partial<MsgBeginRedelegateResponse>): MsgBeginRedelegateResponse;
    fromAmino(object: MsgBeginRedelegateResponseAmino): MsgBeginRedelegateResponse;
    toAmino(message: MsgBeginRedelegateResponse): MsgBeginRedelegateResponseAmino;
    fromAminoMsg(object: MsgBeginRedelegateResponseAminoMsg): MsgBeginRedelegateResponse;
    toAminoMsg(message: MsgBeginRedelegateResponse): MsgBeginRedelegateResponseAminoMsg;
    fromProtoMsg(message: MsgBeginRedelegateResponseProtoMsg): MsgBeginRedelegateResponse;
    toProto(message: MsgBeginRedelegateResponse): Uint8Array;
    toProtoMsg(message: MsgBeginRedelegateResponse): MsgBeginRedelegateResponseProtoMsg;
};
export declare const MsgUndelegate: {
    typeUrl: string;
    aminoType: string;
    is(o: any): o is MsgUndelegate;
    isSDK(o: any): o is MsgUndelegateSDKType;
    isAmino(o: any): o is MsgUndelegateAmino;
    encode(message: MsgUndelegate, writer?: BinaryWriter): BinaryWriter;
    decode(input: BinaryReader | Uint8Array, length?: number): MsgUndelegate;
    fromPartial(object: Partial<MsgUndelegate>): MsgUndelegate;
    fromAmino(object: MsgUndelegateAmino): MsgUndelegate;
    toAmino(message: MsgUndelegate): MsgUndelegateAmino;
    fromAminoMsg(object: MsgUndelegateAminoMsg): MsgUndelegate;
    toAminoMsg(message: MsgUndelegate): MsgUndelegateAminoMsg;
    fromProtoMsg(message: MsgUndelegateProtoMsg): MsgUndelegate;
    toProto(message: MsgUndelegate): Uint8Array;
    toProtoMsg(message: MsgUndelegate): MsgUndelegateProtoMsg;
};
export declare const MsgUndelegateResponse: {
    typeUrl: string;
    aminoType: string;
    is(o: any): o is MsgUndelegateResponse;
    isSDK(o: any): o is MsgUndelegateResponseSDKType;
    isAmino(o: any): o is MsgUndelegateResponseAmino;
    encode(message: MsgUndelegateResponse, writer?: BinaryWriter): BinaryWriter;
    decode(input: BinaryReader | Uint8Array, length?: number): MsgUndelegateResponse;
    fromPartial(object: Partial<MsgUndelegateResponse>): MsgUndelegateResponse;
    fromAmino(object: MsgUndelegateResponseAmino): MsgUndelegateResponse;
    toAmino(message: MsgUndelegateResponse): MsgUndelegateResponseAmino;
    fromAminoMsg(object: MsgUndelegateResponseAminoMsg): MsgUndelegateResponse;
    toAminoMsg(message: MsgUndelegateResponse): MsgUndelegateResponseAminoMsg;
    fromProtoMsg(message: MsgUndelegateResponseProtoMsg): MsgUndelegateResponse;
    toProto(message: MsgUndelegateResponse): Uint8Array;
    toProtoMsg(message: MsgUndelegateResponse): MsgUndelegateResponseProtoMsg;
};
export declare const MsgCancelUnbondingDelegation: {
    typeUrl: string;
    aminoType: string;
    is(o: any): o is MsgCancelUnbondingDelegation;
    isSDK(o: any): o is MsgCancelUnbondingDelegationSDKType;
    isAmino(o: any): o is MsgCancelUnbondingDelegationAmino;
    encode(message: MsgCancelUnbondingDelegation, writer?: BinaryWriter): BinaryWriter;
    decode(input: BinaryReader | Uint8Array, length?: number): MsgCancelUnbondingDelegation;
    fromPartial(object: Partial<MsgCancelUnbondingDelegation>): MsgCancelUnbondingDelegation;
    fromAmino(object: MsgCancelUnbondingDelegationAmino): MsgCancelUnbondingDelegation;
    toAmino(message: MsgCancelUnbondingDelegation): MsgCancelUnbondingDelegationAmino;
    fromAminoMsg(object: MsgCancelUnbondingDelegationAminoMsg): MsgCancelUnbondingDelegation;
    toAminoMsg(message: MsgCancelUnbondingDelegation): MsgCancelUnbondingDelegationAminoMsg;
    fromProtoMsg(message: MsgCancelUnbondingDelegationProtoMsg): MsgCancelUnbondingDelegation;
    toProto(message: MsgCancelUnbondingDelegation): Uint8Array;
    toProtoMsg(message: MsgCancelUnbondingDelegation): MsgCancelUnbondingDelegationProtoMsg;
};
export declare const MsgCancelUnbondingDelegationResponse: {
    typeUrl: string;
    aminoType: string;
    is(o: any): o is MsgCancelUnbondingDelegationResponse;
    isSDK(o: any): o is MsgCancelUnbondingDelegationResponseSDKType;
    isAmino(o: any): o is MsgCancelUnbondingDelegationResponseAmino;
    encode(_: MsgCancelUnbondingDelegationResponse, writer?: BinaryWriter): BinaryWriter;
    decode(input: BinaryReader | Uint8Array, length?: number): MsgCancelUnbondingDelegationResponse;
    fromPartial(_: Partial<MsgCancelUnbondingDelegationResponse>): MsgCancelUnbondingDelegationResponse;
    fromAmino(_: MsgCancelUnbondingDelegationResponseAmino): MsgCancelUnbondingDelegationResponse;
    toAmino(_: MsgCancelUnbondingDelegationResponse): MsgCancelUnbondingDelegationResponseAmino;
    fromAminoMsg(object: MsgCancelUnbondingDelegationResponseAminoMsg): MsgCancelUnbondingDelegationResponse;
    toAminoMsg(message: MsgCancelUnbondingDelegationResponse): MsgCancelUnbondingDelegationResponseAminoMsg;
    fromProtoMsg(message: MsgCancelUnbondingDelegationResponseProtoMsg): MsgCancelUnbondingDelegationResponse;
    toProto(message: MsgCancelUnbondingDelegationResponse): Uint8Array;
    toProtoMsg(message: MsgCancelUnbondingDelegationResponse): MsgCancelUnbondingDelegationResponseProtoMsg;
};
export declare const MsgUpdateParams: {
    typeUrl: string;
    aminoType: string;
    is(o: any): o is MsgUpdateParams;
    isSDK(o: any): o is MsgUpdateParamsSDKType;
    isAmino(o: any): o is MsgUpdateParamsAmino;
    encode(message: MsgUpdateParams, writer?: BinaryWriter): BinaryWriter;
    decode(input: BinaryReader | Uint8Array, length?: number): MsgUpdateParams;
    fromPartial(object: Partial<MsgUpdateParams>): MsgUpdateParams;
    fromAmino(object: MsgUpdateParamsAmino): MsgUpdateParams;
    toAmino(message: MsgUpdateParams): MsgUpdateParamsAmino;
    fromAminoMsg(object: MsgUpdateParamsAminoMsg): MsgUpdateParams;
    toAminoMsg(message: MsgUpdateParams): MsgUpdateParamsAminoMsg;
    fromProtoMsg(message: MsgUpdateParamsProtoMsg): MsgUpdateParams;
    toProto(message: MsgUpdateParams): Uint8Array;
    toProtoMsg(message: MsgUpdateParams): MsgUpdateParamsProtoMsg;
};
export declare const MsgUpdateParamsResponse: {
    typeUrl: string;
    aminoType: string;
    is(o: any): o is MsgUpdateParamsResponse;
    isSDK(o: any): o is MsgUpdateParamsResponseSDKType;
    isAmino(o: any): o is MsgUpdateParamsResponseAmino;
    encode(_: MsgUpdateParamsResponse, writer?: BinaryWriter): BinaryWriter;
    decode(input: BinaryReader | Uint8Array, length?: number): MsgUpdateParamsResponse;
    fromPartial(_: Partial<MsgUpdateParamsResponse>): MsgUpdateParamsResponse;
    fromAmino(_: MsgUpdateParamsResponseAmino): MsgUpdateParamsResponse;
    toAmino(_: MsgUpdateParamsResponse): MsgUpdateParamsResponseAmino;
    fromAminoMsg(object: MsgUpdateParamsResponseAminoMsg): MsgUpdateParamsResponse;
    toAminoMsg(message: MsgUpdateParamsResponse): MsgUpdateParamsResponseAminoMsg;
    fromProtoMsg(message: MsgUpdateParamsResponseProtoMsg): MsgUpdateParamsResponse;
    toProto(message: MsgUpdateParamsResponse): Uint8Array;
    toProtoMsg(message: MsgUpdateParamsResponse): MsgUpdateParamsResponseProtoMsg;
};
