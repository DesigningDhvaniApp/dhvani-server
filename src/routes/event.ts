import { Router } from 'express';
import { isAdmin } from '../middlewares/authenticate';
import { uploadEventFiles } from '../multer-fileUploader/multer';
import { EventController } from '../features/event/Event.controller';

const router = Router();
const eventController = new EventController();

router.post(
  '/',
  isAdmin,
  uploadEventFiles.single('flyer'),
  eventController.addEvent.bind(eventController),
);

router.delete('/:id', isAdmin, eventController.deleteEvent.bind(eventController));

export default router;
