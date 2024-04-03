exports.up = function (knex) {
    return knex.schema.createTable('reminder_usage', function (table) {
        table.increments('id');
        table.string('userId', 100).notNullable();
        table.date('date').notNullable();
        table.integer('usageCount').defaultTo(1);
    });
};

exports.down = function (knex) {
    return knex.schema.dropTable('reminder_usage');
};
