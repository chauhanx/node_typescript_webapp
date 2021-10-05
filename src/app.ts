import express from 'express';
import * as dotenv from 'dotenv';
import cors from 'cors';
import helmet from 'helmet';
import routes from './routes';
import morgan from 'morgan';
import db from './config/db.config';
// import swaggerUI from 'swagger-ui-express';
// import swDocument from '../swagger.def'

dotenv.config();

if(!process.env.PORT){
    process.exit();
}

const app = express();

const PORT =  process.env.PORT;

// configure database connectivity
db.config();

// use middlewares
app.use(helmet());
app.use(cors());
app.use(express.json());
// app.use('/docs',swaggerUI.serve,swaggerUI.setup(swDocument));
app.use(morgan('dev'));
app.use(routes);


app.listen(PORT, () => {
    console.log('The application is listening on port 3000!');
})