import express from 'express';
import { getTotalExpense, getTotalIncome } from '../services/StatisticsService';

const router: express.Router = express.Router({ mergeParams: true });

router.get('/total_expense', getTotalExpense);
router.get('/total_income', getTotalIncome);

export default router;
