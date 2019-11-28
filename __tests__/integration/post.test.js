import request from 'supertest';
import app from '../../src/app';

describe('Verify post', () => {
  // routes.get('/posts', PostController.index);
  it('It should return a list of all the posts on the API', async () => {
    const res = await request(app).get('/posts');

    expect(res.statusCode).toEqual(200);
  });

  // routes.post('/posts', PostController.store);
  it('It should return a list of all the posts on the API', async () => {
    const res = await request(app)
      .post('/posts')
      .send({
        author: 'testeTDD',
        content: 'testeTDD',
      });

    expect(res.statusCode).toEqual(200);
    expect(res.body).toHaveProperty('content');
  });
});
