import { type FC } from "react";
import { HeaderElement } from "./header-element/header-element";
import { useSelector } from "../../features/store";
import { selectCurrentUser } from "../../features/auth/authSlice";

export const Header: FC = () => {
  const isFilterEnabled = false; //нужно будет получить эту переменную динамически
  const currentUser = useSelector(selectCurrentUser) || null;

  const handleSkillsClick = () => {
    console.log("Показать/убрать виджет ВСЕ НАВЫКИ");
  };

  const handleLogin = () => {
    console.log("Логин");
  };

  const handleProfileClick = () => {
    console.log("Переход в профиль пользователя");
  };

  return (
    <HeaderElement
      isFilterEnabled={isFilterEnabled}
      handleSkillsClick={handleSkillsClick}
      user={currentUser}
      onLogin={handleLogin}
      onProfileClick={handleProfileClick}
    />
  );
};
