import request from 'supertest';
import app from '../index';

describe('Sign Up route', () => {
  it('should create a new user', async () => {
    const res = await request(app)
      .post('/api/v1/auth/signup')
      .send({
        fullName: 'Usman Adio',
        userName: 'hadeoh',
        email: 'usmanadio@gmail.com',
        password: 'modupeola',
        confirmPassword: 'modupeola'
      })
    expect(res.statusCode).toEqual(200)
    expect(res.body).toHaveProperty('statusCode');
    expect(res.body).toHaveProperty('message');
    expect(res.body).toHaveProperty('payload');
    expect(res.body).toHaveProperty('errors');
  })
})