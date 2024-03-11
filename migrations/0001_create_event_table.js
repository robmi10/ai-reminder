exports.up = function (knex) {
    return knex.schema.createTable('event', function (table) {
        table.increments('eventId');
        table.string('userId', 100).notNullable();
        table.string('phone', 100).notNullable();
        table.string('email', 100).notNullable();
        table.string('desc', 100);
        table.boolean('status').defaultTo(false);
        table.timestamp('reminder')
        table.timestamp('start').notNullable();
        table.timestamp('createdAt').defaultTo(knex.fn.now()).notNullable();
    });
};

