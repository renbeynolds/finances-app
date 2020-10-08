const express = require('express');
const v1router = require('./v1/routes');

const app = express();
const port = process.env.PORT || 3000;

app.listen(port, "0.0.0.0", function () {
    console.log('Listening on port: ' + port);
});

app.use('/v1', v1router);
  
module.exports = app;