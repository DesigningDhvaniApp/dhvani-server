import { Router } from 'express';
import { ContactController } from '../features/contacts/Contact.controller';

const router = Router();
const contactController = new ContactController();

router.post('/contact', contactController.createContact.bind(contactController));

export default router;