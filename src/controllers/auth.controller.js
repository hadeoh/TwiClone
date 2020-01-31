import httpStatus from 'http-status';

import sendResponse from '../helpers/response';
import { UserQuery } from '../queries';

export const signUp = async (req, res, next) => {
  try {
    const { fullName, email, phone, userName, password } = req.body;

    const userExist = await UserQuery.findOne({ $or: [{ phone }, { email }, { userName }] });

    if (userExist) {
      return res.status(httpStatus.BAD_REQUEST).json(
        sendResponse(httpStatus.BAD_REQUEST, 'invalid credentials', null, {
          email: 'email has been taken'
        })
      );
    }

    const user = await UserQuery.create({
      fullName,
      email,
      phone,
      password,
      userName
    });

    return res.json(sendResponse(httpStatus.OK, 'success', user, null));
  } catch (err) {
    next(err);
  }
};
