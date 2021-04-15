import accounting from 'accounting-js';
import csvtojson from 'csvtojson';
import { Request, Response } from 'express';
import _ from 'lodash';
import { getManager, getRepository } from 'typeorm';
import { Account } from '../entity/Account';
import { Tag } from '../entity/Tag';
import { Transaction } from '../entity/Transaction';
import { Upload } from '../entity/Upload';

export const createUpload = async(req: Request, res: Response): Promise<void> => {
  const tags = await getRepository(Tag).find({ relations: ['regexes'] });
  const account = await getRepository(Account).findOne(req.body.accountId);
  const upload = new Upload();
  upload.account = account;
  const csvData = req.files['file'].data.toString('utf8');
  csvtojson({ flatKeys: true }).fromString(csvData).then(async json => {
    await getManager().transaction(async transactionalEntityManager => {
      const transactions: Transaction[] = [];
      for (let i = json.length - 1; i >= 0; i--) {
        const obj = json[i];
        const transaction = new Transaction();
        transaction.tags = [];
        transaction.upload = upload;
        transaction.date = new Date(obj[account.dateHeader]);
        transaction.description = obj[account.descriptionHeader];
        transaction.amount = accounting.unformat(obj[account.amountHeader]);
        if (account.amountsInverted) { transaction.amount = -1 * transaction.amount; }
        transaction.balance = Number(account.balance) + Number(transaction.amount);
        account.balance = Number(account.balance) + Number(transaction.amount);

        if (req.body.preTagged === 'true') {
          const tag = _.find(tags, { name: obj[req.body.tagHeader].toUpperCase() });
          if (tag) { transaction.tags.push(tag); } else {
            const newTag = new Tag();
            newTag.regexes = [];
            newTag.name = obj[req.body.tagHeader].toUpperCase();
            await transactionalEntityManager.save(newTag);
            transaction.tags.push(newTag);
            tags.push(newTag);
          }
        } else {
          tags.forEach((tag) => {
            tag.regexes.forEach((regex) => {
              if (transaction.description.match(new RegExp(regex.pattern))) {
                transaction.tags.push(tag);
              }
            });
          });
        }
        transactions.push(transaction);
      }

      await transactionalEntityManager.save(upload);
      await transactionalEntityManager.save(transactions);
      await transactionalEntityManager.save(account);
      return res.send(upload);
    }).catch(error => {
      return res.status(400).send({ errors: [error.message] });
    });

  });
};
