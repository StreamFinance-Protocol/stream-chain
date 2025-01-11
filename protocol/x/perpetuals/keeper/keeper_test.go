package keeper_test

import (
	"testing"

	"github.com/StreamFinance-Protocol/stream-chain/protocol/mocks"
	keepertest "github.com/StreamFinance-Protocol/stream-chain/protocol/testutil/keeper"
	"github.com/stretchr/testify/mock"
	"github.com/stretchr/testify/require"
)

func TestLogger(t *testing.T) {
	memClob := &mocks.MemClob{}
	memClob.On("SetClobKeeper", mock.Anything).Return()

	mockIndexerEventManager := &mocks.IndexerEventManager{}

	pc := keepertest.NewClobKeepersTestContext(t, memClob, &mocks.BankKeeper{}, mockIndexerEventManager, nil)
	logger := pc.PerpetualsKeeper.Logger(pc.Ctx)
	require.NotNil(t, logger)
}
