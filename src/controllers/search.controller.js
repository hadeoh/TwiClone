import httpStatus from 'http-status';
import sendResponse from '../helpers/response';
import { TweetQuery, UserQuery } from '../queries';

export const searchUserAndTweets = async (req, res, next) => {
  try {
    const { searchParams } = req.body;

    const tweetRegex = new RegExp(searchParams, 'i');

    const userRegex = new RegExp(searchParams, 'i');

    const tweetSearchResults = await TweetQuery.findAll({ body: tweetRegex })
      .populate({ path: 'postedBy', select: 'fullName userName avatar' })
      .populate({ path: 'replies.postedBy', select: 'fullName userName avatar' })
      .sort('createdAt')
      .exec();

    const userSearchResults = await UserQuery.findAll({ $or: [{ userName: userRegex }, { fullName: userRegex }] })
      .sort('userName')
      .select('userName avatar fullName');

    if (!tweetSearchResults.length && !userSearchResults.length) {
      return res.status(httpStatus.NOT_FOUND).json(
        sendResponse(httpStatus.NOT_FOUND, 'Data not found', null, {
          error: 'Data not found'
        })
      );
    }

    const result = {tweetSearchResults, userSearchResults};

    return res
      .status(httpStatus.OK)
      .json(
        sendResponse(httpStatus.OK, `Here are the results of your search`, result, null)
      );
  } catch (err) {
    next(err);
  }
};
