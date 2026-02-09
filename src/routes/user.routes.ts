import express, { Router, Request, Response } from 'express';
import UserController from '../controllers/user.controller';

const router: Router = express.Router();

router.get('/:id', (req: Request, res: Response) => UserController.getUserById(req, res));
router.post('/', (req: Request, res: Response) => UserController.createUser(req, res));
router.post('/authenticate',  (req: Request, res: Response) => UserController.authenticateUser(req, res))
router.delete('/', (req: Request, res: Response) => UserController.deleteUser(req, res));

export default router;