
import { Sequelize } from 'sequelize-typescript'
import path from 'path'; 
import { appConfigs } from './config';


const models = path.join(__dirname, "../components/**/*.model.ts");

const config = () => {
  
  sequelize.authenticate().then(async() => {
    
    console.error("database connected successfully!");
    try {
        // await sequelize.sync({force: true})
        await sequelize.sync()
        console.log("sycn doneß");
    } catch (error) {
        console.log(error)
    }

  }).catch( (e: any) => {
    console.error("database connection error!");
      console.log(e.message)
  })
}

var sequelize = new Sequelize(`${appConfigs.db.DB_NAME}`, `${appConfigs.db.DB_USER}`, `${appConfigs.db.DB_PASS}`, {
  host: `${appConfigs.db.DB_HOST}`,
  port: 5432,
  dialect: 'postgres',
  models: [models],
})



export default {config};