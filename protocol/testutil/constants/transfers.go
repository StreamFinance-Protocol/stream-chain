package constants

import (
	assettypes "github.com/StreamFinance-Protocol/stream-chain/protocol/x/assets/types"
	"github.com/StreamFinance-Protocol/stream-chain/protocol/x/sending/types"
)

var (
	Transfer_Carl_Num0_Dave_Num0_Quote_500 = types.Transfer{
		Sender:    Carl_Num0,
		Recipient: Dave_Num0,
		AssetId:   assettypes.AssetTDai.Id,
		Amount:    500_000_000, // $500
	}
	Transfer_Carl_Num0_Dave_Num0_Quote_1Tenth_BTC = types.Transfer{
		Sender:    Carl_Num0,
		Recipient: Dave_Num0,
		AssetId:   assettypes.AssetBtc.Id,
		Amount:    10_000_000, // 0.1BTC
	}
	Transfer_Carl_Num0_Dave_Num0_Quote_600 = types.Transfer{
		Sender:    Carl_Num0,
		Recipient: Dave_Num0,
		AssetId:   assettypes.AssetTDai.Id,
		Amount:    600_000_000, // $600
	}
	Transfer_Carl_Num0_Dave_Num0_Quote_2_BTC = types.Transfer{
		Sender:    Carl_Num0,
		Recipient: Dave_Num0,
		AssetId:   assettypes.AssetBtc.Id,
		Amount:    200_000_000, // $600
	}
	Transfer_Carl_Num0_Dave_Num0_Asset_600 = types.Transfer{
		Sender:    Carl_Num0,
		Recipient: Dave_Num0,
		AssetId:   assettypes.AssetTDai.Id,
		Amount:    600_000_000, // $600
	}
	Transfer_Dave_Num0_Carl_Num0_Asset_500 = types.Transfer{
		Sender:    Dave_Num0,
		Recipient: Carl_Num0,
		AssetId:   assettypes.AssetTDai.Id,
		Amount:    500_000_000, // $500
	}
	Transfer_Dave_Num0_Carl_Num0_Asset_500_GTB_20 = types.Transfer{
		Sender:    Dave_Num0,
		Recipient: Carl_Num0,
		AssetId:   assettypes.AssetTDai.Id,
		Amount:    500_000_000, // $500
	}
)

// Test constants for deposit-to-subaccount messages.
var (
	MsgDepositToSubaccount_Alice_To_Alice_Num0_500 = types.MsgDepositToSubaccount{
		Sender:    AliceAccAddress.String(),
		Recipient: Alice_Num0,
		AssetId:   assettypes.AssetTDai.Id,
		Quantums:  500_000_000, // $500
	}
	MsgDepositToSubaccount_Alice_To_Alice_Num0_1BTC = types.MsgDepositToSubaccount{
		Sender:    AliceAccAddress.String(),
		Recipient: Alice_Num0,
		AssetId:   assettypes.AssetBtc.Id,
		Quantums:  100_000_000, // 1 BTC
	}
	MsgDepositToSubaccount_Alice_To_Carl_Num0_750 = types.MsgDepositToSubaccount{
		Sender:    AliceAccAddress.String(),
		Recipient: Carl_Num0,
		AssetId:   assettypes.AssetTDai.Id,
		Quantums:  750_000_000, // $750
	}
	MsgDepositToSubaccount_Alice_To_Carl_Num0_halfBTC = types.MsgDepositToSubaccount{
		Sender:    AliceAccAddress.String(),
		Recipient: Carl_Num0,
		AssetId:   assettypes.AssetTDai.Id,
		Quantums:  50_000_000, // 0.5 BTC
	}
)

// Test constants for withdraw-from-subaccount messages.
var (
	MsgWithdrawFromSubaccount_Alice_Num0_To_Alice_500 = types.MsgWithdrawFromSubaccount{
		Sender:    Alice_Num0,
		Recipient: AliceAccAddress.String(),
		AssetId:   assettypes.AssetTDai.Id,
		Quantums:  500_000_000, // $500
	}
	MsgWithdrawFromSubaccount_Alice_Num0_To_Alice_1BTC = types.MsgWithdrawFromSubaccount{
		Sender:    Alice_Num0,
		Recipient: AliceAccAddress.String(),
		AssetId:   assettypes.AssetBtc.Id,
		Quantums:  100_000_000, // 1 BTC
	}
	MsgWithdrawFromSubaccount_Carl_Num0_To_Alice_750 = types.MsgWithdrawFromSubaccount{
		Sender:    Carl_Num0,
		Recipient: AliceAccAddress.String(),
		AssetId:   assettypes.AssetTDai.Id,
		Quantums:  750_000_000, // $750
	}
	MsgWithdrawFromSubaccount_Carl_Num0_To_Alice_halfBTC = types.MsgWithdrawFromSubaccount{
		Sender:    Carl_Num0,
		Recipient: AliceAccAddress.String(),
		AssetId:   assettypes.AssetBtc.Id,
		Quantums:  50_000_000, // 0.5BTC
	}
)
