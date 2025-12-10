import { useState } from "react";
import type { IUser } from "../../entities/types";
import { UserCardElement } from "../user-card-element";
import {
  computeIsLiked,
  updateUserFavourites,
} from "../../shared/lib/favourites";

type TMainUserCardProps = {
  user: IUser;
  currentUserId?: string | null;
};

export function MainUserCard({ user, currentUserId }: TMainUserCardProps) {
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
      like={{
        isLiked,
        isLikeDisabled: !isAuthorized,
        onToggleLike: handleToggleLike,
        likesCount,
      }}
      onMoreDetailsClick={() => {}}
    />
  );
}
