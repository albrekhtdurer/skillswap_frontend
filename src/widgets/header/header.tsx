import { type FC, useState, useEffect } from "react";
import { HeaderElement } from "./header-element/header-element";
import { AuthForm } from "../../widgets/auth-form/auth-form";
import { useSelector, useDispatch } from "../../features/store";
import {
  selectCurrentUser,
  selectAuthLoading,
  selectAuthError,
  loginUser,
  fetchUserData,
  clearError,
} from "../../features/auth/authSlice";
import { isNotEmptyWithoutSearchSelector } from "../../features/filters/filtersSlice";
import { useNavigate } from "react-router-dom";

type THeaderProps = {
  handleSkillsClick?: () => void;
  ref?: React.Ref<HTMLElement>;
};

export const Header: FC<THeaderProps> = ({ handleSkillsClick, ref }) => {
  const [showAuthForm, setShowAuthForm] = useState(false);
  const dispatch = useDispatch();
  const isFilterEnabled = useSelector(isNotEmptyWithoutSearchSelector);
  const currentUser = useSelector(selectCurrentUser);
  const authLoading = useSelector(selectAuthLoading);
  const authError = useSelector(selectAuthError);

  useEffect(() => {
    const token = localStorage.getItem("access_token");
    if (token && !currentUser) {
      dispatch(fetchUserData());
    }
  }, [dispatch, currentUser]);

  const handleLogin = () => {
    setShowAuthForm(true);
  };

  const handleAuthSubmit = async ({
    email,
    password,
  }: {
    email: string;
    password: string;
  }) => {
    try {
      const result = await dispatch(loginUser({ email, password })).unwrap();

      if (result) {
        setShowAuthForm(false);
      }
    } catch (error) {
      console.error("Ошибка авторизации:", error);
    }
  };

  const handleProfileClick = () => {
    console.log("Переход в профиль пользователя");
    dispatch(fetchUserData());
  };

  const handleCloseAuthForm = () => {
    setShowAuthForm(false);
    dispatch(clearError());
  };

  if (showAuthForm) {
    return (
      <div
        style={{
          padding: "40px 20px",
          maxWidth: "480px",
          margin: "0 auto",
          width: "100%",
        }}
      >
        <AuthForm
          onSubmit={handleAuthSubmit}
          submitButtonText={authLoading ? "Загрузка..." : "Войти"}
          optionalLinkText="Забыли пароль?"
        />
        {authError && (
          <div
            style={{
              marginTop: "20px",
              padding: "10px",
              backgroundColor: "#ffebee",
              color: "#c62828",
              borderRadius: "4px",
              textAlign: "center",
            }}
          >
            {authError}
          </div>
        )}
        <button
          onClick={handleCloseAuthForm}
          style={{
            marginTop: "20px",
            padding: "10px 20px",
            backgroundColor: "transparent",
            border: "1px solid #ccc",
            borderRadius: "4px",
            cursor: "pointer",
            width: "100%",
          }}
        >
          Назад
        </button>
      </div>
    );
  }

  return (
    <HeaderElement
      ref={ref}
      isFilterEnabled={isFilterEnabled}
      handleSkillsClick={handleSkillsClick}
      user={currentUser}
      onLogin={handleLogin}
      onProfileClick={handleProfileClick}
    />
  );
};
