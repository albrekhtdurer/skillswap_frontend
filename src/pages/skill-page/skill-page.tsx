import style from "./skill-page.module.css";
import { SkillInfo } from "../../widgets/skill-info";
import type { IUser } from "../../entities/types";
import { SkillUserCard } from "../../widgets/skill-user-card";
import { UsersSlider } from "../../widgets/slider/users-slider/users-slider";
import { userByIdSelector } from "../../features/users/usersSlice";
import { useSelector } from "../../features/store";
import { useParams } from "react-router-dom";

export type TSkillPageProps = {
  similarUsers: IUser[];
};

export const SkillPage = ({ similarUsers }: TSkillPageProps) => {
  const { id } = useParams();
  const user = useSelector((store) => userByIdSelector(store, Number(id)));

  return (
    <div className={style.page}>
      <div className={style.info}>
        {user && <SkillUserCard user={user} />}
        {user && <SkillInfo skill={user.skillCanTeach} images={user.images} />}
      </div>
      <div>
        <p className={style.similar_offers_title}>Похожие предложения</p>
        <UsersSlider users={similarUsers} />
      </div>
    </div>
  );
};
