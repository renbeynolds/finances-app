import { Request, Response } from 'express';
import { getRepository } from 'typeorm';
import { Account } from '../entity/Account';

export const createAccount = async (req: Request, res: Response) => {
    const accountRepository = getRepository(Account);
    const newAccount = accountRepository.create(req.body);
    await accountRepository.save(newAccount);
    res.send(newAccount);
};

export const getAllAccounts = async (req: Request, res: Response) => {
    const accounts = await getRepository(Account).find();
    res.send(accounts);
};