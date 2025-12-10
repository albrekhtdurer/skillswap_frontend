import { useMemo, type FC } from "react";
import { Sidebar } from "../../widgets/sidebar";
import { useSelector } from "../../features/store";
import style from "./style.module.css";
import { getFilteredUsers } from "../../entities/get-filtered-users";
import { CardsGallery } from "../../widgets/gallery-cards";
import { isNotEmptySelector } from "../../features/filters/filtersSlice";

const MONTH_IN_MS = 30 * 24 * 60 * 60 * 1000;
const NOW = Date.now();
const MONTH_AGO = NOW - MONTH_IN_MS;

export const UsersPage: FC = () => {
  const filters = useSelector((state) => state.filters.filters);
  const users = useSelector((state) => state.users.users);
  const hasActiveFilters = useSelector(isNotEmptySelector);

  const popularUsers = useMemo(
    () => users.filter((user) => user.likes > 15),
    [users],
  );

  const newUsers = useMemo(
    () =>
      users.filter((user) => {
        const createdTime = new Date(user.createdAt).getTime();
        return !Number.isNaN(createdTime) && createdTime >= MONTH_AGO;
      }),
    [users],
  );

  const filteredUsers = useMemo(
    () => getFilteredUsers(users, filters),
    [filters, users],
  );

  return (
    <div className={style["users-page"]}>
      <Sidebar />
      <div className={style["users-page__body"]}>
        {hasActiveFilters ? (
          <CardsGallery
            cards={filteredUsers}
            title={`Подходящие предложения: ${filteredUsers.length}`}
            sortable
          />
        ) : (
          <>
            <>
              <div className={style.section}>
                <CardsGallery
                  cards={popularUsers}
                  title="Популярное"
                  maxCards={3}
                />
              </div>

              <div className={style.section}>
                <CardsGallery cards={newUsers} title="Новое" maxCards={3} />
              </div>

              <div className={style.section}>
                <CardsGallery cards={users} title="Рекомендуем" />
              </div>
            </>
          </>
        )}
      </div>
    </div>
  );
};
