import * as _1 from "./cosmos";
export declare const cosmos_proto: {
    scalarTypeFromJSON(object: any): _1.ScalarType;
    scalarTypeToJSON(object: _1.ScalarType): string;
    ScalarType: typeof _1.ScalarType;
    ScalarTypeSDKType: typeof _1.ScalarType;
    ScalarTypeAmino: typeof _1.ScalarType;
    InterfaceDescriptor: {
        typeUrl: string;
        is(o: any): o is _1.InterfaceDescriptor;
        isSDK(o: any): o is _1.InterfaceDescriptorSDKType;
        isAmino(o: any): o is _1.InterfaceDescriptorAmino;
        encode(message: _1.InterfaceDescriptor, writer?: import("..").BinaryWriter): import("..").BinaryWriter;
        decode(input: import("..").BinaryReader | Uint8Array, length?: number): _1.InterfaceDescriptor;
        fromPartial(object: Partial<_1.InterfaceDescriptor>): _1.InterfaceDescriptor;
        fromAmino(object: _1.InterfaceDescriptorAmino): _1.InterfaceDescriptor;
        toAmino(message: _1.InterfaceDescriptor): _1.InterfaceDescriptorAmino;
        fromAminoMsg(object: _1.InterfaceDescriptorAminoMsg): _1.InterfaceDescriptor;
        fromProtoMsg(message: _1.InterfaceDescriptorProtoMsg): _1.InterfaceDescriptor;
        toProto(message: _1.InterfaceDescriptor): Uint8Array;
        toProtoMsg(message: _1.InterfaceDescriptor): _1.InterfaceDescriptorProtoMsg;
    };
    ScalarDescriptor: {
        typeUrl: string;
        is(o: any): o is _1.ScalarDescriptor;
        isSDK(o: any): o is _1.ScalarDescriptorSDKType;
        isAmino(o: any): o is _1.ScalarDescriptorAmino;
        encode(message: _1.ScalarDescriptor, writer?: import("..").BinaryWriter): import("..").BinaryWriter;
        decode(input: import("..").BinaryReader | Uint8Array, length?: number): _1.ScalarDescriptor;
        fromPartial(object: Partial<_1.ScalarDescriptor>): _1.ScalarDescriptor;
        fromAmino(object: _1.ScalarDescriptorAmino): _1.ScalarDescriptor;
        toAmino(message: _1.ScalarDescriptor): _1.ScalarDescriptorAmino;
        fromAminoMsg(object: _1.ScalarDescriptorAminoMsg): _1.ScalarDescriptor;
        fromProtoMsg(message: _1.ScalarDescriptorProtoMsg): _1.ScalarDescriptor;
        toProto(message: _1.ScalarDescriptor): Uint8Array;
        toProtoMsg(message: _1.ScalarDescriptor): _1.ScalarDescriptorProtoMsg;
    };
};
