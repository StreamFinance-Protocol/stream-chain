# Postgres

Postgres package holds all postgres knex migrations, postgres models and helper functions.

## Knex migration
Add a knex migration by running `pnpm run migrate:make <create_fake_table>`

Run the migration with `pnpm run migrate`

In order to migrate in dev and staging, you must redeploy and run bazooka.
.
