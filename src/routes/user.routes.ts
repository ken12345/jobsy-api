import express, { Router, Request, Response } from 'express';
import UserController from '../controllers/user.controller';

const router: Router = express.Router();

router.get('/', (req, res) => UserController.getAllUser(req, res));
router.get('/:id', (req, res) => UserController.getUserById(req, res));
router.post('/', (req, res) => UserController.createUser(req, res))

export default router;