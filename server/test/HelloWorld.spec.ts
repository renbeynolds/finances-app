import request from 'supertest';
import app from '../src/index';
import connection from './utils/connection';

beforeAll(async () => {
  await connection.create();
});

afterAll(async () => {
  await connection.close();
});

beforeEach(async () => {
  await connection.clear();
});

it('creates an account', async () => {
  const res = await request(app).get('/api/');
  expect(res.status).toEqual(200);
  expect(res.body).toEqual({ message: 'Hello, World!' });
});
