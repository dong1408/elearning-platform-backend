import app from "./app";
import { env, connectDatabase } from "./config";
import logger from "./utils/logger";

const startServer = async (): Promise<void> => {
  await connectDatabase();

  app.listen(env.PORT, () => {
    logger.info(`Server running on port ${env.PORT} [${env.NODE_ENV}]`);
  });
};

startServer().catch((error: unknown) => {
  const message = error instanceof Error ? error.message : "Unknown error";
  logger.error("Failed to start server:", message);
  process.exit(1);
});
