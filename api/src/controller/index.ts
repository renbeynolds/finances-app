import express from 'express';
import AccountController from './AccountController';
import TagController from './TagController';
import TransactionController from './TransactionController';
import UploadController from './UploadController';

const router: express.Router = express.Router();

router.use('/tags', TagController);
router.use('/transactions', TransactionController);
router.use('/accounts', AccountController);
router.use('/uploads', UploadController);

export default router;