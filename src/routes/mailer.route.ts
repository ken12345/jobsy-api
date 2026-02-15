import express, { Router, Request, Response } from 'express';
import MailerController from '../controllers/mailer.controller';
const router: Router = express.Router();

router.post("/send-otp", (req: Request, res: Response) => MailerController.sendOtp(req, res));
router.get("/", (req: Request, res: Response) => res.send("Mailer is working"))

export default router;