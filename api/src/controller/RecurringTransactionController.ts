import express from 'express';
import { getRecurringTransactions, linkRecurringTransactions, suppressRecurringTransactions } from '../service/RecurringTransactionService';

const router: express.Router = express.Router({ mergeParams: true });

router.get('/', getRecurringTransactions);
router.put('/suppress', suppressRecurringTransactions);
router.put('/link', linkRecurringTransactions);

export default router;
