import { IChainPlaceOrder, Klyra, WebSocketMessage } from '@klyra/core';

// Internal imports
import { defaultOrder } from './constants';
import { OrderDetails } from './types';

export async function sleep(milliseconds: number): Promise<void> {
  return new Promise((resolve) => setTimeout(resolve, milliseconds));
}

export function createModifiedOrder(order: OrderDetails): IChainPlaceOrder {
  const modifiedOrder: IChainPlaceOrder = defaultOrder;
  modifiedOrder.clientId = Math.floor(Math.random() * 1000000000);
  modifiedOrder.goodTilBlock = 0;
  modifiedOrder.clobPairId = order.clobPairId;
  modifiedOrder.timeInForce = order.timeInForce;
  modifiedOrder.reduceOnly = false;
  modifiedOrder.orderFlags = order.orderFlags;
  modifiedOrder.side = order.side;
  modifiedOrder.quantums = BigInt(order.quantums);
  modifiedOrder.subticks = BigInt(order.subticks);
  modifiedOrder.routerFeePpm = 0;
  return modifiedOrder;
}
export function connectAndValidateSocketClient(
  validateMessage: Function,
  klyra: Klyra,
): void {
  // TODO: Implement this
  klyra.enableWebsocket();
  klyra.onWebsocketMessage((message: WebSocketMessage<unknown>) => {
    validateMessage(message.contents, klyra);
  });
  // const mySocket = new SocketClient(
  //   Network.local().indexerConfig,
  //   () => {},
  //   () => {},
  //   (message) => {
  //     if (typeof message.data === "string") {
  //       const data = JSON.parse(message.data as string);
  //       validateMessage(data, mySocket);
  //     }
  //   }
  // );
  // mySocket.connect();
}
