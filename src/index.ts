import express, { Application } from 'express';
import apiRouter from './routes/index';

const app: Application = express();

const PORT: number = Number(process.env.PORT) || 3000;

app.use(express.json());

app.use('/api', apiRouter);

app.listen(PORT, () => {
  console.log(`Server is running on http://localhost:${PORT}`);
});