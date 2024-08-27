import * as yup from 'yup';
import { Request, Response } from 'express';
import { Response200, SendErrorResponse } from '../../utils/Response';
import { ProjectService } from './Project.service';
import { projectSchema } from '../../helpers/validations/project';
import fs from 'fs';
import path from 'path';

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

  async getProject(req: Request, res: Response) {
    try {
      const { id } = req.params;
      const result = await this.projectService.getProject(parseInt(id));
      return res.status(Response200.code).json(result);
    } catch (error) {
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

  async deleteProject(req: Request, res: Response) {
    try {
      const { id } = req.params;
      const result = await this.projectService.deleteProject(parseInt(id));
      return res.status(200).json(result);
    } catch (error) {
      return SendErrorResponse(error, res);
    }
  }

  async streamImage(req: Request, res: Response) {
    try {
      const { filename } = req.params;
      const filePath = path.join(__dirname, `../../uploads/projects/${filename}`);
      const ext = filename.split('.')[1];
      const img = fs.readFileSync(filePath);
      res.writeHead(200, { 'Content-Type': `image/${ext}` });
      res.end(img, 'binary');
    } catch (error) {
      return SendErrorResponse(error, res);
    }
  }

  async downloadImage(req: Request, res: Response) {
    try {
      const { filename } = req.params;
      const filePath = path.join(__dirname, `../../uploads/projects/${filename}`);
      res.download(filePath);
    } catch (error) {
      return SendErrorResponse(error, res);
    }
  }
}
