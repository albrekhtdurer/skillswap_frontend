import type { ICity, ISkillCategory, IUser } from "../entities/types";

const delay = (ms: number) => new Promise((resolve) => setTimeout(resolve, ms)); // для имитации реального запроса

async function fetchJson<T>(url: string): Promise<T> {
  const response = await fetch(url);

  if (!response.ok) {
    throw new Error(
      `Failed to fetch ${url}: ${response.status} ${response.statusText}`,
    );
  }

  const data = (await response.json()) as T;
  return data;
}

export const api = {
  async getCities(): Promise<ICity[]> {
    await delay(300);
    return fetchJson<ICity[]>("/db/cities.json");
  },

  async getCategories(): Promise<ISkillCategory[]> {
    await delay(300);
    return fetchJson<ISkillCategory[]>("/db/categories.json");
  },

  async getAllUsers(): Promise<IUser[]> {
    await delay(300);
    return fetchJson<IUser[]>("/db/users.json");
  },
};
