import { Joi } from 'celebrate';

const userValidation = {
  // POST /api/v1/auth/signup
  signUp: {
    body: {
      fullName: Joi.string()
        .max(200)
        .required(),
      userName: Joi.string()
        .min(2)
        .max(200)
        .required(),
      email: Joi.string()
        .email()
        .max(200),
      phone: Joi.string().max(200),
      password: Joi.string()
        .min(6)
        .max(255)
        .required(),
      confirmPassword: Joi.string().required()
    }
  },

  // POST /api/v1/auth/login
  login: {
    body: {
      email: Joi.string(),
      phone: Joi.string(),
      userName: Joi.string(),
      password: Joi.string().required()
    }
  },
};

export default userValidation;
