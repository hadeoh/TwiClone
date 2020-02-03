import request from 'supertest';
import app from '../app';

const AUTH_BASE_URL = '/api/v1/auth';
const TWEET_BASE_URL = '/api/v1/tweets';

describe('Tweets route', () => {
  let userToken;
  it('should create a new tweet', async () => {
    await request(app)
      .post(`${AUTH_BASE_URL}/signup`)
      .send({
        fullName: 'Usman Adio',
        userName: 'hadeoh',
        email: 'usmanadio@gmail.com',
        password: 'modupeola',
        confirmPassword: 'modupeola'
      });
    const user = await request(app)
      .post(`${AUTH_BASE_URL}/login`)
      .send({
        loginParams: 'usmanadio@gmail.com',
        password: 'modupeola'
      });

    userToken = user.body.payload.token;

    const res = await request(app).post(`${TWEET_BASE_URL}`)
      .set('Authorization', `Bearer ${userToken}`)
      .send({
        content: 'I am here'
      });

    expect(res.statusCode).toEqual(200);
    expect(res.body).toHaveProperty('statusCode');
    expect(res.body).toHaveProperty('message');
    expect(res.body).toHaveProperty('payload');
    expect(res.body.errors).toBeNull();
  });
});
