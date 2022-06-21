import accounting from 'accounting-js';
import { UploadFile } from 'antd/lib/upload/interface';
import csvtojson from 'csvtojson';
import { Request, Response } from 'express';
import { getManager, getRepository } from 'typeorm';
import { Account, Category, Transaction, Upload } from '../entities';

export const createUpload = async (
  req: Request,
  res: Response
): Promise<void> => {
  const categories = await getRepository(Category).find({
    relations: ['prefixRules'],
  });
  const accountId = parseInt(req.params.accountId);
  const account = await getRepository(Account).findOne(accountId);
  const csvData = await getCsvDataFromRequest(req);

  const upload = new Upload();
  upload.account = account;

  await getManager()
    .transaction(async (transactionalEntityManager) => {
      const transactions: Transaction[] = [];
      for (let i = csvData.length - 1; i >= 0; i--) {
        const obj = csvData[i];
        const transaction = new Transaction();
        transaction.upload = upload;
        transaction.date = new Date(obj[account.dateHeader]);
        transaction.description = obj[account.descriptionHeader];
        transaction.amount = accounting.unformat(obj[account.amountHeader]);
        if (account.amountsInverted) {
          transaction.amount = -1 * transaction.amount;
        }
        transaction.balance =
          Number(account.balance) + Number(transaction.amount);
        account.balance = Number(account.balance) + Number(transaction.amount);

        transaction.category = getCategoryForTransaction(
          categories,
          transaction
        );

        transactions.push(transaction);
      }

      await transactionalEntityManager.save(upload);
      await transactionalEntityManager.save(transactions);
      await transactionalEntityManager.save(account);
      return res.send(upload);
    })
    .catch((error) => {
      return res.status(400).send({ errors: [error.message] });
    });
};

const getCategoryForTransaction = (
  categories: Category[],
  transaction: Transaction
): Category => {
  categories.forEach((category) => {
    category.prefixRules.forEach((rule) => {
      if (transaction.description.startsWith(rule.prefix)) {
        return category;
      }
    });
  });
  return null;
};

const getCsvDataFromRequest = async (req: Request): Promise<any[]> => {
  const csvFile = req.files?.file as unknown as UploadFile & { data: Buffer };
  const csvString = csvFile.data.toString('utf8');
  const csvData = await csvtojson({
    flatKeys: true,
  }).fromString(csvString);
  return csvData;
};

export const searchUploads = async (
  req: Request,
  res: Response
): Promise<void> => {
  const uploads = await getRepository(Upload).find({
    order: {
      createdAt: 'DESC',
    },
  });
  res.send(uploads);
};
