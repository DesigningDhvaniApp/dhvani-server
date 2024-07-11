import { Response200, SendErrorResponse } from '../../../utils/Response';
import { SignUpService } from './SignUp.service';
import { Request, Response } from 'express';
import * as yup from 'yup';

const memberSchema = yup.object({
  firstName: yup.string().required(),
  lastName: yup.string().required(),
  phone: yup.number().required(),
  userName: yup.string().required(),
  email: yup.string().email().required(),
  password: yup.string().min(4).required(),
  address: yup.object({
    addressLine: yup.string().required(),
    city: yup.string().required(),
    state: yup.string().required(),
    country: yup.string().required(),
    zipCode: yup.number().required()
  })
});

export class SignUpController {
  private signUpService: SignUpService;

  constructor() {
    this.signUpService = new SignUpService();
  }

  async createMember(req: Request, res: Response) {
    try {
      await memberSchema.validate(req.body);
      const result = await this.signUpService.createMember(req.body);
      return res.status(Response200.code).json(result);
    } catch (error) {
      if (error instanceof yup.ValidationError) {
        return res.status(400).json({ message: error.message });
      }
      return SendErrorResponse(error, res);
    }
  }

  public async updateMember(req: Request, res: Response) {
    try {
      const member = req.body;
      await this.signUpService.updateMember(member);
      return res.status(200).json('Member updated!');
    } catch (error) {
      return SendErrorResponse(error, res);
    }
  }

  public async findMember(req: Request, res: Response) {
    try {
      const { id } = req.params;
      const result = await this.signUpService.findMember(parseInt(id));
      return res.status(200).json(result);
    } catch (error) {
      return SendErrorResponse(error, res);
    }
  }

  public async deleteMember(req: Request, res: Response) {
    try {
      const { id } = req.params;
      await this.signUpService.deleteMember(parseInt(id));
      return res.status(200).json(`Member with id = ${id} is deleted!`);
    } catch (error) {
      return SendErrorResponse(error, res);
    }
  }
}
