import express from 'express';
import fileUpload from 'express-fileupload';
import pagination from './middleware/Pagination';
import rootRouter from './routes/RootRouter';

const app = express();

app.use(express.json());
app.use(fileUpload());
app.use(pagination);

app.use('/api', rootRouter);

export default app;
