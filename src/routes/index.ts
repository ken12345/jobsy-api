
import express, { Router } from 'express';
import userRoutes from './user.routes';
import uploadRoutes from './bucket-uploader.routes';
import merchantRoutes from './merchant.routes';
import { validateApiKey } from '../middleware/auth';

const apiRouter: Router = express.Router();

apiRouter.use('/users', validateApiKey, userRoutes);
apiRouter.use("/merchants", validateApiKey, merchantRoutes)
apiRouter.use("/upload", uploadRoutes);

export default apiRouter;
