import type { IUser, ISkillCategory } from "../../entities/types";
import styles from "./user-card-element.module.css";
import { getSubcategoryColor } from "../../entities/subcategoryColors";
import { Button } from "../../shared/ui/Button/Button";

// Этот компонент отображает карточку пользователя с информацией и навыками
type TUserCardElementProps = {
  user: IUser;
  categories: ISkillCategory[];
  isLiked: boolean;
  isLikeDisabled: boolean;
  onToggleLike: () => void;
  likesCount: number;
};

export function UserCardElement({
  user,
  categories,
  isLiked,
  isLikeDisabled,
  onToggleLike,
  likesCount,
}: TUserCardElementProps) {
  const {
    name,
    location,
    age,
    avatarUrl,
    skillCanTeach,
    subcategoriesWantToLearn,
  } = user;

  // Определяем видимые подкатегории для отображения и количество скрытых подкатегорий
  const visibleSubcategories = subcategoriesWantToLearn.slice(0, 2);
  const hiddenCount =
    subcategoriesWantToLearn.length - visibleSubcategories.length;

  return (
    <article className={styles.card}>
      <div className={styles.userBox}>
        <img className={styles.avatar} src={avatarUrl} alt={name} />

        {/* Блок с аватаром, именем и лайками */}
        <div className={styles.userInfo}>
          <div className={styles.userHeader}>
            <div className={styles.likeWrapper}>
              <span className={styles.likeCount}>{likesCount}</span>
              <button
                type="button"
                className={styles.likeButton}
                aria-pressed={isLiked}
                aria-label={
                  isLiked ? "Убрать из избранного" : "Добавить в избранное"
                }
                onClick={onToggleLike}
                disabled={isLikeDisabled}
              >
                <svg
                  width="20"
                  height="20"
                  viewBox="-1 -1 22 22"
                  fill="none"
                  xmlns="http://www.w3.org/2000/svg"
                >
                  <path
                    d="M10 17C6 15 2 11.5 2 7.2C2 4.4 4.3 2 7.1 2C8.8 2 10.2 2.8 11 4C11.8 2.8 13.2 2 14.9 2C17.7 2 20 4.4 20 7.2C20 11.6 16 15 12 17C11.5 17.2 10.5 17.2 10 17Z"
                    fill={
                      isLiked
                        ? "var(--accent-color)"
                        : "var(--card-input-color)"
                    }
                    stroke={
                      isLiked ? "var(--accent-color)" : "var(--border-color)"
                    }
                    strokeWidth="1.5"
                    strokeLinecap="round"
                    strokeLinejoin="round"
                  />
                </svg>
              </button>
            </div>

            <div className={styles.userText}>
              <h3 className={styles.name}>{name}</h3>
              <p className={styles.meta}>
                <span>{location}</span>
                <span>, </span>
                <span>{age}</span>
              </p>
            </div>
          </div>
        </div>
      </div>

      {/* Секция "Может научить" с отображением навыка, которым может поделиться пользователь */}
      <div className={styles.section}>
        <p className={styles.sectionLabel}>Может научить:</p>
        <div className={styles.chipsTeach}>
          <span
            className={styles.chipTeach}
            style={{
              backgroundColor: getSubcategoryColor(
                categories,
                skillCanTeach.subCategoryId,
              ),
            }}
          >
            {skillCanTeach.name}
          </span>
        </div>
      </div>

      {/* Секция "Хочет научиться" с отображением подкатегорий и индикацией скрытых элементов */}
      <div className={styles.section}>
        <p className={styles.sectionLabel}>Хочет научиться:</p>
        <div className={styles.chipsLearn}>
          {visibleSubcategories.map((subcategory) => {
            const color = getSubcategoryColor(categories, subcategory.id);

            return (
              <span
                key={subcategory.id}
                className={styles.chip}
                style={{ backgroundColor: color }}
              >
                <span className={styles.chipText}>{subcategory.name}</span>
              </span>
            );
          })}

          {hiddenCount > 0 && (
            <span className={styles.chipMore}>+{hiddenCount}</span>
          )}
        </div>
      </div>

      {/* Кнопка для навигации к модальному окну с подробностями */}
      <Button type="primary" fullWidth onClick={() => {}}>
        Подробнее
      </Button>
    </article>
  );
}
