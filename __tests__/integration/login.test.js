import request from 'supertest';
import app from '../../src/app';

describe('Verify login', () => {
  // routes.get('/posts', PostController.index);
  it('It should login in to the system and return a JWT token', async done => {
    const res = await request(app)
      .post('/login')
      .send({
        email: 'testeteste',
        password: '123',
      });

    expect(res.statusCode).toEqual(200);
    expect(res.body).toHaveProperty('token');
    done();
  });

  it('It should try to login in to the system but fail because of User not found', async done => {
    const res = await request(app)
      .post('/login')
      .send({
        email: 'aleatório',
        password: '123',
      });

    expect(res.statusCode).toEqual(400);
    expect(res.body).toHaveProperty('error');
    done();
  });

  it('It should try to login in to the system but fail because of Invalid password', async done => {
    const res = await request(app)
      .post('/login')
      .send({
        email: 'testeTDD',
        password: '123',
      });

    expect(res.statusCode).toEqual(400);
    expect(res.body).toHaveProperty('error');
    done();
  });

  afterAll(async done => {
    await app.close();
    done();
  });
});
