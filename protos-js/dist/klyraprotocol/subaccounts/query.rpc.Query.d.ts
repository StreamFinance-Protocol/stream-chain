import { Rpc } from "../../helpers";
import { QueryClient } from "@cosmjs/stargate";
import { QueryGetSubaccountRequest, QuerySubaccountResponse, QueryAllSubaccountRequest, QuerySubaccountAllResponse, QueryGetWithdrawalAndTransfersBlockedInfoRequest, QueryGetWithdrawalAndTransfersBlockedInfoResponse, QueryCollateralPoolAddressRequest, QueryCollateralPoolAddressResponse } from "./query";
/** Query defines the gRPC querier service. */
export interface Query {
    /** Queries a Subaccount by id */
    subaccount(request: QueryGetSubaccountRequest): Promise<QuerySubaccountResponse>;
    /** Queries a list of Subaccount items. */
    subaccountAll(request?: QueryAllSubaccountRequest): Promise<QuerySubaccountAllResponse>;
    /**
     * Queries information about whether withdrawal and transfers are blocked, and
     * if so which block they are re-enabled on.
     */
    getWithdrawalAndTransfersBlockedInfo(request: QueryGetWithdrawalAndTransfersBlockedInfoRequest): Promise<QueryGetWithdrawalAndTransfersBlockedInfoResponse>;
    /** Queries the collateral pool account address for a perpetual id. */
    collateralPoolAddress(request: QueryCollateralPoolAddressRequest): Promise<QueryCollateralPoolAddressResponse>;
}
export declare class QueryClientImpl implements Query {
    private readonly rpc;
    constructor(rpc: Rpc);
    subaccount(request: QueryGetSubaccountRequest): Promise<QuerySubaccountResponse>;
    subaccountAll(request?: QueryAllSubaccountRequest): Promise<QuerySubaccountAllResponse>;
    getWithdrawalAndTransfersBlockedInfo(request: QueryGetWithdrawalAndTransfersBlockedInfoRequest): Promise<QueryGetWithdrawalAndTransfersBlockedInfoResponse>;
    collateralPoolAddress(request: QueryCollateralPoolAddressRequest): Promise<QueryCollateralPoolAddressResponse>;
}
export declare const createRpcQueryExtension: (base: QueryClient) => {
    subaccount(request: QueryGetSubaccountRequest): Promise<QuerySubaccountResponse>;
    subaccountAll(request?: QueryAllSubaccountRequest): Promise<QuerySubaccountAllResponse>;
    getWithdrawalAndTransfersBlockedInfo(request: QueryGetWithdrawalAndTransfersBlockedInfoRequest): Promise<QueryGetWithdrawalAndTransfersBlockedInfoResponse>;
    collateralPoolAddress(request: QueryCollateralPoolAddressRequest): Promise<QueryCollateralPoolAddressResponse>;
};
