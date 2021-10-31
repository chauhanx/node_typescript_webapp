import * as dotenv from 'dotenv';
dotenv.config();
const { DB_HOST, DB_USERNAME, DB_PASSWORD, DB_NAME ,DB_DIALECT} = process.env;


module.exports = {
  "dev": {
    "username": DB_USERNAME,
    "password": DB_PASSWORD,
    "database": DB_NAME,
    "host": DB_HOST,
    "dialect": DB_DIALECT
  },
  "stag": {
    "username": DB_USERNAME,
    "password": DB_PASSWORD,
    "database": DB_NAME,
    "host": DB_HOST,
    "dialect": DB_DIALECT
  },
  "prod": {
    "username": DB_USERNAME,
    "password": DB_PASSWORD,
    "database": DB_NAME,
    "host": DB_HOST,
    "dialect": DB_DIALECT
  }
}
