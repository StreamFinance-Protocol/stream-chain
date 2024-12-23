import { logger } from '@klyraprotocol-indexer/base';
import {
  CollateralPoolUpsertEvent,
  IndexerTendermintEvent,
} from '@klyraprotocol-indexer/v4-protos';

import { Validator } from './validator';
import { CollateralPoolCreationHandler } from '../handlers/collateral-pool-handler';
import { Handler } from '../handlers/handler';

export class CollateralPoolValidator extends Validator<CollateralPoolUpsertEvent> {
  public validate(): void {
    if (this.event.maxCumulativeInsuranceFundDeltaPerBlock === undefined) {
      logger.error({
        at: `${this.constructor.name}#validate`,
        message:
          'CollateralPoolUpsertEvent maxCumulativeInsuranceFundDeltaPerBlock is not populated',
        blockHeight: this.block.height,
        event: this.event,
      });
    }

    if (this.event.multiCollateralAssets.length === 0) {
      return this.logAndThrowParseMessageError(
        'CollateralPoolUpsertEvent multiCollateralAssets is not populated',
        { event: this.event }
      );
    }

    if (this.event.quoteAssetId === undefined) {
      return this.logAndThrowParseMessageError(
        'CollateralPoolUpsertEvent quoteAssetId is not populated',
        { event: this.event }
      );
    }
  }

  public createHandlers(
    indexerTendermintEvent: IndexerTendermintEvent,
    txId: number,
    _: string
  ): Handler<CollateralPoolUpsertEvent>[] {
    const handler: Handler<CollateralPoolUpsertEvent> =
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
