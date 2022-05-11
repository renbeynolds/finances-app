import express from 'express';
import { getIncomeVsExpenseData } from '../services/IncomeVsExpenseService';
import { getTopSpendingTagsData } from '../services/TopSpendingsTagsService';

const router: express.Router = express.Router({ mergeParams: true });

router.get('/income_vs_expense', getIncomeVsExpenseData);
router.get('/top_spending_tags', getTopSpendingTagsData);

export default router;
