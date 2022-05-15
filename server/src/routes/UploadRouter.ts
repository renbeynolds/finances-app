import { Router } from 'express';
import { searchUploads } from '../services/UploadService';

const router: Router = Router({ mergeParams: true });

router.get('/', searchUploads);

export default router;
