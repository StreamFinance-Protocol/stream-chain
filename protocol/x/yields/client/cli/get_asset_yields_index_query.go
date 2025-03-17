package cli

import (
	"github.com/StreamFinance-Protocol/stream-chain/protocol/x/yields/types"
	"github.com/cosmos/cosmos-sdk/client"
	"github.com/cosmos/cosmos-sdk/client/flags"
	"github.com/spf13/cobra"
)

func CmdGetAssetYieldsIndexQuery() *cobra.Command {
	cmd := &cobra.Command{
		Use:   "get-asset-yields-index",
		Short: "Get the asset yields index for tDAI",
		Args:  cobra.ExactArgs(0),
		RunE: func(cmd *cobra.Command, args []string) error {
			clientCtx, err := client.GetClientQueryContext(cmd)
			if err != nil {
				return err
			}

			queryClient := types.NewQueryClient(clientCtx)

			res, err := queryClient.GetAssetYieldsIndexQuery(cmd.Context(), &types.GetAssetYieldsIndexQueryRequest{})
			if err != nil {
				return err
			}

			return clientCtx.PrintProto(res)
		},
	}

	flags.AddQueryFlagsToCmd(cmd)

	return cmd
}
