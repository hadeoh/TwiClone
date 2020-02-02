import * as Error from '../config/error';
import validateSignUp from '../middlewares/signup.middleware';

describe('Error handlers', () => {
  test('should handle errors', async () => {
    expect.assertions(1);

    try {
      const res = Error.handler();
      expect(res.body.errors).toBeDefined();
      expect(res.body).toHaveProperty('statusCode');
      expect(res.body).toHaveProperty('message');
      expect(res.body).toHaveProperty('payload');
      expect(res.body).toHaveProperty('errors');
    } catch (e) {
      expect(e).toBeTruthy();
    }
  });
  test('should convert errors', async () => {
    expect.assertions(1);

    try {
      const res = Error.converter();
      expect(res.body.errors).toBeDefined();
      expect(res.body).toHaveProperty('statusCode');
      expect(res.body).toHaveProperty('message');
      expect(res.body).toHaveProperty('payload');
      expect(res.body).toHaveProperty('errors');
    } catch (e) {
      expect(e).toBeTruthy();
    }
  });
  test('should handle errors', async () => {
    expect.assertions(1);

    try {
      const res = Error.errorHandler();
      expect(res.body.errors).toBeDefined();
      expect(res.body).toHaveProperty('isPublic');
      expect(res.body.message).toBe('Unauthorized');
      expect(res.body.isPublic).toBe(true);
      expect(res.body).toHaveProperty('statusCode');
    } catch (e) {
      expect(e).toBeTruthy();
    }
  });
  test('should handle notFound errors', async () => {
    expect.assertions(1);

    try {
      const res = Error.notFound();
      expect(res.body.errors).toBeDefined();
      expect(res.body).toHaveProperty('isPublic');
      expect(res.body.message).toBe('Not found');
      expect(res.body).toHaveProperty('status');
      expect(res.body).toHaveProperty('statusCode');
      expect(res.body).toHaveProperty('message');
      expect(res.body).toHaveProperty('payload');
      expect(res.body).toHaveProperty('errors');
      expect(res.body.status).toBe(404);
    } catch (e) {
      expect(e).toBeTruthy();
    }
  });
  test('should handle notFound errors', async () => {
    expect.assertions(1);

    try {
      const res = validateSignUp();
      expect(res.body.errors).toBeDefined();
      expect(res.body).toHaveProperty('isPublic');
      expect(res.body.message).toBe('Not found');
      expect(res.body).toHaveProperty('status');
      expect(res.body).toHaveProperty('statusCode');
      expect(res.body).toHaveProperty('message');
      expect(res.body).toHaveProperty('payload');
      expect(res.body).toHaveProperty('errors');
      expect(res.body.status).toBe(400);
    } catch (e) {
      expect(e).toBeTruthy();
    }
  });
});
