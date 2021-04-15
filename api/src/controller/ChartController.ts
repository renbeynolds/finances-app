import express from 'express';
import { getAccountBalanceOverTimeData, getCombinedAccountBalanceOverTimeData, getIncomeVsExpenseData, getTopSpendingCategoriesData } from '../service/ChartService';

const router: express.Router = express.Router({ mergeParams: true });

router.get('/account_balance_over_time', getCombinedAccountBalanceOverTimeData);
router.get('/account_balance_over_time/:accountId', getAccountBalanceOverTimeData);
router.get('/top_spending_categories', getTopSpendingCategoriesData);
router.get('/income_vs_expense', getIncomeVsExpenseData);

export default router;
