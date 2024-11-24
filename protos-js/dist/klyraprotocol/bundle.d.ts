import * as _87 from "./assets/asset";
import * as _88 from "./assets/genesis";
import * as _89 from "./assets/query";
import * as _91 from "./blocktime/blocktime";
import * as _92 from "./blocktime/genesis";
import * as _93 from "./blocktime/params";
import * as _94 from "./blocktime/query";
import * as _95 from "./blocktime/tx";
import * as _96 from "./clob/block_rate_limit_config";
import * as _97 from "./clob/clob_pair";
import * as _98 from "./clob/equity_tier_limit_config";
import * as _99 from "./clob/genesis";
import * as _100 from "./clob/liquidations_config";
import * as _101 from "./clob/liquidations";
import * as _102 from "./clob/matches";
import * as _103 from "./clob/mev";
import * as _104 from "./clob/operation";
import * as _105 from "./clob/order_removals";
import * as _106 from "./clob/order";
import * as _107 from "./clob/process_proposer_matches_events";
import * as _108 from "./clob/query";
import * as _109 from "./clob/tx";
import * as _110 from "./daemons/deleveraging/deleveraging";
import * as _111 from "./daemons/pricefeed/price_feed";
import * as _112 from "./daemons/sdaioracle/sdai";
import * as _113 from "./delaymsg/block_message_ids";
import * as _114 from "./delaymsg/delayed_message";
import * as _115 from "./delaymsg/genesis";
import * as _116 from "./delaymsg/query";
import * as _117 from "./delaymsg/tx";
import * as _118 from "./epochs/epoch_info";
import * as _119 from "./epochs/genesis";
import * as _120 from "./epochs/query";
import * as _121 from "./feetiers/genesis";
import * as _122 from "./feetiers/params";
import * as _123 from "./feetiers/query";
import * as _124 from "./feetiers/tx";
import * as _125 from "./govplus/genesis";
import * as _127 from "./govplus/tx";
import * as _128 from "./indexer/events/events";
import * as _129 from "./indexer/indexer_manager/event";
import * as _130 from "./indexer/off_chain_updates/off_chain_updates";
import * as _131 from "./indexer/protocol/v1/clob";
import * as _132 from "./indexer/protocol/v1/perpetual";
import * as _133 from "./indexer/protocol/v1/subaccount";
import * as _134 from "./indexer/redis/redis_order";
import * as _135 from "./indexer/shared/removal_reason";
import * as _136 from "./indexer/socks/messages";
import * as _137 from "./perpetuals/genesis";
import * as _138 from "./perpetuals/params";
import * as _139 from "./perpetuals/perpetual";
import * as _140 from "./perpetuals/query";
import * as _141 from "./perpetuals/tx";
import * as _142 from "./prices/genesis";
import * as _143 from "./prices/market_param";
import * as _144 from "./prices/market_price";
import * as _145 from "./prices/query";
import * as _146 from "./prices/tx";
import * as _147 from "./ratelimit/capacity";
import * as _148 from "./ratelimit/genesis";
import * as _149 from "./ratelimit/limit_params";
import * as _150 from "./ratelimit/pending_send_packet";
import * as _151 from "./ratelimit/query";
import * as _152 from "./ratelimit/tx";
import * as _153 from "./sending/genesis";
import * as _155 from "./sending/transfer";
import * as _156 from "./sending/tx";
import * as _157 from "./stats/genesis";
import * as _158 from "./stats/params";
import * as _159 from "./stats/query";
import * as _160 from "./stats/stats";
import * as _161 from "./stats/tx";
import * as _162 from "./subaccounts/asset_position";
import * as _163 from "./subaccounts/genesis";
import * as _164 from "./subaccounts/perpetual_position";
import * as _165 from "./subaccounts/query";
import * as _166 from "./subaccounts/subaccount";
import * as _167 from "./subaccounts/tx";
import * as _168 from "./ve/ve";
import * as _261 from "./assets/query.lcd";
import * as _262 from "./blocktime/query.lcd";
import * as _263 from "./clob/query.lcd";
import * as _264 from "./delaymsg/query.lcd";
import * as _265 from "./epochs/query.lcd";
import * as _266 from "./feetiers/query.lcd";
import * as _267 from "./perpetuals/query.lcd";
import * as _268 from "./prices/query.lcd";
import * as _269 from "./ratelimit/query.lcd";
import * as _270 from "./stats/query.lcd";
import * as _271 from "./subaccounts/query.lcd";
import * as _272 from "./assets/query.rpc.Query";
import * as _273 from "./blocktime/query.rpc.Query";
import * as _274 from "./clob/query.rpc.Query";
import * as _275 from "./delaymsg/query.rpc.Query";
import * as _276 from "./epochs/query.rpc.Query";
import * as _277 from "./feetiers/query.rpc.Query";
import * as _278 from "./govplus/query.rpc.Query";
import * as _279 from "./perpetuals/query.rpc.Query";
import * as _280 from "./prices/query.rpc.Query";
import * as _281 from "./ratelimit/query.rpc.Query";
import * as _282 from "./sending/query.rpc.Query";
import * as _283 from "./stats/query.rpc.Query";
import * as _284 from "./subaccounts/query.rpc.Query";
import * as _285 from "./blocktime/tx.rpc.msg";
import * as _286 from "./clob/tx.rpc.msg";
import * as _287 from "./delaymsg/tx.rpc.msg";
import * as _288 from "./feetiers/tx.rpc.msg";
import * as _289 from "./govplus/tx.rpc.msg";
import * as _290 from "./perpetuals/tx.rpc.msg";
import * as _291 from "./prices/tx.rpc.msg";
import * as _292 from "./ratelimit/tx.rpc.msg";
import * as _293 from "./sending/tx.rpc.msg";
import * as _294 from "./stats/tx.rpc.msg";
import * as _295 from "./subaccounts/tx.rpc.msg";
export declare namespace klyraprotocol {
    const assets: {
        QueryClientImpl: typeof _272.QueryClientImpl;
        createRpcQueryExtension: (base: import("@cosmjs/stargate").QueryClient) => {
            asset(request: _89.QueryAssetRequest): Promise<_89.QueryAssetResponse>;
            allAssets(request?: _89.QueryAllAssetsRequest): Promise<_89.QueryAllAssetsResponse>;
        };
        LCDQueryClient: typeof _261.LCDQueryClient;
        QueryAssetRequest: {
            typeUrl: string;
            is(o: any): o is _89.QueryAssetRequest;
            isSDK(o: any): o is _89.QueryAssetRequestSDKType;
            isAmino(o: any): o is _89.QueryAssetRequestAmino;
            encode(message: _89.QueryAssetRequest, writer?: import("..").BinaryWriter): import("..").BinaryWriter;
            decode(input: import("..").BinaryReader | Uint8Array, length?: number): _89.QueryAssetRequest;
            fromPartial(object: Partial<_89.QueryAssetRequest>): _89.QueryAssetRequest;
            fromAmino(object: _89.QueryAssetRequestAmino): _89.QueryAssetRequest;
            toAmino(message: _89.QueryAssetRequest): _89.QueryAssetRequestAmino;
            fromAminoMsg(object: _89.QueryAssetRequestAminoMsg): _89.QueryAssetRequest;
            fromProtoMsg(message: _89.QueryAssetRequestProtoMsg): _89.QueryAssetRequest;
            toProto(message: _89.QueryAssetRequest): Uint8Array;
            toProtoMsg(message: _89.QueryAssetRequest): _89.QueryAssetRequestProtoMsg;
        };
        QueryAssetResponse: {
            typeUrl: string;
            is(o: any): o is _89.QueryAssetResponse;
            isSDK(o: any): o is _89.QueryAssetResponseSDKType;
            isAmino(o: any): o is _89.QueryAssetResponseAmino;
            encode(message: _89.QueryAssetResponse, writer?: import("..").BinaryWriter): import("..").BinaryWriter;
            decode(input: import("..").BinaryReader | Uint8Array, length?: number): _89.QueryAssetResponse;
            fromPartial(object: Partial<_89.QueryAssetResponse>): _89.QueryAssetResponse;
            fromAmino(object: _89.QueryAssetResponseAmino): _89.QueryAssetResponse;
            toAmino(message: _89.QueryAssetResponse): _89.QueryAssetResponseAmino;
            fromAminoMsg(object: _89.QueryAssetResponseAminoMsg): _89.QueryAssetResponse;
            fromProtoMsg(message: _89.QueryAssetResponseProtoMsg): _89.QueryAssetResponse;
            toProto(message: _89.QueryAssetResponse): Uint8Array;
            toProtoMsg(message: _89.QueryAssetResponse): _89.QueryAssetResponseProtoMsg;
        };
        QueryAllAssetsRequest: {
            typeUrl: string;
            is(o: any): o is _89.QueryAllAssetsRequest;
            isSDK(o: any): o is _89.QueryAllAssetsRequestSDKType;
            isAmino(o: any): o is _89.QueryAllAssetsRequestAmino;
            encode(message: _89.QueryAllAssetsRequest, writer?: import("..").BinaryWriter): import("..").BinaryWriter;
            decode(input: import("..").BinaryReader | Uint8Array, length?: number): _89.QueryAllAssetsRequest;
            fromPartial(object: Partial<_89.QueryAllAssetsRequest>): _89.QueryAllAssetsRequest;
            fromAmino(object: _89.QueryAllAssetsRequestAmino): _89.QueryAllAssetsRequest;
            toAmino(message: _89.QueryAllAssetsRequest): _89.QueryAllAssetsRequestAmino;
            fromAminoMsg(object: _89.QueryAllAssetsRequestAminoMsg): _89.QueryAllAssetsRequest;
            fromProtoMsg(message: _89.QueryAllAssetsRequestProtoMsg): _89.QueryAllAssetsRequest;
            toProto(message: _89.QueryAllAssetsRequest): Uint8Array;
            toProtoMsg(message: _89.QueryAllAssetsRequest): _89.QueryAllAssetsRequestProtoMsg;
        };
        QueryAllAssetsResponse: {
            typeUrl: string;
            is(o: any): o is _89.QueryAllAssetsResponse;
            isSDK(o: any): o is _89.QueryAllAssetsResponseSDKType;
            isAmino(o: any): o is _89.QueryAllAssetsResponseAmino;
            encode(message: _89.QueryAllAssetsResponse, writer?: import("..").BinaryWriter): import("..").BinaryWriter;
            decode(input: import("..").BinaryReader | Uint8Array, length?: number): _89.QueryAllAssetsResponse;
            fromPartial(object: Partial<_89.QueryAllAssetsResponse>): _89.QueryAllAssetsResponse;
            fromAmino(object: _89.QueryAllAssetsResponseAmino): _89.QueryAllAssetsResponse;
            toAmino(message: _89.QueryAllAssetsResponse): _89.QueryAllAssetsResponseAmino;
            fromAminoMsg(object: _89.QueryAllAssetsResponseAminoMsg): _89.QueryAllAssetsResponse;
            fromProtoMsg(message: _89.QueryAllAssetsResponseProtoMsg): _89.QueryAllAssetsResponse;
            toProto(message: _89.QueryAllAssetsResponse): Uint8Array;
            toProtoMsg(message: _89.QueryAllAssetsResponse): _89.QueryAllAssetsResponseProtoMsg;
        };
        GenesisState: {
            typeUrl: string;
            is(o: any): o is _88.GenesisState;
            isSDK(o: any): o is _88.GenesisStateSDKType;
            isAmino(o: any): o is _88.GenesisStateAmino;
            encode(message: _88.GenesisState, writer?: import("..").BinaryWriter): import("..").BinaryWriter;
            decode(input: import("..").BinaryReader | Uint8Array, length?: number): _88.GenesisState;
            fromPartial(object: Partial<_88.GenesisState>): _88.GenesisState;
            fromAmino(object: _88.GenesisStateAmino): _88.GenesisState;
            toAmino(message: _88.GenesisState): _88.GenesisStateAmino;
            fromAminoMsg(object: _88.GenesisStateAminoMsg): _88.GenesisState;
            fromProtoMsg(message: _88.GenesisStateProtoMsg): _88.GenesisState;
            toProto(message: _88.GenesisState): Uint8Array;
            toProtoMsg(message: _88.GenesisState): _88.GenesisStateProtoMsg;
        };
        Asset: {
            typeUrl: string;
            is(o: any): o is _87.Asset;
            isSDK(o: any): o is _87.AssetSDKType;
            isAmino(o: any): o is _87.AssetAmino;
            encode(message: _87.Asset, writer?: import("..").BinaryWriter): import("..").BinaryWriter;
            decode(input: import("..").BinaryReader | Uint8Array, length?: number): _87.Asset;
            fromPartial(object: Partial<_87.Asset>): _87.Asset;
            fromAmino(object: _87.AssetAmino): _87.Asset;
            toAmino(message: _87.Asset): _87.AssetAmino;
            fromAminoMsg(object: _87.AssetAminoMsg): _87.Asset;
            fromProtoMsg(message: _87.AssetProtoMsg): _87.Asset;
            toProto(message: _87.Asset): Uint8Array;
            toProtoMsg(message: _87.Asset): _87.AssetProtoMsg;
        };
    };
    const blocktime: {
        MsgClientImpl: typeof _285.MsgClientImpl;
        createClientImpl: (rpc: import("../helpers").Rpc) => _285.MsgClientImpl;
        QueryClientImpl: typeof _273.QueryClientImpl;
        createRpcQueryExtension: (base: import("@cosmjs/stargate").QueryClient) => {
            downtimeParams(request?: _94.QueryDowntimeParamsRequest): Promise<_94.QueryDowntimeParamsResponse>;
            previousBlockInfo(request?: _94.QueryPreviousBlockInfoRequest): Promise<_94.QueryPreviousBlockInfoResponse>;
            allDowntimeInfo(request?: _94.QueryAllDowntimeInfoRequest): Promise<_94.QueryAllDowntimeInfoResponse>;
        };
        LCDQueryClient: typeof _262.LCDQueryClient;
        registry: ReadonlyArray<[string, import("@cosmjs/proto-signing").GeneratedType]>;
        load: (protoRegistry: import("@cosmjs/proto-signing").Registry) => void;
        MessageComposer: {
            encoded: {
                updateDowntimeParams(value: _95.MsgUpdateDowntimeParams): {
                    typeUrl: string;
                    value: Uint8Array<ArrayBufferLike>;
                };
            };
            withTypeUrl: {
                updateDowntimeParams(value: _95.MsgUpdateDowntimeParams): {
                    typeUrl: string;
                    value: _95.MsgUpdateDowntimeParams;
                };
            };
            fromPartial: {
                updateDowntimeParams(value: _95.MsgUpdateDowntimeParams): {
                    typeUrl: string;
                    value: _95.MsgUpdateDowntimeParams;
                };
            };
        };
        AminoConverter: {
            "/klyraprotocol.blocktime.MsgUpdateDowntimeParams": {
                aminoType: string;
                toAmino: (message: _95.MsgUpdateDowntimeParams) => _95.MsgUpdateDowntimeParamsAmino;
                fromAmino: (object: _95.MsgUpdateDowntimeParamsAmino) => _95.MsgUpdateDowntimeParams;
            };
        };
        MsgUpdateDowntimeParams: {
            typeUrl: string;
            is(o: any): o is _95.MsgUpdateDowntimeParams;
            isSDK(o: any): o is _95.MsgUpdateDowntimeParamsSDKType;
            isAmino(o: any): o is _95.MsgUpdateDowntimeParamsAmino;
            encode(message: _95.MsgUpdateDowntimeParams, writer?: import("..").BinaryWriter): import("..").BinaryWriter;
            decode(input: import("..").BinaryReader | Uint8Array, length?: number): _95.MsgUpdateDowntimeParams;
            fromPartial(object: Partial<_95.MsgUpdateDowntimeParams>): _95.MsgUpdateDowntimeParams;
            fromAmino(object: _95.MsgUpdateDowntimeParamsAmino): _95.MsgUpdateDowntimeParams;
            toAmino(message: _95.MsgUpdateDowntimeParams): _95.MsgUpdateDowntimeParamsAmino;
            fromAminoMsg(object: _95.MsgUpdateDowntimeParamsAminoMsg): _95.MsgUpdateDowntimeParams;
            fromProtoMsg(message: _95.MsgUpdateDowntimeParamsProtoMsg): _95.MsgUpdateDowntimeParams;
            toProto(message: _95.MsgUpdateDowntimeParams): Uint8Array;
            toProtoMsg(message: _95.MsgUpdateDowntimeParams): _95.MsgUpdateDowntimeParamsProtoMsg;
        };
        MsgUpdateDowntimeParamsResponse: {
            typeUrl: string;
            is(o: any): o is _95.MsgUpdateDowntimeParamsResponse;
            isSDK(o: any): o is _95.MsgUpdateDowntimeParamsResponseSDKType;
            isAmino(o: any): o is _95.MsgUpdateDowntimeParamsResponseAmino;
            encode(_: _95.MsgUpdateDowntimeParamsResponse, writer?: import("..").BinaryWriter): import("..").BinaryWriter;
            decode(input: import("..").BinaryReader | Uint8Array, length?: number): _95.MsgUpdateDowntimeParamsResponse;
            fromPartial(_: Partial<_95.MsgUpdateDowntimeParamsResponse>): _95.MsgUpdateDowntimeParamsResponse;
            fromAmino(_: _95.MsgUpdateDowntimeParamsResponseAmino): _95.MsgUpdateDowntimeParamsResponse;
            toAmino(_: _95.MsgUpdateDowntimeParamsResponse): _95.MsgUpdateDowntimeParamsResponseAmino;
            fromAminoMsg(object: _95.MsgUpdateDowntimeParamsResponseAminoMsg): _95.MsgUpdateDowntimeParamsResponse;
            fromProtoMsg(message: _95.MsgUpdateDowntimeParamsResponseProtoMsg): _95.MsgUpdateDowntimeParamsResponse;
            toProto(message: _95.MsgUpdateDowntimeParamsResponse): Uint8Array;
            toProtoMsg(message: _95.MsgUpdateDowntimeParamsResponse): _95.MsgUpdateDowntimeParamsResponseProtoMsg;
        };
        QueryDowntimeParamsRequest: {
            typeUrl: string;
            is(o: any): o is _94.QueryDowntimeParamsRequest;
            isSDK(o: any): o is _94.QueryDowntimeParamsRequestSDKType;
            isAmino(o: any): o is _94.QueryDowntimeParamsRequestAmino;
            encode(_: _94.QueryDowntimeParamsRequest, writer?: import("..").BinaryWriter): import("..").BinaryWriter;
            decode(input: import("..").BinaryReader | Uint8Array, length?: number): _94.QueryDowntimeParamsRequest;
            fromPartial(_: Partial<_94.QueryDowntimeParamsRequest>): _94.QueryDowntimeParamsRequest;
            fromAmino(_: _94.QueryDowntimeParamsRequestAmino): _94.QueryDowntimeParamsRequest;
            toAmino(_: _94.QueryDowntimeParamsRequest): _94.QueryDowntimeParamsRequestAmino;
            fromAminoMsg(object: _94.QueryDowntimeParamsRequestAminoMsg): _94.QueryDowntimeParamsRequest;
            fromProtoMsg(message: _94.QueryDowntimeParamsRequestProtoMsg): _94.QueryDowntimeParamsRequest;
            toProto(message: _94.QueryDowntimeParamsRequest): Uint8Array;
            toProtoMsg(message: _94.QueryDowntimeParamsRequest): _94.QueryDowntimeParamsRequestProtoMsg;
        };
        QueryDowntimeParamsResponse: {
            typeUrl: string;
            is(o: any): o is _94.QueryDowntimeParamsResponse;
            isSDK(o: any): o is _94.QueryDowntimeParamsResponseSDKType;
            isAmino(o: any): o is _94.QueryDowntimeParamsResponseAmino;
            encode(message: _94.QueryDowntimeParamsResponse, writer?: import("..").BinaryWriter): import("..").BinaryWriter;
            decode(input: import("..").BinaryReader | Uint8Array, length?: number): _94.QueryDowntimeParamsResponse;
            fromPartial(object: Partial<_94.QueryDowntimeParamsResponse>): _94.QueryDowntimeParamsResponse;
            fromAmino(object: _94.QueryDowntimeParamsResponseAmino): _94.QueryDowntimeParamsResponse;
            toAmino(message: _94.QueryDowntimeParamsResponse): _94.QueryDowntimeParamsResponseAmino;
            fromAminoMsg(object: _94.QueryDowntimeParamsResponseAminoMsg): _94.QueryDowntimeParamsResponse;
            fromProtoMsg(message: _94.QueryDowntimeParamsResponseProtoMsg): _94.QueryDowntimeParamsResponse;
            toProto(message: _94.QueryDowntimeParamsResponse): Uint8Array;
            toProtoMsg(message: _94.QueryDowntimeParamsResponse): _94.QueryDowntimeParamsResponseProtoMsg;
        };
        QueryPreviousBlockInfoRequest: {
            typeUrl: string;
            is(o: any): o is _94.QueryPreviousBlockInfoRequest;
            isSDK(o: any): o is _94.QueryPreviousBlockInfoRequestSDKType;
            isAmino(o: any): o is _94.QueryPreviousBlockInfoRequestAmino;
            encode(_: _94.QueryPreviousBlockInfoRequest, writer?: import("..").BinaryWriter): import("..").BinaryWriter;
            decode(input: import("..").BinaryReader | Uint8Array, length?: number): _94.QueryPreviousBlockInfoRequest;
            fromPartial(_: Partial<_94.QueryPreviousBlockInfoRequest>): _94.QueryPreviousBlockInfoRequest;
            fromAmino(_: _94.QueryPreviousBlockInfoRequestAmino): _94.QueryPreviousBlockInfoRequest;
            toAmino(_: _94.QueryPreviousBlockInfoRequest): _94.QueryPreviousBlockInfoRequestAmino;
            fromAminoMsg(object: _94.QueryPreviousBlockInfoRequestAminoMsg): _94.QueryPreviousBlockInfoRequest;
            fromProtoMsg(message: _94.QueryPreviousBlockInfoRequestProtoMsg): _94.QueryPreviousBlockInfoRequest;
            toProto(message: _94.QueryPreviousBlockInfoRequest): Uint8Array;
            toProtoMsg(message: _94.QueryPreviousBlockInfoRequest): _94.QueryPreviousBlockInfoRequestProtoMsg;
        };
        QueryPreviousBlockInfoResponse: {
            typeUrl: string;
            is(o: any): o is _94.QueryPreviousBlockInfoResponse;
            isSDK(o: any): o is _94.QueryPreviousBlockInfoResponseSDKType;
            isAmino(o: any): o is _94.QueryPreviousBlockInfoResponseAmino;
            encode(message: _94.QueryPreviousBlockInfoResponse, writer?: import("..").BinaryWriter): import("..").BinaryWriter;
            decode(input: import("..").BinaryReader | Uint8Array, length?: number): _94.QueryPreviousBlockInfoResponse;
            fromPartial(object: Partial<_94.QueryPreviousBlockInfoResponse>): _94.QueryPreviousBlockInfoResponse;
            fromAmino(object: _94.QueryPreviousBlockInfoResponseAmino): _94.QueryPreviousBlockInfoResponse;
            toAmino(message: _94.QueryPreviousBlockInfoResponse): _94.QueryPreviousBlockInfoResponseAmino;
            fromAminoMsg(object: _94.QueryPreviousBlockInfoResponseAminoMsg): _94.QueryPreviousBlockInfoResponse;
            fromProtoMsg(message: _94.QueryPreviousBlockInfoResponseProtoMsg): _94.QueryPreviousBlockInfoResponse;
            toProto(message: _94.QueryPreviousBlockInfoResponse): Uint8Array;
            toProtoMsg(message: _94.QueryPreviousBlockInfoResponse): _94.QueryPreviousBlockInfoResponseProtoMsg;
        };
        QueryAllDowntimeInfoRequest: {
            typeUrl: string;
            is(o: any): o is _94.QueryAllDowntimeInfoRequest;
            isSDK(o: any): o is _94.QueryAllDowntimeInfoRequestSDKType;
            isAmino(o: any): o is _94.QueryAllDowntimeInfoRequestAmino;
            encode(_: _94.QueryAllDowntimeInfoRequest, writer?: import("..").BinaryWriter): import("..").BinaryWriter;
            decode(input: import("..").BinaryReader | Uint8Array, length?: number): _94.QueryAllDowntimeInfoRequest;
            fromPartial(_: Partial<_94.QueryAllDowntimeInfoRequest>): _94.QueryAllDowntimeInfoRequest;
            fromAmino(_: _94.QueryAllDowntimeInfoRequestAmino): _94.QueryAllDowntimeInfoRequest;
            toAmino(_: _94.QueryAllDowntimeInfoRequest): _94.QueryAllDowntimeInfoRequestAmino;
            fromAminoMsg(object: _94.QueryAllDowntimeInfoRequestAminoMsg): _94.QueryAllDowntimeInfoRequest;
            fromProtoMsg(message: _94.QueryAllDowntimeInfoRequestProtoMsg): _94.QueryAllDowntimeInfoRequest;
            toProto(message: _94.QueryAllDowntimeInfoRequest): Uint8Array;
            toProtoMsg(message: _94.QueryAllDowntimeInfoRequest): _94.QueryAllDowntimeInfoRequestProtoMsg;
        };
        QueryAllDowntimeInfoResponse: {
            typeUrl: string;
            is(o: any): o is _94.QueryAllDowntimeInfoResponse;
            isSDK(o: any): o is _94.QueryAllDowntimeInfoResponseSDKType;
            isAmino(o: any): o is _94.QueryAllDowntimeInfoResponseAmino;
            encode(message: _94.QueryAllDowntimeInfoResponse, writer?: import("..").BinaryWriter): import("..").BinaryWriter;
            decode(input: import("..").BinaryReader | Uint8Array, length?: number): _94.QueryAllDowntimeInfoResponse;
            fromPartial(object: Partial<_94.QueryAllDowntimeInfoResponse>): _94.QueryAllDowntimeInfoResponse;
            fromAmino(object: _94.QueryAllDowntimeInfoResponseAmino): _94.QueryAllDowntimeInfoResponse;
            toAmino(message: _94.QueryAllDowntimeInfoResponse): _94.QueryAllDowntimeInfoResponseAmino;
            fromAminoMsg(object: _94.QueryAllDowntimeInfoResponseAminoMsg): _94.QueryAllDowntimeInfoResponse;
            fromProtoMsg(message: _94.QueryAllDowntimeInfoResponseProtoMsg): _94.QueryAllDowntimeInfoResponse;
            toProto(message: _94.QueryAllDowntimeInfoResponse): Uint8Array;
            toProtoMsg(message: _94.QueryAllDowntimeInfoResponse): _94.QueryAllDowntimeInfoResponseProtoMsg;
        };
        DowntimeParams: {
            typeUrl: string;
            is(o: any): o is _93.DowntimeParams;
            isSDK(o: any): o is _93.DowntimeParamsSDKType;
            isAmino(o: any): o is _93.DowntimeParamsAmino;
            encode(message: _93.DowntimeParams, writer?: import("..").BinaryWriter): import("..").BinaryWriter;
            decode(input: import("..").BinaryReader | Uint8Array, length?: number): _93.DowntimeParams;
            fromPartial(object: Partial<_93.DowntimeParams>): _93.DowntimeParams;
            fromAmino(object: _93.DowntimeParamsAmino): _93.DowntimeParams;
            toAmino(message: _93.DowntimeParams): _93.DowntimeParamsAmino;
            fromAminoMsg(object: _93.DowntimeParamsAminoMsg): _93.DowntimeParams;
            fromProtoMsg(message: _93.DowntimeParamsProtoMsg): _93.DowntimeParams;
            toProto(message: _93.DowntimeParams): Uint8Array;
            toProtoMsg(message: _93.DowntimeParams): _93.DowntimeParamsProtoMsg;
        };
        GenesisState: {
            typeUrl: string;
            is(o: any): o is _92.GenesisState;
            isSDK(o: any): o is _92.GenesisStateSDKType;
            isAmino(o: any): o is _92.GenesisStateAmino;
            encode(message: _92.GenesisState, writer?: import("..").BinaryWriter): import("..").BinaryWriter;
            decode(input: import("..").BinaryReader | Uint8Array, length?: number): _92.GenesisState;
            fromPartial(object: Partial<_92.GenesisState>): _92.GenesisState;
            fromAmino(object: _92.GenesisStateAmino): _92.GenesisState;
            toAmino(message: _92.GenesisState): _92.GenesisStateAmino;
            fromAminoMsg(object: _92.GenesisStateAminoMsg): _92.GenesisState;
            fromProtoMsg(message: _92.GenesisStateProtoMsg): _92.GenesisState;
            toProto(message: _92.GenesisState): Uint8Array;
            toProtoMsg(message: _92.GenesisState): _92.GenesisStateProtoMsg;
        };
        BlockInfo: {
            typeUrl: string;
            is(o: any): o is _91.BlockInfo;
            isSDK(o: any): o is _91.BlockInfoSDKType;
            isAmino(o: any): o is _91.BlockInfoAmino;
            encode(message: _91.BlockInfo, writer?: import("..").BinaryWriter): import("..").BinaryWriter;
            decode(input: import("..").BinaryReader | Uint8Array, length?: number): _91.BlockInfo;
            fromPartial(object: Partial<_91.BlockInfo>): _91.BlockInfo;
            fromAmino(object: _91.BlockInfoAmino): _91.BlockInfo;
            toAmino(message: _91.BlockInfo): _91.BlockInfoAmino;
            fromAminoMsg(object: _91.BlockInfoAminoMsg): _91.BlockInfo;
            fromProtoMsg(message: _91.BlockInfoProtoMsg): _91.BlockInfo;
            toProto(message: _91.BlockInfo): Uint8Array;
            toProtoMsg(message: _91.BlockInfo): _91.BlockInfoProtoMsg;
        };
        AllDowntimeInfo: {
            typeUrl: string;
            is(o: any): o is _91.AllDowntimeInfo;
            isSDK(o: any): o is _91.AllDowntimeInfoSDKType;
            isAmino(o: any): o is _91.AllDowntimeInfoAmino;
            encode(message: _91.AllDowntimeInfo, writer?: import("..").BinaryWriter): import("..").BinaryWriter;
            decode(input: import("..").BinaryReader | Uint8Array, length?: number): _91.AllDowntimeInfo;
            fromPartial(object: Partial<_91.AllDowntimeInfo>): _91.AllDowntimeInfo;
            fromAmino(object: _91.AllDowntimeInfoAmino): _91.AllDowntimeInfo;
            toAmino(message: _91.AllDowntimeInfo): _91.AllDowntimeInfoAmino;
            fromAminoMsg(object: _91.AllDowntimeInfoAminoMsg): _91.AllDowntimeInfo;
            fromProtoMsg(message: _91.AllDowntimeInfoProtoMsg): _91.AllDowntimeInfo;
            toProto(message: _91.AllDowntimeInfo): Uint8Array;
            toProtoMsg(message: _91.AllDowntimeInfo): _91.AllDowntimeInfoProtoMsg;
        };
        AllDowntimeInfo_DowntimeInfo: {
            typeUrl: string;
            is(o: any): o is _91.AllDowntimeInfo_DowntimeInfo;
            isSDK(o: any): o is _91.AllDowntimeInfo_DowntimeInfoSDKType;
            isAmino(o: any): o is _91.AllDowntimeInfo_DowntimeInfoAmino;
            encode(message: _91.AllDowntimeInfo_DowntimeInfo, writer?: import("..").BinaryWriter): import("..").BinaryWriter;
            decode(input: import("..").BinaryReader | Uint8Array, length?: number): _91.AllDowntimeInfo_DowntimeInfo;
            fromPartial(object: Partial<_91.AllDowntimeInfo_DowntimeInfo>): _91.AllDowntimeInfo_DowntimeInfo;
            fromAmino(object: _91.AllDowntimeInfo_DowntimeInfoAmino): _91.AllDowntimeInfo_DowntimeInfo;
            toAmino(message: _91.AllDowntimeInfo_DowntimeInfo): _91.AllDowntimeInfo_DowntimeInfoAmino;
            fromAminoMsg(object: _91.AllDowntimeInfo_DowntimeInfoAminoMsg): _91.AllDowntimeInfo_DowntimeInfo;
            fromProtoMsg(message: _91.AllDowntimeInfo_DowntimeInfoProtoMsg): _91.AllDowntimeInfo_DowntimeInfo;
            toProto(message: _91.AllDowntimeInfo_DowntimeInfo): Uint8Array;
            toProtoMsg(message: _91.AllDowntimeInfo_DowntimeInfo): _91.AllDowntimeInfo_DowntimeInfoProtoMsg;
        };
    };
    const clob: {
        MsgClientImpl: typeof _286.MsgClientImpl;
        createClientImpl: (rpc: import("../helpers").Rpc) => _286.MsgClientImpl;
        QueryClientImpl: typeof _274.QueryClientImpl;
        createRpcQueryExtension: (base: import("@cosmjs/stargate").QueryClient) => {
            clobPair(request: _108.QueryGetClobPairRequest): Promise<_108.QueryClobPairResponse>;
            clobPairAll(request?: _108.QueryAllClobPairRequest): Promise<_108.QueryClobPairAllResponse>;
            mevNodeToNodeCalculation(request: _108.MevNodeToNodeCalculationRequest): Promise<_108.MevNodeToNodeCalculationResponse>;
            equityTierLimitConfiguration(request?: _108.QueryEquityTierLimitConfigurationRequest): Promise<_108.QueryEquityTierLimitConfigurationResponse>;
            blockRateLimitConfiguration(request?: _108.QueryBlockRateLimitConfigurationRequest): Promise<_108.QueryBlockRateLimitConfigurationResponse>;
            liquidationsConfiguration(request?: _108.QueryLiquidationsConfigurationRequest): Promise<_108.QueryLiquidationsConfigurationResponse>;
            streamOrderbookUpdates(request: _108.StreamOrderbookUpdatesRequest): Promise<_108.StreamOrderbookUpdatesResponse>;
        };
        LCDQueryClient: typeof _263.LCDQueryClient;
        registry: ReadonlyArray<[string, import("@cosmjs/proto-signing").GeneratedType]>;
        load: (protoRegistry: import("@cosmjs/proto-signing").Registry) => void;
        MessageComposer: {
            encoded: {
                proposedOperations(value: _109.MsgProposedOperations): {
                    typeUrl: string;
                    value: Uint8Array<ArrayBufferLike>;
                };
                placeOrder(value: _109.MsgPlaceOrder): {
                    typeUrl: string;
                    value: Uint8Array<ArrayBufferLike>;
                };
                cancelOrder(value: _109.MsgCancelOrder): {
                    typeUrl: string;
                    value: Uint8Array<ArrayBufferLike>;
                };
                batchCancel(value: _109.MsgBatchCancel): {
                    typeUrl: string;
                    value: Uint8Array<ArrayBufferLike>;
                };
                createClobPair(value: _109.MsgCreateClobPair): {
                    typeUrl: string;
                    value: Uint8Array<ArrayBufferLike>;
                };
                updateClobPair(value: _109.MsgUpdateClobPair): {
                    typeUrl: string;
                    value: Uint8Array<ArrayBufferLike>;
                };
                updateEquityTierLimitConfiguration(value: _109.MsgUpdateEquityTierLimitConfiguration): {
                    typeUrl: string;
                    value: Uint8Array<ArrayBufferLike>;
                };
                updateBlockRateLimitConfiguration(value: _109.MsgUpdateBlockRateLimitConfiguration): {
                    typeUrl: string;
                    value: Uint8Array<ArrayBufferLike>;
                };
                updateLiquidationsConfig(value: _109.MsgUpdateLiquidationsConfig): {
                    typeUrl: string;
                    value: Uint8Array<ArrayBufferLike>;
                };
            };
            withTypeUrl: {
                proposedOperations(value: _109.MsgProposedOperations): {
                    typeUrl: string;
                    value: _109.MsgProposedOperations;
                };
                placeOrder(value: _109.MsgPlaceOrder): {
                    typeUrl: string;
                    value: _109.MsgPlaceOrder;
                };
                cancelOrder(value: _109.MsgCancelOrder): {
                    typeUrl: string;
                    value: _109.MsgCancelOrder;
                };
                batchCancel(value: _109.MsgBatchCancel): {
                    typeUrl: string;
                    value: _109.MsgBatchCancel;
                };
                createClobPair(value: _109.MsgCreateClobPair): {
                    typeUrl: string;
                    value: _109.MsgCreateClobPair;
                };
                updateClobPair(value: _109.MsgUpdateClobPair): {
                    typeUrl: string;
                    value: _109.MsgUpdateClobPair;
                };
                updateEquityTierLimitConfiguration(value: _109.MsgUpdateEquityTierLimitConfiguration): {
                    typeUrl: string;
                    value: _109.MsgUpdateEquityTierLimitConfiguration;
                };
                updateBlockRateLimitConfiguration(value: _109.MsgUpdateBlockRateLimitConfiguration): {
                    typeUrl: string;
                    value: _109.MsgUpdateBlockRateLimitConfiguration;
                };
                updateLiquidationsConfig(value: _109.MsgUpdateLiquidationsConfig): {
                    typeUrl: string;
                    value: _109.MsgUpdateLiquidationsConfig;
                };
            };
            fromPartial: {
                proposedOperations(value: _109.MsgProposedOperations): {
                    typeUrl: string;
                    value: _109.MsgProposedOperations;
                };
                placeOrder(value: _109.MsgPlaceOrder): {
                    typeUrl: string;
                    value: _109.MsgPlaceOrder;
                };
                cancelOrder(value: _109.MsgCancelOrder): {
                    typeUrl: string;
                    value: _109.MsgCancelOrder;
                };
                batchCancel(value: _109.MsgBatchCancel): {
                    typeUrl: string;
                    value: _109.MsgBatchCancel;
                };
                createClobPair(value: _109.MsgCreateClobPair): {
                    typeUrl: string;
                    value: _109.MsgCreateClobPair;
                };
                updateClobPair(value: _109.MsgUpdateClobPair): {
                    typeUrl: string;
                    value: _109.MsgUpdateClobPair;
                };
                updateEquityTierLimitConfiguration(value: _109.MsgUpdateEquityTierLimitConfiguration): {
                    typeUrl: string;
                    value: _109.MsgUpdateEquityTierLimitConfiguration;
                };
                updateBlockRateLimitConfiguration(value: _109.MsgUpdateBlockRateLimitConfiguration): {
                    typeUrl: string;
                    value: _109.MsgUpdateBlockRateLimitConfiguration;
                };
                updateLiquidationsConfig(value: _109.MsgUpdateLiquidationsConfig): {
                    typeUrl: string;
                    value: _109.MsgUpdateLiquidationsConfig;
                };
            };
        };
        AminoConverter: {
            "/klyraprotocol.clob.MsgProposedOperations": {
                aminoType: string;
                toAmino: (message: _109.MsgProposedOperations) => _109.MsgProposedOperationsAmino;
                fromAmino: (object: _109.MsgProposedOperationsAmino) => _109.MsgProposedOperations;
            };
            "/klyraprotocol.clob.MsgPlaceOrder": {
                aminoType: string;
                toAmino: (message: _109.MsgPlaceOrder) => _109.MsgPlaceOrderAmino;
                fromAmino: (object: _109.MsgPlaceOrderAmino) => _109.MsgPlaceOrder;
            };
            "/klyraprotocol.clob.MsgCancelOrder": {
                aminoType: string;
                toAmino: (message: _109.MsgCancelOrder) => _109.MsgCancelOrderAmino;
                fromAmino: (object: _109.MsgCancelOrderAmino) => _109.MsgCancelOrder;
            };
            "/klyraprotocol.clob.MsgBatchCancel": {
                aminoType: string;
                toAmino: (message: _109.MsgBatchCancel) => _109.MsgBatchCancelAmino;
                fromAmino: (object: _109.MsgBatchCancelAmino) => _109.MsgBatchCancel;
            };
            "/klyraprotocol.clob.MsgCreateClobPair": {
                aminoType: string;
                toAmino: (message: _109.MsgCreateClobPair) => _109.MsgCreateClobPairAmino;
                fromAmino: (object: _109.MsgCreateClobPairAmino) => _109.MsgCreateClobPair;
            };
            "/klyraprotocol.clob.MsgUpdateClobPair": {
                aminoType: string;
                toAmino: (message: _109.MsgUpdateClobPair) => _109.MsgUpdateClobPairAmino;
                fromAmino: (object: _109.MsgUpdateClobPairAmino) => _109.MsgUpdateClobPair;
            };
            "/klyraprotocol.clob.MsgUpdateEquityTierLimitConfiguration": {
                aminoType: string;
                toAmino: (message: _109.MsgUpdateEquityTierLimitConfiguration) => _109.MsgUpdateEquityTierLimitConfigurationAmino;
                fromAmino: (object: _109.MsgUpdateEquityTierLimitConfigurationAmino) => _109.MsgUpdateEquityTierLimitConfiguration;
            };
            "/klyraprotocol.clob.MsgUpdateBlockRateLimitConfiguration": {
                aminoType: string;
                toAmino: (message: _109.MsgUpdateBlockRateLimitConfiguration) => _109.MsgUpdateBlockRateLimitConfigurationAmino;
                fromAmino: (object: _109.MsgUpdateBlockRateLimitConfigurationAmino) => _109.MsgUpdateBlockRateLimitConfiguration;
            };
            "/klyraprotocol.clob.MsgUpdateLiquidationsConfig": {
                aminoType: string;
                toAmino: (message: _109.MsgUpdateLiquidationsConfig) => _109.MsgUpdateLiquidationsConfigAmino;
                fromAmino: (object: _109.MsgUpdateLiquidationsConfigAmino) => _109.MsgUpdateLiquidationsConfig;
            };
        };
        MsgCreateClobPair: {
            typeUrl: string;
            is(o: any): o is _109.MsgCreateClobPair;
            isSDK(o: any): o is _109.MsgCreateClobPairSDKType;
            isAmino(o: any): o is _109.MsgCreateClobPairAmino;
            encode(message: _109.MsgCreateClobPair, writer?: import("..").BinaryWriter): import("..").BinaryWriter;
            decode(input: import("..").BinaryReader | Uint8Array, length?: number): _109.MsgCreateClobPair;
            fromPartial(object: Partial<_109.MsgCreateClobPair>): _109.MsgCreateClobPair;
            fromAmino(object: _109.MsgCreateClobPairAmino): _109.MsgCreateClobPair;
            toAmino(message: _109.MsgCreateClobPair): _109.MsgCreateClobPairAmino;
            fromAminoMsg(object: _109.MsgCreateClobPairAminoMsg): _109.MsgCreateClobPair;
            fromProtoMsg(message: _109.MsgCreateClobPairProtoMsg): _109.MsgCreateClobPair;
            toProto(message: _109.MsgCreateClobPair): Uint8Array;
            toProtoMsg(message: _109.MsgCreateClobPair): _109.MsgCreateClobPairProtoMsg;
        };
        MsgCreateClobPairResponse: {
            typeUrl: string;
            is(o: any): o is _109.MsgCreateClobPairResponse;
            isSDK(o: any): o is _109.MsgCreateClobPairResponseSDKType;
            isAmino(o: any): o is _109.MsgCreateClobPairResponseAmino;
            encode(_: _109.MsgCreateClobPairResponse, writer?: import("..").BinaryWriter): import("..").BinaryWriter;
            decode(input: import("..").BinaryReader | Uint8Array, length?: number): _109.MsgCreateClobPairResponse;
            fromPartial(_: Partial<_109.MsgCreateClobPairResponse>): _109.MsgCreateClobPairResponse;
            fromAmino(_: _109.MsgCreateClobPairResponseAmino): _109.MsgCreateClobPairResponse;
            toAmino(_: _109.MsgCreateClobPairResponse): _109.MsgCreateClobPairResponseAmino;
            fromAminoMsg(object: _109.MsgCreateClobPairResponseAminoMsg): _109.MsgCreateClobPairResponse;
            fromProtoMsg(message: _109.MsgCreateClobPairResponseProtoMsg): _109.MsgCreateClobPairResponse;
            toProto(message: _109.MsgCreateClobPairResponse): Uint8Array;
            toProtoMsg(message: _109.MsgCreateClobPairResponse): _109.MsgCreateClobPairResponseProtoMsg;
        };
        MsgProposedOperations: {
            typeUrl: string;
            is(o: any): o is _109.MsgProposedOperations;
            isSDK(o: any): o is _109.MsgProposedOperationsSDKType;
            isAmino(o: any): o is _109.MsgProposedOperationsAmino;
            encode(message: _109.MsgProposedOperations, writer?: import("..").BinaryWriter): import("..").BinaryWriter;
            decode(input: import("..").BinaryReader | Uint8Array, length?: number): _109.MsgProposedOperations;
            fromPartial(object: Partial<_109.MsgProposedOperations>): _109.MsgProposedOperations;
            fromAmino(object: _109.MsgProposedOperationsAmino): _109.MsgProposedOperations;
            toAmino(message: _109.MsgProposedOperations): _109.MsgProposedOperationsAmino;
            fromAminoMsg(object: _109.MsgProposedOperationsAminoMsg): _109.MsgProposedOperations;
            fromProtoMsg(message: _109.MsgProposedOperationsProtoMsg): _109.MsgProposedOperations;
            toProto(message: _109.MsgProposedOperations): Uint8Array;
            toProtoMsg(message: _109.MsgProposedOperations): _109.MsgProposedOperationsProtoMsg;
        };
        MsgProposedOperationsResponse: {
            typeUrl: string;
            is(o: any): o is _109.MsgProposedOperationsResponse;
            isSDK(o: any): o is _109.MsgProposedOperationsResponseSDKType;
            isAmino(o: any): o is _109.MsgProposedOperationsResponseAmino;
            encode(_: _109.MsgProposedOperationsResponse, writer?: import("..").BinaryWriter): import("..").BinaryWriter;
            decode(input: import("..").BinaryReader | Uint8Array, length?: number): _109.MsgProposedOperationsResponse;
            fromPartial(_: Partial<_109.MsgProposedOperationsResponse>): _109.MsgProposedOperationsResponse;
            fromAmino(_: _109.MsgProposedOperationsResponseAmino): _109.MsgProposedOperationsResponse;
            toAmino(_: _109.MsgProposedOperationsResponse): _109.MsgProposedOperationsResponseAmino;
            fromAminoMsg(object: _109.MsgProposedOperationsResponseAminoMsg): _109.MsgProposedOperationsResponse;
            fromProtoMsg(message: _109.MsgProposedOperationsResponseProtoMsg): _109.MsgProposedOperationsResponse;
            toProto(message: _109.MsgProposedOperationsResponse): Uint8Array;
            toProtoMsg(message: _109.MsgProposedOperationsResponse): _109.MsgProposedOperationsResponseProtoMsg;
        };
        MsgPlaceOrder: {
            typeUrl: string;
            is(o: any): o is _109.MsgPlaceOrder;
            isSDK(o: any): o is _109.MsgPlaceOrderSDKType;
            isAmino(o: any): o is _109.MsgPlaceOrderAmino;
            encode(message: _109.MsgPlaceOrder, writer?: import("..").BinaryWriter): import("..").BinaryWriter;
            decode(input: import("..").BinaryReader | Uint8Array, length?: number): _109.MsgPlaceOrder;
            fromPartial(object: Partial<_109.MsgPlaceOrder>): _109.MsgPlaceOrder;
            fromAmino(object: _109.MsgPlaceOrderAmino): _109.MsgPlaceOrder;
            toAmino(message: _109.MsgPlaceOrder): _109.MsgPlaceOrderAmino;
            fromAminoMsg(object: _109.MsgPlaceOrderAminoMsg): _109.MsgPlaceOrder;
            fromProtoMsg(message: _109.MsgPlaceOrderProtoMsg): _109.MsgPlaceOrder;
            toProto(message: _109.MsgPlaceOrder): Uint8Array;
            toProtoMsg(message: _109.MsgPlaceOrder): _109.MsgPlaceOrderProtoMsg;
        };
        MsgPlaceOrderResponse: {
            typeUrl: string;
            is(o: any): o is _109.MsgPlaceOrderResponse;
            isSDK(o: any): o is _109.MsgPlaceOrderResponseSDKType;
            isAmino(o: any): o is _109.MsgPlaceOrderResponseAmino;
            encode(_: _109.MsgPlaceOrderResponse, writer?: import("..").BinaryWriter): import("..").BinaryWriter;
            decode(input: import("..").BinaryReader | Uint8Array, length?: number): _109.MsgPlaceOrderResponse;
            fromPartial(_: Partial<_109.MsgPlaceOrderResponse>): _109.MsgPlaceOrderResponse;
            fromAmino(_: _109.MsgPlaceOrderResponseAmino): _109.MsgPlaceOrderResponse;
            toAmino(_: _109.MsgPlaceOrderResponse): _109.MsgPlaceOrderResponseAmino;
            fromAminoMsg(object: _109.MsgPlaceOrderResponseAminoMsg): _109.MsgPlaceOrderResponse;
            fromProtoMsg(message: _109.MsgPlaceOrderResponseProtoMsg): _109.MsgPlaceOrderResponse;
            toProto(message: _109.MsgPlaceOrderResponse): Uint8Array;
            toProtoMsg(message: _109.MsgPlaceOrderResponse): _109.MsgPlaceOrderResponseProtoMsg;
        };
        MsgCancelOrder: {
            typeUrl: string;
            is(o: any): o is _109.MsgCancelOrder;
            isSDK(o: any): o is _109.MsgCancelOrderSDKType;
            isAmino(o: any): o is _109.MsgCancelOrderAmino;
            encode(message: _109.MsgCancelOrder, writer?: import("..").BinaryWriter): import("..").BinaryWriter;
            decode(input: import("..").BinaryReader | Uint8Array, length?: number): _109.MsgCancelOrder;
            fromPartial(object: Partial<_109.MsgCancelOrder>): _109.MsgCancelOrder;
            fromAmino(object: _109.MsgCancelOrderAmino): _109.MsgCancelOrder;
            toAmino(message: _109.MsgCancelOrder): _109.MsgCancelOrderAmino;
            fromAminoMsg(object: _109.MsgCancelOrderAminoMsg): _109.MsgCancelOrder;
            fromProtoMsg(message: _109.MsgCancelOrderProtoMsg): _109.MsgCancelOrder;
            toProto(message: _109.MsgCancelOrder): Uint8Array;
            toProtoMsg(message: _109.MsgCancelOrder): _109.MsgCancelOrderProtoMsg;
        };
        MsgCancelOrderResponse: {
            typeUrl: string;
            is(o: any): o is _109.MsgCancelOrderResponse;
            isSDK(o: any): o is _109.MsgCancelOrderResponseSDKType;
            isAmino(o: any): o is _109.MsgCancelOrderResponseAmino;
            encode(_: _109.MsgCancelOrderResponse, writer?: import("..").BinaryWriter): import("..").BinaryWriter;
            decode(input: import("..").BinaryReader | Uint8Array, length?: number): _109.MsgCancelOrderResponse;
            fromPartial(_: Partial<_109.MsgCancelOrderResponse>): _109.MsgCancelOrderResponse;
            fromAmino(_: _109.MsgCancelOrderResponseAmino): _109.MsgCancelOrderResponse;
            toAmino(_: _109.MsgCancelOrderResponse): _109.MsgCancelOrderResponseAmino;
            fromAminoMsg(object: _109.MsgCancelOrderResponseAminoMsg): _109.MsgCancelOrderResponse;
            fromProtoMsg(message: _109.MsgCancelOrderResponseProtoMsg): _109.MsgCancelOrderResponse;
            toProto(message: _109.MsgCancelOrderResponse): Uint8Array;
            toProtoMsg(message: _109.MsgCancelOrderResponse): _109.MsgCancelOrderResponseProtoMsg;
        };
        MsgBatchCancel: {
            typeUrl: string;
            is(o: any): o is _109.MsgBatchCancel;
            isSDK(o: any): o is _109.MsgBatchCancelSDKType;
            isAmino(o: any): o is _109.MsgBatchCancelAmino;
            encode(message: _109.MsgBatchCancel, writer?: import("..").BinaryWriter): import("..").BinaryWriter;
            decode(input: import("..").BinaryReader | Uint8Array, length?: number): _109.MsgBatchCancel;
            fromPartial(object: Partial<_109.MsgBatchCancel>): _109.MsgBatchCancel;
            fromAmino(object: _109.MsgBatchCancelAmino): _109.MsgBatchCancel;
            toAmino(message: _109.MsgBatchCancel): _109.MsgBatchCancelAmino;
            fromAminoMsg(object: _109.MsgBatchCancelAminoMsg): _109.MsgBatchCancel;
            fromProtoMsg(message: _109.MsgBatchCancelProtoMsg): _109.MsgBatchCancel;
            toProto(message: _109.MsgBatchCancel): Uint8Array;
            toProtoMsg(message: _109.MsgBatchCancel): _109.MsgBatchCancelProtoMsg;
        };
        OrderBatch: {
            typeUrl: string;
            is(o: any): o is _109.OrderBatch;
            isSDK(o: any): o is _109.OrderBatchSDKType;
            isAmino(o: any): o is _109.OrderBatchAmino;
            encode(message: _109.OrderBatch, writer?: import("..").BinaryWriter): import("..").BinaryWriter;
            decode(input: import("..").BinaryReader | Uint8Array, length?: number): _109.OrderBatch;
            fromPartial(object: Partial<_109.OrderBatch>): _109.OrderBatch;
            fromAmino(object: _109.OrderBatchAmino): _109.OrderBatch;
            toAmino(message: _109.OrderBatch): _109.OrderBatchAmino;
            fromAminoMsg(object: _109.OrderBatchAminoMsg): _109.OrderBatch;
            fromProtoMsg(message: _109.OrderBatchProtoMsg): _109.OrderBatch;
            toProto(message: _109.OrderBatch): Uint8Array;
            toProtoMsg(message: _109.OrderBatch): _109.OrderBatchProtoMsg;
        };
        MsgBatchCancelResponse: {
            typeUrl: string;
            is(o: any): o is _109.MsgBatchCancelResponse;
            isSDK(o: any): o is _109.MsgBatchCancelResponseSDKType;
            isAmino(o: any): o is _109.MsgBatchCancelResponseAmino;
            encode(message: _109.MsgBatchCancelResponse, writer?: import("..").BinaryWriter): import("..").BinaryWriter;
            decode(input: import("..").BinaryReader | Uint8Array, length?: number): _109.MsgBatchCancelResponse;
            fromPartial(object: Partial<_109.MsgBatchCancelResponse>): _109.MsgBatchCancelResponse;
            fromAmino(object: _109.MsgBatchCancelResponseAmino): _109.MsgBatchCancelResponse;
            toAmino(message: _109.MsgBatchCancelResponse): _109.MsgBatchCancelResponseAmino;
            fromAminoMsg(object: _109.MsgBatchCancelResponseAminoMsg): _109.MsgBatchCancelResponse;
            fromProtoMsg(message: _109.MsgBatchCancelResponseProtoMsg): _109.MsgBatchCancelResponse;
            toProto(message: _109.MsgBatchCancelResponse): Uint8Array;
            toProtoMsg(message: _109.MsgBatchCancelResponse): _109.MsgBatchCancelResponseProtoMsg;
        };
        MsgUpdateClobPair: {
            typeUrl: string;
            is(o: any): o is _109.MsgUpdateClobPair;
            isSDK(o: any): o is _109.MsgUpdateClobPairSDKType;
            isAmino(o: any): o is _109.MsgUpdateClobPairAmino;
            encode(message: _109.MsgUpdateClobPair, writer?: import("..").BinaryWriter): import("..").BinaryWriter;
            decode(input: import("..").BinaryReader | Uint8Array, length?: number): _109.MsgUpdateClobPair;
            fromPartial(object: Partial<_109.MsgUpdateClobPair>): _109.MsgUpdateClobPair;
            fromAmino(object: _109.MsgUpdateClobPairAmino): _109.MsgUpdateClobPair;
            toAmino(message: _109.MsgUpdateClobPair): _109.MsgUpdateClobPairAmino;
            fromAminoMsg(object: _109.MsgUpdateClobPairAminoMsg): _109.MsgUpdateClobPair;
            fromProtoMsg(message: _109.MsgUpdateClobPairProtoMsg): _109.MsgUpdateClobPair;
            toProto(message: _109.MsgUpdateClobPair): Uint8Array;
            toProtoMsg(message: _109.MsgUpdateClobPair): _109.MsgUpdateClobPairProtoMsg;
        };
        MsgUpdateClobPairResponse: {
            typeUrl: string;
            is(o: any): o is _109.MsgUpdateClobPairResponse;
            isSDK(o: any): o is _109.MsgUpdateClobPairResponseSDKType;
            isAmino(o: any): o is _109.MsgUpdateClobPairResponseAmino;
            encode(_: _109.MsgUpdateClobPairResponse, writer?: import("..").BinaryWriter): import("..").BinaryWriter;
            decode(input: import("..").BinaryReader | Uint8Array, length?: number): _109.MsgUpdateClobPairResponse;
            fromPartial(_: Partial<_109.MsgUpdateClobPairResponse>): _109.MsgUpdateClobPairResponse;
            fromAmino(_: _109.MsgUpdateClobPairResponseAmino): _109.MsgUpdateClobPairResponse;
            toAmino(_: _109.MsgUpdateClobPairResponse): _109.MsgUpdateClobPairResponseAmino;
            fromAminoMsg(object: _109.MsgUpdateClobPairResponseAminoMsg): _109.MsgUpdateClobPairResponse;
            fromProtoMsg(message: _109.MsgUpdateClobPairResponseProtoMsg): _109.MsgUpdateClobPairResponse;
            toProto(message: _109.MsgUpdateClobPairResponse): Uint8Array;
            toProtoMsg(message: _109.MsgUpdateClobPairResponse): _109.MsgUpdateClobPairResponseProtoMsg;
        };
        OperationRaw: {
            typeUrl: string;
            is(o: any): o is _109.OperationRaw;
            isSDK(o: any): o is _109.OperationRawSDKType;
            isAmino(o: any): o is _109.OperationRawAmino;
            encode(message: _109.OperationRaw, writer?: import("..").BinaryWriter): import("..").BinaryWriter;
            decode(input: import("..").BinaryReader | Uint8Array, length?: number): _109.OperationRaw;
            fromPartial(object: Partial<_109.OperationRaw>): _109.OperationRaw;
            fromAmino(object: _109.OperationRawAmino): _109.OperationRaw;
            toAmino(message: _109.OperationRaw): _109.OperationRawAmino;
            fromAminoMsg(object: _109.OperationRawAminoMsg): _109.OperationRaw;
            fromProtoMsg(message: _109.OperationRawProtoMsg): _109.OperationRaw;
            toProto(message: _109.OperationRaw): Uint8Array;
            toProtoMsg(message: _109.OperationRaw): _109.OperationRawProtoMsg;
        };
        MsgUpdateEquityTierLimitConfiguration: {
            typeUrl: string;
            is(o: any): o is _109.MsgUpdateEquityTierLimitConfiguration;
            isSDK(o: any): o is _109.MsgUpdateEquityTierLimitConfigurationSDKType;
            isAmino(o: any): o is _109.MsgUpdateEquityTierLimitConfigurationAmino;
            encode(message: _109.MsgUpdateEquityTierLimitConfiguration, writer?: import("..").BinaryWriter): import("..").BinaryWriter;
            decode(input: import("..").BinaryReader | Uint8Array, length?: number): _109.MsgUpdateEquityTierLimitConfiguration;
            fromPartial(object: Partial<_109.MsgUpdateEquityTierLimitConfiguration>): _109.MsgUpdateEquityTierLimitConfiguration;
            fromAmino(object: _109.MsgUpdateEquityTierLimitConfigurationAmino): _109.MsgUpdateEquityTierLimitConfiguration;
            toAmino(message: _109.MsgUpdateEquityTierLimitConfiguration): _109.MsgUpdateEquityTierLimitConfigurationAmino;
            fromAminoMsg(object: _109.MsgUpdateEquityTierLimitConfigurationAminoMsg): _109.MsgUpdateEquityTierLimitConfiguration;
            fromProtoMsg(message: _109.MsgUpdateEquityTierLimitConfigurationProtoMsg): _109.MsgUpdateEquityTierLimitConfiguration;
            toProto(message: _109.MsgUpdateEquityTierLimitConfiguration): Uint8Array;
            toProtoMsg(message: _109.MsgUpdateEquityTierLimitConfiguration): _109.MsgUpdateEquityTierLimitConfigurationProtoMsg;
        };
        MsgUpdateEquityTierLimitConfigurationResponse: {
            typeUrl: string;
            is(o: any): o is _109.MsgUpdateEquityTierLimitConfigurationResponse;
            isSDK(o: any): o is _109.MsgUpdateEquityTierLimitConfigurationResponseSDKType;
            isAmino(o: any): o is _109.MsgUpdateEquityTierLimitConfigurationResponseAmino;
            encode(_: _109.MsgUpdateEquityTierLimitConfigurationResponse, writer?: import("..").BinaryWriter): import("..").BinaryWriter;
            decode(input: import("..").BinaryReader | Uint8Array, length?: number): _109.MsgUpdateEquityTierLimitConfigurationResponse;
            fromPartial(_: Partial<_109.MsgUpdateEquityTierLimitConfigurationResponse>): _109.MsgUpdateEquityTierLimitConfigurationResponse;
            fromAmino(_: _109.MsgUpdateEquityTierLimitConfigurationResponseAmino): _109.MsgUpdateEquityTierLimitConfigurationResponse;
            toAmino(_: _109.MsgUpdateEquityTierLimitConfigurationResponse): _109.MsgUpdateEquityTierLimitConfigurationResponseAmino;
            fromAminoMsg(object: _109.MsgUpdateEquityTierLimitConfigurationResponseAminoMsg): _109.MsgUpdateEquityTierLimitConfigurationResponse;
            fromProtoMsg(message: _109.MsgUpdateEquityTierLimitConfigurationResponseProtoMsg): _109.MsgUpdateEquityTierLimitConfigurationResponse;
            toProto(message: _109.MsgUpdateEquityTierLimitConfigurationResponse): Uint8Array;
            toProtoMsg(message: _109.MsgUpdateEquityTierLimitConfigurationResponse): _109.MsgUpdateEquityTierLimitConfigurationResponseProtoMsg;
        };
        MsgUpdateBlockRateLimitConfiguration: {
            typeUrl: string;
            is(o: any): o is _109.MsgUpdateBlockRateLimitConfiguration;
            isSDK(o: any): o is _109.MsgUpdateBlockRateLimitConfigurationSDKType;
            isAmino(o: any): o is _109.MsgUpdateBlockRateLimitConfigurationAmino;
            encode(message: _109.MsgUpdateBlockRateLimitConfiguration, writer?: import("..").BinaryWriter): import("..").BinaryWriter;
            decode(input: import("..").BinaryReader | Uint8Array, length?: number): _109.MsgUpdateBlockRateLimitConfiguration;
            fromPartial(object: Partial<_109.MsgUpdateBlockRateLimitConfiguration>): _109.MsgUpdateBlockRateLimitConfiguration;
            fromAmino(object: _109.MsgUpdateBlockRateLimitConfigurationAmino): _109.MsgUpdateBlockRateLimitConfiguration;
            toAmino(message: _109.MsgUpdateBlockRateLimitConfiguration): _109.MsgUpdateBlockRateLimitConfigurationAmino;
            fromAminoMsg(object: _109.MsgUpdateBlockRateLimitConfigurationAminoMsg): _109.MsgUpdateBlockRateLimitConfiguration;
            fromProtoMsg(message: _109.MsgUpdateBlockRateLimitConfigurationProtoMsg): _109.MsgUpdateBlockRateLimitConfiguration;
            toProto(message: _109.MsgUpdateBlockRateLimitConfiguration): Uint8Array;
            toProtoMsg(message: _109.MsgUpdateBlockRateLimitConfiguration): _109.MsgUpdateBlockRateLimitConfigurationProtoMsg;
        };
        MsgUpdateBlockRateLimitConfigurationResponse: {
            typeUrl: string;
            is(o: any): o is _109.MsgUpdateBlockRateLimitConfigurationResponse;
            isSDK(o: any): o is _109.MsgUpdateBlockRateLimitConfigurationResponseSDKType;
            isAmino(o: any): o is _109.MsgUpdateBlockRateLimitConfigurationResponseAmino;
            encode(_: _109.MsgUpdateBlockRateLimitConfigurationResponse, writer?: import("..").BinaryWriter): import("..").BinaryWriter;
            decode(input: import("..").BinaryReader | Uint8Array, length?: number): _109.MsgUpdateBlockRateLimitConfigurationResponse;
            fromPartial(_: Partial<_109.MsgUpdateBlockRateLimitConfigurationResponse>): _109.MsgUpdateBlockRateLimitConfigurationResponse;
            fromAmino(_: _109.MsgUpdateBlockRateLimitConfigurationResponseAmino): _109.MsgUpdateBlockRateLimitConfigurationResponse;
            toAmino(_: _109.MsgUpdateBlockRateLimitConfigurationResponse): _109.MsgUpdateBlockRateLimitConfigurationResponseAmino;
            fromAminoMsg(object: _109.MsgUpdateBlockRateLimitConfigurationResponseAminoMsg): _109.MsgUpdateBlockRateLimitConfigurationResponse;
            fromProtoMsg(message: _109.MsgUpdateBlockRateLimitConfigurationResponseProtoMsg): _109.MsgUpdateBlockRateLimitConfigurationResponse;
            toProto(message: _109.MsgUpdateBlockRateLimitConfigurationResponse): Uint8Array;
            toProtoMsg(message: _109.MsgUpdateBlockRateLimitConfigurationResponse): _109.MsgUpdateBlockRateLimitConfigurationResponseProtoMsg;
        };
        MsgUpdateLiquidationsConfig: {
            typeUrl: string;
            is(o: any): o is _109.MsgUpdateLiquidationsConfig;
            isSDK(o: any): o is _109.MsgUpdateLiquidationsConfigSDKType;
            isAmino(o: any): o is _109.MsgUpdateLiquidationsConfigAmino;
            encode(message: _109.MsgUpdateLiquidationsConfig, writer?: import("..").BinaryWriter): import("..").BinaryWriter;
            decode(input: import("..").BinaryReader | Uint8Array, length?: number): _109.MsgUpdateLiquidationsConfig;
            fromPartial(object: Partial<_109.MsgUpdateLiquidationsConfig>): _109.MsgUpdateLiquidationsConfig;
            fromAmino(object: _109.MsgUpdateLiquidationsConfigAmino): _109.MsgUpdateLiquidationsConfig;
            toAmino(message: _109.MsgUpdateLiquidationsConfig): _109.MsgUpdateLiquidationsConfigAmino;
            fromAminoMsg(object: _109.MsgUpdateLiquidationsConfigAminoMsg): _109.MsgUpdateLiquidationsConfig;
            fromProtoMsg(message: _109.MsgUpdateLiquidationsConfigProtoMsg): _109.MsgUpdateLiquidationsConfig;
            toProto(message: _109.MsgUpdateLiquidationsConfig): Uint8Array;
            toProtoMsg(message: _109.MsgUpdateLiquidationsConfig): _109.MsgUpdateLiquidationsConfigProtoMsg;
        };
        MsgUpdateLiquidationsConfigResponse: {
            typeUrl: string;
            is(o: any): o is _109.MsgUpdateLiquidationsConfigResponse;
            isSDK(o: any): o is _109.MsgUpdateLiquidationsConfigResponseSDKType;
            isAmino(o: any): o is _109.MsgUpdateLiquidationsConfigResponseAmino;
            encode(_: _109.MsgUpdateLiquidationsConfigResponse, writer?: import("..").BinaryWriter): import("..").BinaryWriter;
            decode(input: import("..").BinaryReader | Uint8Array, length?: number): _109.MsgUpdateLiquidationsConfigResponse;
            fromPartial(_: Partial<_109.MsgUpdateLiquidationsConfigResponse>): _109.MsgUpdateLiquidationsConfigResponse;
            fromAmino(_: _109.MsgUpdateLiquidationsConfigResponseAmino): _109.MsgUpdateLiquidationsConfigResponse;
            toAmino(_: _109.MsgUpdateLiquidationsConfigResponse): _109.MsgUpdateLiquidationsConfigResponseAmino;
            fromAminoMsg(object: _109.MsgUpdateLiquidationsConfigResponseAminoMsg): _109.MsgUpdateLiquidationsConfigResponse;
            fromProtoMsg(message: _109.MsgUpdateLiquidationsConfigResponseProtoMsg): _109.MsgUpdateLiquidationsConfigResponse;
            toProto(message: _109.MsgUpdateLiquidationsConfigResponse): Uint8Array;
            toProtoMsg(message: _109.MsgUpdateLiquidationsConfigResponse): _109.MsgUpdateLiquidationsConfigResponseProtoMsg;
        };
        QueryGetClobPairRequest: {
            typeUrl: string;
            is(o: any): o is _108.QueryGetClobPairRequest;
            isSDK(o: any): o is _108.QueryGetClobPairRequestSDKType;
            isAmino(o: any): o is _108.QueryGetClobPairRequestAmino;
            encode(message: _108.QueryGetClobPairRequest, writer?: import("..").BinaryWriter): import("..").BinaryWriter;
            decode(input: import("..").BinaryReader | Uint8Array, length?: number): _108.QueryGetClobPairRequest;
            fromPartial(object: Partial<_108.QueryGetClobPairRequest>): _108.QueryGetClobPairRequest;
            fromAmino(object: _108.QueryGetClobPairRequestAmino): _108.QueryGetClobPairRequest;
            toAmino(message: _108.QueryGetClobPairRequest): _108.QueryGetClobPairRequestAmino;
            fromAminoMsg(object: _108.QueryGetClobPairRequestAminoMsg): _108.QueryGetClobPairRequest;
            fromProtoMsg(message: _108.QueryGetClobPairRequestProtoMsg): _108.QueryGetClobPairRequest;
            toProto(message: _108.QueryGetClobPairRequest): Uint8Array;
            toProtoMsg(message: _108.QueryGetClobPairRequest): _108.QueryGetClobPairRequestProtoMsg;
        };
        QueryClobPairResponse: {
            typeUrl: string;
            is(o: any): o is _108.QueryClobPairResponse;
            isSDK(o: any): o is _108.QueryClobPairResponseSDKType;
            isAmino(o: any): o is _108.QueryClobPairResponseAmino;
            encode(message: _108.QueryClobPairResponse, writer?: import("..").BinaryWriter): import("..").BinaryWriter;
            decode(input: import("..").BinaryReader | Uint8Array, length?: number): _108.QueryClobPairResponse;
            fromPartial(object: Partial<_108.QueryClobPairResponse>): _108.QueryClobPairResponse;
            fromAmino(object: _108.QueryClobPairResponseAmino): _108.QueryClobPairResponse;
            toAmino(message: _108.QueryClobPairResponse): _108.QueryClobPairResponseAmino;
            fromAminoMsg(object: _108.QueryClobPairResponseAminoMsg): _108.QueryClobPairResponse;
            fromProtoMsg(message: _108.QueryClobPairResponseProtoMsg): _108.QueryClobPairResponse;
            toProto(message: _108.QueryClobPairResponse): Uint8Array;
            toProtoMsg(message: _108.QueryClobPairResponse): _108.QueryClobPairResponseProtoMsg;
        };
        QueryAllClobPairRequest: {
            typeUrl: string;
            is(o: any): o is _108.QueryAllClobPairRequest;
            isSDK(o: any): o is _108.QueryAllClobPairRequestSDKType;
            isAmino(o: any): o is _108.QueryAllClobPairRequestAmino;
            encode(message: _108.QueryAllClobPairRequest, writer?: import("..").BinaryWriter): import("..").BinaryWriter;
            decode(input: import("..").BinaryReader | Uint8Array, length?: number): _108.QueryAllClobPairRequest;
            fromPartial(object: Partial<_108.QueryAllClobPairRequest>): _108.QueryAllClobPairRequest;
            fromAmino(object: _108.QueryAllClobPairRequestAmino): _108.QueryAllClobPairRequest;
            toAmino(message: _108.QueryAllClobPairRequest): _108.QueryAllClobPairRequestAmino;
            fromAminoMsg(object: _108.QueryAllClobPairRequestAminoMsg): _108.QueryAllClobPairRequest;
            fromProtoMsg(message: _108.QueryAllClobPairRequestProtoMsg): _108.QueryAllClobPairRequest;
            toProto(message: _108.QueryAllClobPairRequest): Uint8Array;
            toProtoMsg(message: _108.QueryAllClobPairRequest): _108.QueryAllClobPairRequestProtoMsg;
        };
        QueryClobPairAllResponse: {
            typeUrl: string;
            is(o: any): o is _108.QueryClobPairAllResponse;
            isSDK(o: any): o is _108.QueryClobPairAllResponseSDKType;
            isAmino(o: any): o is _108.QueryClobPairAllResponseAmino;
            encode(message: _108.QueryClobPairAllResponse, writer?: import("..").BinaryWriter): import("..").BinaryWriter;
            decode(input: import("..").BinaryReader | Uint8Array, length?: number): _108.QueryClobPairAllResponse;
            fromPartial(object: Partial<_108.QueryClobPairAllResponse>): _108.QueryClobPairAllResponse;
            fromAmino(object: _108.QueryClobPairAllResponseAmino): _108.QueryClobPairAllResponse;
            toAmino(message: _108.QueryClobPairAllResponse): _108.QueryClobPairAllResponseAmino;
            fromAminoMsg(object: _108.QueryClobPairAllResponseAminoMsg): _108.QueryClobPairAllResponse;
            fromProtoMsg(message: _108.QueryClobPairAllResponseProtoMsg): _108.QueryClobPairAllResponse;
            toProto(message: _108.QueryClobPairAllResponse): Uint8Array;
            toProtoMsg(message: _108.QueryClobPairAllResponse): _108.QueryClobPairAllResponseProtoMsg;
        };
        MevNodeToNodeCalculationRequest: {
            typeUrl: string;
            is(o: any): o is _108.MevNodeToNodeCalculationRequest;
            isSDK(o: any): o is _108.MevNodeToNodeCalculationRequestSDKType;
            isAmino(o: any): o is _108.MevNodeToNodeCalculationRequestAmino;
            encode(message: _108.MevNodeToNodeCalculationRequest, writer?: import("..").BinaryWriter): import("..").BinaryWriter;
            decode(input: import("..").BinaryReader | Uint8Array, length?: number): _108.MevNodeToNodeCalculationRequest;
            fromPartial(object: Partial<_108.MevNodeToNodeCalculationRequest>): _108.MevNodeToNodeCalculationRequest;
            fromAmino(object: _108.MevNodeToNodeCalculationRequestAmino): _108.MevNodeToNodeCalculationRequest;
            toAmino(message: _108.MevNodeToNodeCalculationRequest): _108.MevNodeToNodeCalculationRequestAmino;
            fromAminoMsg(object: _108.MevNodeToNodeCalculationRequestAminoMsg): _108.MevNodeToNodeCalculationRequest;
            fromProtoMsg(message: _108.MevNodeToNodeCalculationRequestProtoMsg): _108.MevNodeToNodeCalculationRequest;
            toProto(message: _108.MevNodeToNodeCalculationRequest): Uint8Array;
            toProtoMsg(message: _108.MevNodeToNodeCalculationRequest): _108.MevNodeToNodeCalculationRequestProtoMsg;
        };
        MevNodeToNodeCalculationResponse: {
            typeUrl: string;
            is(o: any): o is _108.MevNodeToNodeCalculationResponse;
            isSDK(o: any): o is _108.MevNodeToNodeCalculationResponseSDKType;
            isAmino(o: any): o is _108.MevNodeToNodeCalculationResponseAmino;
            encode(message: _108.MevNodeToNodeCalculationResponse, writer?: import("..").BinaryWriter): import("..").BinaryWriter;
            decode(input: import("..").BinaryReader | Uint8Array, length?: number): _108.MevNodeToNodeCalculationResponse;
            fromPartial(object: Partial<_108.MevNodeToNodeCalculationResponse>): _108.MevNodeToNodeCalculationResponse;
            fromAmino(object: _108.MevNodeToNodeCalculationResponseAmino): _108.MevNodeToNodeCalculationResponse;
            toAmino(message: _108.MevNodeToNodeCalculationResponse): _108.MevNodeToNodeCalculationResponseAmino;
            fromAminoMsg(object: _108.MevNodeToNodeCalculationResponseAminoMsg): _108.MevNodeToNodeCalculationResponse;
            fromProtoMsg(message: _108.MevNodeToNodeCalculationResponseProtoMsg): _108.MevNodeToNodeCalculationResponse;
            toProto(message: _108.MevNodeToNodeCalculationResponse): Uint8Array;
            toProtoMsg(message: _108.MevNodeToNodeCalculationResponse): _108.MevNodeToNodeCalculationResponseProtoMsg;
        };
        MevNodeToNodeCalculationResponse_MevAndVolumePerClob: {
            typeUrl: string;
            is(o: any): o is _108.MevNodeToNodeCalculationResponse_MevAndVolumePerClob;
            isSDK(o: any): o is _108.MevNodeToNodeCalculationResponse_MevAndVolumePerClobSDKType;
            isAmino(o: any): o is _108.MevNodeToNodeCalculationResponse_MevAndVolumePerClobAmino;
            encode(message: _108.MevNodeToNodeCalculationResponse_MevAndVolumePerClob, writer?: import("..").BinaryWriter): import("..").BinaryWriter;
            decode(input: import("..").BinaryReader | Uint8Array, length?: number): _108.MevNodeToNodeCalculationResponse_MevAndVolumePerClob;
            fromPartial(object: Partial<_108.MevNodeToNodeCalculationResponse_MevAndVolumePerClob>): _108.MevNodeToNodeCalculationResponse_MevAndVolumePerClob;
            fromAmino(object: _108.MevNodeToNodeCalculationResponse_MevAndVolumePerClobAmino): _108.MevNodeToNodeCalculationResponse_MevAndVolumePerClob;
            toAmino(message: _108.MevNodeToNodeCalculationResponse_MevAndVolumePerClob): _108.MevNodeToNodeCalculationResponse_MevAndVolumePerClobAmino;
            fromAminoMsg(object: _108.MevNodeToNodeCalculationResponse_MevAndVolumePerClobAminoMsg): _108.MevNodeToNodeCalculationResponse_MevAndVolumePerClob;
            fromProtoMsg(message: _108.MevNodeToNodeCalculationResponse_MevAndVolumePerClobProtoMsg): _108.MevNodeToNodeCalculationResponse_MevAndVolumePerClob;
            toProto(message: _108.MevNodeToNodeCalculationResponse_MevAndVolumePerClob): Uint8Array;
            toProtoMsg(message: _108.MevNodeToNodeCalculationResponse_MevAndVolumePerClob): _108.MevNodeToNodeCalculationResponse_MevAndVolumePerClobProtoMsg;
        };
        QueryEquityTierLimitConfigurationRequest: {
            typeUrl: string;
            is(o: any): o is _108.QueryEquityTierLimitConfigurationRequest;
            isSDK(o: any): o is _108.QueryEquityTierLimitConfigurationRequestSDKType;
            isAmino(o: any): o is _108.QueryEquityTierLimitConfigurationRequestAmino;
            encode(_: _108.QueryEquityTierLimitConfigurationRequest, writer?: import("..").BinaryWriter): import("..").BinaryWriter;
            decode(input: import("..").BinaryReader | Uint8Array, length?: number): _108.QueryEquityTierLimitConfigurationRequest;
            fromPartial(_: Partial<_108.QueryEquityTierLimitConfigurationRequest>): _108.QueryEquityTierLimitConfigurationRequest;
            fromAmino(_: _108.QueryEquityTierLimitConfigurationRequestAmino): _108.QueryEquityTierLimitConfigurationRequest;
            toAmino(_: _108.QueryEquityTierLimitConfigurationRequest): _108.QueryEquityTierLimitConfigurationRequestAmino;
            fromAminoMsg(object: _108.QueryEquityTierLimitConfigurationRequestAminoMsg): _108.QueryEquityTierLimitConfigurationRequest;
            fromProtoMsg(message: _108.QueryEquityTierLimitConfigurationRequestProtoMsg): _108.QueryEquityTierLimitConfigurationRequest;
            toProto(message: _108.QueryEquityTierLimitConfigurationRequest): Uint8Array;
            toProtoMsg(message: _108.QueryEquityTierLimitConfigurationRequest): _108.QueryEquityTierLimitConfigurationRequestProtoMsg;
        };
        QueryEquityTierLimitConfigurationResponse: {
            typeUrl: string;
            is(o: any): o is _108.QueryEquityTierLimitConfigurationResponse;
            isSDK(o: any): o is _108.QueryEquityTierLimitConfigurationResponseSDKType;
            isAmino(o: any): o is _108.QueryEquityTierLimitConfigurationResponseAmino;
            encode(message: _108.QueryEquityTierLimitConfigurationResponse, writer?: import("..").BinaryWriter): import("..").BinaryWriter;
            decode(input: import("..").BinaryReader | Uint8Array, length?: number): _108.QueryEquityTierLimitConfigurationResponse;
            fromPartial(object: Partial<_108.QueryEquityTierLimitConfigurationResponse>): _108.QueryEquityTierLimitConfigurationResponse;
            fromAmino(object: _108.QueryEquityTierLimitConfigurationResponseAmino): _108.QueryEquityTierLimitConfigurationResponse;
            toAmino(message: _108.QueryEquityTierLimitConfigurationResponse): _108.QueryEquityTierLimitConfigurationResponseAmino;
            fromAminoMsg(object: _108.QueryEquityTierLimitConfigurationResponseAminoMsg): _108.QueryEquityTierLimitConfigurationResponse;
            fromProtoMsg(message: _108.QueryEquityTierLimitConfigurationResponseProtoMsg): _108.QueryEquityTierLimitConfigurationResponse;
            toProto(message: _108.QueryEquityTierLimitConfigurationResponse): Uint8Array;
            toProtoMsg(message: _108.QueryEquityTierLimitConfigurationResponse): _108.QueryEquityTierLimitConfigurationResponseProtoMsg;
        };
        QueryBlockRateLimitConfigurationRequest: {
            typeUrl: string;
            is(o: any): o is _108.QueryBlockRateLimitConfigurationRequest;
            isSDK(o: any): o is _108.QueryBlockRateLimitConfigurationRequestSDKType;
            isAmino(o: any): o is _108.QueryBlockRateLimitConfigurationRequestAmino;
            encode(_: _108.QueryBlockRateLimitConfigurationRequest, writer?: import("..").BinaryWriter): import("..").BinaryWriter;
            decode(input: import("..").BinaryReader | Uint8Array, length?: number): _108.QueryBlockRateLimitConfigurationRequest;
            fromPartial(_: Partial<_108.QueryBlockRateLimitConfigurationRequest>): _108.QueryBlockRateLimitConfigurationRequest;
            fromAmino(_: _108.QueryBlockRateLimitConfigurationRequestAmino): _108.QueryBlockRateLimitConfigurationRequest;
            toAmino(_: _108.QueryBlockRateLimitConfigurationRequest): _108.QueryBlockRateLimitConfigurationRequestAmino;
            fromAminoMsg(object: _108.QueryBlockRateLimitConfigurationRequestAminoMsg): _108.QueryBlockRateLimitConfigurationRequest;
            fromProtoMsg(message: _108.QueryBlockRateLimitConfigurationRequestProtoMsg): _108.QueryBlockRateLimitConfigurationRequest;
            toProto(message: _108.QueryBlockRateLimitConfigurationRequest): Uint8Array;
            toProtoMsg(message: _108.QueryBlockRateLimitConfigurationRequest): _108.QueryBlockRateLimitConfigurationRequestProtoMsg;
        };
        QueryBlockRateLimitConfigurationResponse: {
            typeUrl: string;
            is(o: any): o is _108.QueryBlockRateLimitConfigurationResponse;
            isSDK(o: any): o is _108.QueryBlockRateLimitConfigurationResponseSDKType;
            isAmino(o: any): o is _108.QueryBlockRateLimitConfigurationResponseAmino;
            encode(message: _108.QueryBlockRateLimitConfigurationResponse, writer?: import("..").BinaryWriter): import("..").BinaryWriter;
            decode(input: import("..").BinaryReader | Uint8Array, length?: number): _108.QueryBlockRateLimitConfigurationResponse;
            fromPartial(object: Partial<_108.QueryBlockRateLimitConfigurationResponse>): _108.QueryBlockRateLimitConfigurationResponse;
            fromAmino(object: _108.QueryBlockRateLimitConfigurationResponseAmino): _108.QueryBlockRateLimitConfigurationResponse;
            toAmino(message: _108.QueryBlockRateLimitConfigurationResponse): _108.QueryBlockRateLimitConfigurationResponseAmino;
            fromAminoMsg(object: _108.QueryBlockRateLimitConfigurationResponseAminoMsg): _108.QueryBlockRateLimitConfigurationResponse;
            fromProtoMsg(message: _108.QueryBlockRateLimitConfigurationResponseProtoMsg): _108.QueryBlockRateLimitConfigurationResponse;
            toProto(message: _108.QueryBlockRateLimitConfigurationResponse): Uint8Array;
            toProtoMsg(message: _108.QueryBlockRateLimitConfigurationResponse): _108.QueryBlockRateLimitConfigurationResponseProtoMsg;
        };
        QueryLiquidationsConfigurationRequest: {
            typeUrl: string;
            is(o: any): o is _108.QueryLiquidationsConfigurationRequest;
            isSDK(o: any): o is _108.QueryLiquidationsConfigurationRequestSDKType;
            isAmino(o: any): o is _108.QueryLiquidationsConfigurationRequestAmino;
            encode(_: _108.QueryLiquidationsConfigurationRequest, writer?: import("..").BinaryWriter): import("..").BinaryWriter;
            decode(input: import("..").BinaryReader | Uint8Array, length?: number): _108.QueryLiquidationsConfigurationRequest;
            fromPartial(_: Partial<_108.QueryLiquidationsConfigurationRequest>): _108.QueryLiquidationsConfigurationRequest;
            fromAmino(_: _108.QueryLiquidationsConfigurationRequestAmino): _108.QueryLiquidationsConfigurationRequest;
            toAmino(_: _108.QueryLiquidationsConfigurationRequest): _108.QueryLiquidationsConfigurationRequestAmino;
            fromAminoMsg(object: _108.QueryLiquidationsConfigurationRequestAminoMsg): _108.QueryLiquidationsConfigurationRequest;
            fromProtoMsg(message: _108.QueryLiquidationsConfigurationRequestProtoMsg): _108.QueryLiquidationsConfigurationRequest;
            toProto(message: _108.QueryLiquidationsConfigurationRequest): Uint8Array;
            toProtoMsg(message: _108.QueryLiquidationsConfigurationRequest): _108.QueryLiquidationsConfigurationRequestProtoMsg;
        };
        QueryLiquidationsConfigurationResponse: {
            typeUrl: string;
            is(o: any): o is _108.QueryLiquidationsConfigurationResponse;
            isSDK(o: any): o is _108.QueryLiquidationsConfigurationResponseSDKType;
            isAmino(o: any): o is _108.QueryLiquidationsConfigurationResponseAmino;
            encode(message: _108.QueryLiquidationsConfigurationResponse, writer?: import("..").BinaryWriter): import("..").BinaryWriter;
            decode(input: import("..").BinaryReader | Uint8Array, length?: number): _108.QueryLiquidationsConfigurationResponse;
            fromPartial(object: Partial<_108.QueryLiquidationsConfigurationResponse>): _108.QueryLiquidationsConfigurationResponse;
            fromAmino(object: _108.QueryLiquidationsConfigurationResponseAmino): _108.QueryLiquidationsConfigurationResponse;
            toAmino(message: _108.QueryLiquidationsConfigurationResponse): _108.QueryLiquidationsConfigurationResponseAmino;
            fromAminoMsg(object: _108.QueryLiquidationsConfigurationResponseAminoMsg): _108.QueryLiquidationsConfigurationResponse;
            fromProtoMsg(message: _108.QueryLiquidationsConfigurationResponseProtoMsg): _108.QueryLiquidationsConfigurationResponse;
            toProto(message: _108.QueryLiquidationsConfigurationResponse): Uint8Array;
            toProtoMsg(message: _108.QueryLiquidationsConfigurationResponse): _108.QueryLiquidationsConfigurationResponseProtoMsg;
        };
        StreamOrderbookUpdatesRequest: {
            typeUrl: string;
            is(o: any): o is _108.StreamOrderbookUpdatesRequest;
            isSDK(o: any): o is _108.StreamOrderbookUpdatesRequestSDKType;
            isAmino(o: any): o is _108.StreamOrderbookUpdatesRequestAmino;
            encode(message: _108.StreamOrderbookUpdatesRequest, writer?: import("..").BinaryWriter): import("..").BinaryWriter;
            decode(input: import("..").BinaryReader | Uint8Array, length?: number): _108.StreamOrderbookUpdatesRequest;
            fromPartial(object: Partial<_108.StreamOrderbookUpdatesRequest>): _108.StreamOrderbookUpdatesRequest;
            fromAmino(object: _108.StreamOrderbookUpdatesRequestAmino): _108.StreamOrderbookUpdatesRequest;
            toAmino(message: _108.StreamOrderbookUpdatesRequest): _108.StreamOrderbookUpdatesRequestAmino;
            fromAminoMsg(object: _108.StreamOrderbookUpdatesRequestAminoMsg): _108.StreamOrderbookUpdatesRequest;
            fromProtoMsg(message: _108.StreamOrderbookUpdatesRequestProtoMsg): _108.StreamOrderbookUpdatesRequest;
            toProto(message: _108.StreamOrderbookUpdatesRequest): Uint8Array;
            toProtoMsg(message: _108.StreamOrderbookUpdatesRequest): _108.StreamOrderbookUpdatesRequestProtoMsg;
        };
        StreamOrderbookUpdatesResponse: {
            typeUrl: string;
            is(o: any): o is _108.StreamOrderbookUpdatesResponse;
            isSDK(o: any): o is _108.StreamOrderbookUpdatesResponseSDKType;
            isAmino(o: any): o is _108.StreamOrderbookUpdatesResponseAmino;
            encode(message: _108.StreamOrderbookUpdatesResponse, writer?: import("..").BinaryWriter): import("..").BinaryWriter;
            decode(input: import("..").BinaryReader | Uint8Array, length?: number): _108.StreamOrderbookUpdatesResponse;
            fromPartial(object: Partial<_108.StreamOrderbookUpdatesResponse>): _108.StreamOrderbookUpdatesResponse;
            fromAmino(object: _108.StreamOrderbookUpdatesResponseAmino): _108.StreamOrderbookUpdatesResponse;
            toAmino(message: _108.StreamOrderbookUpdatesResponse): _108.StreamOrderbookUpdatesResponseAmino;
            fromAminoMsg(object: _108.StreamOrderbookUpdatesResponseAminoMsg): _108.StreamOrderbookUpdatesResponse;
            fromProtoMsg(message: _108.StreamOrderbookUpdatesResponseProtoMsg): _108.StreamOrderbookUpdatesResponse;
            toProto(message: _108.StreamOrderbookUpdatesResponse): Uint8Array;
            toProtoMsg(message: _108.StreamOrderbookUpdatesResponse): _108.StreamOrderbookUpdatesResponseProtoMsg;
        };
        ProcessProposerMatchesEvents: {
            typeUrl: string;
            is(o: any): o is _107.ProcessProposerMatchesEvents;
            isSDK(o: any): o is _107.ProcessProposerMatchesEventsSDKType;
            isAmino(o: any): o is _107.ProcessProposerMatchesEventsAmino;
            encode(message: _107.ProcessProposerMatchesEvents, writer?: import("..").BinaryWriter): import("..").BinaryWriter;
            decode(input: import("..").BinaryReader | Uint8Array, length?: number): _107.ProcessProposerMatchesEvents;
            fromPartial(object: Partial<_107.ProcessProposerMatchesEvents>): _107.ProcessProposerMatchesEvents;
            fromAmino(object: _107.ProcessProposerMatchesEventsAmino): _107.ProcessProposerMatchesEvents;
            toAmino(message: _107.ProcessProposerMatchesEvents): _107.ProcessProposerMatchesEventsAmino;
            fromAminoMsg(object: _107.ProcessProposerMatchesEventsAminoMsg): _107.ProcessProposerMatchesEvents;
            fromProtoMsg(message: _107.ProcessProposerMatchesEventsProtoMsg): _107.ProcessProposerMatchesEvents;
            toProto(message: _107.ProcessProposerMatchesEvents): Uint8Array;
            toProtoMsg(message: _107.ProcessProposerMatchesEvents): _107.ProcessProposerMatchesEventsProtoMsg;
        };
        order_SideFromJSON(object: any): _106.Order_Side;
        order_SideToJSON(object: _106.Order_Side): string;
        order_TimeInForceFromJSON(object: any): _106.Order_TimeInForce;
        order_TimeInForceToJSON(object: _106.Order_TimeInForce): string;
        order_ConditionTypeFromJSON(object: any): _106.Order_ConditionType;
        order_ConditionTypeToJSON(object: _106.Order_ConditionType): string;
        Order_Side: typeof _106.Order_Side;
        Order_SideSDKType: typeof _106.Order_Side;
        Order_SideAmino: typeof _106.Order_Side;
        Order_TimeInForce: typeof _106.Order_TimeInForce;
        Order_TimeInForceSDKType: typeof _106.Order_TimeInForce;
        Order_TimeInForceAmino: typeof _106.Order_TimeInForce;
        Order_ConditionType: typeof _106.Order_ConditionType;
        Order_ConditionTypeSDKType: typeof _106.Order_ConditionType;
        Order_ConditionTypeAmino: typeof _106.Order_ConditionType;
        OrderId: {
            typeUrl: string;
            is(o: any): o is _106.OrderId;
            isSDK(o: any): o is _106.OrderIdSDKType;
            isAmino(o: any): o is _106.OrderIdAmino;
            encode(message: _106.OrderId, writer?: import("..").BinaryWriter): import("..").BinaryWriter;
            decode(input: import("..").BinaryReader | Uint8Array, length?: number): _106.OrderId;
            fromPartial(object: Partial<_106.OrderId>): _106.OrderId;
            fromAmino(object: _106.OrderIdAmino): _106.OrderId;
            toAmino(message: _106.OrderId): _106.OrderIdAmino;
            fromAminoMsg(object: _106.OrderIdAminoMsg): _106.OrderId;
            fromProtoMsg(message: _106.OrderIdProtoMsg): _106.OrderId;
            toProto(message: _106.OrderId): Uint8Array;
            toProtoMsg(message: _106.OrderId): _106.OrderIdProtoMsg;
        };
        OrdersFilledDuringLatestBlock: {
            typeUrl: string;
            is(o: any): o is _106.OrdersFilledDuringLatestBlock;
            isSDK(o: any): o is _106.OrdersFilledDuringLatestBlockSDKType;
            isAmino(o: any): o is _106.OrdersFilledDuringLatestBlockAmino;
            encode(message: _106.OrdersFilledDuringLatestBlock, writer?: import("..").BinaryWriter): import("..").BinaryWriter;
            decode(input: import("..").BinaryReader | Uint8Array, length?: number): _106.OrdersFilledDuringLatestBlock;
            fromPartial(object: Partial<_106.OrdersFilledDuringLatestBlock>): _106.OrdersFilledDuringLatestBlock;
            fromAmino(object: _106.OrdersFilledDuringLatestBlockAmino): _106.OrdersFilledDuringLatestBlock;
            toAmino(message: _106.OrdersFilledDuringLatestBlock): _106.OrdersFilledDuringLatestBlockAmino;
            fromAminoMsg(object: _106.OrdersFilledDuringLatestBlockAminoMsg): _106.OrdersFilledDuringLatestBlock;
            fromProtoMsg(message: _106.OrdersFilledDuringLatestBlockProtoMsg): _106.OrdersFilledDuringLatestBlock;
            toProto(message: _106.OrdersFilledDuringLatestBlock): Uint8Array;
            toProtoMsg(message: _106.OrdersFilledDuringLatestBlock): _106.OrdersFilledDuringLatestBlockProtoMsg;
        };
        PotentiallyPrunableOrders: {
            typeUrl: string;
            is(o: any): o is _106.PotentiallyPrunableOrders;
            isSDK(o: any): o is _106.PotentiallyPrunableOrdersSDKType;
            isAmino(o: any): o is _106.PotentiallyPrunableOrdersAmino;
            encode(message: _106.PotentiallyPrunableOrders, writer?: import("..").BinaryWriter): import("..").BinaryWriter;
            decode(input: import("..").BinaryReader | Uint8Array, length?: number): _106.PotentiallyPrunableOrders;
            fromPartial(object: Partial<_106.PotentiallyPrunableOrders>): _106.PotentiallyPrunableOrders;
            fromAmino(object: _106.PotentiallyPrunableOrdersAmino): _106.PotentiallyPrunableOrders;
            toAmino(message: _106.PotentiallyPrunableOrders): _106.PotentiallyPrunableOrdersAmino;
            fromAminoMsg(object: _106.PotentiallyPrunableOrdersAminoMsg): _106.PotentiallyPrunableOrders;
            fromProtoMsg(message: _106.PotentiallyPrunableOrdersProtoMsg): _106.PotentiallyPrunableOrders;
            toProto(message: _106.PotentiallyPrunableOrders): Uint8Array;
            toProtoMsg(message: _106.PotentiallyPrunableOrders): _106.PotentiallyPrunableOrdersProtoMsg;
        };
        OrderFillState: {
            typeUrl: string;
            is(o: any): o is _106.OrderFillState;
            isSDK(o: any): o is _106.OrderFillStateSDKType;
            isAmino(o: any): o is _106.OrderFillStateAmino;
            encode(message: _106.OrderFillState, writer?: import("..").BinaryWriter): import("..").BinaryWriter;
            decode(input: import("..").BinaryReader | Uint8Array, length?: number): _106.OrderFillState;
            fromPartial(object: Partial<_106.OrderFillState>): _106.OrderFillState;
            fromAmino(object: _106.OrderFillStateAmino): _106.OrderFillState;
            toAmino(message: _106.OrderFillState): _106.OrderFillStateAmino;
            fromAminoMsg(object: _106.OrderFillStateAminoMsg): _106.OrderFillState;
            fromProtoMsg(message: _106.OrderFillStateProtoMsg): _106.OrderFillState;
            toProto(message: _106.OrderFillState): Uint8Array;
            toProtoMsg(message: _106.OrderFillState): _106.OrderFillStateProtoMsg;
        };
        StatefulOrderTimeSliceValue: {
            typeUrl: string;
            is(o: any): o is _106.StatefulOrderTimeSliceValue;
            isSDK(o: any): o is _106.StatefulOrderTimeSliceValueSDKType;
            isAmino(o: any): o is _106.StatefulOrderTimeSliceValueAmino;
            encode(message: _106.StatefulOrderTimeSliceValue, writer?: import("..").BinaryWriter): import("..").BinaryWriter;
            decode(input: import("..").BinaryReader | Uint8Array, length?: number): _106.StatefulOrderTimeSliceValue;
            fromPartial(object: Partial<_106.StatefulOrderTimeSliceValue>): _106.StatefulOrderTimeSliceValue;
            fromAmino(object: _106.StatefulOrderTimeSliceValueAmino): _106.StatefulOrderTimeSliceValue;
            toAmino(message: _106.StatefulOrderTimeSliceValue): _106.StatefulOrderTimeSliceValueAmino;
            fromAminoMsg(object: _106.StatefulOrderTimeSliceValueAminoMsg): _106.StatefulOrderTimeSliceValue;
            fromProtoMsg(message: _106.StatefulOrderTimeSliceValueProtoMsg): _106.StatefulOrderTimeSliceValue;
            toProto(message: _106.StatefulOrderTimeSliceValue): Uint8Array;
            toProtoMsg(message: _106.StatefulOrderTimeSliceValue): _106.StatefulOrderTimeSliceValueProtoMsg;
        };
        LongTermOrderPlacement: {
            typeUrl: string;
            is(o: any): o is _106.LongTermOrderPlacement;
            isSDK(o: any): o is _106.LongTermOrderPlacementSDKType;
            isAmino(o: any): o is _106.LongTermOrderPlacementAmino;
            encode(message: _106.LongTermOrderPlacement, writer?: import("..").BinaryWriter): import("..").BinaryWriter;
            decode(input: import("..").BinaryReader | Uint8Array, length?: number): _106.LongTermOrderPlacement;
            fromPartial(object: Partial<_106.LongTermOrderPlacement>): _106.LongTermOrderPlacement;
            fromAmino(object: _106.LongTermOrderPlacementAmino): _106.LongTermOrderPlacement;
            toAmino(message: _106.LongTermOrderPlacement): _106.LongTermOrderPlacementAmino;
            fromAminoMsg(object: _106.LongTermOrderPlacementAminoMsg): _106.LongTermOrderPlacement;
            fromProtoMsg(message: _106.LongTermOrderPlacementProtoMsg): _106.LongTermOrderPlacement;
            toProto(message: _106.LongTermOrderPlacement): Uint8Array;
            toProtoMsg(message: _106.LongTermOrderPlacement): _106.LongTermOrderPlacementProtoMsg;
        };
        ConditionalOrderPlacement: {
            typeUrl: string;
            is(o: any): o is _106.ConditionalOrderPlacement;
            isSDK(o: any): o is _106.ConditionalOrderPlacementSDKType;
            isAmino(o: any): o is _106.ConditionalOrderPlacementAmino;
            encode(message: _106.ConditionalOrderPlacement, writer?: import("..").BinaryWriter): import("..").BinaryWriter;
            decode(input: import("..").BinaryReader | Uint8Array, length?: number): _106.ConditionalOrderPlacement;
            fromPartial(object: Partial<_106.ConditionalOrderPlacement>): _106.ConditionalOrderPlacement;
            fromAmino(object: _106.ConditionalOrderPlacementAmino): _106.ConditionalOrderPlacement;
            toAmino(message: _106.ConditionalOrderPlacement): _106.ConditionalOrderPlacementAmino;
            fromAminoMsg(object: _106.ConditionalOrderPlacementAminoMsg): _106.ConditionalOrderPlacement;
            fromProtoMsg(message: _106.ConditionalOrderPlacementProtoMsg): _106.ConditionalOrderPlacement;
            toProto(message: _106.ConditionalOrderPlacement): Uint8Array;
            toProtoMsg(message: _106.ConditionalOrderPlacement): _106.ConditionalOrderPlacementProtoMsg;
        };
        Order: {
            typeUrl: string;
            is(o: any): o is _106.Order;
            isSDK(o: any): o is _106.OrderSDKType;
            isAmino(o: any): o is _106.OrderAmino;
            encode(message: _106.Order, writer?: import("..").BinaryWriter): import("..").BinaryWriter;
            decode(input: import("..").BinaryReader | Uint8Array, length?: number): _106.Order;
            fromPartial(object: Partial<_106.Order>): _106.Order;
            fromAmino(object: _106.OrderAmino): _106.Order;
            toAmino(message: _106.Order): _106.OrderAmino;
            fromAminoMsg(object: _106.OrderAminoMsg): _106.Order;
            fromProtoMsg(message: _106.OrderProtoMsg): _106.Order;
            toProto(message: _106.Order): Uint8Array;
            toProtoMsg(message: _106.Order): _106.OrderProtoMsg;
        };
        TransactionOrdering: {
            typeUrl: string;
            is(o: any): o is _106.TransactionOrdering;
            isSDK(o: any): o is _106.TransactionOrderingSDKType;
            isAmino(o: any): o is _106.TransactionOrderingAmino;
            encode(message: _106.TransactionOrdering, writer?: import("..").BinaryWriter): import("..").BinaryWriter;
            decode(input: import("..").BinaryReader | Uint8Array, length?: number): _106.TransactionOrdering;
            fromPartial(object: Partial<_106.TransactionOrdering>): _106.TransactionOrdering;
            fromAmino(object: _106.TransactionOrderingAmino): _106.TransactionOrdering;
            toAmino(message: _106.TransactionOrdering): _106.TransactionOrderingAmino;
            fromAminoMsg(object: _106.TransactionOrderingAminoMsg): _106.TransactionOrdering;
            fromProtoMsg(message: _106.TransactionOrderingProtoMsg): _106.TransactionOrdering;
            toProto(message: _106.TransactionOrdering): Uint8Array;
            toProtoMsg(message: _106.TransactionOrdering): _106.TransactionOrderingProtoMsg;
        };
        orderRemoval_RemovalReasonFromJSON(object: any): _105.OrderRemoval_RemovalReason;
        orderRemoval_RemovalReasonToJSON(object: _105.OrderRemoval_RemovalReason): string;
        OrderRemoval_RemovalReason: typeof _105.OrderRemoval_RemovalReason;
        OrderRemoval_RemovalReasonSDKType: typeof _105.OrderRemoval_RemovalReason;
        OrderRemoval_RemovalReasonAmino: typeof _105.OrderRemoval_RemovalReason;
        OrderRemoval: {
            typeUrl: string;
            is(o: any): o is _105.OrderRemoval;
            isSDK(o: any): o is _105.OrderRemovalSDKType;
            isAmino(o: any): o is _105.OrderRemovalAmino;
            encode(message: _105.OrderRemoval, writer?: import("..").BinaryWriter): import("..").BinaryWriter;
            decode(input: import("..").BinaryReader | Uint8Array, length?: number): _105.OrderRemoval;
            fromPartial(object: Partial<_105.OrderRemoval>): _105.OrderRemoval;
            fromAmino(object: _105.OrderRemovalAmino): _105.OrderRemoval;
            toAmino(message: _105.OrderRemoval): _105.OrderRemovalAmino;
            fromAminoMsg(object: _105.OrderRemovalAminoMsg): _105.OrderRemoval;
            fromProtoMsg(message: _105.OrderRemovalProtoMsg): _105.OrderRemoval;
            toProto(message: _105.OrderRemoval): Uint8Array;
            toProtoMsg(message: _105.OrderRemoval): _105.OrderRemovalProtoMsg;
        };
        Operation: {
            typeUrl: string;
            is(o: any): o is _104.Operation;
            isSDK(o: any): o is _104.OperationSDKType;
            isAmino(o: any): o is _104.OperationAmino;
            encode(message: _104.Operation, writer?: import("..").BinaryWriter): import("..").BinaryWriter;
            decode(input: import("..").BinaryReader | Uint8Array, length?: number): _104.Operation;
            fromPartial(object: Partial<_104.Operation>): _104.Operation;
            fromAmino(object: _104.OperationAmino): _104.Operation;
            toAmino(message: _104.Operation): _104.OperationAmino;
            fromAminoMsg(object: _104.OperationAminoMsg): _104.Operation;
            fromProtoMsg(message: _104.OperationProtoMsg): _104.Operation;
            toProto(message: _104.Operation): Uint8Array;
            toProtoMsg(message: _104.Operation): _104.OperationProtoMsg;
        };
        InternalOperation: {
            typeUrl: string;
            is(o: any): o is _104.InternalOperation;
            isSDK(o: any): o is _104.InternalOperationSDKType;
            isAmino(o: any): o is _104.InternalOperationAmino;
            encode(message: _104.InternalOperation, writer?: import("..").BinaryWriter): import("..").BinaryWriter;
            decode(input: import("..").BinaryReader | Uint8Array, length?: number): _104.InternalOperation;
            fromPartial(object: Partial<_104.InternalOperation>): _104.InternalOperation;
            fromAmino(object: _104.InternalOperationAmino): _104.InternalOperation;
            toAmino(message: _104.InternalOperation): _104.InternalOperationAmino;
            fromAminoMsg(object: _104.InternalOperationAminoMsg): _104.InternalOperation;
            fromProtoMsg(message: _104.InternalOperationProtoMsg): _104.InternalOperation;
            toProto(message: _104.InternalOperation): Uint8Array;
            toProtoMsg(message: _104.InternalOperation): _104.InternalOperationProtoMsg;
        };
        MEVMatch: {
            typeUrl: string;
            is(o: any): o is _103.MEVMatch;
            isSDK(o: any): o is _103.MEVMatchSDKType;
            isAmino(o: any): o is _103.MEVMatchAmino;
            encode(message: _103.MEVMatch, writer?: import("..").BinaryWriter): import("..").BinaryWriter;
            decode(input: import("..").BinaryReader | Uint8Array, length?: number): _103.MEVMatch;
            fromPartial(object: Partial<_103.MEVMatch>): _103.MEVMatch;
            fromAmino(object: _103.MEVMatchAmino): _103.MEVMatch;
            toAmino(message: _103.MEVMatch): _103.MEVMatchAmino;
            fromAminoMsg(object: _103.MEVMatchAminoMsg): _103.MEVMatch;
            fromProtoMsg(message: _103.MEVMatchProtoMsg): _103.MEVMatch;
            toProto(message: _103.MEVMatch): Uint8Array;
            toProtoMsg(message: _103.MEVMatch): _103.MEVMatchProtoMsg;
        };
        MEVLiquidationMatch: {
            typeUrl: string;
            is(o: any): o is _103.MEVLiquidationMatch;
            isSDK(o: any): o is _103.MEVLiquidationMatchSDKType;
            isAmino(o: any): o is _103.MEVLiquidationMatchAmino;
            encode(message: _103.MEVLiquidationMatch, writer?: import("..").BinaryWriter): import("..").BinaryWriter;
            decode(input: import("..").BinaryReader | Uint8Array, length?: number): _103.MEVLiquidationMatch;
            fromPartial(object: Partial<_103.MEVLiquidationMatch>): _103.MEVLiquidationMatch;
            fromAmino(object: _103.MEVLiquidationMatchAmino): _103.MEVLiquidationMatch;
            toAmino(message: _103.MEVLiquidationMatch): _103.MEVLiquidationMatchAmino;
            fromAminoMsg(object: _103.MEVLiquidationMatchAminoMsg): _103.MEVLiquidationMatch;
            fromProtoMsg(message: _103.MEVLiquidationMatchProtoMsg): _103.MEVLiquidationMatch;
            toProto(message: _103.MEVLiquidationMatch): Uint8Array;
            toProtoMsg(message: _103.MEVLiquidationMatch): _103.MEVLiquidationMatchProtoMsg;
        };
        ClobMidPrice: {
            typeUrl: string;
            is(o: any): o is _103.ClobMidPrice;
            isSDK(o: any): o is _103.ClobMidPriceSDKType;
            isAmino(o: any): o is _103.ClobMidPriceAmino;
            encode(message: _103.ClobMidPrice, writer?: import("..").BinaryWriter): import("..").BinaryWriter;
            decode(input: import("..").BinaryReader | Uint8Array, length?: number): _103.ClobMidPrice;
            fromPartial(object: Partial<_103.ClobMidPrice>): _103.ClobMidPrice;
            fromAmino(object: _103.ClobMidPriceAmino): _103.ClobMidPrice;
            toAmino(message: _103.ClobMidPrice): _103.ClobMidPriceAmino;
            fromAminoMsg(object: _103.ClobMidPriceAminoMsg): _103.ClobMidPrice;
            fromProtoMsg(message: _103.ClobMidPriceProtoMsg): _103.ClobMidPrice;
            toProto(message: _103.ClobMidPrice): Uint8Array;
            toProtoMsg(message: _103.ClobMidPrice): _103.ClobMidPriceProtoMsg;
        };
        ValidatorMevMatches: {
            typeUrl: string;
            is(o: any): o is _103.ValidatorMevMatches;
            isSDK(o: any): o is _103.ValidatorMevMatchesSDKType;
            isAmino(o: any): o is _103.ValidatorMevMatchesAmino;
            encode(message: _103.ValidatorMevMatches, writer?: import("..").BinaryWriter): import("..").BinaryWriter;
            decode(input: import("..").BinaryReader | Uint8Array, length?: number): _103.ValidatorMevMatches;
            fromPartial(object: Partial<_103.ValidatorMevMatches>): _103.ValidatorMevMatches;
            fromAmino(object: _103.ValidatorMevMatchesAmino): _103.ValidatorMevMatches;
            toAmino(message: _103.ValidatorMevMatches): _103.ValidatorMevMatchesAmino;
            fromAminoMsg(object: _103.ValidatorMevMatchesAminoMsg): _103.ValidatorMevMatches;
            fromProtoMsg(message: _103.ValidatorMevMatchesProtoMsg): _103.ValidatorMevMatches;
            toProto(message: _103.ValidatorMevMatches): Uint8Array;
            toProtoMsg(message: _103.ValidatorMevMatches): _103.ValidatorMevMatchesProtoMsg;
        };
        MevNodeToNodeMetrics: {
            typeUrl: string;
            is(o: any): o is _103.MevNodeToNodeMetrics;
            isSDK(o: any): o is _103.MevNodeToNodeMetricsSDKType;
            isAmino(o: any): o is _103.MevNodeToNodeMetricsAmino;
            encode(message: _103.MevNodeToNodeMetrics, writer?: import("..").BinaryWriter): import("..").BinaryWriter;
            decode(input: import("..").BinaryReader | Uint8Array, length?: number): _103.MevNodeToNodeMetrics;
            fromPartial(object: Partial<_103.MevNodeToNodeMetrics>): _103.MevNodeToNodeMetrics;
            fromAmino(object: _103.MevNodeToNodeMetricsAmino): _103.MevNodeToNodeMetrics;
            toAmino(message: _103.MevNodeToNodeMetrics): _103.MevNodeToNodeMetricsAmino;
            fromAminoMsg(object: _103.MevNodeToNodeMetricsAminoMsg): _103.MevNodeToNodeMetrics;
            fromProtoMsg(message: _103.MevNodeToNodeMetricsProtoMsg): _103.MevNodeToNodeMetrics;
            toProto(message: _103.MevNodeToNodeMetrics): Uint8Array;
            toProtoMsg(message: _103.MevNodeToNodeMetrics): _103.MevNodeToNodeMetricsProtoMsg;
        };
        ClobMatch: {
            typeUrl: string;
            is(o: any): o is _102.ClobMatch;
            isSDK(o: any): o is _102.ClobMatchSDKType;
            isAmino(o: any): o is _102.ClobMatchAmino;
            encode(message: _102.ClobMatch, writer?: import("..").BinaryWriter): import("..").BinaryWriter;
            decode(input: import("..").BinaryReader | Uint8Array, length?: number): _102.ClobMatch;
            fromPartial(object: Partial<_102.ClobMatch>): _102.ClobMatch;
            fromAmino(object: _102.ClobMatchAmino): _102.ClobMatch;
            toAmino(message: _102.ClobMatch): _102.ClobMatchAmino;
            fromAminoMsg(object: _102.ClobMatchAminoMsg): _102.ClobMatch;
            fromProtoMsg(message: _102.ClobMatchProtoMsg): _102.ClobMatch;
            toProto(message: _102.ClobMatch): Uint8Array;
            toProtoMsg(message: _102.ClobMatch): _102.ClobMatchProtoMsg;
        };
        MakerFill: {
            typeUrl: string;
            is(o: any): o is _102.MakerFill;
            isSDK(o: any): o is _102.MakerFillSDKType;
            isAmino(o: any): o is _102.MakerFillAmino;
            encode(message: _102.MakerFill, writer?: import("..").BinaryWriter): import("..").BinaryWriter;
            decode(input: import("..").BinaryReader | Uint8Array, length?: number): _102.MakerFill;
            fromPartial(object: Partial<_102.MakerFill>): _102.MakerFill;
            fromAmino(object: _102.MakerFillAmino): _102.MakerFill;
            toAmino(message: _102.MakerFill): _102.MakerFillAmino;
            fromAminoMsg(object: _102.MakerFillAminoMsg): _102.MakerFill;
            fromProtoMsg(message: _102.MakerFillProtoMsg): _102.MakerFill;
            toProto(message: _102.MakerFill): Uint8Array;
            toProtoMsg(message: _102.MakerFill): _102.MakerFillProtoMsg;
        };
        MatchOrders: {
            typeUrl: string;
            is(o: any): o is _102.MatchOrders;
            isSDK(o: any): o is _102.MatchOrdersSDKType;
            isAmino(o: any): o is _102.MatchOrdersAmino;
            encode(message: _102.MatchOrders, writer?: import("..").BinaryWriter): import("..").BinaryWriter;
            decode(input: import("..").BinaryReader | Uint8Array, length?: number): _102.MatchOrders;
            fromPartial(object: Partial<_102.MatchOrders>): _102.MatchOrders;
            fromAmino(object: _102.MatchOrdersAmino): _102.MatchOrders;
            toAmino(message: _102.MatchOrders): _102.MatchOrdersAmino;
            fromAminoMsg(object: _102.MatchOrdersAminoMsg): _102.MatchOrders;
            fromProtoMsg(message: _102.MatchOrdersProtoMsg): _102.MatchOrders;
            toProto(message: _102.MatchOrders): Uint8Array;
            toProtoMsg(message: _102.MatchOrders): _102.MatchOrdersProtoMsg;
        };
        MatchPerpetualLiquidation: {
            typeUrl: string;
            is(o: any): o is _102.MatchPerpetualLiquidation;
            isSDK(o: any): o is _102.MatchPerpetualLiquidationSDKType;
            isAmino(o: any): o is _102.MatchPerpetualLiquidationAmino;
            encode(message: _102.MatchPerpetualLiquidation, writer?: import("..").BinaryWriter): import("..").BinaryWriter;
            decode(input: import("..").BinaryReader | Uint8Array, length?: number): _102.MatchPerpetualLiquidation;
            fromPartial(object: Partial<_102.MatchPerpetualLiquidation>): _102.MatchPerpetualLiquidation;
            fromAmino(object: _102.MatchPerpetualLiquidationAmino): _102.MatchPerpetualLiquidation;
            toAmino(message: _102.MatchPerpetualLiquidation): _102.MatchPerpetualLiquidationAmino;
            fromAminoMsg(object: _102.MatchPerpetualLiquidationAminoMsg): _102.MatchPerpetualLiquidation;
            fromProtoMsg(message: _102.MatchPerpetualLiquidationProtoMsg): _102.MatchPerpetualLiquidation;
            toProto(message: _102.MatchPerpetualLiquidation): Uint8Array;
            toProtoMsg(message: _102.MatchPerpetualLiquidation): _102.MatchPerpetualLiquidationProtoMsg;
        };
        MatchPerpetualDeleveraging: {
            typeUrl: string;
            is(o: any): o is _102.MatchPerpetualDeleveraging;
            isSDK(o: any): o is _102.MatchPerpetualDeleveragingSDKType;
            isAmino(o: any): o is _102.MatchPerpetualDeleveragingAmino;
            encode(message: _102.MatchPerpetualDeleveraging, writer?: import("..").BinaryWriter): import("..").BinaryWriter;
            decode(input: import("..").BinaryReader | Uint8Array, length?: number): _102.MatchPerpetualDeleveraging;
            fromPartial(object: Partial<_102.MatchPerpetualDeleveraging>): _102.MatchPerpetualDeleveraging;
            fromAmino(object: _102.MatchPerpetualDeleveragingAmino): _102.MatchPerpetualDeleveraging;
            toAmino(message: _102.MatchPerpetualDeleveraging): _102.MatchPerpetualDeleveragingAmino;
            fromAminoMsg(object: _102.MatchPerpetualDeleveragingAminoMsg): _102.MatchPerpetualDeleveraging;
            fromProtoMsg(message: _102.MatchPerpetualDeleveragingProtoMsg): _102.MatchPerpetualDeleveraging;
            toProto(message: _102.MatchPerpetualDeleveraging): Uint8Array;
            toProtoMsg(message: _102.MatchPerpetualDeleveraging): _102.MatchPerpetualDeleveragingProtoMsg;
        };
        MatchPerpetualDeleveraging_Fill: {
            typeUrl: string;
            is(o: any): o is _102.MatchPerpetualDeleveraging_Fill;
            isSDK(o: any): o is _102.MatchPerpetualDeleveraging_FillSDKType;
            isAmino(o: any): o is _102.MatchPerpetualDeleveraging_FillAmino;
            encode(message: _102.MatchPerpetualDeleveraging_Fill, writer?: import("..").BinaryWriter): import("..").BinaryWriter;
            decode(input: import("..").BinaryReader | Uint8Array, length?: number): _102.MatchPerpetualDeleveraging_Fill;
            fromPartial(object: Partial<_102.MatchPerpetualDeleveraging_Fill>): _102.MatchPerpetualDeleveraging_Fill;
            fromAmino(object: _102.MatchPerpetualDeleveraging_FillAmino): _102.MatchPerpetualDeleveraging_Fill;
            toAmino(message: _102.MatchPerpetualDeleveraging_Fill): _102.MatchPerpetualDeleveraging_FillAmino;
            fromAminoMsg(object: _102.MatchPerpetualDeleveraging_FillAminoMsg): _102.MatchPerpetualDeleveraging_Fill;
            fromProtoMsg(message: _102.MatchPerpetualDeleveraging_FillProtoMsg): _102.MatchPerpetualDeleveraging_Fill;
            toProto(message: _102.MatchPerpetualDeleveraging_Fill): Uint8Array;
            toProtoMsg(message: _102.MatchPerpetualDeleveraging_Fill): _102.MatchPerpetualDeleveraging_FillProtoMsg;
        };
        PerpetualLiquidationInfo: {
            typeUrl: string;
            is(o: any): o is _101.PerpetualLiquidationInfo;
            isSDK(o: any): o is _101.PerpetualLiquidationInfoSDKType;
            isAmino(o: any): o is _101.PerpetualLiquidationInfoAmino;
            encode(message: _101.PerpetualLiquidationInfo, writer?: import("..").BinaryWriter): import("..").BinaryWriter;
            decode(input: import("..").BinaryReader | Uint8Array, length?: number): _101.PerpetualLiquidationInfo;
            fromPartial(object: Partial<_101.PerpetualLiquidationInfo>): _101.PerpetualLiquidationInfo;
            fromAmino(object: _101.PerpetualLiquidationInfoAmino): _101.PerpetualLiquidationInfo;
            toAmino(message: _101.PerpetualLiquidationInfo): _101.PerpetualLiquidationInfoAmino;
            fromAminoMsg(object: _101.PerpetualLiquidationInfoAminoMsg): _101.PerpetualLiquidationInfo;
            fromProtoMsg(message: _101.PerpetualLiquidationInfoProtoMsg): _101.PerpetualLiquidationInfo;
            toProto(message: _101.PerpetualLiquidationInfo): Uint8Array;
            toProtoMsg(message: _101.PerpetualLiquidationInfo): _101.PerpetualLiquidationInfoProtoMsg;
        };
        SubaccountLiquidationInfo: {
            typeUrl: string;
            is(o: any): o is _101.SubaccountLiquidationInfo;
            isSDK(o: any): o is _101.SubaccountLiquidationInfoSDKType;
            isAmino(o: any): o is _101.SubaccountLiquidationInfoAmino;
            encode(message: _101.SubaccountLiquidationInfo, writer?: import("..").BinaryWriter): import("..").BinaryWriter;
            decode(input: import("..").BinaryReader | Uint8Array, length?: number): _101.SubaccountLiquidationInfo;
            fromPartial(object: Partial<_101.SubaccountLiquidationInfo>): _101.SubaccountLiquidationInfo;
            fromAmino(object: _101.SubaccountLiquidationInfoAmino): _101.SubaccountLiquidationInfo;
            toAmino(message: _101.SubaccountLiquidationInfo): _101.SubaccountLiquidationInfoAmino;
            fromAminoMsg(object: _101.SubaccountLiquidationInfoAminoMsg): _101.SubaccountLiquidationInfo;
            fromProtoMsg(message: _101.SubaccountLiquidationInfoProtoMsg): _101.SubaccountLiquidationInfo;
            toProto(message: _101.SubaccountLiquidationInfo): Uint8Array;
            toProtoMsg(message: _101.SubaccountLiquidationInfo): _101.SubaccountLiquidationInfoProtoMsg;
        };
        SubaccountOpenPositionInfo: {
            typeUrl: string;
            is(o: any): o is _101.SubaccountOpenPositionInfo;
            isSDK(o: any): o is _101.SubaccountOpenPositionInfoSDKType;
            isAmino(o: any): o is _101.SubaccountOpenPositionInfoAmino;
            encode(message: _101.SubaccountOpenPositionInfo, writer?: import("..").BinaryWriter): import("..").BinaryWriter;
            decode(input: import("..").BinaryReader | Uint8Array, length?: number): _101.SubaccountOpenPositionInfo;
            fromPartial(object: Partial<_101.SubaccountOpenPositionInfo>): _101.SubaccountOpenPositionInfo;
            fromAmino(object: _101.SubaccountOpenPositionInfoAmino): _101.SubaccountOpenPositionInfo;
            toAmino(message: _101.SubaccountOpenPositionInfo): _101.SubaccountOpenPositionInfoAmino;
            fromAminoMsg(object: _101.SubaccountOpenPositionInfoAminoMsg): _101.SubaccountOpenPositionInfo;
            fromProtoMsg(message: _101.SubaccountOpenPositionInfoProtoMsg): _101.SubaccountOpenPositionInfo;
            toProto(message: _101.SubaccountOpenPositionInfo): Uint8Array;
            toProtoMsg(message: _101.SubaccountOpenPositionInfo): _101.SubaccountOpenPositionInfoProtoMsg;
        };
        LiquidationsConfig: {
            typeUrl: string;
            is(o: any): o is _100.LiquidationsConfig;
            isSDK(o: any): o is _100.LiquidationsConfigSDKType;
            isAmino(o: any): o is _100.LiquidationsConfigAmino;
            encode(message: _100.LiquidationsConfig, writer?: import("..").BinaryWriter): import("..").BinaryWriter;
            decode(input: import("..").BinaryReader | Uint8Array, length?: number): _100.LiquidationsConfig;
            fromPartial(object: Partial<_100.LiquidationsConfig>): _100.LiquidationsConfig;
            fromAmino(object: _100.LiquidationsConfigAmino): _100.LiquidationsConfig;
            toAmino(message: _100.LiquidationsConfig): _100.LiquidationsConfigAmino;
            fromAminoMsg(object: _100.LiquidationsConfigAminoMsg): _100.LiquidationsConfig;
            fromProtoMsg(message: _100.LiquidationsConfigProtoMsg): _100.LiquidationsConfig;
            toProto(message: _100.LiquidationsConfig): Uint8Array;
            toProtoMsg(message: _100.LiquidationsConfig): _100.LiquidationsConfigProtoMsg;
        };
        FillablePriceConfig: {
            typeUrl: string;
            is(o: any): o is _100.FillablePriceConfig;
            isSDK(o: any): o is _100.FillablePriceConfigSDKType;
            isAmino(o: any): o is _100.FillablePriceConfigAmino;
            encode(message: _100.FillablePriceConfig, writer?: import("..").BinaryWriter): import("..").BinaryWriter;
            decode(input: import("..").BinaryReader | Uint8Array, length?: number): _100.FillablePriceConfig;
            fromPartial(object: Partial<_100.FillablePriceConfig>): _100.FillablePriceConfig;
            fromAmino(object: _100.FillablePriceConfigAmino): _100.FillablePriceConfig;
            toAmino(message: _100.FillablePriceConfig): _100.FillablePriceConfigAmino;
            fromAminoMsg(object: _100.FillablePriceConfigAminoMsg): _100.FillablePriceConfig;
            fromProtoMsg(message: _100.FillablePriceConfigProtoMsg): _100.FillablePriceConfig;
            toProto(message: _100.FillablePriceConfig): Uint8Array;
            toProtoMsg(message: _100.FillablePriceConfig): _100.FillablePriceConfigProtoMsg;
        };
        GenesisState: {
            typeUrl: string;
            is(o: any): o is _99.GenesisState;
            isSDK(o: any): o is _99.GenesisStateSDKType;
            isAmino(o: any): o is _99.GenesisStateAmino;
            encode(message: _99.GenesisState, writer?: import("..").BinaryWriter): import("..").BinaryWriter;
            decode(input: import("..").BinaryReader | Uint8Array, length?: number): _99.GenesisState;
            fromPartial(object: Partial<_99.GenesisState>): _99.GenesisState;
            fromAmino(object: _99.GenesisStateAmino): _99.GenesisState;
            toAmino(message: _99.GenesisState): _99.GenesisStateAmino;
            fromAminoMsg(object: _99.GenesisStateAminoMsg): _99.GenesisState;
            fromProtoMsg(message: _99.GenesisStateProtoMsg): _99.GenesisState;
            toProto(message: _99.GenesisState): Uint8Array;
            toProtoMsg(message: _99.GenesisState): _99.GenesisStateProtoMsg;
        };
        EquityTierLimitConfiguration: {
            typeUrl: string;
            is(o: any): o is _98.EquityTierLimitConfiguration;
            isSDK(o: any): o is _98.EquityTierLimitConfigurationSDKType;
            isAmino(o: any): o is _98.EquityTierLimitConfigurationAmino;
            encode(message: _98.EquityTierLimitConfiguration, writer?: import("..").BinaryWriter): import("..").BinaryWriter;
            decode(input: import("..").BinaryReader | Uint8Array, length?: number): _98.EquityTierLimitConfiguration;
            fromPartial(object: Partial<_98.EquityTierLimitConfiguration>): _98.EquityTierLimitConfiguration;
            fromAmino(object: _98.EquityTierLimitConfigurationAmino): _98.EquityTierLimitConfiguration;
            toAmino(message: _98.EquityTierLimitConfiguration): _98.EquityTierLimitConfigurationAmino;
            fromAminoMsg(object: _98.EquityTierLimitConfigurationAminoMsg): _98.EquityTierLimitConfiguration;
            fromProtoMsg(message: _98.EquityTierLimitConfigurationProtoMsg): _98.EquityTierLimitConfiguration;
            toProto(message: _98.EquityTierLimitConfiguration): Uint8Array;
            toProtoMsg(message: _98.EquityTierLimitConfiguration): _98.EquityTierLimitConfigurationProtoMsg;
        };
        EquityTierLimit: {
            typeUrl: string;
            is(o: any): o is _98.EquityTierLimit;
            isSDK(o: any): o is _98.EquityTierLimitSDKType;
            isAmino(o: any): o is _98.EquityTierLimitAmino;
            encode(message: _98.EquityTierLimit, writer?: import("..").BinaryWriter): import("..").BinaryWriter;
            decode(input: import("..").BinaryReader | Uint8Array, length?: number): _98.EquityTierLimit;
            fromPartial(object: Partial<_98.EquityTierLimit>): _98.EquityTierLimit;
            fromAmino(object: _98.EquityTierLimitAmino): _98.EquityTierLimit;
            toAmino(message: _98.EquityTierLimit): _98.EquityTierLimitAmino;
            fromAminoMsg(object: _98.EquityTierLimitAminoMsg): _98.EquityTierLimit;
            fromProtoMsg(message: _98.EquityTierLimitProtoMsg): _98.EquityTierLimit;
            toProto(message: _98.EquityTierLimit): Uint8Array;
            toProtoMsg(message: _98.EquityTierLimit): _98.EquityTierLimitProtoMsg;
        };
        clobPair_StatusFromJSON(object: any): _97.ClobPair_Status;
        clobPair_StatusToJSON(object: _97.ClobPair_Status): string;
        ClobPair_Status: typeof _97.ClobPair_Status;
        ClobPair_StatusSDKType: typeof _97.ClobPair_Status;
        ClobPair_StatusAmino: typeof _97.ClobPair_Status;
        PerpetualClobMetadata: {
            typeUrl: string;
            aminoType: string;
            is(o: any): o is _97.PerpetualClobMetadata;
            isSDK(o: any): o is _97.PerpetualClobMetadataSDKType;
            isAmino(o: any): o is _97.PerpetualClobMetadataAmino;
            encode(message: _97.PerpetualClobMetadata, writer?: import("..").BinaryWriter): import("..").BinaryWriter;
            decode(input: import("..").BinaryReader | Uint8Array, length?: number): _97.PerpetualClobMetadata;
            fromPartial(object: Partial<_97.PerpetualClobMetadata>): _97.PerpetualClobMetadata;
            fromAmino(object: _97.PerpetualClobMetadataAmino): _97.PerpetualClobMetadata;
            toAmino(message: _97.PerpetualClobMetadata): _97.PerpetualClobMetadataAmino;
            fromAminoMsg(object: _97.PerpetualClobMetadataAminoMsg): _97.PerpetualClobMetadata;
            toAminoMsg(message: _97.PerpetualClobMetadata): _97.PerpetualClobMetadataAminoMsg;
            fromProtoMsg(message: _97.PerpetualClobMetadataProtoMsg): _97.PerpetualClobMetadata;
            toProto(message: _97.PerpetualClobMetadata): Uint8Array;
            toProtoMsg(message: _97.PerpetualClobMetadata): _97.PerpetualClobMetadataProtoMsg;
        };
        SpotClobMetadata: {
            typeUrl: string;
            aminoType: string;
            is(o: any): o is _97.SpotClobMetadata;
            isSDK(o: any): o is _97.SpotClobMetadataSDKType;
            isAmino(o: any): o is _97.SpotClobMetadataAmino;
            encode(message: _97.SpotClobMetadata, writer?: import("..").BinaryWriter): import("..").BinaryWriter;
            decode(input: import("..").BinaryReader | Uint8Array, length?: number): _97.SpotClobMetadata;
            fromPartial(object: Partial<_97.SpotClobMetadata>): _97.SpotClobMetadata;
            fromAmino(object: _97.SpotClobMetadataAmino): _97.SpotClobMetadata;
            toAmino(message: _97.SpotClobMetadata): _97.SpotClobMetadataAmino;
            fromAminoMsg(object: _97.SpotClobMetadataAminoMsg): _97.SpotClobMetadata;
            toAminoMsg(message: _97.SpotClobMetadata): _97.SpotClobMetadataAminoMsg;
            fromProtoMsg(message: _97.SpotClobMetadataProtoMsg): _97.SpotClobMetadata;
            toProto(message: _97.SpotClobMetadata): Uint8Array;
            toProtoMsg(message: _97.SpotClobMetadata): _97.SpotClobMetadataProtoMsg;
        };
        ClobPair: {
            typeUrl: string;
            is(o: any): o is _97.ClobPair;
            isSDK(o: any): o is _97.ClobPairSDKType;
            isAmino(o: any): o is _97.ClobPairAmino;
            encode(message: _97.ClobPair, writer?: import("..").BinaryWriter): import("..").BinaryWriter;
            decode(input: import("..").BinaryReader | Uint8Array, length?: number): _97.ClobPair;
            fromPartial(object: Partial<_97.ClobPair>): _97.ClobPair;
            fromAmino(object: _97.ClobPairAmino): _97.ClobPair;
            toAmino(message: _97.ClobPair): _97.ClobPairAmino;
            fromAminoMsg(object: _97.ClobPairAminoMsg): _97.ClobPair;
            fromProtoMsg(message: _97.ClobPairProtoMsg): _97.ClobPair;
            toProto(message: _97.ClobPair): Uint8Array;
            toProtoMsg(message: _97.ClobPair): _97.ClobPairProtoMsg;
        };
        BlockRateLimitConfiguration: {
            typeUrl: string;
            is(o: any): o is _96.BlockRateLimitConfiguration;
            isSDK(o: any): o is _96.BlockRateLimitConfigurationSDKType;
            isAmino(o: any): o is _96.BlockRateLimitConfigurationAmino;
            encode(message: _96.BlockRateLimitConfiguration, writer?: import("..").BinaryWriter): import("..").BinaryWriter;
            decode(input: import("..").BinaryReader | Uint8Array, length?: number): _96.BlockRateLimitConfiguration;
            fromPartial(object: Partial<_96.BlockRateLimitConfiguration>): _96.BlockRateLimitConfiguration;
            fromAmino(object: _96.BlockRateLimitConfigurationAmino): _96.BlockRateLimitConfiguration;
            toAmino(message: _96.BlockRateLimitConfiguration): _96.BlockRateLimitConfigurationAmino;
            fromAminoMsg(object: _96.BlockRateLimitConfigurationAminoMsg): _96.BlockRateLimitConfiguration;
            fromProtoMsg(message: _96.BlockRateLimitConfigurationProtoMsg): _96.BlockRateLimitConfiguration;
            toProto(message: _96.BlockRateLimitConfiguration): Uint8Array;
            toProtoMsg(message: _96.BlockRateLimitConfiguration): _96.BlockRateLimitConfigurationProtoMsg;
        };
        MaxPerNBlocksRateLimit: {
            typeUrl: string;
            is(o: any): o is _96.MaxPerNBlocksRateLimit;
            isSDK(o: any): o is _96.MaxPerNBlocksRateLimitSDKType;
            isAmino(o: any): o is _96.MaxPerNBlocksRateLimitAmino;
            encode(message: _96.MaxPerNBlocksRateLimit, writer?: import("..").BinaryWriter): import("..").BinaryWriter;
            decode(input: import("..").BinaryReader | Uint8Array, length?: number): _96.MaxPerNBlocksRateLimit;
            fromPartial(object: Partial<_96.MaxPerNBlocksRateLimit>): _96.MaxPerNBlocksRateLimit;
            fromAmino(object: _96.MaxPerNBlocksRateLimitAmino): _96.MaxPerNBlocksRateLimit;
            toAmino(message: _96.MaxPerNBlocksRateLimit): _96.MaxPerNBlocksRateLimitAmino;
            fromAminoMsg(object: _96.MaxPerNBlocksRateLimitAminoMsg): _96.MaxPerNBlocksRateLimit;
            fromProtoMsg(message: _96.MaxPerNBlocksRateLimitProtoMsg): _96.MaxPerNBlocksRateLimit;
            toProto(message: _96.MaxPerNBlocksRateLimit): Uint8Array;
            toProtoMsg(message: _96.MaxPerNBlocksRateLimit): _96.MaxPerNBlocksRateLimitProtoMsg;
        };
    };
    namespace daemons {
        const deleveraging: {
            UpdateSubaccountsListForDeleveragingDaemonRequest: {
                typeUrl: string;
                is(o: any): o is _110.UpdateSubaccountsListForDeleveragingDaemonRequest;
                isSDK(o: any): o is _110.UpdateSubaccountsListForDeleveragingDaemonRequestSDKType;
                isAmino(o: any): o is _110.UpdateSubaccountsListForDeleveragingDaemonRequestAmino;
                encode(message: _110.UpdateSubaccountsListForDeleveragingDaemonRequest, writer?: import("..").BinaryWriter): import("..").BinaryWriter;
                decode(input: import("..").BinaryReader | Uint8Array, length?: number): _110.UpdateSubaccountsListForDeleveragingDaemonRequest;
                fromPartial(object: Partial<_110.UpdateSubaccountsListForDeleveragingDaemonRequest>): _110.UpdateSubaccountsListForDeleveragingDaemonRequest;
                fromAmino(object: _110.UpdateSubaccountsListForDeleveragingDaemonRequestAmino): _110.UpdateSubaccountsListForDeleveragingDaemonRequest;
                toAmino(message: _110.UpdateSubaccountsListForDeleveragingDaemonRequest): _110.UpdateSubaccountsListForDeleveragingDaemonRequestAmino;
                fromAminoMsg(object: _110.UpdateSubaccountsListForDeleveragingDaemonRequestAminoMsg): _110.UpdateSubaccountsListForDeleveragingDaemonRequest;
                fromProtoMsg(message: _110.UpdateSubaccountsListForDeleveragingDaemonRequestProtoMsg): _110.UpdateSubaccountsListForDeleveragingDaemonRequest;
                toProto(message: _110.UpdateSubaccountsListForDeleveragingDaemonRequest): Uint8Array;
                toProtoMsg(message: _110.UpdateSubaccountsListForDeleveragingDaemonRequest): _110.UpdateSubaccountsListForDeleveragingDaemonRequestProtoMsg;
            };
            UpdateSubaccountsListForDeleveragingDaemonResponse: {
                typeUrl: string;
                is(o: any): o is _110.UpdateSubaccountsListForDeleveragingDaemonResponse;
                isSDK(o: any): o is _110.UpdateSubaccountsListForDeleveragingDaemonResponseSDKType;
                isAmino(o: any): o is _110.UpdateSubaccountsListForDeleveragingDaemonResponseAmino;
                encode(_: _110.UpdateSubaccountsListForDeleveragingDaemonResponse, writer?: import("..").BinaryWriter): import("..").BinaryWriter;
                decode(input: import("..").BinaryReader | Uint8Array, length?: number): _110.UpdateSubaccountsListForDeleveragingDaemonResponse;
                fromPartial(_: Partial<_110.UpdateSubaccountsListForDeleveragingDaemonResponse>): _110.UpdateSubaccountsListForDeleveragingDaemonResponse;
                fromAmino(_: _110.UpdateSubaccountsListForDeleveragingDaemonResponseAmino): _110.UpdateSubaccountsListForDeleveragingDaemonResponse;
                toAmino(_: _110.UpdateSubaccountsListForDeleveragingDaemonResponse): _110.UpdateSubaccountsListForDeleveragingDaemonResponseAmino;
                fromAminoMsg(object: _110.UpdateSubaccountsListForDeleveragingDaemonResponseAminoMsg): _110.UpdateSubaccountsListForDeleveragingDaemonResponse;
                fromProtoMsg(message: _110.UpdateSubaccountsListForDeleveragingDaemonResponseProtoMsg): _110.UpdateSubaccountsListForDeleveragingDaemonResponse;
                toProto(message: _110.UpdateSubaccountsListForDeleveragingDaemonResponse): Uint8Array;
                toProtoMsg(message: _110.UpdateSubaccountsListForDeleveragingDaemonResponse): _110.UpdateSubaccountsListForDeleveragingDaemonResponseProtoMsg;
            };
        };
        const pricefeed: {
            UpdateMarketPricesRequest: {
                typeUrl: string;
                is(o: any): o is _111.UpdateMarketPricesRequest;
                isSDK(o: any): o is _111.UpdateMarketPricesRequestSDKType;
                isAmino(o: any): o is _111.UpdateMarketPricesRequestAmino;
                encode(message: _111.UpdateMarketPricesRequest, writer?: import("..").BinaryWriter): import("..").BinaryWriter;
                decode(input: import("..").BinaryReader | Uint8Array, length?: number): _111.UpdateMarketPricesRequest;
                fromPartial(object: Partial<_111.UpdateMarketPricesRequest>): _111.UpdateMarketPricesRequest;
                fromAmino(object: _111.UpdateMarketPricesRequestAmino): _111.UpdateMarketPricesRequest;
                toAmino(message: _111.UpdateMarketPricesRequest): _111.UpdateMarketPricesRequestAmino;
                fromAminoMsg(object: _111.UpdateMarketPricesRequestAminoMsg): _111.UpdateMarketPricesRequest;
                fromProtoMsg(message: _111.UpdateMarketPricesRequestProtoMsg): _111.UpdateMarketPricesRequest;
                toProto(message: _111.UpdateMarketPricesRequest): Uint8Array;
                toProtoMsg(message: _111.UpdateMarketPricesRequest): _111.UpdateMarketPricesRequestProtoMsg;
            };
            UpdateMarketPricesResponse: {
                typeUrl: string;
                is(o: any): o is _111.UpdateMarketPricesResponse;
                isSDK(o: any): o is _111.UpdateMarketPricesResponseSDKType;
                isAmino(o: any): o is _111.UpdateMarketPricesResponseAmino;
                encode(_: _111.UpdateMarketPricesResponse, writer?: import("..").BinaryWriter): import("..").BinaryWriter;
                decode(input: import("..").BinaryReader | Uint8Array, length?: number): _111.UpdateMarketPricesResponse;
                fromPartial(_: Partial<_111.UpdateMarketPricesResponse>): _111.UpdateMarketPricesResponse;
                fromAmino(_: _111.UpdateMarketPricesResponseAmino): _111.UpdateMarketPricesResponse;
                toAmino(_: _111.UpdateMarketPricesResponse): _111.UpdateMarketPricesResponseAmino;
                fromAminoMsg(object: _111.UpdateMarketPricesResponseAminoMsg): _111.UpdateMarketPricesResponse;
                fromProtoMsg(message: _111.UpdateMarketPricesResponseProtoMsg): _111.UpdateMarketPricesResponse;
                toProto(message: _111.UpdateMarketPricesResponse): Uint8Array;
                toProtoMsg(message: _111.UpdateMarketPricesResponse): _111.UpdateMarketPricesResponseProtoMsg;
            };
            ExchangePrice: {
                typeUrl: string;
                is(o: any): o is _111.ExchangePrice;
                isSDK(o: any): o is _111.ExchangePriceSDKType;
                isAmino(o: any): o is _111.ExchangePriceAmino;
                encode(message: _111.ExchangePrice, writer?: import("..").BinaryWriter): import("..").BinaryWriter;
                decode(input: import("..").BinaryReader | Uint8Array, length?: number): _111.ExchangePrice;
                fromPartial(object: Partial<_111.ExchangePrice>): _111.ExchangePrice;
                fromAmino(object: _111.ExchangePriceAmino): _111.ExchangePrice;
                toAmino(message: _111.ExchangePrice): _111.ExchangePriceAmino;
                fromAminoMsg(object: _111.ExchangePriceAminoMsg): _111.ExchangePrice;
                fromProtoMsg(message: _111.ExchangePriceProtoMsg): _111.ExchangePrice;
                toProto(message: _111.ExchangePrice): Uint8Array;
                toProtoMsg(message: _111.ExchangePrice): _111.ExchangePriceProtoMsg;
            };
            MarketPriceUpdate: {
                typeUrl: string;
                is(o: any): o is _111.MarketPriceUpdate;
                isSDK(o: any): o is _111.MarketPriceUpdateSDKType;
                isAmino(o: any): o is _111.MarketPriceUpdateAmino;
                encode(message: _111.MarketPriceUpdate, writer?: import("..").BinaryWriter): import("..").BinaryWriter;
                decode(input: import("..").BinaryReader | Uint8Array, length?: number): _111.MarketPriceUpdate;
                fromPartial(object: Partial<_111.MarketPriceUpdate>): _111.MarketPriceUpdate;
                fromAmino(object: _111.MarketPriceUpdateAmino): _111.MarketPriceUpdate;
                toAmino(message: _111.MarketPriceUpdate): _111.MarketPriceUpdateAmino;
                fromAminoMsg(object: _111.MarketPriceUpdateAminoMsg): _111.MarketPriceUpdate;
                fromProtoMsg(message: _111.MarketPriceUpdateProtoMsg): _111.MarketPriceUpdate;
                toProto(message: _111.MarketPriceUpdate): Uint8Array;
                toProtoMsg(message: _111.MarketPriceUpdate): _111.MarketPriceUpdateProtoMsg;
            };
        };
        const sdaioracle: {
            AddsDAIEventRequest: {
                typeUrl: string;
                is(o: any): o is _112.AddsDAIEventRequest;
                isSDK(o: any): o is _112.AddsDAIEventRequestSDKType;
                isAmino(o: any): o is _112.AddsDAIEventRequestAmino;
                encode(message: _112.AddsDAIEventRequest, writer?: import("..").BinaryWriter): import("..").BinaryWriter;
                decode(input: import("..").BinaryReader | Uint8Array, length?: number): _112.AddsDAIEventRequest;
                fromPartial(object: Partial<_112.AddsDAIEventRequest>): _112.AddsDAIEventRequest;
                fromAmino(object: _112.AddsDAIEventRequestAmino): _112.AddsDAIEventRequest;
                toAmino(message: _112.AddsDAIEventRequest): _112.AddsDAIEventRequestAmino;
                fromAminoMsg(object: _112.AddsDAIEventRequestAminoMsg): _112.AddsDAIEventRequest;
                fromProtoMsg(message: _112.AddsDAIEventRequestProtoMsg): _112.AddsDAIEventRequest;
                toProto(message: _112.AddsDAIEventRequest): Uint8Array;
                toProtoMsg(message: _112.AddsDAIEventRequest): _112.AddsDAIEventRequestProtoMsg;
            };
            AddsDAIEventResponse: {
                typeUrl: string;
                is(o: any): o is _112.AddsDAIEventResponse;
                isSDK(o: any): o is _112.AddsDAIEventResponseSDKType;
                isAmino(o: any): o is _112.AddsDAIEventResponseAmino;
                encode(_: _112.AddsDAIEventResponse, writer?: import("..").BinaryWriter): import("..").BinaryWriter;
                decode(input: import("..").BinaryReader | Uint8Array, length?: number): _112.AddsDAIEventResponse;
                fromPartial(_: Partial<_112.AddsDAIEventResponse>): _112.AddsDAIEventResponse;
                fromAmino(_: _112.AddsDAIEventResponseAmino): _112.AddsDAIEventResponse;
                toAmino(_: _112.AddsDAIEventResponse): _112.AddsDAIEventResponseAmino;
                fromAminoMsg(object: _112.AddsDAIEventResponseAminoMsg): _112.AddsDAIEventResponse;
                fromProtoMsg(message: _112.AddsDAIEventResponseProtoMsg): _112.AddsDAIEventResponse;
                toProto(message: _112.AddsDAIEventResponse): Uint8Array;
                toProtoMsg(message: _112.AddsDAIEventResponse): _112.AddsDAIEventResponseProtoMsg;
            };
        };
    }
    const delaymsg: {
        MsgClientImpl: typeof _287.MsgClientImpl;
        createClientImpl: (rpc: import("../helpers").Rpc) => _287.MsgClientImpl;
        QueryClientImpl: typeof _275.QueryClientImpl;
        createRpcQueryExtension: (base: import("@cosmjs/stargate").QueryClient) => {
            nextDelayedMessageId(request?: _116.QueryNextDelayedMessageIdRequest): Promise<_116.QueryNextDelayedMessageIdResponse>;
            message(request: _116.QueryMessageRequest): Promise<_116.QueryMessageResponse>;
            blockMessageIds(request: _116.QueryBlockMessageIdsRequest): Promise<_116.QueryBlockMessageIdsResponse>;
        };
        LCDQueryClient: typeof _264.LCDQueryClient;
        registry: ReadonlyArray<[string, import("@cosmjs/proto-signing").GeneratedType]>;
        load: (protoRegistry: import("@cosmjs/proto-signing").Registry) => void;
        MessageComposer: {
            encoded: {
                delayMessage(value: _117.MsgDelayMessage): {
                    typeUrl: string;
                    value: Uint8Array<ArrayBufferLike>;
                };
            };
            withTypeUrl: {
                delayMessage(value: _117.MsgDelayMessage): {
                    typeUrl: string;
                    value: _117.MsgDelayMessage;
                };
            };
            fromPartial: {
                delayMessage(value: _117.MsgDelayMessage): {
                    typeUrl: string;
                    value: _117.MsgDelayMessage;
                };
            };
        };
        AminoConverter: {
            "/klyraprotocol.delaymsg.MsgDelayMessage": {
                aminoType: string;
                toAmino: (message: _117.MsgDelayMessage) => _117.MsgDelayMessageAmino;
                fromAmino: (object: _117.MsgDelayMessageAmino) => _117.MsgDelayMessage;
            };
        };
        MsgDelayMessage: {
            typeUrl: string;
            is(o: any): o is _117.MsgDelayMessage;
            isSDK(o: any): o is _117.MsgDelayMessageSDKType;
            isAmino(o: any): o is _117.MsgDelayMessageAmino;
            encode(message: _117.MsgDelayMessage, writer?: import("..").BinaryWriter): import("..").BinaryWriter;
            decode(input: import("..").BinaryReader | Uint8Array, length?: number): _117.MsgDelayMessage;
            fromPartial(object: Partial<_117.MsgDelayMessage>): _117.MsgDelayMessage;
            fromAmino(object: _117.MsgDelayMessageAmino): _117.MsgDelayMessage;
            toAmino(message: _117.MsgDelayMessage): _117.MsgDelayMessageAmino;
            fromAminoMsg(object: _117.MsgDelayMessageAminoMsg): _117.MsgDelayMessage;
            fromProtoMsg(message: _117.MsgDelayMessageProtoMsg): _117.MsgDelayMessage;
            toProto(message: _117.MsgDelayMessage): Uint8Array;
            toProtoMsg(message: _117.MsgDelayMessage): _117.MsgDelayMessageProtoMsg;
        };
        MsgDelayMessageResponse: {
            typeUrl: string;
            is(o: any): o is _117.MsgDelayMessageResponse;
            isSDK(o: any): o is _117.MsgDelayMessageResponseSDKType;
            isAmino(o: any): o is _117.MsgDelayMessageResponseAmino;
            encode(message: _117.MsgDelayMessageResponse, writer?: import("..").BinaryWriter): import("..").BinaryWriter;
            decode(input: import("..").BinaryReader | Uint8Array, length?: number): _117.MsgDelayMessageResponse;
            fromPartial(object: Partial<_117.MsgDelayMessageResponse>): _117.MsgDelayMessageResponse;
            fromAmino(object: _117.MsgDelayMessageResponseAmino): _117.MsgDelayMessageResponse;
            toAmino(message: _117.MsgDelayMessageResponse): _117.MsgDelayMessageResponseAmino;
            fromAminoMsg(object: _117.MsgDelayMessageResponseAminoMsg): _117.MsgDelayMessageResponse;
            fromProtoMsg(message: _117.MsgDelayMessageResponseProtoMsg): _117.MsgDelayMessageResponse;
            toProto(message: _117.MsgDelayMessageResponse): Uint8Array;
            toProtoMsg(message: _117.MsgDelayMessageResponse): _117.MsgDelayMessageResponseProtoMsg;
        };
        QueryNextDelayedMessageIdRequest: {
            typeUrl: string;
            is(o: any): o is _116.QueryNextDelayedMessageIdRequest;
            isSDK(o: any): o is _116.QueryNextDelayedMessageIdRequestSDKType;
            isAmino(o: any): o is _116.QueryNextDelayedMessageIdRequestAmino;
            encode(_: _116.QueryNextDelayedMessageIdRequest, writer?: import("..").BinaryWriter): import("..").BinaryWriter;
            decode(input: import("..").BinaryReader | Uint8Array, length?: number): _116.QueryNextDelayedMessageIdRequest;
            fromPartial(_: Partial<_116.QueryNextDelayedMessageIdRequest>): _116.QueryNextDelayedMessageIdRequest;
            fromAmino(_: _116.QueryNextDelayedMessageIdRequestAmino): _116.QueryNextDelayedMessageIdRequest;
            toAmino(_: _116.QueryNextDelayedMessageIdRequest): _116.QueryNextDelayedMessageIdRequestAmino;
            fromAminoMsg(object: _116.QueryNextDelayedMessageIdRequestAminoMsg): _116.QueryNextDelayedMessageIdRequest;
            fromProtoMsg(message: _116.QueryNextDelayedMessageIdRequestProtoMsg): _116.QueryNextDelayedMessageIdRequest;
            toProto(message: _116.QueryNextDelayedMessageIdRequest): Uint8Array;
            toProtoMsg(message: _116.QueryNextDelayedMessageIdRequest): _116.QueryNextDelayedMessageIdRequestProtoMsg;
        };
        QueryNextDelayedMessageIdResponse: {
            typeUrl: string;
            is(o: any): o is _116.QueryNextDelayedMessageIdResponse;
            isSDK(o: any): o is _116.QueryNextDelayedMessageIdResponseSDKType;
            isAmino(o: any): o is _116.QueryNextDelayedMessageIdResponseAmino;
            encode(message: _116.QueryNextDelayedMessageIdResponse, writer?: import("..").BinaryWriter): import("..").BinaryWriter;
            decode(input: import("..").BinaryReader | Uint8Array, length?: number): _116.QueryNextDelayedMessageIdResponse;
            fromPartial(object: Partial<_116.QueryNextDelayedMessageIdResponse>): _116.QueryNextDelayedMessageIdResponse;
            fromAmino(object: _116.QueryNextDelayedMessageIdResponseAmino): _116.QueryNextDelayedMessageIdResponse;
            toAmino(message: _116.QueryNextDelayedMessageIdResponse): _116.QueryNextDelayedMessageIdResponseAmino;
            fromAminoMsg(object: _116.QueryNextDelayedMessageIdResponseAminoMsg): _116.QueryNextDelayedMessageIdResponse;
            fromProtoMsg(message: _116.QueryNextDelayedMessageIdResponseProtoMsg): _116.QueryNextDelayedMessageIdResponse;
            toProto(message: _116.QueryNextDelayedMessageIdResponse): Uint8Array;
            toProtoMsg(message: _116.QueryNextDelayedMessageIdResponse): _116.QueryNextDelayedMessageIdResponseProtoMsg;
        };
        QueryMessageRequest: {
            typeUrl: string;
            is(o: any): o is _116.QueryMessageRequest;
            isSDK(o: any): o is _116.QueryMessageRequestSDKType;
            isAmino(o: any): o is _116.QueryMessageRequestAmino;
            encode(message: _116.QueryMessageRequest, writer?: import("..").BinaryWriter): import("..").BinaryWriter;
            decode(input: import("..").BinaryReader | Uint8Array, length?: number): _116.QueryMessageRequest;
            fromPartial(object: Partial<_116.QueryMessageRequest>): _116.QueryMessageRequest;
            fromAmino(object: _116.QueryMessageRequestAmino): _116.QueryMessageRequest;
            toAmino(message: _116.QueryMessageRequest): _116.QueryMessageRequestAmino;
            fromAminoMsg(object: _116.QueryMessageRequestAminoMsg): _116.QueryMessageRequest;
            fromProtoMsg(message: _116.QueryMessageRequestProtoMsg): _116.QueryMessageRequest;
            toProto(message: _116.QueryMessageRequest): Uint8Array;
            toProtoMsg(message: _116.QueryMessageRequest): _116.QueryMessageRequestProtoMsg;
        };
        QueryMessageResponse: {
            typeUrl: string;
            is(o: any): o is _116.QueryMessageResponse;
            isSDK(o: any): o is _116.QueryMessageResponseSDKType;
            isAmino(o: any): o is _116.QueryMessageResponseAmino;
            encode(message: _116.QueryMessageResponse, writer?: import("..").BinaryWriter): import("..").BinaryWriter;
            decode(input: import("..").BinaryReader | Uint8Array, length?: number): _116.QueryMessageResponse;
            fromPartial(object: Partial<_116.QueryMessageResponse>): _116.QueryMessageResponse;
            fromAmino(object: _116.QueryMessageResponseAmino): _116.QueryMessageResponse;
            toAmino(message: _116.QueryMessageResponse): _116.QueryMessageResponseAmino;
            fromAminoMsg(object: _116.QueryMessageResponseAminoMsg): _116.QueryMessageResponse;
            fromProtoMsg(message: _116.QueryMessageResponseProtoMsg): _116.QueryMessageResponse;
            toProto(message: _116.QueryMessageResponse): Uint8Array;
            toProtoMsg(message: _116.QueryMessageResponse): _116.QueryMessageResponseProtoMsg;
        };
        QueryBlockMessageIdsRequest: {
            typeUrl: string;
            is(o: any): o is _116.QueryBlockMessageIdsRequest;
            isSDK(o: any): o is _116.QueryBlockMessageIdsRequestSDKType;
            isAmino(o: any): o is _116.QueryBlockMessageIdsRequestAmino;
            encode(message: _116.QueryBlockMessageIdsRequest, writer?: import("..").BinaryWriter): import("..").BinaryWriter;
            decode(input: import("..").BinaryReader | Uint8Array, length?: number): _116.QueryBlockMessageIdsRequest;
            fromPartial(object: Partial<_116.QueryBlockMessageIdsRequest>): _116.QueryBlockMessageIdsRequest;
            fromAmino(object: _116.QueryBlockMessageIdsRequestAmino): _116.QueryBlockMessageIdsRequest;
            toAmino(message: _116.QueryBlockMessageIdsRequest): _116.QueryBlockMessageIdsRequestAmino;
            fromAminoMsg(object: _116.QueryBlockMessageIdsRequestAminoMsg): _116.QueryBlockMessageIdsRequest;
            fromProtoMsg(message: _116.QueryBlockMessageIdsRequestProtoMsg): _116.QueryBlockMessageIdsRequest;
            toProto(message: _116.QueryBlockMessageIdsRequest): Uint8Array;
            toProtoMsg(message: _116.QueryBlockMessageIdsRequest): _116.QueryBlockMessageIdsRequestProtoMsg;
        };
        QueryBlockMessageIdsResponse: {
            typeUrl: string;
            is(o: any): o is _116.QueryBlockMessageIdsResponse;
            isSDK(o: any): o is _116.QueryBlockMessageIdsResponseSDKType;
            isAmino(o: any): o is _116.QueryBlockMessageIdsResponseAmino;
            encode(message: _116.QueryBlockMessageIdsResponse, writer?: import("..").BinaryWriter): import("..").BinaryWriter;
            decode(input: import("..").BinaryReader | Uint8Array, length?: number): _116.QueryBlockMessageIdsResponse;
            fromPartial(object: Partial<_116.QueryBlockMessageIdsResponse>): _116.QueryBlockMessageIdsResponse;
            fromAmino(object: _116.QueryBlockMessageIdsResponseAmino): _116.QueryBlockMessageIdsResponse;
            toAmino(message: _116.QueryBlockMessageIdsResponse): _116.QueryBlockMessageIdsResponseAmino;
            fromAminoMsg(object: _116.QueryBlockMessageIdsResponseAminoMsg): _116.QueryBlockMessageIdsResponse;
            fromProtoMsg(message: _116.QueryBlockMessageIdsResponseProtoMsg): _116.QueryBlockMessageIdsResponse;
            toProto(message: _116.QueryBlockMessageIdsResponse): Uint8Array;
            toProtoMsg(message: _116.QueryBlockMessageIdsResponse): _116.QueryBlockMessageIdsResponseProtoMsg;
        };
        GenesisState: {
            typeUrl: string;
            is(o: any): o is _115.GenesisState;
            isSDK(o: any): o is _115.GenesisStateSDKType;
            isAmino(o: any): o is _115.GenesisStateAmino;
            encode(message: _115.GenesisState, writer?: import("..").BinaryWriter): import("..").BinaryWriter;
            decode(input: import("..").BinaryReader | Uint8Array, length?: number): _115.GenesisState;
            fromPartial(object: Partial<_115.GenesisState>): _115.GenesisState;
            fromAmino(object: _115.GenesisStateAmino): _115.GenesisState;
            toAmino(message: _115.GenesisState): _115.GenesisStateAmino;
            fromAminoMsg(object: _115.GenesisStateAminoMsg): _115.GenesisState;
            fromProtoMsg(message: _115.GenesisStateProtoMsg): _115.GenesisState;
            toProto(message: _115.GenesisState): Uint8Array;
            toProtoMsg(message: _115.GenesisState): _115.GenesisStateProtoMsg;
        };
        DelayedMessage: {
            typeUrl: string;
            is(o: any): o is _114.DelayedMessage;
            isSDK(o: any): o is _114.DelayedMessageSDKType;
            isAmino(o: any): o is _114.DelayedMessageAmino;
            encode(message: _114.DelayedMessage, writer?: import("..").BinaryWriter): import("..").BinaryWriter;
            decode(input: import("..").BinaryReader | Uint8Array, length?: number): _114.DelayedMessage;
            fromPartial(object: Partial<_114.DelayedMessage>): _114.DelayedMessage;
            fromAmino(object: _114.DelayedMessageAmino): _114.DelayedMessage;
            toAmino(message: _114.DelayedMessage): _114.DelayedMessageAmino;
            fromAminoMsg(object: _114.DelayedMessageAminoMsg): _114.DelayedMessage;
            fromProtoMsg(message: _114.DelayedMessageProtoMsg): _114.DelayedMessage;
            toProto(message: _114.DelayedMessage): Uint8Array;
            toProtoMsg(message: _114.DelayedMessage): _114.DelayedMessageProtoMsg;
        };
        BlockMessageIds: {
            typeUrl: string;
            is(o: any): o is _113.BlockMessageIds;
            isSDK(o: any): o is _113.BlockMessageIdsSDKType;
            isAmino(o: any): o is _113.BlockMessageIdsAmino;
            encode(message: _113.BlockMessageIds, writer?: import("..").BinaryWriter): import("..").BinaryWriter;
            decode(input: import("..").BinaryReader | Uint8Array, length?: number): _113.BlockMessageIds;
            fromPartial(object: Partial<_113.BlockMessageIds>): _113.BlockMessageIds;
            fromAmino(object: _113.BlockMessageIdsAmino): _113.BlockMessageIds;
            toAmino(message: _113.BlockMessageIds): _113.BlockMessageIdsAmino;
            fromAminoMsg(object: _113.BlockMessageIdsAminoMsg): _113.BlockMessageIds;
            fromProtoMsg(message: _113.BlockMessageIdsProtoMsg): _113.BlockMessageIds;
            toProto(message: _113.BlockMessageIds): Uint8Array;
            toProtoMsg(message: _113.BlockMessageIds): _113.BlockMessageIdsProtoMsg;
        };
    };
    const epochs: {
        QueryClientImpl: typeof _276.QueryClientImpl;
        createRpcQueryExtension: (base: import("@cosmjs/stargate").QueryClient) => {
            epochInfo(request: _120.QueryGetEpochInfoRequest): Promise<_120.QueryEpochInfoResponse>;
            epochInfoAll(request?: _120.QueryAllEpochInfoRequest): Promise<_120.QueryEpochInfoAllResponse>;
        };
        LCDQueryClient: typeof _265.LCDQueryClient;
        QueryGetEpochInfoRequest: {
            typeUrl: string;
            is(o: any): o is _120.QueryGetEpochInfoRequest;
            isSDK(o: any): o is _120.QueryGetEpochInfoRequestSDKType;
            isAmino(o: any): o is _120.QueryGetEpochInfoRequestAmino;
            encode(message: _120.QueryGetEpochInfoRequest, writer?: import("..").BinaryWriter): import("..").BinaryWriter;
            decode(input: import("..").BinaryReader | Uint8Array, length?: number): _120.QueryGetEpochInfoRequest;
            fromPartial(object: Partial<_120.QueryGetEpochInfoRequest>): _120.QueryGetEpochInfoRequest;
            fromAmino(object: _120.QueryGetEpochInfoRequestAmino): _120.QueryGetEpochInfoRequest;
            toAmino(message: _120.QueryGetEpochInfoRequest): _120.QueryGetEpochInfoRequestAmino;
            fromAminoMsg(object: _120.QueryGetEpochInfoRequestAminoMsg): _120.QueryGetEpochInfoRequest;
            fromProtoMsg(message: _120.QueryGetEpochInfoRequestProtoMsg): _120.QueryGetEpochInfoRequest;
            toProto(message: _120.QueryGetEpochInfoRequest): Uint8Array;
            toProtoMsg(message: _120.QueryGetEpochInfoRequest): _120.QueryGetEpochInfoRequestProtoMsg;
        };
        QueryEpochInfoResponse: {
            typeUrl: string;
            is(o: any): o is _120.QueryEpochInfoResponse;
            isSDK(o: any): o is _120.QueryEpochInfoResponseSDKType;
            isAmino(o: any): o is _120.QueryEpochInfoResponseAmino;
            encode(message: _120.QueryEpochInfoResponse, writer?: import("..").BinaryWriter): import("..").BinaryWriter;
            decode(input: import("..").BinaryReader | Uint8Array, length?: number): _120.QueryEpochInfoResponse;
            fromPartial(object: Partial<_120.QueryEpochInfoResponse>): _120.QueryEpochInfoResponse;
            fromAmino(object: _120.QueryEpochInfoResponseAmino): _120.QueryEpochInfoResponse;
            toAmino(message: _120.QueryEpochInfoResponse): _120.QueryEpochInfoResponseAmino;
            fromAminoMsg(object: _120.QueryEpochInfoResponseAminoMsg): _120.QueryEpochInfoResponse;
            fromProtoMsg(message: _120.QueryEpochInfoResponseProtoMsg): _120.QueryEpochInfoResponse;
            toProto(message: _120.QueryEpochInfoResponse): Uint8Array;
            toProtoMsg(message: _120.QueryEpochInfoResponse): _120.QueryEpochInfoResponseProtoMsg;
        };
        QueryAllEpochInfoRequest: {
            typeUrl: string;
            is(o: any): o is _120.QueryAllEpochInfoRequest;
            isSDK(o: any): o is _120.QueryAllEpochInfoRequestSDKType;
            isAmino(o: any): o is _120.QueryAllEpochInfoRequestAmino;
            encode(message: _120.QueryAllEpochInfoRequest, writer?: import("..").BinaryWriter): import("..").BinaryWriter;
            decode(input: import("..").BinaryReader | Uint8Array, length?: number): _120.QueryAllEpochInfoRequest;
            fromPartial(object: Partial<_120.QueryAllEpochInfoRequest>): _120.QueryAllEpochInfoRequest;
            fromAmino(object: _120.QueryAllEpochInfoRequestAmino): _120.QueryAllEpochInfoRequest;
            toAmino(message: _120.QueryAllEpochInfoRequest): _120.QueryAllEpochInfoRequestAmino;
            fromAminoMsg(object: _120.QueryAllEpochInfoRequestAminoMsg): _120.QueryAllEpochInfoRequest;
            fromProtoMsg(message: _120.QueryAllEpochInfoRequestProtoMsg): _120.QueryAllEpochInfoRequest;
            toProto(message: _120.QueryAllEpochInfoRequest): Uint8Array;
            toProtoMsg(message: _120.QueryAllEpochInfoRequest): _120.QueryAllEpochInfoRequestProtoMsg;
        };
        QueryEpochInfoAllResponse: {
            typeUrl: string;
            is(o: any): o is _120.QueryEpochInfoAllResponse;
            isSDK(o: any): o is _120.QueryEpochInfoAllResponseSDKType;
            isAmino(o: any): o is _120.QueryEpochInfoAllResponseAmino;
            encode(message: _120.QueryEpochInfoAllResponse, writer?: import("..").BinaryWriter): import("..").BinaryWriter;
            decode(input: import("..").BinaryReader | Uint8Array, length?: number): _120.QueryEpochInfoAllResponse;
            fromPartial(object: Partial<_120.QueryEpochInfoAllResponse>): _120.QueryEpochInfoAllResponse;
            fromAmino(object: _120.QueryEpochInfoAllResponseAmino): _120.QueryEpochInfoAllResponse;
            toAmino(message: _120.QueryEpochInfoAllResponse): _120.QueryEpochInfoAllResponseAmino;
            fromAminoMsg(object: _120.QueryEpochInfoAllResponseAminoMsg): _120.QueryEpochInfoAllResponse;
            fromProtoMsg(message: _120.QueryEpochInfoAllResponseProtoMsg): _120.QueryEpochInfoAllResponse;
            toProto(message: _120.QueryEpochInfoAllResponse): Uint8Array;
            toProtoMsg(message: _120.QueryEpochInfoAllResponse): _120.QueryEpochInfoAllResponseProtoMsg;
        };
        GenesisState: {
            typeUrl: string;
            is(o: any): o is _119.GenesisState;
            isSDK(o: any): o is _119.GenesisStateSDKType;
            isAmino(o: any): o is _119.GenesisStateAmino;
            encode(message: _119.GenesisState, writer?: import("..").BinaryWriter): import("..").BinaryWriter;
            decode(input: import("..").BinaryReader | Uint8Array, length?: number): _119.GenesisState;
            fromPartial(object: Partial<_119.GenesisState>): _119.GenesisState;
            fromAmino(object: _119.GenesisStateAmino): _119.GenesisState;
            toAmino(message: _119.GenesisState): _119.GenesisStateAmino;
            fromAminoMsg(object: _119.GenesisStateAminoMsg): _119.GenesisState;
            fromProtoMsg(message: _119.GenesisStateProtoMsg): _119.GenesisState;
            toProto(message: _119.GenesisState): Uint8Array;
            toProtoMsg(message: _119.GenesisState): _119.GenesisStateProtoMsg;
        };
        EpochInfo: {
            typeUrl: string;
            is(o: any): o is _118.EpochInfo;
            isSDK(o: any): o is _118.EpochInfoSDKType;
            isAmino(o: any): o is _118.EpochInfoAmino;
            encode(message: _118.EpochInfo, writer?: import("..").BinaryWriter): import("..").BinaryWriter;
            decode(input: import("..").BinaryReader | Uint8Array, length?: number): _118.EpochInfo;
            fromPartial(object: Partial<_118.EpochInfo>): _118.EpochInfo;
            fromAmino(object: _118.EpochInfoAmino): _118.EpochInfo;
            toAmino(message: _118.EpochInfo): _118.EpochInfoAmino;
            fromAminoMsg(object: _118.EpochInfoAminoMsg): _118.EpochInfo;
            fromProtoMsg(message: _118.EpochInfoProtoMsg): _118.EpochInfo;
            toProto(message: _118.EpochInfo): Uint8Array;
            toProtoMsg(message: _118.EpochInfo): _118.EpochInfoProtoMsg;
        };
    };
    const feetiers: {
        MsgClientImpl: typeof _288.MsgClientImpl;
        createClientImpl: (rpc: import("../helpers").Rpc) => _288.MsgClientImpl;
        QueryClientImpl: typeof _277.QueryClientImpl;
        createRpcQueryExtension: (base: import("@cosmjs/stargate").QueryClient) => {
            perpetualFeeParams(request?: _123.QueryPerpetualFeeParamsRequest): Promise<_123.QueryPerpetualFeeParamsResponse>;
            userFeeTier(request: _123.QueryUserFeeTierRequest): Promise<_123.QueryUserFeeTierResponse>;
        };
        LCDQueryClient: typeof _266.LCDQueryClient;
        registry: ReadonlyArray<[string, import("@cosmjs/proto-signing").GeneratedType]>;
        load: (protoRegistry: import("@cosmjs/proto-signing").Registry) => void;
        MessageComposer: {
            encoded: {
                updatePerpetualFeeParams(value: _124.MsgUpdatePerpetualFeeParams): {
                    typeUrl: string;
                    value: Uint8Array<ArrayBufferLike>;
                };
            };
            withTypeUrl: {
                updatePerpetualFeeParams(value: _124.MsgUpdatePerpetualFeeParams): {
                    typeUrl: string;
                    value: _124.MsgUpdatePerpetualFeeParams;
                };
            };
            fromPartial: {
                updatePerpetualFeeParams(value: _124.MsgUpdatePerpetualFeeParams): {
                    typeUrl: string;
                    value: _124.MsgUpdatePerpetualFeeParams;
                };
            };
        };
        AminoConverter: {
            "/klyraprotocol.feetiers.MsgUpdatePerpetualFeeParams": {
                aminoType: string;
                toAmino: (message: _124.MsgUpdatePerpetualFeeParams) => _124.MsgUpdatePerpetualFeeParamsAmino;
                fromAmino: (object: _124.MsgUpdatePerpetualFeeParamsAmino) => _124.MsgUpdatePerpetualFeeParams;
            };
        };
        MsgUpdatePerpetualFeeParams: {
            typeUrl: string;
            is(o: any): o is _124.MsgUpdatePerpetualFeeParams;
            isSDK(o: any): o is _124.MsgUpdatePerpetualFeeParamsSDKType;
            isAmino(o: any): o is _124.MsgUpdatePerpetualFeeParamsAmino;
            encode(message: _124.MsgUpdatePerpetualFeeParams, writer?: import("..").BinaryWriter): import("..").BinaryWriter;
            decode(input: import("..").BinaryReader | Uint8Array, length?: number): _124.MsgUpdatePerpetualFeeParams;
            fromPartial(object: Partial<_124.MsgUpdatePerpetualFeeParams>): _124.MsgUpdatePerpetualFeeParams;
            fromAmino(object: _124.MsgUpdatePerpetualFeeParamsAmino): _124.MsgUpdatePerpetualFeeParams;
            toAmino(message: _124.MsgUpdatePerpetualFeeParams): _124.MsgUpdatePerpetualFeeParamsAmino;
            fromAminoMsg(object: _124.MsgUpdatePerpetualFeeParamsAminoMsg): _124.MsgUpdatePerpetualFeeParams;
            fromProtoMsg(message: _124.MsgUpdatePerpetualFeeParamsProtoMsg): _124.MsgUpdatePerpetualFeeParams;
            toProto(message: _124.MsgUpdatePerpetualFeeParams): Uint8Array;
            toProtoMsg(message: _124.MsgUpdatePerpetualFeeParams): _124.MsgUpdatePerpetualFeeParamsProtoMsg;
        };
        MsgUpdatePerpetualFeeParamsResponse: {
            typeUrl: string;
            is(o: any): o is _124.MsgUpdatePerpetualFeeParamsResponse;
            isSDK(o: any): o is _124.MsgUpdatePerpetualFeeParamsResponseSDKType;
            isAmino(o: any): o is _124.MsgUpdatePerpetualFeeParamsResponseAmino;
            encode(_: _124.MsgUpdatePerpetualFeeParamsResponse, writer?: import("..").BinaryWriter): import("..").BinaryWriter;
            decode(input: import("..").BinaryReader | Uint8Array, length?: number): _124.MsgUpdatePerpetualFeeParamsResponse;
            fromPartial(_: Partial<_124.MsgUpdatePerpetualFeeParamsResponse>): _124.MsgUpdatePerpetualFeeParamsResponse;
            fromAmino(_: _124.MsgUpdatePerpetualFeeParamsResponseAmino): _124.MsgUpdatePerpetualFeeParamsResponse;
            toAmino(_: _124.MsgUpdatePerpetualFeeParamsResponse): _124.MsgUpdatePerpetualFeeParamsResponseAmino;
            fromAminoMsg(object: _124.MsgUpdatePerpetualFeeParamsResponseAminoMsg): _124.MsgUpdatePerpetualFeeParamsResponse;
            fromProtoMsg(message: _124.MsgUpdatePerpetualFeeParamsResponseProtoMsg): _124.MsgUpdatePerpetualFeeParamsResponse;
            toProto(message: _124.MsgUpdatePerpetualFeeParamsResponse): Uint8Array;
            toProtoMsg(message: _124.MsgUpdatePerpetualFeeParamsResponse): _124.MsgUpdatePerpetualFeeParamsResponseProtoMsg;
        };
        QueryPerpetualFeeParamsRequest: {
            typeUrl: string;
            is(o: any): o is _123.QueryPerpetualFeeParamsRequest;
            isSDK(o: any): o is _123.QueryPerpetualFeeParamsRequestSDKType;
            isAmino(o: any): o is _123.QueryPerpetualFeeParamsRequestAmino;
            encode(_: _123.QueryPerpetualFeeParamsRequest, writer?: import("..").BinaryWriter): import("..").BinaryWriter;
            decode(input: import("..").BinaryReader | Uint8Array, length?: number): _123.QueryPerpetualFeeParamsRequest;
            fromPartial(_: Partial<_123.QueryPerpetualFeeParamsRequest>): _123.QueryPerpetualFeeParamsRequest;
            fromAmino(_: _123.QueryPerpetualFeeParamsRequestAmino): _123.QueryPerpetualFeeParamsRequest;
            toAmino(_: _123.QueryPerpetualFeeParamsRequest): _123.QueryPerpetualFeeParamsRequestAmino;
            fromAminoMsg(object: _123.QueryPerpetualFeeParamsRequestAminoMsg): _123.QueryPerpetualFeeParamsRequest;
            fromProtoMsg(message: _123.QueryPerpetualFeeParamsRequestProtoMsg): _123.QueryPerpetualFeeParamsRequest;
            toProto(message: _123.QueryPerpetualFeeParamsRequest): Uint8Array;
            toProtoMsg(message: _123.QueryPerpetualFeeParamsRequest): _123.QueryPerpetualFeeParamsRequestProtoMsg;
        };
        QueryPerpetualFeeParamsResponse: {
            typeUrl: string;
            is(o: any): o is _123.QueryPerpetualFeeParamsResponse;
            isSDK(o: any): o is _123.QueryPerpetualFeeParamsResponseSDKType;
            isAmino(o: any): o is _123.QueryPerpetualFeeParamsResponseAmino;
            encode(message: _123.QueryPerpetualFeeParamsResponse, writer?: import("..").BinaryWriter): import("..").BinaryWriter;
            decode(input: import("..").BinaryReader | Uint8Array, length?: number): _123.QueryPerpetualFeeParamsResponse;
            fromPartial(object: Partial<_123.QueryPerpetualFeeParamsResponse>): _123.QueryPerpetualFeeParamsResponse;
            fromAmino(object: _123.QueryPerpetualFeeParamsResponseAmino): _123.QueryPerpetualFeeParamsResponse;
            toAmino(message: _123.QueryPerpetualFeeParamsResponse): _123.QueryPerpetualFeeParamsResponseAmino;
            fromAminoMsg(object: _123.QueryPerpetualFeeParamsResponseAminoMsg): _123.QueryPerpetualFeeParamsResponse;
            fromProtoMsg(message: _123.QueryPerpetualFeeParamsResponseProtoMsg): _123.QueryPerpetualFeeParamsResponse;
            toProto(message: _123.QueryPerpetualFeeParamsResponse): Uint8Array;
            toProtoMsg(message: _123.QueryPerpetualFeeParamsResponse): _123.QueryPerpetualFeeParamsResponseProtoMsg;
        };
        QueryUserFeeTierRequest: {
            typeUrl: string;
            is(o: any): o is _123.QueryUserFeeTierRequest;
            isSDK(o: any): o is _123.QueryUserFeeTierRequestSDKType;
            isAmino(o: any): o is _123.QueryUserFeeTierRequestAmino;
            encode(message: _123.QueryUserFeeTierRequest, writer?: import("..").BinaryWriter): import("..").BinaryWriter;
            decode(input: import("..").BinaryReader | Uint8Array, length?: number): _123.QueryUserFeeTierRequest;
            fromPartial(object: Partial<_123.QueryUserFeeTierRequest>): _123.QueryUserFeeTierRequest;
            fromAmino(object: _123.QueryUserFeeTierRequestAmino): _123.QueryUserFeeTierRequest;
            toAmino(message: _123.QueryUserFeeTierRequest): _123.QueryUserFeeTierRequestAmino;
            fromAminoMsg(object: _123.QueryUserFeeTierRequestAminoMsg): _123.QueryUserFeeTierRequest;
            fromProtoMsg(message: _123.QueryUserFeeTierRequestProtoMsg): _123.QueryUserFeeTierRequest;
            toProto(message: _123.QueryUserFeeTierRequest): Uint8Array;
            toProtoMsg(message: _123.QueryUserFeeTierRequest): _123.QueryUserFeeTierRequestProtoMsg;
        };
        QueryUserFeeTierResponse: {
            typeUrl: string;
            is(o: any): o is _123.QueryUserFeeTierResponse;
            isSDK(o: any): o is _123.QueryUserFeeTierResponseSDKType;
            isAmino(o: any): o is _123.QueryUserFeeTierResponseAmino;
            encode(message: _123.QueryUserFeeTierResponse, writer?: import("..").BinaryWriter): import("..").BinaryWriter;
            decode(input: import("..").BinaryReader | Uint8Array, length?: number): _123.QueryUserFeeTierResponse;
            fromPartial(object: Partial<_123.QueryUserFeeTierResponse>): _123.QueryUserFeeTierResponse;
            fromAmino(object: _123.QueryUserFeeTierResponseAmino): _123.QueryUserFeeTierResponse;
            toAmino(message: _123.QueryUserFeeTierResponse): _123.QueryUserFeeTierResponseAmino;
            fromAminoMsg(object: _123.QueryUserFeeTierResponseAminoMsg): _123.QueryUserFeeTierResponse;
            fromProtoMsg(message: _123.QueryUserFeeTierResponseProtoMsg): _123.QueryUserFeeTierResponse;
            toProto(message: _123.QueryUserFeeTierResponse): Uint8Array;
            toProtoMsg(message: _123.QueryUserFeeTierResponse): _123.QueryUserFeeTierResponseProtoMsg;
        };
        PerpetualFeeParams: {
            typeUrl: string;
            is(o: any): o is _122.PerpetualFeeParams;
            isSDK(o: any): o is _122.PerpetualFeeParamsSDKType;
            isAmino(o: any): o is _122.PerpetualFeeParamsAmino;
            encode(message: _122.PerpetualFeeParams, writer?: import("..").BinaryWriter): import("..").BinaryWriter;
            decode(input: import("..").BinaryReader | Uint8Array, length?: number): _122.PerpetualFeeParams;
            fromPartial(object: Partial<_122.PerpetualFeeParams>): _122.PerpetualFeeParams;
            fromAmino(object: _122.PerpetualFeeParamsAmino): _122.PerpetualFeeParams;
            toAmino(message: _122.PerpetualFeeParams): _122.PerpetualFeeParamsAmino;
            fromAminoMsg(object: _122.PerpetualFeeParamsAminoMsg): _122.PerpetualFeeParams;
            fromProtoMsg(message: _122.PerpetualFeeParamsProtoMsg): _122.PerpetualFeeParams;
            toProto(message: _122.PerpetualFeeParams): Uint8Array;
            toProtoMsg(message: _122.PerpetualFeeParams): _122.PerpetualFeeParamsProtoMsg;
        };
        PerpetualFeeTier: {
            typeUrl: string;
            is(o: any): o is _122.PerpetualFeeTier;
            isSDK(o: any): o is _122.PerpetualFeeTierSDKType;
            isAmino(o: any): o is _122.PerpetualFeeTierAmino;
            encode(message: _122.PerpetualFeeTier, writer?: import("..").BinaryWriter): import("..").BinaryWriter;
            decode(input: import("..").BinaryReader | Uint8Array, length?: number): _122.PerpetualFeeTier;
            fromPartial(object: Partial<_122.PerpetualFeeTier>): _122.PerpetualFeeTier;
            fromAmino(object: _122.PerpetualFeeTierAmino): _122.PerpetualFeeTier;
            toAmino(message: _122.PerpetualFeeTier): _122.PerpetualFeeTierAmino;
            fromAminoMsg(object: _122.PerpetualFeeTierAminoMsg): _122.PerpetualFeeTier;
            fromProtoMsg(message: _122.PerpetualFeeTierProtoMsg): _122.PerpetualFeeTier;
            toProto(message: _122.PerpetualFeeTier): Uint8Array;
            toProtoMsg(message: _122.PerpetualFeeTier): _122.PerpetualFeeTierProtoMsg;
        };
        GenesisState: {
            typeUrl: string;
            is(o: any): o is _121.GenesisState;
            isSDK(o: any): o is _121.GenesisStateSDKType;
            isAmino(o: any): o is _121.GenesisStateAmino;
            encode(message: _121.GenesisState, writer?: import("..").BinaryWriter): import("..").BinaryWriter;
            decode(input: import("..").BinaryReader | Uint8Array, length?: number): _121.GenesisState;
            fromPartial(object: Partial<_121.GenesisState>): _121.GenesisState;
            fromAmino(object: _121.GenesisStateAmino): _121.GenesisState;
            toAmino(message: _121.GenesisState): _121.GenesisStateAmino;
            fromAminoMsg(object: _121.GenesisStateAminoMsg): _121.GenesisState;
            fromProtoMsg(message: _121.GenesisStateProtoMsg): _121.GenesisState;
            toProto(message: _121.GenesisState): Uint8Array;
            toProtoMsg(message: _121.GenesisState): _121.GenesisStateProtoMsg;
        };
    };
    const govplus: {
        MsgClientImpl: typeof _289.MsgClientImpl;
        createClientImpl: (rpc: import("../helpers").Rpc) => _289.MsgClientImpl;
        QueryClientImpl: typeof _278.QueryClientImpl;
        createRpcQueryExtension: (base: import("@cosmjs/stargate").QueryClient) => {};
        registry: ReadonlyArray<[string, import("@cosmjs/proto-signing").GeneratedType]>;
        load: (protoRegistry: import("@cosmjs/proto-signing").Registry) => void;
        MessageComposer: {
            encoded: {
                slashValidator(value: _127.MsgSlashValidator): {
                    typeUrl: string;
                    value: Uint8Array<ArrayBufferLike>;
                };
            };
            withTypeUrl: {
                slashValidator(value: _127.MsgSlashValidator): {
                    typeUrl: string;
                    value: _127.MsgSlashValidator;
                };
            };
            fromPartial: {
                slashValidator(value: _127.MsgSlashValidator): {
                    typeUrl: string;
                    value: _127.MsgSlashValidator;
                };
            };
        };
        AminoConverter: {
            "/klyraprotocol.govplus.MsgSlashValidator": {
                aminoType: string;
                toAmino: (message: _127.MsgSlashValidator) => _127.MsgSlashValidatorAmino;
                fromAmino: (object: _127.MsgSlashValidatorAmino) => _127.MsgSlashValidator;
            };
        };
        MsgSlashValidator: {
            typeUrl: string;
            is(o: any): o is _127.MsgSlashValidator;
            isSDK(o: any): o is _127.MsgSlashValidatorSDKType;
            isAmino(o: any): o is _127.MsgSlashValidatorAmino;
            encode(message: _127.MsgSlashValidator, writer?: import("..").BinaryWriter): import("..").BinaryWriter;
            decode(input: import("..").BinaryReader | Uint8Array, length?: number): _127.MsgSlashValidator;
            fromPartial(object: Partial<_127.MsgSlashValidator>): _127.MsgSlashValidator;
            fromAmino(object: _127.MsgSlashValidatorAmino): _127.MsgSlashValidator;
            toAmino(message: _127.MsgSlashValidator): _127.MsgSlashValidatorAmino;
            fromAminoMsg(object: _127.MsgSlashValidatorAminoMsg): _127.MsgSlashValidator;
            fromProtoMsg(message: _127.MsgSlashValidatorProtoMsg): _127.MsgSlashValidator;
            toProto(message: _127.MsgSlashValidator): Uint8Array;
            toProtoMsg(message: _127.MsgSlashValidator): _127.MsgSlashValidatorProtoMsg;
        };
        MsgSlashValidatorResponse: {
            typeUrl: string;
            is(o: any): o is _127.MsgSlashValidatorResponse;
            isSDK(o: any): o is _127.MsgSlashValidatorResponseSDKType;
            isAmino(o: any): o is _127.MsgSlashValidatorResponseAmino;
            encode(_: _127.MsgSlashValidatorResponse, writer?: import("..").BinaryWriter): import("..").BinaryWriter;
            decode(input: import("..").BinaryReader | Uint8Array, length?: number): _127.MsgSlashValidatorResponse;
            fromPartial(_: Partial<_127.MsgSlashValidatorResponse>): _127.MsgSlashValidatorResponse;
            fromAmino(_: _127.MsgSlashValidatorResponseAmino): _127.MsgSlashValidatorResponse;
            toAmino(_: _127.MsgSlashValidatorResponse): _127.MsgSlashValidatorResponseAmino;
            fromAminoMsg(object: _127.MsgSlashValidatorResponseAminoMsg): _127.MsgSlashValidatorResponse;
            fromProtoMsg(message: _127.MsgSlashValidatorResponseProtoMsg): _127.MsgSlashValidatorResponse;
            toProto(message: _127.MsgSlashValidatorResponse): Uint8Array;
            toProtoMsg(message: _127.MsgSlashValidatorResponse): _127.MsgSlashValidatorResponseProtoMsg;
        };
        GenesisState: {
            typeUrl: string;
            is(o: any): o is _125.GenesisState;
            isSDK(o: any): o is _125.GenesisStateSDKType;
            isAmino(o: any): o is _125.GenesisStateAmino;
            encode(_: _125.GenesisState, writer?: import("..").BinaryWriter): import("..").BinaryWriter;
            decode(input: import("..").BinaryReader | Uint8Array, length?: number): _125.GenesisState;
            fromPartial(_: Partial<_125.GenesisState>): _125.GenesisState;
            fromAmino(_: _125.GenesisStateAmino): _125.GenesisState;
            toAmino(_: _125.GenesisState): _125.GenesisStateAmino;
            fromAminoMsg(object: _125.GenesisStateAminoMsg): _125.GenesisState;
            fromProtoMsg(message: _125.GenesisStateProtoMsg): _125.GenesisState;
            toProto(message: _125.GenesisState): Uint8Array;
            toProtoMsg(message: _125.GenesisState): _125.GenesisStateProtoMsg;
        };
    };
    namespace indexer {
        const events: {
            fundingEventV1_TypeFromJSON(object: any): _128.FundingEventV1_Type;
            fundingEventV1_TypeToJSON(object: _128.FundingEventV1_Type): string;
            FundingEventV1_Type: typeof _128.FundingEventV1_Type;
            FundingEventV1_TypeSDKType: typeof _128.FundingEventV1_Type;
            FundingEventV1_TypeAmino: typeof _128.FundingEventV1_Type;
            FundingUpdateV1: {
                typeUrl: string;
                is(o: any): o is _128.FundingUpdateV1;
                isSDK(o: any): o is _128.FundingUpdateV1SDKType;
                isAmino(o: any): o is _128.FundingUpdateV1Amino;
                encode(message: _128.FundingUpdateV1, writer?: import("..").BinaryWriter): import("..").BinaryWriter;
                decode(input: import("..").BinaryReader | Uint8Array, length?: number): _128.FundingUpdateV1;
                fromPartial(object: Partial<_128.FundingUpdateV1>): _128.FundingUpdateV1;
                fromAmino(object: _128.FundingUpdateV1Amino): _128.FundingUpdateV1;
                toAmino(message: _128.FundingUpdateV1): _128.FundingUpdateV1Amino;
                fromAminoMsg(object: _128.FundingUpdateV1AminoMsg): _128.FundingUpdateV1;
                fromProtoMsg(message: _128.FundingUpdateV1ProtoMsg): _128.FundingUpdateV1;
                toProto(message: _128.FundingUpdateV1): Uint8Array;
                toProtoMsg(message: _128.FundingUpdateV1): _128.FundingUpdateV1ProtoMsg;
            };
            FundingEventV1: {
                typeUrl: string;
                is(o: any): o is _128.FundingEventV1;
                isSDK(o: any): o is _128.FundingEventV1SDKType;
                isAmino(o: any): o is _128.FundingEventV1Amino;
                encode(message: _128.FundingEventV1, writer?: import("..").BinaryWriter): import("..").BinaryWriter;
                decode(input: import("..").BinaryReader | Uint8Array, length?: number): _128.FundingEventV1;
                fromPartial(object: Partial<_128.FundingEventV1>): _128.FundingEventV1;
                fromAmino(object: _128.FundingEventV1Amino): _128.FundingEventV1;
                toAmino(message: _128.FundingEventV1): _128.FundingEventV1Amino;
                fromAminoMsg(object: _128.FundingEventV1AminoMsg): _128.FundingEventV1;
                fromProtoMsg(message: _128.FundingEventV1ProtoMsg): _128.FundingEventV1;
                toProto(message: _128.FundingEventV1): Uint8Array;
                toProtoMsg(message: _128.FundingEventV1): _128.FundingEventV1ProtoMsg;
            };
            MarketEventV1: {
                typeUrl: string;
                is(o: any): o is _128.MarketEventV1;
                isSDK(o: any): o is _128.MarketEventV1SDKType;
                isAmino(o: any): o is _128.MarketEventV1Amino;
                encode(message: _128.MarketEventV1, writer?: import("..").BinaryWriter): import("..").BinaryWriter;
                decode(input: import("..").BinaryReader | Uint8Array, length?: number): _128.MarketEventV1;
                fromPartial(object: Partial<_128.MarketEventV1>): _128.MarketEventV1;
                fromAmino(object: _128.MarketEventV1Amino): _128.MarketEventV1;
                toAmino(message: _128.MarketEventV1): _128.MarketEventV1Amino;
                fromAminoMsg(object: _128.MarketEventV1AminoMsg): _128.MarketEventV1;
                fromProtoMsg(message: _128.MarketEventV1ProtoMsg): _128.MarketEventV1;
                toProto(message: _128.MarketEventV1): Uint8Array;
                toProtoMsg(message: _128.MarketEventV1): _128.MarketEventV1ProtoMsg;
            };
            MarketPriceUpdateEventV1: {
                typeUrl: string;
                is(o: any): o is _128.MarketPriceUpdateEventV1;
                isSDK(o: any): o is _128.MarketPriceUpdateEventV1SDKType;
                isAmino(o: any): o is _128.MarketPriceUpdateEventV1Amino;
                encode(message: _128.MarketPriceUpdateEventV1, writer?: import("..").BinaryWriter): import("..").BinaryWriter;
                decode(input: import("..").BinaryReader | Uint8Array, length?: number): _128.MarketPriceUpdateEventV1;
                fromPartial(object: Partial<_128.MarketPriceUpdateEventV1>): _128.MarketPriceUpdateEventV1;
                fromAmino(object: _128.MarketPriceUpdateEventV1Amino): _128.MarketPriceUpdateEventV1;
                toAmino(message: _128.MarketPriceUpdateEventV1): _128.MarketPriceUpdateEventV1Amino;
                fromAminoMsg(object: _128.MarketPriceUpdateEventV1AminoMsg): _128.MarketPriceUpdateEventV1;
                fromProtoMsg(message: _128.MarketPriceUpdateEventV1ProtoMsg): _128.MarketPriceUpdateEventV1;
                toProto(message: _128.MarketPriceUpdateEventV1): Uint8Array;
                toProtoMsg(message: _128.MarketPriceUpdateEventV1): _128.MarketPriceUpdateEventV1ProtoMsg;
            };
            MarketBaseEventV1: {
                typeUrl: string;
                is(o: any): o is _128.MarketBaseEventV1;
                isSDK(o: any): o is _128.MarketBaseEventV1SDKType;
                isAmino(o: any): o is _128.MarketBaseEventV1Amino;
                encode(message: _128.MarketBaseEventV1, writer?: import("..").BinaryWriter): import("..").BinaryWriter;
                decode(input: import("..").BinaryReader | Uint8Array, length?: number): _128.MarketBaseEventV1;
                fromPartial(object: Partial<_128.MarketBaseEventV1>): _128.MarketBaseEventV1;
                fromAmino(object: _128.MarketBaseEventV1Amino): _128.MarketBaseEventV1;
                toAmino(message: _128.MarketBaseEventV1): _128.MarketBaseEventV1Amino;
                fromAminoMsg(object: _128.MarketBaseEventV1AminoMsg): _128.MarketBaseEventV1;
                fromProtoMsg(message: _128.MarketBaseEventV1ProtoMsg): _128.MarketBaseEventV1;
                toProto(message: _128.MarketBaseEventV1): Uint8Array;
                toProtoMsg(message: _128.MarketBaseEventV1): _128.MarketBaseEventV1ProtoMsg;
            };
            MarketCreateEventV1: {
                typeUrl: string;
                is(o: any): o is _128.MarketCreateEventV1;
                isSDK(o: any): o is _128.MarketCreateEventV1SDKType;
                isAmino(o: any): o is _128.MarketCreateEventV1Amino;
                encode(message: _128.MarketCreateEventV1, writer?: import("..").BinaryWriter): import("..").BinaryWriter;
                decode(input: import("..").BinaryReader | Uint8Array, length?: number): _128.MarketCreateEventV1;
                fromPartial(object: Partial<_128.MarketCreateEventV1>): _128.MarketCreateEventV1;
                fromAmino(object: _128.MarketCreateEventV1Amino): _128.MarketCreateEventV1;
                toAmino(message: _128.MarketCreateEventV1): _128.MarketCreateEventV1Amino;
                fromAminoMsg(object: _128.MarketCreateEventV1AminoMsg): _128.MarketCreateEventV1;
                fromProtoMsg(message: _128.MarketCreateEventV1ProtoMsg): _128.MarketCreateEventV1;
                toProto(message: _128.MarketCreateEventV1): Uint8Array;
                toProtoMsg(message: _128.MarketCreateEventV1): _128.MarketCreateEventV1ProtoMsg;
            };
            MarketModifyEventV1: {
                typeUrl: string;
                is(o: any): o is _128.MarketModifyEventV1;
                isSDK(o: any): o is _128.MarketModifyEventV1SDKType;
                isAmino(o: any): o is _128.MarketModifyEventV1Amino;
                encode(message: _128.MarketModifyEventV1, writer?: import("..").BinaryWriter): import("..").BinaryWriter;
                decode(input: import("..").BinaryReader | Uint8Array, length?: number): _128.MarketModifyEventV1;
                fromPartial(object: Partial<_128.MarketModifyEventV1>): _128.MarketModifyEventV1;
                fromAmino(object: _128.MarketModifyEventV1Amino): _128.MarketModifyEventV1;
                toAmino(message: _128.MarketModifyEventV1): _128.MarketModifyEventV1Amino;
                fromAminoMsg(object: _128.MarketModifyEventV1AminoMsg): _128.MarketModifyEventV1;
                fromProtoMsg(message: _128.MarketModifyEventV1ProtoMsg): _128.MarketModifyEventV1;
                toProto(message: _128.MarketModifyEventV1): Uint8Array;
                toProtoMsg(message: _128.MarketModifyEventV1): _128.MarketModifyEventV1ProtoMsg;
            };
            SourceOfFunds: {
                typeUrl: string;
                is(o: any): o is _128.SourceOfFunds;
                isSDK(o: any): o is _128.SourceOfFundsSDKType;
                isAmino(o: any): o is _128.SourceOfFundsAmino;
                encode(message: _128.SourceOfFunds, writer?: import("..").BinaryWriter): import("..").BinaryWriter;
                decode(input: import("..").BinaryReader | Uint8Array, length?: number): _128.SourceOfFunds;
                fromPartial(object: Partial<_128.SourceOfFunds>): _128.SourceOfFunds;
                fromAmino(object: _128.SourceOfFundsAmino): _128.SourceOfFunds;
                toAmino(message: _128.SourceOfFunds): _128.SourceOfFundsAmino;
                fromAminoMsg(object: _128.SourceOfFundsAminoMsg): _128.SourceOfFunds;
                fromProtoMsg(message: _128.SourceOfFundsProtoMsg): _128.SourceOfFunds;
                toProto(message: _128.SourceOfFunds): Uint8Array;
                toProtoMsg(message: _128.SourceOfFunds): _128.SourceOfFundsProtoMsg;
            };
            TransferEventV1: {
                typeUrl: string;
                is(o: any): o is _128.TransferEventV1;
                isSDK(o: any): o is _128.TransferEventV1SDKType;
                isAmino(o: any): o is _128.TransferEventV1Amino;
                encode(message: _128.TransferEventV1, writer?: import("..").BinaryWriter): import("..").BinaryWriter;
                decode(input: import("..").BinaryReader | Uint8Array, length?: number): _128.TransferEventV1;
                fromPartial(object: Partial<_128.TransferEventV1>): _128.TransferEventV1;
                fromAmino(object: _128.TransferEventV1Amino): _128.TransferEventV1;
                toAmino(message: _128.TransferEventV1): _128.TransferEventV1Amino;
                fromAminoMsg(object: _128.TransferEventV1AminoMsg): _128.TransferEventV1;
                fromProtoMsg(message: _128.TransferEventV1ProtoMsg): _128.TransferEventV1;
                toProto(message: _128.TransferEventV1): Uint8Array;
                toProtoMsg(message: _128.TransferEventV1): _128.TransferEventV1ProtoMsg;
            };
            OrderFillEventV1: {
                typeUrl: string;
                is(o: any): o is _128.OrderFillEventV1;
                isSDK(o: any): o is _128.OrderFillEventV1SDKType;
                isAmino(o: any): o is _128.OrderFillEventV1Amino;
                encode(message: _128.OrderFillEventV1, writer?: import("..").BinaryWriter): import("..").BinaryWriter;
                decode(input: import("..").BinaryReader | Uint8Array, length?: number): _128.OrderFillEventV1;
                fromPartial(object: Partial<_128.OrderFillEventV1>): _128.OrderFillEventV1;
                fromAmino(object: _128.OrderFillEventV1Amino): _128.OrderFillEventV1;
                toAmino(message: _128.OrderFillEventV1): _128.OrderFillEventV1Amino;
                fromAminoMsg(object: _128.OrderFillEventV1AminoMsg): _128.OrderFillEventV1;
                fromProtoMsg(message: _128.OrderFillEventV1ProtoMsg): _128.OrderFillEventV1;
                toProto(message: _128.OrderFillEventV1): Uint8Array;
                toProtoMsg(message: _128.OrderFillEventV1): _128.OrderFillEventV1ProtoMsg;
            };
            DeleveragingEventV1: {
                typeUrl: string;
                is(o: any): o is _128.DeleveragingEventV1;
                isSDK(o: any): o is _128.DeleveragingEventV1SDKType;
                isAmino(o: any): o is _128.DeleveragingEventV1Amino;
                encode(message: _128.DeleveragingEventV1, writer?: import("..").BinaryWriter): import("..").BinaryWriter;
                decode(input: import("..").BinaryReader | Uint8Array, length?: number): _128.DeleveragingEventV1;
                fromPartial(object: Partial<_128.DeleveragingEventV1>): _128.DeleveragingEventV1;
                fromAmino(object: _128.DeleveragingEventV1Amino): _128.DeleveragingEventV1;
                toAmino(message: _128.DeleveragingEventV1): _128.DeleveragingEventV1Amino;
                fromAminoMsg(object: _128.DeleveragingEventV1AminoMsg): _128.DeleveragingEventV1;
                fromProtoMsg(message: _128.DeleveragingEventV1ProtoMsg): _128.DeleveragingEventV1;
                toProto(message: _128.DeleveragingEventV1): Uint8Array;
                toProtoMsg(message: _128.DeleveragingEventV1): _128.DeleveragingEventV1ProtoMsg;
            };
            LiquidationOrderV1: {
                typeUrl: string;
                is(o: any): o is _128.LiquidationOrderV1;
                isSDK(o: any): o is _128.LiquidationOrderV1SDKType;
                isAmino(o: any): o is _128.LiquidationOrderV1Amino;
                encode(message: _128.LiquidationOrderV1, writer?: import("..").BinaryWriter): import("..").BinaryWriter;
                decode(input: import("..").BinaryReader | Uint8Array, length?: number): _128.LiquidationOrderV1;
                fromPartial(object: Partial<_128.LiquidationOrderV1>): _128.LiquidationOrderV1;
                fromAmino(object: _128.LiquidationOrderV1Amino): _128.LiquidationOrderV1;
                toAmino(message: _128.LiquidationOrderV1): _128.LiquidationOrderV1Amino;
                fromAminoMsg(object: _128.LiquidationOrderV1AminoMsg): _128.LiquidationOrderV1;
                fromProtoMsg(message: _128.LiquidationOrderV1ProtoMsg): _128.LiquidationOrderV1;
                toProto(message: _128.LiquidationOrderV1): Uint8Array;
                toProtoMsg(message: _128.LiquidationOrderV1): _128.LiquidationOrderV1ProtoMsg;
            };
            SubaccountUpdateEventV1: {
                typeUrl: string;
                is(o: any): o is _128.SubaccountUpdateEventV1;
                isSDK(o: any): o is _128.SubaccountUpdateEventV1SDKType;
                isAmino(o: any): o is _128.SubaccountUpdateEventV1Amino;
                encode(message: _128.SubaccountUpdateEventV1, writer?: import("..").BinaryWriter): import("..").BinaryWriter;
                decode(input: import("..").BinaryReader | Uint8Array, length?: number): _128.SubaccountUpdateEventV1;
                fromPartial(object: Partial<_128.SubaccountUpdateEventV1>): _128.SubaccountUpdateEventV1;
                fromAmino(object: _128.SubaccountUpdateEventV1Amino): _128.SubaccountUpdateEventV1;
                toAmino(message: _128.SubaccountUpdateEventV1): _128.SubaccountUpdateEventV1Amino;
                fromAminoMsg(object: _128.SubaccountUpdateEventV1AminoMsg): _128.SubaccountUpdateEventV1;
                fromProtoMsg(message: _128.SubaccountUpdateEventV1ProtoMsg): _128.SubaccountUpdateEventV1;
                toProto(message: _128.SubaccountUpdateEventV1): Uint8Array;
                toProtoMsg(message: _128.SubaccountUpdateEventV1): _128.SubaccountUpdateEventV1ProtoMsg;
            };
            StatefulOrderEventV1: {
                typeUrl: string;
                is(o: any): o is _128.StatefulOrderEventV1;
                isSDK(o: any): o is _128.StatefulOrderEventV1SDKType;
                isAmino(o: any): o is _128.StatefulOrderEventV1Amino;
                encode(message: _128.StatefulOrderEventV1, writer?: import("..").BinaryWriter): import("..").BinaryWriter;
                decode(input: import("..").BinaryReader | Uint8Array, length?: number): _128.StatefulOrderEventV1;
                fromPartial(object: Partial<_128.StatefulOrderEventV1>): _128.StatefulOrderEventV1;
                fromAmino(object: _128.StatefulOrderEventV1Amino): _128.StatefulOrderEventV1;
                toAmino(message: _128.StatefulOrderEventV1): _128.StatefulOrderEventV1Amino;
                fromAminoMsg(object: _128.StatefulOrderEventV1AminoMsg): _128.StatefulOrderEventV1;
                fromProtoMsg(message: _128.StatefulOrderEventV1ProtoMsg): _128.StatefulOrderEventV1;
                toProto(message: _128.StatefulOrderEventV1): Uint8Array;
                toProtoMsg(message: _128.StatefulOrderEventV1): _128.StatefulOrderEventV1ProtoMsg;
            };
            StatefulOrderEventV1_StatefulOrderPlacementV1: {
                typeUrl: string;
                is(o: any): o is _128.StatefulOrderEventV1_StatefulOrderPlacementV1;
                isSDK(o: any): o is _128.StatefulOrderEventV1_StatefulOrderPlacementV1SDKType;
                isAmino(o: any): o is _128.StatefulOrderEventV1_StatefulOrderPlacementV1Amino;
                encode(message: _128.StatefulOrderEventV1_StatefulOrderPlacementV1, writer?: import("..").BinaryWriter): import("..").BinaryWriter;
                decode(input: import("..").BinaryReader | Uint8Array, length?: number): _128.StatefulOrderEventV1_StatefulOrderPlacementV1;
                fromPartial(object: Partial<_128.StatefulOrderEventV1_StatefulOrderPlacementV1>): _128.StatefulOrderEventV1_StatefulOrderPlacementV1;
                fromAmino(object: _128.StatefulOrderEventV1_StatefulOrderPlacementV1Amino): _128.StatefulOrderEventV1_StatefulOrderPlacementV1;
                toAmino(message: _128.StatefulOrderEventV1_StatefulOrderPlacementV1): _128.StatefulOrderEventV1_StatefulOrderPlacementV1Amino;
                fromAminoMsg(object: _128.StatefulOrderEventV1_StatefulOrderPlacementV1AminoMsg): _128.StatefulOrderEventV1_StatefulOrderPlacementV1;
                fromProtoMsg(message: _128.StatefulOrderEventV1_StatefulOrderPlacementV1ProtoMsg): _128.StatefulOrderEventV1_StatefulOrderPlacementV1;
                toProto(message: _128.StatefulOrderEventV1_StatefulOrderPlacementV1): Uint8Array;
                toProtoMsg(message: _128.StatefulOrderEventV1_StatefulOrderPlacementV1): _128.StatefulOrderEventV1_StatefulOrderPlacementV1ProtoMsg;
            };
            StatefulOrderEventV1_StatefulOrderRemovalV1: {
                typeUrl: string;
                is(o: any): o is _128.StatefulOrderEventV1_StatefulOrderRemovalV1;
                isSDK(o: any): o is _128.StatefulOrderEventV1_StatefulOrderRemovalV1SDKType;
                isAmino(o: any): o is _128.StatefulOrderEventV1_StatefulOrderRemovalV1Amino;
                encode(message: _128.StatefulOrderEventV1_StatefulOrderRemovalV1, writer?: import("..").BinaryWriter): import("..").BinaryWriter;
                decode(input: import("..").BinaryReader | Uint8Array, length?: number): _128.StatefulOrderEventV1_StatefulOrderRemovalV1;
                fromPartial(object: Partial<_128.StatefulOrderEventV1_StatefulOrderRemovalV1>): _128.StatefulOrderEventV1_StatefulOrderRemovalV1;
                fromAmino(object: _128.StatefulOrderEventV1_StatefulOrderRemovalV1Amino): _128.StatefulOrderEventV1_StatefulOrderRemovalV1;
                toAmino(message: _128.StatefulOrderEventV1_StatefulOrderRemovalV1): _128.StatefulOrderEventV1_StatefulOrderRemovalV1Amino;
                fromAminoMsg(object: _128.StatefulOrderEventV1_StatefulOrderRemovalV1AminoMsg): _128.StatefulOrderEventV1_StatefulOrderRemovalV1;
                fromProtoMsg(message: _128.StatefulOrderEventV1_StatefulOrderRemovalV1ProtoMsg): _128.StatefulOrderEventV1_StatefulOrderRemovalV1;
                toProto(message: _128.StatefulOrderEventV1_StatefulOrderRemovalV1): Uint8Array;
                toProtoMsg(message: _128.StatefulOrderEventV1_StatefulOrderRemovalV1): _128.StatefulOrderEventV1_StatefulOrderRemovalV1ProtoMsg;
            };
            StatefulOrderEventV1_ConditionalOrderPlacementV1: {
                typeUrl: string;
                is(o: any): o is _128.StatefulOrderEventV1_ConditionalOrderPlacementV1;
                isSDK(o: any): o is _128.StatefulOrderEventV1_ConditionalOrderPlacementV1SDKType;
                isAmino(o: any): o is _128.StatefulOrderEventV1_ConditionalOrderPlacementV1Amino;
                encode(message: _128.StatefulOrderEventV1_ConditionalOrderPlacementV1, writer?: import("..").BinaryWriter): import("..").BinaryWriter;
                decode(input: import("..").BinaryReader | Uint8Array, length?: number): _128.StatefulOrderEventV1_ConditionalOrderPlacementV1;
                fromPartial(object: Partial<_128.StatefulOrderEventV1_ConditionalOrderPlacementV1>): _128.StatefulOrderEventV1_ConditionalOrderPlacementV1;
                fromAmino(object: _128.StatefulOrderEventV1_ConditionalOrderPlacementV1Amino): _128.StatefulOrderEventV1_ConditionalOrderPlacementV1;
                toAmino(message: _128.StatefulOrderEventV1_ConditionalOrderPlacementV1): _128.StatefulOrderEventV1_ConditionalOrderPlacementV1Amino;
                fromAminoMsg(object: _128.StatefulOrderEventV1_ConditionalOrderPlacementV1AminoMsg): _128.StatefulOrderEventV1_ConditionalOrderPlacementV1;
                fromProtoMsg(message: _128.StatefulOrderEventV1_ConditionalOrderPlacementV1ProtoMsg): _128.StatefulOrderEventV1_ConditionalOrderPlacementV1;
                toProto(message: _128.StatefulOrderEventV1_ConditionalOrderPlacementV1): Uint8Array;
                toProtoMsg(message: _128.StatefulOrderEventV1_ConditionalOrderPlacementV1): _128.StatefulOrderEventV1_ConditionalOrderPlacementV1ProtoMsg;
            };
            StatefulOrderEventV1_ConditionalOrderTriggeredV1: {
                typeUrl: string;
                is(o: any): o is _128.StatefulOrderEventV1_ConditionalOrderTriggeredV1;
                isSDK(o: any): o is _128.StatefulOrderEventV1_ConditionalOrderTriggeredV1SDKType;
                isAmino(o: any): o is _128.StatefulOrderEventV1_ConditionalOrderTriggeredV1Amino;
                encode(message: _128.StatefulOrderEventV1_ConditionalOrderTriggeredV1, writer?: import("..").BinaryWriter): import("..").BinaryWriter;
                decode(input: import("..").BinaryReader | Uint8Array, length?: number): _128.StatefulOrderEventV1_ConditionalOrderTriggeredV1;
                fromPartial(object: Partial<_128.StatefulOrderEventV1_ConditionalOrderTriggeredV1>): _128.StatefulOrderEventV1_ConditionalOrderTriggeredV1;
                fromAmino(object: _128.StatefulOrderEventV1_ConditionalOrderTriggeredV1Amino): _128.StatefulOrderEventV1_ConditionalOrderTriggeredV1;
                toAmino(message: _128.StatefulOrderEventV1_ConditionalOrderTriggeredV1): _128.StatefulOrderEventV1_ConditionalOrderTriggeredV1Amino;
                fromAminoMsg(object: _128.StatefulOrderEventV1_ConditionalOrderTriggeredV1AminoMsg): _128.StatefulOrderEventV1_ConditionalOrderTriggeredV1;
                fromProtoMsg(message: _128.StatefulOrderEventV1_ConditionalOrderTriggeredV1ProtoMsg): _128.StatefulOrderEventV1_ConditionalOrderTriggeredV1;
                toProto(message: _128.StatefulOrderEventV1_ConditionalOrderTriggeredV1): Uint8Array;
                toProtoMsg(message: _128.StatefulOrderEventV1_ConditionalOrderTriggeredV1): _128.StatefulOrderEventV1_ConditionalOrderTriggeredV1ProtoMsg;
            };
            StatefulOrderEventV1_LongTermOrderPlacementV1: {
                typeUrl: string;
                is(o: any): o is _128.StatefulOrderEventV1_LongTermOrderPlacementV1;
                isSDK(o: any): o is _128.StatefulOrderEventV1_LongTermOrderPlacementV1SDKType;
                isAmino(o: any): o is _128.StatefulOrderEventV1_LongTermOrderPlacementV1Amino;
                encode(message: _128.StatefulOrderEventV1_LongTermOrderPlacementV1, writer?: import("..").BinaryWriter): import("..").BinaryWriter;
                decode(input: import("..").BinaryReader | Uint8Array, length?: number): _128.StatefulOrderEventV1_LongTermOrderPlacementV1;
                fromPartial(object: Partial<_128.StatefulOrderEventV1_LongTermOrderPlacementV1>): _128.StatefulOrderEventV1_LongTermOrderPlacementV1;
                fromAmino(object: _128.StatefulOrderEventV1_LongTermOrderPlacementV1Amino): _128.StatefulOrderEventV1_LongTermOrderPlacementV1;
                toAmino(message: _128.StatefulOrderEventV1_LongTermOrderPlacementV1): _128.StatefulOrderEventV1_LongTermOrderPlacementV1Amino;
                fromAminoMsg(object: _128.StatefulOrderEventV1_LongTermOrderPlacementV1AminoMsg): _128.StatefulOrderEventV1_LongTermOrderPlacementV1;
                fromProtoMsg(message: _128.StatefulOrderEventV1_LongTermOrderPlacementV1ProtoMsg): _128.StatefulOrderEventV1_LongTermOrderPlacementV1;
                toProto(message: _128.StatefulOrderEventV1_LongTermOrderPlacementV1): Uint8Array;
                toProtoMsg(message: _128.StatefulOrderEventV1_LongTermOrderPlacementV1): _128.StatefulOrderEventV1_LongTermOrderPlacementV1ProtoMsg;
            };
            AssetCreateEventV1: {
                typeUrl: string;
                is(o: any): o is _128.AssetCreateEventV1;
                isSDK(o: any): o is _128.AssetCreateEventV1SDKType;
                isAmino(o: any): o is _128.AssetCreateEventV1Amino;
                encode(message: _128.AssetCreateEventV1, writer?: import("..").BinaryWriter): import("..").BinaryWriter;
                decode(input: import("..").BinaryReader | Uint8Array, length?: number): _128.AssetCreateEventV1;
                fromPartial(object: Partial<_128.AssetCreateEventV1>): _128.AssetCreateEventV1;
                fromAmino(object: _128.AssetCreateEventV1Amino): _128.AssetCreateEventV1;
                toAmino(message: _128.AssetCreateEventV1): _128.AssetCreateEventV1Amino;
                fromAminoMsg(object: _128.AssetCreateEventV1AminoMsg): _128.AssetCreateEventV1;
                fromProtoMsg(message: _128.AssetCreateEventV1ProtoMsg): _128.AssetCreateEventV1;
                toProto(message: _128.AssetCreateEventV1): Uint8Array;
                toProtoMsg(message: _128.AssetCreateEventV1): _128.AssetCreateEventV1ProtoMsg;
            };
            PerpetualMarketCreateEventV1: {
                typeUrl: string;
                is(o: any): o is _128.PerpetualMarketCreateEventV1;
                isSDK(o: any): o is _128.PerpetualMarketCreateEventV1SDKType;
                isAmino(o: any): o is _128.PerpetualMarketCreateEventV1Amino;
                encode(message: _128.PerpetualMarketCreateEventV1, writer?: import("..").BinaryWriter): import("..").BinaryWriter;
                decode(input: import("..").BinaryReader | Uint8Array, length?: number): _128.PerpetualMarketCreateEventV1;
                fromPartial(object: Partial<_128.PerpetualMarketCreateEventV1>): _128.PerpetualMarketCreateEventV1;
                fromAmino(object: _128.PerpetualMarketCreateEventV1Amino): _128.PerpetualMarketCreateEventV1;
                toAmino(message: _128.PerpetualMarketCreateEventV1): _128.PerpetualMarketCreateEventV1Amino;
                fromAminoMsg(object: _128.PerpetualMarketCreateEventV1AminoMsg): _128.PerpetualMarketCreateEventV1;
                fromProtoMsg(message: _128.PerpetualMarketCreateEventV1ProtoMsg): _128.PerpetualMarketCreateEventV1;
                toProto(message: _128.PerpetualMarketCreateEventV1): Uint8Array;
                toProtoMsg(message: _128.PerpetualMarketCreateEventV1): _128.PerpetualMarketCreateEventV1ProtoMsg;
            };
            PerpetualMarketCreateEventV2: {
                typeUrl: string;
                is(o: any): o is _128.PerpetualMarketCreateEventV2;
                isSDK(o: any): o is _128.PerpetualMarketCreateEventV2SDKType;
                isAmino(o: any): o is _128.PerpetualMarketCreateEventV2Amino;
                encode(message: _128.PerpetualMarketCreateEventV2, writer?: import("..").BinaryWriter): import("..").BinaryWriter;
                decode(input: import("..").BinaryReader | Uint8Array, length?: number): _128.PerpetualMarketCreateEventV2;
                fromPartial(object: Partial<_128.PerpetualMarketCreateEventV2>): _128.PerpetualMarketCreateEventV2;
                fromAmino(object: _128.PerpetualMarketCreateEventV2Amino): _128.PerpetualMarketCreateEventV2;
                toAmino(message: _128.PerpetualMarketCreateEventV2): _128.PerpetualMarketCreateEventV2Amino;
                fromAminoMsg(object: _128.PerpetualMarketCreateEventV2AminoMsg): _128.PerpetualMarketCreateEventV2;
                fromProtoMsg(message: _128.PerpetualMarketCreateEventV2ProtoMsg): _128.PerpetualMarketCreateEventV2;
                toProto(message: _128.PerpetualMarketCreateEventV2): Uint8Array;
                toProtoMsg(message: _128.PerpetualMarketCreateEventV2): _128.PerpetualMarketCreateEventV2ProtoMsg;
            };
            LiquidityTierUpsertEventV1: {
                typeUrl: string;
                is(o: any): o is _128.LiquidityTierUpsertEventV1;
                isSDK(o: any): o is _128.LiquidityTierUpsertEventV1SDKType;
                isAmino(o: any): o is _128.LiquidityTierUpsertEventV1Amino;
                encode(message: _128.LiquidityTierUpsertEventV1, writer?: import("..").BinaryWriter): import("..").BinaryWriter;
                decode(input: import("..").BinaryReader | Uint8Array, length?: number): _128.LiquidityTierUpsertEventV1;
                fromPartial(object: Partial<_128.LiquidityTierUpsertEventV1>): _128.LiquidityTierUpsertEventV1;
                fromAmino(object: _128.LiquidityTierUpsertEventV1Amino): _128.LiquidityTierUpsertEventV1;
                toAmino(message: _128.LiquidityTierUpsertEventV1): _128.LiquidityTierUpsertEventV1Amino;
                fromAminoMsg(object: _128.LiquidityTierUpsertEventV1AminoMsg): _128.LiquidityTierUpsertEventV1;
                fromProtoMsg(message: _128.LiquidityTierUpsertEventV1ProtoMsg): _128.LiquidityTierUpsertEventV1;
                toProto(message: _128.LiquidityTierUpsertEventV1): Uint8Array;
                toProtoMsg(message: _128.LiquidityTierUpsertEventV1): _128.LiquidityTierUpsertEventV1ProtoMsg;
            };
            OpenInterestUpdateEventV1: {
                typeUrl: string;
                is(o: any): o is _128.OpenInterestUpdateEventV1;
                isSDK(o: any): o is _128.OpenInterestUpdateEventV1SDKType;
                isAmino(o: any): o is _128.OpenInterestUpdateEventV1Amino;
                encode(message: _128.OpenInterestUpdateEventV1, writer?: import("..").BinaryWriter): import("..").BinaryWriter;
                decode(input: import("..").BinaryReader | Uint8Array, length?: number): _128.OpenInterestUpdateEventV1;
                fromPartial(object: Partial<_128.OpenInterestUpdateEventV1>): _128.OpenInterestUpdateEventV1;
                fromAmino(object: _128.OpenInterestUpdateEventV1Amino): _128.OpenInterestUpdateEventV1;
                toAmino(message: _128.OpenInterestUpdateEventV1): _128.OpenInterestUpdateEventV1Amino;
                fromAminoMsg(object: _128.OpenInterestUpdateEventV1AminoMsg): _128.OpenInterestUpdateEventV1;
                fromProtoMsg(message: _128.OpenInterestUpdateEventV1ProtoMsg): _128.OpenInterestUpdateEventV1;
                toProto(message: _128.OpenInterestUpdateEventV1): Uint8Array;
                toProtoMsg(message: _128.OpenInterestUpdateEventV1): _128.OpenInterestUpdateEventV1ProtoMsg;
            };
            OpenInterestUpdate: {
                typeUrl: string;
                is(o: any): o is _128.OpenInterestUpdate;
                isSDK(o: any): o is _128.OpenInterestUpdateSDKType;
                isAmino(o: any): o is _128.OpenInterestUpdateAmino;
                encode(message: _128.OpenInterestUpdate, writer?: import("..").BinaryWriter): import("..").BinaryWriter;
                decode(input: import("..").BinaryReader | Uint8Array, length?: number): _128.OpenInterestUpdate;
                fromPartial(object: Partial<_128.OpenInterestUpdate>): _128.OpenInterestUpdate;
                fromAmino(object: _128.OpenInterestUpdateAmino): _128.OpenInterestUpdate;
                toAmino(message: _128.OpenInterestUpdate): _128.OpenInterestUpdateAmino;
                fromAminoMsg(object: _128.OpenInterestUpdateAminoMsg): _128.OpenInterestUpdate;
                fromProtoMsg(message: _128.OpenInterestUpdateProtoMsg): _128.OpenInterestUpdate;
                toProto(message: _128.OpenInterestUpdate): Uint8Array;
                toProtoMsg(message: _128.OpenInterestUpdate): _128.OpenInterestUpdateProtoMsg;
            };
            LiquidityTierUpsertEventV2: {
                typeUrl: string;
                is(o: any): o is _128.LiquidityTierUpsertEventV2;
                isSDK(o: any): o is _128.LiquidityTierUpsertEventV2SDKType;
                isAmino(o: any): o is _128.LiquidityTierUpsertEventV2Amino;
                encode(message: _128.LiquidityTierUpsertEventV2, writer?: import("..").BinaryWriter): import("..").BinaryWriter;
                decode(input: import("..").BinaryReader | Uint8Array, length?: number): _128.LiquidityTierUpsertEventV2;
                fromPartial(object: Partial<_128.LiquidityTierUpsertEventV2>): _128.LiquidityTierUpsertEventV2;
                fromAmino(object: _128.LiquidityTierUpsertEventV2Amino): _128.LiquidityTierUpsertEventV2;
                toAmino(message: _128.LiquidityTierUpsertEventV2): _128.LiquidityTierUpsertEventV2Amino;
                fromAminoMsg(object: _128.LiquidityTierUpsertEventV2AminoMsg): _128.LiquidityTierUpsertEventV2;
                fromProtoMsg(message: _128.LiquidityTierUpsertEventV2ProtoMsg): _128.LiquidityTierUpsertEventV2;
                toProto(message: _128.LiquidityTierUpsertEventV2): Uint8Array;
                toProtoMsg(message: _128.LiquidityTierUpsertEventV2): _128.LiquidityTierUpsertEventV2ProtoMsg;
            };
            UpdateClobPairEventV1: {
                typeUrl: string;
                is(o: any): o is _128.UpdateClobPairEventV1;
                isSDK(o: any): o is _128.UpdateClobPairEventV1SDKType;
                isAmino(o: any): o is _128.UpdateClobPairEventV1Amino;
                encode(message: _128.UpdateClobPairEventV1, writer?: import("..").BinaryWriter): import("..").BinaryWriter;
                decode(input: import("..").BinaryReader | Uint8Array, length?: number): _128.UpdateClobPairEventV1;
                fromPartial(object: Partial<_128.UpdateClobPairEventV1>): _128.UpdateClobPairEventV1;
                fromAmino(object: _128.UpdateClobPairEventV1Amino): _128.UpdateClobPairEventV1;
                toAmino(message: _128.UpdateClobPairEventV1): _128.UpdateClobPairEventV1Amino;
                fromAminoMsg(object: _128.UpdateClobPairEventV1AminoMsg): _128.UpdateClobPairEventV1;
                fromProtoMsg(message: _128.UpdateClobPairEventV1ProtoMsg): _128.UpdateClobPairEventV1;
                toProto(message: _128.UpdateClobPairEventV1): Uint8Array;
                toProtoMsg(message: _128.UpdateClobPairEventV1): _128.UpdateClobPairEventV1ProtoMsg;
            };
            UpdatePerpetualEventV1: {
                typeUrl: string;
                is(o: any): o is _128.UpdatePerpetualEventV1;
                isSDK(o: any): o is _128.UpdatePerpetualEventV1SDKType;
                isAmino(o: any): o is _128.UpdatePerpetualEventV1Amino;
                encode(message: _128.UpdatePerpetualEventV1, writer?: import("..").BinaryWriter): import("..").BinaryWriter;
                decode(input: import("..").BinaryReader | Uint8Array, length?: number): _128.UpdatePerpetualEventV1;
                fromPartial(object: Partial<_128.UpdatePerpetualEventV1>): _128.UpdatePerpetualEventV1;
                fromAmino(object: _128.UpdatePerpetualEventV1Amino): _128.UpdatePerpetualEventV1;
                toAmino(message: _128.UpdatePerpetualEventV1): _128.UpdatePerpetualEventV1Amino;
                fromAminoMsg(object: _128.UpdatePerpetualEventV1AminoMsg): _128.UpdatePerpetualEventV1;
                fromProtoMsg(message: _128.UpdatePerpetualEventV1ProtoMsg): _128.UpdatePerpetualEventV1;
                toProto(message: _128.UpdatePerpetualEventV1): Uint8Array;
                toProtoMsg(message: _128.UpdatePerpetualEventV1): _128.UpdatePerpetualEventV1ProtoMsg;
            };
            UpdateYieldParamsEventV1: {
                typeUrl: string;
                is(o: any): o is _128.UpdateYieldParamsEventV1;
                isSDK(o: any): o is _128.UpdateYieldParamsEventV1SDKType;
                isAmino(o: any): o is _128.UpdateYieldParamsEventV1Amino;
                encode(message: _128.UpdateYieldParamsEventV1, writer?: import("..").BinaryWriter): import("..").BinaryWriter;
                decode(input: import("..").BinaryReader | Uint8Array, length?: number): _128.UpdateYieldParamsEventV1;
                fromPartial(object: Partial<_128.UpdateYieldParamsEventV1>): _128.UpdateYieldParamsEventV1;
                fromAmino(object: _128.UpdateYieldParamsEventV1Amino): _128.UpdateYieldParamsEventV1;
                toAmino(message: _128.UpdateYieldParamsEventV1): _128.UpdateYieldParamsEventV1Amino;
                fromAminoMsg(object: _128.UpdateYieldParamsEventV1AminoMsg): _128.UpdateYieldParamsEventV1;
                fromProtoMsg(message: _128.UpdateYieldParamsEventV1ProtoMsg): _128.UpdateYieldParamsEventV1;
                toProto(message: _128.UpdateYieldParamsEventV1): Uint8Array;
                toProtoMsg(message: _128.UpdateYieldParamsEventV1): _128.UpdateYieldParamsEventV1ProtoMsg;
            };
        };
        const indexer_manager: {
            indexerTendermintEvent_BlockEventFromJSON(object: any): _129.IndexerTendermintEvent_BlockEvent;
            indexerTendermintEvent_BlockEventToJSON(object: _129.IndexerTendermintEvent_BlockEvent): string;
            IndexerTendermintEvent_BlockEvent: typeof _129.IndexerTendermintEvent_BlockEvent;
            IndexerTendermintEvent_BlockEventSDKType: typeof _129.IndexerTendermintEvent_BlockEvent;
            IndexerTendermintEvent_BlockEventAmino: typeof _129.IndexerTendermintEvent_BlockEvent;
            IndexerTendermintEventWrapper: {
                typeUrl: string;
                is(o: any): o is _129.IndexerTendermintEventWrapper;
                isSDK(o: any): o is _129.IndexerTendermintEventWrapperSDKType;
                isAmino(o: any): o is _129.IndexerTendermintEventWrapperAmino;
                encode(message: _129.IndexerTendermintEventWrapper, writer?: import("..").BinaryWriter): import("..").BinaryWriter;
                decode(input: import("..").BinaryReader | Uint8Array, length?: number): _129.IndexerTendermintEventWrapper;
                fromPartial(object: Partial<_129.IndexerTendermintEventWrapper>): _129.IndexerTendermintEventWrapper;
                fromAmino(object: _129.IndexerTendermintEventWrapperAmino): _129.IndexerTendermintEventWrapper;
                toAmino(message: _129.IndexerTendermintEventWrapper): _129.IndexerTendermintEventWrapperAmino;
                fromAminoMsg(object: _129.IndexerTendermintEventWrapperAminoMsg): _129.IndexerTendermintEventWrapper;
                fromProtoMsg(message: _129.IndexerTendermintEventWrapperProtoMsg): _129.IndexerTendermintEventWrapper;
                toProto(message: _129.IndexerTendermintEventWrapper): Uint8Array;
                toProtoMsg(message: _129.IndexerTendermintEventWrapper): _129.IndexerTendermintEventWrapperProtoMsg;
            };
            IndexerEventsStoreValue: {
                typeUrl: string;
                is(o: any): o is _129.IndexerEventsStoreValue;
                isSDK(o: any): o is _129.IndexerEventsStoreValueSDKType;
                isAmino(o: any): o is _129.IndexerEventsStoreValueAmino;
                encode(message: _129.IndexerEventsStoreValue, writer?: import("..").BinaryWriter): import("..").BinaryWriter;
                decode(input: import("..").BinaryReader | Uint8Array, length?: number): _129.IndexerEventsStoreValue;
                fromPartial(object: Partial<_129.IndexerEventsStoreValue>): _129.IndexerEventsStoreValue;
                fromAmino(object: _129.IndexerEventsStoreValueAmino): _129.IndexerEventsStoreValue;
                toAmino(message: _129.IndexerEventsStoreValue): _129.IndexerEventsStoreValueAmino;
                fromAminoMsg(object: _129.IndexerEventsStoreValueAminoMsg): _129.IndexerEventsStoreValue;
                fromProtoMsg(message: _129.IndexerEventsStoreValueProtoMsg): _129.IndexerEventsStoreValue;
                toProto(message: _129.IndexerEventsStoreValue): Uint8Array;
                toProtoMsg(message: _129.IndexerEventsStoreValue): _129.IndexerEventsStoreValueProtoMsg;
            };
            IndexerTendermintEvent: {
                typeUrl: string;
                is(o: any): o is _129.IndexerTendermintEvent;
                isSDK(o: any): o is _129.IndexerTendermintEventSDKType;
                isAmino(o: any): o is _129.IndexerTendermintEventAmino;
                encode(message: _129.IndexerTendermintEvent, writer?: import("..").BinaryWriter): import("..").BinaryWriter;
                decode(input: import("..").BinaryReader | Uint8Array, length?: number): _129.IndexerTendermintEvent;
                fromPartial(object: Partial<_129.IndexerTendermintEvent>): _129.IndexerTendermintEvent;
                fromAmino(object: _129.IndexerTendermintEventAmino): _129.IndexerTendermintEvent;
                toAmino(message: _129.IndexerTendermintEvent): _129.IndexerTendermintEventAmino;
                fromAminoMsg(object: _129.IndexerTendermintEventAminoMsg): _129.IndexerTendermintEvent;
                fromProtoMsg(message: _129.IndexerTendermintEventProtoMsg): _129.IndexerTendermintEvent;
                toProto(message: _129.IndexerTendermintEvent): Uint8Array;
                toProtoMsg(message: _129.IndexerTendermintEvent): _129.IndexerTendermintEventProtoMsg;
            };
            IndexerTendermintBlock: {
                typeUrl: string;
                is(o: any): o is _129.IndexerTendermintBlock;
                isSDK(o: any): o is _129.IndexerTendermintBlockSDKType;
                isAmino(o: any): o is _129.IndexerTendermintBlockAmino;
                encode(message: _129.IndexerTendermintBlock, writer?: import("..").BinaryWriter): import("..").BinaryWriter;
                decode(input: import("..").BinaryReader | Uint8Array, length?: number): _129.IndexerTendermintBlock;
                fromPartial(object: Partial<_129.IndexerTendermintBlock>): _129.IndexerTendermintBlock;
                fromAmino(object: _129.IndexerTendermintBlockAmino): _129.IndexerTendermintBlock;
                toAmino(message: _129.IndexerTendermintBlock): _129.IndexerTendermintBlockAmino;
                fromAminoMsg(object: _129.IndexerTendermintBlockAminoMsg): _129.IndexerTendermintBlock;
                fromProtoMsg(message: _129.IndexerTendermintBlockProtoMsg): _129.IndexerTendermintBlock;
                toProto(message: _129.IndexerTendermintBlock): Uint8Array;
                toProtoMsg(message: _129.IndexerTendermintBlock): _129.IndexerTendermintBlockProtoMsg;
            };
        };
        const off_chain_updates: {
            orderPlaceV1_OrderPlacementStatusFromJSON(object: any): _130.OrderPlaceV1_OrderPlacementStatus;
            orderPlaceV1_OrderPlacementStatusToJSON(object: _130.OrderPlaceV1_OrderPlacementStatus): string;
            orderRemoveV1_OrderRemovalStatusFromJSON(object: any): _130.OrderRemoveV1_OrderRemovalStatus;
            orderRemoveV1_OrderRemovalStatusToJSON(object: _130.OrderRemoveV1_OrderRemovalStatus): string;
            OrderPlaceV1_OrderPlacementStatus: typeof _130.OrderPlaceV1_OrderPlacementStatus;
            OrderPlaceV1_OrderPlacementStatusSDKType: typeof _130.OrderPlaceV1_OrderPlacementStatus;
            OrderPlaceV1_OrderPlacementStatusAmino: typeof _130.OrderPlaceV1_OrderPlacementStatus;
            OrderRemoveV1_OrderRemovalStatus: typeof _130.OrderRemoveV1_OrderRemovalStatus;
            OrderRemoveV1_OrderRemovalStatusSDKType: typeof _130.OrderRemoveV1_OrderRemovalStatus;
            OrderRemoveV1_OrderRemovalStatusAmino: typeof _130.OrderRemoveV1_OrderRemovalStatus;
            OrderPlaceV1: {
                typeUrl: string;
                is(o: any): o is _130.OrderPlaceV1;
                isSDK(o: any): o is _130.OrderPlaceV1SDKType;
                isAmino(o: any): o is _130.OrderPlaceV1Amino;
                encode(message: _130.OrderPlaceV1, writer?: import("..").BinaryWriter): import("..").BinaryWriter;
                decode(input: import("..").BinaryReader | Uint8Array, length?: number): _130.OrderPlaceV1;
                fromPartial(object: Partial<_130.OrderPlaceV1>): _130.OrderPlaceV1;
                fromAmino(object: _130.OrderPlaceV1Amino): _130.OrderPlaceV1;
                toAmino(message: _130.OrderPlaceV1): _130.OrderPlaceV1Amino;
                fromAminoMsg(object: _130.OrderPlaceV1AminoMsg): _130.OrderPlaceV1;
                fromProtoMsg(message: _130.OrderPlaceV1ProtoMsg): _130.OrderPlaceV1;
                toProto(message: _130.OrderPlaceV1): Uint8Array;
                toProtoMsg(message: _130.OrderPlaceV1): _130.OrderPlaceV1ProtoMsg;
            };
            OrderRemoveV1: {
                typeUrl: string;
                is(o: any): o is _130.OrderRemoveV1;
                isSDK(o: any): o is _130.OrderRemoveV1SDKType;
                isAmino(o: any): o is _130.OrderRemoveV1Amino;
                encode(message: _130.OrderRemoveV1, writer?: import("..").BinaryWriter): import("..").BinaryWriter;
                decode(input: import("..").BinaryReader | Uint8Array, length?: number): _130.OrderRemoveV1;
                fromPartial(object: Partial<_130.OrderRemoveV1>): _130.OrderRemoveV1;
                fromAmino(object: _130.OrderRemoveV1Amino): _130.OrderRemoveV1;
                toAmino(message: _130.OrderRemoveV1): _130.OrderRemoveV1Amino;
                fromAminoMsg(object: _130.OrderRemoveV1AminoMsg): _130.OrderRemoveV1;
                fromProtoMsg(message: _130.OrderRemoveV1ProtoMsg): _130.OrderRemoveV1;
                toProto(message: _130.OrderRemoveV1): Uint8Array;
                toProtoMsg(message: _130.OrderRemoveV1): _130.OrderRemoveV1ProtoMsg;
            };
            OrderUpdateV1: {
                typeUrl: string;
                is(o: any): o is _130.OrderUpdateV1;
                isSDK(o: any): o is _130.OrderUpdateV1SDKType;
                isAmino(o: any): o is _130.OrderUpdateV1Amino;
                encode(message: _130.OrderUpdateV1, writer?: import("..").BinaryWriter): import("..").BinaryWriter;
                decode(input: import("..").BinaryReader | Uint8Array, length?: number): _130.OrderUpdateV1;
                fromPartial(object: Partial<_130.OrderUpdateV1>): _130.OrderUpdateV1;
                fromAmino(object: _130.OrderUpdateV1Amino): _130.OrderUpdateV1;
                toAmino(message: _130.OrderUpdateV1): _130.OrderUpdateV1Amino;
                fromAminoMsg(object: _130.OrderUpdateV1AminoMsg): _130.OrderUpdateV1;
                fromProtoMsg(message: _130.OrderUpdateV1ProtoMsg): _130.OrderUpdateV1;
                toProto(message: _130.OrderUpdateV1): Uint8Array;
                toProtoMsg(message: _130.OrderUpdateV1): _130.OrderUpdateV1ProtoMsg;
            };
            OffChainUpdateV1: {
                typeUrl: string;
                is(o: any): o is _130.OffChainUpdateV1;
                isSDK(o: any): o is _130.OffChainUpdateV1SDKType;
                isAmino(o: any): o is _130.OffChainUpdateV1Amino;
                encode(message: _130.OffChainUpdateV1, writer?: import("..").BinaryWriter): import("..").BinaryWriter;
                decode(input: import("..").BinaryReader | Uint8Array, length?: number): _130.OffChainUpdateV1;
                fromPartial(object: Partial<_130.OffChainUpdateV1>): _130.OffChainUpdateV1;
                fromAmino(object: _130.OffChainUpdateV1Amino): _130.OffChainUpdateV1;
                toAmino(message: _130.OffChainUpdateV1): _130.OffChainUpdateV1Amino;
                fromAminoMsg(object: _130.OffChainUpdateV1AminoMsg): _130.OffChainUpdateV1;
                fromProtoMsg(message: _130.OffChainUpdateV1ProtoMsg): _130.OffChainUpdateV1;
                toProto(message: _130.OffChainUpdateV1): Uint8Array;
                toProtoMsg(message: _130.OffChainUpdateV1): _130.OffChainUpdateV1ProtoMsg;
            };
        };
        namespace protocol {
            const v1: {
                IndexerSubaccountId: {
                    typeUrl: string;
                    is(o: any): o is _133.IndexerSubaccountId;
                    isSDK(o: any): o is _133.IndexerSubaccountIdSDKType;
                    isAmino(o: any): o is _133.IndexerSubaccountIdAmino;
                    encode(message: _133.IndexerSubaccountId, writer?: import("..").BinaryWriter): import("..").BinaryWriter;
                    decode(input: import("..").BinaryReader | Uint8Array, length?: number): _133.IndexerSubaccountId;
                    fromPartial(object: Partial<_133.IndexerSubaccountId>): _133.IndexerSubaccountId;
                    fromAmino(object: _133.IndexerSubaccountIdAmino): _133.IndexerSubaccountId;
                    toAmino(message: _133.IndexerSubaccountId): _133.IndexerSubaccountIdAmino;
                    fromAminoMsg(object: _133.IndexerSubaccountIdAminoMsg): _133.IndexerSubaccountId;
                    fromProtoMsg(message: _133.IndexerSubaccountIdProtoMsg): _133.IndexerSubaccountId;
                    toProto(message: _133.IndexerSubaccountId): Uint8Array;
                    toProtoMsg(message: _133.IndexerSubaccountId): _133.IndexerSubaccountIdProtoMsg;
                };
                IndexerPerpetualPosition: {
                    typeUrl: string;
                    is(o: any): o is _133.IndexerPerpetualPosition;
                    isSDK(o: any): o is _133.IndexerPerpetualPositionSDKType;
                    isAmino(o: any): o is _133.IndexerPerpetualPositionAmino;
                    encode(message: _133.IndexerPerpetualPosition, writer?: import("..").BinaryWriter): import("..").BinaryWriter;
                    decode(input: import("..").BinaryReader | Uint8Array, length?: number): _133.IndexerPerpetualPosition;
                    fromPartial(object: Partial<_133.IndexerPerpetualPosition>): _133.IndexerPerpetualPosition;
                    fromAmino(object: _133.IndexerPerpetualPositionAmino): _133.IndexerPerpetualPosition;
                    toAmino(message: _133.IndexerPerpetualPosition): _133.IndexerPerpetualPositionAmino;
                    fromAminoMsg(object: _133.IndexerPerpetualPositionAminoMsg): _133.IndexerPerpetualPosition;
                    fromProtoMsg(message: _133.IndexerPerpetualPositionProtoMsg): _133.IndexerPerpetualPosition;
                    toProto(message: _133.IndexerPerpetualPosition): Uint8Array;
                    toProtoMsg(message: _133.IndexerPerpetualPosition): _133.IndexerPerpetualPositionProtoMsg;
                };
                IndexerAssetPosition: {
                    typeUrl: string;
                    is(o: any): o is _133.IndexerAssetPosition;
                    isSDK(o: any): o is _133.IndexerAssetPositionSDKType;
                    isAmino(o: any): o is _133.IndexerAssetPositionAmino;
                    encode(message: _133.IndexerAssetPosition, writer?: import("..").BinaryWriter): import("..").BinaryWriter;
                    decode(input: import("..").BinaryReader | Uint8Array, length?: number): _133.IndexerAssetPosition;
                    fromPartial(object: Partial<_133.IndexerAssetPosition>): _133.IndexerAssetPosition;
                    fromAmino(object: _133.IndexerAssetPositionAmino): _133.IndexerAssetPosition;
                    toAmino(message: _133.IndexerAssetPosition): _133.IndexerAssetPositionAmino;
                    fromAminoMsg(object: _133.IndexerAssetPositionAminoMsg): _133.IndexerAssetPosition;
                    fromProtoMsg(message: _133.IndexerAssetPositionProtoMsg): _133.IndexerAssetPosition;
                    toProto(message: _133.IndexerAssetPosition): Uint8Array;
                    toProtoMsg(message: _133.IndexerAssetPosition): _133.IndexerAssetPositionProtoMsg;
                };
                perpetualMarketTypeFromJSON(object: any): _132.PerpetualMarketType;
                perpetualMarketTypeToJSON(object: _132.PerpetualMarketType): string;
                PerpetualMarketType: typeof _132.PerpetualMarketType;
                PerpetualMarketTypeSDKType: typeof _132.PerpetualMarketType;
                PerpetualMarketTypeAmino: typeof _132.PerpetualMarketType;
                indexerOrder_SideFromJSON(object: any): _131.IndexerOrder_Side;
                indexerOrder_SideToJSON(object: _131.IndexerOrder_Side): string;
                indexerOrder_TimeInForceFromJSON(object: any): _131.IndexerOrder_TimeInForce;
                indexerOrder_TimeInForceToJSON(object: _131.IndexerOrder_TimeInForce): string;
                indexerOrder_ConditionTypeFromJSON(object: any): _131.IndexerOrder_ConditionType;
                indexerOrder_ConditionTypeToJSON(object: _131.IndexerOrder_ConditionType): string;
                clobPairStatusFromJSON(object: any): _131.ClobPairStatus;
                clobPairStatusToJSON(object: _131.ClobPairStatus): string;
                IndexerOrder_Side: typeof _131.IndexerOrder_Side;
                IndexerOrder_SideSDKType: typeof _131.IndexerOrder_Side;
                IndexerOrder_SideAmino: typeof _131.IndexerOrder_Side;
                IndexerOrder_TimeInForce: typeof _131.IndexerOrder_TimeInForce;
                IndexerOrder_TimeInForceSDKType: typeof _131.IndexerOrder_TimeInForce;
                IndexerOrder_TimeInForceAmino: typeof _131.IndexerOrder_TimeInForce;
                IndexerOrder_ConditionType: typeof _131.IndexerOrder_ConditionType;
                IndexerOrder_ConditionTypeSDKType: typeof _131.IndexerOrder_ConditionType;
                IndexerOrder_ConditionTypeAmino: typeof _131.IndexerOrder_ConditionType;
                ClobPairStatus: typeof _131.ClobPairStatus;
                ClobPairStatusSDKType: typeof _131.ClobPairStatus;
                ClobPairStatusAmino: typeof _131.ClobPairStatus;
                IndexerOrderId: {
                    typeUrl: string;
                    is(o: any): o is _131.IndexerOrderId;
                    isSDK(o: any): o is _131.IndexerOrderIdSDKType;
                    isAmino(o: any): o is _131.IndexerOrderIdAmino;
                    encode(message: _131.IndexerOrderId, writer?: import("..").BinaryWriter): import("..").BinaryWriter;
                    decode(input: import("..").BinaryReader | Uint8Array, length?: number): _131.IndexerOrderId;
                    fromPartial(object: Partial<_131.IndexerOrderId>): _131.IndexerOrderId;
                    fromAmino(object: _131.IndexerOrderIdAmino): _131.IndexerOrderId;
                    toAmino(message: _131.IndexerOrderId): _131.IndexerOrderIdAmino;
                    fromAminoMsg(object: _131.IndexerOrderIdAminoMsg): _131.IndexerOrderId;
                    fromProtoMsg(message: _131.IndexerOrderIdProtoMsg): _131.IndexerOrderId;
                    toProto(message: _131.IndexerOrderId): Uint8Array;
                    toProtoMsg(message: _131.IndexerOrderId): _131.IndexerOrderIdProtoMsg;
                };
                IndexerOrder: {
                    typeUrl: string;
                    is(o: any): o is _131.IndexerOrder;
                    isSDK(o: any): o is _131.IndexerOrderSDKType;
                    isAmino(o: any): o is _131.IndexerOrderAmino;
                    encode(message: _131.IndexerOrder, writer?: import("..").BinaryWriter): import("..").BinaryWriter;
                    decode(input: import("..").BinaryReader | Uint8Array, length?: number): _131.IndexerOrder;
                    fromPartial(object: Partial<_131.IndexerOrder>): _131.IndexerOrder;
                    fromAmino(object: _131.IndexerOrderAmino): _131.IndexerOrder;
                    toAmino(message: _131.IndexerOrder): _131.IndexerOrderAmino;
                    fromAminoMsg(object: _131.IndexerOrderAminoMsg): _131.IndexerOrder;
                    fromProtoMsg(message: _131.IndexerOrderProtoMsg): _131.IndexerOrder;
                    toProto(message: _131.IndexerOrder): Uint8Array;
                    toProtoMsg(message: _131.IndexerOrder): _131.IndexerOrderProtoMsg;
                };
            };
        }
        const redis: {
            redisOrder_TickerTypeFromJSON(object: any): _134.RedisOrder_TickerType;
            redisOrder_TickerTypeToJSON(object: _134.RedisOrder_TickerType): string;
            RedisOrder_TickerType: typeof _134.RedisOrder_TickerType;
            RedisOrder_TickerTypeSDKType: typeof _134.RedisOrder_TickerType;
            RedisOrder_TickerTypeAmino: typeof _134.RedisOrder_TickerType;
            RedisOrder: {
                typeUrl: string;
                is(o: any): o is _134.RedisOrder;
                isSDK(o: any): o is _134.RedisOrderSDKType;
                isAmino(o: any): o is _134.RedisOrderAmino;
                encode(message: _134.RedisOrder, writer?: import("..").BinaryWriter): import("..").BinaryWriter;
                decode(input: import("..").BinaryReader | Uint8Array, length?: number): _134.RedisOrder;
                fromPartial(object: Partial<_134.RedisOrder>): _134.RedisOrder;
                fromAmino(object: _134.RedisOrderAmino): _134.RedisOrder;
                toAmino(message: _134.RedisOrder): _134.RedisOrderAmino;
                fromAminoMsg(object: _134.RedisOrderAminoMsg): _134.RedisOrder;
                fromProtoMsg(message: _134.RedisOrderProtoMsg): _134.RedisOrder;
                toProto(message: _134.RedisOrder): Uint8Array;
                toProtoMsg(message: _134.RedisOrder): _134.RedisOrderProtoMsg;
            };
        };
        const shared: {
            orderRemovalReasonFromJSON(object: any): _135.OrderRemovalReason;
            orderRemovalReasonToJSON(object: _135.OrderRemovalReason): string;
            OrderRemovalReason: typeof _135.OrderRemovalReason;
            OrderRemovalReasonSDKType: typeof _135.OrderRemovalReason;
            OrderRemovalReasonAmino: typeof _135.OrderRemovalReason;
        };
        const socks: {
            candleMessage_ResolutionFromJSON(object: any): _136.CandleMessage_Resolution;
            candleMessage_ResolutionToJSON(object: _136.CandleMessage_Resolution): string;
            CandleMessage_Resolution: typeof _136.CandleMessage_Resolution;
            CandleMessage_ResolutionSDKType: typeof _136.CandleMessage_Resolution;
            CandleMessage_ResolutionAmino: typeof _136.CandleMessage_Resolution;
            OrderbookMessage: {
                typeUrl: string;
                is(o: any): o is _136.OrderbookMessage;
                isSDK(o: any): o is _136.OrderbookMessageSDKType;
                isAmino(o: any): o is _136.OrderbookMessageAmino;
                encode(message: _136.OrderbookMessage, writer?: import("..").BinaryWriter): import("..").BinaryWriter;
                decode(input: import("..").BinaryReader | Uint8Array, length?: number): _136.OrderbookMessage;
                fromPartial(object: Partial<_136.OrderbookMessage>): _136.OrderbookMessage;
                fromAmino(object: _136.OrderbookMessageAmino): _136.OrderbookMessage;
                toAmino(message: _136.OrderbookMessage): _136.OrderbookMessageAmino;
                fromAminoMsg(object: _136.OrderbookMessageAminoMsg): _136.OrderbookMessage;
                fromProtoMsg(message: _136.OrderbookMessageProtoMsg): _136.OrderbookMessage;
                toProto(message: _136.OrderbookMessage): Uint8Array;
                toProtoMsg(message: _136.OrderbookMessage): _136.OrderbookMessageProtoMsg;
            };
            SubaccountMessage: {
                typeUrl: string;
                is(o: any): o is _136.SubaccountMessage;
                isSDK(o: any): o is _136.SubaccountMessageSDKType;
                isAmino(o: any): o is _136.SubaccountMessageAmino;
                encode(message: _136.SubaccountMessage, writer?: import("..").BinaryWriter): import("..").BinaryWriter;
                decode(input: import("..").BinaryReader | Uint8Array, length?: number): _136.SubaccountMessage;
                fromPartial(object: Partial<_136.SubaccountMessage>): _136.SubaccountMessage;
                fromAmino(object: _136.SubaccountMessageAmino): _136.SubaccountMessage;
                toAmino(message: _136.SubaccountMessage): _136.SubaccountMessageAmino;
                fromAminoMsg(object: _136.SubaccountMessageAminoMsg): _136.SubaccountMessage;
                fromProtoMsg(message: _136.SubaccountMessageProtoMsg): _136.SubaccountMessage;
                toProto(message: _136.SubaccountMessage): Uint8Array;
                toProtoMsg(message: _136.SubaccountMessage): _136.SubaccountMessageProtoMsg;
            };
            TradeMessage: {
                typeUrl: string;
                is(o: any): o is _136.TradeMessage;
                isSDK(o: any): o is _136.TradeMessageSDKType;
                isAmino(o: any): o is _136.TradeMessageAmino;
                encode(message: _136.TradeMessage, writer?: import("..").BinaryWriter): import("..").BinaryWriter;
                decode(input: import("..").BinaryReader | Uint8Array, length?: number): _136.TradeMessage;
                fromPartial(object: Partial<_136.TradeMessage>): _136.TradeMessage;
                fromAmino(object: _136.TradeMessageAmino): _136.TradeMessage;
                toAmino(message: _136.TradeMessage): _136.TradeMessageAmino;
                fromAminoMsg(object: _136.TradeMessageAminoMsg): _136.TradeMessage;
                fromProtoMsg(message: _136.TradeMessageProtoMsg): _136.TradeMessage;
                toProto(message: _136.TradeMessage): Uint8Array;
                toProtoMsg(message: _136.TradeMessage): _136.TradeMessageProtoMsg;
            };
            MarketMessage: {
                typeUrl: string;
                is(o: any): o is _136.MarketMessage;
                isSDK(o: any): o is _136.MarketMessageSDKType;
                isAmino(o: any): o is _136.MarketMessageAmino;
                encode(message: _136.MarketMessage, writer?: import("..").BinaryWriter): import("..").BinaryWriter;
                decode(input: import("..").BinaryReader | Uint8Array, length?: number): _136.MarketMessage;
                fromPartial(object: Partial<_136.MarketMessage>): _136.MarketMessage;
                fromAmino(object: _136.MarketMessageAmino): _136.MarketMessage;
                toAmino(message: _136.MarketMessage): _136.MarketMessageAmino;
                fromAminoMsg(object: _136.MarketMessageAminoMsg): _136.MarketMessage;
                fromProtoMsg(message: _136.MarketMessageProtoMsg): _136.MarketMessage;
                toProto(message: _136.MarketMessage): Uint8Array;
                toProtoMsg(message: _136.MarketMessage): _136.MarketMessageProtoMsg;
            };
            CandleMessage: {
                typeUrl: string;
                is(o: any): o is _136.CandleMessage;
                isSDK(o: any): o is _136.CandleMessageSDKType;
                isAmino(o: any): o is _136.CandleMessageAmino;
                encode(message: _136.CandleMessage, writer?: import("..").BinaryWriter): import("..").BinaryWriter;
                decode(input: import("..").BinaryReader | Uint8Array, length?: number): _136.CandleMessage;
                fromPartial(object: Partial<_136.CandleMessage>): _136.CandleMessage;
                fromAmino(object: _136.CandleMessageAmino): _136.CandleMessage;
                toAmino(message: _136.CandleMessage): _136.CandleMessageAmino;
                fromAminoMsg(object: _136.CandleMessageAminoMsg): _136.CandleMessage;
                fromProtoMsg(message: _136.CandleMessageProtoMsg): _136.CandleMessage;
                toProto(message: _136.CandleMessage): Uint8Array;
                toProtoMsg(message: _136.CandleMessage): _136.CandleMessageProtoMsg;
            };
        };
    }
    const perpetuals: {
        MsgClientImpl: typeof _290.MsgClientImpl;
        createClientImpl: (rpc: import("../helpers").Rpc) => _290.MsgClientImpl;
        QueryClientImpl: typeof _279.QueryClientImpl;
        createRpcQueryExtension: (base: import("@cosmjs/stargate").QueryClient) => {
            perpetual(request: _140.QueryPerpetualRequest): Promise<_140.QueryPerpetualResponse>;
            allPerpetuals(request?: _140.QueryAllPerpetualsRequest): Promise<_140.QueryAllPerpetualsResponse>;
            allLiquidityTiers(request?: _140.QueryAllLiquidityTiersRequest): Promise<_140.QueryAllLiquidityTiersResponse>;
            premiumVotes(request?: _140.QueryPremiumVotesRequest): Promise<_140.QueryPremiumVotesResponse>;
            premiumSamples(request?: _140.QueryPremiumSamplesRequest): Promise<_140.QueryPremiumSamplesResponse>;
            params(request?: _140.QueryParamsRequest): Promise<_140.QueryParamsResponse>;
        };
        LCDQueryClient: typeof _267.LCDQueryClient;
        registry: ReadonlyArray<[string, import("@cosmjs/proto-signing").GeneratedType]>;
        load: (protoRegistry: import("@cosmjs/proto-signing").Registry) => void;
        MessageComposer: {
            encoded: {
                addPremiumVotes(value: _141.MsgAddPremiumVotes): {
                    typeUrl: string;
                    value: Uint8Array<ArrayBufferLike>;
                };
                createPerpetual(value: _141.MsgCreatePerpetual): {
                    typeUrl: string;
                    value: Uint8Array<ArrayBufferLike>;
                };
                setLiquidityTier(value: _141.MsgSetLiquidityTier): {
                    typeUrl: string;
                    value: Uint8Array<ArrayBufferLike>;
                };
                updatePerpetualParams(value: _141.MsgUpdatePerpetualParams): {
                    typeUrl: string;
                    value: Uint8Array<ArrayBufferLike>;
                };
                updateParams(value: _141.MsgUpdateParams): {
                    typeUrl: string;
                    value: Uint8Array<ArrayBufferLike>;
                };
            };
            withTypeUrl: {
                addPremiumVotes(value: _141.MsgAddPremiumVotes): {
                    typeUrl: string;
                    value: _141.MsgAddPremiumVotes;
                };
                createPerpetual(value: _141.MsgCreatePerpetual): {
                    typeUrl: string;
                    value: _141.MsgCreatePerpetual;
                };
                setLiquidityTier(value: _141.MsgSetLiquidityTier): {
                    typeUrl: string;
                    value: _141.MsgSetLiquidityTier;
                };
                updatePerpetualParams(value: _141.MsgUpdatePerpetualParams): {
                    typeUrl: string;
                    value: _141.MsgUpdatePerpetualParams;
                };
                updateParams(value: _141.MsgUpdateParams): {
                    typeUrl: string;
                    value: _141.MsgUpdateParams;
                };
            };
            fromPartial: {
                addPremiumVotes(value: _141.MsgAddPremiumVotes): {
                    typeUrl: string;
                    value: _141.MsgAddPremiumVotes;
                };
                createPerpetual(value: _141.MsgCreatePerpetual): {
                    typeUrl: string;
                    value: _141.MsgCreatePerpetual;
                };
                setLiquidityTier(value: _141.MsgSetLiquidityTier): {
                    typeUrl: string;
                    value: _141.MsgSetLiquidityTier;
                };
                updatePerpetualParams(value: _141.MsgUpdatePerpetualParams): {
                    typeUrl: string;
                    value: _141.MsgUpdatePerpetualParams;
                };
                updateParams(value: _141.MsgUpdateParams): {
                    typeUrl: string;
                    value: _141.MsgUpdateParams;
                };
            };
        };
        AminoConverter: {
            "/klyraprotocol.perpetuals.MsgAddPremiumVotes": {
                aminoType: string;
                toAmino: (message: _141.MsgAddPremiumVotes) => _141.MsgAddPremiumVotesAmino;
                fromAmino: (object: _141.MsgAddPremiumVotesAmino) => _141.MsgAddPremiumVotes;
            };
            "/klyraprotocol.perpetuals.MsgCreatePerpetual": {
                aminoType: string;
                toAmino: (message: _141.MsgCreatePerpetual) => _141.MsgCreatePerpetualAmino;
                fromAmino: (object: _141.MsgCreatePerpetualAmino) => _141.MsgCreatePerpetual;
            };
            "/klyraprotocol.perpetuals.MsgSetLiquidityTier": {
                aminoType: string;
                toAmino: (message: _141.MsgSetLiquidityTier) => _141.MsgSetLiquidityTierAmino;
                fromAmino: (object: _141.MsgSetLiquidityTierAmino) => _141.MsgSetLiquidityTier;
            };
            "/klyraprotocol.perpetuals.MsgUpdatePerpetualParams": {
                aminoType: string;
                toAmino: (message: _141.MsgUpdatePerpetualParams) => _141.MsgUpdatePerpetualParamsAmino;
                fromAmino: (object: _141.MsgUpdatePerpetualParamsAmino) => _141.MsgUpdatePerpetualParams;
            };
            "/klyraprotocol.perpetuals.MsgUpdateParams": {
                aminoType: string;
                toAmino: (message: _141.MsgUpdateParams) => _141.MsgUpdateParamsAmino;
                fromAmino: (object: _141.MsgUpdateParamsAmino) => _141.MsgUpdateParams;
            };
        };
        MsgCreatePerpetual: {
            typeUrl: string;
            is(o: any): o is _141.MsgCreatePerpetual;
            isSDK(o: any): o is _141.MsgCreatePerpetualSDKType;
            isAmino(o: any): o is _141.MsgCreatePerpetualAmino;
            encode(message: _141.MsgCreatePerpetual, writer?: import("..").BinaryWriter): import("..").BinaryWriter;
            decode(input: import("..").BinaryReader | Uint8Array, length?: number): _141.MsgCreatePerpetual;
            fromPartial(object: Partial<_141.MsgCreatePerpetual>): _141.MsgCreatePerpetual;
            fromAmino(object: _141.MsgCreatePerpetualAmino): _141.MsgCreatePerpetual;
            toAmino(message: _141.MsgCreatePerpetual): _141.MsgCreatePerpetualAmino;
            fromAminoMsg(object: _141.MsgCreatePerpetualAminoMsg): _141.MsgCreatePerpetual;
            fromProtoMsg(message: _141.MsgCreatePerpetualProtoMsg): _141.MsgCreatePerpetual;
            toProto(message: _141.MsgCreatePerpetual): Uint8Array;
            toProtoMsg(message: _141.MsgCreatePerpetual): _141.MsgCreatePerpetualProtoMsg;
        };
        MsgCreatePerpetualResponse: {
            typeUrl: string;
            is(o: any): o is _141.MsgCreatePerpetualResponse;
            isSDK(o: any): o is _141.MsgCreatePerpetualResponseSDKType;
            isAmino(o: any): o is _141.MsgCreatePerpetualResponseAmino;
            encode(_: _141.MsgCreatePerpetualResponse, writer?: import("..").BinaryWriter): import("..").BinaryWriter;
            decode(input: import("..").BinaryReader | Uint8Array, length?: number): _141.MsgCreatePerpetualResponse;
            fromPartial(_: Partial<_141.MsgCreatePerpetualResponse>): _141.MsgCreatePerpetualResponse;
            fromAmino(_: _141.MsgCreatePerpetualResponseAmino): _141.MsgCreatePerpetualResponse;
            toAmino(_: _141.MsgCreatePerpetualResponse): _141.MsgCreatePerpetualResponseAmino;
            fromAminoMsg(object: _141.MsgCreatePerpetualResponseAminoMsg): _141.MsgCreatePerpetualResponse;
            fromProtoMsg(message: _141.MsgCreatePerpetualResponseProtoMsg): _141.MsgCreatePerpetualResponse;
            toProto(message: _141.MsgCreatePerpetualResponse): Uint8Array;
            toProtoMsg(message: _141.MsgCreatePerpetualResponse): _141.MsgCreatePerpetualResponseProtoMsg;
        };
        MsgSetLiquidityTier: {
            typeUrl: string;
            is(o: any): o is _141.MsgSetLiquidityTier;
            isSDK(o: any): o is _141.MsgSetLiquidityTierSDKType;
            isAmino(o: any): o is _141.MsgSetLiquidityTierAmino;
            encode(message: _141.MsgSetLiquidityTier, writer?: import("..").BinaryWriter): import("..").BinaryWriter;
            decode(input: import("..").BinaryReader | Uint8Array, length?: number): _141.MsgSetLiquidityTier;
            fromPartial(object: Partial<_141.MsgSetLiquidityTier>): _141.MsgSetLiquidityTier;
            fromAmino(object: _141.MsgSetLiquidityTierAmino): _141.MsgSetLiquidityTier;
            toAmino(message: _141.MsgSetLiquidityTier): _141.MsgSetLiquidityTierAmino;
            fromAminoMsg(object: _141.MsgSetLiquidityTierAminoMsg): _141.MsgSetLiquidityTier;
            fromProtoMsg(message: _141.MsgSetLiquidityTierProtoMsg): _141.MsgSetLiquidityTier;
            toProto(message: _141.MsgSetLiquidityTier): Uint8Array;
            toProtoMsg(message: _141.MsgSetLiquidityTier): _141.MsgSetLiquidityTierProtoMsg;
        };
        MsgSetLiquidityTierResponse: {
            typeUrl: string;
            is(o: any): o is _141.MsgSetLiquidityTierResponse;
            isSDK(o: any): o is _141.MsgSetLiquidityTierResponseSDKType;
            isAmino(o: any): o is _141.MsgSetLiquidityTierResponseAmino;
            encode(_: _141.MsgSetLiquidityTierResponse, writer?: import("..").BinaryWriter): import("..").BinaryWriter;
            decode(input: import("..").BinaryReader | Uint8Array, length?: number): _141.MsgSetLiquidityTierResponse;
            fromPartial(_: Partial<_141.MsgSetLiquidityTierResponse>): _141.MsgSetLiquidityTierResponse;
            fromAmino(_: _141.MsgSetLiquidityTierResponseAmino): _141.MsgSetLiquidityTierResponse;
            toAmino(_: _141.MsgSetLiquidityTierResponse): _141.MsgSetLiquidityTierResponseAmino;
            fromAminoMsg(object: _141.MsgSetLiquidityTierResponseAminoMsg): _141.MsgSetLiquidityTierResponse;
            fromProtoMsg(message: _141.MsgSetLiquidityTierResponseProtoMsg): _141.MsgSetLiquidityTierResponse;
            toProto(message: _141.MsgSetLiquidityTierResponse): Uint8Array;
            toProtoMsg(message: _141.MsgSetLiquidityTierResponse): _141.MsgSetLiquidityTierResponseProtoMsg;
        };
        MsgUpdatePerpetualParams: {
            typeUrl: string;
            is(o: any): o is _141.MsgUpdatePerpetualParams;
            isSDK(o: any): o is _141.MsgUpdatePerpetualParamsSDKType;
            isAmino(o: any): o is _141.MsgUpdatePerpetualParamsAmino;
            encode(message: _141.MsgUpdatePerpetualParams, writer?: import("..").BinaryWriter): import("..").BinaryWriter;
            decode(input: import("..").BinaryReader | Uint8Array, length?: number): _141.MsgUpdatePerpetualParams;
            fromPartial(object: Partial<_141.MsgUpdatePerpetualParams>): _141.MsgUpdatePerpetualParams;
            fromAmino(object: _141.MsgUpdatePerpetualParamsAmino): _141.MsgUpdatePerpetualParams;
            toAmino(message: _141.MsgUpdatePerpetualParams): _141.MsgUpdatePerpetualParamsAmino;
            fromAminoMsg(object: _141.MsgUpdatePerpetualParamsAminoMsg): _141.MsgUpdatePerpetualParams;
            fromProtoMsg(message: _141.MsgUpdatePerpetualParamsProtoMsg): _141.MsgUpdatePerpetualParams;
            toProto(message: _141.MsgUpdatePerpetualParams): Uint8Array;
            toProtoMsg(message: _141.MsgUpdatePerpetualParams): _141.MsgUpdatePerpetualParamsProtoMsg;
        };
        MsgUpdatePerpetualParamsResponse: {
            typeUrl: string;
            is(o: any): o is _141.MsgUpdatePerpetualParamsResponse;
            isSDK(o: any): o is _141.MsgUpdatePerpetualParamsResponseSDKType;
            isAmino(o: any): o is _141.MsgUpdatePerpetualParamsResponseAmino;
            encode(_: _141.MsgUpdatePerpetualParamsResponse, writer?: import("..").BinaryWriter): import("..").BinaryWriter;
            decode(input: import("..").BinaryReader | Uint8Array, length?: number): _141.MsgUpdatePerpetualParamsResponse;
            fromPartial(_: Partial<_141.MsgUpdatePerpetualParamsResponse>): _141.MsgUpdatePerpetualParamsResponse;
            fromAmino(_: _141.MsgUpdatePerpetualParamsResponseAmino): _141.MsgUpdatePerpetualParamsResponse;
            toAmino(_: _141.MsgUpdatePerpetualParamsResponse): _141.MsgUpdatePerpetualParamsResponseAmino;
            fromAminoMsg(object: _141.MsgUpdatePerpetualParamsResponseAminoMsg): _141.MsgUpdatePerpetualParamsResponse;
            fromProtoMsg(message: _141.MsgUpdatePerpetualParamsResponseProtoMsg): _141.MsgUpdatePerpetualParamsResponse;
            toProto(message: _141.MsgUpdatePerpetualParamsResponse): Uint8Array;
            toProtoMsg(message: _141.MsgUpdatePerpetualParamsResponse): _141.MsgUpdatePerpetualParamsResponseProtoMsg;
        };
        FundingPremium: {
            typeUrl: string;
            is(o: any): o is _141.FundingPremium;
            isSDK(o: any): o is _141.FundingPremiumSDKType;
            isAmino(o: any): o is _141.FundingPremiumAmino;
            encode(message: _141.FundingPremium, writer?: import("..").BinaryWriter): import("..").BinaryWriter;
            decode(input: import("..").BinaryReader | Uint8Array, length?: number): _141.FundingPremium;
            fromPartial(object: Partial<_141.FundingPremium>): _141.FundingPremium;
            fromAmino(object: _141.FundingPremiumAmino): _141.FundingPremium;
            toAmino(message: _141.FundingPremium): _141.FundingPremiumAmino;
            fromAminoMsg(object: _141.FundingPremiumAminoMsg): _141.FundingPremium;
            fromProtoMsg(message: _141.FundingPremiumProtoMsg): _141.FundingPremium;
            toProto(message: _141.FundingPremium): Uint8Array;
            toProtoMsg(message: _141.FundingPremium): _141.FundingPremiumProtoMsg;
        };
        MsgAddPremiumVotes: {
            typeUrl: string;
            is(o: any): o is _141.MsgAddPremiumVotes;
            isSDK(o: any): o is _141.MsgAddPremiumVotesSDKType;
            isAmino(o: any): o is _141.MsgAddPremiumVotesAmino;
            encode(message: _141.MsgAddPremiumVotes, writer?: import("..").BinaryWriter): import("..").BinaryWriter;
            decode(input: import("..").BinaryReader | Uint8Array, length?: number): _141.MsgAddPremiumVotes;
            fromPartial(object: Partial<_141.MsgAddPremiumVotes>): _141.MsgAddPremiumVotes;
            fromAmino(object: _141.MsgAddPremiumVotesAmino): _141.MsgAddPremiumVotes;
            toAmino(message: _141.MsgAddPremiumVotes): _141.MsgAddPremiumVotesAmino;
            fromAminoMsg(object: _141.MsgAddPremiumVotesAminoMsg): _141.MsgAddPremiumVotes;
            fromProtoMsg(message: _141.MsgAddPremiumVotesProtoMsg): _141.MsgAddPremiumVotes;
            toProto(message: _141.MsgAddPremiumVotes): Uint8Array;
            toProtoMsg(message: _141.MsgAddPremiumVotes): _141.MsgAddPremiumVotesProtoMsg;
        };
        MsgAddPremiumVotesResponse: {
            typeUrl: string;
            is(o: any): o is _141.MsgAddPremiumVotesResponse;
            isSDK(o: any): o is _141.MsgAddPremiumVotesResponseSDKType;
            isAmino(o: any): o is _141.MsgAddPremiumVotesResponseAmino;
            encode(_: _141.MsgAddPremiumVotesResponse, writer?: import("..").BinaryWriter): import("..").BinaryWriter;
            decode(input: import("..").BinaryReader | Uint8Array, length?: number): _141.MsgAddPremiumVotesResponse;
            fromPartial(_: Partial<_141.MsgAddPremiumVotesResponse>): _141.MsgAddPremiumVotesResponse;
            fromAmino(_: _141.MsgAddPremiumVotesResponseAmino): _141.MsgAddPremiumVotesResponse;
            toAmino(_: _141.MsgAddPremiumVotesResponse): _141.MsgAddPremiumVotesResponseAmino;
            fromAminoMsg(object: _141.MsgAddPremiumVotesResponseAminoMsg): _141.MsgAddPremiumVotesResponse;
            fromProtoMsg(message: _141.MsgAddPremiumVotesResponseProtoMsg): _141.MsgAddPremiumVotesResponse;
            toProto(message: _141.MsgAddPremiumVotesResponse): Uint8Array;
            toProtoMsg(message: _141.MsgAddPremiumVotesResponse): _141.MsgAddPremiumVotesResponseProtoMsg;
        };
        MsgUpdateParams: {
            typeUrl: string;
            is(o: any): o is _141.MsgUpdateParams;
            isSDK(o: any): o is _141.MsgUpdateParamsSDKType;
            isAmino(o: any): o is _141.MsgUpdateParamsAmino;
            encode(message: _141.MsgUpdateParams, writer?: import("..").BinaryWriter): import("..").BinaryWriter;
            decode(input: import("..").BinaryReader | Uint8Array, length?: number): _141.MsgUpdateParams;
            fromPartial(object: Partial<_141.MsgUpdateParams>): _141.MsgUpdateParams;
            fromAmino(object: _141.MsgUpdateParamsAmino): _141.MsgUpdateParams;
            toAmino(message: _141.MsgUpdateParams): _141.MsgUpdateParamsAmino;
            fromAminoMsg(object: _141.MsgUpdateParamsAminoMsg): _141.MsgUpdateParams;
            fromProtoMsg(message: _141.MsgUpdateParamsProtoMsg): _141.MsgUpdateParams;
            toProto(message: _141.MsgUpdateParams): Uint8Array;
            toProtoMsg(message: _141.MsgUpdateParams): _141.MsgUpdateParamsProtoMsg;
        };
        MsgUpdateParamsResponse: {
            typeUrl: string;
            is(o: any): o is _141.MsgUpdateParamsResponse;
            isSDK(o: any): o is _141.MsgUpdateParamsResponseSDKType;
            isAmino(o: any): o is _141.MsgUpdateParamsResponseAmino;
            encode(_: _141.MsgUpdateParamsResponse, writer?: import("..").BinaryWriter): import("..").BinaryWriter;
            decode(input: import("..").BinaryReader | Uint8Array, length?: number): _141.MsgUpdateParamsResponse;
            fromPartial(_: Partial<_141.MsgUpdateParamsResponse>): _141.MsgUpdateParamsResponse;
            fromAmino(_: _141.MsgUpdateParamsResponseAmino): _141.MsgUpdateParamsResponse;
            toAmino(_: _141.MsgUpdateParamsResponse): _141.MsgUpdateParamsResponseAmino;
            fromAminoMsg(object: _141.MsgUpdateParamsResponseAminoMsg): _141.MsgUpdateParamsResponse;
            fromProtoMsg(message: _141.MsgUpdateParamsResponseProtoMsg): _141.MsgUpdateParamsResponse;
            toProto(message: _141.MsgUpdateParamsResponse): Uint8Array;
            toProtoMsg(message: _141.MsgUpdateParamsResponse): _141.MsgUpdateParamsResponseProtoMsg;
        };
        QueryPerpetualRequest: {
            typeUrl: string;
            is(o: any): o is _140.QueryPerpetualRequest;
            isSDK(o: any): o is _140.QueryPerpetualRequestSDKType;
            isAmino(o: any): o is _140.QueryPerpetualRequestAmino;
            encode(message: _140.QueryPerpetualRequest, writer?: import("..").BinaryWriter): import("..").BinaryWriter;
            decode(input: import("..").BinaryReader | Uint8Array, length?: number): _140.QueryPerpetualRequest;
            fromPartial(object: Partial<_140.QueryPerpetualRequest>): _140.QueryPerpetualRequest;
            fromAmino(object: _140.QueryPerpetualRequestAmino): _140.QueryPerpetualRequest;
            toAmino(message: _140.QueryPerpetualRequest): _140.QueryPerpetualRequestAmino;
            fromAminoMsg(object: _140.QueryPerpetualRequestAminoMsg): _140.QueryPerpetualRequest;
            fromProtoMsg(message: _140.QueryPerpetualRequestProtoMsg): _140.QueryPerpetualRequest;
            toProto(message: _140.QueryPerpetualRequest): Uint8Array;
            toProtoMsg(message: _140.QueryPerpetualRequest): _140.QueryPerpetualRequestProtoMsg;
        };
        QueryPerpetualResponse: {
            typeUrl: string;
            is(o: any): o is _140.QueryPerpetualResponse;
            isSDK(o: any): o is _140.QueryPerpetualResponseSDKType;
            isAmino(o: any): o is _140.QueryPerpetualResponseAmino;
            encode(message: _140.QueryPerpetualResponse, writer?: import("..").BinaryWriter): import("..").BinaryWriter;
            decode(input: import("..").BinaryReader | Uint8Array, length?: number): _140.QueryPerpetualResponse;
            fromPartial(object: Partial<_140.QueryPerpetualResponse>): _140.QueryPerpetualResponse;
            fromAmino(object: _140.QueryPerpetualResponseAmino): _140.QueryPerpetualResponse;
            toAmino(message: _140.QueryPerpetualResponse): _140.QueryPerpetualResponseAmino;
            fromAminoMsg(object: _140.QueryPerpetualResponseAminoMsg): _140.QueryPerpetualResponse;
            fromProtoMsg(message: _140.QueryPerpetualResponseProtoMsg): _140.QueryPerpetualResponse;
            toProto(message: _140.QueryPerpetualResponse): Uint8Array;
            toProtoMsg(message: _140.QueryPerpetualResponse): _140.QueryPerpetualResponseProtoMsg;
        };
        QueryAllPerpetualsRequest: {
            typeUrl: string;
            is(o: any): o is _140.QueryAllPerpetualsRequest;
            isSDK(o: any): o is _140.QueryAllPerpetualsRequestSDKType;
            isAmino(o: any): o is _140.QueryAllPerpetualsRequestAmino;
            encode(message: _140.QueryAllPerpetualsRequest, writer?: import("..").BinaryWriter): import("..").BinaryWriter;
            decode(input: import("..").BinaryReader | Uint8Array, length?: number): _140.QueryAllPerpetualsRequest;
            fromPartial(object: Partial<_140.QueryAllPerpetualsRequest>): _140.QueryAllPerpetualsRequest;
            fromAmino(object: _140.QueryAllPerpetualsRequestAmino): _140.QueryAllPerpetualsRequest;
            toAmino(message: _140.QueryAllPerpetualsRequest): _140.QueryAllPerpetualsRequestAmino;
            fromAminoMsg(object: _140.QueryAllPerpetualsRequestAminoMsg): _140.QueryAllPerpetualsRequest;
            fromProtoMsg(message: _140.QueryAllPerpetualsRequestProtoMsg): _140.QueryAllPerpetualsRequest;
            toProto(message: _140.QueryAllPerpetualsRequest): Uint8Array;
            toProtoMsg(message: _140.QueryAllPerpetualsRequest): _140.QueryAllPerpetualsRequestProtoMsg;
        };
        QueryAllPerpetualsResponse: {
            typeUrl: string;
            is(o: any): o is _140.QueryAllPerpetualsResponse;
            isSDK(o: any): o is _140.QueryAllPerpetualsResponseSDKType;
            isAmino(o: any): o is _140.QueryAllPerpetualsResponseAmino;
            encode(message: _140.QueryAllPerpetualsResponse, writer?: import("..").BinaryWriter): import("..").BinaryWriter;
            decode(input: import("..").BinaryReader | Uint8Array, length?: number): _140.QueryAllPerpetualsResponse;
            fromPartial(object: Partial<_140.QueryAllPerpetualsResponse>): _140.QueryAllPerpetualsResponse;
            fromAmino(object: _140.QueryAllPerpetualsResponseAmino): _140.QueryAllPerpetualsResponse;
            toAmino(message: _140.QueryAllPerpetualsResponse): _140.QueryAllPerpetualsResponseAmino;
            fromAminoMsg(object: _140.QueryAllPerpetualsResponseAminoMsg): _140.QueryAllPerpetualsResponse;
            fromProtoMsg(message: _140.QueryAllPerpetualsResponseProtoMsg): _140.QueryAllPerpetualsResponse;
            toProto(message: _140.QueryAllPerpetualsResponse): Uint8Array;
            toProtoMsg(message: _140.QueryAllPerpetualsResponse): _140.QueryAllPerpetualsResponseProtoMsg;
        };
        QueryAllLiquidityTiersRequest: {
            typeUrl: string;
            is(o: any): o is _140.QueryAllLiquidityTiersRequest;
            isSDK(o: any): o is _140.QueryAllLiquidityTiersRequestSDKType;
            isAmino(o: any): o is _140.QueryAllLiquidityTiersRequestAmino;
            encode(message: _140.QueryAllLiquidityTiersRequest, writer?: import("..").BinaryWriter): import("..").BinaryWriter;
            decode(input: import("..").BinaryReader | Uint8Array, length?: number): _140.QueryAllLiquidityTiersRequest;
            fromPartial(object: Partial<_140.QueryAllLiquidityTiersRequest>): _140.QueryAllLiquidityTiersRequest;
            fromAmino(object: _140.QueryAllLiquidityTiersRequestAmino): _140.QueryAllLiquidityTiersRequest;
            toAmino(message: _140.QueryAllLiquidityTiersRequest): _140.QueryAllLiquidityTiersRequestAmino;
            fromAminoMsg(object: _140.QueryAllLiquidityTiersRequestAminoMsg): _140.QueryAllLiquidityTiersRequest;
            fromProtoMsg(message: _140.QueryAllLiquidityTiersRequestProtoMsg): _140.QueryAllLiquidityTiersRequest;
            toProto(message: _140.QueryAllLiquidityTiersRequest): Uint8Array;
            toProtoMsg(message: _140.QueryAllLiquidityTiersRequest): _140.QueryAllLiquidityTiersRequestProtoMsg;
        };
        QueryAllLiquidityTiersResponse: {
            typeUrl: string;
            is(o: any): o is _140.QueryAllLiquidityTiersResponse;
            isSDK(o: any): o is _140.QueryAllLiquidityTiersResponseSDKType;
            isAmino(o: any): o is _140.QueryAllLiquidityTiersResponseAmino;
            encode(message: _140.QueryAllLiquidityTiersResponse, writer?: import("..").BinaryWriter): import("..").BinaryWriter;
            decode(input: import("..").BinaryReader | Uint8Array, length?: number): _140.QueryAllLiquidityTiersResponse;
            fromPartial(object: Partial<_140.QueryAllLiquidityTiersResponse>): _140.QueryAllLiquidityTiersResponse;
            fromAmino(object: _140.QueryAllLiquidityTiersResponseAmino): _140.QueryAllLiquidityTiersResponse;
            toAmino(message: _140.QueryAllLiquidityTiersResponse): _140.QueryAllLiquidityTiersResponseAmino;
            fromAminoMsg(object: _140.QueryAllLiquidityTiersResponseAminoMsg): _140.QueryAllLiquidityTiersResponse;
            fromProtoMsg(message: _140.QueryAllLiquidityTiersResponseProtoMsg): _140.QueryAllLiquidityTiersResponse;
            toProto(message: _140.QueryAllLiquidityTiersResponse): Uint8Array;
            toProtoMsg(message: _140.QueryAllLiquidityTiersResponse): _140.QueryAllLiquidityTiersResponseProtoMsg;
        };
        QueryPremiumVotesRequest: {
            typeUrl: string;
            is(o: any): o is _140.QueryPremiumVotesRequest;
            isSDK(o: any): o is _140.QueryPremiumVotesRequestSDKType;
            isAmino(o: any): o is _140.QueryPremiumVotesRequestAmino;
            encode(_: _140.QueryPremiumVotesRequest, writer?: import("..").BinaryWriter): import("..").BinaryWriter;
            decode(input: import("..").BinaryReader | Uint8Array, length?: number): _140.QueryPremiumVotesRequest;
            fromPartial(_: Partial<_140.QueryPremiumVotesRequest>): _140.QueryPremiumVotesRequest;
            fromAmino(_: _140.QueryPremiumVotesRequestAmino): _140.QueryPremiumVotesRequest;
            toAmino(_: _140.QueryPremiumVotesRequest): _140.QueryPremiumVotesRequestAmino;
            fromAminoMsg(object: _140.QueryPremiumVotesRequestAminoMsg): _140.QueryPremiumVotesRequest;
            fromProtoMsg(message: _140.QueryPremiumVotesRequestProtoMsg): _140.QueryPremiumVotesRequest;
            toProto(message: _140.QueryPremiumVotesRequest): Uint8Array;
            toProtoMsg(message: _140.QueryPremiumVotesRequest): _140.QueryPremiumVotesRequestProtoMsg;
        };
        QueryPremiumVotesResponse: {
            typeUrl: string;
            is(o: any): o is _140.QueryPremiumVotesResponse;
            isSDK(o: any): o is _140.QueryPremiumVotesResponseSDKType;
            isAmino(o: any): o is _140.QueryPremiumVotesResponseAmino;
            encode(message: _140.QueryPremiumVotesResponse, writer?: import("..").BinaryWriter): import("..").BinaryWriter;
            decode(input: import("..").BinaryReader | Uint8Array, length?: number): _140.QueryPremiumVotesResponse;
            fromPartial(object: Partial<_140.QueryPremiumVotesResponse>): _140.QueryPremiumVotesResponse;
            fromAmino(object: _140.QueryPremiumVotesResponseAmino): _140.QueryPremiumVotesResponse;
            toAmino(message: _140.QueryPremiumVotesResponse): _140.QueryPremiumVotesResponseAmino;
            fromAminoMsg(object: _140.QueryPremiumVotesResponseAminoMsg): _140.QueryPremiumVotesResponse;
            fromProtoMsg(message: _140.QueryPremiumVotesResponseProtoMsg): _140.QueryPremiumVotesResponse;
            toProto(message: _140.QueryPremiumVotesResponse): Uint8Array;
            toProtoMsg(message: _140.QueryPremiumVotesResponse): _140.QueryPremiumVotesResponseProtoMsg;
        };
        QueryPremiumSamplesRequest: {
            typeUrl: string;
            is(o: any): o is _140.QueryPremiumSamplesRequest;
            isSDK(o: any): o is _140.QueryPremiumSamplesRequestSDKType;
            isAmino(o: any): o is _140.QueryPremiumSamplesRequestAmino;
            encode(_: _140.QueryPremiumSamplesRequest, writer?: import("..").BinaryWriter): import("..").BinaryWriter;
            decode(input: import("..").BinaryReader | Uint8Array, length?: number): _140.QueryPremiumSamplesRequest;
            fromPartial(_: Partial<_140.QueryPremiumSamplesRequest>): _140.QueryPremiumSamplesRequest;
            fromAmino(_: _140.QueryPremiumSamplesRequestAmino): _140.QueryPremiumSamplesRequest;
            toAmino(_: _140.QueryPremiumSamplesRequest): _140.QueryPremiumSamplesRequestAmino;
            fromAminoMsg(object: _140.QueryPremiumSamplesRequestAminoMsg): _140.QueryPremiumSamplesRequest;
            fromProtoMsg(message: _140.QueryPremiumSamplesRequestProtoMsg): _140.QueryPremiumSamplesRequest;
            toProto(message: _140.QueryPremiumSamplesRequest): Uint8Array;
            toProtoMsg(message: _140.QueryPremiumSamplesRequest): _140.QueryPremiumSamplesRequestProtoMsg;
        };
        QueryPremiumSamplesResponse: {
            typeUrl: string;
            is(o: any): o is _140.QueryPremiumSamplesResponse;
            isSDK(o: any): o is _140.QueryPremiumSamplesResponseSDKType;
            isAmino(o: any): o is _140.QueryPremiumSamplesResponseAmino;
            encode(message: _140.QueryPremiumSamplesResponse, writer?: import("..").BinaryWriter): import("..").BinaryWriter;
            decode(input: import("..").BinaryReader | Uint8Array, length?: number): _140.QueryPremiumSamplesResponse;
            fromPartial(object: Partial<_140.QueryPremiumSamplesResponse>): _140.QueryPremiumSamplesResponse;
            fromAmino(object: _140.QueryPremiumSamplesResponseAmino): _140.QueryPremiumSamplesResponse;
            toAmino(message: _140.QueryPremiumSamplesResponse): _140.QueryPremiumSamplesResponseAmino;
            fromAminoMsg(object: _140.QueryPremiumSamplesResponseAminoMsg): _140.QueryPremiumSamplesResponse;
            fromProtoMsg(message: _140.QueryPremiumSamplesResponseProtoMsg): _140.QueryPremiumSamplesResponse;
            toProto(message: _140.QueryPremiumSamplesResponse): Uint8Array;
            toProtoMsg(message: _140.QueryPremiumSamplesResponse): _140.QueryPremiumSamplesResponseProtoMsg;
        };
        QueryParamsRequest: {
            typeUrl: string;
            is(o: any): o is _140.QueryParamsRequest;
            isSDK(o: any): o is _140.QueryParamsRequestSDKType;
            isAmino(o: any): o is _140.QueryParamsRequestAmino;
            encode(_: _140.QueryParamsRequest, writer?: import("..").BinaryWriter): import("..").BinaryWriter;
            decode(input: import("..").BinaryReader | Uint8Array, length?: number): _140.QueryParamsRequest;
            fromPartial(_: Partial<_140.QueryParamsRequest>): _140.QueryParamsRequest;
            fromAmino(_: _140.QueryParamsRequestAmino): _140.QueryParamsRequest;
            toAmino(_: _140.QueryParamsRequest): _140.QueryParamsRequestAmino;
            fromAminoMsg(object: _140.QueryParamsRequestAminoMsg): _140.QueryParamsRequest;
            fromProtoMsg(message: _140.QueryParamsRequestProtoMsg): _140.QueryParamsRequest;
            toProto(message: _140.QueryParamsRequest): Uint8Array;
            toProtoMsg(message: _140.QueryParamsRequest): _140.QueryParamsRequestProtoMsg;
        };
        QueryParamsResponse: {
            typeUrl: string;
            is(o: any): o is _140.QueryParamsResponse;
            isSDK(o: any): o is _140.QueryParamsResponseSDKType;
            isAmino(o: any): o is _140.QueryParamsResponseAmino;
            encode(message: _140.QueryParamsResponse, writer?: import("..").BinaryWriter): import("..").BinaryWriter;
            decode(input: import("..").BinaryReader | Uint8Array, length?: number): _140.QueryParamsResponse;
            fromPartial(object: Partial<_140.QueryParamsResponse>): _140.QueryParamsResponse;
            fromAmino(object: _140.QueryParamsResponseAmino): _140.QueryParamsResponse;
            toAmino(message: _140.QueryParamsResponse): _140.QueryParamsResponseAmino;
            fromAminoMsg(object: _140.QueryParamsResponseAminoMsg): _140.QueryParamsResponse;
            fromProtoMsg(message: _140.QueryParamsResponseProtoMsg): _140.QueryParamsResponse;
            toProto(message: _140.QueryParamsResponse): Uint8Array;
            toProtoMsg(message: _140.QueryParamsResponse): _140.QueryParamsResponseProtoMsg;
        };
        perpetualMarketTypeFromJSON(object: any): _139.PerpetualMarketType;
        perpetualMarketTypeToJSON(object: _139.PerpetualMarketType): string;
        PerpetualMarketType: typeof _139.PerpetualMarketType;
        PerpetualMarketTypeSDKType: typeof _139.PerpetualMarketType;
        PerpetualMarketTypeAmino: typeof _139.PerpetualMarketType;
        Perpetual: {
            typeUrl: string;
            is(o: any): o is _139.Perpetual;
            isSDK(o: any): o is _139.PerpetualSDKType;
            isAmino(o: any): o is _139.PerpetualAmino;
            encode(message: _139.Perpetual, writer?: import("..").BinaryWriter): import("..").BinaryWriter;
            decode(input: import("..").BinaryReader | Uint8Array, length?: number): _139.Perpetual;
            fromPartial(object: Partial<_139.Perpetual>): _139.Perpetual;
            fromAmino(object: _139.PerpetualAmino): _139.Perpetual;
            toAmino(message: _139.Perpetual): _139.PerpetualAmino;
            fromAminoMsg(object: _139.PerpetualAminoMsg): _139.Perpetual;
            fromProtoMsg(message: _139.PerpetualProtoMsg): _139.Perpetual;
            toProto(message: _139.Perpetual): Uint8Array;
            toProtoMsg(message: _139.Perpetual): _139.PerpetualProtoMsg;
        };
        PerpetualParams: {
            typeUrl: string;
            is(o: any): o is _139.PerpetualParams;
            isSDK(o: any): o is _139.PerpetualParamsSDKType;
            isAmino(o: any): o is _139.PerpetualParamsAmino;
            encode(message: _139.PerpetualParams, writer?: import("..").BinaryWriter): import("..").BinaryWriter;
            decode(input: import("..").BinaryReader | Uint8Array, length?: number): _139.PerpetualParams;
            fromPartial(object: Partial<_139.PerpetualParams>): _139.PerpetualParams;
            fromAmino(object: _139.PerpetualParamsAmino): _139.PerpetualParams;
            toAmino(message: _139.PerpetualParams): _139.PerpetualParamsAmino;
            fromAminoMsg(object: _139.PerpetualParamsAminoMsg): _139.PerpetualParams;
            fromProtoMsg(message: _139.PerpetualParamsProtoMsg): _139.PerpetualParams;
            toProto(message: _139.PerpetualParams): Uint8Array;
            toProtoMsg(message: _139.PerpetualParams): _139.PerpetualParamsProtoMsg;
        };
        MarketPremiums: {
            typeUrl: string;
            is(o: any): o is _139.MarketPremiums;
            isSDK(o: any): o is _139.MarketPremiumsSDKType;
            isAmino(o: any): o is _139.MarketPremiumsAmino;
            encode(message: _139.MarketPremiums, writer?: import("..").BinaryWriter): import("..").BinaryWriter;
            decode(input: import("..").BinaryReader | Uint8Array, length?: number): _139.MarketPremiums;
            fromPartial(object: Partial<_139.MarketPremiums>): _139.MarketPremiums;
            fromAmino(object: _139.MarketPremiumsAmino): _139.MarketPremiums;
            toAmino(message: _139.MarketPremiums): _139.MarketPremiumsAmino;
            fromAminoMsg(object: _139.MarketPremiumsAminoMsg): _139.MarketPremiums;
            fromProtoMsg(message: _139.MarketPremiumsProtoMsg): _139.MarketPremiums;
            toProto(message: _139.MarketPremiums): Uint8Array;
            toProtoMsg(message: _139.MarketPremiums): _139.MarketPremiumsProtoMsg;
        };
        PremiumStore: {
            typeUrl: string;
            is(o: any): o is _139.PremiumStore;
            isSDK(o: any): o is _139.PremiumStoreSDKType;
            isAmino(o: any): o is _139.PremiumStoreAmino;
            encode(message: _139.PremiumStore, writer?: import("..").BinaryWriter): import("..").BinaryWriter;
            decode(input: import("..").BinaryReader | Uint8Array, length?: number): _139.PremiumStore;
            fromPartial(object: Partial<_139.PremiumStore>): _139.PremiumStore;
            fromAmino(object: _139.PremiumStoreAmino): _139.PremiumStore;
            toAmino(message: _139.PremiumStore): _139.PremiumStoreAmino;
            fromAminoMsg(object: _139.PremiumStoreAminoMsg): _139.PremiumStore;
            fromProtoMsg(message: _139.PremiumStoreProtoMsg): _139.PremiumStore;
            toProto(message: _139.PremiumStore): Uint8Array;
            toProtoMsg(message: _139.PremiumStore): _139.PremiumStoreProtoMsg;
        };
        LiquidityTier: {
            typeUrl: string;
            is(o: any): o is _139.LiquidityTier;
            isSDK(o: any): o is _139.LiquidityTierSDKType;
            isAmino(o: any): o is _139.LiquidityTierAmino;
            encode(message: _139.LiquidityTier, writer?: import("..").BinaryWriter): import("..").BinaryWriter;
            decode(input: import("..").BinaryReader | Uint8Array, length?: number): _139.LiquidityTier;
            fromPartial(object: Partial<_139.LiquidityTier>): _139.LiquidityTier;
            fromAmino(object: _139.LiquidityTierAmino): _139.LiquidityTier;
            toAmino(message: _139.LiquidityTier): _139.LiquidityTierAmino;
            fromAminoMsg(object: _139.LiquidityTierAminoMsg): _139.LiquidityTier;
            fromProtoMsg(message: _139.LiquidityTierProtoMsg): _139.LiquidityTier;
            toProto(message: _139.LiquidityTier): Uint8Array;
            toProtoMsg(message: _139.LiquidityTier): _139.LiquidityTierProtoMsg;
        };
        Params: {
            typeUrl: string;
            is(o: any): o is _138.Params;
            isSDK(o: any): o is _138.ParamsSDKType;
            isAmino(o: any): o is _138.ParamsAmino;
            encode(message: _138.Params, writer?: import("..").BinaryWriter): import("..").BinaryWriter;
            decode(input: import("..").BinaryReader | Uint8Array, length?: number): _138.Params;
            fromPartial(object: Partial<_138.Params>): _138.Params;
            fromAmino(object: _138.ParamsAmino): _138.Params;
            toAmino(message: _138.Params): _138.ParamsAmino;
            fromAminoMsg(object: _138.ParamsAminoMsg): _138.Params;
            fromProtoMsg(message: _138.ParamsProtoMsg): _138.Params;
            toProto(message: _138.Params): Uint8Array;
            toProtoMsg(message: _138.Params): _138.ParamsProtoMsg;
        };
        GenesisState: {
            typeUrl: string;
            is(o: any): o is _137.GenesisState;
            isSDK(o: any): o is _137.GenesisStateSDKType;
            isAmino(o: any): o is _137.GenesisStateAmino;
            encode(message: _137.GenesisState, writer?: import("..").BinaryWriter): import("..").BinaryWriter;
            decode(input: import("..").BinaryReader | Uint8Array, length?: number): _137.GenesisState;
            fromPartial(object: Partial<_137.GenesisState>): _137.GenesisState;
            fromAmino(object: _137.GenesisStateAmino): _137.GenesisState;
            toAmino(message: _137.GenesisState): _137.GenesisStateAmino;
            fromAminoMsg(object: _137.GenesisStateAminoMsg): _137.GenesisState;
            fromProtoMsg(message: _137.GenesisStateProtoMsg): _137.GenesisState;
            toProto(message: _137.GenesisState): Uint8Array;
            toProtoMsg(message: _137.GenesisState): _137.GenesisStateProtoMsg;
        };
    };
    const prices: {
        MsgClientImpl: typeof _291.MsgClientImpl;
        createClientImpl: (rpc: import("../helpers").Rpc) => _291.MsgClientImpl;
        QueryClientImpl: typeof _280.QueryClientImpl;
        createRpcQueryExtension: (base: import("@cosmjs/stargate").QueryClient) => {
            marketPrice(request: _145.QueryMarketPriceRequest): Promise<_145.QueryMarketPriceResponse>;
            allMarketPrices(request?: _145.QueryAllMarketPricesRequest): Promise<_145.QueryAllMarketPricesResponse>;
            marketParam(request: _145.QueryMarketParamRequest): Promise<_145.QueryMarketParamResponse>;
            allMarketParams(request?: _145.QueryAllMarketParamsRequest): Promise<_145.QueryAllMarketParamsResponse>;
        };
        LCDQueryClient: typeof _268.LCDQueryClient;
        registry: ReadonlyArray<[string, import("@cosmjs/proto-signing").GeneratedType]>;
        load: (protoRegistry: import("@cosmjs/proto-signing").Registry) => void;
        MessageComposer: {
            encoded: {
                createOracleMarket(value: _146.MsgCreateOracleMarket): {
                    typeUrl: string;
                    value: Uint8Array<ArrayBufferLike>;
                };
                updateMarketParam(value: _146.MsgUpdateMarketParam): {
                    typeUrl: string;
                    value: Uint8Array<ArrayBufferLike>;
                };
            };
            withTypeUrl: {
                createOracleMarket(value: _146.MsgCreateOracleMarket): {
                    typeUrl: string;
                    value: _146.MsgCreateOracleMarket;
                };
                updateMarketParam(value: _146.MsgUpdateMarketParam): {
                    typeUrl: string;
                    value: _146.MsgUpdateMarketParam;
                };
            };
            fromPartial: {
                createOracleMarket(value: _146.MsgCreateOracleMarket): {
                    typeUrl: string;
                    value: _146.MsgCreateOracleMarket;
                };
                updateMarketParam(value: _146.MsgUpdateMarketParam): {
                    typeUrl: string;
                    value: _146.MsgUpdateMarketParam;
                };
            };
        };
        AminoConverter: {
            "/klyraprotocol.prices.MsgCreateOracleMarket": {
                aminoType: string;
                toAmino: (message: _146.MsgCreateOracleMarket) => _146.MsgCreateOracleMarketAmino;
                fromAmino: (object: _146.MsgCreateOracleMarketAmino) => _146.MsgCreateOracleMarket;
            };
            "/klyraprotocol.prices.MsgUpdateMarketParam": {
                aminoType: string;
                toAmino: (message: _146.MsgUpdateMarketParam) => _146.MsgUpdateMarketParamAmino;
                fromAmino: (object: _146.MsgUpdateMarketParamAmino) => _146.MsgUpdateMarketParam;
            };
        };
        MsgCreateOracleMarket: {
            typeUrl: string;
            is(o: any): o is _146.MsgCreateOracleMarket;
            isSDK(o: any): o is _146.MsgCreateOracleMarketSDKType;
            isAmino(o: any): o is _146.MsgCreateOracleMarketAmino;
            encode(message: _146.MsgCreateOracleMarket, writer?: import("..").BinaryWriter): import("..").BinaryWriter;
            decode(input: import("..").BinaryReader | Uint8Array, length?: number): _146.MsgCreateOracleMarket;
            fromPartial(object: Partial<_146.MsgCreateOracleMarket>): _146.MsgCreateOracleMarket;
            fromAmino(object: _146.MsgCreateOracleMarketAmino): _146.MsgCreateOracleMarket;
            toAmino(message: _146.MsgCreateOracleMarket): _146.MsgCreateOracleMarketAmino;
            fromAminoMsg(object: _146.MsgCreateOracleMarketAminoMsg): _146.MsgCreateOracleMarket;
            fromProtoMsg(message: _146.MsgCreateOracleMarketProtoMsg): _146.MsgCreateOracleMarket;
            toProto(message: _146.MsgCreateOracleMarket): Uint8Array;
            toProtoMsg(message: _146.MsgCreateOracleMarket): _146.MsgCreateOracleMarketProtoMsg;
        };
        MsgCreateOracleMarketResponse: {
            typeUrl: string;
            is(o: any): o is _146.MsgCreateOracleMarketResponse;
            isSDK(o: any): o is _146.MsgCreateOracleMarketResponseSDKType;
            isAmino(o: any): o is _146.MsgCreateOracleMarketResponseAmino;
            encode(_: _146.MsgCreateOracleMarketResponse, writer?: import("..").BinaryWriter): import("..").BinaryWriter;
            decode(input: import("..").BinaryReader | Uint8Array, length?: number): _146.MsgCreateOracleMarketResponse;
            fromPartial(_: Partial<_146.MsgCreateOracleMarketResponse>): _146.MsgCreateOracleMarketResponse;
            fromAmino(_: _146.MsgCreateOracleMarketResponseAmino): _146.MsgCreateOracleMarketResponse;
            toAmino(_: _146.MsgCreateOracleMarketResponse): _146.MsgCreateOracleMarketResponseAmino;
            fromAminoMsg(object: _146.MsgCreateOracleMarketResponseAminoMsg): _146.MsgCreateOracleMarketResponse;
            fromProtoMsg(message: _146.MsgCreateOracleMarketResponseProtoMsg): _146.MsgCreateOracleMarketResponse;
            toProto(message: _146.MsgCreateOracleMarketResponse): Uint8Array;
            toProtoMsg(message: _146.MsgCreateOracleMarketResponse): _146.MsgCreateOracleMarketResponseProtoMsg;
        };
        MsgUpdateMarketParam: {
            typeUrl: string;
            is(o: any): o is _146.MsgUpdateMarketParam;
            isSDK(o: any): o is _146.MsgUpdateMarketParamSDKType;
            isAmino(o: any): o is _146.MsgUpdateMarketParamAmino;
            encode(message: _146.MsgUpdateMarketParam, writer?: import("..").BinaryWriter): import("..").BinaryWriter;
            decode(input: import("..").BinaryReader | Uint8Array, length?: number): _146.MsgUpdateMarketParam;
            fromPartial(object: Partial<_146.MsgUpdateMarketParam>): _146.MsgUpdateMarketParam;
            fromAmino(object: _146.MsgUpdateMarketParamAmino): _146.MsgUpdateMarketParam;
            toAmino(message: _146.MsgUpdateMarketParam): _146.MsgUpdateMarketParamAmino;
            fromAminoMsg(object: _146.MsgUpdateMarketParamAminoMsg): _146.MsgUpdateMarketParam;
            fromProtoMsg(message: _146.MsgUpdateMarketParamProtoMsg): _146.MsgUpdateMarketParam;
            toProto(message: _146.MsgUpdateMarketParam): Uint8Array;
            toProtoMsg(message: _146.MsgUpdateMarketParam): _146.MsgUpdateMarketParamProtoMsg;
        };
        MsgUpdateMarketParamResponse: {
            typeUrl: string;
            is(o: any): o is _146.MsgUpdateMarketParamResponse;
            isSDK(o: any): o is _146.MsgUpdateMarketParamResponseSDKType;
            isAmino(o: any): o is _146.MsgUpdateMarketParamResponseAmino;
            encode(_: _146.MsgUpdateMarketParamResponse, writer?: import("..").BinaryWriter): import("..").BinaryWriter;
            decode(input: import("..").BinaryReader | Uint8Array, length?: number): _146.MsgUpdateMarketParamResponse;
            fromPartial(_: Partial<_146.MsgUpdateMarketParamResponse>): _146.MsgUpdateMarketParamResponse;
            fromAmino(_: _146.MsgUpdateMarketParamResponseAmino): _146.MsgUpdateMarketParamResponse;
            toAmino(_: _146.MsgUpdateMarketParamResponse): _146.MsgUpdateMarketParamResponseAmino;
            fromAminoMsg(object: _146.MsgUpdateMarketParamResponseAminoMsg): _146.MsgUpdateMarketParamResponse;
            fromProtoMsg(message: _146.MsgUpdateMarketParamResponseProtoMsg): _146.MsgUpdateMarketParamResponse;
            toProto(message: _146.MsgUpdateMarketParamResponse): Uint8Array;
            toProtoMsg(message: _146.MsgUpdateMarketParamResponse): _146.MsgUpdateMarketParamResponseProtoMsg;
        };
        QueryMarketPriceRequest: {
            typeUrl: string;
            is(o: any): o is _145.QueryMarketPriceRequest;
            isSDK(o: any): o is _145.QueryMarketPriceRequestSDKType;
            isAmino(o: any): o is _145.QueryMarketPriceRequestAmino;
            encode(message: _145.QueryMarketPriceRequest, writer?: import("..").BinaryWriter): import("..").BinaryWriter;
            decode(input: import("..").BinaryReader | Uint8Array, length?: number): _145.QueryMarketPriceRequest;
            fromPartial(object: Partial<_145.QueryMarketPriceRequest>): _145.QueryMarketPriceRequest;
            fromAmino(object: _145.QueryMarketPriceRequestAmino): _145.QueryMarketPriceRequest;
            toAmino(message: _145.QueryMarketPriceRequest): _145.QueryMarketPriceRequestAmino;
            fromAminoMsg(object: _145.QueryMarketPriceRequestAminoMsg): _145.QueryMarketPriceRequest;
            fromProtoMsg(message: _145.QueryMarketPriceRequestProtoMsg): _145.QueryMarketPriceRequest;
            toProto(message: _145.QueryMarketPriceRequest): Uint8Array;
            toProtoMsg(message: _145.QueryMarketPriceRequest): _145.QueryMarketPriceRequestProtoMsg;
        };
        QueryMarketPriceResponse: {
            typeUrl: string;
            is(o: any): o is _145.QueryMarketPriceResponse;
            isSDK(o: any): o is _145.QueryMarketPriceResponseSDKType;
            isAmino(o: any): o is _145.QueryMarketPriceResponseAmino;
            encode(message: _145.QueryMarketPriceResponse, writer?: import("..").BinaryWriter): import("..").BinaryWriter;
            decode(input: import("..").BinaryReader | Uint8Array, length?: number): _145.QueryMarketPriceResponse;
            fromPartial(object: Partial<_145.QueryMarketPriceResponse>): _145.QueryMarketPriceResponse;
            fromAmino(object: _145.QueryMarketPriceResponseAmino): _145.QueryMarketPriceResponse;
            toAmino(message: _145.QueryMarketPriceResponse): _145.QueryMarketPriceResponseAmino;
            fromAminoMsg(object: _145.QueryMarketPriceResponseAminoMsg): _145.QueryMarketPriceResponse;
            fromProtoMsg(message: _145.QueryMarketPriceResponseProtoMsg): _145.QueryMarketPriceResponse;
            toProto(message: _145.QueryMarketPriceResponse): Uint8Array;
            toProtoMsg(message: _145.QueryMarketPriceResponse): _145.QueryMarketPriceResponseProtoMsg;
        };
        QueryAllMarketPricesRequest: {
            typeUrl: string;
            is(o: any): o is _145.QueryAllMarketPricesRequest;
            isSDK(o: any): o is _145.QueryAllMarketPricesRequestSDKType;
            isAmino(o: any): o is _145.QueryAllMarketPricesRequestAmino;
            encode(message: _145.QueryAllMarketPricesRequest, writer?: import("..").BinaryWriter): import("..").BinaryWriter;
            decode(input: import("..").BinaryReader | Uint8Array, length?: number): _145.QueryAllMarketPricesRequest;
            fromPartial(object: Partial<_145.QueryAllMarketPricesRequest>): _145.QueryAllMarketPricesRequest;
            fromAmino(object: _145.QueryAllMarketPricesRequestAmino): _145.QueryAllMarketPricesRequest;
            toAmino(message: _145.QueryAllMarketPricesRequest): _145.QueryAllMarketPricesRequestAmino;
            fromAminoMsg(object: _145.QueryAllMarketPricesRequestAminoMsg): _145.QueryAllMarketPricesRequest;
            fromProtoMsg(message: _145.QueryAllMarketPricesRequestProtoMsg): _145.QueryAllMarketPricesRequest;
            toProto(message: _145.QueryAllMarketPricesRequest): Uint8Array;
            toProtoMsg(message: _145.QueryAllMarketPricesRequest): _145.QueryAllMarketPricesRequestProtoMsg;
        };
        QueryAllMarketPricesResponse: {
            typeUrl: string;
            is(o: any): o is _145.QueryAllMarketPricesResponse;
            isSDK(o: any): o is _145.QueryAllMarketPricesResponseSDKType;
            isAmino(o: any): o is _145.QueryAllMarketPricesResponseAmino;
            encode(message: _145.QueryAllMarketPricesResponse, writer?: import("..").BinaryWriter): import("..").BinaryWriter;
            decode(input: import("..").BinaryReader | Uint8Array, length?: number): _145.QueryAllMarketPricesResponse;
            fromPartial(object: Partial<_145.QueryAllMarketPricesResponse>): _145.QueryAllMarketPricesResponse;
            fromAmino(object: _145.QueryAllMarketPricesResponseAmino): _145.QueryAllMarketPricesResponse;
            toAmino(message: _145.QueryAllMarketPricesResponse): _145.QueryAllMarketPricesResponseAmino;
            fromAminoMsg(object: _145.QueryAllMarketPricesResponseAminoMsg): _145.QueryAllMarketPricesResponse;
            fromProtoMsg(message: _145.QueryAllMarketPricesResponseProtoMsg): _145.QueryAllMarketPricesResponse;
            toProto(message: _145.QueryAllMarketPricesResponse): Uint8Array;
            toProtoMsg(message: _145.QueryAllMarketPricesResponse): _145.QueryAllMarketPricesResponseProtoMsg;
        };
        QueryMarketParamRequest: {
            typeUrl: string;
            is(o: any): o is _145.QueryMarketParamRequest;
            isSDK(o: any): o is _145.QueryMarketParamRequestSDKType;
            isAmino(o: any): o is _145.QueryMarketParamRequestAmino;
            encode(message: _145.QueryMarketParamRequest, writer?: import("..").BinaryWriter): import("..").BinaryWriter;
            decode(input: import("..").BinaryReader | Uint8Array, length?: number): _145.QueryMarketParamRequest;
            fromPartial(object: Partial<_145.QueryMarketParamRequest>): _145.QueryMarketParamRequest;
            fromAmino(object: _145.QueryMarketParamRequestAmino): _145.QueryMarketParamRequest;
            toAmino(message: _145.QueryMarketParamRequest): _145.QueryMarketParamRequestAmino;
            fromAminoMsg(object: _145.QueryMarketParamRequestAminoMsg): _145.QueryMarketParamRequest;
            fromProtoMsg(message: _145.QueryMarketParamRequestProtoMsg): _145.QueryMarketParamRequest;
            toProto(message: _145.QueryMarketParamRequest): Uint8Array;
            toProtoMsg(message: _145.QueryMarketParamRequest): _145.QueryMarketParamRequestProtoMsg;
        };
        QueryMarketParamResponse: {
            typeUrl: string;
            is(o: any): o is _145.QueryMarketParamResponse;
            isSDK(o: any): o is _145.QueryMarketParamResponseSDKType;
            isAmino(o: any): o is _145.QueryMarketParamResponseAmino;
            encode(message: _145.QueryMarketParamResponse, writer?: import("..").BinaryWriter): import("..").BinaryWriter;
            decode(input: import("..").BinaryReader | Uint8Array, length?: number): _145.QueryMarketParamResponse;
            fromPartial(object: Partial<_145.QueryMarketParamResponse>): _145.QueryMarketParamResponse;
            fromAmino(object: _145.QueryMarketParamResponseAmino): _145.QueryMarketParamResponse;
            toAmino(message: _145.QueryMarketParamResponse): _145.QueryMarketParamResponseAmino;
            fromAminoMsg(object: _145.QueryMarketParamResponseAminoMsg): _145.QueryMarketParamResponse;
            fromProtoMsg(message: _145.QueryMarketParamResponseProtoMsg): _145.QueryMarketParamResponse;
            toProto(message: _145.QueryMarketParamResponse): Uint8Array;
            toProtoMsg(message: _145.QueryMarketParamResponse): _145.QueryMarketParamResponseProtoMsg;
        };
        QueryAllMarketParamsRequest: {
            typeUrl: string;
            is(o: any): o is _145.QueryAllMarketParamsRequest;
            isSDK(o: any): o is _145.QueryAllMarketParamsRequestSDKType;
            isAmino(o: any): o is _145.QueryAllMarketParamsRequestAmino;
            encode(message: _145.QueryAllMarketParamsRequest, writer?: import("..").BinaryWriter): import("..").BinaryWriter;
            decode(input: import("..").BinaryReader | Uint8Array, length?: number): _145.QueryAllMarketParamsRequest;
            fromPartial(object: Partial<_145.QueryAllMarketParamsRequest>): _145.QueryAllMarketParamsRequest;
            fromAmino(object: _145.QueryAllMarketParamsRequestAmino): _145.QueryAllMarketParamsRequest;
            toAmino(message: _145.QueryAllMarketParamsRequest): _145.QueryAllMarketParamsRequestAmino;
            fromAminoMsg(object: _145.QueryAllMarketParamsRequestAminoMsg): _145.QueryAllMarketParamsRequest;
            fromProtoMsg(message: _145.QueryAllMarketParamsRequestProtoMsg): _145.QueryAllMarketParamsRequest;
            toProto(message: _145.QueryAllMarketParamsRequest): Uint8Array;
            toProtoMsg(message: _145.QueryAllMarketParamsRequest): _145.QueryAllMarketParamsRequestProtoMsg;
        };
        QueryAllMarketParamsResponse: {
            typeUrl: string;
            is(o: any): o is _145.QueryAllMarketParamsResponse;
            isSDK(o: any): o is _145.QueryAllMarketParamsResponseSDKType;
            isAmino(o: any): o is _145.QueryAllMarketParamsResponseAmino;
            encode(message: _145.QueryAllMarketParamsResponse, writer?: import("..").BinaryWriter): import("..").BinaryWriter;
            decode(input: import("..").BinaryReader | Uint8Array, length?: number): _145.QueryAllMarketParamsResponse;
            fromPartial(object: Partial<_145.QueryAllMarketParamsResponse>): _145.QueryAllMarketParamsResponse;
            fromAmino(object: _145.QueryAllMarketParamsResponseAmino): _145.QueryAllMarketParamsResponse;
            toAmino(message: _145.QueryAllMarketParamsResponse): _145.QueryAllMarketParamsResponseAmino;
            fromAminoMsg(object: _145.QueryAllMarketParamsResponseAminoMsg): _145.QueryAllMarketParamsResponse;
            fromProtoMsg(message: _145.QueryAllMarketParamsResponseProtoMsg): _145.QueryAllMarketParamsResponse;
            toProto(message: _145.QueryAllMarketParamsResponse): Uint8Array;
            toProtoMsg(message: _145.QueryAllMarketParamsResponse): _145.QueryAllMarketParamsResponseProtoMsg;
        };
        MarketPrice: {
            typeUrl: string;
            is(o: any): o is _144.MarketPrice;
            isSDK(o: any): o is _144.MarketPriceSDKType;
            isAmino(o: any): o is _144.MarketPriceAmino;
            encode(message: _144.MarketPrice, writer?: import("..").BinaryWriter): import("..").BinaryWriter;
            decode(input: import("..").BinaryReader | Uint8Array, length?: number): _144.MarketPrice;
            fromPartial(object: Partial<_144.MarketPrice>): _144.MarketPrice;
            fromAmino(object: _144.MarketPriceAmino): _144.MarketPrice;
            toAmino(message: _144.MarketPrice): _144.MarketPriceAmino;
            fromAminoMsg(object: _144.MarketPriceAminoMsg): _144.MarketPrice;
            fromProtoMsg(message: _144.MarketPriceProtoMsg): _144.MarketPrice;
            toProto(message: _144.MarketPrice): Uint8Array;
            toProtoMsg(message: _144.MarketPrice): _144.MarketPriceProtoMsg;
        };
        MarketSpotPrice: {
            typeUrl: string;
            is(o: any): o is _144.MarketSpotPrice;
            isSDK(o: any): o is _144.MarketSpotPriceSDKType;
            isAmino(o: any): o is _144.MarketSpotPriceAmino;
            encode(message: _144.MarketSpotPrice, writer?: import("..").BinaryWriter): import("..").BinaryWriter;
            decode(input: import("..").BinaryReader | Uint8Array, length?: number): _144.MarketSpotPrice;
            fromPartial(object: Partial<_144.MarketSpotPrice>): _144.MarketSpotPrice;
            fromAmino(object: _144.MarketSpotPriceAmino): _144.MarketSpotPrice;
            toAmino(message: _144.MarketSpotPrice): _144.MarketSpotPriceAmino;
            fromAminoMsg(object: _144.MarketSpotPriceAminoMsg): _144.MarketSpotPrice;
            fromProtoMsg(message: _144.MarketSpotPriceProtoMsg): _144.MarketSpotPrice;
            toProto(message: _144.MarketSpotPrice): Uint8Array;
            toProtoMsg(message: _144.MarketSpotPrice): _144.MarketSpotPriceProtoMsg;
        };
        MarketPriceUpdate: {
            typeUrl: string;
            is(o: any): o is _144.MarketPriceUpdate;
            isSDK(o: any): o is _144.MarketPriceUpdateSDKType;
            isAmino(o: any): o is _144.MarketPriceUpdateAmino;
            encode(message: _144.MarketPriceUpdate, writer?: import("..").BinaryWriter): import("..").BinaryWriter;
            decode(input: import("..").BinaryReader | Uint8Array, length?: number): _144.MarketPriceUpdate;
            fromPartial(object: Partial<_144.MarketPriceUpdate>): _144.MarketPriceUpdate;
            fromAmino(object: _144.MarketPriceUpdateAmino): _144.MarketPriceUpdate;
            toAmino(message: _144.MarketPriceUpdate): _144.MarketPriceUpdateAmino;
            fromAminoMsg(object: _144.MarketPriceUpdateAminoMsg): _144.MarketPriceUpdate;
            fromProtoMsg(message: _144.MarketPriceUpdateProtoMsg): _144.MarketPriceUpdate;
            toProto(message: _144.MarketPriceUpdate): Uint8Array;
            toProtoMsg(message: _144.MarketPriceUpdate): _144.MarketPriceUpdateProtoMsg;
        };
        MarketSpotPriceUpdate: {
            typeUrl: string;
            is(o: any): o is _144.MarketSpotPriceUpdate;
            isSDK(o: any): o is _144.MarketSpotPriceUpdateSDKType;
            isAmino(o: any): o is _144.MarketSpotPriceUpdateAmino;
            encode(message: _144.MarketSpotPriceUpdate, writer?: import("..").BinaryWriter): import("..").BinaryWriter;
            decode(input: import("..").BinaryReader | Uint8Array, length?: number): _144.MarketSpotPriceUpdate;
            fromPartial(object: Partial<_144.MarketSpotPriceUpdate>): _144.MarketSpotPriceUpdate;
            fromAmino(object: _144.MarketSpotPriceUpdateAmino): _144.MarketSpotPriceUpdate;
            toAmino(message: _144.MarketSpotPriceUpdate): _144.MarketSpotPriceUpdateAmino;
            fromAminoMsg(object: _144.MarketSpotPriceUpdateAminoMsg): _144.MarketSpotPriceUpdate;
            fromProtoMsg(message: _144.MarketSpotPriceUpdateProtoMsg): _144.MarketSpotPriceUpdate;
            toProto(message: _144.MarketSpotPriceUpdate): Uint8Array;
            toProtoMsg(message: _144.MarketSpotPriceUpdate): _144.MarketSpotPriceUpdateProtoMsg;
        };
        MarketPnlPriceUpdate: {
            typeUrl: string;
            is(o: any): o is _144.MarketPnlPriceUpdate;
            isSDK(o: any): o is _144.MarketPnlPriceUpdateSDKType;
            isAmino(o: any): o is _144.MarketPnlPriceUpdateAmino;
            encode(message: _144.MarketPnlPriceUpdate, writer?: import("..").BinaryWriter): import("..").BinaryWriter;
            decode(input: import("..").BinaryReader | Uint8Array, length?: number): _144.MarketPnlPriceUpdate;
            fromPartial(object: Partial<_144.MarketPnlPriceUpdate>): _144.MarketPnlPriceUpdate;
            fromAmino(object: _144.MarketPnlPriceUpdateAmino): _144.MarketPnlPriceUpdate;
            toAmino(message: _144.MarketPnlPriceUpdate): _144.MarketPnlPriceUpdateAmino;
            fromAminoMsg(object: _144.MarketPnlPriceUpdateAminoMsg): _144.MarketPnlPriceUpdate;
            fromProtoMsg(message: _144.MarketPnlPriceUpdateProtoMsg): _144.MarketPnlPriceUpdate;
            toProto(message: _144.MarketPnlPriceUpdate): Uint8Array;
            toProtoMsg(message: _144.MarketPnlPriceUpdate): _144.MarketPnlPriceUpdateProtoMsg;
        };
        MarketPriceUpdates: {
            typeUrl: string;
            is(o: any): o is _144.MarketPriceUpdates;
            isSDK(o: any): o is _144.MarketPriceUpdatesSDKType;
            isAmino(o: any): o is _144.MarketPriceUpdatesAmino;
            encode(message: _144.MarketPriceUpdates, writer?: import("..").BinaryWriter): import("..").BinaryWriter;
            decode(input: import("..").BinaryReader | Uint8Array, length?: number): _144.MarketPriceUpdates;
            fromPartial(object: Partial<_144.MarketPriceUpdates>): _144.MarketPriceUpdates;
            fromAmino(object: _144.MarketPriceUpdatesAmino): _144.MarketPriceUpdates;
            toAmino(message: _144.MarketPriceUpdates): _144.MarketPriceUpdatesAmino;
            fromAminoMsg(object: _144.MarketPriceUpdatesAminoMsg): _144.MarketPriceUpdates;
            fromProtoMsg(message: _144.MarketPriceUpdatesProtoMsg): _144.MarketPriceUpdates;
            toProto(message: _144.MarketPriceUpdates): Uint8Array;
            toProtoMsg(message: _144.MarketPriceUpdates): _144.MarketPriceUpdatesProtoMsg;
        };
        MarketParam: {
            typeUrl: string;
            is(o: any): o is _143.MarketParam;
            isSDK(o: any): o is _143.MarketParamSDKType;
            isAmino(o: any): o is _143.MarketParamAmino;
            encode(message: _143.MarketParam, writer?: import("..").BinaryWriter): import("..").BinaryWriter;
            decode(input: import("..").BinaryReader | Uint8Array, length?: number): _143.MarketParam;
            fromPartial(object: Partial<_143.MarketParam>): _143.MarketParam;
            fromAmino(object: _143.MarketParamAmino): _143.MarketParam;
            toAmino(message: _143.MarketParam): _143.MarketParamAmino;
            fromAminoMsg(object: _143.MarketParamAminoMsg): _143.MarketParam;
            fromProtoMsg(message: _143.MarketParamProtoMsg): _143.MarketParam;
            toProto(message: _143.MarketParam): Uint8Array;
            toProtoMsg(message: _143.MarketParam): _143.MarketParamProtoMsg;
        };
        GenesisState: {
            typeUrl: string;
            is(o: any): o is _142.GenesisState;
            isSDK(o: any): o is _142.GenesisStateSDKType;
            isAmino(o: any): o is _142.GenesisStateAmino;
            encode(message: _142.GenesisState, writer?: import("..").BinaryWriter): import("..").BinaryWriter;
            decode(input: import("..").BinaryReader | Uint8Array, length?: number): _142.GenesisState;
            fromPartial(object: Partial<_142.GenesisState>): _142.GenesisState;
            fromAmino(object: _142.GenesisStateAmino): _142.GenesisState;
            toAmino(message: _142.GenesisState): _142.GenesisStateAmino;
            fromAminoMsg(object: _142.GenesisStateAminoMsg): _142.GenesisState;
            fromProtoMsg(message: _142.GenesisStateProtoMsg): _142.GenesisState;
            toProto(message: _142.GenesisState): Uint8Array;
            toProtoMsg(message: _142.GenesisState): _142.GenesisStateProtoMsg;
        };
    };
    const ratelimit: {
        MsgClientImpl: typeof _292.MsgClientImpl;
        createClientImpl: (rpc: import("../helpers").Rpc) => _292.MsgClientImpl;
        QueryClientImpl: typeof _281.QueryClientImpl;
        createRpcQueryExtension: (base: import("@cosmjs/stargate").QueryClient) => {
            listLimitParams(request?: _151.ListLimitParamsRequest): Promise<_151.ListLimitParamsResponse>;
            capacityByDenom(request: _151.QueryCapacityByDenomRequest): Promise<_151.QueryCapacityByDenomResponse>;
            allPendingSendPackets(request?: _151.QueryAllPendingSendPacketsRequest): Promise<_151.QueryAllPendingSendPacketsResponse>;
            getSDAIPriceQuery(request?: _151.GetSDAIPriceQueryRequest): Promise<_151.GetSDAIPriceQueryResponse>;
            getAssetYieldIndexQuery(request?: _151.GetAssetYieldIndexQueryRequest): Promise<_151.GetAssetYieldIndexQueryResponse>;
        };
        LCDQueryClient: typeof _269.LCDQueryClient;
        registry: ReadonlyArray<[string, import("@cosmjs/proto-signing").GeneratedType]>;
        load: (protoRegistry: import("@cosmjs/proto-signing").Registry) => void;
        MessageComposer: {
            encoded: {
                setLimitParams(value: _152.MsgSetLimitParams): {
                    typeUrl: string;
                    value: Uint8Array<ArrayBufferLike>;
                };
            };
            withTypeUrl: {
                setLimitParams(value: _152.MsgSetLimitParams): {
                    typeUrl: string;
                    value: _152.MsgSetLimitParams;
                };
            };
            fromPartial: {
                setLimitParams(value: _152.MsgSetLimitParams): {
                    typeUrl: string;
                    value: _152.MsgSetLimitParams;
                };
            };
        };
        AminoConverter: {
            "/klyraprotocol.ratelimit.MsgSetLimitParams": {
                aminoType: string;
                toAmino: (message: _152.MsgSetLimitParams) => _152.MsgSetLimitParamsAmino;
                fromAmino: (object: _152.MsgSetLimitParamsAmino) => _152.MsgSetLimitParams;
            };
        };
        MsgSetLimitParams: {
            typeUrl: string;
            is(o: any): o is _152.MsgSetLimitParams;
            isSDK(o: any): o is _152.MsgSetLimitParamsSDKType;
            isAmino(o: any): o is _152.MsgSetLimitParamsAmino;
            encode(message: _152.MsgSetLimitParams, writer?: import("..").BinaryWriter): import("..").BinaryWriter;
            decode(input: import("..").BinaryReader | Uint8Array, length?: number): _152.MsgSetLimitParams;
            fromPartial(object: Partial<_152.MsgSetLimitParams>): _152.MsgSetLimitParams;
            fromAmino(object: _152.MsgSetLimitParamsAmino): _152.MsgSetLimitParams;
            toAmino(message: _152.MsgSetLimitParams): _152.MsgSetLimitParamsAmino;
            fromAminoMsg(object: _152.MsgSetLimitParamsAminoMsg): _152.MsgSetLimitParams;
            fromProtoMsg(message: _152.MsgSetLimitParamsProtoMsg): _152.MsgSetLimitParams;
            toProto(message: _152.MsgSetLimitParams): Uint8Array;
            toProtoMsg(message: _152.MsgSetLimitParams): _152.MsgSetLimitParamsProtoMsg;
        };
        MsgSetLimitParamsResponse: {
            typeUrl: string;
            is(o: any): o is _152.MsgSetLimitParamsResponse;
            isSDK(o: any): o is _152.MsgSetLimitParamsResponseSDKType;
            isAmino(o: any): o is _152.MsgSetLimitParamsResponseAmino;
            encode(_: _152.MsgSetLimitParamsResponse, writer?: import("..").BinaryWriter): import("..").BinaryWriter;
            decode(input: import("..").BinaryReader | Uint8Array, length?: number): _152.MsgSetLimitParamsResponse;
            fromPartial(_: Partial<_152.MsgSetLimitParamsResponse>): _152.MsgSetLimitParamsResponse;
            fromAmino(_: _152.MsgSetLimitParamsResponseAmino): _152.MsgSetLimitParamsResponse;
            toAmino(_: _152.MsgSetLimitParamsResponse): _152.MsgSetLimitParamsResponseAmino;
            fromAminoMsg(object: _152.MsgSetLimitParamsResponseAminoMsg): _152.MsgSetLimitParamsResponse;
            fromProtoMsg(message: _152.MsgSetLimitParamsResponseProtoMsg): _152.MsgSetLimitParamsResponse;
            toProto(message: _152.MsgSetLimitParamsResponse): Uint8Array;
            toProtoMsg(message: _152.MsgSetLimitParamsResponse): _152.MsgSetLimitParamsResponseProtoMsg;
        };
        ListLimitParamsRequest: {
            typeUrl: string;
            is(o: any): o is _151.ListLimitParamsRequest;
            isSDK(o: any): o is _151.ListLimitParamsRequestSDKType;
            isAmino(o: any): o is _151.ListLimitParamsRequestAmino;
            encode(_: _151.ListLimitParamsRequest, writer?: import("..").BinaryWriter): import("..").BinaryWriter;
            decode(input: import("..").BinaryReader | Uint8Array, length?: number): _151.ListLimitParamsRequest;
            fromPartial(_: Partial<_151.ListLimitParamsRequest>): _151.ListLimitParamsRequest;
            fromAmino(_: _151.ListLimitParamsRequestAmino): _151.ListLimitParamsRequest;
            toAmino(_: _151.ListLimitParamsRequest): _151.ListLimitParamsRequestAmino;
            fromAminoMsg(object: _151.ListLimitParamsRequestAminoMsg): _151.ListLimitParamsRequest;
            fromProtoMsg(message: _151.ListLimitParamsRequestProtoMsg): _151.ListLimitParamsRequest;
            toProto(message: _151.ListLimitParamsRequest): Uint8Array;
            toProtoMsg(message: _151.ListLimitParamsRequest): _151.ListLimitParamsRequestProtoMsg;
        };
        ListLimitParamsResponse: {
            typeUrl: string;
            is(o: any): o is _151.ListLimitParamsResponse;
            isSDK(o: any): o is _151.ListLimitParamsResponseSDKType;
            isAmino(o: any): o is _151.ListLimitParamsResponseAmino;
            encode(message: _151.ListLimitParamsResponse, writer?: import("..").BinaryWriter): import("..").BinaryWriter;
            decode(input: import("..").BinaryReader | Uint8Array, length?: number): _151.ListLimitParamsResponse;
            fromPartial(object: Partial<_151.ListLimitParamsResponse>): _151.ListLimitParamsResponse;
            fromAmino(object: _151.ListLimitParamsResponseAmino): _151.ListLimitParamsResponse;
            toAmino(message: _151.ListLimitParamsResponse): _151.ListLimitParamsResponseAmino;
            fromAminoMsg(object: _151.ListLimitParamsResponseAminoMsg): _151.ListLimitParamsResponse;
            fromProtoMsg(message: _151.ListLimitParamsResponseProtoMsg): _151.ListLimitParamsResponse;
            toProto(message: _151.ListLimitParamsResponse): Uint8Array;
            toProtoMsg(message: _151.ListLimitParamsResponse): _151.ListLimitParamsResponseProtoMsg;
        };
        QueryCapacityByDenomRequest: {
            typeUrl: string;
            is(o: any): o is _151.QueryCapacityByDenomRequest;
            isSDK(o: any): o is _151.QueryCapacityByDenomRequestSDKType;
            isAmino(o: any): o is _151.QueryCapacityByDenomRequestAmino;
            encode(message: _151.QueryCapacityByDenomRequest, writer?: import("..").BinaryWriter): import("..").BinaryWriter;
            decode(input: import("..").BinaryReader | Uint8Array, length?: number): _151.QueryCapacityByDenomRequest;
            fromPartial(object: Partial<_151.QueryCapacityByDenomRequest>): _151.QueryCapacityByDenomRequest;
            fromAmino(object: _151.QueryCapacityByDenomRequestAmino): _151.QueryCapacityByDenomRequest;
            toAmino(message: _151.QueryCapacityByDenomRequest): _151.QueryCapacityByDenomRequestAmino;
            fromAminoMsg(object: _151.QueryCapacityByDenomRequestAminoMsg): _151.QueryCapacityByDenomRequest;
            fromProtoMsg(message: _151.QueryCapacityByDenomRequestProtoMsg): _151.QueryCapacityByDenomRequest;
            toProto(message: _151.QueryCapacityByDenomRequest): Uint8Array;
            toProtoMsg(message: _151.QueryCapacityByDenomRequest): _151.QueryCapacityByDenomRequestProtoMsg;
        };
        QueryCapacityByDenomResponse: {
            typeUrl: string;
            is(o: any): o is _151.QueryCapacityByDenomResponse;
            isSDK(o: any): o is _151.QueryCapacityByDenomResponseSDKType;
            isAmino(o: any): o is _151.QueryCapacityByDenomResponseAmino;
            encode(message: _151.QueryCapacityByDenomResponse, writer?: import("..").BinaryWriter): import("..").BinaryWriter;
            decode(input: import("..").BinaryReader | Uint8Array, length?: number): _151.QueryCapacityByDenomResponse;
            fromPartial(object: Partial<_151.QueryCapacityByDenomResponse>): _151.QueryCapacityByDenomResponse;
            fromAmino(object: _151.QueryCapacityByDenomResponseAmino): _151.QueryCapacityByDenomResponse;
            toAmino(message: _151.QueryCapacityByDenomResponse): _151.QueryCapacityByDenomResponseAmino;
            fromAminoMsg(object: _151.QueryCapacityByDenomResponseAminoMsg): _151.QueryCapacityByDenomResponse;
            fromProtoMsg(message: _151.QueryCapacityByDenomResponseProtoMsg): _151.QueryCapacityByDenomResponse;
            toProto(message: _151.QueryCapacityByDenomResponse): Uint8Array;
            toProtoMsg(message: _151.QueryCapacityByDenomResponse): _151.QueryCapacityByDenomResponseProtoMsg;
        };
        QueryAllPendingSendPacketsRequest: {
            typeUrl: string;
            is(o: any): o is _151.QueryAllPendingSendPacketsRequest;
            isSDK(o: any): o is _151.QueryAllPendingSendPacketsRequestSDKType;
            isAmino(o: any): o is _151.QueryAllPendingSendPacketsRequestAmino;
            encode(_: _151.QueryAllPendingSendPacketsRequest, writer?: import("..").BinaryWriter): import("..").BinaryWriter;
            decode(input: import("..").BinaryReader | Uint8Array, length?: number): _151.QueryAllPendingSendPacketsRequest;
            fromPartial(_: Partial<_151.QueryAllPendingSendPacketsRequest>): _151.QueryAllPendingSendPacketsRequest;
            fromAmino(_: _151.QueryAllPendingSendPacketsRequestAmino): _151.QueryAllPendingSendPacketsRequest;
            toAmino(_: _151.QueryAllPendingSendPacketsRequest): _151.QueryAllPendingSendPacketsRequestAmino;
            fromAminoMsg(object: _151.QueryAllPendingSendPacketsRequestAminoMsg): _151.QueryAllPendingSendPacketsRequest;
            fromProtoMsg(message: _151.QueryAllPendingSendPacketsRequestProtoMsg): _151.QueryAllPendingSendPacketsRequest;
            toProto(message: _151.QueryAllPendingSendPacketsRequest): Uint8Array;
            toProtoMsg(message: _151.QueryAllPendingSendPacketsRequest): _151.QueryAllPendingSendPacketsRequestProtoMsg;
        };
        QueryAllPendingSendPacketsResponse: {
            typeUrl: string;
            is(o: any): o is _151.QueryAllPendingSendPacketsResponse;
            isSDK(o: any): o is _151.QueryAllPendingSendPacketsResponseSDKType;
            isAmino(o: any): o is _151.QueryAllPendingSendPacketsResponseAmino;
            encode(message: _151.QueryAllPendingSendPacketsResponse, writer?: import("..").BinaryWriter): import("..").BinaryWriter;
            decode(input: import("..").BinaryReader | Uint8Array, length?: number): _151.QueryAllPendingSendPacketsResponse;
            fromPartial(object: Partial<_151.QueryAllPendingSendPacketsResponse>): _151.QueryAllPendingSendPacketsResponse;
            fromAmino(object: _151.QueryAllPendingSendPacketsResponseAmino): _151.QueryAllPendingSendPacketsResponse;
            toAmino(message: _151.QueryAllPendingSendPacketsResponse): _151.QueryAllPendingSendPacketsResponseAmino;
            fromAminoMsg(object: _151.QueryAllPendingSendPacketsResponseAminoMsg): _151.QueryAllPendingSendPacketsResponse;
            fromProtoMsg(message: _151.QueryAllPendingSendPacketsResponseProtoMsg): _151.QueryAllPendingSendPacketsResponse;
            toProto(message: _151.QueryAllPendingSendPacketsResponse): Uint8Array;
            toProtoMsg(message: _151.QueryAllPendingSendPacketsResponse): _151.QueryAllPendingSendPacketsResponseProtoMsg;
        };
        GetSDAIPriceQueryRequest: {
            typeUrl: string;
            is(o: any): o is _151.GetSDAIPriceQueryRequest;
            isSDK(o: any): o is _151.GetSDAIPriceQueryRequestSDKType;
            isAmino(o: any): o is _151.GetSDAIPriceQueryRequestAmino;
            encode(_: _151.GetSDAIPriceQueryRequest, writer?: import("..").BinaryWriter): import("..").BinaryWriter;
            decode(input: import("..").BinaryReader | Uint8Array, length?: number): _151.GetSDAIPriceQueryRequest;
            fromPartial(_: Partial<_151.GetSDAIPriceQueryRequest>): _151.GetSDAIPriceQueryRequest;
            fromAmino(_: _151.GetSDAIPriceQueryRequestAmino): _151.GetSDAIPriceQueryRequest;
            toAmino(_: _151.GetSDAIPriceQueryRequest): _151.GetSDAIPriceQueryRequestAmino;
            fromAminoMsg(object: _151.GetSDAIPriceQueryRequestAminoMsg): _151.GetSDAIPriceQueryRequest;
            fromProtoMsg(message: _151.GetSDAIPriceQueryRequestProtoMsg): _151.GetSDAIPriceQueryRequest;
            toProto(message: _151.GetSDAIPriceQueryRequest): Uint8Array;
            toProtoMsg(message: _151.GetSDAIPriceQueryRequest): _151.GetSDAIPriceQueryRequestProtoMsg;
        };
        GetSDAIPriceQueryResponse: {
            typeUrl: string;
            is(o: any): o is _151.GetSDAIPriceQueryResponse;
            isSDK(o: any): o is _151.GetSDAIPriceQueryResponseSDKType;
            isAmino(o: any): o is _151.GetSDAIPriceQueryResponseAmino;
            encode(message: _151.GetSDAIPriceQueryResponse, writer?: import("..").BinaryWriter): import("..").BinaryWriter;
            decode(input: import("..").BinaryReader | Uint8Array, length?: number): _151.GetSDAIPriceQueryResponse;
            fromPartial(object: Partial<_151.GetSDAIPriceQueryResponse>): _151.GetSDAIPriceQueryResponse;
            fromAmino(object: _151.GetSDAIPriceQueryResponseAmino): _151.GetSDAIPriceQueryResponse;
            toAmino(message: _151.GetSDAIPriceQueryResponse): _151.GetSDAIPriceQueryResponseAmino;
            fromAminoMsg(object: _151.GetSDAIPriceQueryResponseAminoMsg): _151.GetSDAIPriceQueryResponse;
            fromProtoMsg(message: _151.GetSDAIPriceQueryResponseProtoMsg): _151.GetSDAIPriceQueryResponse;
            toProto(message: _151.GetSDAIPriceQueryResponse): Uint8Array;
            toProtoMsg(message: _151.GetSDAIPriceQueryResponse): _151.GetSDAIPriceQueryResponseProtoMsg;
        };
        GetAssetYieldIndexQueryRequest: {
            typeUrl: string;
            is(o: any): o is _151.GetAssetYieldIndexQueryRequest;
            isSDK(o: any): o is _151.GetAssetYieldIndexQueryRequestSDKType;
            isAmino(o: any): o is _151.GetAssetYieldIndexQueryRequestAmino;
            encode(_: _151.GetAssetYieldIndexQueryRequest, writer?: import("..").BinaryWriter): import("..").BinaryWriter;
            decode(input: import("..").BinaryReader | Uint8Array, length?: number): _151.GetAssetYieldIndexQueryRequest;
            fromPartial(_: Partial<_151.GetAssetYieldIndexQueryRequest>): _151.GetAssetYieldIndexQueryRequest;
            fromAmino(_: _151.GetAssetYieldIndexQueryRequestAmino): _151.GetAssetYieldIndexQueryRequest;
            toAmino(_: _151.GetAssetYieldIndexQueryRequest): _151.GetAssetYieldIndexQueryRequestAmino;
            fromAminoMsg(object: _151.GetAssetYieldIndexQueryRequestAminoMsg): _151.GetAssetYieldIndexQueryRequest;
            fromProtoMsg(message: _151.GetAssetYieldIndexQueryRequestProtoMsg): _151.GetAssetYieldIndexQueryRequest;
            toProto(message: _151.GetAssetYieldIndexQueryRequest): Uint8Array;
            toProtoMsg(message: _151.GetAssetYieldIndexQueryRequest): _151.GetAssetYieldIndexQueryRequestProtoMsg;
        };
        GetAssetYieldIndexQueryResponse: {
            typeUrl: string;
            is(o: any): o is _151.GetAssetYieldIndexQueryResponse;
            isSDK(o: any): o is _151.GetAssetYieldIndexQueryResponseSDKType;
            isAmino(o: any): o is _151.GetAssetYieldIndexQueryResponseAmino;
            encode(message: _151.GetAssetYieldIndexQueryResponse, writer?: import("..").BinaryWriter): import("..").BinaryWriter;
            decode(input: import("..").BinaryReader | Uint8Array, length?: number): _151.GetAssetYieldIndexQueryResponse;
            fromPartial(object: Partial<_151.GetAssetYieldIndexQueryResponse>): _151.GetAssetYieldIndexQueryResponse;
            fromAmino(object: _151.GetAssetYieldIndexQueryResponseAmino): _151.GetAssetYieldIndexQueryResponse;
            toAmino(message: _151.GetAssetYieldIndexQueryResponse): _151.GetAssetYieldIndexQueryResponseAmino;
            fromAminoMsg(object: _151.GetAssetYieldIndexQueryResponseAminoMsg): _151.GetAssetYieldIndexQueryResponse;
            fromProtoMsg(message: _151.GetAssetYieldIndexQueryResponseProtoMsg): _151.GetAssetYieldIndexQueryResponse;
            toProto(message: _151.GetAssetYieldIndexQueryResponse): Uint8Array;
            toProtoMsg(message: _151.GetAssetYieldIndexQueryResponse): _151.GetAssetYieldIndexQueryResponseProtoMsg;
        };
        PendingSendPacket: {
            typeUrl: string;
            is(o: any): o is _150.PendingSendPacket;
            isSDK(o: any): o is _150.PendingSendPacketSDKType;
            isAmino(o: any): o is _150.PendingSendPacketAmino;
            encode(message: _150.PendingSendPacket, writer?: import("..").BinaryWriter): import("..").BinaryWriter;
            decode(input: import("..").BinaryReader | Uint8Array, length?: number): _150.PendingSendPacket;
            fromPartial(object: Partial<_150.PendingSendPacket>): _150.PendingSendPacket;
            fromAmino(object: _150.PendingSendPacketAmino): _150.PendingSendPacket;
            toAmino(message: _150.PendingSendPacket): _150.PendingSendPacketAmino;
            fromAminoMsg(object: _150.PendingSendPacketAminoMsg): _150.PendingSendPacket;
            fromProtoMsg(message: _150.PendingSendPacketProtoMsg): _150.PendingSendPacket;
            toProto(message: _150.PendingSendPacket): Uint8Array;
            toProtoMsg(message: _150.PendingSendPacket): _150.PendingSendPacketProtoMsg;
        };
        LimitParams: {
            typeUrl: string;
            is(o: any): o is _149.LimitParams;
            isSDK(o: any): o is _149.LimitParamsSDKType;
            isAmino(o: any): o is _149.LimitParamsAmino;
            encode(message: _149.LimitParams, writer?: import("..").BinaryWriter): import("..").BinaryWriter;
            decode(input: import("..").BinaryReader | Uint8Array, length?: number): _149.LimitParams;
            fromPartial(object: Partial<_149.LimitParams>): _149.LimitParams;
            fromAmino(object: _149.LimitParamsAmino): _149.LimitParams;
            toAmino(message: _149.LimitParams): _149.LimitParamsAmino;
            fromAminoMsg(object: _149.LimitParamsAminoMsg): _149.LimitParams;
            fromProtoMsg(message: _149.LimitParamsProtoMsg): _149.LimitParams;
            toProto(message: _149.LimitParams): Uint8Array;
            toProtoMsg(message: _149.LimitParams): _149.LimitParamsProtoMsg;
        };
        Limiter: {
            typeUrl: string;
            is(o: any): o is _149.Limiter;
            isSDK(o: any): o is _149.LimiterSDKType;
            isAmino(o: any): o is _149.LimiterAmino;
            encode(message: _149.Limiter, writer?: import("..").BinaryWriter): import("..").BinaryWriter;
            decode(input: import("..").BinaryReader | Uint8Array, length?: number): _149.Limiter;
            fromPartial(object: Partial<_149.Limiter>): _149.Limiter;
            fromAmino(object: _149.LimiterAmino): _149.Limiter;
            toAmino(message: _149.Limiter): _149.LimiterAmino;
            fromAminoMsg(object: _149.LimiterAminoMsg): _149.Limiter;
            fromProtoMsg(message: _149.LimiterProtoMsg): _149.Limiter;
            toProto(message: _149.Limiter): Uint8Array;
            toProtoMsg(message: _149.Limiter): _149.LimiterProtoMsg;
        };
        GenesisState: {
            typeUrl: string;
            is(o: any): o is _148.GenesisState;
            isSDK(o: any): o is _148.GenesisStateSDKType;
            isAmino(o: any): o is _148.GenesisStateAmino;
            encode(message: _148.GenesisState, writer?: import("..").BinaryWriter): import("..").BinaryWriter;
            decode(input: import("..").BinaryReader | Uint8Array, length?: number): _148.GenesisState;
            fromPartial(object: Partial<_148.GenesisState>): _148.GenesisState;
            fromAmino(object: _148.GenesisStateAmino): _148.GenesisState;
            toAmino(message: _148.GenesisState): _148.GenesisStateAmino;
            fromAminoMsg(object: _148.GenesisStateAminoMsg): _148.GenesisState;
            fromProtoMsg(message: _148.GenesisStateProtoMsg): _148.GenesisState;
            toProto(message: _148.GenesisState): Uint8Array;
            toProtoMsg(message: _148.GenesisState): _148.GenesisStateProtoMsg;
        };
        DenomCapacity: {
            typeUrl: string;
            is(o: any): o is _147.DenomCapacity;
            isSDK(o: any): o is _147.DenomCapacitySDKType;
            isAmino(o: any): o is _147.DenomCapacityAmino;
            encode(message: _147.DenomCapacity, writer?: import("..").BinaryWriter): import("..").BinaryWriter;
            decode(input: import("..").BinaryReader | Uint8Array, length?: number): _147.DenomCapacity;
            fromPartial(object: Partial<_147.DenomCapacity>): _147.DenomCapacity;
            fromAmino(object: _147.DenomCapacityAmino): _147.DenomCapacity;
            toAmino(message: _147.DenomCapacity): _147.DenomCapacityAmino;
            fromAminoMsg(object: _147.DenomCapacityAminoMsg): _147.DenomCapacity;
            fromProtoMsg(message: _147.DenomCapacityProtoMsg): _147.DenomCapacity;
            toProto(message: _147.DenomCapacity): Uint8Array;
            toProtoMsg(message: _147.DenomCapacity): _147.DenomCapacityProtoMsg;
        };
        LimiterCapacity: {
            typeUrl: string;
            is(o: any): o is _147.LimiterCapacity;
            isSDK(o: any): o is _147.LimiterCapacitySDKType;
            isAmino(o: any): o is _147.LimiterCapacityAmino;
            encode(message: _147.LimiterCapacity, writer?: import("..").BinaryWriter): import("..").BinaryWriter;
            decode(input: import("..").BinaryReader | Uint8Array, length?: number): _147.LimiterCapacity;
            fromPartial(object: Partial<_147.LimiterCapacity>): _147.LimiterCapacity;
            fromAmino(object: _147.LimiterCapacityAmino): _147.LimiterCapacity;
            toAmino(message: _147.LimiterCapacity): _147.LimiterCapacityAmino;
            fromAminoMsg(object: _147.LimiterCapacityAminoMsg): _147.LimiterCapacity;
            fromProtoMsg(message: _147.LimiterCapacityProtoMsg): _147.LimiterCapacity;
            toProto(message: _147.LimiterCapacity): Uint8Array;
            toProtoMsg(message: _147.LimiterCapacity): _147.LimiterCapacityProtoMsg;
        };
    };
    const sending: {
        MsgClientImpl: typeof _293.MsgClientImpl;
        createClientImpl: (rpc: import("../helpers").Rpc) => _293.MsgClientImpl;
        QueryClientImpl: typeof _282.QueryClientImpl;
        createRpcQueryExtension: (base: import("@cosmjs/stargate").QueryClient) => {};
        registry: ReadonlyArray<[string, import("@cosmjs/proto-signing").GeneratedType]>;
        load: (protoRegistry: import("@cosmjs/proto-signing").Registry) => void;
        MessageComposer: {
            encoded: {
                createTransfer(value: _156.MsgCreateTransfer): {
                    typeUrl: string;
                    value: Uint8Array<ArrayBufferLike>;
                };
                depositToSubaccount(value: _155.MsgDepositToSubaccount): {
                    typeUrl: string;
                    value: Uint8Array<ArrayBufferLike>;
                };
                withdrawFromSubaccount(value: _155.MsgWithdrawFromSubaccount): {
                    typeUrl: string;
                    value: Uint8Array<ArrayBufferLike>;
                };
                sendFromModuleToAccount(value: _155.MsgSendFromModuleToAccount): {
                    typeUrl: string;
                    value: Uint8Array<ArrayBufferLike>;
                };
            };
            withTypeUrl: {
                createTransfer(value: _156.MsgCreateTransfer): {
                    typeUrl: string;
                    value: _156.MsgCreateTransfer;
                };
                depositToSubaccount(value: _155.MsgDepositToSubaccount): {
                    typeUrl: string;
                    value: _155.MsgDepositToSubaccount;
                };
                withdrawFromSubaccount(value: _155.MsgWithdrawFromSubaccount): {
                    typeUrl: string;
                    value: _155.MsgWithdrawFromSubaccount;
                };
                sendFromModuleToAccount(value: _155.MsgSendFromModuleToAccount): {
                    typeUrl: string;
                    value: _155.MsgSendFromModuleToAccount;
                };
            };
            fromPartial: {
                createTransfer(value: _156.MsgCreateTransfer): {
                    typeUrl: string;
                    value: _156.MsgCreateTransfer;
                };
                depositToSubaccount(value: _155.MsgDepositToSubaccount): {
                    typeUrl: string;
                    value: _155.MsgDepositToSubaccount;
                };
                withdrawFromSubaccount(value: _155.MsgWithdrawFromSubaccount): {
                    typeUrl: string;
                    value: _155.MsgWithdrawFromSubaccount;
                };
                sendFromModuleToAccount(value: _155.MsgSendFromModuleToAccount): {
                    typeUrl: string;
                    value: _155.MsgSendFromModuleToAccount;
                };
            };
        };
        AminoConverter: {
            "/klyraprotocol.sending.MsgCreateTransfer": {
                aminoType: string;
                toAmino: (message: _156.MsgCreateTransfer) => _156.MsgCreateTransferAmino;
                fromAmino: (object: _156.MsgCreateTransferAmino) => _156.MsgCreateTransfer;
            };
            "/klyraprotocol.sending.MsgDepositToSubaccount": {
                aminoType: string;
                toAmino: (message: _155.MsgDepositToSubaccount) => _155.MsgDepositToSubaccountAmino;
                fromAmino: (object: _155.MsgDepositToSubaccountAmino) => _155.MsgDepositToSubaccount;
            };
            "/klyraprotocol.sending.MsgWithdrawFromSubaccount": {
                aminoType: string;
                toAmino: (message: _155.MsgWithdrawFromSubaccount) => _155.MsgWithdrawFromSubaccountAmino;
                fromAmino: (object: _155.MsgWithdrawFromSubaccountAmino) => _155.MsgWithdrawFromSubaccount;
            };
            "/klyraprotocol.sending.MsgSendFromModuleToAccount": {
                aminoType: string;
                toAmino: (message: _155.MsgSendFromModuleToAccount) => _155.MsgSendFromModuleToAccountAmino;
                fromAmino: (object: _155.MsgSendFromModuleToAccountAmino) => _155.MsgSendFromModuleToAccount;
            };
        };
        MsgCreateTransfer: {
            typeUrl: string;
            is(o: any): o is _156.MsgCreateTransfer;
            isSDK(o: any): o is _156.MsgCreateTransferSDKType;
            isAmino(o: any): o is _156.MsgCreateTransferAmino;
            encode(message: _156.MsgCreateTransfer, writer?: import("..").BinaryWriter): import("..").BinaryWriter;
            decode(input: import("..").BinaryReader | Uint8Array, length?: number): _156.MsgCreateTransfer;
            fromPartial(object: Partial<_156.MsgCreateTransfer>): _156.MsgCreateTransfer;
            fromAmino(object: _156.MsgCreateTransferAmino): _156.MsgCreateTransfer;
            toAmino(message: _156.MsgCreateTransfer): _156.MsgCreateTransferAmino;
            fromAminoMsg(object: _156.MsgCreateTransferAminoMsg): _156.MsgCreateTransfer;
            fromProtoMsg(message: _156.MsgCreateTransferProtoMsg): _156.MsgCreateTransfer;
            toProto(message: _156.MsgCreateTransfer): Uint8Array;
            toProtoMsg(message: _156.MsgCreateTransfer): _156.MsgCreateTransferProtoMsg;
        };
        MsgCreateTransferResponse: {
            typeUrl: string;
            is(o: any): o is _156.MsgCreateTransferResponse;
            isSDK(o: any): o is _156.MsgCreateTransferResponseSDKType;
            isAmino(o: any): o is _156.MsgCreateTransferResponseAmino;
            encode(_: _156.MsgCreateTransferResponse, writer?: import("..").BinaryWriter): import("..").BinaryWriter;
            decode(input: import("..").BinaryReader | Uint8Array, length?: number): _156.MsgCreateTransferResponse;
            fromPartial(_: Partial<_156.MsgCreateTransferResponse>): _156.MsgCreateTransferResponse;
            fromAmino(_: _156.MsgCreateTransferResponseAmino): _156.MsgCreateTransferResponse;
            toAmino(_: _156.MsgCreateTransferResponse): _156.MsgCreateTransferResponseAmino;
            fromAminoMsg(object: _156.MsgCreateTransferResponseAminoMsg): _156.MsgCreateTransferResponse;
            fromProtoMsg(message: _156.MsgCreateTransferResponseProtoMsg): _156.MsgCreateTransferResponse;
            toProto(message: _156.MsgCreateTransferResponse): Uint8Array;
            toProtoMsg(message: _156.MsgCreateTransferResponse): _156.MsgCreateTransferResponseProtoMsg;
        };
        MsgDepositToSubaccountResponse: {
            typeUrl: string;
            is(o: any): o is _156.MsgDepositToSubaccountResponse;
            isSDK(o: any): o is _156.MsgDepositToSubaccountResponseSDKType;
            isAmino(o: any): o is _156.MsgDepositToSubaccountResponseAmino;
            encode(_: _156.MsgDepositToSubaccountResponse, writer?: import("..").BinaryWriter): import("..").BinaryWriter;
            decode(input: import("..").BinaryReader | Uint8Array, length?: number): _156.MsgDepositToSubaccountResponse;
            fromPartial(_: Partial<_156.MsgDepositToSubaccountResponse>): _156.MsgDepositToSubaccountResponse;
            fromAmino(_: _156.MsgDepositToSubaccountResponseAmino): _156.MsgDepositToSubaccountResponse;
            toAmino(_: _156.MsgDepositToSubaccountResponse): _156.MsgDepositToSubaccountResponseAmino;
            fromAminoMsg(object: _156.MsgDepositToSubaccountResponseAminoMsg): _156.MsgDepositToSubaccountResponse;
            fromProtoMsg(message: _156.MsgDepositToSubaccountResponseProtoMsg): _156.MsgDepositToSubaccountResponse;
            toProto(message: _156.MsgDepositToSubaccountResponse): Uint8Array;
            toProtoMsg(message: _156.MsgDepositToSubaccountResponse): _156.MsgDepositToSubaccountResponseProtoMsg;
        };
        MsgWithdrawFromSubaccountResponse: {
            typeUrl: string;
            is(o: any): o is _156.MsgWithdrawFromSubaccountResponse;
            isSDK(o: any): o is _156.MsgWithdrawFromSubaccountResponseSDKType;
            isAmino(o: any): o is _156.MsgWithdrawFromSubaccountResponseAmino;
            encode(_: _156.MsgWithdrawFromSubaccountResponse, writer?: import("..").BinaryWriter): import("..").BinaryWriter;
            decode(input: import("..").BinaryReader | Uint8Array, length?: number): _156.MsgWithdrawFromSubaccountResponse;
            fromPartial(_: Partial<_156.MsgWithdrawFromSubaccountResponse>): _156.MsgWithdrawFromSubaccountResponse;
            fromAmino(_: _156.MsgWithdrawFromSubaccountResponseAmino): _156.MsgWithdrawFromSubaccountResponse;
            toAmino(_: _156.MsgWithdrawFromSubaccountResponse): _156.MsgWithdrawFromSubaccountResponseAmino;
            fromAminoMsg(object: _156.MsgWithdrawFromSubaccountResponseAminoMsg): _156.MsgWithdrawFromSubaccountResponse;
            fromProtoMsg(message: _156.MsgWithdrawFromSubaccountResponseProtoMsg): _156.MsgWithdrawFromSubaccountResponse;
            toProto(message: _156.MsgWithdrawFromSubaccountResponse): Uint8Array;
            toProtoMsg(message: _156.MsgWithdrawFromSubaccountResponse): _156.MsgWithdrawFromSubaccountResponseProtoMsg;
        };
        MsgSendFromModuleToAccountResponse: {
            typeUrl: string;
            is(o: any): o is _156.MsgSendFromModuleToAccountResponse;
            isSDK(o: any): o is _156.MsgSendFromModuleToAccountResponseSDKType;
            isAmino(o: any): o is _156.MsgSendFromModuleToAccountResponseAmino;
            encode(_: _156.MsgSendFromModuleToAccountResponse, writer?: import("..").BinaryWriter): import("..").BinaryWriter;
            decode(input: import("..").BinaryReader | Uint8Array, length?: number): _156.MsgSendFromModuleToAccountResponse;
            fromPartial(_: Partial<_156.MsgSendFromModuleToAccountResponse>): _156.MsgSendFromModuleToAccountResponse;
            fromAmino(_: _156.MsgSendFromModuleToAccountResponseAmino): _156.MsgSendFromModuleToAccountResponse;
            toAmino(_: _156.MsgSendFromModuleToAccountResponse): _156.MsgSendFromModuleToAccountResponseAmino;
            fromAminoMsg(object: _156.MsgSendFromModuleToAccountResponseAminoMsg): _156.MsgSendFromModuleToAccountResponse;
            fromProtoMsg(message: _156.MsgSendFromModuleToAccountResponseProtoMsg): _156.MsgSendFromModuleToAccountResponse;
            toProto(message: _156.MsgSendFromModuleToAccountResponse): Uint8Array;
            toProtoMsg(message: _156.MsgSendFromModuleToAccountResponse): _156.MsgSendFromModuleToAccountResponseProtoMsg;
        };
        Transfer: {
            typeUrl: string;
            is(o: any): o is _155.Transfer;
            isSDK(o: any): o is _155.TransferSDKType;
            isAmino(o: any): o is _155.TransferAmino;
            encode(message: _155.Transfer, writer?: import("..").BinaryWriter): import("..").BinaryWriter;
            decode(input: import("..").BinaryReader | Uint8Array, length?: number): _155.Transfer;
            fromPartial(object: Partial<_155.Transfer>): _155.Transfer;
            fromAmino(object: _155.TransferAmino): _155.Transfer;
            toAmino(message: _155.Transfer): _155.TransferAmino;
            fromAminoMsg(object: _155.TransferAminoMsg): _155.Transfer;
            fromProtoMsg(message: _155.TransferProtoMsg): _155.Transfer;
            toProto(message: _155.Transfer): Uint8Array;
            toProtoMsg(message: _155.Transfer): _155.TransferProtoMsg;
        };
        MsgDepositToSubaccount: {
            typeUrl: string;
            is(o: any): o is _155.MsgDepositToSubaccount;
            isSDK(o: any): o is _155.MsgDepositToSubaccountSDKType;
            isAmino(o: any): o is _155.MsgDepositToSubaccountAmino;
            encode(message: _155.MsgDepositToSubaccount, writer?: import("..").BinaryWriter): import("..").BinaryWriter;
            decode(input: import("..").BinaryReader | Uint8Array, length?: number): _155.MsgDepositToSubaccount;
            fromPartial(object: Partial<_155.MsgDepositToSubaccount>): _155.MsgDepositToSubaccount;
            fromAmino(object: _155.MsgDepositToSubaccountAmino): _155.MsgDepositToSubaccount;
            toAmino(message: _155.MsgDepositToSubaccount): _155.MsgDepositToSubaccountAmino;
            fromAminoMsg(object: _155.MsgDepositToSubaccountAminoMsg): _155.MsgDepositToSubaccount;
            fromProtoMsg(message: _155.MsgDepositToSubaccountProtoMsg): _155.MsgDepositToSubaccount;
            toProto(message: _155.MsgDepositToSubaccount): Uint8Array;
            toProtoMsg(message: _155.MsgDepositToSubaccount): _155.MsgDepositToSubaccountProtoMsg;
        };
        MsgWithdrawFromSubaccount: {
            typeUrl: string;
            is(o: any): o is _155.MsgWithdrawFromSubaccount;
            isSDK(o: any): o is _155.MsgWithdrawFromSubaccountSDKType;
            isAmino(o: any): o is _155.MsgWithdrawFromSubaccountAmino;
            encode(message: _155.MsgWithdrawFromSubaccount, writer?: import("..").BinaryWriter): import("..").BinaryWriter;
            decode(input: import("..").BinaryReader | Uint8Array, length?: number): _155.MsgWithdrawFromSubaccount;
            fromPartial(object: Partial<_155.MsgWithdrawFromSubaccount>): _155.MsgWithdrawFromSubaccount;
            fromAmino(object: _155.MsgWithdrawFromSubaccountAmino): _155.MsgWithdrawFromSubaccount;
            toAmino(message: _155.MsgWithdrawFromSubaccount): _155.MsgWithdrawFromSubaccountAmino;
            fromAminoMsg(object: _155.MsgWithdrawFromSubaccountAminoMsg): _155.MsgWithdrawFromSubaccount;
            fromProtoMsg(message: _155.MsgWithdrawFromSubaccountProtoMsg): _155.MsgWithdrawFromSubaccount;
            toProto(message: _155.MsgWithdrawFromSubaccount): Uint8Array;
            toProtoMsg(message: _155.MsgWithdrawFromSubaccount): _155.MsgWithdrawFromSubaccountProtoMsg;
        };
        MsgSendFromModuleToAccount: {
            typeUrl: string;
            is(o: any): o is _155.MsgSendFromModuleToAccount;
            isSDK(o: any): o is _155.MsgSendFromModuleToAccountSDKType;
            isAmino(o: any): o is _155.MsgSendFromModuleToAccountAmino;
            encode(message: _155.MsgSendFromModuleToAccount, writer?: import("..").BinaryWriter): import("..").BinaryWriter;
            decode(input: import("..").BinaryReader | Uint8Array, length?: number): _155.MsgSendFromModuleToAccount;
            fromPartial(object: Partial<_155.MsgSendFromModuleToAccount>): _155.MsgSendFromModuleToAccount;
            fromAmino(object: _155.MsgSendFromModuleToAccountAmino): _155.MsgSendFromModuleToAccount;
            toAmino(message: _155.MsgSendFromModuleToAccount): _155.MsgSendFromModuleToAccountAmino;
            fromAminoMsg(object: _155.MsgSendFromModuleToAccountAminoMsg): _155.MsgSendFromModuleToAccount;
            fromProtoMsg(message: _155.MsgSendFromModuleToAccountProtoMsg): _155.MsgSendFromModuleToAccount;
            toProto(message: _155.MsgSendFromModuleToAccount): Uint8Array;
            toProtoMsg(message: _155.MsgSendFromModuleToAccount): _155.MsgSendFromModuleToAccountProtoMsg;
        };
        GenesisState: {
            typeUrl: string;
            is(o: any): o is _153.GenesisState;
            isSDK(o: any): o is _153.GenesisStateSDKType;
            isAmino(o: any): o is _153.GenesisStateAmino;
            encode(_: _153.GenesisState, writer?: import("..").BinaryWriter): import("..").BinaryWriter;
            decode(input: import("..").BinaryReader | Uint8Array, length?: number): _153.GenesisState;
            fromPartial(_: Partial<_153.GenesisState>): _153.GenesisState;
            fromAmino(_: _153.GenesisStateAmino): _153.GenesisState;
            toAmino(_: _153.GenesisState): _153.GenesisStateAmino;
            fromAminoMsg(object: _153.GenesisStateAminoMsg): _153.GenesisState;
            fromProtoMsg(message: _153.GenesisStateProtoMsg): _153.GenesisState;
            toProto(message: _153.GenesisState): Uint8Array;
            toProtoMsg(message: _153.GenesisState): _153.GenesisStateProtoMsg;
        };
    };
    const stats: {
        MsgClientImpl: typeof _294.MsgClientImpl;
        createClientImpl: (rpc: import("../helpers").Rpc) => _294.MsgClientImpl;
        QueryClientImpl: typeof _283.QueryClientImpl;
        createRpcQueryExtension: (base: import("@cosmjs/stargate").QueryClient) => {
            params(request?: _159.QueryParamsRequest): Promise<_159.QueryParamsResponse>;
            statsMetadata(request?: _159.QueryStatsMetadataRequest): Promise<_159.QueryStatsMetadataResponse>;
            globalStats(request?: _159.QueryGlobalStatsRequest): Promise<_159.QueryGlobalStatsResponse>;
            userStats(request: _159.QueryUserStatsRequest): Promise<_159.QueryUserStatsResponse>;
        };
        LCDQueryClient: typeof _270.LCDQueryClient;
        registry: ReadonlyArray<[string, import("@cosmjs/proto-signing").GeneratedType]>;
        load: (protoRegistry: import("@cosmjs/proto-signing").Registry) => void;
        MessageComposer: {
            encoded: {
                updateParams(value: _161.MsgUpdateParams): {
                    typeUrl: string;
                    value: Uint8Array<ArrayBufferLike>;
                };
            };
            withTypeUrl: {
                updateParams(value: _161.MsgUpdateParams): {
                    typeUrl: string;
                    value: _161.MsgUpdateParams;
                };
            };
            fromPartial: {
                updateParams(value: _161.MsgUpdateParams): {
                    typeUrl: string;
                    value: _161.MsgUpdateParams;
                };
            };
        };
        AminoConverter: {
            "/klyraprotocol.stats.MsgUpdateParams": {
                aminoType: string;
                toAmino: (message: _161.MsgUpdateParams) => _161.MsgUpdateParamsAmino;
                fromAmino: (object: _161.MsgUpdateParamsAmino) => _161.MsgUpdateParams;
            };
        };
        MsgUpdateParams: {
            typeUrl: string;
            is(o: any): o is _161.MsgUpdateParams;
            isSDK(o: any): o is _161.MsgUpdateParamsSDKType;
            isAmino(o: any): o is _161.MsgUpdateParamsAmino;
            encode(message: _161.MsgUpdateParams, writer?: import("..").BinaryWriter): import("..").BinaryWriter;
            decode(input: import("..").BinaryReader | Uint8Array, length?: number): _161.MsgUpdateParams;
            fromPartial(object: Partial<_161.MsgUpdateParams>): _161.MsgUpdateParams;
            fromAmino(object: _161.MsgUpdateParamsAmino): _161.MsgUpdateParams;
            toAmino(message: _161.MsgUpdateParams): _161.MsgUpdateParamsAmino;
            fromAminoMsg(object: _161.MsgUpdateParamsAminoMsg): _161.MsgUpdateParams;
            fromProtoMsg(message: _161.MsgUpdateParamsProtoMsg): _161.MsgUpdateParams;
            toProto(message: _161.MsgUpdateParams): Uint8Array;
            toProtoMsg(message: _161.MsgUpdateParams): _161.MsgUpdateParamsProtoMsg;
        };
        MsgUpdateParamsResponse: {
            typeUrl: string;
            is(o: any): o is _161.MsgUpdateParamsResponse;
            isSDK(o: any): o is _161.MsgUpdateParamsResponseSDKType;
            isAmino(o: any): o is _161.MsgUpdateParamsResponseAmino;
            encode(_: _161.MsgUpdateParamsResponse, writer?: import("..").BinaryWriter): import("..").BinaryWriter;
            decode(input: import("..").BinaryReader | Uint8Array, length?: number): _161.MsgUpdateParamsResponse;
            fromPartial(_: Partial<_161.MsgUpdateParamsResponse>): _161.MsgUpdateParamsResponse;
            fromAmino(_: _161.MsgUpdateParamsResponseAmino): _161.MsgUpdateParamsResponse;
            toAmino(_: _161.MsgUpdateParamsResponse): _161.MsgUpdateParamsResponseAmino;
            fromAminoMsg(object: _161.MsgUpdateParamsResponseAminoMsg): _161.MsgUpdateParamsResponse;
            fromProtoMsg(message: _161.MsgUpdateParamsResponseProtoMsg): _161.MsgUpdateParamsResponse;
            toProto(message: _161.MsgUpdateParamsResponse): Uint8Array;
            toProtoMsg(message: _161.MsgUpdateParamsResponse): _161.MsgUpdateParamsResponseProtoMsg;
        };
        BlockStats: {
            typeUrl: string;
            is(o: any): o is _160.BlockStats;
            isSDK(o: any): o is _160.BlockStatsSDKType;
            isAmino(o: any): o is _160.BlockStatsAmino;
            encode(message: _160.BlockStats, writer?: import("..").BinaryWriter): import("..").BinaryWriter;
            decode(input: import("..").BinaryReader | Uint8Array, length?: number): _160.BlockStats;
            fromPartial(object: Partial<_160.BlockStats>): _160.BlockStats;
            fromAmino(object: _160.BlockStatsAmino): _160.BlockStats;
            toAmino(message: _160.BlockStats): _160.BlockStatsAmino;
            fromAminoMsg(object: _160.BlockStatsAminoMsg): _160.BlockStats;
            fromProtoMsg(message: _160.BlockStatsProtoMsg): _160.BlockStats;
            toProto(message: _160.BlockStats): Uint8Array;
            toProtoMsg(message: _160.BlockStats): _160.BlockStatsProtoMsg;
        };
        BlockStats_Fill: {
            typeUrl: string;
            is(o: any): o is _160.BlockStats_Fill;
            isSDK(o: any): o is _160.BlockStats_FillSDKType;
            isAmino(o: any): o is _160.BlockStats_FillAmino;
            encode(message: _160.BlockStats_Fill, writer?: import("..").BinaryWriter): import("..").BinaryWriter;
            decode(input: import("..").BinaryReader | Uint8Array, length?: number): _160.BlockStats_Fill;
            fromPartial(object: Partial<_160.BlockStats_Fill>): _160.BlockStats_Fill;
            fromAmino(object: _160.BlockStats_FillAmino): _160.BlockStats_Fill;
            toAmino(message: _160.BlockStats_Fill): _160.BlockStats_FillAmino;
            fromAminoMsg(object: _160.BlockStats_FillAminoMsg): _160.BlockStats_Fill;
            fromProtoMsg(message: _160.BlockStats_FillProtoMsg): _160.BlockStats_Fill;
            toProto(message: _160.BlockStats_Fill): Uint8Array;
            toProtoMsg(message: _160.BlockStats_Fill): _160.BlockStats_FillProtoMsg;
        };
        StatsMetadata: {
            typeUrl: string;
            is(o: any): o is _160.StatsMetadata;
            isSDK(o: any): o is _160.StatsMetadataSDKType;
            isAmino(o: any): o is _160.StatsMetadataAmino;
            encode(message: _160.StatsMetadata, writer?: import("..").BinaryWriter): import("..").BinaryWriter;
            decode(input: import("..").BinaryReader | Uint8Array, length?: number): _160.StatsMetadata;
            fromPartial(object: Partial<_160.StatsMetadata>): _160.StatsMetadata;
            fromAmino(object: _160.StatsMetadataAmino): _160.StatsMetadata;
            toAmino(message: _160.StatsMetadata): _160.StatsMetadataAmino;
            fromAminoMsg(object: _160.StatsMetadataAminoMsg): _160.StatsMetadata;
            fromProtoMsg(message: _160.StatsMetadataProtoMsg): _160.StatsMetadata;
            toProto(message: _160.StatsMetadata): Uint8Array;
            toProtoMsg(message: _160.StatsMetadata): _160.StatsMetadataProtoMsg;
        };
        EpochStats: {
            typeUrl: string;
            is(o: any): o is _160.EpochStats;
            isSDK(o: any): o is _160.EpochStatsSDKType;
            isAmino(o: any): o is _160.EpochStatsAmino;
            encode(message: _160.EpochStats, writer?: import("..").BinaryWriter): import("..").BinaryWriter;
            decode(input: import("..").BinaryReader | Uint8Array, length?: number): _160.EpochStats;
            fromPartial(object: Partial<_160.EpochStats>): _160.EpochStats;
            fromAmino(object: _160.EpochStatsAmino): _160.EpochStats;
            toAmino(message: _160.EpochStats): _160.EpochStatsAmino;
            fromAminoMsg(object: _160.EpochStatsAminoMsg): _160.EpochStats;
            fromProtoMsg(message: _160.EpochStatsProtoMsg): _160.EpochStats;
            toProto(message: _160.EpochStats): Uint8Array;
            toProtoMsg(message: _160.EpochStats): _160.EpochStatsProtoMsg;
        };
        EpochStats_UserWithStats: {
            typeUrl: string;
            is(o: any): o is _160.EpochStats_UserWithStats;
            isSDK(o: any): o is _160.EpochStats_UserWithStatsSDKType;
            isAmino(o: any): o is _160.EpochStats_UserWithStatsAmino;
            encode(message: _160.EpochStats_UserWithStats, writer?: import("..").BinaryWriter): import("..").BinaryWriter;
            decode(input: import("..").BinaryReader | Uint8Array, length?: number): _160.EpochStats_UserWithStats;
            fromPartial(object: Partial<_160.EpochStats_UserWithStats>): _160.EpochStats_UserWithStats;
            fromAmino(object: _160.EpochStats_UserWithStatsAmino): _160.EpochStats_UserWithStats;
            toAmino(message: _160.EpochStats_UserWithStats): _160.EpochStats_UserWithStatsAmino;
            fromAminoMsg(object: _160.EpochStats_UserWithStatsAminoMsg): _160.EpochStats_UserWithStats;
            fromProtoMsg(message: _160.EpochStats_UserWithStatsProtoMsg): _160.EpochStats_UserWithStats;
            toProto(message: _160.EpochStats_UserWithStats): Uint8Array;
            toProtoMsg(message: _160.EpochStats_UserWithStats): _160.EpochStats_UserWithStatsProtoMsg;
        };
        GlobalStats: {
            typeUrl: string;
            is(o: any): o is _160.GlobalStats;
            isSDK(o: any): o is _160.GlobalStatsSDKType;
            isAmino(o: any): o is _160.GlobalStatsAmino;
            encode(message: _160.GlobalStats, writer?: import("..").BinaryWriter): import("..").BinaryWriter;
            decode(input: import("..").BinaryReader | Uint8Array, length?: number): _160.GlobalStats;
            fromPartial(object: Partial<_160.GlobalStats>): _160.GlobalStats;
            fromAmino(object: _160.GlobalStatsAmino): _160.GlobalStats;
            toAmino(message: _160.GlobalStats): _160.GlobalStatsAmino;
            fromAminoMsg(object: _160.GlobalStatsAminoMsg): _160.GlobalStats;
            fromProtoMsg(message: _160.GlobalStatsProtoMsg): _160.GlobalStats;
            toProto(message: _160.GlobalStats): Uint8Array;
            toProtoMsg(message: _160.GlobalStats): _160.GlobalStatsProtoMsg;
        };
        UserStats: {
            typeUrl: string;
            is(o: any): o is _160.UserStats;
            isSDK(o: any): o is _160.UserStatsSDKType;
            isAmino(o: any): o is _160.UserStatsAmino;
            encode(message: _160.UserStats, writer?: import("..").BinaryWriter): import("..").BinaryWriter;
            decode(input: import("..").BinaryReader | Uint8Array, length?: number): _160.UserStats;
            fromPartial(object: Partial<_160.UserStats>): _160.UserStats;
            fromAmino(object: _160.UserStatsAmino): _160.UserStats;
            toAmino(message: _160.UserStats): _160.UserStatsAmino;
            fromAminoMsg(object: _160.UserStatsAminoMsg): _160.UserStats;
            fromProtoMsg(message: _160.UserStatsProtoMsg): _160.UserStats;
            toProto(message: _160.UserStats): Uint8Array;
            toProtoMsg(message: _160.UserStats): _160.UserStatsProtoMsg;
        };
        QueryParamsRequest: {
            typeUrl: string;
            is(o: any): o is _159.QueryParamsRequest;
            isSDK(o: any): o is _159.QueryParamsRequestSDKType;
            isAmino(o: any): o is _159.QueryParamsRequestAmino;
            encode(_: _159.QueryParamsRequest, writer?: import("..").BinaryWriter): import("..").BinaryWriter;
            decode(input: import("..").BinaryReader | Uint8Array, length?: number): _159.QueryParamsRequest;
            fromPartial(_: Partial<_159.QueryParamsRequest>): _159.QueryParamsRequest;
            fromAmino(_: _159.QueryParamsRequestAmino): _159.QueryParamsRequest;
            toAmino(_: _159.QueryParamsRequest): _159.QueryParamsRequestAmino;
            fromAminoMsg(object: _159.QueryParamsRequestAminoMsg): _159.QueryParamsRequest;
            fromProtoMsg(message: _159.QueryParamsRequestProtoMsg): _159.QueryParamsRequest;
            toProto(message: _159.QueryParamsRequest): Uint8Array;
            toProtoMsg(message: _159.QueryParamsRequest): _159.QueryParamsRequestProtoMsg;
        };
        QueryParamsResponse: {
            typeUrl: string;
            is(o: any): o is _159.QueryParamsResponse;
            isSDK(o: any): o is _159.QueryParamsResponseSDKType;
            isAmino(o: any): o is _159.QueryParamsResponseAmino;
            encode(message: _159.QueryParamsResponse, writer?: import("..").BinaryWriter): import("..").BinaryWriter;
            decode(input: import("..").BinaryReader | Uint8Array, length?: number): _159.QueryParamsResponse;
            fromPartial(object: Partial<_159.QueryParamsResponse>): _159.QueryParamsResponse;
            fromAmino(object: _159.QueryParamsResponseAmino): _159.QueryParamsResponse;
            toAmino(message: _159.QueryParamsResponse): _159.QueryParamsResponseAmino;
            fromAminoMsg(object: _159.QueryParamsResponseAminoMsg): _159.QueryParamsResponse;
            fromProtoMsg(message: _159.QueryParamsResponseProtoMsg): _159.QueryParamsResponse;
            toProto(message: _159.QueryParamsResponse): Uint8Array;
            toProtoMsg(message: _159.QueryParamsResponse): _159.QueryParamsResponseProtoMsg;
        };
        QueryStatsMetadataRequest: {
            typeUrl: string;
            is(o: any): o is _159.QueryStatsMetadataRequest;
            isSDK(o: any): o is _159.QueryStatsMetadataRequestSDKType;
            isAmino(o: any): o is _159.QueryStatsMetadataRequestAmino;
            encode(_: _159.QueryStatsMetadataRequest, writer?: import("..").BinaryWriter): import("..").BinaryWriter;
            decode(input: import("..").BinaryReader | Uint8Array, length?: number): _159.QueryStatsMetadataRequest;
            fromPartial(_: Partial<_159.QueryStatsMetadataRequest>): _159.QueryStatsMetadataRequest;
            fromAmino(_: _159.QueryStatsMetadataRequestAmino): _159.QueryStatsMetadataRequest;
            toAmino(_: _159.QueryStatsMetadataRequest): _159.QueryStatsMetadataRequestAmino;
            fromAminoMsg(object: _159.QueryStatsMetadataRequestAminoMsg): _159.QueryStatsMetadataRequest;
            fromProtoMsg(message: _159.QueryStatsMetadataRequestProtoMsg): _159.QueryStatsMetadataRequest;
            toProto(message: _159.QueryStatsMetadataRequest): Uint8Array;
            toProtoMsg(message: _159.QueryStatsMetadataRequest): _159.QueryStatsMetadataRequestProtoMsg;
        };
        QueryStatsMetadataResponse: {
            typeUrl: string;
            is(o: any): o is _159.QueryStatsMetadataResponse;
            isSDK(o: any): o is _159.QueryStatsMetadataResponseSDKType;
            isAmino(o: any): o is _159.QueryStatsMetadataResponseAmino;
            encode(message: _159.QueryStatsMetadataResponse, writer?: import("..").BinaryWriter): import("..").BinaryWriter;
            decode(input: import("..").BinaryReader | Uint8Array, length?: number): _159.QueryStatsMetadataResponse;
            fromPartial(object: Partial<_159.QueryStatsMetadataResponse>): _159.QueryStatsMetadataResponse;
            fromAmino(object: _159.QueryStatsMetadataResponseAmino): _159.QueryStatsMetadataResponse;
            toAmino(message: _159.QueryStatsMetadataResponse): _159.QueryStatsMetadataResponseAmino;
            fromAminoMsg(object: _159.QueryStatsMetadataResponseAminoMsg): _159.QueryStatsMetadataResponse;
            fromProtoMsg(message: _159.QueryStatsMetadataResponseProtoMsg): _159.QueryStatsMetadataResponse;
            toProto(message: _159.QueryStatsMetadataResponse): Uint8Array;
            toProtoMsg(message: _159.QueryStatsMetadataResponse): _159.QueryStatsMetadataResponseProtoMsg;
        };
        QueryGlobalStatsRequest: {
            typeUrl: string;
            is(o: any): o is _159.QueryGlobalStatsRequest;
            isSDK(o: any): o is _159.QueryGlobalStatsRequestSDKType;
            isAmino(o: any): o is _159.QueryGlobalStatsRequestAmino;
            encode(_: _159.QueryGlobalStatsRequest, writer?: import("..").BinaryWriter): import("..").BinaryWriter;
            decode(input: import("..").BinaryReader | Uint8Array, length?: number): _159.QueryGlobalStatsRequest;
            fromPartial(_: Partial<_159.QueryGlobalStatsRequest>): _159.QueryGlobalStatsRequest;
            fromAmino(_: _159.QueryGlobalStatsRequestAmino): _159.QueryGlobalStatsRequest;
            toAmino(_: _159.QueryGlobalStatsRequest): _159.QueryGlobalStatsRequestAmino;
            fromAminoMsg(object: _159.QueryGlobalStatsRequestAminoMsg): _159.QueryGlobalStatsRequest;
            fromProtoMsg(message: _159.QueryGlobalStatsRequestProtoMsg): _159.QueryGlobalStatsRequest;
            toProto(message: _159.QueryGlobalStatsRequest): Uint8Array;
            toProtoMsg(message: _159.QueryGlobalStatsRequest): _159.QueryGlobalStatsRequestProtoMsg;
        };
        QueryGlobalStatsResponse: {
            typeUrl: string;
            is(o: any): o is _159.QueryGlobalStatsResponse;
            isSDK(o: any): o is _159.QueryGlobalStatsResponseSDKType;
            isAmino(o: any): o is _159.QueryGlobalStatsResponseAmino;
            encode(message: _159.QueryGlobalStatsResponse, writer?: import("..").BinaryWriter): import("..").BinaryWriter;
            decode(input: import("..").BinaryReader | Uint8Array, length?: number): _159.QueryGlobalStatsResponse;
            fromPartial(object: Partial<_159.QueryGlobalStatsResponse>): _159.QueryGlobalStatsResponse;
            fromAmino(object: _159.QueryGlobalStatsResponseAmino): _159.QueryGlobalStatsResponse;
            toAmino(message: _159.QueryGlobalStatsResponse): _159.QueryGlobalStatsResponseAmino;
            fromAminoMsg(object: _159.QueryGlobalStatsResponseAminoMsg): _159.QueryGlobalStatsResponse;
            fromProtoMsg(message: _159.QueryGlobalStatsResponseProtoMsg): _159.QueryGlobalStatsResponse;
            toProto(message: _159.QueryGlobalStatsResponse): Uint8Array;
            toProtoMsg(message: _159.QueryGlobalStatsResponse): _159.QueryGlobalStatsResponseProtoMsg;
        };
        QueryUserStatsRequest: {
            typeUrl: string;
            is(o: any): o is _159.QueryUserStatsRequest;
            isSDK(o: any): o is _159.QueryUserStatsRequestSDKType;
            isAmino(o: any): o is _159.QueryUserStatsRequestAmino;
            encode(message: _159.QueryUserStatsRequest, writer?: import("..").BinaryWriter): import("..").BinaryWriter;
            decode(input: import("..").BinaryReader | Uint8Array, length?: number): _159.QueryUserStatsRequest;
            fromPartial(object: Partial<_159.QueryUserStatsRequest>): _159.QueryUserStatsRequest;
            fromAmino(object: _159.QueryUserStatsRequestAmino): _159.QueryUserStatsRequest;
            toAmino(message: _159.QueryUserStatsRequest): _159.QueryUserStatsRequestAmino;
            fromAminoMsg(object: _159.QueryUserStatsRequestAminoMsg): _159.QueryUserStatsRequest;
            fromProtoMsg(message: _159.QueryUserStatsRequestProtoMsg): _159.QueryUserStatsRequest;
            toProto(message: _159.QueryUserStatsRequest): Uint8Array;
            toProtoMsg(message: _159.QueryUserStatsRequest): _159.QueryUserStatsRequestProtoMsg;
        };
        QueryUserStatsResponse: {
            typeUrl: string;
            is(o: any): o is _159.QueryUserStatsResponse;
            isSDK(o: any): o is _159.QueryUserStatsResponseSDKType;
            isAmino(o: any): o is _159.QueryUserStatsResponseAmino;
            encode(message: _159.QueryUserStatsResponse, writer?: import("..").BinaryWriter): import("..").BinaryWriter;
            decode(input: import("..").BinaryReader | Uint8Array, length?: number): _159.QueryUserStatsResponse;
            fromPartial(object: Partial<_159.QueryUserStatsResponse>): _159.QueryUserStatsResponse;
            fromAmino(object: _159.QueryUserStatsResponseAmino): _159.QueryUserStatsResponse;
            toAmino(message: _159.QueryUserStatsResponse): _159.QueryUserStatsResponseAmino;
            fromAminoMsg(object: _159.QueryUserStatsResponseAminoMsg): _159.QueryUserStatsResponse;
            fromProtoMsg(message: _159.QueryUserStatsResponseProtoMsg): _159.QueryUserStatsResponse;
            toProto(message: _159.QueryUserStatsResponse): Uint8Array;
            toProtoMsg(message: _159.QueryUserStatsResponse): _159.QueryUserStatsResponseProtoMsg;
        };
        Params: {
            typeUrl: string;
            is(o: any): o is _158.Params;
            isSDK(o: any): o is _158.ParamsSDKType;
            isAmino(o: any): o is _158.ParamsAmino;
            encode(message: _158.Params, writer?: import("..").BinaryWriter): import("..").BinaryWriter;
            decode(input: import("..").BinaryReader | Uint8Array, length?: number): _158.Params;
            fromPartial(object: Partial<_158.Params>): _158.Params;
            fromAmino(object: _158.ParamsAmino): _158.Params;
            toAmino(message: _158.Params): _158.ParamsAmino;
            fromAminoMsg(object: _158.ParamsAminoMsg): _158.Params;
            fromProtoMsg(message: _158.ParamsProtoMsg): _158.Params;
            toProto(message: _158.Params): Uint8Array;
            toProtoMsg(message: _158.Params): _158.ParamsProtoMsg;
        };
        GenesisState: {
            typeUrl: string;
            is(o: any): o is _157.GenesisState;
            isSDK(o: any): o is _157.GenesisStateSDKType;
            isAmino(o: any): o is _157.GenesisStateAmino;
            encode(message: _157.GenesisState, writer?: import("..").BinaryWriter): import("..").BinaryWriter;
            decode(input: import("..").BinaryReader | Uint8Array, length?: number): _157.GenesisState;
            fromPartial(object: Partial<_157.GenesisState>): _157.GenesisState;
            fromAmino(object: _157.GenesisStateAmino): _157.GenesisState;
            toAmino(message: _157.GenesisState): _157.GenesisStateAmino;
            fromAminoMsg(object: _157.GenesisStateAminoMsg): _157.GenesisState;
            fromProtoMsg(message: _157.GenesisStateProtoMsg): _157.GenesisState;
            toProto(message: _157.GenesisState): Uint8Array;
            toProtoMsg(message: _157.GenesisState): _157.GenesisStateProtoMsg;
        };
    };
    const subaccounts: {
        MsgClientImpl: typeof _295.MsgClientImpl;
        createClientImpl: (rpc: import("../helpers").Rpc) => _295.MsgClientImpl;
        QueryClientImpl: typeof _284.QueryClientImpl;
        createRpcQueryExtension: (base: import("@cosmjs/stargate").QueryClient) => {
            subaccount(request: _165.QueryGetSubaccountRequest): Promise<_165.QuerySubaccountResponse>;
            subaccountAll(request?: _165.QueryAllSubaccountRequest): Promise<_165.QuerySubaccountAllResponse>;
            getWithdrawalAndTransfersBlockedInfo(request: _165.QueryGetWithdrawalAndTransfersBlockedInfoRequest): Promise<_165.QueryGetWithdrawalAndTransfersBlockedInfoResponse>;
            collateralPoolAddress(request: _165.QueryCollateralPoolAddressRequest): Promise<_165.QueryCollateralPoolAddressResponse>;
        };
        LCDQueryClient: typeof _271.LCDQueryClient;
        registry: ReadonlyArray<[string, import("@cosmjs/proto-signing").GeneratedType]>;
        load: (protoRegistry: import("@cosmjs/proto-signing").Registry) => void;
        MessageComposer: {
            encoded: {
                claimYieldForSubaccount(value: _167.MsgClaimYieldForSubaccount): {
                    typeUrl: string;
                    value: Uint8Array<ArrayBufferLike>;
                };
            };
            withTypeUrl: {
                claimYieldForSubaccount(value: _167.MsgClaimYieldForSubaccount): {
                    typeUrl: string;
                    value: _167.MsgClaimYieldForSubaccount;
                };
            };
            fromPartial: {
                claimYieldForSubaccount(value: _167.MsgClaimYieldForSubaccount): {
                    typeUrl: string;
                    value: _167.MsgClaimYieldForSubaccount;
                };
            };
        };
        AminoConverter: {
            "/klyraprotocol.subaccounts.MsgClaimYieldForSubaccount": {
                aminoType: string;
                toAmino: (message: _167.MsgClaimYieldForSubaccount) => _167.MsgClaimYieldForSubaccountAmino;
                fromAmino: (object: _167.MsgClaimYieldForSubaccountAmino) => _167.MsgClaimYieldForSubaccount;
            };
        };
        MsgClaimYieldForSubaccount: {
            typeUrl: string;
            is(o: any): o is _167.MsgClaimYieldForSubaccount;
            isSDK(o: any): o is _167.MsgClaimYieldForSubaccountSDKType;
            isAmino(o: any): o is _167.MsgClaimYieldForSubaccountAmino;
            encode(message: _167.MsgClaimYieldForSubaccount, writer?: import("..").BinaryWriter): import("..").BinaryWriter;
            decode(input: import("..").BinaryReader | Uint8Array, length?: number): _167.MsgClaimYieldForSubaccount;
            fromPartial(object: Partial<_167.MsgClaimYieldForSubaccount>): _167.MsgClaimYieldForSubaccount;
            fromAmino(object: _167.MsgClaimYieldForSubaccountAmino): _167.MsgClaimYieldForSubaccount;
            toAmino(message: _167.MsgClaimYieldForSubaccount): _167.MsgClaimYieldForSubaccountAmino;
            fromAminoMsg(object: _167.MsgClaimYieldForSubaccountAminoMsg): _167.MsgClaimYieldForSubaccount;
            fromProtoMsg(message: _167.MsgClaimYieldForSubaccountProtoMsg): _167.MsgClaimYieldForSubaccount;
            toProto(message: _167.MsgClaimYieldForSubaccount): Uint8Array;
            toProtoMsg(message: _167.MsgClaimYieldForSubaccount): _167.MsgClaimYieldForSubaccountProtoMsg;
        };
        MsgClaimYieldForSubaccountResponse: {
            typeUrl: string;
            is(o: any): o is _167.MsgClaimYieldForSubaccountResponse;
            isSDK(o: any): o is _167.MsgClaimYieldForSubaccountResponseSDKType;
            isAmino(o: any): o is _167.MsgClaimYieldForSubaccountResponseAmino;
            encode(_: _167.MsgClaimYieldForSubaccountResponse, writer?: import("..").BinaryWriter): import("..").BinaryWriter;
            decode(input: import("..").BinaryReader | Uint8Array, length?: number): _167.MsgClaimYieldForSubaccountResponse;
            fromPartial(_: Partial<_167.MsgClaimYieldForSubaccountResponse>): _167.MsgClaimYieldForSubaccountResponse;
            fromAmino(_: _167.MsgClaimYieldForSubaccountResponseAmino): _167.MsgClaimYieldForSubaccountResponse;
            toAmino(_: _167.MsgClaimYieldForSubaccountResponse): _167.MsgClaimYieldForSubaccountResponseAmino;
            fromAminoMsg(object: _167.MsgClaimYieldForSubaccountResponseAminoMsg): _167.MsgClaimYieldForSubaccountResponse;
            fromProtoMsg(message: _167.MsgClaimYieldForSubaccountResponseProtoMsg): _167.MsgClaimYieldForSubaccountResponse;
            toProto(message: _167.MsgClaimYieldForSubaccountResponse): Uint8Array;
            toProtoMsg(message: _167.MsgClaimYieldForSubaccountResponse): _167.MsgClaimYieldForSubaccountResponseProtoMsg;
        };
        SubaccountId: {
            typeUrl: string;
            is(o: any): o is _166.SubaccountId;
            isSDK(o: any): o is _166.SubaccountIdSDKType;
            isAmino(o: any): o is _166.SubaccountIdAmino;
            encode(message: _166.SubaccountId, writer?: import("..").BinaryWriter): import("..").BinaryWriter;
            decode(input: import("..").BinaryReader | Uint8Array, length?: number): _166.SubaccountId;
            fromPartial(object: Partial<_166.SubaccountId>): _166.SubaccountId;
            fromAmino(object: _166.SubaccountIdAmino): _166.SubaccountId;
            toAmino(message: _166.SubaccountId): _166.SubaccountIdAmino;
            fromAminoMsg(object: _166.SubaccountIdAminoMsg): _166.SubaccountId;
            fromProtoMsg(message: _166.SubaccountIdProtoMsg): _166.SubaccountId;
            toProto(message: _166.SubaccountId): Uint8Array;
            toProtoMsg(message: _166.SubaccountId): _166.SubaccountIdProtoMsg;
        };
        Subaccount: {
            typeUrl: string;
            is(o: any): o is _166.Subaccount;
            isSDK(o: any): o is _166.SubaccountSDKType;
            isAmino(o: any): o is _166.SubaccountAmino;
            encode(message: _166.Subaccount, writer?: import("..").BinaryWriter): import("..").BinaryWriter;
            decode(input: import("..").BinaryReader | Uint8Array, length?: number): _166.Subaccount;
            fromPartial(object: Partial<_166.Subaccount>): _166.Subaccount;
            fromAmino(object: _166.SubaccountAmino): _166.Subaccount;
            toAmino(message: _166.Subaccount): _166.SubaccountAmino;
            fromAminoMsg(object: _166.SubaccountAminoMsg): _166.Subaccount;
            fromProtoMsg(message: _166.SubaccountProtoMsg): _166.Subaccount;
            toProto(message: _166.Subaccount): Uint8Array;
            toProtoMsg(message: _166.Subaccount): _166.SubaccountProtoMsg;
        };
        QueryGetSubaccountRequest: {
            typeUrl: string;
            is(o: any): o is _165.QueryGetSubaccountRequest;
            isSDK(o: any): o is _165.QueryGetSubaccountRequestSDKType;
            isAmino(o: any): o is _165.QueryGetSubaccountRequestAmino;
            encode(message: _165.QueryGetSubaccountRequest, writer?: import("..").BinaryWriter): import("..").BinaryWriter;
            decode(input: import("..").BinaryReader | Uint8Array, length?: number): _165.QueryGetSubaccountRequest;
            fromPartial(object: Partial<_165.QueryGetSubaccountRequest>): _165.QueryGetSubaccountRequest;
            fromAmino(object: _165.QueryGetSubaccountRequestAmino): _165.QueryGetSubaccountRequest;
            toAmino(message: _165.QueryGetSubaccountRequest): _165.QueryGetSubaccountRequestAmino;
            fromAminoMsg(object: _165.QueryGetSubaccountRequestAminoMsg): _165.QueryGetSubaccountRequest;
            fromProtoMsg(message: _165.QueryGetSubaccountRequestProtoMsg): _165.QueryGetSubaccountRequest;
            toProto(message: _165.QueryGetSubaccountRequest): Uint8Array;
            toProtoMsg(message: _165.QueryGetSubaccountRequest): _165.QueryGetSubaccountRequestProtoMsg;
        };
        QuerySubaccountResponse: {
            typeUrl: string;
            is(o: any): o is _165.QuerySubaccountResponse;
            isSDK(o: any): o is _165.QuerySubaccountResponseSDKType;
            isAmino(o: any): o is _165.QuerySubaccountResponseAmino;
            encode(message: _165.QuerySubaccountResponse, writer?: import("..").BinaryWriter): import("..").BinaryWriter;
            decode(input: import("..").BinaryReader | Uint8Array, length?: number): _165.QuerySubaccountResponse;
            fromPartial(object: Partial<_165.QuerySubaccountResponse>): _165.QuerySubaccountResponse;
            fromAmino(object: _165.QuerySubaccountResponseAmino): _165.QuerySubaccountResponse;
            toAmino(message: _165.QuerySubaccountResponse): _165.QuerySubaccountResponseAmino;
            fromAminoMsg(object: _165.QuerySubaccountResponseAminoMsg): _165.QuerySubaccountResponse;
            fromProtoMsg(message: _165.QuerySubaccountResponseProtoMsg): _165.QuerySubaccountResponse;
            toProto(message: _165.QuerySubaccountResponse): Uint8Array;
            toProtoMsg(message: _165.QuerySubaccountResponse): _165.QuerySubaccountResponseProtoMsg;
        };
        QueryAllSubaccountRequest: {
            typeUrl: string;
            is(o: any): o is _165.QueryAllSubaccountRequest;
            isSDK(o: any): o is _165.QueryAllSubaccountRequestSDKType;
            isAmino(o: any): o is _165.QueryAllSubaccountRequestAmino;
            encode(message: _165.QueryAllSubaccountRequest, writer?: import("..").BinaryWriter): import("..").BinaryWriter;
            decode(input: import("..").BinaryReader | Uint8Array, length?: number): _165.QueryAllSubaccountRequest;
            fromPartial(object: Partial<_165.QueryAllSubaccountRequest>): _165.QueryAllSubaccountRequest;
            fromAmino(object: _165.QueryAllSubaccountRequestAmino): _165.QueryAllSubaccountRequest;
            toAmino(message: _165.QueryAllSubaccountRequest): _165.QueryAllSubaccountRequestAmino;
            fromAminoMsg(object: _165.QueryAllSubaccountRequestAminoMsg): _165.QueryAllSubaccountRequest;
            fromProtoMsg(message: _165.QueryAllSubaccountRequestProtoMsg): _165.QueryAllSubaccountRequest;
            toProto(message: _165.QueryAllSubaccountRequest): Uint8Array;
            toProtoMsg(message: _165.QueryAllSubaccountRequest): _165.QueryAllSubaccountRequestProtoMsg;
        };
        QuerySubaccountAllResponse: {
            typeUrl: string;
            is(o: any): o is _165.QuerySubaccountAllResponse;
            isSDK(o: any): o is _165.QuerySubaccountAllResponseSDKType;
            isAmino(o: any): o is _165.QuerySubaccountAllResponseAmino;
            encode(message: _165.QuerySubaccountAllResponse, writer?: import("..").BinaryWriter): import("..").BinaryWriter;
            decode(input: import("..").BinaryReader | Uint8Array, length?: number): _165.QuerySubaccountAllResponse;
            fromPartial(object: Partial<_165.QuerySubaccountAllResponse>): _165.QuerySubaccountAllResponse;
            fromAmino(object: _165.QuerySubaccountAllResponseAmino): _165.QuerySubaccountAllResponse;
            toAmino(message: _165.QuerySubaccountAllResponse): _165.QuerySubaccountAllResponseAmino;
            fromAminoMsg(object: _165.QuerySubaccountAllResponseAminoMsg): _165.QuerySubaccountAllResponse;
            fromProtoMsg(message: _165.QuerySubaccountAllResponseProtoMsg): _165.QuerySubaccountAllResponse;
            toProto(message: _165.QuerySubaccountAllResponse): Uint8Array;
            toProtoMsg(message: _165.QuerySubaccountAllResponse): _165.QuerySubaccountAllResponseProtoMsg;
        };
        QueryGetWithdrawalAndTransfersBlockedInfoRequest: {
            typeUrl: string;
            is(o: any): o is _165.QueryGetWithdrawalAndTransfersBlockedInfoRequest;
            isSDK(o: any): o is _165.QueryGetWithdrawalAndTransfersBlockedInfoRequestSDKType;
            isAmino(o: any): o is _165.QueryGetWithdrawalAndTransfersBlockedInfoRequestAmino;
            encode(message: _165.QueryGetWithdrawalAndTransfersBlockedInfoRequest, writer?: import("..").BinaryWriter): import("..").BinaryWriter;
            decode(input: import("..").BinaryReader | Uint8Array, length?: number): _165.QueryGetWithdrawalAndTransfersBlockedInfoRequest;
            fromPartial(object: Partial<_165.QueryGetWithdrawalAndTransfersBlockedInfoRequest>): _165.QueryGetWithdrawalAndTransfersBlockedInfoRequest;
            fromAmino(object: _165.QueryGetWithdrawalAndTransfersBlockedInfoRequestAmino): _165.QueryGetWithdrawalAndTransfersBlockedInfoRequest;
            toAmino(message: _165.QueryGetWithdrawalAndTransfersBlockedInfoRequest): _165.QueryGetWithdrawalAndTransfersBlockedInfoRequestAmino;
            fromAminoMsg(object: _165.QueryGetWithdrawalAndTransfersBlockedInfoRequestAminoMsg): _165.QueryGetWithdrawalAndTransfersBlockedInfoRequest;
            fromProtoMsg(message: _165.QueryGetWithdrawalAndTransfersBlockedInfoRequestProtoMsg): _165.QueryGetWithdrawalAndTransfersBlockedInfoRequest;
            toProto(message: _165.QueryGetWithdrawalAndTransfersBlockedInfoRequest): Uint8Array;
            toProtoMsg(message: _165.QueryGetWithdrawalAndTransfersBlockedInfoRequest): _165.QueryGetWithdrawalAndTransfersBlockedInfoRequestProtoMsg;
        };
        QueryGetWithdrawalAndTransfersBlockedInfoResponse: {
            typeUrl: string;
            is(o: any): o is _165.QueryGetWithdrawalAndTransfersBlockedInfoResponse;
            isSDK(o: any): o is _165.QueryGetWithdrawalAndTransfersBlockedInfoResponseSDKType;
            isAmino(o: any): o is _165.QueryGetWithdrawalAndTransfersBlockedInfoResponseAmino;
            encode(message: _165.QueryGetWithdrawalAndTransfersBlockedInfoResponse, writer?: import("..").BinaryWriter): import("..").BinaryWriter;
            decode(input: import("..").BinaryReader | Uint8Array, length?: number): _165.QueryGetWithdrawalAndTransfersBlockedInfoResponse;
            fromPartial(object: Partial<_165.QueryGetWithdrawalAndTransfersBlockedInfoResponse>): _165.QueryGetWithdrawalAndTransfersBlockedInfoResponse;
            fromAmino(object: _165.QueryGetWithdrawalAndTransfersBlockedInfoResponseAmino): _165.QueryGetWithdrawalAndTransfersBlockedInfoResponse;
            toAmino(message: _165.QueryGetWithdrawalAndTransfersBlockedInfoResponse): _165.QueryGetWithdrawalAndTransfersBlockedInfoResponseAmino;
            fromAminoMsg(object: _165.QueryGetWithdrawalAndTransfersBlockedInfoResponseAminoMsg): _165.QueryGetWithdrawalAndTransfersBlockedInfoResponse;
            fromProtoMsg(message: _165.QueryGetWithdrawalAndTransfersBlockedInfoResponseProtoMsg): _165.QueryGetWithdrawalAndTransfersBlockedInfoResponse;
            toProto(message: _165.QueryGetWithdrawalAndTransfersBlockedInfoResponse): Uint8Array;
            toProtoMsg(message: _165.QueryGetWithdrawalAndTransfersBlockedInfoResponse): _165.QueryGetWithdrawalAndTransfersBlockedInfoResponseProtoMsg;
        };
        QueryCollateralPoolAddressRequest: {
            typeUrl: string;
            is(o: any): o is _165.QueryCollateralPoolAddressRequest;
            isSDK(o: any): o is _165.QueryCollateralPoolAddressRequestSDKType;
            isAmino(o: any): o is _165.QueryCollateralPoolAddressRequestAmino;
            encode(message: _165.QueryCollateralPoolAddressRequest, writer?: import("..").BinaryWriter): import("..").BinaryWriter;
            decode(input: import("..").BinaryReader | Uint8Array, length?: number): _165.QueryCollateralPoolAddressRequest;
            fromPartial(object: Partial<_165.QueryCollateralPoolAddressRequest>): _165.QueryCollateralPoolAddressRequest;
            fromAmino(object: _165.QueryCollateralPoolAddressRequestAmino): _165.QueryCollateralPoolAddressRequest;
            toAmino(message: _165.QueryCollateralPoolAddressRequest): _165.QueryCollateralPoolAddressRequestAmino;
            fromAminoMsg(object: _165.QueryCollateralPoolAddressRequestAminoMsg): _165.QueryCollateralPoolAddressRequest;
            fromProtoMsg(message: _165.QueryCollateralPoolAddressRequestProtoMsg): _165.QueryCollateralPoolAddressRequest;
            toProto(message: _165.QueryCollateralPoolAddressRequest): Uint8Array;
            toProtoMsg(message: _165.QueryCollateralPoolAddressRequest): _165.QueryCollateralPoolAddressRequestProtoMsg;
        };
        QueryCollateralPoolAddressResponse: {
            typeUrl: string;
            is(o: any): o is _165.QueryCollateralPoolAddressResponse;
            isSDK(o: any): o is _165.QueryCollateralPoolAddressResponseSDKType;
            isAmino(o: any): o is _165.QueryCollateralPoolAddressResponseAmino;
            encode(message: _165.QueryCollateralPoolAddressResponse, writer?: import("..").BinaryWriter): import("..").BinaryWriter;
            decode(input: import("..").BinaryReader | Uint8Array, length?: number): _165.QueryCollateralPoolAddressResponse;
            fromPartial(object: Partial<_165.QueryCollateralPoolAddressResponse>): _165.QueryCollateralPoolAddressResponse;
            fromAmino(object: _165.QueryCollateralPoolAddressResponseAmino): _165.QueryCollateralPoolAddressResponse;
            toAmino(message: _165.QueryCollateralPoolAddressResponse): _165.QueryCollateralPoolAddressResponseAmino;
            fromAminoMsg(object: _165.QueryCollateralPoolAddressResponseAminoMsg): _165.QueryCollateralPoolAddressResponse;
            fromProtoMsg(message: _165.QueryCollateralPoolAddressResponseProtoMsg): _165.QueryCollateralPoolAddressResponse;
            toProto(message: _165.QueryCollateralPoolAddressResponse): Uint8Array;
            toProtoMsg(message: _165.QueryCollateralPoolAddressResponse): _165.QueryCollateralPoolAddressResponseProtoMsg;
        };
        PerpetualPosition: {
            typeUrl: string;
            is(o: any): o is _164.PerpetualPosition;
            isSDK(o: any): o is _164.PerpetualPositionSDKType;
            isAmino(o: any): o is _164.PerpetualPositionAmino;
            encode(message: _164.PerpetualPosition, writer?: import("..").BinaryWriter): import("..").BinaryWriter;
            decode(input: import("..").BinaryReader | Uint8Array, length?: number): _164.PerpetualPosition;
            fromPartial(object: Partial<_164.PerpetualPosition>): _164.PerpetualPosition;
            fromAmino(object: _164.PerpetualPositionAmino): _164.PerpetualPosition;
            toAmino(message: _164.PerpetualPosition): _164.PerpetualPositionAmino;
            fromAminoMsg(object: _164.PerpetualPositionAminoMsg): _164.PerpetualPosition;
            fromProtoMsg(message: _164.PerpetualPositionProtoMsg): _164.PerpetualPosition;
            toProto(message: _164.PerpetualPosition): Uint8Array;
            toProtoMsg(message: _164.PerpetualPosition): _164.PerpetualPositionProtoMsg;
        };
        GenesisState: {
            typeUrl: string;
            is(o: any): o is _163.GenesisState;
            isSDK(o: any): o is _163.GenesisStateSDKType;
            isAmino(o: any): o is _163.GenesisStateAmino;
            encode(message: _163.GenesisState, writer?: import("..").BinaryWriter): import("..").BinaryWriter;
            decode(input: import("..").BinaryReader | Uint8Array, length?: number): _163.GenesisState;
            fromPartial(object: Partial<_163.GenesisState>): _163.GenesisState;
            fromAmino(object: _163.GenesisStateAmino): _163.GenesisState;
            toAmino(message: _163.GenesisState): _163.GenesisStateAmino;
            fromAminoMsg(object: _163.GenesisStateAminoMsg): _163.GenesisState;
            fromProtoMsg(message: _163.GenesisStateProtoMsg): _163.GenesisState;
            toProto(message: _163.GenesisState): Uint8Array;
            toProtoMsg(message: _163.GenesisState): _163.GenesisStateProtoMsg;
        };
        AssetPosition: {
            typeUrl: string;
            is(o: any): o is _162.AssetPosition;
            isSDK(o: any): o is _162.AssetPositionSDKType;
            isAmino(o: any): o is _162.AssetPositionAmino;
            encode(message: _162.AssetPosition, writer?: import("..").BinaryWriter): import("..").BinaryWriter;
            decode(input: import("..").BinaryReader | Uint8Array, length?: number): _162.AssetPosition;
            fromPartial(object: Partial<_162.AssetPosition>): _162.AssetPosition;
            fromAmino(object: _162.AssetPositionAmino): _162.AssetPosition;
            toAmino(message: _162.AssetPosition): _162.AssetPositionAmino;
            fromAminoMsg(object: _162.AssetPositionAminoMsg): _162.AssetPosition;
            fromProtoMsg(message: _162.AssetPositionProtoMsg): _162.AssetPosition;
            toProto(message: _162.AssetPosition): Uint8Array;
            toProtoMsg(message: _162.AssetPosition): _162.AssetPositionProtoMsg;
        };
    };
    const ve: {
        PricePair: {
            typeUrl: string;
            is(o: any): o is _168.PricePair;
            isSDK(o: any): o is _168.PricePairSDKType;
            isAmino(o: any): o is _168.PricePairAmino;
            encode(message: _168.PricePair, writer?: import("..").BinaryWriter): import("..").BinaryWriter;
            decode(input: import("..").BinaryReader | Uint8Array, length?: number): _168.PricePair;
            fromPartial(object: Partial<_168.PricePair>): _168.PricePair;
            fromAmino(object: _168.PricePairAmino): _168.PricePair;
            toAmino(message: _168.PricePair): _168.PricePairAmino;
            fromAminoMsg(object: _168.PricePairAminoMsg): _168.PricePair;
            fromProtoMsg(message: _168.PricePairProtoMsg): _168.PricePair;
            toProto(message: _168.PricePair): Uint8Array;
            toProtoMsg(message: _168.PricePair): _168.PricePairProtoMsg;
        };
        DaemonVoteExtension: {
            typeUrl: string;
            is(o: any): o is _168.DaemonVoteExtension;
            isSDK(o: any): o is _168.DaemonVoteExtensionSDKType;
            isAmino(o: any): o is _168.DaemonVoteExtensionAmino;
            encode(message: _168.DaemonVoteExtension, writer?: import("..").BinaryWriter): import("..").BinaryWriter;
            decode(input: import("..").BinaryReader | Uint8Array, length?: number): _168.DaemonVoteExtension;
            fromPartial(object: Partial<_168.DaemonVoteExtension>): _168.DaemonVoteExtension;
            fromAmino(object: _168.DaemonVoteExtensionAmino): _168.DaemonVoteExtension;
            toAmino(message: _168.DaemonVoteExtension): _168.DaemonVoteExtensionAmino;
            fromAminoMsg(object: _168.DaemonVoteExtensionAminoMsg): _168.DaemonVoteExtension;
            fromProtoMsg(message: _168.DaemonVoteExtensionProtoMsg): _168.DaemonVoteExtension;
            toProto(message: _168.DaemonVoteExtension): Uint8Array;
            toProtoMsg(message: _168.DaemonVoteExtension): _168.DaemonVoteExtensionProtoMsg;
        };
    };
    const ClientFactory: {
        createRPCMsgClient: ({ rpc }: {
            rpc: import("../helpers").Rpc;
        }) => Promise<{
            cosmos: {
                auth: {
                    v1beta1: import("../cosmos/auth/v1beta1/tx.rpc.msg").MsgClientImpl;
                };
                authz: {
                    v1beta1: import("../cosmos/authz/v1beta1/tx.rpc.msg").MsgClientImpl;
                };
                bank: {
                    v1beta1: import("../cosmos/bank/v1beta1/tx.rpc.msg").MsgClientImpl;
                };
                circuit: {
                    v1: import("../cosmos/circuit/v1/tx.rpc.msg").MsgClientImpl;
                };
                consensus: {
                    v1: import("../cosmos/consensus/v1/tx.rpc.msg").MsgClientImpl;
                };
                distribution: {
                    v1beta1: import("../cosmos/distribution/v1beta1/tx.rpc.msg").MsgClientImpl;
                };
                gov: {
                    v1: import("../cosmos/gov/v1/tx.rpc.msg").MsgClientImpl;
                    v1beta1: import("../cosmos/gov/v1beta1/tx.rpc.msg").MsgClientImpl;
                };
                staking: {
                    v1beta1: import("../cosmos/staking/v1beta1/tx.rpc.msg").MsgClientImpl;
                };
                upgrade: {
                    v1beta1: import("../cosmos/upgrade/v1beta1/tx.rpc.msg").MsgClientImpl;
                };
            };
            klyraprotocol: {
                blocktime: _285.MsgClientImpl;
                clob: _286.MsgClientImpl;
                delaymsg: _287.MsgClientImpl;
                feetiers: _288.MsgClientImpl;
                govplus: _289.MsgClientImpl;
                perpetuals: _290.MsgClientImpl;
                prices: _291.MsgClientImpl;
                ratelimit: _292.MsgClientImpl;
                sending: _293.MsgClientImpl;
                stats: _294.MsgClientImpl;
                subaccounts: _295.MsgClientImpl;
            };
        }>;
        createRPCQueryClient: ({ rpcEndpoint }: {
            rpcEndpoint: string | import("@cosmjs/tendermint-rpc").HttpEndpoint;
        }) => Promise<{
            cosmos: {
                auth: {
                    v1beta1: {
                        accounts(request?: import("../cosmos/auth/v1beta1/query").QueryAccountsRequest): Promise<import("../cosmos/auth/v1beta1/query").QueryAccountsResponse>;
                        account(request: import("../cosmos/auth/v1beta1/query").QueryAccountRequest): Promise<import("../cosmos/auth/v1beta1/query").QueryAccountResponse>;
                        accountAddressByID(request: import("../cosmos/auth/v1beta1/query").QueryAccountAddressByIDRequest): Promise<import("../cosmos/auth/v1beta1/query").QueryAccountAddressByIDResponse>;
                        params(request?: import("../cosmos/auth/v1beta1/query").QueryParamsRequest): Promise<import("../cosmos/auth/v1beta1/query").QueryParamsResponse>;
                        moduleAccounts(request?: import("../cosmos/auth/v1beta1/query").QueryModuleAccountsRequest): Promise<import("../cosmos/auth/v1beta1/query").QueryModuleAccountsResponse>;
                        moduleAccountByName(request: import("../cosmos/auth/v1beta1/query").QueryModuleAccountByNameRequest): Promise<import("../cosmos/auth/v1beta1/query").QueryModuleAccountByNameResponse>;
                        bech32Prefix(request?: import("../cosmos/auth/v1beta1/query").Bech32PrefixRequest): Promise<import("../cosmos/auth/v1beta1/query").Bech32PrefixResponse>;
                        addressBytesToString(request: import("../cosmos/auth/v1beta1/query").AddressBytesToStringRequest): Promise<import("../cosmos/auth/v1beta1/query").AddressBytesToStringResponse>;
                        addressStringToBytes(request: import("../cosmos/auth/v1beta1/query").AddressStringToBytesRequest): Promise<import("../cosmos/auth/v1beta1/query").AddressStringToBytesResponse>;
                        accountInfo(request: import("../cosmos/auth/v1beta1/query").QueryAccountInfoRequest): Promise<import("../cosmos/auth/v1beta1/query").QueryAccountInfoResponse>;
                    };
                };
                authz: {
                    v1beta1: {
                        grants(request: import("../cosmos/authz/v1beta1/query").QueryGrantsRequest): Promise<import("../cosmos/authz/v1beta1/query").QueryGrantsResponse>;
                        granterGrants(request: import("../cosmos/authz/v1beta1/query").QueryGranterGrantsRequest): Promise<import("../cosmos/authz/v1beta1/query").QueryGranterGrantsResponse>;
                        granteeGrants(request: import("../cosmos/authz/v1beta1/query").QueryGranteeGrantsRequest): Promise<import("../cosmos/authz/v1beta1/query").QueryGranteeGrantsResponse>;
                    };
                };
                bank: {
                    v1beta1: {
                        balance(request: import("../cosmos/bank/v1beta1/query").QueryBalanceRequest): Promise<import("../cosmos/bank/v1beta1/query").QueryBalanceResponse>;
                        allBalances(request: import("../cosmos/bank/v1beta1/query").QueryAllBalancesRequest): Promise<import("../cosmos/bank/v1beta1/query").QueryAllBalancesResponse>;
                        spendableBalances(request: import("../cosmos/bank/v1beta1/query").QuerySpendableBalancesRequest): Promise<import("../cosmos/bank/v1beta1/query").QuerySpendableBalancesResponse>;
                        spendableBalanceByDenom(request: import("../cosmos/bank/v1beta1/query").QuerySpendableBalanceByDenomRequest): Promise<import("../cosmos/bank/v1beta1/query").QuerySpendableBalanceByDenomResponse>;
                        totalSupply(request?: import("../cosmos/bank/v1beta1/query").QueryTotalSupplyRequest): Promise<import("../cosmos/bank/v1beta1/query").QueryTotalSupplyResponse>;
                        supplyOf(request: import("../cosmos/bank/v1beta1/query").QuerySupplyOfRequest): Promise<import("../cosmos/bank/v1beta1/query").QuerySupplyOfResponse>;
                        params(request?: import("../cosmos/bank/v1beta1/query").QueryParamsRequest): Promise<import("../cosmos/bank/v1beta1/query").QueryParamsResponse>;
                        denomMetadata(request: import("../cosmos/bank/v1beta1/query").QueryDenomMetadataRequest): Promise<import("../cosmos/bank/v1beta1/query").QueryDenomMetadataResponse>;
                        denomMetadataByQueryString(request: import("../cosmos/bank/v1beta1/query").QueryDenomMetadataByQueryStringRequest): Promise<import("../cosmos/bank/v1beta1/query").QueryDenomMetadataByQueryStringResponse>;
                        denomsMetadata(request?: import("../cosmos/bank/v1beta1/query").QueryDenomsMetadataRequest): Promise<import("../cosmos/bank/v1beta1/query").QueryDenomsMetadataResponse>;
                        denomOwners(request: import("../cosmos/bank/v1beta1/query").QueryDenomOwnersRequest): Promise<import("../cosmos/bank/v1beta1/query").QueryDenomOwnersResponse>;
                        sendEnabled(request: import("../cosmos/bank/v1beta1/query").QuerySendEnabledRequest): Promise<import("../cosmos/bank/v1beta1/query").QuerySendEnabledResponse>;
                    };
                };
                base: {
                    node: {
                        v1beta1: {
                            config(request?: import("../cosmos/base/node/v1beta1/query").ConfigRequest): Promise<import("../cosmos/base/node/v1beta1/query").ConfigResponse>;
                            status(request?: import("../cosmos/base/node/v1beta1/query").StatusRequest): Promise<import("../cosmos/base/node/v1beta1/query").StatusResponse>;
                        };
                    };
                };
                circuit: {
                    v1: {
                        account(request: import("../cosmos/circuit/v1/query").QueryAccountRequest): Promise<import("../cosmos/circuit/v1/query").AccountResponse>;
                        accounts(request?: import("../cosmos/circuit/v1/query").QueryAccountsRequest): Promise<import("../cosmos/circuit/v1/query").AccountsResponse>;
                        disabledList(request?: import("../cosmos/circuit/v1/query").QueryDisabledListRequest): Promise<import("../cosmos/circuit/v1/query").DisabledListResponse>;
                    };
                };
                consensus: {
                    v1: {
                        params(request?: import("../cosmos/consensus/v1/query").QueryParamsRequest): Promise<import("../cosmos/consensus/v1/query").QueryParamsResponse>;
                    };
                };
                distribution: {
                    v1beta1: {
                        params(request?: import("../cosmos/distribution/v1beta1/query").QueryParamsRequest): Promise<import("../cosmos/distribution/v1beta1/query").QueryParamsResponse>;
                        validatorDistributionInfo(request: import("../cosmos/distribution/v1beta1/query").QueryValidatorDistributionInfoRequest): Promise<import("../cosmos/distribution/v1beta1/query").QueryValidatorDistributionInfoResponse>;
                        validatorOutstandingRewards(request: import("../cosmos/distribution/v1beta1/query").QueryValidatorOutstandingRewardsRequest): Promise<import("../cosmos/distribution/v1beta1/query").QueryValidatorOutstandingRewardsResponse>;
                        validatorCommission(request: import("../cosmos/distribution/v1beta1/query").QueryValidatorCommissionRequest): Promise<import("../cosmos/distribution/v1beta1/query").QueryValidatorCommissionResponse>;
                        validatorSlashes(request: import("../cosmos/distribution/v1beta1/query").QueryValidatorSlashesRequest): Promise<import("../cosmos/distribution/v1beta1/query").QueryValidatorSlashesResponse>;
                        delegationRewards(request: import("../cosmos/distribution/v1beta1/query").QueryDelegationRewardsRequest): Promise<import("../cosmos/distribution/v1beta1/query").QueryDelegationRewardsResponse>;
                        delegationTotalRewards(request: import("../cosmos/distribution/v1beta1/query").QueryDelegationTotalRewardsRequest): Promise<import("../cosmos/distribution/v1beta1/query").QueryDelegationTotalRewardsResponse>;
                        delegatorValidators(request: import("../cosmos/distribution/v1beta1/query").QueryDelegatorValidatorsRequest): Promise<import("../cosmos/distribution/v1beta1/query").QueryDelegatorValidatorsResponse>;
                        delegatorWithdrawAddress(request: import("../cosmos/distribution/v1beta1/query").QueryDelegatorWithdrawAddressRequest): Promise<import("../cosmos/distribution/v1beta1/query").QueryDelegatorWithdrawAddressResponse>;
                        communityPool(request?: import("../cosmos/distribution/v1beta1/query").QueryCommunityPoolRequest): Promise<import("../cosmos/distribution/v1beta1/query").QueryCommunityPoolResponse>;
                    };
                };
                gov: {
                    v1: {
                        constitution(request?: import("../cosmos/gov/v1/query").QueryConstitutionRequest): Promise<import("../cosmos/gov/v1/query").QueryConstitutionResponse>;
                        proposal(request: import("../cosmos/gov/v1/query").QueryProposalRequest): Promise<import("../cosmos/gov/v1/query").QueryProposalResponse>;
                        proposals(request: import("../cosmos/gov/v1/query").QueryProposalsRequest): Promise<import("../cosmos/gov/v1/query").QueryProposalsResponse>;
                        vote(request: import("../cosmos/gov/v1/query").QueryVoteRequest): Promise<import("../cosmos/gov/v1/query").QueryVoteResponse>;
                        votes(request: import("../cosmos/gov/v1/query").QueryVotesRequest): Promise<import("../cosmos/gov/v1/query").QueryVotesResponse>;
                        params(request: import("../cosmos/gov/v1/query").QueryParamsRequest): Promise<import("../cosmos/gov/v1/query").QueryParamsResponse>;
                        deposit(request: import("../cosmos/gov/v1/query").QueryDepositRequest): Promise<import("../cosmos/gov/v1/query").QueryDepositResponse>;
                        deposits(request: import("../cosmos/gov/v1/query").QueryDepositsRequest): Promise<import("../cosmos/gov/v1/query").QueryDepositsResponse>;
                        tallyResult(request: import("../cosmos/gov/v1/query").QueryTallyResultRequest): Promise<import("../cosmos/gov/v1/query").QueryTallyResultResponse>;
                    };
                    v1beta1: {
                        proposal(request: import("../cosmos/gov/v1beta1/query").QueryProposalRequest): Promise<import("../cosmos/gov/v1beta1/query").QueryProposalResponse>;
                        proposals(request: import("../cosmos/gov/v1beta1/query").QueryProposalsRequest): Promise<import("../cosmos/gov/v1beta1/query").QueryProposalsResponse>;
                        vote(request: import("../cosmos/gov/v1beta1/query").QueryVoteRequest): Promise<import("../cosmos/gov/v1beta1/query").QueryVoteResponse>;
                        votes(request: import("../cosmos/gov/v1beta1/query").QueryVotesRequest): Promise<import("../cosmos/gov/v1beta1/query").QueryVotesResponse>;
                        params(request: import("../cosmos/gov/v1beta1/query").QueryParamsRequest): Promise<import("../cosmos/gov/v1beta1/query").QueryParamsResponse>;
                        deposit(request: import("../cosmos/gov/v1beta1/query").QueryDepositRequest): Promise<import("../cosmos/gov/v1beta1/query").QueryDepositResponse>;
                        deposits(request: import("../cosmos/gov/v1beta1/query").QueryDepositsRequest): Promise<import("../cosmos/gov/v1beta1/query").QueryDepositsResponse>;
                        tallyResult(request: import("../cosmos/gov/v1beta1/query").QueryTallyResultRequest): Promise<import("../cosmos/gov/v1beta1/query").QueryTallyResultResponse>;
                    };
                };
                orm: {
                    query: {
                        v1alpha1: {
                            get(request: import("../cosmos/orm/query/v1alpha1/query").GetRequest): Promise<import("../cosmos/orm/query/v1alpha1/query").GetResponse>;
                            list(request: import("../cosmos/orm/query/v1alpha1/query").ListRequest): Promise<import("../cosmos/orm/query/v1alpha1/query").ListResponse>;
                        };
                    };
                };
                staking: {
                    v1beta1: {
                        validators(request: import("../cosmos/staking/v1beta1/query").QueryValidatorsRequest): Promise<import("../cosmos/staking/v1beta1/query").QueryValidatorsResponse>;
                        validator(request: import("../cosmos/staking/v1beta1/query").QueryValidatorRequest): Promise<import("../cosmos/staking/v1beta1/query").QueryValidatorResponse>;
                        validatorDelegations(request: import("../cosmos/staking/v1beta1/query").QueryValidatorDelegationsRequest): Promise<import("../cosmos/staking/v1beta1/query").QueryValidatorDelegationsResponse>;
                        validatorUnbondingDelegations(request: import("../cosmos/staking/v1beta1/query").QueryValidatorUnbondingDelegationsRequest): Promise<import("../cosmos/staking/v1beta1/query").QueryValidatorUnbondingDelegationsResponse>;
                        delegation(request: import("../cosmos/staking/v1beta1/query").QueryDelegationRequest): Promise<import("../cosmos/staking/v1beta1/query").QueryDelegationResponse>;
                        unbondingDelegation(request: import("../cosmos/staking/v1beta1/query").QueryUnbondingDelegationRequest): Promise<import("../cosmos/staking/v1beta1/query").QueryUnbondingDelegationResponse>;
                        delegatorDelegations(request: import("../cosmos/staking/v1beta1/query").QueryDelegatorDelegationsRequest): Promise<import("../cosmos/staking/v1beta1/query").QueryDelegatorDelegationsResponse>;
                        delegatorUnbondingDelegations(request: import("../cosmos/staking/v1beta1/query").QueryDelegatorUnbondingDelegationsRequest): Promise<import("../cosmos/staking/v1beta1/query").QueryDelegatorUnbondingDelegationsResponse>;
                        redelegations(request: import("../cosmos/staking/v1beta1/query").QueryRedelegationsRequest): Promise<import("../cosmos/staking/v1beta1/query").QueryRedelegationsResponse>;
                        delegatorValidators(request: import("../cosmos/staking/v1beta1/query").QueryDelegatorValidatorsRequest): Promise<import("../cosmos/staking/v1beta1/query").QueryDelegatorValidatorsResponse>;
                        delegatorValidator(request: import("../cosmos/staking/v1beta1/query").QueryDelegatorValidatorRequest): Promise<import("../cosmos/staking/v1beta1/query").QueryDelegatorValidatorResponse>;
                        historicalInfo(request: import("../cosmos/staking/v1beta1/query").QueryHistoricalInfoRequest): Promise<import("../cosmos/staking/v1beta1/query").QueryHistoricalInfoResponse>;
                        pool(request?: import("../cosmos/staking/v1beta1/query").QueryPoolRequest): Promise<import("../cosmos/staking/v1beta1/query").QueryPoolResponse>;
                        params(request?: import("../cosmos/staking/v1beta1/query").QueryParamsRequest): Promise<import("../cosmos/staking/v1beta1/query").QueryParamsResponse>;
                    };
                };
                tx: {
                    v1beta1: {
                        simulate(request: import("../cosmos/tx/v1beta1/service").SimulateRequest): Promise<import("../cosmos/tx/v1beta1/service").SimulateResponse>;
                        getTx(request: import("../cosmos/tx/v1beta1/service").GetTxRequest): Promise<import("../cosmos/tx/v1beta1/service").GetTxResponse>;
                        broadcastTx(request: import("../cosmos/tx/v1beta1/service").BroadcastTxRequest): Promise<import("../cosmos/tx/v1beta1/service").BroadcastTxResponse>;
                        getTxsEvent(request: import("../cosmos/tx/v1beta1/service").GetTxsEventRequest): Promise<import("../cosmos/tx/v1beta1/service").GetTxsEventResponse>;
                        getBlockWithTxs(request: import("../cosmos/tx/v1beta1/service").GetBlockWithTxsRequest): Promise<import("../cosmos/tx/v1beta1/service").GetBlockWithTxsResponse>;
                        txDecode(request: import("../cosmos/tx/v1beta1/service").TxDecodeRequest): Promise<import("../cosmos/tx/v1beta1/service").TxDecodeResponse>;
                        txEncode(request: import("../cosmos/tx/v1beta1/service").TxEncodeRequest): Promise<import("../cosmos/tx/v1beta1/service").TxEncodeResponse>;
                        txEncodeAmino(request: import("../cosmos/tx/v1beta1/service").TxEncodeAminoRequest): Promise<import("../cosmos/tx/v1beta1/service").TxEncodeAminoResponse>;
                        txDecodeAmino(request: import("../cosmos/tx/v1beta1/service").TxDecodeAminoRequest): Promise<import("../cosmos/tx/v1beta1/service").TxDecodeAminoResponse>;
                    };
                };
                upgrade: {
                    v1beta1: {
                        currentPlan(request?: import("../cosmos/upgrade/v1beta1/query").QueryCurrentPlanRequest): Promise<import("../cosmos/upgrade/v1beta1/query").QueryCurrentPlanResponse>;
                        appliedPlan(request: import("../cosmos/upgrade/v1beta1/query").QueryAppliedPlanRequest): Promise<import("../cosmos/upgrade/v1beta1/query").QueryAppliedPlanResponse>;
                        upgradedConsensusState(request: import("../cosmos/upgrade/v1beta1/query").QueryUpgradedConsensusStateRequest): Promise<import("../cosmos/upgrade/v1beta1/query").QueryUpgradedConsensusStateResponse>;
                        moduleVersions(request: import("../cosmos/upgrade/v1beta1/query").QueryModuleVersionsRequest): Promise<import("../cosmos/upgrade/v1beta1/query").QueryModuleVersionsResponse>;
                        authority(request?: import("../cosmos/upgrade/v1beta1/query").QueryAuthorityRequest): Promise<import("../cosmos/upgrade/v1beta1/query").QueryAuthorityResponse>;
                    };
                };
            };
            klyraprotocol: {
                assets: {
                    asset(request: _89.QueryAssetRequest): Promise<_89.QueryAssetResponse>;
                    allAssets(request?: _89.QueryAllAssetsRequest): Promise<_89.QueryAllAssetsResponse>;
                };
                blocktime: {
                    downtimeParams(request?: _94.QueryDowntimeParamsRequest): Promise<_94.QueryDowntimeParamsResponse>;
                    previousBlockInfo(request?: _94.QueryPreviousBlockInfoRequest): Promise<_94.QueryPreviousBlockInfoResponse>;
                    allDowntimeInfo(request?: _94.QueryAllDowntimeInfoRequest): Promise<_94.QueryAllDowntimeInfoResponse>;
                };
                clob: {
                    clobPair(request: _108.QueryGetClobPairRequest): Promise<_108.QueryClobPairResponse>;
                    clobPairAll(request?: _108.QueryAllClobPairRequest): Promise<_108.QueryClobPairAllResponse>;
                    mevNodeToNodeCalculation(request: _108.MevNodeToNodeCalculationRequest): Promise<_108.MevNodeToNodeCalculationResponse>;
                    equityTierLimitConfiguration(request?: _108.QueryEquityTierLimitConfigurationRequest): Promise<_108.QueryEquityTierLimitConfigurationResponse>;
                    blockRateLimitConfiguration(request?: _108.QueryBlockRateLimitConfigurationRequest): Promise<_108.QueryBlockRateLimitConfigurationResponse>;
                    liquidationsConfiguration(request?: _108.QueryLiquidationsConfigurationRequest): Promise<_108.QueryLiquidationsConfigurationResponse>;
                    streamOrderbookUpdates(request: _108.StreamOrderbookUpdatesRequest): Promise<_108.StreamOrderbookUpdatesResponse>;
                };
                delaymsg: {
                    nextDelayedMessageId(request?: _116.QueryNextDelayedMessageIdRequest): Promise<_116.QueryNextDelayedMessageIdResponse>;
                    message(request: _116.QueryMessageRequest): Promise<_116.QueryMessageResponse>;
                    blockMessageIds(request: _116.QueryBlockMessageIdsRequest): Promise<_116.QueryBlockMessageIdsResponse>;
                };
                epochs: {
                    epochInfo(request: _120.QueryGetEpochInfoRequest): Promise<_120.QueryEpochInfoResponse>;
                    epochInfoAll(request?: _120.QueryAllEpochInfoRequest): Promise<_120.QueryEpochInfoAllResponse>;
                };
                feetiers: {
                    perpetualFeeParams(request?: _123.QueryPerpetualFeeParamsRequest): Promise<_123.QueryPerpetualFeeParamsResponse>;
                    userFeeTier(request: _123.QueryUserFeeTierRequest): Promise<_123.QueryUserFeeTierResponse>;
                };
                govplus: {};
                perpetuals: {
                    perpetual(request: _140.QueryPerpetualRequest): Promise<_140.QueryPerpetualResponse>;
                    allPerpetuals(request?: _140.QueryAllPerpetualsRequest): Promise<_140.QueryAllPerpetualsResponse>;
                    allLiquidityTiers(request?: _140.QueryAllLiquidityTiersRequest): Promise<_140.QueryAllLiquidityTiersResponse>;
                    premiumVotes(request?: _140.QueryPremiumVotesRequest): Promise<_140.QueryPremiumVotesResponse>;
                    premiumSamples(request?: _140.QueryPremiumSamplesRequest): Promise<_140.QueryPremiumSamplesResponse>;
                    params(request?: _140.QueryParamsRequest): Promise<_140.QueryParamsResponse>;
                };
                prices: {
                    marketPrice(request: _145.QueryMarketPriceRequest): Promise<_145.QueryMarketPriceResponse>;
                    allMarketPrices(request?: _145.QueryAllMarketPricesRequest): Promise<_145.QueryAllMarketPricesResponse>;
                    marketParam(request: _145.QueryMarketParamRequest): Promise<_145.QueryMarketParamResponse>;
                    allMarketParams(request?: _145.QueryAllMarketParamsRequest): Promise<_145.QueryAllMarketParamsResponse>;
                };
                ratelimit: {
                    listLimitParams(request?: _151.ListLimitParamsRequest): Promise<_151.ListLimitParamsResponse>;
                    capacityByDenom(request: _151.QueryCapacityByDenomRequest): Promise<_151.QueryCapacityByDenomResponse>;
                    allPendingSendPackets(request?: _151.QueryAllPendingSendPacketsRequest): Promise<_151.QueryAllPendingSendPacketsResponse>;
                    getSDAIPriceQuery(request?: _151.GetSDAIPriceQueryRequest): Promise<_151.GetSDAIPriceQueryResponse>;
                    getAssetYieldIndexQuery(request?: _151.GetAssetYieldIndexQueryRequest): Promise<_151.GetAssetYieldIndexQueryResponse>;
                };
                sending: {};
                stats: {
                    params(request?: _159.QueryParamsRequest): Promise<_159.QueryParamsResponse>;
                    statsMetadata(request?: _159.QueryStatsMetadataRequest): Promise<_159.QueryStatsMetadataResponse>;
                    globalStats(request?: _159.QueryGlobalStatsRequest): Promise<_159.QueryGlobalStatsResponse>;
                    userStats(request: _159.QueryUserStatsRequest): Promise<_159.QueryUserStatsResponse>;
                };
                subaccounts: {
                    subaccount(request: _165.QueryGetSubaccountRequest): Promise<_165.QuerySubaccountResponse>;
                    subaccountAll(request?: _165.QueryAllSubaccountRequest): Promise<_165.QuerySubaccountAllResponse>;
                    getWithdrawalAndTransfersBlockedInfo(request: _165.QueryGetWithdrawalAndTransfersBlockedInfoRequest): Promise<_165.QueryGetWithdrawalAndTransfersBlockedInfoResponse>;
                    collateralPoolAddress(request: _165.QueryCollateralPoolAddressRequest): Promise<_165.QueryCollateralPoolAddressResponse>;
                };
            };
        }>;
        createLCDClient: ({ restEndpoint }: {
            restEndpoint: string;
        }) => Promise<{
            cosmos: {
                auth: {
                    v1beta1: import("../cosmos/auth/v1beta1/query.lcd").LCDQueryClient;
                };
                authz: {
                    v1beta1: import("../cosmos/authz/v1beta1/query.lcd").LCDQueryClient;
                };
                bank: {
                    v1beta1: import("../cosmos/bank/v1beta1/query.lcd").LCDQueryClient;
                };
                base: {
                    node: {
                        v1beta1: import("../cosmos/base/node/v1beta1/query.lcd").LCDQueryClient;
                    };
                };
                circuit: {
                    v1: import("../cosmos/circuit/v1/query.lcd").LCDQueryClient;
                };
                consensus: {
                    v1: import("../cosmos/consensus/v1/query.lcd").LCDQueryClient;
                };
                distribution: {
                    v1beta1: import("../cosmos/distribution/v1beta1/query.lcd").LCDQueryClient;
                };
                gov: {
                    v1: import("../cosmos/gov/v1/query.lcd").LCDQueryClient;
                    v1beta1: import("../cosmos/gov/v1beta1/query.lcd").LCDQueryClient;
                };
                staking: {
                    v1beta1: import("../cosmos/staking/v1beta1/query.lcd").LCDQueryClient;
                };
                tx: {
                    v1beta1: import("../cosmos/tx/v1beta1/service.lcd").LCDQueryClient;
                };
                upgrade: {
                    v1beta1: import("../cosmos/upgrade/v1beta1/query.lcd").LCDQueryClient;
                };
            };
            klyraprotocol: {
                assets: _261.LCDQueryClient;
                blocktime: _262.LCDQueryClient;
                clob: _263.LCDQueryClient;
                delaymsg: _264.LCDQueryClient;
                epochs: _265.LCDQueryClient;
                feetiers: _266.LCDQueryClient;
                perpetuals: _267.LCDQueryClient;
                prices: _268.LCDQueryClient;
                ratelimit: _269.LCDQueryClient;
                stats: _270.LCDQueryClient;
                subaccounts: _271.LCDQueryClient;
            };
        }>;
    };
}
