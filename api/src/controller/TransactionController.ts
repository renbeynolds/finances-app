import express from 'express';
import { getTransactions } from '../service/TransactionService';

const router: express.Router = express.Router({ mergeParams: true });

router.get('/', getTransactions);

export default router;
