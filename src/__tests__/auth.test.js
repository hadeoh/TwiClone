import '@babel/polyfill';
import request from 'supertest';
import app from '../testApp';

describe('Sign Up route', () => {
  test('should create a new user', async () => {
    const res = await request(app)
      .post('/api/v1/auth/signup')
      .send({
        fullName: 'Usman Adio',
        userName: 'hadeoh',
        email: 'usmanadio@gmail.com',
        password: 'modupeola',
        confirmPassword: 'modupeola'
      });
    expect(res.statusCode).toEqual(201);
    expect(res.body.message).toBe('success');
    expect(res.body.errors).toBeNull();
    expect(res.body.payload).toHaveProperty(
      'email',
      'phone',
      'avatar',
      'location',
      'website',
      'numberOfFollowers',
      'numberOfFollowing',
      'followers',
      'following',
      'tweets',
      'fullName',
      'userName',
      'createdAt',
      'updatedAt',
      'id'
    );
    expect(res.body).toHaveProperty('statusCode');
    expect(res.body).toHaveProperty('message');
    expect(res.body).toHaveProperty('payload');
    expect(res.body).toHaveProperty('errors');
  });
  test('should throw error if no username', async () => {
    const res = await request(app)
      .post('/api/v1/auth/signup')
      .send({
        fullName: 'Usman Adio',
        email: 'usmanadio@gmail.com',
        password: 'modupeola',
        confirmPassword: 'modupeola'
      });
    expect(res.statusCode).toEqual(400);
    expect(res.body.message).toBe('Invalid fields');
    expect(res.body.payload).toBeNull();
    expect(res.body.errors).toHaveProperty('userName');
    expect(res.body).toHaveProperty('statusCode');
    expect(res.body).toHaveProperty('message');
    expect(res.body).toHaveProperty('errors');
  });
  test('should throw error if no password', async () => {
    const res = await request(app)
      .post('/api/v1/auth/signup')
      .send({
        fullName: 'Usman Adio',
        userName: 'hadeoh',
        email: 'usmanadio@gmail.com',
        confirmPassword: 'modupeola'
      });
    expect(res.statusCode).toEqual(400);
    expect(res.body.message).toBe('Invalid fields');
    expect(res.body.payload).toBeNull();
    expect(res.body.errors).toHaveProperty('password');
    expect(res.body).toHaveProperty('statusCode');
    expect(res.body).toHaveProperty('message');
    expect(res.body).toHaveProperty('errors');
  });
  test('should throw error if user already exists', async () => {
    await request(app)
      .post('/api/v1/auth/signup')
      .send({
        fullName: 'Usman Adio',
        userName: 'hadeoh',
        email: 'usmanadio@gmail.com',
        password: 'modupeola',
        confirmPassword: 'modupeola'
      });
    const res = await request(app)
      .post('/api/v1/auth/signup')
      .send({
        fullName: 'Usman Adio',
        userName: 'hadeoh',
        email: 'usmanadio@gmail.com',
        password: 'modupeola',
        confirmPassword: 'modupeola'
      });
    expect(res.statusCode).toEqual(409);
    expect(res.body.message).toBe('invalid credentials');
    expect(res.body.payload).toBeNull();
    expect(res.body.errors).toHaveProperty('issue');
    expect(res.body).toHaveProperty('statusCode');
    expect(res.body).toHaveProperty('message');
    expect(res.body).toHaveProperty('errors');
  });
});

describe('Login route', () => {
  beforeEach(async () => {
    await request(app)
      .post('/api/v1/auth/signup')
      .send({
        fullName: 'Usman Adio',
        userName: 'hadeoh',
        email: 'usmanadio@gmail.com',
        password: 'modupeola',
        confirmPassword: 'modupeola'
      });
  });
  test('should login a user', async () => {
    const res = await request(app)
    .post('/api/v1/auth/login')
    .send({
      loginParams: 'hadeoh',
      password: 'modupeola'
    })
    expect(res.statusCode).toEqual(200);
    expect(res.body.message).toBe('success');
    expect(res.body.errors).toBeNull();
    expect(res.body.payload.token).toBeDefined();
    expect(res.body.payload.user).toHaveProperty(
      'email',
      'phone',
      'avatar',
      'location',
      'website',
      'numberOfFollowers',
      'numberOfFollowing',
      'followers',
      'following',
      'tweets',
      'fullName',
      'userName',
      'createdAt',
      'updatedAt',
      'id'
    );
    expect(res.body).toHaveProperty('statusCode');
    expect(res.body).toHaveProperty('message');
    expect(res.body).toHaveProperty('payload');
    expect(res.body).toHaveProperty('errors');
  });
  test('should not allow a user login with wrong password', async () => {
    const res = await request(app)
    .post('/api/v1/auth/login')
    .send({
      loginParams: 'hadeoh',
      password: 'hgfh'
    })
    expect(res.statusCode).toEqual(400);
    expect(res.body.message).toBe('invalid email/username/password or password');
    expect(res.body.errors).toBeDefined();
    expect(res.body).toHaveProperty('statusCode');
    expect(res.body).toHaveProperty('message');
    expect(res.body).toHaveProperty('payload');
    expect(res.body).toHaveProperty('errors');
  });
  test('should not allow a user login with wrong login param', async () => {
    const res = await request(app)
    .post('/api/v1/auth/login')
    .send({
      loginParams: 'dfdf',
      password: 'modupeola'
    })
    expect(res.statusCode).toEqual(404);
    expect(res.body.message).toBe('User does not exist');
    expect(res.body.errors).toBeDefined();
    expect(res.body).toHaveProperty('statusCode');
    expect(res.body).toHaveProperty('message');
    expect(res.body).toHaveProperty('payload');
    expect(res.body).toHaveProperty('errors');
  });
});
