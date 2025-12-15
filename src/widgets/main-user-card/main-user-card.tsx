import { useMemo, useState } from "react";
import { useNavigate } from "react-router-dom";
import type { IUser } from "../../entities/types";
import { UserCardElement } from "../user-card-element";
import {
  computeIsLiked,
  updateUserFavourites,
} from "../../shared/lib/favourites";
import { hasProposal } from "../../shared/lib/proposals";
import { ClockIcon } from "../../assets/img/icons";

type TMainUserCardProps = {
  user: IUser;
  currentUserId?: string | null;
};

export function MainUserCard({ user, currentUserId }: TMainUserCardProps) {
  const navigate = useNavigate();
  const isAuthorized = Boolean(currentUserId);

  const [isLiked, setIsLiked] = useState(() =>
    computeIsLiked(currentUserId, user.id, user.isLiked),
  );

  const baseLikes = user.likes;
  const likesCount = baseLikes + (isLiked ? 1 : 0);

  const isExchangeProposed = useMemo(() => {
    return hasProposal(currentUserId, user.id);
  }, [currentUserId, user.id]);

  const handleToggleLike = () => {
    if (!currentUserId) return;
    const newIsLiked = updateUserFavourites(currentUserId, user.id, isLiked);
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
      actionButton={{
        text: isExchangeProposed ? "Обмен предложен" : "Подробнее",
        type: isExchangeProposed ? "secondary" : "primary",
        icon: isExchangeProposed ? <ClockIcon /> : undefined,
        onClick: handleMoreDetailsClick,
      }}
    />
  );
}
