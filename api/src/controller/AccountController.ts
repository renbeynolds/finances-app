import express from 'express';
import { createAccount, getAccount, getAccountOptions, getAllAccounts, updateAccount } from '../service/AccountService';

const router: express.Router = express.Router({ mergeParams: true });

router.post('/', createAccount);
router.get('/', getAllAccounts);
router.get('/options', getAccountOptions);
router.get('/:accountId', getAccount);
router.put('/:accountId', updateAccount);

export default router;
