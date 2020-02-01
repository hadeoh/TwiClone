import httpStatus from 'http-status';
import sendResponse from '../helpers/response';
import { TweetQuery } from '../queries';

export const postTweet = async (req, res, next) => {
  try {
    const { body } = req.body;

    const userId = req.token.id;

    let tweet = await TweetQuery.create({ body, userId });

    if (!tweet) {
      return res.status(httpStatus.UNPROCESSABLE_ENTITY).json(
        sendResponse(httpStatus.UNPROCESSABLE_ENTITY, 'Unable to post tweet', null, {
          error: 'Unable to post tweet'
        })
      );
    }

    return res
      .status(httpStatus.CREATED)
      .json(sendResponse(httpStatus.CREATED, 'success', tweet, null));
  } catch (err) {
    next(err);
  }
};
