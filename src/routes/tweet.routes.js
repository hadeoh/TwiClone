import { Router } from 'express';
import { celebrate as validate } from 'celebrate';
import paramsValidation from '../validations/tweet.validation';
import * as tweetController from '../controllers/tweeet.controller';
import { auth as Auth} from '../policies/auth.policy'

const router = Router();

router.use(Auth);
router
  .route('/')
  .post(
    validate(paramsValidation.postTweet, { abortEarly: false }),
    tweetController.postTweet
  );

export default router;
