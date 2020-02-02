import Tweet from '../models/tweet.model';

describe('Tweet model', () => {
  test('Body must be required', async () => {
    expect.assertions(1);

    try {
      await Tweet.create({ });
    } catch (e) {
      expect(e).toBeTruthy();
    }
  });
  test('Body must be string', async () => {
    expect.assertions(0);

    try {
      await Tweet.create({
        body: "The boy is good"
      });
    } catch (e) {
      expect(e).toBeTruthy();
    }
  });
});
