exports.up = function (knex) {
    return knex.schema.createTable('event', function (table) {
        table.increments('eventId');
        table.string('userId', 100).notNullable();
        table.string('phone', 100).notNullable();
        table.string('email', 100).notNullable();
        table.string('name', 100);
        table.string('location', 100);
        table.boolean('status').defaultTo(false);
        table.timestamp('reminder')
        table.timestamp('start').notNullable();
        table.timestamp('end').notNullable();
        table.timestamp('createdAt').defaultTo(knex.fn.now()).notNullable();
    });
};

export interface Event {
    eventId: number;
    userId: number;
    email: string;
    name?: string;
    location?: string;
    phone: string;
    status: boolean;
    reminder: Date;
    reminder?: start;
    reminder: end;
    createdAt: end;
}




export interface DB {
    event: Event;
}