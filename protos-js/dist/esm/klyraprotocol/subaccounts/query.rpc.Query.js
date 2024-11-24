import { BinaryReader } from "../../binary";
import { createProtobufRpcClient } from "@cosmjs/stargate";
import { QueryGetSubaccountRequest, QuerySubaccountResponse, QueryAllSubaccountRequest, QuerySubaccountAllResponse, QueryGetWithdrawalAndTransfersBlockedInfoRequest, QueryGetWithdrawalAndTransfersBlockedInfoResponse, QueryCollateralPoolAddressRequest, QueryCollateralPoolAddressResponse } from "./query";
export class QueryClientImpl {
    rpc;
    constructor(rpc) {
        this.rpc = rpc;
        this.subaccount = this.subaccount.bind(this);
        this.subaccountAll = this.subaccountAll.bind(this);
        this.getWithdrawalAndTransfersBlockedInfo = this.getWithdrawalAndTransfersBlockedInfo.bind(this);
        this.collateralPoolAddress = this.collateralPoolAddress.bind(this);
    }
    subaccount(request) {
        const data = QueryGetSubaccountRequest.encode(request).finish();
        const promise = this.rpc.request("klyraprotocol.subaccounts.Query", "Subaccount", data);
        return promise.then(data => QuerySubaccountResponse.decode(new BinaryReader(data)));
    }
    subaccountAll(request = {
        pagination: undefined
    }) {
        const data = QueryAllSubaccountRequest.encode(request).finish();
        const promise = this.rpc.request("klyraprotocol.subaccounts.Query", "SubaccountAll", data);
        return promise.then(data => QuerySubaccountAllResponse.decode(new BinaryReader(data)));
    }
    getWithdrawalAndTransfersBlockedInfo(request) {
        const data = QueryGetWithdrawalAndTransfersBlockedInfoRequest.encode(request).finish();
        const promise = this.rpc.request("klyraprotocol.subaccounts.Query", "GetWithdrawalAndTransfersBlockedInfo", data);
        return promise.then(data => QueryGetWithdrawalAndTransfersBlockedInfoResponse.decode(new BinaryReader(data)));
    }
    collateralPoolAddress(request) {
        const data = QueryCollateralPoolAddressRequest.encode(request).finish();
        const promise = this.rpc.request("klyraprotocol.subaccounts.Query", "CollateralPoolAddress", data);
        return promise.then(data => QueryCollateralPoolAddressResponse.decode(new BinaryReader(data)));
    }
}
export const createRpcQueryExtension = (base) => {
    const rpc = createProtobufRpcClient(base);
    const queryService = new QueryClientImpl(rpc);
    return {
        subaccount(request) {
            return queryService.subaccount(request);
        },
        subaccountAll(request) {
            return queryService.subaccountAll(request);
        },
        getWithdrawalAndTransfersBlockedInfo(request) {
            return queryService.getWithdrawalAndTransfersBlockedInfo(request);
        },
        collateralPoolAddress(request) {
            return queryService.collateralPoolAddress(request);
        }
    };
};
