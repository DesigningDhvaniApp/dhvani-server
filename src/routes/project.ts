import { Router } from 'express';
import { ProjectController } from '../features/project/Project.controller';
import { verify } from '../middlewares/authenticate';
import uploadProjectFiles from '../multer-fileUploader/multer';

const router = Router();
const projectController = new ProjectController();

router.post(
  '/project',
  verify,
  uploadProjectFiles.single('flyer'),
  projectController.addProject.bind(projectController),
);

export default router;
