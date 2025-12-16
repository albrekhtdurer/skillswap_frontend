import type {
  IApiUser,
  ILoginResponse,
  IUserResponse,
  ILoginCredentials,
} from "../entities/types";
import { apiRequest } from "./base";

export const authApi = {
  async login(credentials: ILoginCredentials): Promise<{
    user: IApiUser;
    token: string;
  }> {
    const response = await apiRequest<ILoginResponse>("/auth/login", {
      method: "POST",
      body: JSON.stringify(credentials),
    });

    if (response.status === 200 && response.data.access_token) {
      localStorage.setItem("access_token", response.data.access_token);

      return {
        user: response.data.user,
        token: response.data.access_token,
      };
    } else {
      throw new Error(response.error || "Ошибка авторизации");
    }
  },

  async getUser(token: string): Promise<IApiUser> {
    const response = await apiRequest<IUserResponse>("/user/", {
      method: "GET",
      headers: {
        Authorization: `Bearer ${token}`,
      },
    });
    return response.data.user;
  },
};
