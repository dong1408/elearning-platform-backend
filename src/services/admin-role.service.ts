import roleRepository from "../repositories/role.repository";
import permissionRepository from "../repositories/permission.repository";
import AppError from "../utils/app-error";
import { MESSAGES, HTTP_STATUS, USER_ROLES } from "../constants";
import {
  AdminRoleItem,
  CreateAdminRoleInput,
  UpdateAdminRoleInput,
  PermissionItem,
} from "../types";
import { toAdminRoleItem, toPermissionItem } from "../helpers/admin.helper";
import { parseBigIntId } from "../helpers/user.helper";

const assertNotSystemAdminRole = (roleName: string): void => {
  if (roleName === USER_ROLES.ADMIN) {
    throw new AppError(MESSAGES.ROLE.SYSTEM_ROLE_PROTECTED, HTTP_STATUS.FORBIDDEN);
  }
};

const resolvePermissionIds = async (permissionIds: string[]): Promise<bigint[]> => {
  const uniqueIds = [...new Set(permissionIds)];
  const parsedIds = uniqueIds.map(parseBigIntId);
  const permissions = await permissionRepository.findActiveByIds(parsedIds);

  if (permissions.length !== parsedIds.length) {
    throw new AppError(MESSAGES.ROLE.INVALID_PERMISSIONS, HTTP_STATUS.BAD_REQUEST);
  }

  return parsedIds;
};

const adminRoleService = {
  list: async (): Promise<AdminRoleItem[]> => {
    const roles = await roleRepository.findAllWithPermissions();
    return roles.map(toAdminRoleItem);
  },

  create: async (input: CreateAdminRoleInput): Promise<AdminRoleItem> => {
    const name = input.name.trim().toUpperCase();

    if (name === USER_ROLES.ADMIN) {
      throw new AppError(MESSAGES.ROLE.SYSTEM_ROLE_PROTECTED, HTTP_STATUS.FORBIDDEN);
    }

    const exists = await roleRepository.nameExists(name);
    if (exists) {
      throw new AppError(MESSAGES.ROLE.NAME_EXISTS, HTTP_STATUS.CONFLICT);
    }

    const permissionIds = await resolvePermissionIds(input.permissionIds);
    const role = await roleRepository.createWithPermissions(name, permissionIds);
    return toAdminRoleItem(role);
  },

  update: async (id: string, input: UpdateAdminRoleInput): Promise<AdminRoleItem> => {
    const role = await roleRepository.findByIdWithPermissions(parseBigIntId(id));
    if (!role) {
      throw new AppError(MESSAGES.ROLE.NOT_FOUND, HTTP_STATUS.NOT_FOUND);
    }

    assertNotSystemAdminRole(role.name);

    if (input.name !== undefined) {
      const name = input.name.trim().toUpperCase();
      if (name === USER_ROLES.ADMIN) {
        throw new AppError(MESSAGES.ROLE.SYSTEM_ROLE_PROTECTED, HTTP_STATUS.FORBIDDEN);
      }

      const exists = await roleRepository.nameExists(name, role.id);
      if (exists) {
        throw new AppError(MESSAGES.ROLE.NAME_EXISTS, HTTP_STATUS.CONFLICT);
      }

      await roleRepository.updateName(role.id, name);
    }

    if (input.permissionIds !== undefined) {
      const permissionIds = await resolvePermissionIds(input.permissionIds);
      await roleRepository.replacePermissions(role.id, permissionIds);
    }

    const updated = await roleRepository.findByIdWithPermissions(role.id);
    if (!updated) {
      throw new AppError(MESSAGES.ROLE.NOT_FOUND, HTTP_STATUS.NOT_FOUND);
    }

    return toAdminRoleItem(updated);
  },

  listPermissions: async (): Promise<PermissionItem[]> => {
    const permissions = await permissionRepository.findAllActive();
    return permissions.map(toPermissionItem);
  },
};

export default adminRoleService;
