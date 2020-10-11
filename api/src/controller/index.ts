import express from 'express';
import AccountController from './AccountController';
import TagController from './TagController';
import TransactionController from './TransactionController';

const router: express.Router = express.Router();

router.use('/tags', TagController);
router.use('/transactions', TransactionController);
router.use('/accounts', AccountController);

export default router;