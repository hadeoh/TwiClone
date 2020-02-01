import { Router } from 'express';
import { celebrate as validate } from 'celebrate';
import paramsValidation from '../validations/auth.validation';
import validateSignUp from '../middlewares/signup.middleware';
import * as authController from '../controllers/auth.controller';

const router = Router();

router.route('/signup').post(
  validate(paramsValidation.signUp, { abortEarly: false }),
  validateSignUp,
  authController.signUp
);

export default router;
