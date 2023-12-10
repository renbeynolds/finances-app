import { body } from 'express-validator';

export const createAccountValidations = [
  body('name').notEmpty().withMessage('Name is required'),
  body('dateHeader').notEmpty().withMessage('Date Header is required'),
  body('descriptionHeader')
    .notEmpty()
    .withMessage('Description Header is required'),
  body('amountsType')
    .notEmpty()
    .isIn(['negamtexp', 'posamtexp', 'septypecol', 'sepincexp']),
  body('typeHeader')
    .if(body('amountsType').equals('septypecol'))
    .notEmpty()
    .withMessage(
      'Type Header is required when amounts type is separate column'
    ),
  body('amountHeader')
    .if(body('amountsType').not().equals('sepincexp'))
    .notEmpty()
    .withMessage('Amount Header is required'),
  body('incomeHeader')
    .if(body('amountsType').equals('sepincexp'))
    .notEmpty()
    .withMessage(
      'Income Header is required when type is separate income and expense columns'
    ),
  body('expenseHeader')
    .if(body('amountsType').equals('sepincexp'))
    .notEmpty()
    .withMessage(
      'Expense Header is required when type is separate income and expense columns'
    ),
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
