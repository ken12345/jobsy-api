import transporter from "../config/mailer";
import sanitizeHtml from "sanitize-html";
import dotenv from "dotenv";

dotenv.config();

interface MailerResponse {
  transporter_response: any;
  success: boolean;
  message: string;
}

function cleanBody(input: string) {
  return sanitizeHtml(input, {
    allowedTags: [
      "b", "i", "em", "strong",
      "p", "br", "ul", "ol", "li",
      "a"
    ],
    allowedAttributes: {
      a: ["href"]
    },
    allowedSchemes: ["http", "https", "mailto"]
  });
}

export class MailerService {
  public async sendOtp(type: string, recipient: string, body: string, subject: string): Promise<MailerResponse> {
    try {
      const info = await transporter.sendMail({
        from: `"Bitezy Online" <${process.env.EMAIL_USER}>`,
        to: recipient,
        subject: `${subject}`,
        text: body.replace(/<[^>]+>/g, ""), // plain text fallback
        html: cleanBody(body),
      });

      return {
        transporter_response: info,
        success: true,
        message: "OTP sent successfully",
      };
    } catch (error) {
      console.error(error);
      return {
        transporter_response: error,
        success: false,
        message: "Failed to send OTP",
      };
    }
  }
}

export default new MailerService();
