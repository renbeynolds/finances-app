import express from 'express';
import { getCategorySpendingOverTimeData } from '../services/CategorySpendingOverTimeService';
import { getIncomeVsExpenseData } from '../services/IncomeVsExpenseService';
import { getTopSpendingCategoriesData } from '../services/TopSpendingsCategoriesService';

const router: express.Router = express.Router({ mergeParams: true });

router.get('/income_vs_expense', getIncomeVsExpenseData);
router.get('/top_spending_categories', getTopSpendingCategoriesData);
router.get('/category_spending_over_time', getCategorySpendingOverTimeData);

export default router;
