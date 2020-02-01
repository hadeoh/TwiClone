import httpStatus from 'http-status';
import sendResponse from '../helpers/response';

const validateLogin = (req, res, next) => {
  const { email, phone, userName } = req.body;
  const errors = {};

  if (!email && !phone && !userName) {
    errors['phone'] = 'phone is required or';
    errors['email'] = 'email is required or ';
    errors['username'] = 'username is required';
  }

  if (Object.keys(errors).length) {
    return res
      .status(httpStatus.BAD_REQUEST)
      .json(sendResponse(httpStatus.BAD_REQUEST, 'invalid credentials', null, errors));
  }

  next();
};

export default validateLogin;
