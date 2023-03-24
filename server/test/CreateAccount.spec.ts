import request from 'supertest';
import app from '../src/app';
import { TestDB } from './utils/connection';

jest.setTimeout(180_000);
const testDatabase = new TestDB();

beforeAll(async () => {
  await testDatabase.create();
});

afterAll(async () => {
  await testDatabase.destroy();
});

it('can create an account', async () => {
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
    color: null,
    startingAmount: '0.00',
    balance: '0.00',
  });
});
