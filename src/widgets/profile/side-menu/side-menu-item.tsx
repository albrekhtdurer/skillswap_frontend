import { NavLink } from "react-router-dom";
import style from "./side-menu.module.css";

export type TProfileSideMenuItemProps = {
  selected: boolean;
  text: string;
  children: React.ReactNode;
  onClick: () => void;
  to: string;
};

export const ProfileSideMenuItem = ({
  selected,
  text,
  children,
  onClick,
  to,
}: TProfileSideMenuItemProps) => {
  return (
    <NavLink
      to={to}
      className={`${style.item_wrapper} ${selected ? style.menu_item_selected : ""}`}
      onClick={onClick}
    >
      <div className={style.menu_item}>
        {children}
        {text}
      </div>
    </NavLink>
  );
};
