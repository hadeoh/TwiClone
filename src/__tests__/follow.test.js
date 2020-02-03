import Follow from '../models/follow.model';

describe('Follower model', () => {
  test('User id and follower id should be present', async () => {
    expect.assertions(1);

    try {
      await Follow.create({});
    } catch (e) {
      expect(e).toBeTruthy();
    }
  });
});
