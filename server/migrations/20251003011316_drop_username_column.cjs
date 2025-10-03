
exports.up = async function(knex) {
    await knex.schema.alterTable('users', (table) => {
        table.dropColumn('username');
    });
};

exports.down = async function(knex) {
    await knex.schema.alterTable('users', (table) => {
        table.string('username');
    });
};
