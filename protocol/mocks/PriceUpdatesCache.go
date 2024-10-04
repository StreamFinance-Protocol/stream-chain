// Code generated by mockery v2.42.0. DO NOT EDIT.

package mocks

import (
	big "math/big"

	pricecache "github.com/StreamFinance-Protocol/stream-chain/protocol/caches/pricecache"
	types "github.com/cosmos/cosmos-sdk/types"
	mock "github.com/stretchr/testify/mock"
)

// PriceUpdatesCache is an autogenerated mock type for the PriceUpdatesCache type
type PriceUpdatesCache struct {
	mock.Mock
}

// GetConversionRateUpdateAndBlockHeight provides a mock function with given fields:
func (_m *PriceUpdatesCache) GetConversionRateUpdateAndBlockHeight() (*big.Int, *big.Int) {
	ret := _m.Called()

	if len(ret) == 0 {
		panic("no return value specified for GetConversionRateUpdateAndBlockHeight")
	}

	var r0 *big.Int
	var r1 *big.Int
	if rf, ok := ret.Get(0).(func() (*big.Int, *big.Int)); ok {
		return rf()
	}
	if rf, ok := ret.Get(0).(func() *big.Int); ok {
		r0 = rf()
	} else {
		if ret.Get(0) != nil {
			r0 = ret.Get(0).(*big.Int)
		}
	}

	if rf, ok := ret.Get(1).(func() *big.Int); ok {
		r1 = rf()
	} else {
		if ret.Get(1) != nil {
			r1 = ret.Get(1).(*big.Int)
		}
	}

	return r0, r1
}

// GetHeight provides a mock function with given fields:
func (_m *PriceUpdatesCache) GetHeight() int64 {
	ret := _m.Called()

	if len(ret) == 0 {
		panic("no return value specified for GetHeight")
	}

	var r0 int64
	if rf, ok := ret.Get(0).(func() int64); ok {
		r0 = rf()
	} else {
		r0 = ret.Get(0).(int64)
	}

	return r0
}

// GetPriceUpdates provides a mock function with given fields:
func (_m *PriceUpdatesCache) GetPriceUpdates() pricecache.PriceUpdates {
	ret := _m.Called()

	if len(ret) == 0 {
		panic("no return value specified for GetPriceUpdates")
	}

	var r0 pricecache.PriceUpdates
	if rf, ok := ret.Get(0).(func() pricecache.PriceUpdates); ok {
		r0 = rf()
	} else {
		if ret.Get(0) != nil {
			r0 = ret.Get(0).(pricecache.PriceUpdates)
		}
	}

	return r0
}

// GetRound provides a mock function with given fields:
func (_m *PriceUpdatesCache) GetRound() int32 {
	ret := _m.Called()

	if len(ret) == 0 {
		panic("no return value specified for GetRound")
	}

	var r0 int32
	if rf, ok := ret.Get(0).(func() int32); ok {
		r0 = rf()
	} else {
		r0 = ret.Get(0).(int32)
	}

	return r0
}

// HasValidValues provides a mock function with given fields: currBlock, round
func (_m *PriceUpdatesCache) HasValidValues(currBlock int64, round int32) bool {
	ret := _m.Called(currBlock, round)

	if len(ret) == 0 {
		panic("no return value specified for HasValidValues")
	}

	var r0 bool
	if rf, ok := ret.Get(0).(func(int64, int32) bool); ok {
		r0 = rf(currBlock, round)
	} else {
		r0 = ret.Get(0).(bool)
	}

	return r0
}

// SetPriceUpdates provides a mock function with given fields: ctx, updates, round
func (_m *PriceUpdatesCache) SetPriceUpdates(ctx types.Context, updates pricecache.PriceUpdates, round int32) {
	_m.Called(ctx, updates, round)
}

// SetSDaiConversionRateAndBlockHeight provides a mock function with given fields: ctx, sDaiConversionRate, blockHeight, round
func (_m *PriceUpdatesCache) SetSDaiConversionRateAndBlockHeight(ctx types.Context, sDaiConversionRate *big.Int, blockHeight *big.Int, round int32) {
	_m.Called(ctx, sDaiConversionRate, blockHeight, round)
}

// NewPriceUpdatesCache creates a new instance of PriceUpdatesCache. It also registers a testing interface on the mock and a cleanup function to assert the mocks expectations.
// The first argument is typically a *testing.T value.
func NewPriceUpdatesCache(t interface {
	mock.TestingT
	Cleanup(func())
}) *PriceUpdatesCache {
	mock := &PriceUpdatesCache{}
	mock.Mock.Test(t)

	t.Cleanup(func() { mock.AssertExpectations(t) })

	return mock
}