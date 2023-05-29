import path from 'path';
import request from 'supertest';
import app from '../src/app';
import { Account, Transaction } from '../src/entities';
import postgresDB from '../src/postgresDB';
import { TestDB } from './utils/connection';

jest.setTimeout(180_000);
const testDatabase = new TestDB();

beforeAll(async () => {
  await testDatabase.create();
});

afterAll(async () => {
  await testDatabase.destroy();
});

it('Auto categorizes correctly', async () => {
  const accounts = await postgresDB.manager.query(
    `INSERT INTO account (name, "dateHeader", "descriptionHeader", "amountHeader", "amountsType") VALUES ('test', 'date', 'desc', 'amt', 'negamtexp') RETURNING *`
  );
  const categories = await postgresDB.manager.query(
    `INSERT INTO category (name) VALUES ('electricity'), ('auto insurance') RETURNING *`
  );
  await postgresDB.manager.query(
    `INSERT INTO prefix_rule (prefix, "categoryId") VALUES ('NGRID', ${categories[0].id}), ('GEICO', ${categories[1].id})`
  );

  const res = await request(app)
    .post(`/api/accounts/${accounts[0].id}/uploads`)
    .attach('file', path.resolve(__dirname, './uploads/negamtexp_test.csv'));

  expect(res.body.id).toEqual(1);

  expect(
    (await postgresDB.getRepository(Account).findOneBy({ id: accounts[0].id }))
      .balance
  ).toEqual('-103.27');

  const transactions = await postgresDB.getRepository(Transaction).find({
    order: {
      id: 'DESC',
    },
  });

  expect(transactions[0].categoryId).toEqual(categories[0].id);
  expect(transactions[1].categoryId).toEqual(categories[1].id);
  expect(transactions[2].categoryId).toBeNull();
});

it('Computes correct balance using septypecol', async () => {
  const accounts = await postgresDB.manager.query(
    `INSERT INTO account (name, "dateHeader", "descriptionHeader", "amountHeader", "amountsType", "typeHeader") VALUES ('test2', 'date', 'desc', 'amt', 'septypecol', 'type') RETURNING *`
  );

  const res = await request(app)
    .post(`/api/accounts/${accounts[0].id}/uploads`)
    .attach('file', path.resolve(__dirname, './uploads/septypecol_test.csv'));

  expect(res.body.id).toEqual(2);

  expect(
    (await postgresDB.getRepository(Account).findOneBy({ id: accounts[0].id }))
      .balance
  ).toEqual('-130.00');
});
