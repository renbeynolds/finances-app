import { Router } from 'express';
import {
  searchTransactions,
  updateTransaction,
} from '../services/TransactionService';

const router: Router = Router({ mergeParams: true });

router.get('/', searchTransactions);
router.put('/:id', updateTransaction);

export default router;
