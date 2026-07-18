import userRepository from "../repositories/user.repository";
import roleRepository from "../repositories/role.repository";
import AppError from "../utils/app-error";
import { MESSAGES, HTTP_STATUS } from "../constants";
import {
  AdminUserListQuery,
  AdminUserListResult,
  UpdateAdminUserInput,
  AdminUserItem,
} from "../types";
import { toAdminUserItem } from "../helpers/admin.helper";
import { parseBigIntId, parseUserId } from "../helpers/user.helper";

const assertNotSelf = (actorId: string, targetId: string): void => {
  if (actorId === targetId) {
    throw new AppError(MESSAGES.USER.CANNOT_MODIFY_SELF, HTTP_STATUS.BAD_REQUEST);
  }
};

const adminUserService = {
  list: async (query: AdminUserListQuery): Promise<AdminUserListResult> => {
    const { page, limit, search, status, roleId } = query;
    const skip = (page - 1) * limit;
    const parsedRoleId = roleId ? parseBigIntId(roleId) : undefined;

    const filters = {
      search,
      status,
      roleId: parsedRoleId,
      skip,
      take: limit,
    };

    const [users, total] = await Promise.all([
      userRepository.findManyForAdmin(filters),
      userRepository.countForAdmin({ search, status, roleId: parsedRoleId }),
    ]);

    return {
      items: users.map(toAdminUserItem),
      pagination: {
        page,
        limit,
        total,
        totalPages: Math.ceil(total / limit) || 0,
      },
    };
  },

  getById: async (id: string): Promise<AdminUserItem> => {
    const user = await userRepository.findById(parseUserId(id));
    if (!user) {
      throw new AppError(MESSAGES.USER.NOT_FOUND, HTTP_STATUS.NOT_FOUND);
    }
    return toAdminUserItem(user);
  },

  update: async (
    id: string,
    input: UpdateAdminUserInput,
    actorId: string
  ): Promise<AdminUserItem> => {
    assertNotSelf(actorId, id);

    const user = await userRepository.findById(parseUserId(id));
    if (!user) {
      throw new AppError(MESSAGES.USER.NOT_FOUND, HTTP_STATUS.NOT_FOUND);
    }

    if (input.roleId !== undefined) {
      const role = await roleRepository.findById(parseBigIntId(input.roleId));
      if (!role) {
        throw new AppError(MESSAGES.ROLE.NOT_FOUND, HTTP_STATUS.BAD_REQUEST);
      }
    }

    const updated = await userRepository.updateById(user.id, {
      fullName: input.fullName,
      status: input.status,
      roleId: input.roleId !== undefined ? parseBigIntId(input.roleId) : undefined,
    });

    return toAdminUserItem(updated);
  },

  softDelete: async (id: string, actorId: string): Promise<void> => {
    assertNotSelf(actorId, id);

    const user = await userRepository.findById(parseUserId(id));
    if (!user) {
      throw new AppError(MESSAGES.USER.NOT_FOUND, HTTP_STATUS.NOT_FOUND);
    }

    await userRepository.softDeleteById(user.id);
  },
};

export default adminUserService;
