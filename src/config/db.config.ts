
import { Sequelize } from 'sequelize-typescript'
import path from 'path'; 
import { appConfigs } from './config';
import User from '../components/users/users.model';
import Image from '../components/image/image.model';

const models = path.join(__dirname, "../components/**/*.model.ts");


const config = async() => {
  await sequelize.authenticate();
  console.error("database connected successfully!");
  await sequelize.sync();
  console.log("sycn doneß");
}

// const config = () => {
  
//   sequelize.authenticate().then(async() => {
    
//     console.error("database connected successfully!");
//     try {
//         await sequelize.sync({force: true})
//         // await sequelize.sync()
//         console.log("sycn doneß");
//     } catch (error) {
//         console.log(error)
//     }

//   }).catch( (e: any) => {
//     console.error("database connection error!");
//       console.log(e.message)
//   })
// }

export const sequelize = new Sequelize(`${appConfigs.db.DB_NAME}`, `${appConfigs.db.DB_USER}`, `${appConfigs.db.DB_PASS}`, {
  host: `${appConfigs.db.DB_HOST}`,
  port: 5432,
  dialect: 'postgres',
  models: [User,Image]
})
console.log("*****************", models, "*************************");

sequelize.addModels([User,Image])


export default {config};