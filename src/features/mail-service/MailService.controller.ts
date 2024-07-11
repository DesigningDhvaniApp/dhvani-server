import { Response200, SendErrorResponse } from '../../utils/Response';
import { MailService } from './MailService';
import { MailData } from './Types';
import { Request, Response } from 'express';

export class MailServiceController {
  private mailService: MailService;

  constructor() {
    this.mailService = new MailService();
  }

  public async sendMail(req: Request, res: Response) {
    try {
      const { email, userName } = req.body
      const mailData: MailData = {
        to: email,
        subject: 'Welcome to Our Service',
        templateName: 'mail', // The name of your HTML template file without the .html extension
        replacements: {
          name: userName, // Replace {{username}} in your template
        },
      };
  
      const result = await this.mailService.send(mailData);
      return res.status(Response200.code).json(result);
    } catch (error) {
      return SendErrorResponse(error, res);
    }
    
  }
}
