import { assert } from "chai";
import request from "supertest";
import app from "../../app";
import User from "../../models/User";

const baseUrl = '/api/v0';

describe('Auth', () => {
  let user, code, token;
  const credentials = {
    email: 'bob@dylan.com',
    password: 'toto1234!'
  }

  before(async () => {
    await User.deleteMany({});
  });

  describe('POST /verify', () => {
    it('should return 400 if email is not provided', async () => {
      const res = await request(app).post(`${baseUrl}/verify`).send({});
      assert.equal(res.status, 400);
      assert.equal(res.body.status, 'error');
      assert.exists(res.body.message);
    });

    it('should request for verification code', async () => {
      const res = await request(app).post(`${baseUrl}/verify`).send({ email: credentials.email });
      assert.equal(res.status, 200);
      assert.equal(res.body.status, 'success');
      assert.exists(res.body.code);
      code = res.body.code;
    });
  });

  describe('POST /signup', () => {
    it('should return 400 if email is not provided', async () => {
      const res = await request(app).post(`${baseUrl}/signup`).send({});
      assert.equal(res.status, 400);
      assert.equal(res.body.status, 'error');
      assert.exists(res.body.message);
    });

    it('should return 400 if password is not provided', async () => {
      const res = await request(app).post(`${baseUrl}/signup`).send({ email: credentials.email });
      assert.equal(res.status, 400);
      assert.equal(res.body.status, 'error');
      assert.exists(res.body.message);
    });

    it('should return 400 if verification code is not provided', async () => {
      const res = await request(app).post(`${baseUrl}/signup`).send({ email: credentials.email, password: credentials.password });
      assert.equal(res.status, 400);
      assert.equal(res.body.status, 'error');
      assert.exists(res.body.message);
    });

    it('should signup', async () => {
      const res = await request(app).post(`${baseUrl}/signup`).send({ ...credentials, code });
      assert.equal(res.status, 201);
      assert.equal(res.body.status, 'success');
      assert.exists(res.body.token);
      assert.exists(res.body.user);
      user = res.body.user;
      token = res.body.token;
    });
  });

  describe('POST /login', () => {
    it('should return 400 if email is not provided', async () => {
      const res = await request(app).post(`${baseUrl}/login`).send({});
      assert.equal(res.status, 400);
      assert.equal(res.body.status, 'error');
      assert.exists(res.body.message);
    });

    it('should return 400 if password is not provided', async () => {
      const res = await request(app).post(`${baseUrl}/login`).send({ email: credentials.email });
      assert.equal(res.status, 400);
      assert.equal(res.body.status, 'error');
      assert.exists(res.body.message);
    });

    it('should return 404 if user does not exist', async () => {
      const res = await request(app).post(`${baseUrl}/login`).send({ ...credentials, email: 'wrong@gmail.com' });
      assert.equal(res.status, 404);
      assert.equal(res.body.status, 'error');
      assert.exists(res.body.message);
    });

    it('should return 404 if password is wrong', async () => {
      const res = await request(app).post(`${baseUrl}/login`).send({ ...credentials, password: 'wrong' });
      assert.equal(res.status, 404);
      assert.equal(res.body.status, 'error');
      assert.exists(res.body.message);
    });

    it('should login', async () => {
      const res = await request(app).post(`${baseUrl}/login`).send(credentials);
      assert.equal(res.status, 200);
      assert.equal(res.body.status, 'success');
      assert.exists(res.body.token);
      assert.exists(res.body.user);
      assert.equal(res.body.user.email, credentials.email);
      token = res.body.token;
    });

    it('should return user profile', async () => {
      const res = await request(app).get(`${baseUrl}/me`).set('Authorization', `Bearer ${token}`);
      assert.equal(res.status, 200);
      assert.equal(res.body.status, 'success');
      assert.exists(res.body.user);
      assert.equal(res.body.user.email, credentials.email);
    });
  });

  describe('POST /logout', () => {
    it('should logout', async () => {
      const res = await request(app).delete(`${baseUrl}/logout`).set('Authorization', `Bearer ${token}`);
      assert.equal(res.status, 200);
    });

    it('should return 401 if user is not logged in', async () => {
      const res = await request(app).get(`${baseUrl}/me`).set('Authorization', `Bearer ${token}`);
      assert.equal(res.status, 401);
      assert.equal(res.body.status, 'error');
      assert.exists(res.body.message);
    });
  });
})
