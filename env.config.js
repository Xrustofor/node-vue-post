import dotenv from "dotenv";

dotenv.config();

const CONFIG = {
    DB_DATABASE: "promo",
    DB_USERNAME: "postgres",
    DB_PASSWORD: "ouzD6984",
    DB_HOST: "localhost",
    DB_PORT: "5432",
    PORT: "3000",
    PORT_CLIENT:'8080',
    PATH: `http://localhost:${process.env.PORT}`
  };
  
  if (process.env.NODE_ENV === 'production') {
    CONFIG.DB_DATABASE = process.env.DB_DATABASE;
    CONFIG.DB_USERNAME = process.env.DB_USERNAME;
    CONFIG.DB_PASSWORD = process.env.DB_PASSWORD;
    CONFIG.DB_HOST = process.env.DB_HOST;
    CONFIG.DB_PORT = process.env.DB_PORT;
    CONFIG.PORT = process.env.PORT;
    CONFIG.PORT_CLIENT = process.env.PORT_CLIENT;
    CONFIG.PATH = process.env.PATH || '.';
  }

  export default CONFIG;