import { Router } from 'express';
import accountRouter from './AccountRouter';
import categoryRouter from './CategoryRouter';
import chartRouter from './ChartRouter';
import statisticsRouter from './StatisticsRouter';
import transactionRouter from './TransactionRouter';
import uploadRouter from './UploadRouter';

const rootRouter: Router = Router();

rootRouter.get('/', (req, res) =>
  res.status(200).send({ message: 'Hello, World!' })
);
rootRouter.use('/accounts', accountRouter);
rootRouter.use('/transactions', transactionRouter);
rootRouter.use('/categories', categoryRouter);
rootRouter.use('/charts', chartRouter);
rootRouter.use('/uploads', uploadRouter);
rootRouter.use('/statistics', statisticsRouter);

export default rootRouter;
