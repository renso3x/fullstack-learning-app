
import { app } from "./app";
import { connectDb } from "./config/db";
import { config } from './config/env';

console.log('GH Actions deployment test');

connectDb().then(() => {
  app.listen(config.port, () => 
   console.log(`API running on port ${config.port}`));
});