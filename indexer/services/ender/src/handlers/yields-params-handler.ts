import { UpdateYieldsParamsEventV1 } from '@klyraprotocol-indexer/v4-protos';
import * as pg from 'pg';

import { Handler } from './handler';
import { ConsolidatedKafkaEvent } from '../lib/types';

export class YieldsParamsHandler extends Handler<UpdateYieldsParamsEventV1> {
  eventType: string = 'UpdateYieldsParamsEvent';

  public getParallelizationIds(): string[] {
    return [];
  }

  public async internalHandle(_resultRow: pg.QueryResultRow): Promise<ConsolidatedKafkaEvent[]> {
    return Promise.resolve(this.generateKafkaEvents());
  }

  /** Generates a kafka websocket event for yieldsParams.
   *
   * @param yieldsParams
   * @protected
   */
  protected generateKafkaEvents(): ConsolidatedKafkaEvent[] {
    // TODO: [YBCP-28] Consider adding a websocket message for updated yields params
    return [];
  }
}
