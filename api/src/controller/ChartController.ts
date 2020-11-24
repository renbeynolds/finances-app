import express from 'express';
import { getAccountBalanceOverTimeData, getCombinedAccountBalanceOverTimeData, getSpendingOverTimeData } from '../service/ChartService';

const router: express.Router = express.Router({ mergeParams: true });

router.get('/spending_over_time', getSpendingOverTimeData);
router.get('/account_balance_over_time', getCombinedAccountBalanceOverTimeData);
router.get('/account_balance_over_time/:accountId', getAccountBalanceOverTimeData);

export default router;
