import express, { Router, Request, Response } from 'express';
import MerchantController from '../controllers/merchant.controller';

const router: Router = express.Router();

router.post("/",(req, res) => MerchantController.createMerchant(req, res))

export default router;