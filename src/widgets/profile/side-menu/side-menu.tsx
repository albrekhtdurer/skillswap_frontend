import { ProfileSideMenuItem } from "./side-menu-item";
import { sideMenuItems } from "./constants";
import style from "./side-menu.module.css";

import { useState } from "react";

type SideMenuText = (typeof sideMenuItems)[number]["text"] | undefined;

export const ProfileSideMenu = () => {
  const [selected, setSelected] = useState<SideMenuText>(undefined);
  return (
    <nav className={style.menu}>
      {sideMenuItems.map((item) => (
        <ProfileSideMenuItem
          text={item.text}
          key={item.text}
          selected={selected === item.text}
          onClick={() => setSelected(item.text)}
        >
          {item.children}
        </ProfileSideMenuItem>
      ))}
    </nav>
  );
};
