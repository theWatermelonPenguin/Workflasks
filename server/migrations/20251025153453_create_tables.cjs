exports.up = async function(knex) {
  // Create users table
  await knex.schema.createTable('users', (table) => {
    table.increments('id').primary();       // auto-incrementing PK
    table.string('name', 20).notNullable().unique();
    table.string('email').notNullable().unique();
    table.string('password').notNullable();
    table.timestamps(true, true);           // created_at & updated_at
  });

  // Create workflasks table
  await knex.schema.createTable('workflasks', (table) => {
    table.increments('id').primary();
    table.integer('userid');
    table.string('trigger').notNullable();
    table.string('action').notNullable();
    table.string('triggertype').notNullable();
    table.string('actiontype').notNullable();
    table.string('contents');
    table.string('title');
    table.timestamps(true, true);           // created_at & updated_at
  });
};

exports.down = async function(knex) {
  // Drop workflasks first because it may reference users
  await knex.schema.dropTable('workflasks');
  await knex.schema.dropTable('users');
};