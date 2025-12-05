import express from 'express';
import cors from 'cors';
import { json } from 'express';
import { errorHandler } from './middleware/errorHandler';
import { router as apiRouter } from './routes';

export const app = express();

app.use(cors());
app.use(json());

// Health check
app.get('/health', (_req, res) => {
  res.json({ status: 'ok' });
});

// API routes
app.use('/api', apiRouter);

// Error handler (last)
app.use(errorHandler);
