import { Router } from 'express';
import { isAdmin } from '../middlewares/authenticate';
import { EventController } from '../features/event/Event.controller';

const router = Router();
const eventController = new EventController();

router.delete('/:id', isAdmin, eventController.deleteEvent.bind(eventController));

export default router;
