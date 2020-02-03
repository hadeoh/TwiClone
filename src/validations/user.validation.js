import { Joi } from 'celebrate';

const userValidation = {
  // POST /api/v1/users
  followUser: {
    params: {
      followId: Joi.string()
        .min(24)
        .max(24)
        .required()
    }
  }
};

export default userValidation;
