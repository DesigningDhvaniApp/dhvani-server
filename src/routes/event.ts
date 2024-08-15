import { Router } from 'express';
import { EventController } from '../features/event/Event.controller';
import { uploadEventFiles } from '../multer-fileUploader/multer';
import { isAdmin } from '../middlewares/authenticate';

const router = Router();
const eventController = new EventController();

router.get('/', eventController.getEvents.bind(eventController));

router.post(
  '/',
  isAdmin,
  uploadEventFiles.single('flyer'),
  eventController.addEvent.bind(eventController),
);

export default router;
