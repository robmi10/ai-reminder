// Update with your config settings.

/**
 * @type { Object.<string, import("knex").Knex.Config> }
 */
module.exports = {

  development: {
    client: 'pg',
    connection: {
      host: '127.0.0.1',
      user: 'mike',
      password: '12345678',
      database: 'aireminder',
      port: 5433
    },
    migrations: {
      tableName: 'knex_migrations',
      directory: './migrations'
    }
  },
};
