import { useMemo, type FC } from "react";
import { Sidebar } from "../../widgets/sidebar";
import { useSelector } from "../../features/store";
import style from "./style.module.css";
import { getFilteredUsers } from "../../entities/get-filtered-users";
import { CardsGallery } from "../../widgets/gallery-cards";

export const UsersPage: FC = () => {
  const filters = useSelector((state) => state.filters.filters);
  const users = useSelector((state) => state.users.users);

  const filteredUsers = useMemo(
    () => getFilteredUsers(users, filters),
    [filters, users],
  );

  return (
    <div className={style["users-page"]}>
      <Sidebar></Sidebar>
      <div className={style["users-page__body"]}>
        <CardsGallery
          cards={filteredUsers}
          title={`Подходящие предложения: ${filteredUsers.length}`}
        />
      </div>
    </div>
  );
};
