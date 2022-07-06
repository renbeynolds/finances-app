import request from 'supertest';
import app from '../src/app';
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

it('can hit the rest api', async () => {
  const createAccountCMD = {
    name: 'MyChecking',
    dateHeader: 'date',
    descriptionHeader: 'desc',
    amountHeader: 'amt',
  };

  const res = await request(app).post('/api/accounts').send(createAccountCMD);
  expect(res.status).toEqual(200);
  expect(res.body).toEqual({
    ...createAccountCMD,
    id: 1,
    amountsInverted: false,
    color: '#999999',
    startingAmount: '0.00',
    balance: '0.00',
  });
});
