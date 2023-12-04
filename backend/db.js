const { Sequelize } = require('sequelize');

const database = 'promo_8bln'; //'promo';
const username = 'xrustofor'; //'postgres';
const password = 'gn1FFVI8Lr9gXritowttekXt8dUFHibU'; //'ouzD6984';


const sequelize = new Sequelize(database, username, password, {
    host: 'https://promo-qag1.onrender.com',
    dialect: 'postgres',
    port: '5432'
})

module.exports = sequelize;