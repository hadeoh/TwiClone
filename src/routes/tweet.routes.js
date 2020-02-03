import { Router } from 'express';
import { celebrate as validate } from 'celebrate';
import tweetValidation from '../validations/tweet.validation';
import { auth as Authorize } from '../policies/auth.policy';
import * as tweetController from '../controllers/tweet.controller';

const router = Router();

router.use(Authorize);

router
  .route('/')
  .post(validate(tweetValidation.postTweet, { abortEarly: false }), tweetController.postTweet);

router
  .route('/reply/:tweetId')
  .post(validate(tweetValidation.postTweet, { abortEarly: false }), tweetController.replyTweet);

export default router;
