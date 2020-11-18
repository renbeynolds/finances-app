import { Request, Response } from 'express';
import { getRepository } from 'typeorm';
import { Account } from '../entity/Account';

export const createAccount = async(req: Request, res: Response): Promise<void> => {
  const accountRepository = getRepository(Account);

  const account = new Account();
  account.name = req.body.name;
  account.dateHeader = req.body.dateHeader;
  account.descriptionHeader = req.body.descriptionHeader;
  account.amountHeader = req.body.amountHeader;
  account.amountsInverted = req.body.amountsInverted;
  account.startingAmount = req.body.startingAmount;
  account.balance = req.body.startingAmount;
  await accountRepository.save(account);

  res.send(account);
};

export const getAllAccounts = async(req: Request, res: Response): Promise<void> => {
  const accounts = await getRepository(Account).find();
  res.send(accounts);
};

export const getAccount = async(req: Request, res: Response): Promise<void> => {
  const account = await getRepository(Account).findOne(req.params.accountId);
  res.send(account);
};