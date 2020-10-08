import express from 'express';
import TagRoutes from './TagRoutes';

const router: express.Router = express.Router();

router.use('/tags', TagRoutes);

export default router;