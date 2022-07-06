import request from 'supertest';
import app from '../src/app';

it('can hit the rest api', async () => {
  const res = await request(app).get('/api/').send();
  expect(res.status).toEqual(200);
  expect(res.body).toEqual({ message: 'Hello, World!' });
});
