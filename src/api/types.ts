export interface City {
  id: number;
  name: string;
}

export interface SkillCategory {
  category: string;
  skills: string[];
}

export interface User {
  id: number;
  name: string;
  city: string;
  likes: number;
  isLiked: boolean;
  age: number;
  createdAt: string;
  description: string;
  img: string;
  teach: string[];
  learn: string[];
  gender: "male" | "female";
  skillsImage: string[];
  fullDescription: string;
}
