import { Router } from 'express';
import { createUpload } from '../services/UploadService';

const router: Router = Router({ mergeParams: true });

router.post('/', createUpload);

export default router;
