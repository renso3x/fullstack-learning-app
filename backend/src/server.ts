
import { app } from "./app";
import { connectDb } from "./config/db";
import { config } from './config/env';

connectDb().then(() => {
  app.listen(config.port, () => 
   console.log(`API running on port ${config.port}`));
});