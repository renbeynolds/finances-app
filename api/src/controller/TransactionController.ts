import express from 'express';
import { getTransactions, updateTransaction } from '../service/TransactionService';

const router: express.Router = express.Router({ mergeParams: true });

router.get('/', getTransactions);
router.put('/:transactionId', updateTransaction);

export default router;
