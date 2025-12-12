import { type FC } from "react";
import { HeaderElement } from "./header-element/header-element";
import { useSelector } from "../../features/store";
import { selectCurrentUser } from "../../features/auth/authSlice";
import { isNotEmptyWithoutSearchSelector } from "../../features/filters/filtersSlice";
import { useNavigate } from "react-router-dom";

type THeaderProps = {
  handleSkillsClick?: () => void;
  ref?: React.Ref<HTMLElement>;
};

export const Header: FC<THeaderProps> = ({ handleSkillsClick, ref }) => {
  const isFilterEnabled = useSelector(isNotEmptyWithoutSearchSelector);
  const currentUser = useSelector(selectCurrentUser) || null;
  const navigate = useNavigate();

  const handleLogin = () => {
    navigate("/login");
  };

  const handleProfileClick = () => {
    console.log("Переход в профиль пользователя");
  };

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
