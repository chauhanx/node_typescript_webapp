import express from 'express';
import * as dotenv from 'dotenv';
import cors from 'cors';
import helmet from 'helmet';
import routes from './routes';
import morgan from 'morgan';
import dbConfig from './config/db.config';
import path from 'path';
import bodyParser from 'body-parser';

dotenv.config();

if(!process.env.PORT){
    console.log(process.env.PORT);
    
    console.log("App exit");
    // process.exit();
}

const app = express();

const PORT =  process.env.PORT || 3000;
console.log("**************************************");

// configure database connectivity
dbConfig.config()
// db.sequelize
// .authenticate()
// // .sync({force: true})
// .then(async() => {
//     console.log("sycn doneß");
//     console.error("database connected successfully!");
//     // try {
//         await db.sequelize.sync({force: true})
//         // await db.sequelize.sync();
//         // console.log("sycn doneß");
    app.listen(PORT, () => {
        console.log('The application is listening on port 3000!');
    })
//     // } catch (error) {
//     //     console.log("***************** error ***************************");
//     //     console.log(error);
//     // }

//   }).catch( (e: any) => {
//     console.log("***************** error ***************************");
//     console.error("database connection error!");
//       console.log(e.stack)
//   });


// use middlewares
app.use(helmet());
app.use(cors());
app.use(express.json({ limit: '5mb' }));
app.use(morgan('dev'));
app.use(routes);


