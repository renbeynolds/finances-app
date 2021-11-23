import { Router } from 'express';
// import { handleValidationErrors } from '../base/ValidationErrorHandler';
// import { createTagValidations } from './createTagValidations';
import { searchTags } from '../services/TagService';

const router: Router = Router({ mergeParams: true });

// router.post('/', createTagValidations, handleValidationErrors, createTag);

router.get('/', searchTags);

export default router;
