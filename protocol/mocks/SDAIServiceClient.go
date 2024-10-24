// Code generated by mockery v2.42.0. DO NOT EDIT.

package mocks

import (
	context "context"

	api "github.com/StreamFinance-Protocol/stream-chain/protocol/daemons/sdaioracle/api"

	grpc "google.golang.org/grpc"

	mock "github.com/stretchr/testify/mock"
)

// SDAIServiceClient is an autogenerated mock type for the SDAIServiceClient type
type SDAIServiceClient struct {
	mock.Mock
}

// AddsDAIEvent provides a mock function with given fields: ctx, in, opts
func (_m *SDAIServiceClient) AddsDAIEvent(ctx context.Context, in *api.AddsDAIEventRequest, opts ...grpc.CallOption) (*api.AddsDAIEventResponse, error) {
	_va := make([]interface{}, len(opts))
	for _i := range opts {
		_va[_i] = opts[_i]
	}
	var _ca []interface{}
	_ca = append(_ca, ctx, in)
	_ca = append(_ca, _va...)
	ret := _m.Called(_ca...)

	if len(ret) == 0 {
		panic("no return value specified for AddsDAIEvent")
	}

	var r0 *api.AddsDAIEventResponse
	var r1 error
	if rf, ok := ret.Get(0).(func(context.Context, *api.AddsDAIEventRequest, ...grpc.CallOption) (*api.AddsDAIEventResponse, error)); ok {
		return rf(ctx, in, opts...)
	}
	if rf, ok := ret.Get(0).(func(context.Context, *api.AddsDAIEventRequest, ...grpc.CallOption) *api.AddsDAIEventResponse); ok {
		r0 = rf(ctx, in, opts...)
	} else {
		if ret.Get(0) != nil {
			r0 = ret.Get(0).(*api.AddsDAIEventResponse)
		}
	}

	if rf, ok := ret.Get(1).(func(context.Context, *api.AddsDAIEventRequest, ...grpc.CallOption) error); ok {
		r1 = rf(ctx, in, opts...)
	} else {
		r1 = ret.Error(1)
	}

	return r0, r1
}

// NewSDAIServiceClient creates a new instance of SDAIServiceClient. It also registers a testing interface on the mock and a cleanup function to assert the mocks expectations.
// The first argument is typically a *testing.T value.
func NewSDAIServiceClient(t interface {
	mock.TestingT
	Cleanup(func())
}) *SDAIServiceClient {
	mock := &SDAIServiceClient{}
	mock.Mock.Test(t)

	t.Cleanup(func() { mock.AssertExpectations(t) })

	return mock
}
