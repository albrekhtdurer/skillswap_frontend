import style from "./skill-page.module.css";
import { SkillInfo } from "../../widgets/skill-info";
import { SkillUserCard } from "../../widgets/skill-user-card";
import { UsersSlider } from "../../widgets/slider/users-slider/users-slider";
import {
  userByIdSelector,
  usersBySkillIdSelector,
} from "../../features/users/usersSlice";
import { useSelector } from "../../features/store";
import { useParams } from "react-router-dom";
import { useMemo } from "react";

export const SkillPage = () => {
  const { id } = useParams();
  const userId = Number(id);

  const user = useSelector((store) => userByIdSelector(store, userId));

  const usersWithSameSkill = useSelector((store) =>
    user ? usersBySkillIdSelector(store, user.skillCanTeach.id) : [],
  );

  const similarUsers = useMemo(() => {
    return usersWithSameSkill.filter((u) => u.id !== userId);
  }, [usersWithSameSkill, userId]);

  if (!user) {
    return <div>Пользователь не найден</div>;
  }

  return (
    <div className={style.page}>
      <div className={style.info}>
        <SkillUserCard user={user} />
        <SkillInfo skill={user.skillCanTeach} images={user.images} />
      </div>
      <div>
        <p className={style.similar_offers_title}>Похожие предложения</p>
        {similarUsers.length > 0 ? (
          <UsersSlider users={similarUsers} />
        ) : (
          <p>Нет пользователей с таким же навыком</p>
        )}
      </div>
    </div>
  );
};
