import { body } from 'express-validator';

export const createCategoryValidations = [
  body('name').notEmpty().withMessage('Name is required'),
];
