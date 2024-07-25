import * as yup from 'yup';
import { Request, Response } from 'express';
import { AuthenticationService } from './Authentication.service';
import { Response200, SendErrorResponse } from '../../utils/Response';

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
    zipCode: yup.number().required(),
  }),
});

export class AuthenticationController {
  private authenticationService: AuthenticationService;

  constructor() {
    this.authenticationService = new AuthenticationService();
  }

  async createMember(req: Request, res: Response) {
    try {
      await memberSchema.validate(req.body);
      const result = await this.authenticationService.createMember(req.body);
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
      await this.authenticationService.updateMember(member);
      return res.status(200).json('Member updated!');
    } catch (error) {
      return SendErrorResponse(error, res);
    }
  }

  public async findMember(req: Request, res: Response) {
    try {
      const { id } = req.params;
      const result = await this.authenticationService.findMember(parseInt(id));
      return res.status(200).json(result);
    } catch (error) {
      return SendErrorResponse(error, res);
    }
  }

  public async deleteMember(req: Request, res: Response) {
    try {
      const { id } = req.params;
      await this.authenticationService.deleteMember(parseInt(id));
      return res.status(200).json(`Member with id = ${id} is deleted!`);
    } catch (error) {
      return SendErrorResponse(error, res);
    }
  }

  async findUser(req: Request, res: Response) {
    try {
      const { userNameOrEmail, password } = req.body;
      const member = await this.authenticationService.signIn(userNameOrEmail, password);
      return res.status(200).json(member);
    } catch (error) {
      return SendErrorResponse(error, res);
    }
  }

  async forgotPassword(req: Request, res: Response) {
    try {
      const { email } = req.body;
      await this.authenticationService.forgotPassword(email);
      return res.status(200).json('Forgot Password Mail Sent Successfully!!');
    } catch (error) {
      return SendErrorResponse(error, res);
    }
  }
}
