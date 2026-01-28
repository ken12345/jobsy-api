
import express, { Router } from 'express';
import userRoutes from './user.routes';

const apiRouter: Router = express.Router();

apiRouter.use('/user', userRoutes);

export default apiRouter;