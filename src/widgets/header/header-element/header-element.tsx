import styles from "./header-element.module.css";
import type { FC } from "react";
import { Logo } from "../../../shared/ui/logo";
import {
  ArrowIcon,
  BellIcon,
  HeartOutlineIcon,
  MoonIcon,
} from "../../../assets/img/icons";
import { SearchInput } from "../../../shared/ui/Input";
import { Button } from "../../../shared/ui/Button/Button";
import { TextLink } from "../../../shared/ui/text-link";
import type { IUser } from "../../../entities/types";

type THeaderElementProps = {
  isFilterEnabled: boolean;
  handleSkillsClick: () => void;
  user?: IUser | null;
  onLogin?: () => void;
  onProfileClick?: () => void;
};

export const HeaderElement: FC<THeaderElementProps> = ({
  isFilterEnabled,
  handleSkillsClick,
  user,
  onLogin = () => console.log("Вход"),
  onProfileClick = () => console.log("Профиль"),
}) => {
  return (
    <header className={styles.header}>
      <nav className={styles.menu}>
        <Logo />
        <ul className={styles.list}>
          <li>
            <TextLink>О проекте</TextLink>
          </li>
          <li>
            <TextLink onClick={handleSkillsClick}>
              {"Все навыки "}
              <ArrowIcon initialRotation={0} opened={false} />
            </TextLink>
          </li>
        </ul>
        {!isFilterEnabled && (
          <div className={styles.input}>
            <SearchInput
              onChange={() => {}}
              name={"Искать навык"}
              onSearch={() => {}}
            />
          </div>
        )}

        {/* Общая секция для иконок и пользователя */}
        <div className={styles.right_section}>
          {/* Иконка луны (тема) - показывается всегда */}
          <button className={styles.icon_button}>
            <MoonIcon />
          </button>

          {user ? (
            <>
              {/* Иконки для авторизованного состояния */}
              <button className={styles.icon_button}>
                <BellIcon />
              </button>
              <button className={styles.icon_button}>
                <HeartOutlineIcon />
              </button>

              {/* Имя пользователя и аватар - поменяли местами */}
              <div
                className={styles.user_info}
                onClick={onProfileClick}
                role="button"
                tabIndex={0}
              >
                {/* Сначала имя, потом аватар */}
                <span className={styles.user_name}>{user.name}</span>
                <img
                  src={user.avatarUrl}
                  alt={`Аватар ${user.name}`}
                  className={styles.user_avatar}
                />
              </div>
            </>
          ) : (
            <>
              {/* Кнопки для неавторизованного состояния */}
              <Button
                onClick={onLogin}
                type={"secondary"}
                className={styles.login_button}
              >
                Войти
              </Button>
              <Button onClick={() => {}} className={styles.register_button}>
                Зарегистрироваться
              </Button>
            </>
          )}
        </div>
      </nav>
    </header>
  );
};
