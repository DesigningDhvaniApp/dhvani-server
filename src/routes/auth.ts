import { Router } from 'express';
import { AuthenticationController } from '../features/authentication/Authentication.controller';

const router = Router();
const authenticationController = new AuthenticationController();

router.post('/signup', authenticationController.createMember.bind(authenticationController));
router.put('/update', authenticationController.updateMember.bind(authenticationController));
router.get('/:id', authenticationController.findMember.bind(authenticationController));
router.delete('/:id', authenticationController.deleteMember.bind(authenticationController));
router.post('/sign-in', authenticationController.findUser.bind(authenticationController));
router.post(
  '/forgot-password',
  authenticationController.forgotPassword.bind(authenticationController),
);
router.post(
  '/forgot-password/verify',
  authenticationController.verifyForgotPassword.bind(authenticationController),
);

export default router;
