import cities from "../public/db/cities.json";
import skills from "../public/db/skills.json";

import type { City, SkillCategory } from "./types";

const delay = (ms: number) => new Promise((resolve) => setTimeout(resolve, ms)); //для иммитации реального запроса

export const api = {
  async getCities(): Promise<City[]> {
    await delay(300);
    return cities;
  },

  async getSkills(): Promise<SkillCategory[]> {
    await delay(300);
    return skills;
  },
};
