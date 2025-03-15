import { logger, ParseMessageError } from '@klyraprotocol-indexer/base';
import {
  IndexerTendermintBlock,
  IndexerTendermintEvent,
  UpdateYieldsParamsEventV1,
} from '@klyraprotocol-indexer/v4-protos';
import {
  dbHelpers, testMocks, perpetualMarketRefresher,
} from '@klyraprotocol-indexer/postgres';
import { KlyraIndexerSubtypes } from '../../src/lib/types';
import {
  defaultHeight,
  defaultTime,
  defaultTxHash,
  defaultUpdateYieldsParamsEvent1,
} from '../helpers/constants';
import {
  createIndexerTendermintBlock,
  createIndexerTendermintEvent,
} from '../helpers/indexer-proto-helpers';
import { expectDidntLogError } from '../helpers/validator-helpers';
import { YieldsParamsValidator } from '../../src/validators/yields-params-validator';

describe('yields-params-validator', () => {
  beforeAll(async () => {
    await dbHelpers.migrate();
  });

  beforeEach(async () => {
    await testMocks.seedData();
    await perpetualMarketRefresher.updatePerpetualMarkets();
    jest.spyOn(logger, 'error');
  });

  afterEach(async () => {
    await dbHelpers.clearData();
    await perpetualMarketRefresher.clear();
    jest.clearAllMocks();
  });

  afterAll(async () => {
    await dbHelpers.teardown();
  });

  describe('validate', () => {
    it('does not throw error on valid update yields params event', () => {
      const validator: YieldsParamsValidator = new YieldsParamsValidator(
        defaultUpdateYieldsParamsEvent1,
        createBlock(defaultUpdateYieldsParamsEvent1),
        0,
      );

      validator.validate();
      expectDidntLogError();
    });

    it('throws error on undefined assetYieldsIndex', () => {
      const validator: YieldsParamsValidator = new YieldsParamsValidator(
        {
          ...defaultUpdateYieldsParamsEvent1,
          assetYieldsIndex: undefined as unknown as string, // satisfy type checker
        },
        createBlock(defaultUpdateYieldsParamsEvent1),
        0,
      );

      expect(() => validator.validate()).toThrow(new ParseMessageError(
        'UpdateYieldsParamsEvent must have an assetYieldsIndex that is defined and non-empty',
      ));
    });

    it('throws error on empty assetYieldsIndex', () => {
      const validator: YieldsParamsValidator = new YieldsParamsValidator(
        {
          ...defaultUpdateYieldsParamsEvent1,
          assetYieldsIndex: '',
        },
        createBlock(defaultUpdateYieldsParamsEvent1),
        0,
      );

      expect(() => validator.validate()).toThrow(new ParseMessageError(
        'UpdateYieldsParamsEvent must have an assetYieldsIndex that is defined and non-empty',
      ));
    });

    it('throws error on undefined sDAIPrice', () => {
      const validator: YieldsParamsValidator = new YieldsParamsValidator(
        {
          ...defaultUpdateYieldsParamsEvent1,
          sdaiPrice: undefined as unknown as string, // satisfy type checker
        },
        createBlock(defaultUpdateYieldsParamsEvent1),
        0,
      );

      expect(() => validator.validate()).toThrow(new ParseMessageError(
        'UpdateYieldsParamsEvent must have an sDAIPrice that is defined and non-empty',
      ));
    });

    it('throws error on empty sDAIPrice', () => {
      const validator: YieldsParamsValidator = new YieldsParamsValidator(
        {
          ...defaultUpdateYieldsParamsEvent1,
          sdaiPrice: '',
        },
        createBlock(defaultUpdateYieldsParamsEvent1),
        0,
      );

      expect(() => validator.validate()).toThrow(new ParseMessageError(
        'UpdateYieldsParamsEvent must have an sDAIPrice that is defined and non-empty',
      ));
    });
  });
});

function createBlock(
  updateYieldsParamsEvent: UpdateYieldsParamsEventV1,
): IndexerTendermintBlock {
  const event: IndexerTendermintEvent = createIndexerTendermintEvent(
    KlyraIndexerSubtypes.YIELDS_PARAMS,
    UpdateYieldsParamsEventV1.encode(updateYieldsParamsEvent).finish(),
    0,
    0,
  );

  return createIndexerTendermintBlock(
    defaultHeight,
    defaultTime,
    [event],
    [defaultTxHash],
  );
}
