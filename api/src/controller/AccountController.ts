import express from 'express';
import { createAccount, getAccount, getAllAccounts, updateAccount } from '../service/AccountService';

const router: express.Router = express.Router({ mergeParams: true });

router.post('/', createAccount);
router.get('/', getAllAccounts);
router.get('/:accountId', getAccount);
router.put('/:accountId', updateAccount);

export default router;
