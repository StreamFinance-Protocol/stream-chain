import {
  IndexerTendermintEvent,
  UpdateYieldsParamsEventV1,
} from '@klyraprotocol-indexer/v4-protos';

import { Validator } from './validator';
import { Handler } from '../handlers/handler';
import { YieldsParamsHandler } from '../handlers/yields-params-handler';

export class YieldsParamsValidator extends Validator<UpdateYieldsParamsEventV1> {
  public validate(): void {

    if (this.event.assetYieldsIndex === undefined || this.event.assetYieldsIndex === '') {
      return this.logAndThrowParseMessageError(
        'UpdateYieldsParamsEvent must have an assetYieldsIndex that is defined and non-empty',
        { event: this.event },
      );
    }

    if (this.event.sdaiPrice === undefined || this.event.sdaiPrice === '') {
      return this.logAndThrowParseMessageError(
        'UpdateYieldsParamsEvent must have an sDAIPrice that is defined and non-empty',
        { event: this.event },
      );
    }
  }

  public createHandlers(
    indexerTendermintEvent: IndexerTendermintEvent,
    txId: number,
    _: string,
  ): Handler<UpdateYieldsParamsEventV1>[] {
    return [
      new YieldsParamsHandler(
        this.block,
        this.blockEventIndex,
        indexerTendermintEvent,
        txId,
        this.event,
      ),
    ];
  }
}
