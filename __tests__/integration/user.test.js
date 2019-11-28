import request from 'supertest';
import app from '../../src/app';

describe('Verify users', () => {
  //routes.get('/user', UserController.index);
  it('It should return a list of users and status 200', async () => {
    const res = await request(app).get('/user');
    expect(res.statusCode).toEqual(200);
  });

  //routes.post('/user/getUser', UserController.getOne);
  it('It should return a single user id', async () => {
    const res = await request(app)
      .post('/user/getUser')
      .send({
        email: 'testeteste',
      });

    expect(res.statusCode).toEqual(200);
    expect(res.body).toBe('5dddafd2d98a236306656d6c');
  });

  // routes.post('/user', UserController.store);
  // it('It should create a single user', async () => {
  //   const res = await request(app)
  //     .post('/user')
  //     .send({
  //       name: 'testeTDD',
  //       email: 'testeTDD',
  //       password: 'testeTDD',
  //       tag: 'testeTDD',
  //     });

  //   expect(res.statusCode).toEqual(200);
  //   expect(res.body).toHaveProperty('_id');
  // });
});
