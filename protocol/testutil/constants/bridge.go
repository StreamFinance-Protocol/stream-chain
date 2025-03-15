package constants

import (
	sdkmath "cosmossdk.io/math"
	"github.com/StreamFinance-Protocol/stream-chain/protocol/x/bridge/types"
	yieldstypes "github.com/StreamFinance-Protocol/stream-chain/protocol/x/yields/types"
	sdk "github.com/cosmos/cosmos-sdk/types"
	"github.com/ethereum/go-ethereum/common"
	ethcoretypes "github.com/ethereum/go-ethereum/core/types"
)

func init() {
	_ = TestTxBuilder.SetMsgs(MsgAcknowledgeBridges_NoEvents)
	MsgAcknowledgeBridges_NoEvents_TxBytes, _ = TestEncodingCfg.TxConfig.TxEncoder()(TestTxBuilder.GetTx())

	_ = TestTxBuilder.SetMsgs(MsgAcknowledgeBridges_Id0_Height0)
	MsgAcknowledgeBridges_Id0_Height0_TxBytes, _ = TestEncodingCfg.TxConfig.TxEncoder()(TestTxBuilder.GetTx())

	_ = TestTxBuilder.SetMsgs(MsgAcknowledgeBridges_Id1_Height0)
	MsgAcknowledgeBridges_Id1_Height0_TxBytes, _ = TestEncodingCfg.TxConfig.TxEncoder()(TestTxBuilder.GetTx())

	_ = TestTxBuilder.SetMsgs(MsgAcknowledgeBridges_Id55_Height15)
	MsgAcknowledgeBridges_Id55_Height15_TxBytes, _ = TestEncodingCfg.TxConfig.TxEncoder()(TestTxBuilder.GetTx())

	_ = TestTxBuilder.SetMsgs(MsgAcknowledgeBridges_Ids0_1_Height0)
	MsgAcknowledgeBridges_Ids0_1_Height0_TxBytes, _ = TestEncodingCfg.TxConfig.TxEncoder()(TestTxBuilder.GetTx())

	_ = TestTxBuilder.SetMsgs(MsgAcknowledgeBridges_Ids0_55_Height0)
	MsgAcknowledgeBridges_Ids0_55_Height0_TxBytes, _ = TestEncodingCfg.TxConfig.TxEncoder()(TestTxBuilder.GetTx())
}

var (
	// Private
	emptyCoin = sdk.Coin{
		Denom:  "adv4tnt",
		Amount: sdkmath.NewInt(0),
	}
	coin = sdk.Coin{
		Denom:  "adv4tnt",
		Amount: sdkmath.NewIntFromUint64(888),
	}

	SDaiConversionRateOneString = "1000000000000000000000000000"
	SDaiConversionRateTwoString = "2000000000000000000000000000"

	// Bridge Event.
	BridgeDepositEvent_Id0_Height0 = types.BridgeEvent{
		Id:          0,
		Address:     AliceAccAddress.String(),
		Coin:        coin,
		BlockHeight: 0,
		IsDeposit:   true,
	}
	BridgeDepositEvent_Id1_Height0 = types.BridgeEvent{
		Id:          1,
		Address:     BobAccAddress.String(),
		Coin:        coin,
		BlockHeight: 0,
		IsDeposit:   true,
	}
	BridgeDepositEvent_Id2_Height1 = types.BridgeEvent{
		Id:          2,
		Address:     BobAccAddress.String(),
		Coin:        coin,
		BlockHeight: 1,
		IsDeposit:   true,
	}
	BridgeDepositEvent_Id3_Height3 = types.BridgeEvent{
		Id:          3,
		Address:     CarlAccAddress.String(),
		Coin:        coin,
		BlockHeight: 3,
		IsDeposit:   true,
	}
	BridgeDepositEvent_Id4_Height0_EmptyCoin = types.BridgeEvent{
		Id:          0,
		Address:     AliceAccAddress.String(),
		Coin:        emptyCoin,
		BlockHeight: 0,
		IsDeposit:   true,
	}
	BridgeDepositEvent_Id55_Height15 = types.BridgeEvent{
		Id:          55,
		Address:     DaveAccAddress.String(),
		Coin:        coin,
		BlockHeight: 15,
		IsDeposit:   true,
	}

	// Acknowledge Bridges Tx.
	MsgAcknowledgeBridges_NoEvents = &types.MsgAcknowledgeBridges{
		Events: []types.BridgeEvent{},
	}
	MsgAcknowledgeBridges_NoEvents_TxBytes []byte

	MsgAcknowledgeBridges_Id0_Height0 = &types.MsgAcknowledgeBridges{
		Events: []types.BridgeEvent{
			BridgeDepositEvent_Id0_Height0,
		},
	}
	MsgAcknowledgeBridges_Id0_Height0_TxBytes []byte

	MsgAcknowledgeBridges_Id1_Height0 = &types.MsgAcknowledgeBridges{
		Events: []types.BridgeEvent{
			BridgeDepositEvent_Id1_Height0,
		},
	}
	MsgAcknowledgeBridges_Id1_Height0_TxBytes []byte

	MsgAcknowledgeBridges_Id55_Height15 = &types.MsgAcknowledgeBridges{
		Events: []types.BridgeEvent{
			BridgeDepositEvent_Id55_Height15,
		},
	}
	MsgAcknowledgeBridges_Id55_Height15_TxBytes []byte

	MsgAcknowledgeBridges_Ids0_1_Height0 = &types.MsgAcknowledgeBridges{
		Events: []types.BridgeEvent{
			BridgeDepositEvent_Id0_Height0,
			BridgeDepositEvent_Id1_Height0,
		},
	}
	MsgAcknowledgeBridges_Ids0_1_Height0_TxBytes []byte

	MsgAcknowledgeBridges_Ids0_55_Height0 = &types.MsgAcknowledgeBridges{
		Events: []types.BridgeEvent{
			BridgeDepositEvent_Id0_Height0,
			BridgeDepositEvent_Id55_Height15,
		},
	}
	MsgAcknowledgeBridges_Ids0_55_Height0_TxBytes []byte

	// Event Info.
	AcknowledgedEventInfo_Id0_Height0 = types.BridgeEventInfo{
		NextDepositId:  0,
		EthBlockHeight: 0,
	}
	RecognizedEventInfo_Id2_Height0 = types.BridgeEventInfo{
		NextDepositId:  2,
		EthBlockHeight: 0,
	}

	// Eth Chain ID.
	EthChainIdBridge = 11155111
	// Eth Log of Bridge event ID 0 at block height 3872013 that bridges 12345 tokens to address
	// `klyra1qqgzqvzq2ps8pqys5zcvp58q7rluextx92xhln`.
	EthLog_Event0 = ethcoretypes.Log{
		Topics: []common.Hash{
			common.HexToHash("0x498a04382650bc110983392ed12ab27595af8ece270a344fc70d773d2481043a"),
			common.HexToHash("0x0000000000000000000000000000000000000000000000000000000000000000"),
		},
		Data: []byte{0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0,
			0, 0, 0, 0, 48, 57, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 78, 213, 157, 76, 225, 209, 26,
			78, 111, 27, 28, 56, 208, 105, 160, 45, 130, 224, 44, 163, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0,
			0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 128, 0, 0, 0, 0, 0, 0, 0,
			0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 192, 0, 0, 0, 0,
			0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 20, 0,
			16, 32, 48, 64, 80, 96, 112, 128, 144, 160, 176, 192, 208, 224, 240, 255, 204, 153, 102,
			0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0,
			0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0},
		BlockNumber: 3872013,
	}
	// Eth Log of Bridge event ID 1 at block height 3969937 that bridges 55 tokens to an empty address.
	EthLog_Event1 = ethcoretypes.Log{
		Topics: []common.Hash{
			common.HexToHash("0x498a04382650bc110983392ed12ab27595af8ece270a344fc70d773d2481043a"),
			common.HexToHash("0x0000000000000000000000000000000000000000000000000000000000000001"),
		},
		Data: []byte{0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0,
			0, 0, 0, 0, 0, 55, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 78, 213, 157, 76, 225, 209, 26,
			78, 111, 27, 28, 56, 208, 105, 160, 45, 130, 224, 44, 163, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0,
			0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 128, 0, 0, 0, 0, 0, 0, 0,
			0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 160, 0, 0, 0, 0,
			0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0,
			0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 3,
			1, 2, 3, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0,
			0, 0},
		BlockNumber: 3969937,
	}
	// Eth Log of Bridge event ID 2 at block height 4139345 that bridges 777 tokens to address
	// `klyra1qqgzqvzq2ps8pqys5zcvp58q7rluextxzy3rx3z4vemc3xgq42as94fpcv` (32-byte address).
	EthLog_Event2 = ethcoretypes.Log{
		Topics: []common.Hash{
			common.HexToHash("0x498a04382650bc110983392ed12ab27595af8ece270a344fc70d773d2481043a"),
			common.HexToHash("0x0000000000000000000000000000000000000000000000000000000000000002"),
		},
		Data: []byte{0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0,
			0, 0, 0, 3, 9, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 78, 213, 157, 76, 225, 209, 26, 78, 111,
			27, 28, 56, 208, 105, 160, 45, 130, 224, 44, 163, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0,
			0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 128, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0,
			0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 192, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0,
			0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 32, 0, 16, 32, 48, 64, 80, 96,
			112, 128, 144, 160, 176, 192, 208, 224, 240, 255, 204, 153, 102, 17, 34, 51, 68, 85, 102, 119,
			136, 153, 0, 170, 187, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0,
			0, 0, 0, 0, 0, 0, 0, 2, 18, 52, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0,
			0, 0, 0, 0, 0, 0, 0, 0, 0},
		BlockNumber: 4139345,
	}
	// Eth Log of Bridge event ID 3 at block height 4139348 that bridges 888 tokens to address
	// `klyra124n92ej4ve2kv4tx24n92ej4ve2kv4tx24n92ej4ve2kv4tx24nyggjyyfzzy3pzgs3yggjyyfzzy3pzgs3ygg
	// jyyfzzy3pzgs3q8699x3` (62-byte address).
	EthLog_Event3 = ethcoretypes.Log{
		Topics: []common.Hash{
			common.HexToHash("0x498a04382650bc110983392ed12ab27595af8ece270a344fc70d773d2481043a"),
			common.HexToHash("0x0000000000000000000000000000000000000000000000000000000000000003"),
		},
		Data: []byte{0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0,
			0, 0, 0, 0, 3, 120, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 78, 213, 157, 76, 225, 209, 26,
			78, 111, 27, 28, 56, 208, 105, 160, 45, 130, 224, 44, 163, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0,
			0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 128, 0, 0, 0, 0, 0, 0, 0,
			0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 224, 0, 0, 0, 0,
			0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 62, 85,
			102, 85, 102, 85, 102, 85, 102, 85, 102, 85, 102, 85, 102, 85, 102, 85, 102, 85, 102, 85,
			102, 85, 102, 85, 102, 85, 102, 85, 102, 85, 102, 68, 34, 68, 34, 68, 34, 68, 34, 68, 34,
			68, 34, 68, 34, 68, 34, 68, 34, 68, 34, 68, 34, 68, 34, 68, 34, 68, 34, 68, 34, 0, 0, 0,
			0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0,
			2, 255, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0,
			0, 0, 0, 0},
		BlockNumber: 4139348,
	}
	// Eth Log of Bridge event ID 4 at block height 4139349 that bridges 1234123443214321 tokens to
	// address `klyra1zg6pydqhy4yy9`.
	EthLog_Event4 = ethcoretypes.Log{
		Topics: []common.Hash{
			common.HexToHash("0x498a04382650bc110983392ed12ab27595af8ece270a344fc70d773d2481043a"),
			common.HexToHash("0x0000000000000000000000000000000000000000000000000000000000000004"),
		},
		Data: []byte{0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 4, 98,
			109, 193, 113, 23, 241, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 78, 213, 157, 76, 225, 209, 26,
			78, 111, 27, 28, 56, 208, 105, 160, 45, 130, 224, 44, 163, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0,
			0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 128, 0, 0, 0, 0, 0, 0, 0, 0, 0,
			0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 192, 0, 0, 0, 0, 0, 0, 0,
			0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 4, 18, 52, 18, 52,
			0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0,
			0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 4, 67,
			33, 67, 33, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0,
			0},
		BlockNumber: 4139349,
	}
	EthLog_KlyraAddress_Event0 = ethcoretypes.Log{
		Topics: []common.Hash{
			common.HexToHash("0x498a04382650bc110983392ed12ab27595af8ece270a344fc70d773d2481043a"),
			common.HexToHash("0x0000000000000000000000000000000000000000000000000000000000000000"),
		},
		Data: []byte{
			0, 0, 0, 0, 0, 0, 0, 0,
			0, 0, 0, 0, 0, 0, 0, 0,
			0, 0, 0, 0, 0, 0, 0, 0,
			0, 0, 0, 0, 0, 0, 48, 57,
			0, 0, 0, 0, 0, 0, 0, 0,
			0, 0, 0, 0, 78, 213, 157, 76,
			225, 209, 26, 78, 111, 27, 28, 56,
			208, 105, 160, 45, 130, 224, 44, 163,
			0, 0, 0, 0, 0, 0, 0, 0,
			0, 0, 0, 0, 0, 0, 0, 0,
			0, 0, 0, 0, 0, 0, 0, 0,
			0, 0, 0, 0, 0, 0, 0, 128,
			0, 0, 0, 0, 0, 0, 0, 0,
			0, 0, 0, 0, 0, 0, 0, 0,
			0, 0, 0, 0, 0, 0, 0, 0,
			0, 0, 0, 0, 0, 0, 0, 0,
			0, 0, 0, 0, 0, 0, 0, 0,
			0, 0, 0, 0, 0, 0, 0, 0,
			0, 0, 0, 0, 0, 0, 0, 0,
			0, 0, 0, 0, 0, 0, 0, 44,
			107, 108, 121, 114, 97, 49, 113, 113,
			103, 122, 113, 118, 122, 113, 50, 112,
			115, 56, 112, 113, 121, 115, 53, 122,
			99, 118, 112, 53, 56, 113, 55, 114,
			108, 117, 101, 120, 116, 120, 54, 109,
			110, 99, 104, 99, 0, 0, 0, 0,
			0, 0, 0, 0, 0, 0, 0, 0,
			0, 0, 0, 0, 0, 0, 0, 0,
			0, 0, 0, 0, 0, 0, 0, 0,
			0, 0, 0, 0, 0, 0, 0, 0,
			0, 0, 0, 0, 0, 0, 0, 0,
			0, 0, 0, 0, 0, 0, 0, 0,
		},
		BlockNumber: 3872013,
	}
	// Eth Log of Bridge event ID 1 at block height 3969937 that bridges 55 tokens to an empty address.
	EthLog_KlyraAddress_Event1 = ethcoretypes.Log{
		Topics: []common.Hash{
			common.HexToHash("0x498a04382650bc110983392ed12ab27595af8ece270a344fc70d773d2481043a"),
			common.HexToHash("0x0000000000000000000000000000000000000000000000000000000000000001"),
		},

		Data: []byte{
			0, 0, 0, 0, 0, 0, 0, 0,
			0, 0, 0, 0, 0, 0, 0, 0,
			0, 0, 0, 0, 0, 0, 0, 0,
			0, 0, 0, 0, 0, 0, 0, 55,

			0, 0, 0, 0, 0, 0, 0, 0,
			0, 0, 0, 0, 78, 213, 157, 76,
			225, 209, 26, 78, 111, 27, 28, 56,
			208, 105, 160, 45, 130, 224, 44, 163,

			0, 0, 0, 0, 0, 0, 0, 0,
			0, 0, 0, 0, 0, 0, 0, 0,
			0, 0, 0, 0, 0, 0, 0, 0,
			0, 0, 0, 0, 0, 0, 0, 128,

			0, 0, 0, 0, 0, 0, 0, 0,
			0, 0, 0, 0, 0, 0, 0, 0,
			0, 0, 0, 0, 0, 0, 0, 0,
			0, 0, 0, 0, 0, 0, 0, 160,

			0, 0, 0, 0, 0, 0, 0, 0,
			0, 0, 0, 0, 0, 0, 0, 0,
			0, 0, 0, 0, 0, 0, 0, 0,
			0, 0, 0, 0, 0, 0, 0, 0,

			0, 0, 0, 0, 0, 0, 0, 0,
			0, 0, 0, 0, 0, 0, 0, 0,
			0, 0, 0, 0, 0, 0, 0, 0,
			0, 0, 0, 0, 0, 0, 0, 3,

			1, 2, 3, 0, 0, 0, 0, 0,
			0, 0, 0, 0, 0, 0, 0, 0,
			0, 0, 0, 0, 0, 0, 0, 0,
			0, 0, 0, 0, 0, 0, 0, 0,
		},
		BlockNumber: 3969937,
	}
	// Eth Log of Bridge event ID 2 at block height 4139345 that bridges 777 tokens to address
	// `klyra1qqgzqvzq2ps8pqys5zcvp58q7rluextxzy3rx3z4vemc3xgq42as94fpcv` (32-byte address).
	EthLog_KlyraAddress_Event2 = ethcoretypes.Log{
		Topics: []common.Hash{
			common.HexToHash("0x498a04382650bc110983392ed12ab27595af8ece270a344fc70d773d2481043a"),
			common.HexToHash("0x0000000000000000000000000000000000000000000000000000000000000002"),
		},
		Data: []byte{
			0, 0, 0, 0, 0, 0, 0, 0,
			0, 0, 0, 0, 0, 0, 0, 0,
			0, 0, 0, 0, 0, 0, 0, 0,
			0, 0, 0, 0, 0, 0, 3, 9,

			0, 0, 0, 0, 0, 0, 0, 0,
			0, 0, 0, 0, 78, 213, 157, 76,
			225, 209, 26, 78, 111, 27, 28, 56,
			208, 105, 160, 45, 130, 224, 44, 163,

			0, 0, 0, 0, 0, 0, 0, 0,
			0, 0, 0, 0, 0, 0, 0, 0,
			0, 0, 0, 0, 0, 0, 0, 0,
			0, 0, 0, 0, 0, 0, 0, 128,

			0, 0, 0, 0, 0, 0, 0, 0,
			0, 0, 0, 0, 0, 0, 0, 0,
			0, 0, 0, 0, 0, 0, 0, 0,
			0, 0, 0, 0, 0, 0, 0, 224,

			0, 0, 0, 0, 0, 0, 0, 0,
			0, 0, 0, 0, 0, 0, 0, 0,
			0, 0, 0, 0, 0, 0, 0, 0,
			0, 0, 0, 0, 0, 0, 0, 64,

			107, 108, 121, 114, 97, 49, 113, 113, // k l y r a 1 q q
			103, 122, 113, 118, 122, 113, 50, 112, // g z q v z q 2 p
			115, 56, 112, 113, 121, 115, 53, 122, // s 8 p q y s 5 z
			99, 118, 112, 53, 56, 113, 55, 114, // c v p 5 8 q 7 r

			108, 117, 101, 120, 116, 120, 122, 121, // l u e x t x z y
			51, 114, 120, 51, 122, 52, 118, 101, // 3 r x 3 z 4 v e
			109, 99, 51, 120, 103, 113, 52, 50, // m c 3 x g q 4 2
			97, 115, 99, 114, 108, 53, 57, 52, // a s c r l 5 9 4

			0, 0, 0, 0, 0, 0, 0, 0,
			0, 0, 0, 0, 0, 0, 0, 0,
			0, 0, 0, 0, 0, 0, 0, 0,
			0, 0, 0, 0, 0, 0, 0, 2,

			18, 52, 0, 0, 0, 0, 0, 0,
			0, 0, 0, 0, 0, 0, 0, 0,
			0, 0, 0, 0, 0, 0, 0, 0,
			0, 0, 0, 0, 0, 0, 0, 0,
		},
		BlockNumber: 4139345,
	}
	// Eth Log of Bridge event ID 3 at block height 4139348 that bridges 888 tokens to address
	// `klyra124n92ej4ve2kv4tx24n92ej4ve2kv4tx24n92ej4ve2kv4tx24nyggjyyfzzy3pzgs3yggjyyfzzy3pzgs3ygg
	// jyyfzzy3pzgs3q8699x3` (62-byte address).
	EthLog_KlyraAddress_Event3 = ethcoretypes.Log{
		Topics: []common.Hash{
			common.HexToHash("0x498a04382650bc110983392ed12ab27595af8ece270a344fc70d773d2481043a"),
			common.HexToHash("0x0000000000000000000000000000000000000000000000000000000000000003"),
		},
		Data: []byte{
			0, 0, 0, 0, 0, 0, 0, 0,
			0, 0, 0, 0, 0, 0, 0, 0,
			0, 0, 0, 0, 0, 0, 0, 0,
			0, 0, 0, 0, 0, 0, 3, 120,

			0, 0, 0, 0, 0, 0, 0, 0,
			0, 0, 0, 0, 78, 213, 157, 76,
			225, 209, 26, 78, 111, 27, 28, 56,
			208, 105, 160, 45, 130, 224, 44, 163,

			0, 0, 0, 0, 0, 0, 0, 0,
			0, 0, 0, 0, 0, 0, 0, 0,
			0, 0, 0, 0, 0, 0, 0, 0,
			0, 0, 0, 0, 0, 0, 0, 128,

			0, 0, 0, 0, 0, 0, 0, 0,
			0, 0, 0, 0, 0, 0, 0, 0,
			0, 0, 0, 0, 0, 0, 0, 0,
			0, 0, 0, 0, 0, 0, 0, 224,

			0, 0, 0, 0, 0, 0, 0, 0,
			0, 0, 0, 0, 0, 0, 0, 0,
			0, 0, 0, 0, 0, 0, 0, 0,
			0, 0, 0, 0, 0, 0, 0, 62,

			107, 108, 121, 114, 97, 49, 50, 52, // k l y r a 1 2 4
			110, 57, 50, 101, 106, 52, 118, 101, // n 9 2 e j 4 v e
			50, 107, 118, 52, 116, 120, 50, 52, // 2 k v 4 t x 2 4
			110, 57, 50, 101, 106, 52, 118, 101, // n 9 2 e j 4 v e

			50, 107, 118, 52, 116, 120, 50, 52, // 2 k v 4 t x 2 4
			110, 57, 50, 101, 106, 52, 118, 101, // n 9 2 e j 4 v e
			50, 107, 118, 52, 116, 120, 50, 52, // 2 k v 4 t x 2 4
			110, 113, 54, 48, 115, 119, 0, 0, // n q 6 0 s w

			0, 0, 0, 0, 0, 0, 0, 0,
			0, 0, 0, 0, 0, 0, 0, 0,
			0, 0, 0, 0, 0, 0, 0, 0,
			0, 0, 0, 0, 0, 0, 0, 2,

			18, 52, 0, 0, 0, 0, 0, 0,
			0, 0, 0, 0, 0, 0, 0, 0,
			0, 0, 0, 0, 0, 0, 0, 0,
			0, 0, 0, 0, 0, 0, 0, 0,
		},
		BlockNumber: 4139348,
	}
	// Eth Log of Bridge event ID 4 at block height 4139349 that bridges 1234123443214321 tokens to
	// address `klyra1zg6pydqhy4yy9`.
	EthLog_KlyraAddress_Event4 = ethcoretypes.Log{
		Topics: []common.Hash{
			common.HexToHash("0x498a04382650bc110983392ed12ab27595af8ece270a344fc70d773d2481043a"),
			common.HexToHash("0x0000000000000000000000000000000000000000000000000000000000000004"),
		},
		Data: []byte{
			0, 0, 0, 0, 0, 0, 0, 0,
			0, 0, 0, 0, 0, 0, 0, 0,
			0, 0, 0, 0, 0, 0, 0, 0,
			0, 4, 98, 109, 193, 113, 23, 241,

			0, 0, 0, 0, 0, 0, 0, 0,
			0, 0, 0, 0, 78, 213, 157, 76,
			225, 209, 26, 78, 111, 27, 28, 56,
			208, 105, 160, 45, 130, 224, 44, 163,

			0, 0, 0, 0, 0, 0, 0, 0,
			0, 0, 0, 0, 0, 0, 0, 0,
			0, 0, 0, 0, 0, 0, 0, 0,
			0, 0, 0, 0, 0, 0, 0, 128,

			0, 0, 0, 0, 0, 0, 0, 0,
			0, 0, 0, 0, 0, 0, 0, 0,
			0, 0, 0, 0, 0, 0, 0, 0,
			0, 0, 0, 0, 0, 0, 0, 224,

			0, 0, 0, 0, 0, 0, 0, 0,
			0, 0, 0, 0, 0, 0, 0, 0,
			0, 0, 0, 0, 0, 0, 0, 0,
			0, 0, 0, 0, 0, 0, 0, 43,

			107, 108, 121, 114, 97, 49, 122, 103, // k l y r a 1 z g
			54, 112, 121, 100, 113, 113, 113, 113, // 6 p y d q q q q
			113, 113, 113, 113, 113, 113, 113, 113, // q q q q q q q q
			113, 113, 113, 113, 113, 113, 113, 113, // q q q q q q q q

			113, 113, 113, 113, 113, 121, 55, 107, // q q q q q y 7 k
			109, 116, 107, 0, 0, 0, 0, 0,
			0, 0, 0, 0, 0, 0, 0, 0,
			0, 0, 0, 0, 0, 0, 0, 0,

			0, 0, 0, 0, 0, 0, 0, 0,
			0, 0, 0, 0, 0, 0, 0, 0,
			0, 0, 0, 0, 0, 0, 0, 0,
			0, 0, 0, 0, 0, 0, 0, 4,

			67, 33, 67, 33, 0, 0, 0, 0,
			0, 0, 0, 0, 0, 0, 0, 0,
			0, 0, 0, 0, 0, 0, 0, 0,
			0, 0, 0, 0, 0, 0, 0, 0,
		},
		BlockNumber: 4139349,
	}

	BridgeWithdrawalEvent1 = types.BridgeEvent{
		Id:          1,
		Coin:        sdk.NewCoin(yieldstypes.SDaiDenom, sdkmath.NewInt(123456789012345)),
		Address:     "0xd8dA6BF26964aF9D7eEd9e03E53415D37aA96045",
		BlockHeight: 4139349,
		IsDeposit:   false,
	}

	BridgeWithdrawalEvent2 = types.BridgeEvent{
		Id:          2,
		Coin:        sdk.NewCoin(yieldstypes.SDaiDenom, sdkmath.NewInt(987654321098765)),
		Address:     "0x9F27d6a5781e88c996AFe56AA357268E04364a1d",
		BlockHeight: 4139349,
		IsDeposit:   false,
	}

	BridgeWithdrawalEvent2_CoinDenomNotSDai = types.BridgeEvent{
		Id:          2,
		Coin:        sdk.NewCoin(yieldstypes.TDaiDenom, sdkmath.NewInt(987654321098765)),
		Address:     "0x9F27d6a5781e88c996AFe56AA357268E04364a1d",
		BlockHeight: 4139349,
		IsDeposit:   false,
	}

	// Params
	// Event Params.
	EventParams = types.EventParams{
		Denom:      coin.Denom,
		EthChainId: uint64(EthChainId),
		EthAddress: AliceAccAddress.String(),
	}
	// Propose Params.
	ProposeParams = types.ProposeParams{
		MaxBridgesPerBlock:           2,
		ProposeDelayDuration:         1,
		SkipRatePpm:                  0,
		SkipIfBlockDelayedByDuration: 1,
	}
)
