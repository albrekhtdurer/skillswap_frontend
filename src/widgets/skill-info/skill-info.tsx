import type { TSkill } from "../../entities/types";
import { ImagesSlider } from "../slider/images-slider/images-slider";
import { Button } from "../../shared/ui/Button/Button";
import {
  HeartIcon,
  ShareIcon,
  MoreIcon,
  ClockIcon,
} from "../../assets/img/icons";
import style from "./skill-info.module.css";

import {
  categoriesSelector,
  getCategories,
} from "../../features/categories/categoriesSlice";
import { useSelector, useDispatch } from "../../features/store";
import { useEffect, useMemo, useState } from "react";
import { selectCurrentUser } from "../../features/auth/authSlice";
import { addProposal, hasProposal } from "../../shared/lib/proposals";

export type TSkillInfoProps = {
  skill: TSkill;
  images: string[];
  ownerUserId: number;
  onProposalConfirmOpen?: () => void;
};

export const SkillInfo = ({
  skill,
  images,
  ownerUserId,
  onProposalConfirmOpen,
}: TSkillInfoProps) => {
  const dispatch = useDispatch();
  const categories = useSelector(categoriesSelector);

  const currentUser = useSelector(selectCurrentUser);
  const currentUserId = currentUser ? String(currentUser.id) : null;

  const [proposalsTick, setProposalsTick] = useState(0);

  const categoryItem = categories.find((item) => item.id === skill.categoryId);
  const subcategoryItem = categoryItem?.subcategories.find(
    (item) => item.id == skill.subCategoryId,
  );

  useEffect(() => {
    dispatch(getCategories());
  }, [dispatch]);

  const isExchangeProposed = useMemo(() => {
    return hasProposal(currentUserId, ownerUserId);
  }, [currentUserId, ownerUserId, proposalsTick]);

  const handleProposeExchange = () => {
    if (!currentUserId) return;

    addProposal(currentUserId, ownerUserId);
    setProposalsTick((v) => v + 1);
    onProposalConfirmOpen?.();
  };

  return (
    <div className={style.skill_info_section}>
      <div className={style.icon_buttons}>
        <Button
          type="tertiary"
          onClick={() => {}}
          className={style.icon_button}
        >
          <HeartIcon />
        </Button>
        <Button
          type="tertiary"
          onClick={() => {}}
          className={style.icon_button}
        >
          <ShareIcon />
        </Button>
        <Button
          type="tertiary"
          onClick={() => {}}
          className={style.icon_button}
        >
          <MoreIcon />
        </Button>
      </div>

      <div className={style.content}>
        <div className={style.text_content}>
          <h1 className={style.title}>{skill.name}</h1>
          <p className={style.caption}>
            {categoryItem ? categoryItem.name : ""} /{" "}
            {subcategoryItem ? subcategoryItem.name : ""}
          </p>
          <p>{skill.fullDescription}</p>
          <Button
            type={isExchangeProposed ? "tertiary" : "primary"}
            onClick={isExchangeProposed ? () => {} : handleProposeExchange}
            className={style.swap_button}
            fullWidth
            disabled={!currentUserId}
            icon={isExchangeProposed ? <ClockIcon /> : undefined}
          >
            {isExchangeProposed ? "Обмен предложен" : "Предложить обмен"}
          </Button>
        </div>
        <ImagesSlider images={images} />
      </div>
    </div>
  );
};
