import express, { Router, Request, Response } from 'express';
import roleController from '../controllers/role.controller';

const router: Router = express.Router();

router.post('/', (req: Request, res: Response) => roleController.createRole(req, res));
router.get('/merchant/:id', (req: Request, res: Response) => roleController.getAllRoleByMerchant(req, res));
router.get('/:id', (req: Request, res: Response) => roleController.getRoleById(req, res));
router.delete('/:id', (req: Request, res: Response) => roleController.deleteRole(req, res));

export default router;