import express from 'express';
import v1router from './v1/routes';
// import v1router = require('./v1/routes');

const app = express();
app.use('/v1', v1router);


app.listen(3000, function () {
  console.log('Example app listening on port 3000!');
});