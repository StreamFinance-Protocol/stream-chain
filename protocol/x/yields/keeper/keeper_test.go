package keeper_test

import (
	"math/big"
	"testing"

	testapp "github.com/StreamFinance-Protocol/stream-chain/protocol/testutil/app"
	"github.com/StreamFinance-Protocol/stream-chain/protocol/x/yields/keeper"
	"github.com/StreamFinance-Protocol/stream-chain/protocol/x/yields/types"
	"github.com/stretchr/testify/require"
)

const (
	testDenom    = "ibc/xxx"
	testDenom2   = "testdenom2"
	testAddress1 = "klyra16h7p7f4dysrgtzptxx2gtpt5d8t834g9jrj78f"
	testAddress2 = "klyra168pjt8rkru35239fsqvz7rzgeclakp49ahyj5s"
	testAddress3 = "klyra1fjg6zp6vv8t9wvy4lps03r5l4g7tkjw93awcky"
)

// Setting a valid sDAI price stores the correct byte representation in the KVStore
func TestSetGetSDAIPrice(t *testing.T) {
	tApp := testapp.NewTestAppBuilder(t).Build()
	ctx := tApp.InitChain()
	k := tApp.App.YieldsKeeper

	price := big.NewInt(123456789)

	k.SetSDAIPrice(ctx, price)
	gotPrice, found := k.GetSDAIPrice(ctx)
	require.True(t, found, "sDAI price not found in store")
	require.Equal(t, price, gotPrice, "retrieved sDAI price does not match the set value")
}

// we should test not setting and just getting the price and expect found to be false
func TestGetSDAIPrice_PriceNotSet(t *testing.T) {
	tApp := testapp.NewTestAppBuilder(t).Build()
	ctx := tApp.InitChain()
	k := tApp.App.YieldsKeeper

	price, found := k.GetSDAIPrice(ctx)
	require.Nil(t, price, "Expected price to be nil when not set")
	require.False(t, found, "Expected found to be false when price is not set")
}

func TestSetGetAssetYieldsIndex(t *testing.T) {
	tApp := testapp.NewTestAppBuilder(t).Build()
	ctx := tApp.InitChain()
	k := tApp.App.YieldsKeeper

	yieldsIndex := keeper.ConvertStringToBigRatWithPanicOnErr("1234/5678")

	k.SetAssetYieldsIndex(ctx, yieldsIndex)
	gotYieldsIndex, found := k.GetAssetYieldsIndex(ctx)
	require.True(t, found, "assetYieldsIndex not found in store")
	require.Equal(t, yieldsIndex, gotYieldsIndex, "assetYieldsIndex does not match the set value")
}

func TestGetAssetYieldsIndex_AssetYieldsIndexNotSet(t *testing.T) {
	tApp := testapp.NewTestAppBuilder(t).Build()
	ctx := tApp.InitChain()
	k := tApp.App.YieldsKeeper
	store := ctx.KVStore(k.GetStoreKeyForTestingOnly())
	store.Delete([]byte(types.AssetYieldsIndexPrefix))

	assetYieldsIndex, found := k.GetAssetYieldsIndex(ctx)
	require.Nil(t, assetYieldsIndex, "Expected assetYieldsIndex to be nil when not set")
	require.False(t, found, "Expected found to be false when assetYieldsIndex is not set")
}

func TestSetAndGetSDAILastBlockUpdated(t *testing.T) {
	tApp := testapp.NewTestAppBuilder(t).Build()
	ctx := tApp.InitChain()
	k := tApp.App.YieldsKeeper

	blockHeight := big.NewInt(123456789)

	k.SetSDAILastBlockUpdated(ctx, blockHeight)
	gotBlockHeight, found := k.GetSDAILastBlockUpdated(ctx)
	require.True(t, found, "sDAI last block updated not found in store")
	require.Equal(t, blockHeight, gotBlockHeight, "retrieved sDAI last block updated does not match the set value")
}
