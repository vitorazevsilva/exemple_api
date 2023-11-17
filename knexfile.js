// Update with your config settings.

/**
 * @type { Object.<string, import("knex").Knex.Config> }
 */
module.exports = {

  test: {
    client: 'postgresql',
    connection: {
      host: '127.0.0.1',
      port: 6001,
      database: 'cd_api',
      user: 'myUser',
      password: 'myPasswd',
    },
    debug: false,
    pool: {
      min: 0,
      max: 50,
    },
    migrations: {
      directory: 'src/migrates/test',
    },
  },
  development: {
    client: 'postgresql',
    connection: {
      host: '127.0.0.1',
      port: 6001,
      database: 'cd_api',
      user: 'myUser',
      password: 'myPasswd',
    },
    debug: false,
    pool: {
      min: 0,
      max: 50,
    },
    migrations: {
      directory: 'src/migrates/test',
    },
  },

};
