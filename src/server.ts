import mongoose, { Error } from 'mongoose';
import app from './app';
import config from './config/index';
import { logger, errorLogger } from './shared/logger';
async function main() {
  try {
    await mongoose.connect(config.db_url as string);
    logger.info('Database connected successfully!');
    app.listen(config.port, () => {
      logger.info(`Server app listening on port ${config.port}`);
    });
  } catch (error: Error | unknown) {
    errorLogger.error(
      'Failed To connected database',
      error instanceof Error ? error.message : error
    );
  }
}
//
main();
