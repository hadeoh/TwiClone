import { Router } from 'express';
import { celebrate as validate } from 'celebrate';
import userValidation from '../validations/user.validation';
import { auth as Authorize } from '../policies/auth.policy';
import * as userController from '../controllers/user.controller';

const router = Router();

router.use(Authorize);

router
  .route('/follow/:followId')
  .post(validate(userValidation.followUser, { abortEarly: false }), userController.followUser);


export default router;
