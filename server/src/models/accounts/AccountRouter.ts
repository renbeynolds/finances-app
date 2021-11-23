import { Router } from 'express';
import { handleValidationErrors } from '../base/ValidationErrorHandler';
// import uploadRouter from '../uploads/UploadRouter';
import { createAccount, searchAccounts } from './AccountService';
import { createAccountValidations } from './createAccountValidations';

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
