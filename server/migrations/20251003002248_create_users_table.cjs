
exports.up = async function(knex) {
    await knex.schema.createTable("users", (table) => {
        table.increments("id").primary();       // auto-incrementing PK
        table.string("name", 20).notNullable().unique();
        table.string("username").notNullable().unique();
        table.string("email").notNullable().unique();
        table.string("password").notNullable();
        table.timestamps(true, true);           // created_at & updated_at
    });
};

exports.down = async function(knex) {
    await knex.schema.dropTable("users");
};
