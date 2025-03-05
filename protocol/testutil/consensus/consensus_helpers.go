package consensus

import (
	"fmt"

	"github.com/cosmos/cosmos-sdk/codec"
	"github.com/cosmos/cosmos-sdk/testutil"
	"github.com/cosmos/cosmos-sdk/testutil/network"
	consensustypes "github.com/cosmos/cosmos-sdk/x/consensus/types"
)

func GetConsensusParams(
	val *network.Validator,
	codec codec.Codec,
) (
	params consensustypes.QueryParamsResponse,
	err error,
) {
	resp, err := testutil.GetRequest(fmt.Sprintf(
		"%s/cosmos/consensus/v1/params",
		val.APIAddress,
	))
	if err != nil {
		return consensustypes.QueryParamsResponse{}, err
	}

	var consResp consensustypes.QueryParamsResponse

	err = codec.UnmarshalJSON(resp, &consResp)
	if err != nil {
		return consensustypes.QueryParamsResponse{}, err
	}

	return consResp, nil
}
