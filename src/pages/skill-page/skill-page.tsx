import style from "./skill-page.module.css";
import { SkillInfo } from "../../widgets/skill-info";
import type { IUser } from "../../entities/types";
import { UserCard } from "../../widgets/UserCard/UserCard";
import { UsersSlider } from "../../widgets/slider/users-slider/users-slider";
import { userByIdSelector } from "../../features/users/usersSlice";
import { useSelector } from "../../features/store";
import { useParams } from "react-router-dom";

export type TSkillPageProps = {
  similarUsers: IUser[];
};

export const SkillPage = ({ similarUsers }: TSkillPageProps) => {
  const { categories, loading } = useSelector((store) => store.categories);
  const { id } = useParams();
  const user = useSelector((store) => userByIdSelector(store, Number(id)));

  return (
    <div className={style.page}>
      <div className={style.info}>
        {user && (
          <UserCard user={user} categories={loading ? [] : categories} />
        )}
        {user && <SkillInfo skill={user.skillCanTeach} images={user.images} />}
      </div>
      <div>
        <p className={style.similar_offers_title}>Похожие предложения</p>
        <UsersSlider
          categories={loading ? [] : categories}
          users={similarUsers}
        />
      </div>
    </div>
  );
};
