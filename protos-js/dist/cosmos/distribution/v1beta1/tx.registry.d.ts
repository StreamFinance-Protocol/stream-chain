import { GeneratedType, Registry } from "@cosmjs/proto-signing";
import { MsgSetWithdrawAddress, MsgWithdrawDelegatorReward, MsgWithdrawValidatorCommission, MsgFundCommunityPool, MsgUpdateParams, MsgCommunityPoolSpend, MsgDepositValidatorRewardsPool } from "./tx";
export declare const registry: ReadonlyArray<[string, GeneratedType]>;
export declare const load: (protoRegistry: Registry) => void;
export declare const MessageComposer: {
    encoded: {
        setWithdrawAddress(value: MsgSetWithdrawAddress): {
            typeUrl: string;
            value: Uint8Array<ArrayBufferLike>;
        };
        withdrawDelegatorReward(value: MsgWithdrawDelegatorReward): {
            typeUrl: string;
            value: Uint8Array<ArrayBufferLike>;
        };
        withdrawValidatorCommission(value: MsgWithdrawValidatorCommission): {
            typeUrl: string;
            value: Uint8Array<ArrayBufferLike>;
        };
        fundCommunityPool(value: MsgFundCommunityPool): {
            typeUrl: string;
            value: Uint8Array<ArrayBufferLike>;
        };
        updateParams(value: MsgUpdateParams): {
            typeUrl: string;
            value: Uint8Array<ArrayBufferLike>;
        };
        communityPoolSpend(value: MsgCommunityPoolSpend): {
            typeUrl: string;
            value: Uint8Array<ArrayBufferLike>;
        };
        depositValidatorRewardsPool(value: MsgDepositValidatorRewardsPool): {
            typeUrl: string;
            value: Uint8Array<ArrayBufferLike>;
        };
    };
    withTypeUrl: {
        setWithdrawAddress(value: MsgSetWithdrawAddress): {
            typeUrl: string;
            value: MsgSetWithdrawAddress;
        };
        withdrawDelegatorReward(value: MsgWithdrawDelegatorReward): {
            typeUrl: string;
            value: MsgWithdrawDelegatorReward;
        };
        withdrawValidatorCommission(value: MsgWithdrawValidatorCommission): {
            typeUrl: string;
            value: MsgWithdrawValidatorCommission;
        };
        fundCommunityPool(value: MsgFundCommunityPool): {
            typeUrl: string;
            value: MsgFundCommunityPool;
        };
        updateParams(value: MsgUpdateParams): {
            typeUrl: string;
            value: MsgUpdateParams;
        };
        communityPoolSpend(value: MsgCommunityPoolSpend): {
            typeUrl: string;
            value: MsgCommunityPoolSpend;
        };
        depositValidatorRewardsPool(value: MsgDepositValidatorRewardsPool): {
            typeUrl: string;
            value: MsgDepositValidatorRewardsPool;
        };
    };
    fromPartial: {
        setWithdrawAddress(value: MsgSetWithdrawAddress): {
            typeUrl: string;
            value: MsgSetWithdrawAddress;
        };
        withdrawDelegatorReward(value: MsgWithdrawDelegatorReward): {
            typeUrl: string;
            value: MsgWithdrawDelegatorReward;
        };
        withdrawValidatorCommission(value: MsgWithdrawValidatorCommission): {
            typeUrl: string;
            value: MsgWithdrawValidatorCommission;
        };
        fundCommunityPool(value: MsgFundCommunityPool): {
            typeUrl: string;
            value: MsgFundCommunityPool;
        };
        updateParams(value: MsgUpdateParams): {
            typeUrl: string;
            value: MsgUpdateParams;
        };
        communityPoolSpend(value: MsgCommunityPoolSpend): {
            typeUrl: string;
            value: MsgCommunityPoolSpend;
        };
        depositValidatorRewardsPool(value: MsgDepositValidatorRewardsPool): {
            typeUrl: string;
            value: MsgDepositValidatorRewardsPool;
        };
    };
};
