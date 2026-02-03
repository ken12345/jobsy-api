
import express, { Router } from 'express';
import userRoutes from './user.routes';
import merchantRoutes from './merchant.routes';

const apiRouter: Router = express.Router();

apiRouter.use('/users', userRoutes);
apiRouter.use("/merchants", merchantRoutes)


export default apiRouter;
