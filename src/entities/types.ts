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
  gender: "male" | "female" | "not specified";
  images: string[];
  email: string;
}

export type TFilters = {
  mode: "all" | "teach" | "learn";
  gender: "no_matter" | "male" | "female";
  cityNames: string[];
  skillIds: number[];
  searchInputValue?: string;
};

export interface ILoginCredentials {
  email: string;
  password: string;
}

export interface IApiUser {
  id: number;
  name: string;
  email: string;
  location: string;
  gender: string;
  avatarUrl: string;
  description: string;
  birthDate: string;
}

export interface ILoginResponse {
  status: number;
  data: {
    access_token: string;
    token_type: string;
    user: IApiUser;
  };
  error: string;
}

export interface IUserResponse {
  status: number;
  data: {
    user: IApiUser;
  };
  error: string;
}

export interface IUploadedFile extends File {
  preview?: string;
  id: string;
}
