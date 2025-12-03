import type { User, SkillCategory } from "../../entities/types";
import styles from "./UserCard.module.css";
import { getSubcategoryColor } from "../../entities/subcategoryColors";
import HeartIcon from "../../assets/icons/heart.svg";
import { Button } from "../../shared/ui/Button/Button";

// Этот компонент отображает карточку пользователя с информацией и навыками
type UserCardProps = {
  user: User;
  categories: SkillCategory[];
};

export function UserCard({ user, categories }: UserCardProps) {
  const {
    name,
    location,
    age,
    likes,
    isLiked,
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
              <span className={styles.likeCount}>{likes}</span>
              <button
                type="button"
                className={styles.likeButton}
                aria-pressed={isLiked}
              >
                <img src={HeartIcon} alt="" className={styles.likeIcon} />
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
