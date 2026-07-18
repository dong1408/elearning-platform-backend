import { UserStatus } from "./common.types";

export interface SafeUser {
  id: string;
  email: string;
  fullName: string | null;
  status: UserStatus;
  role: string;
  permissions: string[];
  createdAt: Date;
  updatedAt: Date;
}

export interface CreateUserInput {
  email: string;
  password: string;
  roleId: bigint;
  fullName?: string | null;
}
