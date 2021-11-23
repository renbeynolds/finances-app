import { Router } from 'express';
import { createTag, searchTags } from '../services/TagService';
import { createTagValidations } from '../validation/createTagValidations';
import { handleValidationErrors } from '../validation/ValidationErrorHandler';

const router: Router = Router({ mergeParams: true });

router.post('/', createTagValidations, handleValidationErrors, createTag);

router.get('/', searchTags);

export default router;
