import httpStatus from 'http-status';
import sendResponse from '../helpers/response';

const validateSignUp = (req, res, next) => {
  const { email, phone, password, confirmPassword } = req.body;
  const errors = {};

  if (password !== confirmPassword) {
    errors['password'] = 'password does not match';
  }

  if (!email && !phone) {
    errors['phone'] = 'phone is required';
    errors['email'] = 'email is required';
  }

  if (Object.keys(errors).length) {
    return res
      .status(httpStatus.BAD_REQUEST)
      .json(sendResponse(httpStatus.BAD_REQUEST, 'invalid credentials', null, errors));
  }

  !email ? (req.availableField = 'phone') : 'email';
  !phone ? (req.availableField = 'email') : 'phone';

  next();
};

export default validateSignUp;
