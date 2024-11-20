package sending_test

import (
	"bytes"
	"math/big"
	"testing"
	"time"

	sdaiservertypes "github.com/StreamFinance-Protocol/stream-chain/protocol/daemons/server/types/sdaioracle"
	"github.com/StreamFinance-Protocol/stream-chain/protocol/dtypes"
	"github.com/StreamFinance-Protocol/stream-chain/protocol/lib"
	testapp "github.com/StreamFinance-Protocol/stream-chain/protocol/testutil/app"
	"github.com/StreamFinance-Protocol/stream-chain/protocol/testutil/rand"
	sample_testutil "github.com/StreamFinance-Protocol/stream-chain/protocol/testutil/sample"
	abcitypes "github.com/cometbft/cometbft/abci/types"
	"github.com/cometbft/cometbft/types"
	cryptotypes "github.com/cosmos/cosmos-sdk/crypto/types"
	"github.com/cosmos/cosmos-sdk/testutil/sims"
	sdktypes "github.com/cosmos/cosmos-sdk/types"
	simtypes "github.com/cosmos/cosmos-sdk/types/simulation"
	"github.com/cosmos/gogoproto/proto"
	"github.com/stretchr/testify/require"

	"github.com/StreamFinance-Protocol/stream-chain/protocol/indexer"
	indexerevents "github.com/StreamFinance-Protocol/stream-chain/protocol/indexer/events"
	"github.com/StreamFinance-Protocol/stream-chain/protocol/indexer/indexer_manager"
	"github.com/StreamFinance-Protocol/stream-chain/protocol/indexer/msgsender"
	"github.com/StreamFinance-Protocol/stream-chain/protocol/testutil/constants"
	assetstypes "github.com/StreamFinance-Protocol/stream-chain/protocol/x/assets/types"
	perptypes "github.com/StreamFinance-Protocol/stream-chain/protocol/x/perpetuals/types"
	prices "github.com/StreamFinance-Protocol/stream-chain/protocol/x/prices/types"
	sendingtypes "github.com/StreamFinance-Protocol/stream-chain/protocol/x/sending/types"
	satypes "github.com/StreamFinance-Protocol/stream-chain/protocol/x/subaccounts/types"

	ratelimitkeeper "github.com/StreamFinance-Protocol/stream-chain/protocol/x/ratelimit/keeper"
	tmproto "github.com/cometbft/cometbft/proto/tendermint/types"
)

func TestMsgCreateTransfer(t *testing.T) {
	tests := map[string]struct {
		/* Setup */
		// Initial balance of sender subaccount.
		senderInitialBalance uint64

		// Whether recipient subaccount exists.
		recipientDoesNotExist bool

		// Sender subaccount ID.
		senderSubaccountId satypes.SubaccountId

		// Recipient subaccount ID.
		recipientSubaccountId satypes.SubaccountId

		// Asset to transfer.
		asset assetstypes.Asset

		// Amount to transfer.
		amount uint64

		/* Expectations */
		// A string that CheckTx response should contain, if any.
		checkTxResponseContains string

		// Whether CheckTx fails.
		checkTxFails bool

		// Whether DeliverTx fails.
		deliverTxFails bool
	}{
		"Success: transfer from Alice subaccount 1 to Alice subaccount 2": {
			senderInitialBalance:  600_000_000,
			senderSubaccountId:    constants.Alice_Num0,
			recipientSubaccountId: constants.Alice_Num1,
			asset:                 *constants.TDai,
			amount:                500_000_000,
		},
		"Success: transfer from Bob subaccount to Carl subaccount": {
			senderInitialBalance:  10_000_000,
			senderSubaccountId:    constants.Bob_Num0,
			recipientSubaccountId: constants.Carl_Num0,
			asset:                 *constants.TDai,
			amount:                7_654_321,
		},
		// Transfer to a non-existent subaccount will create that subaccount and succeed.
		"Success: transfer from Alice subaccount to non-existent subaccount": {
			senderInitialBalance:  10_000_000,
			recipientDoesNotExist: true,
			senderSubaccountId:    constants.Alice_Num0,
			recipientSubaccountId: satypes.SubaccountId{
				Owner:  constants.BobAccAddress.String(),
				Number: 104,
			},
			asset:  *constants.TDai,
			amount: 3_000_000,
		},
		"Failure: transfer more than balance": {
			senderInitialBalance:  600_000_000,
			senderSubaccountId:    constants.Alice_Num0,
			recipientSubaccountId: constants.Alice_Num1,
			asset:                 *constants.TDai,
			amount:                600_000_001,
			deliverTxFails:        true,
		},
		"Failure: transfer a non-TDai asset with BTC not set as multi-collateral asset": {
			senderInitialBalance:  100_000_000_000,
			senderSubaccountId:    constants.Carl_BTC,
			recipientSubaccountId: constants.Alice_Num1,
			asset:                 *constants.BtcUsd, // non-TDai asset
			amount:                7_000_000,
			deliverTxFails:        true,
		},
		"Success: transfer a non-TDai asset": {
			senderInitialBalance:  100_000_000_000,
			senderSubaccountId:    constants.Carl_BTC,
			recipientSubaccountId: constants.Alice_Num1,
			asset:                 *constants.BtcUsd, // non-TDai asset
			amount:                7_000_000,
		},
		"Failure: transfer zero amount": {
			senderSubaccountId:      constants.Alice_Num0,
			recipientSubaccountId:   constants.Alice_Num1,
			asset:                   *constants.TDai,
			amount:                  0,
			checkTxResponseContains: "Invalid transfer amount",
			checkTxFails:            true,
		},
		"Failure: transfer from a subaccount to itself": {
			senderSubaccountId:      constants.Bob_Num0,
			recipientSubaccountId:   constants.Bob_Num0,
			asset:                   *constants.TDai,
			amount:                  123_456,
			checkTxResponseContains: "Sender is the same as recipient",
			checkTxFails:            true,
		},
	}

	for name, tc := range tests {
		t.Run(name, func(t *testing.T) {
			// Set up tApp with indexer and sender subaccount balance of TDai.
			msgSender := msgsender.NewIndexerMessageSenderInMemoryCollector()
			appOpts := map[string]interface{}{
				indexer.MsgSenderInstanceForTest: msgSender,
			}
			tApp := testapp.NewTestAppBuilder(t).WithGenesisDocFn(func() (genesis types.GenesisDoc) {
				genesis = testapp.DefaultGenesis()
				testapp.UpdateGenesisDocWithAppStateForModule(
					&genesis,
					func(genesisState *satypes.GenesisState) {
						genesisState.Subaccounts = []satypes.Subaccount{
							{
								Id: &(tc.senderSubaccountId),
								AssetPositions: []*satypes.AssetPosition{
									{
										AssetId: tc.asset.Id,
										Index:   0,
										Quantums: dtypes.NewIntFromUint64(
											tc.senderInitialBalance,
										),
									},
								},
							},
						}
						if !tc.recipientDoesNotExist {
							genesisState.Subaccounts = append(
								genesisState.Subaccounts,
								satypes.Subaccount{
									Id: &(tc.recipientSubaccountId),
									AssetPositions: []*satypes.AssetPosition{
										{
											AssetId: tc.asset.Id,
											Index:   0,
											Quantums: dtypes.NewIntFromUint64(
												rand.NewRand().Uint64(),
											),
										},
									},
								},
							)
						}
					},
				)
				return genesis
			}).WithAppOptions(appOpts).Build()

			rateString := sdaiservertypes.TestSDAIEventRequest.ConversionRate
			rate, conversionErr := ratelimitkeeper.ConvertStringToBigInt(rateString)

			require.NoError(t, conversionErr)

			tApp.App.RatelimitKeeper.SetSDAIPrice(tApp.App.NewUncachedContext(false, tmproto.Header{}), rate)
			tApp.App.RatelimitKeeper.SetAssetYieldIndex(tApp.App.NewUncachedContext(false, tmproto.Header{}), big.NewRat(1, 1))

			tApp.CrashingApp.RatelimitKeeper.SetSDAIPrice(tApp.CrashingApp.NewUncachedContext(false, tmproto.Header{}), rate)
			tApp.CrashingApp.RatelimitKeeper.SetAssetYieldIndex(tApp.CrashingApp.NewUncachedContext(false, tmproto.Header{}), big.NewRat(1, 1))

			tApp.NoCheckTxApp.RatelimitKeeper.SetSDAIPrice(tApp.NoCheckTxApp.NewUncachedContext(false, tmproto.Header{}), rate)
			tApp.NoCheckTxApp.RatelimitKeeper.SetAssetYieldIndex(tApp.NoCheckTxApp.NewUncachedContext(false, tmproto.Header{}), big.NewRat(1, 1))

			tApp.ParallelApp.RatelimitKeeper.SetSDAIPrice(tApp.ParallelApp.NewUncachedContext(false, tmproto.Header{}), rate)
			tApp.ParallelApp.RatelimitKeeper.SetAssetYieldIndex(tApp.ParallelApp.NewUncachedContext(false, tmproto.Header{}), big.NewRat(1, 1))

			_ = tApp.AdvanceToBlock(2, testapp.AdvanceToBlockOptions{})

			ctx := tApp.AdvanceToBlock(3, testapp.AdvanceToBlockOptions{})

			// Clear any messages produced prior to CheckTx calls.
			msgSender.Clear()

			senderQuantumsBeforeTransfer :=
				getSubaccountAssetQuantums(tApp.App.SubaccountsKeeper, ctx, tc.senderSubaccountId, tc.asset)
			recipientQuantumsBeforeTransfer :=
				getSubaccountAssetQuantums(tApp.App.SubaccountsKeeper, ctx, tc.recipientSubaccountId, tc.asset)

			// Construct message.
			msgCreateTransfer := sendingtypes.MsgCreateTransfer{
				Transfer: &sendingtypes.Transfer{
					Sender:    tc.senderSubaccountId,
					Recipient: tc.recipientSubaccountId,
					AssetId:   tc.asset.Id,
					Amount:    tc.amount,
				},
			}

			// Invoke CheckTx.
			CheckTx_MsgCreateTransfer := testapp.MustMakeCheckTx(
				ctx,
				tApp.App,
				testapp.MustMakeCheckTxOptions{
					AccAddressForSigning: msgCreateTransfer.Transfer.Sender.Owner,
					Gas:                  225_000,
					FeeAmt:               constants.TestFeeCoins_5Cents,
				},
				&msgCreateTransfer,
			)
			checkTxResp := tApp.CheckTx(CheckTx_MsgCreateTransfer)

			// Check that CheckTx response log contains expected string, if any.
			if tc.checkTxResponseContains != "" {
				require.Contains(t, checkTxResp.Log, tc.checkTxResponseContains)
			}
			// Check that CheckTx succeeds or fails as expected.
			if tc.checkTxFails {
				require.Conditionf(t, checkTxResp.IsErr, "Expected CheckTx to error. Response: %+v", checkTxResp)
				return
			}
			require.Conditionf(t, checkTxResp.IsOK, "Expected CheckTx to succeed. Response: %+v", checkTxResp)

			// Check that no indexer events are emitted so far.
			require.Empty(t, msgSender.GetOnchainMessages())

			if tc.deliverTxFails {
				// Check that DeliverTx fails on MsgCreateTransfer.
				tApp.AdvanceToBlock(4, testapp.AdvanceToBlockOptions{
					ValidateFinalizeBlock: func(
						context sdktypes.Context,
						request abcitypes.RequestFinalizeBlock,
						response abcitypes.ResponseFinalizeBlock,
					) (haltChain bool) {
						for i, tx := range request.Txs {
							if i == 0 {
								// tx is empty extInfoBz
								continue
							}
							if bytes.Equal(tx, CheckTx_MsgCreateTransfer.Tx) {
								require.True(t, response.TxResults[i].IsErr())
							} else {
								require.True(t, response.TxResults[i].IsOK())
							}
						}
						return false
					},
				})
				return
			} else {
				// Advance to block 3.
				ctx = tApp.AdvanceToBlock(4, testapp.AdvanceToBlockOptions{})
			}

			// Verify expected sender subaccount balance.
			senderQuantumsAfterTransfer :=
				getSubaccountAssetQuantums(tApp.App.SubaccountsKeeper, ctx, tc.senderSubaccountId, tc.asset)
			require.Equal(
				t,
				new(big.Int).Sub(
					senderQuantumsBeforeTransfer,
					new(big.Int).SetUint64(tc.amount),
				),
				senderQuantumsAfterTransfer,
			)
			// Verify expected recipient subaccount balance.
			recipientQuantumsAfterTransfer :=
				getSubaccountAssetQuantums(tApp.App.SubaccountsKeeper, ctx, tc.recipientSubaccountId, tc.asset)
			require.Equal(
				t,
				new(big.Int).Add(
					recipientQuantumsBeforeTransfer,
					new(big.Int).SetUint64(tc.amount),
				),
				recipientQuantumsAfterTransfer,
			)
			// Verify that there are no offchain messages.
			require.Empty(t, msgSender.GetOffchainMessages())
			// Verify expected indexer events.
			expectedOnchainMessages := []msgsender.Message{indexer_manager.CreateIndexerBlockEventMessage(
				&indexer_manager.IndexerTendermintBlock{
					Height: 4,
					Time:   ctx.BlockTime(),
					Events: []*indexer_manager.IndexerTendermintEvent{
						{
							Subtype:             indexerevents.SubtypeSubaccountUpdate,
							OrderingWithinBlock: &indexer_manager.IndexerTendermintEvent_TransactionIndex{},
							EventIndex:          0,
							Version:             indexerevents.SubaccountUpdateEventVersion,
							DataBytes: indexer_manager.GetBytes(
								indexerevents.NewSubaccountUpdateEvent(
									&tc.senderSubaccountId,
									[]*satypes.PerpetualPosition{},
									[]*satypes.AssetPosition{
										{
											AssetId:  tc.asset.Id,
											Quantums: dtypes.NewIntFromBigInt(senderQuantumsAfterTransfer),
										},
									},
									nil, // no funding payment should have occurred
									constants.AssetYieldIndex_Zero,
								),
							),
						},
						{
							Subtype:             indexerevents.SubtypeSubaccountUpdate,
							OrderingWithinBlock: &indexer_manager.IndexerTendermintEvent_TransactionIndex{},
							EventIndex:          1,
							Version:             indexerevents.SubaccountUpdateEventVersion,
							DataBytes: indexer_manager.GetBytes(
								indexerevents.NewSubaccountUpdateEvent(
									&tc.recipientSubaccountId,
									[]*satypes.PerpetualPosition{},
									[]*satypes.AssetPosition{
										{
											AssetId:  tc.asset.Id,
											Quantums: dtypes.NewIntFromBigInt(recipientQuantumsAfterTransfer),
										},
									},
									nil, // no funding payment should have occurred
									constants.AssetYieldIndex_Zero,
								),
							),
						},
						{
							Subtype:             indexerevents.SubtypeTransfer,
							OrderingWithinBlock: &indexer_manager.IndexerTendermintEvent_TransactionIndex{},
							EventIndex:          2,
							Version:             indexerevents.TransferEventVersion,
							DataBytes: indexer_manager.GetBytes(
								indexerevents.NewTransferEvent(
									tc.senderSubaccountId,
									tc.recipientSubaccountId,
									tc.asset.Id,
									satypes.BaseQuantums(tc.amount),
								),
							),
						},
					},
					TxHashes: []string{string(lib.GetTxHash(CheckTx_MsgCreateTransfer.GetTx()))},
				},
			)}
			require.ElementsMatch(t, expectedOnchainMessages, msgSender.GetOnchainMessages())
		})
	}
}

func TestMsgDepositToSubaccount(t *testing.T) {
	tests := map[string]struct {
		// Account address.
		accountAccAddress sdktypes.AccAddress

		// Subaccount ID.
		subaccountId satypes.SubaccountId

		// Quantums to transfer.
		quantums *big.Int

		// Asset to transfer.
		asset assetstypes.Asset

		/* Expectations */
		// A string that CheckTx response should contain, if any.
		checkTxResponseContains string

		// Whether CheckTx errors.
		checkTxIsError bool

		deliverTxFails bool
	}{
		"Deposit from Alice account to Alice subaccount": {
			accountAccAddress: constants.AliceAccAddress,
			subaccountId:      constants.Alice_Num0,
			quantums:          big.NewInt(500_000_000),
			asset:             *constants.TDai,
		},
		"Deposit from Bob account to Carl subaccount": {
			accountAccAddress: constants.BobAccAddress,
			subaccountId:      constants.Carl_Num0,
			quantums:          big.NewInt(7_000_000),
			asset:             *constants.TDai,
		},
		// Deposit to a non-existent subaccount will create that subaccount and succeed.
		"Deposit from Bob account to non-existent subaccount": {
			accountAccAddress: constants.BobAccAddress,
			subaccountId: satypes.SubaccountId{
				Owner:  constants.BobAccAddress.String(),
				Number: 104,
			},
			quantums: big.NewInt(7_000_000),
			asset:    *constants.TDai,
		},
		"Deposit a non-TDai asset": {
			accountAccAddress: constants.CarlAccAddress,
			subaccountId:      constants.Carl_BTC,
			quantums:          big.NewInt(7_000_000),
			asset:             *constants.BtcUsd, // non-TDai asset
		},
		"Deposit a non-TDai asset and fail because of multi-collateral constraints": {
			accountAccAddress: constants.CarlAccAddress,
			subaccountId:      constants.Carl_BTC,
			quantums:          big.NewInt(7_000_000),
			asset:             *constants.BtcUsd, // non-TDai asset
			deliverTxFails:    true,
		},
		"Deposit zero amount": {
			accountAccAddress:       constants.AliceAccAddress,
			subaccountId:            constants.Carl_Num0,
			quantums:                big.NewInt(0), // 0 quantums
			asset:                   *constants.TDai,
			checkTxResponseContains: "Invalid transfer amount",
			checkTxIsError:          true,
		},
	}

	for name, tc := range tests {
		t.Run(name, func(t *testing.T) {
			// Set up tApp.
			msgSender := msgsender.NewIndexerMessageSenderInMemoryCollector()
			appOpts := map[string]interface{}{
				indexer.MsgSenderInstanceForTest: msgSender,
			}
			tApp := testapp.NewTestAppBuilder(t).WithAppOptions(appOpts).WithGenesisDocFn(func() (genesis types.GenesisDoc) {
				genesis = testapp.DefaultGenesis()
				return genesis
			}).WithNonDeterminismChecksEnabled(false).Build()

			rateString := sdaiservertypes.TestSDAIEventRequest.ConversionRate
			rate, conversionErr := ratelimitkeeper.ConvertStringToBigInt(rateString)

			require.NoError(t, conversionErr)

			tApp.App.RatelimitKeeper.SetSDAIPrice(tApp.App.NewUncachedContext(false, tmproto.Header{}), rate)
			tApp.App.RatelimitKeeper.SetAssetYieldIndex(tApp.App.NewUncachedContext(false, tmproto.Header{}), big.NewRat(1, 1))

			ctx := tApp.AdvanceToBlock(2, testapp.AdvanceToBlockOptions{})

			// Clear any messages produced prior to CheckTx calls.
			msgSender.Clear()

			accountBalanceBeforeDeposit := tApp.App.BankKeeper.GetBalance(ctx, tc.accountAccAddress, tc.asset.Denom)
			subaccountQuantumsBeforeDeposit :=
				getSubaccountAssetQuantums(tApp.App.SubaccountsKeeper, ctx, tc.subaccountId, tc.asset)
			_, transferredCoin, _ := tApp.App.AssetsKeeper.ConvertAssetToCoin(ctx, tc.asset.Id, tc.quantums)

			// Construct message.
			msgDepositToSubaccount := sendingtypes.MsgDepositToSubaccount{
				Sender:    tc.accountAccAddress.String(),
				Recipient: tc.subaccountId,
				AssetId:   tc.asset.Id,
				Quantums:  tc.quantums.Uint64(),
			}

			// Invoke CheckTx.
			CheckTx_MsgDepositToSubaccount := testapp.MustMakeCheckTx(
				ctx,
				tApp.App,
				testapp.MustMakeCheckTxOptions{
					AccAddressForSigning: msgDepositToSubaccount.Sender,
					Gas:                  1_000_000,
					FeeAmt:               constants.TestFeeCoins_5Cents,
				},
				&msgDepositToSubaccount,
			)
			checkTxResp := tApp.CheckTx(CheckTx_MsgDepositToSubaccount)

			// Check that CheckTx response log contains expected string, if any.
			if tc.checkTxResponseContains != "" {
				require.Contains(t, checkTxResp.Log, tc.checkTxResponseContains)
			}
			// Check that CheckTx succeeds or errors out as expected.
			if tc.checkTxIsError {
				require.Conditionf(t, checkTxResp.IsErr, "Expected CheckTx to error. Response: %+v", checkTxResp)
				return
			}
			require.Conditionf(t, checkTxResp.IsOK, "Expected CheckTx to succeed. Response: %+v", checkTxResp)

			// Check that no indexer events are emitted so far.
			require.Empty(t, msgSender.GetOnchainMessages())
			// Advance to block 3 for transactions to be delivered.

			// Advance to block 3 for transactions to be delivered.
			if tc.deliverTxFails {
				// Check that DeliverTx fails on MsgCreateTransfer.
				tApp.AdvanceToBlock(3, testapp.AdvanceToBlockOptions{
					ValidateFinalizeBlock: func(
						context sdktypes.Context,
						request abcitypes.RequestFinalizeBlock,
						response abcitypes.ResponseFinalizeBlock,
					) (haltChain bool) {
						for i, tx := range request.Txs {
							if i == 0 {
								// tx is empty extInfoBz
								continue
							}
							if bytes.Equal(tx, CheckTx_MsgDepositToSubaccount.Tx) {
								require.True(t, response.TxResults[i].IsErr())
							} else {
								require.True(t, response.TxResults[i].IsOK())
							}
						}
						return false
					},
				})
				return
			} else {
				// Advance to block 3.
				ctx = tApp.AdvanceToBlock(3, testapp.AdvanceToBlockOptions{})
			}

			// Check expected account balance.
			accountBalanceAfterDeposit := tApp.App.BankKeeper.GetBalance(ctx, tc.accountAccAddress, tc.asset.Denom)
			if tc.asset.Id == assetstypes.AssetTDai.Id {
				require.Equal(
					t,
					accountBalanceBeforeDeposit.Sub(transferredCoin).Sub(constants.TestFeeCoins_5Cents[0]),
					accountBalanceAfterDeposit,
				)
			} else {
				require.Equal(t, accountBalanceBeforeDeposit.Sub(transferredCoin), accountBalanceAfterDeposit)
			}
			// Check expected subaccount asset position.
			subaccountQuantumsAfterDeposit :=
				getSubaccountAssetQuantums(tApp.App.SubaccountsKeeper, ctx, tc.subaccountId, tc.asset)
			require.Equal(t,
				subaccountQuantumsAfterDeposit,
				subaccountQuantumsBeforeDeposit.Add(subaccountQuantumsBeforeDeposit, tc.quantums),
			)
			// Check that there are no offchain messages.
			require.Empty(t, msgSender.GetOffchainMessages())
			// Check for expected indexer events.
			expectedOnchainMessages := []msgsender.Message{indexer_manager.CreateIndexerBlockEventMessage(
				&indexer_manager.IndexerTendermintBlock{
					Height: 3,
					Time:   ctx.BlockTime(),
					Events: []*indexer_manager.IndexerTendermintEvent{
						{
							Subtype:             indexerevents.SubtypeSubaccountUpdate,
							OrderingWithinBlock: &indexer_manager.IndexerTendermintEvent_TransactionIndex{},
							EventIndex:          0,
							Version:             indexerevents.SubaccountUpdateEventVersion,
							DataBytes: indexer_manager.GetBytes(
								indexerevents.NewSubaccountUpdateEvent(
									&tc.subaccountId,
									[]*satypes.PerpetualPosition{},
									[]*satypes.AssetPosition{
										{
											AssetId:  tc.asset.Id,
											Quantums: dtypes.NewIntFromBigInt(subaccountQuantumsAfterDeposit),
										},
									},
									nil, // no funding payment should have occurred
									constants.AssetYieldIndex_Zero,
								),
							),
						},
						{
							Subtype:             indexerevents.SubtypeTransfer,
							OrderingWithinBlock: &indexer_manager.IndexerTendermintEvent_TransactionIndex{},
							EventIndex:          1,
							Version:             indexerevents.TransferEventVersion,
							DataBytes: indexer_manager.GetBytes(
								indexerevents.NewDepositEvent(
									tc.accountAccAddress.String(),
									tc.subaccountId,
									tc.asset.Id,
									satypes.BaseQuantums(tc.quantums.Uint64()),
								),
							),
						},
					},
					TxHashes: []string{string(lib.GetTxHash(CheckTx_MsgDepositToSubaccount.GetTx()))},
				},
			)}
			require.ElementsMatch(t, expectedOnchainMessages, msgSender.GetOnchainMessages())
		})
	}
}

func TestMsgDepositToSubaccount_NonExistentAccount(t *testing.T) {
	// Setup tApp.
	tApp := testapp.NewTestAppBuilder(t).Build()
	ctx := tApp.AdvanceToBlock(2, testapp.AdvanceToBlockOptions{})
	// Generate a random account.
	randomAccount := simtypes.RandomAccounts(rand.NewRand(), 1)[0]

	// Construct message with non-existent account.
	msgDepositToSubaccount := sendingtypes.MsgDepositToSubaccount{
		Sender:    randomAccount.Address.String(),
		Recipient: constants.Alice_Num1,
		AssetId:   assetstypes.AssetTDai.Id,
		Quantums:  uint64(1_000_000),
	}

	testNonExistentSender(t, tApp, ctx, &msgDepositToSubaccount, randomAccount.PrivKey)
}

func TestMsgWithdrawFromSubaccount(t *testing.T) {
	tests := map[string]struct {
		// Account address.
		accountAccAddress sdktypes.AccAddress

		// Subaccount ID.
		subaccountId satypes.SubaccountId

		// Quantums to transfer.
		quantums *big.Int

		// Asset to transfer.
		asset assetstypes.Asset

		/* Expectations */
		// A string that CheckTx response should contain, if any.
		checkTxResponseContains string

		// Whether CheckTx errors.
		checkTxIsError bool

		// Whether DeliverTx fails.
		deliverTxFails bool
	}{
		"Withdraw from Alice subaccount to Alice account": {
			accountAccAddress: constants.AliceAccAddress,
			subaccountId:      constants.Alice_Num0,
			quantums:          big.NewInt(500_000_000),
			asset:             *constants.TDai,
		},
		"Withdraw from Bob subaccount to Alice account": {
			accountAccAddress: constants.AliceAccAddress,
			subaccountId:      constants.Bob_Num0,
			quantums:          big.NewInt(7_000_000),
			asset:             *constants.TDai,
		},
		// Withdrawing to a non-existent account will create that account and succeed.
		"Withdraw from Bob subaccount to non-existent account": {
			accountAccAddress: sdktypes.MustAccAddressFromBech32(sample_testutil.AccAddress()), // a newly generated account
			subaccountId:      constants.Bob_Num0,
			quantums:          big.NewInt(7_000_000),
			asset:             *constants.TDai,
		},
		"Withdraw a non-TDai asset": {
			accountAccAddress: constants.AliceAccAddress,
			subaccountId:      constants.Carl_BTC,
			quantums:          big.NewInt(7_000_000),
			asset:             *constants.BtcUsd, // non-TDai asset
		},
		"Withdraw a non-TDai asset and multi collateral not supported": {
			accountAccAddress: constants.AliceAccAddress,
			subaccountId:      constants.Carl_BTC,
			quantums:          big.NewInt(7_000_000),
			asset:             *constants.BtcUsd, // non-TDai asset
			deliverTxFails:    true,
		},
		"Withdraw zero amount": {
			accountAccAddress:       constants.AliceAccAddress,
			subaccountId:            constants.Carl_Num0,
			quantums:                big.NewInt(0), // 0 quantums
			asset:                   *constants.TDai,
			checkTxResponseContains: "Invalid transfer amount",
			checkTxIsError:          true,
		},
	}

	for name, tc := range tests {
		t.Run(name, func(t *testing.T) {

			// Set up tApp.
			msgSender := msgsender.NewIndexerMessageSenderInMemoryCollector()
			appOpts := map[string]interface{}{
				indexer.MsgSenderInstanceForTest: msgSender,
			}

			tApp := testapp.NewTestAppBuilder(t).WithAppOptions(appOpts).WithGenesisDocFn(func() (genesis types.GenesisDoc) {
				genesis = testapp.DefaultGenesis()
				return genesis
			}).Build()

			rateString := sdaiservertypes.TestSDAIEventRequest.ConversionRate
			rate, conversionErr := ratelimitkeeper.ConvertStringToBigInt(rateString)

			require.NoError(t, conversionErr)

			tApp.App.RatelimitKeeper.SetSDAIPrice(tApp.App.NewUncachedContext(false, tmproto.Header{}), rate)
			tApp.App.RatelimitKeeper.SetAssetYieldIndex(tApp.App.NewUncachedContext(false, tmproto.Header{}), big.NewRat(1, 1))

			tApp.CrashingApp.RatelimitKeeper.SetSDAIPrice(tApp.CrashingApp.NewUncachedContext(false, tmproto.Header{}), rate)
			tApp.CrashingApp.RatelimitKeeper.SetAssetYieldIndex(tApp.CrashingApp.NewUncachedContext(false, tmproto.Header{}), big.NewRat(1, 1))

			tApp.NoCheckTxApp.RatelimitKeeper.SetSDAIPrice(tApp.NoCheckTxApp.NewUncachedContext(false, tmproto.Header{}), rate)
			tApp.NoCheckTxApp.RatelimitKeeper.SetAssetYieldIndex(tApp.NoCheckTxApp.NewUncachedContext(false, tmproto.Header{}), big.NewRat(1, 1))

			tApp.ParallelApp.RatelimitKeeper.SetSDAIPrice(tApp.ParallelApp.NewUncachedContext(false, tmproto.Header{}), rate)
			tApp.ParallelApp.RatelimitKeeper.SetAssetYieldIndex(tApp.ParallelApp.NewUncachedContext(false, tmproto.Header{}), big.NewRat(1, 1))
			_ = tApp.AdvanceToBlock(2, testapp.AdvanceToBlockOptions{})

			ctx := tApp.AdvanceToBlock(3, testapp.AdvanceToBlockOptions{})

			// Clear any messages produced prior to CheckTx calls.
			msgSender.Clear()

			accountBalanceBeforeWithdraw := tApp.App.BankKeeper.GetBalance(ctx, tc.accountAccAddress, tc.asset.Denom)
			subaccountQuantumsBeforeWithdraw :=
				getSubaccountAssetQuantums(tApp.App.SubaccountsKeeper, ctx, tc.subaccountId, tc.asset)
			_, transferredCoin, _ := tApp.App.AssetsKeeper.ConvertAssetToCoin(ctx, tc.asset.Id, tc.quantums)

			// Construct message.
			msgWithdrawFromSubaccount := sendingtypes.MsgWithdrawFromSubaccount{
				Sender:    tc.subaccountId,
				Recipient: tc.accountAccAddress.String(),
				AssetId:   tc.asset.Id,
				Quantums:  tc.quantums.Uint64(),
			}

			// Invoke CheckTx.
			CheckTx_MsgWithdrawFromSubaccount := testapp.MustMakeCheckTx(
				ctx,
				tApp.App,
				testapp.MustMakeCheckTxOptions{
					AccAddressForSigning: msgWithdrawFromSubaccount.Sender.Owner,
					Gas:                  constants.TestGasLimit,
					FeeAmt:               constants.TestFeeCoins_5Cents,
				},
				&msgWithdrawFromSubaccount,
			)
			checkTxResp := tApp.CheckTx(CheckTx_MsgWithdrawFromSubaccount)

			// Check that CheckTx response log contains expected string, if any.
			if tc.checkTxResponseContains != "" {
				require.Contains(t, checkTxResp.Log, tc.checkTxResponseContains)
			}
			// Check that CheckTx succeeds or errors out as expected.
			if tc.checkTxIsError {
				require.Conditionf(t, checkTxResp.IsErr, "Expected CheckTx to error. Response: %+v", checkTxResp)
				return
			}
			require.Conditionf(t, checkTxResp.IsOK, "Expected CheckTx to succeed. Response: %+v", checkTxResp)

			// Check that no indexer events are emitted so far.
			require.Empty(t, msgSender.GetOnchainMessages())

			// Advance to block 3 for transactions to be delivered.
			if tc.deliverTxFails {
				// Check that DeliverTx fails on MsgCreateTransfer.
				tApp.AdvanceToBlock(4, testapp.AdvanceToBlockOptions{
					ValidateFinalizeBlock: func(
						context sdktypes.Context,
						request abcitypes.RequestFinalizeBlock,
						response abcitypes.ResponseFinalizeBlock,
					) (haltChain bool) {
						for i, tx := range request.Txs {
							if i == 0 {
								// tx is empty extInfoBz
								continue
							}
							if bytes.Equal(tx, CheckTx_MsgWithdrawFromSubaccount.Tx) {
								require.True(t, response.TxResults[i].IsErr())
							} else {
								require.True(t, response.TxResults[i].IsOK())
							}
						}
						return false
					},
				})
				return
			} else {
				// Advance to block 3.
				ctx = tApp.AdvanceToBlock(4, testapp.AdvanceToBlockOptions{})
			}

			// Check expected account balance.
			accountBalanceAfterWithdraw := tApp.App.BankKeeper.GetBalance(ctx, tc.accountAccAddress, tc.asset.Denom)
			if tc.subaccountId.Owner == tc.accountAccAddress.String() {
				accountBalanceAfterWithdraw = accountBalanceAfterWithdraw.Add(constants.TestFeeCoins_5Cents[0])
			}
			require.Equal(t, accountBalanceAfterWithdraw, accountBalanceBeforeWithdraw.Add(transferredCoin))
			// Check expected subaccount asset position.
			subaccountQuantumsAfterWithdraw :=
				getSubaccountAssetQuantums(tApp.App.SubaccountsKeeper, ctx, tc.subaccountId, tc.asset)
			require.Equal(t,
				subaccountQuantumsAfterWithdraw,
				subaccountQuantumsBeforeWithdraw.Sub(subaccountQuantumsBeforeWithdraw, tc.quantums),
			)

			// Check that there are no offchain messages.
			require.Empty(t, msgSender.GetOffchainMessages())
			// Check for expected indexer events.
			expectedOnchainMessages := []msgsender.Message{indexer_manager.CreateIndexerBlockEventMessage(
				&indexer_manager.IndexerTendermintBlock{
					Height: 4,
					Time:   ctx.BlockTime(),
					Events: []*indexer_manager.IndexerTendermintEvent{
						{
							Subtype:             indexerevents.SubtypeSubaccountUpdate,
							OrderingWithinBlock: &indexer_manager.IndexerTendermintEvent_TransactionIndex{},
							EventIndex:          0,
							Version:             indexerevents.SubaccountUpdateEventVersion,
							DataBytes: indexer_manager.GetBytes(
								indexerevents.NewSubaccountUpdateEvent(
									&tc.subaccountId,
									[]*satypes.PerpetualPosition{},
									[]*satypes.AssetPosition{
										{
											AssetId:  tc.asset.Id,
											Quantums: dtypes.NewIntFromBigInt(subaccountQuantumsAfterWithdraw),
										},
									},
									nil, // no funding payment should have occurred
									constants.AssetYieldIndex_Zero,
								),
							),
						},
						{
							Subtype:             indexerevents.SubtypeTransfer,
							OrderingWithinBlock: &indexer_manager.IndexerTendermintEvent_TransactionIndex{},
							EventIndex:          1,
							Version:             indexerevents.TransferEventVersion,
							DataBytes: indexer_manager.GetBytes(
								indexerevents.NewWithdrawEvent(
									tc.subaccountId,
									tc.accountAccAddress.String(),
									tc.asset.Id,
									satypes.BaseQuantums(tc.quantums.Uint64()),
								),
							),
						},
					},
					TxHashes: []string{string(lib.GetTxHash(CheckTx_MsgWithdrawFromSubaccount.GetTx()))},
				},
			)}
			require.ElementsMatch(t, expectedOnchainMessages, msgSender.GetOnchainMessages())
		})
	}
}

func TestMsgWithdrawFromSubaccount_NonExistentSubaccount(t *testing.T) {
	// Setup tApp.
	tApp := testapp.NewTestAppBuilder(t).Build()
	ctx := tApp.AdvanceToBlock(2, testapp.AdvanceToBlockOptions{})
	// Generate a random account.
	randomAccount := simtypes.RandomAccounts(rand.NewRand(), 1)[0]

	// Construct message with non-existent subaccount.
	msgWithdrawFromSubaccount := sendingtypes.MsgWithdrawFromSubaccount{
		Sender: satypes.SubaccountId{
			Owner:  randomAccount.Address.String(),
			Number: 0,
		},
		Recipient: constants.AliceAccAddress.String(),
		AssetId:   assetstypes.AssetTDai.Id,
		Quantums:  uint64(1_000_000),
	}

	testNonExistentSender(t, tApp, ctx, &msgWithdrawFromSubaccount, randomAccount.PrivKey)
}

// testNonExistentSender is a helper function that tests sending transfer messages with non-existent sender.
func testNonExistentSender(
	t *testing.T,
	tApp *testapp.TestApp,
	ctx sdktypes.Context,
	message sdktypes.Msg,
	privKey cryptotypes.PrivKey,
) {
	// Generate signed transaction.
	signedTx, err := sims.GenSignedMockTx(
		rand.NewRand(),
		tApp.App.TxConfig(),
		[]sdktypes.Msg{message},
		constants.TestFeeCoins_5Cents,
		100_000, // gas
		ctx.ChainID(),
		[]uint64{0}, // dummy account number
		[]uint64{1}, // dummy sequence number
		privKey,
	)
	require.NoError(t, err)
	// Encode signed transaction.
	bytes, err := tApp.App.TxConfig().TxEncoder()(signedTx)
	require.NoError(t, err)
	// Invoke CheckTx.
	checkTxResp := tApp.CheckTx(
		abcitypes.RequestCheckTx{
			Tx:   bytes,
			Type: abcitypes.CheckTxType_New,
		},
	)

	// Check that CheckTx failed due to unknown address.
	require.Conditionf(t, checkTxResp.IsErr, "Expected CheckTx to error. Response: %+v", checkTxResp)
	require.Contains(t, checkTxResp.Log, "unknown address")
}

// getSubaccountAssetQuantums returns the quantums of an asset that belongs to a subaccount.
func getSubaccountAssetQuantums(
	subaccountsKeeper satypes.SubaccountsKeeper,
	ctx sdktypes.Context,
	subaccountId satypes.SubaccountId,
	asset assetstypes.Asset,
) *big.Int {
	subaccount := subaccountsKeeper.GetSubaccount(ctx, subaccountId)
	for _, assetPosition := range subaccount.GetAssetPositions() {
		if assetPosition.AssetId == asset.Id {
			return assetPosition.Quantums.BigInt()
		}
	}
	return big.NewInt(0) // by default, subaccount has 0 of this `asset`.
}

func TestWithdrawalGating_ChainOutage(t *testing.T) {
	tests := map[string]struct {
		// State.
		subaccount satypes.Subaccount

		// Parameters.
		secondsBetweenBlocks uint32

		// Configuration.
		isWithdrawal bool

		// Expectations.
		expectedWithdrawalsGated bool
	}{
		`5 minutes passes between blocks and withdrawals are gated after the chain restarts`: {
			subaccount: constants.Dave_Num1_10_000USD,

			secondsBetweenBlocks: 60 * 5,

			isWithdrawal: true,

			expectedWithdrawalsGated: true,
		},
		`30 minutes passes between blocks and transfers are gated after the chain restarts`: {
			subaccount: constants.Dave_Num1_10_000USD,

			secondsBetweenBlocks: 60 * 30,

			isWithdrawal: false,

			expectedWithdrawalsGated: true,
		},
		`Under 5 minutes passes between blocks and withdrawals are not gated after the chain restarts`: {
			subaccount: constants.Dave_Num1_10_000USD,

			secondsBetweenBlocks: 299,

			isWithdrawal: true,

			expectedWithdrawalsGated: false,
		},
		`Under 5 minutes passes between blocks and transfers are not gated after the chain restarts`: {
			subaccount: constants.Dave_Num1_10_000USD,

			secondsBetweenBlocks: 299,

			isWithdrawal: false,

			expectedWithdrawalsGated: false,
		},
	}

	for name, tc := range tests {
		t.Run(name, func(t *testing.T) {
			tApp := testapp.NewTestAppBuilder(t).WithGenesisDocFn(func() (genesis types.GenesisDoc) {
				genesis = testapp.DefaultGenesis()
				testapp.UpdateGenesisDocWithAppStateForModule(
					&genesis,
					func(genesisState *assetstypes.GenesisState) {
						genesisState.Assets = []assetstypes.Asset{
							*constants.TDai,
						}
					},
				)
				testapp.UpdateGenesisDocWithAppStateForModule(
					&genesis,
					func(genesisState *prices.GenesisState) {
						// Set oracle prices in the genesis.
						pricesGenesis := constants.TestPricesGenesisState
						*genesisState = pricesGenesis
					},
				)
				testapp.UpdateGenesisDocWithAppStateForModule(
					&genesis,
					func(genesisState *perptypes.GenesisState) {
						genesisState.Params = constants.PerpetualsGenesisParams
						genesisState.LiquidityTiers = constants.LiquidityTiers
					},
				)
				testapp.UpdateGenesisDocWithAppStateForModule(
					&genesis,
					func(genesisState *satypes.GenesisState) {
						genesisState.Subaccounts = []satypes.Subaccount{tc.subaccount}
					},
				)
				return genesis
			}).Build()

			rateString := sdaiservertypes.TestSDAIEventRequest.ConversionRate
			rate, conversionErr := ratelimitkeeper.ConvertStringToBigInt(rateString)

			require.NoError(t, conversionErr)

			tApp.App.RatelimitKeeper.SetSDAIPrice(tApp.App.NewUncachedContext(false, tmproto.Header{}), rate)
			tApp.App.RatelimitKeeper.SetAssetYieldIndex(tApp.App.NewUncachedContext(false, tmproto.Header{}), big.NewRat(1, 1))

			tApp.CrashingApp.RatelimitKeeper.SetSDAIPrice(tApp.CrashingApp.NewUncachedContext(false, tmproto.Header{}), rate)
			tApp.CrashingApp.RatelimitKeeper.SetAssetYieldIndex(tApp.CrashingApp.NewUncachedContext(false, tmproto.Header{}), big.NewRat(1, 1))

			tApp.NoCheckTxApp.RatelimitKeeper.SetSDAIPrice(tApp.NoCheckTxApp.NewUncachedContext(false, tmproto.Header{}), rate)
			tApp.NoCheckTxApp.RatelimitKeeper.SetAssetYieldIndex(tApp.NoCheckTxApp.NewUncachedContext(false, tmproto.Header{}), big.NewRat(1, 1))

			tApp.ParallelApp.RatelimitKeeper.SetSDAIPrice(tApp.ParallelApp.NewUncachedContext(false, tmproto.Header{}), rate)
			tApp.ParallelApp.RatelimitKeeper.SetAssetYieldIndex(tApp.ParallelApp.NewUncachedContext(false, tmproto.Header{}), big.NewRat(1, 1))

			startTime := time.Unix(10, 0).UTC()
			_ = tApp.AdvanceToBlock(2, testapp.AdvanceToBlockOptions{
				BlockTime: startTime,
			})

			ctx := tApp.AdvanceToBlock(3, testapp.AdvanceToBlockOptions{
				BlockTime: startTime.Add((time.Duration(tc.secondsBetweenBlocks) * time.Second)),
			})

			// Verify withdrawals are blocked by trying to create a transfer message that withdraws funds.
			var msg proto.Message
			quantumsToTransferOrWithdraw := uint64(1)
			if tc.isWithdrawal {
				withdrawMsg := sendingtypes.MsgWithdrawFromSubaccount{
					Sender:    *tc.subaccount.Id,
					Recipient: tc.subaccount.Id.Owner,
					AssetId:   constants.TDai.Id,
					Quantums:  quantumsToTransferOrWithdraw,
				}
				msg = &withdrawMsg
			} else {
				transferMsg := sendingtypes.MsgCreateTransfer{
					Transfer: &sendingtypes.Transfer{
						Sender:    *tc.subaccount.Id,
						Recipient: constants.Bob_Num0,
						AssetId:   constants.TDai.Id,
						Amount:    quantumsToTransferOrWithdraw,
					},
				}
				msg = &transferMsg
			}

			for _, checkTx := range testapp.MustMakeCheckTxsWithSdkMsg(
				ctx,
				tApp.App,
				testapp.MustMakeCheckTxOptions{
					AccAddressForSigning: tc.subaccount.Id.Owner,
					Gas:                  1200000,
					FeeAmt:               constants.TestFeeCoins_5Cents,
				},
				msg,
			) {
				resp := tApp.CheckTx(checkTx)
				require.Conditionf(t, resp.IsOK, "Expected CheckTx to succeed. Response: %+v", resp)
			}

			// If transfers and withdrawals should not be gated, verify the withdrawal succeeds and
			// the subaccount balance is updated.
			if !tc.expectedWithdrawalsGated {
				ctx = tApp.AdvanceToBlock(4, testapp.AdvanceToBlockOptions{})
				foundSubaccount := tApp.App.SubaccountsKeeper.GetSubaccount(ctx, *tc.subaccount.Id)
				require.Equal(
					t,
					tc.subaccount.GetAssetPositions()[0].Quantums.BigInt().Uint64()-quantumsToTransferOrWithdraw,
					foundSubaccount.GetAssetPositions()[0].Quantums.BigInt().Uint64(),
				)

				return
			}

			// Transfers and withdrawals should be gated, therefore verify that the withdrawal fails and
			// the subaccount balance is unchanged.
			ctx = tApp.AdvanceToBlock(
				4,
				testapp.AdvanceToBlockOptions{
					ValidateFinalizeBlock: func(
						ctx sdktypes.Context,
						request abcitypes.RequestFinalizeBlock,
						response abcitypes.ResponseFinalizeBlock,
					) (haltchain bool) {
						// Note the first TX is ExtInfoBz and second is MsgProposedOperations, the second is all other TXs.
						execResult := response.TxResults[2]
						require.True(t, execResult.IsErr())
						require.Equal(t, satypes.ErrFailedToUpdateSubaccounts.ABCICode(), execResult.Code)
						require.Contains(t, execResult.Log, "WithdrawalsAndTransfersBlocked: failed to apply subaccount updates")
						return false
					},
				},
			)
			foundSubaccount := tApp.App.SubaccountsKeeper.GetSubaccount(ctx, *tc.subaccount.Id)
			require.Equal(
				t,
				tc.subaccount.GetAssetPositions()[0].Quantums,
				foundSubaccount.GetAssetPositions()[0].Quantums,
			)

			// Verify that transfers and withdrawals are unblocked after the withdrawal gating period passes.
			tApp.AdvanceToBlock(
				4+satypes.WITHDRAWAL_AND_TRANSFERS_BLOCKED_AFTER_NEGATIVE_TNC_SUBACCOUNT_SEEN_BLOCKS+1,
				testapp.AdvanceToBlockOptions{},
			)
			for _, checkTx := range testapp.MustMakeCheckTxsWithSdkMsg(
				ctx,
				tApp.App,
				testapp.MustMakeCheckTxOptions{
					AccAddressForSigning: tc.subaccount.Id.Owner,
					Gas:                  1200000,
					FeeAmt:               constants.TestFeeCoins_5Cents,
				},
				msg,
			) {
				resp := tApp.CheckTx(checkTx)
				require.Conditionf(t, resp.IsOK, "Expected CheckTx to succeed. Response: %+v", resp)
			}
			tApp.AdvanceToBlock(
				4+satypes.WITHDRAWAL_AND_TRANSFERS_BLOCKED_AFTER_NEGATIVE_TNC_SUBACCOUNT_SEEN_BLOCKS+2,
				testapp.AdvanceToBlockOptions{},
			)
		})
	}
}
