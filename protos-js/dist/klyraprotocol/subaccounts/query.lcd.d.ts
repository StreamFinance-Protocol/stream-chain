import { LCDClient } from "@cosmology/lcd";
import { QueryGetSubaccountRequest, QuerySubaccountResponseSDKType, QueryAllSubaccountRequest, QuerySubaccountAllResponseSDKType, QueryGetWithdrawalAndTransfersBlockedInfoRequest, QueryGetWithdrawalAndTransfersBlockedInfoResponseSDKType, QueryCollateralPoolAddressRequest, QueryCollateralPoolAddressResponseSDKType } from "./query";
export declare class LCDQueryClient {
    req: LCDClient;
    constructor({ requestClient }: {
        requestClient: LCDClient;
    });
    subaccount(params: QueryGetSubaccountRequest): Promise<QuerySubaccountResponseSDKType>;
    subaccountAll(params?: QueryAllSubaccountRequest): Promise<QuerySubaccountAllResponseSDKType>;
    getWithdrawalAndTransfersBlockedInfo(params: QueryGetWithdrawalAndTransfersBlockedInfoRequest): Promise<QueryGetWithdrawalAndTransfersBlockedInfoResponseSDKType>;
    collateralPoolAddress(params: QueryCollateralPoolAddressRequest): Promise<QueryCollateralPoolAddressResponseSDKType>;
}
