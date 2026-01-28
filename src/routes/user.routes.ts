import express, { Router, Request, Response } from 'express';
import { UserController } from '../controllers/user.controller';

const router: Router = express.Router();

const userController = new UserController();

router.get('/:id', userController.getUserById.bind(userController));

router.get('/', userController.getAllUser.bind(userController));

export default router;