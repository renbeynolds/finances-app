import { Router } from 'express';
import accountRouter from './AccountRouter';
import tagRouter from './TagRouter';
import transactionRouter from './TransactionRouter';

const rootRouter: Router = Router();

rootRouter.use('/accounts', accountRouter);
rootRouter.use('/transactions', transactionRouter);
rootRouter.use('/tags', tagRouter);

export default rootRouter;
