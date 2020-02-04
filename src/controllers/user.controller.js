import httpStatus from 'http-status';
import { FollowQuery, TweetQuery, UserQuery } from '../queries';
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

    const unfollowUser = await FollowQuery.delete({ followId }, { followId, user });

    if (unfollowUser.deletedCount) {
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

export const timeline = async (req, res, next) => {
  try {
    const { id: user } = req.token;

    const { page, limit } = req.query;

    const following = await FollowQuery.findAll({ user });

    const followingIds = following.map(({ followId }) => followId);

    const parameters = [...followingIds, user];

    const tweets = await TweetQuery.findAll({ user: { $in: parameters } })
      .populate([
        {
          path: 'user',
          select: 'userName avatar fullName -_id'
        },
        {
          path: 'replyTo',
          populate: {
            path: 'user',
            select: 'userName avatar fullName -_id'
          }
        }
      ])
      .skip(+page)
      .limit(+limit)
      .sort('createdAt');
    return res.json(sendResponse(httpStatus.OK, 'success', tweets, null));
  } catch (err) {
    next(err);
  }
};
