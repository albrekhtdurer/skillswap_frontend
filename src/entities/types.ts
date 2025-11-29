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
