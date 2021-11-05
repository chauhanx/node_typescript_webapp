
import { Sequelize } from 'sequelize-typescript'
import { appConfigs } from './config';
import User from '../components/users/users.model';
import Image from '../components/image/image.model';

// const models = path.join(__dirname, "../components/**/*.model.ts");

const config = async() => {
  await sequelize.authenticate();
  console.error("database connected successfully!");
  await sequelize.sync();
  console.log("sycn doneß");
}


export const sequelize = new Sequelize(`${appConfigs.db.DB_NAME}`, `${appConfigs.db.DB_USER}`, `${appConfigs.db.DB_PASS}`, {
  host: `${appConfigs.db.DB_HOST}`,
  port: 5432,
  dialect: 'postgres',
  models: [User,Image]
})
sequelize.addModels([User,Image])
export default {config};