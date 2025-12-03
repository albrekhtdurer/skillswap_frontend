import cities from "../../public/db/cities.json";
import categories from "../../public/db/categories.json";
import users from "../../public/db/users.json";

import type { City, SkillCategory, User } from "../entities/types";

const delay = (ms: number) => new Promise((resolve) => setTimeout(resolve, ms)); //для иммитации реального запроса

export const api = {
  async getCities(): Promise<City[]> {
    await delay(300);
    return cities;
  },

  async getCategories(): Promise<SkillCategory[]> {
    await delay(300);
    return categories;
  },

  async getAllUsers(): Promise<User[]> {
    await delay(300);
    return users as User[];
  },
};
