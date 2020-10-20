import express from 'express';
import { getSpendingOverTimeData } from '../service/ChartService';

const router: express.Router = express.Router({ mergeParams: true });

router.get('/spending_over_time', getSpendingOverTimeData);

export default router;
