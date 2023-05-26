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

it('Can create a simple account', async () => {
  const createAccountCMD = {
    name: 'MyChecking',
    dateHeader: 'date',
    descriptionHeader: 'desc',
    amountsType: 'negamtexp',
    amountHeader: 'amt',
  };

  const res = await request(app).post('/api/accounts').send(createAccountCMD);
  expect(res.status).toEqual(200);
  expect(res.body).toEqual({
    ...createAccountCMD,
    id: 1,
    amountsType: 'negamtexp',
    color: null,
    startingAmount: '0.00',
    balance: '0.00',
    typeHeader: null,
  });
});

it('Requires typeHeader when amountsType is septypecol', async () => {
  const createAccountCMD = {
    name: 'MyChecking',
    dateHeader: 'date',
    descriptionHeader: 'desc',
    amountsType: 'septypecol',
    amountHeader: 'amt',
  };

  const res = await request(app).post('/api/accounts').send(createAccountCMD);
  expect(res.status).toEqual(400);
  expect(res.body).toEqual({
    errors: [
      {
        location: 'body',
        msg: 'Type Header is required when amounts type is separate column',
        param: 'typeHeader',
      },
    ],
  });
});

it('Can create account with separate amount type column', async () => {
  const createAccountCMD = {
    name: 'MySavings',
    dateHeader: 'date',
    descriptionHeader: 'desc',
    amountsType: 'septypecol',
    typeHeader: 'type',
    amountHeader: 'amt',
  };

  const res = await request(app).post('/api/accounts').send(createAccountCMD);
  expect(res.status).toEqual(200);
  expect(res.body).toEqual({
    ...createAccountCMD,
    id: 2,
    amountsType: 'septypecol',
    color: null,
    startingAmount: '0.00',
    balance: '0.00',
    typeHeader: 'type',
  });
});
