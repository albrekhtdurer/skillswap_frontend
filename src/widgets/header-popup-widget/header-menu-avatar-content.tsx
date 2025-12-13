import styles from "./header-menu-avatar-content.module.css";
import { LogoutIcon } from "../../assets/img/icons";
import { Button } from "../../shared/ui/Button/Button";

export const HeaderMenuAvatarContent = () => {
  const toggleMenu = () => {}; // заглушка
  return (
    <ul className={styles.menuList}>
      <li className={styles.menuItemButton}>
        <Button
          type={"tertiary"}
          onClick={toggleMenu}
          className={styles.menuItem}
        >
          Личный кабинет
        </Button>
      </li>
      <li className={styles.menuItemButton}>
        <Button
          type={"tertiary"}
          onClick={toggleMenu}
          className={styles.menuItem}
        >
          Выйти из аккаунта
          <LogoutIcon />
        </Button>
      </li>
    </ul>
  );
};
