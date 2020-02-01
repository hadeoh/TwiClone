import TweetReply from '../../models/tweetreply.model';

describe('Tweet model', () => {
  test('Body must be required', async () => {
    expect.assertions(1);

    try {
      await TweetReply.create({ });
    } catch (e) {
      expect(e).toBeTruthy();
    }
  });
  test('Body must be string', async () => {
    expect.assertions(0);

    try {
      await TweetReply.create({
        body: "The boy is good"
      });
    } catch (e) {
      expect(e).toBeTruthy();
    }
  });
});
