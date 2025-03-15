import {
  Ordering,
  YieldsParamsColumns,
  YieldsParamsFromDatabase,
} from '../../src/types';
import * as YieldsParamsTable from '../../src/stores/yields-params-table';
import { clearData, migrate, teardown } from '../../src/helpers/db-helpers';
import { seedData } from '../helpers/mock-generators';
import { defaultYieldsParams1, defaultYieldsParams2 } from '../helpers/constants';
import { DateTime } from 'luxon';

describe('Yields params store', () => {
  beforeEach(async () => {
    await seedData();
  });

  beforeAll(async () => {
    await migrate();
  });

  afterEach(async () => {
    await clearData();
  });

  afterAll(async () => {
    await teardown();
  });

  it('Successfully creates new yields params', async () => {
    await YieldsParamsTable.create(defaultYieldsParams1);
  });

  it('Successfully creates multiple new yields params', async () => {
    await YieldsParamsTable.create(defaultYieldsParams1);
    await YieldsParamsTable.create(defaultYieldsParams2);
  });

  it('Succesfully creates yields params and finds it', async () => {
    await YieldsParamsTable.create(defaultYieldsParams1);
    const yieldsParams: YieldsParamsFromDatabase[] = await YieldsParamsTable.findAll({}, [], {});

    expect(yieldsParams.length).toEqual(1);
    expect(yieldsParams[0]).toEqual(
      expect.objectContaining(defaultYieldsParams1),
    );
  });

  it('Succesfully creates multiple yields params and finds them', async () => {
    await Promise.all([
      YieldsParamsTable.create(defaultYieldsParams1),
      YieldsParamsTable.create(defaultYieldsParams2),
    ]);

    const yieldsParams: YieldsParamsFromDatabase[] = await YieldsParamsTable.findAll(
      {},
      [],
      {
        orderBy: [[YieldsParamsColumns.createdAtHeight, Ordering.ASC]],
      },
    );

    expect(yieldsParams.length).toEqual(2);
    expect(yieldsParams[0]).toEqual(
      expect.objectContaining(defaultYieldsParams1),
    );
    expect(yieldsParams[1]).toEqual(
      expect.objectContaining(defaultYieldsParams2),
    );
  });

  it('Successfully finds all yields params with id', async () => {
    await Promise.all([
      YieldsParamsTable.create(defaultYieldsParams1),
      YieldsParamsTable.create(defaultYieldsParams2),
    ]);

    const yieldsParams: YieldsParamsFromDatabase[] = await YieldsParamsTable.findAll(
      { id: [YieldsParamsTable.uuid(defaultYieldsParams1.createdAtHeight)] },
      [],
      {
        orderBy: [[YieldsParamsColumns.createdAtHeight, Ordering.ASC]],
      },
    );

    expect(yieldsParams.length).toEqual(1);
    expect(yieldsParams[0]).toEqual(
      expect.objectContaining(defaultYieldsParams1),
    );
  });

  it('Successfully finds all yields params with sDAI price', async () => {
    await Promise.all([
      YieldsParamsTable.create(defaultYieldsParams1),
      YieldsParamsTable.create(defaultYieldsParams2),
    ]);

    const yieldsParams: YieldsParamsFromDatabase[] = await YieldsParamsTable.findAll(
      { sDAIPrice: defaultYieldsParams1.sDAIPrice },
      [],
      {
        orderBy: [[YieldsParamsColumns.createdAtHeight, Ordering.ASC]],
      },
    );

    expect(yieldsParams.length).toEqual(1);
    expect(yieldsParams[0]).toEqual(
      expect.objectContaining(defaultYieldsParams1),
    );
  });

  it('Successfully finds all yields params with asset yields index', async () => {
    await Promise.all([
      YieldsParamsTable.create(defaultYieldsParams1),
      YieldsParamsTable.create(defaultYieldsParams2),
    ]);

    const yieldsParams: YieldsParamsFromDatabase[] = await YieldsParamsTable.findAll(
      { assetYieldsIndex: defaultYieldsParams1.assetYieldsIndex },
      [],
      {
        orderBy: [[YieldsParamsColumns.createdAtHeight, Ordering.ASC]],
      },
    );

    expect(yieldsParams.length).toEqual(1);
    expect(yieldsParams[0]).toEqual(
      expect.objectContaining(defaultYieldsParams1),
    );
  });

  it('Successfully finds all yields params at height: Finds all yields params', async () => {
    await Promise.all([
      YieldsParamsTable.create(defaultYieldsParams1),
      YieldsParamsTable.create(defaultYieldsParams2),
    ]);

    const yieldsParams: YieldsParamsFromDatabase[] = await YieldsParamsTable.findAll(
      {
        createdAtHeight: [
          defaultYieldsParams1.createdAtHeight,
          defaultYieldsParams2.createdAtHeight,
        ],
      },
      [],
      {
        orderBy: [[YieldsParamsColumns.createdAtHeight, Ordering.ASC]],
      },
    );

    expect(yieldsParams.length).toEqual(2);
    expect(yieldsParams[0]).toEqual(
      expect.objectContaining(defaultYieldsParams1),
    );
    expect(yieldsParams[1]).toEqual(
      expect.objectContaining(defaultYieldsParams2),
    );
  });

  it('Successfully finds all yields params at height: Find one set of yields params', async () => {
    await Promise.all([
      YieldsParamsTable.create(defaultYieldsParams1),
      YieldsParamsTable.create(defaultYieldsParams2),
    ]);

    const yieldsParams: YieldsParamsFromDatabase[] = await YieldsParamsTable.findAll(
      { createdAtHeight: [defaultYieldsParams2.createdAtHeight] },
      [],
      {
        orderBy: [[YieldsParamsColumns.createdAtHeight, Ordering.ASC]],
      },
    );

    expect(yieldsParams.length).toEqual(1);
    expect(yieldsParams[0]).toEqual(
      expect.objectContaining(defaultYieldsParams2),
    );
  });

  it('Successfully finds all yields params at height: No yields params found', async () => {
    await Promise.all([
      YieldsParamsTable.create(defaultYieldsParams1),
      YieldsParamsTable.create(defaultYieldsParams2),
    ]);

    const latestHeightPlusOne: string = (
      parseInt(defaultYieldsParams2.createdAtHeight, 10) + 1
    ).toString();

    const yieldsParams: YieldsParamsFromDatabase[] = await YieldsParamsTable.findAll(
      { createdAtHeight: [latestHeightPlusOne] },
      [],
      {
        orderBy: [[YieldsParamsColumns.createdAtHeight, Ordering.ASC]],
      },
    );

    expect(yieldsParams.length).toEqual(0);
  });

  it('Successfully finds all yields params before or at height: All yields params found', async () => {
    await Promise.all([
      YieldsParamsTable.create(defaultYieldsParams1),
      YieldsParamsTable.create(defaultYieldsParams2),
    ]);

    const yieldsParams: YieldsParamsFromDatabase[] = await YieldsParamsTable.findAll(
      { createdBeforeOrAtHeight: defaultYieldsParams2.createdAtHeight },
      [],
      {
        orderBy: [[YieldsParamsColumns.createdAtHeight, Ordering.ASC]],
      },
    );

    expect(yieldsParams.length).toEqual(2);
    expect(yieldsParams[0]).toEqual(
      expect.objectContaining(defaultYieldsParams1),
    );
    expect(yieldsParams[1]).toEqual(
      expect.objectContaining(defaultYieldsParams2),
    );
  });

  it('Successfully finds all yields params before or at height: One set of yields params found', async () => {
    await Promise.all([
      YieldsParamsTable.create(defaultYieldsParams1),
      YieldsParamsTable.create(defaultYieldsParams2),
    ]);

    const yieldsParams: YieldsParamsFromDatabase[] = await YieldsParamsTable.findAll(
      { createdBeforeOrAtHeight: defaultYieldsParams1.createdAtHeight },
      [],
      {
        orderBy: [[YieldsParamsColumns.createdAtHeight, Ordering.ASC]],
      },
    );

    expect(yieldsParams.length).toEqual(1);
    expect(yieldsParams[0]).toEqual(
      expect.objectContaining(defaultYieldsParams1),
    );
  });

  it('Successfully finds all yields params before or at height: No yields parms to be found', async () => {
    await Promise.all([
      YieldsParamsTable.create(defaultYieldsParams1),
      YieldsParamsTable.create(defaultYieldsParams2),
    ]);

    const firsHeightMinusOne: string = (
      parseInt(defaultYieldsParams1.createdAtHeight, 10) - 1
    ).toString();

    const yieldsParams: YieldsParamsFromDatabase[] = await YieldsParamsTable.findAll(
      { createdBeforeOrAtHeight: firsHeightMinusOne },
      [],
      {
        orderBy: [[YieldsParamsColumns.createdAtHeight, Ordering.ASC]],
      },
    );

    expect(yieldsParams.length).toEqual(0);
  });

  it('Successfully finds all yields params after height: All yields params found', async () => {
    await Promise.all([
      YieldsParamsTable.create(defaultYieldsParams1),
      YieldsParamsTable.create(defaultYieldsParams2),
    ]);

    const firsHeightMinusOne: string = (
      parseInt(defaultYieldsParams1.createdAtHeight, 10) - 1
    ).toString();

    const yieldsParams: YieldsParamsFromDatabase[] = await YieldsParamsTable.findAll(
      { createdAfterHeight: firsHeightMinusOne },
      [],
      {
        orderBy: [[YieldsParamsColumns.createdAtHeight, Ordering.ASC]],
      },
    );

    expect(yieldsParams.length).toEqual(2);
    expect(yieldsParams[0]).toEqual(
      expect.objectContaining(defaultYieldsParams1),
    );
    expect(yieldsParams[1]).toEqual(
      expect.objectContaining(defaultYieldsParams2),
    );
  });

  it('Successfully finds all yields params after height: One set of yields params found', async () => {
    await Promise.all([
      YieldsParamsTable.create(defaultYieldsParams1),
      YieldsParamsTable.create(defaultYieldsParams2),
    ]);

    const yieldsParams: YieldsParamsFromDatabase[] = await YieldsParamsTable.findAll(
      { createdAfterHeight: defaultYieldsParams1.createdAtHeight },
      [],
      {
        orderBy: [[YieldsParamsColumns.createdAtHeight, Ordering.ASC]],
      },
    );

    expect(yieldsParams.length).toEqual(1);
    expect(yieldsParams[0]).toEqual(
      expect.objectContaining(defaultYieldsParams2),
    );
  });

  it('Successfully finds all yields params after height: No yields params found', async () => {
    await Promise.all([
      YieldsParamsTable.create(defaultYieldsParams1),
      YieldsParamsTable.create(defaultYieldsParams2),
    ]);

    const yieldsParams: YieldsParamsFromDatabase[] = await YieldsParamsTable.findAll(
      { createdAfterHeight: defaultYieldsParams2.createdAtHeight },
      [],
      {
        orderBy: [[YieldsParamsColumns.createdAtHeight, Ordering.ASC]],
      },
    );

    expect(yieldsParams.length).toEqual(0);
  });

  it('Successfully finds all yields params at time: One set of yields params found', async () => {
    await Promise.all([
      YieldsParamsTable.create(defaultYieldsParams1),
      YieldsParamsTable.create(defaultYieldsParams2),
    ]);

    const yieldsParams: YieldsParamsFromDatabase[] = await YieldsParamsTable.findAll(
      { createdAt: defaultYieldsParams1.createdAt },
      [],
      {
        orderBy: [[YieldsParamsColumns.createdAtHeight, Ordering.ASC]],
      },
    );

    expect(yieldsParams.length).toEqual(1);
    expect(yieldsParams[0]).toEqual(
      expect.objectContaining(defaultYieldsParams1),
    );
  });

  it('Successfully finds all yields params at time: No yields params found', async () => {
    await Promise.all([
      YieldsParamsTable.create(defaultYieldsParams1),
      YieldsParamsTable.create(defaultYieldsParams2),
    ]);

    const latestCreatedAtPlusOne = DateTime.fromISO(
      defaultYieldsParams2.createdAt,
    )
      .plus({ days: 1 })
      .toISO() ?? '';

    const yieldsParams: YieldsParamsFromDatabase[] = await YieldsParamsTable.findAll(
      { createdAt: latestCreatedAtPlusOne },
      [],
      {
        orderBy: [[YieldsParamsColumns.createdAtHeight, Ordering.ASC]],
      },
    );

    expect(yieldsParams.length).toEqual(0);
  });

  it('Successfully finds all yields params before or at time: All yields params found', async () => {
    await Promise.all([
      YieldsParamsTable.create(defaultYieldsParams1),
      YieldsParamsTable.create(defaultYieldsParams2),
    ]);

    const yieldsParams: YieldsParamsFromDatabase[] = await YieldsParamsTable.findAll(
      { createdBeforeOrAt: defaultYieldsParams2.createdAt },
      [],
      {
        orderBy: [[YieldsParamsColumns.createdAtHeight, Ordering.ASC]],
      },
    );

    expect(yieldsParams.length).toEqual(2);
    expect(yieldsParams[0]).toEqual(
      expect.objectContaining(defaultYieldsParams1),
    );
    expect(yieldsParams[1]).toEqual(
      expect.objectContaining(defaultYieldsParams2),
    );
  });

  it('Successfully finds all yields params before or at time: One set of yields params found', async () => {
    await Promise.all([
      YieldsParamsTable.create(defaultYieldsParams1),
      YieldsParamsTable.create(defaultYieldsParams2),
    ]);

    const yieldsParams: YieldsParamsFromDatabase[] = await YieldsParamsTable.findAll(
      { createdBeforeOrAt: defaultYieldsParams1.createdAt },
      [],
      {
        orderBy: [[YieldsParamsColumns.createdAtHeight, Ordering.ASC]],
      },
    );

    expect(yieldsParams.length).toEqual(1);
    expect(yieldsParams[0]).toEqual(
      expect.objectContaining(defaultYieldsParams1),
    );
  });

  it('Successfully finds all yields params before or at time: No yields parms found', async () => {
    await Promise.all([
      YieldsParamsTable.create(defaultYieldsParams1),
      YieldsParamsTable.create(defaultYieldsParams2),
    ]);

    const latestCreatedAtMinusOne = DateTime.fromISO(
      defaultYieldsParams1.createdAt,
    )
      .minus({ days: 1 })
      .toISO() ?? '';

    const yieldsParams: YieldsParamsFromDatabase[] = await YieldsParamsTable.findAll(
      { createdBeforeOrAt: latestCreatedAtMinusOne },
      [],
      {
        orderBy: [[YieldsParamsColumns.createdAtHeight, Ordering.ASC]],
      },
    );

    expect(yieldsParams.length).toEqual(0);
  });

  it('Successfully finds all yields params after time: All yields params found', async () => {
    await Promise.all([
      YieldsParamsTable.create(defaultYieldsParams1),
      YieldsParamsTable.create(defaultYieldsParams2),
    ]);
    const latestCreatedAtMinusOne = DateTime.fromISO(
      defaultYieldsParams1.createdAt,
    )
      .minus({ days: 1 })
      .toISO() ?? '';

    const yieldsParams: YieldsParamsFromDatabase[] = await YieldsParamsTable.findAll(
      { createdAfter: latestCreatedAtMinusOne },
      [],
      {
        orderBy: [[YieldsParamsColumns.createdAtHeight, Ordering.ASC]],
      },
    );

    expect(yieldsParams.length).toEqual(2);
    expect(yieldsParams[0]).toEqual(
      expect.objectContaining(defaultYieldsParams1),
    );
    expect(yieldsParams[1]).toEqual(
      expect.objectContaining(defaultYieldsParams2),
    );
  });

  it('Successfully finds all yields params after time: One set of yields params found', async () => {
    await Promise.all([
      YieldsParamsTable.create(defaultYieldsParams1),
      YieldsParamsTable.create(defaultYieldsParams2),
    ]);

    const yieldsParams: YieldsParamsFromDatabase[] = await YieldsParamsTable.findAll(
      { createdAfter: defaultYieldsParams1.createdAt },
      [],
      {
        orderBy: [[YieldsParamsColumns.createdAtHeight, Ordering.ASC]],
      },
    );

    expect(yieldsParams.length).toEqual(1);
    expect(yieldsParams[0]).toEqual(
      expect.objectContaining(defaultYieldsParams2),
    );
  });

  it('Successfully finds all yields params : No yields params found', async () => {
    await Promise.all([
      YieldsParamsTable.create(defaultYieldsParams1),
      YieldsParamsTable.create(defaultYieldsParams2),
    ]);

    const yieldsParams: YieldsParamsFromDatabase[] = await YieldsParamsTable.findAll(
      { createdAfter: defaultYieldsParams2.createdAt },
      [],
      {
        orderBy: [[YieldsParamsColumns.createdAtHeight, Ordering.ASC]],
      },
    );

    expect(yieldsParams.length).toEqual(0);
  });

  it('Successfully finds yields params before or at height and with specific assetYieldsIndex', async () => {
    await Promise.all([
      YieldsParamsTable.create(defaultYieldsParams1),
      YieldsParamsTable.create(defaultYieldsParams2),
    ]);

    const yieldsParams: YieldsParamsFromDatabase[] = await YieldsParamsTable.findAll(
      {
        createdBeforeOrAtHeight: defaultYieldsParams2.createdAtHeight,
        assetYieldsIndex: defaultYieldsParams1.assetYieldsIndex,
      },
      [],
      {
        orderBy: [[YieldsParamsColumns.createdAtHeight, Ordering.ASC]],
      },
    );

    expect(yieldsParams.length).toEqual(1);
    expect(yieldsParams[0]).toEqual(
      expect.objectContaining(defaultYieldsParams1),
    );
  });

  it('Successfully finds yields params before or at height with asset yields index and sDAI price', async () => {
    await Promise.all([
      YieldsParamsTable.create(defaultYieldsParams1),
      YieldsParamsTable.create(defaultYieldsParams2),
    ]);

    const yieldsParams: YieldsParamsFromDatabase[] = await YieldsParamsTable.findAll(
      {
        createdBeforeOrAtHeight: defaultYieldsParams2.createdAtHeight,
        assetYieldsIndex: defaultYieldsParams1.assetYieldsIndex,
        sDAIPrice: defaultYieldsParams1.sDAIPrice,
      },
      [],
      {
        orderBy: [[YieldsParamsColumns.createdAtHeight, Ordering.ASC]],
      },
    );

    expect(yieldsParams.length).toEqual(1);
    expect(yieldsParams[0]).toEqual(
      expect.objectContaining(defaultYieldsParams1),
    );
  });

  it('Successfully finds yields params at time with asset yields index and sDAI price', async () => {
    await Promise.all([
      YieldsParamsTable.create(defaultYieldsParams1),
      YieldsParamsTable.create(defaultYieldsParams2),
    ]);

    const yieldsParams: YieldsParamsFromDatabase[] = await YieldsParamsTable.findAll(
      {
        createdAt: defaultYieldsParams2.createdAt,
        assetYieldsIndex: defaultYieldsParams2.assetYieldsIndex,
        sDAIPrice: defaultYieldsParams2.sDAIPrice,
      },
      [],
      {
        orderBy: [[YieldsParamsColumns.createdAtHeight, Ordering.ASC]],
      },
    );

    expect(yieldsParams.length).toEqual(1);
    expect(yieldsParams[0]).toEqual(
      expect.objectContaining(defaultYieldsParams2),
    );
  });

  it('Finds no yields params on findAll parameters mismatch', async () => {
    await Promise.all([
      YieldsParamsTable.create(defaultYieldsParams1),
      YieldsParamsTable.create(defaultYieldsParams2),
    ]);

    const yieldsParams: YieldsParamsFromDatabase[] = await YieldsParamsTable.findAll(
      {
        assetYieldsIndex: defaultYieldsParams1.assetYieldsIndex,
        sDAIPrice: defaultYieldsParams2.sDAIPrice,
      },
      [],
      {
        orderBy: [[YieldsParamsColumns.createdAtHeight, Ordering.ASC]],
      },
    );

    expect(yieldsParams.length).toEqual(0);
  });

  it('Successfully finds yields params by from Id', async () => {
    await Promise.all([
      YieldsParamsTable.create(defaultYieldsParams1),
      YieldsParamsTable.create(defaultYieldsParams2),
    ]);

    const yieldsParams: YieldsParamsFromDatabase | undefined = await YieldsParamsTable.findById(
      YieldsParamsTable.uuid(defaultYieldsParams1.createdAtHeight),
    );

    expect(yieldsParams).toBeDefined();
    expect(yieldsParams).toEqual(expect.objectContaining(defaultYieldsParams1));
  });

  it('Successfully finds gets latest yields params: Multiple sets of yields params stored', async () => {
    await Promise.all([
      YieldsParamsTable.create(defaultYieldsParams1),
      YieldsParamsTable.create(defaultYieldsParams2),
    ]);

    const yieldsParams: YieldsParamsFromDatabase | undefined = await YieldsParamsTable.getLatest();

    expect(yieldsParams).toBeDefined();
    expect(yieldsParams).toEqual(expect.objectContaining(defaultYieldsParams2));
  });

  it('Successfully finds gets latest yields params: One set of yields params stored', async () => {
    await Promise.all([YieldsParamsTable.create(defaultYieldsParams1)]);

    const yieldsParams: YieldsParamsFromDatabase | undefined = await YieldsParamsTable.getLatest();

    expect(yieldsParams).toBeDefined();
    expect(yieldsParams).toEqual(expect.objectContaining(defaultYieldsParams1));
  });

  it('Successfully finds gets latest yields params: No yields params stored', async () => {
    await expect(YieldsParamsTable.getLatest()).rejects.toThrow(
      'Unable to find latest yields params',
    );
  });
});
