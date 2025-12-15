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
import { useMemo, useState } from "react";

import { PopupMenu } from "../../shared/ui/popup-menu";
import { ModalConfirm } from "../../widgets/modal-confirm/modal-confirm";
import Lamp from "../../assets/icons/light-bulb.svg";

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

  const [confirmOpen, setConfirmOpen] = useState(false);

  if (!user) {
    return <div>Пользователь не найден</div>;
  }

  return (
    <div className={style.page}>
      <div className={style.info}>
        <SkillUserCard user={user} />
        <SkillInfo
          skill={user.skillCanTeach}
          images={user.images}
          ownerUserId={user.id}
          onProposalConfirmOpen={() => setConfirmOpen(true)}
        />
      </div>
      <div>
        <p className={style.similar_offers_title}>Похожие предложения</p>
        {similarUsers.length > 0 ? (
          <UsersSlider users={similarUsers} />
        ) : (
          <p>Нет пользователей с таким же навыком</p>
        )}
      </div>

      <PopupMenu
        isOpen={confirmOpen}
        onClose={() => setConfirmOpen(false)}
        position="fixed-top-right"
      >
        <ModalConfirm
          image={Lamp}
          title="Вы предложили обмен"
          text="Теперь дождитесь подтверждения. Вам придёт уведомление"
          buttonText="Готово"
          onClose={() => setConfirmOpen(false)}
        />
      </PopupMenu>
    </div>
  );
};
