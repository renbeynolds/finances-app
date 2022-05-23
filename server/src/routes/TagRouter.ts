import { Router } from 'express';
import { getRegexRulesForTag } from '../services/RegexRuleService';
import { createTag, searchTags, updateTag } from '../services/TagService';
import { createTagValidations } from '../validation/createTagValidations';
import { handleValidationErrors } from '../validation/ValidationErrorHandler';

const router: Router = Router({ mergeParams: true });

router.post('/', createTagValidations, handleValidationErrors, createTag);

router.put('/:tagId', updateTag);

router.get('/', searchTags);
router.get('/:tagId/rules', getRegexRulesForTag);

export default router;
