import express from 'express';
import TagController from './TagController';
import TransactionController from './TransactionController';

const router: express.Router = express.Router();

router.use('/tags', TagController);
router.use('/transactions', TransactionController);

export default router;