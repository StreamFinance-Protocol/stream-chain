import { MsgSetWithdrawAddress, MsgWithdrawDelegatorReward, MsgWithdrawValidatorCommission, MsgFundCommunityPool, MsgUpdateParams, MsgCommunityPoolSpend, MsgDepositValidatorRewardsPool } from "./tx";
export declare const AminoConverter: {
    "/cosmos.distribution.v1beta1.MsgSetWithdrawAddress": {
        aminoType: string;
        toAmino: (message: MsgSetWithdrawAddress) => import("./tx").MsgSetWithdrawAddressAmino;
        fromAmino: (object: import("./tx").MsgSetWithdrawAddressAmino) => MsgSetWithdrawAddress;
    };
    "/cosmos.distribution.v1beta1.MsgWithdrawDelegatorReward": {
        aminoType: string;
        toAmino: (message: MsgWithdrawDelegatorReward) => import("./tx").MsgWithdrawDelegatorRewardAmino;
        fromAmino: (object: import("./tx").MsgWithdrawDelegatorRewardAmino) => MsgWithdrawDelegatorReward;
    };
    "/cosmos.distribution.v1beta1.MsgWithdrawValidatorCommission": {
        aminoType: string;
        toAmino: (message: MsgWithdrawValidatorCommission) => import("./tx").MsgWithdrawValidatorCommissionAmino;
        fromAmino: (object: import("./tx").MsgWithdrawValidatorCommissionAmino) => MsgWithdrawValidatorCommission;
    };
    "/cosmos.distribution.v1beta1.MsgFundCommunityPool": {
        aminoType: string;
        toAmino: (message: MsgFundCommunityPool) => import("./tx").MsgFundCommunityPoolAmino;
        fromAmino: (object: import("./tx").MsgFundCommunityPoolAmino) => MsgFundCommunityPool;
    };
    "/cosmos.distribution.v1beta1.MsgUpdateParams": {
        aminoType: string;
        toAmino: (message: MsgUpdateParams) => import("./tx").MsgUpdateParamsAmino;
        fromAmino: (object: import("./tx").MsgUpdateParamsAmino) => MsgUpdateParams;
    };
    "/cosmos.distribution.v1beta1.MsgCommunityPoolSpend": {
        aminoType: string;
        toAmino: (message: MsgCommunityPoolSpend) => import("./tx").MsgCommunityPoolSpendAmino;
        fromAmino: (object: import("./tx").MsgCommunityPoolSpendAmino) => MsgCommunityPoolSpend;
    };
    "/cosmos.distribution.v1beta1.MsgDepositValidatorRewardsPool": {
        aminoType: string;
        toAmino: (message: MsgDepositValidatorRewardsPool) => import("./tx").MsgDepositValidatorRewardsPoolAmino;
        fromAmino: (object: import("./tx").MsgDepositValidatorRewardsPoolAmino) => MsgDepositValidatorRewardsPool;
    };
};
