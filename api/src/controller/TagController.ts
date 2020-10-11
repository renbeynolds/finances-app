import express from 'express';
import { createTag, getAllTags } from '../service/TagService';

const router: express.Router = express.Router({ mergeParams: true });

router.post('/', createTag);
router.get('/', getAllTags);

export default router;
