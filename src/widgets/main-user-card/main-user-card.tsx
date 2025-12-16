import { useState } from "react";
import { useNavigate } from "react-router-dom";
import type { IUser } from "../../entities/types";
import { UserCardElement } from "../user-card-element";
import {
  computeIsLiked,
  updateUserFavourites,
} from "../../shared/lib/favourites";
import { useDispatch, useSelector } from "../../features/store";
import {
  selectCurrentUserFavourites,
  setCurrentUserFavourites,
} from "../../features/auth/authSlice";
import {
  addElementInArray,
  excludeElementFromArray,
} from "../../shared/lib/helpers";

type TMainUserCardProps = {
  user: IUser;
  currentUserId?: string | null;
};

export function MainUserCard({ user, currentUserId }: TMainUserCardProps) {
  const navigate = useNavigate();
  const dispatch = useDispatch();
  const favourites = useSelector(selectCurrentUserFavourites);
  const isAuthorized = Boolean(currentUserId);

  const [isLiked, setIsLiked] = useState(() =>
    computeIsLiked(currentUserId, user.id, user.isLiked),
  );

  const baseLikes = user.likes;
  const likesCount = baseLikes + (isLiked ? 1 : 0);

  const handleToggleLike = () => {
    if (!currentUserId) return;
    const newIsLiked = updateUserFavourites(currentUserId, user.id, isLiked);
    dispatch(
      setCurrentUserFavourites(
        isLiked
          ? excludeElementFromArray(favourites, user.id)
          : addElementInArray(favourites, user.id),
      ),
    );
    setIsLiked(newIsLiked);
  };

  const handleMoreDetailsClick = () => {
    navigate(`/skill/${user.id}`);
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
      onMoreDetailsClick={handleMoreDetailsClick}
    />
  );
}
