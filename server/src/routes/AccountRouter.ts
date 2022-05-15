import { Router } from 'express';
import { createAccount, searchAccounts } from '../services/AccountService';
import { createUpload } from '../services/UploadService';
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

router.post('/:accountId/uploads', createUpload);

export default router;
