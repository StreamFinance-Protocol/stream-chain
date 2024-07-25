package constants

import (
	sdk "github.com/cosmos/cosmos-sdk/types"
	"github.com/ethos-works/ethos/ethos-chain/x/ccv/consumer/types"
)

var (
	ValidEmptyExtInfoBytes        []byte = []byte{}
	ValidEmptyCrossChainValidator        = types.CrossChainValidator{}

	AliceCCValidator = types.CrossChainValidator{
		Address:  AliceConsAddress,
		Power:    1,
		Pubkey:   nil,
		OptedOut: false,
	}

	Val1 = sdk.ConsAddress("val1")
	Val2 = sdk.ConsAddress("val2")
	Val3 = sdk.ConsAddress("val3")

	// AliceConsAddress signing constants.ValidVEPrice prices
	ValidSingleVoteExtInfoBytes []byte = []byte{
		18, 58, 10, 24, 10, 20, 41, 86, 4, 85, 205, 252, 249, 80,
		75, 230, 197, 194, 223, 67, 40, 173, 42, 88, 250, 242, 24,
		1, 26, 28, 10, 7, 8, 2, 18, 3, 2, 27, 95, 10, 7, 8, 1, 18,
		3, 2, 234, 102, 10, 8, 8, 0, 18, 4, 2, 7, 161, 37, 40, 2,
	}
	// AliceConsAddress and BobConsAddress signing constants.ValidVEPrice prices

	ValidMutliVoteExtInfoBytes []byte = []byte{
		18, 58, 10, 24, 10, 20, 41, 86, 4, 85, 205, 252,
		249, 80, 75, 230, 197, 194, 223, 67, 40, 173, 42,
		88, 250, 242, 24, 1, 26, 28, 10, 7, 8, 2, 18, 3, 2,
		27, 95, 10, 7, 8, 1, 18, 3, 2, 234, 102, 10, 8, 8,
		0, 18, 4, 2, 7, 161, 37, 40, 2, 18, 58, 10, 24, 10,
		20, 122, 77, 232, 19, 68, 115, 105, 12, 204, 221, 201,
		90, 226, 45, 39, 145, 179, 104, 173, 72, 24, 1, 26,
		28, 10, 8, 8, 0, 18, 4, 2, 7, 161, 37, 10, 7, 8, 2,
		18, 3, 2, 27, 95, 10, 7, 8, 1, 18, 3, 2, 234, 102, 40, 2,
	}
	// return value of the following function call
	// (empty prices vote extension from 3 validators with 500 power and block hiehgt 3)
	// 	LocalLastCommit: vetestutil.GetEmptyLocalLastCommit(
	//				tApp.App.ConsumerKeeper.GetAllCCValidator(tApp.App.NewContextLegacy(true, tApp.header)),
	//					tApp.header.Height,
	//					0,
	//					"localdydxprotocol",
	//				),
	ValidMultiEmptyVoteExtInfoBytes []byte = []byte{
		0x12, 0x5f, 0xa, 0x19, 0xa, 0x14, 0xb4, 0x1c, 0x3a, 0x40, 0x14,
		0x29, 0x63, 0xaa, 0x5b, 0x12, 0xdd, 0xd1, 0xc4, 0xe5, 0x89, 0xc,
		0xb, 0x39, 0x26, 0xb1, 0x18, 0xf4, 0x3, 0x22, 0x40, 0x8, 0xae,
		0x34, 0x9c, 0xdc, 0xdd, 0xc6, 0x80, 0x79, 0xd7, 0x20, 0xe7, 0x14,
		0x90, 0x5e, 0xf4, 0x74, 0xfd, 0x1e, 0xcb, 0xba, 0xf9, 0x83, 0x10,
		0x81, 0xa0, 0xeb, 0xc7, 0x9d, 0x19, 0x55, 0x20, 0x2, 0xe7, 0x1c,
		0x51, 0x6f, 0x99, 0xdf, 0x8a, 0xde, 0x55, 0x38, 0xc3, 0x2b, 0x37,
		0xc4, 0xf5, 0x43, 0x4e, 0x38, 0xf2, 0xa8, 0xbf, 0xe4, 0x1b, 0x4d,
		0x28, 0x26, 0x9f, 0x30, 0x36, 0x6f, 0xa, 0x28, 0x2, 0x12, 0x5f, 0xa,
		0x19, 0xa, 0x14, 0xdf, 0x9, 0xa, 0x48, 0x80, 0xb5, 0x4c, 0xd5, 0x7b,
		0x2a, 0x79, 0xe6, 0x4d, 0x9e, 0x96, 0x9b, 0xd7, 0x51, 0x4b, 0x9, 0x18,
		0xf4, 0x3, 0x22, 0x40, 0x9, 0xde, 0xe9, 0xaa, 0x97, 0x86, 0xff, 0xa6,
		0xe3, 0x59, 0xa1, 0x35, 0xe0, 0x5f, 0xbd, 0x3d, 0xe8, 0x8e, 0xe2, 0x8b,
		0x57, 0xb5, 0xae, 0x58, 0x80, 0x66, 0x9f, 0x9c, 0xdb, 0xe9, 0x73, 0xa4,
		0xf3, 0x7d, 0x56, 0x95, 0xdb, 0xcf, 0xcc, 0xbb, 0x43, 0x73, 0x21, 0xb7,
		0x67, 0x1b, 0xdc, 0x3f, 0x4a, 0x75, 0xa8, 0x1f, 0x9e, 0x6a, 0xdf, 0xd8,
		0x3a, 0xc0, 0xb4, 0xdd, 0x61, 0x4c, 0xb, 0xa, 0x28, 0x2, 0x12, 0x5f, 0xa,
		0x19, 0xa, 0x14, 0xe7, 0x33, 0x88, 0xe2, 0x46, 0xec, 0x99, 0x45, 0xe5,
		0xe7, 0xa, 0x94, 0xfe, 0x40, 0x72, 0xbd, 0x93, 0x74, 0x15, 0xc4, 0x18,
		0xf4, 0x3, 0x22, 0x40, 0x24, 0x6e, 0xa, 0xf7, 0xd3, 0x52, 0x9d, 0x13,
		0xb1, 0x3b, 0x12, 0xe8, 0x1f, 0x20, 0xe8, 0x84, 0x2d, 0x0, 0x5b, 0xe6,
		0x9a, 0xf, 0x28, 0xd, 0x37, 0x3b, 0xdd, 0x93, 0x32, 0x9f, 0xa6, 0x69,
		0xea, 0xcd, 0x21, 0xd2, 0x1, 0xa2, 0x7e, 0x84, 0xad, 0x45, 0x62, 0xac,
		0x98, 0xec, 0xba, 0x2d, 0x28, 0xdc, 0x47, 0xeb, 0xee, 0x69, 0xb2, 0xfa,
		0xdc, 0x14, 0x58, 0xa9, 0xe4, 0x13, 0x9e, 0x8, 0x28, 0x2,
	}
)