import httpStatus from 'http-status';
import { FollowQuery } from '../queries';
import sendResponse from '../helpers/response';

export const getAll = async (_req, res, next) => {
  try {
    const users = await UserQuery.findAll({});
    return res.json(sendResponse(httpStatus.OK, 'success', users, null));
  } catch (err) {
    next(err);
  }
};

export const followUser = async (req, res, next) => {
  try {
    const { id: user } = req.token;
    const { followId } = req.params;

    const unfollowUser = await FollowQuery.delete({ followId });

    if (unfollowUser) {
      return res.json(
        sendResponse(httpStatus.OK, 'success', { status: 'User successfully unfollowed' }, null)
      );
    }

    const follow = await FollowQuery.create({ user, followId });
    return res.json(sendResponse(httpStatus.OK, 'success', follow, null));
  } catch (err) {
    next(err);
  }
};
