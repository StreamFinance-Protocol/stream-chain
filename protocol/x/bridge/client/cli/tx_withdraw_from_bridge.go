package cli

import (
	"github.com/StreamFinance-Protocol/stream-chain/protocol/x/bridge/types"
	"github.com/cosmos/cosmos-sdk/client"
	"github.com/cosmos/cosmos-sdk/client/flags"
	"github.com/cosmos/cosmos-sdk/client/tx"
	"github.com/spf13/cobra"
)

// CmdWithdraw initiates a withdraw from the bridge.
func CmdWithdraw() *cobra.Command {
	cmd := &cobra.Command{
		Use:   "withdraw owner eth-address sdai-quantums",
		Short: "Request a withdrawal from the bridge.",
		Long: `Request a withdrawal from the bridge.
		The owner must be a valid account address.
		The eth-address must be a valid Ethereum address.
		The sdai-quantums must be a valid amount of SDAI quantums to withdraw.`,
		Args: cobra.ExactArgs(3),
		RunE: func(cmd *cobra.Command, args []string) (err error) {
			argOwner := args[0]
			argEthAddress := args[1]
			argSdaiQuantums := args[2]

			msg := types.NewMsgBridgeWithdraw(types.BridgeWithdraw{
				Account:      argOwner,
				EthRecipient: argEthAddress,
				SdaiAmount:   argSdaiQuantums,
			})

			if err := msg.ValidateBasic(); err != nil {
				return err
			}

			clientCtx, err := client.GetClientTxContext(cmd)
			if err != nil {
				return err
			}

			return tx.GenerateOrBroadcastTxCLI(clientCtx, cmd.Flags(), msg)
		},
	}

	flags.AddTxFlagsToCmd(cmd)

	return cmd
}
