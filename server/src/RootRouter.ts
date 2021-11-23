import { Router } from 'express';
import accountRouter from './models/accounts/AccountRouter';
// import tagRouter from './models/tags/TagRouter';
// import transactionRouter from './models/transactions/TransactionRouter';

const rootRouter: Router = Router();

rootRouter.use('/accounts', accountRouter);
// rootRouter.use('/transactions', transactionRouter);
// rootRouter.use('/tags', tagRouter);

export default rootRouter;
