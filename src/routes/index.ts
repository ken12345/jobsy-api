
import express, { Router } from 'express';
import userRoutes from './user.routes';

const apiRouter: Router = express.Router();

apiRouter.use('/users', userRoutes);

apiRouter.get('/', (req, res) => {
  res.send('im working');
});

export default apiRouter;
