import { Router } from 'express';
import { searchTransactions } from '../services/TransactionService';

const router: Router = Router({ mergeParams: true });

router.get('/', searchTransactions);

export default router;
