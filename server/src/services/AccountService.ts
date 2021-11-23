import { Request, Response } from 'express';
import { getRepository } from 'typeorm';
import { Account } from '../entities/Account';

export const createAccount = async (
  req: Request,
  res: Response
): Promise<void> => {
  // insertAccount(req.body as ICreateAccountCMD).then((account) => {
  //   res.status(200).send(account);
  // });
};

export const searchAccounts = async (
  req: Request,
  res: Response
): Promise<void> => {
  const accounts = await getRepository(Account).find();
  res.send(accounts);
};
