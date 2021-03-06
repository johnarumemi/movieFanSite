// Connection details for DATABASE
require('dotenv').config()

module.exports = {
    username: process.env.DB_USER,
    host: process.env.DB_HOST,
    port: process.env.DB_PORT,
    database: process.env.DB_DATABASE,
    password: process.env.DB_PASSWORD,
    dialect: process.env.DB_CLIENT,
    logging: false, //console.log, // or use false
}
