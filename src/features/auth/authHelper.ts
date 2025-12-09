import { api } from "../../api";
import type { IUser } from "../../entities/types";

export const loginWithMockUser = async (): Promise<IUser> => {
  const users = await api.getAllUsers();

  const user = users[0] as IUser;

  return user;
};
