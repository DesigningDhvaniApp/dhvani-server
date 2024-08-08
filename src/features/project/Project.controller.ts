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
      await projectSchema.validate(req.body);
      const result = await this.projectService.addProject({
        ...req.body,
        flyer: req.file?.filename,
      });
      return res.status(Response200.code).json(result);
    } catch (error) {
      if (error instanceof yup.ValidationError) {
        return res.status(400).json({ message: error.message });
      }
      return SendErrorResponse(error, res);
    }
  }

  async getProjects(req: Request, res: Response) {
    try {
      const category = req.query.category as string;
      const result = await this.projectService.getProjects(category);
      return res.status(Response200.code).json(result);
    } catch (error) {
      return SendErrorResponse(error, res);
    }
  }
}
