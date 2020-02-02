import '@babel/polyfill';
import request from 'supertest';
import app from '../testApp';
import mongoose from 'mongoose';

describe('Follow a user route', () => {
  let userToken;
  let userId;
  let checkUserId;
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

    checkUserId = secondResponse.body.payload.id;

    const response = await request(app)
      .post('/api/v1/auth/login')
      .send({
        email: 'usmanadio@gmail.com',
        password: 'modupeola'
      });

    userToken = response.body.payload.token;
    userId = response.body.payload.user.id
  });
  test('should follow a user successfully', async () => {
    const res = await request(app)
      .put(`/api/v1/users/${checkUserId}/follow`)
      .set('Authorization', `Bearer ${userToken}`);

    expect(res.statusCode).toEqual(202);
    expect(res.body.message).toBe('success, You just followed @dayoooo');
    expect(res.body.errors).toBeNull();
    expect(res.body).toHaveProperty('statusCode');
    expect(res.body).toHaveProperty('message');
    expect(res.body).toHaveProperty('payload');
    expect(res.body).toHaveProperty('errors');
  });
  test('should not allow user to follow without token authorization', async () => {
    const res = await request(app)
      .put(`/api/v1/users/${checkUserId}/follow`)
      .set('Authorization', `Bearer `);

    expect(res.statusCode).toEqual(401);
    expect(res.body.message).toBe('No Token found');
    expect(res.body.errors).toBeDefined();
    expect(res.body).toHaveProperty('statusCode');
    expect(res.body).toHaveProperty('message');
    expect(res.body).toHaveProperty('payload');
    expect(res.body).toHaveProperty('errors');
  });
  test('should throw error for an invalid id', async () => {
    const incorrectId = mongoose.Types.ObjectId('5e367edbf34d5866215f76ca')
    const res = await request(app)
      .put(`/api/v1/users/${incorrectId}/follow`)
      .set('Authorization', `Bearer ${userToken}`);

    expect(res.statusCode).toEqual(404);
    expect(res.body.message).toBe('User not found');
    expect(res.body.errors).toBeDefined();
    expect(res.body).toHaveProperty('statusCode');
    expect(res.body).toHaveProperty('message');
    expect(res.body).toHaveProperty('payload');
    expect(res.body).toHaveProperty('errors');
  });
  test('should not allow a user follow him/herself', async () => {
    const res = await request(app)
      .put(`/api/v1/users/${userId}/follow`)
      .set('Authorization', `Bearer ${userToken}`);

    expect(res.statusCode).toEqual(400);
    expect(res.body.message).toBe('You cannot follow yourself');
    expect(res.body.errors).toBeDefined();
    expect(res.body).toHaveProperty('statusCode');
    expect(res.body).toHaveProperty('message');
    expect(res.body).toHaveProperty('payload');
    expect(res.body).toHaveProperty('errors');
  });
});
