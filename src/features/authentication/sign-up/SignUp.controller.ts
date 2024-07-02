import { HttpErrorResponse, Response200 } from "../../../utils/Response";
import { SignUpService } from "./SignUp.service";
import { Request, Response } from 'express'

export class SignUpController {
  private signUpService: SignUpService

  constructor() {
    this.signUpService = new SignUpService()
  }

  async createMember(req: Request, res: Response) {
    try {
      const result = await this.signUpService.createMember(req.body)
      return res.status(Response200.code).json(result)
    } catch (error) {
      const { message, code } = error as HttpErrorResponse
      return res.status(code).json(message)
    }
  }
}