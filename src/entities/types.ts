export interface ICity {
  id: number;
  name: string;
}

export interface ISubcategory {
  id: number;
  name: string;
}

export interface ISkillCategory {
  id: number;
  name: string;
  subcategories: ISubcategory[];
}

export type TSkill = {
  id: number;
  name: string;
  fullDescription: string;
  categoryId: number;
  subCategoryId: number;
};

export interface IUser {
  id: number;
  name: string;
  location: string;
  likes: number;
  isLiked: boolean;
  age: string;
  createdAt: string;
  description: string;
  avatarUrl: string;
  skillCanTeach: TSkill;
  subcategoriesWantToLearn: ISubcategory[];
  gender: "male" | "female";
  images: string[];
}

export type TFilters = {
  mode: "all" | "teach" | "learn";
  gender: "no_matter" | "male" | "female";
  cityNames: string[];
  skillIds: number[];
}; // from here https://docs.google.com/document/d/1yXsUpRttw7yRXS7mT0eM_m_MqhMg_Mq6Fx8ne0JlA4U/edit?tab=t.0#heading=h.epowgaq476mf
