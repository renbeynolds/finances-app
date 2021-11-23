import { Request, Response } from 'express';
// import Client from '../../db/Client';
// import { insertAccount } from './AccountQueries';

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
  // Client('accounts')
  //   .select()
  //   .then(function (result) {
  //     res.status(200).send(result);
  //   });
};
