import { type FC, useEffect } from "react";
import { HeaderElement } from "./header-element/header-element";
import { useSelector, useDispatch } from "../../features/store";
import { loginSuccess, setCurrentUser } from "../../features/auth/authSlice";
import { loginWithMockUser } from "../../features/auth/authHelper";
import type { IUser } from "../../entities/types";

export const Header: FC = () => {
  const dispatch = useDispatch();
  const isFilterEnabled = false; //нужно будет получить эту переменную динамически
  const currentUser = useSelector((store) => store.auth.currentUser);

  useEffect(() => {
    const savedUser = localStorage.getItem("currentUser");
    if (savedUser) {
      try {
        const user = JSON.parse(savedUser) as IUser;
        dispatch(setCurrentUser(user));
      } catch (error) {
        console.error("Failed to parse saved user:", error);
      }
    }
  }, [dispatch]);

  useEffect(() => {
    if (currentUser) {
      localStorage.setItem("currentUser", JSON.stringify(currentUser));
    } else {
      localStorage.removeItem("currentUser");
    }
  }, [currentUser]);

  const handleSkillsClick = () => {
    console.log("Показать/убрать виджет ВСЕ НАВЫКИ");
  };

  const handleLogin = async () => {
    try {
      const user = await loginWithMockUser();
      dispatch(loginSuccess(user));
      console.log("Успешный вход:", user.name);
    } catch (error) {
      console.error("Ошибка входа:", error);
    }
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
