export interface City {
  id: number;
  name: string;
}

export interface Subcategory {
  id: number;
  name: string;
}

export interface SkillCategory {
  id: number;
  name: string;
  subcategories: Subcategory[];
}

export type Skill = {
  id: number;
  name: string;
  fullDescription: string;
  categoryId: number;
  subCategoryId: number;
};

export interface User {
  id: number;
  name: string;
  location: string;
  likes: number;
  isLiked: boolean;
  age: string;
  createdAt: string;
  description: string;
  avatarUrl: string;
  skillCanTeach: Skill;
  subcategoriesWantToLearn: Subcategory[];
  gender: "male" | "female";
  images: string[];
}

export type Filters = {
  mode: "all" | "teach" | "learn";
  gender: "no_matter" | "male" | "female";
  cityIds: number[];
  skillIds: number[];
}; // from here https://docs.google.com/document/d/1yXsUpRttw7yRXS7mT0eM_m_MqhMg_Mq6Fx8ne0JlA4U/edit?tab=t.0#heading=h.epowgaq476mf
