import express from 'express';
import { createTag, getAllTags, getTag, updateTag } from '../service/TagService';

const router: express.Router = express.Router({ mergeParams: true });

router.post('/', createTag);
router.get('/', getAllTags);
router.get('/:tagId', getTag);
router.put('/:tagId', updateTag);

export default router;
