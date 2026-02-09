import express, { Router, Request, Response } from 'express';
import MerchantController from '../controllers/merchant.controller';
const router: Router = express.Router();

router.post("/", (req: Request, res: Response) => MerchantController.createMerchant(req, res));
router.get("/:id", (req: Request, res: Response) => MerchantController.getMerchantById(req, res));
router.get("/products/:id", (req: Request, res: Response) => MerchantController.getMerchantProducts(req, res));
router.delete("/:id", (req: Request, res: Response) => MerchantController.deleteMerchant(req, res));

export default router;