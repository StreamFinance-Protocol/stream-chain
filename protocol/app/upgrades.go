package app

import (
	"github.com/StreamFinance-Protocol/stream-chain/protocol/app/upgrades"
	sdk "github.com/cosmos/cosmos-sdk/types"
)

var (
	// `Upgrades` defines the upgrade handlers and store loaders for the application.
	Upgrades = []upgrades.Upgrade{}
	Forks    = []upgrades.Fork{}
)

// setupUpgradeHandlers registers the upgrade handlers to perform custom upgrade
// logic and state migrations for software upgrades.
func (app *App) setupUpgradeHandlers() {}

// setUpgradeStoreLoaders sets custom store loaders to customize the rootMultiStore
// initialization for software upgrades.
func (app *App) setupUpgradeStoreLoaders() {}

func (app *App) scheduleForkUpgrade(ctx sdk.Context) {}
