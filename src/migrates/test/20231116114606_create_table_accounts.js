/**
 * @param { import("knex").Knex } knex
 * @returns { Promise<void> }
 */
exports.up = (knex) => knex.schema.createTable('accounts', (table) => {
  table.increments('id').primary();
  table.string('name').notNull();
  table.integer('user_id')
    .references('id')
    .inTable('users')
    .notNull();
});

/**
 * @param { import("knex").Knex } knex
 * @returns { Promise<void> }
 */
exports.down = (knex) => knex.schema.dropTableIfExists('accounts');
