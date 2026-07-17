import { PrismaClient } from "@prisma/client";
import logger from "../utils/logger";

const prisma = new PrismaClient();

export const connectDatabase = async (): Promise<void> => {
  try {
    await prisma.$connect();
    logger.info("MySQL connected successfully via Prisma");
  } catch (error) {
    const message = error instanceof Error ? error.message : "Unknown error";
    logger.error("Database connection failed:", message);
    process.exit(1);
  }
};

export const disconnectDatabase = async (): Promise<void> => {
  await prisma.$disconnect();
};

export default prisma;
