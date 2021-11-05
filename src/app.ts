import express from 'express';
import * as dotenv from 'dotenv';
import cors from 'cors';
import helmet from 'helmet';
import routes from './routes';
import morgan from 'morgan';
import dbConfig from './config/db.config';

dotenv.config();

if(!process.env.PORT){
    console.log("App exit");
    process.exit();
}

const app = express();
const PORT =  process.env.PORT || 3000;

// configure database connectivity
dbConfig.config()

// use middlewares
app.use(helmet());
app.use(cors());
app.use(express.json({ limit: '5mb' }));
app.use(morgan('dev'));
app.use(routes);

app.listen(PORT, () => {
  console.log('The application is listening on port 3000!');
})

