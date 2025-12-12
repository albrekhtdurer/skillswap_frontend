import { type FC } from "react";
import { HeaderElement } from "./header-element/header-element";
import { useSelector } from "../../features/store";
import { selectCurrentUser } from "../../features/auth/authSlice";
import { isNotEmptyWithoutSearchSelector } from "../../features/filters/filtersSlice";
import type { IUser } from "../../entities/types";

type THeaderProps = {
  handleSkillsClick?: () => void;
  ref?: React.Ref<HTMLElement>;
  onProfileClick?: () => void;
};

export const Header: FC<THeaderProps> = ({
  handleSkillsClick,
  ref,
  onProfileClick,
}) => {
  const isFilterEnabled = useSelector(isNotEmptyWithoutSearchSelector);
  const currentUser = useSelector(selectCurrentUser) || null;

  const handleLogin = () => {
    console.log("Логин");
  };

  return (
    <HeaderElement
      ref={ref}
      isFilterEnabled={isFilterEnabled}
      handleSkillsClick={handleSkillsClick}
      user={currentUser as IUser}
      onLogin={handleLogin}
      onProfileClick={onProfileClick}
    />
  );
};
