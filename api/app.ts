import express from 'express';
import fileUpload from 'express-fileupload';
import { createConnection } from 'typeorm';
import v1controller from './v1/controller';

createConnection().then(async connection => {

  const app = express();

  app.use(fileUpload());

  app.use('/v1', v1controller);

  app.listen(3001, function () {
    console.log('Finances app listening on port 3001!');
  });

}).catch(error => console.log("TypeORM connection error: ", error));