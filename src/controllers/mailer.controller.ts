import { MailerService } from "../services/mailer.service";
import { Request, Response } from "express";

class MailerController {
  private mailerService: MailerService;

  constructor(mailerService: MailerService) {
    this.mailerService = mailerService;
  }

  public async sendOtp(req: Request, res: Response) {
    const { type, recipient, body, subject } = req.body;
    try {
      const result = await this.mailerService.sendOtp(type, recipient, body, subject);
      res.status(200).json(result);
    } catch (error) {
      res.status(500).json({ error: "Failed to send OTP" });
    }
  }
}

export default new MailerController(new MailerService());