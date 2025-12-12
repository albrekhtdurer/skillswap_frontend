import type { TFilters, IUser } from "./types";

export const getFilteredUsers = (users: IUser[], filters: TFilters) => {
  const { cityNames, gender, mode, skillIds, searchInputValue } = filters;

  if (!searchInputValue?.trim()) {
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
  } else if (searchInputValue.trim()) {
    const searchValue = searchInputValue.toLowerCase();
    return users.filter((user) =>
      user.skillCanTeach.name.toLowerCase().includes(searchValue),
    );
  }
};
