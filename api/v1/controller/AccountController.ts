import express from 'express';
import { createAccount, getAllAccounts } from '../service/AccountService';

const router: express.Router = express.Router({mergeParams: true});

router.post('/', createAccount);
router.get('/', getAllAccounts);

export default router;
