import { categoryColors } from "../shared/lib/constants";
import type { SkillCategory } from "./types";

export function getSubcategoryColor(
  categories: SkillCategory[],
  subcategoryId: number,
) {
  const category = categories.find((category) =>
    category.subcategories.some((subcat) => subcat.id === subcategoryId),
  );

  return category?.id ? categoryColors[category.id] : "var(--tag-add-color)";
}
