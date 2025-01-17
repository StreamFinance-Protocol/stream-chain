package types

import (
	"log"
	"sync"

	"github.com/StreamFinance-Protocol/stream-chain/protocol/daemons/sdaioracle/api"

	store "github.com/StreamFinance-Protocol/stream-chain/protocol/daemons/sdaioracle/client/contract"
	"github.com/StreamFinance-Protocol/stream-chain/protocol/daemons/sdaioracle/client/types"
	"github.com/ethereum/go-ethereum/ethclient"
)

var (
	SDAIEventFetcher EventFetcher = &EthEventFetcher{}

	TestSDAIEventRequest = api.AddsDAIEventRequest{
		ConversionRate: "1006681181716810314385961731",
	}

	TestSDAIEventRequestNoYield = api.AddsDAIEventRequest{
		ConversionRate: "1000000000000000000000000000",
	}
)

type MockEventFetcher struct{}

func (m *MockEventFetcher) GetInitialEvent(empty bool) (api.AddsDAIEventRequest, error) {
	if empty {
		return api.AddsDAIEventRequest{}, nil
	}
	return TestSDAIEventRequest, nil
}

type MockEventFetcherNoYield struct{}

func (m *MockEventFetcherNoYield) GetInitialEvent(empty bool) (api.AddsDAIEventRequest, error) {
	if empty {
		return api.AddsDAIEventRequest{}, nil
	}
	return TestSDAIEventRequestNoYield, nil
}

type MockEventFetcherNoEvents struct{}

func (m *MockEventFetcherNoEvents) GetInitialEvent(empty bool) (api.AddsDAIEventRequest, error) {
	return api.AddsDAIEventRequest{}, nil
}

type EventFetcher interface {
	GetInitialEvent(empty bool) (api.AddsDAIEventRequest, error)
}

type EthEventFetcher struct{}

func (r *EthEventFetcher) GetInitialEvent(empty bool) (api.AddsDAIEventRequest, error) {
	if empty {
		return api.AddsDAIEventRequest{}, nil
	}

	ethClient, err := ethclient.Dial(types.ETHRPC)
	if err != nil {
		return api.AddsDAIEventRequest{}, err
	}

	rate, err := store.QueryDaiConversionRateWithRetries(ethClient, 3)
	if err != nil {
		return api.AddsDAIEventRequest{}, err
	}

	ethClient.Close()

	return api.AddsDAIEventRequest{ConversionRate: rate}, nil
}

// SDAIEventManager interface defines the methods for managing sDAI events
type SDAIEventManager interface {
	AddsDAIEvent(event *api.AddsDAIEventRequest) error
	GetSDaiPrice() api.AddsDAIEventRequest
}

// sDAIEventManagerImpl implements the SDAIEventManager interface
type sDAIEventManagerImpl struct {
	sync.Mutex
	price api.AddsDAIEventRequest
}

type sDAIEventManagerMockImpl struct {
	sync.Mutex
	price api.AddsDAIEventRequest
}

func (s *sDAIEventManagerMockImpl) AddsDAIEvent(event *api.AddsDAIEventRequest) error {
	return nil
}

func (s *sDAIEventManagerMockImpl) GetSDaiPrice() api.AddsDAIEventRequest {
	return TestSDAIEventRequest
}

type sDAIEventManagerMockNoYieldImpl struct {
	sync.Mutex
	price api.AddsDAIEventRequest
}

func (s *sDAIEventManagerMockNoYieldImpl) AddsDAIEvent(event *api.AddsDAIEventRequest) error {
	return nil
}

func (s *sDAIEventManagerMockNoYieldImpl) GetSDaiPrice() api.AddsDAIEventRequest {
	return TestSDAIEventRequestNoYield
}

// NewsDAIEventManager creates a new SDAIEventManager.
func NewsDAIEventManager(isEmpty ...bool) SDAIEventManager {
	empty := false
	if len(isEmpty) > 0 && isEmpty[0] {
		empty = true
	}

	event, err := SDAIEventFetcher.GetInitialEvent(empty)
	if err != nil {
		log.Fatalf("Failed to get initial events: %v", err)
	}
	return &sDAIEventManagerImpl{
		price: event,
	}
}

func NewsDAIMockEventManager(isEmpty ...bool) SDAIEventManager {
	empty := false
	if len(isEmpty) > 0 && isEmpty[0] {
		empty = true
	}

	event, err := SDAIEventFetcher.GetInitialEvent(empty)
	if err != nil {
		log.Fatalf("Failed to get initial events: %v", err)
	}
	return &sDAIEventManagerMockImpl{
		price: event,
	}
}

func NewsDAIMockNoYieldEventManager(isEmpty ...bool) SDAIEventManager {
	empty := false
	if len(isEmpty) > 0 && isEmpty[0] {
		empty = true
	}

	event, err := SDAIEventFetcher.GetInitialEvent(empty)
	if err != nil {
		log.Fatalf("Failed to get initial events: %v", err)
	}
	return &sDAIEventManagerMockNoYieldImpl{
		price: event,
	}
}

func (s *sDAIEventManagerImpl) AddsDAIEvent(event *api.AddsDAIEventRequest) error {
	s.Lock()
	defer s.Unlock()

	s.price = *event
	return nil
}

func (s *sDAIEventManagerImpl) GetSDaiPrice() api.AddsDAIEventRequest {
	s.Lock()
	defer s.Unlock()

	return s.price
}

func SetupMockEventManager(isEmpty ...bool) SDAIEventManager {
	SDAIEventFetcher = &MockEventFetcher{}

	if len(isEmpty) > 0 && isEmpty[0] {
		return NewsDAIEventManager(true)
	}
	return NewsDAIEventManager()
}

func SetupMockFixedYieldEventManager(isEmpty ...bool) SDAIEventManager {
	SDAIEventFetcher = &MockEventFetcher{}

	if len(isEmpty) > 0 && isEmpty[0] {
		return NewsDAIMockEventManager(true)
	}
	return NewsDAIMockEventManager()
}

func SetupMockEventManagerNoYield(isEmpty ...bool) SDAIEventManager {
	SDAIEventFetcher = &MockEventFetcherNoYield{}

	if len(isEmpty) > 0 && isEmpty[0] {
		return NewsDAIMockNoYieldEventManager(true)
	}
	return NewsDAIMockNoYieldEventManager()
}

func SetupMockEventManagerWithNoEvents() SDAIEventManager {
	SDAIEventFetcher = &MockEventFetcherNoEvents{}
	return NewsDAIEventManager()
}
