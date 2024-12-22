import Knex from 'knex';

export async function up(knex: Knex): Promise<void> {
  return knex.schema.createTable('collateral_pools', (table) => {
    table.integer('id').primary();
    table.integer('maxCumulativeInsuranceFundDeltaPerBlock').notNullable();
    table.specificType('multiCollateralAssets', 'INTEGER[]').notNullable();
    table.integer('quoteAssetId').notNullable();
  });
}

export async function down(knex: Knex): Promise<void> {
  return knex.schema.dropTableIfExists('collateral_pools');
}
