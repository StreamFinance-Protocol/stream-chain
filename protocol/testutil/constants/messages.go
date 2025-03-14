package constants

import (
	sdkmath "cosmossdk.io/math"
	"github.com/StreamFinance-Protocol/stream-chain/protocol/app/config"
	assettypes "github.com/StreamFinance-Protocol/stream-chain/protocol/x/assets/types"
	sendingtypes "github.com/StreamFinance-Protocol/stream-chain/protocol/x/sending/types"
	sdk "github.com/cosmos/cosmos-sdk/types"
	banktypes "github.com/cosmos/cosmos-sdk/x/bank/types"
)

func init() {
	// This package does not contain the `app/config` package in its import chain, and therefore needs to call
	// SetAddressPrefixes() explicitly in order to set the `klyra` address prefixes.
	config.SetAddressPrefixes()

	_ = TestTxBuilder.SetMsgs(Msg_Send)
	Msg_Send_TxBytes, _ = TestEncodingCfg.TxConfig.TxEncoder()(TestTxBuilder.GetTx())

	_ = TestTxBuilder.SetMsgs(Msg_Transfer_Invalid_SameSenderAndRecipient)
	Msg_Transfer_Invalid_SameSenderAndRecipient_TxBytes, _ = TestEncodingCfg.TxConfig.TxEncoder()(TestTxBuilder.GetTx())

	_ = TestTxBuilder.SetMsgs(Msg_Send, Msg_Transfer)
	Msg_SendAndTransfer_TxBytes, _ = TestEncodingCfg.TxConfig.TxEncoder()(TestTxBuilder.GetTx())
}

var (
	Msg_Transfer = &sendingtypes.MsgCreateTransfer{
		Transfer: &sendingtypes.Transfer{
			Sender:    Carl_Num0,
			Recipient: Dave_Num0,
			AssetId:   assettypes.AssetTDai.Id,
			Amount:    500_000_000, // $500
		},
	}
	Msg_Transfer_Invalid_SameSenderAndRecipient = &sendingtypes.MsgCreateTransfer{
		Transfer: &sendingtypes.Transfer{
			Sender:    Alice_Num0,
			Recipient: Alice_Num0,
			AssetId:   assettypes.AssetTDai.Id,
			Amount:    500_000_000, // $500
		},
	}
	Msg_Transfer_Invalid_SameSenderAndRecipient_TxBytes []byte

	Msg_Send = &banktypes.MsgSend{
		FromAddress: AliceAccAddress.String(),
		ToAddress:   BobAccAddress.String(),
		Amount: sdk.Coins{sdk.Coin{
			Denom:  "foo",
			Amount: sdkmath.OneInt(),
		}},
	}
	Msg_Send_TxBytes []byte

	Msg_SendAndTransfer_TxBytes []byte
)
