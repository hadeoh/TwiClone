import httpStatus from 'http-status';
import { TweetQuery } from '../queries';
import sendResponse from '../helpers/response';

export const postTweet = async (req, res, next) => {
  try {
    const { content } = req.body;

    const { id: user } = req.token;

    const tweet = await TweetQuery.create({ content, user });

    return res.json(sendResponse(httpStatus.CREATED, 'success', tweet, null));
  } catch (err) {
    next(err);
  }
};

export const replyTweet = async (req, res, next) => {
  try {
    const { content } = req.body;

    const { id: user } = req.token;

    const { tweetId: replyTo } = req.params;    

    const tweet = await TweetQuery.create({ content, user, replyTo });

    return res.json(sendResponse(httpStatus.CREATED, 'success', tweet, null));
  } catch (err) {
    next(err);
  }
};
