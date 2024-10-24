// Code generated by protoc-gen-gogo. DO NOT EDIT.
// source: dydxprotocol/blocktime/query.proto

package types

import (
	context "context"
	fmt "fmt"
	_ "github.com/cosmos/gogoproto/gogoproto"
	grpc1 "github.com/cosmos/gogoproto/grpc"
	proto "github.com/cosmos/gogoproto/proto"
	_ "google.golang.org/genproto/googleapis/api/annotations"
	grpc "google.golang.org/grpc"
	codes "google.golang.org/grpc/codes"
	status "google.golang.org/grpc/status"
	io "io"
	math "math"
	math_bits "math/bits"
)

// Reference imports to suppress errors if they are not otherwise used.
var _ = proto.Marshal
var _ = fmt.Errorf
var _ = math.Inf

// This is a compile-time assertion to ensure that this generated file
// is compatible with the proto package it is being compiled against.
// A compilation error at this line likely means your copy of the
// proto package needs to be updated.
const _ = proto.GoGoProtoPackageIsVersion3 // please upgrade the proto package

// QueryDowntimeParamsRequest is a request type for the DowntimeParams
// RPC method.
type QueryDowntimeParamsRequest struct {
}

func (m *QueryDowntimeParamsRequest) Reset()         { *m = QueryDowntimeParamsRequest{} }
func (m *QueryDowntimeParamsRequest) String() string { return proto.CompactTextString(m) }
func (*QueryDowntimeParamsRequest) ProtoMessage()    {}
func (*QueryDowntimeParamsRequest) Descriptor() ([]byte, []int) {
	return fileDescriptor_c6fa5ca81d500c56, []int{0}
}
func (m *QueryDowntimeParamsRequest) XXX_Unmarshal(b []byte) error {
	return m.Unmarshal(b)
}
func (m *QueryDowntimeParamsRequest) XXX_Marshal(b []byte, deterministic bool) ([]byte, error) {
	if deterministic {
		return xxx_messageInfo_QueryDowntimeParamsRequest.Marshal(b, m, deterministic)
	} else {
		b = b[:cap(b)]
		n, err := m.MarshalToSizedBuffer(b)
		if err != nil {
			return nil, err
		}
		return b[:n], nil
	}
}
func (m *QueryDowntimeParamsRequest) XXX_Merge(src proto.Message) {
	xxx_messageInfo_QueryDowntimeParamsRequest.Merge(m, src)
}
func (m *QueryDowntimeParamsRequest) XXX_Size() int {
	return m.Size()
}
func (m *QueryDowntimeParamsRequest) XXX_DiscardUnknown() {
	xxx_messageInfo_QueryDowntimeParamsRequest.DiscardUnknown(m)
}

var xxx_messageInfo_QueryDowntimeParamsRequest proto.InternalMessageInfo

// QueryDowntimeParamsResponse is a response type for the DowntimeParams
// RPC method.
type QueryDowntimeParamsResponse struct {
	Params DowntimeParams `protobuf:"bytes,1,opt,name=params,proto3" json:"params"`
}

func (m *QueryDowntimeParamsResponse) Reset()         { *m = QueryDowntimeParamsResponse{} }
func (m *QueryDowntimeParamsResponse) String() string { return proto.CompactTextString(m) }
func (*QueryDowntimeParamsResponse) ProtoMessage()    {}
func (*QueryDowntimeParamsResponse) Descriptor() ([]byte, []int) {
	return fileDescriptor_c6fa5ca81d500c56, []int{1}
}
func (m *QueryDowntimeParamsResponse) XXX_Unmarshal(b []byte) error {
	return m.Unmarshal(b)
}
func (m *QueryDowntimeParamsResponse) XXX_Marshal(b []byte, deterministic bool) ([]byte, error) {
	if deterministic {
		return xxx_messageInfo_QueryDowntimeParamsResponse.Marshal(b, m, deterministic)
	} else {
		b = b[:cap(b)]
		n, err := m.MarshalToSizedBuffer(b)
		if err != nil {
			return nil, err
		}
		return b[:n], nil
	}
}
func (m *QueryDowntimeParamsResponse) XXX_Merge(src proto.Message) {
	xxx_messageInfo_QueryDowntimeParamsResponse.Merge(m, src)
}
func (m *QueryDowntimeParamsResponse) XXX_Size() int {
	return m.Size()
}
func (m *QueryDowntimeParamsResponse) XXX_DiscardUnknown() {
	xxx_messageInfo_QueryDowntimeParamsResponse.DiscardUnknown(m)
}

var xxx_messageInfo_QueryDowntimeParamsResponse proto.InternalMessageInfo

func (m *QueryDowntimeParamsResponse) GetParams() DowntimeParams {
	if m != nil {
		return m.Params
	}
	return DowntimeParams{}
}

// QueryPreviousBlockInfoRequest is a request type for the PreviousBlockInfo
// RPC method.
type QueryPreviousBlockInfoRequest struct {
}

func (m *QueryPreviousBlockInfoRequest) Reset()         { *m = QueryPreviousBlockInfoRequest{} }
func (m *QueryPreviousBlockInfoRequest) String() string { return proto.CompactTextString(m) }
func (*QueryPreviousBlockInfoRequest) ProtoMessage()    {}
func (*QueryPreviousBlockInfoRequest) Descriptor() ([]byte, []int) {
	return fileDescriptor_c6fa5ca81d500c56, []int{2}
}
func (m *QueryPreviousBlockInfoRequest) XXX_Unmarshal(b []byte) error {
	return m.Unmarshal(b)
}
func (m *QueryPreviousBlockInfoRequest) XXX_Marshal(b []byte, deterministic bool) ([]byte, error) {
	if deterministic {
		return xxx_messageInfo_QueryPreviousBlockInfoRequest.Marshal(b, m, deterministic)
	} else {
		b = b[:cap(b)]
		n, err := m.MarshalToSizedBuffer(b)
		if err != nil {
			return nil, err
		}
		return b[:n], nil
	}
}
func (m *QueryPreviousBlockInfoRequest) XXX_Merge(src proto.Message) {
	xxx_messageInfo_QueryPreviousBlockInfoRequest.Merge(m, src)
}
func (m *QueryPreviousBlockInfoRequest) XXX_Size() int {
	return m.Size()
}
func (m *QueryPreviousBlockInfoRequest) XXX_DiscardUnknown() {
	xxx_messageInfo_QueryPreviousBlockInfoRequest.DiscardUnknown(m)
}

var xxx_messageInfo_QueryPreviousBlockInfoRequest proto.InternalMessageInfo

// QueryPreviousBlockInfoResponse is a request type for the PreviousBlockInfo
// RPC method.
type QueryPreviousBlockInfoResponse struct {
	Info *BlockInfo `protobuf:"bytes,1,opt,name=info,proto3" json:"info,omitempty"`
}

func (m *QueryPreviousBlockInfoResponse) Reset()         { *m = QueryPreviousBlockInfoResponse{} }
func (m *QueryPreviousBlockInfoResponse) String() string { return proto.CompactTextString(m) }
func (*QueryPreviousBlockInfoResponse) ProtoMessage()    {}
func (*QueryPreviousBlockInfoResponse) Descriptor() ([]byte, []int) {
	return fileDescriptor_c6fa5ca81d500c56, []int{3}
}
func (m *QueryPreviousBlockInfoResponse) XXX_Unmarshal(b []byte) error {
	return m.Unmarshal(b)
}
func (m *QueryPreviousBlockInfoResponse) XXX_Marshal(b []byte, deterministic bool) ([]byte, error) {
	if deterministic {
		return xxx_messageInfo_QueryPreviousBlockInfoResponse.Marshal(b, m, deterministic)
	} else {
		b = b[:cap(b)]
		n, err := m.MarshalToSizedBuffer(b)
		if err != nil {
			return nil, err
		}
		return b[:n], nil
	}
}
func (m *QueryPreviousBlockInfoResponse) XXX_Merge(src proto.Message) {
	xxx_messageInfo_QueryPreviousBlockInfoResponse.Merge(m, src)
}
func (m *QueryPreviousBlockInfoResponse) XXX_Size() int {
	return m.Size()
}
func (m *QueryPreviousBlockInfoResponse) XXX_DiscardUnknown() {
	xxx_messageInfo_QueryPreviousBlockInfoResponse.DiscardUnknown(m)
}

var xxx_messageInfo_QueryPreviousBlockInfoResponse proto.InternalMessageInfo

func (m *QueryPreviousBlockInfoResponse) GetInfo() *BlockInfo {
	if m != nil {
		return m.Info
	}
	return nil
}

// QueryAllDowntimeInfoRequest is a request type for the AllDowntimeInfo
// RPC method.
type QueryAllDowntimeInfoRequest struct {
}

func (m *QueryAllDowntimeInfoRequest) Reset()         { *m = QueryAllDowntimeInfoRequest{} }
func (m *QueryAllDowntimeInfoRequest) String() string { return proto.CompactTextString(m) }
func (*QueryAllDowntimeInfoRequest) ProtoMessage()    {}
func (*QueryAllDowntimeInfoRequest) Descriptor() ([]byte, []int) {
	return fileDescriptor_c6fa5ca81d500c56, []int{4}
}
func (m *QueryAllDowntimeInfoRequest) XXX_Unmarshal(b []byte) error {
	return m.Unmarshal(b)
}
func (m *QueryAllDowntimeInfoRequest) XXX_Marshal(b []byte, deterministic bool) ([]byte, error) {
	if deterministic {
		return xxx_messageInfo_QueryAllDowntimeInfoRequest.Marshal(b, m, deterministic)
	} else {
		b = b[:cap(b)]
		n, err := m.MarshalToSizedBuffer(b)
		if err != nil {
			return nil, err
		}
		return b[:n], nil
	}
}
func (m *QueryAllDowntimeInfoRequest) XXX_Merge(src proto.Message) {
	xxx_messageInfo_QueryAllDowntimeInfoRequest.Merge(m, src)
}
func (m *QueryAllDowntimeInfoRequest) XXX_Size() int {
	return m.Size()
}
func (m *QueryAllDowntimeInfoRequest) XXX_DiscardUnknown() {
	xxx_messageInfo_QueryAllDowntimeInfoRequest.DiscardUnknown(m)
}

var xxx_messageInfo_QueryAllDowntimeInfoRequest proto.InternalMessageInfo

// QueryAllDowntimeInfoResponse is a request type for the AllDowntimeInfo
// RPC method.
type QueryAllDowntimeInfoResponse struct {
	Info *AllDowntimeInfo `protobuf:"bytes,1,opt,name=info,proto3" json:"info,omitempty"`
}

func (m *QueryAllDowntimeInfoResponse) Reset()         { *m = QueryAllDowntimeInfoResponse{} }
func (m *QueryAllDowntimeInfoResponse) String() string { return proto.CompactTextString(m) }
func (*QueryAllDowntimeInfoResponse) ProtoMessage()    {}
func (*QueryAllDowntimeInfoResponse) Descriptor() ([]byte, []int) {
	return fileDescriptor_c6fa5ca81d500c56, []int{5}
}
func (m *QueryAllDowntimeInfoResponse) XXX_Unmarshal(b []byte) error {
	return m.Unmarshal(b)
}
func (m *QueryAllDowntimeInfoResponse) XXX_Marshal(b []byte, deterministic bool) ([]byte, error) {
	if deterministic {
		return xxx_messageInfo_QueryAllDowntimeInfoResponse.Marshal(b, m, deterministic)
	} else {
		b = b[:cap(b)]
		n, err := m.MarshalToSizedBuffer(b)
		if err != nil {
			return nil, err
		}
		return b[:n], nil
	}
}
func (m *QueryAllDowntimeInfoResponse) XXX_Merge(src proto.Message) {
	xxx_messageInfo_QueryAllDowntimeInfoResponse.Merge(m, src)
}
func (m *QueryAllDowntimeInfoResponse) XXX_Size() int {
	return m.Size()
}
func (m *QueryAllDowntimeInfoResponse) XXX_DiscardUnknown() {
	xxx_messageInfo_QueryAllDowntimeInfoResponse.DiscardUnknown(m)
}

var xxx_messageInfo_QueryAllDowntimeInfoResponse proto.InternalMessageInfo

func (m *QueryAllDowntimeInfoResponse) GetInfo() *AllDowntimeInfo {
	if m != nil {
		return m.Info
	}
	return nil
}

func init() {
	proto.RegisterType((*QueryDowntimeParamsRequest)(nil), "dydxprotocol.blocktime.QueryDowntimeParamsRequest")
	proto.RegisterType((*QueryDowntimeParamsResponse)(nil), "dydxprotocol.blocktime.QueryDowntimeParamsResponse")
	proto.RegisterType((*QueryPreviousBlockInfoRequest)(nil), "dydxprotocol.blocktime.QueryPreviousBlockInfoRequest")
	proto.RegisterType((*QueryPreviousBlockInfoResponse)(nil), "dydxprotocol.blocktime.QueryPreviousBlockInfoResponse")
	proto.RegisterType((*QueryAllDowntimeInfoRequest)(nil), "dydxprotocol.blocktime.QueryAllDowntimeInfoRequest")
	proto.RegisterType((*QueryAllDowntimeInfoResponse)(nil), "dydxprotocol.blocktime.QueryAllDowntimeInfoResponse")
}

func init() {
	proto.RegisterFile("dydxprotocol/blocktime/query.proto", fileDescriptor_c6fa5ca81d500c56)
}

var fileDescriptor_c6fa5ca81d500c56 = []byte{
	// 456 bytes of a gzipped FileDescriptorProto
	0x1f, 0x8b, 0x08, 0x00, 0x00, 0x00, 0x00, 0x00, 0x02, 0xff, 0x94, 0x52, 0x41, 0x6b, 0xd4, 0x40,
	0x18, 0xdd, 0xd1, 0xda, 0xc3, 0x08, 0x8a, 0x83, 0x88, 0xc4, 0x6d, 0xaa, 0x11, 0xaa, 0x48, 0x9b,
	0x81, 0xed, 0xd6, 0x8b, 0x27, 0x97, 0x22, 0xf4, 0xb6, 0xd6, 0x83, 0xa0, 0x87, 0x32, 0x9b, 0x9d,
	0xa6, 0x83, 0xc9, 0x7c, 0x69, 0x32, 0xa9, 0xdd, 0x6b, 0x7f, 0x81, 0xe0, 0xef, 0xf0, 0xe2, 0xaf,
	0xe8, 0xb1, 0xe0, 0xc5, 0x93, 0xc8, 0xae, 0x7f, 0xc0, 0x7f, 0x20, 0x99, 0xcc, 0xc6, 0x64, 0x9b,
	0x59, 0xd8, 0xdb, 0x30, 0xef, 0xbd, 0xef, 0x7d, 0xf3, 0xde, 0x60, 0x6f, 0x3c, 0x19, 0x9f, 0x27,
	0x29, 0x28, 0x08, 0x20, 0xa2, 0xa3, 0x08, 0x82, 0x4f, 0x4a, 0xc4, 0x9c, 0x9e, 0xe6, 0x3c, 0x9d,
	0xf8, 0x1a, 0x20, 0x0f, 0xea, 0x1c, 0xbf, 0xe2, 0x38, 0xf7, 0x43, 0x08, 0x41, 0xdf, 0xd3, 0xe2,
	0x54, 0xb2, 0x9d, 0x6e, 0x08, 0x10, 0x46, 0x9c, 0xb2, 0x44, 0x50, 0x26, 0x25, 0x28, 0xa6, 0x04,
	0xc8, 0xcc, 0xa0, 0x5b, 0x16, 0xbf, 0xea, 0x64, 0x78, 0x4f, 0x2d, 0xbc, 0x84, 0xa5, 0x2c, 0x36,
	0xc3, 0xbc, 0x2e, 0x76, 0xde, 0x16, 0x7b, 0xee, 0xc3, 0x67, 0x59, 0xa0, 0x43, 0x0d, 0x1e, 0xf2,
	0xd3, 0x9c, 0x67, 0xca, 0x0b, 0xf0, 0xa3, 0x56, 0x34, 0x4b, 0x40, 0x66, 0x9c, 0xec, 0xe3, 0xf5,
	0x72, 0xd8, 0x43, 0xf4, 0x18, 0x3d, 0xbf, 0xdd, 0xdb, 0xf2, 0xdb, 0x9f, 0xe9, 0x37, 0xf5, 0x83,
	0xb5, 0xcb, 0x5f, 0x9b, 0x9d, 0x43, 0xa3, 0xf5, 0x36, 0xf1, 0x86, 0x36, 0x19, 0xa6, 0xfc, 0x4c,
	0x40, 0x9e, 0x0d, 0x0a, 0xd9, 0x81, 0x3c, 0x86, 0xf9, 0x16, 0xef, 0xb1, 0x6b, 0x23, 0x98, 0x45,
	0xf6, 0xf0, 0x9a, 0x90, 0xc7, 0x60, 0xd6, 0x78, 0x62, 0x5b, 0xe3, 0xbf, 0x50, 0xd3, 0xbd, 0x0d,
	0xf3, 0xbc, 0xd7, 0x51, 0x34, 0xdf, 0xb0, 0xee, 0xfb, 0x11, 0x77, 0xdb, 0x61, 0xe3, 0xfa, 0xaa,
	0xe1, 0xfa, 0xcc, 0xe6, 0xba, 0x28, 0xd7, 0xa2, 0xde, 0xdf, 0x9b, 0xf8, 0x96, 0x9e, 0x4e, 0xbe,
	0x21, 0x7c, 0xa7, 0x19, 0x10, 0xe9, 0xd9, 0x66, 0xd9, 0xbb, 0x72, 0x76, 0x57, 0xd2, 0x94, 0x4f,
	0xf0, 0x7a, 0x17, 0x3f, 0xfe, 0x7c, 0xbd, 0xb1, 0x4d, 0x5e, 0xd0, 0xc6, 0x67, 0x39, 0xeb, 0xd7,
	0xfe, 0xcb, 0xd8, 0x48, 0x8f, 0xca, 0xbe, 0xc8, 0x05, 0xc2, 0xf7, 0xae, 0x55, 0x41, 0xf6, 0x96,
	0xda, 0xdb, 0xba, 0x75, 0x5e, 0xae, 0x2a, 0x33, 0xd9, 0x7f, 0x47, 0xf8, 0xee, 0x42, 0xb0, 0x64,
	0x79, 0x02, 0xed, 0x25, 0x3b, 0xfd, 0xd5, 0x44, 0x26, 0xb7, 0xbe, 0xce, 0xcd, 0x27, 0xdb, 0x4b,
	0x72, 0x63, 0x51, 0x74, 0x54, 0x65, 0x57, 0x74, 0x3e, 0x08, 0x2e, 0xa7, 0x2e, 0xba, 0x9a, 0xba,
	0xe8, 0xf7, 0xd4, 0x45, 0x5f, 0x66, 0x6e, 0xe7, 0x6a, 0xe6, 0x76, 0x7e, 0xce, 0xdc, 0xce, 0x87,
	0x83, 0x50, 0xa8, 0x93, 0x7c, 0xe4, 0x07, 0x10, 0xd3, 0x77, 0x2a, 0xe5, 0x2c, 0x7e, 0x23, 0x24,
	0x93, 0x01, 0xdf, 0x19, 0xce, 0x67, 0x67, 0xfa, 0x7a, 0x27, 0x38, 0x61, 0x42, 0xd2, 0xca, 0xf1,
	0xbc, 0x66, 0xa8, 0x26, 0x09, 0xcf, 0x46, 0xeb, 0x1a, 0xdb, 0xfd, 0x17, 0x00, 0x00, 0xff, 0xff,
	0x6e, 0xaf, 0x24, 0xaf, 0x97, 0x04, 0x00, 0x00,
}

// Reference imports to suppress errors if they are not otherwise used.
var _ context.Context
var _ grpc.ClientConn

// This is a compile-time assertion to ensure that this generated file
// is compatible with the grpc package it is being compiled against.
const _ = grpc.SupportPackageIsVersion4

// QueryClient is the client API for Query service.
//
// For semantics around ctx use and closing/ending streaming RPCs, please refer to https://godoc.org/google.golang.org/grpc#ClientConn.NewStream.
type QueryClient interface {
	// Queries the DowntimeParams.
	DowntimeParams(ctx context.Context, in *QueryDowntimeParamsRequest, opts ...grpc.CallOption) (*QueryDowntimeParamsResponse, error)
	// Queries the information of the previous block
	PreviousBlockInfo(ctx context.Context, in *QueryPreviousBlockInfoRequest, opts ...grpc.CallOption) (*QueryPreviousBlockInfoResponse, error)
	// Queries all recorded downtime info.
	AllDowntimeInfo(ctx context.Context, in *QueryAllDowntimeInfoRequest, opts ...grpc.CallOption) (*QueryAllDowntimeInfoResponse, error)
}

type queryClient struct {
	cc grpc1.ClientConn
}

func NewQueryClient(cc grpc1.ClientConn) QueryClient {
	return &queryClient{cc}
}

func (c *queryClient) DowntimeParams(ctx context.Context, in *QueryDowntimeParamsRequest, opts ...grpc.CallOption) (*QueryDowntimeParamsResponse, error) {
	out := new(QueryDowntimeParamsResponse)
	err := c.cc.Invoke(ctx, "/dydxprotocol.blocktime.Query/DowntimeParams", in, out, opts...)
	if err != nil {
		return nil, err
	}
	return out, nil
}

func (c *queryClient) PreviousBlockInfo(ctx context.Context, in *QueryPreviousBlockInfoRequest, opts ...grpc.CallOption) (*QueryPreviousBlockInfoResponse, error) {
	out := new(QueryPreviousBlockInfoResponse)
	err := c.cc.Invoke(ctx, "/dydxprotocol.blocktime.Query/PreviousBlockInfo", in, out, opts...)
	if err != nil {
		return nil, err
	}
	return out, nil
}

func (c *queryClient) AllDowntimeInfo(ctx context.Context, in *QueryAllDowntimeInfoRequest, opts ...grpc.CallOption) (*QueryAllDowntimeInfoResponse, error) {
	out := new(QueryAllDowntimeInfoResponse)
	err := c.cc.Invoke(ctx, "/dydxprotocol.blocktime.Query/AllDowntimeInfo", in, out, opts...)
	if err != nil {
		return nil, err
	}
	return out, nil
}

// QueryServer is the server API for Query service.
type QueryServer interface {
	// Queries the DowntimeParams.
	DowntimeParams(context.Context, *QueryDowntimeParamsRequest) (*QueryDowntimeParamsResponse, error)
	// Queries the information of the previous block
	PreviousBlockInfo(context.Context, *QueryPreviousBlockInfoRequest) (*QueryPreviousBlockInfoResponse, error)
	// Queries all recorded downtime info.
	AllDowntimeInfo(context.Context, *QueryAllDowntimeInfoRequest) (*QueryAllDowntimeInfoResponse, error)
}

// UnimplementedQueryServer can be embedded to have forward compatible implementations.
type UnimplementedQueryServer struct {
}

func (*UnimplementedQueryServer) DowntimeParams(ctx context.Context, req *QueryDowntimeParamsRequest) (*QueryDowntimeParamsResponse, error) {
	return nil, status.Errorf(codes.Unimplemented, "method DowntimeParams not implemented")
}
func (*UnimplementedQueryServer) PreviousBlockInfo(ctx context.Context, req *QueryPreviousBlockInfoRequest) (*QueryPreviousBlockInfoResponse, error) {
	return nil, status.Errorf(codes.Unimplemented, "method PreviousBlockInfo not implemented")
}
func (*UnimplementedQueryServer) AllDowntimeInfo(ctx context.Context, req *QueryAllDowntimeInfoRequest) (*QueryAllDowntimeInfoResponse, error) {
	return nil, status.Errorf(codes.Unimplemented, "method AllDowntimeInfo not implemented")
}

func RegisterQueryServer(s grpc1.Server, srv QueryServer) {
	s.RegisterService(&_Query_serviceDesc, srv)
}

func _Query_DowntimeParams_Handler(srv interface{}, ctx context.Context, dec func(interface{}) error, interceptor grpc.UnaryServerInterceptor) (interface{}, error) {
	in := new(QueryDowntimeParamsRequest)
	if err := dec(in); err != nil {
		return nil, err
	}
	if interceptor == nil {
		return srv.(QueryServer).DowntimeParams(ctx, in)
	}
	info := &grpc.UnaryServerInfo{
		Server:     srv,
		FullMethod: "/dydxprotocol.blocktime.Query/DowntimeParams",
	}
	handler := func(ctx context.Context, req interface{}) (interface{}, error) {
		return srv.(QueryServer).DowntimeParams(ctx, req.(*QueryDowntimeParamsRequest))
	}
	return interceptor(ctx, in, info, handler)
}

func _Query_PreviousBlockInfo_Handler(srv interface{}, ctx context.Context, dec func(interface{}) error, interceptor grpc.UnaryServerInterceptor) (interface{}, error) {
	in := new(QueryPreviousBlockInfoRequest)
	if err := dec(in); err != nil {
		return nil, err
	}
	if interceptor == nil {
		return srv.(QueryServer).PreviousBlockInfo(ctx, in)
	}
	info := &grpc.UnaryServerInfo{
		Server:     srv,
		FullMethod: "/dydxprotocol.blocktime.Query/PreviousBlockInfo",
	}
	handler := func(ctx context.Context, req interface{}) (interface{}, error) {
		return srv.(QueryServer).PreviousBlockInfo(ctx, req.(*QueryPreviousBlockInfoRequest))
	}
	return interceptor(ctx, in, info, handler)
}

func _Query_AllDowntimeInfo_Handler(srv interface{}, ctx context.Context, dec func(interface{}) error, interceptor grpc.UnaryServerInterceptor) (interface{}, error) {
	in := new(QueryAllDowntimeInfoRequest)
	if err := dec(in); err != nil {
		return nil, err
	}
	if interceptor == nil {
		return srv.(QueryServer).AllDowntimeInfo(ctx, in)
	}
	info := &grpc.UnaryServerInfo{
		Server:     srv,
		FullMethod: "/dydxprotocol.blocktime.Query/AllDowntimeInfo",
	}
	handler := func(ctx context.Context, req interface{}) (interface{}, error) {
		return srv.(QueryServer).AllDowntimeInfo(ctx, req.(*QueryAllDowntimeInfoRequest))
	}
	return interceptor(ctx, in, info, handler)
}

var _Query_serviceDesc = grpc.ServiceDesc{
	ServiceName: "dydxprotocol.blocktime.Query",
	HandlerType: (*QueryServer)(nil),
	Methods: []grpc.MethodDesc{
		{
			MethodName: "DowntimeParams",
			Handler:    _Query_DowntimeParams_Handler,
		},
		{
			MethodName: "PreviousBlockInfo",
			Handler:    _Query_PreviousBlockInfo_Handler,
		},
		{
			MethodName: "AllDowntimeInfo",
			Handler:    _Query_AllDowntimeInfo_Handler,
		},
	},
	Streams:  []grpc.StreamDesc{},
	Metadata: "dydxprotocol/blocktime/query.proto",
}

func (m *QueryDowntimeParamsRequest) Marshal() (dAtA []byte, err error) {
	size := m.Size()
	dAtA = make([]byte, size)
	n, err := m.MarshalToSizedBuffer(dAtA[:size])
	if err != nil {
		return nil, err
	}
	return dAtA[:n], nil
}

func (m *QueryDowntimeParamsRequest) MarshalTo(dAtA []byte) (int, error) {
	size := m.Size()
	return m.MarshalToSizedBuffer(dAtA[:size])
}

func (m *QueryDowntimeParamsRequest) MarshalToSizedBuffer(dAtA []byte) (int, error) {
	i := len(dAtA)
	_ = i
	var l int
	_ = l
	return len(dAtA) - i, nil
}

func (m *QueryDowntimeParamsResponse) Marshal() (dAtA []byte, err error) {
	size := m.Size()
	dAtA = make([]byte, size)
	n, err := m.MarshalToSizedBuffer(dAtA[:size])
	if err != nil {
		return nil, err
	}
	return dAtA[:n], nil
}

func (m *QueryDowntimeParamsResponse) MarshalTo(dAtA []byte) (int, error) {
	size := m.Size()
	return m.MarshalToSizedBuffer(dAtA[:size])
}

func (m *QueryDowntimeParamsResponse) MarshalToSizedBuffer(dAtA []byte) (int, error) {
	i := len(dAtA)
	_ = i
	var l int
	_ = l
	{
		size, err := m.Params.MarshalToSizedBuffer(dAtA[:i])
		if err != nil {
			return 0, err
		}
		i -= size
		i = encodeVarintQuery(dAtA, i, uint64(size))
	}
	i--
	dAtA[i] = 0xa
	return len(dAtA) - i, nil
}

func (m *QueryPreviousBlockInfoRequest) Marshal() (dAtA []byte, err error) {
	size := m.Size()
	dAtA = make([]byte, size)
	n, err := m.MarshalToSizedBuffer(dAtA[:size])
	if err != nil {
		return nil, err
	}
	return dAtA[:n], nil
}

func (m *QueryPreviousBlockInfoRequest) MarshalTo(dAtA []byte) (int, error) {
	size := m.Size()
	return m.MarshalToSizedBuffer(dAtA[:size])
}

func (m *QueryPreviousBlockInfoRequest) MarshalToSizedBuffer(dAtA []byte) (int, error) {
	i := len(dAtA)
	_ = i
	var l int
	_ = l
	return len(dAtA) - i, nil
}

func (m *QueryPreviousBlockInfoResponse) Marshal() (dAtA []byte, err error) {
	size := m.Size()
	dAtA = make([]byte, size)
	n, err := m.MarshalToSizedBuffer(dAtA[:size])
	if err != nil {
		return nil, err
	}
	return dAtA[:n], nil
}

func (m *QueryPreviousBlockInfoResponse) MarshalTo(dAtA []byte) (int, error) {
	size := m.Size()
	return m.MarshalToSizedBuffer(dAtA[:size])
}

func (m *QueryPreviousBlockInfoResponse) MarshalToSizedBuffer(dAtA []byte) (int, error) {
	i := len(dAtA)
	_ = i
	var l int
	_ = l
	if m.Info != nil {
		{
			size, err := m.Info.MarshalToSizedBuffer(dAtA[:i])
			if err != nil {
				return 0, err
			}
			i -= size
			i = encodeVarintQuery(dAtA, i, uint64(size))
		}
		i--
		dAtA[i] = 0xa
	}
	return len(dAtA) - i, nil
}

func (m *QueryAllDowntimeInfoRequest) Marshal() (dAtA []byte, err error) {
	size := m.Size()
	dAtA = make([]byte, size)
	n, err := m.MarshalToSizedBuffer(dAtA[:size])
	if err != nil {
		return nil, err
	}
	return dAtA[:n], nil
}

func (m *QueryAllDowntimeInfoRequest) MarshalTo(dAtA []byte) (int, error) {
	size := m.Size()
	return m.MarshalToSizedBuffer(dAtA[:size])
}

func (m *QueryAllDowntimeInfoRequest) MarshalToSizedBuffer(dAtA []byte) (int, error) {
	i := len(dAtA)
	_ = i
	var l int
	_ = l
	return len(dAtA) - i, nil
}

func (m *QueryAllDowntimeInfoResponse) Marshal() (dAtA []byte, err error) {
	size := m.Size()
	dAtA = make([]byte, size)
	n, err := m.MarshalToSizedBuffer(dAtA[:size])
	if err != nil {
		return nil, err
	}
	return dAtA[:n], nil
}

func (m *QueryAllDowntimeInfoResponse) MarshalTo(dAtA []byte) (int, error) {
	size := m.Size()
	return m.MarshalToSizedBuffer(dAtA[:size])
}

func (m *QueryAllDowntimeInfoResponse) MarshalToSizedBuffer(dAtA []byte) (int, error) {
	i := len(dAtA)
	_ = i
	var l int
	_ = l
	if m.Info != nil {
		{
			size, err := m.Info.MarshalToSizedBuffer(dAtA[:i])
			if err != nil {
				return 0, err
			}
			i -= size
			i = encodeVarintQuery(dAtA, i, uint64(size))
		}
		i--
		dAtA[i] = 0xa
	}
	return len(dAtA) - i, nil
}

func encodeVarintQuery(dAtA []byte, offset int, v uint64) int {
	offset -= sovQuery(v)
	base := offset
	for v >= 1<<7 {
		dAtA[offset] = uint8(v&0x7f | 0x80)
		v >>= 7
		offset++
	}
	dAtA[offset] = uint8(v)
	return base
}
func (m *QueryDowntimeParamsRequest) Size() (n int) {
	if m == nil {
		return 0
	}
	var l int
	_ = l
	return n
}

func (m *QueryDowntimeParamsResponse) Size() (n int) {
	if m == nil {
		return 0
	}
	var l int
	_ = l
	l = m.Params.Size()
	n += 1 + l + sovQuery(uint64(l))
	return n
}

func (m *QueryPreviousBlockInfoRequest) Size() (n int) {
	if m == nil {
		return 0
	}
	var l int
	_ = l
	return n
}

func (m *QueryPreviousBlockInfoResponse) Size() (n int) {
	if m == nil {
		return 0
	}
	var l int
	_ = l
	if m.Info != nil {
		l = m.Info.Size()
		n += 1 + l + sovQuery(uint64(l))
	}
	return n
}

func (m *QueryAllDowntimeInfoRequest) Size() (n int) {
	if m == nil {
		return 0
	}
	var l int
	_ = l
	return n
}

func (m *QueryAllDowntimeInfoResponse) Size() (n int) {
	if m == nil {
		return 0
	}
	var l int
	_ = l
	if m.Info != nil {
		l = m.Info.Size()
		n += 1 + l + sovQuery(uint64(l))
	}
	return n
}

func sovQuery(x uint64) (n int) {
	return (math_bits.Len64(x|1) + 6) / 7
}
func sozQuery(x uint64) (n int) {
	return sovQuery(uint64((x << 1) ^ uint64((int64(x) >> 63))))
}
func (m *QueryDowntimeParamsRequest) Unmarshal(dAtA []byte) error {
	l := len(dAtA)
	iNdEx := 0
	for iNdEx < l {
		preIndex := iNdEx
		var wire uint64
		for shift := uint(0); ; shift += 7 {
			if shift >= 64 {
				return ErrIntOverflowQuery
			}
			if iNdEx >= l {
				return io.ErrUnexpectedEOF
			}
			b := dAtA[iNdEx]
			iNdEx++
			wire |= uint64(b&0x7F) << shift
			if b < 0x80 {
				break
			}
		}
		fieldNum := int32(wire >> 3)
		wireType := int(wire & 0x7)
		if wireType == 4 {
			return fmt.Errorf("proto: QueryDowntimeParamsRequest: wiretype end group for non-group")
		}
		if fieldNum <= 0 {
			return fmt.Errorf("proto: QueryDowntimeParamsRequest: illegal tag %d (wire type %d)", fieldNum, wire)
		}
		switch fieldNum {
		default:
			iNdEx = preIndex
			skippy, err := skipQuery(dAtA[iNdEx:])
			if err != nil {
				return err
			}
			if (skippy < 0) || (iNdEx+skippy) < 0 {
				return ErrInvalidLengthQuery
			}
			if (iNdEx + skippy) > l {
				return io.ErrUnexpectedEOF
			}
			iNdEx += skippy
		}
	}

	if iNdEx > l {
		return io.ErrUnexpectedEOF
	}
	return nil
}
func (m *QueryDowntimeParamsResponse) Unmarshal(dAtA []byte) error {
	l := len(dAtA)
	iNdEx := 0
	for iNdEx < l {
		preIndex := iNdEx
		var wire uint64
		for shift := uint(0); ; shift += 7 {
			if shift >= 64 {
				return ErrIntOverflowQuery
			}
			if iNdEx >= l {
				return io.ErrUnexpectedEOF
			}
			b := dAtA[iNdEx]
			iNdEx++
			wire |= uint64(b&0x7F) << shift
			if b < 0x80 {
				break
			}
		}
		fieldNum := int32(wire >> 3)
		wireType := int(wire & 0x7)
		if wireType == 4 {
			return fmt.Errorf("proto: QueryDowntimeParamsResponse: wiretype end group for non-group")
		}
		if fieldNum <= 0 {
			return fmt.Errorf("proto: QueryDowntimeParamsResponse: illegal tag %d (wire type %d)", fieldNum, wire)
		}
		switch fieldNum {
		case 1:
			if wireType != 2 {
				return fmt.Errorf("proto: wrong wireType = %d for field Params", wireType)
			}
			var msglen int
			for shift := uint(0); ; shift += 7 {
				if shift >= 64 {
					return ErrIntOverflowQuery
				}
				if iNdEx >= l {
					return io.ErrUnexpectedEOF
				}
				b := dAtA[iNdEx]
				iNdEx++
				msglen |= int(b&0x7F) << shift
				if b < 0x80 {
					break
				}
			}
			if msglen < 0 {
				return ErrInvalidLengthQuery
			}
			postIndex := iNdEx + msglen
			if postIndex < 0 {
				return ErrInvalidLengthQuery
			}
			if postIndex > l {
				return io.ErrUnexpectedEOF
			}
			if err := m.Params.Unmarshal(dAtA[iNdEx:postIndex]); err != nil {
				return err
			}
			iNdEx = postIndex
		default:
			iNdEx = preIndex
			skippy, err := skipQuery(dAtA[iNdEx:])
			if err != nil {
				return err
			}
			if (skippy < 0) || (iNdEx+skippy) < 0 {
				return ErrInvalidLengthQuery
			}
			if (iNdEx + skippy) > l {
				return io.ErrUnexpectedEOF
			}
			iNdEx += skippy
		}
	}

	if iNdEx > l {
		return io.ErrUnexpectedEOF
	}
	return nil
}
func (m *QueryPreviousBlockInfoRequest) Unmarshal(dAtA []byte) error {
	l := len(dAtA)
	iNdEx := 0
	for iNdEx < l {
		preIndex := iNdEx
		var wire uint64
		for shift := uint(0); ; shift += 7 {
			if shift >= 64 {
				return ErrIntOverflowQuery
			}
			if iNdEx >= l {
				return io.ErrUnexpectedEOF
			}
			b := dAtA[iNdEx]
			iNdEx++
			wire |= uint64(b&0x7F) << shift
			if b < 0x80 {
				break
			}
		}
		fieldNum := int32(wire >> 3)
		wireType := int(wire & 0x7)
		if wireType == 4 {
			return fmt.Errorf("proto: QueryPreviousBlockInfoRequest: wiretype end group for non-group")
		}
		if fieldNum <= 0 {
			return fmt.Errorf("proto: QueryPreviousBlockInfoRequest: illegal tag %d (wire type %d)", fieldNum, wire)
		}
		switch fieldNum {
		default:
			iNdEx = preIndex
			skippy, err := skipQuery(dAtA[iNdEx:])
			if err != nil {
				return err
			}
			if (skippy < 0) || (iNdEx+skippy) < 0 {
				return ErrInvalidLengthQuery
			}
			if (iNdEx + skippy) > l {
				return io.ErrUnexpectedEOF
			}
			iNdEx += skippy
		}
	}

	if iNdEx > l {
		return io.ErrUnexpectedEOF
	}
	return nil
}
func (m *QueryPreviousBlockInfoResponse) Unmarshal(dAtA []byte) error {
	l := len(dAtA)
	iNdEx := 0
	for iNdEx < l {
		preIndex := iNdEx
		var wire uint64
		for shift := uint(0); ; shift += 7 {
			if shift >= 64 {
				return ErrIntOverflowQuery
			}
			if iNdEx >= l {
				return io.ErrUnexpectedEOF
			}
			b := dAtA[iNdEx]
			iNdEx++
			wire |= uint64(b&0x7F) << shift
			if b < 0x80 {
				break
			}
		}
		fieldNum := int32(wire >> 3)
		wireType := int(wire & 0x7)
		if wireType == 4 {
			return fmt.Errorf("proto: QueryPreviousBlockInfoResponse: wiretype end group for non-group")
		}
		if fieldNum <= 0 {
			return fmt.Errorf("proto: QueryPreviousBlockInfoResponse: illegal tag %d (wire type %d)", fieldNum, wire)
		}
		switch fieldNum {
		case 1:
			if wireType != 2 {
				return fmt.Errorf("proto: wrong wireType = %d for field Info", wireType)
			}
			var msglen int
			for shift := uint(0); ; shift += 7 {
				if shift >= 64 {
					return ErrIntOverflowQuery
				}
				if iNdEx >= l {
					return io.ErrUnexpectedEOF
				}
				b := dAtA[iNdEx]
				iNdEx++
				msglen |= int(b&0x7F) << shift
				if b < 0x80 {
					break
				}
			}
			if msglen < 0 {
				return ErrInvalidLengthQuery
			}
			postIndex := iNdEx + msglen
			if postIndex < 0 {
				return ErrInvalidLengthQuery
			}
			if postIndex > l {
				return io.ErrUnexpectedEOF
			}
			if m.Info == nil {
				m.Info = &BlockInfo{}
			}
			if err := m.Info.Unmarshal(dAtA[iNdEx:postIndex]); err != nil {
				return err
			}
			iNdEx = postIndex
		default:
			iNdEx = preIndex
			skippy, err := skipQuery(dAtA[iNdEx:])
			if err != nil {
				return err
			}
			if (skippy < 0) || (iNdEx+skippy) < 0 {
				return ErrInvalidLengthQuery
			}
			if (iNdEx + skippy) > l {
				return io.ErrUnexpectedEOF
			}
			iNdEx += skippy
		}
	}

	if iNdEx > l {
		return io.ErrUnexpectedEOF
	}
	return nil
}
func (m *QueryAllDowntimeInfoRequest) Unmarshal(dAtA []byte) error {
	l := len(dAtA)
	iNdEx := 0
	for iNdEx < l {
		preIndex := iNdEx
		var wire uint64
		for shift := uint(0); ; shift += 7 {
			if shift >= 64 {
				return ErrIntOverflowQuery
			}
			if iNdEx >= l {
				return io.ErrUnexpectedEOF
			}
			b := dAtA[iNdEx]
			iNdEx++
			wire |= uint64(b&0x7F) << shift
			if b < 0x80 {
				break
			}
		}
		fieldNum := int32(wire >> 3)
		wireType := int(wire & 0x7)
		if wireType == 4 {
			return fmt.Errorf("proto: QueryAllDowntimeInfoRequest: wiretype end group for non-group")
		}
		if fieldNum <= 0 {
			return fmt.Errorf("proto: QueryAllDowntimeInfoRequest: illegal tag %d (wire type %d)", fieldNum, wire)
		}
		switch fieldNum {
		default:
			iNdEx = preIndex
			skippy, err := skipQuery(dAtA[iNdEx:])
			if err != nil {
				return err
			}
			if (skippy < 0) || (iNdEx+skippy) < 0 {
				return ErrInvalidLengthQuery
			}
			if (iNdEx + skippy) > l {
				return io.ErrUnexpectedEOF
			}
			iNdEx += skippy
		}
	}

	if iNdEx > l {
		return io.ErrUnexpectedEOF
	}
	return nil
}
func (m *QueryAllDowntimeInfoResponse) Unmarshal(dAtA []byte) error {
	l := len(dAtA)
	iNdEx := 0
	for iNdEx < l {
		preIndex := iNdEx
		var wire uint64
		for shift := uint(0); ; shift += 7 {
			if shift >= 64 {
				return ErrIntOverflowQuery
			}
			if iNdEx >= l {
				return io.ErrUnexpectedEOF
			}
			b := dAtA[iNdEx]
			iNdEx++
			wire |= uint64(b&0x7F) << shift
			if b < 0x80 {
				break
			}
		}
		fieldNum := int32(wire >> 3)
		wireType := int(wire & 0x7)
		if wireType == 4 {
			return fmt.Errorf("proto: QueryAllDowntimeInfoResponse: wiretype end group for non-group")
		}
		if fieldNum <= 0 {
			return fmt.Errorf("proto: QueryAllDowntimeInfoResponse: illegal tag %d (wire type %d)", fieldNum, wire)
		}
		switch fieldNum {
		case 1:
			if wireType != 2 {
				return fmt.Errorf("proto: wrong wireType = %d for field Info", wireType)
			}
			var msglen int
			for shift := uint(0); ; shift += 7 {
				if shift >= 64 {
					return ErrIntOverflowQuery
				}
				if iNdEx >= l {
					return io.ErrUnexpectedEOF
				}
				b := dAtA[iNdEx]
				iNdEx++
				msglen |= int(b&0x7F) << shift
				if b < 0x80 {
					break
				}
			}
			if msglen < 0 {
				return ErrInvalidLengthQuery
			}
			postIndex := iNdEx + msglen
			if postIndex < 0 {
				return ErrInvalidLengthQuery
			}
			if postIndex > l {
				return io.ErrUnexpectedEOF
			}
			if m.Info == nil {
				m.Info = &AllDowntimeInfo{}
			}
			if err := m.Info.Unmarshal(dAtA[iNdEx:postIndex]); err != nil {
				return err
			}
			iNdEx = postIndex
		default:
			iNdEx = preIndex
			skippy, err := skipQuery(dAtA[iNdEx:])
			if err != nil {
				return err
			}
			if (skippy < 0) || (iNdEx+skippy) < 0 {
				return ErrInvalidLengthQuery
			}
			if (iNdEx + skippy) > l {
				return io.ErrUnexpectedEOF
			}
			iNdEx += skippy
		}
	}

	if iNdEx > l {
		return io.ErrUnexpectedEOF
	}
	return nil
}
func skipQuery(dAtA []byte) (n int, err error) {
	l := len(dAtA)
	iNdEx := 0
	depth := 0
	for iNdEx < l {
		var wire uint64
		for shift := uint(0); ; shift += 7 {
			if shift >= 64 {
				return 0, ErrIntOverflowQuery
			}
			if iNdEx >= l {
				return 0, io.ErrUnexpectedEOF
			}
			b := dAtA[iNdEx]
			iNdEx++
			wire |= (uint64(b) & 0x7F) << shift
			if b < 0x80 {
				break
			}
		}
		wireType := int(wire & 0x7)
		switch wireType {
		case 0:
			for shift := uint(0); ; shift += 7 {
				if shift >= 64 {
					return 0, ErrIntOverflowQuery
				}
				if iNdEx >= l {
					return 0, io.ErrUnexpectedEOF
				}
				iNdEx++
				if dAtA[iNdEx-1] < 0x80 {
					break
				}
			}
		case 1:
			iNdEx += 8
		case 2:
			var length int
			for shift := uint(0); ; shift += 7 {
				if shift >= 64 {
					return 0, ErrIntOverflowQuery
				}
				if iNdEx >= l {
					return 0, io.ErrUnexpectedEOF
				}
				b := dAtA[iNdEx]
				iNdEx++
				length |= (int(b) & 0x7F) << shift
				if b < 0x80 {
					break
				}
			}
			if length < 0 {
				return 0, ErrInvalidLengthQuery
			}
			iNdEx += length
		case 3:
			depth++
		case 4:
			if depth == 0 {
				return 0, ErrUnexpectedEndOfGroupQuery
			}
			depth--
		case 5:
			iNdEx += 4
		default:
			return 0, fmt.Errorf("proto: illegal wireType %d", wireType)
		}
		if iNdEx < 0 {
			return 0, ErrInvalidLengthQuery
		}
		if depth == 0 {
			return iNdEx, nil
		}
	}
	return 0, io.ErrUnexpectedEOF
}

var (
	ErrInvalidLengthQuery        = fmt.Errorf("proto: negative length found during unmarshaling")
	ErrIntOverflowQuery          = fmt.Errorf("proto: integer overflow")
	ErrUnexpectedEndOfGroupQuery = fmt.Errorf("proto: unexpected end of group")
)
