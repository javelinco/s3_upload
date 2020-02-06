import Logger from './helpers/logger';
import Server from './server';
import * as dotenv from 'dotenv';

dotenv.config();

(async () => {
  try {
    Logger.instantiate();
    await Server.start();
  } catch (error) {
    Logger.instance.error('Server crashed', error);
    process.exit(1);
  }
})().catch(console.error);
