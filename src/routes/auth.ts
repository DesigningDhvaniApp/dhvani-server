import { Router } from 'express';
import { SignUpController } from '../features/authentication/sign-up/SignUp.controller'

const router = Router();
const signUpController = new SignUpController();

router.post('/signup', signUpController.createMember.bind(signUpController));
router.put('/signup', signUpController.updateMember.bind(signUpController));
router.get('/signup/:id', signUpController.findMember.bind(signUpController));
router.delete('/signup/:id', signUpController.deleteMember.bind(signUpController));

export default router;
