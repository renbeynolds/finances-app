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
    if (account.startingAmount !== req.body.startingAmount) {
      account.startingAmount = req.body.startingAmount;
      account.balance = req.body.startingAmount;
      const qb = transactionRepository.createQueryBuilder('trans')
        .leftJoin('trans.upload', 'upload')
        .where('upload.account = :accountId', { accountId: account.id })
        .orderBy('trans.id', 'ASC');
      const transactions = await qb.getMany();
      transactions.forEach(t => {
        t.balance = Number(account.balance) + Number(t.amount) + Number(t.balanceCorrection);
        account.balance = Number(account.balance) + Number(t.amount) + Number(t.balanceCorrection);
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
    .select(['account.id', 'account.name']).getMany();
  res.send(accountOptions);
};

export const getAccount = async(req: Request, res: Response): Promise<void> => {
  const account = await getRepository(Account).findOne(req.params.accountId);
  res.send(account);
};