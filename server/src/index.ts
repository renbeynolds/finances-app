import app from './app';
import postgresDB from './postgresDB';

postgresDB
  .initialize()
  .then(() => {
    console.log('Data Source has been initialized!');
  })
  .catch((err) => {
    console.error('Error during Data Source initialization:', err);
  });

const port = process.env.PORT;
app.listen(port, () => {
  console.log(`Server started on port ${port}`);
});
