import { useState } from "react";
import type { IUser } from "../../entities/types";
import { Button } from "../../shared/ui/Button/Button";
import { MainUserCard } from "../main-user-card/main-user-card.tsx";
import style from "./cards-gallery.module.css";
import { SortIcon, RightIcon } from "../../assets/img/icons";

export type CardsGalleryPros = {
  title: string;
  cards: IUser[];
  maxCards?: number;
  sortable?: boolean;
  sortOnClick?: () => void;
};

export const CardsGallery = ({
  title,
  cards,
  maxCards,
  sortable,
  sortOnClick,
}: CardsGalleryPros) => {
  const [expanded, setExpanded] = useState(false);

  const shouldLimit = maxCards !== undefined && maxCards > 0;
  const displayedCards =
    shouldLimit && !expanded ? cards.slice(0, maxCards) : cards;
  const hasMore = shouldLimit && cards.length > maxCards;

  const toggleExpanded = () => {
    setExpanded((prev) => !prev);
  };

  // TODO: заменить на данные из стора авторизации,
  // когда будет готов auth
  const currentUserId = "demo-user";

  return (
    <div>
      <div className={style.card_gallery_header}>
        <h2 className={style.card_gallery_header_title}>{title}</h2>
        <div className={style.card_gallery_actions}>
          {hasMore && (
            <Button type="tertiary" onClick={toggleExpanded}>
              <div className={style.card_gallery_button}>
                {expanded ? "Свернуть" : "Смотреть все"}
                <RightIcon />
              </div>
            </Button>
          )}

          {sortable && (
            <Button type="tertiary" onClick={sortOnClick || (() => {})}>
              <div className={style.card_gallery_button}>
                <SortIcon />
                Сначала новые
              </div>
            </Button>
          )}
        </div>
      </div>
      <div className={style.card_gallery_main}>
        {displayedCards.map((user) => (
          <MainUserCard
            key={user.id}
            user={user}
            currentUserId={currentUserId}
          />
        ))}
      </div>
    </div>
  );
};
