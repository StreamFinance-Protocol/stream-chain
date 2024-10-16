// Code generated by mockery v2.42.0. DO NOT EDIT.

package mocks

import (
	consumertypes "github.com/ethos-works/ethos/ethos-chain/x/ccv/consumer/types"
	mock "github.com/stretchr/testify/mock"

	types "github.com/cosmos/cosmos-sdk/types"
)

// PrepareConsumerKeeper is an autogenerated mock type for the PrepareConsumerKeeper type
type PrepareConsumerKeeper struct {
	mock.Mock
}

// GetCCValidator provides a mock function with given fields: ctx, addr
func (_m *PrepareConsumerKeeper) GetCCValidator(ctx types.Context, addr []byte) (consumertypes.CrossChainValidator, bool) {
	ret := _m.Called(ctx, addr)

	if len(ret) == 0 {
		panic("no return value specified for GetCCValidator")
	}

	var r0 consumertypes.CrossChainValidator
	var r1 bool
	if rf, ok := ret.Get(0).(func(types.Context, []byte) (consumertypes.CrossChainValidator, bool)); ok {
		return rf(ctx, addr)
	}
	if rf, ok := ret.Get(0).(func(types.Context, []byte) consumertypes.CrossChainValidator); ok {
		r0 = rf(ctx, addr)
	} else {
		r0 = ret.Get(0).(consumertypes.CrossChainValidator)
	}

	if rf, ok := ret.Get(1).(func(types.Context, []byte) bool); ok {
		r1 = rf(ctx, addr)
	} else {
		r1 = ret.Get(1).(bool)
	}

	return r0, r1
}

// NewPrepareConsumerKeeper creates a new instance of PrepareConsumerKeeper. It also registers a testing interface on the mock and a cleanup function to assert the mocks expectations.
// The first argument is typically a *testing.T value.
func NewPrepareConsumerKeeper(t interface {
	mock.TestingT
	Cleanup(func())
}) *PrepareConsumerKeeper {
	mock := &PrepareConsumerKeeper{}
	mock.Mock.Test(t)

	t.Cleanup(func() { mock.AssertExpectations(t) })

	return mock
}
