import { TextLink } from "../../../shared/ui/text-link";
import style from "./side-menu.module.css";

export type ProfileSideMenuItemProps = {
  selected: boolean;
  text: string;
  children: React.ReactNode;
  onClick: () => void;
};

export const ProfileSideMenuItem = ({
  selected,
  text,
  children,
  onClick,
}: ProfileSideMenuItemProps) => {
  return (
    <TextLink
      className={`${style.item_wrapper} ${selected ? style.menu_item_selected : ""}`}
      onClick={onClick}
    >
      <div className={style.menu_item}>
        {children}
        {text}
      </div>
    </TextLink>
  );
};
