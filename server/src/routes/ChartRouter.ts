import express from 'express';
import { getIncomeVsExpenseData } from '../services/IncomeVsExpenseService';
import { getTagSpendingOverTimeData } from '../services/TagSpendingOverTimeService';
import { getTopSpendingTagsData } from '../services/TopSpendingsTagsService';

const router: express.Router = express.Router({ mergeParams: true });

router.get('/income_vs_expense', getIncomeVsExpenseData);
router.get('/top_spending_tags', getTopSpendingTagsData);
router.get('/tag_spending_over_time', getTagSpendingOverTimeData);

export default router;
