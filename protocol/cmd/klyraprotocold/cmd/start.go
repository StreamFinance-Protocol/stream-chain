package cmd

import (
	appflags "github.com/StreamFinance-Protocol/stream-chain/protocol/app/flags"
	daemonflags "github.com/StreamFinance-Protocol/stream-chain/protocol/daemons/flags"
	"github.com/StreamFinance-Protocol/stream-chain/protocol/indexer"
	"github.com/spf13/cobra"
)

// GetOptionWithCustomStartCmd returns a root command option with custom start commands.
func GetOptionWithCustomStartCmd() *RootCmdOption {
	option := newRootCmdOption()
	f := func(cmd *cobra.Command) {
		// Add app flags.
		appflags.AddFlagsToCmd(cmd)

		// Add daemon flags.
		daemonflags.AddDaemonFlagsToCmd(cmd)

		// Add indexer flags.
		indexer.AddIndexerFlagsToCmd(cmd)
	}
	option.setCustomizeStartCmd(f)
	return option
}
