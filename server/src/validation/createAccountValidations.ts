import { body } from 'express-validator';

export const createAccountValidations = [
  body('name').notEmpty().withMessage('Name is required'),
  body('dateHeader').notEmpty().withMessage('Date Header is required'),
  body('descriptionHeader')
    .notEmpty()
    .withMessage('Description Header is required'),
  body('amountHeader').notEmpty().withMessage('Amount Header is required'),
  body('amountsInverted').isBoolean().optional(),
  body('startingAmount')
    .isNumeric()
    .custom((value) => {
      const moneyRegex = /^\d+(?:\.\d{0,2})$/;
      if (moneyRegex.test(value)) {
        return Promise.resolve(true);
      } else {
        return Promise.reject('not valid currency');
      }
    })
    .optional()
    .withMessage('Starting Amount must be valid currency value'),
];
