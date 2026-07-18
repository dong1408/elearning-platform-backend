import { SafeUser } from "./user.types";

declare global {
  namespace Express {
    interface Request {
      user?: SafeUser;
      validatedQuery?: unknown;
    }
  }
}

export {};
