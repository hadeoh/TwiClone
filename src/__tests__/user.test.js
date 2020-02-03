import request from 'supertest';
import app from '../app';

const AUTH_BASE_URL = '/api/v1/auth';
const USER_URL = '/api/v1/users';

describe('Follow user route', () => {
  let userToken;
  it('should follow a user', async () => {
    await request(app)
      .post(`${AUTH_BASE_URL}/signup`)
      .send({
        fullName: 'Usman Adio',
        userName: 'hadeoh',
        email: 'usmanadio@gmail.com',
        password: 'modupeola',
        confirmPassword: 'modupeola'
      });

    const anotherUser = await request(app)
      .post(`${AUTH_BASE_URL}/signup`)
      .send({
        fullName: 'Usman Adio',
        userName: 'hadeoh22',
        email: 'usmanaddio@gmail.com',
        password: 'modupeola',
        phone: '082937828892',
        confirmPassword: 'modupeola'
      });

    const anotherUserId = anotherUser.body.payload.id;

    const user = await request(app)
      .post(`${AUTH_BASE_URL}/login`)
      .send({
        loginParams: 'usmanadio@gmail.com',
        password: 'modupeola'
      });

    userToken = user.body.payload.token;

    const res = await request(app)
      .post(`${USER_URL}/follow/${anotherUserId}`)
      .set('Authorization', `Bearer ${userToken}`);

    expect(res.statusCode).toEqual(200);
    expect(res.body).toHaveProperty('statusCode');
    expect(res.body).toHaveProperty('message');
    expect(res.body).toHaveProperty('payload');
    expect(res.body.errors).toBeNull();
  });
  it('should unfollow a user', async () => {
    await request(app)
      .post(`${AUTH_BASE_URL}/signup`)
      .send({
        fullName: 'Usman Adio',
        userName: 'hadeoh',
        email: 'usmanadio@gmail.com',
        password: 'modupeola',
        confirmPassword: 'modupeola'
      });

    const anotherUser = await request(app)
      .post(`${AUTH_BASE_URL}/signup`)
      .send({
        fullName: 'Usman Adio',
        userName: 'hadeoh22',
        email: 'usmanadeio@gmail.com',
        password: 'modupeola',
        phone: '082937828892',
        confirmPassword: 'modupeola'
      });

      console.log(anotherUser);
      

    const anotherUserId = anotherUser.body.payload.id;

    const user = await request(app)
      .post(`${AUTH_BASE_URL}/login`)
      .send({
        loginParams: 'usmanadio@gmail.com',
        password: 'modupeola'
      });

    userToken = user.body.payload.token;

    await request(app)
      .post(`${USER_URL}/follow/${anotherUserId}`)
      .set('Authorization', `Bearer ${userToken}`);
    const res = await request(app)
      .post(`${USER_URL}/follow/${anotherUserId}`)
      .set('Authorization', `Bearer ${userToken}`);

    expect(res.statusCode).toEqual(200);
    expect(res.body).toHaveProperty('statusCode');
    expect(res.body).toHaveProperty('message');
    expect(res.body).toHaveProperty('payload');
    expect(res.body.payload.status).toBe('User successfully unfollowed');
    expect(res.body.errors).toBeNull();
  });
});
