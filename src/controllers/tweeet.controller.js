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

    user.save();

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

      await personWhoReplied.save();
      
      tweet.numberOfReplies += 1;

      tweet.replies.push({ body, postedBy: userId, timeReplied: Date.now() });

      await tweet.save();

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
