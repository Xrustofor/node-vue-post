import { DataTypes, Model } from 'sequelize';
import db from '../../backend/db.js';


class Image extends Model {}

const model = Image.init({
    id: {
        primaryKey: true,
        autoIncrement: true,
        allowNull: false,
        type: DataTypes.INTEGER
    },
    product_id: {
        type: DataTypes.INTEGER,
        references: {
            model: 'products',
            key: 'id'
        },
        onDelete: "set null",
        onUpdate: "restrict"
    },
    uuid: {
        type:  DataTypes.STRING,
    },
    size: {
        type: DataTypes.INTEGER,
    },
    mimetype: {
        type: DataTypes.STRING,
    },
}, {
    sequelize: db,
    tableName: 'attachments'
})


export default model;