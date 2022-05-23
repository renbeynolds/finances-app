import { body } from 'express-validator';

export const createTagValidations = [
  body('name').notEmpty().withMessage('Name is required'),
];
