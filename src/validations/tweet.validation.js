import { Joi } from 'celebrate';

const userValidation = {
  // POST /api/v1/tweet/post
  postTweet: {
    body: {
      body: Joi.string()
        .max(500)
        .required(),
      userId: Joi.number()
    }
  },
};

export default userValidation;
