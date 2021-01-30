import express from 'express';
import { getRecurringTransactions } from '../service/RecurringTransactionService';

const router: express.Router = express.Router({ mergeParams: true });

router.get('/', getRecurringTransactions);

export default router;
