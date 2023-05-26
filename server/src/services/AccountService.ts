import { Request, Response } from 'express';
import { Account } from '../entities/Account';
import postgresDB from '../postgresDB';

export const createAccount = async (
  req: Request,
  res: Response
): Promise<void> => {
  const accountRepository = postgresDB.getRepository(Account);

  const account = new Account();
  account.name = req.body.name;
  account.dateHeader = req.body.dateHeader;
  account.descriptionHeader = req.body.descriptionHeader;
  account.amountHeader = req.body.amountHeader;
  account.amountsType = req.body.amountsType;
  account.typeHeader = req.body.typeHeader;
  account.startingAmount = req.body.startingAmount;
  account.balance = req.body.startingAmount;
  account.color = req.body.color;

  await accountRepository.save(account);
  res.send(account);
};

export const searchAccounts = async (
  req: Request,
  res: Response
): Promise<void> => {
  const accounts = await postgresDB.getRepository(Account).find();
  res.send(accounts);
};
