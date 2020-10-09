import bodyParser from 'body-parser';
import cors from 'cors';
import express from 'express';
import fileUpload from 'express-fileupload';
import { createConnection } from 'typeorm';
import v1controller from './v1/controller';

createConnection().then(async connection => {

  const app = express();

  app.use(cors());
  app.use(bodyParser.json());
  app.use(fileUpload());

  app.use('/v1', v1controller);

  app.listen(3001, function() {
    // eslint-disable-next-line no-console
    console.log('Finances app listening on port 3001!');
  });

// eslint-disable-next-line no-console
}).catch(error => console.log('TypeORM connection error: ', error));