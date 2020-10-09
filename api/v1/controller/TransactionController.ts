import csvtojson from 'csvtojson';
import express, { Request, Response } from 'express';
import { getAllTransactions } from '../service/TransactionService';

const router: express.Router = express.Router({ mergeParams: true });

router.get('/', getAllTransactions);

router.post('/', (req: Request, res: Response) => {
  const csvData = req.files['myFile'].data.toString('utf8');
  return csvtojson().fromString(csvData).then(json => {
    return res.status(201).json(json);
  });
});

export default router;
