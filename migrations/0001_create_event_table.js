exports.down = function (knex) {
    return knex.schema.dropTable('event');
};
