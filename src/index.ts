import express, { Application } from 'express';
import swaggerUi from 'swagger-ui-express';
import swaggerSpec from './swagger'; 

import apiRouter from './routes/index';
import sequelizeConnection from './config/database';

import * as dotenv from 'dotenv';

dotenv.config();

const app: Application = express();

const PORT: string | number = process.env.PORT || 3000;

app.use('/api-docs', swaggerUi.serve, swaggerUi.setup(swaggerSpec));

app.use(express.json());

app.use('/api', apiRouter);

const connectToDatabase = async () => {
  try {
    await sequelizeConnection.authenticate();
    console.log('Connection has been established successfully.');
  } catch (error) {
    console.error('Unable to connect to the database:', error);
  }
};

connectToDatabase();

app.listen(PORT, () => {
  console.log(`Server is running on http://localhost:${PORT} ${process.env.PORT}`);
});