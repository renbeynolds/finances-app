import { Request, Response } from 'express';
import { getManager, getRepository } from 'typeorm';
import { Account } from '../entity/Account';
import { Transaction } from '../entity/Transaction';

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
  account.color = req.body.color;

  await accountRepository.save(account);
  res.send(account);
};

export const updateAccount = async(req: Request, res: Response): Promise<void> => {
  const accountRepository = getRepository(Account);
  const transactionRepository = getRepository(Transaction);
  const account = await accountRepository.findOne(req.params.accountId);

  await getManager().transaction(async transactionalEntityManager => {
    account.name = req.body.name;
    account.dateHeader = req.body.dateHeader;
    account.descriptionHeader = req.body.descriptionHeader;
    account.amountHeader = req.body.amountHeader;
    account.amountsInverted = req.body.amountsInverted;
    account.color = req.body.color;

    if (account.startingAmount !== Number(req.body.startingAmount)) {
      const newStartingAmount = Number(req.body.startingAmount);
      const currentStartingAmount = account.startingAmount;
      account.startingAmount = req.body.startingAmount;
      account.balance = req.body.startingAmount;
      const qb = transactionRepository.createQueryBuilder('trans')
        .leftJoin('trans.upload', 'upload')
        .where('upload.account = :accountId', { accountId: account.id })
        .orderBy('trans.id', 'ASC');
      const transactions = await qb.getMany();
      transactions.forEach((t, idx) => {
        t.balance -= currentStartingAmount;
        t.balance += newStartingAmount;
        if (idx === transactions.length - 1) {
          account.balance = t.balance;
        }
      });
      await transactionalEntityManager.save(transactions);
    }

    await transactionalEntityManager.save(account);
    res.send(account);
  }).catch(error => {
    return res.status(400).send({ errors: [error.message] });
  });
};

export const getAllAccounts = async(req: Request, res: Response): Promise<void> => {
  const accounts = await getRepository(Account).find();
  res.send(accounts);
};

export const getAccountOptions = async(req: Request, res: Response): Promise<void> => {
  const accountOptions = await getRepository(Account)
    .createQueryBuilder('account')
    .select(['account.id', 'account.name', 'account.color']).getMany();
  res.send(accountOptions);
};

export const getAccount = async(req: Request, res: Response): Promise<void> => {
  const account = await getRepository(Account).findOne(req.params.accountId);
  res.send(account);
};