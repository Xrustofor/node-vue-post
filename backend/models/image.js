const Sequelize = require('sequelize');
const sequelize = require('../db');

const image = sequelize.define('images', {
    id: {
        primaryKey: true,
        autoIncrement: true,
        allowNull: false,
        type: Sequelize.INTEGER
      },
      url: {
        type:  Sequelize.STRING,
      },
      title: {
        type: Sequelize.STRING,
      }   
});

module.exports = image;