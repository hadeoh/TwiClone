import { Joi } from 'celebrate';

const tweetValidation = {
  // POST /api/v1/tweet/post
  postTweet: {
    body: {
      body: Joi.string()
        .max(500)
        .required(),
      userId: Joi.number()
    }
  },
  tweetReply: {
    body: {
      body: Joi.string()
        .max(500)
        .required()
    }
  },
};

export default tweetValidation;
