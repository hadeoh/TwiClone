import httpStatus from 'http-status';
import sendResponse from '../helpers/response';
import { UserQuery } from '../queries';
import * as bcryptService from '../services/bcrypt.service';
import * as authService from '../services/auth.service';

export const signUp = async (req, res, next) => {
  try {
    const { fullName, email, phone, userName, password } = req.body;

    const userExist = await UserQuery.findOne({
      phone: { $eq: phone },
      email: { $eq: email },
      userName: { $eq: userName }
    });

    if (userExist) {
      return res.status(httpStatus.BAD_REQUEST).json(
        sendResponse(httpStatus.BAD_REQUEST, 'invalid credentials', null, {
          issue: 'email/username/phone has been taken'
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

    return res.json(sendResponse(httpStatus.CREATED, 'success', user, null));
  } catch (err) {
    next(err);
  }
};

export const login = async (req, res, next) => {
  try {
    const { loginParams, password } = req.body;

    let user = await UserQuery.findOne({
      $or: [{ phone: loginParams }, { email: loginParams }, { userName: loginParams }]
    });

    if (!user) {
      return res.status(httpStatus.NOT_FOUND).json(
        sendResponse(httpStatus.NOT_FOUND, 'User does not exist', null, {
          error: 'User does not exist'
        })
      );
    }

    if (await bcryptService.comparePassword(password, user.password)) {
      // to issue token with the user object, convert it to JSON
      const token = authService.issue(user.toJSON());

      user = { user, token };

      return res.json(sendResponse(httpStatus.OK, 'success', user, null));
    }

    return res.status(httpStatus.BAD_REQUEST).json(
      sendResponse(httpStatus.BAD_REQUEST, 'invalid email/username/password or password', null, {
        issue: 'invalid email/username/password or password'
      })
    );
  } catch (err) {
    next(err);
  }
};
