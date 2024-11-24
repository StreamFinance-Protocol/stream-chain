"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.AminoConverter = void 0;
//@ts-nocheck
const tx_1 = require("./tx");
exports.AminoConverter = {
    "/cosmos.distribution.v1beta1.MsgSetWithdrawAddress": {
        aminoType: "cosmos-sdk/MsgModifyWithdrawAddress",
        toAmino: tx_1.MsgSetWithdrawAddress.toAmino,
        fromAmino: tx_1.MsgSetWithdrawAddress.fromAmino
    },
    "/cosmos.distribution.v1beta1.MsgWithdrawDelegatorReward": {
        aminoType: "cosmos-sdk/MsgWithdrawDelegationReward",
        toAmino: tx_1.MsgWithdrawDelegatorReward.toAmino,
        fromAmino: tx_1.MsgWithdrawDelegatorReward.fromAmino
    },
    "/cosmos.distribution.v1beta1.MsgWithdrawValidatorCommission": {
        aminoType: "cosmos-sdk/MsgWithdrawValidatorCommission",
        toAmino: tx_1.MsgWithdrawValidatorCommission.toAmino,
        fromAmino: tx_1.MsgWithdrawValidatorCommission.fromAmino
    },
    "/cosmos.distribution.v1beta1.MsgFundCommunityPool": {
        aminoType: "cosmos-sdk/MsgFundCommunityPool",
        toAmino: tx_1.MsgFundCommunityPool.toAmino,
        fromAmino: tx_1.MsgFundCommunityPool.fromAmino
    },
    "/cosmos.distribution.v1beta1.MsgUpdateParams": {
        aminoType: "cosmos-sdk/distribution/MsgUpdateParams",
        toAmino: tx_1.MsgUpdateParams.toAmino,
        fromAmino: tx_1.MsgUpdateParams.fromAmino
    },
    "/cosmos.distribution.v1beta1.MsgCommunityPoolSpend": {
        aminoType: "cosmos-sdk/distr/MsgCommunityPoolSpend",
        toAmino: tx_1.MsgCommunityPoolSpend.toAmino,
        fromAmino: tx_1.MsgCommunityPoolSpend.fromAmino
    },
    "/cosmos.distribution.v1beta1.MsgDepositValidatorRewardsPool": {
        aminoType: "cosmos-sdk/distr/MsgDepositValRewards",
        toAmino: tx_1.MsgDepositValidatorRewardsPool.toAmino,
        fromAmino: tx_1.MsgDepositValidatorRewardsPool.fromAmino
    }
};
