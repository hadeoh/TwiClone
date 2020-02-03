import httpStatus from 'http-status';
import sendResponse from '../helpers/response';
import { TweetQuery, UserQuery } from '../queries';

export const postTweet = async (req, res, next) => {
  try {
    const { body } = req.body;

    const userId = req.token.id;

    const tweet = await TweetQuery.create({ body, postedBy: userId });

    const user = await UserQuery.findById(userId);

    user.tweets.push(tweet);

    await user.save();

    return res
      .status(httpStatus.CREATED)
      .json(sendResponse(httpStatus.CREATED, 'success', tweet, null));
  } catch (err) {
    next(err);
  }
};

export const replyTweet = async (req, res, next) => {
  try {
    const { body } = req.body;

    const userId = req.token.id;

    const tweetId = req.params.tweetId;

    const tweet = await TweetQuery.findById(tweetId);

    if (tweet) {
      const newTweet = await TweetQuery.create({ body, postedBy: userId });

      const personWhoReplied = await UserQuery.findById(userId);

      personWhoReplied.tweets.push(newTweet);

      tweet.numberOfReplies += 1;

      tweet.replies.push({ body, postedBy: userId, timeReplied: Date.now() });

      await Promise.all([personWhoReplied.save(), tweet.save()]);

      const user = await UserQuery.findById(tweet.postedBy);

      const tweetObj = await TweetQuery.findById(tweetId);

      return res
        .status(httpStatus.CREATED)
        .json(
          sendResponse(httpStatus.CREATED, `success, replying to @${user.userName}`, tweetObj, null)
        );
    }

    return res.status(httpStatus.NOT_FOUND).json(
      sendResponse(httpStatus.NOT_FOUND, 'Tweet not found', null, {
        error: 'Tweet not found'
      })
    );
  } catch (err) {
    next(err);
  }
};