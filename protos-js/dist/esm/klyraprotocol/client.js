//@ts-nocheck
import { Registry } from "@cosmjs/proto-signing";
import { defaultRegistryTypes, AminoTypes, SigningStargateClient } from "@cosmjs/stargate";
import * as klyraprotocolBlocktimeTxRegistry from "./blocktime/tx.registry";
import * as klyraprotocolClobTxRegistry from "./clob/tx.registry";
import * as klyraprotocolDelaymsgTxRegistry from "./delaymsg/tx.registry";
import * as klyraprotocolFeetiersTxRegistry from "./feetiers/tx.registry";
import * as klyraprotocolGovplusTxRegistry from "./govplus/tx.registry";
import * as klyraprotocolPerpetualsTxRegistry from "./perpetuals/tx.registry";
import * as klyraprotocolPricesTxRegistry from "./prices/tx.registry";
import * as klyraprotocolRatelimitTxRegistry from "./ratelimit/tx.registry";
import * as klyraprotocolSendingTxRegistry from "./sending/tx.registry";
import * as klyraprotocolStatsTxRegistry from "./stats/tx.registry";
import * as klyraprotocolSubaccountsTxRegistry from "./subaccounts/tx.registry";
import * as klyraprotocolBlocktimeTxAmino from "./blocktime/tx.amino";
import * as klyraprotocolClobTxAmino from "./clob/tx.amino";
import * as klyraprotocolDelaymsgTxAmino from "./delaymsg/tx.amino";
import * as klyraprotocolFeetiersTxAmino from "./feetiers/tx.amino";
import * as klyraprotocolGovplusTxAmino from "./govplus/tx.amino";
import * as klyraprotocolPerpetualsTxAmino from "./perpetuals/tx.amino";
import * as klyraprotocolPricesTxAmino from "./prices/tx.amino";
import * as klyraprotocolRatelimitTxAmino from "./ratelimit/tx.amino";
import * as klyraprotocolSendingTxAmino from "./sending/tx.amino";
import * as klyraprotocolStatsTxAmino from "./stats/tx.amino";
import * as klyraprotocolSubaccountsTxAmino from "./subaccounts/tx.amino";
export const klyraprotocolAminoConverters = {
    ...klyraprotocolBlocktimeTxAmino.AminoConverter,
    ...klyraprotocolClobTxAmino.AminoConverter,
    ...klyraprotocolDelaymsgTxAmino.AminoConverter,
    ...klyraprotocolFeetiersTxAmino.AminoConverter,
    ...klyraprotocolGovplusTxAmino.AminoConverter,
    ...klyraprotocolPerpetualsTxAmino.AminoConverter,
    ...klyraprotocolPricesTxAmino.AminoConverter,
    ...klyraprotocolRatelimitTxAmino.AminoConverter,
    ...klyraprotocolSendingTxAmino.AminoConverter,
    ...klyraprotocolStatsTxAmino.AminoConverter,
    ...klyraprotocolSubaccountsTxAmino.AminoConverter
};
export const klyraprotocolProtoRegistry = [...klyraprotocolBlocktimeTxRegistry.registry, ...klyraprotocolClobTxRegistry.registry, ...klyraprotocolDelaymsgTxRegistry.registry, ...klyraprotocolFeetiersTxRegistry.registry, ...klyraprotocolGovplusTxRegistry.registry, ...klyraprotocolPerpetualsTxRegistry.registry, ...klyraprotocolPricesTxRegistry.registry, ...klyraprotocolRatelimitTxRegistry.registry, ...klyraprotocolSendingTxRegistry.registry, ...klyraprotocolStatsTxRegistry.registry, ...klyraprotocolSubaccountsTxRegistry.registry];
export const getSigningKlyraprotocolClientOptions = ({ defaultTypes = defaultRegistryTypes } = {}) => {
    const registry = new Registry([...defaultTypes, ...klyraprotocolProtoRegistry]);
    const aminoTypes = new AminoTypes({
        ...klyraprotocolAminoConverters
    });
    return {
        registry,
        aminoTypes
    };
};
export const getSigningKlyraprotocolClient = async ({ rpcEndpoint, signer, defaultTypes = defaultRegistryTypes }) => {
    const { registry, aminoTypes } = getSigningKlyraprotocolClientOptions({
        defaultTypes
    });
    const client = await SigningStargateClient.connectWithSigner(rpcEndpoint, signer, {
        registry: registry,
        aminoTypes
    });
    return client;
};
