
import express, { Router } from 'express';
import userRoutes from './user.routes';
import merchantRoutes from './merchant.routes';
import { validateApiKey } from '../middleware/auth';
import productRoutes from './products.routes';
import roleRoutes from './role.routes'

const apiRouter: Router = express.Router();

apiRouter.use('/users', validateApiKey, userRoutes);
apiRouter.use("/merchants", validateApiKey, merchantRoutes)
apiRouter.use("/merchants", validateApiKey, merchantRoutes);
apiRouter.use("/products", validateApiKey, productRoutes);
apiRouter.use("/roles", validateApiKey, roleRoutes);

export default apiRouter;
