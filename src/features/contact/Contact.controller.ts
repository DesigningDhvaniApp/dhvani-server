import * as yup from 'yup';
import { Request, Response } from 'express';
import { ContactService } from './Contact.service';
import { Response200, SendErrorResponse } from '../../utils/Response';
import { contactSchema } from '../../helpers/validations/contact';

export class ContactController {
  private contactService: ContactService;

  constructor() {
    this.contactService = new ContactService();
  }

  async createContact(req: Request, res: Response) {
    try {
      await contactSchema.validate(req.body);
      const result = await this.contactService.createContact(req.body);
      return res.status(Response200.code).json(result);
    } catch (error) {
      if (error instanceof yup.ValidationError) {
        return res.status(400).json({ message: error.message });
      }
      return SendErrorResponse(error, res);
    }
  }
}
