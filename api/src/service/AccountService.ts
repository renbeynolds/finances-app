import { Request, Response } from 'express';
import { getRepository } from 'typeorm';
import { Account } from '../entity/Account';
import { AccountSettings } from '../entity/AccountSettings';

export const createAccount = async(req: Request, res: Response) => {
  const accountRepository = getRepository(Account);
  const accountSettingsRepository = getRepository(AccountSettings);

  const accountSettings = new AccountSettings();
  accountSettings.dateHeader = req.body.dateHeader;
  accountSettings.descriptionHeader = req.body.descriptionHeader;
  accountSettings.amountHeader = req.body.amountHeader;
  accountSettings.amountsInverted = req.body.amountsInverted;
  await accountSettingsRepository.save(accountSettings);

  const account = new Account();
  account.name = req.body.name;
  account.settings = accountSettings;
  await accountRepository.save(account);

  res.send(account);
};

export const getAllAccounts = async(req: Request, res: Response) => {
  const accounts = await getRepository(Account).find();
  res.send(accounts);
};