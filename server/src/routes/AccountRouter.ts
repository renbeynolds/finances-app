import { Router } from 'express';
// import uploadRouter from '../uploads/UploadRouter';
import { createAccount, searchAccounts } from '../services/AccountService';
import { createAccountValidations } from '../validation/createAccountValidations';
import { handleValidationErrors } from '../validation/ValidationErrorHandler';

const router: Router = Router({ mergeParams: true });

router.post(
  '/',
  createAccountValidations,
  handleValidationErrors,
  createAccount
);

router.get('/', searchAccounts);

// router.use('/:accountId/uploads', uploadRouter);

export default router;
