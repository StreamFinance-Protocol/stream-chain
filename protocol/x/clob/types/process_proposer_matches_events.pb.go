// Code generated by protoc-gen-gogo. DO NOT EDIT.
// source: dydxprotocol/clob/process_proposer_matches_events.proto

package types

import (
	fmt "fmt"
	_ "github.com/cosmos/gogoproto/gogoproto"
	proto "github.com/cosmos/gogoproto/proto"
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

// ProcessProposerMatchesEvents is used for communicating which events occurred
// in the last block that require updating the state of the memclob in the
// Commit blocker. It contains information about the following state updates:
// - Long term order IDs that were placed in the last block.
// - Stateful order IDs that were expired in the last block.
// - Order IDs that were filled in the last block.
// - Stateful cancellations order IDs that were placed in the last block.
// - Stateful order IDs forcefully removed in the last block.
// - Conditional order IDs triggered in the last block.
// - Conditional order IDs placed, but not triggered in the last block.
// - The height of the block in which the events occurred.
type ProcessProposerMatchesEvents struct {
	PlacedLongTermOrderIds                  []OrderId `protobuf:"bytes,1,rep,name=placed_long_term_order_ids,json=placedLongTermOrderIds,proto3" json:"placed_long_term_order_ids"`
	ExpiredStatefulOrderIds                 []OrderId `protobuf:"bytes,2,rep,name=expired_stateful_order_ids,json=expiredStatefulOrderIds,proto3" json:"expired_stateful_order_ids"`
	OrderIdsFilledInLastBlock               []OrderId `protobuf:"bytes,3,rep,name=order_ids_filled_in_last_block,json=orderIdsFilledInLastBlock,proto3" json:"order_ids_filled_in_last_block"`
	PlacedStatefulCancellationOrderIds      []OrderId `protobuf:"bytes,4,rep,name=placed_stateful_cancellation_order_ids,json=placedStatefulCancellationOrderIds,proto3" json:"placed_stateful_cancellation_order_ids"`
	RemovedStatefulOrderIds                 []OrderId `protobuf:"bytes,5,rep,name=removed_stateful_order_ids,json=removedStatefulOrderIds,proto3" json:"removed_stateful_order_ids"`
	ConditionalOrderIdsTriggeredInLastBlock []OrderId `protobuf:"bytes,6,rep,name=conditional_order_ids_triggered_in_last_block,json=conditionalOrderIdsTriggeredInLastBlock,proto3" json:"conditional_order_ids_triggered_in_last_block"`
	PlacedConditionalOrderIds               []OrderId `protobuf:"bytes,7,rep,name=placed_conditional_order_ids,json=placedConditionalOrderIds,proto3" json:"placed_conditional_order_ids"`
	BlockHeight                             uint32    `protobuf:"varint,8,opt,name=block_height,json=blockHeight,proto3" json:"block_height,omitempty"`
}

func (m *ProcessProposerMatchesEvents) Reset()         { *m = ProcessProposerMatchesEvents{} }
func (m *ProcessProposerMatchesEvents) String() string { return proto.CompactTextString(m) }
func (*ProcessProposerMatchesEvents) ProtoMessage()    {}
func (*ProcessProposerMatchesEvents) Descriptor() ([]byte, []int) {
	return fileDescriptor_4626e94e6961a770, []int{0}
}
func (m *ProcessProposerMatchesEvents) XXX_Unmarshal(b []byte) error {
	return m.Unmarshal(b)
}
func (m *ProcessProposerMatchesEvents) XXX_Marshal(b []byte, deterministic bool) ([]byte, error) {
	if deterministic {
		return xxx_messageInfo_ProcessProposerMatchesEvents.Marshal(b, m, deterministic)
	} else {
		b = b[:cap(b)]
		n, err := m.MarshalToSizedBuffer(b)
		if err != nil {
			return nil, err
		}
		return b[:n], nil
	}
}
func (m *ProcessProposerMatchesEvents) XXX_Merge(src proto.Message) {
	xxx_messageInfo_ProcessProposerMatchesEvents.Merge(m, src)
}
func (m *ProcessProposerMatchesEvents) XXX_Size() int {
	return m.Size()
}
func (m *ProcessProposerMatchesEvents) XXX_DiscardUnknown() {
	xxx_messageInfo_ProcessProposerMatchesEvents.DiscardUnknown(m)
}

var xxx_messageInfo_ProcessProposerMatchesEvents proto.InternalMessageInfo

func (m *ProcessProposerMatchesEvents) GetPlacedLongTermOrderIds() []OrderId {
	if m != nil {
		return m.PlacedLongTermOrderIds
	}
	return nil
}

func (m *ProcessProposerMatchesEvents) GetExpiredStatefulOrderIds() []OrderId {
	if m != nil {
		return m.ExpiredStatefulOrderIds
	}
	return nil
}

func (m *ProcessProposerMatchesEvents) GetOrderIdsFilledInLastBlock() []OrderId {
	if m != nil {
		return m.OrderIdsFilledInLastBlock
	}
	return nil
}

func (m *ProcessProposerMatchesEvents) GetPlacedStatefulCancellationOrderIds() []OrderId {
	if m != nil {
		return m.PlacedStatefulCancellationOrderIds
	}
	return nil
}

func (m *ProcessProposerMatchesEvents) GetRemovedStatefulOrderIds() []OrderId {
	if m != nil {
		return m.RemovedStatefulOrderIds
	}
	return nil
}

func (m *ProcessProposerMatchesEvents) GetConditionalOrderIdsTriggeredInLastBlock() []OrderId {
	if m != nil {
		return m.ConditionalOrderIdsTriggeredInLastBlock
	}
	return nil
}

func (m *ProcessProposerMatchesEvents) GetPlacedConditionalOrderIds() []OrderId {
	if m != nil {
		return m.PlacedConditionalOrderIds
	}
	return nil
}

func (m *ProcessProposerMatchesEvents) GetBlockHeight() uint32 {
	if m != nil {
		return m.BlockHeight
	}
	return 0
}

func init() {
	proto.RegisterType((*ProcessProposerMatchesEvents)(nil), "dydxprotocol.clob.ProcessProposerMatchesEvents")
}

func init() {
	proto.RegisterFile("dydxprotocol/clob/process_proposer_matches_events.proto", fileDescriptor_4626e94e6961a770)
}

var fileDescriptor_4626e94e6961a770 = []byte{
	// 462 bytes of a gzipped FileDescriptorProto
	0x1f, 0x8b, 0x08, 0x00, 0x00, 0x00, 0x00, 0x00, 0x02, 0xff, 0x8c, 0x93, 0x41, 0x6f, 0xd3, 0x30,
	0x14, 0xc7, 0x1b, 0x36, 0x0a, 0xf2, 0xe0, 0x40, 0x84, 0xa0, 0x44, 0x23, 0x8c, 0x1d, 0x60, 0x97,
	0x26, 0x12, 0x1c, 0xb8, 0x77, 0x30, 0x31, 0x69, 0x88, 0x6a, 0xdb, 0x09, 0x01, 0x96, 0x6b, 0xbf,
	0x25, 0x16, 0x8e, 0x5f, 0x64, 0x7b, 0x53, 0x77, 0xe3, 0x23, 0xf0, 0x09, 0xf8, 0x3c, 0x3b, 0xee,
	0xc8, 0x09, 0xa1, 0xf6, 0x8b, 0xa0, 0x38, 0x69, 0x15, 0x29, 0x3d, 0xe4, 0x16, 0xbd, 0xd8, 0xbf,
	0xdf, 0x7b, 0x7f, 0xeb, 0x91, 0x77, 0xe2, 0x5a, 0xcc, 0x4b, 0x83, 0x0e, 0x39, 0xaa, 0x94, 0x2b,
	0x9c, 0xa5, 0xa5, 0x41, 0x0e, 0xd6, 0xd2, 0xd2, 0x60, 0x89, 0x16, 0x0c, 0x2d, 0x98, 0xe3, 0x39,
	0x58, 0x0a, 0x57, 0xa0, 0x9d, 0x4d, 0xfc, 0xe9, 0xf0, 0x51, 0xfb, 0x62, 0x52, 0x5d, 0x8c, 0x1e,
	0x67, 0x98, 0xa1, 0x2f, 0xa5, 0xd5, 0x57, 0x7d, 0x30, 0x7a, 0xde, 0x35, 0xa0, 0x11, 0x60, 0xea,
	0xdf, 0xfb, 0xbf, 0x87, 0x64, 0x77, 0x5a, 0x1b, 0xa7, 0x8d, 0xf0, 0x53, 0xed, 0xfb, 0xe0, 0x75,
	0xe1, 0x57, 0x12, 0x95, 0x8a, 0x71, 0x10, 0x54, 0xa1, 0xce, 0xa8, 0x03, 0x53, 0x50, 0x0f, 0xa0,
	0x52, 0xd8, 0x51, 0xb0, 0xb7, 0x75, 0xb0, 0xf3, 0x26, 0x4a, 0x3a, 0xdd, 0x24, 0x9f, 0xab, 0x33,
	0xc7, 0x62, 0xb2, 0x7d, 0xf3, 0xf7, 0xc5, 0xe0, 0xf4, 0x49, 0xcd, 0x38, 0x41, 0x9d, 0x9d, 0x83,
	0x29, 0x9a, 0x9f, 0x36, 0xfc, 0x46, 0x22, 0x98, 0x97, 0xd2, 0x80, 0xa0, 0xd6, 0x31, 0x07, 0x17,
	0x97, 0xaa, 0x45, 0xbf, 0xd3, 0x93, 0xfe, 0xb4, 0x61, 0x9c, 0x35, 0x88, 0x35, 0x9e, 0x93, 0x78,
	0x4d, 0xa3, 0x17, 0x52, 0x29, 0x10, 0x54, 0x6a, 0xaa, 0x98, 0x75, 0x74, 0xa6, 0x90, 0xff, 0x18,
	0x6d, 0xf5, 0x54, 0x3c, 0xc3, 0x86, 0x79, 0xe4, 0x29, 0xc7, 0xfa, 0x84, 0x59, 0x37, 0xa9, 0x10,
	0xa1, 0x23, 0xaf, 0x9a, 0x84, 0xd6, 0x23, 0x70, 0xa6, 0x39, 0x28, 0xc5, 0x9c, 0x44, 0xdd, 0x9a,
	0x67, 0xbb, 0xa7, 0x6c, 0xbf, 0xe6, 0xad, 0xc6, 0x39, 0x6c, 0xd1, 0xda, 0xc9, 0x19, 0x28, 0xf0,
	0x6a, 0x73, 0x72, 0x77, 0xfb, 0x26, 0xd7, 0x30, 0x3a, 0xc9, 0xfd, 0x0c, 0xc8, 0x98, 0xa3, 0x16,
	0xb2, 0x92, 0xb2, 0x16, 0x9a, 0x3a, 0x23, 0xb3, 0x0c, 0x4c, 0x27, 0xc9, 0x61, 0x4f, 0xe5, 0xeb,
	0x16, 0x76, 0xa5, 0x3b, 0x5f, 0x31, 0xdb, 0xb9, 0x32, 0xb2, 0xdb, 0xe4, 0xba, 0xb1, 0x91, 0xd1,
	0xbd, 0xbe, 0x4f, 0x57, 0x53, 0x0e, 0xbb, 0xda, 0xf0, 0x25, 0x79, 0xe0, 0x9b, 0xa7, 0x39, 0xc8,
	0x2c, 0x77, 0xa3, 0xfb, 0x7b, 0xc1, 0xc1, 0xc3, 0xd3, 0x1d, 0x5f, 0xfb, 0xe8, 0x4b, 0x93, 0xef,
	0x37, 0x8b, 0x38, 0xb8, 0x5d, 0xc4, 0xc1, 0xbf, 0x45, 0x1c, 0xfc, 0x5a, 0xc6, 0x83, 0xdb, 0x65,
	0x3c, 0xf8, 0xb3, 0x8c, 0x07, 0x5f, 0xde, 0x67, 0xd2, 0xe5, 0x97, 0xb3, 0x84, 0x63, 0x91, 0x9e,
	0x39, 0x03, 0xac, 0x38, 0x92, 0xba, 0x7a, 0xaa, 0xf1, 0x74, 0xb5, 0x6e, 0xd6, 0x97, 0xc7, 0x3c,
	0x67, 0x52, 0xa7, 0xeb, 0x25, 0x9c, 0xd7, 0x6b, 0xe8, 0xae, 0x4b, 0xb0, 0xb3, 0xa1, 0x2f, 0xbf,
	0xfd, 0x1f, 0x00, 0x00, 0xff, 0xff, 0x27, 0x93, 0xb7, 0x8d, 0x0a, 0x04, 0x00, 0x00,
}

func (m *ProcessProposerMatchesEvents) Marshal() (dAtA []byte, err error) {
	size := m.Size()
	dAtA = make([]byte, size)
	n, err := m.MarshalToSizedBuffer(dAtA[:size])
	if err != nil {
		return nil, err
	}
	return dAtA[:n], nil
}

func (m *ProcessProposerMatchesEvents) MarshalTo(dAtA []byte) (int, error) {
	size := m.Size()
	return m.MarshalToSizedBuffer(dAtA[:size])
}

func (m *ProcessProposerMatchesEvents) MarshalToSizedBuffer(dAtA []byte) (int, error) {
	i := len(dAtA)
	_ = i
	var l int
	_ = l
	if m.BlockHeight != 0 {
		i = encodeVarintProcessProposerMatchesEvents(dAtA, i, uint64(m.BlockHeight))
		i--
		dAtA[i] = 0x40
	}
	if len(m.PlacedConditionalOrderIds) > 0 {
		for iNdEx := len(m.PlacedConditionalOrderIds) - 1; iNdEx >= 0; iNdEx-- {
			{
				size, err := m.PlacedConditionalOrderIds[iNdEx].MarshalToSizedBuffer(dAtA[:i])
				if err != nil {
					return 0, err
				}
				i -= size
				i = encodeVarintProcessProposerMatchesEvents(dAtA, i, uint64(size))
			}
			i--
			dAtA[i] = 0x3a
		}
	}
	if len(m.ConditionalOrderIdsTriggeredInLastBlock) > 0 {
		for iNdEx := len(m.ConditionalOrderIdsTriggeredInLastBlock) - 1; iNdEx >= 0; iNdEx-- {
			{
				size, err := m.ConditionalOrderIdsTriggeredInLastBlock[iNdEx].MarshalToSizedBuffer(dAtA[:i])
				if err != nil {
					return 0, err
				}
				i -= size
				i = encodeVarintProcessProposerMatchesEvents(dAtA, i, uint64(size))
			}
			i--
			dAtA[i] = 0x32
		}
	}
	if len(m.RemovedStatefulOrderIds) > 0 {
		for iNdEx := len(m.RemovedStatefulOrderIds) - 1; iNdEx >= 0; iNdEx-- {
			{
				size, err := m.RemovedStatefulOrderIds[iNdEx].MarshalToSizedBuffer(dAtA[:i])
				if err != nil {
					return 0, err
				}
				i -= size
				i = encodeVarintProcessProposerMatchesEvents(dAtA, i, uint64(size))
			}
			i--
			dAtA[i] = 0x2a
		}
	}
	if len(m.PlacedStatefulCancellationOrderIds) > 0 {
		for iNdEx := len(m.PlacedStatefulCancellationOrderIds) - 1; iNdEx >= 0; iNdEx-- {
			{
				size, err := m.PlacedStatefulCancellationOrderIds[iNdEx].MarshalToSizedBuffer(dAtA[:i])
				if err != nil {
					return 0, err
				}
				i -= size
				i = encodeVarintProcessProposerMatchesEvents(dAtA, i, uint64(size))
			}
			i--
			dAtA[i] = 0x22
		}
	}
	if len(m.OrderIdsFilledInLastBlock) > 0 {
		for iNdEx := len(m.OrderIdsFilledInLastBlock) - 1; iNdEx >= 0; iNdEx-- {
			{
				size, err := m.OrderIdsFilledInLastBlock[iNdEx].MarshalToSizedBuffer(dAtA[:i])
				if err != nil {
					return 0, err
				}
				i -= size
				i = encodeVarintProcessProposerMatchesEvents(dAtA, i, uint64(size))
			}
			i--
			dAtA[i] = 0x1a
		}
	}
	if len(m.ExpiredStatefulOrderIds) > 0 {
		for iNdEx := len(m.ExpiredStatefulOrderIds) - 1; iNdEx >= 0; iNdEx-- {
			{
				size, err := m.ExpiredStatefulOrderIds[iNdEx].MarshalToSizedBuffer(dAtA[:i])
				if err != nil {
					return 0, err
				}
				i -= size
				i = encodeVarintProcessProposerMatchesEvents(dAtA, i, uint64(size))
			}
			i--
			dAtA[i] = 0x12
		}
	}
	if len(m.PlacedLongTermOrderIds) > 0 {
		for iNdEx := len(m.PlacedLongTermOrderIds) - 1; iNdEx >= 0; iNdEx-- {
			{
				size, err := m.PlacedLongTermOrderIds[iNdEx].MarshalToSizedBuffer(dAtA[:i])
				if err != nil {
					return 0, err
				}
				i -= size
				i = encodeVarintProcessProposerMatchesEvents(dAtA, i, uint64(size))
			}
			i--
			dAtA[i] = 0xa
		}
	}
	return len(dAtA) - i, nil
}

func encodeVarintProcessProposerMatchesEvents(dAtA []byte, offset int, v uint64) int {
	offset -= sovProcessProposerMatchesEvents(v)
	base := offset
	for v >= 1<<7 {
		dAtA[offset] = uint8(v&0x7f | 0x80)
		v >>= 7
		offset++
	}
	dAtA[offset] = uint8(v)
	return base
}
func (m *ProcessProposerMatchesEvents) Size() (n int) {
	if m == nil {
		return 0
	}
	var l int
	_ = l
	if len(m.PlacedLongTermOrderIds) > 0 {
		for _, e := range m.PlacedLongTermOrderIds {
			l = e.Size()
			n += 1 + l + sovProcessProposerMatchesEvents(uint64(l))
		}
	}
	if len(m.ExpiredStatefulOrderIds) > 0 {
		for _, e := range m.ExpiredStatefulOrderIds {
			l = e.Size()
			n += 1 + l + sovProcessProposerMatchesEvents(uint64(l))
		}
	}
	if len(m.OrderIdsFilledInLastBlock) > 0 {
		for _, e := range m.OrderIdsFilledInLastBlock {
			l = e.Size()
			n += 1 + l + sovProcessProposerMatchesEvents(uint64(l))
		}
	}
	if len(m.PlacedStatefulCancellationOrderIds) > 0 {
		for _, e := range m.PlacedStatefulCancellationOrderIds {
			l = e.Size()
			n += 1 + l + sovProcessProposerMatchesEvents(uint64(l))
		}
	}
	if len(m.RemovedStatefulOrderIds) > 0 {
		for _, e := range m.RemovedStatefulOrderIds {
			l = e.Size()
			n += 1 + l + sovProcessProposerMatchesEvents(uint64(l))
		}
	}
	if len(m.ConditionalOrderIdsTriggeredInLastBlock) > 0 {
		for _, e := range m.ConditionalOrderIdsTriggeredInLastBlock {
			l = e.Size()
			n += 1 + l + sovProcessProposerMatchesEvents(uint64(l))
		}
	}
	if len(m.PlacedConditionalOrderIds) > 0 {
		for _, e := range m.PlacedConditionalOrderIds {
			l = e.Size()
			n += 1 + l + sovProcessProposerMatchesEvents(uint64(l))
		}
	}
	if m.BlockHeight != 0 {
		n += 1 + sovProcessProposerMatchesEvents(uint64(m.BlockHeight))
	}
	return n
}

func sovProcessProposerMatchesEvents(x uint64) (n int) {
	return (math_bits.Len64(x|1) + 6) / 7
}
func sozProcessProposerMatchesEvents(x uint64) (n int) {
	return sovProcessProposerMatchesEvents(uint64((x << 1) ^ uint64((int64(x) >> 63))))
}
func (m *ProcessProposerMatchesEvents) Unmarshal(dAtA []byte) error {
	l := len(dAtA)
	iNdEx := 0
	for iNdEx < l {
		preIndex := iNdEx
		var wire uint64
		for shift := uint(0); ; shift += 7 {
			if shift >= 64 {
				return ErrIntOverflowProcessProposerMatchesEvents
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
			return fmt.Errorf("proto: ProcessProposerMatchesEvents: wiretype end group for non-group")
		}
		if fieldNum <= 0 {
			return fmt.Errorf("proto: ProcessProposerMatchesEvents: illegal tag %d (wire type %d)", fieldNum, wire)
		}
		switch fieldNum {
		case 1:
			if wireType != 2 {
				return fmt.Errorf("proto: wrong wireType = %d for field PlacedLongTermOrderIds", wireType)
			}
			var msglen int
			for shift := uint(0); ; shift += 7 {
				if shift >= 64 {
					return ErrIntOverflowProcessProposerMatchesEvents
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
				return ErrInvalidLengthProcessProposerMatchesEvents
			}
			postIndex := iNdEx + msglen
			if postIndex < 0 {
				return ErrInvalidLengthProcessProposerMatchesEvents
			}
			if postIndex > l {
				return io.ErrUnexpectedEOF
			}
			m.PlacedLongTermOrderIds = append(m.PlacedLongTermOrderIds, OrderId{})
			if err := m.PlacedLongTermOrderIds[len(m.PlacedLongTermOrderIds)-1].Unmarshal(dAtA[iNdEx:postIndex]); err != nil {
				return err
			}
			iNdEx = postIndex
		case 2:
			if wireType != 2 {
				return fmt.Errorf("proto: wrong wireType = %d for field ExpiredStatefulOrderIds", wireType)
			}
			var msglen int
			for shift := uint(0); ; shift += 7 {
				if shift >= 64 {
					return ErrIntOverflowProcessProposerMatchesEvents
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
				return ErrInvalidLengthProcessProposerMatchesEvents
			}
			postIndex := iNdEx + msglen
			if postIndex < 0 {
				return ErrInvalidLengthProcessProposerMatchesEvents
			}
			if postIndex > l {
				return io.ErrUnexpectedEOF
			}
			m.ExpiredStatefulOrderIds = append(m.ExpiredStatefulOrderIds, OrderId{})
			if err := m.ExpiredStatefulOrderIds[len(m.ExpiredStatefulOrderIds)-1].Unmarshal(dAtA[iNdEx:postIndex]); err != nil {
				return err
			}
			iNdEx = postIndex
		case 3:
			if wireType != 2 {
				return fmt.Errorf("proto: wrong wireType = %d for field OrderIdsFilledInLastBlock", wireType)
			}
			var msglen int
			for shift := uint(0); ; shift += 7 {
				if shift >= 64 {
					return ErrIntOverflowProcessProposerMatchesEvents
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
				return ErrInvalidLengthProcessProposerMatchesEvents
			}
			postIndex := iNdEx + msglen
			if postIndex < 0 {
				return ErrInvalidLengthProcessProposerMatchesEvents
			}
			if postIndex > l {
				return io.ErrUnexpectedEOF
			}
			m.OrderIdsFilledInLastBlock = append(m.OrderIdsFilledInLastBlock, OrderId{})
			if err := m.OrderIdsFilledInLastBlock[len(m.OrderIdsFilledInLastBlock)-1].Unmarshal(dAtA[iNdEx:postIndex]); err != nil {
				return err
			}
			iNdEx = postIndex
		case 4:
			if wireType != 2 {
				return fmt.Errorf("proto: wrong wireType = %d for field PlacedStatefulCancellationOrderIds", wireType)
			}
			var msglen int
			for shift := uint(0); ; shift += 7 {
				if shift >= 64 {
					return ErrIntOverflowProcessProposerMatchesEvents
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
				return ErrInvalidLengthProcessProposerMatchesEvents
			}
			postIndex := iNdEx + msglen
			if postIndex < 0 {
				return ErrInvalidLengthProcessProposerMatchesEvents
			}
			if postIndex > l {
				return io.ErrUnexpectedEOF
			}
			m.PlacedStatefulCancellationOrderIds = append(m.PlacedStatefulCancellationOrderIds, OrderId{})
			if err := m.PlacedStatefulCancellationOrderIds[len(m.PlacedStatefulCancellationOrderIds)-1].Unmarshal(dAtA[iNdEx:postIndex]); err != nil {
				return err
			}
			iNdEx = postIndex
		case 5:
			if wireType != 2 {
				return fmt.Errorf("proto: wrong wireType = %d for field RemovedStatefulOrderIds", wireType)
			}
			var msglen int
			for shift := uint(0); ; shift += 7 {
				if shift >= 64 {
					return ErrIntOverflowProcessProposerMatchesEvents
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
				return ErrInvalidLengthProcessProposerMatchesEvents
			}
			postIndex := iNdEx + msglen
			if postIndex < 0 {
				return ErrInvalidLengthProcessProposerMatchesEvents
			}
			if postIndex > l {
				return io.ErrUnexpectedEOF
			}
			m.RemovedStatefulOrderIds = append(m.RemovedStatefulOrderIds, OrderId{})
			if err := m.RemovedStatefulOrderIds[len(m.RemovedStatefulOrderIds)-1].Unmarshal(dAtA[iNdEx:postIndex]); err != nil {
				return err
			}
			iNdEx = postIndex
		case 6:
			if wireType != 2 {
				return fmt.Errorf("proto: wrong wireType = %d for field ConditionalOrderIdsTriggeredInLastBlock", wireType)
			}
			var msglen int
			for shift := uint(0); ; shift += 7 {
				if shift >= 64 {
					return ErrIntOverflowProcessProposerMatchesEvents
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
				return ErrInvalidLengthProcessProposerMatchesEvents
			}
			postIndex := iNdEx + msglen
			if postIndex < 0 {
				return ErrInvalidLengthProcessProposerMatchesEvents
			}
			if postIndex > l {
				return io.ErrUnexpectedEOF
			}
			m.ConditionalOrderIdsTriggeredInLastBlock = append(m.ConditionalOrderIdsTriggeredInLastBlock, OrderId{})
			if err := m.ConditionalOrderIdsTriggeredInLastBlock[len(m.ConditionalOrderIdsTriggeredInLastBlock)-1].Unmarshal(dAtA[iNdEx:postIndex]); err != nil {
				return err
			}
			iNdEx = postIndex
		case 7:
			if wireType != 2 {
				return fmt.Errorf("proto: wrong wireType = %d for field PlacedConditionalOrderIds", wireType)
			}
			var msglen int
			for shift := uint(0); ; shift += 7 {
				if shift >= 64 {
					return ErrIntOverflowProcessProposerMatchesEvents
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
				return ErrInvalidLengthProcessProposerMatchesEvents
			}
			postIndex := iNdEx + msglen
			if postIndex < 0 {
				return ErrInvalidLengthProcessProposerMatchesEvents
			}
			if postIndex > l {
				return io.ErrUnexpectedEOF
			}
			m.PlacedConditionalOrderIds = append(m.PlacedConditionalOrderIds, OrderId{})
			if err := m.PlacedConditionalOrderIds[len(m.PlacedConditionalOrderIds)-1].Unmarshal(dAtA[iNdEx:postIndex]); err != nil {
				return err
			}
			iNdEx = postIndex
		case 8:
			if wireType != 0 {
				return fmt.Errorf("proto: wrong wireType = %d for field BlockHeight", wireType)
			}
			m.BlockHeight = 0
			for shift := uint(0); ; shift += 7 {
				if shift >= 64 {
					return ErrIntOverflowProcessProposerMatchesEvents
				}
				if iNdEx >= l {
					return io.ErrUnexpectedEOF
				}
				b := dAtA[iNdEx]
				iNdEx++
				m.BlockHeight |= uint32(b&0x7F) << shift
				if b < 0x80 {
					break
				}
			}
		default:
			iNdEx = preIndex
			skippy, err := skipProcessProposerMatchesEvents(dAtA[iNdEx:])
			if err != nil {
				return err
			}
			if (skippy < 0) || (iNdEx+skippy) < 0 {
				return ErrInvalidLengthProcessProposerMatchesEvents
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
func skipProcessProposerMatchesEvents(dAtA []byte) (n int, err error) {
	l := len(dAtA)
	iNdEx := 0
	depth := 0
	for iNdEx < l {
		var wire uint64
		for shift := uint(0); ; shift += 7 {
			if shift >= 64 {
				return 0, ErrIntOverflowProcessProposerMatchesEvents
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
					return 0, ErrIntOverflowProcessProposerMatchesEvents
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
					return 0, ErrIntOverflowProcessProposerMatchesEvents
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
				return 0, ErrInvalidLengthProcessProposerMatchesEvents
			}
			iNdEx += length
		case 3:
			depth++
		case 4:
			if depth == 0 {
				return 0, ErrUnexpectedEndOfGroupProcessProposerMatchesEvents
			}
			depth--
		case 5:
			iNdEx += 4
		default:
			return 0, fmt.Errorf("proto: illegal wireType %d", wireType)
		}
		if iNdEx < 0 {
			return 0, ErrInvalidLengthProcessProposerMatchesEvents
		}
		if depth == 0 {
			return iNdEx, nil
		}
	}
	return 0, io.ErrUnexpectedEOF
}

var (
	ErrInvalidLengthProcessProposerMatchesEvents        = fmt.Errorf("proto: negative length found during unmarshaling")
	ErrIntOverflowProcessProposerMatchesEvents          = fmt.Errorf("proto: integer overflow")
	ErrUnexpectedEndOfGroupProcessProposerMatchesEvents = fmt.Errorf("proto: unexpected end of group")
)
