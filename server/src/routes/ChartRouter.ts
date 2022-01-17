import express from 'express';
import { getIncomeVsExpenseData } from '../services/IncomeVsExpenseService';

const router: express.Router = express.Router({ mergeParams: true });

router.get('/income_vs_expense', getIncomeVsExpenseData);

export default router;
