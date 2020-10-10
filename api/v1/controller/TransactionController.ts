import express from 'express';
import { createTransactions, getAllTransactions } from '../service/TransactionService';

const router: express.Router = express.Router({ mergeParams: true });

router.get('/', getAllTransactions);
router.post('/', createTransactions);

export default router;
