import { Router } from 'express';
import { SignUpController } from '../features/authentication/sign-up/SignUp.controller'

const router = Router();
const signUpController = new SignUpController();

router.post('/signup', signUpController.createMember.bind(signUpController));

export default router;
