package types

import authtypes "github.com/cosmos/cosmos-sdk/x/auth/types"

var (
	ModuleAddress              = authtypes.NewModuleAddress(ModuleName)
	CollateralPoolZeroAddress  = authtypes.NewModuleAddress(ModuleName + ":0")
	CollateralPoolOneAddress   = authtypes.NewModuleAddress(ModuleName + ":1")
	CollateralPoolTwoAddress   = authtypes.NewModuleAddress(ModuleName + ":2")
	CollateralPoolThreeAddress = authtypes.NewModuleAddress(ModuleName + ":3")
	CollateralPoolFourAddress  = authtypes.NewModuleAddress(ModuleName + ":4")

	LiquidityFeeModuleAddress = "liquidity_module"
)
