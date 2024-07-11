import { Router } from 'express';
import { MailServiceController } from '../features/mail-service/MailService.controller';

const router = Router();
const mailServiceController = new MailServiceController();

router.post('/sendMail', mailServiceController.sendMail.bind(mailServiceController));

export default router;
