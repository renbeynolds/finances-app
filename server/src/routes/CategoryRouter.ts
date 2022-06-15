import { Router } from 'express';
import {
  createCategory,
  searchCategories,
  updateCategory,
} from '../services/CategoryService';
import { getPrefixRulesForCategory } from '../services/PrefixRuleService';
import { createCategoryValidations } from '../validation/createCategoryValidations';
import { handleValidationErrors } from '../validation/ValidationErrorHandler';

const router: Router = Router({ mergeParams: true });

router.post(
  '/',
  createCategoryValidations,
  handleValidationErrors,
  createCategory
);

router.put('/:categoryId', updateCategory);

router.get('/', searchCategories);
router.get('/:categoryId/rules', getPrefixRulesForCategory);

export default router;
