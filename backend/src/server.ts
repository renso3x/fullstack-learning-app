import { app } from './app';
import { connectDb } from './config/db';
import { config } from './config/env';

async function start() {
  await connectDb();

  app.listen(config.port, () => {
    console.log(`🚀 Server running on http://localhost:${config.port}`);
  });
}

start();
