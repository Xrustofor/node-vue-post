const Sequelize = require('sequelize');
const sequelize = require('../db');

const post = sequelize.define('posts', {
    id: {
        primaryKey: true,
        autoIncrement: true,
        allowNull: true,
        type: Sequelize.INTEGER
    },
    title: {
        type: Sequelize.STRING,
        allowNull: true
    },
    description: {
        type: Sequelize.STRING,
        allowNull: true
    },
    price: {
        type: Sequelize.STRING,
        allowNull: true 
    },
    imagesId: {
        type: Sequelize.STRING,
        allowNull: true 
    }
})

module.exports = post;