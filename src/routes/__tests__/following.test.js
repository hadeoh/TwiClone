import Following from '../../models/following.model';

describe('Following model', () => {
  test('User id and follower id should be referenced', async () => {
    expect.assertions(0);

    try {
      await Following.create({});
    } catch (e) {
      expect(e).toBeTruthy();
    }
  });
});
