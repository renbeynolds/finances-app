import express from 'express';
import fileUpload from 'express-fileupload';
import path from 'path';
import { createConnection } from 'typeorm';
import pagination from './middleware/Pagination';
import rootRouter from './routes/RootRouter';

createConnection()
  .then(async (connection) => {
    const app = express();
    const buildDir = path.join(process.cwd() + '/build');

    app.use(express.json());
    app.use(fileUpload());
    app.use(pagination);

    app.use('/api', rootRouter);

    const port = process.env.PORT || 3001;
    app.listen(port, () => {
      console.log(`Server started on port ${port}`);
    });
  })
  .catch((error) => console.log('TypeORM connection error: ', error));
