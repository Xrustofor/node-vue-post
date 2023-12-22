import { DataTypes, Model } from 'sequelize';
import Image from "./attachment.module.js"
import db from '../../backend/db.js';


class Product extends Model {}

const model = Product.init({
    id: {
        type: DataTypes.INTEGER,
        primaryKey: true,
        allowNull: true,
        autoIncrement: true
    },
    title: {
        type: DataTypes.STRING,
        allowNull: true
    },
    description: {
        type: DataTypes.STRING,
        allowNull: true
    },
    price: {
        type: DataTypes.STRING,
        allowNull: true 
    },
}, {
  sequelize: db,
  tableName: 'products',
});

model.hasMany(Image, {as: 'images', foreignKey: 'product_id'})

export default model;