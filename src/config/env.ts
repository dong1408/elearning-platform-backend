import dotenv from "dotenv";
import { EnvConfig } from "../types";

dotenv.config();

const env: EnvConfig = {
  NODE_ENV: process.env.NODE_ENV || "development",
  PORT: parseInt(process.env.PORT ?? "3000", 10),
  DATABASE_URL: process.env.DATABASE_URL || "",
  JWT_SECRET: process.env.JWT_SECRET || "your-secret-key",
  JWT_REFRESH_SECRET: process.env.JWT_REFRESH_SECRET || "your-refresh-secret-key",
  JWT_ACCESS_EXPIRES_IN: process.env.JWT_ACCESS_EXPIRES_IN || "1d",
  JWT_REFRESH_EXPIRES_IN: process.env.JWT_REFRESH_EXPIRES_IN || "7d",
};

export default env;
