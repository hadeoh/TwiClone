import User from '../models/user.model';

describe('User model', () => {
  test('full name, user name and password must be required', async () => {
    expect.assertions(1);

    try {
      await User.create({
        email: 'sasha@gmail.com',
        phone: '07019703051'
      });
    } catch (e) {
      expect(e).toBeTruthy();
    }
  });
  test('full name should be a string', async () => {
    expect.assertions(0);

    try {
      await User.create({
        fullName: 122,
        userName: 'hadeoh',
        password: 'modupeola',
        email: 'usman@gmail.com'
      });
    } catch (e) {
      expect(e).toBeTruthy();
    }
  });
  test('email should be a string', async () => {
    expect.assertions(1);

    try {
      await User.create({
        fullName: 'usmanadio',
        userName: 'hadeoh',
        password: 'modupeola',
        email: 123
      });
    } catch (e) {
      expect(e).toBeTruthy();
    }
  });
  test('username should be a string', async () => {
    expect.assertions(0);

    try {
      await User.create({
        fullName: 'usmanadio',
        userName: 'hadeoh',
        password: 'modupeola',
        email: 'usmanadio@gmail.com'
      });
    } catch (e) {
      expect(e).toBeTruthy();
    }
  });
  test('phone should be a string', async () => {
    expect.assertions(0);

    try {
      await User.create({
        fullName: 'usmanadio',
        userName: 'hadeoh',
        password: 'modupeola',
        phone: '07019703051'
      });
    } catch (e) {
      expect(e).toBeTruthy();
    }
  });
});
