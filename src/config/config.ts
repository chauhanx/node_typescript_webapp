
import * as dotenv from 'dotenv';

dotenv.config();

export const appConfigs =  {
    NODE_ENV: process.env.NODE_ENV,
    PORT: process.env.PORT,
    db: {
      DB_HOST: process.env.DB_HOST,
      DB_USER: process.env.DB_USER,
      DB_PASS: process.env.DB_PASS,
      DB_NAME: process.env.DB_NAME,
      DB_PORT: process.env.DB_PORT,
      dialect: "postgres",
  
      pool: {
        max: 5,
        min: 0,
        acquire: 30000,
        idle: 10000
      }
    },
  
    /** AUTH KEY */
    auth: {
      secret: "our-secret-key"
    },


    s3:{
      BUCKET_NAME: process.env.BUCKET_NAME,
      ACCESS_KEY: process.env.ACCESS_KEY,
      SECRET_KEY: process.env.SECRET_KEY
    }
  };

  