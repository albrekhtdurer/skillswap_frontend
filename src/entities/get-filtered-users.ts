import type { TFilters, IUser } from "./types";

export const getFilteredUsers = (users: IUser[], filters: TFilters) => {
  const { cityNames, gender, mode, skillIds } = filters;
  return users
    .filter((user) => gender === "no_matter" || gender === user.gender)
    .filter((user) => !cityNames.length || cityNames.includes(user.location))
    .filter(
      (user) =>
        !skillIds.length ||
        (mode !== "teach" &&
          skillIds.includes(user.skillCanTeach.subCategoryId)) ||
        (mode !== "learn" &&
          user.subcategoriesWantToLearn.some((skill) =>
            skillIds.includes(skill.id),
          )),
    );
};
