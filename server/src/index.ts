import express from 'express';
import fileUpload from 'express-fileupload';
import path from 'path';
import rootRouter from './RootRouter';

const app = express();
const buildDir = path.join(process.cwd() + '/build');

app.use(express.json());
app.use(fileUpload());
app.use(express.static(buildDir));

app.use('/api', rootRouter);

app.get('/*', function (req, res) {
  res.sendFile(path.join(buildDir, 'index.html'));
});

const port = process.env.PORT || 3001;
app.listen(port, () => {
  console.log(`Server started on port ${port}`);
});
