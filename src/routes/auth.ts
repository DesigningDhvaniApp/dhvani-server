import { Router } from 'express';
import { AuthenticationController } from '../features/authentication/Authentication.controller';


const router = Router();
const authenticationController = new AuthenticationController();

router.post('/member/signup', authenticationController.createMember.bind(authenticationController));
router.put('/member/update', authenticationController.updateMember.bind(authenticationController));
router.get('/member/:id', authenticationController.findMember.bind(authenticationController));
router.delete('/member/:id', authenticationController.deleteMember.bind(authenticationController));
router.post('/sign-in', authenticationController.findUser.bind(authenticationController));
router.post('/forgot-password', authenticationController.forgotPassword.bind(authenticationController));

export default router;
