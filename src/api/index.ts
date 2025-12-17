import type { IUser } from "../entities/types";

//TODO: удалить после подключения users API
const delay = (ms: number) => new Promise((resolve) => setTimeout(resolve, ms)); // для имитации реального запроса

async function fetchJson<T>(url: string): Promise<T> {
  const response = await fetch(url);

  if (!response.ok) {
    const text = await response.text();
    throw new Error(
      `Failed to fetch ${url}: ${response.status} ${response.statusText}. ${text}`,
    );
  }

  return (await response.json()) as T;
}

export const api = {
  async getAllUsers(): Promise<IUser[]> {
    await delay(300);
    return fetchJson<IUser[]>("/db/users.json");
  },

  async getUserById(id: number): Promise<IUser | undefined> {
    await delay(300);
    const users = await fetchJson<IUser[]>("/db/users.json");
    return users.find((user: IUser) => user.id === id);
  },
};
