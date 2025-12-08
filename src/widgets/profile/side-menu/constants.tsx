import type { TProfileSideMenuItemProps } from "./side-menu-item";
import {
  HeartIcon,
  UserIcon,
  SkillIcon,
  MessageIcon,
  MessageTextIcon,
} from "../../../assets/img/icons";

export const sideMenuItems: Pick<
  TProfileSideMenuItemProps,
  "text" | "children"
>[] = [
  { text: "Заявки", children: <MessageIcon /> },
  { text: "Мои обмены", children: <MessageTextIcon /> },
  { text: "Избранное", children: <HeartIcon /> },
  { text: "Мои навыки", children: <SkillIcon /> },
  { text: "Личные данные", children: <UserIcon /> },
];
