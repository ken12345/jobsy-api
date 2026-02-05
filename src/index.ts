import express, { Application } from 'express';
import swaggerUi from 'swagger-ui-express';
import swaggerSpec from './swagger'; 
import sequelizeConnection, {connectDB} from './config/database';
import apiRouter from './routes/index';
import './config/associations';
import cors from 'cors';

import * as dotenv from 'dotenv';

dotenv.config();

const app: Application = express();

const PORT: string | number = process.env.PORT || 3000;

const allowedOrigins = [
  'http://localhost:5173',
  'https://www.bitezy.online/'
];

const options: cors.CorsOptions = {
  origin: (origin, callback) => {
    if (!origin) return callback(null, true);
    if (allowedOrigins.includes(origin)) {
      callback(null, true);
    } else {
      callback(new Error('Origin not allowed by CORS'));
    }
  }
};

app.use(cors(options));

if(process.env.NODE_ENV !== "production") {
  app.use('/api-docs', swaggerUi.serve, swaggerUi.setup(swaggerSpec));
}

app.use(express.json());

app.use(express.urlencoded({ extended: true }));

app.use('/api', apiRouter);

app.listen(PORT, async() => {
  console.log(`Server is running on http://localhost:${PORT} ${process.env.PORT}`);
  connect();
});

const connect = async() =>{
   await connectDB();
  await sequelizeConnection.sync({ force: false }); 
}
