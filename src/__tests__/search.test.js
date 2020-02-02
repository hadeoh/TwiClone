import '@babel/polyfill';
import request from 'supertest';
import app from '../testApp';

describe('Searc route', () => {
  let userToken;
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

    const secondResponse = await request(app)
      .post('/api/v1/auth/signup')
      .send({
        fullName: 'Usman Adio',
        userName: 'dayoooo',
        phone: '07087647436',
        password: 'modupeola',
        confirmPassword: 'modupeola'
      });

    const response = await request(app)
      .post('/api/v1/auth/login')
      .send({
        loginParams: 'usmanadio@gmail.com',
        password: 'modupeola'
      });

    await request(app)
      .post('/api/v1/tweets')
      .set('Authorization', `Bearer ${userToken}`)
      .send({
        body: 'I am here'
      });
      await request(app)
      .post('/api/v1/tweets')
      .set('Authorization', `Bearer ${userToken}`)
      .send({
        body: 'where is he'
      });

    userToken = response.body.payload.token;
  });
  test('should search for users and tweets successfully', async () => {
    const res = await request(app)
      .get(`/api/v1/search/userAndTweets`)
      .set('Authorization', `Bearer ${userToken}`)
      .send({
        searchParams: 'i'
      });

    expect(res.statusCode).toEqual(200);
    expect(res.body.message).toBe('Here are the results of your search');
    expect(res.body.errors).toBeNull();
    expect(res.body).toHaveProperty('statusCode');
    expect(res.body).toHaveProperty('message');
    expect(res.body).toHaveProperty('payload');
    expect(res.body).toHaveProperty('errors');
  });
  test('should return not found when error is mot found', async () => {
    const res = await request(app)
      .get(`/api/v1/search/userAndTweets`)
      .set('Authorization', `Bearer ${userToken}`)
      .send({
        searchParams: 'bear'
      });

    expect(res.statusCode).toEqual(404);
    expect(res.body.message).toBe('Data not found');
    expect(res.body.errors).toBeDefined();
    expect(res.body).toHaveProperty('statusCode');
    expect(res.body).toHaveProperty('message');
    expect(res.body).toHaveProperty('payload');
    expect(res.body).toHaveProperty('errors');
  });
  test('should not search for an invalid parameter', async () => {
    const res = await request(app)
      .get(`/api/v1/search/userAndTwets`)
      .set('Authorization', `Bearer ${userToken}`)

    expect(res.statusCode).toEqual(404);
    expect(res.body.message).toBe('Not found');
    expect(res.body.errors).toBeUndefined();
    expect(res.body).toHaveProperty('statusCode');
    expect(res.body).toHaveProperty('message');
    expect(res.body).toHaveProperty('payload');
  });
});
