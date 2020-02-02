import { Router } from 'express';
import * as searchController from '../controllers/search.controller';
import { auth as Auth } from '../policies/auth.policy';

const router = Router();

router.use(Auth);
router.route('/userAndTweets').get(searchController.searchUserAndTweets);

export default router;