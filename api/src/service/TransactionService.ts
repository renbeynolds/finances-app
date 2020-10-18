import csvtojson from 'csvtojson';
import { Request, Response } from 'express';
import { getRepository } from 'typeorm';
import { Account } from '../entity/Account';
import { Tag } from '../entity/Tag';
import { Transaction } from '../entity/Transaction';

export const getAllTransactions = async(req: Request, res: Response): Promise<void> => {
  const [transactions, total] = await getRepository(Transaction).findAndCount({ relations: ['tags'], skip: req.pagination.offset, take: req.pagination.limit });
  res.send({
    data: transactions,
    pagination: { ...req.pagination, total: total }
  });
};

export const createTransactions = async(req: Request, res: Response): Promise<void> => {
  const tags = await getRepository(Tag).find({ relations: ['regexes'] });
  const account = await getRepository(Account).findOne(req.body.accountId, { relations: ['settings'] });
  const csvData = req.files['file'].data.toString('utf8');
  csvtojson({ flatKeys: true }).fromString(csvData).then(async json => {
    const transactions: Transaction[] = [];
    for (let i = 0; i < json.length; i++) {
      const obj = json[i];
      const transaction = new Transaction();
      transaction.tags = [];
      transaction.account = account;
      transaction.date = new Date(obj[account.settings.dateHeader]);
      transaction.description = obj[account.settings.descriptionHeader];
      transaction.amount = obj[account.settings.amountHeader];
      if (account.settings.amountsInverted) { transaction.amount = -1 * transaction.amount; }

      tags.forEach((tag) => {
        tag.regexes.forEach((regex) => {
          if (transaction.description.match(new RegExp(regex.pattern))) {
            transaction.tags.push(tag);
          }
        });
      });

      await getRepository(Transaction).save(transaction);
      transactions.push(transaction);
    }
    return res.send(transactions);
  });
};