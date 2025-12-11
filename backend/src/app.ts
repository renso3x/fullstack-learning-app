import express from 'express';
import cors from 'cors';
import { json } from 'express';
import { errorHandler } from './middleware/errorHandler';
import { router as apiRouter } from './routes';

export const app = express();

app.use(cors());
app.use(json());

app.use(cors({ origin: '*', credentials: true }));

app.get('/health', (_req, res) => {
  res.json({ status: 'ok' });
});

app.use('/api', apiRouter);

app.use(errorHandler);
