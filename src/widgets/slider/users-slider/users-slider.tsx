import {
  Splide,
  SplideSlide,
  // @ts-expect-error - библиотека имеет проблемы с типами
} from "@splidejs/react-splide";
import type { Options } from "@splidejs/splide";
import type { IUser, ISkillCategory } from "../../../entities/types";
import { UserCard } from "../../UserCard/UserCard";
import { USER_OPTIONS } from "../constants/sliderOptions";

import "@splidejs/splide/dist/css/splide.min.css";
import styles from "./users-slider.module.css";

type TUsersSliderProps = {
  users: IUser[];
  options?: Options;
  categories: ISkillCategory[];
};

export const UsersSlider: React.FC<TUsersSliderProps> = ({
  users,
  options = {},
  categories,
}) => {
  if (!users || users.length === 0) {
    return <div className={styles.noUsers}>Нет пользователей</div>;
  }

  return (
    <Splide
      options={{ ...USER_OPTIONS, ...options }}
      aria-label="Пользователи"
      className={styles.splide}
    >
      {users.map((user) => (
        <SplideSlide key={user.id}>
          <UserCard user={user} categories={categories} />
        </SplideSlide>
      ))}
    </Splide>
  );
};
