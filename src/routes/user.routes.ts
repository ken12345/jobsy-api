import express, { Router, Request, Response } from 'express';
import UserController from '../controllers/user.controller';

const router: Router = express.Router();

router.get('/:id', (req, res) => UserController.getUserById(req, res));
router.post('/', (req, res) => UserController.createUser(req, res));
router.post('/authenticate', (req, res) => UserController.authenticateUser(req, res))

export default router;