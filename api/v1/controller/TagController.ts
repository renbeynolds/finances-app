import express from 'express';
import { getAllTags } from '../service/TagService';

const router: express.Router = express.Router({mergeParams: true});

router.get('/', getAllTags);

export default router;
