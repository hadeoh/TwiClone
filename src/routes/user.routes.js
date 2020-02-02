import { Router } from 'express';
import * as userController from '../controllers/user.controller';
import { auth as Auth } from '../policies/auth.policy';

const router = Router();

router.use(Auth);
router.route('/:userId/follow').put(userController.followUser);

router.route('/ownTimeline').get(userController.viewOwnTimeline);

export default router;
