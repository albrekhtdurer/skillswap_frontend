import style from "./skill-page.module.css";
import { SkillInfo } from "../../widgets/skill-info";
import type { IUser } from "../../entities/types";
import { UserCard } from "../../widgets/UserCard/UserCard";
import { UsersSlider } from "../../widgets/slider/users-slider/users-slider";

import { getCategories } from "../../features/categories/categoriesSlice";
import { useDispatch, useSelector } from "../../features/store";
import { useEffect } from "react";

export type TSkillPageProps = {
  user: IUser;
  similarUsers: IUser[];
};

export const SkillPage = ({ user, similarUsers }: TSkillPageProps) => {
  const dispatch = useDispatch();
  const { categories, loading } = useSelector((store) => store.categories);

  useEffect(() => {
    dispatch(getCategories());
  }, [dispatch]);

  return (
    <div className={style.page}>
      <div className={style.info}>
        <UserCard user={user} categories={loading ? [] : categories} />
        <SkillInfo skill={user.skillCanTeach} images={user.images} />
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
