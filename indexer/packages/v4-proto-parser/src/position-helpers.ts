import {
  IndexerAssetPosition,
  IndexerPerpetualPosition,
} from '@klyraprotocol-indexer/v4-protos';

import {
  bytesToBigInt,
} from './bytes-helpers';

export function getPositionIsLong(
  position: IndexerAssetPosition | IndexerPerpetualPosition,
): boolean {
  return bytesToBigInt(position.quantums) > 0;
}
