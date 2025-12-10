import { useState } from "react";
import type { IUser, ISkillCategory } from "../../entities/types";
import { UserCardElement } from "../user-card-element";
import {
  computeIsLiked,
  updateUserFavourites,
} from "../../shared/lib/favourites";

type TMainUserCardProps = {
  user: IUser;
  categories: ISkillCategory[];
  currentUserId?: string | null;
};

export function MainUserCard({
  user,
  categories,
  currentUserId,
}: TMainUserCardProps) {
  const isAuthorized = Boolean(currentUserId);

  const [isLiked, setIsLiked] = useState(() =>
    computeIsLiked(currentUserId, user.id, user.isLiked),
  );

  const baseLikes = user.likes;

  const likesCount = baseLikes + (isLiked ? 1 : 0);

  const handleToggleLike = () => {
    if (!currentUserId) return;

    const newIsLiked = updateUserFavourites(currentUserId, user.id, isLiked);
    setIsLiked(newIsLiked);
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
