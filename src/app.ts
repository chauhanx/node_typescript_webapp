import express from 'express';
import * as dotenv from 'dotenv';
import cors from 'cors';
import helmet from 'helmet';
import routes from './routes';
import morgan from 'morgan';
import db from './config/db.config';
import path from 'path';
import bodyParser from 'body-parser';
// import swaggerUI from 'swagger-ui-express';
// import swDocument from '../swagger.def'

dotenv.config();

if(!process.env.PORT){
    console.log("App exit");
    // process.exit();
}

const app = express();

const PORT =  process.env.PORT || 3000;
console.log("******************" , process.env.DB_NAME);

// configure database connectivity
db.config();
// use middlewares
app.use(helmet());
app.use(cors());
app.use(express.json({ limit: '5mb' }));
// app.use('/docs',swaggerUI.serve,swaggerUI.setup(swDocument));
app.use(morgan('dev'));
app.use(routes);


app.listen(PORT, () => {
    console.log('The application is listening on port 3000!');
})