import { Router } from 'express';
import { ProjectController } from '../features/project/Project.controller';
import { isAdmin } from '../middlewares/authenticate';
import { uploadProjectFiles } from '../multer-fileUploader/multer';

const router = Router();
const projectController = new ProjectController();

router.post(
  '/',
  isAdmin,
  uploadProjectFiles.single('flyer'),
  projectController.addProject.bind(projectController),
);

router.get('/:id', projectController.getProject.bind(projectController));

router.get('/', projectController.getProjects.bind(projectController));

router.delete('/:id', isAdmin, projectController.deleteProject.bind(projectController));

export default router;
