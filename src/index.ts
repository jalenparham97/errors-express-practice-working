import express from 'express';
import cors from 'cors';
import { userRouter } from './routes/user.routes';

const app = express();

app.use(cors());
app.use(express.json());

app.use('/users', userRouter);

const port = 3000;

app.listen(port, () => console.log(`Listening on port: ${port}.`));
