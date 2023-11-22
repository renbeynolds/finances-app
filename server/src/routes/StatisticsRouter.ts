import express from 'express';
import {
  getAverageCategorySpending,
  getAverageExpense,
  getAverageIncome,
  getCategoryTotal,
  getTotalExpense,
  getTotalIncome,
} from '../services/StatisticsService';

const router: express.Router = express.Router({ mergeParams: true });

router.get('/total_expense', getTotalExpense);
router.get('/total_income', getTotalIncome);
router.get('/average_expense', getAverageExpense);
router.get('/average_income', getAverageIncome);
router.get('/category_total', getCategoryTotal);
router.get('/average_category_spending', getAverageCategorySpending);

export default router;
