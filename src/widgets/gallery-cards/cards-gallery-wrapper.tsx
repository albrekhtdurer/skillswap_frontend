import { CardsGallery } from "./cards-gallery";
import type { User } from "../../entities/types";
import users from "../../../public/db/users.json";
import { useDispatch } from "../../features/store";
import { useEffect } from "react";
import { getCategories } from "../../features/categories/categoriesSlice";

const sortOnClick = () => {
  alert("Сортировка переключена: сначала новые ↔ сначала старые");
};

const showAllOnClick = () => {
  alert("Переход к полному списку пользователей!");
};

export const CardsGalleryWrapper = () => {
  const dispatch = useDispatch();
  useEffect(() => {
    dispatch(getCategories());
  }, []);

  return (
    <CardsGallery
      title={"Новое"}
      cards={users as User[]}
      maxCards={5}
      sortable={true}
      sortOnClick={sortOnClick}
      showAllOnClick={showAllOnClick}
    />
  );
};

export default CardsGalleryWrapper;
