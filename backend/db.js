const { Sequelize } = require('sequelize');

const database = 'promo';
const username = 'postgres';
const password = 'ouzD6984';


const sequelize = new Sequelize(database, username, password, {
    host: 'localhost',
    dialect: 'postgres',
    port: '5432'
})

module.exports = sequelize;