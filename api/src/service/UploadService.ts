import csvtojson from 'csvtojson';
import { Request, Response } from 'express';
import { getRepository } from 'typeorm';
import { Account } from '../entity/Account';
import { Tag } from '../entity/Tag';
import { Transaction } from '../entity/Transaction';
import { Upload } from '../entity/Upload';

export const createUpload = async(req: Request, res: Response): Promise<void> => {
    const tags = await getRepository(Tag).find({ relations: ['regexes'] });
    const account = await getRepository(Account).findOne(req.body.accountId, { relations: ['settings'] });
    const upload = new Upload();
    upload.account = account;
    await getRepository(Upload).save(upload);
    const csvData = req.files['file'].data.toString('utf8');
    csvtojson({ flatKeys: true }).fromString(csvData).then(async json => {
      const transactions: Transaction[] = [];
      for (let i = 0; i < json.length; i++) {
        const obj = json[i];
        const transaction = new Transaction();
        transaction.tags = [];
        transaction.upload = upload;
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
        transactions.push(transaction);
      }
      await getRepository(Transaction).save(transactions);
      return res.send(upload);
    });
  };