import * as yup from 'yup';
import { Request, Response } from 'express';
import { Response200, SendErrorResponse } from '../../utils/Response';
import { ProjectService } from './Project.service';
import { projectSchema } from '../../helpers/validations/project';

interface MulterRequest extends Request {
  file: any;
}

export class ProjectController {
  private projectService: ProjectService;

  constructor() {
    this.projectService = new ProjectService();
  }

  async addProject(req: MulterRequest, res: Response) {
    try {
      //   console.log(req['user']);
      const {
        name,
        description,
        startDate,
        endDate,
        goalAmount,
        fundRaised,
        aboutTheCause,
        planOfAction,
      } = req.body;
      await projectSchema.validate(req.body);
      const file = req.file.filename;
      const result = await this.projectService.addProject({
        name,
        description,
        startDate,
        endDate,
        goalAmount,
        fundRaised,
        aboutTheCause,
        planOfAction,
        file,
      });
      return res.status(Response200.code).json(result);
    } catch (error) {
      if (error instanceof yup.ValidationError) {
        return res.status(400).json({ message: error.message });
      }
      return SendErrorResponse(error, res);
    }
  }
}
