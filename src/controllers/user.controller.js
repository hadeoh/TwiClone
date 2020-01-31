import httpStatus from 'http-status';
import { UserQuery } from '../queries';
import sendResponse from '../helpers/response';

export const getAll = async (_req, res, next) => {
  try {
    const users = await UserQuery.findAll({});
    return res.json(sendResponse(httpStatus.OK, 'success', users, null));
  } catch (err) {
    next(err);
  }
};
