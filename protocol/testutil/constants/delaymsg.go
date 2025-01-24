package constants

import (
	bridgetypes "github.com/StreamFinance-Protocol/stream-chain/protocol/x/bridge/types"
	"github.com/StreamFinance-Protocol/stream-chain/protocol/x/delaymsg/types"
	"github.com/cosmos/cosmos-sdk/testutil/testdata"
	sdk "github.com/cosmos/cosmos-sdk/types"
)

var (
	// MsgCompleteBridge is an example of an expected Msg type in the delaymsg module.
	TestMsg1 = &bridgetypes.MsgCompleteBridge{
		Authority: types.ModuleAddress.String(),
		Event: bridgetypes.BridgeEvent{
			Id: 1,
		},
	}
	TestMsg2 = &bridgetypes.MsgCompleteBridge{
		Authority: types.ModuleAddress.String(),
		Event: bridgetypes.BridgeEvent{
			Id: 2,
		},
	}
	TestMsg3 = &bridgetypes.MsgCompleteBridge{
		Authority: types.ModuleAddress.String(),
		Event: bridgetypes.BridgeEvent{
			Id: 3,
		},
	}
	BridgeWithdraw_1SDai = bridgetypes.BridgeWithdraw{
		SdaiAmount:   "1",
		Account:      BobAccAddress.String(),
		EthRecipient: mockEthRecipient,
	}
	BridgeWithdraw_LargerSDaiAmount = bridgetypes.BridgeWithdraw{
		SdaiAmount:   "1000000000000000000000000000",
		Account:      BobAccAddress.String(),
		EthRecipient: mockEthRecipient,
	}
	BridgeWithdraw_ZeroSDaiAmount = bridgetypes.BridgeWithdraw{
		SdaiAmount:   "0",
		Account:      BobAccAddress.String(),
		EthRecipient: mockEthRecipient,
	}
	BridgeWithdraw_NegativeSDaiAmount = bridgetypes.BridgeWithdraw{
		SdaiAmount:   "-1",
		Account:      BobAccAddress.String(),
		EthRecipient: mockEthRecipient,
	}
	BridgeWithdraw_NonIntegerSDaiAmount = bridgetypes.BridgeWithdraw{
		SdaiAmount:   "1.1",
		Account:      BobAccAddress.String(),
		EthRecipient: mockEthRecipient,
	}
	BridgeWithdraw_MalformedSDaiAmount = bridgetypes.BridgeWithdraw{
		SdaiAmount:   "abc",
		Account:      BobAccAddress.String(),
		EthRecipient: mockEthRecipient,
	}
	BridgeWithdraw_InvalidAddress = bridgetypes.BridgeWithdraw{
		SdaiAmount:   "1",
		Account:      "invalid",
		EthRecipient: mockEthRecipient,
	}
	BridgeWithdraw_EmptyEthAddress = bridgetypes.BridgeWithdraw{
		SdaiAmount:   "1",
		Account:      BobAccAddress.String(),
		EthRecipient: "",
	}
	MsgBridgeWithdraw_1SDai = bridgetypes.MsgBridgeWithdraw{
		Withdraw: BridgeWithdraw_1SDai,
	}
	MsgBridgeWithdraw_LargerSDaiAmount = bridgetypes.MsgBridgeWithdraw{
		Withdraw: BridgeWithdraw_LargerSDaiAmount,
	}
	MsgBridgeWithdraw_ZeroSDaiAmount = bridgetypes.MsgBridgeWithdraw{
		Withdraw: BridgeWithdraw_ZeroSDaiAmount,
	}
	MsgBridgeWithdraw_NegativeSDaiAmount = bridgetypes.MsgBridgeWithdraw{
		Withdraw: BridgeWithdraw_NegativeSDaiAmount,
	}
	MsgBridgeWithdraw_NonIntegerSDaiAmount = bridgetypes.MsgBridgeWithdraw{
		Withdraw: BridgeWithdraw_NonIntegerSDaiAmount,
	}
	MsgBridgeWithdraw_MalformedSDaiAmount = bridgetypes.MsgBridgeWithdraw{
		Withdraw: BridgeWithdraw_MalformedSDaiAmount,
	}
	MsgBridgeWithdraw_InvalidAddress = bridgetypes.MsgBridgeWithdraw{
		Withdraw: BridgeWithdraw_InvalidAddress,
	}
	MsgBridgeWithdraw_EmptyEthAddress = bridgetypes.MsgBridgeWithdraw{
		Withdraw: BridgeWithdraw_EmptyEthAddress,
	}
	NoHandlerMsg = &testdata.TestMsg{Signers: []string{types.ModuleAddress.String()}}

	mockEthRecipient = "0x70e1b787A5D677a5906AccCF0B4F387b8Bb1B5C3"

	AllMsgs = []sdk.Msg{TestMsg1, TestMsg2, TestMsg3}
)
