import mongoose, { Error } from 'mongoose';
import app from './app';
import config from './config/index';
import { logger, errorLogger } from './shared/logger';
import { Server } from 'http';

process.on('uncaughtException', error => {
  errorLogger.error(error);
  process.exit(1);
});

let server: Server;
async function main() {
  try {
    await mongoose.connect(config.db_url as string);
    logger.info('Database connected successfully!');
    server = app.listen(config.port, () => {
      logger.info(`Server app listening on port ${config.port}`);
    });
  } catch (error: Error | unknown) {
    errorLogger.error(
      'Failed To connected database',
      error instanceof Error ? error.message : error
    );
  }

  process.on('unhandledRejection', (error: any) => {
    console.log(
      'Unhandled Rejection is detected we are closing server ....',
      error
    );
    if (server) {
      server.close(() => {
        errorLogger.log(error);
        process.exit(1);
      });
    } else {
      process.exit(1);
    }
  });
}
//
main();

process.on('SIGTERM', () => {
  logger.info('SIGTERM is received');
  if (server) {
    server.close();
  }
});
