import { Router } from 'express';
import { celebrate as validate } from 'celebrate';
import * as userController from '../controllers/user.controller';
import { auth as Auth } from '../policies/auth.policy';

const router = Router();

router.use(Auth);
router
  .route('/:userId/follow')
  .put(
    userController.followUser
  );

export default router;
