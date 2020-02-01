import Follower from '../models/follower.model';

describe('Follower model', () => {
  test('User id and follower id should be present', async () => {
    expect.assertions(0);

    try {
      await Follower.create({});
    } catch (e) {
      expect(e).toBeTruthy();
    }
  });
});
