import httpStatus from 'http-status';
import { UserQuery } from '../queries';
import sendResponse from '../helpers/response';
import mongoose from 'mongoose';

export const followUser = async (req, res, next) => {
  try {
    let { userId } = req.params;

    const followerId = req.token.id;

    const follower = await UserQuery.findById(followerId);

    if (userId === followerId) {
      return res.status(httpStatus.BAD_REQUEST).json(
        sendResponse(httpStatus.BAD_REQUEST, `You cannot follow yourself`, null, {
          error: 'You cannot follow yourself'
        })
      );
    }

    const alreadyFollowing = follower.following.some(item => item == userId)

    if (alreadyFollowing) {
      return res.status(httpStatus.CONFLICT).json(
        sendResponse(httpStatus.CONFLICT, `You are already following this tweep`, null, {
          error: 'You are already following this tweep'
        })
      );
    }

    const userToFollow = await UserQuery.findById(userId);
    

    if (userToFollow) {
      userToFollow.numberOfFollowers += 1;

      follower.numberOfFollowing += 1;

      userToFollow.followers.push(followerId);

      follower.following.push(userId);

      await userToFollow.save();
      await follower.save();

      const user = await UserQuery.findById(userId);

      return res
        .status(httpStatus.ACCEPTED)
        .json(
          sendResponse(
            httpStatus.ACCEPTED,
            `success, You just followed @${userToFollow.userName}`,
            user,
            null
          )
        );
    }

    return res.status(httpStatus.NOT_FOUND).json(
      sendResponse(httpStatus.NOT_FOUND, 'User not found', null, {
        error: 'User not found'
      })
    );
  } catch (err) {
    next(err);
  }
};
