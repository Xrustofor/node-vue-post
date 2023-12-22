import Sequelize from 'sequelize';
import CONFIG from '../env.config.js';


const database = CONFIG.DB_DATABASE;
const username = CONFIG.DB_USERNAME;
const password = CONFIG.DB_PASSWORD;

const db = new Sequelize(database, username, password, {
    host: CONFIG.DB_HOST,
    dialect: 'postgres',
    port: CONFIG.DB_PORT,
})


export default db;

export function openConnection() {
  return db.authenticate();
}

export function closeConnection() {
  return db.close()
}
