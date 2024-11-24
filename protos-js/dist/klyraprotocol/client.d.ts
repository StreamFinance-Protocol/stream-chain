import { GeneratedType, Registry, OfflineSigner } from "@cosmjs/proto-signing";
import { AminoTypes, SigningStargateClient } from "@cosmjs/stargate";
import { HttpEndpoint } from "@cosmjs/tendermint-rpc";
export declare const klyraprotocolAminoConverters: {
    "/klyraprotocol.subaccounts.MsgClaimYieldForSubaccount": {
        aminoType: string;
        toAmino: (message: import("./subaccounts/tx").MsgClaimYieldForSubaccount) => import("./subaccounts/tx").MsgClaimYieldForSubaccountAmino;
        fromAmino: (object: import("./subaccounts/tx").MsgClaimYieldForSubaccountAmino) => import("./subaccounts/tx").MsgClaimYieldForSubaccount;
    };
    "/klyraprotocol.stats.MsgUpdateParams": {
        aminoType: string;
        toAmino: (message: import("./stats/tx").MsgUpdateParams) => import("./stats/tx").MsgUpdateParamsAmino;
        fromAmino: (object: import("./stats/tx").MsgUpdateParamsAmino) => import("./stats/tx").MsgUpdateParams;
    };
    "/klyraprotocol.sending.MsgCreateTransfer": {
        aminoType: string;
        toAmino: (message: import("./sending/tx").MsgCreateTransfer) => import("./sending/tx").MsgCreateTransferAmino;
        fromAmino: (object: import("./sending/tx").MsgCreateTransferAmino) => import("./sending/tx").MsgCreateTransfer;
    };
    "/klyraprotocol.sending.MsgDepositToSubaccount": {
        aminoType: string;
        toAmino: (message: import("./sending/transfer").MsgDepositToSubaccount) => import("./sending/transfer").MsgDepositToSubaccountAmino;
        fromAmino: (object: import("./sending/transfer").MsgDepositToSubaccountAmino) => import("./sending/transfer").MsgDepositToSubaccount;
    };
    "/klyraprotocol.sending.MsgWithdrawFromSubaccount": {
        aminoType: string;
        toAmino: (message: import("./sending/transfer").MsgWithdrawFromSubaccount) => import("./sending/transfer").MsgWithdrawFromSubaccountAmino;
        fromAmino: (object: import("./sending/transfer").MsgWithdrawFromSubaccountAmino) => import("./sending/transfer").MsgWithdrawFromSubaccount;
    };
    "/klyraprotocol.sending.MsgSendFromModuleToAccount": {
        aminoType: string;
        toAmino: (message: import("./sending/transfer").MsgSendFromModuleToAccount) => import("./sending/transfer").MsgSendFromModuleToAccountAmino;
        fromAmino: (object: import("./sending/transfer").MsgSendFromModuleToAccountAmino) => import("./sending/transfer").MsgSendFromModuleToAccount;
    };
    "/klyraprotocol.ratelimit.MsgSetLimitParams": {
        aminoType: string;
        toAmino: (message: import("./ratelimit/tx").MsgSetLimitParams) => import("./ratelimit/tx").MsgSetLimitParamsAmino;
        fromAmino: (object: import("./ratelimit/tx").MsgSetLimitParamsAmino) => import("./ratelimit/tx").MsgSetLimitParams;
    };
    "/klyraprotocol.prices.MsgCreateOracleMarket": {
        aminoType: string;
        toAmino: (message: import("./prices/tx").MsgCreateOracleMarket) => import("./prices/tx").MsgCreateOracleMarketAmino;
        fromAmino: (object: import("./prices/tx").MsgCreateOracleMarketAmino) => import("./prices/tx").MsgCreateOracleMarket;
    };
    "/klyraprotocol.prices.MsgUpdateMarketParam": {
        aminoType: string;
        toAmino: (message: import("./prices/tx").MsgUpdateMarketParam) => import("./prices/tx").MsgUpdateMarketParamAmino;
        fromAmino: (object: import("./prices/tx").MsgUpdateMarketParamAmino) => import("./prices/tx").MsgUpdateMarketParam;
    };
    "/klyraprotocol.perpetuals.MsgAddPremiumVotes": {
        aminoType: string;
        toAmino: (message: import("./perpetuals/tx").MsgAddPremiumVotes) => import("./perpetuals/tx").MsgAddPremiumVotesAmino;
        fromAmino: (object: import("./perpetuals/tx").MsgAddPremiumVotesAmino) => import("./perpetuals/tx").MsgAddPremiumVotes;
    };
    "/klyraprotocol.perpetuals.MsgCreatePerpetual": {
        aminoType: string;
        toAmino: (message: import("./perpetuals/tx").MsgCreatePerpetual) => import("./perpetuals/tx").MsgCreatePerpetualAmino;
        fromAmino: (object: import("./perpetuals/tx").MsgCreatePerpetualAmino) => import("./perpetuals/tx").MsgCreatePerpetual;
    };
    "/klyraprotocol.perpetuals.MsgSetLiquidityTier": {
        aminoType: string;
        toAmino: (message: import("./perpetuals/tx").MsgSetLiquidityTier) => import("./perpetuals/tx").MsgSetLiquidityTierAmino;
        fromAmino: (object: import("./perpetuals/tx").MsgSetLiquidityTierAmino) => import("./perpetuals/tx").MsgSetLiquidityTier;
    };
    "/klyraprotocol.perpetuals.MsgUpdatePerpetualParams": {
        aminoType: string;
        toAmino: (message: import("./perpetuals/tx").MsgUpdatePerpetualParams) => import("./perpetuals/tx").MsgUpdatePerpetualParamsAmino;
        fromAmino: (object: import("./perpetuals/tx").MsgUpdatePerpetualParamsAmino) => import("./perpetuals/tx").MsgUpdatePerpetualParams;
    };
    "/klyraprotocol.perpetuals.MsgUpdateParams": {
        aminoType: string;
        toAmino: (message: import("./perpetuals/tx").MsgUpdateParams) => import("./perpetuals/tx").MsgUpdateParamsAmino;
        fromAmino: (object: import("./perpetuals/tx").MsgUpdateParamsAmino) => import("./perpetuals/tx").MsgUpdateParams;
    };
    "/klyraprotocol.govplus.MsgSlashValidator": {
        aminoType: string;
        toAmino: (message: import("./govplus/tx").MsgSlashValidator) => import("./govplus/tx").MsgSlashValidatorAmino;
        fromAmino: (object: import("./govplus/tx").MsgSlashValidatorAmino) => import("./govplus/tx").MsgSlashValidator;
    };
    "/klyraprotocol.feetiers.MsgUpdatePerpetualFeeParams": {
        aminoType: string;
        toAmino: (message: import("./feetiers/tx").MsgUpdatePerpetualFeeParams) => import("./feetiers/tx").MsgUpdatePerpetualFeeParamsAmino;
        fromAmino: (object: import("./feetiers/tx").MsgUpdatePerpetualFeeParamsAmino) => import("./feetiers/tx").MsgUpdatePerpetualFeeParams;
    };
    "/klyraprotocol.delaymsg.MsgDelayMessage": {
        aminoType: string;
        toAmino: (message: import("./delaymsg/tx").MsgDelayMessage) => import("./delaymsg/tx").MsgDelayMessageAmino;
        fromAmino: (object: import("./delaymsg/tx").MsgDelayMessageAmino) => import("./delaymsg/tx").MsgDelayMessage;
    };
    "/klyraprotocol.clob.MsgProposedOperations": {
        aminoType: string;
        toAmino: (message: import("./clob/tx").MsgProposedOperations) => import("./clob/tx").MsgProposedOperationsAmino;
        fromAmino: (object: import("./clob/tx").MsgProposedOperationsAmino) => import("./clob/tx").MsgProposedOperations;
    };
    "/klyraprotocol.clob.MsgPlaceOrder": {
        aminoType: string;
        toAmino: (message: import("./clob/tx").MsgPlaceOrder) => import("./clob/tx").MsgPlaceOrderAmino;
        fromAmino: (object: import("./clob/tx").MsgPlaceOrderAmino) => import("./clob/tx").MsgPlaceOrder;
    };
    "/klyraprotocol.clob.MsgCancelOrder": {
        aminoType: string;
        toAmino: (message: import("./clob/tx").MsgCancelOrder) => import("./clob/tx").MsgCancelOrderAmino;
        fromAmino: (object: import("./clob/tx").MsgCancelOrderAmino) => import("./clob/tx").MsgCancelOrder;
    };
    "/klyraprotocol.clob.MsgBatchCancel": {
        aminoType: string;
        toAmino: (message: import("./clob/tx").MsgBatchCancel) => import("./clob/tx").MsgBatchCancelAmino;
        fromAmino: (object: import("./clob/tx").MsgBatchCancelAmino) => import("./clob/tx").MsgBatchCancel;
    };
    "/klyraprotocol.clob.MsgCreateClobPair": {
        aminoType: string;
        toAmino: (message: import("./clob/tx").MsgCreateClobPair) => import("./clob/tx").MsgCreateClobPairAmino;
        fromAmino: (object: import("./clob/tx").MsgCreateClobPairAmino) => import("./clob/tx").MsgCreateClobPair;
    };
    "/klyraprotocol.clob.MsgUpdateClobPair": {
        aminoType: string;
        toAmino: (message: import("./clob/tx").MsgUpdateClobPair) => import("./clob/tx").MsgUpdateClobPairAmino;
        fromAmino: (object: import("./clob/tx").MsgUpdateClobPairAmino) => import("./clob/tx").MsgUpdateClobPair;
    };
    "/klyraprotocol.clob.MsgUpdateEquityTierLimitConfiguration": {
        aminoType: string;
        toAmino: (message: import("./clob/tx").MsgUpdateEquityTierLimitConfiguration) => import("./clob/tx").MsgUpdateEquityTierLimitConfigurationAmino;
        fromAmino: (object: import("./clob/tx").MsgUpdateEquityTierLimitConfigurationAmino) => import("./clob/tx").MsgUpdateEquityTierLimitConfiguration;
    };
    "/klyraprotocol.clob.MsgUpdateBlockRateLimitConfiguration": {
        aminoType: string;
        toAmino: (message: import("./clob/tx").MsgUpdateBlockRateLimitConfiguration) => import("./clob/tx").MsgUpdateBlockRateLimitConfigurationAmino;
        fromAmino: (object: import("./clob/tx").MsgUpdateBlockRateLimitConfigurationAmino) => import("./clob/tx").MsgUpdateBlockRateLimitConfiguration;
    };
    "/klyraprotocol.clob.MsgUpdateLiquidationsConfig": {
        aminoType: string;
        toAmino: (message: import("./clob/tx").MsgUpdateLiquidationsConfig) => import("./clob/tx").MsgUpdateLiquidationsConfigAmino;
        fromAmino: (object: import("./clob/tx").MsgUpdateLiquidationsConfigAmino) => import("./clob/tx").MsgUpdateLiquidationsConfig;
    };
    "/klyraprotocol.blocktime.MsgUpdateDowntimeParams": {
        aminoType: string;
        toAmino: (message: import("./blocktime/tx").MsgUpdateDowntimeParams) => import("./blocktime/tx").MsgUpdateDowntimeParamsAmino;
        fromAmino: (object: import("./blocktime/tx").MsgUpdateDowntimeParamsAmino) => import("./blocktime/tx").MsgUpdateDowntimeParams;
    };
};
export declare const klyraprotocolProtoRegistry: ReadonlyArray<[string, GeneratedType]>;
export declare const getSigningKlyraprotocolClientOptions: ({ defaultTypes }?: {
    defaultTypes?: ReadonlyArray<[string, GeneratedType]>;
}) => {
    registry: Registry;
    aminoTypes: AminoTypes;
};
export declare const getSigningKlyraprotocolClient: ({ rpcEndpoint, signer, defaultTypes }: {
    rpcEndpoint: string | HttpEndpoint;
    signer: OfflineSigner;
    defaultTypes?: ReadonlyArray<[string, GeneratedType]>;
}) => Promise<SigningStargateClient>;
