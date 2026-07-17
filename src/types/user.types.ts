import { UserRole } from "./common.types";

export interface SafeUser {
  id: string;
  email: string;
  role: UserRole;
  createdAt: Date;
  updatedAt: Date;
}

export interface CreateUserInput {
  email: string;
  password: string;
  roleId: bigint;
}
