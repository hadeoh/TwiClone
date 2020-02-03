import { Joi } from 'celebrate';

const tweetValidation = {
  // POST /api/v1/tweets
  postTweet: {
    body: {
      content: Joi.string()
        .max(500)
        .required()
    }
  },
};

export default tweetValidation;
