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
