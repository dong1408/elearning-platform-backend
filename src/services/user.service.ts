import userRepository from "../repositories/user.repository";
import AppError from "../utils/app-error";
import { MESSAGES, HTTP_STATUS } from "../constants";
import { SafeUser } from "../types";
import { toSafeUser, parseUserId } from "../helpers/user.helper";

const userService = {
  getProfile: async (userId: string): Promise<SafeUser> => {
    const user = await userRepository.findByIdWithPermissions(parseUserId(userId));
    if (!user) {
      throw new AppError(MESSAGES.USER.NOT_FOUND, HTTP_STATUS.NOT_FOUND);
    }
    return toSafeUser(user);
  },
};

export default userService;
