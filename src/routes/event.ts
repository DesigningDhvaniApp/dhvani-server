import { Router } from 'express';
import { EventController } from '../features/event/Event.controller';
import { isAdmin } from '../middlewares/authenticate';
import { uploadEventFiles } from '../multer-fileUploader/multer';

const router = Router();
const eventController = new EventController();

router.post(
  '/',
  isAdmin,
  uploadEventFiles.single('flyer'),
  eventController.addEvent.bind(eventController),
);

router.get('/:id', eventController.getEvent.bind(eventController));

export default router;
