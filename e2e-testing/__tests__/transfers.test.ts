import {
  BECH32_PREFIX, Klyra, LocalWallet, WalletSubaccountInfo, MessageChannel,
} from '@klyra/core';
import {
  Ordering,
  SubaccountTable,
  TransferColumns,
  TransferFromDatabase,
  TransferTable,
} from '@klyraprotocol-indexer/postgres';
import * as utils from './helpers/utils';
import { KLYRA_LOCAL_ADDRESS, KLYRA_LOCAL_MNEMONIC } from './helpers/constants';
import { connectAndValidateSocketClient } from './helpers/utils';
import { getKlyra } from './helpers/init';

describe('transfers', () => {
  it('test deposit', async () => {
    const klyra = await getKlyra();
    connectAndValidateSocketClient(validateTransfers, klyra);
    const wallet = await LocalWallet.fromMnemonic(
      KLYRA_LOCAL_MNEMONIC,
      BECH32_PREFIX,
    );

    const indexerClient = klyra.chainClient.indexerClient;
    const { height } = await indexerClient.utils.getHeight();

    const subaccount = new WalletSubaccountInfo(wallet, 0);
    // eslint-disable-next-line no-console
    console.log(subaccount);

    // Check TDAI asset position before
    let assetPosResp = await indexerClient.account.getSubaccountAssetPositions({
      address: KLYRA_LOCAL_ADDRESS,
      subaccountNumber: 0,
    });
    expect(assetPosResp).not.toBeNull();
    const positions = assetPosResp.positions;
    const tdaiPositionSizeBefore = positions.length !== undefined && positions.length > 0
      ? positions[0].size
      : '0';

    // Deposit
    await klyra.chainClient.nodeClient.post.deposit(subaccount, 0, BigInt(10_000_000));

    // TODO(IND-547): investigate deterministically advancing network height
    await utils.sleep(10000); // wait 10s for deposit to complete
    const defaultSubaccountId: string = SubaccountTable.uuid(
      wallet.getAddress(),
      0,
    );

    // Check DB
    const transfers: TransferFromDatabase[] = await TransferTable.findAllToOrFromSubaccountId(
      {
        subaccountId: [defaultSubaccountId],
        createdAfterHeight: height.toString(),
      },
      [],
      {
        orderBy: [[TransferColumns.id, Ordering.ASC]],
      },
    );

    expect(transfers.length).toEqual(1);
    expect(transfers[0]).toEqual(
      expect.objectContaining({
        recipientSubaccountId: defaultSubaccountId,
        senderWalletAddress: wallet.getAddress(),
        size: '10',
      }),
    );

    // Check API /v4/transfers endpoint
    const response = await indexerClient.account.getSubaccountTransfers({
      address: KLYRA_LOCAL_ADDRESS,
      subaccountNumber: 0,
    });
    expect(response).not.toBeNull();
    const transfersFromApi = response.transfers;
    expect(transfersFromApi).not.toBeNull();
    const transfer: any = transfersFromApi[0];
    expect(transfer).toEqual(
      expect.objectContaining({
        sender: {
          address: wallet.getAddress(),
        },
        recipient: {
          address: wallet.getAddress(),
          subaccountNumber: 0,
        },
        size: '10',
        symbol: 'TDAI',
        type: 'DEPOSIT',
      }),
    );

    // Check API /v4/assetPositions endpoint
    assetPosResp = await indexerClient.account.getSubaccountAssetPositions({
      address: KLYRA_LOCAL_ADDRESS,
      subaccountNumber: 0,
    });
    expect(assetPosResp).not.toBeNull();
    const tdaiPositionSizeAfter = assetPosResp.positions[0].size;
    // expect tdaiPositionSizeAfter to be tdaiPositionSizeBefore + 10
    expect(tdaiPositionSizeAfter).toEqual(
      (Number(tdaiPositionSizeBefore) + 10).toString(),
    );
  });

  function validateTransfers(data: any, klyra: Klyra): void {
    klyra.enableWebsocket();
    if (data.type === 'connected') {
      klyra.subscribeToWebSocketChannel(MessageChannel.PARENT_SUBACCOUNTS, `${KLYRA_LOCAL_ADDRESS}/0`);
    } else if (data.type === 'subscribed') {
      expect(data.channel).toEqual('v4_parent_subaccounts');
      expect(data.id).toEqual(`${KLYRA_LOCAL_ADDRESS}/0`);
      expect(data.contents.subaccount).toEqual(
        expect.objectContaining({
          address: KLYRA_LOCAL_ADDRESS,
          subaccountNumber: 0,
        }),
      );
    } else if (data.type === 'channel_data' && data.contents.transfers) {
      expect(data.contents.transfers).toEqual(
        expect.objectContaining({
          sender: {
            address: KLYRA_LOCAL_ADDRESS,
          },
          recipient: {
            address: KLYRA_LOCAL_ADDRESS,
            subaccountNumber: 0,
          },
          size: '10',
          symbol: 'TDAI',
          type: 'DEPOSIT',
        }),
      );
    }
  }
});
