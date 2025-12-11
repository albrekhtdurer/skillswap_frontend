import type {
  IUser,
  ApiUser,
  LoginResponse,
  UserResponse,
  LoginCredentials,
} from "../entities/types";

export const mapApiUserToIUser = (apiUser: ApiUser): IUser => {
  const calculateAge = (birthDate: string): string => {
    const today = new Date();
    const birth = new Date(birthDate);
    let age = today.getFullYear() - birth.getFullYear();
    const monthDiff = today.getMonth() - birth.getMonth();

    if (
      monthDiff < 0 ||
      (monthDiff === 0 && today.getDate() < birth.getDate())
    ) {
      age--;
    }

    return `${age} лет`;
  };

  return {
    id: apiUser.id,
    name: apiUser.name,
    email: apiUser.email,
    location: apiUser.location || "",
    age: calculateAge(apiUser.birthDate),
    createdAt: new Date().toISOString().split("T")[0],
    description: apiUser.description || "",
    avatarUrl: apiUser.avatarUrl || "",
    gender:
      (apiUser.gender as "male" | "female" | "not specified") ||
      "not specified",
    likes: 0,
    isLiked: false,
    skillCanTeach: {
      id: 0,
      name: "",
      fullDescription: "",
      categoryId: 0,
      subCategoryId: 0,
    },
    subcategoriesWantToLearn: [],
    images: [],
  };
};

const API_BASE_URL = "http://89.169.134.231:8000/api/v1";

async function apiRequest<T>(
  endpoint: string,
  options: RequestInit = {},
): Promise<T> {
  const url = `${API_BASE_URL}${endpoint}`;

  const defaultHeaders = {
    "Content-Type": "application/json",
    ...options.headers,
  };

  const response = await fetch(url, {
    ...options,
    headers: defaultHeaders,
  });

  if (!response.ok) {
    const errorText = await response.text();
    throw new Error(
      `HTTP error! status: ${response.status}, message: ${errorText}`,
    );
  }

  return response.json();
}

export const authApi = {
  async login(credentials: LoginCredentials): Promise<LoginResponse> {
    return apiRequest<LoginResponse>("/auth/login", {
      method: "POST",
      body: JSON.stringify(credentials),
    });
  },

  async getUser(token: string): Promise<ApiUser> {
    const response = await apiRequest<UserResponse>("/user/", {
      method: "GET",
      headers: {
        Authorization: `Bearer ${token}`,
      },
    });
    return response.data.user;
  },

  async loginAndGetUser(credentials: LoginCredentials): Promise<{
    user: IUser;
    token: string;
  }> {
    const loginResponse = await this.login(credentials);

    if (loginResponse.status === 200 && loginResponse.data.access_token) {
      localStorage.setItem("access_token", loginResponse.data.access_token);

      const userData = mapApiUserToIUser(loginResponse.data.user);

      return {
        user: userData,
        token: loginResponse.data.access_token,
      };
    } else {
      throw new Error(loginResponse.error || "Ошибка авторизации");
    }
  },
};
