import { useState } from "react";
import type { IUser, ISkillCategory } from "../../entities/types";
import { UserCardElement } from "../user-card-element";
import {
  getUserFavourites,
  saveUserFavourites,
} from "../../shared/lib/favourites";

type TUserCardProps = {
  user: IUser;
  categories: ISkillCategory[];
  isAuthorized: boolean;
  currentUserId: string;
};

export function UserCard({
  user,
  categories,
  isAuthorized,
  currentUserId,
}: TUserCardProps) {
  const [isLiked, setIsLiked] = useState(() => {
    if (!isAuthorized) return false;

    const favourites = getUserFavourites(currentUserId);
    return favourites.includes(user.id) || user.isLiked;
  });

  const baseLikes = user.likes;

  const likesCount = baseLikes + (isLiked ? 1 : 0);

  const handleToggleLike = () => {
    if (!isAuthorized) return;

    const favourites = getUserFavourites(currentUserId);
    let nextFavourites: number[];

    if (isLiked) {
      nextFavourites = favourites.filter((id) => id !== user.id);
    } else {
      nextFavourites = favourites.includes(user.id)
        ? favourites
        : [...favourites, user.id];
    }

    saveUserFavourites(currentUserId, nextFavourites);
    setIsLiked((prev) => !prev);
  };

  return (
    <UserCardElement
      user={user}
      categories={categories}
      isLiked={isLiked}
      isLikeDisabled={!isAuthorized}
      onToggleLike={handleToggleLike}
      likesCount={likesCount}
    />
  );
}
