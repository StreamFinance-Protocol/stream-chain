import Big from 'big.js';

export interface SubaccountTDaiTransferMap {
  [subaccountId: string]: Big;
}
export interface AthenaTableDDLQueries {
  generateRawTable: (tablePrefix: string, rdsExportIdentifier: string) => string;
  generateTable: (tablePrefix: string, add?: string) => string;
}
