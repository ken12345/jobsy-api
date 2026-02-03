
import express, { Router } from 'express';
import userRoutes from './user.routes';
import merchantRoutes from './merchant.routes';
import { validateApiKey } from '../middleware/auth';

const apiRouter: Router = express.Router();

apiRouter.use('/users', validateApiKey, userRoutes);
apiRouter.use("/merchants", validateApiKey, merchantRoutes)


export default apiRouter;
