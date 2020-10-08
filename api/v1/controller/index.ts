import express from 'express';
import TagController from './TagController';

const router: express.Router = express.Router();

router.use('/tags', TagController);

export default router;