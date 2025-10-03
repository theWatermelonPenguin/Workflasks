
exports.up = async function(knex) {
    await knex.schema.alterTable('users', (table) => {
        table.renameColumn('password', 'hashed_password');
    });
};

exports.down = async function(knex) {
    await knex.schema.alterTable('users', (table) => {
        table.renameColumn('hashed_password', 'password');
    });
};
