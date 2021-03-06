const dbConnection = require('./dbConnection');

module.exports = {
  development: {
      ...dbConnection
  },
  test: {
    ...dbConnection
  },
  production: {
    ...dbConnection,
    use_env_variable: 'DATABASE_URL', // ENV variable to use for database url connection
    dialectOptions: {
      ssl: {
        rejectUnauthorized: false, // <<<<<<< YOU NEED THIS TO FIX UNHANDLED REJECTION
      },
    },
  }
}
