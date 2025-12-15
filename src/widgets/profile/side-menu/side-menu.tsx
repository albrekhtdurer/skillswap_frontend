import { ProfileSideMenuItem } from "./side-menu-item";
import { sideMenuItems } from "./constants";
import style from "./side-menu.module.css";

import { useState } from "react";
import { useLocation } from "react-router-dom";

type TSideMenuText = (typeof sideMenuItems)[number]["text"] | undefined;

export const ProfileSideMenu = () => {
  const location = useLocation();
  const [selected, setSelected] = useState<TSideMenuText>(location.pathname);
  return (
    <nav className={style.menu}>
      {sideMenuItems.map((item) => (
        <ProfileSideMenuItem
          to={item.to}
          text={item.text}
          key={item.text}
          selected={selected === item.to}
          onClick={() => setSelected(item.to)}
        >
          {item.children}
        </ProfileSideMenuItem>
      ))}
    </nav>
  );
};
