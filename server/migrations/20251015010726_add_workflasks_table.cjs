
exports.up = async function(knex) {
    await knex.schema.createTable("workflasks", (table) => {
        table.integer("userid");
        table.string("trigger").notNullable();
        table.string("action").notNullable();
        table.timestamps(true, true);       // created_at & updated_at
    });
};

exports.down = async function(knex) {
    await knex.schema.dropTable("workflasks");
};
