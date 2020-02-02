import '@babel/polyfill';
import request from 'supertest';
import app from '../testApp';
import mongoose from 'mongoose';

describe('Tweets route', () => {
  let userToken;
  let tweetId;
  beforeEach(async () => {
    await request(app)
      .post('/api/v1/auth/signup')
      .send({
        fullName: 'Usman Adio',
        userName: 'fire',
        email: 'fire@gmail.com',
        password: 'modupeola',
        confirmPassword: 'modupeola'
      });

    const response = await request(app)
      .post('/api/v1/auth/login')
      .send({
        email: 'fire@gmail.com',
        password: 'modupeola'
      });

    userToken = response.body.payload.token;

    const tweet = await request(app)
      .post('/api/v1/tweets')
      .set('Authorization', `Bearer ${userToken}`)
      .send({
        body: 'I love adventures'
      });
    tweetId = tweet.body.payload.id;
  });
  // test('should tweet successfully', async () => {
  //   const res = await request(app)
  //     .post(`/api/v1/tweets`)
  //     .set('Authorization', `Bearer ${userToken}`)
  //     .send({
  //       body: 'I love sky diving'
  //     });

  //   expect(res.statusCode).toEqual(201);
  //   expect(res.body.message).toBe('success');
  //   expect(res.body.errors).toBeNull();
  //   expect(res.body).toHaveProperty('statusCode');
  //   expect(res.body).toHaveProperty('message');
  //   expect(res.body).toHaveProperty('payload');
  //   expect(res.body).toHaveProperty('errors');
  // });
  test('should not allow empty body field', async () => {
    const res = await request(app)
      .post(`/api/v1/tweets`)
      .set('Authorization', `Bearer ${userToken}`)
      .send({
        body: ''
      });

    expect(res.statusCode).toEqual(400);
    expect(res.body.message).toBe('Invalid fields');
    expect(res.body.errors).toBeDefined();
    expect(res.body).toHaveProperty('statusCode');
    expect(res.body).toHaveProperty('message');
    expect(res.body).toHaveProperty('payload');
    expect(res.body).toHaveProperty('errors');
  });
  test('should reply a tweet', async () => {
    const res = await request(app)
      .post(`/api/v1/tweets/${tweetId}/reply`)
      .set('Authorization', `Bearer ${userToken}`)
      .send({
        body: 'How do you like it?'
      });

    expect(res.statusCode).toEqual(201);
    expect(res.body.message).toBe('success, replying to @fire');
    expect(res.body.errors).toBeDefined();
    expect(res.body).toHaveProperty('statusCode');
    expect(res.body).toHaveProperty('message');
    expect(res.body).toHaveProperty('payload');
    expect(res.body).toHaveProperty('errors');
  });
  // test('should not allow a user follow him/herself', async () => {
  //   const res = await request(app)
  //     .put(`/api/v1/users/${userId}/follow`)
  //     .set('Authorization', `Bearer ${userToken}`);

  //   expect(res.statusCode).toEqual(400);
  //   expect(res.body.message).toBe('You cannot follow yourself');
  //   expect(res.body.errors).toBeDefined();
  //   expect(res.body).toHaveProperty('statusCode');
  //   expect(res.body).toHaveProperty('message');
  //   expect(res.body).toHaveProperty('payload');
  //   expect(res.body).toHaveProperty('errors');
  // });
});
