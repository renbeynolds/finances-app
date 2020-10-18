import express from 'express';
import { createUpload } from '../service/UploadService';

const router: express.Router = express.Router({ mergeParams: true });

router.post('/', createUpload);

export default router;
