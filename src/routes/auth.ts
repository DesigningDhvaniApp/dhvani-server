import { Router } from 'express';
import { SignUpController } from '../features/authentication/sign-up/SignUp.controller';

const router = Router();
const signUpController = new SignUpController();

router.post('/member/signup', signUpController.createMember.bind(signUpController));
router.put('/member/update', signUpController.updateMember.bind(signUpController));
router.get('/member/:id', signUpController.findMember.bind(signUpController));
router.delete('/member/:id', signUpController.deleteMember.bind(signUpController));

export default router;
