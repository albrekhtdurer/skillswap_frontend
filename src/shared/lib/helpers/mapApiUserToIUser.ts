// import type { IApiUser, IUser } from "../../../entities/types";

// function mapApiUserToIUser(apiUser: IApiUser): IUser {
//   const calculateAge = (birthDate: string): string => {
//     const today = new Date();
//     const birth = new Date(birthDate);
//     let age = today.getFullYear() - birth.getFullYear();
//     const monthDiff = today.getMonth() - birth.getMonth();

//     if (
//       monthDiff < 0 ||
//       (monthDiff === 0 && today.getDate() < birth.getDate())
//     ) {
//       age--;
//     }

//     return `${age} лет`;
//   };

//   return {
//     id: apiUser.id,
//     name: apiUser.name,
//     email: apiUser.email,
//     location: apiUser.location || "",
//     age: calculateAge(apiUser.birthDate),
//     createdAt: new Date().toISOString().split("T")[0],
//     description: apiUser.description || "",
//     avatarUrl: apiUser.avatarUrl || "",
//     gender:
//       (apiUser.gender as "male" | "female" | "not specified") ||
//       "not specified",
//     likes: 0,
//     isLiked: false,
//     skillCanTeach: {
//       id: 0,
//       name: "",
//       fullDescription: "",
//       categoryId: 0,
//       subCategoryId: 0,
//     },
//     subcategoriesWantToLearn: [],
//     images: [],
//   };
// }
