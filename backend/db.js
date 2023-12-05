const { Sequelize } = require('sequelize');
const CONFIG = require('../environment');

const database = CONFIG.DB_DATABASE;
const username = CONFIG.DB_USERNAME;
const password = CONFIG.DB_PASSWORD;


const sequelize = new Sequelize(database, username, password, {
    host: CONFIG.DB_HOST,
    dialect: 'postgres',
    port: CONFIG.DB_PORT
})

module.exports = sequelize;