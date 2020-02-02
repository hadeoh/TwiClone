import httpStatus from 'http-status';
import { UserQuery, TweetQuery } from '../queries';
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

    const alreadyFollowing = follower.following.some(item => item == userId);

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

      await Promise.all([userToFollow.save(), follower.save()]);

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

export const viewOwnTimeline = async (req, res, next) => {
  try {
    const ownId = req.token.id;

    const ownUser = await UserQuery.findById(ownId);

    const result = [];

    for (const followingId of ownUser.following) {
      const followingTweets = await TweetQuery.findOne({ postedBy: followingId })
        .populate({ path: 'postedBy', select: 'fullName userName avatar' })
        .populate({ path: 'replies.postedBy', select: 'fullName userName avatar' })
        .exec();
      result.push(followingTweets);
    }

    const ownUserTweets = await TweetQuery.findOne({ postedBy: req.token.id })
      .populate({ path: 'postedBy', select: 'fullName userName avatar' })
      .populate({ path: 'replies.postedBy', select: 'fullName userName avatar' })
      .exec();
    result.push(ownUserTweets);
    result.sort((a, b) => b.createdAt - a.createdAt);
    const { id, avatar, userName, numberOfFollowers, numberOfFollowing } = req.token;

    result.unshift({ id, avatar, userName, numberOfFollowers, numberOfFollowing });

    return res
      .status(httpStatus.OK)
      .json(sendResponse(httpStatus.OK, 'Here are your tweets', result, null));
  } catch (err) {
    next(err);
  }
};
