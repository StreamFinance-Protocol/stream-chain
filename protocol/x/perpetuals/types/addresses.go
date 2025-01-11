package types

import (
	authtypes "github.com/cosmos/cosmos-sdk/x/auth/types"
)

var (
	BaseCollateralPoolInsuranceFundModuleAddress = authtypes.NewModuleAddress(InsuranceFundName + ":0")
)
