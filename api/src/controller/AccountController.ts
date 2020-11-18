import express from 'express';
import { createAccount, getAccount, getAllAccounts } from '../service/AccountService';

const router: express.Router = express.Router({ mergeParams: true });

router.post('/', createAccount);
router.get('/', getAllAccounts);
router.get('/:accountId', getAccount);

export default router;
