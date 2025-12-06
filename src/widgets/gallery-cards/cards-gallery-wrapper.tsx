import { CardsGallery } from "./cards-gallery";
import type { IUser } from "../../entities/types";
import users from "../../../public/db/users.json";
import { useDispatch } from "../../features/store";
import { useEffect } from "react";
import { getCategories } from "../../features/categories/categoriesSlice";

const sortOnClick = () => {
  alert("Сортировка переключена: сначала новые ↔ сначала старые");
};

export const CardsGalleryWrapper = () => {
  const dispatch = useDispatch();
  useEffect(() => {
    dispatch(getCategories());
  }, [dispatch]);

  return (
    <CardsGallery
      title={"Новое"}
      cards={users as IUser[]}
      maxCards={5}
      sortable={true}
      sortOnClick={sortOnClick}
    />
  );
};

export default CardsGalleryWrapper;
