import type { TSkill } from "../../entities/types";
import { ImagesSlider } from "../slider/images-slider/images-slider";
import { Button } from "../../shared/ui/Button/Button";
import { HeartIcon, ShareIcon, MoreIcon } from "../../assets/img/icons";
import style from "./skill-info.module.css";

import {
  categoriesSelector,
  getCategories,
} from "../../features/categories/categoriesSlice";
import { useSelector, useDispatch } from "../../features/store";
import { useEffect } from "react";

export type TSkillInfoProps = {
  skill: TSkill;
  images: string[];
};

export const SkillInfo = ({ skill, images }: TSkillInfoProps) => {
  const dispatch = useDispatch();
  const categories = useSelector(categoriesSelector);
  const categoryItem = categories.find((item) => item.id === skill.categoryId);
  const subcategoryItem = categoryItem?.subcategories.find(
    (item) => item.id == skill.subCategoryId,
  );

  useEffect(() => {
    dispatch(getCategories());
  }, [dispatch]);

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
          <Button onClick={() => {}} className={style.swap_button} fullWidth>
            Предложить обмен
          </Button>
        </div>
        <ImagesSlider images={images} />
      </div>
    </div>
  );
};
