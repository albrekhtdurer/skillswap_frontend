import styles from "./header-element.module.css";
import type { FC } from "react";
import { Logo } from "../../../shared/ui/logo";
import {
  ArrowIcon,
  BellIcon,
  HeartIcon,
  MoonIcon,
} from "../../../assets/img/icons";
import { SearchInput } from "../../../shared/ui/Input";
import { Button } from "../../../shared/ui/Button/Button";
import { TextLink } from "../../../shared/ui/text-link";
import type { IUser } from "../../../entities/types";

type THeaderElementProps = {
  isFilterEnabled: boolean;
  handleSkillsClick?: () => void;
  user?: IUser | null;
  onLogin?: () => void;
  onProfileClick?: () => void;
  ref?: React.Ref<HTMLElement>;
};

export const HeaderElement: FC<THeaderElementProps> = ({
  isFilterEnabled,
  handleSkillsClick,
  user,
  ref,
  onLogin = () => console.log("Вход"),
  onProfileClick = () => console.log("Профиль"),
}) => {
  return (
    <header ref={ref} className={styles.header}>
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
            <SearchInput placeholder="Искать навык" />
          </div>
        )}

        <div className={styles.right_section}>
          <button className={styles.icon_button}>
            <MoonIcon />
          </button>

          {user ? (
            <>
              <button className={styles.icon_button}>
                <BellIcon />
              </button>
              <button className={styles.icon_button}>
                <HeartIcon />
              </button>

              <div
                className={styles.user_info}
                onClick={onProfileClick}
                role="button"
                tabIndex={0}
              >
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
