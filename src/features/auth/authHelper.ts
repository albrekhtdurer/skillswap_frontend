import usersData from "../../../public/db/users.json";
import type { IUser } from "../../entities/types";

export const loginWithMockUser = async (): Promise<IUser> => {
  await new Promise((resolve) => setTimeout(resolve, 500));

  const user = usersData[0] as IUser;

  return user;
};
