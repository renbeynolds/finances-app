import express from 'express';
import fileUpload from 'express-fileupload';
import pagination from './middleware/Pagination';
import postgresDB from './postgresDB';
import rootRouter from './routes/RootRouter';

postgresDB
  .initialize()
  .then(() => {
    console.log('Data Source has been initialized!');
  })
  .catch((err) => {
    console.error('Error during Data Source initialization:', err);
  });

const app = express();

app.use(express.json());
app.use(fileUpload());
app.use(pagination);

app.use('/api', rootRouter);

const port = process.env.PORT || 3001;
app.listen(port, () => {
  console.log(`Server started on port ${port}`);
});

export default app;
