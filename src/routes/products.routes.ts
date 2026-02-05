import express, { Router, Request, Response } from 'express';
import productsController from '../controllers/products.controller';
const router: Router = express.Router();
import multer from 'multer';

const upload = multer({
  storage: multer.memoryStorage(),
});

router.get('/:id', (req: Request, res: Response) => productsController.getProductById(req, res));
router.post('/',  upload.single('file'), (req: Request, res: Response) => productsController.createProduct(req, res));

export default router;