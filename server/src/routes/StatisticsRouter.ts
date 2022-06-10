import express from 'express';
import {
  getAverageExpense,
  getAverageIncome,
  getTotalExpense,
  getTotalIncome,
} from '../services/StatisticsService';

const router: express.Router = express.Router({ mergeParams: true });

router.get('/total_expense', getTotalExpense);
router.get('/total_income', getTotalIncome);
router.get('/average_expense', getAverageExpense);
router.get('/average_income', getAverageIncome);

export default router;
