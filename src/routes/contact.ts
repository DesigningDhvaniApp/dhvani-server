import { Router } from 'express';
import { ContactController } from '../features/contact/Contact.controller';

const router = Router();
const contactController = new ContactController();

router.post('/', contactController.createContact.bind(contactController));

export default router;
