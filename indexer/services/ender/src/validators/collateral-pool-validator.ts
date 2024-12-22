import { logger } from '@klyraprotocol-indexer/base';
import {
  CollateralPoolCreateEvent,
  IndexerTendermintEvent,
} from '@klyraprotocol-indexer/v4-protos';

import { Validator } from './validator';
import { CollateralPoolCreationHandler } from '../handlers/collateral-pool-handler';
import { Handler } from '../handlers/handler';

export class CollateralPoolValidator extends Validator<CollateralPoolCreateEvent> {
  public validate(): void {
    if (this.event.maxCumulativeInsuranceFundDeltaPerBlock === undefined) {
      logger.error({
        at: `${this.constructor.name}#validate`,
        message:
          'CollateralPoolCreateEvent maxCumulativeInsuranceFundDeltaPerBlock is not populated',
        blockHeight: this.block.height,
        event: this.event,
      });
    }

    if (this.event.multiCollateralAssets.length === 0) {
      return this.logAndThrowParseMessageError(
        'CollateralPoolCreateEvent multiCollateralAssets is not populated',
        { event: this.event }
      );
    }

    if (this.event.quoteAssetId === undefined) {
      return this.logAndThrowParseMessageError(
        'CollateralPoolCreateEvent quoteAssetId is not populated',
        { event: this.event }
      );
    }
  }

  public createHandlers(
    indexerTendermintEvent: IndexerTendermintEvent,
    txId: number,
    _: string
  ): Handler<CollateralPoolCreateEvent>[] {
    const handler: Handler<CollateralPoolCreateEvent> =
      new CollateralPoolCreationHandler(
        this.block,
        this.blockEventIndex,
        indexerTendermintEvent,
        txId,
        this.event
      );

    return [handler];
  }
}
