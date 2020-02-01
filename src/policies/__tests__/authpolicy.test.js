import { auth as Auth} from '../auth.policy'

describe('Auth Policy', () => {
  test('Token must be provided', async () => {
    expect.assertions(2);

    try {
      Auth();
    } catch (e) {
      expect(e).toBeTruthy();
      expect(e.message).toEqual('Cannot read property \'header\' of undefined')
    }
  });
});